

## Centralizar el Layout con Topbar Dinamico segun Autenticacion

### Problema Actual

La aplicacion tiene 3 layouts separados con comportamiento inconsistente:

1. **AppLayout** (rutas protegidas: `/dashboard`, `/requests`, `/data`) - Muestra topbar profesional con organizacion y rol. Requiere autenticacion.
2. **PublicDemoLayout** (rutas publicas: `/catalog`, `/sustainability`, `/services`, `/innovation`) - Siempre muestra banner "Modo Demostracion", sin topbar profesional. No detecta si el usuario esta autenticado.
3. **AdminLayout** (`/admin/*`) - Usa `UnifiedHeader`, funciona correctamente.

### Solucion

Crear un **layout unificado adaptativo** que detecte el estado de autenticacion y renderice el topbar correcto automaticamente.

### Cambios a Implementar

#### 1. Modificar `PublicDemoLayout.tsx` para que sea adaptativo

Agregar deteccion de autenticacion al layout:
- **Si el usuario esta autenticado**: Renderizar el mismo header que `AppLayout` (con `OrganizationSwitcher`, `NotificationsBell`, rol dinamico, boton logout).
- **Si el usuario NO esta autenticado**: Renderizar el header actual con boton "Login" y el `PublicDemoBanner`.

Esto requiere importar `useAuth` y condicionalmente renderizar los componentes del header.

#### 2. Mover rutas compartidas al layout adaptativo

Las rutas `/catalog`, `/sustainability`, `/services`, `/innovation`, `/success-stories`, `/partners` seguiran usando el `PublicDemoLayout` modificado, que ahora se adaptara automaticamente al estado de autenticacion.

#### 3. Eliminar `DemoBanner` del `AppLayout`

Dado que las rutas protegidas siempre tienen usuario autenticado, el `DemoBanner` dentro de `AppLayout` es innecesario (siempre se muestra el topbar profesional). Se eliminara la importacion y renderizado de `DemoBanner`.

#### 4. Eliminar `DemoHelpButton` del header de `AppLayout`

Para consistencia, remover elementos demo del layout autenticado.

### Detalle Tecnico

**Archivo: `src/components/PublicDemoLayout.tsx`**
- Importar `useAuth`, `OrganizationSwitcher`, `NotificationsBell`, `DemoHelpButton`, `CommandMenu`
- En el header, usar `{user ? <AuthenticatedHeader /> : <PublicHeader />}`
- Mostrar `PublicDemoBanner` solo cuando `!user`
- Mantener `AppSidebar` y `AIConcierge` en ambos casos

**Archivo: `src/components/AppLayout.tsx`**
- Eliminar importacion y uso de `DemoBanner`
- El resto permanece igual

**Archivo: `src/App.tsx`**
- No requiere cambios de rutas. La estructura existente ya tiene las rutas correctamente distribuidas entre `PublicDemoLayout` y `AppLayout`.

### Resultado Esperado

| Ruta | Sin Login | Con Login |
|------|-----------|-----------|
| `/catalog` | Header publico + Banner Demo | Topbar profesional (org + rol) |
| `/sustainability` | Header publico + Banner Demo | Topbar profesional (org + rol) |
| `/services` | Header publico + Banner Demo | Topbar profesional (org + rol) |
| `/innovation` | Header publico + Banner Demo | Topbar profesional (org + rol) |
| `/dashboard` | Redirige a `/auth` | Topbar profesional (org + rol) |
| `/requests` | Redirige a `/auth` | Topbar profesional (org + rol) |
| `/data` | Redirige a `/auth` | Topbar profesional (org + rol) |
| `/admin/*` | Redirige a `/auth` | UnifiedHeader (admin) |

### Persistencia de Datos

El `OrganizationSwitcher` ya utiliza `useOrganizationContext` que mantiene el estado en el contexto de React. Al navegar entre paginas, no habra parpadeo porque:
- El `AuthProvider` ya esta en la raiz de la app
- El `OrganizationProvider` tambien envuelve todas las rutas
- Los datos se cachean con `@tanstack/react-query`

