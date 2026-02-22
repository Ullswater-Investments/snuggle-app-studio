

## Descarga directa desde la API del activo

### Problema actual

La Edge Function `gateway-download` busca datos en tablas internas (`data_payloads`, `supplier_data`). El usuario quiere que haga un GET a la `api_url` almacenada en `data_assets.custom_metadata.api_url` y devuelva ese contenido directamente.

### Cambio principal: `supabase/functions/gateway-download/index.ts`

Reescribir la logica principal para:

1. Validar `transactionId` y `consumerOrgId` (sin cambios)
2. Verificar que la transaccion existe, esta `completed`, y el consumer coincide (sin cambios)
3. **Nuevo**: Extraer `api_url` y `api_headers` del `custom_metadata` del activo asociado
4. **Nuevo**: Hacer `fetch(api_url, { headers: api_headers })` para obtener los datos reales
5. Devolver el contenido obtenido como JSON al frontend
6. Si el fetch falla (timeout, 502, 404, etc.), devolver un error con status 502 y mensaje descriptivo

```text
Flujo simplificado:

transactionId + consumerOrgId
        |
        v
Verificar transaccion (status=completed, consumer=ok)
        |
        v
Obtener api_url de data_assets.custom_metadata
        |
        v
fetch(api_url) --> respuesta
        |
        v
Devolver contenido al frontend
```

Si `api_url` no existe en el activo, devolver error 400 indicando que el activo no tiene una fuente de datos configurada.

Si el fetch a la API externa falla, devolver error 502 con mensaje claro para que el frontend muestre el toast apropiado y se registre en los logs.

### Sin cambios en el frontend

`DataView.tsx` y `AccessHistoryTable.tsx` no necesitan modificaciones. El frontend ya maneja errores y descarga el JSON que reciba.

### Archivos a modificar

| Archivo | Accion |
|---|---|
| `supabase/functions/gateway-download/index.ts` | Reescribir logica para fetch directo a API |

