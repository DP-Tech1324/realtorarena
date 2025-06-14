
import React from 'react';
import { Heart, MapPin, Bed, Bath, Square, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ModernProperty } from '@/hooks/useModernProperties';
import { Link } from 'react-router-dom';

interface ModernPropertyCardProps {
  property: ModernProperty;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

const ModernPropertyCard: React.FC<ModernPropertyCardProps> = ({ 
  property, 
  onFavorite, 
  isFavorited = false 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeColor = (type: string) => {
    const colors = {
      house: 'bg-emerald-100 text-emerald-800',
      condo: 'bg-blue-100 text-blue-800',
      townhouse: 'bg-purple-100 text-purple-800',
      apartment: 'bg-orange-100 text-orange-800',
      commercial: 'bg-gray-100 text-gray-800',
    };
    return colors[type as keyof typeof colors] || colors.house;
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white">
      <div className="relative overflow-hidden">
        {/* Property Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={property.cover_image || property.images[0] || '/placeholder.svg'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {property.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold">
              Featured
            </Badge>
          )}
          <Badge className={getPropertyTypeColor(property.property_type)}>
            {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
          </Badge>
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white backdrop-blur-sm"
          onClick={() => onFavorite?.(property.id)}
        >
          <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>

        {/* Price Overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Location */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm line-clamp-1">{property.address}, {property.city}</span>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.square_feet && (
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{property.square_feet.toLocaleString()} sq ft</span>
              </div>
            )}
          </div>

          {/* Features */}
          {property.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {property.features.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{property.features.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* View Details Button */}
          <Link to={`/property/${property.id}`} className="block">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernPropertyCard;
