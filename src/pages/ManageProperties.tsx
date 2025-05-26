// src/pages/ManageProperties.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { PropertyForm } from '@/components/property-management/PropertyForm';
import { PropertyFilters } from '@/components/property-management/PropertyFilters';
import { PropertyGrid } from '@/components/property-management/PropertyGrid';
import { PropertyFormData, usePropertyManagement, PropertyFilters as PropertyFilterOptions } from '@/hooks/usePropertyManagement';
import { useToast } from '@/components/ui/use-toast';
import { Pagination } from '@/components/ui/pagination';

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
  status: 'published' | 'draft';
  featured: boolean;
  images: string[];
  description?: string;
  user_email: string;
}

const ManageProperties = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [pageSize] = useState(9);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState<{min: number; max: number} | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  // Get hooks from usePropertyManagement
  const { 
    createProperty, 
    updateProperty, 
    useListProperties, 
    useTogglePropertyStatus, 
    useDeleteProperty 
  } = usePropertyManagement();

  // Convert price range string to min/max object if needed
  const parsePriceFilter = (priceString: string) => {
    if (!priceString) return undefined;
    const [min, max] = priceString.split('-').map(Number);
    return { min, max };
  };

  // Create filter object for the query
  const filters: PropertyFilterOptions = {
    searchTerm: searchTerm || undefined,
    city: cityFilter || undefined,
    status: statusFilter || undefined,
    price: priceFilter,
    page: currentPage,
    pageSize,
  };

  // Use the query to fetch properties
  const { 
    data: propertyData, 
    isLoading, 
    isFetching
  } = useListProperties(filters);

  // Use mutations for property operations
  const toggleStatusMutation = useTogglePropertyStatus();
  const deletePropertyMutation = useDeleteProperty();

  const handleAddNew = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCityFilter('');
    setStatusFilter('');
    setPriceFilter(undefined);
    setCurrentPage(1);
  };

  const handlePriceFilterChange = (priceRange: string) => {
    if (priceRange === '') {
      setPriceFilter(undefined);
    } else {
      const [min, max] = priceRange.split('-').map(Number);
      setPriceFilter({ min, max });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePropertyMutation.mutateAsync(id);
      toast({
        title: "Property deleted",
        description: "The property has been successfully deleted."
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        variant: "destructive",
        title: "Error deleting property",
        description: "There was a problem deleting the property."
      });
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: 'published' | 'draft') => {
    try {
      await toggleStatusMutation.mutateAsync({ id, currentStatus });
      toast({
        title: "Status updated",
        description: `Property is now ${currentStatus === 'published' ? 'drafted' : 'published'}.`
      });
    } catch (error) {
      console.error('Error updating property status:', error);
      toast({
        variant: "destructive",
        title: "Error updating status",
        description: "There was a problem updating the property status."
      });
    }
  };

  const handleSubmitProperty = async (formData: PropertyFormData, coverImage?: File) => {
    try {
      if (editingProperty) {
        // Update existing property
        await updateProperty(editingProperty.id, formData, coverImage);
        toast({
          title: "Property updated",
          description: "Your property has been successfully updated."
        });
      } else {
        // Create new property
        await createProperty(formData, coverImage);
        toast({
          title: "Property created",
          description: "Your new property has been successfully created."
        });
      }

      // Hide form and reset editing state
      setShowForm(false);
      setEditingProperty(null);
    } catch (error: Error | unknown) {
      console.error('Error saving property:', error);
      toast({
        variant: "destructive",
        title: "Error saving property",
        description: error instanceof Error ? error.message : "There was a problem saving your property."
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-realtor-navy">Manage Properties</h1>
            {!showForm && (
              <Button 
                className="flex items-center gap-2 bg-realtor-gold text-realtor-navy"
                onClick={handleAddNew}
              >
                <Plus size={16} /> Add Property
              </Button>
            )}
          </div>

          {showForm ? (
            <PropertyForm 
              onSubmit={handleSubmitProperty}
              initialData={editingProperty || undefined}
              onCancel={handleCancelForm}
              isSubmitting={false}
            />
          ) : (
            <div className="space-y-6">
              <PropertyFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                cityFilter={cityFilter}
                setCityFilter={setCityFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priceFilter={priceFilter ? `${priceFilter.min}-${priceFilter.max}` : ''}
                setPriceFilter={handlePriceFilterChange}
                onClearFilters={handleClearFilters}
              />

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-realtor-navy" />
                </div>
              ) : (
                <>
                  <PropertyGrid 
                    properties={propertyData?.properties || []}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                    isLoading={isFetching}
                  />
                  
                  {propertyData && propertyData.pageCount > 1 && (
                    <div className="py-6 flex justify-center">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1 || isLoading}
                        >
                          Previous
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          {Array.from({ length: propertyData.pageCount }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={page === currentPage ? "default" : "outline"}
                              size="sm"
                              className={page === currentPage ? "bg-realtor-navy" : ""}
                              onClick={() => handlePageChange(page)}
                              disabled={isLoading}
                            >
                              {page}
                            </Button>
                          ))}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePageChange(Math.min(propertyData.pageCount, currentPage + 1))}
                          disabled={currentPage === propertyData.pageCount || isLoading}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {propertyData?.properties.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No properties found. Try adjusting your filters or add a new property.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageProperties;
