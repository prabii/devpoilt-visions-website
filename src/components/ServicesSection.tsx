
import { useState } from 'react';
import { Code, Cloud, Database, Layout, Zap, Server, Rocket, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  features: string[];
  delay: string;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description,
  features,
  delay,
  isExpanded,
  toggleExpand
}: ServiceCardProps) => {
  return (
    <Card 
      onClick={toggleExpand}
      className={`relative group neo-glass transition-all duration-500 animate-fade-in overflow-hidden cursor-pointer
        ${isExpanded ? 'h-[340px] md:h-[360px]' : 'h-[200px]'}
      `}
      style={{ animationDelay: delay }}
    >
      <CardContent className="p-6 sm:p-8 flex flex-col h-full">
        <div className="mb-5 p-3 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl w-fit">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className={`transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-4"></div>
          <h4 className="text-sm font-medium mb-2">Key Features:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/70"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="absolute bottom-4 right-4 w-6 h-6 flex items-center justify-center rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors">
          <div className={`w-4 h-0.5 bg-current transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-90'}`}></div>
          <div className="w-0.5 h-4 bg-current absolute"></div>
        </div>
      </CardContent>
      
      {/* Enhanced glassmorphism effects */}
      <div className="absolute inset-0 border border-primary/0 rounded-xl transition-all duration-500 group-hover:border-primary/50" />
      
      {/* Enhanced hover glow effect */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-10 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
    </Card>
  );
};

const ServicesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const services = [
    {
      icon: Layout,
      title: "Premium Landing Pages",
      description: "Stunning, conversion-optimized landing pages built with cutting-edge design principles.",
      features: [
        "Responsive & mobile-first design",
        "SEO optimization built-in",
        "60+ fps smooth animations",
        "A/B testing ready"
      ],
      delay: "0ms"
    },
    {
      icon: Rocket,
      title: "Enterprise AI Solutions",
      description: "Leverage powerful AI/ML models to transform your business operations and analytics.",
      features: [
        "Custom ML model training",
        "Predictive analytics dashboards",
        "Natural language processing",
        "Computer vision integration"
      ],
      delay: "100ms"
    },
    {
      icon: Cloud,
      title: "Cloud-Native Applications",
      description: "Scalable cloud architecture that grows with your business needs and traffic demands.",
      features: [
        "Auto-scaling infrastructure",
        "99.99% uptime guarantee",
        "Global CDN distribution",
        "Real-time monitoring"
      ],
      delay: "200ms"
    },
    {
      icon: Code,
      title: "MERN Stack Development",
      description: "Full-stack solutions using MongoDB, Express, React, and Node.js for optimal performance.",
      features: [
        "Server-side rendering",
        "GraphQL API integration",
        "State-of-the-art security",
        "Blazing fast performance"
      ],
      delay: "300ms"
    },
    {
      icon: Database,
      title: "Blockchain Integration",
      description: "Secure, transparent blockchain solutions for next-generation applications and services.",
      features: [
        "Smart contract development",
        "DeFi application architecture",
        "NFT marketplace creation",
        "Crypto payment gateways"
      ],
      delay: "400ms"
    },
    {
      icon: Server,
      title: "DevOps Excellence",
      description: "Streamlined CI/CD pipelines and infrastructure automation for rapid development cycles.",
      features: [
        "Containerized deployments",
        "Infrastructure as code",
        "Zero-downtime releases",
        "Comprehensive monitoring"
      ],
      delay: "500ms"
    },
    {
      icon: Star,
      title: "UI/UX Mastery",
      description: "User-centered design that delights customers and drives engagement metrics through the roof.",
      features: [
        "User research & testing",
        "Interactive prototyping",
        "Accessibility compliance",
        "Motion design & micro-interactions"
      ],
      delay: "600ms"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed up your existing applications with our expert performance tuning and optimization.",
      features: [
        "Core Web Vitals improvement",
        "Database query optimization",
        "Asset delivery optimization",
        "Caching strategies"
      ],
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
              features={service.features}
              delay={service.delay}
              isExpanded={expandedIndex === index}
              toggleExpand={() => toggleExpand(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
