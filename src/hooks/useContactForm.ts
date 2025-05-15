
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function useContactForm() {
  const submitContactForm = async (data: ContactFormData) => {
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message
      });
      
    if (error) throw error;
    
    return { success: true };
  };
  
  const useSubmitContactForm = () => 
    useMutation({
      mutationFn: submitContactForm,
      onSuccess: () => {
        toast({
          title: "Message sent",
          description: "Thank you for contacting us! We will get back to you soon.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error sending message",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  
  return { useSubmitContactForm };
}
