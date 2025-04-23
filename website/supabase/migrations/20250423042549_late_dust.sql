/*
  # Add trigger for automatic portfolio creation
  
  1. Changes
    - Create trigger function to automatically create a portfolio for new users
    - Add trigger to auth.users table to execute the function on user creation
  
  2. Security
    - Function executes with security definer to bypass RLS
    - Only triggered on new user creation
*/

-- Create the trigger function
CREATE OR REPLACE FUNCTION public.create_portfolio_for_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.portfolios (user_id, cash_balance)
  VALUES (NEW.id, 100000);
  RETURN NEW;
END;
$$;

-- Add the trigger to the auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_portfolio_for_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;