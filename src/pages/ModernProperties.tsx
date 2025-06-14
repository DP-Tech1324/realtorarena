
import React from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModernPropertyCard from '@/components/modern/ModernPropertyCard';
import { useModernProperties } from '@/hooks/useModernProperties';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
              <p className="text-gray-600 mt-2">
                Discover {properties.length} amazing properties available
              </p>
            </div>
            
            <div className="flex items-center gap-4">
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
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 space-y-6 ${showFilters || window.innerWidth >= 1024 ? 'block' : 'hidden'}`}>
            <Card>
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-semibold">Search & Filter</h3>
                
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
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading properties..." />
              </div>
            ) : properties.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {properties.map((property) => (
                  <ModernPropertyCard
                    key={property.id}
                    property={property}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernProperties;
