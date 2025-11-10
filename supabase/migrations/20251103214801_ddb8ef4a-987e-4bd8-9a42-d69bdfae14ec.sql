-- Drop existing table if it exists and recreate with correct PIN
DROP TABLE IF EXISTS public.admin_pins CASCADE;

-- Create admin_pins table for PIN-based authentication
CREATE TABLE public.admin_pins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pin_hash text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_pins ENABLE ROW LEVEL SECURITY;

-- Allow admins to manage PINs
CREATE POLICY "Admins can manage admin PINs"
ON public.admin_pins
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Allow anonymous users to read PINs for verification
CREATE POLICY "Anyone can read active PINs for verification"
ON public.admin_pins
FOR SELECT
USING (is_active = true);

-- Insert default admin PIN: 2002 (hashed with bcrypt)
INSERT INTO public.admin_pins (pin_hash, description, is_active)
VALUES (
  crypt('2002', gen_salt('bf')),
  'Default admin PIN for college project',
  true
);