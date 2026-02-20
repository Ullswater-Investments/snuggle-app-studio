

## Usar siempre el logo claro en el header de /admin/* y /dashboard

### Problema

Actualmente en `UnifiedHeader.tsx` (lineas 26-27) se alternan dos logos:
- Modo claro: `procuredata-hero-logo.png` (visible, el de la screenshot)
- Modo oscuro: `procuredata-logo-dark.png` (version oscura)

El usuario confirma que el logo claro se ve bien en ambos modos y quiere mantenerlo siempre.

### Cambio

**Archivo: `src/components/layout/UnifiedHeader.tsx`**

- Eliminar la linea 27 (la imagen con `hidden dark:block` del logo oscuro)
- En la linea 26, quitar la clase `dark:hidden` para que el logo claro sea siempre visible
- Eliminar el import de `procuredataLogoDark` (linea 10) ya que no se usara

Resultado: una sola imagen `<img>` con `procuredataHeroLogo` siempre visible, sin alternancia de tema.

### Nota importante

La landing page NO se toca. Este cambio solo afecta al `UnifiedHeader`, que es el componente compartido por `/dashboard/*` y `/admin/*`.

