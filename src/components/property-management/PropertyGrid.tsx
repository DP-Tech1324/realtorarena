
import React from 'react';
import { PropertyCard } from './PropertyCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  province: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  property_type: string;
  status: 'published' | 'draft'; // Updated to match the specific status types
  featured: boolean;
  images: string[];
  description?: string;
}

interface PropertyGridProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: 'published' | 'draft') => void;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

export function PropertyGrid({ 
  properties, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  hasMore, 
  onLoadMore, 
  isLoadingMore 
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No properties found</div>
        <p className="text-gray-400 mt-2">Try adjusting your search filters or add a new property.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-6">
          <Button 
            onClick={onLoadMore} 
            disabled={isLoadingMore}
            variant="outline"
            className="px-8"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Properties'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
