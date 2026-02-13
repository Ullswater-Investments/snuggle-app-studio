
-- Create table for Kit Espacio de Datos inscriptions
CREATE TABLE public.kit_inscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_name TEXT NOT NULL,
  cif TEXT NOT NULL,
  address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_role TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  num_veterinarians INTEGER,
  num_employees INTEGER,
  current_software TEXT,
  has_website BOOLEAN,
  has_digital_records TEXT,
  interested_modules JSONB,
  contract_accepted BOOLEAN,
  acceptance_act_accepted BOOLEAN,
  contract_accepted_at TIMESTAMPTZ,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  communications_accepted BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.kit_inscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public registration form)
CREATE POLICY "Anyone can submit kit inscriptions"
  ON public.kit_inscriptions
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated admins can read
CREATE POLICY "Authenticated users can read kit inscriptions"
  ON public.kit_inscriptions
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Trigger for updated_at
CREATE TRIGGER update_kit_inscriptions_updated_at
  BEFORE UPDATE ON public.kit_inscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
