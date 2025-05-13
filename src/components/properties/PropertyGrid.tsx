
import React from 'react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types/Property';

interface PropertyGridProps {
  filteredProperties: Property[];
  resetFilters: () => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ filteredProperties, resetFilters }) => {
  return (
    <>
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
    </>
  );
};

export default PropertyGrid;
