CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'approver',
    'viewer',
    'api_configurator'
);


--
-- Name: approval_action; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.approval_action AS ENUM (
    'pre_approve',
    'approve',
    'deny',
    'cancel'
);


--
-- Name: auth_method; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.auth_method AS ENUM (
    'bearer',
    'api_key',
    'oauth',
    'basic'
);


--
-- Name: erp_config_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.erp_config_type AS ENUM (
    'download',
    'upload'
);


--
-- Name: organization_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.organization_type AS ENUM (
    'consumer',
    'provider',
    'data_holder'
);


--
-- Name: transaction_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.transaction_status AS ENUM (
    'initiated',
    'pending_subject',
    'pending_holder',
    'approved',
    'denied_subject',
    'denied_holder',
    'completed',
    'cancelled'
);


--
-- Name: get_org_kpis(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_org_kpis(target_org_id uuid) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
    total_tx INT;
    approved_tx INT;
    avg_hours NUMERIC;
    compliance_score NUMERIC;
    approval_rate NUMERIC;
BEGIN
    -- 1. Calcular Tasa de Aprobación
    SELECT COUNT(*) INTO total_tx 
    FROM data_transactions 
    WHERE consumer_org_id = target_org_id OR subject_org_id = target_org_id OR holder_org_id = target_org_id;
    
    SELECT COUNT(*) INTO approved_tx 
    FROM data_transactions 
    WHERE status IN ('approved', 'completed')
    AND (consumer_org_id = target_org_id OR subject_org_id = target_org_id OR holder_org_id = target_org_id);
    
    IF total_tx > 0 THEN
        approval_rate := round((approved_tx::numeric / total_tx::numeric) * 100, 1);
    ELSE
        approval_rate := 0;
    END IF;

    -- 2. Calcular Tiempo Promedio (en horas)
    -- Diferencia entre creado y última aprobación
    SELECT avg(EXTRACT(EPOCH FROM (ah.created_at - dt.created_at))/3600)
    INTO avg_hours
    FROM data_transactions dt
    JOIN approval_history ah ON dt.id = ah.transaction_id
    WHERE ah.action = 'approve'
    AND (dt.consumer_org_id = target_org_id OR dt.subject_org_id = target_org_id);
    
    -- 3. Calcular Compliance (Simulado basado en % de transacciones completadas con metadatos seguros)
    -- Si no hay datos, damos un valor alto por defecto para demo
    compliance_score := 98.5; 

    RETURN jsonb_build_object(
        'approval_rate', approval_rate,
        'avg_time_hours', COALESCE(round(avg_hours, 1), 24.0),
        'compliance_percent', compliance_score,
        'total_volume', total_tx
    );
END;
$$;


--
-- Name: get_pending_transactions(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_pending_transactions(_user_id uuid) RETURNS TABLE(transaction_id uuid, role_in_transaction text, asset_name text, consumer_name text, subject_name text, holder_name text, status public.transaction_status, purpose text, created_at timestamp with time zone)
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  WITH user_org AS (
    SELECT organization_id FROM public.user_profiles WHERE user_id = _user_id LIMIT 1
  )
  SELECT 
    dt.id as transaction_id,
    CASE 
      WHEN dt.consumer_org_id = (SELECT organization_id FROM user_org) THEN 'consumer'
      WHEN dt.subject_org_id = (SELECT organization_id FROM user_org) THEN 'subject'
      WHEN dt.holder_org_id = (SELECT organization_id FROM user_org) THEN 'holder'
    END as role_in_transaction,
    dp.name as asset_name,
    c.name as consumer_name,
    s.name as subject_name,
    h.name as holder_name,
    dt.status,
    dt.purpose,
    dt.created_at
  FROM public.data_transactions dt
  JOIN public.data_assets da ON dt.asset_id = da.id
  JOIN public.data_products dp ON da.product_id = dp.id
  JOIN public.organizations c ON dt.consumer_org_id = c.id
  JOIN public.organizations s ON dt.subject_org_id = s.id
  JOIN public.organizations h ON dt.holder_org_id = h.id
  WHERE 
    dt.consumer_org_id = (SELECT organization_id FROM user_org) OR
    dt.subject_org_id = (SELECT organization_id FROM user_org) OR
    dt.holder_org_id = (SELECT organization_id FROM user_org)
  ORDER BY dt.created_at DESC;
$$;


--
-- Name: get_user_organization(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_user_organization(_user_id uuid) RETURNS uuid
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT organization_id
  FROM public.user_profiles
  WHERE user_id = _user_id
  LIMIT 1
$$;


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Por ahora no creamos perfil automáticamente
  -- El usuario deberá vincularse a una organización después del registro
  RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _organization_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND organization_id = _organization_id
      AND role = _role
  )
$$;


--
-- Name: setup_demo_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.setup_demo_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Solo actuar si es el usuario demo
  IF NEW.email = 'demo@procuredata.app' THEN
    
    -- CREAR PERFILES para múltiples organizaciones (incluyendo las nuevas)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position) VALUES
    (NEW.id, '11111111-1111-1111-1111-000000000002', 'Usuario Demo', 'Responsable de Compras'),
    (NEW.id, '11111111-1111-1111-1111-000000000001', 'Usuario Demo', 'Responsable de Datos'),
    (NEW.id, '11111111-1111-1111-1111-111111111001', 'Usuario Demo', 'Administrador'),
    (NEW.id, '11111111-1111-1111-1111-000000000004', 'Usuario Demo', 'Analista'),
    (NEW.id, '11111111-1111-1111-1111-000000000003', 'Usuario Demo', 'Gestor de Datos'),
    (NEW.id, '11111111-1111-1111-1111-111111111002', 'Usuario Demo', 'Representante'),
    -- Nuevas organizaciones ESG e IoT
    (NEW.id, '22222222-2222-2222-2222-000000000001', 'Usuario Demo', 'Responsable ESG'),
    (NEW.id, '22222222-2222-2222-2222-000000000002', 'Usuario Demo', 'Analista de Sostenibilidad'),
    (NEW.id, '22222222-2222-2222-2222-000000000003', 'Usuario Demo', 'Auditor'),
    (NEW.id, '22222222-2222-2222-2222-000000000004', 'Usuario Demo', 'Jefe de Operaciones'),
    (NEW.id, '22222222-2222-2222-2222-000000000005', 'Usuario Demo', 'Fleet Manager'),
    (NEW.id, '22222222-2222-2222-2222-000000000006', 'Usuario Demo', 'Data Analyst')
    ON CONFLICT (user_id, organization_id) DO NOTHING;
    
    -- CREAR ROLES
    INSERT INTO user_roles (user_id, organization_id, role) VALUES
    (NEW.id, '11111111-1111-1111-1111-000000000002', 'viewer'),
    (NEW.id, '11111111-1111-1111-1111-000000000001', 'admin'),
    (NEW.id, '11111111-1111-1111-1111-111111111001', 'admin'),
    (NEW.id, '11111111-1111-1111-1111-000000000004', 'viewer'),
    (NEW.id, '11111111-1111-1111-1111-000000000003', 'admin'),
    (NEW.id, '11111111-1111-1111-1111-111111111002', 'admin'),
    -- Nuevos roles
    (NEW.id, '22222222-2222-2222-2222-000000000001', 'viewer'),
    (NEW.id, '22222222-2222-2222-2222-000000000002', 'admin'),
    (NEW.id, '22222222-2222-2222-2222-000000000003', 'admin'),
    (NEW.id, '22222222-2222-2222-2222-000000000004', 'viewer'),
    (NEW.id, '22222222-2222-2222-2222-000000000005', 'admin'),
    (NEW.id, '22222222-2222-2222-2222-000000000006', 'admin')
    ON CONFLICT (user_id, organization_id, role) DO NOTHING;

    -- INSERTAR TRANSACCIONES DEMO (incluyendo las nuevas)
    INSERT INTO data_transactions (
      id, consumer_org_id, subject_org_id, holder_org_id, asset_id,
      purpose, justification, status, access_duration_days, requested_by
    ) VALUES
    -- Transacciones originales
    ('55555555-5555-5555-5555-000000000001', '11111111-1111-1111-1111-000000000002', '11111111-1111-1111-1111-111111111001', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000001', 'Alta de nuevo proveedor en sistema ERP', 'Necesitamos incorporar a Tornillería TÉCNICA como proveedor para nueva línea de producción', 'pending_subject', 90, NEW.id),
    ('55555555-5555-5555-5555-000000000002', '11111111-1111-1111-1111-000000000004', '11111111-1111-1111-1111-111111111002', '11111111-1111-1111-1111-000000000003', '33333333-3333-3333-3333-000000000003', 'Validación de proveedor químico para certificación ISO', 'Necesitamos verificar datos del proveedor para cumplir con normativa ISO 14001', 'pending_holder', 60, NEW.id),
    ('55555555-5555-5555-5555-000000000003', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-111111111006', '11111111-1111-1111-1111-000000000007', '33333333-3333-3333-3333-000000000004', 'Evaluación de proveedor biotecnológico', 'Análisis de capacidades técnicas para proyecto de bioenergía renovable', 'completed', 120, NEW.id),
    ('55555555-5555-5555-5555-000000000004', '11111111-1111-1111-1111-000000000002', '11111111-1111-1111-1111-111111111003', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000002', 'Homologación de proveedor electrónico', 'Validación de proveedor de componentes electrónicos para nueva línea IoT', 'initiated', 90, NEW.id),
    ('55555555-5555-5555-5555-000000000005', '11111111-1111-1111-1111-000000000004', '11111111-1111-1111-1111-111111111001', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000001', 'Alta urgente de proveedor metalúrgico', 'Necesitamos dar de alta a Tornillería TÉCNICA de forma urgente', 'approved', 180, NEW.id),
    -- Nueva transacción ESG (completada)
    ('55555555-5555-5555-5555-000000000006', '22222222-2222-2222-2222-000000000001', '22222222-2222-2222-2222-000000000002', '22222222-2222-2222-2222-000000000003', '33333333-3333-3333-3333-000000000005', 'Auditoría de Cadena de Suministro Verde', 'Requerido para el reporte anual de sostenibilidad CSRD de EcoAuto.', 'completed', 365, NEW.id),
    -- Nueva transacción IoT (pendiente holder)
    ('55555555-5555-5555-5555-000000000007', '22222222-2222-2222-2222-000000000004', '22222222-2222-2222-2222-000000000005', '22222222-2222-2222-2222-000000000006', '33333333-3333-3333-3333-000000000006', 'Optimización de Mantenimiento', 'Análisis de desgaste para programar paradas técnicas.', 'pending_holder', 30, NEW.id)
    ON CONFLICT (id) DO NOTHING;

    -- INSERTAR DATOS DE PROVEEDORES (originales)
    INSERT INTO supplier_data (id, transaction_id, company_name, tax_id, legal_name, fiscal_address, contact_person_name, contact_person_email) VALUES
    ('66666666-6666-6666-6666-000000000001', '55555555-5555-5555-5555-000000000003', 'Biocen S.A.', 'A66778899', 'Biocen Sociedad Anónima', '{"country": "ES", "streetType": "Parque", "streetName": "Científico", "streetNumber": "100"}'::jsonb, 'Jorge Hidalgo', 'jorge.hidalgo@biocen.es'),
    ('66666666-6666-6666-6666-000000000002', '55555555-5555-5555-5555-000000000001', 'Tornillería TÉCNICA S.A.', 'A12345678', 'Tornillería TÉCNICA S.A.', '{"country": "ES", "streetType": "Calle", "streetName": "Principal", "streetNumber": "42"}'::jsonb, 'Laura Martín', 'laura.martin@tornilleria.es'),
    ('66666666-6666-6666-6666-000000000003', '55555555-5555-5555-5555-000000000002', 'Soluciones Químicas del Sur S.L.', 'B98765432', 'Soluciones Químicas del Sur S.L.U.', '{"country": "ES", "streetType": "Avenida", "streetName": "de la Innovación", "streetNumber": "88"}'::jsonb, 'Elena Blanco', 'elena.blanco@solquimica.es'),
    ('66666666-6666-6666-6666-000000000004', '55555555-5555-5555-5555-000000000005', 'Tornillería TÉCNICA S.A.', 'A12345678', 'Tornillería TÉCNICA S.A.', '{"country": "ES", "streetType": "Calle", "streetName": "Principal", "streetNumber": "42"}'::jsonb, 'Laura Martín', 'laura.martin@tornilleria.es')
    ON CONFLICT (id) DO NOTHING;

    -- INSERTAR DATOS NUEVOS EN data_payloads (solo ESG por ahora, completada)
    INSERT INTO data_payloads (id, transaction_id, schema_type, data_content) VALUES
    ('77777777-7777-7777-7777-000000000001', '55555555-5555-5555-5555-000000000006', 'esg_report', '{
      "report_year": 2023,
      "scope1_total_tons": 1250.5,
      "scope2_total_tons": 300.2,
      "energy_mix": {
        "renewable": 85,
        "fossil": 15
      },
      "certifications": ["ISO 14001", "ISO 14064-1"],
      "auditor_signature": "CertiGreen Validated"
    }'::jsonb)
    ON CONFLICT (transaction_id) DO NOTHING;

    -- HISTORIAL DE APROBACIONES (incluyendo nuevas)
    INSERT INTO approval_history (transaction_id, actor_org_id, actor_user_id, action, notes) VALUES
    ('55555555-5555-5555-5555-000000000006', '22222222-2222-2222-2222-000000000002', NEW.id, 'pre_approve', 'Datos validados internamente, procediendo.'),
    ('55555555-5555-5555-5555-000000000006', '22222222-2222-2222-2222-000000000003', NEW.id, 'approve', 'Auditoría conforme a ISO completada.'),
    ('55555555-5555-5555-5555-000000000007', '22222222-2222-2222-2222-000000000005', NEW.id, 'pre_approve', 'Acceso a API de telemetría autorizado para 3 excavadoras.')
    ON CONFLICT DO NOTHING;

  END IF;
  
  RETURN NEW;
END;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


--
-- Name: update_wallet_timestamp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_wallet_timestamp() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: approval_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.approval_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    transaction_id uuid NOT NULL,
    actor_org_id uuid NOT NULL,
    action public.approval_action NOT NULL,
    actor_user_id uuid NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.audit_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    organization_id uuid NOT NULL,
    actor_id uuid,
    actor_email text,
    action text NOT NULL,
    resource text,
    details jsonb,
    ip_address text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: catalog_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.catalog_metadata (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    asset_id uuid NOT NULL,
    visibility text DEFAULT 'public'::text NOT NULL,
    tags text[],
    categories text[],
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT catalog_metadata_visibility_check CHECK ((visibility = ANY (ARRAY['public'::text, 'private'::text, 'restricted'::text])))
);


--
-- Name: data_assets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.data_assets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    product_id uuid NOT NULL,
    subject_org_id uuid NOT NULL,
    holder_org_id uuid NOT NULL,
    status text DEFAULT 'available'::text NOT NULL,
    custom_metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    pricing_model text DEFAULT 'free'::text,
    price numeric DEFAULT 0,
    currency text DEFAULT 'EUR'::text,
    billing_period text,
    is_public_marketplace boolean DEFAULT false,
    sample_data jsonb,
    CONSTRAINT check_pricing_consistency CHECK ((((pricing_model = 'free'::text) AND (price = (0)::numeric)) OR ((pricing_model <> 'free'::text) AND (price >= (0)::numeric)))),
    CONSTRAINT data_assets_status_check CHECK ((status = ANY (ARRAY['available'::text, 'unavailable'::text, 'pending'::text])))
);


--
-- Name: data_payloads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.data_payloads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    transaction_id uuid NOT NULL,
    schema_type text NOT NULL,
    data_content jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: data_policies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.data_policies (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    transaction_id uuid NOT NULL,
    odrl_policy_json jsonb NOT NULL,
    generated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: data_products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.data_products (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    version text DEFAULT '1.0'::text NOT NULL,
    description text,
    schema_definition jsonb,
    category text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: data_transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.data_transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    asset_id uuid NOT NULL,
    consumer_org_id uuid NOT NULL,
    subject_org_id uuid NOT NULL,
    holder_org_id uuid NOT NULL,
    status public.transaction_status DEFAULT 'initiated'::public.transaction_status NOT NULL,
    purpose text NOT NULL,
    access_duration_days integer DEFAULT 90 NOT NULL,
    justification text NOT NULL,
    requested_by uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    payment_status text DEFAULT 'na'::text,
    payment_provider_id text,
    invoice_url text,
    subscription_expires_at timestamp with time zone
);


--
-- Name: erp_configurations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.erp_configurations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    organization_id uuid NOT NULL,
    config_type public.erp_config_type NOT NULL,
    config_name text NOT NULL,
    endpoint_url text NOT NULL,
    auth_method public.auth_method DEFAULT 'bearer'::public.auth_method NOT NULL,
    api_key_encrypted text,
    auth_token_encrypted text,
    field_mapping jsonb,
    is_active boolean DEFAULT true NOT NULL,
    last_test_date timestamp with time zone,
    last_test_status text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    public_key text,
    protocol_url text,
    management_url text
);


--
-- Name: esg_reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.esg_reports (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    organization_id uuid NOT NULL,
    report_year integer NOT NULL,
    scope1_total_tons numeric DEFAULT 0,
    scope2_total_tons numeric DEFAULT 0,
    energy_renewable_percent numeric DEFAULT 0,
    certifications text[] DEFAULT '{}'::text[],
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: export_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.export_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    transaction_id uuid NOT NULL,
    organization_id uuid NOT NULL,
    export_type text NOT NULL,
    export_status text NOT NULL,
    erp_config_id uuid,
    user_id uuid NOT NULL,
    error_message text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT export_logs_export_status_check CHECK ((export_status = ANY (ARRAY['success'::text, 'failed'::text, 'pending'::text]))),
    CONSTRAINT export_logs_export_type_check CHECK ((export_type = ANY (ARRAY['csv'::text, 'json'::text, 'erp'::text])))
);


--
-- Name: innovation_lab_concepts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.innovation_lab_concepts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    short_description text NOT NULL,
    full_analysis text NOT NULL,
    business_impact text NOT NULL,
    maturity_level integer DEFAULT 1,
    chart_type text NOT NULL,
    chart_data jsonb NOT NULL,
    chart_config jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: organization_reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organization_reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    transaction_id uuid NOT NULL,
    reviewer_org_id uuid NOT NULL,
    target_org_id uuid NOT NULL,
    rating integer NOT NULL,
    comment text,
    metrics jsonb DEFAULT '{"data_quality": 0, "delivery_speed": 0}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT organization_reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organizations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    tax_id text NOT NULL,
    type public.organization_type NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_demo boolean DEFAULT false,
    sector text,
    marketplace_description text,
    seller_category text,
    kyb_verified boolean DEFAULT false,
    stripe_connect_id text,
    logo_url text,
    banner_url text,
    website text,
    linkedin_url text,
    description text
);


--
-- Name: marketplace_listings; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.marketplace_listings AS
 SELECT da.id AS asset_id,
    da.product_id,
    dp.name AS product_name,
    dp.description AS product_description,
    dp.category,
    dp.version,
    da.subject_org_id AS provider_id,
    org.name AS provider_name,
    org.seller_category,
    org.kyb_verified,
    da.pricing_model,
    da.price,
    da.currency,
    da.billing_period,
    (COALESCE(( SELECT esg_reports.report_year
           FROM public.esg_reports
          WHERE (esg_reports.organization_id = org.id)
          ORDER BY esg_reports.report_year DESC
         LIMIT 1), 0) > 0) AS has_green_badge,
    ( SELECT esg_reports.energy_renewable_percent
           FROM public.esg_reports
          WHERE (esg_reports.organization_id = org.id)
          ORDER BY esg_reports.report_year DESC
         LIMIT 1) AS energy_renewable_percent,
    COALESCE(( SELECT avg(organization_reviews.rating) AS avg
           FROM public.organization_reviews
          WHERE (organization_reviews.target_org_id = org.id)), (0)::numeric) AS reputation_score,
    ( SELECT count(*) AS count
           FROM public.organization_reviews
          WHERE (organization_reviews.target_org_id = org.id)) AS review_count,
    da.created_at
   FROM ((public.data_assets da
     JOIN public.data_products dp ON ((da.product_id = dp.id)))
     JOIN public.organizations org ON ((da.subject_org_id = org.id)))
  WHERE ((da.is_public_marketplace = true) AND (da.status = 'available'::text));


--
-- Name: marketplace_opportunities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.marketplace_opportunities (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    consumer_org_id uuid NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    budget_range text NOT NULL,
    description text NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '30 days'::interval) NOT NULL,
    status text DEFAULT 'active'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: success_stories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.success_stories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    company_name text NOT NULL,
    sector text NOT NULL,
    challenge text NOT NULL,
    solution text NOT NULL,
    impact_highlight text NOT NULL,
    metrics jsonb NOT NULL,
    quote text,
    author_role text,
    is_featured boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: supplier_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_data (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    transaction_id uuid NOT NULL,
    company_name text NOT NULL,
    tax_id text NOT NULL,
    legal_name text NOT NULL,
    fiscal_address jsonb NOT NULL,
    legal_address jsonb,
    legal_admin_name text,
    contact_person_name text,
    contact_person_phone text,
    contact_person_email text,
    data_source text,
    last_updated timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: transaction_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transaction_messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    transaction_id uuid NOT NULL,
    sender_org_id uuid NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    organization_id uuid NOT NULL,
    full_name text,
    "position" text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    organization_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_wishlist; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_wishlist (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: value_services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.value_services (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    provider_org_id uuid,
    name text NOT NULL,
    description text,
    category text,
    price_model text,
    icon_name text,
    created_at timestamp with time zone DEFAULT now(),
    price numeric DEFAULT 0,
    currency text DEFAULT 'EUR'::text,
    features jsonb DEFAULT '[]'::jsonb
);


--
-- Name: wallet_transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wallet_transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    from_wallet_id uuid,
    to_wallet_id uuid,
    amount numeric NOT NULL,
    currency text DEFAULT 'EUR'::text,
    transaction_type text,
    status text DEFAULT 'completed'::text,
    reference_id uuid,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT at_least_one_wallet CHECK (((from_wallet_id IS NOT NULL) OR (to_wallet_id IS NOT NULL))),
    CONSTRAINT wallet_transactions_amount_check CHECK ((amount > (0)::numeric))
);


--
-- Name: wallets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wallets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    organization_id uuid NOT NULL,
    address text NOT NULL,
    balance numeric DEFAULT 0,
    currency text DEFAULT 'EUR'::text,
    is_frozen boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT wallets_balance_check CHECK ((balance >= (0)::numeric))
);


--
-- Name: approval_history approval_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.approval_history
    ADD CONSTRAINT approval_history_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: catalog_metadata catalog_metadata_asset_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalog_metadata
    ADD CONSTRAINT catalog_metadata_asset_id_key UNIQUE (asset_id);


--
-- Name: catalog_metadata catalog_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalog_metadata
    ADD CONSTRAINT catalog_metadata_pkey PRIMARY KEY (id);


--
-- Name: data_assets data_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_assets
    ADD CONSTRAINT data_assets_pkey PRIMARY KEY (id);


--
-- Name: data_payloads data_payloads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_payloads
    ADD CONSTRAINT data_payloads_pkey PRIMARY KEY (id);


--
-- Name: data_payloads data_payloads_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_payloads
    ADD CONSTRAINT data_payloads_transaction_id_key UNIQUE (transaction_id);


--
-- Name: data_policies data_policies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_policies
    ADD CONSTRAINT data_policies_pkey PRIMARY KEY (id);


--
-- Name: data_policies data_policies_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_policies
    ADD CONSTRAINT data_policies_transaction_id_key UNIQUE (transaction_id);


--
-- Name: data_products data_products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_products
    ADD CONSTRAINT data_products_pkey PRIMARY KEY (id);


--
-- Name: data_transactions data_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_transactions
    ADD CONSTRAINT data_transactions_pkey PRIMARY KEY (id);


--
-- Name: erp_configurations erp_configurations_organization_id_config_type_config_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.erp_configurations
    ADD CONSTRAINT erp_configurations_organization_id_config_type_config_name_key UNIQUE (organization_id, config_type, config_name);


--
-- Name: erp_configurations erp_configurations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.erp_configurations
    ADD CONSTRAINT erp_configurations_pkey PRIMARY KEY (id);


--
-- Name: esg_reports esg_reports_organization_id_report_year_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.esg_reports
    ADD CONSTRAINT esg_reports_organization_id_report_year_key UNIQUE (organization_id, report_year);


--
-- Name: esg_reports esg_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.esg_reports
    ADD CONSTRAINT esg_reports_pkey PRIMARY KEY (id);


--
-- Name: export_logs export_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.export_logs
    ADD CONSTRAINT export_logs_pkey PRIMARY KEY (id);


--
-- Name: innovation_lab_concepts innovation_lab_concepts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.innovation_lab_concepts
    ADD CONSTRAINT innovation_lab_concepts_pkey PRIMARY KEY (id);


--
-- Name: marketplace_opportunities marketplace_opportunities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.marketplace_opportunities
    ADD CONSTRAINT marketplace_opportunities_pkey PRIMARY KEY (id);


--
-- Name: organization_reviews organization_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_reviews
    ADD CONSTRAINT organization_reviews_pkey PRIMARY KEY (id);


--
-- Name: organization_reviews organization_reviews_transaction_id_reviewer_org_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_reviews
    ADD CONSTRAINT organization_reviews_transaction_id_reviewer_org_id_key UNIQUE (transaction_id, reviewer_org_id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_tax_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_tax_id_key UNIQUE (tax_id);


--
-- Name: success_stories success_stories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.success_stories
    ADD CONSTRAINT success_stories_pkey PRIMARY KEY (id);


--
-- Name: supplier_data supplier_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_data
    ADD CONSTRAINT supplier_data_pkey PRIMARY KEY (id);


--
-- Name: transaction_messages transaction_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_messages
    ADD CONSTRAINT transaction_messages_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_user_id_organization_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_organization_id_key UNIQUE (user_id, organization_id);


--
-- Name: user_profiles user_profiles_user_org_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_org_unique UNIQUE (user_id, organization_id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_organization_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_organization_id_role_key UNIQUE (user_id, organization_id, role);


--
-- Name: user_roles user_roles_user_org_role_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_org_role_unique UNIQUE (user_id, organization_id, role);


--
-- Name: user_wishlist user_wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_wishlist
    ADD CONSTRAINT user_wishlist_pkey PRIMARY KEY (id);


--
-- Name: user_wishlist user_wishlist_user_id_asset_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_wishlist
    ADD CONSTRAINT user_wishlist_user_id_asset_id_key UNIQUE (user_id, asset_id);


--
-- Name: value_services value_services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.value_services
    ADD CONSTRAINT value_services_pkey PRIMARY KEY (id);


--
-- Name: wallet_transactions wallet_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallet_transactions
    ADD CONSTRAINT wallet_transactions_pkey PRIMARY KEY (id);


--
-- Name: wallets wallets_address_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_address_key UNIQUE (address);


--
-- Name: wallets wallets_organization_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_organization_id_key UNIQUE (organization_id);


--
-- Name: wallets wallets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_pkey PRIMARY KEY (id);


--
-- Name: idx_approval_history_transaction; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_approval_history_transaction ON public.approval_history USING btree (transaction_id);


--
-- Name: idx_catalog_metadata_categories; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_catalog_metadata_categories ON public.catalog_metadata USING gin (categories);


--
-- Name: idx_catalog_metadata_tags; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_catalog_metadata_tags ON public.catalog_metadata USING gin (tags);


--
-- Name: idx_data_assets_holder_org; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_assets_holder_org ON public.data_assets USING btree (holder_org_id);


--
-- Name: idx_data_assets_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_assets_product_id ON public.data_assets USING btree (product_id);


--
-- Name: idx_data_assets_sample_data; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_assets_sample_data ON public.data_assets USING gin (sample_data);


--
-- Name: idx_data_assets_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_assets_status ON public.data_assets USING btree (status);


--
-- Name: idx_data_assets_subject_org; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_assets_subject_org ON public.data_assets USING btree (subject_org_id);


--
-- Name: idx_data_policies_transaction; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_policies_transaction ON public.data_policies USING btree (transaction_id);


--
-- Name: idx_data_products_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_products_category ON public.data_products USING btree (category);


--
-- Name: idx_data_products_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_products_name ON public.data_products USING btree (name);


--
-- Name: idx_data_transactions_consumer; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_transactions_consumer ON public.data_transactions USING btree (consumer_org_id);


--
-- Name: idx_data_transactions_holder; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_transactions_holder ON public.data_transactions USING btree (holder_org_id);


--
-- Name: idx_data_transactions_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_transactions_status ON public.data_transactions USING btree (status);


--
-- Name: idx_data_transactions_subject; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_data_transactions_subject ON public.data_transactions USING btree (subject_org_id);


--
-- Name: idx_erp_configurations_org; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_erp_configurations_org ON public.erp_configurations USING btree (organization_id);


--
-- Name: idx_export_logs_org; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_export_logs_org ON public.export_logs USING btree (organization_id);


--
-- Name: idx_export_logs_transaction; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_export_logs_transaction ON public.export_logs USING btree (transaction_id);


--
-- Name: idx_marketplace_opportunities_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_marketplace_opportunities_category ON public.marketplace_opportunities USING btree (category);


--
-- Name: idx_marketplace_opportunities_consumer; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_marketplace_opportunities_consumer ON public.marketplace_opportunities USING btree (consumer_org_id);


--
-- Name: idx_marketplace_opportunities_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_marketplace_opportunities_status ON public.marketplace_opportunities USING btree (status);


--
-- Name: idx_organizations_sector; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_organizations_sector ON public.organizations USING btree (sector);


--
-- Name: idx_supplier_data_transaction; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_data_transaction ON public.supplier_data USING btree (transaction_id);


--
-- Name: idx_transaction_messages_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_transaction_messages_created ON public.transaction_messages USING btree (created_at DESC);


--
-- Name: idx_transaction_messages_transaction; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_transaction_messages_transaction ON public.transaction_messages USING btree (transaction_id);


--
-- Name: idx_user_wishlist_asset; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_wishlist_asset ON public.user_wishlist USING btree (asset_id);


--
-- Name: idx_user_wishlist_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_wishlist_user ON public.user_wishlist USING btree (user_id);


--
-- Name: idx_wallet_txs_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_wallet_txs_created ON public.wallet_transactions USING btree (created_at DESC);


--
-- Name: idx_wallet_txs_from; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_wallet_txs_from ON public.wallet_transactions USING btree (from_wallet_id);


--
-- Name: idx_wallet_txs_to; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_wallet_txs_to ON public.wallet_transactions USING btree (to_wallet_id);


--
-- Name: idx_wallets_org; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_wallets_org ON public.wallets USING btree (organization_id);


--
-- Name: wallets trigger_update_wallet_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trigger_update_wallet_timestamp BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE FUNCTION public.update_wallet_timestamp();


--
-- Name: catalog_metadata update_catalog_metadata_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_catalog_metadata_updated_at BEFORE UPDATE ON public.catalog_metadata FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: data_assets update_data_assets_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_data_assets_updated_at BEFORE UPDATE ON public.data_assets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: data_products update_data_products_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_data_products_updated_at BEFORE UPDATE ON public.data_products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: data_transactions update_data_transactions_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_data_transactions_updated_at BEFORE UPDATE ON public.data_transactions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: erp_configurations update_erp_configurations_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_erp_configurations_updated_at BEFORE UPDATE ON public.erp_configurations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: marketplace_opportunities update_marketplace_opportunities_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_marketplace_opportunities_updated_at BEFORE UPDATE ON public.marketplace_opportunities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: organizations update_organizations_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: user_profiles update_user_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: approval_history approval_history_actor_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.approval_history
    ADD CONSTRAINT approval_history_actor_org_id_fkey FOREIGN KEY (actor_org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: approval_history approval_history_actor_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.approval_history
    ADD CONSTRAINT approval_history_actor_user_id_fkey FOREIGN KEY (actor_user_id) REFERENCES auth.users(id);


--
-- Name: approval_history approval_history_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.approval_history
    ADD CONSTRAINT approval_history_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.data_transactions(id) ON DELETE CASCADE;


--
-- Name: audit_logs audit_logs_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES auth.users(id);


--
-- Name: audit_logs audit_logs_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: catalog_metadata catalog_metadata_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalog_metadata
    ADD CONSTRAINT catalog_metadata_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.data_assets(id) ON DELETE CASCADE;


--
-- Name: data_assets data_assets_holder_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_assets
    ADD CONSTRAINT data_assets_holder_org_id_fkey FOREIGN KEY (holder_org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: data_assets data_assets_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_assets
    ADD CONSTRAINT data_assets_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.data_products(id) ON DELETE CASCADE;


--
-- Name: data_assets data_assets_subject_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_assets
    ADD CONSTRAINT data_assets_subject_org_id_fkey FOREIGN KEY (subject_org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: data_payloads data_payloads_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_payloads
    ADD CONSTRAINT data_payloads_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.data_transactions(id) ON DELETE CASCADE;


--
-- Name: data_policies data_policies_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_policies
    ADD CONSTRAINT data_policies_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.data_transactions(id) ON DELETE CASCADE;


--
-- Name: data_transactions data_transactions_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_transactions
    ADD CONSTRAINT data_transactions_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.data_assets(id) ON DELETE CASCADE;


--
-- Name: data_transactions data_transactions_consumer_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_transactions
    ADD CONSTRAINT data_transactions_consumer_org_id_fkey FOREIGN KEY (consumer_org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: data_transactions data_transactions_holder_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_transactions
    ADD CONSTRAINT data_transactions_holder_org_id_fkey FOREIGN KEY (holder_org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: data_transactions data_transactions_requested_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_transactions
    ADD CONSTRAINT data_transactions_requested_by_fkey FOREIGN KEY (requested_by) REFERENCES auth.users(id);


--
-- Name: data_transactions data_transactions_subject_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.data_transactions
    ADD CONSTRAINT data_transactions_subject_org_id_fkey FOREIGN KEY (subject_org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: erp_configurations erp_configurations_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.erp_configurations
    ADD CONSTRAINT erp_configurations_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: esg_reports esg_reports_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.esg_reports
    ADD CONSTRAINT esg_reports_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: export_logs export_logs_erp_config_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.export_logs
    ADD CONSTRAINT export_logs_erp_config_id_fkey FOREIGN KEY (erp_config_id) REFERENCES public.erp_configurations(id) ON DELETE SET NULL;


--
-- Name: export_logs export_logs_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.export_logs
    ADD CONSTRAINT export_logs_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: export_logs export_logs_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.export_logs
    ADD CONSTRAINT export_logs_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.data_transactions(id) ON DELETE CASCADE;


--
-- Name: export_logs export_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.export_logs
    ADD CONSTRAINT export_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: marketplace_opportunities marketplace_opportunities_consumer_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.marketplace_opportunities
    ADD CONSTRAINT marketplace_opportunities_consumer_org_id_fkey FOREIGN KEY (consumer_org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: organization_reviews organization_reviews_reviewer_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_reviews
    ADD CONSTRAINT organization_reviews_reviewer_org_id_fkey FOREIGN KEY (reviewer_org_id) REFERENCES public.organizations(id);


--
-- Name: organization_reviews organization_reviews_target_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_reviews
    ADD CONSTRAINT organization_reviews_target_org_id_fkey FOREIGN KEY (target_org_id) REFERENCES public.organizations(id);


--
-- Name: organization_reviews organization_reviews_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_reviews
    ADD CONSTRAINT organization_reviews_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.data_transactions(id);


--
-- Name: supplier_data supplier_data_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_data
    ADD CONSTRAINT supplier_data_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.data_transactions(id) ON DELETE CASCADE;


--
-- Name: transaction_messages transaction_messages_sender_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_messages
    ADD CONSTRAINT transaction_messages_sender_org_id_fkey FOREIGN KEY (sender_org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: transaction_messages transaction_messages_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_messages
    ADD CONSTRAINT transaction_messages_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.data_transactions(id) ON DELETE CASCADE;


--
-- Name: user_profiles user_profiles_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_wishlist user_wishlist_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_wishlist
    ADD CONSTRAINT user_wishlist_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.data_assets(id) ON DELETE CASCADE;


--
-- Name: user_wishlist user_wishlist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_wishlist
    ADD CONSTRAINT user_wishlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: value_services value_services_provider_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.value_services
    ADD CONSTRAINT value_services_provider_org_id_fkey FOREIGN KEY (provider_org_id) REFERENCES public.organizations(id);


--
-- Name: wallet_transactions wallet_transactions_from_wallet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallet_transactions
    ADD CONSTRAINT wallet_transactions_from_wallet_id_fkey FOREIGN KEY (from_wallet_id) REFERENCES public.wallets(id);


--
-- Name: wallet_transactions wallet_transactions_to_wallet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallet_transactions
    ADD CONSTRAINT wallet_transactions_to_wallet_id_fkey FOREIGN KEY (to_wallet_id) REFERENCES public.wallets(id);


--
-- Name: wallets wallets_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: erp_configurations Admins y configuradores pueden gestionar configs ERP; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins y configuradores pueden gestionar configs ERP" ON public.erp_configurations TO authenticated USING (((organization_id = public.get_user_organization(auth.uid())) AND (public.has_role(auth.uid(), organization_id, 'admin'::public.app_role) OR public.has_role(auth.uid(), organization_id, 'api_configurator'::public.app_role))));


--
-- Name: data_payloads Consumers can view payloads of completed transactions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Consumers can view payloads of completed transactions" ON public.data_payloads FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.data_transactions dt
  WHERE ((dt.id = data_payloads.transaction_id) AND (dt.status = 'completed'::public.transaction_status) AND (dt.consumer_org_id = public.get_user_organization(auth.uid()))))));


--
-- Name: marketplace_opportunities Consumers pueden crear oportunidades; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Consumers pueden crear oportunidades" ON public.marketplace_opportunities FOR INSERT WITH CHECK ((consumer_org_id = public.get_user_organization(auth.uid())));


--
-- Name: esg_reports Crear propios reportes ESG; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Crear propios reportes ESG" ON public.esg_reports FOR INSERT WITH CHECK ((organization_id IN ( SELECT user_profiles.organization_id
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


--
-- Name: organization_reviews Crear reviews propias; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Crear reviews propias" ON public.organization_reviews FOR INSERT WITH CHECK ((reviewer_org_id IN ( SELECT user_profiles.organization_id
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


--
-- Name: transaction_messages Enviar mensajes a transacciones propias; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enviar mensajes a transacciones propias" ON public.transaction_messages FOR INSERT WITH CHECK (((sender_org_id = public.get_user_organization(auth.uid())) AND (EXISTS ( SELECT 1
   FROM public.data_transactions dt
  WHERE ((dt.id = transaction_messages.transaction_id) AND ((dt.consumer_org_id = transaction_messages.sender_org_id) OR (dt.subject_org_id = transaction_messages.sender_org_id) OR (dt.holder_org_id = transaction_messages.sender_org_id)))))));


--
-- Name: data_payloads Holders and Subjects can manage payloads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Holders and Subjects can manage payloads" ON public.data_payloads USING ((EXISTS ( SELECT 1
   FROM public.data_transactions dt
  WHERE ((dt.id = data_payloads.transaction_id) AND ((dt.holder_org_id = public.get_user_organization(auth.uid())) OR (dt.subject_org_id = public.get_user_organization(auth.uid())))))));


--
-- Name: data_assets Holders pueden actualizar sus propios activos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Holders pueden actualizar sus propios activos" ON public.data_assets FOR UPDATE TO authenticated USING ((holder_org_id = public.get_user_organization(auth.uid())));


--
-- Name: catalog_metadata Holders pueden gestionar metadatos de sus activos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Holders pueden gestionar metadatos de sus activos" ON public.catalog_metadata TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.data_assets
  WHERE ((data_assets.id = catalog_metadata.asset_id) AND (data_assets.holder_org_id = public.get_user_organization(auth.uid()))))));


--
-- Name: data_assets Holders pueden insertar sus propios activos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Holders pueden insertar sus propios activos" ON public.data_assets FOR INSERT TO authenticated WITH CHECK ((holder_org_id = public.get_user_organization(auth.uid())));


--
-- Name: data_assets Holders y admins pueden eliminar activos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Holders y admins pueden eliminar activos" ON public.data_assets FOR DELETE TO authenticated USING (((holder_org_id = public.get_user_organization(auth.uid())) OR public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'::public.app_role)));


--
-- Name: organization_reviews Lecturas públicas de reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Lecturas públicas de reviews" ON public.organization_reviews FOR SELECT USING (true);


--
-- Name: data_transactions Los actors pueden actualizar transacciones relacionadas; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los actors pueden actualizar transacciones relacionadas" ON public.data_transactions FOR UPDATE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND ((user_roles.organization_id = data_transactions.consumer_org_id) OR (user_roles.organization_id = data_transactions.subject_org_id) OR (user_roles.organization_id = data_transactions.holder_org_id))))));


--
-- Name: data_transactions Los consumers pueden crear transacciones; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los consumers pueden crear transacciones" ON public.data_transactions FOR INSERT TO authenticated WITH CHECK (((consumer_org_id = public.get_user_organization(auth.uid())) AND (requested_by = auth.uid())));


--
-- Name: user_profiles Los usuarios pueden actualizar su propio perfil; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON public.user_profiles FOR UPDATE TO authenticated USING ((user_id = auth.uid()));


--
-- Name: approval_history Los usuarios pueden insertar aprobaciones; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden insertar aprobaciones" ON public.approval_history FOR INSERT TO authenticated WITH CHECK (((actor_org_id = public.get_user_organization(auth.uid())) AND (actor_user_id = auth.uid())));


--
-- Name: user_profiles Los usuarios pueden insertar su propio perfil; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden insertar su propio perfil" ON public.user_profiles FOR INSERT TO authenticated WITH CHECK ((user_id = auth.uid()));


--
-- Name: approval_history Los usuarios pueden ver historial de su organización; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden ver historial de su organización" ON public.approval_history FOR SELECT TO authenticated USING (((actor_org_id = public.get_user_organization(auth.uid())) OR (EXISTS ( SELECT 1
   FROM public.data_transactions
  WHERE ((data_transactions.id = approval_history.transaction_id) AND ((data_transactions.consumer_org_id = public.get_user_organization(auth.uid())) OR (data_transactions.subject_org_id = public.get_user_organization(auth.uid())) OR (data_transactions.holder_org_id = public.get_user_organization(auth.uid()))))))));


--
-- Name: organizations Los usuarios pueden ver organizaciones; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden ver organizaciones" ON public.organizations FOR SELECT TO authenticated USING (true);


--
-- Name: user_profiles Los usuarios pueden ver perfiles de su organización; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden ver perfiles de su organización" ON public.user_profiles FOR SELECT TO authenticated USING ((organization_id = public.get_user_organization(auth.uid())));


--
-- Name: data_policies Los usuarios pueden ver políticas de sus transacciones; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden ver políticas de sus transacciones" ON public.data_policies FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.data_transactions
  WHERE ((data_transactions.id = data_policies.transaction_id) AND ((data_transactions.consumer_org_id = public.get_user_organization(auth.uid())) OR (data_transactions.subject_org_id = public.get_user_organization(auth.uid())) OR (data_transactions.holder_org_id = public.get_user_organization(auth.uid())))))));


--
-- Name: user_roles Los usuarios pueden ver roles de su organización; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden ver roles de su organización" ON public.user_roles FOR SELECT TO authenticated USING ((organization_id = public.get_user_organization(auth.uid())));


--
-- Name: data_transactions Los usuarios pueden ver transacciones de sus organizaciones; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden ver transacciones de sus organizaciones" ON public.data_transactions FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND ((user_roles.organization_id = data_transactions.consumer_org_id) OR (user_roles.organization_id = data_transactions.subject_org_id) OR (user_roles.organization_id = data_transactions.holder_org_id))))));


--
-- Name: audit_logs Orgs view own logs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Orgs view own logs" ON public.audit_logs FOR SELECT USING ((organization_id IN ( SELECT user_profiles.organization_id
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


--
-- Name: marketplace_opportunities Owners pueden actualizar sus oportunidades; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Owners pueden actualizar sus oportunidades" ON public.marketplace_opportunities FOR UPDATE USING ((consumer_org_id = public.get_user_organization(auth.uid())));


--
-- Name: success_stories Public read; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read" ON public.success_stories FOR SELECT USING (true);


--
-- Name: innovation_lab_concepts Public read access; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read access" ON public.innovation_lab_concepts FOR SELECT USING (true);


--
-- Name: value_services Public read access; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read access" ON public.value_services FOR SELECT USING (true);


--
-- Name: supplier_data Sistema puede insertar datos de proveedor; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Sistema puede insertar datos de proveedor" ON public.supplier_data FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: organizations Solo admins pueden actualizar organizaciones; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo admins pueden actualizar organizaciones" ON public.organizations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'::public.app_role));


--
-- Name: data_products Solo admins pueden actualizar productos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo admins pueden actualizar productos" ON public.data_products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'::public.app_role));


--
-- Name: data_products Solo admins pueden eliminar productos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo admins pueden eliminar productos" ON public.data_products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'::public.app_role));


--
-- Name: user_roles Solo admins pueden gestionar roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo admins pueden gestionar roles" ON public.user_roles TO authenticated USING (public.has_role(auth.uid(), organization_id, 'admin'::public.app_role));


--
-- Name: organizations Solo admins pueden insertar organizaciones; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo admins pueden insertar organizaciones" ON public.organizations FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'::public.app_role));


--
-- Name: data_products Solo admins pueden insertar productos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo admins pueden insertar productos" ON public.data_products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'::public.app_role));


--
-- Name: wallet_transactions Solo sistema puede crear transacciones wallet; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo sistema puede crear transacciones wallet" ON public.wallet_transactions FOR INSERT WITH CHECK (false);


--
-- Name: wallets Solo sistema puede modificar balance; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo sistema puede modificar balance" ON public.wallets FOR UPDATE USING (false);


--
-- Name: wallet_transactions Solo sistema puede modificar transacciones wallet; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo sistema puede modificar transacciones wallet" ON public.wallet_transactions FOR UPDATE USING (false);


--
-- Name: data_products Todos los usuarios autenticados pueden ver productos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Todos los usuarios autenticados pueden ver productos" ON public.data_products FOR SELECT TO authenticated USING (true);


--
-- Name: data_assets Todos pueden ver activos disponibles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Todos pueden ver activos disponibles" ON public.data_assets FOR SELECT TO authenticated USING ((status = 'available'::text));


--
-- Name: marketplace_opportunities Todos pueden ver oportunidades activas; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Todos pueden ver oportunidades activas" ON public.marketplace_opportunities FOR SELECT USING ((status = 'active'::text));


--
-- Name: user_wishlist Users can manage their own wishlist; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can manage their own wishlist" ON public.user_wishlist USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: export_logs Usuarios pueden insertar sus propios logs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Usuarios pueden insertar sus propios logs" ON public.export_logs FOR INSERT TO authenticated WITH CHECK (((organization_id = public.get_user_organization(auth.uid())) AND (user_id = auth.uid())));


--
-- Name: erp_configurations Usuarios pueden ver configuraciones de su organización; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Usuarios pueden ver configuraciones de su organización" ON public.erp_configurations FOR SELECT TO authenticated USING ((organization_id = public.get_user_organization(auth.uid())));


--
-- Name: supplier_data Usuarios pueden ver datos de transacciones completadas de su or; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Usuarios pueden ver datos de transacciones completadas de su or" ON public.supplier_data FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.data_transactions
  WHERE ((data_transactions.id = supplier_data.transaction_id) AND (data_transactions.status = 'completed'::public.transaction_status) AND (data_transactions.consumer_org_id = public.get_user_organization(auth.uid()))))));


--
-- Name: export_logs Usuarios pueden ver logs de su organización; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Usuarios pueden ver logs de su organización" ON public.export_logs FOR SELECT TO authenticated USING ((organization_id = public.get_user_organization(auth.uid())));


--
-- Name: wallets Usuarios pueden ver wallet de su org; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Usuarios pueden ver wallet de su org" ON public.wallets FOR SELECT USING ((organization_id IN ( SELECT user_profiles.organization_id
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


--
-- Name: transaction_messages Ver mensajes de transacciones propias; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Ver mensajes de transacciones propias" ON public.transaction_messages FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.data_transactions dt
  WHERE ((dt.id = transaction_messages.transaction_id) AND ((dt.consumer_org_id IN ( SELECT user_profiles.organization_id
           FROM public.user_profiles
          WHERE (user_profiles.user_id = auth.uid()))) OR (dt.subject_org_id IN ( SELECT user_profiles.organization_id
           FROM public.user_profiles
          WHERE (user_profiles.user_id = auth.uid()))) OR (dt.holder_org_id IN ( SELECT user_profiles.organization_id
           FROM public.user_profiles
          WHERE (user_profiles.user_id = auth.uid()))))))));


--
-- Name: catalog_metadata Ver metadatos según visibilidad; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Ver metadatos según visibilidad" ON public.catalog_metadata FOR SELECT TO authenticated USING (((visibility = 'public'::text) OR (EXISTS ( SELECT 1
   FROM public.data_assets
  WHERE ((data_assets.id = catalog_metadata.asset_id) AND (data_assets.holder_org_id = public.get_user_organization(auth.uid())))))));


--
-- Name: esg_reports Ver propios reportes ESG; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Ver propios reportes ESG" ON public.esg_reports FOR SELECT USING ((organization_id IN ( SELECT user_profiles.organization_id
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


--
-- Name: wallet_transactions Ver transacciones de wallets propias; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Ver transacciones de wallets propias" ON public.wallet_transactions FOR SELECT USING (((from_wallet_id IN ( SELECT wallets.id
   FROM public.wallets
  WHERE (wallets.organization_id IN ( SELECT user_profiles.organization_id
           FROM public.user_profiles
          WHERE (user_profiles.user_id = auth.uid()))))) OR (to_wallet_id IN ( SELECT wallets.id
   FROM public.wallets
  WHERE (wallets.organization_id IN ( SELECT user_profiles.organization_id
           FROM public.user_profiles
          WHERE (user_profiles.user_id = auth.uid())))))));


--
-- Name: approval_history; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.approval_history ENABLE ROW LEVEL SECURITY;

--
-- Name: audit_logs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

--
-- Name: catalog_metadata; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.catalog_metadata ENABLE ROW LEVEL SECURITY;

--
-- Name: data_assets; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.data_assets ENABLE ROW LEVEL SECURITY;

--
-- Name: data_payloads; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.data_payloads ENABLE ROW LEVEL SECURITY;

--
-- Name: data_policies; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.data_policies ENABLE ROW LEVEL SECURITY;

--
-- Name: data_products; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.data_products ENABLE ROW LEVEL SECURITY;

--
-- Name: data_transactions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.data_transactions ENABLE ROW LEVEL SECURITY;

--
-- Name: erp_configurations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.erp_configurations ENABLE ROW LEVEL SECURITY;

--
-- Name: esg_reports; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.esg_reports ENABLE ROW LEVEL SECURITY;

--
-- Name: export_logs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.export_logs ENABLE ROW LEVEL SECURITY;

--
-- Name: innovation_lab_concepts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.innovation_lab_concepts ENABLE ROW LEVEL SECURITY;

--
-- Name: marketplace_opportunities; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.marketplace_opportunities ENABLE ROW LEVEL SECURITY;

--
-- Name: organization_reviews; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.organization_reviews ENABLE ROW LEVEL SECURITY;

--
-- Name: organizations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

--
-- Name: success_stories; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

--
-- Name: supplier_data; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.supplier_data ENABLE ROW LEVEL SECURITY;

--
-- Name: transaction_messages; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.transaction_messages ENABLE ROW LEVEL SECURITY;

--
-- Name: user_profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_wishlist; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_wishlist ENABLE ROW LEVEL SECURITY;

--
-- Name: value_services; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.value_services ENABLE ROW LEVEL SECURITY;

--
-- Name: wallet_transactions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

--
-- Name: wallets; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;