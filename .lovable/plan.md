

## Internacionalizacion de las 5 paginas de administracion restantes

### Resumen

Ampliar el namespace `admin` en los 7 idiomas (ES, EN, FR, DE, IT, PT, NL) con todas las etiquetas estaticas de los componentes `AdminDashboard`, `AdminTransactions`, `AdminUsers`, `AdminOrganizations` y `AdminGovernance`, y refactorizar cada componente para usar `useTranslation('admin')`.

---

### 1. Nuevas claves de traduccion

Se anadiran las siguientes secciones al namespace `admin` en los 7 archivos JSON:

**Dashboard (`dashboard.*`)**:

| Clave | ES | EN |
|---|---|---|
| `dashboard.title` | Espacio de Datos PROCUREDATA | PROCUREDATA Data Space |
| `dashboard.subtitle` | Panel de Control Maestro -- Administrado por AGILE Procurement S.L. | Master Control Panel -- Managed by AGILE Procurement S.L. |
| `dashboard.registeredOrgs` | Organizaciones Registradas | Registered Organizations |
| `dashboard.totalTransactions` | Transacciones Totales | Total Transactions |
| `dashboard.publishedAssets` | Data Assets Publicados | Published Data Assets |
| `dashboard.activityRate` | Tasa de Actividad | Activity Rate |
| `dashboard.txPerOrg` | tx/org | tx/org |
| `dashboard.txByStatus` | Distribucion por Estado de Transaccion | Transaction Status Distribution |
| `dashboard.assetsByCategory` | Distribucion de Activos por Categoria | Asset Distribution by Category |
| `dashboard.noCategory` | Sin categoria | No category |

**Transactions (`transactions.*`)**:

| Clave | ES | EN |
|---|---|---|
| `transactions.title` | Monitorizacion de Transacciones | Transaction Monitoring |
| `transactions.subtitle` | {{count}} transacciones en el espacio de datos | {{count}} transactions in the data space |
| `transactions.totalVolume` | Volumen Total | Total Volume |
| `transactions.activeRequests` | Solicitudes Activas | Active Requests |
| `transactions.revocationAlerts` | Alertas de Revocacion | Revocation Alerts |
| `transactions.searchPlaceholder` | Buscar por activo, organizacion o proposito... | Search by asset, organization or purpose... |
| `transactions.allStatuses` | Todos los estados | All statuses |
| `transactions.allOrgs` | Todas las organizaciones | All organizations |
| `transactions.allPeriods` | Todo el periodo | All time |
| `transactions.lastWeek` | Ultima semana | Last week |
| `transactions.lastMonth` | Ultimo mes | Last month |
| `transactions.last3Months` | Ultimos 3 meses | Last 3 months |
| `transactions.statusPlaceholder` | Estado | Status |
| `transactions.orgPlaceholder` | Organizacion | Organization |
| `transactions.periodPlaceholder` | Periodo | Period |
| `transactions.tableDate` | Fecha | Date |
| `transactions.tableAsset` | Activo | Asset |
| `transactions.tableProvider` | Proveedor | Provider |
| `transactions.tableConsumer` | Consumidor | Consumer |
| `transactions.tableAmount` | Importe | Amount |
| `transactions.tableStatus` | Estado | Status |
| `transactions.loading` | Cargando transacciones... | Loading transactions... |
| `transactions.noResults` | No se encontraron transacciones | No transactions found |
| `transactions.free` | Gratis | Free |
| `transactions.statusCompleted` | Completada | Completed |
| `transactions.statusApproved` | Aprobada | Approved |
| `transactions.statusInitiated` | Iniciada | Initiated |
| `transactions.statusPendingSubject` | Pend. Proveedor | Pend. Provider |
| `transactions.statusPendingHolder` | Pend. Custodio | Pend. Custodian |
| `transactions.statusDeniedSubject` | Denegada (Prov.) | Denied (Prov.) |
| `transactions.statusDeniedHolder` | Denegada (Cust.) | Denied (Cust.) |
| `transactions.statusRevoked` | Revocada | Revoked |
| `transactions.statusCancelled` | Cancelada | Cancelled |

**Users (`users.*`)**:

| Clave | ES | EN |
|---|---|---|
| `users.title` | Gestion de Usuarios | User Management |
| `users.subtitle` | {{count}} usuarios registrados · {{orphan}} sin organizacion | {{count}} registered users · {{orphan}} without organization |
| `users.searchPlaceholder` | Buscar por email o nombre... | Search by email or name... |
| `users.filterAll` | Todos los usuarios | All users |
| `users.filterWithOrg` | Con organizacion | With organization |
| `users.filterOrphan` | Sin organizacion (huerfanos) | Without organization (orphans) |
| `users.filterPlaceholder` | Filtrar usuarios | Filter users |
| `users.tableUser` | Usuario | User |
| `users.tableOrgs` | Organizaciones | Organizations |
| `users.tableRole` | Rol Global | Global Role |
| `users.tableRegistered` | Registro | Registration |
| `users.loading` | Cargando usuarios... | Loading users... |
| `users.noResults` | No se encontraron usuarios | No users found |
| `users.noOrg` | Sin organizacion | No organization |
| `users.dataSpaceOwner` | Data Space Owner | Data Space Owner |
| `users.standardUser` | Usuario Estandar | Standard User |
| `users.registered` | Registrado | Registered |
| `users.lastAccess` | Ultimo acceso | Last access |
| `users.organizations` | Organizaciones | Organizations |
| `users.noOrgAssigned` | Sin organizacion asignada | No organization assigned |
| `users.tabTransactions` | Transacciones | Transactions |
| `users.tabAudit` | Linaje de Acciones | Action Lineage |
| `users.recentTx` | {{count}} transacciones recientes | {{count}} recent transactions |
| `users.noTx` | Sin transacciones | No transactions |
| `users.actionsRecorded` | {{count}} acciones registradas | {{count}} recorded actions |
| `users.noApprovalActivity` | Sin actividad de aprobacion | No approval activity |
| `users.actionApproved` | Aprobo | Approved |
| `users.actionDenied` | Denego | Denied |
| `users.actionPreApproved` | Pre-aprobo | Pre-approved |
| `users.actionCancelled` | Cancelo | Cancelled |
| `users.cannotDelete` | No se puede eliminar | Cannot delete |
| `users.deleteReasonDSO` | Es un Data Space Owner | Is a Data Space Owner |
| `users.deleteReasonOrgs` | Pertenece a organizaciones activas | Belongs to active organizations |
| `users.deleteReasonTx` | Tiene transacciones vinculadas | Has linked transactions |
| `users.deleteUser` | Eliminar Usuario | Delete User |
| `users.deleteTitle` | Eliminar usuario | Delete user |
| `users.deleteDescription` | Se eliminara permanentemente la cuenta de | The account will be permanently deleted for |
| `users.deleteNoActivity` | Este usuario no tiene organizaciones ni transacciones vinculadas. | This user has no linked organizations or transactions. |
| `users.deleteIrreversible` | Esta accion no se puede deshacer. | This action cannot be undone. |
| `users.cancel` | Cancelar | Cancel |
| `users.deletePermanently` | Eliminar permanentemente | Delete permanently |
| `users.deleteSuccess` | Usuario eliminado correctamente | User deleted successfully |

**Organizations (`organizations.*`)**:

| Clave | ES | EN |
|---|---|---|
| `organizations.title` | Gestion de Organizaciones | Organization Management |
| `organizations.subtitle` | {{count}} organizaciones registradas en el espacio de datos | {{count}} organizations registered in the data space |
| `organizations.searchPlaceholder` | Buscar por nombre o NIF... | Search by name or tax ID... |
| `organizations.filterPlaceholder` | Filtrar por estado | Filter by status |
| `organizations.allStatuses` | Todos los estados | All statuses |
| `organizations.verified` | Verificadas | Verified |
| `organizations.pendingFilter` | Pendientes | Pending |
| `organizations.tableName` | Nombre / Wallet | Name / Wallet |
| `organizations.tableType` | Tipo | Type |
| `organizations.tableActivity` | Actividad | Activity |
| `organizations.tableRegistered` | Registro | Registration |
| `organizations.tableStatus` | Estado | Status |
| `organizations.loading` | Cargando organizaciones... | Loading organizations... |
| `organizations.noResults` | No se encontraron organizaciones | No organizations found |
| `organizations.inactive` | Inactiva | Inactive |
| `organizations.copyWallet` | Copiar wallet | Copy wallet |
| `organizations.walletCopied` | Wallet copiada al portapapeles | Wallet copied to clipboard |
| `organizations.typeConsumer` | Consumidor | Consumer |
| `organizations.typeHolder` | Custodio | Custodian |
| `organizations.typeProvider` | Proveedor | Provider |
| `organizations.verifiedBadge` | Verificada | Verified |
| `organizations.pendingBadge` | Pendiente | Pending |
| `organizations.demo` | Demo | Demo |
| `organizations.tabIdentity` | Identidad | Identity |
| `organizations.tabAssets` | Activos | Assets |
| `organizations.tabTeam` | Equipo | Team |
| `organizations.tabFinance` | Financiero | Financial |
| `organizations.legalIdentity` | Identidad Legal | Legal Identity |
| `organizations.docType` | Tipo de Documento | Document Type |
| `organizations.vatId` | VAT ID (CIF) | VAT ID |
| `organizations.docNumber` | Numero de Documento | Document Number |
| `organizations.sector` | Sector | Sector |
| `organizations.notSpecified` | No especificado | Not specified |
| `organizations.deltaDAOReg` | Registro DeltaDAO | DeltaDAO Registration |
| `organizations.registered` | Registrada | Registered |
| `organizations.notRegistered` | No registrada | Not registered |
| `organizations.hqAddress` | Direccion de Sede | Headquarters Address |
| `organizations.street` | Calle | Street |
| `organizations.city` | Ciudad | City |
| `organizations.postalCode` | Codigo Postal | Postal Code |
| `organizations.country` | Pais | Country |
| `organizations.notAvailable` | No disponible | Not available |
| `organizations.digitalIdentity` | Identidad Digital (Web3) | Digital Identity (Web3) |
| `organizations.did` | DID (Digital Identity) | DID (Digital Identity) |
| `organizations.notAssigned` | No asignado | Not assigned |
| `organizations.walletAddress` | Wallet Address | Wallet Address |
| `organizations.notAssignedF` | No asignada | Not assigned |
| `organizations.verificationSource` | Fuente de Verificacion | Verification Source |
| `organizations.notVerified` | No verificada | Not verified |
| `organizations.datasetsPublished` | {{count}} datasets publicados | {{count}} published datasets |
| `organizations.noAssets` | Sin activos registrados | No registered assets |
| `organizations.linkedUsers` | {{count}} usuarios vinculados | {{count}} linked users |
| `organizations.noUsers` | Sin usuarios registrados | No registered users |
| `organizations.noName` | Sin nombre | No name |
| `organizations.recentTx` | {{count}} transacciones recientes | {{count}} recent transactions |
| `organizations.noFinance` | Sin actividad financiera | No financial activity |
| `organizations.purchase` | Compra | Purchase |
| `organizations.sale` | Venta | Sale |
| `organizations.disableOrg` | Deshabilitar Organizacion | Disable Organization |
| `organizations.deleteOrg` | Eliminar Organizacion | Delete Organization |
| `organizations.deleteTitle` | Eliminar organizacion | Delete organization |
| `organizations.disableTitle` | Deshabilitar organizacion | Disable organization |
| `organizations.deleteDesc` | Esta organizacion no tiene activos ni transacciones. Se eliminara permanentemente junto con todos sus usuarios vinculados. | This organization has no assets or transactions. It will be permanently deleted along with all linked users. |
| `organizations.deleteIrreversible` | Esta accion no se puede deshacer. | This action cannot be undone. |
| `organizations.disableDesc` | No se puede eliminar porque tiene activos publicados y transacciones realizadas. Deseas deshabilitarla en su lugar? La organizacion quedara marcada como inactiva. | Cannot delete because it has published assets and transactions. Do you want to disable it instead? The organization will be marked as inactive. |
| `organizations.cancel` | Cancelar | Cancel |
| `organizations.deletePermanently` | Eliminar permanentemente | Delete permanently |
| `organizations.disable` | Deshabilitar | Disable |
| `organizations.disableSuccess` | ha sido deshabilitada | has been disabled |
| `organizations.disableError` | Error al deshabilitar la organizacion | Error disabling organization |
| `organizations.deleteSuccess` | ha sido eliminada permanentemente | has been permanently deleted |
| `organizations.deleteFKError` | No se puede eliminar: Esta organizacion tiene actividad historica que debe preservarse. Usa Deshabilitar en su lugar. | Cannot delete: This organization has historical activity that must be preserved. Use Disable instead. |
| `organizations.deleteError` | Error al eliminar | Error deleting |

**Governance (`governance.*`)**:

| Clave | ES | EN |
|---|---|---|
| `governance.title` | Gobernanza del Ecosistema | Ecosystem Governance |
| `governance.subtitle` | Configuracion de identidad, protocolos y servicios de la red PROCUREDATA | Identity, protocol and service configuration for the PROCUREDATA network |
| `governance.emergencyOps` | Operaciones de Emergencia | Emergency Operations |
| `governance.emergencyDesc` | Controles criticos que afectan a toda la plataforma | Critical controls affecting the entire platform |
| `governance.maintenanceMode` | Modo Mantenimiento Global | Global Maintenance Mode |
| `governance.maintenanceDesc` | Desactiva publicaciones y transacciones. Muestra un banner persistente en toda la aplicacion. | Disables publications and transactions. Shows a persistent banner across the application. |
| `governance.blockchainConfig` | Configuracion de Red Blockchain | Blockchain Network Configuration |
| `governance.blockchainDesc` | URL del nodo RPC que utiliza toda la plataforma para conectarse a Pontus-X | RPC node URL used by the entire platform to connect to Pontus-X |
| `governance.selectNetwork` | Seleccionar red | Select network |
| `governance.connected` | Conectado | Connected |
| `governance.noConnection` | Sin conexion | No connection |
| `governance.checking` | Verificando... | Checking... |
| `governance.save` | Guardar | Save |
| `governance.identityConfig` | Configuracion de Identidad | Identity Configuration |
| `governance.identityDesc` | Controles de verificacion exigidos a los participantes del ecosistema | Verification controls required for ecosystem participants |
| `governance.emailVerification` | Verificacion de Email | Email Verification |
| `governance.emailVerificationDesc` | Exigir correo validado para publicar | Require validated email to publish |
| `governance.kycLabel` | KYC (Persona Fisica) | KYC (Individual) |
| `governance.kycDesc` | Activar validacion de identidad para usuarios | Enable identity validation for users |
| `governance.kybLabel` | KYB (Empresa) | KYB (Business) |
| `governance.kybDesc` | Exigir validacion registral de la organizacion | Require registry validation for the organization |
| `governance.deltaDAOLabel` | Onboarding DeltaDAO | DeltaDAO Onboarding |
| `governance.deltaDAODesc` | Exigir registro verificado en el portal de DeltaDAO para dar de alta la organizacion | Require verified registration on the DeltaDAO portal to register the organization |
| `governance.ecosystemStatus` | Estado del Ecosistema | Ecosystem Status |
| `governance.ecosystemStatusDesc` | Modo de operacion de la plataforma | Platform operation mode |
| `governance.statusActive` | Activo | Active |
| `governance.statusMaintenance` | Mantenimiento | Maintenance |
| `governance.assetPolicies` | Politicas de Activos | Asset Policies |
| `governance.assetPoliciesDesc` | Control de publicacion y visibilidad de activos en el marketplace | Publication and visibility control for marketplace assets |
| `governance.autoApproval` | Aprobacion Automatica | Auto Approval |
| `governance.autoApprovalDesc` | Publicar activos instantaneamente sin revision | Publish assets instantly without review |
| `governance.catalogVisibility` | Visibilidad del Catalogo | Catalog Visibility |
| `governance.catalogVisibilityDesc` | Quien puede ver los activos del marketplace | Who can see marketplace assets |
| `governance.publicAll` | Publico (Visible para todos) | Public (Visible to all) |
| `governance.privateOnly` | Privado (Solo registrados) | Private (Registered only) |
| `governance.economicGov` | Gobernanza Economica | Economic Governance |
| `governance.economicGovDesc` | Configuracion de comisiones y parametros economicos del ecosistema | Fee configuration and economic parameters for the ecosystem |
| `governance.ecosystemFee` | Comision del Ecosistema (%) | Ecosystem Fee (%) |
| `governance.ecosystemFeeDesc` | Porcentaje aplicado a cada transaccion del marketplace para el mantenimiento del ecosistema | Percentage applied to each marketplace transaction for ecosystem maintenance |
| `governance.ecosystemFeeNote` | Este valor se aplicara en el calculo del coste total en el carrito de compra y en las liquidaciones a proveedores. | This value will be applied in the total cost calculation in the shopping cart and provider settlements. |
| `governance.feeError` | El porcentaje debe estar entre 0 y 100 | Percentage must be between 0 and 100 |
| `governance.ecosystemState` | Estado del Ecosistema | Ecosystem Status |
| `governance.verify` | Verificar | Verify |
| `governance.serviceAvailability` | Disponibilidad de los servicios federados | Federated service availability |
| `governance.operational` | Operativo | Operational |
| `governance.down` | Caido | Down |
| `governance.eventLog` | Registro de Eventos del Ecosistema | Ecosystem Event Log |
| `governance.eventLogDesc` | Ultimos eventos de los servicios de red federados | Latest events from federated network services |
| `governance.logBasic` | Basico | Basic |
| `governance.logOperational` | Operativo | Operational |
| `governance.logDebug` | Debug | Debug |
| `governance.logBasicDesc` | Solo errores criticos | Critical errors only |
| `governance.logOperationalDesc` | Errores + Registros | Errors + Records |
| `governance.logDebugDesc` | Todo el rastro del sistema | Full system trace |
| `governance.export` | Exportar | Export |
| `governance.refresh` | Refrescar | Refresh |
| `governance.loadingConfig` | Cargando configuracion... | Loading configuration... |
| `governance.loadingLogs` | Cargando registros... | Loading logs... |
| `governance.noLogs` | No hay registros de eventos | No event records |
| `governance.exportSuccess` | Logs exportados correctamente | Logs exported successfully |
| `governance.exportError` | No hay registros para exportar | No records to export |
| `governance.configError` | Error actualizando configuracion | Error updating configuration |
| `governance.feeUpdateError` | Error guardando comision | Error saving fee |
| `governance.feeUpdateSuccess` | Comision del ecosistema actualizada | Ecosystem fee updated |
| `governance.verbosityUpdateSuccess` | Nivel de detalle actualizado | Verbosity level updated |
| `governance.verbosityUpdateError` | Error guardando nivel de detalle | Error saving verbosity level |
| `governance.rpcSaveError` | Error guardando configuracion de red | Error saving network configuration |
| `governance.rpcSaveSuccess` | Configuracion de red actualizada correctamente | Network configuration updated successfully |
| `governance.loading` | Cargando... | Loading... |

Las traducciones a FR, DE, IT, PT, NL seguiran el mismo patron con las traducciones correspondientes en cada idioma.

---

### 2. Archivos modificados

**7 archivos JSON** (ampliacion con nuevas secciones):
- `src/locales/{es,en,fr,de,it,pt,nl}/admin.json`

**5 componentes**:
- `src/pages/admin/AdminDashboard.tsx`
- `src/pages/admin/AdminTransactions.tsx`
- `src/pages/admin/AdminUsers.tsx`
- `src/pages/admin/AdminOrganizations.tsx`
- `src/pages/admin/AdminGovernance.tsx`

---

### 3. Refactorizacion de cada componente

Cada componente seguira el mismo patron:

1. Importar `useTranslation` de `react-i18next`
2. Llamar `const { t, i18n } = useTranslation('admin');`
3. Reemplazar todos los textos estaticos por llamadas `t('seccion.clave')`
4. Usar `formatDate` de `@/lib/i18nFormatters` con `i18n.language` para fechas
5. Usar `toLocaleString(i18n.language)` para precios y numeros
6. Convertir objetos `statusConfig` estaticos en funciones `getStatusConfig(t)` que devuelvan etiquetas traducidas

**AdminDashboard.tsx**:
- KPI cards: titulos traducidos via `t('dashboard.*')`
- Chart titles: `t('dashboard.txByStatus')`, `t('dashboard.assetsByCategory')`
- Categoria fallback: `t('dashboard.noCategory')` en lugar de "Sin categoria"
- Nota: las etiquetas del grafico de barras vendran de `getStatusLabel` que debera usar traduccion, o se usara la clave del status directamente con `t('transactions.status*')`

**AdminTransactions.tsx**:
- `statusConfig` se convierte en `getStatusConfig(t)` con las claves `transactions.status*`
- Filtros, placeholders, cabeceras de tabla, mensajes de carga/vacio
- Fechas con locale dinamico
- Precios con `toLocaleString(i18n.language)`

**AdminUsers.tsx**:
- Cabeceras, filtros, badges, mensajes de carga/vacio
- Panel de detalle del usuario (Sheet): fechas, organizaciones, tabs, audit trail
- Acciones de audit (approve, deny, pre_approve, cancel) traducidas
- Razon de no-eliminacion traducida
- Dialogo de confirmacion de eliminacion

**AdminOrganizations.tsx**:
- Cabeceras, filtros, badges de tipo y estado
- Panel de detalle (Sheet): 4 tabs (Identidad, Activos, Equipo, Financiero)
- Labels del InfoField (Tipo de Documento, Calle, Ciudad, etc.)
- Dialogo de confirmacion de eliminacion/deshabilitacion
- Toast messages

**AdminGovernance.tsx** (el mas extenso):
- 6 tarjetas: Emergencia, Blockchain, Identidad, Politicas de Activos, Economia, Estado del Ecosistema
- Registro de Eventos: cabeceras, verbosidad, botones
- Labels de los switches y selects
- Descripciones de cada control
- Toast messages (success/error)
- CSV export header traducido

---

### 4. Consideraciones especiales

- **Datos de BD no se traducen**: nombres de organizaciones, emails, wallets, contenido de logs (campo `message`), propositos de transaccion -- todo esto permanece tal cual viene de la base de datos.
- **Categorias y estados**: se traducen usando las claves ya existentes en `categories.*` y `status.*`, o las nuevas `transactions.status*`.
- **Fechas**: Se usara el patron ya establecido con `formatDate` y locales de date-fns (`es, enUS, fr, de, it, pt, nl`).
- **Labels del `logGovernanceEvent`**: Los mensajes de governance logs se escriben en la BD en el idioma actual del usuario (esto es coherente con el patron actual; el log registra lo que hizo el admin).

