-- ============================================================
-- FASE 3: PRODUCTOS Y ACTIVOS DE DATOS
-- Productos específicos de la Memoria Técnica
-- ============================================================

-- 1. Insertar Definiciones de Productos
INSERT INTO data_products (id, name, category, description, version)
VALUES
  -- Identidad y Compliance (Core del negocio)
  ('bbbbbbbb-0001-0001-0001-000000000001', 'Ficha Técnica Proveedor Certificada', 'Compliance', 'Datos maestros validados (CIF, Dirección, Contactos) para alta automática en ERP. Incluye verificación KYB.', '1.0'),
  ('bbbbbbbb-0001-0001-0001-000000000002', 'Pack Certificaciones ISO & ESG', 'Sostenibilidad', 'Certificados vigentes ISO 9001, 14001, 45001 y Huella de Carbono validada por entidad acreditada.', '2024.1'),
  
  -- Operativos / Industrial
  ('bbbbbbbb-0002-0002-0002-000000000001', 'Catálogo Tarifas y Stock Tiempo Real', 'Industrial', 'API REST de disponibilidad de piezas, precios dinámicos y plazos de entrega actualizados cada hora.', 'v2.1'),
  ('bbbbbbbb-0002-0002-0002-000000000002', 'Telemetría Sensores Planta Industrial', 'IoT', 'Datos de consumo energético, vibración y temperatura de maquinaria pesada en tiempo real.', 'Live'),
  
  -- Retail / Comercio
  ('bbbbbbbb-0003-0003-0003-000000000001', 'Histórico Ventas Anonimizado', 'Comercio', 'Datos agregados de ventas retail por categoría para análisis de demanda y tendencias de mercado.', '2024-Q4'),
  
  -- Movilidad
  ('bbbbbbbb-0003-0003-0003-000000000002', 'Rutas Óptimas Flota Eléctrica', 'Movilidad Sostenible', 'Dataset de eficiencia de rutas, puntos de carga y consumo energético por trayecto.', '2025.1'),
  
  -- Agroalimentario
  ('bbbbbbbb-0004-0004-0004-000000000001', 'Trazabilidad Cadena Alimentaria', 'Agroalimentario', 'Registro completo desde origen hasta punto de venta con certificaciones fitosanitarias.', '1.2'),
  
  -- Financiero
  ('bbbbbbbb-0004-0004-0004-000000000002', 'Score Crediticio B2B', 'Financiero', 'Puntuación de riesgo crediticio basada en histórico de transacciones comerciales verificadas.', '3.0')

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  version = EXCLUDED.version;

-- 2. Crear Activos de Datos (Instancias a la venta)
-- Titan vende su Ficha Técnica
INSERT INTO data_assets (id, product_id, subject_org_id, holder_org_id, price, pricing_model, currency, status)
SELECT 
  'cccccccc-0001-0001-0001-000000000001',
  'bbbbbbbb-0001-0001-0001-000000000001',
  'aaaaaaaa-0001-0001-0001-000000000001',
  'aaaaaaaa-0001-0001-0001-000000000001',
  50.00, 'one_time', 'EUR', 'active'
WHERE EXISTS (SELECT 1 FROM organizations WHERE id = 'aaaaaaaa-0001-0001-0001-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Titan vende sus Certificados ISO
INSERT INTO data_assets (id, product_id, subject_org_id, holder_org_id, price, pricing_model, currency, status)
SELECT 
  'cccccccc-0001-0001-0001-000000000002',
  'bbbbbbbb-0001-0001-0001-000000000002',
  'aaaaaaaa-0001-0001-0001-000000000001',
  'aaaaaaaa-0001-0001-0001-000000000001',
  120.00, 'one_time', 'EUR', 'active'
WHERE EXISTS (SELECT 1 FROM organizations WHERE id = 'aaaaaaaa-0001-0001-0001-000000000001')
ON CONFLICT (id) DO NOTHING;

-- AgroBio vende Trazabilidad
INSERT INTO data_assets (id, product_id, subject_org_id, holder_org_id, price, pricing_model, currency, status)
SELECT 
  'cccccccc-0002-0002-0002-000000000001',
  'bbbbbbbb-0004-0004-0004-000000000001',
  'aaaaaaaa-0003-0003-0003-000000000001',
  'aaaaaaaa-0003-0003-0003-000000000001',
  75.00, 'one_time', 'EUR', 'active'
WHERE EXISTS (SELECT 1 FROM organizations WHERE id = 'aaaaaaaa-0003-0003-0003-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Global Retail vende Histórico de Ventas (suscripción)
INSERT INTO data_assets (id, product_id, subject_org_id, holder_org_id, price, pricing_model, billing_period, currency, status)
SELECT 
  'cccccccc-0003-0003-0003-000000000001',
  'bbbbbbbb-0003-0003-0003-000000000001',
  'aaaaaaaa-0002-0002-0002-000000000002',
  'aaaaaaaa-0002-0002-0002-000000000002',
  1500.00, 'subscription', 'monthly', 'EUR', 'active'
WHERE EXISTS (SELECT 1 FROM organizations WHERE id = 'aaaaaaaa-0002-0002-0002-000000000002')
ON CONFLICT (id) DO NOTHING;

-- EcoVolt vende Telemetría IoT
INSERT INTO data_assets (id, product_id, subject_org_id, holder_org_id, price, pricing_model, billing_period, currency, status)
SELECT 
  'cccccccc-0004-0004-0004-000000000001',
  'bbbbbbbb-0002-0002-0002-000000000002',
  'aaaaaaaa-0001-0001-0001-000000000003',
  'aaaaaaaa-0001-0001-0001-000000000003',
  200.00, 'subscription', 'monthly', 'EUR', 'active'
WHERE EXISTS (SELECT 1 FROM organizations WHERE id = 'aaaaaaaa-0001-0001-0001-000000000003')
ON CONFLICT (id) DO NOTHING;

-- Verificación
SELECT dp.name as producto, da.price, da.pricing_model, o.name as proveedor
FROM data_assets da
JOIN data_products dp ON da.product_id = dp.id
JOIN organizations o ON da.subject_org_id = o.id
WHERE o.is_demo = true
ORDER BY da.price DESC;
