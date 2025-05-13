
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import PropertySearch from '@/components/PropertySearch';
import FiltersSidebar from '@/components/properties/FiltersSidebar';
import PropertyGrid from '@/components/properties/PropertyGrid';
import PropertyCTA from '@/components/properties/PropertyCTA';
import { properties } from '@/data/properties';
import { usePropertyFilters } from '@/hooks/usePropertyFilters';
import { useToast } from "@/components/ui/use-toast";

const Listings = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Initialize filters from search params
  const initialTypeFilter = searchParams.get('type') || '';
  const initialPriceFilter = searchParams.get('price') || '';
  const initialLocationFilter = searchParams.get('location') || '';

  // Use the custom hook for property filtering
  const {
    filteredProperties,
    locationFilter,
    setLocationFilter,
    priceRangeFilter,
    setPriceRangeFilter,
    propertyTypeFilter,
    setPropertyTypeFilter,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    resetFilters
  } = usePropertyFilters({
    properties,
    initialLocationFilter,
    initialPriceFilter,
    initialTypeFilter
  });

  // Show toast notification when search parameters are provided
  useEffect(() => {
    if (initialTypeFilter || initialPriceFilter || initialLocationFilter) {
      toast({
        title: "Search filters applied",
        description: "Showing properties matching your criteria.",
      });
    }
  }, [searchParams]);

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
                <FiltersSidebar
                  locationFilter={locationFilter}
                  setLocationFilter={setLocationFilter}
                  priceRangeFilter={priceRangeFilter}
                  setPriceRangeFilter={setPriceRangeFilter}
                  propertyTypeFilter={propertyTypeFilter}
                  setPropertyTypeFilter={setPropertyTypeFilter}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  resetFilters={resetFilters}
                />
              </div>

              {/* Property Listings */}
              <div className="lg:col-span-3">
                <PropertyGrid 
                  filteredProperties={filteredProperties}
                  resetFilters={resetFilters}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <PropertyCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Listings;
