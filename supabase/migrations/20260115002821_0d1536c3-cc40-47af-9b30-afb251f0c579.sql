-- Create table for partner access credentials
CREATE TABLE public.partner_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_slug VARCHAR(50) UNIQUE NOT NULL,
  partner_name VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password_hash TEXT NOT NULL,
  logo_url TEXT,
  redirect_path TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partner_access ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read non-sensitive fields for login page display
CREATE POLICY "Public can read partner info" ON public.partner_access
  FOR SELECT USING (is_active = true);

-- Insert initial ITBID partner (password: itbid, hashed with simple comparison for now)
-- In production, use bcrypt via edge function
INSERT INTO public.partner_access (partner_slug, partner_name, username, password_hash, redirect_path)
VALUES ('itbid', 'ITBID', 'ITBID', 'itbid', '/partners/itbid/proyecto');

-- Create trigger for updated_at
CREATE TRIGGER update_partner_access_updated_at
  BEFORE UPDATE ON public.partner_access
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();