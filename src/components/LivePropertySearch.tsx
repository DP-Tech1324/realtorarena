
import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LivePropertySearch = () => {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Create search URL with parameters
    const searchUrl = `https://www.royallepage.ca/en/search/?q=${encodeURIComponent(location)}&minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}&propertyType=${encodeURIComponent(propertyType)}`;
    
    // Open in new tab
    window.open(searchUrl, '_blank');
  };

  return (
    <section className="bg-realtor-light-gray py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-4">Live Property Search</h2>
            <p className="text-lg text-realtor-dark-gray">
              Search for your dream home across our extensive property listings
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-realtor p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-realtor-dark-gray">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, neighborhood, or postal code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="bg-realtor-light-gray border-transparent focus:border-realtor-navy"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="property-type" className="text-realtor-dark-gray">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger id="property-type" className="bg-realtor-light-gray border-transparent focus:border-realtor-navy">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="min-price" className="text-realtor-dark-gray">Minimum Price</Label>
                  <Input
                    id="min-price"
                    type="number"
                    placeholder="$"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="bg-realtor-light-gray border-transparent focus:border-realtor-navy"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-price" className="text-realtor-dark-gray">Maximum Price</Label>
                  <Input
                    id="max-price"
                    type="number"
                    placeholder="$"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="bg-realtor-light-gray border-transparent focus:border-realtor-navy"
                  />
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-8"
                  variant="realtor-gold"
                >
                  Search Properties
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePropertySearch;
