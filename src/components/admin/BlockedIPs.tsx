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
import { Plus, Unlock, Lock, Search } from 'lucide-react';
import { format } from 'date-fns';

export const BlockedIPs = () => {
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('new'); // 'new' or 'reblock'
  const [newIP, setNewIP] = useState('');
  const [reason, setReason] = useState('');
  
  const [loading, setLoading] = useState(true);

  // 1. FETCH ALL DATA
  const fetchBlockedIPs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blocked_ips')
      .select('*')
      .order('blocked_at', { ascending: false });

    if (error) {
      console.error("Error fetching blocked IPs:", error);
      toast({ title: 'Error fetching data', description: error.message, variant: 'destructive' });
    } else {
      setBlockedIPs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlockedIPs();
  }, []);

  const filteredIPs = blockedIPs.filter(ip => 
    ip.ip_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ip.reason && ip.reason.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 2. OPEN DIALOG (New or Re-block)
  const openBlockDialog = (ip = '', initialReason = '') => {
    setNewIP(ip);
    setReason(initialReason);
    setDialogMode(ip ? 'reblock' : 'new'); // If IP provided, it's a re-block
    setIsDialogOpen(true);
  };

  // 3. CONFIRM BLOCK (Handles both New and Re-block)
  const confirmBlock = async () => {
    if (!newIP || !reason) {
      toast({ title: 'Missing Fields', description: 'Please enter an IP and a reason.', variant: 'destructive' });
      return;
    }
    
    const { error } = await supabase
      .from('blocked_ips')
      .upsert({
        ip_address: newIP,
        reason: reason,
        is_active: true,
        blocked_at: new Date().toISOString(),
        unblocked_at: null
      }, { onConflict: 'ip_address' });

    if (error) {
      toast({ title: 'Error blocking IP', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: `IP ${newIP} has been blocked.` });
      setNewIP('');
      setReason('');
      setIsDialogOpen(false);
      fetchBlockedIPs();
    }
  };

  // 4. UNBLOCK (Instant)
  const handleUnblock = async (entry) => {
    const { error } = await supabase
      .from('blocked_ips')
      .update({
        is_active: false,
        unblocked_at: new Date().toISOString()
      })
      .eq('id', entry.id);

    if (error) {
      toast({ title: 'Error unblocking', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Unblocked', description: `IP ${entry.ip_address} is now allowed.` });
      // Optimistic update
      setBlockedIPs(blockedIPs.map(item => 
        item.id === entry.id ? { ...item, is_active: false, unblocked_at: new Date().toISOString() } : item
      ));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <CardTitle>Blocked IPs Management</CardTitle>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search IP or Reason..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

            <Button 
              onClick={() => openBlockDialog()} 
              className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap"
            >
              <Plus className="h-4 w-4 mr-2" />
              Block New IP
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {dialogMode === 'reblock' ? 'Re-Block IP Address' : 'Block New IP Address'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">IP Address</label>
                    <Input 
                      placeholder="e.g. 192.168.1.50" 
                      value={newIP} 
                      onChange={(e) => setNewIP(e.target.value)}
                      disabled={dialogMode === 'reblock'} // Disable IP edit for re-blocks
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reason</label>
                    <Textarea 
                      placeholder="e.g. Suspicious activity" 
                      value={reason} 
                      onChange={(e) => setReason(e.target.value)} 
                    />
                  </div>
                  <Button onClick={confirmBlock} className="w-full bg-red-600 hover:bg-red-700">
                    <Lock className="h-4 w-4 mr-2" />
                    Confirm Block
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Blocked At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
              ) : filteredIPs.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8">No matching IPs found.</TableCell></TableRow>
              ) : (
                filteredIPs.map((ip) => (
                  <TableRow key={ip.id} className={!ip.is_active ? 'bg-gray-50 opacity-75' : ''}>
                    <TableCell className="font-mono font-medium">{ip.ip_address}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{ip.reason}</TableCell>
                    <TableCell>{ip.blocked_at ? format(new Date(ip.blocked_at), 'MMM d, HH:mm') : '-'}</TableCell>
                    <TableCell>
                      {ip.is_active ? 
                        <Badge variant="destructive">Active</Badge> : 
                        <Badge variant="secondary">Unblocked</Badge>
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      {ip.is_active ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUnblock(ip)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Unlock className="h-4 w-4 mr-2" /> Unblock
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          // RE-BLOCK ACTION: Open Dialog with pre-filled data
                          onClick={() => openBlockDialog(ip.ip_address, ip.reason)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Lock className="h-4 w-4 mr-2" /> Re-Block
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};