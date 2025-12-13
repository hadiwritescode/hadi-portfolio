-- Create trigger function to auto-create admin profile
CREATE OR REPLACE FUNCTION public.handle_new_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only create admin profile if user has is_admin metadata
  IF NEW.raw_user_meta_data->>'is_admin' = 'true' THEN
    INSERT INTO public.admin_profiles (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS on_auth_admin_created ON auth.users;

CREATE TRIGGER on_auth_admin_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin();
