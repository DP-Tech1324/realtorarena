
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";
import { Building, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { usePropertyManagement } from '@/hooks/usePropertyManagement';
import { PropertyForm } from '@/components/property-management/PropertyForm';
import { PropertyFilters } from '@/components/property-management/PropertyFilters';
import { PropertyGrid } from '@/components/property-management/PropertyGrid';

interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  province: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  property_type: string;
  status: string;
  featured: boolean;
  images: string[];
  description?: string;
}

const PropertyManagement = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 9;

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const { toast } = useToast();
  const { createProperty, updateProperty, deleteProperty, togglePropertyStatus, isUploading } = usePropertyManagement();
  
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
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching properties:', error);
          throw error;
        }
        
        const mappedData = data.map((prop: any): Property => ({
          id: prop.id,
          title: prop.title,
          address: prop.address,
          city: prop.city,
          province: prop.province,
          price: prop.price,
          bedrooms: prop.bedrooms,
          bathrooms: prop.bathrooms,
          square_feet: prop.square_feet,
          property_type: prop.property_type,
          status: prop.status,
          featured: prop.featured || false,
          description: prop.description || '',
          images: prop.images || []
        }));
        
        setProperties(mappedData);
      } catch (error) {
        console.error('Error in property fetching:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  // Filter properties based on search and filters
  useEffect(() => {
    let filtered = [...properties];

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (cityFilter) {
      filtered = filtered.filter(property => property.city === cityFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(property => property.status === statusFilter);
    }

    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number);
      filtered = filtered.filter(property => {
        if (max === 999999999) return property.price >= min;
        return property.price >= min && property.price <= max;
      });
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [properties, searchTerm, cityFilter, statusFilter, priceFilter]);

  // If not admin, redirect to admin login
  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need administrator privileges to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/admin" />;
  }

  const handleCreateProperty = async (formData: any, coverImage?: File) => {
    try {
      await createProperty(formData, coverImage);
      setIsFormOpen(false);
      // Refetch properties
      const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
      if (data) {
        const mappedData = data.map((prop: any): Property => ({
          id: prop.id,
          title: prop.title,
          address: prop.address,
          city: prop.city,
          province: prop.province,
          price: prop.price,
          bedrooms: prop.bedrooms,
          bathrooms: prop.bathrooms,
          square_feet: prop.square_feet,
          property_type: prop.property_type,
          status: prop.status,
          featured: prop.featured || false,
          description: prop.description || '',
          images: prop.images || []
        }));
        setProperties(mappedData);
      }
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  const handleEditProperty = async (formData: any, coverImage?: File) => {
    if (!editingProperty) return;
    
    try {
      await updateProperty(editingProperty.id, formData, coverImage);
      setEditingProperty(null);
      setIsFormOpen(false);
      // Refetch properties
      const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
      if (data) {
        const mappedData = data.map((prop: any): Property => ({
          id: prop.id,
          title: prop.title,
          address: prop.address,
          city: prop.city,
          province: prop.province,
          price: prop.price,
          bedrooms: prop.bedrooms,
          bathrooms: prop.bathrooms,
          square_feet: prop.square_feet,
          property_type: prop.property_type,
          status: prop.status,
          featured: prop.featured || false,
          description: prop.description || '',
          images: prop.images || []
        }));
        setProperties(mappedData);
      }
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      await deleteProperty(id);
      // Refetch properties
      const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
      if (data) {
        const mappedData = data.map((prop: any): Property => ({
          id: prop.id,
          title: prop.title,
          address: prop.address,
          city: prop.city,
          province: prop.province,
          price: prop.price,
          bedrooms: prop.bedrooms,
          bathrooms: prop.bathrooms,
          square_feet: prop.square_feet,
          property_type: prop.property_type,
          status: prop.status,
          featured: prop.featured || false,
          description: prop.description || '',
          images: prop.images || []
        }));
        setProperties(mappedData);
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      await togglePropertyStatus(id, currentStatus);
      // Refetch properties
      const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
      if (data) {
        const mappedData = data.map((prop: any): Property => ({
          id: prop.id,
          title: prop.title,
          address: prop.address,
          city: prop.city,
          province: prop.province,
          price: prop.price,
          bedrooms: prop.bedrooms,
          bathrooms: prop.bathrooms,
          square_feet: prop.square_feet,
          property_type: prop.property_type,
          status: prop.status,
          featured: prop.featured || false,
          description: prop.description || '',
          images: prop.images || []
        }));
        setProperties(mappedData);
      }
    } catch (error) {
      console.error('Error toggling property status:', error);
    }
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const totalShown = nextPage * ITEMS_PER_PAGE;
      setCurrentPage(nextPage);
      setHasMore(totalShown < filteredProperties.length);
      setIsLoadingMore(false);
    }, 500);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCityFilter('');
    setStatusFilter('');
    setPriceFilter('');
  };

  const openEditForm = (property: Property) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProperty(null);
  };

  const displayedProperties = filteredProperties.slice(0, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Property Management" 
          subtitle="Add, edit, and manage your property listings"
          showCta={false}
        />
        
        <div className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Building className="h-6 w-6 text-realtor-gold" /> 
                Properties ({filteredProperties.length})
              </CardTitle>
              <Button onClick={openCreateForm} className="bg-realtor-navy hover:bg-realtor-navy/90">
                <Plus className="mr-2 h-4 w-4" />
                Add New Property
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <PropertyFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                cityFilter={cityFilter}
                setCityFilter={setCityFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                onClearFilters={clearFilters}
              />

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realtor-navy"></div>
                </div>
              ) : (
                <PropertyGrid
                  properties={displayedProperties}
                  onEdit={openEditForm}
                  onDelete={handleDeleteProperty}
                  onToggleStatus={handleToggleStatus}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                  isLoadingMore={isLoadingMore}
                />
              )}
            </CardContent>
          </Card>
        </div>

        <Dialog open={isFormOpen} onOpenChange={closeForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <PropertyForm
              onSubmit={editingProperty ? handleEditProperty : handleCreateProperty}
              initialData={editingProperty || undefined}
              isSubmitting={isUploading}
              onCancel={closeForm}
            />
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyManagement;
