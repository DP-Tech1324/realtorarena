
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
      
      // Insert consultation into Supabase
      const { data: result, error } = await supabase
        .from('consultations')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          consultation_type: data.consultationType,
          date: formattedDate,
          time: data.time,
          message: data.message || null,
          property_id: data.propertyId || null
        });
        
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Consultation submitted successfully');
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
