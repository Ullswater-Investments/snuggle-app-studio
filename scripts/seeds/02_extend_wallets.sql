-- ============================================================
-- FASE 2: WALLETS PARA NUEVAS ORGANIZACIONES
-- Columna correcta: 'address' (no 'wallet_address')
-- ============================================================

-- Crear wallets para organizaciones que no tengan una
INSERT INTO wallets (organization_id, balance, currency, address)
SELECT 
  o.id,
  CASE 
    WHEN o.sector = 'Industrial' THEN 45000.00
    WHEN o.sector = 'Comercio' THEN 85000.00
    WHEN o.sector = 'Financiero' THEN 250000.00
    WHEN o.sector = 'Energía' THEN 120000.00
    WHEN o.sector = 'Agroalimentario' THEN 35000.00
    ELSE 15000.00 
  END,
  'EUR',
  '0x' || encode(gen_random_bytes(20), 'hex')
FROM organizations o
WHERE o.is_demo = true
  AND NOT EXISTS (
    SELECT 1 FROM wallets w WHERE w.organization_id = o.id
  );

-- Verificación
SELECT o.name, w.balance, w.currency 
FROM wallets w 
JOIN organizations o ON w.organization_id = o.id 
WHERE o.is_demo = true
ORDER BY w.balance DESC;
