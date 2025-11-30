-- Agregar columna sample_data a data_assets para soporte de vista previa
ALTER TABLE public.data_assets 
ADD COLUMN IF NOT EXISTS sample_data JSONB DEFAULT NULL;

-- Comentario para documentación
COMMENT ON COLUMN public.data_assets.sample_data IS 'JSONB array con datos de ejemplo para vista previa del producto en el marketplace';

-- Índice GIN para búsquedas eficientes en el JSON
CREATE INDEX IF NOT EXISTS idx_data_assets_sample_data 
ON public.data_assets USING GIN(sample_data);

-- Nota de seguridad: sample_data es público por diseño (datos demo)
-- No contiene información sensible, solo ejemplos para evaluación del producto