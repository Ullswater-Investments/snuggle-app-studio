
-- Replace the notify_on_transaction_change trigger function with human-readable status labels
-- and links to the transaction detail page. Skip INSERT events (handled by edge function).
CREATE OR REPLACE FUNCTION public.notify_on_transaction_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _title TEXT;
  _msg TEXT;
  _link TEXT;
  _product_name TEXT;
  _user_ids UUID[];
  _status_label TEXT;
BEGIN
  -- Only fire on UPDATE when status actually changed
  IF TG_OP = 'INSERT' THEN
    RETURN NEW;
  END IF;

  IF OLD.status IS NOT DISTINCT FROM NEW.status THEN
    RETURN NEW;
  END IF;

  -- Get product name for context
  SELECT dp.name INTO _product_name
  FROM data_assets da
  JOIN data_products dp ON da.product_id = dp.id
  WHERE da.id = NEW.asset_id;

  _product_name := COALESCE(_product_name, 'Dataset');
  _link := '/requests/' || NEW.id;

  -- Map status to human-readable label
  CASE NEW.status::TEXT
    WHEN 'pending_subject' THEN
      _title := _product_name || ': Pendiente de aprobación';
      _msg := 'La solicitud de datos está pendiente de aprobación por el proveedor.';
    WHEN 'pending_holder' THEN
      _title := _product_name || ': Pre-aprobada por proveedor';
      _msg := 'El proveedor ha pre-aprobado la solicitud. Pendiente de aprobación final por el poseedor de datos.';
    WHEN 'approved' THEN
      _title := _product_name || ': Solicitud aprobada';
      _msg := 'La solicitud de datos ha sido aprobada. Los datos están disponibles para su consulta.';
    WHEN 'denied_subject' THEN
      _title := _product_name || ': Solicitud denegada';
      _msg := 'El proveedor ha denegado la solicitud de acceso a datos.';
    WHEN 'denied_holder' THEN
      _title := _product_name || ': Solicitud denegada';
      _msg := 'El poseedor de datos ha denegado la solicitud de acceso.';
    WHEN 'completed' THEN
      _title := _product_name || ': Transacción completada';
      _msg := 'El intercambio de datos se ha completado exitosamente.';
    WHEN 'cancelled' THEN
      _title := _product_name || ': Solicitud cancelada';
      _msg := 'La solicitud de datos ha sido cancelada.';
    WHEN 'revoked' THEN
      _title := _product_name || ': Acceso revocado';
      _msg := 'El acceso a los datos ha sido revocado.';
    ELSE
      _title := _product_name || ': Estado actualizado';
      _msg := 'El estado de la solicitud ha cambiado.';
  END CASE;

  -- Notify all users in the involved organizations
  SELECT array_agg(DISTINCT up.user_id) INTO _user_ids
  FROM user_profiles up
  WHERE up.organization_id IN (NEW.consumer_org_id, NEW.subject_org_id, NEW.holder_org_id);

  IF _user_ids IS NOT NULL THEN
    INSERT INTO notifications (user_id, organization_id, title, message, type, link)
    SELECT uid, NULL, _title, _msg, 'info', _link
    FROM unnest(_user_ids) AS uid;
  END IF;

  RETURN NEW;
END;
$function$;

-- Ensure trigger is attached (only on UPDATE, not INSERT)
DROP TRIGGER IF EXISTS on_transaction_change ON public.data_transactions;
CREATE TRIGGER on_transaction_change
  AFTER UPDATE ON public.data_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_transaction_change();
