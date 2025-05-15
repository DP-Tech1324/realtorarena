
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface ConsultationFormData {
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
    const { error } = await supabase
      .from('consultations')
      .insert({
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
      
    if (error) throw error;
    
    return { success: true };
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
      onError: (error) => {
        toast({
          title: "Error submitting consultation",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  
  return { useSubmitConsultation };
}
