# Supabase Edge Functions — Cloud Run container
# Uses Deno runtime and copies all functions in supabase/functions/

FROM denoland/deno:1.39.0

# Enable permissions needed by edge-function code
# --allow-net: outgoing HTTP (Supabase, Stripe)
# --allow-env: read env vars passed by Cloud Run
# --allow-read: read bundled files (menuPrices.ts etc.)

WORKDIR /app

# Copy edge functions source
COPY supabase/functions ./supabase/functions

# Copy prewritten router
COPY main.ts ./main.ts
EXPOSE 8080

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]
