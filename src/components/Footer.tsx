
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, LinkedIn, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Store newsletter signup as an inquiry
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: 'Newsletter Subscriber',
          email: email,
          message: 'Newsletter subscription request',
          inquiry_type: 'general'
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-realtor-navy text-white">
      {/* Newsletter Section */}
      <div className="bg-realtor-gold py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-realtor-navy mb-4">
            Stay Updated with Market Insights
          </h3>
          <p className="text-realtor-navy/80 mb-6 max-w-2xl mx-auto">
            Get the latest real estate news, market trends, and exclusive property listings delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-realtor-navy hover:bg-realtor-navy/90 text-white"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">RealtorArena</h3>
              <p className="text-gray-300 mb-4">
                Your trusted partner in finding the perfect property. We're committed to making your real estate journey smooth and successful.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-300 hover:text-realtor-gold cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-gray-300 hover:text-realtor-gold cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-gray-300 hover:text-realtor-gold cursor-pointer transition-colors" />
                <LinkedIn className="h-5 w-5 text-gray-300 hover:text-realtor-gold cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-realtor-gold transition-colors">Home</a></li>
                <li><a href="/properties" className="text-gray-300 hover:text-realtor-gold transition-colors">Properties</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-realtor-gold transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-realtor-gold transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="/buyers" className="text-gray-300 hover:text-realtor-gold transition-colors">Buying</a></li>
                <li><a href="/sellers" className="text-gray-300 hover:text-realtor-gold transition-colors">Selling</a></li>
                <li><a href="/investment" className="text-gray-300 hover:text-realtor-gold transition-colors">Investment</a></li>
                <li><a href="/calculators" className="text-gray-300 hover:text-realtor-gold transition-colors">Calculators</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-realtor-gold" />
                  <span className="text-gray-300">(416) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-realtor-gold" />
                  <span className="text-gray-300">info@realtorarena.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-realtor-gold" />
                  <span className="text-gray-300">Toronto, Ontario</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} RealtorArena. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-300 hover:text-realtor-gold text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-300 hover:text-realtor-gold text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
