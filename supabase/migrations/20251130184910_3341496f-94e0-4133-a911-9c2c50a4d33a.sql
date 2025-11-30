-- ==============================================================================
-- FASE 7B: INFRAESTRUCTURA FINANCIERA DESCENTRALIZADA
-- ==============================================================================

-- BLOQUE 1: WALLETS (Billeteras por Organización)
CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    address TEXT NOT NULL UNIQUE,
    balance NUMERIC DEFAULT 0 CHECK (balance >= 0),
    currency TEXT DEFAULT 'EUR',
    is_frozen BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id)
);

ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuarios pueden ver wallet de su org" ON wallets;
CREATE POLICY "Usuarios pueden ver wallet de su org" ON wallets
  FOR SELECT USING (
    organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid())
  );

-- BLOQUE 2: LEDGER INMUTABLE (Registro de Transacciones)
CREATE TABLE IF NOT EXISTS wallet_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_wallet_id UUID REFERENCES wallets(id),
    to_wallet_id UUID REFERENCES wallets(id),
    amount NUMERIC NOT NULL CHECK (amount > 0),
    currency TEXT DEFAULT 'EUR',
    transaction_type TEXT, -- 'payment', 'refund', 'deposit', 'withdrawal'
    status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'failed'
    reference_id UUID, -- FK a data_transactions si aplica
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT at_least_one_wallet CHECK (from_wallet_id IS NOT NULL OR to_wallet_id IS NOT NULL)
);

ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Ver transacciones de wallets propias" ON wallet_transactions;
CREATE POLICY "Ver transacciones de wallets propias" ON wallet_transactions
  FOR SELECT USING (
    from_wallet_id IN (SELECT id FROM wallets WHERE organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()))
    OR to_wallet_id IN (SELECT id FROM wallets WHERE organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()))
  );

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_wallets_org ON wallets(organization_id);
CREATE INDEX IF NOT EXISTS idx_wallet_txs_from ON wallet_transactions(from_wallet_id);
CREATE INDEX IF NOT EXISTS idx_wallet_txs_to ON wallet_transactions(to_wallet_id);
CREATE INDEX IF NOT EXISTS idx_wallet_txs_created ON wallet_transactions(created_at DESC);

-- Trigger para actualizar updated_at en wallets
CREATE OR REPLACE FUNCTION update_wallet_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_wallet_timestamp ON wallets;
CREATE TRIGGER trigger_update_wallet_timestamp
  BEFORE UPDATE ON wallets
  FOR EACH ROW
  EXECUTE FUNCTION update_wallet_timestamp();