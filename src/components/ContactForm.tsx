
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. A member of our team will be in touch with you shortly.",
      });
      setIsLoading(false);
      // Reset form
      e.currentTarget.reset();
    }, 1500);
  };

  return (
    <section className="py-16 bg-realtor-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-3">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're looking to buy, sell, or just have questions, our team is here to help
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info Column */}
          <div className="lg:col-span-2 bg-realtor-navy text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="mr-4 h-6 w-6 text-realtor-gold flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Office Address</h4>
                  <address className="not-italic text-white/80">
                    123 Luxury Lane<br />
                    Beverly Hills, CA 90210<br />
                    United States
                  </address>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="mr-4 h-6 w-6 text-realtor-gold flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Call Us</h4>
                  <p className="text-white/80">Main: (555) 123-4567</p>
                  <p className="text-white/80">Support: (555) 987-6543</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="mr-4 h-6 w-6 text-realtor-gold flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Email Us</h4>
                  <p className="text-white/80">info@luxuryrealty.com</p>
                  <p className="text-white/80">support@luxuryrealty.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold mb-3">Office Hours</h4>
              <p className="text-white/80">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-white/80">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-white/80">Sunday: By Appointment Only</p>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-realtor-navy mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Your Name" 
                    required 
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    className="w-full" 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <Input 
                  id="phone" 
                  name="phone" 
                  placeholder="(XXX) XXX-XXXX"  
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input 
                  id="subject" 
                  name="subject" 
                  placeholder="How can we help you?" 
                  required 
                  className="w-full" 
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tell us more about your inquiry..." 
                  required 
                  className="w-full min-h-[150px]" 
                />
              </div>

              <div>
                <Button 
                  type="submit" 
                  className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy w-full font-medium text-lg py-6"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
