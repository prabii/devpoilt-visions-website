import { useState, useRef } from 'react';
import { ArrowRight, ExternalLink, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Define CSS Keyframes for Glowing Effect
const styles = `
@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.7), 0 0 20px rgba(59, 130, 246, 0.5);
  }
  100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3);
  }
}
`;

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
      className={`group relative ${project.featured ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetRotation();
      }}
    >
      <Card 
        className="animate-fade-in overflow-hidden h-full transform transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105"
        style={{ 
          animationDelay: `${project.id * 100}ms`,
          transform: isHovered ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'none',
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
          
          {/* Overlay gradient - removed on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full bg-black/20 group-hover:bg-black/0 transition-all duration-300">
            {project.featured && (
              <div className="absolute top-6 right-6 flex items-center gap-1 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span className="text-xs font-medium">Featured Project</span>
              </div>
            )}
            
            {/* Done by Us Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-1 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Done by Us</span>
            </div>
            
            <span className="text-sm text-primary-foreground bg-primary/90 px-3 py-1 rounded-full w-fit mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.category}
            </span>
            
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.title}
            </h3>
            
            <p className="text-gray-300 mb-5 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.description}
            </p>
            
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.techStack.map((tech, index) => (
                <span key={index} className="text-xs bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-white/80">
                  {tech}
                </span>
              ))}
            </div>
            
            <a 
              href={project.link}
              className="z-20 flex items-center gap-2 text-white font-semibold transition-all duration-300 group/link opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full hover:from-blue-600 hover:to-indigo-700 animate-glow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1" />
            </a>
          </div>
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
      link: "https://www.tableau.com/solutions/ai-analytics",
      techStack: ["React", "TensorFlow.js", "AWS", "D3.js"]
    },
    {
      id: 1,
      title: "NextGen E-commerce Platform",
      category: "Full Stack Development",
      description: "A lightning-fast e-commerce solution with personalized recommendations and seamless payment processing.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
      link: "https://www.bigcommerce.com/",
      techStack: ["Next.js", "MongoDB", "Stripe", "Redux"]
    },
    {
      id: 2,
      title: "Blockchain Asset Management",
      category: "Distributed Systems",
      description: "Secure, transparent asset management system built on blockchain with real-time transaction verification.",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80",
      link: "https://www.chainalysis.com/solutions/asset-management/",
      techStack: ["Solidity", "Ethereum", "Web3.js", "React"]
    },
    {
      id: 3,
      title: "Interactive Brand Experience",
      category: "UI/UX Design",
      description: "Award-winning interactive website for a luxury brand, resulting in 300% increase in user engagement.",
      image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80",
      link: "https://www.burberry.com/",
      techStack: ["Three.js", "GSAP", "React", "Tailwind CSS"]
    },
    {
      id: 4,
      title: "Cloud-Native Microservices",
      category: "Enterprise Architecture",
      description: "Highly available microservices architecture enabling seamless scaling for a global SaaS platform.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
      link: "https://www.redhat.com/en/topics/microservices",
      techStack: ["Kubernetes", "Docker", "Node.js", "MongoDB"]
    },
    {
      id: 6,
      title: "EdTech Learning Platform",
      category: "Education Technology",
      description: "An interactive learning platform with gamified courses, supporting over 50,000 students globally.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      link: "https://www.khanacademy.org/",
      techStack: ["React", "Firebase", "TypeScript", "GraphQL"]
    },
    {
      id: 7,
      title: "Real-Time Chat Application",
      category: "Communication Tool",
      description: "A scalable chat app with real-time messaging, supporting group chats and multimedia sharing.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80",
      link: "https://slack.com/",
      techStack: ["React", "Socket.io", "Node.js", "MongoDB"]
    },
    {
      id: 8,
      title: "Fitness Tracking App",
      category: "Mobile Development",
      description: "A mobile app for tracking workouts, nutrition, and goals with real-time analytics and social sharing.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80",
      link: "https://www.myfitnesspal.com/",
      techStack: ["React Native", "Firebase", "Node.js", "Express"]
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32 relative bg-muted/30 dark:bg-muted/10">
      <style>{styles}</style>
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px] animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px] md:auto-rows-[300px] lg:auto-rows-[350px]">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="h-full"
              style={{ 
                height: project.featured ? '700px' : '350px' 
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;