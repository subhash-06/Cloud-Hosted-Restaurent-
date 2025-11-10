-- Prevent anonymous orders from being read by anyone except admins
-- This ensures customer data in anonymous orders cannot be exposed

CREATE POLICY "Prevent reading anonymous orders"
ON public.orders
FOR SELECT
USING (
  -- Only allow reading orders that have a user_id (authenticated orders)
  -- Anonymous orders (user_id IS NULL) can only be read by admins
  (user_id IS NOT NULL AND auth.uid() = user_id) 
  OR has_role(auth.uid(), 'admin'::app_role)
);