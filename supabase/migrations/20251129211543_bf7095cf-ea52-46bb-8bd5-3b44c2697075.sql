-- Tabla de Servicios Disponibles (Algoritmos/Apps)
CREATE TABLE IF NOT EXISTS value_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_org_id UUID REFERENCES organizations(id),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT, -- 'Analytics', 'Compliance', 'AI Prediction'
    price_model TEXT, -- 'subscription', 'pay_per_use'
    icon_name TEXT, -- Nombre del icono de Lucide
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar Servicios Demo
INSERT INTO value_services (provider_org_id, name, description, category, price_model, icon_name)
VALUES 
(
    (SELECT id FROM organizations WHERE name = 'IoT Cloud Platform' LIMIT 1),
    'Predictor de Fallos IA',
    'Analiza logs de telemetría para predecir fallos en maquinaria con 48h de antelación.',
    'AI Prediction',
    'pay_per_use',
    'BrainCircuit'
),
(
    (SELECT id FROM organizations WHERE name = 'CertiGreen Auditores' LIMIT 1),
    'Validación Automática CSRD',
    'Verifica si los datos de emisiones cumplen con la directiva europea automáticamente.',
    'Compliance',
    'subscription',
    'ShieldCheck'
);

-- Habilitar lectura pública para la demo
ALTER TABLE value_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON value_services FOR SELECT USING (true);