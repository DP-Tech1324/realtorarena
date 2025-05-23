
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { properties as localProperties } from '@/data/properties';
import { Property } from '@/types/Property';
import { useToast } from '@/components/ui/use-toast';

export const usePropertyManagement = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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

  return {
    properties,
    isLoading,
    handleDeleteProperty
  };
};
