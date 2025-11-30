-- Add metadata column to data_transactions
ALTER TABLE data_transactions ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Enrich transactions with sector-specific metadata
DO $$
DECLARE
    trans_rec RECORD;
    new_meta JSONB;
    sector TEXT;
    
    enrichment_rules JSONB := '{
        "Automotive": {
            "tags": ["Calidad", "Tier-1", "Prototipo", "Urgente", "Auditoría"],
            "priorities": ["Alta", "Crítica", "Media"]
        },
        "Pharma": {
            "tags": ["FDA Compliance", "Cadena Frío", "Lote #404", "Lab Results", "Seguridad"],
            "priorities": ["Crítica", "Alta", "Baja"]
        },
        "Energy": {
            "tags": ["Red Eléctrica", "Renovable", "Mantenimiento", "ISO-50001", "Grid Load"],
            "priorities": ["Media", "Alta", "Baja"]
        },
        "Retail": {
            "tags": ["Stock Q4", "Promoción", "Logística Inversa", "Fraude", "Cliente VIP"],
            "priorities": ["Alta", "Media", "Baja"]
        },
        "Finance": {
            "tags": ["KYC", "Riesgo Alto", "AML Check", "Factura >50k", "Auditoría"],
            "priorities": ["Crítica", "Alta", "Media"]
        },
        "Logistics": {
            "tags": ["Aduanas", "Mercancía Peligrosa", "Express", "Incidencia", "Ruta"],
            "priorities": ["Crítica", "Alta", "Media"]
        },
        "AgriFood": {
            "tags": ["Trazabilidad", "Certificación Bio", "Cosecha", "Calidad", "Origen"],
            "priorities": ["Alta", "Media", "Baja"]
        },
        "Aerospace": {
            "tags": ["Certificación FAA", "Seguridad Vuelo", "Material Crítico", "Auditoría", "Test"],
            "priorities": ["Crítica", "Alta", "Media"]
        },
        "Construction": {
            "tags": ["Seguridad Obra", "Materiales", "Normativa", "EPIs", "Proyecto"],
            "priorities": ["Alta", "Media", "Crítica"]
        },
        "Tech": {
            "tags": ["Bug Seguridad", "API Key", "GDPR", "SLA Breach", "Upgrade"],
            "priorities": ["Alta", "Media", "Baja"]
        }
    }';
    
    rule_set JSONB;
    
BEGIN
    RAISE NOTICE '🎨 Iniciando enriquecimiento contextual de solicitudes...';

    FOR trans_rec IN 
        SELECT t.id, o.sector 
        FROM data_transactions t
        JOIN organizations o ON t.holder_org_id = o.id
    LOOP
        sector := COALESCE(trans_rec.sector, 'Tech');
        IF enrichment_rules->sector IS NULL THEN sector := 'Tech'; END IF;
        rule_set := enrichment_rules->sector;
        
        new_meta := jsonb_build_object(
            'priority', rule_set->'priorities'->>(floor(random() * jsonb_array_length(rule_set->'priorities'))::int),
            'tags', jsonb_build_array(
                rule_set->'tags'->>(floor(random() * jsonb_array_length(rule_set->'tags'))::int),
                rule_set->'tags'->>(floor(random() * jsonb_array_length(rule_set->'tags'))::int)
            ),
            'ticket_id', 'REQ-' || floor(random()*10000 + 1000)
        );
        
        UPDATE data_transactions 
        SET metadata = new_meta
        WHERE id = trans_rec.id;
        
    END LOOP;
    
    RAISE NOTICE '✅ Solicitudes enriquecidas con etiquetas y prioridades sectoriales.';
END $$;