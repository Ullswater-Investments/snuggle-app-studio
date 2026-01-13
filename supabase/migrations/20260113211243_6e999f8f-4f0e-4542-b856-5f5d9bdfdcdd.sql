-- Add new columns for qualified signature support
ALTER TABLE public.signed_contracts 
ADD COLUMN IF NOT EXISTS signature_type TEXT DEFAULT 'simple',
ADD COLUMN IF NOT EXISTS document_hash TEXT,
ADD COLUMN IF NOT EXISTS signed_document_url TEXT,
ADD COLUMN IF NOT EXISTS eidas_level TEXT DEFAULT 'simple',
ADD COLUMN IF NOT EXISTS certificate_serial TEXT,
ADD COLUMN IF NOT EXISTS certificate_issuer TEXT,
ADD COLUMN IF NOT EXISTS signature_provider TEXT;

-- Create storage bucket for signed contracts
INSERT INTO storage.buckets (id, name, public) 
VALUES ('signed-contracts', 'signed-contracts', false)
ON CONFLICT (id) DO NOTHING;

-- Create policy for authenticated users to upload signed contracts
CREATE POLICY "Anyone can upload signed contracts"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'signed-contracts');

-- Create policy for authenticated users to read their signed contracts
CREATE POLICY "Authenticated users can read signed contracts"
ON storage.objects
FOR SELECT
USING (bucket_id = 'signed-contracts');

-- Create policy for admins to read all signed contracts
CREATE POLICY "Admins can read all signed contracts"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'signed-contracts' 
  AND EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role = 'admin'
  )
);