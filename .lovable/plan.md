

## Refactorizacion de la Vista de Detalle del Activo (ProductDetail.tsx)

### Objetivo

Redisenar `src/pages/ProductDetail.tsx` para que tenga un layout profesional con metricas destacadas, pestanas completas y un panel de accion sticky conectado al flujo de solicitud.

---

### Cambios en un unico archivo: `src/pages/ProductDetail.tsx`

**1. Consulta mejorada a Base de Datos**

- Mantener la consulta actual pero ampliarla para traer tambien `schema_definition` del producto y `custom_metadata` del activo.
- En el fallback (cuando marketplace_listings no devuelve datos), incluir estos campos adicionales en el select:
  ```
  product:data_products(name, description, category, schema_definition, version),
  org:organizations!subject_org_id(id, name)
  ```
- Ampliar la interfaz `MarketplaceListing` para incluir `version`, `schema_definition`, `custom_metadata` y `description` (del producto).

**2. Layout Principal - Cabecera (sin cambios estructurales)**

- Mantener las badges de Categoria y Estado.
- Mantener el titulo `product.asset_name` y descripcion.
- Mover la mini-card del proveedor debajo de la descripcion (ya existe).

**3. Metricas Rapidas (NUEVO - entre cabecera y tabs)**

- Insertar una cuadricula de 4 mini-cards con fondo tematico (usando `bg-primary/10` o `bg-amber-50`):
  - **Version**: Muestra `product.version` o "2.1".
  - **Frecuencia**: "Tiempo Real" (estatico o de metadata).
  - **N. de Campos**: Cuenta las keys del `schema_definition` si existe, o muestra un valor por defecto.
  - **Formato**: "JSON / API" (estatico o de metadata).
- Cada card tendra un icono, etiqueta superior en texto pequeno y el valor en negrita.

**4. Sistema de Pestanas (refactorizar las existentes)**

Reemplazar las 6 pestanas actuales por estas 6:

| Pestana actual | Nueva pestana | Cambio |
|---|---|---|
| Descripcion (overview) | Descripcion | Mantener contenido, agregar casos de uso |
| Especificaciones (specs) | Esquema | Renderizar `schema_definition` como tabla con columnas: Campo, Tipo, Descripcion. Si no hay esquema, mostrar JSON raw |
| Vista Previa (preview) | Politicas de Uso | Mostrar permisos/restricciones desde `custom_metadata.access_policy` o un placeholder estatico |
| Gobernanza (governance) | Muestra | Mover aqui el contenido de Vista Previa (sample data con ArrayDataView) |
| Asistente IA (chat) | Asistente IA | Mantener con placeholder "El asistente se implementara proximamente" si no hay AssetChatInterface, o mantener el componente existente |
| Resenas (reviews) | Resenas | Mantener el placeholder estatico existente |

**5. Panel de Accion Sticky (refactorizar el existente)**

- Mantener la estructura actual de la card sticky (ya existe con precio, checkmarks, boton).
- Cambios:
  - **Boton principal**: Cambiar la navegacion de `navigate("/requests/new", { state: ... })` a `navigate("/requests/new?asset=" + product.asset_id)` para pasar el asset por query param.
  - **Boton secundario** (NUEVO): Anadir un `Button variant="outline"` debajo con texto "Descargar Ficha Tecnica" y un icono `FileText`.
  - **Resumen inferior** (NUEVO): Anadir una tabla pequena debajo de los botones con 3 filas: Proveedor (nombre), Version y Estado del activo.

---

### Resumen tecnico

- **Archivo modificado**: `src/pages/ProductDetail.tsx` (unico archivo)
- **Sin cambios en BD**: No se requieren migraciones
- **Sin nuevos componentes**: Todo se implementa inline en el mismo archivo
- **Compatibilidad**: Se mantiene la logica de demo mode, wallet y autenticacion existente

