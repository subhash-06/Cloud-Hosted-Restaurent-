import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { MENU_PRICES } from "./menuPrices.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export default async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Authentication failed");
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error("[Internal] STRIPE_SECRET_KEY not configured");
      throw new Error("Payment system configuration error");
    }

    const { cartItems, customerDetails } = await req.json();

    // Validate customer details
    if (
      !customerDetails ||
      typeof customerDetails.email !== "string" ||
      !customerDetails.email.includes("@") ||
      typeof customerDetails.name !== "string" ||
      customerDetails.name.length < 1 ||
      customerDetails.name.length > 100
    ) {
      throw new Error("Invalid customer details");
    }

    // Validate cart items
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("Invalid cart items");
    }

    // Calculate total from server-side menu prices (INR)
    const normalizeName = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
    const NORMALIZED_MENU: Record<string, number> = Object.fromEntries(
      Object.entries(MENU_PRICES).map(([k, v]) => [normalizeName(k), v])
    );

    let calculatedTotal = 0;
    for (const item of cartItems) {
      const { name, quantity } = item;

      if (!name || typeof name !== "string") {
        throw new Error("Invalid item name");
      }

      if (!quantity || typeof quantity !== "number" || quantity < 1 || quantity > 100) {
        throw new Error("Invalid item quantity");
      }

      let key = normalizeName(name);
      let price = NORMALIZED_MENU[key];

      if (price === undefined && name.includes(" - ")) {
        const itemNameOnly = name.split(" - ").slice(1).join(" - ");
        key = normalizeName(itemNameOnly);
        price = NORMALIZED_MENU[key];
      }

      if (price === undefined) {
        console.error(`[Security] Unknown menu item: ${name}`);
        throw new Error("Invalid menu item");
      }

      calculatedTotal += price * quantity;
    }

    if (calculatedTotal <= 0 || calculatedTotal > 100000) {
      throw new Error("Invalid order total");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(calculatedTotal * 100), // Convert to paisa (INR)
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      receipt_email: customerDetails.email,
      metadata: {
        customer_name: customerDetails.name.substring(0, 100),
        customer_phone: customerDetails.phone || "",
        customer_email: customerDetails.email,
        user_id: user.id,
      },
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("[Internal] Payment intent error:", error);

    let statusCode = 500;
    let errorMessage = "Payment processing failed. Please try again.";

    if (error instanceof Error) {
      if (error.message.includes("Authentication")) {
        statusCode = 401;
        errorMessage = "Authentication required";
      } else if (error.message.includes("Invalid")) {
        statusCode = 400;
        errorMessage = error.message;
      }
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: statusCode,
    });
  }
};
