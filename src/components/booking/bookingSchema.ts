import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }).optional(),
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string({ required_error: 'Please select a time.' })
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
