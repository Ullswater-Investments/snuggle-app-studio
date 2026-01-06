-- Crear organizaciones demo para el Reverse Marketplace
INSERT INTO public.organizations (id, name, tax_id, type, kyb_verified, sector, description, is_demo)
VALUES
  ('11111111-2222-3333-4444-000000000001', 'Retail Giant Corp', 'ES12345678A', 'consumer', true, 'retail', 'Cadena líder de distribución retail en España', true),
  ('11111111-2222-3333-4444-000000000002', 'Green Finance Bank', 'ES87654321B', 'consumer', true, 'finance', 'Banco especializado en inversiones sostenibles', true),
  ('11111111-2222-3333-4444-000000000003', 'Logistics AI Solutions', 'ES11223344C', 'consumer', false, 'logistics', 'Startup de optimización logística con IA', true),
  ('11111111-2222-3333-4444-000000000004', 'EcoTech Industrial', 'ES55667788D', 'consumer', true, 'manufacturing', 'Fabricante de equipos industriales sostenibles', true),
  ('11111111-2222-3333-4444-000000000005', 'AgriData Consulting', 'ES99001122E', 'consumer', true, 'agrifood', 'Consultora de datos agrícolas y alimentarios', true)
ON CONFLICT (id) DO NOTHING;

-- Insertar oportunidades de demanda de datos (Reverse Marketplace)
INSERT INTO public.marketplace_opportunities 
  (consumer_org_id, title, description, category, budget_range, status, expires_at)
VALUES
  (
    '11111111-2222-3333-4444-000000000001',
    'Tráfico Peatonal Q1 2026 - Zona Centro Madrid',
    'Buscamos datasets de afluencia peatonal en zonas comerciales de Madrid Centro para análisis de campaña de primavera. Datos georeferenciados, preferiblemente con granularidad horaria.',
    'Retail',
    '2,500 - 4,000 EUROe',
    'active',
    '2026-02-15'
  ),
  (
    '11111111-2222-3333-4444-000000000002',
    'Datos ESG de Proveedores Textiles Asia',
    'Necesitamos reportes de emisiones Scope 3 de fábricas textiles en el sudeste asiático, preferiblemente validados en blockchain o con certificación ISO 14064.',
    'ESG',
    '5,000 - 8,000 EUROe',
    'active',
    '2026-03-01'
  ),
  (
    '11111111-2222-3333-4444-000000000004',
    'Dataset IoT Sensores de Maquinaria Industrial',
    'Histórico de 3 años de telemetría de sensores industriales (temperatura, vibración, consumo energético) para entrenar modelos de mantenimiento predictivo.',
    'Tech',
    '3,000 - 6,000 EUROe',
    'active',
    '2026-02-28'
  ),
  (
    '11111111-2222-3333-4444-000000000003',
    'Histórico Rutas Marítimas Atlántico Norte',
    'Dataset de 5 años de rutas marítimas comerciales en el Atlántico Norte con incidencias meteorológicas y tiempos de tránsito para optimización logística.',
    'Logistics',
    '1,500 - 3,000 EUROe',
    'active',
    '2026-01-30'
  ),
  (
    '11111111-2222-3333-4444-000000000001',
    'Modelos de Predicción de Demanda Retail',
    'Buscamos acceso a modelos de ML pre-entrenados o datasets para entrenar predicción de demanda en sector retail. Formato compatible con Python/TensorFlow.',
    'AI',
    '4,000 - 7,000 EUROe',
    'active',
    '2026-03-15'
  );