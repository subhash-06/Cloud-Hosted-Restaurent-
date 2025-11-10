-- Update verify_admin_pin function to use public.crypt
CREATE OR REPLACE FUNCTION public.verify_admin_pin(input_pin text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  stored_hash text;
BEGIN
  -- Get the active PIN hash
  SELECT pin_hash INTO stored_hash
  FROM admin_pins
  WHERE is_active = true
  LIMIT 1;
  
  -- Return true if PIN matches using public.crypt
  RETURN stored_hash = public.crypt(input_pin, stored_hash);
END;
$function$;