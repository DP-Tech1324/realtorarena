
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Plus, Edit, Trash2, Eye } from 'lucide-react';

const AdminProperties = () => {
  // Mock property data
  const properties = [
    {
      id: 1,
      title: 'Modern Downtown Condo',
      address: '123 Main St, Toronto',
      price: '$850,000',
      status: 'Active',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200
    },
    {
      id: 2,
      title: 'Family Home in Suburbs',
      address: '456 Oak Ave, Mississauga',
      price: '$1,200,000',
      status: 'Pending',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2400
    },
    {
      id: 3,
      title: 'Luxury Penthouse',
      address: '789 Bay St, Toronto',
      price: '$2,500,000',
      status: 'Sold',
      bedrooms: 3,
      bathrooms: 3,
      sqft: 1800
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sold':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1">
            <div className="p-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-realtor-navy">Properties Management</h1>
                    <p className="text-gray-600 mt-2">Manage property listings and details</p>
                  </div>
                  <Button className="bg-realtor-gold hover:bg-realtor-gold/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Property
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="h-5 w-5 text-realtor-gold" /> 
                        Total Properties
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{properties.length}</div>
                      <p className="text-sm text-muted-foreground">All listings</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="h-5 w-5 text-green-500" /> 
                        Active
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{properties.filter(p => p.status === 'Active').length}</div>
                      <p className="text-sm text-muted-foreground">Currently listed</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="h-5 w-5 text-yellow-500" /> 
                        Pending
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{properties.filter(p => p.status === 'Pending').length}</div>
                      <p className="text-sm text-muted-foreground">Under contract</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="h-5 w-5 text-blue-500" /> 
                        Sold
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{properties.filter(p => p.status === 'Sold').length}</div>
                      <p className="text-sm text-muted-foreground">Completed sales</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Property Listings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {properties.map((property) => (
                        <div key={property.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg">{property.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                                  {property.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{property.address}</p>
                              <p className="font-medium text-realtor-navy text-lg mb-2">{property.price}</p>
                              <div className="flex gap-4 text-sm text-gray-600">
                                <span>{property.bedrooms} bed</span>
                                <span>{property.bathrooms} bath</span>
                                <span>{property.sqft} sqft</span>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminProperties;
