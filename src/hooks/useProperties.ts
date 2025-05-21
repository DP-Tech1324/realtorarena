
import { useQuery } from '@tanstack/react-query';
import { Property } from '@/types/Property';
import { properties as localProperties } from '@/data/properties';
import { supabase } from '@/integrations/supabase/client';

// Helper to validate property type
const validatePropertyType = (type: string): 'house' | 'condo' | 'townhouse' | 'land' => {
  if (['house', 'condo', 'townhouse', 'land'].includes(type)) {
    return type as 'house' | 'condo' | 'townhouse' | 'land';
  }
  // Default to house if invalid type received
  console.warn(`Invalid property type: ${type}, defaulting to 'house'`);
  return 'house';
};

// Helper to validate property status
const validatePropertyStatus = (status: string): 'for-sale' | 'for-rent' | 'sold' | 'pending' => {
  if (['for-sale', 'for-rent', 'sold', 'pending'].includes(status)) {
    return status as 'for-sale' | 'for-rent' | 'sold' | 'pending';
  }
  // Default to for-sale if invalid status received
  console.warn(`Invalid property status: ${status}, defaulting to 'for-sale'`);
  return 'for-sale';
};

export function useProperties() {
  // Use Supabase properties table if it exists, otherwise fall back to local data
  const fetchProperties = async (): Promise<Property[]> => {
    try {
      console.log('Fetching properties from Supabase');
      const { data, error } = await supabase
        .from('properties')
        .select('*');
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // If we have data in Supabase, return it
      if (data && data.length > 0) {
        // Map Supabase properties to our Property type
        return data.map(prop => ({
          id: prop.id,
          title: prop.title,
          address: prop.address,
          city: prop.city,
          province: prop.province,
          price: prop.price,
          bedrooms: prop.bedrooms,
          bathrooms: prop.bathrooms,
          squareFeet: prop.square_feet,
          propertyType: validatePropertyType(prop.property_type),
          status: validatePropertyStatus(prop.status),
          featured: prop.featured || false,
          description: prop.description || '',
          images: prop.images as string[] || []
        }));
      }
      
      // If no data in Supabase, seed with local data
      if (data && data.length === 0) {
        console.log('No properties in Supabase, seeding with local data');
        
        // Insert local properties into Supabase
        for (const prop of localProperties) {
          const { error } = await supabase
            .from('properties')
            .insert({
              id: prop.id,
              title: prop.title,
              address: prop.address,
              city: prop.city,
              province: prop.province,
              price: prop.price,
              bedrooms: prop.bedrooms,
              bathrooms: prop.bathrooms,
              square_feet: prop.squareFeet,
              property_type: prop.propertyType,
              status: prop.status,
              featured: prop.featured,
              description: prop.description,
              images: prop.images
            });
            
          if (error) {
            console.error('Error seeding property:', error);
          }
        }
        
        // Return local data
        return localProperties;
      }
      
      // Fallback to local data
      return localProperties;
    } catch (error) {
      console.error('Error in fetchProperties:', error);
      // Return local data on error
      return localProperties;
    }
  };
  
  const fetchFeaturedProperties = async (): Promise<Property[]> => {
    try {
      console.log('Fetching featured properties from Supabase');
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('featured', true);
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // If we have featured properties in Supabase, return them
      if (data && data.length > 0) {
        // Map Supabase properties to our Property type
        return data.map(prop => ({
          id: prop.id,
          title: prop.title,
          address: prop.address,
          city: prop.city,
          province: prop.province,
          price: prop.price,
          bedrooms: prop.bedrooms,
          bathrooms: prop.bathrooms,
          squareFeet: prop.square_feet,
          propertyType: validatePropertyType(prop.property_type),
          status: validatePropertyStatus(prop.status),
          featured: prop.featured || false,
          description: prop.description || '',
          images: prop.images as string[] || []
        }));
      }
      
      // Fallback to filtered local data
      return localProperties.filter(property => property.featured);
    } catch (error) {
      console.error('Error in fetchFeaturedProperties:', error);
      // Return filtered local data on error
      return localProperties.filter(property => property.featured);
    }
  };
  
  const fetchPropertyById = async (id: string): Promise<Property> => {
    try {
      console.log(`Fetching property with id ${id} from Supabase`);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // Return the Supabase property
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
        propertyType: validatePropertyType(data.property_type),
        status: validatePropertyStatus(data.status),
        featured: data.featured || false,
        description: data.description || '',
        images: data.images as string[] || []
      };
    } catch (error) {
      console.error(`Error fetching property with id ${id}:`, error);
      // Find property by id in local data
      const property = localProperties.find(p => p.id === id);
      
      if (!property) {
        throw new Error(`Property with id ${id} not found`);
      }
      
      return property;
    }
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
