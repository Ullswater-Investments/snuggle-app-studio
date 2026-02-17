-- ============================================================
-- PROCUREDATA — DDL Completo para Migración
-- Generado: 2026-02-16
-- ============================================================

-- ============================================================
-- 1. TIPOS ENUMERADOS
-- ============================================================

CREATE TYPE public.app_role AS ENUM (
  'admin',
  'approver',
  'viewer',
  'api_configurator',
  'data_space_owner'
);

CREATE TYPE public.approval_action AS ENUM (
  'pre_approve',
  'approve',
  'deny',
  'cancel'
);

CREATE TYPE public.auth_method AS ENUM (
  'bearer',
  'api_key',
  'oauth',
  'basic'
);

CREATE TYPE public.erp_config_type AS ENUM (
  'download',
  'upload'
);

CREATE TYPE public.organization_type AS ENUM (
  'consumer',
  'provider',
  'data_holder'
);

CREATE TYPE public.registration_status AS ENUM (
  'pending',
  'under_review',
  'approved',
  'rejected',
  'needs_info'
);

CREATE TYPE public.transaction_status AS ENUM (
  'initiated',
  'pending_subject',
  'pending_holder',
  'approved',
  'denied_subject',
  'denied_holder',
  'completed',
  'cancelled',
  'revoked'
);

-- ============================================================
-- 2. TABLAS CORE
-- ============================================================

-- 2.1 Organizations
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tax_id TEXT NOT NULL,
  type public.organization_type NOT NULL,
  description TEXT,
  sector TEXT,
  website TEXT,
  linkedin_url TEXT,
  logo_url TEXT,
  banner_url TEXT,
  marketplace_description TEXT,
  seller_category TEXT,
  did TEXT,
  wallet_address TEXT,
  verification_source TEXT,
  stripe_connect_id TEXT,
  kyb_verified BOOLEAN DEFAULT false,
  pontus_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.2 Data Products (catálogo de tipos de producto)
CREATE TABLE public.data_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0',
  description TEXT,
  category TEXT,
  schema_definition JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.3 Data Assets (instancias publicadas)
CREATE TABLE public.data_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.data_products(id),
  subject_org_id UUID NOT NULL REFERENCES public.organizations(id),
  holder_org_id UUID NOT NULL REFERENCES public.organizations(id),
  status TEXT NOT NULL DEFAULT 'pending_validation',
  price NUMERIC DEFAULT 0,
  pricing_model TEXT DEFAULT 'free',
  currency TEXT DEFAULT 'EUR',
  billing_period TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  is_public_marketplace BOOLEAN DEFAULT false,
  custom_metadata JSONB,
  sample_data JSONB,
  admin_notes TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.4 Data Transactions
CREATE TABLE public.data_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID NOT NULL REFERENCES public.data_assets(id),
  consumer_org_id UUID NOT NULL REFERENCES public.organizations(id),
  subject_org_id UUID NOT NULL REFERENCES public.organizations(id),
  holder_org_id UUID NOT NULL REFERENCES public.organizations(id),
  status public.transaction_status NOT NULL DEFAULT 'initiated',
  purpose TEXT NOT NULL,
  justification TEXT NOT NULL,
  access_duration_days INTEGER NOT NULL DEFAULT 90,
  requested_by UUID NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  payment_status TEXT DEFAULT 'na',
  payment_provider_id TEXT,
  invoice_url TEXT,
  subscription_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.5 Approval History
CREATE TABLE public.approval_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id),
  actor_user_id UUID NOT NULL,
  actor_org_id UUID NOT NULL REFERENCES public.organizations(id),
  action public.approval_action NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.6 Access Logs
CREATE TABLE public.access_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id),
  consumer_org_id UUID NOT NULL REFERENCES public.organizations(id),
  asset_id UUID REFERENCES public.data_assets(id),
  user_id UUID,
  action TEXT DEFAULT 'download',
  status TEXT DEFAULT 'success',
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.7 Data Payloads
CREATE TABLE public.data_payloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id) UNIQUE,
  schema_type TEXT NOT NULL,
  data_content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.8 Data Policies (ODRL)
CREATE TABLE public.data_policies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id) UNIQUE,
  odrl_policy_json JSONB NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.9 User Profiles
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES public.organizations(id),
  full_name TEXT,
  position TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, organization_id)
);

-- 2.10 User Roles
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES public.organizations(id),
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, organization_id, role)
);

-- 2.11 Notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  organization_id UUID,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info',
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.12 Catalog Metadata
CREATE TABLE public.catalog_metadata (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID NOT NULL REFERENCES public.data_assets(id) UNIQUE,
  visibility TEXT NOT NULL DEFAULT 'public',
  tags TEXT[],
  categories TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.13 Supplier Data
CREATE TABLE public.supplier_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id),
  company_name TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  tax_id TEXT NOT NULL,
  fiscal_address JSONB NOT NULL,
  legal_address JSONB,
  legal_admin_name TEXT,
  contact_person_name TEXT,
  contact_person_email TEXT,
  contact_person_phone TEXT,
  data_source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.14 Transaction Messages
CREATE TABLE public.transaction_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id),
  sender_org_id UUID NOT NULL REFERENCES public.organizations(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.15 Organization Reviews
CREATE TABLE public.organization_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id),
  reviewer_org_id UUID NOT NULL REFERENCES public.organizations(id),
  target_org_id UUID NOT NULL REFERENCES public.organizations(id),
  rating INTEGER NOT NULL,
  comment TEXT,
  metrics JSONB DEFAULT '{"data_quality": 0, "delivery_speed": 0}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.16 Wallets
CREATE TABLE public.wallets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) UNIQUE,
  address TEXT NOT NULL,
  balance NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  is_frozen BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2.17 Wallet Transactions
CREATE TABLE public.wallet_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_wallet_id UUID REFERENCES public.wallets(id),
  to_wallet_id UUID REFERENCES public.wallets(id),
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'EUR',
  transaction_type TEXT,
  status TEXT DEFAULT 'completed',
  reference_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.18 ERP Configurations
CREATE TABLE public.erp_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id),
  config_type public.erp_config_type NOT NULL,
  config_name TEXT NOT NULL,
  endpoint_url TEXT NOT NULL,
  auth_method public.auth_method NOT NULL DEFAULT 'bearer',
  api_key_encrypted TEXT,
  auth_token_encrypted TEXT,
  public_key TEXT,
  protocol_url TEXT,
  management_url TEXT,
  field_mapping JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_test_date TIMESTAMPTZ,
  last_test_status TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.19 Export Logs
CREATE TABLE public.export_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id),
  organization_id UUID NOT NULL REFERENCES public.organizations(id),
  erp_config_id UUID REFERENCES public.erp_configurations(id),
  user_id UUID NOT NULL,
  export_type TEXT NOT NULL,
  export_status TEXT NOT NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.20 ESG Reports
CREATE TABLE public.esg_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id),
  report_year INTEGER NOT NULL,
  scope1_total_tons NUMERIC DEFAULT 0,
  scope2_total_tons NUMERIC DEFAULT 0,
  energy_renewable_percent NUMERIC DEFAULT 0,
  certifications TEXT[] DEFAULT '{}'::text[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.21 Audit Logs
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id),
  actor_id UUID,
  actor_email TEXT,
  action TEXT NOT NULL,
  resource TEXT,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.22 Webhooks
CREATE TABLE public.webhooks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id),
  url TEXT NOT NULL,
  secret TEXT NOT NULL,
  events TEXT[] DEFAULT '{}'::text[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2.23 Privacy Preferences
CREATE TABLE public.privacy_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  profile_visible BOOLEAN DEFAULT true,
  show_access_history BOOLEAN DEFAULT true,
  anonymous_research BOOLEAN DEFAULT false,
  access_alerts BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  in_app_notifications BOOLEAN DEFAULT true,
  notify_data_requests BOOLEAN DEFAULT true,
  notify_payments BOOLEAN DEFAULT true,
  notify_contracts BOOLEAN DEFAULT true,
  notify_system BOOLEAN DEFAULT true,
  notify_marketing BOOLEAN DEFAULT false,
  weekly_digest BOOLEAN DEFAULT false,
  instant_alerts BOOLEAN DEFAULT true,
  quiet_hours_enabled BOOLEAN DEFAULT false,
  quiet_hours_start TIME DEFAULT '22:00:00',
  quiet_hours_end TIME DEFAULT '08:00:00',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2.24 Registration Requests
CREATE TABLE public.registration_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  legal_name TEXT NOT NULL,
  tax_id TEXT NOT NULL,
  country TEXT NOT NULL,
  address TEXT NOT NULL,
  sector TEXT NOT NULL,
  size TEXT NOT NULL,
  role TEXT NOT NULL,
  product_category TEXT,
  erp_type TEXT,
  representative_name TEXT NOT NULL,
  representative_position TEXT,
  representative_email TEXT NOT NULL,
  representative_phone TEXT,
  intention_data_types TEXT[] DEFAULT '{}'::text[],
  intention_has_erp TEXT,
  accepted_terms BOOLEAN DEFAULT false,
  accepted_gdpr BOOLEAN DEFAULT false,
  accepted_conduct BOOLEAN DEFAULT false,
  status public.registration_status DEFAULT 'pending',
  reviewer_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  created_organization_id UUID REFERENCES public.organizations(id),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2.25 Signed Contracts
CREATE TABLE public.signed_contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  position TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  tax_id TEXT NOT NULL,
  signature_data_url TEXT NOT NULL,
  accepted_terms BOOLEAN NOT NULL DEFAULT false,
  accepted_gdpr BOOLEAN NOT NULL DEFAULT false,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  signature_type TEXT DEFAULT 'simple',
  eidas_level TEXT DEFAULT 'simple',
  signature_provider TEXT,
  certificate_serial TEXT,
  certificate_issuer TEXT,
  document_hash TEXT,
  signed_document_url TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.26 AI Feedback
CREATE TABLE public.ai_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  user_question TEXT NOT NULL,
  bot_response TEXT NOT NULL,
  is_positive BOOLEAN NOT NULL,
  user_correction TEXT,
  current_page TEXT,
  user_sector TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.27 Login Attempts
CREATE TABLE public.login_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  success BOOLEAN DEFAULT false,
  ip_address TEXT,
  attempted_at TIMESTAMPTZ DEFAULT now()
);

-- 2.28 Node Eligibility Requests
CREATE TABLE public.node_eligibility_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_name TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  ecosystem_status TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2.29 Marketplace Opportunities
CREATE TABLE public.marketplace_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  consumer_org_id UUID NOT NULL REFERENCES public.organizations(id),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.30 User Wishlist
CREATE TABLE public.user_wishlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  asset_id UUID NOT NULL REFERENCES public.data_assets(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.31 Partner Access
CREATE TABLE public.partner_access (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_slug VARCHAR NOT NULL,
  partner_name VARCHAR NOT NULL,
  partner_number INTEGER,
  username VARCHAR NOT NULL,
  password_hash TEXT NOT NULL,
  logo_url TEXT,
  redirect_path TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2.32 Value Services
CREATE TABLE public.value_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  icon_name TEXT,
  provider_org_id UUID REFERENCES public.organizations(id),
  api_endpoint TEXT,
  version TEXT,
  price NUMERIC,
  price_model TEXT,
  currency TEXT,
  features JSONB,
  integrations JSONB,
  code_examples JSONB,
  documentation_md TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.33 Success Stories
CREATE TABLE public.success_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  impact_highlight TEXT NOT NULL,
  metrics JSONB NOT NULL,
  quote TEXT,
  author_role TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.34 Innovation Lab Concepts
CREATE TABLE public.innovation_lab_concepts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_analysis TEXT NOT NULL,
  business_impact TEXT NOT NULL,
  category TEXT NOT NULL,
  chart_type TEXT NOT NULL,
  chart_data JSONB NOT NULL,
  chart_config JSONB NOT NULL,
  maturity_level INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. VISTA: Marketplace Listings
-- ============================================================

CREATE OR REPLACE VIEW public.marketplace_listings AS
SELECT
  da.id AS asset_id,
  da.product_id,
  dp.name AS product_name,
  dp.description AS product_description,
  dp.category,
  dp.version,
  da.subject_org_id AS provider_id,
  o.name AS provider_name,
  o.seller_category,
  o.kyb_verified,
  da.price,
  da.pricing_model,
  da.currency,
  da.billing_period,
  da.created_at,
  COALESCE(esg.energy_renewable_percent, 0) AS energy_renewable_percent,
  (esg.energy_renewable_percent IS NOT NULL AND esg.energy_renewable_percent >= 50) AS has_green_badge,
  COALESCE(AVG(r.rating), 0) AS reputation_score,
  COUNT(r.id) AS review_count
FROM public.data_assets da
JOIN public.data_products dp ON da.product_id = dp.id
JOIN public.organizations o ON da.subject_org_id = o.id
LEFT JOIN public.esg_reports esg ON esg.organization_id = o.id
LEFT JOIN public.organization_reviews r ON r.target_org_id = o.id
WHERE da.status = 'active'
  AND da.is_visible = true
  AND da.is_public_marketplace = true
GROUP BY da.id, dp.id, o.id, esg.energy_renewable_percent;

-- ============================================================
-- 4. FUNCIONES
-- ============================================================

-- 4.1 Obtener organización del usuario
CREATE OR REPLACE FUNCTION public.get_user_organization(_user_id UUID)
RETURNS UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT organization_id
  FROM public.user_profiles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- 4.2 Verificar rol
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _organization_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND organization_id = _organization_id
      AND role = _role
  )
$$;

-- 4.3 Verificar Data Space Owner
CREATE OR REPLACE FUNCTION public.is_data_space_owner(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'data_space_owner'
  )
$$;

-- 4.4 Timestamp automático
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 4.5 KPIs de organización
CREATE OR REPLACE FUNCTION public.get_org_kpis(target_org_id UUID)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  total_tx INT; approved_tx INT; avg_hours NUMERIC;
  compliance_score NUMERIC; approval_rate NUMERIC;
BEGIN
  SELECT COUNT(*) INTO total_tx FROM data_transactions
  WHERE consumer_org_id = target_org_id OR subject_org_id = target_org_id OR holder_org_id = target_org_id;

  SELECT COUNT(*) INTO approved_tx FROM data_transactions
  WHERE status IN ('approved','completed')
    AND (consumer_org_id = target_org_id OR subject_org_id = target_org_id OR holder_org_id = target_org_id);

  IF total_tx > 0 THEN approval_rate := round((approved_tx::numeric / total_tx::numeric) * 100, 1);
  ELSE approval_rate := 0; END IF;

  SELECT avg(EXTRACT(EPOCH FROM (ah.created_at - dt.created_at))/3600) INTO avg_hours
  FROM data_transactions dt JOIN approval_history ah ON dt.id = ah.transaction_id
  WHERE ah.action = 'approve'
    AND (dt.consumer_org_id = target_org_id OR dt.subject_org_id = target_org_id);

  compliance_score := 98.5;

  RETURN jsonb_build_object(
    'approval_rate', approval_rate,
    'avg_time_hours', COALESCE(round(avg_hours, 1), 24.0),
    'compliance_percent', compliance_score,
    'total_volume', total_tx
  );
END;
$$;

-- 4.6 Transacciones pendientes
CREATE OR REPLACE FUNCTION public.get_pending_transactions(_user_id UUID)
RETURNS TABLE(
  transaction_id UUID, role_in_transaction TEXT, asset_name TEXT,
  consumer_name TEXT, subject_name TEXT, holder_name TEXT,
  status transaction_status, purpose TEXT, created_at TIMESTAMPTZ
) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH user_org AS (
    SELECT organization_id FROM public.user_profiles WHERE user_id = _user_id LIMIT 1
  )
  SELECT dt.id, 
    CASE
      WHEN dt.consumer_org_id = (SELECT organization_id FROM user_org) THEN 'consumer'
      WHEN dt.subject_org_id = (SELECT organization_id FROM user_org) THEN 'subject'
      WHEN dt.holder_org_id = (SELECT organization_id FROM user_org) THEN 'holder'
    END,
    dp.name, c.name, s.name, h.name, dt.status, dt.purpose, dt.created_at
  FROM public.data_transactions dt
  JOIN public.data_assets da ON dt.asset_id = da.id
  JOIN public.data_products dp ON da.product_id = dp.id
  JOIN public.organizations c ON dt.consumer_org_id = c.id
  JOIN public.organizations s ON dt.subject_org_id = s.id
  JOIN public.organizations h ON dt.holder_org_id = h.id
  WHERE dt.consumer_org_id = (SELECT organization_id FROM user_org)
     OR dt.subject_org_id = (SELECT organization_id FROM user_org)
     OR dt.holder_org_id = (SELECT organization_id FROM user_org)
  ORDER BY dt.created_at DESC;
$$;

-- 4.7 Limpieza de login attempts
CREATE OR REPLACE FUNCTION public.cleanup_old_login_attempts()
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  DELETE FROM login_attempts WHERE attempted_at < now() - INTERVAL '30 days';
END;
$$;

-- ============================================================
-- 5. TRIGGERS
-- ============================================================

-- updated_at automático
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_data_assets_updated_at BEFORE UPDATE ON public.data_assets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_data_transactions_updated_at BEFORE UPDATE ON public.data_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_erp_configurations_updated_at BEFORE UPDATE ON public.erp_configurations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON public.wallets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 6. ROW LEVEL SECURITY — Habilitar RLS
-- ============================================================

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approval_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_payloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.erp_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esg_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.privacy_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signed_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_eligibility_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 7. POLÍTICAS RLS
-- ============================================================

-- ── organizations ──
CREATE POLICY "Los usuarios pueden ver organizaciones" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create organizations" ON public.organizations FOR INSERT WITH CHECK (true);
CREATE POLICY "Solo admins pueden actualizar organizaciones" ON public.organizations FOR UPDATE
  USING (has_role(auth.uid(), get_user_organization(auth.uid()), 'admin'));
CREATE POLICY "Data space owners can delete organizations" ON public.organizations FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── data_products ──
CREATE POLICY "Users can view products" ON public.data_products FOR SELECT USING (true);
CREATE POLICY "Users can create products" ON public.data_products FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their org products" ON public.data_products FOR UPDATE USING (true);
CREATE POLICY "Data space owners can view all data products" ON public.data_products FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── data_assets ──
CREATE POLICY "Todos pueden ver activos activos" ON public.data_assets FOR SELECT
  USING (status = 'active' AND is_visible = true);
CREATE POLICY "Users can view marketplace assets" ON public.data_assets FOR SELECT
  USING (is_public_marketplace = true
    OR EXISTS (SELECT 1 FROM user_roles WHERE organization_id = data_assets.subject_org_id AND user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_roles WHERE organization_id = data_assets.holder_org_id AND user_id = auth.uid()));
CREATE POLICY "Data space owners can view all assets" ON public.data_assets FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));
CREATE POLICY "Users can create assets for their org" ON public.data_assets FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM user_roles WHERE organization_id = data_assets.subject_org_id AND user_id = auth.uid()));
CREATE POLICY "Users can update their org assets" ON public.data_assets FOR UPDATE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE organization_id = data_assets.subject_org_id AND user_id = auth.uid()));
CREATE POLICY "DSO can update any asset" ON public.data_assets FOR UPDATE
  USING (is_data_space_owner(auth.uid())) WITH CHECK (is_data_space_owner(auth.uid()));
CREATE POLICY "Admins can delete org assets" ON public.data_assets FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE organization_id = data_assets.subject_org_id AND user_id = auth.uid() AND role = 'admin'));

-- ── data_transactions ──
CREATE POLICY "Los usuarios pueden ver transacciones de sus organizaciones" ON public.data_transactions FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()
    AND (organization_id = consumer_org_id OR organization_id = subject_org_id OR organization_id = holder_org_id)));
CREATE POLICY "Data space owners can view all transactions" ON public.data_transactions FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));
CREATE POLICY "Los consumers pueden crear transacciones" ON public.data_transactions FOR INSERT
  WITH CHECK (consumer_org_id = get_user_organization(auth.uid()) AND requested_by = auth.uid());
CREATE POLICY "Los actors pueden actualizar transacciones relacionadas" ON public.data_transactions FOR UPDATE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()
    AND (organization_id = consumer_org_id OR organization_id = subject_org_id OR organization_id = holder_org_id)));

-- ── access_logs ──
CREATE POLICY "Consumers ven sus propios logs" ON public.access_logs FOR SELECT
  USING (consumer_org_id = get_user_organization(auth.uid()));
CREATE POLICY "Providers ven logs de sus activos" ON public.access_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM data_assets da WHERE da.id = access_logs.asset_id AND da.subject_org_id = get_user_organization(auth.uid())));
CREATE POLICY "DSO global visibility" ON public.access_logs FOR SELECT
  USING (is_data_space_owner(auth.uid()));
CREATE POLICY "Gateway puede insertar logs" ON public.access_logs FOR INSERT WITH CHECK (true);

-- ── approval_history ──
CREATE POLICY "Participants can view approval history" ON public.approval_history FOR SELECT
  USING (EXISTS (SELECT 1 FROM data_transactions dt WHERE dt.id = approval_history.transaction_id
    AND (dt.consumer_org_id = get_user_organization(auth.uid())
      OR dt.subject_org_id = get_user_organization(auth.uid())
      OR dt.holder_org_id = get_user_organization(auth.uid()))));
CREATE POLICY "DSO can view all approval history" ON public.approval_history FOR SELECT
  USING (is_data_space_owner(auth.uid()));
CREATE POLICY "Actors can insert approval history" ON public.approval_history FOR INSERT
  WITH CHECK (actor_user_id = auth.uid());

-- ── user_profiles ──
CREATE POLICY "Los usuarios pueden ver perfiles de su organización" ON public.user_profiles FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));
CREATE POLICY "Users can insert their own profile" ON public.user_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON public.user_profiles FOR UPDATE
  USING (user_id = auth.uid());
CREATE POLICY "Data space owners can delete user profiles" ON public.user_profiles FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── user_roles ──
CREATE POLICY "Los usuarios pueden ver roles de su organización" ON public.user_roles FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));
CREATE POLICY "Solo admins pueden gestionar roles" ON public.user_roles FOR ALL
  USING (has_role(auth.uid(), organization_id, 'admin'));
CREATE POLICY "Users can add their own role" ON public.user_roles FOR INSERT
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Data space owners can delete user roles" ON public.user_roles FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'data_space_owner'));

-- ── data_payloads ──
CREATE POLICY "Consumers can view payloads of completed transactions" ON public.data_payloads FOR SELECT
  USING (EXISTS (SELECT 1 FROM data_transactions dt WHERE dt.id = data_payloads.transaction_id
    AND dt.status = 'completed' AND dt.consumer_org_id = get_user_organization(auth.uid())));
CREATE POLICY "Holders and Subjects can manage payloads" ON public.data_payloads FOR ALL
  USING (EXISTS (SELECT 1 FROM data_transactions dt WHERE dt.id = data_payloads.transaction_id
    AND (dt.holder_org_id = get_user_organization(auth.uid()) OR dt.subject_org_id = get_user_organization(auth.uid()))));

-- ── data_policies ──
CREATE POLICY "Los usuarios pueden ver políticas de sus transacciones" ON public.data_policies FOR SELECT
  USING (EXISTS (SELECT 1 FROM data_transactions WHERE id = data_policies.transaction_id
    AND (consumer_org_id = get_user_organization(auth.uid())
      OR subject_org_id = get_user_organization(auth.uid())
      OR holder_org_id = get_user_organization(auth.uid()))));
CREATE POLICY "Users can insert policies for their transactions" ON public.data_policies FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM data_transactions dt JOIN user_profiles up ON up.organization_id = dt.consumer_org_id
    WHERE dt.id = data_policies.transaction_id AND up.user_id = auth.uid()));

-- ── wallets ──
CREATE POLICY "Usuarios pueden ver wallet de su org" ON public.wallets FOR SELECT
  USING (organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can create wallet during org registration" ON public.wallets FOR INSERT WITH CHECK (true);
CREATE POLICY "Solo sistema puede modificar balance" ON public.wallets FOR UPDATE USING (false);
CREATE POLICY "Data space owners can delete wallets" ON public.wallets FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── wallet_transactions ──
CREATE POLICY "Ver transacciones de wallets propias" ON public.wallet_transactions FOR SELECT
  USING (from_wallet_id IN (SELECT id FROM wallets WHERE organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()))
    OR to_wallet_id IN (SELECT id FROM wallets WHERE organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid())));
CREATE POLICY "Solo sistema puede crear transacciones wallet" ON public.wallet_transactions FOR INSERT WITH CHECK (false);
CREATE POLICY "Solo sistema puede modificar transacciones wallet" ON public.wallet_transactions FOR UPDATE USING (false);

-- ── privacy_preferences ──
CREATE POLICY "Users can view own preferences" ON public.privacy_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON public.privacy_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON public.privacy_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Data space owners can delete privacy preferences" ON public.privacy_preferences FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── transaction_messages ──
CREATE POLICY "Ver mensajes de transacciones propias" ON public.transaction_messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM data_transactions dt WHERE dt.id = transaction_messages.transaction_id
    AND (dt.consumer_org_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid())
      OR dt.subject_org_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid())
      OR dt.holder_org_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()))));
CREATE POLICY "Enviar mensajes a transacciones propias" ON public.transaction_messages FOR INSERT
  WITH CHECK (sender_org_id = get_user_organization(auth.uid())
    AND EXISTS (SELECT 1 FROM data_transactions dt WHERE dt.id = transaction_messages.transaction_id
      AND (dt.consumer_org_id = sender_org_id OR dt.subject_org_id = sender_org_id OR dt.holder_org_id = sender_org_id)));

-- ── organization_reviews ──
CREATE POLICY "Lecturas públicas de reviews" ON public.organization_reviews FOR SELECT USING (true);
CREATE POLICY "Crear reviews propias" ON public.organization_reviews FOR INSERT
  WITH CHECK (reviewer_org_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()));

-- ── catalog_metadata ──
CREATE POLICY "Ver metadatos según visibilidad" ON public.catalog_metadata FOR SELECT
  USING (visibility = 'public' OR EXISTS (SELECT 1 FROM data_assets WHERE id = catalog_metadata.asset_id
    AND holder_org_id = get_user_organization(auth.uid())));
CREATE POLICY "Holders pueden gestionar metadatos de sus activos" ON public.catalog_metadata FOR ALL
  USING (EXISTS (SELECT 1 FROM data_assets WHERE id = catalog_metadata.asset_id
    AND holder_org_id = get_user_organization(auth.uid())));
CREATE POLICY "Data space owners can view all catalog metadata" ON public.catalog_metadata FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── erp_configurations ──
CREATE POLICY "Usuarios pueden ver configuraciones de su organización" ON public.erp_configurations FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));
CREATE POLICY "Admins y configuradores pueden gestionar configs ERP" ON public.erp_configurations FOR ALL
  USING (organization_id = get_user_organization(auth.uid())
    AND (has_role(auth.uid(), organization_id, 'admin') OR has_role(auth.uid(), organization_id, 'api_configurator')));

-- ── export_logs ──
CREATE POLICY "Usuarios pueden ver logs de su organización" ON public.export_logs FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));
CREATE POLICY "Usuarios pueden insertar sus propios logs" ON public.export_logs FOR INSERT
  WITH CHECK (organization_id = get_user_organization(auth.uid()) AND user_id = auth.uid());

-- ── esg_reports ──
CREATE POLICY "Ver propios reportes ESG" ON public.esg_reports FOR SELECT
  USING (organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Crear propios reportes ESG" ON public.esg_reports FOR INSERT
  WITH CHECK (organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Data space owners can delete esg reports" ON public.esg_reports FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── audit_logs ──
CREATE POLICY "Orgs view own logs" ON public.audit_logs FOR SELECT
  USING (organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Data space owners can delete audit logs" ON public.audit_logs FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── webhooks ──
CREATE POLICY "Users can view their org webhooks" ON public.webhooks FOR SELECT
  USING (organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Admins can manage their org webhooks" ON public.webhooks FOR ALL
  USING (organization_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid())
    AND has_role(auth.uid(), organization_id, 'admin'));
CREATE POLICY "Data space owners can delete webhooks" ON public.webhooks FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── registration_requests ──
CREATE POLICY "Anyone can submit registration request" ON public.registration_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all registration requests" ON public.registration_requests FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update registration requests" ON public.registration_requests FOR UPDATE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- ── signed_contracts ──
CREATE POLICY "Anyone can sign contracts" ON public.signed_contracts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view signed contracts" ON public.signed_contracts FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- ── marketplace_opportunities ──
CREATE POLICY "Todos pueden ver oportunidades activas" ON public.marketplace_opportunities FOR SELECT
  USING (status = 'active');
CREATE POLICY "Consumers pueden crear oportunidades" ON public.marketplace_opportunities FOR INSERT
  WITH CHECK (consumer_org_id = get_user_organization(auth.uid()));
CREATE POLICY "Owners pueden actualizar sus oportunidades" ON public.marketplace_opportunities FOR UPDATE
  USING (consumer_org_id = get_user_organization(auth.uid()));

-- ── ai_feedback ──
CREATE POLICY "Anyone can submit feedback" ON public.ai_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own feedback" ON public.ai_feedback FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all feedback" ON public.ai_feedback FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- ── user_wishlist ──
CREATE POLICY "Users can manage their own wishlist" ON public.user_wishlist FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ── partner_access ──
CREATE POLICY "Public can read partner info" ON public.partner_access FOR SELECT
  USING (is_active = true);

-- ── node_eligibility_requests ──
CREATE POLICY "Anyone can submit eligibility request" ON public.node_eligibility_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view eligibility requests" ON public.node_eligibility_requests FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update eligibility requests" ON public.node_eligibility_requests FOR UPDATE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- ============================================================
-- 8. NOTIFICATION TRIGGERS (funciones definidas aparte)
-- ============================================================

-- Notificación al cambiar estado de transacción
CREATE TRIGGER on_transaction_change
  AFTER INSERT OR UPDATE ON public.data_transactions
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_transaction_change();

-- Notificación al admin cuando se publica un nuevo activo
CREATE TRIGGER on_new_asset_created
  AFTER INSERT ON public.data_assets
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_new_asset();

-- Notificación al proveedor cuando se cambia el estado de su activo
CREATE TRIGGER on_asset_status_change
  AFTER UPDATE ON public.data_assets
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_asset_status_change();

-- Notificación al proveedor en descarga vía gateway
CREATE TRIGGER on_download_access_log
  AFTER INSERT ON public.access_logs
  FOR EACH ROW EXECUTE FUNCTION public.notify_provider_on_download();

-- Preferencias de privacidad al crear usuario
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_default_privacy_preferences();

-- ============================================================
-- FIN DEL DDL
-- ============================================================
