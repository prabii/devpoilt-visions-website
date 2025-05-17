
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useMedia } from 'react-use';

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

  // Loading animation
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

  // Implement smooth scrolling
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
            // Smooth scroll to the target element
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update URL without page reload
            window.history.pushState(null, '', href);
          }
        }
      }
    };

    // Add event listener to handle anchor clicks
    document.addEventListener('click', handleAnchorClick);
    
    // Apply smooth scrolling behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';

    // Performance optimizations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Only animate when in view
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            entry.target.classList.remove('translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    
    sections.forEach(section => observer.observe(section));

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.style.scrollBehavior = '';
      sections.forEach(section => observer.unobserve(section));
    };
  }, [showContent]);

  // 3D background animation effect
  useEffect(() => {
    if (!showContent || !canvasRef.current || isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particlesArray: Particle[] = [];
    const particleCount = 50;
    
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
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsla(${Math.random() * 60 + 240}, 70%, 71%, ${Math.random() * 0.2 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
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
    
    const connectParticles = () => {
      if (!ctx) return;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(123, 97, 255, ${0.2 - (distance/150) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [showContent, isMobile]);

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
          <h2 className="text-3xl font-bold text-primary mt-6 animate-pulse">Devpilot</h2>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen relative transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      ref={sectionsRef}
    >
      {/* 3D Background Canvas */}
      {!isMobile && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 -z-30 opacity-60"
        />
      )}
      
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
