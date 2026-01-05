-- ============================================
-- FASE 1: Base de Datos Web3 - GLOBALDATACARE
-- ============================================

-- 1.1 Crear tabla notifications (para Realtime)
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indices para rendimiento
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, is_read);

-- RLS para notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" 
  ON public.notifications FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" 
  ON public.notifications FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" 
  ON public.notifications FOR INSERT 
  WITH CHECK (true);

-- Habilitar Realtime para notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- 1.2 Crear tabla login_attempts (Rate Limiting)
CREATE TABLE public.login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  ip_address TEXT,
  success BOOLEAN DEFAULT false,
  attempted_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_login_attempts_email_time ON public.login_attempts(email, attempted_at);

-- Funcion de limpieza automatica (borrar > 30 dias)
CREATE OR REPLACE FUNCTION public.cleanup_old_login_attempts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM login_attempts WHERE attempted_at < now() - INTERVAL '30 days';
END;
$$;

-- 1.3 Crear tabla privacy_preferences
CREATE TABLE public.privacy_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  profile_visible BOOLEAN DEFAULT true,
  show_access_history BOOLEAN DEFAULT true,
  anonymous_research BOOLEAN DEFAULT false,
  access_alerts BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS para privacy_preferences
ALTER TABLE public.privacy_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences" 
  ON public.privacy_preferences FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" 
  ON public.privacy_preferences FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" 
  ON public.privacy_preferences FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Trigger para crear preferencias por defecto
CREATE OR REPLACE FUNCTION public.create_default_privacy_preferences()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO privacy_preferences (user_id) VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 1.4 Extender tabla organizations para Web3
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS did TEXT,
ADD COLUMN IF NOT EXISTS wallet_address TEXT,
ADD COLUMN IF NOT EXISTS pontus_verified BOOLEAN DEFAULT false;