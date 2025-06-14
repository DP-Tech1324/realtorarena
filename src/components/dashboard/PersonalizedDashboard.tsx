
import React from 'react';
import { Heart, Bell, TrendingUp, MapPin, Calendar, Star, Search, Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ModernProperty } from '@/hooks/useModernProperties';

interface PersonalizedDashboardProps {
  favoriteProperties: ModernProperty[];
  recentlyViewed: ModernProperty[];
  savedSearches: SavedSearch[];
  recommendations: ModernProperty[];
  alerts: PropertyAlert[];
}

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: any;
  alertsEnabled: boolean;
  newResults: number;
  lastRun: string;
}

interface PropertyAlert {
  id: string;
  type: 'price_drop' | 'new_listing' | 'status_change' | 'market_update';
  title: string;
  message: string;
  property?: ModernProperty;
  timestamp: string;
  read: boolean;
}

const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({
  favoriteProperties,
  recentlyViewed,
  savedSearches,
  recommendations,
  alerts
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'price_drop': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'new_listing': return <Star className="h-4 w-4 text-blue-500" />;
      case 'status_change': return <Bell className="h-4 w-4 text-orange-500" />;
      case 'market_update': return <MapPin className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const unreadAlerts = alerts.filter(alert => !alert.read).length;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold text-gray-900">{favoriteProperties.length}</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Saved Searches</p>
                  <p className="text-2xl font-bold text-gray-900">{savedSearches.length}</p>
                </div>
                <Search className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{unreadAlerts}</p>
                </div>
                <Bell className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recently Viewed</p>
                  <p className="text-2xl font-bold text-gray-900">{recentlyViewed.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Property Alerts */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Property Alerts
                {unreadAlerts > 0 && (
                  <Badge variant="destructive">{unreadAlerts}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(alert.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {alerts.length > 5 && (
                  <Button variant="outline" className="w-full">
                    View All Alerts ({alerts.length})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5" />
                Saved Searches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedSearches.map((search) => (
                  <div key={search.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{search.name}</h4>
                      {search.newResults > 0 && (
                        <Badge variant="default">{search.newResults} new</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{search.query}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Last run: {new Date(search.lastRun).toLocaleDateString()}
                      </span>
                      <Button size="sm" variant="outline">
                        Run Search
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Personalized Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.slice(0, 6).map((property) => (
                  <div key={property.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={property.cover_image || '/placeholder.svg'}
                      alt={property.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 mb-1">{formatPrice(property.price)}</h4>
                      <p className="text-sm text-gray-600 mb-2">{property.address}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        {property.bedrooms && <span>{property.bedrooms} bed</span>}
                        {property.bathrooms && <span className="ml-2">{property.bathrooms} bath</span>}
                        {property.square_feet && <span className="ml-2">{property.square_feet} sq ft</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recently Viewed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentlyViewed.slice(0, 8).map((property) => (
                  <div key={property.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={property.cover_image || '/placeholder.svg'}
                      alt={property.title}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-2">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{formatPrice(property.price)}</h4>
                      <p className="text-xs text-gray-600">{property.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default PersonalizedDashboard;
