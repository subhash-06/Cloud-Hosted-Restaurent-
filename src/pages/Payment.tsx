import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

const PaymentForm = ({ clientSecret, onSuccess }: { clientSecret: string; onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        onSuccess();
      }
    } catch (err) {
      toast.error("An error occurred during payment");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full" 
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>
    </form>
  );
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const orderData = location.state;

  useEffect(() => {
    if (!orderData || !orderData.amount || !orderData.customerDetails) {
      toast.error("Invalid order data");
      navigate("/checkout");
      return;
    }

    const createPaymentIntent = async () => {
      try {
        // Send cart items for server-side validation
        const { data, error } = await supabase.functions.invoke("create-payment-intent", {
          body: {
            cartItems: items.map(item => ({
              name: item.name,
              quantity: item.quantity
            })),
            customerDetails: orderData.customerDetails,
          },
        });

        if (error) throw error;

        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        toast.error("Failed to initialize payment");
        navigate("/checkout");
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [orderData, navigate]);

  const handlePaymentSuccess = async () => {
    try {
      if (!user) {
        toast.error("Authentication required");
        navigate("/auth");
        return;
      }

      // Create order record in database
      const { data: newOrder, error } = await supabase
        .from("orders")
        .insert([{
          user_id: user.id,
          customer_name: orderData.customerDetails.name,
          customer_email: orderData.customerDetails.email,
          customer_phone: orderData.customerDetails.phone,
          order_items: items as any,
          total_amount: totalPrice,
          status: "placed",
        }])
        .select()
        .single();

      if (error) throw error;

      // Send order confirmation email and SMS
      const trackingUrl = `${window.location.origin}/order-tracking?id=${newOrder.id}`;
      
      try {
        await supabase.functions.invoke('send-order-confirmation', {
          body: {
            orderId: newOrder.id,
            customerName: newOrder.customer_name,
            customerEmail: newOrder.customer_email,
            orderItems: newOrder.order_items,
            totalAmount: newOrder.total_amount,
            trackingUrl,
          },
        });
        console.log('Order confirmation email sent successfully');
      } catch (notificationError) {
        console.error('Error sending order confirmation:', notificationError);
        // Don't block the user flow if notifications fail
      }

      // Clear cart and navigate to order tracking
      clearCart();
      navigate(`/order-tracking?id=${newOrder.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    }
  };

  if (!orderData) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-24 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-8 text-center">
            Payment
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>Complete Your Payment</CardTitle>
              <p className="text-muted-foreground">
                Total Amount: <span className="text-2xl font-bold text-primary">₹{orderData.amount?.toFixed(2)}</span>
              </p>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentForm clientSecret={clientSecret} onSuccess={handlePaymentSuccess} />
                </Elements>
              ) : (
                <p className="text-destructive">Failed to initialize payment</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
