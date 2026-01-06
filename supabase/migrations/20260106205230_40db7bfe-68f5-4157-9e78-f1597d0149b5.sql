-- Insert 10 Premium Services aligned with Technical Specification
-- Clean existing demo services first
DELETE FROM value_services WHERE name IN (
  'Homologación Flash 24h', 'Auditoría Digital ISO', 'Trade Finance Scoring',
  'Factoring Connect', 'Calculadora Scope 3', 'Certificación Green Partner',
  'Predicción Demanda AI', 'Monitor Riesgo Proveedor', 'Conector Universal ERP',
  'Anonimizador GDPR'
);

INSERT INTO value_services (name, category, description, price, icon_name, features, price_model, currency) VALUES
-- Compliance & Legal
('Homologación Flash 24h', 'Compliance', 'Valida proveedores nuevos en tiempo récord cruzando datos de la red ProcureData.', 150, 'ShieldCheck', '["KYB Automático", "Cruce Listas Negras", "Historial de Pagos"]', 'per_use', 'EUR'),
('Auditoría Digital ISO', 'Compliance', 'Verificación instantánea de vigencia de certificados ISO 9001/14001 en blockchain.', 300, 'FileCheck', '["Trazabilidad Blockchain", "Alerta de Caducidad", "Validez Global"]', 'per_use', 'EUR'),

-- Financiación (Trade Finance)
('Trade Finance Scoring', 'Financiación', 'Obtén un score crediticio basado en tu histórico de ventas real para negociar mejores condiciones.', 200, 'Banknote', '["Análisis Flujo de Caja", "Riesgo de Impago", "Reporte Bancario"]', 'per_use', 'EUR'),
('Factoring Connect', 'Financiación', 'Conecta tus facturas pendientes con entidades financieras para obtener liquidez inmediata.', 50, 'ArrowRightLeft', '["Anticipo Inmediato", "Sin Recurso", "Gestión Multi-banco"]', 'per_use', 'EUR'),

-- Sostenibilidad (ESG)
('Calculadora Scope 3', 'Sostenibilidad', 'Mide la huella de carbono oculta en tu cadena de suministro automáticamente.', 0, 'Leaf', '["Datos de Proveedores", "Estándar GHG Protocol", "Reporte CSRD"]', 'free', 'EUR'),
('Certificación Green Partner', 'Sostenibilidad', 'Obtén el distintivo de proveedor sostenible verificado y destaca en el catálogo.', 100, 'Award', '["Auditoría Remota", "Badge en Perfil", "Prioridad en Búsquedas"]', 'per_use', 'EUR'),

-- IA & Analytics
('Predicción Demanda AI', 'IA & Analytics', 'Anticípate a roturas de stock analizando patrones de compra del sector industrial.', 300, 'BrainCircuit', '["Horizonte 12 meses", "Alertas de Stock", "Modelos Estacionales"]', 'monthly', 'EUR'),
('Monitor Riesgo Proveedor', 'IA & Analytics', 'Vigilancia 24/7 de la salud financiera y operativa de tus socios clave.', 150, 'Activity', '["Noticias Adversas", "Cambios en BORME", "Rating Dinámico"]', 'monthly', 'EUR'),

-- Data Ops (Integración)
('Conector Universal ERP', 'Data Ops', 'Sincroniza el catálogo de ProcureData directamente con tu SAP, Oracle o Microsoft.', 200, 'Plug', '["API Rest", "Mapeo Automático", "Actualización Real-time"]', 'monthly', 'EUR'),
('Anonimizador GDPR', 'Data Ops', 'Limpia tus datasets de datos personales antes de monetizarlos en el marketplace.', 100, 'VenetianMask', '["Enmascaramiento PII", "Cumplimiento UE", "Preservación de Utilidad"]', 'per_use', 'EUR');