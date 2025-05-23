
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Building, PenSquare, Trash, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { properties as localProperties } from '@/data/properties';
import { Property } from '@/types/Property';
import { useProperties } from '@/hooks/useProperties';

const PropertyManagement = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };
    
    checkAdminStatus();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAdminStatus);
    
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('properties')
          .select('*');
          
        if (error) {
          console.error('Error fetching properties:', error);
          throw error;
        }
        
        if (data && data.length > 0) {
          // Map the data to match our Property type
          const mappedData = data.map((prop: any): Property => ({
            id: prop.id,
            title: prop.title,
            address: prop.address,
            city: prop.city,
            province: prop.province,
            price: prop.price,
            bedrooms: prop.bedrooms,
            bathrooms: prop.bathrooms,
            squareFeet: prop.square_feet,
            propertyType: prop.property_type,
            status: prop.status,
            featured: prop.featured || false,
            description: prop.description || '',
            images: prop.images || []
          }));
          
          setProperties(mappedData);
        } else {
          // Fallback to local data
          setProperties(localProperties);
        }
      } catch (error) {
        console.error('Error in property fetching:', error);
        setProperties(localProperties);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  // If not admin, redirect to homepage
  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need administrator privileges to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/admin" />;
  }
  
  // Delete a property
  const handleDeleteProperty = async (id: string) => {
    try {
      await supabase
        .from('properties')
        .delete()
        .eq('id', id);
        
      // Update local state
      setProperties(prev => prev.filter(prop => prop.id !== id));
      
      toast({
        title: "Property Deleted",
        description: "The property has been successfully removed."
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Property Management" 
          subtitle="Add, edit, and remove property listings"
          showCta={false}
        />
        
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Building className="h-5 w-5 text-realtor-gold" /> 
                Properties
              </CardTitle>
              <Button className="bg-realtor-navy hover:bg-realtor-navy/90">
                <Plus className="mr-2 h-4 w-4" />
                Add New Property
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realtor-navy"></div>
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium">{property.title}</TableCell>
                          <TableCell>{`${property.address}, ${property.city}`}</TableCell>
                          <TableCell>${formatPrice(property.price)}</TableCell>
                          <TableCell>
                            <span className="capitalize">{property.propertyType}</span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              property.status === 'for-sale' 
                                ? 'bg-green-100 text-green-800' 
                                : property.status === 'sold'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {property.status === 'for-sale' ? 'For Sale' : 
                               property.status === 'for-rent' ? 'For Rent' :
                               property.status === 'sold' ? 'Sold' : 'Pending'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="mr-1"
                            >
                              <PenSquare className="h-4 w-4 text-amber-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              <Trash className="h-4 w-4 text-red-600" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyManagement;
