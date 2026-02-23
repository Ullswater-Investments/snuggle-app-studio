DROP TRIGGER IF EXISTS on_download_access_log ON public.access_logs;
DROP FUNCTION IF EXISTS public.notify_provider_on_download();