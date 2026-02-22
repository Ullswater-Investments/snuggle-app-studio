
-- Update notify_on_asset_status_change to use human-readable messages
CREATE OR REPLACE FUNCTION public.notify_on_asset_status_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _user_ids UUID[];
  _title TEXT;
  _msg TEXT;
  _link TEXT;
  _type TEXT;
  _product_name TEXT;
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    -- Get product name
    SELECT dp.name INTO _product_name
    FROM data_products dp WHERE dp.id = NEW.product_id;
    _product_name := COALESCE(_product_name, 'Dataset');

    _link := '/my-data';
    _type := 'info';

    CASE NEW.status
      WHEN 'active' THEN
        _title := '🚀 ' || _product_name || ': ¡Validado y disponible!';
        _msg := '¡Enhorabuena! Tu activo ha sido validado y ya está disponible en el Catálogo.';
        _type := 'success';
      WHEN 'inactive' THEN
        _title := _product_name || ': Desactivado';
        _msg := 'Tu activo ha sido desactivado y ya no es visible en el Catálogo.';
        _type := 'warning';
      WHEN 'pending' THEN
        _title := _product_name || ': En revisión';
        _msg := 'Tu activo está siendo revisado por el administrador del espacio de datos.';
      WHEN 'rejected' THEN
        _title := _product_name || ': No aprobado';
        _msg := 'Tu activo no ha superado la revisión. Revisa las notas del administrador para más información.';
        _type := 'warning';
      WHEN 'available' THEN
        _title := '✅ ' || _product_name || ': Disponible';
        _msg := 'Tu activo está disponible y listo para recibir solicitudes.';
        _type := 'success';
      WHEN 'unavailable' THEN
        _title := _product_name || ': No disponible';
        _msg := 'Tu activo ha sido marcado como no disponible temporalmente.';
        _type := 'warning';
      ELSE
        _title := _product_name || ': Estado actualizado';
        _msg := 'El estado de tu activo ha cambiado.';
    END CASE;

    SELECT array_agg(DISTINCT up.user_id) INTO _user_ids
    FROM user_profiles up
    WHERE up.organization_id = NEW.subject_org_id;

    IF _user_ids IS NOT NULL THEN
      INSERT INTO notifications (user_id, organization_id, title, message, type, link)
      SELECT uid, NEW.subject_org_id, _title, _msg, _type, _link
      FROM unnest(_user_ids) AS uid;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;
