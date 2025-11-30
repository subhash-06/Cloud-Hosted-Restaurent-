import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const SecurityAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH ALERTS (Attacks Only)
  const fetchAlerts = async () => {
    // Fetch from 'logs' table where action is NOT 'Allowed'
    const { data, error } = await supabase
      .from('logs')
      .select('*')
      .neq('action', 'Allowed') 
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching alerts:", error);
      toast({ title: 'Error fetching alerts', variant: 'destructive' });
      return;
    }

    setAlerts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();

    // Real-time subscription for new attacks
    const channel = supabase
      .channel('logs-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'logs', filter: 'action=neq.Allowed' }, (payload) => {
        toast({
          title: '🚨 New Security Alert',
          description: `${payload.new.type} detected!`,
          variant: 'destructive',
        });
        fetchAlerts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Helper: Get Badge Color based on Attack Type
  const getSeverityColor = (type) => {
    const critical = ['sql_injection', 'rce_injection', 'brute_force', 'credential_stuffing'];
    const high = ['xss_attack', 'path_traversal', 'file_exfiltration'];
    
    if (critical.some(t => type?.toLowerCase().includes(t))) return 'bg-red-600 hover:bg-red-700';
    if (high.some(t => type?.toLowerCase().includes(t))) return 'bg-orange-500 hover:bg-orange-600';
    return 'bg-yellow-500 hover:bg-yellow-600'; // Medium for others
  };

  // Helper: Process Data for Charts
  const alertsByType = alerts.reduce((acc, alert) => {
    const type = alert.type || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const alertsByDay = alerts.reduce((acc, alert) => {
    if (!alert.created_at) return acc;
    const day = format(new Date(alert.created_at), 'MMM dd');
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(alertsByType).map(([name, value]) => ({ name, value }));
  const lineData = Object.entries(alertsByDay).map(([date, count]) => ({ date, count })).reverse(); // Show oldest to newest

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* CHARTS SECTION */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alerts by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts Per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ALERTS TABLE SECTION */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Severity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8">Loading alerts...</TableCell></TableRow>
                ) : alerts.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No threats detected.</TableCell></TableRow>
                ) : (
                  alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      {/* Severity Badge */}
                      <TableCell>
                        <Badge className={getSeverityColor(alert.type)}>
                          {alert.ml_score > 0.9 ? 'CRITICAL' : 'HIGH'}
                        </Badge>
                      </TableCell>
                      
                      {/* Type */}
                      <TableCell className="font-medium">{alert.type}</TableCell>
                      
                      {/* Description (Method + URI) */}
                      <TableCell className="max-w-xs truncate font-mono text-xs text-gray-600">
                        {alert.description}
                      </TableCell>
                      
                      {/* IP Address */}
                      <TableCell className="font-mono text-xs">{alert.ip_address}</TableCell>
                      
                      {/* Date */}
                      <TableCell className="text-xs text-gray-500">
                        {alert.created_at ? format(new Date(alert.created_at), 'MMM d, HH:mm') : '-'}
                      </TableCell>
                      
                      {/* Status (Blocked) */}
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <ShieldAlert className="h-3 w-3 mr-1" />
                          {alert.action}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};