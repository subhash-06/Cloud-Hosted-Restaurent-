import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Users, AlertTriangle, Mail, MessageSquare, IndianRupee, ShieldCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';

export const DashboardOverview = ({ onNavigate }) => {
  const [securityStats, setSecurityStats] = useState({ count: 0, loading: true });
  
  // Mock stats for others
  const otherStats = {
    totalOrders: 124,
    totalRevenue: 45231.00,
    activeUsers: 45,
    emailsSent: 892,
    smsSent: 120
  };

  useEffect(() => {
    const fetchSecurityCount = async () => {
      // Count TOTAL attacks from 'logs' table
      const { count, error } = await supabase
        .from('logs')
        .select('*', { count: 'exact', head: true })
        .neq('action', 'Allowed');

      if (!error) {
        setSecurityStats({ count: count || 0, loading: false });
      } else {
        setSecurityStats({ count: 0, loading: false });
      }
    };

    fetchSecurityCount();
    
    const channel = supabase
      .channel('logs-count')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'logs' }, () => {
        fetchSecurityCount();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const statCards = [
    {
      title: 'Total Orders',
      value: otherStats.totalOrders,
      icon: ShoppingCart,
      color: 'text-blue-600',
    },
    {
      title: 'Total Revenue',
      value: `₹${otherStats.totalRevenue.toFixed(2)}`,
      icon: IndianRupee,
      color: 'text-green-600',
    },
    {
      title: 'Active Users',
      value: otherStats.activeUsers,
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Total Security Alerts',
      value: securityStats.count,
      icon: securityStats.count > 0 ? AlertTriangle : ShieldCheck, 
      color: securityStats.count > 0 ? 'text-red-600' : 'text-green-600', 
      loading: securityStats.loading,
      isClickable: true,
      tab: 'alerts' // Target tab to switch to
    },
    {
      title: 'Emails Sent',
      value: otherStats.emailsSent,
      icon: Mail,
      color: 'text-indigo-600',
    },
    {
      title: 'SMS Sent',
      value: otherStats.smsSent,
      icon: MessageSquare,
      color: 'text-teal-600',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        
        if (stat.loading) {
           return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
           );
        }

        return (
          <Card 
            key={index} 
            // Add cursor-pointer and onClick if clickable
            className={`hover:shadow-lg transition-shadow ${stat.isClickable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
            onClick={() => stat.isClickable && onNavigate && onNavigate(stat.tab)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.title === 'Total Security Alerts' && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.value === 0 ? "System Secure" : "View details"}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};