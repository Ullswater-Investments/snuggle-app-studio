INSERT INTO public.system_settings (key, value)
VALUES
  ('auto_approve_assets', 'true'),
  ('catalog_visibility', 'public')
ON CONFLICT (key) DO NOTHING;