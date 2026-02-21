

## Internacionalizacion de AdminPublicationDetail.tsx - 7 idiomas

### Resumen

Crear un nuevo namespace `admin` con todas las traducciones del componente de detalle de publicacion administrativa, registrarlo en `src/i18n.ts` y refactorizar el componente para usar `useTranslation('admin')`.

---

### 1. Crear archivos JSON de traduccion (7 idiomas)

Crear `src/locales/{es,en,fr,de,it,pt,nl}/admin.json` con las siguientes claves:

| Clave | ES | EN |
|---|---|---|
| `assets.loading` | Cargando activo... | Loading asset... |
| `assets.notFound` | Activo no encontrado | Asset not found |
| `assets.back` | Volver | Back |
| `assets.asset` | Activo | Asset |
| `assets.metadata` | Metadatos del Activo | Asset Metadata |
| `assets.title` | Titulo | Title |
| `assets.description` | Descripcion | Description |
| `assets.category` | Categoria | Category |
| `assets.version` | Version | Version |
| `assets.tags` | Etiquetas | Tags |
| `assets.technicalAccess` | Acceso Tecnico | Technical Access |
| `assets.apiUrl` | URL de la API / Fuente de Datos | API URL / Data Source |
| `assets.notConfigured` | No configurada | Not configured |
| `assets.customHeaders` | Custom Headers | Custom Headers |
| `assets.technicalSchema` | Esquema Tecnico | Technical Schema |
| `assets.schemaJson` | Schema JSON | Schema JSON |
| `assets.governance` | Gobernanza y Pricing | Governance & Pricing |
| `assets.pricingModel` | Modelo de Pricing | Pricing Model |
| `assets.free` | Gratuito | Free |
| `assets.price` | Precio | Price |
| `assets.freePrice` | Gratis | Free |
| `assets.billingPeriod` | Periodo de Facturacion | Billing Period |
| `assets.publicMarketplace` | Marketplace Publico | Public Marketplace |
| `assets.yes` | Si | Yes |
| `assets.no` | No | No |
| `assets.usagePolicies` | Politicas de Uso | Usage Policies |
| `assets.governanceCert` | Certificacion de Gobernanza | Governance Certification |
| `assets.accessControlMode` | Modo de Control de Acceso | Access Control Mode |
| `assets.privateWhitelist` | PRIVADO (Whitelist activa) | PRIVATE (Active Whitelist) |
| `assets.publicBlacklist` | PUBLICO con Blacklist | PUBLIC with Blacklist |
| `assets.publicTotal` | PUBLICO Total | Fully PUBLIC |
| `assets.allowedOrgs` | Organizaciones Permitidas | Allowed Organizations |
| `assets.deniedOrgs` | Organizaciones Denegadas | Denied Organizations |
| `assets.noWallet` | Sin wallet | No wallet |
| `assets.walletCopied` | Wallet copiada | Wallet copied |
| `assets.accessTimeout` | Timeout de Acceso | Access Timeout |
| `assets.days` | dias | days |
| `assets.provider` | Proveedor | Provider |
| `assets.dates` | Fechas | Dates |
| `assets.requestDate` | Solicitud | Request |
| `assets.publishDate` | Publicacion | Publication |
| `assets.visibility` | Visibilidad | Visibility |
| `assets.publicMkt` | Marketplace Publico | Public Marketplace |
| `assets.privateOnly` | Solo Red Privada | Private Network Only |
| `assets.visible` | Visible | Visible |
| `assets.hidden` | Oculto | Hidden |
| `assets.copyToClipboard` | Copiar al portapapeles | Copy to clipboard |
| `assets.validationActions` | Acciones de Validacion | Validation Actions |
| `assets.validateBeforePublish` | Valida este activo antes de publicarlo en la red Pontus-X. | Validate this asset before publishing it on the Pontus-X network. |
| `assets.approveAction` | Aprobar y Publicar en Pontus-X | Approve & Publish on Pontus-X |
| `assets.rejectAction` | Rechazar Publicacion | Reject Publication |
| `assets.rejectTitle` | Rechazar Publicacion | Reject Publication |
| `assets.rejectDescription` | Introduce el motivo del rechazo. Este sera visible para el proveedor del dataset. | Enter the reason for rejection. This will be visible to the dataset provider. |
| `assets.rejectPlaceholder` | Motivo del rechazo o cambios solicitados al proveedor... | Rejection reason or changes requested from provider... |
| `assets.confirmReject` | Confirmar Rechazo | Confirm Rejection |
| `assets.rejectionReason` | Motivo del Rechazo | Rejection Reason |
| `assets.publishSuccess` | Activo marcado como publicado en Pontus-X | Asset marked as published on Pontus-X |
| `assets.publishError` | Error al publicar el activo | Error publishing asset |
| `assets.rejectSuccess` | Activo rechazado. El proveedor sera notificado. | Asset rejected. The provider will be notified. |
| `assets.rejectError` | Error al rechazar el activo | Error rejecting asset |
| `status.pendingValidation` | Pendiente de Validacion | Pending Validation |
| `status.published` | Publicado en Pontus-X | Published on Pontus-X |
| `status.rejected` | Rechazado | Rejected |
| `status.draft` | Borrador | Draft |
| `categories.Market` | Mercado | Market |
| `categories.Compliance` | Cumplimiento | Compliance |
| `categories.Logistics` | Logistica | Logistics |
| `categories.Finance` | Finanzas | Finance |
| `categories.Sustainability` | Sostenibilidad | Sustainability |

Las mismas claves se traduciran a FR, DE, IT, PT y NL.

---

### 2. Registrar el namespace en `src/i18n.ts`

Para cada uno de los 7 idiomas:
- Anadir la linea de import: `import {xx}Admin from './locales/{xx}/admin.json';`
- Anadir `admin: {xx}Admin` en el objeto `resources` del idioma correspondiente
- Anadir `'admin'` al array `ns`

---

### 3. Refactorizar `AdminPublicationDetail.tsx`

- Importar `useTranslation` de `react-i18next`
- Llamar `const { t } = useTranslation('admin');`
- Reemplazar todos los textos hardcodeados por llamadas a `t('assets.xxx')`
- Convertir `statusConfig` en una funcion `getStatusConfig(t)` que devuelva las etiquetas traducidas
- Para categorias, usar `t('categories.' + category, category)` con fallback al valor original
- Usar locale dinamico de date-fns segun el idioma activo (importar locales de date-fns)
- El componente `CopyField` recibira el `label` ya traducido desde el padre

---

### Detalle tecnico

**Archivos nuevos (7)**:
- `src/locales/es/admin.json`
- `src/locales/en/admin.json`
- `src/locales/fr/admin.json`
- `src/locales/de/admin.json`
- `src/locales/it/admin.json`
- `src/locales/pt/admin.json`
- `src/locales/nl/admin.json`

**Archivos modificados (2)**:
- `src/i18n.ts` - registrar namespace admin en los 7 idiomas
- `src/pages/admin/AdminPublicationDetail.tsx` - refactorizar a i18n

**Patron de date-fns dinamico**:
```typescript
import { es, enUS, fr, de, it, pt, nl } from 'date-fns/locale';
const dateLocales = { es, en: enUS, fr, de, it, pt, nl };
const currentLocale = dateLocales[i18n.language] || es;
format(date, "dd MMM yyyy HH:mm", { locale: currentLocale });
```

**Patron de statusConfig dinamico**:
```typescript
const getStatusConfig = (t) => ({
  pending_validation: { label: t('status.pendingValidation'), variant: "secondary", icon: Clock },
  available: { label: t('status.pendingValidation'), variant: "secondary", icon: Clock },
  active: { label: t('status.published'), variant: "default", icon: CheckCircle2 },
  // ...
});
```
