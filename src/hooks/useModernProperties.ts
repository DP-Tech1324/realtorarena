
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ModernProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  province: string;
  postal_code?: string;
  property_type: 'house' | 'condo' | 'townhouse' | 'apartment' | 'commercial';
  status: 'active' | 'pending' | 'sold' | 'draft';
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  lot_size?: string;
  year_built?: number;
  parking_spots: number;
  features: string[];
  images: string[];
  cover_image?: string;
  virtual_tour_url?: string;
  mls_number?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const useModernProperties = () => {
  const [properties, setProperties] = useState<ModernProperty[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<ModernProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    property_type: '',
    min_price: '',
    max_price: '',
    bedrooms: '',
  });
  const { toast } = useToast();

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`);
      }

      if (filters.city) {
        query = query.eq('city', filters.city);
      }

      if (filters.property_type) {
        query = query.eq('property_type', filters.property_type);
      }

      if (filters.min_price) {
        query = query.gte('price', parseInt(filters.min_price));
      }

      if (filters.max_price) {
        query = query.lte('price', parseInt(filters.max_price));
      }

      if (filters.bedrooms) {
        query = query.eq('bedrooms', parseInt(filters.bedrooms));
      }

      const { data, error } = await query;

      if (error) throw error;

      const transformedProperties: ModernProperty[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        price: Number(item.price),
        address: item.address,
        city: item.city,
        province: item.province,
        postal_code: item.postal_code,
        property_type: item.property_type as ModernProperty['property_type'],
        status: item.status as ModernProperty['status'],
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        square_feet: item.square_feet,
        lot_size: item.lot_size,
        year_built: item.year_built,
        parking_spots: item.parking_spots || 0,
        features: Array.isArray(item.features) ? item.features : [],
        images: Array.isArray(item.images) ? item.images : [],
        cover_image: item.cover_image,
        virtual_tour_url: item.virtual_tour_url,
        mls_number: item.mls_number,
        featured: item.featured || false,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));

      setProperties(transformedProperties);
      setFeaturedProperties(transformedProperties.filter(p => p.featured).slice(0, 6));
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: 'Error loading properties',
        description: 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const trackPropertyView = async (propertyId: string) => {
    try {
      await supabase.from('analytics').insert({
        property_id: propertyId,
        event_type: 'view',
        session_id: sessionStorage.getItem('session_id') || crypto.randomUUID(),
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchTerm, filters]);

  useEffect(() => {
    // Set up real-time subscription
    const channel = supabase
      .channel('properties-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'listings'
        },
        () => {
          fetchProperties();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    properties,
    featuredProperties,
    loading,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    trackPropertyView,
    refetch: fetchProperties,
  };
};
