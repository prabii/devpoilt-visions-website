import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeBackground from './ThreeBackground';

const HeroSection = () => {
  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
       <ThreeBackground density={100} speed={0.002} />
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[80%] bg-primary/20 rounded-full blur-[100px] dark:bg-primary/10" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[80%] bg-accent/30 rounded-full blur-[100px] dark:bg-accent/10" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="px-4 py-1.5 mb-6 rounded-full border border-border bg-muted/50 backdrop-blur-sm inline-flex items-center gap-2 animate-fade-in">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
            <span className="text-sm font-medium">Building the future of digital experiences</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight max-w-4xl mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Building the Future of Web with 
            <span className="gradient-text"> AI, Cloud & MERN</span>.
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
            From intelligent solutions to stunning visuals — we build, you grow.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-6">
              Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary dark:text-primary-foreground hover:bg-primary/10 px-6">
              Explore Projects
            </Button>
          </div>
          
          {/* Scroll Down Indicator */}
          <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce mt-16">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center">
              <div className="w-1.5 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse-soft" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;