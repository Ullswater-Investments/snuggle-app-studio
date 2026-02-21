

## Correccion del Banner de Mantenimiento y Restriccion de Publicacion

### Problema

1. **Banner ausente**: Las rutas bajo `PublicDemoLayout` (catalogo, sostenibilidad, servicios, innovation lab, casos de exito, directorio/partners) no muestran el banner de mantenimiento porque ese layout no lo incluye.
2. **Publicacion sin restriccion**: Las rutas `/dashboard/publish` y `/datos/publicar` siguen accesibles durante el modo mantenimiento. No hay logica que bloquee la accion.

---

### Solucion

#### 1. Agregar MaintenanceBanner a PublicDemoLayout

Modificar `src/components/PublicDemoLayout.tsx` para importar y renderizar `MaintenanceBanner` justo debajo del `<header>` y antes del `PublicDemoBanner`, de la misma forma que ya se hace en `AppLayout` y `AdminLayout`.

#### 2. Bloquear publicacion en modo mantenimiento

Modificar `src/pages/dashboard/PublishDataset.tsx`:

- Importar `useGovernanceSettings` (si no esta ya importado) y leer `maintenanceMode`.
- Si `maintenanceMode === true`:
  - Deshabilitar el boton de publicar (atributo `disabled`).
  - Mostrar un aviso visible indicando que la publicacion esta desactivada temporalmente por mantenimiento.
  - Opcionalmente, impedir el envio de la mutacion como segunda capa de seguridad.

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/components/PublicDemoLayout.tsx` | Importar y renderizar `MaintenanceBanner` debajo del header |
| `src/pages/dashboard/PublishDataset.tsx` | Leer `maintenanceMode` y deshabilitar el formulario de publicacion cuando este activo |

