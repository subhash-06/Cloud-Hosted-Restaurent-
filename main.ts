import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

type Handler = (req: Request) => Promise<Response> | Response;
const routes: Record<string, Handler> = {};

for await (const entry of Deno.readDir("./supabase/functions")) {
  if (entry.isDirectory) {
    try {
      const path = `./supabase/functions/${entry.name}/index.ts`;
      const mod = await import(path);
      routes[`/${entry.name}`] = (mod.default ?? mod) as Handler;
    } catch (err) {
      console.error(`Failed to load function ${entry.name}:`, err);
    }
  }
}

console.log("Edge functions loaded:", Object.keys(routes));
const port = Number(Deno.env.get("PORT") ?? 8080);
console.log(`Listening on port ${port}...`);

serve((req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/$/, "");
  const handler = routes[path];
  return handler ? handler(req) : new Response("Not Found", { status: 404 });
}, { port });
