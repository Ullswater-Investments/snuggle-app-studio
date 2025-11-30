-- =================================================================
-- GENERADOR MASIVO DE ECOSISTEMA SINTÉTICO PARA MARKETPLACE
-- =================================================================
DO $$
DECLARE
    org_id uuid;
    prod_id uuid;
    asset_id uuid;
    trans_id uuid;
    consumer_id uuid;
    target_provider_id uuid;
    demo_user_id uuid;
    
    -- Arrays para generación aleatoria
    prefixes text[] := ARRAY['Global', 'Tech', 'Nova', 'Future', 'Quantum', 'Alpha', 'Omega', 'Prime', 'Eco', 'Data', 'Smart', 'Blue', 'Iron', 'Green'];
    suffixes text[] := ARRAY['Solutions', 'Systems', 'Analytics', 'Industries', 'Dynamics', 'Corp', 'Labs', 'Logistics', 'Energy', 'Financial'];
    
    categories text[] := ARRAY['Automotive', 'Energy', 'Pharma', 'Retail', 'Construction', 'Finance', 'Logistics', 'AgriFood', 'Aerospace', 'Tech'];
    
    product_nouns text[] := ARRAY['Telemetry', 'Forecast', 'Transactions', 'Sensor Data', 'User Behavior', 'Supply Chain', 'Inventory', 'Climate Logs', 'Market Trends', 'Maintenance Logs'];
    
    descriptions text[] := ARRAY[
        'High frequency data stream updated every minute.',
        'Historical dataset containing 5 years of verified records.',
        'Anonymized data compliant with GDPR and CCPA.',
        'Raw sensor output from industrial machinery.',
        'Processed insights ready for BI tools.'
    ];
    
    review_comments_good text[] := ARRAY['Excelente calidad de datos.', 'Entrega inmediata y formato limpio.', 'Proveedor muy confiable, repetiremos.', 'Perfecto para nuestros modelos de ML.', 'Soporte técnico impecable.'];
    
    i integer;
    j integer;
    random_price numeric;
    pricing_type text;
    org_type organization_type;
    
BEGIN
    RAISE NOTICE '🚀 Iniciando generación masiva de datos para Marketplace...';

    -- Obtener el user_id del usuario demo (asumimos que existe)
    SELECT user_id INTO demo_user_id FROM user_profiles LIMIT 1;
    
    IF demo_user_id IS NULL THEN
        RAISE EXCEPTION 'No se encontró ningún usuario demo. Primero debe existir al menos un usuario en el sistema.';
    END IF;

    -- =================================================================
    -- 1. GENERAR ORGANIZACIONES (Vendedores y Compradores)
    -- =================================================================
    RAISE NOTICE '📊 Generando 30 organizaciones...';
    FOR i IN 1..30 LOOP
        -- Determinar tipo de organización
        org_type := (ARRAY['provider', 'consumer', 'data_holder']::organization_type[])[1 + floor(random() * 3)];
        
        INSERT INTO organizations (
            name, 
            tax_id,
            type, 
            is_demo, 
            sector,
            seller_category, 
            kyb_verified, 
            marketplace_description
        ) VALUES (
            prefixes[1 + floor(random() * array_length(prefixes, 1))] || ' ' || suffixes[1 + floor(random() * array_length(suffixes, 1))] || ' ' || i,
            'DEMO-' || lpad(i::text, 6, '0'),
            org_type,
            true,
            categories[1 + floor(random() * array_length(categories, 1))],
            (ARRAY['enterprise', 'startup', 'research_center'])[1 + floor(random() * 3)],
            (random() > 0.3),
            'Proveedor líder en soluciones de datos para el sector ' || categories[1 + floor(random() * array_length(categories, 1))]
        ) RETURNING id INTO org_id;

        -- Crear Wallet para la org
        INSERT INTO wallets (organization_id, address, balance, currency)
        VALUES (
            org_id, 
            '0x' || upper(substring(md5(random()::text) from 1 for 40)), 
            floor(random() * 50000 + 1000),
            'EUR'
        ) ON CONFLICT (organization_id) DO NOTHING;

        -- Crear Reporte ESG (Solo para el 60% de las empresas)
        IF (random() > 0.4) THEN
            INSERT INTO esg_reports (organization_id, report_year, scope1_total_tons, scope2_total_tons, energy_renewable_percent, certifications)
            VALUES (
                org_id, 
                2024, 
                floor(random() * 800 + 100), 
                floor(random() * 300 + 50),
                floor(random() * 70 + 30), 
                ARRAY['ISO 14001', 'ISO 50001']
            ) ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;

    -- =================================================================
    -- 2. GENERAR PRODUCTOS Y ACTIVOS (El Catálogo)
    -- =================================================================
    RAISE NOTICE '🏭 Generando productos y activos para el marketplace...';
    FOR org_id IN SELECT id FROM organizations WHERE is_demo = true AND type IN ('provider', 'data_holder') LOOP
        
        -- Crear entre 3 y 8 productos por organización
        FOR j IN 1..(3 + floor(random() * 6)::integer) LOOP
            
            INSERT INTO data_products (name, description, category, version)
            VALUES (
                product_nouns[1 + floor(random() * array_length(product_nouns, 1))] || ' - ' || (ARRAY['Tier 1', 'Raw', 'Processed', 'Global'])[1 + floor(random() * 4)],
                descriptions[1 + floor(random() * array_length(descriptions, 1))],
                categories[1 + floor(random() * array_length(categories, 1))],
                '1.0.' || j
            ) RETURNING id INTO prod_id;

            -- Determinar modelo de precio
            pricing_type := (ARRAY['free', 'subscription', 'one_time', 'usage'])[1 + floor(random() * 4)];
            
            IF pricing_type = 'free' THEN
                random_price := 0;
            ELSE
                random_price := (floor(random() * 90) + 5) * 100;
            END IF;

            -- Crear el Activo (Listing)
            INSERT INTO data_assets (
                product_id, 
                subject_org_id,
                holder_org_id,
                status,
                is_public_marketplace,
                pricing_model,
                price,
                currency,
                billing_period
            ) VALUES (
                prod_id,
                org_id,
                org_id,
                'available',
                true,
                pricing_type,
                random_price,
                'EUR',
                CASE WHEN pricing_type = 'subscription' THEN (ARRAY['monthly', 'yearly'])[1 + floor(random() * 2)] ELSE NULL END
            ) RETURNING id INTO asset_id;

        END LOOP;
    END LOOP;

    -- =================================================================
    -- 3. GENERAR TRANSACCIONES Y RESEÑAS (La Reputación)
    -- =================================================================
    RAISE NOTICE '⭐ Generando 500 transacciones y reseñas...';
    FOR j IN 1..500 LOOP
        -- Seleccionar un activo y su proveedor al azar
        SELECT da.id, da.subject_org_id 
        INTO asset_id, target_provider_id 
        FROM data_assets da
        WHERE da.is_public_marketplace = true 
        ORDER BY random() 
        LIMIT 1;
        
        -- Seleccionar un consumer al azar
        SELECT id INTO consumer_id
        FROM organizations 
        WHERE type = 'consumer' AND is_demo = true 
        ORDER BY random() 
        LIMIT 1;

        IF asset_id IS NOT NULL AND consumer_id IS NOT NULL AND target_provider_id IS NOT NULL THEN
            -- Insertar transacción completada
            INSERT INTO data_transactions (
                consumer_org_id, 
                subject_org_id, 
                holder_org_id, 
                asset_id, 
                status, 
                purpose,
                justification,
                requested_by,
                payment_status,
                access_duration_days
            ) VALUES (
                consumer_id,
                target_provider_id,
                target_provider_id, 
                asset_id,
                'completed',
                'Synthetic Marketplace Transaction',
                'Data acquisition for business analytics and reporting.',
                demo_user_id,
                'paid',
                90
            )
            RETURNING id INTO trans_id;

            -- Crear Reseña
            IF trans_id IS NOT NULL THEN
                INSERT INTO organization_reviews (
                    transaction_id,
                    reviewer_org_id,
                    target_org_id,
                    rating,
                    comment,
                    metrics,
                    created_at
                ) VALUES (
                    trans_id,
                    consumer_id,
                    target_provider_id,
                    floor(random() * 2 + 3)::integer,
                    review_comments_good[1 + floor(random() * array_length(review_comments_good, 1))],
                    jsonb_build_object(
                        'data_quality', floor(random() * 3 + 3),
                        'delivery_speed', floor(random() * 3 + 3)
                    ),
                    NOW() - (floor(random() * 365) || ' days')::interval
                ) ON CONFLICT DO NOTHING;
            END IF;
        END IF;
    END LOOP;

    RAISE NOTICE '✅ Generación de datos completada exitosamente.';
    RAISE NOTICE '📈 Estadísticas: 30+ orgs, 30+ wallets, 100+ productos, 300+ activos, 500 reseñas';
END $$;