import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Plus, Unlock } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

interface BlockedIP {
  id: string;
  ip_address: string;
  reason: string;
  blocked_at: string;
  is_active: boolean;
  unblocked_at: string | null;
}

export const BlockedIPs = () => {
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [newIP, setNewIP] = useState('');
  const [reason, setReason] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

  const fetchBlockedIPs = async () => {
    const { data, error } = await supabase
      .from('blocked_ips')
      .select('*')
      .order('blocked_at', { ascending: false });

    if (error) {
      toast({ title: 'Error fetching blocked IPs', variant: 'destructive' });
      return;
    }

    setBlockedIPs(data || []);
  };

  useEffect(() => {
    fetchBlockedIPs();
  }, []);

  const blockIP = async () => {
    if (!newIP || !reason) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    const { error } = await supabase
      .from('blocked_ips')
      .insert({
        ip_address: newIP,
        reason,
        blocked_by: user?.id,
      });

    if (error) {
      toast({ title: 'Error blocking IP', variant: 'destructive' });
      return;
    }

    toast({ title: 'IP blocked successfully' });
    setNewIP('');
    setReason('');
    setIsDialogOpen(false);
    fetchBlockedIPs();
  };

  const unblockIP = async (id: string) => {
    const { error } = await supabase
      .from('blocked_ips')
      .update({
        is_active: false,
        unblocked_at: new Date().toISOString(),
        unblocked_by: user?.id,
      })
      .eq('id', id);

    if (error) {
      toast({ title: 'Error unblocking IP', variant: 'destructive' });
      return;
    }

    toast({ title: 'IP unblocked successfully' });
    fetchBlockedIPs();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Blocked IPs</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Block IP
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Block New IP Address</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">IP Address</label>
                <Input
                  placeholder="192.168.1.1"
                  value={newIP}
                  onChange={(e) => setNewIP(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Reason</label>
                <Textarea
                  placeholder="Suspicious activity, multiple failed login attempts..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <Button onClick={blockIP} className="w-full">
                Block IP
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Blocked Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blockedIPs.map((ip) => (
              <TableRow key={ip.id} className={!ip.is_active ? 'opacity-50' : ''}>
                <TableCell className="font-mono">{ip.ip_address}</TableCell>
                <TableCell className="max-w-xs truncate">{ip.reason}</TableCell>
                <TableCell>{format(new Date(ip.blocked_at), 'MMM d, yyyy HH:mm')}</TableCell>
                <TableCell>
                  {ip.is_active ? (
                    <Badge variant="destructive">Blocked</Badge>
                  ) : (
                    <Badge variant="outline">Unblocked</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {ip.is_active && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => unblockIP(ip.id)}
                    >
                      <Unlock className="h-4 w-4 mr-2" />
                      Unblock
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
