-- Crear tabla para almacenar solicitudes de elegibilidad de nodos
CREATE TABLE public.node_eligibility_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_name TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('cluster', 'empresa', 'centro', 'otro')),
  ecosystem_status TEXT NOT NULL CHECK (ecosystem_status IN ('ready', 'process', 'help')),
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'qualified', 'rejected')),
  ip_address TEXT,
  user_agent TEXT,
  notes TEXT,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Comentario de tabla
COMMENT ON TABLE public.node_eligibility_requests IS 'Solicitudes de elegibilidad para Nodos Sectoriales';

-- Habilitar RLS
ALTER TABLE public.node_eligibility_requests ENABLE ROW LEVEL SECURITY;

-- Política: Permitir inserciones públicas (formulario sin autenticación)
CREATE POLICY "Anyone can submit eligibility request"
  ON public.node_eligibility_requests
  FOR INSERT
  WITH CHECK (true);

-- Política: Solo admins pueden ver solicitudes
CREATE POLICY "Admins can view eligibility requests"
  ON public.node_eligibility_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Política: Solo admins pueden actualizar solicitudes
CREATE POLICY "Admins can update eligibility requests"
  ON public.node_eligibility_requests
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Trigger para actualizar updated_at
CREATE TRIGGER update_node_eligibility_timestamp
  BEFORE UPDATE ON public.node_eligibility_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para búsquedas frecuentes
CREATE INDEX idx_node_eligibility_status ON public.node_eligibility_requests(status);
CREATE INDEX idx_node_eligibility_created ON public.node_eligibility_requests(created_at DESC);