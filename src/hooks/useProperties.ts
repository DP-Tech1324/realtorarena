
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Property } from '@/types/Property';

export function useProperties() {
  const queryClient = useQueryClient();
  
  const fetchProperties = async (): Promise<Property[]> => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw new Error(error.message);
    
    // Map database fields to our frontend Property type
    return data.map(item => ({
      id: item.id,
      title: item.title,
      address: item.address,
      city: item.city,
      province: item.province,
      price: item.price,
      bedrooms: item.bedrooms,
      bathrooms: item.bathrooms,
      squareFeet: item.square_feet,
      propertyType: item.property_type,
      status: item.status,
      featured: item.featured,
      description: item.description,
      images: item.images
    }));
  };
  
  const fetchFeaturedProperties = async (): Promise<Property[]> => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
      
    if (error) throw new Error(error.message);
    
    return data.map(item => ({
      id: item.id,
      title: item.title,
      address: item.address,
      city: item.city,
      province: item.province,
      price: item.price,
      bedrooms: item.bedrooms,
      bathrooms: item.bathrooms,
      squareFeet: item.square_feet,
      propertyType: item.property_type,
      status: item.status,
      featured: item.featured,
      description: item.description,
      images: item.images
    }));
  };
  
  const fetchPropertyById = async (id: string): Promise<Property> => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw new Error(error.message);
    
    return {
      id: data.id,
      title: data.title,
      address: data.address,
      city: data.city,
      province: data.province,
      price: data.price,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      squareFeet: data.square_feet,
      propertyType: data.property_type,
      status: data.status,
      featured: data.featured,
      description: data.description,
      images: data.images
    };
  };

  return {
    useAllProperties: () => 
      useQuery({
        queryKey: ['properties'],
        queryFn: fetchProperties
      }),
      
    useFeaturedProperties: () => 
      useQuery({
        queryKey: ['featuredProperties'],
        queryFn: fetchFeaturedProperties
      }),
      
    usePropertyById: (id: string) => 
      useQuery({
        queryKey: ['property', id],
        queryFn: () => fetchPropertyById(id),
        enabled: !!id
      })
  };
}
