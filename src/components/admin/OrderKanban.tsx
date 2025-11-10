import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import { ChevronRight, Package, Clock, CheckCircle, Truck, Home } from 'lucide-react';
import { format } from 'date-fns';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: string;
  total_amount: number;
  order_items: any;
  created_at: string;
}

const STATUSES = [
  { value: 'placed', label: 'Placed', icon: Package, color: 'bg-blue-500' },
  { value: 'preparing', label: 'Preparing', icon: Clock, color: 'bg-orange-500' },
  { value: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, color: 'bg-purple-500' },
  { value: 'delivered', label: 'Delivered', icon: Home, color: 'bg-gray-500' },
];

export const OrderKanban = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const adminPin = sessionStorage.getItem('admin_pin');
      
      if (!adminPin) {
        toast({ title: 'Admin PIN not found', description: 'Please log in again', variant: 'destructive' });
        return;
      }

      const { data, error } = await supabase.functions.invoke('admin-get-orders', {
        headers: { 'x-admin-pin': adminPin },
      });

      if (error) {
        throw error;
      }

      setOrders((data as any)?.orders || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({ title: 'Error fetching orders', variant: 'destructive' });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const moveToNextStage = async (order: Order) => {
    const currentIndex = STATUSES.findIndex(s => s.value === order.status);
    if (currentIndex === -1 || currentIndex === STATUSES.length - 1) return;

    const nextStatus = STATUSES[currentIndex + 1].value;
    await updateOrderStatus(order.id, nextStatus);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const adminPin = sessionStorage.getItem('admin_pin');
      
      if (!adminPin) {
        toast({ title: 'Admin PIN not found', description: 'Please log in again', variant: 'destructive' });
        return;
      }

      const { error } = await supabase.functions.invoke('admin-update-order', {
        headers: { 'x-admin-pin': adminPin },
        body: { orderId, status: newStatus },
      });

      if (error) {
        throw error;
      }

      toast({ title: 'Order status updated successfully' });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast({ title: 'Error updating order', variant: 'destructive' });
    }
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 h-full">
        {STATUSES.map((status) => {
          const statusOrders = getOrdersByStatus(status.value);
          const StatusIcon = status.icon;
          
          return (
            <Card key={status.value} className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <StatusIcon className="h-4 w-4" />
                  {status.label}
                  <Badge variant="secondary" className="ml-auto">
                    {statusOrders.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-3 overflow-auto">
                {statusOrders.map((order) => (
                  <Card
                    key={order.id}
                    className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-2">
                      <div 
                        className="font-mono text-xs text-primary hover:underline"
                        onClick={() => setSelectedOrder(order)}
                      >
                        #{order.id.substring(0, 8)}
                      </div>
                      <div className="text-sm font-medium">{order.customer_name}</div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(order.created_at), 'MMM d, HH:mm')}
                      </div>
                      <div className="text-sm font-bold">₹{Number(order.total_amount).toFixed(2)}</div>
                      
                      {status.value !== 'delivered' && (
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => moveToNextStage(order)}
                        >
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Move to {STATUSES[STATUSES.findIndex(s => s.value === order.status) + 1]?.label}
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
                {statusOrders.length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    No orders
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-auto">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
          </SheetHeader>
          {selectedOrder && (
            <div className="space-y-6 mt-6">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-mono text-sm font-medium">{selectedOrder.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedOrder.customer_phone}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{selectedOrder.customer_email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">{format(new Date(selectedOrder.created_at), 'MMMM d, yyyy HH:mm')}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">Order Items</p>
                <div className="space-y-2">
                  {selectedOrder.order_items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span>₹{Number(selectedOrder.total_amount).toFixed(2)}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Update Status</p>
                <div className="space-y-2">
                  {STATUSES.map((status) => (
                    <Button
                      key={status.value}
                      variant={selectedOrder.status === status.value ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, status.value);
                        setSelectedOrder(null);
                      }}
                    >
                      <status.icon className="h-4 w-4 mr-2" />
                      {status.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};