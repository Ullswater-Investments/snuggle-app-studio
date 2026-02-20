

## Activar el Centro de Notificaciones con Datos Reales

### Estado Actual

- **Notifications.tsx**: Ya tiene la logica de fetch, realtime, y UI bien implementada. Filtra por `user_id`.
- **NotificationsBell.tsx**: Funciona correctamente con punto rojo animado para no leidas.
- **i18n (es)**: Ya tiene textos razonables pero necesitan ajustes segun lo solicitado.
- **Realtime**: **NO esta habilitado** para la tabla `notifications` en `supabase_realtime`. Las suscripciones no funcionaran hasta que se active.
- **RLS**: Correcta (SELECT/UPDATE por `user_id`, INSERT abierto para triggers con SECURITY DEFINER).
- **Triggers**: Ya existen 4 triggers que insertan notificaciones automaticamente (transacciones, activos, descargas, nuevos activos).

### Cambios a Implementar

#### 1. Habilitar Realtime (Migracion SQL)

Ejecutar una migracion para agregar la tabla `notifications` a la publicacion de realtime:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
```

Sin esto, las suscripciones en `NotificationsBell.tsx` y `Notifications.tsx` no reciben eventos.

#### 2. Actualizar Labels i18n (ES)

Archivo: `src/locales/es/notifications.json`

| Clave | Valor Actual | Nuevo Valor |
|-------|-------------|-------------|
| `title` | "Notificaciones" | "Centro de Notificaciones" |
| `subtitle` | "Mantente al dia con tus operaciones de datos" | "Mantente al tanto de la actividad de tus activos y transacciones." |
| `empty.title` | "Sin notificaciones" | "Sin notificaciones nuevas" |
| `empty.description` | "Estas al dia! No tienes notificaciones nuevas." | "Te avisaremos cuando haya actividad relevante en tus activos o solicitudes." |

Los valores de `filters.all`, `filters.unread`, y `filters.highPriority` ya son correctos ("Todas", "No Leidas", "Alta Prioridad").

#### 3. Filtro por organization_id en Notifications.tsx

Actualmente el fetch filtra solo por `user_id`. Agregar un filtro adicional opcional por `organization_id` usando el contexto de organizacion activa (`useOrganizationContext`), para que el usuario solo vea notificaciones relevantes a su organizacion seleccionada.

#### 4. Sin cambios necesarios en NotificationsBell.tsx

El componente ya tiene:
- Punto rojo animado (`animate-pulse`) cuando hay no leidas
- Suscripcion realtime (que funcionara una vez habilitado el paso 1)
- Contador de no leidas

### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| Migracion SQL | `ALTER PUBLICATION supabase_realtime ADD TABLE notifications` |
| `src/locales/es/notifications.json` | Actualizar title, subtitle, empty.title, empty.description |
| `src/pages/Notifications.tsx` | Agregar filtro por `organization_id` del contexto activo |

### Resultado Esperado

- Las notificaciones generadas por los triggers (cambios de transaccion, nuevos activos, descargas) apareceran en tiempo real sin refrescar.
- El punto rojo en la campana del Topbar se activara automaticamente al recibir nuevas notificaciones.
- Los textos de la pagina mostraran labels profesionales en espanol.
- Solo se mostraran notificaciones relevantes a la organizacion activa del usuario.

