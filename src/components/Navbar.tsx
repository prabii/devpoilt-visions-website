
import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

interface NavbarProps {
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

const Navbar = ({ contactInfo }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 20);
    };

    // Passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-sm' 
          : 'py-5'
      }`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          className="text-2xl font-bold flex items-center"
          aria-label="Devpilot homepage"
        >
          <span className="gradient-text-premium">Devpilot</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1">
          {['Home', 'Services', 'Projects', 'Team', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="px-3 py-2 text-foreground font-medium hover:text-primary transition-colors duration-200 fancy-underline"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Theme Toggle Only */}
        <div className="hidden md:flex items-center">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            className="relative z-50"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile Menu - Optimized to avoid reflows */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8"
            role="dialog"
            aria-modal="true"
          >
            {['Home', 'Services', 'Projects', 'Team', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-2xl font-medium text-foreground hover:text-primary transition-colors duration-200"
                onClick={toggleMenu}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
