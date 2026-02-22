

## Implementacion del Modo Demostracion Global

### Situacion actual

- Ya existe un `isDemo` en `useOrganizationContext` basado en el flag `is_demo` de la organizacion o el email `demo@procuredata.app`.
- Existe un `DemoBanner` que muestra un aviso cuando `isDemo` es true.
- El boton "Acceder a Version Demo" en Auth.tsx usa las credenciales demo@procuredata.app.
- No hay restricciones funcionales asociadas al modo demo (catalogo, publicacion, onboarding, etc.).

---

### Cambios planificados

**1. Banner global en AppLayout (actualizar DemoBanner)**

- Archivo: `src/components/DemoBanner.tsx`
- Cambiar el texto y estilo del banner existente para que diga: "Estas en Modo Demostracion. Algunas funciones de registro y publicacion estan limitadas".
- Mantener el banner visible en la parte superior cuando `isDemo` es true (ya esta en uso via `useOrganizationContext`).
- Verificar que `DemoBanner` se renderice en `AppLayout.tsx` (actualmente NO se renderiza ahi, solo en otros layouts). Anadir `<DemoBanner />` despues de `<UnifiedHeader />` en `AppLayout.tsx`.

**2. Restricciones en Catalogo (/catalog y /catalog/:id)**

- Archivo: `src/pages/Catalog.tsx`
  - Importar `useOrganizationContext` (ya importado).
  - Extraer `isDemo` del contexto.
  - Cuando `isDemo` es true, filtrar los listings para mostrar solo activos sinteticos (synthetic assets que ya existen en el codigo, linea 237) y excluir los datos reales de la BD. Si hay datos de BD, filtrarlos por organizaciones demo (`is_demo = true` en organizations).

- Archivo: `src/pages/ProductDetail.tsx`
  - Importar `useOrganizationContext`.
  - Si `isDemo` es true y el producto no pertenece a una organizacion demo, redirigir a `/catalog` con un toast de aviso.
  - Deshabilitar el boton "Solicitar Acceso" / "Comprar Ahora" cuando `isDemo` es true, mostrando "Solicitudes no disponibles en demo" como texto del boton.

**3. Bloqueo de Publicacion y Onboarding**

- Archivo: `src/pages/dashboard/PublishDataset.tsx`
  - Importar `isDemo` de `useOrganizationContext`.
  - Si `isDemo` es true, mostrar un mensaje de bloqueo en lugar del formulario: "La publicacion de activos no esta disponible en modo demostracion".

- Archivo: `src/pages/RequestWizard.tsx`
  - Importar `isDemo` de `useOrganizationContext`.
  - Si `isDemo` es true, mostrar un mensaje de bloqueo similar.

- Archivo: `src/components/WelcomeScreen.tsx`
  - Importar `isDemo` de `useOrganizationContext`.
  - Si `isDemo` es true, ocultar las tarjetas de "Registrar Organizacion" e "Invitar", y mostrar un mensaje indicando que se esta en modo demo.

**4. Bloqueo de Gestion de Organizaciones**

- Archivo: `src/pages/onboarding/CreateOrganization.tsx`
  - Importar `isDemo` de `useOrganizationContext`.
  - Si `isDemo` es true, redirigir a `/dashboard` con un toast: "Creacion de organizaciones no disponible en modo demo".

- Archivo: `src/pages/onboarding/RequestInvite.tsx`
  - Igual: redirigir con aviso si `isDemo` es true.

---

### Resumen de archivos modificados

1. `src/components/DemoBanner.tsx` -- actualizar texto y estilo del banner
2. `src/components/AppLayout.tsx` -- anadir `<DemoBanner />` despues de `<UnifiedHeader />`
3. `src/pages/Catalog.tsx` -- filtrar por activos sinteticos/demo en modo demo
4. `src/pages/ProductDetail.tsx` -- redireccion y bloqueo de boton de solicitud
5. `src/pages/dashboard/PublishDataset.tsx` -- pantalla de bloqueo en modo demo
6. `src/pages/RequestWizard.tsx` -- pantalla de bloqueo en modo demo
7. `src/components/WelcomeScreen.tsx` -- ocultar tarjetas de registro en modo demo
8. `src/pages/onboarding/CreateOrganization.tsx` -- redireccion en modo demo
9. `src/pages/onboarding/RequestInvite.tsx` -- redireccion en modo demo

### Notas tecnicas

- No se necesita crear un nuevo estado global; el `isDemo` ya existente en `useOrganizationContext` es suficiente y esta basado en datos reales (flag `is_demo` de la organizacion o email del usuario demo).
- No se requieren cambios en la base de datos.
- Las restricciones son puramente de UI; la seguridad real se mantiene via RLS policies existentes.

