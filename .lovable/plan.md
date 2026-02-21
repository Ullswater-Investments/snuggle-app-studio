
## Unificacion visual del portal de usuario

### Resumen

Se unificara la experiencia visual consolidando el header y las rutas operativas bajo `AppLayout`, sin tocar `DocumentLayout` ni las paginas informativas/legales.

---

### 1. Actualizar UnifiedHeader.tsx

**Zona izquierda** (branding + navegacion):
- Mantener `SidebarTrigger`
- Texto "PROCUREDATA" con color azul corporativo (`text-[#4CABFF]`) en lugar de `text-foreground`
- Anadir botones de navegacion historica `< >` (atras/adelante) justo despues del texto, reutilizando la logica de `GlobalNavigation` (con `useNavigate(-1)` y `useNavigate(1)`) pero sin el boton Home
- Importar `ChevronLeft`, `ChevronRight` de lucide-react y `useNavigate` de react-router-dom

**Zona central** (buscador): Sin cambios, ya esta centrado con `flex-1 justify-center`

**Zona derecha** (acciones): Sin cambios funcionales. Mantiene OrganizationSwitcher, NotificationsBell, LanguageSwitcher, ThemeToggle, DemoHelpButton y boton logout/login.

---

### 2. Consolidar rutas en App.tsx

Mover las rutas del catalogo y paginas operativas publicas desde el bloque `PublicDemoLayout` al bloque `AppLayout` (protegido con `ProtectedRoute`):

**Rutas a mover al bloque AppLayout:**
- `/catalog` (pagina principal del catalogo)
- Todas las rutas `/catalog/*` de detalle de producto (telemetria-flota, consumo-electrico, etc.)
- `/sustainability`
- `/services` y `/services/:id`
- `/innovation`
- `/success-stories` y `/success-stories/:id`
- `/partners` (listado)

**Rutas que permanecen en PublicDemoLayout** (accesibles sin autenticacion):
- Ninguna operativa - se eliminara el bloque `PublicDemoLayout` de App.tsx ya que todas sus rutas se mueven a AppLayout

**Nota:** Esto significa que el catalogo requerira autenticacion. Las paginas de documentos, landing, auth, register, guide, etc. siguen siendo publicas sin layout wrapper.

---

### 3. Ajustar margenes en AppLayout.tsx

- En el `<main>`, mantener `flex-1` sin padding adicional. Actualmente no tiene margenes extra, lo cual es correcto.
- El header ya tiene `h-16` fijo y `sticky top-0`. La transicion entre rutas sera imperceptible porque todas comparten el mismo layout.

---

### 4. Eliminar PublicDemoLayout.tsx (opcional)

Si tras mover todas las rutas el componente queda sin uso, se eliminara el archivo y su import en App.tsx. Tambien se puede eliminar `PublicDemoBanner` si ya no se referencia.

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/components/layout/UnifiedHeader.tsx` | Anadir botones atras/adelante, cambiar color de PROCUREDATA a azul corporativo |
| `src/App.tsx` | Mover rutas de catalogo/servicios/partners de PublicDemoLayout a AppLayout |
| `src/components/PublicDemoLayout.tsx` | Eliminar si queda sin rutas |

### Archivos NO modificados

- `src/components/DocumentLayout.tsx` - sin cambios
- `src/components/AppLayout.tsx` - sin cambios necesarios (la estructura ya es correcta)
- Todas las paginas de documentos explicativos, legal, landing - sin cambios
