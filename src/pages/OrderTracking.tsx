import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, Clock, Truck, Package } from "lucide-react";
import { toast } from "sonner";

type OrderStatus = "placed" | "preparing" | "out_for_delivery" | "delivered";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  order_items: Array<{ name: string; price: number; quantity: number }>;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

const statusSteps = [
  { key: "placed", label: "Order Placed", icon: Package },
  { key: "preparing", label: "Preparing", icon: Clock },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      toast.error("No order ID provided");
      navigate("/");
      return;
    }

    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

        if (error) throw error;

        setOrder(data as unknown as Order);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  const getCurrentStepIndex = (status: OrderStatus) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-6">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">Order not found</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const currentStepIndex = getCurrentStepIndex(order.status);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-8 text-center">
            Order Tracking
          </h1>

          <div className="space-y-8">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-semibold">{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{order.customer_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold">{order.customer_phone}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Order Items</p>
                  <div className="space-y-2">
                    {order.order_items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-semibold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2 border-t mt-2">
                    <span className="font-bold">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ₹{parseFloat(order.total_amount.toString()).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative flex items-center justify-between gap-4">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                      <div key={step.key} className="flex flex-col items-center flex-1 relative">
                        {/* Connecting Line */}
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${
                              index < currentStepIndex ? "bg-primary" : "bg-border"
                            }`}
                          />
                        )}

                        {/* Icon */}
                        <div
                          className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                            isCompleted
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-background border-border text-muted-foreground"
                          } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Label */}
                        <div className="text-center mt-3">
                          <h3
                            className={`font-semibold text-sm ${
                              isCompleted ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            {step.label}
                          </h3>
                          {isCurrent && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Current status
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTracking;
