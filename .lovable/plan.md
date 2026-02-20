

## Unificar el header entre /dashboard y /admin/*

### Situacion actual

- **`AdminLayout`** ya usa el componente compartido `<UnifiedHeader />` correctamente.
- **`AppLayout`** (usado en `/dashboard` y rutas de usuario) tiene su **propio header inline** con diferencias: usa `ProcuredataLogo` (texto), un trigger de Command Palette (Cmd+K), y el `OrganizationSwitcher`, pero no tiene la barra de busqueda ni el `DemoHelpButton`.

Ambos headers son visualmente distintos, lo que rompe la uniformidad.

### Plan de unificacion

**Estrategia:** Hacer que `AppLayout` tambien use `<UnifiedHeader />`, e incorporar en `UnifiedHeader` las funcionalidades exclusivas que hoy solo existen en el header inline de `AppLayout`.

---

### Cambios en `src/components/layout/UnifiedHeader.tsx`

- Agregar el `OrganizationSwitcher` en la columna derecha de controles (solo visible cuando el usuario esta autenticado).
- Convertir la barra de busqueda central en un trigger del Command Palette (Cmd+K), manteniendo el mismo estilo visual pero haciendo que al hacer clic abra el CommandMenu en lugar de ser un input independiente.

### Cambios en `src/components/AppLayout.tsx`

- Eliminar todo el bloque `<header>` inline (lineas 33-68).
- Importar y usar `<UnifiedHeader />` en su lugar, igual que hace `AdminLayout`.
- Mantener los componentes `<DemoTour />`, `<CommandMenu />` y `<AIConcierge />` fuera del header (ya estan a nivel de layout).

### Archivos a modificar (2)

1. **`src/components/layout/UnifiedHeader.tsx`** -- agregar `OrganizationSwitcher`, convertir barra de busqueda en trigger de CommandMenu
2. **`src/components/AppLayout.tsx`** -- reemplazar header inline por `<UnifiedHeader />`

### Resultado esperado

Ambos layouts (`/dashboard/*` y `/admin/*`) compartiran exactamente el mismo componente de header con logo, busqueda, controles de idioma/tema, notificaciones y boton de logout, garantizando uniformidad visual completa.
