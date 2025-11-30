-- Arreglar search_path mutable en función del trigger
CREATE OR REPLACE FUNCTION update_wallet_timestamp()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;