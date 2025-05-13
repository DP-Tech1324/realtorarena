
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

const Hero = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced hero images with better quality options
  const heroImages = [
    "https://images.unsplash.com/photo-1600573472591-61770e120a4a?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
  ];

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
