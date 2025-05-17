
import { useState, useEffect } from 'react';

const LoadingAnimation = ({ progress, onComplete }: { progress: number, onComplete: () => void }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [progress, isComplete, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/90">
      <div className="flex flex-col items-center">
        {/* Laptop with typing hands animation */}
        <div className="relative w-64 h-48 mb-8">
          {/* Laptop base */}
          <div className="absolute bottom-0 w-full h-3 bg-gray-800 rounded-b-lg"></div>
          
          {/* Laptop body */}
          <div className="absolute bottom-3 w-full h-10 bg-gray-700 rounded-b-md"></div>
          
          {/* Laptop screen */}
          <div className="absolute bottom-13 w-full h-32 bg-gray-800 rounded-t-md overflow-hidden flex items-center justify-center border-t-2 border-gray-600">
            {/* Screen content */}
            <div className="w-[90%] h-[85%] bg-gray-900 rounded-sm relative overflow-hidden">
              {/* Typing text */}
              <div className="absolute top-4 left-4">
                <span className="text-green-500 text-xs font-mono typing-text">
                  $ npm start<br />
                  {'>'}devpilot@1.0.0<br />
                  {">"}
                  <span className="inline-block animate-pulse">_</span>
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="absolute bottom-4 left-4 right-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Typing hands */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24">
            <div className="relative">
              {/* Left hand */}
              <div className="absolute left-0 bottom-3 w-8 h-5 bg-skin-500 rounded-lg animate-typing-left"></div>
              
              {/* Right hand */}
              <div className="absolute right-0 bottom-3 w-8 h-5 bg-skin-500 rounded-lg animate-typing-right"></div>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-primary mt-2 animate-pulse">Devpilot</h2>
        <p className="text-sm text-muted-foreground mt-2">Loading your experience... {progress}%</p>
      </div>
      
      {/* Add typing animation styles */}
      <style>
        {`
          @keyframes typing-left {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          
          @keyframes typing-right {
            0%, 100% { transform: translateY(-4px); }
            50% { transform: translateY(0px); }
          }
          
          .animate-typing-left {
            animation: typing-left 1s ease-in-out infinite;
          }
          
          .animate-typing-right {
            animation: typing-right 1s ease-in-out infinite;
          }
          
          .bg-skin-500 {
            background-color: #e2b49a;
          }
          
          .typing-text::after {
            content: '|';
            display: inline-block;
            animation: blink 1s step-end infinite;
          }
          
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingAnimation;
