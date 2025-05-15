
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const contactInfo = {
    phone: "+91 6300737911",
    email: "contact@devpoilt.com",
    address: "Tech Hub, Hyderabad, India"
  };

  // Reference for the observer
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading to ensure smooth animations
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setLoadingProgress(Math.min(100, Math.floor((step / steps) * 100)));
      
      if (step >= steps) {
        clearInterval(timer);
        setIsLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 100);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Setup intersection observer for scroll animations
  useEffect(() => {
    if (!showContent) return;

    // Function to handle section visibility
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
          entry.target.classList.remove('translate-y-10');
        }
      });
    };

    // Create observer
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    // Get all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [showContent]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/90">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"
              style={{ animationDuration: '1.5s' }}
            ></div>
            {/* Progress circle */}
            <svg className="absolute inset-0 w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="42"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-primary"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - loadingProgress / 100)}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">{loadingProgress}%</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-primary mt-6 animate-pulse">Devpoilt</h2>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen relative transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      ref={sectionsRef}
    >
      {/* Global site background decoration */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/10"></div>
        
        {/* Abstract geometric shapes */}
        <div className="absolute top-[20%] left-[5%] w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] animate-pulse-soft"></div>
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full bg-accent/5 dark:bg-accent/10 blur-[150px] animate-pulse-soft"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMzZTNlM2UiIGZpbGwtb3BhY2l0eT0iLjAyIiBkPSJNMzUuMzMzIDI4Ljg2N2MzLjI5IDAgNS45Ni0yLjY3IDUuOTYtNS45NiAwLTMuMjktMi42Ny01Ljk2LTUuOTYtNS45NmMtMy4yOSAwLTUuOTYgMi42Ny01Ljk2IDUuOTYgMCAzLjI5IDIuNjcgNS45NiA1Ljk2IDUuOTZ6TS0uMDAyIDUxLjg2N2wuMDAyLS4wMDIuMDAyLjAwMnoiLz48L2c+PC9zdmc+')]"></div>
      </div>
      
      <Navbar contactInfo={contactInfo} />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection contactInfo={contactInfo} />
      <Footer contactInfo={contactInfo} />
    </div>
  );
};

export default Index;
