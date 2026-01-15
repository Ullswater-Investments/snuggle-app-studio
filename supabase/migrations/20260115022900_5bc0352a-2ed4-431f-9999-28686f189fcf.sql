-- Insertar AERCE en la tabla partner_access
INSERT INTO partner_access (
  partner_slug,
  partner_name,
  partner_number,
  username,
  password_hash,
  redirect_path,
  is_active,
  logo_url
) VALUES (
  'aerce',
  'AERCE',
  5,
  'AERCE',
  '$2a$10$placeholder_hash_for_aerce5',
  '/partners/aerce/miembros',
  true,
  '/lovable-uploads/f72d5c01-0779-4cb5-bf22-feb5375a9de3.png'
);