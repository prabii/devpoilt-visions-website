
import { useState } from 'react';
import { Send, Mail, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[30%] h-[30%] bg-accent/20 rounded-full blur-[100px] dark:bg-accent/5" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[30%] h-[30%] bg-primary/20 rounded-full blur-[100px] dark:bg-primary/5" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="animate-fade-in">
            <h2 className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Get In Touch</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Build Something <span className="gradient-text">Amazing Together</span>
            </h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Ready to transform your digital presence? Reach out to discuss your project needs, and let's create something exceptional.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:contact@devpoilt.com" className="text-muted-foreground hover:text-primary">
                    contact@devpoilt.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Live Chat</h4>
                  <span className="text-muted-foreground">
                    Available Monday-Friday, 9AM-6PM EST
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 md:p-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white py-3" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} 
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
