
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Home, ArrowRight } from 'lucide-react';

// Property type definition
interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  featured: boolean;
  imageUrl: string;
}

// Sample property data
const properties: Property[] = [
  {
    id: 1,
    title: 'Elegant Villa with Ocean View',
    address: '123 Coastal Highway, Malibu, CA',
    price: 2750000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
  },
  {
    id: 2,
    title: 'Modern Downtown Penthouse',
    address: '789 City Center, New York, NY',
    price: 1850000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 3,
    title: 'Spacious Family Home with Garden',
    address: '456 Suburban Lane, Austin, TX',
    price: 895000,
    bedrooms: 5,
    bathrooms: 3,
    sqft: 3800,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  }
];

const FeaturedProperties = () => {
  // Format price to USD currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 bg-realtor-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-3">Featured Properties</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional properties in the most desirable locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={property.imageUrl} 
                  alt={property.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                {property.featured && (
                  <Badge className="absolute top-3 left-3 bg-realtor-gold text-realtor-navy font-medium">
                    Featured
                  </Badge>
                )}
              </div>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-realtor-navy">{property.title}</h3>
                  <p className="text-realtor-gold font-bold">{formatPrice(property.price)}</p>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{property.address}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center text-gray-600">
                    <Bed size={18} className="mr-1" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bath size={18} className="mr-1" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Home size={18} className="mr-1" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-realtor-navy text-realtor-navy hover:bg-realtor-navy hover:text-white">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-realtor-navy hover:bg-realtor-navy/90 text-white flex items-center gap-2">
            View All Properties
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
