
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

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
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) return null;

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 bg-background/50 backdrop-blur-sm border border-border hover:bg-primary/10 transition-all"
    >
      <div className="relative w-5 h-5">
        <span 
          className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Sun className="h-5 w-5 text-yellow-400" />
        </span>
        <span 
          className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
            theme === 'light' ? 'opacity-100' : 'opacity-0'
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
