-- Habilitar RLS en login_attempts (tabla de seguridad interna)
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Solo el sistema puede gestionar login_attempts (sin acceso directo de usuarios)
CREATE POLICY "System only access" 
  ON public.login_attempts FOR ALL 
  USING (false);