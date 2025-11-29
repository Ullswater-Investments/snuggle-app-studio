-- Primero creamos las organizaciones y productos nuevos como datos globales
-- que estarán disponibles antes del login demo

-- Organizaciones ESG
INSERT INTO organizations (id, name, type, tax_id, is_demo) VALUES
('22222222-2222-2222-2222-000000000001', 'EcoAuto Motors', 'consumer', 'ESG-C-001', true),
('22222222-2222-2222-2222-000000000002', 'GreenSteel S.L.', 'provider', 'ESG-P-002', true),
('22222222-2222-2222-2222-000000000003', 'CertiGreen Auditores', 'data_holder', 'ESG-H-003', true)
ON CONFLICT (id) DO NOTHING;

-- Organizaciones IoT
INSERT INTO organizations (id, name, type, tax_id, is_demo) VALUES
('22222222-2222-2222-2222-000000000004', 'Constructora Global', 'consumer', 'IOT-C-001', true),
('22222222-2222-2222-2222-000000000005', 'HeavyMachines Renting', 'provider', 'IOT-P-002', true),
('22222222-2222-2222-2222-000000000006', 'IoT Cloud Platform', 'data_holder', 'IOT-H-003', true)
ON CONFLICT (id) DO NOTHING;

-- Productos de datos nuevos
INSERT INTO data_products (id, name, description, version, category, schema_definition) VALUES
('44444444-4444-4444-4444-000000000001', 'Certificado de Emisiones CO2 - Alcance 1 y 2', 'Datos auditados de huella de carbono anual por tonelada de material producido.', '2024.1', 'Sustainability', 
'{
  "scope1_co2": "number (tons)",
  "scope2_co2": "number (tons)",
  "energy_mix_renewable": "percentage",
  "certification_standard": "string (ISO 14064)"
}'::jsonb),
('44444444-4444-4444-4444-000000000002', 'Telemetría de Maquinaria Pesada - Real Time', 'Logs de sensores de temperatura, vibración y horas de uso para mantenimiento predictivo.', '1.0.0', 'IoT/Telemetry', 
'{
  "machine_id": "string",
  "operating_hours": "number",
  "avg_temperature_c": "number",
  "vibration_alerts": "count",
  "last_maintenance": "date"
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Assets
INSERT INTO data_assets (id, product_id, holder_org_id, subject_org_id, status) VALUES
('33333333-3333-3333-3333-000000000005', '44444444-4444-4444-4444-000000000001', '22222222-2222-2222-2222-000000000003', '22222222-2222-2222-2222-000000000002', 'available'),
('33333333-3333-3333-3333-000000000006', '44444444-4444-4444-4444-000000000002', '22222222-2222-2222-2222-000000000006', '22222222-2222-2222-2222-000000000005', 'available')
ON CONFLICT (id) DO NOTHING;

-- Metadatos del catálogo
INSERT INTO catalog_metadata (asset_id, visibility, tags, categories) VALUES
('33333333-3333-3333-3333-000000000005', 'public', ARRAY['ESG', 'Carbon Footprint', 'ISO 14064', 'Green'], ARRAY['Sustainability', 'Compliance']),
('33333333-3333-3333-3333-000000000006', 'public', ARRAY['IoT', 'Predictive Maintenance', 'Construction', 'Real-time'], ARRAY['Operations', 'Industry 4.0'])
ON CONFLICT (asset_id) DO NOTHING;

-- Ahora actualizamos el trigger setup_demo_user para incluir las nuevas transacciones
CREATE OR REPLACE FUNCTION public.setup_demo_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Solo actuar si es el usuario demo
  IF NEW.email = 'demo@procuredata.app' THEN
    
    -- CREAR PERFILES para múltiples organizaciones (incluyendo las nuevas)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position) VALUES
    (NEW.id, '11111111-1111-1111-1111-000000000002', 'Usuario Demo', 'Responsable de Compras'),
    (NEW.id, '11111111-1111-1111-1111-000000000001', 'Usuario Demo', 'Responsable de Datos'),
    (NEW.id, '11111111-1111-1111-1111-111111111001', 'Usuario Demo', 'Administrador'),
    (NEW.id, '11111111-1111-1111-1111-000000000004', 'Usuario Demo', 'Analista'),
    (NEW.id, '11111111-1111-1111-1111-000000000003', 'Usuario Demo', 'Gestor de Datos'),
    (NEW.id, '11111111-1111-1111-1111-111111111002', 'Usuario Demo', 'Representante'),
    -- Nuevas organizaciones ESG e IoT
    (NEW.id, '22222222-2222-2222-2222-000000000001', 'Usuario Demo', 'Responsable ESG'),
    (NEW.id, '22222222-2222-2222-2222-000000000002', 'Usuario Demo', 'Analista de Sostenibilidad'),
    (NEW.id, '22222222-2222-2222-2222-000000000003', 'Usuario Demo', 'Auditor'),
    (NEW.id, '22222222-2222-2222-2222-000000000004', 'Usuario Demo', 'Jefe de Operaciones'),
    (NEW.id, '22222222-2222-2222-2222-000000000005', 'Usuario Demo', 'Fleet Manager'),
    (NEW.id, '22222222-2222-2222-2222-000000000006', 'Usuario Demo', 'Data Analyst')
    ON CONFLICT (user_id, organization_id) DO NOTHING;
    
    -- CREAR ROLES
    INSERT INTO user_roles (user_id, organization_id, role) VALUES
    (NEW.id, '11111111-1111-1111-1111-000000000002', 'viewer'),
    (NEW.id, '11111111-1111-1111-1111-000000000001', 'admin'),
    (NEW.id, '11111111-1111-1111-1111-111111111001', 'admin'),
    (NEW.id, '11111111-1111-1111-1111-000000000004', 'viewer'),
    (NEW.id, '11111111-1111-1111-1111-000000000003', 'admin'),
    (NEW.id, '11111111-1111-1111-1111-111111111002', 'admin'),
    -- Nuevos roles
    (NEW.id, '22222222-2222-2222-2222-000000000001', 'viewer'),
    (NEW.id, '22222222-2222-2222-2222-000000000002', 'admin'),
    (NEW.id, '22222222-2222-2222-2222-000000000003', 'admin'),
    (NEW.id, '22222222-2222-2222-2222-000000000004', 'viewer'),
    (NEW.id, '22222222-2222-2222-2222-000000000005', 'admin'),
    (NEW.id, '22222222-2222-2222-2222-000000000006', 'admin')
    ON CONFLICT (user_id, organization_id, role) DO NOTHING;

    -- INSERTAR TRANSACCIONES DEMO (incluyendo las nuevas)
    INSERT INTO data_transactions (
      id, consumer_org_id, subject_org_id, holder_org_id, asset_id,
      purpose, justification, status, access_duration_days, requested_by
    ) VALUES
    -- Transacciones originales
    ('55555555-5555-5555-5555-000000000001', '11111111-1111-1111-1111-000000000002', '11111111-1111-1111-1111-111111111001', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000001', 'Alta de nuevo proveedor en sistema ERP', 'Necesitamos incorporar a Tornillería TÉCNICA como proveedor para nueva línea de producción', 'pending_subject', 90, NEW.id),
    ('55555555-5555-5555-5555-000000000002', '11111111-1111-1111-1111-000000000004', '11111111-1111-1111-1111-111111111002', '11111111-1111-1111-1111-000000000003', '33333333-3333-3333-3333-000000000003', 'Validación de proveedor químico para certificación ISO', 'Necesitamos verificar datos del proveedor para cumplir con normativa ISO 14001', 'pending_holder', 60, NEW.id),
    ('55555555-5555-5555-5555-000000000003', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-111111111006', '11111111-1111-1111-1111-000000000007', '33333333-3333-3333-3333-000000000004', 'Evaluación de proveedor biotecnológico', 'Análisis de capacidades técnicas para proyecto de bioenergía renovable', 'completed', 120, NEW.id),
    ('55555555-5555-5555-5555-000000000004', '11111111-1111-1111-1111-000000000002', '11111111-1111-1111-1111-111111111003', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000002', 'Homologación de proveedor electrónico', 'Validación de proveedor de componentes electrónicos para nueva línea IoT', 'initiated', 90, NEW.id),
    ('55555555-5555-5555-5555-000000000005', '11111111-1111-1111-1111-000000000004', '11111111-1111-1111-1111-111111111001', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000001', 'Alta urgente de proveedor metalúrgico', 'Necesitamos dar de alta a Tornillería TÉCNICA de forma urgente', 'approved', 180, NEW.id),
    -- Nueva transacción ESG (completada)
    ('55555555-5555-5555-5555-000000000006', '22222222-2222-2222-2222-000000000001', '22222222-2222-2222-2222-000000000002', '22222222-2222-2222-2222-000000000003', '33333333-3333-3333-3333-000000000005', 'Auditoría de Cadena de Suministro Verde', 'Requerido para el reporte anual de sostenibilidad CSRD de EcoAuto.', 'completed', 365, NEW.id),
    -- Nueva transacción IoT (pendiente holder)
    ('55555555-5555-5555-5555-000000000007', '22222222-2222-2222-2222-000000000004', '22222222-2222-2222-2222-000000000005', '22222222-2222-2222-2222-000000000006', '33333333-3333-3333-3333-000000000006', 'Optimización de Mantenimiento', 'Análisis de desgaste para programar paradas técnicas.', 'pending_holder', 30, NEW.id)
    ON CONFLICT (id) DO NOTHING;

    -- INSERTAR DATOS DE PROVEEDORES (originales)
    INSERT INTO supplier_data (id, transaction_id, company_name, tax_id, legal_name, fiscal_address, contact_person_name, contact_person_email) VALUES
    ('66666666-6666-6666-6666-000000000001', '55555555-5555-5555-5555-000000000003', 'Biocen S.A.', 'A66778899', 'Biocen Sociedad Anónima', '{"country": "ES", "streetType": "Parque", "streetName": "Científico", "streetNumber": "100"}'::jsonb, 'Jorge Hidalgo', 'jorge.hidalgo@biocen.es'),
    ('66666666-6666-6666-6666-000000000002', '55555555-5555-5555-5555-000000000001', 'Tornillería TÉCNICA S.A.', 'A12345678', 'Tornillería TÉCNICA S.A.', '{"country": "ES", "streetType": "Calle", "streetName": "Principal", "streetNumber": "42"}'::jsonb, 'Laura Martín', 'laura.martin@tornilleria.es'),
    ('66666666-6666-6666-6666-000000000003', '55555555-5555-5555-5555-000000000002', 'Soluciones Químicas del Sur S.L.', 'B98765432', 'Soluciones Químicas del Sur S.L.U.', '{"country": "ES", "streetType": "Avenida", "streetName": "de la Innovación", "streetNumber": "88"}'::jsonb, 'Elena Blanco', 'elena.blanco@solquimica.es'),
    ('66666666-6666-6666-6666-000000000004', '55555555-5555-5555-5555-000000000005', 'Tornillería TÉCNICA S.A.', 'A12345678', 'Tornillería TÉCNICA S.A.', '{"country": "ES", "streetType": "Calle", "streetName": "Principal", "streetNumber": "42"}'::jsonb, 'Laura Martín', 'laura.martin@tornilleria.es')
    ON CONFLICT (id) DO NOTHING;

    -- INSERTAR DATOS NUEVOS EN data_payloads (solo ESG por ahora, completada)
    INSERT INTO data_payloads (id, transaction_id, schema_type, data_content) VALUES
    ('77777777-7777-7777-7777-000000000001', '55555555-5555-5555-5555-000000000006', 'esg_report', '{
      "report_year": 2023,
      "scope1_total_tons": 1250.5,
      "scope2_total_tons": 300.2,
      "energy_mix": {
        "renewable": 85,
        "fossil": 15
      },
      "certifications": ["ISO 14001", "ISO 14064-1"],
      "auditor_signature": "CertiGreen Validated"
    }'::jsonb)
    ON CONFLICT (transaction_id) DO NOTHING;

    -- HISTORIAL DE APROBACIONES (incluyendo nuevas)
    INSERT INTO approval_history (transaction_id, actor_org_id, actor_user_id, action, notes) VALUES
    ('55555555-5555-5555-5555-000000000006', '22222222-2222-2222-2222-000000000002', NEW.id, 'pre_approve', 'Datos validados internamente, procediendo.'),
    ('55555555-5555-5555-5555-000000000006', '22222222-2222-2222-2222-000000000003', NEW.id, 'approve', 'Auditoría conforme a ISO completada.'),
    ('55555555-5555-5555-5555-000000000007', '22222222-2222-2222-2222-000000000005', NEW.id, 'pre_approve', 'Acceso a API de telemetría autorizado para 3 excavadoras.')
    ON CONFLICT DO NOTHING;

  END IF;
  
  RETURN NEW;
END;
$function$;