

## Refactorizacion del Sistema de Alertas: Mensajes Contextuales y Guia de Iconos

### Resumen

Actualizar los mensajes de notificacion en el Edge Function para usar emojis y texto contextual segun rol, y refinar el mapeo de iconos en el Centro de Notificaciones para que coincida con la nueva guia visual.

---

### 1. Actualizar Edge Function (`supabase/functions/notification-handler/index.ts`)

Reemplazar el mapa `ROLE_MESSAGES` con los mensajes exactos solicitados:

| Evento | Rol | Titulo | Mensaje |
|---|---|---|---|
| `created` | Consumer | `[Activo]: Solicitud enviada` | Tu peticion para [Activo] esta en manos del proveedor |
| `created` | Provider | `[Activo]: Nueva solicitud` | Has recibido una peticion de acceso para [Activo] |
| `pre_approved` | Consumer | `[Activo]: Pre-aprobada` | Tu solicitud para [Activo] ha sido pre-aprobada. Pendiente de aprobacion final |
| `approved` | Consumer | `[Activo]: Acceso concedido` | Ya puedes explorar los datos de [Activo] |
| `approved` | Provider | `[Activo]: Operacion completada` | Has autorizado el acceso a [Activo] |
| `denied` | Consumer | `[Activo]: Solicitud denegada` | Tu peticion para [Activo] no ha sido aceptada |
| `denied` | Provider | `[Activo]: Solicitud denegada` | Has denegado la solicitud de acceso para [Activo] |
| `completed` | Shared | `[Activo]: Intercambio completado` | El intercambio de datos de [Activo] se ha completado |

Ademas, ajustar el campo `type` para los registros de notificacion:
- `created` -> `"info"`
- `pre_approved` -> `"info"` 
- `approved` -> `"success"`
- `denied` -> `"warning"`
- `completed` -> `"success"`

---

### 2. Actualizar Trigger de Activos (Migracion SQL)

El trigger `notify_on_asset_status_change` ya existe en la DB. Proponer una migracion para actualizar el mensaje cuando un activo pasa a `active`:

```sql
-- Cambiar el titulo a incluir el emoji de estrellas
WHEN 'active' THEN
  _title := '✨ ' || _product_name || ': ¡Activo Publicado!';
  _msg := '¡Enhorabuena! ' || _product_name || ' ya es visible para todo el ecosistema.';
  _type := 'success';
```

---

### 3. Actualizar Mapeo de Iconos en `src/pages/Notifications.tsx`

Refinar la funcion `getNotificationConfig` para seguir la guia de iconos:

| Patron en titulo | Icono Lucide | Color fondo | Color icono |
|---|---|---|---|
| "Solicitud enviada" / "Nueva solicitud" | `FileOutput` (documento con flecha) | Naranja | Naranja |
| "Acceso concedido" / "Aprobada" / "✅" | `ShieldCheck` | Verde | Verde |
| "Pre-aprobada" / "🔑" | `KeyRound` | Azul | Azul |
| "Denegada" / "❌" | `ShieldX` | Rojo | Rojo |
| "Activo Publicado" / "✨" / "🚀" | `Rocket` | Esmeralda | Esmeralda |
| "Intercambio completado" | `Zap` | Purpura | Purpura |

Importar `FileOutput` y `KeyRound` de lucide-react (reemplazar `FileKey` por `FileOutput` para el icono de documento con flecha).

---

### 4. Actualizar `NotificationsBell.tsx`

Sin cambios funcionales necesarios -- la campana ya lee de la misma tabla `notifications` que el centro. La sincronizacion esta garantizada por usar una unica fuente de datos (el Edge Function).

---

### Archivos a Modificar

| Archivo | Cambio |
|---|---|
| `supabase/functions/notification-handler/index.ts` | Nuevos mensajes contextuales por rol |
| `src/pages/Notifications.tsx` | Mapeo de iconos actualizado con guia visual |
| Migracion SQL | Actualizar trigger `notify_on_asset_status_change` para el mensaje de publicacion |

### Sin Nuevas Dependencias

Todos los iconos (`FileOutput`, `KeyRound`, `ShieldCheck`, `ShieldX`, `Rocket`, `Zap`) ya estan disponibles en `lucide-react`.

