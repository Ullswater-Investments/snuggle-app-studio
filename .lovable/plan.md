

## Correcciones de Descarga Gateway y Etiquetas en DataView

### Problema Principal

La Edge Function `gateway-download` **no existe** en el proyecto. El boton intenta invocarla pero falla porque nunca fue creada. Ademas, la tabla de historial muestra textos tecnicos sin traducir.

---

### Cambios a Realizar

#### 1. Crear Edge Function `gateway-download`

**Archivo nuevo:** `supabase/functions/gateway-download/index.ts`

Dado que no hay un gateway externo conectado actualmente, la funcion hara lo siguiente:
- Recibir `transactionId` y `consumerOrgId`
- Verificar que la transaccion exista y este en estado `completed`
- Verificar que el `consumerOrgId` coincida con el consumer de la transaccion
- Obtener los datos del `data_payloads` y/o `supplier_data` asociados
- Devolver el contenido como JSON

La funcion usara `SUPABASE_SERVICE_ROLE_KEY` para acceder a los datos sin restricciones de RLS, pero validara manualmente los permisos.

#### 2. Registrar la funcion en `supabase/config.toml`

Anadir entrada `[functions.gateway-download]` con `verify_jwt = false` (la validacion se hara en codigo).

#### 3. Traduccion de etiquetas en `AccessHistoryTable.tsx`

Anadir `download_gateway` al mapa `actionLabels`:

```
download_gateway -> "Descarga de datos (Access Controller)"
view_data -> "Visualizacion de activo"
api_access -> "Acceso via API"
```

#### 4. Mejora de feedback de errores en `DataView.tsx`

Ajustar el bloque `catch` de `handleGatewayDownload` para detectar el error especifico "Failed to send a request to the Edge Function" y mostrar un mensaje profesional:

```
"No se pudo conectar con el servidor del proveedor. Intentelo de nuevo en unos minutos."
```

---

### Detalle Tecnico de la Edge Function

```text
POST /gateway-download
Body: { transactionId, consumerOrgId, format? }

Flujo:
1. Validar CORS
2. Leer transactionId y consumerOrgId del body
3. Consultar data_transactions con service role
4. Verificar status === "completed" y consumer_org_id === consumerOrgId
5. Consultar data_payloads por transaction_id
6. Si no hay payload, consultar supplier_data
7. Devolver JSON con los datos encontrados
8. Si no hay datos, devolver error 404
```

---

### Archivos Modificados/Creados

| Archivo | Accion |
|---|---|
| `supabase/functions/gateway-download/index.ts` | Crear |
| `src/components/AccessHistoryTable.tsx` | Editar (anadir etiqueta `download_gateway`) |
| `src/pages/DataView.tsx` | Editar (mejorar error handling) |

