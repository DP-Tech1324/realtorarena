
import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Bed, Bath, Square, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface AdvancedSearchProps {
  onSearch: (searchParams: SearchParams) => void;
  onNaturalLanguageSearch: (query: string) => void;
}

interface SearchParams {
  query: string;
  city: string;
  propertyType: string;
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  sqFtRange: [number, number];
  yearBuilt: string;
  features: string[];
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch, onNaturalLanguageSearch }) => {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [naturalQuery, setNaturalQuery] = useState('');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    city: '',
    propertyType: '',
    priceRange: [0, 3000000],
    bedrooms: '',
    bathrooms: '',
    sqFtRange: [0, 5000],
    yearBuilt: '',
    features: []
  });

  const popularFeatures = [
    'Pool', 'Garage', 'Fireplace', 'Hardwood Floors', 'Updated Kitchen',
    'Walk-in Closet', 'Deck/Patio', 'Air Conditioning', 'Basement', 'Garden'
  ];

  const handleFeatureToggle = (feature: string) => {
    setSearchParams(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleNaturalSearch = () => {
    if (naturalQuery.trim()) {
      onNaturalLanguageSearch(naturalQuery);
    }
  };

  const handleAdvancedSearch = () => {
    onSearch(searchParams);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Property Search
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdvanced(!isAdvanced)}
          >
            {isAdvanced ? 'Simple Search' : 'Advanced Search'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Natural Language Search */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Search</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Try: '3 bedroom house near schools under $800k' or 'Luxury condo with pool downtown'"
              value={naturalQuery}
              onChange={(e) => setNaturalQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleNaturalSearch()}
            />
            <Button onClick={handleNaturalSearch} className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Luxury condo downtown', 'Family home near schools', 'Investment property'].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setNaturalQuery(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-gray-200" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* Traditional Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="City, neighborhood, address..."
                value={searchParams.query}
                onChange={(e) => setSearchParams(prev => ({ ...prev, query: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <Select value={searchParams.propertyType} onValueChange={(value) => setSearchParams(prev => ({ ...prev, propertyType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Type</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms
            </label>
            <Select value={searchParams.bedrooms} onValueChange={(value) => setSearchParams(prev => ({ ...prev, bedrooms: value }))}>
              <SelectTrigger>
                <Bed className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {isAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 border-t pt-6"
          >
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Range: {formatPrice(searchParams.priceRange[0])} - {formatPrice(searchParams.priceRange[1])}
              </label>
              <Slider
                value={searchParams.priceRange}
                onValueChange={(value) => setSearchParams(prev => ({ ...prev, priceRange: value as [number, number] }))}
                max={3000000}
                min={0}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>$3M+</span>
              </div>
            </div>

            {/* Square Footage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Square Footage: {searchParams.sqFtRange[0].toLocaleString()} - {searchParams.sqFtRange[1].toLocaleString()} sq ft
              </label>
              <Slider
                value={searchParams.sqFtRange}
                onValueChange={(value) => setSearchParams(prev => ({ ...prev, sqFtRange: value as [number, number] }))}
                max={5000}
                min={0}
                step={100}
                className="w-full"
              />
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <Select value={searchParams.bathrooms} onValueChange={(value) => setSearchParams(prev => ({ ...prev, bathrooms: value }))}>
                  <SelectTrigger>
                    <Bath className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Built
                </label>
                <Select value={searchParams.yearBuilt} onValueChange={(value) => setSearchParams(prev => ({ ...prev, yearBuilt: value }))}>
                  <SelectTrigger>
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Any year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Year</SelectItem>
                    <SelectItem value="2020">2020+</SelectItem>
                    <SelectItem value="2010">2010+</SelectItem>
                    <SelectItem value="2000">2000+</SelectItem>
                    <SelectItem value="1990">1990+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Features
              </label>
              <div className="flex flex-wrap gap-2">
                {popularFeatures.map((feature) => (
                  <Badge
                    key={feature}
                    variant={searchParams.features.includes(feature) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => handleFeatureToggle(feature)}
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Button */}
        <div className="flex gap-2">
          <Button onClick={handleAdvancedSearch} className="flex-1" size="lg">
            <Search className="h-4 w-4 mr-2" />
            Search Properties
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchParams({
                query: '',
                city: '',
                propertyType: '',
                priceRange: [0, 3000000],
                bedrooms: '',
                bathrooms: '',
                sqFtRange: [0, 5000],
                yearBuilt: '',
                features: []
              });
              setNaturalQuery('');
            }}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch;
