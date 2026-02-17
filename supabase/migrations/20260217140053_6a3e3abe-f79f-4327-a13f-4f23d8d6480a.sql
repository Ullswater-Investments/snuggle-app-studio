
-- ============================================================
-- MIGRACIÓN: Alinear esquema con DATABASE_SCHEMA.sql v2026-02-16
-- ============================================================

-- ═══════════════════════════════════════════════════
-- 1. NUEVAS COLUMNAS
-- ═══════════════════════════════════════════════════

-- organizations.is_active
ALTER TABLE public.organizations ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

-- notifications.organization_id
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS organization_id UUID;

-- ═══════════════════════════════════════════════════
-- 2. ENABLE RLS en tablas que pueden no tenerlo
-- ═══════════════════════════════════════════════════

ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_data ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════
-- 3. FUNCIONES DE NOTIFICACIÓN (stubs para triggers)
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.notify_on_transaction_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _title TEXT;
  _msg TEXT;
  _user_ids UUID[];
BEGIN
  _title := 'Transacción actualizada';
  _msg := 'El estado de una transacción ha cambiado a ' || NEW.status::TEXT;

  -- Notificar a todos los usuarios de las organizaciones involucradas
  SELECT array_agg(DISTINCT up.user_id) INTO _user_ids
  FROM user_profiles up
  WHERE up.organization_id IN (NEW.consumer_org_id, NEW.subject_org_id, NEW.holder_org_id);

  IF _user_ids IS NOT NULL THEN
    INSERT INTO notifications (user_id, organization_id, title, message, type, link)
    SELECT uid, NULL, _title, _msg, 'info', '/transactions'
    FROM unnest(_user_ids) AS uid;
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_admin_on_new_asset()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _admin_ids UUID[];
BEGIN
  -- Notificar a admins de la organización holder
  SELECT array_agg(ur.user_id) INTO _admin_ids
  FROM user_roles ur
  WHERE ur.organization_id = NEW.holder_org_id AND ur.role = 'admin';

  IF _admin_ids IS NOT NULL THEN
    INSERT INTO notifications (user_id, organization_id, title, message, type, link)
    SELECT uid, NEW.holder_org_id, 'Nuevo activo creado',
           'Se ha publicado un nuevo activo de datos para revisión.',
           'info', '/catalog'
    FROM unnest(_admin_ids) AS uid;
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_on_asset_status_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _user_ids UUID[];
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    SELECT array_agg(DISTINCT up.user_id) INTO _user_ids
    FROM user_profiles up
    WHERE up.organization_id = NEW.subject_org_id;

    IF _user_ids IS NOT NULL THEN
      INSERT INTO notifications (user_id, organization_id, title, message, type, link)
      SELECT uid, NEW.subject_org_id,
             'Estado de activo actualizado',
             'El estado de tu activo ha cambiado a: ' || NEW.status,
             'info', '/my-data'
      FROM unnest(_user_ids) AS uid;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_provider_on_download()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _provider_org_id UUID;
  _user_ids UUID[];
BEGIN
  IF NEW.asset_id IS NOT NULL THEN
    SELECT da.subject_org_id INTO _provider_org_id
    FROM data_assets da WHERE da.id = NEW.asset_id;

    IF _provider_org_id IS NOT NULL THEN
      SELECT array_agg(up.user_id) INTO _user_ids
      FROM user_profiles up WHERE up.organization_id = _provider_org_id;

      IF _user_ids IS NOT NULL THEN
        INSERT INTO notifications (user_id, organization_id, title, message, type, link)
        SELECT uid, _provider_org_id,
               'Descarga de activo',
               'Un consumidor ha descargado datos de tu activo.',
               'info', '/my-data'
        FROM unnest(_user_ids) AS uid;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- ═══════════════════════════════════════════════════
-- 4. TRIGGERS
-- ═══════════════════════════════════════════════════

-- updated_at triggers (IF NOT EXISTS pattern via DROP IF EXISTS)
DROP TRIGGER IF EXISTS update_organizations_updated_at ON public.organizations;
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_data_assets_updated_at ON public.data_assets;
CREATE TRIGGER update_data_assets_updated_at BEFORE UPDATE ON public.data_assets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_data_transactions_updated_at ON public.data_transactions;
CREATE TRIGGER update_data_transactions_updated_at BEFORE UPDATE ON public.data_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_erp_configurations_updated_at ON public.erp_configurations;
CREATE TRIGGER update_erp_configurations_updated_at BEFORE UPDATE ON public.erp_configurations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_wallets_updated_at ON public.wallets;
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON public.wallets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Notification triggers
DROP TRIGGER IF EXISTS on_transaction_change ON public.data_transactions;
CREATE TRIGGER on_transaction_change
  AFTER INSERT OR UPDATE ON public.data_transactions
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_transaction_change();

DROP TRIGGER IF EXISTS on_new_asset_created ON public.data_assets;
CREATE TRIGGER on_new_asset_created
  AFTER INSERT ON public.data_assets
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_new_asset();

DROP TRIGGER IF EXISTS on_asset_status_change ON public.data_assets;
CREATE TRIGGER on_asset_status_change
  AFTER UPDATE ON public.data_assets
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_asset_status_change();

DROP TRIGGER IF EXISTS on_download_access_log ON public.access_logs;
CREATE TRIGGER on_download_access_log
  AFTER INSERT ON public.access_logs
  FOR EACH ROW EXECUTE FUNCTION public.notify_provider_on_download();

-- ═══════════════════════════════════════════════════
-- 5. DROP POLÍTICAS ANTIGUAS QUE SERÁN REEMPLAZADAS
-- ═══════════════════════════════════════════════════

-- organizations
DROP POLICY IF EXISTS "Solo admins pueden insertar organizaciones" ON public.organizations;

-- data_products
DROP POLICY IF EXISTS "Todos los usuarios autenticados pueden ver productos" ON public.data_products;
DROP POLICY IF EXISTS "Solo admins pueden insertar productos" ON public.data_products;
DROP POLICY IF EXISTS "Solo admins pueden actualizar productos" ON public.data_products;
DROP POLICY IF EXISTS "Solo admins pueden eliminar productos" ON public.data_products;

-- data_assets
DROP POLICY IF EXISTS "Todos pueden ver activos disponibles" ON public.data_assets;
DROP POLICY IF EXISTS "Ver assets visibles" ON public.data_assets;
DROP POLICY IF EXISTS "Holders pueden insertar sus propios activos" ON public.data_assets;
DROP POLICY IF EXISTS "Holders pueden actualizar sus propios activos" ON public.data_assets;
DROP POLICY IF EXISTS "Holders y admins pueden eliminar activos" ON public.data_assets;

-- ═══════════════════════════════════════════════════
-- 6. CREAR NUEVAS POLÍTICAS RLS
-- ═══════════════════════════════════════════════════

-- ── organizations: DELETE for DSO ──
CREATE POLICY "Data space owners can delete organizations" ON public.organizations FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── data_products: more permissive + DSO ──
CREATE POLICY "Users can view products" ON public.data_products FOR SELECT USING (true);
CREATE POLICY "Users can create products" ON public.data_products FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their org products" ON public.data_products FOR UPDATE USING (true);
CREATE POLICY "Data space owners can view all data products" ON public.data_products FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── data_assets: refactored ──
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

-- ── data_transactions: DSO SELECT ──
CREATE POLICY "Data space owners can view all transactions" ON public.data_transactions FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── access_logs ──
CREATE POLICY "Consumers ven sus propios logs" ON public.access_logs FOR SELECT
  USING (consumer_org_id = get_user_organization(auth.uid()));
CREATE POLICY "Providers ven logs de sus activos" ON public.access_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM data_assets da WHERE da.id = access_logs.asset_id AND da.subject_org_id = get_user_organization(auth.uid())));
CREATE POLICY "DSO global visibility" ON public.access_logs FOR SELECT
  USING (is_data_space_owner(auth.uid()));
CREATE POLICY "Gateway puede insertar logs" ON public.access_logs FOR INSERT WITH CHECK (true);

-- ── approval_history ──
DROP POLICY IF EXISTS "Participants can view approval history" ON public.approval_history;
DROP POLICY IF EXISTS "DSO can view all approval history" ON public.approval_history;
DROP POLICY IF EXISTS "Actors can insert approval history" ON public.approval_history;

CREATE POLICY "Participants can view approval history" ON public.approval_history FOR SELECT
  USING (EXISTS (SELECT 1 FROM data_transactions dt WHERE dt.id = approval_history.transaction_id
    AND (dt.consumer_org_id = get_user_organization(auth.uid())
      OR dt.subject_org_id = get_user_organization(auth.uid())
      OR dt.holder_org_id = get_user_organization(auth.uid()))));
CREATE POLICY "DSO can view all approval history" ON public.approval_history FOR SELECT
  USING (is_data_space_owner(auth.uid()));
CREATE POLICY "Actors can insert approval history" ON public.approval_history FOR INSERT
  WITH CHECK (actor_user_id = auth.uid());

-- ── user_profiles: DSO DELETE ──
CREATE POLICY "Data space owners can delete user profiles" ON public.user_profiles FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── user_roles: self-insert + DSO DELETE ──
CREATE POLICY "Users can add their own role" ON public.user_roles FOR INSERT
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Data space owners can delete user roles" ON public.user_roles FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'data_space_owner'));

-- ── data_policies: INSERT ──
CREATE POLICY "Users can insert policies for their transactions" ON public.data_policies FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM data_transactions dt JOIN user_profiles up ON up.organization_id = dt.consumer_org_id
    WHERE dt.id = data_policies.transaction_id AND up.user_id = auth.uid()));

-- ── wallets: INSERT + DSO DELETE ──
CREATE POLICY "Users can create wallet during org registration" ON public.wallets FOR INSERT WITH CHECK (true);
CREATE POLICY "Data space owners can delete wallets" ON public.wallets FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── privacy_preferences: DSO DELETE ──
CREATE POLICY "Data space owners can delete privacy preferences" ON public.privacy_preferences FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── catalog_metadata: DSO SELECT ──
CREATE POLICY "Data space owners can view all catalog metadata" ON public.catalog_metadata FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── esg_reports: DSO DELETE ──
CREATE POLICY "Data space owners can delete esg reports" ON public.esg_reports FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── audit_logs: DSO DELETE ──
CREATE POLICY "Data space owners can delete audit logs" ON public.audit_logs FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ── webhooks: DSO DELETE ──
CREATE POLICY "Data space owners can delete webhooks" ON public.webhooks FOR DELETE
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'data_space_owner'));

-- ═══════════════════════════════════════════════════
-- 7. ACTUALIZAR VISTA marketplace_listings
-- ═══════════════════════════════════════════════════

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
