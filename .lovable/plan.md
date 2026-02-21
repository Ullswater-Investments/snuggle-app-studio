

## Control de Activos del Marketplace en Gobernanza

### Resumen

Agregar 2 nuevas variables de sistema (`auto_approve_assets`, `catalog_visibility`) con controles interactivos en la pagina de Gobernanza, e integrar su logica en el flujo de publicacion y en la visibilidad del catalogo.

---

### 1. Base de datos: nuevas claves en `system_settings`

INSERT de 2 claves con valores por defecto usando `ON CONFLICT DO NOTHING`:

```text
auto_approve_assets   ->  "true"    (comportamiento actual: publicacion directa)
catalog_visibility    ->  "public"  (valores posibles: "public" / "private")
```

No se necesitan nuevas tablas, columnas ni politicas RLS. Las politicas existentes de `system_settings` ya cubren lectura para autenticados y escritura para admins/DSO.

---

### 2. Actualizar `useGovernanceSettings` hook

Ampliar el hook existente para incluir las 2 nuevas claves:

- Agregar `"auto_approve_assets"` y `"catalog_visibility"` al array `GOVERNANCE_KEYS`.
- Exponer `autoApproveAssets: boolean` y `catalogVisibility: "public" | "private"` en el retorno.

---

### 3. UI: Card de "Politicas de Activos" en AdminGovernance

Agregar una nueva Card debajo de "Configuracion de Identidad" con:

- Icono `Package` y titulo "Politicas de Activos".
- **Switch "Aprobacion Automatica"**: "Publicar activos instantaneamente sin revision". Persiste `auto_approve_assets` en `system_settings`.
- **Select "Visibilidad del Catalogo"**: Opciones "Publico (Visible para todos)" y "Privado (Solo usuarios registrados)". Persiste `catalog_visibility`.
- Cada cambio registra un log en `governance_logs` (reutilizando la funcion `toggleGovSetting` ya existente).
- Toast de confirmacion tras cada cambio.

---

### 4. Integracion con el flujo de publicacion (PublishDataset.tsx)

Modificar la `publishMutation` en `src/pages/dashboard/PublishDataset.tsx`:

- Importar `useGovernanceSettings`.
- Si `autoApproveAssets` es `false`, el asset se crea con `status: "pending_review"` en lugar de `"pending_validation"`.
- Si `autoApproveAssets` es `true`, el asset se crea con `status: "active"` (publicacion directa).
- Ajustar el mensaje de exito segun el caso:
  - Auto-approve ON: "Dataset publicado exitosamente en el catalogo."
  - Auto-approve OFF: "Solicitud enviada. Un administrador revisara el activo antes de publicarlo."

---

### 5. Integracion con visibilidad del catalogo (Catalog.tsx)

Modificar `src/pages/Catalog.tsx`:

- Ya importa `useGovernanceSettings` y `useAuth`.
- Si `catalogVisibility === "private"` y `!user` (no autenticado):
  - No realizar la consulta a `marketplace_listings`.
  - Mostrar un banner informativo con el componente `PublicDemoBanner` y un mensaje: "El catalogo es privado. Inicia sesion para ver los activos disponibles."
  - Opcionalmente, redirigir a `/auth` o a la landing.

---

### 6. Logging automatico

Cada cambio de switch/selector insertara un registro en `governance_logs` con:
```text
level: 'info'
category: 'config_change'
message: 'Aprobacion Automatica activada/desactivada' o 'Visibilidad del Catalogo cambiada a PRIVADO'
```

Esto ya es manejado por la funcion `toggleGovSetting` existente en `AdminGovernance.tsx`; solo se necesita agregar las etiquetas de los nuevos keys al mapa `labels`.

---

### Archivos a crear/modificar

1. **Nueva migracion SQL** -- insertar 2 claves en `system_settings`
2. **`src/hooks/useGovernanceSettings.ts`** -- agregar 2 nuevas claves
3. **`src/pages/admin/AdminGovernance.tsx`** -- nueva card "Politicas de Activos"
4. **`src/pages/dashboard/PublishDataset.tsx`** -- logica condicional de status segun `autoApproveAssets`
5. **`src/pages/Catalog.tsx`** -- restriccion de visibilidad segun `catalogVisibility`

