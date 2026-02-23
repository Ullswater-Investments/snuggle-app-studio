

## Correccion de error de compilacion e internacionalizacion restante de DataView.tsx

### 1. Correccion del error de compilacion (linea 37-46)

El archivo tiene una declaracion duplicada de `const DataView = () => {`. La estructura actual es:

```text
L37: const DataView = () => {          // <-- DUPLICADO (debe eliminarse)
L38:   const { t } = useTranslation('dataView');
L39-44: getStatusLabel function
L45: (cierre implicito faltante)
L46: const DataView = () => {          // <-- REAL
L47:   const { id } = useParams...
```

**Solucion:** Eliminar la declaracion duplicada (lineas 37-45) y mover `useTranslation` y `getStatusLabel` dentro del componente real (despues de linea 46).

---

### 2. Cadenas hardcodeadas pendientes de internacionalizar

Se reemplazaran todas las cadenas restantes usando las claves ya existentes en los archivos `dataView.json` de los 7 idiomas:

| Seccion | Cadenas hardcodeadas | Clave i18n |
|---|---|---|
| **Toast CSV** (L194) | `"No hay datos para exportar"` | `t('toast.noExportData')` |
| **Toast CSV** (L218) | `"Archivo CSV descargado exitosamente"` | `t('toast.csvSuccess')` |
| **Toast ERP** (L224) | `"No hay datos para enviar"` | `t('toast.erpNoData')` |
| **Toast ERP** (L240) | `"Datos enviados a ERP exitosamente"` | `t('toast.erpSuccess')` |
| **Toast ERP** (L244) | `"Error al enviar datos a ERP"` | `t('toast.erpError')` |
| **Toast Gateway** (L253) | `"Descargando datos a traves del Access Controller..."` | `t('toast.gatewayDownloading')` |
| **Toast Gateway** (L309) | `"Archivo descargado correctamente"` | `t('toast.gatewaySuccess')` |
| **Toast Gateway** (L333) | `"No se pudo conectar con el servidor..."` | `t('toast.gatewayProviderError')` |
| **Toast Gateway** (L335) | `` `Error al descargar: ${errorMsg}` `` | `t('toast.gatewayError', { error: errorMsg })` |
| **No data org** (L903) | `"No hay datos completados para..."` | `t('data.noDataForOrg', { org: activeOrg?.name })` con HTML |
| **No data provider** (L904) | `"Los proveedores no reciben datos..."` | `t('data.providerNoData')` |
| **No data holder** (L905) | `"Los holders custodian datos..."` | `t('data.holderNoData')` |
| **No data switch** (L906) | `"Prueba a cambiar a una organizacion Consumer..."` | `t('data.switchConsumer')` |
| **No data title** (L913) | `"Sin datos disponibles"` | `t('data.noDataAvailable')` |
| **No data desc** (L915) | `"Aun no se han compartido datos..."` | `t('data.noDataShared')` |
| **Payload tabs** (L928-931) | `"Datos ESG"`, `"Datos IoT"`, `"Datos Flexibles"` | `t('payloads.esgData')`, `t('payloads.iotData')`, `t('payloads.flexibleData')` |
| **Payload tab supplier** (L934) | `"Datos de Proveedor"` | `t('payloads.supplierData')` |
| **Blockchain tab** (L938) | `"Auditoria Blockchain"` | `t('blockchain.title')` |
| **Payload titles** (L948-955) | Nombres de esquemas (ESG, IoT, etc.) | `t('payloads.esg_report')`, etc. |
| **Schema type** (L958) | `"Tipo de esquema:"` | `t('payloads.schemaType')` |
| **KPIs timeseries** (L975-992) | `"Valor Actual"`, `"Calidad"`, `"Tendencia"`, `"Puntos de Datos"` | `t('payloads.currentValue')`, etc. |
| **Chart title** (L1002) | `"Evolucion Temporal"` | `t('payloads.temporalEvolution')` |
| **Sector** (L1044-1045) | `"Datos sectoriales:"` | `t('payloads.sectorData')` |
| **Provider title** (L1066) | `"Datos del Proveedor"` | `t('provider.title')` |
| **Provider count** (L1068) | `"registro(s) encontrado(s)"` | `t('provider.recordsFound', { count: supplierData.length })` |
| **Provider headers** (L1076-1080) | `"Razon Social"`, `"CIF/NIF"`, etc. | `t('provider.companyName')`, `t('provider.taxId')`, etc. |
| **Full details** (L1100) | `"Detalles Completos"` | `t('provider.fullDetails')` |
| **Fiscal address** (L1103) | `"Direccion Fiscal"` | `t('provider.fiscalAddress')` |
| **Legal address** (L1110) | `"Direccion Legal"` | `t('provider.legalAddress')` |
| **Access history** (L1143-1144) | `"Historial de Accesos"`, `"Registro de tus descargas..."` | `t('accessHistory.title')`, `t('accessHistory.description')` |

---

### 3. Problema del `useTranslation` fuera de scope

El hook `useTranslation` solo puede usarse dentro del componente React. Actualmente las funciones `exportToCSV`, `sendToERPMutation` y `handleGatewayDownload` estan dentro del componente, asi que tendran acceso a `t()` una vez movido correctamente.

---

### Detalle tecnico

**Archivo a modificar:** `src/pages/DataView.tsx`

No se necesitan cambios en los archivos JSON de traducciones porque todas las claves ya existen en los 7 idiomas.

**Cambios concretos:**

1. Eliminar lineas 37-45 (declaracion duplicada de `DataView`)
2. Insertar `const { t } = useTranslation('dataView');` y `getStatusLabel` justo despues de la linea 54 (`useNotifications`)
3. Reemplazar ~35 cadenas hardcodeadas en espanol por llamadas `t()` usando las claves de la tabla anterior
4. Para la alerta con HTML dinamico (L903), usar `dangerouslySetInnerHTML` con `t('data.noDataForOrg', { org: activeOrg?.name })`

