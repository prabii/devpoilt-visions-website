
import { Code, Cloud, Database, Layout, Zap, Server, Rocket, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Define CSS Keyframes for animations
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
  features,
  delay,
}: ServiceCardProps) => {
  return (
    <Card 
      className={`relative group neo-glass transition-all duration-500 animate-fade-in overflow-hidden
        bg-white/10 dark:bg-gray-900/10 backdrop-blur-md shadow-lg hover:shadow-xl
        h-full transform hover:-translate-y-2 cursor-pointer
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
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
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
    </Card>
  );
};

const ThreeJSBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add directional light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x8B5CF6, // Purple color to match the theme
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Create the particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Create a mesh representing company's logo or shape
    const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x9b87f5,
      shininess: 100,
      transparent: true,
      opacity: 0.7
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 0, -5);
    scene.add(torus);
    
    // Position camera
    camera.position.z = 5;
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect
    const mousePosition = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the particles system
      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.0005;
      
      // Move the torus based on mouse position
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      torus.position.x = mousePosition.x * 0.5;
      torus.position.y = mousePosition.y * 0.5;
      
      renderer.render(scene, camera);
    };
    animate();
    
    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
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
      <ThreeJSBackground />

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
