

## Rediseno de la Vista de Detalle del Activo (ProductDetail.tsx)

### Cambios en un unico archivo: `src/pages/ProductDetail.tsx`

---

### 1. Metricas Hero con fondo ambar/naranja

**Estado actual**: Las 4 tarjetas de metricas usan `bg-primary/5` (azulado sutil).
**Cambio**: Reemplazar el fondo por `bg-amber-50 border-amber-200` (naranja/ambar como en la referencia). Actualizar los iconos a color ambar (`text-amber-600`). Ajustar el conteo de campos para que use `schema_definition.columns` si existe como array, o las keys del objeto si no.

**Eliminar la descripcion repetida** en la pestana "Descripcion" (linea 362 repite `product.asset_description`). La descripcion solo aparecera en la cabecera superior (linea 276).

---

### 2. Pestana de Politicas de Uso - Diseno PONTUS-X con 3 bloques

**Estado actual**: Muestra un listado generico de items con el mismo icono/color.
**Cambio**: Reemplazar el contenido de la pestana "Politicas" (lineas 429-480) por un diseno de 3 bloques diferenciados:

- **Permisos (Verde)**: Card con borde verde, icono `CheckCircle2` verde, titulo "Permisos". Lista `access_policy.permissions` como items. Si no existen, mostrar placeholders estaticos ("Uso comercial permitido", "Analisis interno").
- **Prohibiciones (Rojo)**: Card con borde rojo, icono `XCircle` rojo, titulo "Prohibiciones". Lista `access_policy.prohibitions`. Placeholders: "Redistribucion a terceros", "Uso para training IA sin consentimiento".
- **Obligaciones (Azul)**: Card con borde azul, icono `AlertCircle` azul, titulo "Obligaciones". Lista `access_policy.obligations`. Placeholders: "Conformidad RGPD", "Notificacion de brechas en 72h".
- **Terminos y Condiciones**: Si `access_policy.terms_url` existe, mostrar una Card con icono `ExternalLink` y un enlace clicable al documento.

Importaciones nuevas necesarias: `XCircle`, `AlertCircle`, `ExternalLink` de lucide-react.

---

### 3. Pestana de Esquema - Sin cambios estructurales

La tabla actual (Campo, Tipo en badge, Descripcion) ya coincide con el diseno de referencia. Solo se ajustara el conteo de campos en la cabecera para que use `schema_definition.columns.length` si el esquema tiene formato de array en `columns`.

---

### 4. Panel Lateral - Descarga de Ficha Tecnica funcional

**Estado actual**: El boton "Descargar Ficha Tecnica" no tiene funcionalidad (linea 643).
**Cambio**: Implementar la funcion `handleDownloadSheet` que:
1. Construye un objeto JSON con toda la metadata del activo (info general, esquema, politicas).
2. Crea un Blob y lo descarga como archivo `.json` con nombre `ficha-tecnica-[asset_id].json`.

El boton principal "Solicitar Acceso" ya navega correctamente a `/requests/new?asset=ID` (linea 243), no requiere cambios.

---

### 5. Placeholders elegantes para Asistente IA y Resenas

**Estado actual**: El placeholder de Asistente IA es basico (lineas 508-527). Las resenas muestran datos mock (lineas 529-555).
**Cambio**:
- **Asistente IA**: Redisenar el estado vacio con un gradiente sutil de fondo, un icono mas grande con animacion pulse, y texto descriptivo mas elaborado sobre las capacidades futuras.
- **Resenas**: Reemplazar los mocks por un estado vacio elegante con icono de `Star`, mensaje "Aun no hay resenas verificadas" y subtexto explicando el sistema de verificacion via Smart Contract.

---

### Resumen tecnico

| Aspecto | Detalle |
|---|---|
| Archivo modificado | `src/pages/ProductDetail.tsx` (unico) |
| Importaciones nuevas | `XCircle`, `AlertCircle`, `ExternalLink` de lucide-react |
| Cambios en BD | Ninguno |
| Nuevos componentes | Ninguno (todo inline) |
| Compatibilidad | Se mantiene demo mode, wallet y autenticacion existente |

