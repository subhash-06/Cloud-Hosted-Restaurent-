-- Create function to verify admin PIN
CREATE OR REPLACE FUNCTION public.verify_admin_pin(input_pin text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stored_hash text;
BEGIN
  -- Get the active PIN hash
  SELECT pin_hash INTO stored_hash
  FROM admin_pins
  WHERE is_active = true
  LIMIT 1;
  
  -- Return true if PIN matches
  RETURN stored_hash = crypt(input_pin, stored_hash);
END;
$$;