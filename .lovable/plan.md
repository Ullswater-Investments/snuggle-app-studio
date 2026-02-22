

## Internacionalizacion de la pagina AssetDetailPage (/catalog/asset/:id)

### Resumen

Se identifican ~60 cadenas de texto estatico hardcodeadas en `src/pages/ProductDetail.tsx` y `src/components/asset-detail/AssetDetailChatAgent.tsx`. Se agregara una nueva seccion `assetDetail` al namespace `catalogDetails` existente (ya registrado en `i18n.ts`) en los 7 idiomas (ES, EN, FR, DE, IT, PT, NL).

Los datos que provienen de la BD (nombre del activo, descripcion, proveedor, esquema, politicas, etc.) se mantienen tal cual.

---

### 1. Nueva seccion `assetDetail` en `catalogDetails.json`

Se anadira al objeto `common` de cada idioma las siguientes claves:

```text
common.assetDetail.sustainableData          -> "Sustainable Data" / "Datos Sostenibles" ...
common.assetDetail.review                   -> "reseña" (singular)
common.assetDetail.reviews                  -> "reseñas" (plural)
common.assetDetail.noRating                 -> "—"
common.assetDetail.defaultDescription       -> "Este dataset proporciona informacion critica..."
common.assetDetail.soldAndOperatedBy        -> "Vendido y operado por"
common.assetDetail.verifiedKYB              -> "Verificado KYB"

-- Bloque 2: Metricas
common.assetDetail.metrics.version          -> "Version"
common.assetDetail.metrics.frequency        -> "Frecuencia"
common.assetDetail.metrics.realTime         -> "Tiempo Real"
common.assetDetail.metrics.fields           -> "N.º Campos"
common.assetDetail.metrics.format           -> "Formato"

-- Bloque 3: Tabs
common.assetDetail.tabs.schema              -> "Esquema"
common.assetDetail.tabs.policies            -> "Politicas"
common.assetDetail.tabs.sample              -> "Muestra"
common.assetDetail.tabs.aiAssistant         -> "Asistente IA"
common.assetDetail.tabs.reviews             -> "Resenas"

-- Tab Esquema
common.assetDetail.schemaDefinition         -> "Definicion del Esquema"
common.assetDetail.dataStructure            -> "Estructura de datos del producto ({{count}} campos)"
common.assetDetail.schemaNotAvailable       -> "Esquema no disponible"
common.assetDetail.schemaNotAvailableDesc   -> "Este activo no tiene un esquema tecnico definido."

-- Tab Politicas
common.assetDetail.permissions              -> "Permisos"
common.assetDetail.prohibitions             -> "Prohibiciones"
common.assetDetail.obligations              -> "Obligaciones"
common.assetDetail.termsAndConditions       -> "Terminos y Condiciones"
common.assetDetail.viewFullDocument         -> "Consultar documento completo"

-- Tab Muestra
common.assetDetail.sampleWarningTitle       -> "MUESTRA DE DATOS"
common.assetDetail.sampleWarningDesc        -> "Estos registros estan anonimizados..."
common.assetDetail.dataSandbox              -> "Data Sandbox - Vista Previa"
common.assetDetail.sampleExplore            -> "Explora una muestra de {{count}} registros..."
common.assetDetail.sampleNotAvailable       -> "Muestra no disponible"
common.assetDetail.sampleNotAvailableDesc   -> "El proveedor no ha proporcionado una muestra..."

-- Tab Resenas
common.assetDetail.verifiedReviews          -> "Resenas verificadas ({{count}})"
common.assetDetail.leaveReview              -> "Deja tu resena"
common.assetDetail.ratingLabel              -> "Puntuacion"
common.assetDetail.commentLabel             -> "Comentario (opcional)"
common.assetDetail.commentPlaceholder       -> "Describe tu experiencia con este dataset..."
common.assetDetail.publishReview            -> "Publicar Resena"
common.assetDetail.publishing               -> "Publicando..."
common.assetDetail.alreadyReviewed          -> "Ya has publicado tu resena para este activo."
common.assetDetail.noReviewsYet             -> "Aun no hay resenas"
common.assetDetail.onlyVerifiedOrgs         -> "Solo las organizaciones que han adquirido..."

-- Sidebar
common.assetDetail.commercialLicense        -> "Licencia de uso comercial"
common.assetDetail.free                     -> "Gratis"
common.assetDetail.perMonth                 -> "mes"
common.assetDetail.perYear                  -> "ano"
common.assetDetail.secureTransaction        -> "Transaccion segura via Smart Contract..."
common.assetDetail.walletConnected          -> "Wallet conectada - Listo para pagar con EUROe"
common.assetDetail.connectWallet            -> "Conecta tu wallet para pagar con EUROe"
common.assetDetail.exploreDataset           -> "Explorar Dataset"
common.assetDetail.requestsNotAvailable     -> "Solicitudes no disponibles en demo"
common.assetDetail.buyNow                   -> "Comprar Ahora"
common.assetDetail.requestAccess            -> "Solicitar Acceso"
common.assetDetail.downloadTechSheet        -> "Descargar Ficha Tecnica"
common.assetDetail.provider                 -> "Proveedor"
common.assetDetail.version                  -> "Version"
common.assetDetail.status                   -> "Estado"
common.assetDetail.available                -> "Disponible"
common.assetDetail.customLicense            -> "Necesitas una licencia personalizada? Contactar ventas"

-- Pantallas de estado
common.assetDetail.pendingValidation        -> "Activo en proceso de validacion tecnica"
common.assetDetail.pendingValidationDesc    -> "Un administrador del ecosistema esta verificando..."
common.assetDetail.pendingReview            -> "Pendiente de revision"
common.assetDetail.accessDenied             -> "Acceso Denegado"
common.assetDetail.accessDeniedDesc         -> "Tu organizacion se encuentra en la lista de exclusion..."
common.assetDetail.backToCatalog            -> "Volver al Catalogo"
common.assetDetail.notFound                 -> "Producto no encontrado"

-- Toasts
common.assetDetail.toastDemoOnly            -> "Detalle de activos solo disponible para organizaciones registradas."
common.assetDetail.toastAccessDenied        -> "Acceso denegado: tu organizacion no tiene permisos..."
common.assetDetail.toastLoginRequired       -> "Inicia sesion para continuar"
common.assetDetail.toastLoginDesc           -> "Necesitas una cuenta para adquirir datasets"
common.assetDetail.toastGoToLogin           -> "Ir a Login"
common.assetDetail.toastConnectWallet       -> "Conecta tu wallet para comprar"
common.assetDetail.toastConnectWalletDesc   -> "Los productos de pago requieren una wallet Web3..."
common.assetDetail.toastConnectWalletBtn    -> "Conectar Wallet"
common.assetDetail.toastWalletConnected     -> "Wallet conectada"
common.assetDetail.toastWalletConnectedDesc -> "Ahora puedes continuar con la compra"
common.assetDetail.toastWalletError         -> "Error al conectar wallet"
common.assetDetail.toastReviewSuccess       -> "Resena publicada correctamente"
common.assetDetail.toastReviewError         -> "Error al publicar la resena"
common.assetDetail.toastSheetDownloaded     -> "Ficha tecnica descargada"
```

---

### 2. Archivos a modificar

| Archivo | Accion |
|---|---|
| `src/locales/es/catalogDetails.json` | Agregar seccion `common.assetDetail` en espanol |
| `src/locales/en/catalogDetails.json` | Agregar seccion `common.assetDetail` en ingles |
| `src/locales/fr/catalogDetails.json` | Agregar seccion `common.assetDetail` en frances |
| `src/locales/de/catalogDetails.json` | Agregar seccion `common.assetDetail` en aleman |
| `src/locales/it/catalogDetails.json` | Agregar seccion `common.assetDetail` en italiano |
| `src/locales/pt/catalogDetails.json` | Agregar seccion `common.assetDetail` en portugues |
| `src/locales/nl/catalogDetails.json` | Agregar seccion `common.assetDetail` en neerlandes |
| `src/pages/ProductDetail.tsx` | Importar `useTranslation`, reemplazar ~60 cadenas hardcodeadas por `t('catalogDetails:common.assetDetail.xxx')` |
| `src/components/asset-detail/AssetDetailChatAgent.tsx` | Internacionalizar labels estaticos del componente de chat (placeholder, titulo, sugerencias) |

---

### 3. Cambios en ProductDetail.tsx

Al inicio del componente:
```typescript
import { useTranslation } from "react-i18next";
// ...
const { t, i18n } = useTranslation('catalogDetails');
```

Ejemplos de reemplazo (no exhaustivo):

| Linea actual | Reemplazo |
|---|---|
| `Sustainable Data` (linea 472) | `t('common.assetDetail.sustainableData')` |
| `'reseña' : 'reseñas'` (linea 482) | `t('common.assetDetail.review')` / `t('common.assetDetail.reviews')` |
| `"Vendido y operado por"` (linea 496) | `t('common.assetDetail.soldAndOperatedBy')` |
| `"Version"` (linea 516) | `t('common.assetDetail.metrics.version')` |
| `"Frecuencia"` (linea 521) | `t('common.assetDetail.metrics.frequency')` |
| `"Tiempo Real"` (linea 522) | `t('common.assetDetail.metrics.realTime')` |
| `"N.º Campos"` (linea 526) | `t('common.assetDetail.metrics.fields')` |
| `"Formato"` (linea 531) | `t('common.assetDetail.metrics.format')` |
| Tab labels (lineas 543-559) | `t('common.assetDetail.tabs.schema')`, etc. |
| `"Esquema no disponible"` (linea 604) | `t('common.assetDetail.schemaNotAvailable')` |
| `"Permisos"` / `"Prohibiciones"` / `"Obligaciones"` | `t('common.assetDetail.permissions')`, etc. |
| `"Gratis"` (linea 830) | `t('common.assetDetail.free')` |
| `"Comprar Ahora"` (linea 879) | `t('common.assetDetail.buyNow')` |
| `"Solicitar Acceso"` (linea 882) | `t('common.assetDetail.requestAccess')` |
| Todos los `toast()` con texto en espanol | Reemplazar con claves `t()` correspondientes |
| `toLocaleDateString('es-ES')` (linea 743) | `toLocaleDateString(i18n.language)` |
| `Intl.NumberFormat('es-ES', ...)` (linea 821) | `Intl.NumberFormat(i18n.language, ...)` |

---

### 4. Cambios en AssetDetailChatAgent.tsx

Labels a internacionalizar:
- Titulo "Pregunta al Asistente IA" 
- Badge con DID truncado (label "Activo")
- Placeholder "Pregunta sobre este dataset..."
- Mensaje inicial de ARIA
- Las 4 preguntas sugeridas
- Warnings del ChatGuard

Se anadiran claves adicionales bajo `common.assetDetail.chat`:
```text
common.assetDetail.chat.title            -> "Pregunta al Asistente IA"
common.assetDetail.chat.placeholder      -> "Pregunta sobre este dataset..."
common.assetDetail.chat.greeting         -> "Hola! Soy tu Asistente IA experto..."
common.assetDetail.chat.q1 / q2 / q3 / q4 -> Las 4 preguntas sugeridas
```

---

### 5. Formato de fechas y numeros

- `toLocaleDateString('es-ES')` se reemplazara por `toLocaleDateString(i18n.language)` para que las fechas se adapten al idioma activo.
- `Intl.NumberFormat('es-ES', ...)` se reemplazara por `Intl.NumberFormat(i18n.language, ...)`.

---

### 6. Resumen tecnico

| Aspecto | Detalle |
|---|---|
| Archivos de locales modificados | 7 (uno por idioma) |
| Archivos de componentes modificados | 2 (`ProductDetail.tsx`, `AssetDetailChatAgent.tsx`) |
| Namespace utilizado | `catalogDetails` (ya registrado en `i18n.ts`) |
| Cambios en BD | Ninguno |
| Nuevas dependencias | Ninguna |
| Texto de BD | Se mantiene sin traducir (viene dinamico del backend) |

