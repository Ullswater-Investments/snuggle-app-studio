

## Eliminar duplicidad de notificaciones de descarga y mejorar iconografia

### Problema identificado

Hay **dos fuentes** de notificaciones para el mismo evento de descarga:

1. **Trigger de BD** `notify_provider_on_download` (se activa al insertar en `access_logs`) -- genera un mensaje generico: "Descarga de activo" / "Un consumidor ha descargado datos de tu activo."
2. **Edge Function** `notification-handler` con `eventType: "download"` -- genera mensajes detallados con nombre del activo y organizacion consumidora.

Ambos se disparan durante el flujo de gateway download en `DataView.tsx`, causando entradas duplicadas.

---

### Cambios a realizar

#### 1. Eliminar el trigger duplicado (migracion SQL)

Se eliminara el trigger `on_download_access_log` y la funcion `notify_provider_on_download` de la base de datos, dejando unicamente la Edge Function como fuente de notificaciones de descarga.

```sql
DROP TRIGGER IF EXISTS on_download_access_log ON public.access_logs;
DROP FUNCTION IF EXISTS public.notify_provider_on_download();
```

#### 2. Mejorar los mensajes de la Edge Function

En `supabase/functions/notification-handler/index.ts`, actualizar la seccion `download` de `ROLE_MESSAGES`:

| Rol | Campo | Valor actual | Valor nuevo |
|---|---|---|---|
| Provider | title | `"📊 Uso de datos: {name}"` | `"Descarga de activo: {name}"` |
| Provider | message | `"Un consumidor ha descargado el activo {name}"` | `"La organizacion {consumerName} ha obtenido una copia actualizada de los datos"` |
| Consumer | title | `"📥 Descarga completada: {name}"` | `"Descarga completada: {name}"` |
| Consumer | message | Sin cambio | Sin cambio |

Se eliminaran los emojis de los titulos para que la iconografia se gestione exclusivamente desde el frontend.

#### 3. Anadir regla de iconografia para descargas en Notifications.tsx

En la funcion `getNotificationConfig` de `src/pages/Notifications.tsx`, anadir una nueva regla ANTES del switch final:

```text
Si el titulo contiene "descarga" -> icono Download, fondo bg-blue-100, color text-blue-600
```

Esto aplicara tanto a la pagina `/notifications` como al dropdown de la campana (que ya usa un estilo simplificado sin iconos personalizados).

#### 4. Anadir icono de descarga en el dropdown de la campana

En `src/components/NotificationsBell.tsx`, se anadira deteccion basica del tipo "descarga" para mostrar un mini-icono `Download` junto al titulo, usando el mismo patron de color azul suave.

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| Nueva migracion SQL | DROP trigger + funcion duplicada |
| `supabase/functions/notification-handler/index.ts` | Actualizar mensajes download, eliminar emojis |
| `src/pages/Notifications.tsx` | Anadir regla de icono Download en `getNotificationConfig` |
| `src/components/NotificationsBell.tsx` | Anadir icono Download para notificaciones de descarga |

