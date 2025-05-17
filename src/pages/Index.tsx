
import { useEffect, useState, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useMedia } from 'react-use';

// Performance optimization technique - better scrolling
const useOptimizedScroll = () => {
  // Implementation to support smooth scrolling
  useEffect(() => {
    // Add smooth scrolling for all anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the clicked element is an anchor with a hash
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = target.getAttribute('href') as string;
        
        if (href !== '#') {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            // Smooth scroll with optimized animation
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const headerOffset = 80; // Account for fixed header
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Update URL without page reload
            window.history.pushState(null, '', href);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const contactInfo = {
    phone: "+91 6300737911",
    email: "Devpilottech@gmail.com",
    address: " C9VP+XPR Bhanu Towers, VIP Hills, Jaihind Enclave, Madhapur, Hyderabad, Telangana 500081"
  };
  
  // Reference for the observer and 3D background
  const sectionsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useMedia('(max-width: 768px)', false);

  // Use optimized scroll hook
  useOptimizedScroll();

  // More efficient loading animation
  useEffect(() => {
    const duration = 1000; // Shorter loading time - 1 second
    const interval = 20; 
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
        }, 50); // Reduced transition time
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Performance optimized intersection observer
  useEffect(() => {
    if (!showContent) return;

    // Use IntersectionObserver for better performance
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };
    
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            entry.target.classList.remove('translate-y-10');
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [showContent]);

  // Optimized 3D background animation
  useEffect(() => {
    if (!showContent || !canvasRef.current || isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen with proper device pixel ratio
    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(pixelRatio, pixelRatio);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Reduce particle count for better performance
    const particlesArray: Particle[] = [];
    const particleCount = 30; // Reduced from 50 to 30
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Reduced size
        this.speedX = Math.random() * 2 - 1; // Slower movement
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsla(${Math.random() * 60 + 240}, 70%, 71%, ${Math.random() * 0.15 + 0.05})`; // More transparent
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > window.innerWidth || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > window.innerHeight || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    // Optimize connection drawing to only draw some connections
    const connectParticles = () => {
      if (!ctx) return;
      const connectionDistance = 120; // Reduced connection distance
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(123, 97, 255, ${0.1 - (distance/connectionDistance) * 0.1})`;
            ctx.lineWidth = 0.5; // Thinner lines
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    let animationFrameId: number;
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showContent, isMobile]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/90">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"
              style={{ animationDuration: '1s' }} // Faster spin
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
          <h2 className="text-3xl font-bold text-primary mt-6 animate-pulse">Devpilot</h2>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen relative transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      ref={sectionsRef}
    >
      {/* 3D Background Canvas - Only render for non-mobile devices */}
      {!isMobile && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 -z-30 opacity-50" // Reduced opacity
        />
      )}
      
      {/* Simplified global site background decoration */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        
        {/* Reduced number of abstract geometric shapes */}
        <div className="absolute top-[20%] left-[5%] w-64 h-64 rounded-full bg-primary/5 blur-[100px]"></div>
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
