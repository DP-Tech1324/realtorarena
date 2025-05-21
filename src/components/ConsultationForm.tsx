
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { useConsultations } from '@/hooks/useConsultations';
import { useToast } from '@/hooks/use-toast';
import { formSchema, FormValues, ConsultationFormProps } from '@/components/consultation/consultationSchema';
import PersonalInfoFields from '@/components/consultation/PersonalInfoFields';
import ConsultationTypeField from '@/components/consultation/ConsultationTypeField';
import DateTimeFields from '@/components/consultation/DateTimeFields';
import MessageField from '@/components/consultation/MessageField';

const ConsultationForm: React.FC<ConsultationFormProps> = ({ 
  defaultType,
  propertyId,
  onSubmitSuccess 
}) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      consultationType: defaultType || "",
      message: "",
    },
  });

  const { useSubmitConsultation } = useConsultations();
  const { mutate: submitConsultation, isPending } = useSubmitConsultation();

  const onSubmit = (data: FormValues) => {
    console.log('Consultation form submitted with data:', data);
    
    // Ensure all required fields are present with proper types before submission
    submitConsultation({
      name: data.name,
      email: data.email,
      phone: data.phone,
      consultationType: data.consultationType,
      date: data.date,
      time: data.time,
      message: data.message || "",
      propertyId: propertyId
    }, {
      onSuccess: () => {
        console.log("Form submission successful");
        form.reset();
        if (onSubmitSuccess) {
          onSubmitSuccess();
        } else {
          toast({
            title: "Consultation request submitted",
            description: "We will contact you shortly to confirm your appointment.",
          });
        }
      },
      onError: (error) => {
        console.error("Form submission error:", error);
        toast({
          title: "Error submitting request",
          description: "There was a problem submitting your request. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PersonalInfoFields />
          <ConsultationTypeField />
          <DateTimeFields />
        </div>

        <MessageField />

        <Button 
          type="submit" 
          className="w-full md:w-auto bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-semibold"
          disabled={isPending}
        >
          {isPending ? 'Scheduling...' : 'Schedule Consultation'}
        </Button>
      </form>
    </Form>
  );
};

export default ConsultationForm;
