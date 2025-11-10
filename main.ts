import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Each function in supabase/functions/<name>/index.ts should export a default handler
type Handler = (req: Request) => Promise<Response> | Response;
const routes: Record<string, Handler> = {};

// Dynamically load all edge functions at startup
for await (const entry of Deno.readDir("./supabase/functions")) {
  if (entry.isDirectory) {
    try {
      const path = `./supabase/functions/${entry.name}/index.ts`;
      const mod = await import(path);
      const handler = (mod.default ?? mod) as Handler;
      routes[`/${entry.name}`] = handler;
      console.log(`✅ Loaded function: /${entry.name}`);
    } catch (err) {
      console.error(`❌ Failed to load function ${entry.name}:`, err);
    }
  }
}

// Log all available routes
console.log("✅ All routes loaded:", Object.keys(routes));

// Determine port (Cloud Run provides PORT env variable)
const port = Number(Deno.env.get("PORT") ?? 8080);
console.log(`🚀 Server listening on http://localhost:${port}`);

// Main server — routes requests to the correct handler
serve(async (req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/$/, ""); // remove trailing slash
  const handler = routes[path];

  if (handler) {
    try {
      return await handler(req);
    } catch (err) {
      console.error(`💥 Error in handler ${path}:`, err);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  // Health check or unknown path
  if (path === "/" || path === "") {
    return new Response(
      JSON.stringify({
        message: "🟢 Supabase Edge Functions API running",
        routes: Object.keys(routes),
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response("Not Found", { status: 404 });
}, { port });
