-- Crear tabla de reportes ESG
CREATE TABLE IF NOT EXISTS esg_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  report_year INT NOT NULL,
  scope1_total_tons NUMERIC DEFAULT 0,
  scope2_total_tons NUMERIC DEFAULT 0,
  energy_renewable_percent NUMERIC DEFAULT 0,
  certifications TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Restricción para no duplicar años por empresa
  UNIQUE(organization_id, report_year)
);

-- Habilitar seguridad RLS
ALTER TABLE esg_reports ENABLE ROW LEVEL SECURITY;

-- Política de Lectura
CREATE POLICY "Ver propios reportes ESG" ON esg_reports
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

-- Política de Escritura
CREATE POLICY "Crear propios reportes ESG" ON esg_reports
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
    )
  );