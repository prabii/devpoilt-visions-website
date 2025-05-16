
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ThreeText from '@/components/ThreeText';
import { Monitor, Image, FileSearch } from 'lucide-react';

const DesignSeoSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const services = [
    {
      id: 1,
      title: "Logo Design",
      description: "Create memorable brand identities with our custom logo design services. We craft unique visual representations that capture the essence of your business.",
      icon: <Image className="h-8 w-8 text-primary" />,
      threeDText: "LOGO"
    },
    {
      id: 2,
      title: "Digital Posters",
      description: "Engage your audience with eye-catching digital posters designed for maximum impact. Perfect for social media, digital advertising, and promotional campaigns.",
      icon: <Monitor className="h-8 w-8 text-primary" />,
      threeDText: "POSTERS"
    },
    {
      id: 3,
      title: "SEO Optimization",
      description: "Boost your online visibility with our comprehensive SEO services. We optimize your digital presence to rank higher in search results and drive organic traffic.",
      icon: <FileSearch className="h-8 w-8 text-primary" />,
      threeDText: "SEO"
    }
  ];

  return (
    <section id="design-seo" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-background to-background/50"></div>
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] dark:bg-primary/10"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] dark:bg-accent/10"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Design & <span className="gradient-text">SEO Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Elevate your brand's presence with our creative design and search engine optimization services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="relative overflow-hidden glass-card border-primary/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute -top-4 -right-4 opacity-30 pointer-events-none">
                <ThreeText 
                  text={service.threeDText} 
                  size={0.7}
                  height={0.2}
                  position={[0, 0, 0]}
                  color="#7c3aed"
                  containerHeight={140} 
                  interactive={false}
                  rotationSpeed={hoveredCard === service.id ? 0.03 : 0.01}
                />
              </div>
              
              <CardContent className="p-8">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignSeoSection;
