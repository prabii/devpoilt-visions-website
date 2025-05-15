
import { useState } from 'react';
import { ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
};

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 0,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechVista Inc.",
      quote: "Devpoilt transformed our digital presence with their custom landing page. The conversion rate has increased by 45% since the launch, and we couldn't be happier with the results.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 1,
      name: "Michael Chen",
      role: "Founder",
      company: "InnovateSphere",
      quote: "The AI solution Devpoilt built for us has revolutionized how we approach customer data. Their team's expertise in both AI and user experience design is truly impressive.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      name: "Jessica Rivera",
      role: "VP of Marketing",
      company: "GrowthWave",
      quote: "Working with Devpoilt was a game-changer for our company. Their full-stack development capabilities and attention to detail delivered a product that exceeded our expectations.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 md:py-32 relative bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4 animate-fade-in">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Don't just take our word for it - hear from some of our satisfied clients about their experiences.
          </p>
        </div>

        <div className="glass-card p-6 md:p-10 max-w-4xl mx-auto relative">
          <div className="absolute top-6 left-10 opacity-20">
            <MessageSquare className="w-32 h-32 text-primary" />
          </div>
          
          <div className="relative z-10">
            <blockquote className="text-xl md:text-2xl font-medium italic mb-8">
              "{testimonials[currentTestimonial].quote}"
            </blockquote>
            
            <div className="flex items-center">
              <img 
                src={testimonials[currentTestimonial].image} 
                alt={testimonials[currentTestimonial].name} 
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary/20"
              />
              <div>
                <h4 className="font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                <p className="text-muted-foreground">
                  {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevTestimonial}
            className="rounded-full h-10 w-10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextTestimonial}
            className="rounded-full h-10 w-10"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
