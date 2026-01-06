-- ============================================================
-- FASE 1: ORGANIZACIONES ADICIONALES
-- Compatible con enum: 'consumer' | 'provider' | 'data_holder'
-- ============================================================

-- Insertar organizaciones de la Memoria Técnica que no existan
INSERT INTO organizations (id, name, type, sector, tax_id, kyb_verified, is_demo, description)
VALUES
  -- Industriales (Providers)
  ('aaaaaaaa-0001-0001-0001-000000000001', 'Titan Manufacturas S.A.', 'provider', 'Industrial', 'A-28000001', true, true, 'Fabricante líder de componentes industriales de precisión'),
  ('aaaaaaaa-0001-0001-0001-000000000002', 'Iberia Industrial Supplies', 'provider', 'Industrial', 'B-28000002', true, true, 'Distribuidor mayorista de suministros industriales'),
  ('aaaaaaaa-0001-0001-0001-000000000003', 'EcoVolt Generación', 'provider', 'Energía', 'A-28000003', true, true, 'Generación de energía renovable y soluciones de eficiencia'),
  
  -- Consumidores
  ('aaaaaaaa-0002-0002-0002-000000000001', 'Constructora Horizonte', 'consumer', 'Construcción', 'B-28000004', true, true, 'Constructora especializada en edificación sostenible'),
  ('aaaaaaaa-0002-0002-0002-000000000002', 'Global Retail Group', 'consumer', 'Comercio', 'A-08000001', true, true, 'Grupo líder en distribución minorista'),
  ('aaaaaaaa-0002-0002-0002-000000000003', 'EcoMotion Flotas', 'consumer', 'Movilidad Sostenible', 'B-46000001', true, true, 'Gestión de flotas eléctricas y movilidad verde'),
  
  -- Agroalimentario y Salud (Providers)
  ('aaaaaaaa-0003-0003-0003-000000000001', 'AgroBio Foods Koop', 'provider', 'Agroalimentario', 'F-20000001', true, true, 'Cooperativa de producción agroalimentaria ecológica'),
  ('aaaaaaaa-0003-0003-0003-000000000002', 'PharmaCare Labs', 'provider', 'Salud', 'A-33000001', true, true, 'Laboratorio farmacéutico especializado'),
  
  -- Data Holders (Servicios Financieros y Tecnológicos)
  ('aaaaaaaa-0004-0004-0004-000000000001', 'Capital Trade Bank', 'data_holder', 'Financiero', 'A-80000001', true, true, 'Entidad financiera especializada en trade finance B2B'),
  ('aaaaaaaa-0004-0004-0004-000000000002', 'TechSolutions ERP', 'data_holder', 'Tecnológico', 'B-50000001', true, true, 'Proveedor de soluciones ERP y digitalización empresarial')

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  kyb_verified = EXCLUDED.kyb_verified;

-- Verificación
SELECT name, type, sector FROM organizations WHERE is_demo = true ORDER BY type, sector;
