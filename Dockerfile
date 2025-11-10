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

# Wrapper server that maps /function-name to supabase/functions/<name>/index.ts
RUN cat <<'EOF' > main.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Type for Edge Function handlers
type Handler = (req: Request) => Promise<Response> | Response;
const routes: Record<string, Handler> = {};

for await (const entry of Deno.readDir("./supabase/functions")) {
  if (entry.isDirectory) {
    const mod = await import(`./supabase/functions/${entry.name}/index.ts`);
    routes[`/${entry.name}`] = (mod.default ?? mod) as Handler;
  }
}

serve((req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/$/, "");
  const handler = routes[path];
  return handler ? handler(req) : new Response("Not Found", { status: 404 });
}, { port: 8080 });
EOF

EXPOSE 8080

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]
