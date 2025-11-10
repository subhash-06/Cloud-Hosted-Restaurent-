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

# Small wrapper server that routes any PATH /<function-name> to that module       
# Create it inline
RUN printf '%s\n' "import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';" \
    "import { extname } from 'https://deno.land/std@0.190.0/path/mod.ts';" \
    "const routes = {};" \
    "for (const entry of Deno.readDirSync('./supabase/functions')) {" \
    "  if (entry.isDirectory) {" \
    "    const mod = await import(`./supabase/functions/${entry.name}/index.ts`);" \
    "    routes[`/${entry.name}`] = mod.default ?? mod;" \
    "  }" \
    "}" \
    "serve((req) => {" \
    "  const url = new URL(req.url);" \
    "  const fn = routes[url.pathname.replace(/\/$/, '')];" \
    "  return fn ? fn(req) : new Response('Not Found', { status: 404 });" \
    "}, { port: 8080 });" > main.ts

EXPOSE 8080

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]
