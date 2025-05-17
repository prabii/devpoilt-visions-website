import { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface ContactSectionProps {
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

const ContactSection = ({ contactInfo }: ContactSectionProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      toast({
        title: 'Message Submitted',
        description: 'DevPilot team will contact you soon',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/10" />
        
        {/* Abstract shapes */}
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[130px] animate-pulse-soft" />
        <div className="absolute bottom-[20%] left-[10%] w-[20%] h-[40%] bg-accent/10 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4 animate-fade-in">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Let's Build Something <span className="gradient-text">Amazing Together</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Have a project in mind? We'd love to hear from you. Let's discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Call Us</h4>
                  <p className="text-primary">{contactInfo.phone}</p>
                  <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am-6pm IST</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email Us</h4>
                  <p className="text-primary">{contactInfo.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">We respond within 24 hours</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Our Location</h4>
                  <p className="text-primary">{contactInfo.address}</p>
                  <p className="text-sm text-muted-foreground mt-1">Visit us for a coffee</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2 glass-card p-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-white/10 backdrop-blur-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-white/10 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background/50 border-white/10 backdrop-blur-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[120px] bg-background/50 border-white/10 backdrop-blur-sm"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full group"
              >
                {isSubmitting ? (
                  <Send className="mr-2 h-4 w-4 animate-pulse" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Sending Message..." : "Send Message"}
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;