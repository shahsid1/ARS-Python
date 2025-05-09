
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * A wrapper component that adds entrance animations to page content
 */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure the CSS transition works properly
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * A component that animates items in sequence with a staggered delay
 */
interface StaggeredEntryProps {
  children: ReactNode[];
  baseDelay?: number;
  delayIncrement?: number;
  className?: string;
  itemClassName?: string;
}

export function StaggeredEntry({
  children,
  baseDelay = 100,
  delayIncrement = 100,
  className = "",
  itemClassName = "",
}: StaggeredEntryProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure the CSS transition works properly
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, baseDelay);

    return () => clearTimeout(timer);
  }, [baseDelay]);

  return (
    <div className={className}>
      {Array.isArray(children) ? 
        children.map((child, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ${itemClassName}`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transitionDelay: `${baseDelay + index * delayIncrement}ms`,
            }}
          >
            {child}
          </div>
        ))
        : 
        <div 
          className={`transition-all duration-500 ${itemClassName}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
            transitionDelay: `${baseDelay}ms`,
          }}
        >
          {children}
        </div>
      }
    </div>
  );
}

export function ButtonLoadingAnimation({ loading = false }) {
  return loading ? (
    <span className="inline-block animate-bounce-light">•••</span>
  ) : null;
}
