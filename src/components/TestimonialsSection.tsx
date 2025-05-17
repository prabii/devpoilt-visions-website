import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, MessageSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeBackground from './ThreeBackground';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 0,
      name: "Ravi Prabhu",
      role: "Famous Telugu Travel YouTuber",
      company: "Ravi Telugu Traveller",
      quote: "As a Telugu traveller who has explored 175 countries, I needed a website that could showcase my journey to the world. The team built an amazing website for me, capturing the essence of my travels perfectly. I’m super satisfied with their work—it’s helped me connect with my audience like never before!",
      rating: 5
    },
    {
      id: 1,
      name: "Dev",
      role: "CEO",
      company: "IDA India Drone Academy & Drone TV",
      quote: "Our vision at IDA India Drone Academy and Drone TV needed a strong digital presence. The team not only developed a fantastic website but also handled our digital marketing and created stunning digital posters. I’m truly impressed with their creativity and dedication—our online reach has grown significantly!",
      rating: 5
    },
    {
      id: 2,
      name: "Atchuta Rao",
      role: "Founder & Chairman",
      company: "Estah Society",
      quote: "At Estah Society, we aim to impact millions through sustainability and smart village initiatives. The team developed a website that beautifully reflects our mission of circular economy and ESG goals. Their work has given us a digital platform to inspire change, and I’m very pleased with their professional approach.",
      rating: 5
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!testimonialRef.current) return;
    const rect = testimonialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 5;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

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
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
      {/* 3D Background */}
      <ThreeBackground density={60} color="#8B5CF6" secondaryColor="#EC4899" className="opacity-50" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4 animate-fade-in">Client Success Stories</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            What Our <span className="gradient-text">Clients Say</span> About Us
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            From travel influencers to sustainable initiatives, our clients trust us to deliver exceptional digital solutions that amplify their impact.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div 
            ref={testimonialRef}
            className={`glass-card relative overflow-hidden p-8 md:p-14 transition-all duration-300 border border-primary/20 shadow-lg ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            style={{ 
              transform: isHovered ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'none',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              resetRotation();
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="absolute top-10 left-10 opacity-20 transform -rotate-12">
              <MessageSquare className="w-40 h-40 text-primary" />
            </div>
            
            <div className="relative z-10 flex flex-col gap-6 items-center">
              <div className="flex justify-center mb-2">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl font-medium italic mb-6 text-center max-w-3xl">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              
              <div className="text-center">
                <h4 className="font-bold text-lg text-primary">{testimonials[currentTestimonial].name}</h4>
                <p className="text-muted-foreground">
                  {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              className="rounded-full h-12 w-12 border-primary/50 hover:bg-primary/10 hover:text-primary"
              disabled={isAnimating}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === index ? 'bg-primary w-8' : 'bg-primary/30'}`}
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
              className="rounded-full h-12 w-12 border-primary/50 hover:bg-primary/10 hover:text-primary"
              disabled={isAnimating}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;