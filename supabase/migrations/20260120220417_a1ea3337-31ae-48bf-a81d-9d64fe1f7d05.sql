-- Insert VALERDATA partner access
INSERT INTO public.partner_access (
  partner_slug,
  partner_name,
  username,
  password_hash,
  redirect_path,
  logo_url,
  is_active,
  partner_number
) VALUES (
  'valerdata',
  'VALERDATA',
  'VALERDATA',
  crypt('valerdata11', gen_salt('bf')),
  '/partners/valerdata/miembros',
  NULL,
  true,
  11
);