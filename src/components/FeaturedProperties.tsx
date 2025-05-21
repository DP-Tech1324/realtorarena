import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useProperties } from '@/hooks/useProperties';

const FeaturedProperties = () => {
  const { useFeaturedProperties } = useProperties();
  const { data: featuredProperties, isLoading, error } = useFeaturedProperties();

  // Format price to CAD currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
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

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realtor-gold"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-8">
            <p>Sorry, we couldn't load the featured properties. Please try again later.</p>
          </div>
        )}

        {featuredProperties && featuredProperties.length > 0 && (
          <Carousel className="w-full" opts={{ align: "start" }}>
            <CarouselContent className="-ml-4">
              {featuredProperties.map((property) => (
                <CarouselItem key={property.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="relative h-64 overflow-hidden">
                      <Link to={`/properties/${property.id}`}>
                        <img 
                          src={property.images[0]} 
                          alt={property.title} 
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                        {property.featured && (
                          <Badge className="absolute top-3 left-3 bg-realtor-gold text-realtor-navy font-medium">
                            Featured
                          </Badge>
                        )}
                      </Link>
                    </div>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <Link to={`/properties/${property.id}`}>
                          <h3 className="text-xl font-bold text-realtor-navy hover:text-realtor-gold transition-colors">{property.title}</h3>
                        </Link>
                        <p className="text-realtor-gold font-bold">{formatPrice(property.price)}</p>
                      </div>
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{property.address}, {property.city}</span>
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
                          <span>{property.squareFeet} sqft</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/properties/${property.id}`} className="w-full">
                        <Button variant="outline" className="w-full border-realtor-navy text-realtor-navy hover:bg-realtor-navy hover:text-white transition-colors duration-300">
                          View Details
                        </Button>
                      </Link>
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
        )}

        {featuredProperties && featuredProperties.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured properties available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/properties">
            <Button className="bg-realtor-navy hover:bg-realtor-gold hover:text-realtor-navy transition-colors duration-300 text-white flex items-center gap-2 mx-auto">
              View All Properties
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
