
import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { useMedia } from 'react-use';
import LoadingAnimation from '@/components/LoadingAnimation';

// Lazy load components to improve initial load time
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const TeamSection = lazy(() => import('@/components/TeamSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

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

  // Loading animation with optimized timing
  useEffect(() => {
    // Preload critical resources
    const preloadImages = [
      // Add paths to critical images if needed
    ];
    
    let preloaded = 0;
    const totalResources = preloadImages.length || 1;
    
    // Simulate resource loading with minimum duration to ensure smooth experience
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    let step = 0;
    
    // Start progress counter
    const timer = setInterval(() => {
      step++;
      const baseProgress = Math.min(95, Math.floor((step / steps) * 95));
      const resourceProgress = preloaded / totalResources * 5;
      setLoadingProgress(Math.min(100, baseProgress + resourceProgress));
      
      if (step >= steps && preloaded >= totalResources) {
        clearInterval(timer);
        setLoadingProgress(100);
      }
    }, interval);

    // Preload images in the background
    preloadImages.forEach(src => {
      const img = new Image();
      img.onload = () => {
        preloaded++;
      };
      img.src = src;
    });

    return () => clearInterval(timer);
  }, []);

  // Handle completion of loading animation
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  // Implement optimized smooth scrolling
  useEffect(() => {
    if (!showContent) return;
    
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
            // Use optimized smooth scroll with requestAnimationFrame
            const startPosition = window.scrollY;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 800; // ms
            let startTime: number;
            
            function scrollStep(timestamp: number) {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function for smoother motion
              const easeInOutCubic = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
              
              window.scrollTo(0, startPosition + distance * easeInOutCubic);
              
              if (progress < 1) {
                requestAnimationFrame(scrollStep);
              } else {
                // Update URL without page reload
                window.history.pushState(null, '', href);
              }
            }
            
            requestAnimationFrame(scrollStep);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: false });
    
    // Apply smooth scrolling behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';

    // Performance optimizations with Intersection Observer API
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
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    sections.forEach(section => {
      section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
      observer.observe(section);
    });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.style.scrollBehavior = '';
      sections.forEach(section => observer.unobserve(section));
    };
  }, [showContent]);

  // 3D background animation effect - optimized for performance
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

    // Create particles with optimized rendering
    const particlesArray: Particle[] = [];
    const particleCount = 30; // Reduced count for better performance
    
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
        this.size = Math.random() * 3 + 1; // Smaller particles
        this.speedX = Math.random() * 1.5 - 0.75; // Reduced speed
        this.speedY = Math.random() * 1.5 - 0.75; // Reduced speed
        this.color = `hsla(${Math.random() * 60 + 240}, 70%, 71%, ${Math.random() * 0.15 + 0.05})`; // Lower opacity
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
          
          if (distance < 120) { // Shorter connection distance
            ctx.beginPath();
            ctx.strokeStyle = `rgba(123, 97, 255, ${0.15 - (distance/120) * 0.15})`; // Lower opacity
            ctx.lineWidth = 0.6; // Thinner lines
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    let animationId: number;
    let lastTime = 0;
    const fps = 30; // Target FPS for optimization
    const fpsInterval = 1000 / fps;
    
    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);
      
      // Throttle rendering for performance
      const elapsed = timestamp - lastTime;
      if (elapsed < fpsInterval) return;
      
      lastTime = timestamp - (elapsed % fpsInterval);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connectParticles();
    };
    
    init();
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [showContent, isMobile]);

  if (isLoading) {
    return <LoadingAnimation progress={loadingProgress} onComplete={handleLoadingComplete} />;
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
      
      {/* Use Suspense for lazy loaded components */}
      <HeroSection />
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><p>Loading section...</p></div>}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><p>Loading portfolio...</p></div>}>
        <ProjectsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><p>Loading section...</p></div>}>
        <TeamSection />
        <TestimonialsSection />
        <ContactSection contactInfo={contactInfo} />
        <Footer contactInfo={contactInfo} />
      </Suspense>
    </div>
  );
};

export default Index;
