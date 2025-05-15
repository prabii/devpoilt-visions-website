import { Code, Cloud, Database, Layout, Zap, Server, Rocket, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Define CSS Keyframes for Anim defining animations consistent with the theme
const styles = `
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glowPulse {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    transform: scale(1.2);
  }
}
`;

interface ServiceCardProps { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  features: string[];
  delay: string;
}

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description,
  delay,
}: ServiceCardProps) => {
  return (
    <Card 
      className={`relative group neo-glass transition-all duration-500 animate-fade-in overflow-hidden
        bg-white/10 dark:bg-gray-900/10 backdrop-blur-md shadow-lg
        h-[300px] md:h-[320px] // Fixed height to accommodate all content
      `}
      style={{ animationDelay: delay }}
    >
      <CardContent className="p-6 sm:p-8 flex flex-col h-full">
        <div className="mb-5 p-3 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl w-fit">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4"></div>
        <ul className="text-sm text-muted-foreground space-y-1">
          {}
        </ul>
      </CardContent>
      
      {/* Enhanced glassmorphism effects */}
      <div className="absolute inset-0 border border-primary/0 rounded-xl transition-all duration-500 group-hover:border-primary/50" />
      
      {/* Enhanced hover glow effect */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-10 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
    </Card>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: Layout,
      title: "Premium Landing Pages",
      description: "Stunning, conversion-optimized landing pages built with cutting-edge design principles.",
      delay: "0ms"
    },
    {
      icon: Rocket,
      title: "Enterprise AI Solutions",
      description: "Leverage powerful AI/ML models to transform your business operations and analytics.",
      delay: "100ms"
    },
    {
      icon: Cloud,
      title: "Cloud-Native Applications",
      description: "Scalable cloud architecture that grows with your business needs and traffic demands.",
      delay: "200ms"
    },
    {
      icon: Code,
      title: "MERN Stack Development",
      description: "Full-stack solutions using MongoDB, Express, React, and Node.js for optimal performance.",
      delay: "300ms"
    },
    {
      icon: Database,
      title: "Blockchain Integration",
      description: "Secure, transparent blockchain solutions for next-generation applications and services.",
      delay: "400ms"
    },
    {
      icon: Server,
      title: "DevOps Excellence",
      description: "Streamlined CI/CD pipelines and infrastructure automation for rapid development cycles.",
      delay: "500ms"
    },
    {
      icon: Star,
      title: "UI/UX Mastery",
      description: "User-centered design that delights customers and drives engagement metrics through the roof.",
      delay: "600ms"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed up your existing applications with our expert performance tuning and optimization.",
      delay: "700ms"
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px] dark:bg-accent/5" />
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-primary/20 rounded-full blur-[100px] dark:bg-primary/5 animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4 animate-fade-in">Our Services</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <span className="gradient-text">Premium Solutions</span> for Modern Businesses
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            We combine cutting-edge technologies with exceptional design to deliver <span className="text-primary font-semibold">enterprise-grade solutions</span> that outperform the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;