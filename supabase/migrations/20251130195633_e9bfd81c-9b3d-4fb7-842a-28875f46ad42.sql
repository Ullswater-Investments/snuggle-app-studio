-- Crear tabla de logs de auditoría (solo estructura y políticas)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    actor_id UUID REFERENCES auth.users(id),
    actor_email TEXT,
    action TEXT NOT NULL,
    resource TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Solo ver logs de tu propia empresa
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Orgs view own logs" ON audit_logs
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id 
            FROM user_profiles 
            WHERE user_id = auth.uid()
        )
    );

-- Insertar logs de demostración SOLO para organizaciones demo existentes
INSERT INTO audit_logs (organization_id, actor_email, action, resource, details, created_at)
SELECT 
    o.id,
    'demo@procuredata.app',
    CASE 
        WHEN o.type = 'consumer' THEN 'LOGIN'
        WHEN o.type = 'provider' THEN 'APPROVE_REQUEST'
        ELSE 'SYSTEM_INIT'
    END,
    CASE 
        WHEN o.type = 'consumer' THEN 'Auth'
        WHEN o.type = 'provider' THEN 'Transaction'
        ELSE 'Organization'
    END,
    jsonb_build_object('message', 'Demo activity', 'org_name', o.name),
    NOW() - (random() * INTERVAL '48 hours')
FROM organizations o
WHERE o.is_demo = true
LIMIT 20
ON CONFLICT DO NOTHING;