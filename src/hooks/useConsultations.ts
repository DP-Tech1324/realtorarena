
import { useMutation } from '@tanstack/react-query';
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
      // Since the consultations table doesn't exist in Supabase yet,
      // we'll just simulate a successful submission
      console.log('Consultation submitted successfully (simulation)');
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
