

## Refactorizacion de "Descargar Ficha Tecnica" y Limpieza de Metadata

### Archivo unico a modificar: `src/pages/ProductDetail.tsx`

---

### 1. Sanitizacion del JSON (handleDownloadSheet - lineas 208-231)

Reemplazar la funcion actual por una version que construya un objeto estructurado en 4 bloques limpios, excluyendo datos sensibles:

**Campos EXCLUIDOS**: `api_url`, `api_headers`, `published_by`, `denied_wallets`, `allowed_wallets`, `asset_id`, `product_id`, y cualquier valor que sea una direccion hexadecimal (patron `0x...`).

**Estructura final del JSON**:

```text
{
  informacion_general: {
    nombre, descripcion, categoria, proveedor (nombre comercial),
    version, precio, moneda, modelo_precio,
    fecha_publicacion (de custom_metadata.published_at),
    idioma (de custom_metadata.language)
  },
  esquema_tecnico: {
    campos: [...schema_definition],
    numero_de_campos: N,
    formato: "JSON / API"
  },
  politicas_de_gobernanza: {
    permisos: [...],
    prohibiciones: [...],
    obligaciones: [...],
    terminos_url: "..." (si existe)
  },
  metricas_de_calidad: {
    ...quality_metrics (objeto completo de custom_metadata.quality_metrics)
  }
}
```

El proveedor aparecera solo como `product.provider_name` (nombre comercial), nunca por ID o wallet.

### 2. Nombre del archivo optimizado (linea 227)

Cambiar de `ficha-tecnica-${product.asset_id}.json` a `[Nombre_del_Activo]_Ficha_Tecnica.json`.

Se aplicara una funcion de limpieza que:
- Reemplace espacios por guiones bajos
- Elimine caracteres especiales (acentos, simbolos)
- Limite la longitud a 50 caracteres

Ejemplo: `Datos_Energeticos_Renovables_Ficha_Tecnica.json`

### 3. Limpieza de UI - Sin columnas "metadata" visibles

Revision del archivo: actualmente no hay ninguna columna o fila llamada "metadata" expuesta directamente en la UI. El campo `custom_metadata` solo se usa internamente para extraer `access_policy`, `published_at`, `language` y `quality_metrics`. No se requieren cambios de UI adicionales en este punto, ya que no hay datos sensibles mostrados.

### 4. Resumen tecnico

| Aspecto | Detalle |
|---|---|
| Archivo modificado | `src/pages/ProductDetail.tsx` (unico) |
| Lineas afectadas | 208-231 (handleDownloadSheet) |
| Nuevas importaciones | Ninguna |
| Cambios en BD | Ninguno |

