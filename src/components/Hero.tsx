
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select as SelectPrimitive,
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Search, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [priceRange, setPriceRange] = React.useState("");
  const [propertyType, setPropertyType] = React.useState("");
  const [location, setLocation] = React.useState("");

  // Enhanced hero images with better quality options
  const heroImages = [
    "https://images.unsplash.com/photo-1600573472591-61770e120a4a?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&q=85&w=2070",
  ];

  return (
    <section className="relative w-full h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 z-0">
        <Carousel className="w-full h-full" opts={{ loop: true, duration: 50 }} autoPlay={true}>
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <Input 
                  placeholder="Enter location, ZIP, or neighborhood" 
                  className="w-full border-2 border-gray-200 focus:border-realtor-gold h-11" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="md:col-span-3">
                <SelectPrimitive value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-realtor-gold">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </SelectPrimitive>
              </div>
              <div className="md:col-span-3">
                <SelectPrimitive value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-realtor-gold">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0-500000">Under $500k</SelectItem>
                      <SelectItem value="500000-1000000">$500k - $1M</SelectItem>
                      <SelectItem value="1000000-2000000">$1M - $2M</SelectItem>
                      <SelectItem value="2000000+">$2M+</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </SelectPrimitive>
              </div>
              <div className="md:col-span-1">
                <Button className="w-full h-11 bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy transition-all duration-300 hover:shadow-md">
                  <Search size={20} />
                </Button>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="link" className="text-realtor-navy flex items-center gap-1 hover:text-realtor-gold">
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
