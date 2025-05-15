
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    // Simulate loading to ensure smooth animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/90">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <h2 className="text-2xl font-bold text-primary animate-pulse">Devpoilt</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Global site background decoration */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/10"></div>
      </div>
      
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
