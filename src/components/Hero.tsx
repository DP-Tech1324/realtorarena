
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { 
  Select as SelectPrimitive,
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search } from 'lucide-react';

const Hero = () => {
  const [priceRange, setPriceRange] = React.useState("");
  const [propertyType, setPropertyType] = React.useState("");
  const [location, setLocation] = React.useState("");

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1600573472591-61770e120a4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          filter: 'brightness(0.7)'
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-realtor-navy/50 to-realtor-navy/70"></div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto">
        {/* Hero Text */}
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your Dream Home in Prime Locations
          </h1>
          <p className="text-xl text-white/90 mb-8">
            We help you discover the perfect property that matches your lifestyle and aspirations
          </p>

          {/* Property Search Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <Input 
                  placeholder="Enter location, ZIP, or neighborhood" 
                  className="w-full" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="md:col-span-3">
                <SelectPrimitive value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                <Button className="w-full bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy">
                  <Search size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
