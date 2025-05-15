
import { useState, useEffect } from 'react';
import { Moon, Sun, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  if (!mounted) return null;

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      disabled={isAnimating}
      className="relative rounded-full w-11 h-11 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-lg border border-border hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 overflow-hidden"
    >
      {/* Stars background for dark mode */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '0ms' }} />
        <div className="absolute top-3 left-6 w-0.5 h-0.5 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '300ms' }} />
        <div className="absolute top-6 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '600ms' }} />
        <div className="absolute top-7 left-7 w-1 h-1 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '900ms' }} />
        <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '1200ms' }} />
      </div>
      
      {/* Sun/Moon icons with animation */}
      <div className="relative w-6 h-6 transform transition-transform duration-500">
        <span 
          className={`absolute inset-0 transition-all duration-500 flex items-center justify-center ${
            theme === 'dark' 
              ? 'opacity-100 transform-none' 
              : 'opacity-0 rotate-90 scale-50'
          }`}
        >
          <Sun className="h-5 w-5 text-yellow-400" />
          <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-pulse-soft blur-sm" style={{ animationDuration: '2s' }} />
        </span>
        <span 
          className={`absolute inset-0 transition-all duration-500 flex items-center justify-center ${
            theme === 'light' 
              ? 'opacity-100 transform-none' 
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        >
          <Moon className="h-5 w-5 text-slate-700" />
        </span>
      </div>
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
