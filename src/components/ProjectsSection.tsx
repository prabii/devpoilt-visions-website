
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  featured?: boolean;
  techStack: string[];
};

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 5;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className={`group relative ${project.featured ? 'col-span-2 row-span-2' : ''}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetRotation();
      }}
    >
      <Card 
        className="animate-fade-in overflow-hidden h-full transform transition-all duration-500 group-hover:shadow-2xl"
        style={{ 
          animationDelay: `${project.id * 100}ms`,
          transform: isHovered ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'none',
          height: project.featured ? '600px' : '400px'
        }}
      >
        <div className="relative h-full">
          {/* Background image with parallax effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            style={{ 
              backgroundImage: `url(${project.image})`,
              transform: isHovered ? `translateZ(-20px) scale(1.12)` : 'none' 
            }} 
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
          
          {/* Content */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
            {project.featured && (
              <div className="absolute top-6 right-6 flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span className="text-xs font-medium">Featured Project</span>
              </div>
            )}
            
            <span className="text-sm text-primary-foreground bg-primary/90 px-3 py-1 rounded-full w-fit mb-4 backdrop-blur-sm">
              {project.category}
            </span>
            
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-foreground transition-colors">
              {project.title}
            </h3>
            
            <p className="text-gray-300 mb-5 max-w-md opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              {project.description}
            </p>
            
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-5 opacity-0 translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
              {project.techStack.map((tech, index) => (
                <span key={index} className="text-xs bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-white/80">
                  {tech}
                </span>
              ))}
            </div>
            
            <a 
              href={project.link}
              className="flex items-center gap-2 text-white font-semibold transition-all duration-300 hover:text-primary group/link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1" />
            </a>
          </div>
          
          {/* Glass effect at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent backdrop-blur-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </Card>
    </div>
  );
};

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      id: 0,
      title: "AI-Driven Analytics Dashboard",
      category: "Enterprise Solution",
      featured: true,
      description: "A sophisticated analytics platform with AI-powered insights for Fortune 500 company, processing over 10 million data points daily.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      link: "#",
      techStack: ["React", "TensorFlow.js", "AWS", "D3.js"]
    },
    {
      id: 1,
      title: "NextGen E-commerce Platform",
      category: "Full Stack Development",
      description: "A lightning-fast e-commerce solution with personalized recommendations and seamless payment processing.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
      link: "#",
      techStack: ["Next.js", "MongoDB", "Stripe", "Redux"]
    },
    {
      id: 2,
      title: "Blockchain Asset Management",
      category: "Distributed Systems",
      description: "Secure, transparent asset management system built on blockchain with real-time transaction verification.",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80",
      link: "#",
      techStack: ["Solidity", "Ethereum", "Web3.js", "React"]
    },
    {
      id: 3,
      title: "Interactive Brand Experience",
      category: "UI/UX Design",
      description: "Award-winning interactive website for a luxury brand, resulting in 300% increase in user engagement.",
      image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80",
      link: "#",
      techStack: ["Three.js", "GSAP", "React", "Tailwind CSS"]
    },
    {
      id: 4,
      title: "Cloud-Native Microservices",
      category: "Enterprise Architecture",
      description: "Highly available microservices architecture enabling seamless scaling for a global SaaS platform.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
      link: "#",
      techStack: ["Kubernetes", "Docker", "Node.js", "MongoDB"]
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32 relative bg-muted/30 dark:bg-muted/10">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px] animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4 animate-fade-in">Our Portfolio</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6 md:mb-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Transformative <span className="gradient-text">Digital Experiences</span>
            </h3>
          </div>
          <Button 
            variant="outline" 
            className="border-primary text-primary dark:text-primary-foreground hover:bg-primary/10 animate-fade-in group"
            style={{ animationDelay: '200ms' }}
          >
            <span>View All Projects</span>
            <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
