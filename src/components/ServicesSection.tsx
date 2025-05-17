
import { Code, Cloud, Database, Layout, Zap, Server, Rocket, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useRef } from 'react';
import ThreeBackground from './ThreeBackground';

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
  features,
  delay,
}: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 8;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <Card 
      ref={cardRef}
      className={`relative group neo-glass transition-all duration-500 animate-fade-in overflow-hidden
        bg-white/10 dark:bg-gray-900/10 backdrop-blur-md shadow-lg hover:shadow-xl
        h-full transform hover:-translate-y-2 cursor-pointer
      `}
      style={{ 
        animationDelay: delay,
        transform: isHovered ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetRotation();
      }}
    >
      <CardContent className="p-6 sm:p-8 flex flex-col h-full">
        <div className="mb-5 p-3 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl w-fit transition-all duration-300 group-hover:scale-110 transform-gpu">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4 transition-all duration-300 group-hover:via-primary/60"></div>
        <ul className="text-sm text-muted-foreground space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start transition-all duration-300 transform group-hover:translate-x-1" style={{ transitionDelay: `${index * 50}ms` }}>
              <span className="text-primary mr-2">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      {/* Enhanced glassmorphism effects */}
      <div className="absolute inset-0 border border-primary/0 rounded-xl transition-all duration-500 group-hover:border-primary/50" />
      
      {/* Enhanced hover glow effect */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-10 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

      {/* 3D particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-accent rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-accent rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      )}
    </Card>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: Layout,
      title: "Premium Landing Pages",
      description: "Stunning, conversion-optimized landing pages built with cutting-edge design principles.",
      features: [
        "Responsive design that works on all devices",
        "Conversion-optimized layout and CTA placement",
        "SEO-friendly structure and markup"
      ],
      delay: "0ms"
    },
    {
      icon: Rocket,
      title: "Enterprise AI Solutions",
      description: "Leverage powerful AI/ML models to transform your business operations and analytics.",
      features: [
        "Custom AI model development and training",
        "Integration with existing business systems",
        "Predictive analytics and recommendations"
      ],
      delay: "100ms"
    },
    {
      icon: Cloud,
      title: "Cloud-Native Applications",
      description: "Scalable cloud architecture that grows with your business needs and traffic demands.",
      features: [
        "AWS, Azure, and GCP expertise",
        "Containerized applications with Kubernetes",
        "Auto-scaling infrastructure design"
      ],
      delay: "200ms"
    },
    {
      icon: Code,
      title: "MERN Stack Development",
      description: "Full-stack solutions using MongoDB, Express, React, and Node.js for optimal performance.",
      features: [
        "Single-page applications with React",
        "RESTful API development with Express",
        "MongoDB database design and optimization"
      ],
      delay: "300ms"
    },
    {
      icon: Database,
      title: "Blockchain Integration",
      description: "Secure, transparent blockchain solutions for next-generation applications and services.",
      features: [
        "Smart contract development and deployment",
        "Decentralized application (dApp) creation",
        "Cryptocurrency payment gateway integration"
      ],
      delay: "400ms"
    },
    {
      icon: Server,
      title: "DevOps Excellence",
      description: "Streamlined CI/CD pipelines and infrastructure automation for rapid development cycles.",
      features: [
        "Continuous integration and deployment",
        "Infrastructure as code with Terraform",
        "Monitoring and alerting systems setup"
      ],
      delay: "500ms"
    },
    {
      icon: Star,
      title: "UI/UX Mastery",
      description: "User-centered design that delights customers and drives engagement metrics through the roof.",
      features: [
        "User research and persona development",
        "Interactive prototyping and testing",
        "Accessibility-compliant designs"
      ],
      delay: "600ms"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed up your existing applications with our expert performance tuning and optimization.",
      features: [
        "Front-end performance auditing",
        "Database query optimization",
        "Server-side caching implementation"
      ],
      delay: "700ms"
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* 3D Background */}
      <ThreeBackground density={80} color="#7c3aed" secondaryColor="#8b5cf6" />

      {/* Fixed the style tag by removing jsx and global attributes */}
      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}
      </style>

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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
