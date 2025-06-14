
import React from 'react';
import { Search, MapPin, Home, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ModernHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    city: string;
    property_type: string;
    min_price: string;
    max_price: string;
    bedrooms: string;
  };
  onFiltersChange: (filters: any) => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFiltersChange 
}) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Dream Home
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover exceptional properties with our modern real estate platform. 
              Your perfect home awaits.
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by location, type..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 h-12 bg-white/90 border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* City Filter */}
              <Select value={filters.city} onValueChange={(value) => onFiltersChange({...filters, city: value})}>
                <SelectTrigger className="h-12 bg-white/90 border-0">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Cities</SelectItem>
                  <SelectItem value="Toronto">Toronto</SelectItem>
                  <SelectItem value="Mississauga">Mississauga</SelectItem>
                  <SelectItem value="Brampton">Brampton</SelectItem>
                  <SelectItem value="Oakville">Oakville</SelectItem>
                </SelectContent>
              </Select>

              {/* Property Type */}
              <Select value={filters.property_type} onValueChange={(value) => onFiltersChange({...filters, property_type: value})}>
                <SelectTrigger className="h-12 bg-white/90 border-0">
                  <Home className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Range */}
              <Select value={filters.min_price} onValueChange={(value) => onFiltersChange({...filters, min_price: value})}>
                <SelectTrigger className="h-12 bg-white/90 border-0">
                  <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Min Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Min</SelectItem>
                  <SelectItem value="400000">$400,000</SelectItem>
                  <SelectItem value="600000">$600,000</SelectItem>
                  <SelectItem value="800000">$800,000</SelectItem>
                  <SelectItem value="1000000">$1,000,000</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Button */}
              <Button className="h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold">
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Properties', value: '500+' },
              { label: 'Happy Clients', value: '1,200+' },
              { label: 'Years Experience', value: '15+' },
              { label: 'Cities Covered', value: '10+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
