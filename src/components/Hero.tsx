import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import PropertySearch from '@/components/PropertySearch';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const heroImages = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
  ];
  const navigate = useNavigate();
  const handleSearchClick = () => {
    navigate('/listings');
  };

  // Autoplay logic
  useEffect(() => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => { if (autoPlayRef.current) clearTimeout(autoPlayRef.current); };
  }, [activeIndex, heroImages.length]);

  // Animation variants
  const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } },
  };
  const subTextVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.6 } },
  };
  const badgeVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 1 + i * 0.15 }
    }),
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 z-0">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div
                  className={`w-full h-full bg-cover bg-center transition-transform duration-700 ${activeIndex === index ? 'scale-105' : ''}`}
                  style={{
                    backgroundImage: `url('${image}')`,
                    filter: 'brightness(0.60)'
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-realtor-navy/60 to-realtor-navy/90 z-10"></div>

      <div className="container relative z-20 px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* --- Animated Heading --- */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-xl"
            variants={textVariant}
            initial="hidden"
            animate="visible"
          >
            Find Your <span className="text-realtor-gold">Dream Home</span> in <span className="text-realtor-gold">Prime Locations</span>
          </motion.h1>
          {/* --- Animated Subheading --- */}
          <motion.p
            className="text-xl text-white/90 mb-8"
            variants={subTextVariant}
            initial="hidden"
            animate="visible"
          >
            We help you discover the perfect property that matches your lifestyle and aspirations.
          </motion.p>
          {/* Property Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
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
