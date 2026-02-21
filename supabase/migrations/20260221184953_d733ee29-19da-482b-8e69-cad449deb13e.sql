
-- Create governance_logs table
CREATE TABLE public.governance_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  level text NOT NULL CHECK (level IN ('info', 'warn', 'error')),
  category text NOT NULL CHECK (category IN ('user_registration', 'asset_verification', 'config_change', 'system')),
  message text NOT NULL,
  actor_id uuid NULL,
  metadata jsonb NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.governance_logs ENABLE ROW LEVEL SECURITY;

-- SELECT policy for admins and data_space_owners
CREATE POLICY "Admins and DSO can view governance logs"
ON public.governance_logs
FOR SELECT
USING (
  has_role(auth.uid(), get_user_organization(auth.uid()), 'admin'::app_role)
  OR is_data_space_owner(auth.uid())
);

-- INSERT policy - only system (service role) can insert directly
-- But we also allow admins to insert for config_change logging
CREATE POLICY "Admins can insert governance logs"
ON public.governance_logs
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), get_user_organization(auth.uid()), 'admin'::app_role)
  OR is_data_space_owner(auth.uid())
);

-- Seed data
INSERT INTO public.governance_logs (level, category, message, created_at) VALUES
('info', 'user_registration', 'Nuevo usuario registrado en la organización Tornillería TÉCNICA S.A.', now() - interval '5 days'),
('info', 'user_registration', 'Nuevo usuario registrado en la organización Soluciones Químicas del Sur S.L.', now() - interval '4 days'),
('info', 'asset_verification', 'Dataset 33333333-3333-3333-3333-000000000001 verificado por el administrador', now() - interval '3 days'),
('warn', 'system', 'Latencia elevada detectada en el proveedor de identidad', now() - interval '2 days'),
('info', 'config_change', 'URL del RPC actualizada a https://rpc.test.pontus-x.eu', now() - interval '1 day'),
('error', 'system', 'Fallo temporal en la conexión con Aquarius. Servicio restaurado automáticamente.', now() - interval '12 hours'),
('info', 'asset_verification', 'Dataset 33333333-3333-3333-3333-000000000005 verificado y publicado en el marketplace', now() - interval '2 hours');

-- Insert blockchain_chain_id setting
INSERT INTO public.system_settings (key, value)
VALUES ('blockchain_chain_id', '32457')
ON CONFLICT DO NOTHING;
