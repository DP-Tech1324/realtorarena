
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Home, ArrowRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

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
  },
  {
    id: 4,
    title: 'Luxury Waterfront Estate',
    address: '123 Lakeview Drive, Seattle, WA',
    price: 3250000,
    bedrooms: 6,
    bathrooms: 5.5,
    sqft: 5200,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 5,
    title: 'Contemporary Urban Loft',
    address: '555 Downtown Street, Chicago, IL',
    price: 925000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
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
    <section className="py-20 bg-realtor-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-3">Featured Properties</h2>
          <div className="w-24 h-1 bg-realtor-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional properties in the most desirable locations
          </p>
        </div>

        <Carousel className="w-full" opts={{ align: "start" }}>
          <CarouselContent className="-ml-4">
            {properties.map((property) => (
              <CarouselItem key={property.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
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
                    <Button variant="outline" className="w-full border-realtor-navy text-realtor-navy hover:bg-realtor-navy hover:text-white transition-colors duration-300">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="relative static left-0 right-0 translate-y-0 bg-realtor-navy text-white hover:bg-realtor-gold hover:text-realtor-navy" />
            <CarouselNext className="relative static left-0 right-0 translate-y-0 bg-realtor-navy text-white hover:bg-realtor-gold hover:text-realtor-navy" />
          </div>
        </Carousel>

        <div className="text-center mt-12">
          <Button className="bg-realtor-navy hover:bg-realtor-gold hover:text-realtor-navy transition-colors duration-300 text-white flex items-center gap-2 mx-auto">
            View All Properties
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
