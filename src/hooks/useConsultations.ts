
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
      const { data: result, error } = await supabase
        .from('consultations')
        .insert({
          id: crypto.randomUUID(), // Generate a UUID for the id field
          name: data.name,
          email: data.email,
          phone: data.phone,
          consultation_type: data.consultationType,
          preferred_date: data.date.toISOString().split('T')[0],
          preferred_time: data.time,
          message: data.message || null,
          status: 'pending',
          property_id: data.propertyId || null
        });
        
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Consultation submitted successfully:', result);
      return { success: true };
    } catch (error) {
      console.error('Error in submitConsultation:', error);
      throw error;
    }
  };
  
  const useSubmitConsultation = () => 
    useMutation({
      mutationFn: submitConsultation,
      onSuccess: () => {
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
