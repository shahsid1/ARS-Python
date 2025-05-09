
import { useEffect, useState } from "react";
import { Plane, Cloud } from "lucide-react";

interface FlightSearchAnimationProps {
  source: string;
  destination: string;
  onComplete: () => void;
  duration?: number;
}

const FlightSearchAnimation = ({
  source,
  destination,
  onComplete,
  duration = 3000,
}: FlightSearchAnimationProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 1;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        return nextProgress;
      });
    }, duration / 100);
    
    return () => clearInterval(interval);
  }, [duration, onComplete]);

  // Calculate position along the curve - source to destination direction (left to right)
  const calculatePosition = () => {
    // Convert progress (0-100) to radians (0 to π)
    const radians = (progress / 100) * Math.PI;
    
    // Calculate x and y positions along a semi-circle path (left to right)
    const x = 50 - Math.cos(radians) * 50; // 0 to 100
    const y = 50 - Math.sin(radians) * 40; // Flattened arc
    
    // Rotate the plane based on the position on the curve
    const angle = (progress / 100) * 180; // Rotate from 0 to 180 degrees
    
    return { x, y, angle };
  };
  
  const { x, y, angle } = calculatePosition();

  // Generate clouds with random positions
  const generateClouds = (count: number) => {
    const clouds = [];
    for (let i = 0; i < count; i++) {
      const top = Math.random() * 80 + 10;
      const left = Math.random() * 70 + 15;
      const size = Math.random() * 10 + 16; // 16-26px
      const delay = Math.random() * 5; // 0-5s delay
      const duration = Math.random() * 10 + 20; // 20-30s animation
      
      clouds.push(
        <div 
          key={i}
          className="absolute text-white opacity-20 animate-float"
          style={{ 
            top: `${top}%`, 
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        >
          <Cloud size={size} />
        </div>
      );
    }
    return clouds;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col z-50 animate-fade-in">
      {/* Position the animation container at the top */}
      <div className="w-full max-w-2xl h-64 relative mx-auto mt-16">
        {/* Clouds background */}
        {generateClouds(8)}
        
        {/* Source location - on left side */}
        <div className="absolute left-4 bottom-8 text-white text-center animate-slide-up" style={{animationDelay: "0.2s"}}>
          <div className="w-4 h-4 rounded-full bg-airline-dusty-blue mx-auto mb-2 animate-pulse-slow"></div>
          <span className="text-xl font-bold">{source}</span>
        </div>
        
        {/* Destination location - on right side */}
        <div className="absolute right-4 bottom-8 text-white text-center animate-slide-up" style={{animationDelay: "0.4s"}}>
          <div className="w-4 h-4 rounded-full bg-airline-dusty-blue mx-auto mb-2 animate-pulse-slow"></div>
          <span className="text-xl font-bold">{destination}</span>
        </div>
        
        {/* Path visualization */}
        <div className="absolute h-0.5 w-full bottom-10 bg-gradient-to-r from-airline-dusty-blue to-airline-light-beige opacity-40 rounded animate-scale-in" style={{animationDelay: "0.1s", transformOrigin: "center"}}></div>
        
        {/* Plane icon */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-linear"
          style={{ 
            left: `${x}%`, 
            top: `${y}%`, 
            transform: `translate(-50%, -50%) rotate(${angle}deg)` 
          }}
        >
          <div className="relative">
            <Plane size={32} className="text-white" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-white opacity-30 blur-md rounded-full"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white text-center animate-slide-up" style={{animationDelay: "0.3s"}}>
          <p className="text-xl mb-2">Searching for flights...</p>
          <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-airline-dusty-blue h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchAnimation;
