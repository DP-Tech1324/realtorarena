import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import PersonalInfoFields from '@/components/consultation/PersonalInfoFields';
import DateTimeFields from '@/components/consultation/DateTimeFields';
import { bookingSchema, BookingFormValues } from './bookingSchema';
import { useBookings } from '@/hooks/useBookings';

interface BookingFormProps {
  onSubmitSuccess?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmitSuccess }) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    }
  });

  const { useSubmitBooking } = useBookings();
  const { mutate: submitBooking, isPending } = useSubmitBooking();

  const onSubmit = (data: BookingFormValues) => {
    submitBooking({
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time
    }, {
      onSuccess: () => {
        form.reset();
        onSubmitSuccess?.();
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PersonalInfoFields />
          <DateTimeFields />
        </div>
        <Button type="submit" className="bg-realtor-gold text-realtor-navy" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Book Now'}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
