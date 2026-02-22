

## Fix Notification Duplication and Add Role-Based Messages

### Problem Root Cause

When an action occurs (e.g., deny a request), two separate systems both insert into the `notifications` table:

1. **Edge function** (`notification-handler`): Called explicitly via `sendNotification()` -- inserts notification rows
2. **Database trigger** (`notify_on_transaction_change`): Fires automatically on any `data_transactions` UPDATE -- also inserts notification rows

This causes **2 notifications in the bell** for the same event.

### Solution

**Disable the DB trigger** for transaction status changes and let the edge function be the **single source of truth** for all transaction notifications. The edge function already has richer context (product name, org names) and can implement role-based messaging.

---

### 1. Database Migration: Drop the duplicate trigger

Remove the `notify_on_transaction_change` trigger from `data_transactions`. The function can remain but the trigger that fires it will be dropped.

```sql
DROP TRIGGER IF EXISTS on_transaction_status_change ON public.data_transactions;
```

(If the trigger name differs, we will identify and drop the correct one.)

---

### 2. Update Edge Function: Role-based messages

Modify `supabase/functions/notification-handler/index.ts` to send **different messages per role**:

- Replace the single `STATUS_LABELS` map with a role-aware structure:

| Event | Consumer (requester) gets | Provider (subject) gets |
|---|---|---|
| `created` | "Tu solicitud para [Activo] ha sido enviada para aprobacion" | "Has recibido una nueva solicitud de acceso para [Activo]" |
| `pre_approved` | "Tu solicitud para [Activo] ha sido pre-aprobada" | (not notified) |
| `approved` | "Tu solicitud para [Activo] ha sido aprobada" | (not notified) |
| `denied` | "Tu solicitud para [Activo] ha sido denegada" | "Has denegado la solicitud de acceso para [Activo]" |
| `completed` | "El intercambio de datos de [Activo] se ha completado" | "El intercambio de datos de [Activo] se ha completado" |

- The function will build separate notification rows per org role instead of a single generic message.
- All notification titles will use the format: `[Nombre_Activo]: [Accion legible]`.
- Each notification links to `/requests/[id]`.

---

### 3. Clean Up Redundant Toasts

In `RequestWizard.tsx` (line 261), the `onSuccess` toast says "Solicitud creada exitosamente". This is the only toast kept -- no "Transaccion actualizada" will appear since the trigger is removed.

In `RequestDetailPage.tsx` (lines 183-187), the `onSuccess` toasts are already contextual and will remain as-is.

---

### 4. Synchronization Guarantee

With only the edge function writing to `notifications`:
- The bell counter and the Notification Center (`/notifications`) will reflect identical records (same DB table, same query).
- No technical status names will appear -- only human-readable Spanish labels.

---

### Technical Summary

| Aspect | Detail |
|---|---|
| DB migration | Drop trigger `on_transaction_status_change` from `data_transactions` |
| Edge function | Role-aware messages per org in `notification-handler` |
| Files modified | `supabase/functions/notification-handler/index.ts` |
| Files unchanged | `NotificationsBell.tsx`, `Notifications.tsx`, `RequestWizard.tsx`, `RequestDetailPage.tsx` |
| New dependencies | None |

