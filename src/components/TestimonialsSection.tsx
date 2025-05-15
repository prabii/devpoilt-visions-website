
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, MessageSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
};

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 0,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechVista Inc.",
      quote: "Devpoilt transformed our digital presence with their custom landing page. The conversion rate has increased by 45% since the launch, and the AI-driven features have revolutionized how we interact with customers.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      rating: 5
    },
    {
      id: 1,
      name: "Michael Chen",
      role: "Founder",
      company: "InnovateSphere",
      quote: "The AI solution Devpoilt built for us has revolutionized how we approach customer data. Their team's expertise in both AI and user experience design is truly impressive. Worth every penny of our $90,000 investment.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      rating: 5
    },
    {
      id: 2,
      name: "Jessica Rivera",
      role: "VP of Marketing",
      company: "GrowthWave",
      quote: "Working with Devpoilt was a game-changer for our company. Their full-stack development capabilities and attention to detail delivered a product that exceeded our expectations and helped us scale to new heights.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      rating: 5
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-muted/30 to-transparent dark:from-muted/10" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-muted/30 to-transparent dark:from-muted/10" />
        <div className="absolute top-1/3 left-[20%] w-[30%] h-[40%] bg-primary/10 rounded-full blur-[130px] animate-pulse-soft" />
        <div className="absolute bottom-1/3 right-[20%] w-[35%] h-[30%] bg-accent/10 rounded-full blur-[150px] animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4 animate-fade-in">Client Success Stories</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            What Our <span className="gradient-text">Clients Say</span> About Us
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            From startups to Fortune 500 companies, our clients trust us to deliver exceptional digital experiences that drive real business results.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div 
            ref={testimonialRef}
            className={`glass-card relative overflow-hidden p-8 md:p-14 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="absolute top-10 left-10 opacity-20 transform -rotate-12">
              <MessageSquare className="w-40 h-40 text-primary" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-primary/20">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 border border-border">
                    <div className="bg-primary/10 backdrop-blur-sm rounded-full p-1">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-2">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl font-medium italic mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div>
                  <h4 className="font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-primary">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              className="rounded-full h-10 w-10 border-primary/50 hover:bg-primary/10 hover:text-primary"
              disabled={isAnimating}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentTestimonial === index ? 'bg-primary w-6' : 'bg-primary/30'}`}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentTestimonial(index);
                      setIsAnimating(false);
                    }, 300);
                  }}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonial}
              className="rounded-full h-10 w-10 border-primary/50 hover:bg-primary/10 hover:text-primary"
              disabled={isAnimating}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
