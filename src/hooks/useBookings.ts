import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export interface BookingData {
  name: string;
  email: string;
  phone?: string;
  date: Date;
  time: string;
}

export interface Booking extends BookingData {
  id: string;
  created_at: string | null;
}

export function useBookings() {
  const { toast } = useToast();

  const submitBooking = async (data: BookingData) => {
    const formattedDate = format(data.date, 'yyyy-MM-dd');

    // Check for existing booking at same date/time
    const { data: existing, error: fetchError } = await supabase
      .from('bookings')
      .select('id')
      .eq('date', formattedDate)
      .eq('time', data.time);

    if (fetchError) throw fetchError;
    if (existing && existing.length > 0) {
      throw new Error('Selected time slot is already booked');
    }

    const { error } = await supabase.from('bookings').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      date: formattedDate,
      time: data.time,
    });

    if (error) throw error;
    return { success: true };
  };

  const fetchBookings = async (): Promise<Booking[]> => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Booking[];
  };

  const useSubmitBooking = () =>
    useMutation({
      mutationFn: submitBooking,
      onSuccess: () => {
        toast({
          title: 'Booking confirmed',
          description: 'Your booking has been saved.'
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.message || 'Failed to save booking',
          variant: 'destructive'
        });
      }
    });

  const useAllBookings = () =>
    useQuery({
      queryKey: ['bookings'],
      queryFn: fetchBookings
    });

  return { useSubmitBooking, useAllBookings };
}
