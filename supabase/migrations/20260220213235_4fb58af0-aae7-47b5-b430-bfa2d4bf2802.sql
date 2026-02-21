
-- Create system_settings table
CREATE TABLE public.system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read settings"
ON public.system_settings FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and DSO can insert settings"
ON public.system_settings FOR INSERT
TO authenticated
WITH CHECK (
  has_role(auth.uid(), get_user_organization(auth.uid()), 'admin'::app_role)
  OR is_data_space_owner(auth.uid())
);

CREATE POLICY "Admins and DSO can update settings"
ON public.system_settings FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), get_user_organization(auth.uid()), 'admin'::app_role)
  OR is_data_space_owner(auth.uid())
);

INSERT INTO public.system_settings (key, value)
VALUES ('blockchain_rpc_url', 'https://rpc.test.pontus-x.eu');
