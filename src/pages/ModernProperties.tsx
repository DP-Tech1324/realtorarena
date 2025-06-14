
import React from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EnhancedPropertyCard from '@/components/modern/EnhancedPropertyCard';
import AdvancedSearch from '@/components/search/AdvancedSearch';
import { useModernProperties } from '@/hooks/useModernProperties';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { motion } from 'framer-motion';

const ModernProperties = () => {
  const {
    properties,
    loading,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
  } = useModernProperties();

  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = React.useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false);
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());

  const handleFavoriteToggle = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const handleShare = (property: any) => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAdvancedSearch = (searchParams: any) => {
    console.log('Advanced search:', searchParams);
    // Implement advanced search logic
  };

  const handleNaturalLanguageSearch = (query: string) => {
    console.log('Natural language search:', query);
    // Implement AI-powered search logic
    setSearchTerm(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
              <p className="text-gray-600 mt-2">
                Discover {properties.length} amazing properties available
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              {/* Advanced Search Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {showAdvancedSearch ? 'Hide Search' : 'Advanced Search'}
              </Button>

              {/* View Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Advanced Search */}
      {showAdvancedSearch && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border-b"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AdvancedSearch
              onSearch={handleAdvancedSearch}
              onNaturalLanguageSearch={handleNaturalLanguageSearch}
            />
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 space-y-6 ${showFilters || window.innerWidth >= 1024 ? 'block' : 'hidden'}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Quick Filters</h3>
                  
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search
                    </label>
                    <Input
                      placeholder="Location, type, features..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <Select value={filters.city || 'all'} onValueChange={(value) => setFilters({...filters, city: value === 'all' ? '' : value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        <SelectItem value="Toronto">Toronto</SelectItem>
                        <SelectItem value="Mississauga">Mississauga</SelectItem>
                        <SelectItem value="Brampton">Brampton</SelectItem>
                        <SelectItem value="Oakville">Oakville</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <Select value={filters.property_type || 'all'} onValueChange={(value) => setFilters({...filters, property_type: value === 'all' ? '' : value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Min Price
                      </label>
                      <Select value={filters.min_price || 'none'} onValueChange={(value) => setFilters({...filters, min_price: value === 'none' ? '' : value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Min" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Min</SelectItem>
                          <SelectItem value="400000">$400K</SelectItem>
                          <SelectItem value="600000">$600K</SelectItem>
                          <SelectItem value="800000">$800K</SelectItem>
                          <SelectItem value="1000000">$1M</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Price
                      </label>
                      <Select value={filters.max_price || 'none'} onValueChange={(value) => setFilters({...filters, max_price: value === 'none' ? '' : value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Max" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Max</SelectItem>
                          <SelectItem value="800000">$800K</SelectItem>
                          <SelectItem value="1000000">$1M</SelectItem>
                          <SelectItem value="1500000">$1.5M</SelectItem>
                          <SelectItem value="2000000">$2M</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <Select value={filters.bedrooms || 'any'} onValueChange={(value) => setFilters({...filters, bedrooms: value === 'any' ? '' : value})}>
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

                  {/* Clear Filters */}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({
                        city: '',
                        property_type: '',
                        min_price: '',
                        max_price: '',
                        bedrooms: '',
                      });
                    }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading properties..." />
              </div>
            ) : properties.length > 0 ? (
              <motion.div
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2' 
                    : 'grid-cols-1'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EnhancedPropertyCard
                      property={property}
                      onFavorite={handleFavoriteToggle}
                      onShare={handleShare}
                      isFavorited={favorites.has(property.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-gray-400 mb-4">
                  <Grid className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      city: '',
                      property_type: '',
                      min_price: '',
                      max_price: '',
                      bedrooms: '',
                    });
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernProperties;
