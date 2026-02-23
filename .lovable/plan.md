

## Internacionalizar /analytics (SellerAnalytics)

El componente `src/pages/SellerAnalytics.tsx` tiene aproximadamente 30 cadenas hardcodeadas en espanol. Ya existe el namespace `analytics` con algunas claves, pero faltan muchas que el componente necesita. Ademas, el formateo de fechas usa `es` fijo de date-fns en lugar de adaptarse al idioma activo.

### Cadenas a internacionalizar

| Cadena actual | Clave i18n |
|---|---|
| "Seller Studio" | `title` (ya existe) |
| "Analitica de rendimiento de tus activos de datos." | `subtitle` (ya existe, ajustar valor ES) |
| "Acceso Restringido" | `restricted.title` (ya existe) |
| "Esta seccion esta reservada para Vendedores de Datos y Data Holders." | `restricted.description` (ya existe) |
| "Ingresos Totales" | `kpis.revenue` (ya existe) |
| "vs mes anterior" | **nuevo** `kpis.vsPreviousMonth` |
| "Ventas Completadas" | **nuevo** `kpis.completedSales` |
| "Ultimos 6 meses" | **nuevo** `kpis.last6Months` |
| "Clientes Unicos" | **nuevo** `kpis.uniqueCustomers` |
| "Compradores activos" | **nuevo** `kpis.activeBuyers` |
| "Rating Promedio" | **nuevo** `kpis.averageRating` |
| "Basado en X resenas" | **nuevo** `kpis.basedOnReviews` (interpolacion `{{count}}`) |
| "Ingresos y Ventas Mensuales" | **nuevo** `charts.monthlyRevenueSales` |
| "Evolucion de los ultimos 6 meses." | **nuevo** `charts.last6MonthsEvolution` |
| "Ingresos" (tooltip/legend) | `kpis.revenue` reutilizado |
| "Ventas" (tooltip/legend) | `kpis.totalSales` reutilizado o **nuevo** `charts.sales` |
| "Ingresos (EUR)" (legend name) | **nuevo** `charts.revenueEur` |
| "Sin datos de ventas aun" | `empty.title` / **nuevo** `charts.noSalesData` |
| "Top Productos por Ingresos" | `charts.topProducts` (ya existe, ajustar) |
| "Rendimiento de tus activos mas vendidos." | **nuevo** `charts.topProductsDescription` |
| "Sin productos vendidos aun" | **nuevo** `charts.noProductsSold` |
| "Top 5 Clientes" | **nuevo** `customers.top5` |
| "Tus mejores compradores por volumen de transacciones." | **nuevo** `customers.description` |
| "compra" / "compras" | **nuevo** `customers.purchase` / `customers.purchases` |
| "Volumen total" | **nuevo** `customers.totalVolume` |
| "Aun no tienes clientes registrados." | **nuevo** `customers.noCustomers` |
| "Las ventas completadas apareceran aqui." | **nuevo** `customers.salesWillAppear` |
| "Producto Desconocido" | **nuevo** `charts.unknownProduct` |
| "Cliente Desconocido" | **nuevo** `customers.unknownCustomer` |

### Cambio de locale en date-fns

Actualmente usa `import { es } from "date-fns/locale"` fijo. Se cambiara a un mapeo dinamico basado en `i18n.language` para que los nombres de mes se adapten al idioma activo.

### Cambio de formateo de moneda

`new Intl.NumberFormat('es-ES', ...)` se cambiara a `new Intl.NumberFormat(i18n.language, ...)`.

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/SellerAnalytics.tsx` | Anadir `useTranslation('analytics')`, reemplazar ~30 strings, locale dinamico en date-fns, locale dinamico en NumberFormat |
| `src/locales/es/analytics.json` | Anadir ~18 claves nuevas (kpis, charts, customers) |
| `src/locales/en/analytics.json` | Idem en ingles |
| `src/locales/fr/analytics.json` | Idem en frances |
| `src/locales/de/analytics.json` | Idem en aleman |
| `src/locales/it/analytics.json` | Idem en italiano |
| `src/locales/pt/analytics.json` | Idem en portugues |
| `src/locales/nl/analytics.json` | Idem en neerlandes |

### Detalles tecnicos

- Se usara `useTranslation('analytics')` ya que el namespace esta registrado en `src/i18n.ts`.
- Para date-fns se importaran los locales necesarios y se creara un mapa: `{ es, en: enUS, fr, de, it, pt, nl }`.
- La interpolacion para "Basado en X resenas" sera: `t('kpis.basedOnReviews', { count: reviews?.length || 0 })`.
- Para "compra/compras" se usara logica condicional: `t(count === 1 ? 'customers.purchase' : 'customers.purchases')`.

