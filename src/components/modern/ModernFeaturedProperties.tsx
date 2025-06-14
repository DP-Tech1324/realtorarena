
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernPropertyCard from './ModernPropertyCard';
import { ModernProperty } from '@/hooks/useModernProperties';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ModernFeaturedPropertiesProps {
  properties: ModernProperty[];
  loading: boolean;
  onFavorite?: (id: string) => void;
  favoriteIds?: string[];
}

const ModernFeaturedProperties: React.FC<ModernFeaturedPropertiesProps> = ({
  properties,
  loading,
  onFavorite,
  favoriteIds = []
}) => {
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" text="Loading featured properties..." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Featured Properties
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Premium
            <span className="block text-blue-600">Real Estate</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked properties that offer exceptional value, prime locations, 
            and outstanding features for discerning buyers.
          </p>
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {properties.map((property) => (
                <ModernPropertyCard
                  key={property.id}
                  property={property}
                  onFavorite={onFavorite}
                  isFavorited={favoriteIds.includes(property.id)}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link to="/properties">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 text-lg"
                >
                  View All Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Sparkles className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Featured Properties</h3>
            <p className="text-gray-600 mb-6">
              Check back soon for our latest featured listings.
            </p>
            <Link to="/properties">
              <Button variant="outline" size="lg">
                Browse All Properties
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ModernFeaturedProperties;
