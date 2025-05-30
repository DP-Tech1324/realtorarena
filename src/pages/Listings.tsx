import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import PropertySearch from '@/components/PropertySearch';
import FiltersSidebar from '@/components/properties/FiltersSidebar';
import PropertyGrid from '@/components/properties/PropertyGrid';
import PropertyCTA from '@/components/properties/PropertyCTA';
import { usePropertyFilters } from '@/hooks/usePropertyFilters';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

const Listings = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only published listings from Supabase
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching listings:", error.message);
        toast({
          title: "Error loading properties",
          description: error.message,
          variant: "destructive"
        });
        setProperties([]);
      } else {
        setProperties(data || []);
      }
      setLoading(false);
    };

    fetchListings();
    // eslint-disable-next-line
  }, []);

  // Search filter initialization
  const initialTypeFilter = searchParams.get('type') || '';
  const initialPriceFilter = searchParams.get('price') || '';
  const initialLocationFilter = searchParams.get('location') || '';

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

  useEffect(() => {
    if (initialTypeFilter || initialPriceFilter || initialLocationFilter) {
      toast({
        title: "Search filters applied",
        description: "Showing properties matching your criteria.",
      });
    }
    // eslint-disable-next-line
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

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-realtor-navy mb-6">Find Your Perfect Home</h2>
            <PropertySearch />
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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

              <div className="lg:col-span-3">
                {/* Show loading spinner while fetching */}
                {loading ? (
                  <div className="w-full flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realtor-gold" />
                  </div>
                ) : (
                  <PropertyGrid 
                    filteredProperties={filteredProperties}
                    resetFilters={resetFilters}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <PropertyCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Listings;
