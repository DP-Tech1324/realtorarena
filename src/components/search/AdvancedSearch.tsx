
import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, Bed, Calendar, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface AdvancedSearchProps {
  onSearch: (params: SearchParams) => void;
  onNaturalLanguageSearch: (query: string) => void;
}

interface SearchParams {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
  features: string[];
  keywords: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  onNaturalLanguageSearch
}) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    propertyType: 'any',
    priceRange: 'any',
    bedrooms: 'any',
    bathrooms: 'any',
    features: [],
    keywords: ''
  });

  const [naturalQuery, setNaturalQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const propertyFeatures = [
    'Swimming Pool', 'Garden', 'Garage', 'Balcony', 'Fireplace',
    'Walk-in Closet', 'Hardwood Floors', 'Stainless Steel Appliances',
    'Central Air', 'Updated Kitchen', 'Master Suite', 'Home Office'
  ];

  const toggleFeature = (feature: string) => {
    setSearchParams(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleAdvancedSearch = () => {
    onSearch(searchParams);
  };

  const handleNaturalSearch = () => {
    if (naturalQuery.trim()) {
      onNaturalLanguageSearch(naturalQuery);
    }
  };

  const handleReset = () => {
    setSearchParams({
      location: '',
      propertyType: 'any',
      priceRange: 'any',
      bedrooms: 'any',
      bathrooms: 'any',
      features: [],
      keywords: ''
    });
    setNaturalQuery('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Advanced Property Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Natural Language Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h3 className="font-medium text-gray-900">AI-Powered Search</h3>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., 'Modern 3-bedroom house with a pool near downtown under $800k'"
              value={naturalQuery}
              onChange={(e) => setNaturalQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleNaturalSearch()}
            />
            <Button onClick={handleNaturalSearch} disabled={!naturalQuery.trim()}>
              Search
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Describe your ideal property in natural language and let AI find matches for you.
          </p>
        </motion.div>

        {/* Toggle Advanced Filters */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Traditional Search</h3>
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
          </Button>
        </div>

        {/* Basic Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Location
            </label>
            <Input
              placeholder="City, neighborhood, or address"
              value={searchParams.location}
              onChange={(e) => setSearchParams(prev => ({...prev, location: e.target.value}))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Home className="h-4 w-4 inline mr-1" />
              Property Type
            </label>
            <Select 
              value={searchParams.propertyType} 
              onValueChange={(value) => setSearchParams(prev => ({...prev, propertyType: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Type</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="h-4 w-4 inline mr-1" />
              Price Range
            </label>
            <Select 
              value={searchParams.priceRange} 
              onValueChange={(value) => setSearchParams(prev => ({...prev, priceRange: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                <SelectItem value="0-400000">Under $400K</SelectItem>
                <SelectItem value="400000-600000">$400K - $600K</SelectItem>
                <SelectItem value="600000-800000">$600K - $800K</SelectItem>
                <SelectItem value="800000-1000000">$800K - $1M</SelectItem>
                <SelectItem value="1000000-1500000">$1M - $1.5M</SelectItem>
                <SelectItem value="1500000+">$1.5M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Bed className="h-4 w-4 inline mr-1" />
                  Bedrooms
                </label>
                <Select 
                  value={searchParams.bedrooms} 
                  onValueChange={(value) => setSearchParams(prev => ({...prev, bedrooms: value}))}
                >
                  <SelectTrigger>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <Select 
                  value={searchParams.bathrooms} 
                  onValueChange={(value) => setSearchParams(prev => ({...prev, bathrooms: value}))}
                >
                  <SelectTrigger>
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <Input
                  placeholder="Pool, garage, updated kitchen..."
                  value={searchParams.keywords}
                  onChange={(e) => setSearchParams(prev => ({...prev, keywords: e.target.value}))}
                />
              </div>
            </div>

            {/* Property Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Features
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyFeatures.map((feature) => (
                  <Badge
                    key={feature}
                    variant={searchParams.features.includes(feature) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFeature(feature)}
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleAdvancedSearch} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            Search Properties
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="pt-4 border-t">
          <p className="text-sm font-medium text-gray-700 mb-2">Quick Searches:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Family homes with pool',
              'Downtown condos',
              'Investment properties',
              'Luxury homes',
              'First-time buyer friendly'
            ].map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setNaturalQuery(suggestion);
                  onNaturalLanguageSearch(suggestion);
                }}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch;
