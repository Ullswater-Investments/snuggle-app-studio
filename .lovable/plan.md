
## Internacionalizacion de RequestsAnalyticsDashboard y DataView

### Alcance

Se van a internacionalizar dos componentes con muchos textos hardcodeados en espanol:

1. **RequestsAnalyticsDashboard** (~30 strings): titulos, KPIs, etiquetas de graficos, labels de estados
2. **DataView** (~120+ strings): toda la vista operativa del activo incluyendo cabecera, metricas, pestanas, politicas ODRL, paneles de descarga, datos de proveedor, etc.

### Estrategia de namespaces

- **RequestsAnalyticsDashboard**: Ampliar el namespace existente `requests` con una seccion `realtime` para los textos del dashboard de analytics en tiempo real
- **DataView**: Crear un namespace nuevo `dataView` dedicado a toda la vista `/data/view/:id`

### Archivos a crear (14 archivos JSON)

| Archivo | Descripcion |
|---|---|
| `src/locales/es/dataView.json` | Namespace dataView en espanol |
| `src/locales/en/dataView.json` | Namespace dataView en ingles |
| `src/locales/fr/dataView.json` | Namespace dataView en frances |
| `src/locales/de/dataView.json` | Namespace dataView en aleman |
| `src/locales/it/dataView.json` | Namespace dataView en italiano |
| `src/locales/pt/dataView.json` | Namespace dataView en portugues |
| `src/locales/nl/dataView.json` | Namespace dataView en neerlandes |

### Archivos a modificar (10 archivos)

| Archivo | Cambio |
|---|---|
| `src/locales/es/requests.json` | Anadir seccion `realtime` con ~20 claves |
| `src/locales/en/requests.json` | Anadir seccion `realtime` |
| `src/locales/fr/requests.json` | Anadir seccion `realtime` |
| `src/locales/de/requests.json` | Anadir seccion `realtime` |
| `src/locales/it/requests.json` | Anadir seccion `realtime` |
| `src/locales/pt/requests.json` | Anadir seccion `realtime` |
| `src/locales/nl/requests.json` | Anadir seccion `realtime` |
| `src/i18n.ts` | Registrar namespace `dataView` en los 7 idiomas |
| `src/components/RequestsAnalyticsDashboard.tsx` | Reemplazar strings hardcodeados con `t()` |
| `src/pages/DataView.tsx` | Reemplazar strings hardcodeados con `t()` |

### Detalle de claves para `requests.realtime`

Cubrira todos los textos del componente RequestsAnalyticsDashboard:

- `realtime.title`: "Analytics en Tiempo Real"
- `realtime.subtitle`: "Metricas de rendimiento de los ultimos 30 dias"
- `realtime.live`: "En vivo"
- `realtime.avgTime`: "Tiempo Promedio"
- `realtime.untilApproval`: "hasta aprobacion"
- `realtime.approvalRate`: "Tasa de Aprobacion"
- `realtime.approvedRequests`: "solicitudes aprobadas"
- `realtime.thisWeek`: "Esta Semana"
- `realtime.vsPrevious`: "vs anterior"
- `realtime.pending`: "Pendientes"
- `realtime.requireAction`: "requieren accion"
- `realtime.dailyVolume`: "Volumen Diario (ultimos 14 dias)"
- `realtime.approvalSpeed`: "Velocidad de Aprobacion (horas)"
- `realtime.goal`: "Meta"
- `realtime.average`: "Promedio"
- `realtime.noApprovalData`: "Sin datos de aprobacion"
- `realtime.statusDistribution`: "Distribucion por Estado"
- `realtime.weeklyTrend`: "Tendencia Semanal"
- `realtime.transactions`: "transacciones"
- `realtime.volume`: "volumen"
- Labels de STATUS_LABELS: se reutilizaran las claves `requests.status.*.label` ya existentes

### Detalle de claves para namespace `dataView`

Cubrira toda la pagina DataView.tsx:

- `loading`: "Cargando transaccion..."
- `notFound`: "Transaccion no encontrada"
- `statusLabels.*`: Todos los estados (created, initiated, pending, etc.)
- `header.accessGranted`: "Acceso Concedido"
- `header.kybVerified`: tooltip KYB
- `metrics.version`: "Version"
- `metrics.update`: "Actualizacion" / "Bajo demanda"
- `metrics.schema`: "campos" / "Esquema"
- `metrics.format`: "Formato"
- `tabs.description`: "Descripcion"
- `tabs.schema`: "Esquema"
- `tabs.sample`: "Muestra"
- `tabs.policies`: "Politicas de Acceso"
- `description.*`: labels de info general (Categoria, Proveedor, Custodio, Estado)
- `description.accessDuration`: texto de duracion de acceso
- `schema.title`: "Estructura de Datos"
- `schema.field/type/description`: cabeceras de tabla
- `sample.*`: titulo, registros, "Muestra no disponible", texto explicativo
- `policies.*`: Permitido, Prohibido, Obligaciones, aviso legal, T&C
- `data.*`: textos de descarga, Access Controller, ficha tecnica, licencia PDF
- `provider.*`: labels de datos de proveedor (Razon Social, CIF/NIF, etc.)
- `api.*`: detalles de conexion API
- `payloads.*`: nombres de esquemas (ESG, IoT, etc.)
- `blockchain.*`: Auditoria Blockchain
- `accessHistory.*`: titulo y descripcion del historial
- `toast.*`: mensajes de exito/error
- `noData.*`: mensajes cuando no hay datos

### Detalle tecnico

- `RequestsAnalyticsDashboard.tsx`: Se anadira `useTranslation('requests')` y se convertira `STATUS_LABELS` a una funcion dinamica `getStatusLabels(t)` reutilizando las claves existentes de `requests.status`
- `DataView.tsx`: Se anadira `useTranslation('dataView')` y se convertira `STATUS_LABELS` a funcion dinamica. El date-fns locale se importara dinamicamente segun `i18n.language`
- El locale de date-fns en RequestsAnalyticsDashboard se cambiara de `es` hardcodeado a dinamico segun el idioma activo
- Se registrara el import de `dataView` en `src/i18n.ts` para los 7 idiomas, en el bloque `resources` y en el array `ns`
