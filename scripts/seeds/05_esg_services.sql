-- ============================================================
-- FASE 5: ESG, SERVICIOS DE VALOR Y OPORTUNIDADES
-- Columnas ESG válidas: scope1_total_tons, scope2_total_tons (NO scope3)
-- ============================================================

-- 1. Reportes ESG (Para gráficos de Sostenibilidad)
-- Titan Manufacturas - 3 años para mostrar tendencia de mejora
INSERT INTO esg_reports (id, organization_id, report_year, scope1_total_tons, scope2_total_tons, energy_renewable_percent, certifications)
VALUES
  ('eeeeeeee-0001-0001-0001-000000000001', 'aaaaaaaa-0001-0001-0001-000000000001', 2022, 1350.00, 900.00, 35.0, ARRAY['ISO 14001']),
  ('eeeeeeee-0001-0001-0001-000000000002', 'aaaaaaaa-0001-0001-0001-000000000001', 2023, 1200.50, 800.00, 45.0, ARRAY['ISO 14001', 'ISO 50001']),
  ('eeeeeeee-0001-0001-0001-000000000003', 'aaaaaaaa-0001-0001-0001-000000000001', 2024, 1050.00, 680.00, 62.0, ARRAY['ISO 14001', 'ISO 50001', 'Carbon Neutral'])
ON CONFLICT (id) DO UPDATE SET
  scope1_total_tons = EXCLUDED.scope1_total_tons,
  scope2_total_tons = EXCLUDED.scope2_total_tons,
  energy_renewable_percent = EXCLUDED.energy_renewable_percent;

-- EcoVolt - Ejemplo de empresa muy verde
INSERT INTO esg_reports (id, organization_id, report_year, scope1_total_tons, scope2_total_tons, energy_renewable_percent, certifications)
VALUES
  ('eeeeeeee-0002-0002-0002-000000000001', 'aaaaaaaa-0001-0001-0001-000000000003', 2023, 50.00, 25.00, 98.0, ARRAY['ISO 14001', 'B Corp', 'RE100']),
  ('eeeeeeee-0002-0002-0002-000000000002', 'aaaaaaaa-0001-0001-0001-000000000003', 2024, 35.00, 15.00, 100.0, ARRAY['ISO 14001', 'B Corp', 'RE100', 'Carbon Negative'])
ON CONFLICT (id) DO UPDATE SET
  scope1_total_tons = EXCLUDED.scope1_total_tons,
  energy_renewable_percent = EXCLUDED.energy_renewable_percent;

-- AgroBio - Sector Agroalimentario
INSERT INTO esg_reports (id, organization_id, report_year, scope1_total_tons, scope2_total_tons, energy_renewable_percent, certifications)
VALUES
  ('eeeeeeee-0003-0003-0003-000000000001', 'aaaaaaaa-0003-0003-0003-000000000001', 2024, 180.00, 120.00, 75.0, ARRAY['Organic EU', 'ISO 14001', 'Global GAP'])
ON CONFLICT (id) DO UPDATE SET
  scope1_total_tons = EXCLUDED.scope1_total_tons,
  certifications = EXCLUDED.certifications;

-- 2. Servicios de Valor Añadido (Marketplace Services)
INSERT INTO value_services (id, name, category, description, price, currency, price_model, provider_org_id, icon_name, version)
VALUES
  -- Servicios de TechSolutions ERP
  ('ffffffff-0001-0001-0001-000000000001', 'Homologación Flash', 'Compliance', 'Validación automática de proveedores en 24h usando datos cruzados de la red ProcureData.', 150.00, 'EUR', 'one_time', 'aaaaaaaa-0004-0004-0004-000000000002', 'ShieldCheck', '1.0'),
  ('ffffffff-0001-0001-0001-000000000002', 'Auditoría Automática CSRD', 'Sostenibilidad', 'Generación automática de informes de sostenibilidad conformes a normativa EU CSRD.', 500.00, 'EUR', 'one_time', 'aaaaaaaa-0004-0004-0004-000000000002', 'FileCheck', '2.0'),
  ('ffffffff-0001-0001-0001-000000000003', 'Integración ERP Express', 'Tecnológico', 'Conector pre-configurado para SAP, Oracle y Microsoft Dynamics.', 250.00, 'EUR', 'subscription', 'aaaaaaaa-0004-0004-0004-000000000002', 'Plug', '3.1'),
  
  -- Servicios de Capital Trade Bank
  ('ffffffff-0002-0002-0002-000000000001', 'Trade Finance Scoring', 'Financiero', 'Score crediticio B2B basado en histórico de transacciones comerciales verificadas.', 200.00, 'EUR', 'one_time', 'aaaaaaaa-0004-0004-0004-000000000001', 'Banknote', '2.5'),
  ('ffffffff-0002-0002-0002-000000000002', 'Factoring Digital', 'Financiero', 'Anticipo de facturas con scoring automático basado en datos de la red.', 75.00, 'EUR', 'per_transaction', 'aaaaaaaa-0004-0004-0004-000000000001', 'Receipt', '1.2'),
  ('ffffffff-0002-0002-0002-000000000003', 'Garantía de Pago B2B', 'Financiero', 'Seguro de crédito comercial con prima variable según score del comprador.', 0.50, 'EUR', 'percentage', 'aaaaaaaa-0004-0004-0004-000000000001', 'Shield', '1.0')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price;

-- 3. Oportunidades de Mercado (Demandas de Datos)
INSERT INTO marketplace_opportunities (id, consumer_org_id, title, category, budget_range, description, status, expires_at)
VALUES
  ('gggggggg-0001-0001-0001-000000000001', 'aaaaaaaa-0002-0002-0002-000000000002', 'Buscamos Huella Hídrica Proveedores Agro', 'Agroalimentario', '1,000 - 3,000 EUR', 'Necesitamos datos certificados de consumo de agua en cultivos de levante para reporte CSRD.', 'active', NOW() + INTERVAL '15 days'),
  ('gggggggg-0001-0001-0001-000000000002', 'aaaaaaaa-0002-0002-0002-000000000003', 'Telemetría Flotas Última Milla', 'Movilidad Sostenible', '5,000+ EUR', 'Buscamos datos de tráfico urbano y paradas para optimización de rutas de reparto.', 'active', NOW() + INTERVAL '30 days'),
  ('gggggggg-0001-0001-0001-000000000003', 'aaaaaaaa-0002-0002-0002-000000000001', 'Certificaciones ISO Proveedores Construcción', 'Construcción', '500 - 1,500 EUR', 'Pack de certificaciones ISO 9001, 14001 y 45001 para licitaciones públicas.', 'active', NOW() + INTERVAL '20 days'),
  ('gggggggg-0001-0001-0001-000000000004', 'aaaaaaaa-0002-0002-0002-000000000002', 'Datos de Consumo Energético Industrial', 'Energía', '2,000 - 4,000 EUR', 'Histórico de consumo eléctrico de plantas industriales para benchmark de eficiencia.', 'active', NOW() + INTERVAL '45 days')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  expires_at = EXCLUDED.expires_at;

-- 4. Conceptos de Innovation Lab
INSERT INTO innovation_lab_concepts (id, title, category, short_description, full_analysis, business_impact, maturity_level, chart_type, chart_data, chart_config)
VALUES
  ('hhhhhhhh-0001-0001-0001-000000000001', 'Pasaporte Digital de Producto', 'Trazabilidad', 'Identidad única verificable para cada producto en la cadena de suministro.', 'El Pasaporte Digital de Producto (DPP) es una iniciativa de la UE que requiere que ciertos productos tengan un identificador único con información sobre su origen, composición y huella ambiental. ProcureData está posicionada para ser el backbone de datos verificados que alimente estos pasaportes.', 'Reducción del 40% en tiempo de verificación de proveedores y cumplimiento automático de regulación EU 2027.', 4, 'area', '[{"name": "Q1 2024", "value": 15}, {"name": "Q2 2024", "value": 28}, {"name": "Q3 2024", "value": 45}, {"name": "Q4 2024", "value": 72}, {"name": "Q1 2025", "value": 95}]'::jsonb, '{"xAxis": "Trimestre", "yAxis": "Adopción (%)", "color": "#10B981"}'::jsonb),
  
  ('hhhhhhhh-0001-0001-0001-000000000002', 'IA Predictiva de Riesgos', 'Inteligencia Artificial', 'Modelo ML para predecir disrupciones en cadena de suministro.', 'Utilizando datos históricos de transacciones, reportes ESG y señales de mercado, nuestro modelo de IA puede predecir con 85% de precisión posibles disrupciones en la cadena de suministro hasta 3 meses antes de que ocurran.', 'Ahorro estimado de €2.5M anuales por prevención de stockouts y penalizaciones.', 3, 'bar', '[{"name": "Precisión", "value": 85}, {"name": "Recall", "value": 78}, {"name": "F1 Score", "value": 81}]'::jsonb, '{"xAxis": "Métrica", "yAxis": "Porcentaje", "color": "#6366F1"}'::jsonb),
  
  ('hhhhhhhh-0001-0001-0001-000000000003', 'Tokenización de Créditos ESG', 'Blockchain', 'Conversión de reducciones de emisiones en activos digitales negociables.', 'Los créditos de carbono verificados a través de ProcureData pueden tokenizarse en blockchain, creando un mercado secundario líquido y transparente. Cada token representa 1 tonelada de CO2 evitada, con trazabilidad completa hasta el proyecto de origen.', 'Nuevo revenue stream estimado en €500K primer año, escalable a €5M.', 2, 'line', '[{"name": "Ene", "value": 0}, {"name": "Feb", "value": 120}, {"name": "Mar", "value": 340}, {"name": "Abr", "value": 580}, {"name": "May", "value": 890}, {"name": "Jun", "value": 1200}]'::jsonb, '{"xAxis": "Mes", "yAxis": "Tokens Emitidos", "color": "#F59E0B"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  chart_data = EXCLUDED.chart_data;

-- Verificación Final
SELECT 'ESG Reports' as tabla, COUNT(*) as registros FROM esg_reports WHERE organization_id IN (SELECT id FROM organizations WHERE is_demo = true)
UNION ALL
SELECT 'Value Services', COUNT(*) FROM value_services WHERE provider_org_id IN (SELECT id FROM organizations WHERE is_demo = true)
UNION ALL
SELECT 'Opportunities', COUNT(*) FROM marketplace_opportunities WHERE consumer_org_id IN (SELECT id FROM organizations WHERE is_demo = true)
UNION ALL
SELECT 'Innovation Concepts', COUNT(*) FROM innovation_lab_concepts;
