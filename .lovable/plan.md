

## Logging centralizado en governance_logs para acciones administrativas

### Resumen

Se creara una funcion utilitaria `logGovernanceEvent` y se integrara en los 4 paneles de administracion para registrar automaticamente cada accion critica en la tabla `governance_logs`.

---

### 1. Crear funcion utilitaria centralizada

**Archivo nuevo:** `src/utils/governanceLogger.ts`

Una funcion reutilizable que inserta un registro en `governance_logs`:

```text
logGovernanceEvent({
  level: "info" | "warn" | "error",
  category: string,
  message: string,
  metadata?: object   // detalles adicionales (IDs, nombres, etc.)
})
```

Internamente usara `supabase.from("governance_logs").insert(...)` con el `actor_id` del usuario autenticado actual (via `supabase.auth.getUser()`).

---

### 2. Integracion por panel

#### A. Gestion de Organizaciones (`AdminOrganizations.tsx`)

| Accion | Nivel | Mensaje |
|---|---|---|
| Eliminar organizacion | info | "Organizacion [Nombre] eliminada permanentemente por el administrador" |
| Deshabilitar organizacion | info | "Organizacion [Nombre] deshabilitada por el administrador" |

Se anadira la llamada a `logGovernanceEvent` en los callbacks `onSuccess` de `deleteMutation` y `disableMutation` (lineas ~389 y ~427).

#### B. Gestion de Usuarios (`AdminUsers.tsx`)

| Accion | Nivel | Mensaje |
|---|---|---|
| Eliminar usuario | info | "Usuario [Email] removido de la plataforma" |

Se anadira en el `onSuccess` del `deleteMutation` (linea ~303).

#### C. Validacion de Activos (`AdminPublicationDetail.tsx`)

| Accion | Nivel | Mensaje |
|---|---|---|
| Aprobar publicacion | info | "Dataset [ID corto] verificado y publicado en el marketplace" |
| Rechazar publicacion | warn | "Publicacion del dataset [ID corto] denegada" |

Se anadira en los `onSuccess` de `publishMutation` (linea ~85) y `rejectMutation` (linea ~101).

#### D. Monitorizacion de Transacciones (`AdminTransactionDetail.tsx`)

Actualmente esta pagina es de solo lectura. No tiene acciones de intervencion (revocar/cancelar). Por ahora no se anade logging aqui, pero la infraestructura queda lista para cuando se implemente la funcionalidad de revocacion manual.

---

### 3. Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/utils/governanceLogger.ts` | **Nuevo**: funcion `logGovernanceEvent` |
| `src/pages/admin/AdminOrganizations.tsx` | Anadir logs en `onSuccess` de delete y disable |
| `src/pages/admin/AdminUsers.tsx` | Anadir log en `onSuccess` de delete |
| `src/pages/admin/AdminPublicationDetail.tsx` | Anadir logs en `onSuccess` de publish y reject |

### 4. Nota sobre permisos

La tabla `governance_logs` ya tiene una politica RLS que permite INSERT a usuarios con rol `admin` o `data_space_owner`. No se necesitan cambios en la base de datos.

