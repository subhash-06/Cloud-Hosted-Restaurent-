FROM denoland/deno:1.39.0

WORKDIR /app

# Copy source code
COPY supabase/functions ./supabase/functions
COPY main.ts ./

EXPOSE 8080

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]
