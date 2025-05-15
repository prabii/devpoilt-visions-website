
import { Github, Linkedin, Instagram } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type TeamMember = {
  id: number;
  name: string;
  role: string;
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
      className="group relative overflow-hidden rounded-2xl animate-fade-in" 
      style={{ animationDelay: `${member.id * 100}ms` }}
    >
      <div className="glass-card p-8 h-full transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl">
        <div className="relative mb-8 mx-auto w-36 h-36">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 rounded-full animate-pulse-soft"></div>
          <Avatar className="w-full h-full border-2 border-primary/20 p-1">
            <AvatarImage 
              src={member.image} 
              alt={member.name}
              className="object-cover w-full h-full rounded-full transition-transform duration-500 group-hover:scale-105" 
            />
            <AvatarFallback className="text-2xl font-bold">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full blur-sm"></div>
        </div>
        
        {}
        
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-primary font-medium mb-3">{member.role}</p>
        <p className="text-muted-foreground text-sm mb-6">{member.bio}</p>
        
        <div className="flex justify-center gap-3">
          {member.social.linkedin && (
            <a 
              href={member.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-md border border-white/10 hover:bg-primary/10 hover:text-primary transition-all transform hover:scale-110 hover:shadow-md"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {member.social.github && (
            <a 
              href={member.social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-md border border-white/10 hover:bg-primary/10 hover:text-primary transition-all transform hover:scale-110 hover:shadow-md"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {member.social.instagram && (
            <a 
              href={member.social.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-md border border-white/10 hover:bg-primary/10 hover:text-primary transition-all transform hover:scale-110 hover:shadow-md"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const team: TeamMember[] = [
    {
      id: 0,
      name: "Satya Malleti",
      role: "UI UX Designer and Frontend developer ",
      bio: "Visionary leader with 4+ years experience building scalable cloud architecture that transforms business operations.",
      image: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 1,
      name: "Bhargav Yaswanth",
      role: "Full Stack & Andriod Developer",
      bio: "Design-focused developer creating intuitive interfaces with pixel-perfect precision and unmatched user experiences.",
      image: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light",
      social: {
        linkedin: "#",
        github: "#",
        instagram: "#"
      }
    },
    {
      id: 2,
      name: "Prabhas Satti",
      role: "Full Stack & AI developer",
      bio: "Revolutionary technologist integrating decentralized solutions for enterprises with a focus on security and innovation.",
      image: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortRound&accessoriesType=Round&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=Brown&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Diamond&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor=Light",
      social: {
        linkedin: "#",
        github: "#",
        instagram: "#"
      }
    },
    {
      id: 3,
      name: "Sharan Medamoni",
      role: "AI/ML & Frontend Engineer",
      bio: "AI enthusiast merging data science with beautiful user experiences to create intelligent, self-learning applications.",
      image: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesar&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
      social: {
        linkedin: "#",
        github: "#",
        instagram: "#"
      }
    }
  ];

  return (
    <section id="team" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] dark:bg-primary/5" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-accent/20 rounded-full blur-[100px] dark:bg-accent/5 animate-pulse-soft" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4 animate-fade-in">Our Team</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Meet the <span className="gradient-text">Visionaries Behind</span> Devpoilt
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Our elite team combines decades of experience in cloud architecture, artificial intelligence, and cutting-edge development technologies.
          </p>
        </div>

        <ScrollArea className="relative" style={{ height: 'auto' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};

export default TeamSection;
