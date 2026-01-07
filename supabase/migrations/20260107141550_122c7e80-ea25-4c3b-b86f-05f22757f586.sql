-- =============================================================================
-- 5 NUEVAS OPORTUNIDADES DE ALTA FIDELIDAD PARA PROCUREDATA
-- Generadas por análisis contextual del repositorio idea-web-hub
-- Fecha: 2026-01-07
-- =============================================================================

INSERT INTO marketplace_opportunities 
(consumer_org_id, title, description, category, budget_range, status, expires_at) 
VALUES
-- AGRO: Huella Hídrica Aceite de Oliva
('11111111-2222-3333-4444-000000000005', 
 'Huella Hídrica Aceite de Oliva - Jaén',
 'Buscamos registros verificados de consumo hídrico y uso de fertilizantes nitrogenados en explotaciones de Jaén para validación de certificados de exportación hacia el mercado alemán. Necesitamos datos de los últimos 3 años con granularidad mensual, incluyendo hectáreas de cultivo, sistema de riego (goteo/aspersión) y certificaciones ecológicas vigentes.',
 'AgriFood', '4,500 - 7,500 EUROe', 'active', '2026-03-15'::timestamp),

-- MOBILITY: Emisiones Scope 3 Flota Logística BCN
('11111111-2222-3333-4444-000000000003', 
 'Emisiones Scope 3 Flota Logística BCN',
 'Dataset de telemetría de rutas en Zonas de Bajas Emisiones (ZBE) en Barcelona. Requerimos datos de consumo energético real (kWh/km para eléctricos, l/100km para combustión) para la generación del informe de sostenibilidad anual CSRD. Formato compatible con estándares GHG Protocol.',
 'Logistics', '2,800 - 5,200 EUROe', 'active', '2026-02-02'::timestamp),

-- HEALTH: Logs Mantenimiento Resonancias Magnéticas
('11111111-2222-3333-4444-000000000003', 
 'Logs Mantenimiento Resonancias Magnéticas',
 'Necesitamos acceso a históricos de mantenimiento y errores técnicos de equipos de Resonancia Magnética (modelos 2020-2024) para entrenar un modelo de IA de mantenimiento preventivo hospitalario. Incluir códigos de error, tiempos de reparación, piezas reemplazadas y downtime asociado. Datos anonimizados conforme a RGPD.',
 'Pharma', '8,000 - 12,000 EUROe', 'active', '2026-03-30'::timestamp),

-- INDUSTRIAL: Histórico Fallos Brazos Robóticos CNC
('11111111-2222-3333-4444-000000000004', 
 'Histórico Fallos Brazos Robóticos CNC',
 'Buscamos datasets de sensores de vibración (RMS), temperatura de juntas y par motor de brazos robóticos industriales Serie-X. Formato compatible con IDSA/JSON-LD para integración en gemelo digital de producción. Mínimo 6 meses de datos con frecuencia de muestreo de 10Hz. Incluir failure_label para eventos de parada de línea.',
 'Industrial', '6,500 - 9,000 EUROe', 'active', '2026-01-20'::timestamp),

-- SOCIAL: Diversidad e Impacto Proveedores Locales
('11111111-2222-3333-4444-000000000002', 
 'Diversidad e Impacto Proveedores Locales',
 'Recopilación de métricas de impacto social (empleabilidad de colectivos vulnerables, ratio de contratación local, formación impartida) en proveedores de servicios de limpieza y catering para auditoría de Compra Pública Ética. Cálculo de SROI (Social Return on Investment) verificable.',
 'ESG', '1,800 - 3,500 EUROe', 'active', '2026-04-15'::timestamp);