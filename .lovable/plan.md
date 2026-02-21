

## Limpieza de la pagina de Gobernanza: eliminar tarjetas estaticas y reorganizar layout

### Cambios a realizar

**Archivo:** `src/pages/admin/AdminGovernance.tsx`

#### 1. Eliminar tarjetas estaticas

Se removeran por completo estas tres tarjetas:

- **Identidad del Espacio (DID)** (lineas 688-715) - Solo muestra el DID estatico y badges GAIA-X
- **Protocolo Pontus-X** (lineas 717-773) - Solo muestra direcciones de contratos y datos de red
- **Servicios de Datos** (lineas 778-811) - Solo muestra enlaces a Provider, Aquarius y Explorer

Tambien se eliminara el wrapper `grid md:grid-cols-2` que contenia las dos primeras (lineas 687, 774) y el segundo wrapper grid que contenia Servicios de Datos y Estado del Ecosistema (lineas 777, 855).

#### 2. Limpiar imports no utilizados

Se removeran los imports que solo usaban estas tarjetas: `Fingerprint`, `Globe`, `Database`, `Copy`, `ExternalLink`, y las referencias a `oceanContracts`, `explorerBase`, `truncate`, `copy` y la constante `DID`.

#### 3. Reorganizar layout

El orden final de las tarjetas sera:

1. **Operaciones de Emergencia** (ya esta arriba, se mantiene)
2. **Configuracion de Red Blockchain** (se mantiene en su posicion)
3. **Grid de 2 columnas:**
   - Configuracion de Identidad (switches KYC/KYB)
   - Politicas de Activos (toggles aprobacion/visibilidad)
4. **Gobernanza Economica** (comision del ecosistema)
5. **Estado del Ecosistema** (health check, ahora fuera del grid eliminado, ocupa ancho completo)
6. **Registro de Eventos** (logs, se mantiene al final)

#### 4. Ajuste de grilla

- Las tarjetas de Identidad y Politicas de Activos se agruparan en un `grid gap-6 md:grid-cols-2` para que se adapten a 1 o 2 columnas segun el ancho de pantalla.
- Estado del Ecosistema pasara a ocupar ancho completo ya que su companion (Servicios de Datos) se elimina.

