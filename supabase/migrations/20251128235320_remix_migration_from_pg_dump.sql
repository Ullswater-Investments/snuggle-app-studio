CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

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
    
    -- CREAR PERFILES para múltiples organizaciones
    INSERT INTO user_profiles (user_id, organization_id, full_name, position) VALUES
    (NEW.id, '11111111-1111-1111-1111-000000000002', 'Usuario Demo', 'Responsable de Compras'),
    (NEW.id, '11111111-1111-1111-1111-000000000001', 'Usuario Demo', 'Responsable de Datos'),
    (NEW.id, '11111111-1111-1111-1111-111111111001', 'Usuario Demo', 'Administrador'),
    (NEW.id, '11111111-1111-1111-1111-000000000004', 'Usuario Demo', 'Analista'),
    (NEW.id, '11111111-1111-1111-1111-000000000003', 'Usuario Demo', 'Gestor de Datos'),
    (NEW.id, '11111111-1111-1111-1111-111111111002', 'Usuario Demo', 'Representante')
    ON CONFLICT (user_id, organization_id) DO NOTHING;
    
    -- CREAR ROLES (CORREGIDO: viewer en lugar de user)
    INSERT INTO user_roles (user_id, organization_id, role) VALUES
    (NEW.id, '11111111-1111-1111-1111-000000000002', 'viewer'),  -- NovaTech (Consumer)
    (NEW.id, '11111111-1111-1111-1111-000000000001', 'admin'),   -- ACME (Holder)
    (NEW.id, '11111111-1111-1111-1111-111111111001', 'admin'),   -- Tornillería (Provider)
    (NEW.id, '11111111-1111-1111-1111-000000000004', 'viewer'),  -- Fabricaciones Reunidas (Consumer)
    (NEW.id, '11111111-1111-1111-1111-000000000003', 'admin'),   -- Gestión Logística (Holder)
    (NEW.id, '11111111-1111-1111-1111-111111111002', 'admin')    -- Soluciones Químicas (Provider)
    ON CONFLICT (user_id, organization_id, role) DO NOTHING;

    -- INSERTAR TRANSACCIONES DEMO
    INSERT INTO data_transactions (
      id, consumer_org_id, subject_org_id, holder_org_id, asset_id,
      purpose, justification, status, access_duration_days, requested_by
    ) VALUES
    ('55555555-5555-5555-5555-000000000001', '11111111-1111-1111-1111-000000000002', '11111111-1111-1111-1111-111111111001', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000001', 'Alta de nuevo proveedor en sistema ERP', 'Necesitamos incorporar a Tornillería TÉCNICA como proveedor para nueva línea de producción', 'pending_subject', 90, NEW.id),
    ('55555555-5555-5555-5555-000000000002', '11111111-1111-1111-1111-000000000004', '11111111-1111-1111-1111-111111111002', '11111111-1111-1111-1111-000000000003', '33333333-3333-3333-3333-000000000003', 'Validación de proveedor químico para certificación ISO', 'Necesitamos verificar datos del proveedor para cumplir con normativa ISO 14001', 'pending_holder', 60, NEW.id),
    ('55555555-5555-5555-5555-000000000003', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-111111111006', '11111111-1111-1111-1111-000000000007', '33333333-3333-3333-3333-000000000004', 'Evaluación de proveedor biotecnológico', 'Análisis de capacidades técnicas para proyecto de bioenergía renovable', 'completed', 120, NEW.id),
    ('55555555-5555-5555-5555-000000000004', '11111111-1111-1111-1111-000000000002', '11111111-1111-1111-1111-111111111003', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000002', 'Homologación de proveedor electrónico', 'Validación de proveedor de componentes electrónicos para nueva línea IoT', 'initiated', 90, NEW.id),
    ('55555555-5555-5555-5555-000000000005', '11111111-1111-1111-1111-000000000004', '11111111-1111-1111-1111-111111111001', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000001', 'Alta urgente de proveedor metalúrgico', 'Necesitamos dar de alta a Tornillería TÉCNICA de forma urgente', 'approved', 180, NEW.id)
    ON CONFLICT (id) DO NOTHING;

    -- INSERTAR DATOS DE PROVEEDORES
    INSERT INTO supplier_data (id, transaction_id, company_name, tax_id, legal_name, fiscal_address, contact_person_name, contact_person_email) VALUES
    ('66666666-6666-6666-6666-000000000001', '55555555-5555-5555-5555-000000000003', 'Biocen S.A.', 'A66778899', 'Biocen Sociedad Anónima', '{"country": "ES", "streetType": "Parque", "streetName": "Científico", "streetNumber": "100"}'::jsonb, 'Jorge Hidalgo', 'jorge.hidalgo@biocen.es'),
    ('66666666-6666-6666-6666-000000000002', '55555555-5555-5555-5555-000000000001', 'Tornillería TÉCNICA S.A.', 'A12345678', 'Tornillería TÉCNICA S.A.', '{"country": "ES", "streetType": "Calle", "streetName": "Principal", "streetNumber": "42"}'::jsonb, 'Laura Martín', 'laura.martin@tornilleria.es'),
    ('66666666-6666-6666-6666-000000000003', '55555555-5555-5555-5555-000000000002', 'Soluciones Químicas del Sur S.L.', 'B98765432', 'Soluciones Químicas del Sur S.L.U.', '{"country": "ES", "streetType": "Avenida", "streetName": "de la Innovación", "streetNumber": "88"}'::jsonb, 'Elena Blanco', 'elena.blanco@solquimica.es'),
    ('66666666-6666-6666-6666-000000000004', '55555555-5555-5555-5555-000000000005', 'Tornillería TÉCNICA S.A.', 'A12345678', 'Tornillería TÉCNICA S.A.', '{"country": "ES", "streetType": "Calle", "streetName": "Principal", "streetNumber": "42"}'::jsonb, 'Laura Martín', 'laura.martin@tornilleria.es')
    ON CONFLICT (id) DO NOTHING;

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
    CONSTRAINT data_assets_status_check CHECK ((status = ANY (ARRAY['available'::text, 'unavailable'::text, 'pending'::text])))
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
    updated_at timestamp with time zone DEFAULT now() NOT NULL
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
    updated_at timestamp with time zone DEFAULT now() NOT NULL
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
-- Name: organizations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organizations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    tax_id text NOT NULL,
    type public.organization_type NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_demo boolean DEFAULT false
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
-- Name: approval_history approval_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.approval_history
    ADD CONSTRAINT approval_history_pkey PRIMARY KEY (id);


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
-- Name: export_logs export_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.export_logs
    ADD CONSTRAINT export_logs_pkey PRIMARY KEY (id);


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
-- Name: supplier_data supplier_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_data
    ADD CONSTRAINT supplier_data_pkey PRIMARY KEY (id);


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
-- Name: idx_supplier_data_transaction; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_data_transaction ON public.supplier_data USING btree (transaction_id);


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
-- Name: supplier_data supplier_data_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_data
    ADD CONSTRAINT supplier_data_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.data_transactions(id) ON DELETE CASCADE;


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
-- Name: erp_configurations Admins y configuradores pueden gestionar configs ERP; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins y configuradores pueden gestionar configs ERP" ON public.erp_configurations TO authenticated USING (((organization_id = public.get_user_organization(auth.uid())) AND (public.has_role(auth.uid(), organization_id, 'admin'::public.app_role) OR public.has_role(auth.uid(), organization_id, 'api_configurator'::public.app_role))));


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
-- Name: data_transactions Los actors pueden actualizar transacciones relacionadas; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los actors pueden actualizar transacciones relacionadas" ON public.data_transactions FOR UPDATE TO authenticated USING (((subject_org_id = public.get_user_organization(auth.uid())) OR (holder_org_id = public.get_user_organization(auth.uid())) OR (consumer_org_id = public.get_user_organization(auth.uid()))));


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
-- Name: data_transactions Los usuarios pueden ver transacciones de su organización; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden ver transacciones de su organización" ON public.data_transactions FOR SELECT TO authenticated USING (((consumer_org_id = public.get_user_organization(auth.uid())) OR (subject_org_id = public.get_user_organization(auth.uid())) OR (holder_org_id = public.get_user_organization(auth.uid()))));


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
-- Name: data_products Todos los usuarios autenticados pueden ver productos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Todos los usuarios autenticados pueden ver productos" ON public.data_products FOR SELECT TO authenticated USING (true);


--
-- Name: data_assets Todos pueden ver activos disponibles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Todos pueden ver activos disponibles" ON public.data_assets FOR SELECT TO authenticated USING ((status = 'available'::text));


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
-- Name: catalog_metadata Ver metadatos según visibilidad; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Ver metadatos según visibilidad" ON public.catalog_metadata FOR SELECT TO authenticated USING (((visibility = 'public'::text) OR (EXISTS ( SELECT 1
   FROM public.data_assets
  WHERE ((data_assets.id = catalog_metadata.asset_id) AND (data_assets.holder_org_id = public.get_user_organization(auth.uid())))))));


--
-- Name: approval_history; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.approval_history ENABLE ROW LEVEL SECURITY;

--
-- Name: catalog_metadata; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.catalog_metadata ENABLE ROW LEVEL SECURITY;

--
-- Name: data_assets; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.data_assets ENABLE ROW LEVEL SECURITY;

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
-- Name: export_logs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.export_logs ENABLE ROW LEVEL SECURITY;

--
-- Name: organizations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

--
-- Name: supplier_data; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.supplier_data ENABLE ROW LEVEL SECURITY;

--
-- Name: user_profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


