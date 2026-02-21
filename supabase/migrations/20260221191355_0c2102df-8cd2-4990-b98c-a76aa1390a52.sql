
INSERT INTO public.system_settings (key, value)
VALUES
  ('require_email_verification', 'false'),
  ('require_kyc', 'false'),
  ('require_kyb', 'false'),
  ('ecosystem_status', 'active')
ON CONFLICT (key) DO NOTHING;
