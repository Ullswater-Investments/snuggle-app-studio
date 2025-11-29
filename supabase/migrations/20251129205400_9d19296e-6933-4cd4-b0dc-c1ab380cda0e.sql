-- Nueva tabla para almacenar datos heterogéneos (ESG, IoT, Financieros)
CREATE TABLE IF NOT EXISTS data_payloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES data_transactions(id) ON DELETE CASCADE,
    schema_type TEXT NOT NULL, -- Ej: 'esg_report', 'iot_telemetry', 'financial_risk'
    data_content JSONB NOT NULL, -- Aquí va la data flexible
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Restricción: Una transacción solo tiene un payload activo
    UNIQUE(transaction_id)
);

-- Políticas RLS (Seguridad)
ALTER TABLE data_payloads ENABLE ROW LEVEL SECURITY;

-- Política: El consumidor de la transacción puede ver los datos si la transacción está completada
CREATE POLICY "Consumers can view payloads of completed transactions" 
ON data_payloads FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM data_transactions dt
        WHERE dt.id = data_payloads.transaction_id
        AND dt.status = 'completed'
        AND dt.consumer_org_id = get_user_organization(auth.uid())
    )
);

-- Política: El Holder o Subject pueden crear/ver sus datos
CREATE POLICY "Holders and Subjects can manage payloads" 
ON data_payloads FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM data_transactions dt
        WHERE dt.id = data_payloads.transaction_id
        AND (
            dt.holder_org_id = get_user_organization(auth.uid()) OR
            dt.subject_org_id = get_user_organization(auth.uid())
        )
    )
);