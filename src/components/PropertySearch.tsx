
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PropertySearch: React.FC = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query params
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceRange) params.append('price', priceRange);
    
    // Navigate to properties page with search params
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5">
          <Input 
            placeholder="Enter location, city, or postal code" 
            className="w-full" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="md:col-span-3">
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-3">
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all-prices">All Prices</SelectItem>
                <SelectItem value="0-500000">Under $500k</SelectItem>
                <SelectItem value="500000-1000000">$500k - $1M</SelectItem>
                <SelectItem value="1000000-2000000">$1M - $2M</SelectItem>
                <SelectItem value="2000000+">$2M+</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1">
          <Button type="submit" className="w-full bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy">
            <Search size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearch;
