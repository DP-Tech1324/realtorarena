
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import PropertyCard from '@/components/PropertyCard';
import PropertySearch from '@/components/PropertySearch';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { properties } from '@/data/properties';
import { Property } from '@/types/Property';

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>(searchParams.get('price') || '');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>(searchParams.get('type') || '');
  const [statusFilter, setStatusFilter] = useState<string>('for-sale');
  const [sortOrder, setSortOrder] = useState<string>('price-asc');

  useEffect(() => {
    // Apply filters
    let results = [...properties];
    
    // Filter by price range
    if (priceRangeFilter) {
      if (priceRangeFilter === '0-500000') {
        results = results.filter(p => p.price < 500000);
      } else if (priceRangeFilter === '500000-1000000') {
        results = results.filter(p => p.price >= 500000 && p.price <= 1000000);
      } else if (priceRangeFilter === '1000000-2000000') {
        results = results.filter(p => p.price >= 1000000 && p.price <= 2000000);
      } else if (priceRangeFilter === '2000000+') {
        results = results.filter(p => p.price > 2000000);
      }
    }

    // Filter by property type
    if (propertyTypeFilter) {
      results = results.filter(p => p.propertyType === propertyTypeFilter);
    }

    // Filter by status
    if (statusFilter) {
      results = results.filter(p => p.status === statusFilter);
    }

    // Sort results
    if (sortOrder === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'newest') {
      // In a real app, you'd sort by date added
      // For demo purposes, we'll just use the existing order
    }

    setFilteredProperties(results);
  }, [priceRangeFilter, propertyTypeFilter, statusFilter, sortOrder]);

  // Reset all filters
  const resetFilters = () => {
    setPriceRangeFilter('');
    setPropertyTypeFilter('');
    setStatusFilter('for-sale');
    setSortOrder('price-asc');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Properties" 
          subtitle="Browse our exclusive listings"
          bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3"
        />

        {/* Search Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-realtor-navy mb-6">Find Your Perfect Home</h2>
            <PropertySearch />
          </div>
        </section>

        {/* Filters and Listings */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-realtor-navy mb-4">Filters</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                      <Select value={priceRangeFilter} onValueChange={setPriceRangeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="any">Any Price</SelectItem>
                            <SelectItem value="0-500000">Under $500k</SelectItem>
                            <SelectItem value="500000-1000000">$500k - $1M</SelectItem>
                            <SelectItem value="1000000-2000000">$1M - $2M</SelectItem>
                            <SelectItem value="2000000+">$2M+</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                      <Select value={propertyTypeFilter} onValueChange={setPropertyTypeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="any">Any Type</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="land">Land</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="for-sale">For Sale</SelectItem>
                            <SelectItem value="for-rent">For Rent</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                      <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort order" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={resetFilters}
                      variant="outline" 
                      className="w-full border-realtor-navy text-realtor-navy hover:bg-realtor-navy hover:text-white"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>

              {/* Property Listings */}
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-realtor-navy">
                    {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
                  </h3>
                </div>

                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map(property => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-lg text-center">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No properties found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                    <Button onClick={resetFilters} className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-realtor-navy">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Found a Property You Like?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a viewing to see the property in person and get all your questions answered.
            </p>
            <Button size="lg" className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-medium">
              Book a Viewing
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Listings;
