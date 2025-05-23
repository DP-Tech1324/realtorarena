
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

export interface PropertyFormData {
  title: string;
  price: number;
  city: string;
  address: string;
  province: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  property_type: string;
  description: string;
  status: 'published' | 'draft';
  featured: boolean;
}

export function usePropertyManagement() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadPropertyImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `property-images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('property-images')
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const createProperty = async (formData: PropertyFormData, coverImage?: File) => {
    setIsUploading(true);
    try {
      let imageUrl = '';
      
      if (coverImage) {
        imageUrl = await uploadPropertyImage(coverImage);
      }

      const { data, error } = await supabase
        .from('listings')
        .insert({
          title: formData.title,
          price: formData.price,
          city: formData.city,
          address: formData.address,
          province: formData.province,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          square_feet: formData.square_feet,
          property_type: formData.property_type,
          description: formData.description,
          status: formData.status,
          featured: formData.featured,
          images: imageUrl ? [imageUrl] : []
        })
        .select()
        .single();

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Success",
        description: "Property created successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to create property: ${error.message}`,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const updateProperty = async (id: string, formData: Partial<PropertyFormData>, newCoverImage?: File) => {
    setIsUploading(true);
    try {
      let updateData: any = { ...formData };
      
      if (newCoverImage) {
        const imageUrl = await uploadPropertyImage(newCoverImage);
        updateData.images = [imageUrl];
      }

      const { data, error } = await supabase
        .from('listings')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Success",
        description: "Property updated successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update property: ${error.message}`,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete property: ${error.message}`,
        variant: "destructive"
      });
      throw error;
    }
  };

  const togglePropertyStatus = async (id: string, currentStatus: string) => {
    // Make sure we convert any status string to our specific 'published' | 'draft' type
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    try {
      const { error } = await supabase
        .from('listings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Success",
        description: `Property ${newStatus === 'published' ? 'published' : 'saved as draft'}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update property status: ${error.message}`,
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    createProperty,
    updateProperty,
    deleteProperty,
    togglePropertyStatus,
    isUploading
  };
}
