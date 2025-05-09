
import { useState, useEffect } from "react";
import { Plane } from "lucide-react";

interface TicketDownloadAnimationProps {
  onComplete: () => void;
  duration?: number;
}

const TicketDownloadAnimation = ({ 
  onComplete, 
  duration = 3000 
}: TicketDownloadAnimationProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + 2; // Faster progress
        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return nextProgress;
      });
    }, duration / 50);
    
    return () => clearInterval(interval);
  }, [duration, onComplete]);
  
  // Calculate plane position with takeoff trajectory
  const planePosition = {
    x: Math.min(100, progress * 1.5), // Move horizontally faster
    y: progress < 50 ? 50 - progress * 0.8 : 10, // Move up until halfway, then stay high
    rotate: progress < 50 ? progress * 0.6 : 30, // Gradually angle upward
    scale: Math.max(0.5, 1 - progress * 0.005), // Gradually get smaller (flying away)
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
      <div className="w-full max-w-xl h-96 relative">
        {/* Sky background with stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 1}s`,
              }}
            />
          ))}
        </div>
        
        {/* Moving clouds */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white bg-opacity-20 rounded-full filter blur-md"
              style={{
                width: `${Math.random() * 80 + 50}px`,
                height: `${Math.random() * 40 + 20}px`,
                top: `${Math.random() * 70 + 10}%`,
                left: `${Math.random() * 100}%`,
                transform: `translateX(${-progress * 3}px)`,
              }}
            />
          ))}
        </div>
        
        {/* Plane */}
        <div
          className="absolute transition-all duration-300 ease-out"
          style={{
            left: `${planePosition.x}%`,
            top: `${planePosition.y}%`,
            transform: `translate(-50%, -50%) rotate(${planePosition.rotate}deg) scale(${planePosition.scale})`,
          }}
        >
          <Plane size={48} className="text-white" />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-white opacity-20 blur-md rounded-full"></div>
        </div>
        
        {/* Message */}
        <div className="absolute bottom-10 left-0 right-0 text-center text-white">
          <h3 
            className="text-2xl font-bold mb-4 transition-opacity duration-500"
            style={{ opacity: progress > 30 ? 1 : 0 }}
          >
            Your ticket has been downloaded!
          </h3>
          <p 
            className="text-lg transition-opacity duration-500"
            style={{ opacity: progress > 50 ? 1 : 0 }}
          >
            Thank you for choosing SkyRoute Airways
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketDownloadAnimation;
