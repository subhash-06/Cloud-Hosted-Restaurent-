import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
}, { port: Number(Deno.env.get("PORT") ?? 8080) });
