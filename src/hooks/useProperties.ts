
import { useQuery } from '@tanstack/react-query';
import { Property } from '@/types/Property';
import { properties as localProperties } from '@/data/properties';

export function useProperties() {
  // Using local properties data since properties table doesn't exist in Supabase yet
  const fetchProperties = async (): Promise<Property[]> => {
    // Return local data
    console.log('Fetching properties from local data');
    return localProperties;
  };
  
  const fetchFeaturedProperties = async (): Promise<Property[]> => {
    // Return filtered local data
    console.log('Fetching featured properties from local data');
    return localProperties.filter(property => property.featured);
  };
  
  const fetchPropertyById = async (id: string): Promise<Property> => {
    // Find property by id in local data
    console.log(`Fetching property with id ${id} from local data`);
    const property = localProperties.find(p => p.id === id);
    
    if (!property) {
      throw new Error(`Property with id ${id} not found`);
    }
    
    return property;
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
