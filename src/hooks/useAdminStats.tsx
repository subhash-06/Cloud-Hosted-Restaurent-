import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  totalAlerts: number;
  emailsSent: number;
  smsSent: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    totalAlerts: 0,
    emailsSent: 0,
    smsSent: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const adminPin = sessionStorage.getItem('admin_pin');
      
      if (!adminPin) {
        console.error('Admin PIN not found');
        setLoading(false);
        return;
      }

      // Fetch orders via admin edge function
      const { data: ordersResponse, error: ordersError } = await supabase.functions.invoke('admin-get-orders', {
        headers: { 'x-admin-pin': adminPin },
      });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      }

      const orders = (ordersResponse as any)?.orders || [];
      const totalRevenue = orders.reduce((sum: number, order: any) => sum + Number(order.total_amount), 0);

      // Fetch other stats (these don't need admin privileges based on RLS)
      const [alertsData, logsData, profilesData] = await Promise.all([
        supabase.from('security_alerts').select('*', { count: 'exact' }).eq('resolved', false),
        supabase.from('activity_logs').select('action', { count: 'exact' }),
        supabase.from('profiles').select('*', { count: 'exact' }),
      ]);

      const emailsSent = logsData.data?.filter(log => log.action === 'email_sent').length || 0;
      const smsSent = logsData.data?.filter(log => log.action === 'sms_sent').length || 0;

      setStats({
        totalOrders: orders.length,
        totalRevenue,
        activeUsers: profilesData.count || 0,
        totalAlerts: alertsData.count || 0,
        emailsSent,
        smsSent,
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const channel = supabase
      .channel('admin-stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'security_alerts' }, fetchStats)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, loading, refetch: fetchStats };
};
