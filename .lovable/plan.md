
## Implementacion de DataView.tsx con Diseño de Catalogo

### Resumen

Reemplazar completamente `src/pages/DataView.tsx` (782 lineas) con el blueprint proporcionado (1103 lineas), que introduce el diseño de 3 bloques coherente con el catalogo, gateway download, historial de accesos, y visualizaciones especializadas.

---

### Cambios Principales

**Archivo a modificar:** `src/pages/DataView.tsx`

El nuevo archivo incorpora:

1. **Bloque 1 - Cabecera**: Card con gradiente superior, badges (proveedor, categoria, KYB Verified, "Acceso Concedido"), titulo y descripcion del producto.

2. **Bloque 2 - Panel de Metricas**: Card con fondo degradado de marca (`bg-gradient-to-br from-primary to-primary/80`) mostrando Version, Actualizacion, N. Campos (dinamico desde schema), y Formato.

3. **Bloque 3 - Tabs de Exploracion**: Descripcion, Esquema, Muestra, Calidad, Politicas de Acceso (ODRL).

4. **Area de Datos**: Tabs para payload (ESG/IoT/timeseries/generico), supplier data legacy, y auditoria blockchain.

5. **Acciones**: Boton "Descargar via Gateway" (`handleGatewayDownload`), Exportar CSV, Licencia PDF, Ficha Tecnica JSON.

6. **AccessHistoryTable**: Al final de la pagina, con animacion motion.

---

### Logica de Negocio y Seguridad (sin cambios respecto al blueprint)

- Query de transaccion con verificacion `hasAccess` (consumer/subject/holder)
- PayloadData solo se carga si `status === "completed"`
- SupplierData solo se carga si `status === "completed"`
- Gateway download valida `consumerOrgId`
- RevokeAccessButton solo visible para subject org

---

### Elementos Eliminados del Actual

- `EnvironmentalImpactCard` (sidebar) -- eliminado segun el blueprint
- `CodeIntegrationModal` -- eliminado del sidebar (ya no se muestra)
- Layout de sidebar 4 columnas -- reemplazado por full-width
- Header con barra de navegacion propia -- eliminado (usa layout global)

---

### Elementos Nuevos del Blueprint

- `useState("description")` para `activeTab`
- `motion.div` animaciones (framer-motion, ya instalado)
- `ScrollArea` para tablas de esquema y muestra
- `Tooltip` para badge KYB
- Iconos adicionales: `Globe`, `Star`, `CheckCircle2`, `XCircle`, `AlertCircle`, `Scale`, `Clock`, `Database`, `FileJson`, `Key`, `Copy`, `ExternalLink`
- `Separator` entre secciones
- Gateway download con panel diferenciado Consumer vs Provider/Holder (API details con Copy)

---

### Componentes Existentes Verificados

Todos los componentes importados ya existen en el proyecto:
- `ESGDataView`, `IoTDataView`, `GenericJSONView`, `ArrayDataView` -- OK
- `DataLineage`, `DataLineageBlockchain` -- OK
- `RevokeAccessButton` -- OK (usa `transactionId` prop, no `resourceId`)
- `AccessHistoryTable` -- OK
- `generateLicensePDF` -- OK
- `Progress`, `ScrollArea`, `Tooltip` -- OK (UI primitives)

---

### Ajuste Necesario

La prop de `RevokeAccessButton` en el blueprint usa `transactionId` + `actorOrgId` (formato correcto actual), no el `resourceId` del archivo actual. Esto ya esta corregido en el blueprint.

---

### Resumen Tecnico

| Aspecto | Detalle |
|---|---|
| Archivo modificado | `src/pages/DataView.tsx` |
| Lineas antes | 782 |
| Lineas despues | ~1103 |
| Nuevas dependencias | Ninguna |
| Componentes nuevos | Ninguno |
| Riesgo | Bajo -- reemplazo directo con misma estructura de queries |
