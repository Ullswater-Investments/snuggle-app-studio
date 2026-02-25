

## Gestion de Activos Rechazados: Route Guard + Tabs + Tarjeta de Rechazo

### Objetivo

Proteger activos rechazados de acceso publico, segmentar la vista del proveedor con pestanas, y disenar tarjetas de rechazo informativas.

---

### 1. Route Guard en ProductDetail.tsx

**Problema actual**: Un activo rechazado no aparece en `marketplace_listings` (la vista filtra por activos activos). En el fallback, se carga directamente desde `data_assets` sin verificar el estado `rejected`. Cualquier usuario con la URL puede ver el activo.

**Cambios**:

- En la query fallback, el campo `status` ya se lee. Anadir tambien `admin_notes` al SELECT del fallback y propagarlo en el objeto `MarketplaceListing` (anadir campo `admin_notes?: string`).
- Despues de los guards existentes (demo, allowlist, denylist) y antes del guard de `pending`, anadir logica para `rejected`:

```text
if (product.status === "rejected") {
  const isOwner = activeOrgId === product.provider_id;
  if (!isOwner) {
    // 404 para no-propietarios
    return <NotFoundScreen />;
  }
  // Para propietarios: renderizar normalmente pero con banner de alerta
}
```

- Si el usuario es propietario, inyectar un `<Alert variant="destructive">` fijo antes del contenido principal con el texto: "Este activo fue rechazado para su publicacion. Motivo: [admin_notes]".
- Si NO es propietario, mostrar una pantalla generica de "Producto no encontrado" con boton para volver al catalogo.

**Archivos**: `src/pages/ProductDetail.tsx`

---

### 2. Tabs en MyPublicationsTab.tsx

**Cambios**:

- Envolver la lista de publicaciones en un componente `<Tabs>` con tres pestanas:
  - **Publicados** (valor `published`): filtra por `status` en `['active', 'available']`. Pestana por defecto.
  - **Pendientes** (valor `pending`): filtra por `status` en `['pending', 'pending_validation']`.
  - **Rechazados** (valor `rejected`): filtra por `status === 'rejected'`.

- Cada pestana muestra un contador con badge: ej. "Publicados (3)".
- Si una pestana esta vacia, mostrar el `EmptyState` correspondiente.
- Las stats cards se mantienen arriba, fuera de las pestanas.

**Archivos**: `src/components/data/MyPublicationsTab.tsx`

---

### 3. Tarjeta de Rechazo en la pestana "Rechazados"

**Cambios en la tarjeta cuando el activo es `rejected`**:

- Anadir borde rojo: `border-destructive/50`.
- Mostrar el campo `admin_notes` truncado (2 lineas) directamente en la tarjeta bajo el titulo, con icono `AlertCircle` y prefijo "Motivo:".
- Ocultar el toggle de visibilidad (no tiene sentido para rechazados).
- Cambiar el boton principal de "Ver" a "Ver Motivo y Editar" con icono `Edit`.

**Archivos**: `src/components/data/MyPublicationsTab.tsx`

---

### 4. Internacionalizacion

Anadir nuevas claves a los archivos de traduccion existentes en los 7 idiomas:

**En `data.json`** (namespace `data`):
```text
"pubTabs": {
  "published": "Publicados",
  "pending": "Pendientes",
  "rejected": "Rechazados"
},
"rejectedCard": {
  "reason": "Motivo",
  "viewAndEdit": "Ver Motivo y Editar",
  "emptyTitle": "Sin activos rechazados",
  "emptyDesc": "No tienes activos rechazados. Los activos que no pasen la validacion tecnica apareceran aqui."
},
"pendingEmpty": {
  "title": "Sin activos pendientes",
  "desc": "No tienes activos en revision actualmente."
}
```

**En `catalogDetails.json`** (namespace `catalogDetails`):
```text
"rejectedBanner": {
  "title": "Activo Rechazado",
  "description": "Este activo fue rechazado para su publicacion. Motivo: {{reason}}"
},
"notFoundTitle": "Producto no encontrado",
"notFoundDesc": "Este producto no existe o no tienes acceso a el.",
"notFoundBack": "Volver al Catalogo"
```

---

### 5. Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/ProductDetail.tsx` | Route guard para rejected (owner vs non-owner), banner de alerta, campo admin_notes en interface |
| `src/components/data/MyPublicationsTab.tsx` | Tabs (Publicados/Pendientes/Rechazados), tarjeta de rechazo con borde rojo y motivo truncado |
| `src/locales/{es,en,fr,de,it,pt,nl}/data.json` | Nuevas claves pubTabs, rejectedCard, pendingEmpty |
| `src/locales/{es,en,fr,de,it,pt,nl}/catalogDetails.json` | Nuevas claves rejectedBanner, notFound* |

### Lo que NO cambia

- La logica de negocio de aprobacion/rechazo en el admin
- Las politicas RLS (ya permiten al propietario ver sus propios activos rechazados)
- El generador ODRL ni el flujo de publicacion
- La vista `marketplace_listings` (ya excluye rechazados correctamente)

