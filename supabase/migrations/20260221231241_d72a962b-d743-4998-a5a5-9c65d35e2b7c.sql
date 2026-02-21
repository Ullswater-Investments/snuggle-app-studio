ALTER TABLE data_assets DROP CONSTRAINT IF EXISTS data_assets_status_check;
ALTER TABLE data_assets ADD CONSTRAINT data_assets_status_check
  CHECK (status = ANY (ARRAY['active', 'inactive', 'pending', 'rejected', 'available', 'unavailable']));