-- Enum para tipos de configuración ERP
CREATE TYPE public.erp_config_type AS ENUM ('download', 'upload');

-- Enum para métodos de autenticación
CREATE TYPE public.auth_method AS ENUM ('bearer', 'api_key', 'oauth', 'basic');

-- Tabla de datos de proveedores (estructura según Tabla VI.B del documento)
CREATE TABLE public.supplier_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id) ON DELETE CASCADE,
  -- Información Corporativa
  company_name TEXT NOT NULL,
  tax_id TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  -- Domicilio Fiscal (JSON para flexibilidad)
  fiscal_address JSONB NOT NULL,
  -- Domicilio Social/Legal
  legal_address JSONB,
  -- Contacto
  legal_admin_name TEXT,
  contact_person_name TEXT,
  contact_person_phone TEXT,
  contact_person_email TEXT,
  -- Metadatos
  data_source TEXT,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de configuraciones ERP
CREATE TABLE public.erp_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  config_type erp_config_type NOT NULL,
  config_name TEXT NOT NULL,
  endpoint_url TEXT NOT NULL,
  auth_method auth_method NOT NULL DEFAULT 'bearer',
  -- Credenciales encriptadas (usar Supabase Vault en producción)
  api_key_encrypted TEXT,
  auth_token_encrypted TEXT,
  -- Mapeo de campos (JSON)
  field_mapping JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_test_date TIMESTAMP WITH TIME ZONE,
  last_test_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(organization_id, config_type, config_name)
);

-- Tabla de logs de exportación
CREATE TABLE public.export_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  export_type TEXT NOT NULL CHECK (export_type IN ('csv', 'json', 'erp')),
  export_status TEXT NOT NULL CHECK (export_status IN ('success', 'failed', 'pending')),
  erp_config_id UUID REFERENCES public.erp_configurations(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.supplier_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.erp_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_logs ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para supplier_data
CREATE POLICY "Usuarios pueden ver datos de transacciones completadas de su org"
ON public.supplier_data
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.data_transactions
    WHERE data_transactions.id = supplier_data.transaction_id
    AND data_transactions.status = 'completed'
    AND data_transactions.consumer_org_id = public.get_user_organization(auth.uid())
  )
);

CREATE POLICY "Sistema puede insertar datos de proveedor"
ON public.supplier_data
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Políticas RLS para erp_configurations
CREATE POLICY "Usuarios pueden ver configuraciones de su organización"
ON public.erp_configurations
FOR SELECT
TO authenticated
USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Admins y configuradores pueden gestionar configs ERP"
ON public.erp_configurations
FOR ALL
TO authenticated
USING (
  organization_id = public.get_user_organization(auth.uid()) AND
  (
    public.has_role(auth.uid(), organization_id, 'admin') OR
    public.has_role(auth.uid(), organization_id, 'api_configurator')
  )
);

-- Políticas RLS para export_logs
CREATE POLICY "Usuarios pueden ver logs de su organización"
ON public.export_logs
FOR SELECT
TO authenticated
USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Usuarios pueden insertar sus propios logs"
ON public.export_logs
FOR INSERT
TO authenticated
WITH CHECK (
  organization_id = public.get_user_organization(auth.uid()) AND
  user_id = auth.uid()
);

-- Triggers para updated_at
CREATE TRIGGER update_erp_configurations_updated_at
BEFORE UPDATE ON public.erp_configurations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para mejorar rendimiento
CREATE INDEX idx_supplier_data_transaction ON public.supplier_data(transaction_id);
CREATE INDEX idx_erp_configurations_org ON public.erp_configurations(organization_id);
CREATE INDEX idx_export_logs_transaction ON public.export_logs(transaction_id);
CREATE INDEX idx_export_logs_org ON public.export_logs(organization_id);