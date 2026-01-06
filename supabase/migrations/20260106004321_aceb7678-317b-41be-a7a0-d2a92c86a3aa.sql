-- Insertar servicios iniciales del Marketplace PROCUREDATA
INSERT INTO public.value_services (name, description, category, price, currency, price_model, icon_name, features)
VALUES
  (
    'Carbon Tracker ISO 14064',
    'Cálculo automático de huella de carbono Scope 3 basado en manifiestos logísticos.',
    'Sostenibilidad',
    50,
    'EUR',
    'subscription',
    'Leaf',
    '["Certificación ISO 14064", "Scope 1, 2 y 3", "Informes automáticos"]'::jsonb
  ),
  (
    'GDPR PII Shield',
    'Detecta y ofusca nombres, emails y DNIs en datasets antes de compartirlos.',
    'Privacidad',
    0.05,
    'EUR',
    'per_use',
    'ShieldAlert',
    '["Detección automática PII", "Cumplimiento RGPD", "API REST"]'::jsonb
  ),
  (
    'Supply Chain Risk AI',
    'Modelo predictivo que analiza noticias y clima para alertar sobre roturas de stock.',
    'IA & Analytics',
    200,
    'EUR',
    'subscription',
    'BrainCircuit',
    '["Predicción de demanda", "Alertas en tiempo real", "Integración ERP"]'::jsonb
  ),
  (
    'ODRL License Validator',
    'Verifica automáticamente si tu uso de datos cumple con los contratos inteligentes firmados.',
    'Compliance',
    0,
    'EUR',
    'subscription',
    'Scale',
    '["Validación ODRL", "Auditoría de licencias", "Core Service gratuito"]'::jsonb
  ),
  (
    'Raw Data Normalizer',
    'Convierte CSVs desordenados de proveedores en el estándar JSON-LD de Gaia-X.',
    'Data Ops',
    25,
    'EUR',
    'subscription',
    'DatabaseZap',
    '["ETL automatizado", "Formato JSON-LD", "Validación de schemas"]'::jsonb
  ),
  (
    'Pontus-X Notary Node',
    'Servicio de anclaje automático para registrar hash de trazabilidad sin gestionar gas.',
    'Blockchain',
    10,
    'EUR',
    'subscription',
    'Blocks',
    '["Anclaje automático", "Sin gestión de gas", "Trazabilidad inmutable"]'::jsonb
  );