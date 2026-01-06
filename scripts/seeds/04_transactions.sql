-- ============================================================
-- FASE 4: TRANSACCIONES HISTÓRICAS
-- Estados válidos: initiated, pending_subject, pending_holder, 
--                  approved, denied_subject, denied_holder, completed, cancelled
-- Campos obligatorios: purpose, justification, requested_by, access_duration_days
-- ============================================================

-- Obtener ID del usuario demo para requested_by
DO $$
DECLARE
  demo_user_id uuid;
BEGIN
  SELECT id INTO demo_user_id FROM auth.users WHERE email = 'demo@procuredata.app' LIMIT 1;
  
  IF demo_user_id IS NULL THEN
    RAISE NOTICE 'Usuario demo no encontrado. Ejecuta primero el registro del usuario demo.';
    RETURN;
  END IF;

  -- 1. Global Retail compra Ficha Técnica a Titan (Completado hace 60 días)
  INSERT INTO data_transactions (
    id, asset_id, consumer_org_id, subject_org_id, holder_org_id,
    status, purpose, justification, access_duration_days, requested_by, created_at
  ) VALUES (
    'dddddddd-0001-0001-0001-000000000001',
    'cccccccc-0001-0001-0001-000000000001',
    'aaaaaaaa-0002-0002-0002-000000000002', -- Global Retail (consumer)
    'aaaaaaaa-0001-0001-0001-000000000001', -- Titan (subject)
    'aaaaaaaa-0001-0001-0001-000000000001', -- Titan (holder)
    'completed',
    'Alta de proveedor industrial en ERP',
    'Homologación de Titan Manufacturas como proveedor estratégico para nueva línea de electrodomésticos.',
    365,
    demo_user_id,
    NOW() - INTERVAL '60 days'
  ) ON CONFLICT (id) DO NOTHING;

  -- 2. Constructora Horizonte solicita ISOs a Titan (Pendiente de pago = pending_holder)
  INSERT INTO data_transactions (
    id, asset_id, consumer_org_id, subject_org_id, holder_org_id,
    status, purpose, justification, access_duration_days, requested_by, created_at
  ) VALUES (
    'dddddddd-0001-0001-0001-000000000002',
    'cccccccc-0001-0001-0001-000000000002',
    'aaaaaaaa-0002-0002-0002-000000000001', -- Constructora Horizonte
    'aaaaaaaa-0001-0001-0001-000000000001', -- Titan
    'aaaaaaaa-0001-0001-0001-000000000001', -- Titan
    'pending_holder',
    'Verificación certificaciones ISO para licitación pública',
    'Requerimos Pack ISO para cumplir requisitos de licitación de obra pública Ayuntamiento Madrid.',
    90,
    demo_user_id,
    NOW() - INTERVAL '2 hours'
  ) ON CONFLICT (id) DO NOTHING;

  -- 3. EcoMotion solicita Telemetría a EcoVolt (Aprobado, pendiente activación)
  INSERT INTO data_transactions (
    id, asset_id, consumer_org_id, subject_org_id, holder_org_id,
    status, purpose, justification, access_duration_days, requested_by, created_at
  ) VALUES (
    'dddddddd-0002-0002-0002-000000000001',
    'cccccccc-0004-0004-0004-000000000001',
    'aaaaaaaa-0002-0002-0002-000000000003', -- EcoMotion
    'aaaaaaaa-0001-0001-0001-000000000003', -- EcoVolt
    'aaaaaaaa-0001-0001-0001-000000000003', -- EcoVolt
    'approved',
    'Optimización de rutas y puntos de carga',
    'Integración de datos de telemetría para algoritmo de optimización de flota eléctrica.',
    180,
    demo_user_id,
    NOW() - INTERVAL '5 days'
  ) ON CONFLICT (id) DO NOTHING;

  -- 4. Global Retail compra Trazabilidad a AgroBio (Completado hace 1 semana)
  INSERT INTO data_transactions (
    id, asset_id, consumer_org_id, subject_org_id, holder_org_id,
    status, purpose, justification, access_duration_days, requested_by, created_at
  ) VALUES (
    'dddddddd-0003-0003-0003-000000000001',
    'cccccccc-0002-0002-0002-000000000001',
    'aaaaaaaa-0002-0002-0002-000000000002', -- Global Retail
    'aaaaaaaa-0003-0003-0003-000000000001', -- AgroBio
    'aaaaaaaa-0003-0003-0003-000000000001', -- AgroBio
    'completed',
    'Trazabilidad productos ecológicos',
    'Certificación de trazabilidad para línea premium de productos bio en supermercados.',
    365,
    demo_user_id,
    NOW() - INTERVAL '7 days'
  ) ON CONFLICT (id) DO NOTHING;

  -- 5. Nueva solicitud iniciada (para mostrar flujo completo)
  INSERT INTO data_transactions (
    id, asset_id, consumer_org_id, subject_org_id, holder_org_id,
    status, purpose, justification, access_duration_days, requested_by, created_at
  ) VALUES (
    'dddddddd-0004-0004-0004-000000000001',
    'cccccccc-0003-0003-0003-000000000001',
    'aaaaaaaa-0002-0002-0002-000000000001', -- Constructora Horizonte
    'aaaaaaaa-0002-0002-0002-000000000002', -- Global Retail
    'aaaaaaaa-0002-0002-0002-000000000002', -- Global Retail
    'initiated',
    'Análisis de demanda materiales construcción',
    'Estudio de mercado para planificación de proyectos residenciales 2025.',
    30,
    demo_user_id,
    NOW() - INTERVAL '30 minutes'
  ) ON CONFLICT (id) DO NOTHING;

  -- 6. Transacción denegada (para mostrar estado denied)
  INSERT INTO data_transactions (
    id, asset_id, consumer_org_id, subject_org_id, holder_org_id,
    status, purpose, justification, access_duration_days, requested_by, created_at
  ) VALUES (
    'dddddddd-0005-0005-0005-000000000001',
    'cccccccc-0001-0001-0001-000000000001',
    'aaaaaaaa-0003-0003-0003-000000000002', -- PharmaCare
    'aaaaaaaa-0001-0001-0001-000000000001', -- Titan
    'aaaaaaaa-0001-0001-0001-000000000001', -- Titan
    'denied_subject',
    'Evaluación de proveedor alternativo',
    'Solicitud exploratoria para posible diversificación de proveedores.',
    60,
    demo_user_id,
    NOW() - INTERVAL '15 days'
  ) ON CONFLICT (id) DO NOTHING;

  RAISE NOTICE 'Transacciones demo insertadas correctamente para usuario %', demo_user_id;
END $$;

-- Verificación
SELECT 
  dt.status,
  dp.name as producto,
  c.name as consumidor,
  s.name as proveedor,
  dt.created_at::date as fecha
FROM data_transactions dt
JOIN data_assets da ON dt.asset_id = da.id
JOIN data_products dp ON da.product_id = dp.id
JOIN organizations c ON dt.consumer_org_id = c.id
JOIN organizations s ON dt.subject_org_id = s.id
WHERE c.is_demo = true OR s.is_demo = true
ORDER BY dt.created_at DESC
LIMIT 10;
