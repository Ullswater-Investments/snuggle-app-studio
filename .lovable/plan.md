

## Internacionalizacion de AdminPublications y AdminSidebar

### Resumen

Ampliar el namespace `admin` existente en los 7 idiomas con las claves necesarias para la pagina de listado de publicaciones y la barra lateral de administracion, y refactorizar ambos componentes para usar `useTranslation('admin')`.

---

### 1. Nuevas claves de traduccion

Se anadiran las siguientes claves al namespace `admin` en los 7 archivos JSON:

**Sidebar (`sidebar.*`)**:

| Clave | ES | EN |
|---|---|---|
| `sidebar.title` | AGILE Admin | AGILE Admin |
| `sidebar.subtitle` | Panel de Control | Control Panel |
| `sidebar.administration` | Administracion | Administration |
| `sidebar.navigation` | Navegacion | Navigation |
| `sidebar.backToPortal` | Volver al Portal | Back to Portal |
| `sidebar.globalOverview` | Resumen Global | Global Overview |
| `sidebar.orgManagement` | Gestion de Organizaciones | Organization Management |
| `sidebar.userManagement` | Gestion de Usuarios | User Management |
| `sidebar.assetValidation` | Validacion de Activos | Asset Validation |
| `sidebar.transactionMonitoring` | Monitorizacion de Transacciones | Transaction Monitoring |
| `sidebar.ecosystemGovernance` | Gobernanza del Ecosistema | Ecosystem Governance |

**Publications list (`publications.*`)**:

| Clave | ES | EN |
|---|---|---|
| `publications.title` | Validacion de Activos | Asset Validation |
| `publications.subtitle` | {{count}} activos en el espacio de datos | {{count}} assets in the data space |
| `publications.pendingValidation` | Pendientes de Validacion | Pending Validation |
| `publications.publishedPontus` | Publicados en Pontus-X | Published on Pontus-X |
| `publications.rejected` | Rechazados | Rejected |
| `publications.searchPlaceholder` | Buscar por nombre de activo o proveedor... | Search by asset name or provider... |
| `publications.allStatuses` | Todos los estados | All statuses |
| `publications.inValidation` | En Validacion | In Validation |
| `publications.pendingReview` | Pendiente de Revision | Pending Review |
| `publications.pending` | Pendiente | Pending |
| `publications.published` | Publicado | Published |
| `publications.allProviders` | Todos los proveedores | All providers |
| `publications.statusPlaceholder` | Estado | Status |
| `publications.providerPlaceholder` | Proveedor | Provider |
| `publications.tableAsset` | Activo | Asset |
| `publications.tableProvider` | Proveedor | Provider |
| `publications.tableCategory` | Categoria | Category |
| `publications.tableDate` | Fecha Solicitud | Request Date |
| `publications.tablePrice` | Precio | Price |
| `publications.tableStatus` | Estado | Status |
| `publications.loading` | Cargando activos... | Loading assets... |
| `publications.noResults` | No se encontraron activos | No assets found |
| `publications.freePrice` | Gratis | Free |

Tambien se ampliara `status` con las variantes de la lista:

| Clave | ES | EN |
|---|---|---|
| `status.inValidation` | En Validacion | In Validation |
| `status.pendingReview` | Pendiente de Revision | Pending Review |
| `status.pending` | Pendiente | Pending |
| `status.published` | Publicado | Published |

Las traducciones para FR, DE, IT, PT y NL seguiran el mismo patron.

---

### 2. Archivos modificados

**7 archivos JSON** (solo ampliacion, sin cambiar las claves existentes):
- `src/locales/{es,en,fr,de,it,pt,nl}/admin.json`

**2 componentes**:
- `src/pages/admin/AdminPublications.tsx`
- `src/components/admin/AdminSidebar.tsx`

---

### 3. Refactorizacion de AdminPublications.tsx

- Importar `useTranslation` y `useI18n` (para `i18n.language`).
- Llamar `const { t, i18n } = useTranslation('admin');`.
- Convertir `statusConfig` en `getStatusConfig(t)` con etiquetas traducidas.
- Reemplazar todos los textos hardcoded por claves `t('publications.*')`.
- Usar locale dinamico de `date-fns` para las fechas de la tabla.
- Formatear precios con `toLocaleString(i18n.language)` en lugar de `"es-ES"` fijo.

---

### 4. Refactorizacion de AdminSidebar.tsx

- Importar `useTranslation` de `react-i18next`.
- Llamar `const { t } = useTranslation('admin');`.
- Convertir `adminMenuItems` en una funcion `getAdminMenuItems(t)` que devuelva los items con titulos traducidos.
- Reemplazar los textos del header ("AGILE Admin", "Panel de Control"), las etiquetas de grupo ("Administracion", "Navegacion") y el enlace "Volver al Portal" por llamadas a `t('sidebar.*')`.

