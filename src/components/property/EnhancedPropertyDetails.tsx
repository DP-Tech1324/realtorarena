
import React, { useState } from 'react';
import { MapPin, Bed, Bath, Square, Calendar, TrendingUp, Camera, Share2, Heart, Phone, Mail, Car, Home, Thermometer, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { ModernProperty } from '@/hooks/useModernProperties';

interface EnhancedPropertyDetailsProps {
  property: ModernProperty;
  onContactAgent: () => void;
  onScheduleTour: () => void;
  onToggleFavorite: () => void;
  isFavorited: boolean;
}

const EnhancedPropertyDetails: React.FC<EnhancedPropertyDetailsProps> = ({
  property,
  onContactAgent,
  onScheduleTour,
  onToggleFavorite,
  isFavorited
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const pricePerSqFt = property.square_feet ? Math.round(property.price / property.square_feet) : 0;
  const daysOnMarket = Math.floor((new Date().getTime() - new Date(property.created_at).getTime()) / (1000 * 60 * 60 * 24));

  const propertyFeatures = [
    { icon: <Home className="h-4 w-4" />, label: 'Property Type', value: property.property_type },
    { icon: <Calendar className="h-4 w-4" />, label: 'Year Built', value: property.year_built || 'N/A' },
    { icon: <Car className="h-4 w-4" />, label: 'Parking', value: `${property.parking_spots} spaces` },
    { icon: <Square className="h-4 w-4" />, label: 'Lot Size', value: property.lot_size || 'N/A' },
  ];

  const marketData = [
    { label: 'Days on Market', value: daysOnMarket, suffix: 'days' },
    { label: 'Price per Sq Ft', value: formatPrice(pricePerSqFt), suffix: '' },
    { label: 'Property ID', value: property.mls_number || 'N/A', suffix: '' },
    { label: 'Status', value: property.status, suffix: '' },
  ];

  const nearbyAmenities = [
    { name: 'Elementary School', distance: '0.3 miles', rating: 9 },
    { name: 'Grocery Store', distance: '0.5 miles', rating: 8 },
    { name: 'Transit Station', distance: '0.8 miles', rating: 7 },
    { name: 'Hospital', distance: '1.2 miles', rating: 9 },
    { name: 'Shopping Mall', distance: '2.1 miles', rating: 8 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Property Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{property.address}, {property.city}, {property.province}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-blue-600">{formatPrice(property.price)}</span>
              {property.featured && (
                <Badge className="bg-yellow-500 text-yellow-900">Featured</Badge>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onToggleFavorite}>
              <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              {isFavorited ? 'Saved' : 'Save'}
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={onScheduleTour}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Tour
            </Button>
            <Button onClick={onContactAgent} className="bg-blue-600 hover:bg-blue-700">
              <Phone className="h-4 w-4 mr-2" />
              Contact Agent
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Image Gallery and Virtual Tour */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={property.images[selectedImageIndex] || property.cover_image || '/placeholder.svg'}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.virtual_tour_url && (
                <Button
                  className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700"
                  onClick={() => setShowVirtualTour(true)}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Virtual Tour
                </Button>
              )}
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="space-y-2">
            {property.images.slice(0, 6).map((image, index) => (
              <div
                key={index}
                className={`h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {property.images.length > 6 && (
              <div className="h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">
                +{property.images.length - 6} more
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Property Details Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
            <TabsTrigger value="market">Market Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  {property.bedrooms && (
                    <div className="text-center">
                      <Bed className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                      <p className="text-2xl font-bold">{property.bedrooms}</p>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center">
                      <Bath className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                      <p className="text-2xl font-bold">{property.bathrooms}</p>
                      <p className="text-sm text-gray-600">Bathrooms</p>
                    </div>
                  )}
                  {property.square_feet && (
                    <div className="text-center">
                      <Square className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                      <p className="text-2xl font-bold">{property.square_feet.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Square Feet</p>
                    </div>
                  )}
                  <div className="text-center">
                    <Car className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <p className="text-2xl font-bold">{property.parking_spots}</p>
                    <p className="text-sm text-gray-600">Parking</p>
                  </div>
                </div>
                
                {property.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {propertyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {feature.icon}
                      <div>
                        <p className="font-medium text-gray-900">{feature.label}</p>
                        <p className="text-gray-600">{feature.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Features</CardTitle>
              </CardHeader>
              <CardContent>
                {property.features && property.features.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No specific features listed for this property.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="neighborhood" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Neighborhood Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyAmenities.map((amenity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{amenity.name}</p>
                        <p className="text-sm text-gray-600">{amenity.distance}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{amenity.rating}/10</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full mr-1 ${
                                i < amenity.rating / 2 ? 'bg-yellow-400' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {marketData.map((data, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{data.value}</p>
                      <p className="text-sm text-gray-600">{data.label}</p>
                      {data.suffix && <p className="text-xs text-gray-500">{data.suffix}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default EnhancedPropertyDetails;
