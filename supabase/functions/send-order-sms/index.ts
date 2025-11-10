const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderSMSRequest {
  orderId: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  trackingUrl: string;
}

export default async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      orderId,
      customerName,
      customerPhone,
      totalAmount,
      trackingUrl,
    }: OrderSMSRequest = await req.json();

    // Validate inputs
    if (!orderId || typeof orderId !== "string" || orderId.length > 100) {
      throw new Error("Invalid order ID");
    }
    if (!customerName || typeof customerName !== "string" || customerName.length > 100) {
      throw new Error("Invalid customer name");
    }
    if (!customerPhone || typeof customerPhone !== "string") {
      throw new Error("Invalid phone number");
    }
    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      throw new Error("Invalid amount");
    }
    if (!trackingUrl || typeof trackingUrl !== "string" || !trackingUrl.startsWith("http")) {
      throw new Error("Invalid tracking URL");
    }

    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.error("[Internal] Twilio credentials not configured");
      throw new Error("SMS service not configured");
    }

    // Format phone number to E.164
    let formattedPhone = customerPhone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+1" + formattedPhone.replace(/\D/g, "");
    }

    // Sanitize name for SMS
    const safeName = customerName.substring(0, 50).replace(/[<>]/g, "");
    const message = `Hi ${safeName}! Your order #${orderId.slice(
      0,
      8
    )} for $${totalAmount.toFixed(
      2
    )} has been confirmed. Track your order: ${trackingUrl}`;

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const formData = new URLSearchParams();
    formData.append("To", formattedPhone);
    formData.append("From", twilioPhoneNumber);
    formData.append("Body", message);

    const response = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${accountSid}:${authToken}`),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Internal] Twilio API error:", data);
      throw new Error("SMS delivery failed");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("[Internal] SMS error:", error);

    let errorMessage = "Failed to send SMS notification";
    if (error.message && error.message.includes("Invalid")) {
      errorMessage = error.message;
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};
