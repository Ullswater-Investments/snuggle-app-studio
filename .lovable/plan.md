

## Controles de Identidad Interactivos en Gobernanza

### Resumen

Agregar 3 interruptores de verificacion (Email, KYC, KYB) a la pagina de Gobernanza, persistidos en `system_settings`, y una restriccion real que deshabilite el boton "Publicar Dataset" cuando `require_kyb` este activo y la organizacion del usuario no tenga `kyb_verified`.

---

### 1. Base de datos: nuevas claves en `system_settings`

No se necesitan nuevas tablas ni columnas. Se usara `system_settings` (key/value) para almacenar 4 nuevas claves:

```text
require_email_verification  ->  "true" / "false"
require_kyc                 ->  "true" / "false"
require_kyb                 ->  "true" / "false"
ecosystem_status            ->  "active" / "maintenance"
```

**Migracion SQL**: INSERT de las 4 claves con valores por defecto (`false`, `false`, `false`, `active`) usando `ON CONFLICT DO NOTHING`.

Las RLS existentes de `system_settings` ya permiten SELECT para todos los autenticados y UPDATE para admins/DSO, por lo que no se necesitan nuevas politicas.

---

### 2. UI: Card de "Configuracion de Identidad" con Switches

Modificar `AdminGovernance.tsx`:

- Agregar una nueva Card entre la seccion de DID y la de Protocolo (o como primera card en Row 1).
- Titulo: "Configuracion de Identidad" con icono Shield.
- 3 interruptores usando el componente `Switch` existente:
  - **Verificacion de Email**: "Exigir correo validado para publicar"
  - **KYC (Persona Fisica)**: "Activar validacion de identidad para usuarios"
  - **KYB (Empresa)**: "Exigir validacion registral de la organizacion"
- Un cuarto switch o selector para **Estado del Ecosistema**: "active" / "maintenance".
- Al cambiar cada switch, se actualiza inmediatamente `system_settings` via `supabase.from("system_settings").update(...)`.
- Se muestra toast de confirmacion tras cada cambio.
- Los valores iniciales se cargan al montar el componente.

---

### 3. Hook reutilizable: `useGovernanceSettings`

Crear un hook `src/hooks/useGovernanceSettings.ts` que:

- Consulte las 4 claves de `system_settings` al montar.
- Exponga `requireKyb`, `requireKyc`, `requireEmail`, `ecosystemStatus` como booleanos/string.
- Use `@tanstack/react-query` para cache y revalidacion.
- Sea consumible desde cualquier pagina (Catalog, Data, PublishDataset).

---

### 4. Restriccion KYB en botones de publicacion

Modificar 3 archivos donde aparece el boton "Publicar Dataset":

1. **`src/pages/Catalog.tsx`** (linea ~524): importar `useGovernanceSettings` y `useOrganizationContext`. Si `requireKyb` es true y la organizacion activa no tiene `kyb_verified`, deshabilitar el boton y mostrar un tooltip: "Se requiere validacion KYB de tu organizacion".

2. **`src/pages/Data.tsx`** (linea ~36): misma logica de deshabilitacion.

3. **`src/components/data/MyPublicationsTab.tsx`** (linea ~195): misma logica en el boton del estado vacio.

La verificacion sera:
```text
disabled = requireKyb && !activeOrg?.kyb_verified
```

---

### 5. Logging automatico

Cada cambio de switch insertara un registro en `governance_logs`:
```text
level: 'info'
category: 'config_change'
message: 'Verificacion KYB activada/desactivada'
```

---

### Archivos a crear/modificar

1. **Nueva migracion SQL** -- insertar 4 claves en `system_settings`
2. **`src/hooks/useGovernanceSettings.ts`** -- nuevo hook
3. **`src/pages/admin/AdminGovernance.tsx`** -- nueva card con switches
4. **`src/pages/Catalog.tsx`** -- restriccion KYB en boton publicar
5. **`src/pages/Data.tsx`** -- restriccion KYB en boton publicar
6. **`src/components/data/MyPublicationsTab.tsx`** -- restriccion KYB en boton publicar

