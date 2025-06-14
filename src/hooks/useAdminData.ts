
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  totalProperties: number;
  totalInquiries: number;
  totalUsers: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export const useAdminData = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalProperties: 0,
    totalInquiries: 0,
    totalUsers: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch properties count
      const { count: propertiesCount, error: propertiesError } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true });

      if (propertiesError) throw propertiesError;

      // Fetch inquiries count
      const { count: inquiriesCount, error: inquiriesError } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });

      if (inquiriesError) throw inquiriesError;

      // Fetch users count
      const { count: usersCount, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (usersError) throw usersError;

      // Fetch recent activity from analytics and inquiries
      const { data: recentInquiries } = await supabase
        .from('inquiries')
        .select('id, name, created_at, inquiry_type')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: recentAnalytics } = await supabase
        .from('analytics')
        .select('id, event_type, created_at, metadata')
        .order('created_at', { ascending: false })
        .limit(5);

      // Combine and format recent activity
      const activity = [
        ...(recentInquiries || []).map(inquiry => ({
          id: inquiry.id,
          type: 'inquiry',
          description: `New ${inquiry.inquiry_type} inquiry from ${inquiry.name}`,
          timestamp: inquiry.created_at
        })),
        ...(recentAnalytics || []).map(analytic => ({
          id: analytic.id,
          type: 'analytics',
          description: `Property ${analytic.event_type} event`,
          timestamp: analytic.created_at
        }))
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);

      setStats({
        totalProperties: propertiesCount || 0,
        totalInquiries: inquiriesCount || 0,
        totalUsers: usersCount || 0,
        recentActivity: activity
      });
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refetch: fetchAdminData };
};
