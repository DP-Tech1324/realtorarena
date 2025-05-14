
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Bath, ArrowRight, MapPin, Home } from 'lucide-react';
import { Property } from '@/types/Property';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  showViewDetails?: boolean;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(price);
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property, showViewDetails = true }) => {
  return (
    <Card className="overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-60">
        <Link to={`/properties/${property.id}`}>
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-realtor-navy text-white py-1 px-3 rounded-full text-sm font-medium">
            {property.status === 'for-sale' ? 'For Sale' : 
             property.status === 'for-rent' ? 'For Rent' : 
             property.status === 'sold' ? 'Sold' : 'Pending'}
          </div>
        </Link>
      </div>

      <CardContent className="p-5">
        <div className="mb-2">
          <Link to={`/properties/${property.id}`}>
            <h3 className="font-bold text-xl text-realtor-navy truncate hover:text-realtor-gold transition-colors">{property.title}</h3>
          </Link>
          <div className="flex items-center text-gray-600 mb-1">
            <MapPin size={16} className="mr-1" />
            <p className="text-sm truncate">
              {property.address}, {property.city}, {property.province}
            </p>
          </div>
          <p className="text-realtor-gold font-bold text-xl">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="flex justify-between text-gray-600 my-3 border-y border-gray-100 py-2">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span className="text-sm">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1" />
            <span className="text-sm">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Home size={16} className="mr-1" />
            <span className="text-sm">{property.squareFeet} sq ft</span>
          </div>
        </div>

        {showViewDetails && (
          <div className="mt-4">
            <Link to={`/properties/${property.id}`}>
              <Button className="w-full bg-realtor-navy hover:bg-realtor-navy/90 flex items-center justify-center gap-2">
                View Details 
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
