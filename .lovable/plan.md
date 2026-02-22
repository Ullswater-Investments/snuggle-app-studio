

## Reestructuracion Final de AssetDetailPage con Guardia de Seguridad

### Archivo a modificar: `src/pages/ProductDetail.tsx`

---

### 1. Proteccion de Acceso (Guardia de Seguridad)

Se anadira logica de seguridad al inicio del componente, despues de cargar los datos:

**a) Bloqueo Demo/Sin Organizacion:**
- Extraer `activeOrgId` e `isDemo` de `useOrganizationContext()` (ya se importa `isDemo`, falta `activeOrgId`).
- Si `isDemo === true` o `!activeOrgId`, redirigir a `/catalog` con toast: "Detalle de activos solo disponible para organizaciones registradas."
- Implementado con `useEffect` + `navigate` para evitar render del contenido.

**b) Validacion de Listas Pontus-X (allowed/denied wallets):**
- Antes de renderizar los 3 bloques, verificar `custom_metadata.access_policy`:
  - Si `allowed_wallets` existe y es un array no vacio, y la organizacion actual (`activeOrgId`) NO esta incluida, redirigir fuera con toast de acceso denegado.
  - Si `denied_wallets` existe y contiene `activeOrgId`, mostrar una pantalla de "Acceso Denegado" con icono de escudo en lugar del contenido normal.

---

### 2. Reorganizacion en 3 Bloques Visuales

Los 3 bloques ya existen en el codigo actual y se mantienen con mejoras menores:

- **Bloque 1 (Identidad)**: Card superior con Badge, Titulo, Descripcion, y "Vendido y operado por". Sin cambios estructurales, ya esta correcto.
- **Bloque 2 (Especificaciones)**: Panel ambar con Version, Frecuencia, N. Campos (dinamico via `schemaFieldCount`), Formato. Ya esta correcto.
- **Bloque 3 (Exploracion)**: Tabs integrados en una sola Card. Ya esta correcto.

---

### 3. Eliminacion del boton "Volver al Catalogo"

Se eliminara el boton `<Button variant="ghost">` con texto "Volver al Catalogo" (lineas 306-308) para liberar espacio visual. La navegacion de retorno se delega al breadcrumb del navegador o la barra de navegacion principal.

---

### 4. Logica de Pestanas y Ficha Tecnica

Sin cambios. Ya estan correctamente implementados:
- Pestana Politicas: 3 bloques coloreados + T&C link.
- Pestana Esquema: Usa `col.field` con fuente mono.
- Descarga: JSON sanitizado en 4 bloques sin datos sensibles.

---

### 5. Sidebar de Transaccion

Sin cambios estructurales. Ya incluye precio dinamico, mensaje de seguridad blockchain con candado, y botones de accion.

---

### Resumen tecnico

| Aspecto | Detalle |
|---|---|
| Archivo modificado | `src/pages/ProductDetail.tsx` (unico) |
| Nuevas importaciones | `activeOrgId` de `useOrganizationContext` |
| Cambios principales | Guardia de seguridad (demo + wallets), eliminacion boton "Volver" |
| Cambios en BD | Ninguno |

