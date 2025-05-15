
import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden h-[400px] animate-fade-in" style={{ animationDelay: `${project.id * 100}ms` }}>
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
        style={{ backgroundImage: `url(${project.image})` }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
      
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
        <span className="text-sm text-primary-foreground bg-primary/90 px-3 py-1 rounded-full w-fit mb-4">
          {project.category}
        </span>
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-5 max-w-sm opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {project.description}
        </p>
        <a 
          href={project.link}
          className="flex items-center gap-2 text-white font-semibold transition-all duration-300 hover:text-primary"
        >
          <span>View Project</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      id: 0,
      title: "AI-Powered CRM Dashboard",
      category: "Enterprise Solution",
      description: "A custom CRM solution with AI-driven insights and analytics for a Fortune 500 company.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80",
      link: "#"
    },
    {
      id: 1,
      title: "E-commerce Mobile App",
      category: "Mobile Development",
      description: "A full-featured e-commerce app with recommendation engine and secure payment processing.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Cloud-based Analytics Platform",
      category: "Cloud Solution",
      description: "A scalable data analytics platform processing millions of data points in real-time.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "Corporate Landing Page",
      category: "Web Design",
      description: "A high-converting landing page for a financial services company with a 43% increase in lead generation.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32 relative bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4 animate-fade-in">Our Work</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Recent <span className="gradient-text">Projects</span>
            </h3>
          </div>
          <Button variant="outline" className="border-primary text-primary dark:text-primary-foreground hover:bg-primary/10 animate-fade-in" style={{ animationDelay: '200ms' }}>
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
