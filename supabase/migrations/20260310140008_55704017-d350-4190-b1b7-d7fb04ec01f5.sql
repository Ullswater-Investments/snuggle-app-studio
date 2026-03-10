
-- Fix 1: Remove overly broad SELECT policy on erp_configurations
DROP POLICY IF EXISTS "Usuarios pueden ver configuraciones de su organización" ON public.erp_configurations;

-- Fix 2: Restrict kit_inscriptions SELECT to admins only
DROP POLICY IF EXISTS "Authenticated users can read kit inscriptions" ON public.kit_inscriptions;

CREATE POLICY "Admins can read kit inscriptions"
ON public.kit_inscriptions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
  )
);
