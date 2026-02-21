

## Correccion del constraint `data_assets_status_check` y sincronizacion del flujo

### Problema

La restriccion actual en la tabla `data_assets` solo permite: `'available', 'unavailable', 'pending'`. El codigo envia `'active'` (auto-aprobacion ON) y `'pending_review'` (auto-aprobacion OFF), ambos valores invalidos.

---

### Cambios planificados

#### 1. Migracion SQL: Actualizar el CHECK constraint

Eliminar el constraint existente y recrearlo con los valores que realmente usa la aplicacion:

```sql
ALTER TABLE data_assets DROP CONSTRAINT data_assets_status_check;
ALTER TABLE data_assets ADD CONSTRAINT data_assets_status_check
  CHECK (status = ANY (ARRAY['active', 'inactive', 'pending', 'rejected', 'available', 'unavailable']));
```

Se mantienen `available` y `unavailable` por compatibilidad con datos existentes (seeds). Se anaden `active`, `inactive`, `pending` y `rejected` que son los que usa el frontend y el panel admin.

#### 2. Ajuste en `src/pages/dashboard/PublishDataset.tsx`

Cambiar `"pending_review"` a `"pending"` en la linea 509:

```typescript
status: autoApproveAssets ? "active" : "pending",
```

Actualizar el mensaje de exito (linea 538) cuando `autoApproveAssets` es false:

```typescript
: "Dataset enviado a revision tecnica. Se le notificara cuando este disponible en el catalogo."
```

#### 3. Sincronizacion del panel Admin (`src/pages/admin/AdminPublications.tsx`)

Anadir `"pending"` al mapa `statusConfig` (actualmente solo tiene `pending_validation` y `available` como estados "pendientes"):

```typescript
pending: { label: "Pendiente de Revision", variant: "secondary" },
```

Esto asegura que los datasets enviados con `status = 'pending'` aparezcan correctamente en la lista de publicaciones del admin con la etiqueta "Pendiente de Revision".

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| Migracion SQL | DROP + ADD constraint con valores ampliados |
| `src/pages/dashboard/PublishDataset.tsx` | `"pending_review"` a `"pending"`, mensaje de exito actualizado |
| `src/pages/admin/AdminPublications.tsx` | Anadir `pending` a `statusConfig` |

---

### Detalle tecnico

```text
Valores del constraint actualizado:
  active       - Publicado y visible
  inactive     - Desactivado por el propietario
  pending      - Enviado, esperando revision admin
  rejected     - Rechazado por admin
  available    - Legacy (seeds existentes)
  unavailable  - Legacy (seeds existentes)
```
