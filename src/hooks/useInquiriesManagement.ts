
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  property_id?: string;
  created_at: string;
}

export const useInquiriesManagement = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { toast } = useToast();

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: 'Error loading inquiries',
        description: 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (inquiryId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', inquiryId);

      if (error) throw error;

      toast({
        title: 'Inquiry status updated',
        description: 'The inquiry status has been successfully updated',
      });

      await fetchInquiries();
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      toast({
        title: 'Error updating status',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const deleteInquiry = async (inquiryId: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', inquiryId);

      if (error) throw error;

      toast({
        title: 'Inquiry deleted',
        description: 'The inquiry has been successfully removed',
      });

      await fetchInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast({
        title: 'Error deleting inquiry',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchInquiries();
  }, []);

  return {
    inquiries: filteredInquiries,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    updateInquiryStatus,
    deleteInquiry,
    refetch: fetchInquiries,
  };
};
