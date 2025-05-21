
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

// Type for new property creation
export interface PropertyCreateInput {
  title: string;
  address: string;
  city: string;
  province: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: 'house' | 'condo' | 'townhouse' | 'land';
  status: 'for-sale' | 'for-rent' | 'sold' | 'pending';
  featured?: boolean;
  description?: string;
  images: string[];
}

export function useProperties() {
  const queryClient = useQueryClient();

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

  // Create a new property
  const createProperty = async (propertyData: PropertyCreateInput): Promise<Property> => {
    console.log('Creating new property:', propertyData);
    
    try {
      // Generate a new UUID for the property
      const id = crypto.randomUUID();
      
      const { data, error } = await supabase
        .from('properties')
        .insert({
          id: id,
          title: propertyData.title,
          address: propertyData.address,
          city: propertyData.city,
          province: propertyData.province,
          price: propertyData.price,
          bedrooms: propertyData.bedrooms,
          bathrooms: propertyData.bathrooms,
          square_feet: propertyData.squareFeet,
          property_type: propertyData.propertyType,
          status: propertyData.status,
          featured: propertyData.featured || false,
          description: propertyData.description || '',
          images: propertyData.images
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating property:', error);
        throw error;
      }
      
      // Map the Supabase return object to our Property type
      const newProperty: Property = {
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
      
      console.log('Property created successfully:', newProperty);
      return newProperty;
    } catch (error) {
      console.error('Failed to create property:', error);
      throw error;
    }
  };
  
  // Delete a property
  const deleteProperty = async (id: string): Promise<void> => {
    console.log('Deleting property with ID:', id);
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting property:', error);
        throw error;
      }
      
      console.log('Property deleted successfully');
    } catch (error) {
      console.error('Failed to delete property:', error);
      throw error;
    }
  };

  // Update a property
  const updateProperty = async (id: string, propertyData: Partial<PropertyCreateInput>): Promise<Property> => {
    console.log('Updating property with ID:', id, 'with data:', propertyData);
    
    try {
      // Prepare update data
      const updateData: any = {};
      
      // Only include fields that are provided
      if (propertyData.title !== undefined) updateData.title = propertyData.title;
      if (propertyData.address !== undefined) updateData.address = propertyData.address;
      if (propertyData.city !== undefined) updateData.city = propertyData.city;
      if (propertyData.province !== undefined) updateData.province = propertyData.province;
      if (propertyData.price !== undefined) updateData.price = propertyData.price;
      if (propertyData.bedrooms !== undefined) updateData.bedrooms = propertyData.bedrooms;
      if (propertyData.bathrooms !== undefined) updateData.bathrooms = propertyData.bathrooms;
      if (propertyData.squareFeet !== undefined) updateData.square_feet = propertyData.squareFeet;
      if (propertyData.propertyType !== undefined) updateData.property_type = propertyData.propertyType;
      if (propertyData.status !== undefined) updateData.status = propertyData.status;
      if (propertyData.featured !== undefined) updateData.featured = propertyData.featured;
      if (propertyData.description !== undefined) updateData.description = propertyData.description;
      if (propertyData.images !== undefined) updateData.images = propertyData.images;
      
      const { data, error } = await supabase
        .from('properties')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating property:', error);
        throw error;
      }
      
      // Map the Supabase return object to our Property type
      const updatedProperty: Property = {
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
      
      console.log('Property updated successfully:', updatedProperty);
      return updatedProperty;
    } catch (error) {
      console.error('Failed to update property:', error);
      throw error;
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
      }),
      
    useCreateProperty: () => 
      useMutation({
        mutationFn: createProperty,
        onSuccess: () => {
          // Invalidate queries to refetch the updated data
          queryClient.invalidateQueries({ queryKey: ['properties'] });
          queryClient.invalidateQueries({ queryKey: ['featuredProperties'] });
        }
      }),
      
    useDeleteProperty: () => 
      useMutation({
        mutationFn: deleteProperty,
        onSuccess: () => {
          // Invalidate queries to refetch the updated data
          queryClient.invalidateQueries({ queryKey: ['properties'] });
          queryClient.invalidateQueries({ queryKey: ['featuredProperties'] });
        }
      }),
      
    useUpdateProperty: () => 
      useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<PropertyCreateInput> }) => 
          updateProperty(id, data),
        onSuccess: (data) => {
          // Invalidate specific queries
          queryClient.invalidateQueries({ queryKey: ['properties'] });
          queryClient.invalidateQueries({ queryKey: ['featuredProperties'] });
          queryClient.invalidateQueries({ queryKey: ['property', data.id] });
        }
      })
  };
}
