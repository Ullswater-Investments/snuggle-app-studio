
## Correcciones para la vista de Reportes y Topbar

### 1. Corregir z-index del Topbar en AppLayout (superposicion)

**Archivo:** `src/components/AppLayout.tsx`

- Linea 33: Cambiar `z-10` a `z-50` en el `<header>` del AppLayout
- Cambiar `bg-background/95 backdrop-blur` a `bg-background` para fondo totalmente opaco

Esto evita que los selectores de fecha y botones de exportacion pasen por encima del topbar al hacer scroll.

### 2. Metricas de Rendimiento con datos reales y logica "Sin datos"

**Archivo:** `src/pages/Reports.tsx`

La seccion de metricas (lineas 688-750) ya usa el RPC `get_org_kpis` que calcula `approval_rate`, `avg_time_hours`, `compliance_percent` y `total_volume` desde la base de datos. Los cambios seran:

**a) Tasa de Aprobacion (linea 706):**
- Cambiar `{kpis?.approval_rate ?? 0}%` a mostrar `t("charts.noData")` cuando `kpis` es null o `total_volume` es 0

**b) Tiempo Promedio (lineas 721-725):**
- Ya muestra `'-'` como fallback; cambiar a `t("charts.noData")` cuando no hay datos

**c) Cumplimiento (linea 740):**
- Cambiar `{kpis?.compliance_percent ?? 0}%` a `t("charts.noData")` cuando no hay datos reales

**d) KPI Cards superiores (lineas 428-502):**
- Gasto Total: mostrar `t("charts.noData")` si `totalGasto === 0` y no hay transacciones
- Ingresos: misma logica con `totalIngreso`
- Datasets Activos: mostrar `t("charts.noData")` si `datasetsActivos === 0`
- Eficiencia: mostrar `t("charts.noData")` si no hay kpis

### 3. Agregar clave de traduccion para "Sin datos" en metricas

**Archivos de traduccion (7 idiomas):** Verificar que `charts.noData` ya existe en todos los idiomas (ya esta presente en ES, EN, DE). Se usara esa misma clave para las metricas vacias.

### Archivos a modificar (2 total)

1. `src/components/AppLayout.tsx` - z-index y opacidad del header
2. `src/pages/Reports.tsx` - Logica de estado vacio en metricas y KPIs
