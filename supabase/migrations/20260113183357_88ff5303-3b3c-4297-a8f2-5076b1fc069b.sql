-- Crear enum para estados de solicitud de registro
CREATE TYPE registration_status AS ENUM (
  'pending',
  'under_review',
  'approved',
  'rejected',
  'needs_info'
);

-- Crear tabla de solicitudes de registro
CREATE TABLE public.registration_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Rol seleccionado
  role TEXT NOT NULL CHECK (role IN ('buyer', 'supplier')),
  
  -- Datos de la organización
  legal_name TEXT NOT NULL,
  tax_id TEXT NOT NULL,
  country TEXT NOT NULL,
  address TEXT NOT NULL,
  sector TEXT NOT NULL,
  size TEXT NOT NULL,
  product_category TEXT,
  erp_type TEXT,
  
  -- Datos del representante
  representative_name TEXT NOT NULL,
  representative_position TEXT,
  representative_email TEXT NOT NULL,
  representative_phone TEXT,
  
  -- Intenciones de uso
  intention_data_types TEXT[] DEFAULT '{}',
  intention_has_erp TEXT,
  
  -- Aceptaciones legales
  accepted_terms BOOLEAN DEFAULT false,
  accepted_gdpr BOOLEAN DEFAULT false,
  accepted_conduct BOOLEAN DEFAULT false,
  
  -- Estado y seguimiento
  status registration_status DEFAULT 'pending',
  reviewer_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  
  -- Organización resultante (si se aprueba)
  created_organization_id UUID REFERENCES public.organizations(id)
);

-- Índices para búsquedas comunes
CREATE INDEX idx_registration_requests_status ON registration_requests(status);
CREATE INDEX idx_registration_requests_email ON registration_requests(representative_email);
CREATE INDEX idx_registration_requests_tax_id ON registration_requests(tax_id);
CREATE INDEX idx_registration_requests_created_at ON registration_requests(created_at DESC);

-- Trigger para updated_at
CREATE TRIGGER update_registration_requests_updated_at
  BEFORE UPDATE ON registration_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE registration_requests ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede enviar una solicitud (formulario público)
CREATE POLICY "Anyone can submit registration request"
  ON registration_requests
  FOR INSERT
  WITH CHECK (true);

-- Solo admins pueden ver todas las solicitudes
CREATE POLICY "Admins can view all registration requests"
  ON registration_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Admins pueden actualizar estados de solicitudes
CREATE POLICY "Admins can update registration requests"
  ON registration_requests
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );