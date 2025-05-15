
import { Code, Cloud, Database, Layout } from 'lucide-react';

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description,
  delay
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  delay: string;
}) => {
  return (
    <div 
      className="relative group glass-card p-6 sm:p-8 flex flex-col h-full animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <div className="mb-5 p-3 bg-primary/10 rounded-xl w-fit">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground flex-grow">{description}</p>
      <div className="absolute inset-0 border border-primary/0 rounded-2xl transition-all duration-300 group-hover:border-primary/50" />
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: Layout,
      title: "Custom Landing Pages",
      description: "We design and develop fully responsive landing pages that convert visitors into customers, with a focus on user experience and conversion optimization.",
      delay: "0ms"
    },
    {
      icon: Database,
      title: "Enterprise AI & ML Solutions",
      description: "Leverage the power of artificial intelligence and machine learning with our custom-built enterprise solutions that solve complex business problems.",
      delay: "100ms"
    },
    {
      icon: Cloud,
      title: "Cloud-Native Applications",
      description: "Build scalable and reliable applications with our cloud-native development services, designed to handle traffic spikes and growing user bases.",
      delay: "200ms"
    },
    {
      icon: Code,
      title: "Full-Stack MERN Development",
      description: "End-to-end web application development using MongoDB, Express, React, and Node.js, delivering high-performance solutions for your business needs.",
      delay: "300ms"
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px] dark:bg-accent/5" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4 animate-fade-in">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Expert Solutions for Modern <span className="gradient-text">Digital Challenges</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            We combine cutting-edge technologies with exceptional design to deliver scalable and high-performing solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
