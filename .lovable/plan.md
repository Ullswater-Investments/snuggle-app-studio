

## Simplificar y corregir el Topbar (UnifiedHeader)

### Problema detectado

El Topbar actual tiene dos problemas principales visibles en la captura:

1. **Logo pequeno**: La imagen `procuredata-hero-logo.png` es demasiado pequena y dificil de leer.
2. **Elementos solapados**: El `OrganizationSwitcher` con `min-w-[200px]` desborda la columna derecha del grid `grid-cols-3`, haciendo que el texto "Agile Procurement S.L." se superponga con otros controles.

### Cambios propuestos

**Archivo: `src/components/layout/UnifiedHeader.tsx`**

1. **Sustituir la imagen por texto estilizado "PROCUREDATA"**:
   - Eliminar la etiqueta `<img>` y el import de `procuredataHeroLogo`
   - Usar un `<span>` con texto "PROCUREDATA" en azul corporativo (#4CABFF), fuente bold, tracking-tight, tamano `text-xl`
   - Mantener el `<Link to="/dashboard">` para la navegacion

2. **Cambiar el layout de `grid grid-cols-3` a `flex`**:
   - La columna izquierda (SidebarTrigger + logo): `flex items-center gap-3 flex-shrink-0`
   - La columna central (barra de busqueda): `flex-1` con `max-w-md mx-auto`
   - La columna derecha (controles): `flex items-center gap-2 flex-shrink-0`
   - Esto permite que los elementos se distribuyan sin solaparse, ya que flex respeta `flex-shrink-0`

3. **Ocultar el texto del OrganizationSwitcher en pantallas pequenas**:
   - En el single-org view (lineas 33-42), ocultar el nombre y rol en pantallas `< lg`, mostrando solo el icono `Building2`
   - Esto evita que el nombre largo "Agile Procurement S.L." empuje los demas controles

**Archivo: `src/components/OrganizationSwitcher.tsx`**

4. **Reducir el ancho minimo del dropdown trigger**:
   - Cambiar `min-w-[200px]` a `min-w-0` en el boton del dropdown (linea 49)
   - Ocultar el nombre de la organizacion en pantallas `< lg` con `hidden lg:block`
   - Esto evita el desbordamiento en la barra

### Detalle tecnico del texto de marca

```text
Antes:  <img src={procuredataHeroLogo} alt="PROCUREDATA" className="h-9 object-contain" />
Despues: <span className="text-xl font-bold tracking-tight text-[#4CABFF]">PROCUREDATA</span>
```

### Detalle tecnico del layout

```text
Antes:  <div className="grid grid-cols-3 h-16 items-center px-4">
Despues: <div className="flex h-16 items-center px-4 gap-4">
```

### Archivos a modificar (2)

1. `src/components/layout/UnifiedHeader.tsx` -- sustituir logo por texto, cambiar grid a flex
2. `src/components/OrganizationSwitcher.tsx` -- reducir min-width, responsive hiding

### Resultado esperado

- Texto "PROCUREDATA" en azul, legible y consistente en ambos modos (claro/oscuro)
- Elementos bien espaciados sin solapamiento
- Altura del topbar sin cambios (h-16)
- Click en "PROCUREDATA" navega a /dashboard
- Responsive: en pantallas pequenas se oculta el nombre de la organizacion

