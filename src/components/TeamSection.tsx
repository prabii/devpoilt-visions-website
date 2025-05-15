
import { Github, Linkedin, Instagram } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  position: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
};

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <div 
      className="group glass-card p-6 text-center animate-fade-in transform hover:translate-y-[-8px] transition-all duration-300" 
      style={{ animationDelay: `${member.id * 100}ms` }}
    >
      <div className="relative mb-6 mx-auto w-36 h-36 rounded-full overflow-hidden border-2 border-primary/20 p-1 shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
        <Avatar className="w-full h-full">
          <AvatarImage 
            src={member.image} 
            alt={member.name}
            className="object-cover w-full h-full rounded-full transition-transform duration-500 group-hover:scale-110" 
          />
          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>
      
      {member.position && (
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-2">
          {member.position}
        </span>
      )}
      
      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
      <p className="text-primary font-medium mb-3">{member.role}</p>
      <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
      
      <div className="flex justify-center gap-3">
        {member.social.linkedin && (
          <a 
            href={member.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors transform hover:scale-110"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {member.social.github && (
          <a 
            href={member.social.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors transform hover:scale-110"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {member.social.instagram && (
          <a 
            href={member.social.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors transform hover:scale-110"
          >
            <Instagram className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

const TeamSection = () => {
  const team: TeamMember[] = [
    {
      id: 0,
      name: "Satya Malleti",
      position: "CEO & Founder",
      role: "Cloud & Backend Specialist",
      bio: "Visionary leader building scalable cloud infrastructure that handles millions of users effortlessly.",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 1,
      name: "Bhargav Yaswanth",
      position: "Co-founder",
      role: "Full Stack & UI Developer",
      bio: "Crafting pixel-perfect interfaces with a passion for clean, efficient code.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400",
      social: {
        linkedin: "#",
        github: "#",
        instagram: "#"
      }
    },
    {
      id: 2,
      name: "Prabhas Satti",
      position: "Co-founder",
      role: "Full Stack & Blockchain Enthusiast",
      bio: "Bringing blockchain technology and web development together for next-gen solutions.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      social: {
        linkedin: "#",
        github: "#",
        instagram: "#"
      }
    },
    {
      id: 3,
      name: "Sharan Medamoni",
      position: "Co-founder",
      role: "AI/ML & Frontend Engineer",
      bio: "Integrating cutting-edge AI capabilities into beautiful, intuitive interfaces.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      social: {
        linkedin: "#",
        github: "#",
        instagram: "#"
      }
    }
  ];

  return (
    <section id="team" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] dark:bg-primary/5" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-accent/20 rounded-full blur-[100px] dark:bg-accent/5 animate-pulse-soft" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4 animate-fade-in">Our Team</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Meet the <span className="gradient-text">Minds Behind</span> Devpoilt
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Our team of visionary experts brings together years of experience across various domains of technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
