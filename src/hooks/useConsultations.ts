
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  consultationType: string;
  date: Date;
  time: string;
  message?: string;
  propertyId?: string;
}

export function useConsultations() {
  const submitConsultation = async (data: ConsultationFormData) => {
    console.log('Submitting consultation data:', data);
    
    try {
      // Format the date for Supabase (YYYY-MM-DD)
      const formattedDate = format(data.date, 'yyyy-MM-dd');
      
      // Generate a UUID for the consultation record
      const id = crypto.randomUUID();
      
      console.log('Preparing to insert with id:', id);
      console.log('Formatted date:', formattedDate);
      console.log('Property ID:', data.propertyId || null);
      
      // Validate propertyId to ensure it's a valid UUID or null
      let propertyIdValue = null;
      if (data.propertyId && data.propertyId.trim() !== '') {
        // Only use the propertyId if it's a valid UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(data.propertyId)) {
          propertyIdValue = data.propertyId;
        } else {
          console.warn('Invalid property ID format, setting to null:', data.propertyId);
        }
      }
      
      // Insert consultation into Supabase
      const { error } = await supabase
        .from('consultations')
        .insert({
          id: id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          consultation_type: data.consultationType,
          date: formattedDate,
          time: data.time,
          message: data.message || null,
          property_id: propertyIdValue
        });
        
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Consultation submitted successfully with ID:', id);
      return { success: true, id };
    } catch (error) {
      console.error('Error in submitConsultation:', error);
      throw error;
    }
  };
  
  const useSubmitConsultation = () => 
    useMutation({
      mutationFn: submitConsultation,
      onSuccess: (data) => {
        console.log('Mutation successful:', data);
        toast({
          title: "Consultation request submitted",
          description: "We will contact you shortly to confirm your appointment.",
        });
      },
      onError: (error: any) => {
        console.error('Mutation error:', error);
        toast({
          title: "Error submitting consultation",
          description: error.message || "Failed to submit your consultation request. Please try again.",
          variant: "destructive"
        });
      }
    });
  
  return { useSubmitConsultation };
}
