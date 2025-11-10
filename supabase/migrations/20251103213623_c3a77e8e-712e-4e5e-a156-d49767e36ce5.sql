-- Add INSERT policy for activity_logs table
-- This allows authenticated users and service role to create log entries
CREATE POLICY "Authenticated users can insert activity logs"
ON public.activity_logs
FOR INSERT
WITH CHECK (
  -- Allow service role (for edge functions) or authenticated users
  auth.uid() IS NOT NULL
);