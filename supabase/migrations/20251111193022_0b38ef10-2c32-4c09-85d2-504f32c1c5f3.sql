-- Tabla de productos de datos (template/definición)
CREATE TABLE public.data_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0',
  description TEXT,
  schema_definition JSONB,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de activos de datos (instancias concretas por proveedor)
CREATE TABLE public.data_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.data_products(id) ON DELETE CASCADE,
  subject_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  holder_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'unavailable', 'pending')),
  custom_metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de metadatos del catálogo
CREATE TABLE public.catalog_metadata (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID NOT NULL REFERENCES public.data_assets(id) ON DELETE CASCADE UNIQUE,
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'restricted')),
  tags TEXT[],
  categories TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.data_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_metadata ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para data_products (todos pueden ver, solo admins pueden gestionar)
CREATE POLICY "Todos los usuarios autenticados pueden ver productos"
ON public.data_products
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Solo admins pueden insertar productos"
ON public.data_products
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'));

CREATE POLICY "Solo admins pueden actualizar productos"
ON public.data_products
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'));

CREATE POLICY "Solo admins pueden eliminar productos"
ON public.data_products
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'));

-- Políticas RLS para data_assets (todos pueden ver públicos, holders pueden gestionar los suyos)
CREATE POLICY "Todos pueden ver activos disponibles"
ON public.data_assets
FOR SELECT
TO authenticated
USING (status = 'available');

CREATE POLICY "Holders pueden insertar sus propios activos"
ON public.data_assets
FOR INSERT
TO authenticated
WITH CHECK (holder_org_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Holders pueden actualizar sus propios activos"
ON public.data_assets
FOR UPDATE
TO authenticated
USING (holder_org_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Holders y admins pueden eliminar activos"
ON public.data_assets
FOR DELETE
TO authenticated
USING (
  holder_org_id = public.get_user_organization(auth.uid()) 
  OR public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin')
);

-- Políticas RLS para catalog_metadata (seguir visibilidad de activos)
CREATE POLICY "Ver metadatos según visibilidad"
ON public.catalog_metadata
FOR SELECT
TO authenticated
USING (
  visibility = 'public' OR
  EXISTS (
    SELECT 1 FROM public.data_assets
    WHERE data_assets.id = catalog_metadata.asset_id
    AND data_assets.holder_org_id = public.get_user_organization(auth.uid())
  )
);

CREATE POLICY "Holders pueden gestionar metadatos de sus activos"
ON public.catalog_metadata
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.data_assets
    WHERE data_assets.id = catalog_metadata.asset_id
    AND data_assets.holder_org_id = public.get_user_organization(auth.uid())
  )
);

-- Triggers para actualizar updated_at
CREATE TRIGGER update_data_products_updated_at
BEFORE UPDATE ON public.data_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_data_assets_updated_at
BEFORE UPDATE ON public.data_assets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_catalog_metadata_updated_at
BEFORE UPDATE ON public.catalog_metadata
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para mejorar rendimiento de búsquedas
CREATE INDEX idx_data_products_name ON public.data_products(name);
CREATE INDEX idx_data_products_category ON public.data_products(category);
CREATE INDEX idx_data_assets_product_id ON public.data_assets(product_id);
CREATE INDEX idx_data_assets_subject_org ON public.data_assets(subject_org_id);
CREATE INDEX idx_data_assets_holder_org ON public.data_assets(holder_org_id);
CREATE INDEX idx_data_assets_status ON public.data_assets(status);
CREATE INDEX idx_catalog_metadata_tags ON public.catalog_metadata USING GIN(tags);
CREATE INDEX idx_catalog_metadata_categories ON public.catalog_metadata USING GIN(categories);