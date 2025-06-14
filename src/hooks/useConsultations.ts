
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  inquiry_type: string;
  status: string;
  priority: string;
  property_id?: string;
  created_at: string;
  updated_at?: string;
}

export const useConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setConsultations(data || []);
    } catch (err) {
      console.error('Error fetching consultations:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch consultations');
      toast({
        title: "Error",
        description: "Failed to load consultations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateConsultationStatus = async (id: string, status: string) => {
    try {
      const { error: updateError } = await supabase
        .from('inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (updateError) throw updateError;

      setConsultations(prev => 
        prev.map(consultation => 
          consultation.id === id 
            ? { ...consultation, status, updated_at: new Date().toISOString() }
            : consultation
        )
      );

      toast({
        title: "Success",
        description: "Status updated successfully",
      });
    } catch (err) {
      console.error('Error updating consultation status:', err);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const deleteConsultation = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setConsultations(prev => prev.filter(consultation => consultation.id !== id));

      toast({
        title: "Success",
        description: "Consultation deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting consultation:', err);
      toast({
        title: "Error",
        description: "Failed to delete consultation",
        variant: "destructive",
      });
    }
  };

  return {
    consultations,
    loading,
    error,
    updateConsultationStatus,
    deleteConsultation,
    refetch: fetchConsultations
  };
};
