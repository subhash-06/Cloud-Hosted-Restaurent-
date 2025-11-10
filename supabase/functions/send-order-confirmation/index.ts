import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderConfirmationRequest {
  orderId: string;
  customerName: string;
  customerEmail: string;
  orderItems: OrderItem[];
  totalAmount: number;
  trackingUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, customerName, customerEmail, orderItems, totalAmount, trackingUrl }: OrderConfirmationRequest = await req.json();

    // Validate inputs
    if (!orderId || typeof orderId !== 'string' || orderId.length > 100) {
      throw new Error("Invalid order ID");
    }
    if (!customerName || typeof customerName !== 'string' || customerName.length > 100) {
      throw new Error("Invalid customer name");
    }
    if (!customerEmail || typeof customerEmail !== 'string' || !customerEmail.includes('@') || customerEmail.length > 255) {
      throw new Error("Invalid email address");
    }
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      throw new Error("Invalid order items");
    }
    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      throw new Error("Invalid amount");
    }
    if (!trackingUrl || typeof trackingUrl !== 'string' || !trackingUrl.startsWith('http')) {
      throw new Error("Invalid tracking URL");
    }

    // Sanitize customer name for HTML (basic XSS protection)
    const safeName = customerName.substring(0, 100).replace(/[<>&"']/g, (char) => {
      const entities: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' };
      return entities[char] || char;
    });

    const orderItemsHtml = orderItems.map(item => {
      // Sanitize item names
      const safeName = String(item.name).substring(0, 200).replace(/[<>&"']/g, (char) => {
        const entities: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' };
        return entities[char] || char;
      });
      return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${safeName}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${Number(item.quantity)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${Number(item.price).toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
      </tr>
    `;
    }).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Order Confirmed!</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Hi ${safeName},</p>
            
            <p style="font-size: 16px; margin-bottom: 30px;">Thank you for your order! We've received your order and it's being prepared.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #667eea; margin-top: 0; font-size: 20px;">Order Details</h2>
              <p style="margin: 10px 0;"><strong>Order ID:</strong> ${orderId}</p>
              
              <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f3f4f6;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Item</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Qty</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; font-size: 18px;">Total:</td>
                    <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 18px; color: #667eea;">$${totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${trackingUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                Track Your Order
              </a>
            </div>
            
            <p style="font-size: 14px; color: #6b7280; margin-top: 30px; text-align: center;">
              If you have any questions, please don't hesitate to contact us.
            </p>
          </div>
        </body>
      </html>
    `;

    // Email sending temporarily disabled; returning success
    return new Response(JSON.stringify({ success: true, message: 'Email sending disabled' }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("[Internal] Email error:", error);
    
    // Return generic error to client
    let errorMessage = "Failed to send confirmation email";
    if (error.message && error.message.includes("Invalid")) {
      errorMessage = error.message;
    }
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
