
import React, { useState } from 'react';
import { Heart, Share2, Camera, MapPin, Bed, Bath, Square, Calendar, TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ModernProperty } from '@/hooks/useModernProperties';

interface EnhancedPropertyCardProps {
  property: ModernProperty;
  onFavorite?: (id: string) => void;
  onShare?: (property: ModernProperty) => void;
  isFavorited?: boolean;
}

const EnhancedPropertyCard: React.FC<EnhancedPropertyCardProps> = ({
  property,
  onFavorite,
  onShare,
  isFavorited = false
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeColor = (type: string) => {
    const colors = {
      house: 'bg-blue-100 text-blue-800',
      condo: 'bg-green-100 text-green-800',
      townhouse: 'bg-purple-100 text-purple-800',
      apartment: 'bg-orange-100 text-orange-800',
      commercial: 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleImageNavigation = (direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.stopPropagation();
    if (direction === 'next') {
      setImageIndex((prev) => (prev + 1) % property.images.length);
    } else {
      setImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  const daysOnMarket = Math.floor((new Date().getTime() - new Date(property.created_at).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="relative h-64 overflow-hidden">
          {/* Property Image */}
          <img
            src={property.images[imageIndex] || property.cover_image || '/placeholder.svg'}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Image Navigation */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={(e) => handleImageNavigation('prev', e)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ←
              </button>
              <button
                onClick={(e) => handleImageNavigation('next', e)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                →
              </button>
            </>
          )}

          {/* Image Indicators */}
          {property.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === imageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {property.featured && (
              <Badge className="bg-yellow-500 text-yellow-900">Featured</Badge>
            )}
            <Badge className={getPropertyTypeColor(property.property_type)}>
              {property.property_type}
            </Badge>
          </div>

          {/* Top Right Actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/80 hover:bg-white text-gray-700 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                onShare?.(property);
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={`rounded-full p-2 ${
                isFavorited 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-white/80 hover:bg-white text-gray-700'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onFavorite?.(property.id);
              }}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Virtual Tour Badge */}
          {property.virtual_tour_url && (
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-purple-500 text-white">
                <Camera className="h-3 w-3 mr-1" />
                Virtual Tour
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          {/* Price and Address */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {formatPrice(property.price)}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{daysOnMarket} days</span>
              </div>
            </div>
            <div className="flex items-center text-gray-600 mb-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.address}</span>
            </div>
            <p className="text-sm text-gray-500">{property.city}, {property.province}</p>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {property.bedrooms && (
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3">
                <Bed className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium">{property.bedrooms} bed</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3">
                <Bath className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium">{property.bathrooms} bath</span>
              </div>
            )}
            {property.square_feet && (
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3">
                <Square className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium">{property.square_feet.toLocaleString()} sq ft</span>
              </div>
            )}
          </div>

          {/* Property Features */}
          {property.features && property.features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {property.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {property.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{property.features.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Description Preview */}
          {property.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {property.description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1" size="sm">
              View Details
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Tour
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>MLS: {property.mls_number || 'N/A'}</span>
              <span>Listed: {new Date(property.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedPropertyCard;
