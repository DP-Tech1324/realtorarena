
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import PropertySearch from '@/components/PropertySearch';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { ArrowRight } from 'lucide-react';
import { MapPin, Search, ShieldCheck, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// --- ADD THIS ---
import { motion } from 'framer-motion';

const Hero = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced hero images with better quality options
  const heroImages = [
    "https://images.unsplash.com/photo-1600573472591-61770e120a4a?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
  ];
  const navigate = useNavigate();
  const handleSearchClick = () => {
    navigate('/listings');
  };

  // Setup autoplay functionality
  useEffect(() => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    
    autoPlayRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [activeIndex, heroImages.length]);

  return (
    <section className="relative w-full h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Image Carousel Background */}
    
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        <Carousel className="w-full h-full" opts={{ loop: true, duration: 50 }}>
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ 
                    backgroundImage: `url('${image}')`,
                    filter: 'brightness(0.65)'
                  }}
                ></div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-realtor-navy/60 to-realtor-navy/80 z-10"></div>

      {/* Content */}
      <div className="container relative z-20 px-4 mx-auto">
        {/* Hero Text */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Find Your Dream Home in <span className="text-realtor-gold">Prime Locations</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            We help you discover the perfect property that matches your lifestyle and aspirations
          </p>

          {/* Property Search Form */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <PropertySearch variant="hero" className="max-w-4xl mx-auto" />
            <div className="mt-4 flex justify-end">
              <Button variant="link" className="text-white flex items-center gap-1 hover:text-realtor-gold">
                Advanced Search <ArrowRight size={16} />
              </Button>
            </div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
          <div className="relative animate-fade-in">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Quick Property Search</h3>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-blue-100">Location</label>
                  <input 
                    type="text" 
                    placeholder="Enter city, neighborhood, or postal code"
                    className="w-full px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/30 transition-all duration-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-blue-100">Min Price</label>
                    <select className="w-full px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300">
                      <option value="">Any</option>
                      <option value="500000">$500K</option>
                      <option value="750000">$750K</option>
                      <option value="1000000">$1M</option>
                      <option value="1500000">$1.5M</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3 text-blue-100">Max Price</label>
                    <select className="w-full px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300">
                      <option value="">Any</option>
                      <option value="1000000">$1M</option>
                      <option value="1500000">$1.5M</option>
                      <option value="2000000">$2M</option>
                      <option value="3000000">$3M+</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-blue-100">Bedrooms</label>
                    <select className="w-full px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300">
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3 text-blue-100">Property Type</label>
                    <select className="w-full px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300">
                      <option value="">All Types</option>
                      <option value="house">House</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                </div>
                <Button 
                  onClick={handleSearchClick}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Search className="mr-3 h-5 w-5" />
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
            
          </motion.div>

          {/* --- Animated Trust Badges --- */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: <MapPin className="text-realtor-gold" size={20} />, label: 'GTA & Southern Ontario' },
              { icon: <ShieldCheck className="text-realtor-gold" size={20} />, label: 'Trusted & Licensed Realtor' },
              { icon: <Star className="text-realtor-gold" size={20} />, label: 'Top Client Reviews' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow"
                custom={i}
                
                initial="hidden"
                animate="visible"
              >
                {item.icon}
                <span className="text-realtor-navy font-medium text-sm">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Hero;
