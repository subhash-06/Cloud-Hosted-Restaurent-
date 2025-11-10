import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Log {
  id: string;
  log_type: 'order' | 'security' | 'system' | 'user';
  action: string;
  description: string;
  ip_address: string | null;
  created_at: string;
}

export const LogHistory = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    let query = supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (filter !== 'all') {
      query = query.eq('log_type', filter);
    }

    const { data, error } = await query;

    if (error) {
      toast({ title: 'Error fetching logs', variant: 'destructive' });
      return;
    }

    setLogs(data as Log[] || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [filter]);

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-500';
      case 'security':
        return 'bg-red-500';
      case 'system':
        return 'bg-purple-500';
      case 'user':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Activity Log History</CardTitle>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Logs</SelectItem>
            <SelectItem value="order">Orders</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <Badge className={getLogTypeColor(log.log_type)}>
                    {log.log_type.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{log.action}</TableCell>
                <TableCell className="max-w-md truncate">{log.description}</TableCell>
                <TableCell className="font-mono text-xs">{log.ip_address || 'N/A'}</TableCell>
                <TableCell>{format(new Date(log.created_at), 'MMM d, yyyy HH:mm:ss')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
