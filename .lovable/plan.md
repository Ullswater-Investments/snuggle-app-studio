

## Internacionalizacion completa de /datos/publicar (Pasos 1, 2, 4 + elementos globales)

### Objetivo

El Paso 3 ya esta internacionalizado. Ahora se trata de pasar por `t()` **todos** los strings hardcodeados en espanol del resto del wizard: cabecera de pagina, alertas, modo demo, stepper, Paso 1 (Fuente de Datos), Paso 2 (Esquema), Paso 4 (Publicacion + Precio + Terminos), toasts de validacion/exito/error, y las constantes estaticas (LANGUAGES, CATEGORIES, PRICING_MODELS, FIELD_TYPES, STEPS).

---

### 1. Ampliar los 7 archivos `publish.json` existentes

Anadir las siguientes secciones nuevas al namespace `publish` en cada idioma:

```text
{
  "header": {
    "backToData": "Volver a Mis Datos",
    "title": "Publicar Dataset",
    "subtitle": "Conecta tu API al ecosistema de ProcureData"
  },
  "alerts": {
    "maintenance": "Sistema en mantenimiento programado. La publicacion de datasets esta temporalmente desactivada.",
    "publishingAs": "Publicando como:",
    "orgTypes": {
      "consumer": "Consumidor",
      "provider": "Proveedor",
      "holder": "Poseedor de Datos"
    },
    "securityNote": "ProcureData no almacena sus datos. Solo facilitamos la conexion segura entre su API y el consumidor autorizado."
  },
  "demo": {
    "title": "Funcion no disponible",
    "description": "La publicacion de activos no esta disponible en modo demostracion.",
    "backButton": "Volver al Dashboard"
  },
  "stepper": {
    "step1": { "title": "Fuente de Datos", "description": "Conexion API" },
    "step2": { "title": "Esquema", "description": "Estructura tecnica" },
    "step3": { "title": "Politicas", "description": "Pontus-X" },
    "step4": { "title": "Publicacion", "description": "Marketplace" }
  },
  "step1": {
    "title": "Paso 1: Fuente de Datos (API)",
    "description": "Define el endpoint y la autenticacion de tu fuente de datos",
    "originName": { "label": "Nombre del Origen *", "placeholder": "Ej: API ERP - Inventario 2024", "hint": "Identificador interno para tu referencia" },
    "originDescription": { "label": "Descripcion del Origen", "placeholder": "Describe brevemente la fuente de estos datos..." },
    "apiUrl": { "label": "URL de la API *", "placeholder": "https://api.ejemplo.com/v1/datos", "hint": "Endpoint GET desde el que los consumidores autorizados recibiran los datos" },
    "headers": { "label": "Headers Personalizados", "addButton": "Anadir Header", "keyPlaceholder": "Key (ej: Authorization)", "valuePlaceholder": "Value (ej: Bearer token...)", "hint": "Los headers se almacenan de forma segura y se envian unicamente en las llamadas autorizadas" },
    "saving": "Guardando...",
    "continue": "Continuar",
    "validation": { "nameRequired": "El nombre del origen es obligatorio", "urlRequired": "La URL de la API es obligatoria" },
    "success": "Configuracion de origen guardada correctamente",
    "error": "Error al guardar el origen"
  },
  "step2": {
    "title": "Paso 2: Esquema de Datos Tecnico",
    "description": "Define la estructura que veran los consumidores al consultar tu API",
    "assistant": { "label": "Asistente de Esquema", "description": "Sube un archivo JSON o CSV de ejemplo y detectaremos los campos automaticamente. Tambien puedes definirlos manualmente.", "uploadButton": "Cargar JSON / CSV" },
    "fields": { "label": "Definicion de Campos", "fieldHeader": "Campo *", "typeHeader": "Tipo *", "descHeader": "Descripcion", "fieldPlaceholder": "nombre_campo", "descPlaceholder": "Descripcion del campo...", "addButton": "Anadir Campo" },
    "fieldTypes": { "Texto": "Texto", "Numero": "Numero", "Fecha": "Fecha", "Booleano": "Booleano", "UUID": "UUID", "JSON": "JSON", "Array": "Array", "Timestamp": "Timestamp", "Decimal": "Decimal", "Entero": "Entero" },
    "validation": { "minOneField": "Define al menos un campo en el esquema" },
    "fileErrors": { "parseError": "No se pudo procesar el archivo. Verifica el formato.", "noFields": "No se detectaron campos en el archivo." },
    "fieldsDetected": "{{count}} campos detectados automaticamente"
  },
  "step3": { ... (ya existente) },
  "step4": {
    "title": "Paso 4: Publicacion en Marketplace",
    "description": "Define como aparecera tu dataset en el catalogo",
    "publicName": { "label": "Nombre Comercial *", "placeholder": "Ej: Indice de Precios Industriales Q1 2024" },
    "descriptionField": { "label": "Descripcion", "placeholder": "Describe el contenido, fuentes y utilidad de los datos..." },
    "category": { "label": "Categoria *", "placeholder": "Selecciona una categoria" },
    "language": { "label": "Idioma del Dataset *", "placeholder": "Selecciona el idioma" },
    "categories": { "Compliance": "Compliance", "ESG": "ESG / Sostenibilidad", "Ops": "Operaciones", "Market": "Mercado / Precios", "R&D": "I+D / Innovacion", "Logistics": "Logistica", "Finance": "Finanzas", "HR": "Recursos Humanos", "IoT": "IoT / Telemetria", "Otros": "Otros" },
    "languages": { "es": "Espanol", "en": "Ingles", "de": "Aleman", "fr": "Frances", "pt": "Portugues", "it": "Italiano" },
    "pricing": {
      "title": "Modelo de Precio",
      "description": "Define como quieres monetizar tus datos",
      "models": { "free": { "label": "Gratuito", "description": "Sin coste para consumidores" }, "subscription": { "label": "Suscripcion", "description": "Pago mensual recurrente" }, "one_time": { "label": "Pago Unico", "description": "Licencia perpetua" }, "usage": { "label": "Por Uso", "description": "Basado en consumo de API" } },
      "priceLabel": "Precio (EUR)",
      "perMonth": "/mes"
    },
    "terms": {
      "title": "Terminos de Uso",
      "description": "Acepta las condiciones para publicar en el marketplace",
      "acceptTerms": "Acepto los Terminos y Condiciones de ProcureData",
      "acceptTermsDesc": "Incluyendo las obligaciones como proveedor de datos y las politicas de uso del marketplace.",
      "acceptDataPolicy": "Confirmo que tengo derecho a compartir estos datos",
      "acceptDataPolicyDesc": "Declaro que los datos cumplen con GDPR y no contienen informacion personal sin consentimiento."
    },
    "submit": "Enviar para Validacion Tecnica",
    "submitting": "Enviando...",
    "validation": { "nameRequired": "El nombre publico es obligatorio", "categoryRequired": "Selecciona una categoria", "languageRequired": "Selecciona el idioma del dataset", "termsRequired": "Debes aceptar los terminos y la politica de datos", "maintenanceMode": "Sistema en mantenimiento. La publicacion esta temporalmente desactivada." },
    "successAutoApprove": "Dataset publicado exitosamente en el catalogo.",
    "successReview": "Dataset enviado a revision tecnica. Se le notificara cuando este disponible en el catalogo.",
    "errorPublish": "Error al publicar"
  },
  "navigation": { "back": "Atras", "continue": "Continuar" },
  "accessTimeout": {
    "title": "Caducidad del Servicio (Timeout)",
    "description": "Define cuanto tiempo podra el consumidor acceder a los datos antes de que expire su licencia.",
    "unit": "dias",
    "defaultHint": "Valor por defecto: 90 dias. Los consumidores veran este periodo en la licencia de uso."
  },
  "accessControl": {
    "whitelistHintLong": "Si anades organizaciones aqui, el activo se vuelve PRIVADO. Solo ellas podran verlo y solicitarlo. La lista de denegados se ignorara automaticamente.",
    "blacklistHintLong": "Solo efectivo si la lista de permitidos esta vacia. El activo sera PUBLICO para todos, excepto para las organizaciones listadas aqui.",
    "blacklistDisabledWarning": "La whitelist tiene prioridad. Esta seccion se ignora mientras haya organizaciones en la lista de permitidos.",
    "noWallet": "Sin wallet",
    "emptyWhitelist": "Sin organizaciones anadidas -- el activo no sera privado por whitelist.",
    "emptyBlacklist": "Sin organizaciones denegadas -- acceso publico total.",
    "termsUrlError": "La URL de T&C no es valida"
  }
}
```

Se crearan traducciones nativas para los 7 idiomas: **es, en, fr, de, it, pt, nl**.

---

### 2. Refactorizar constantes en `PublishDataset.tsx`

**Convertir constantes estaticas a funciones dinamicas** que reciban `t`:

- `STEPS` -> `getSteps(t)` retorna array con titulos traducidos
- `CATEGORIES` -> se renderiza con `t(\`step4.categories.${cat.value}\`)`
- `LANGUAGES` -> se renderiza con `t(\`step4.languages.${lang.value}\`)`
- `PRICING_MODELS` -> se renderiza con `t(\`step4.pricing.models.${model.value}.label\`)` y `.description`
- `FIELD_TYPES` -> se renderiza con `t(\`step2.fieldTypes.${type}\`)`

---

### 3. Reemplazar TODOS los strings hardcodeados en la UI

Secciones a actualizar con `t()`:

| Seccion | Strings a reemplazar |
|---|---|
| Cabecera | "Publicar Dataset", "Conecta tu API...", "Volver a Mis Datos" |
| Alerta mantenimiento | "Sistema en mantenimiento programado..." |
| Alerta organizacion | "Publicando como:", badges de tipo org |
| Alerta seguridad | "ProcureData no almacena sus datos..." |
| Modo demo | "Funcion no disponible", "La publicacion de activos...", "Volver al Dashboard" |
| Paso 1 completo | Titulo, descripcion, labels, placeholders, hints, boton guardar |
| Paso 2 completo | Titulo, descripcion, asistente esquema, tabla headers, boton anadir campo |
| Paso 3 (parcial) | Strings restantes en access control (hints largos, empty states, timeout) |
| Paso 4 completo | Titulo, labels, placeholders, modelo de precio, terminos de uso, boton publicar |
| Toasts | Todos los mensajes de validacion, exito y error |
| Botones navegacion | "Atras", "Continuar", "Guardando...", "Enviando..." |

---

### 4. Archivos a modificar/crear

| Archivo | Cambio |
|---|---|
| `src/locales/es/publish.json` | Ampliar con step1, step2, step4, header, alerts, demo, stepper, navigation, accessTimeout, accessControl |
| `src/locales/en/publish.json` | Idem en ingles |
| `src/locales/fr/publish.json` | Idem en frances |
| `src/locales/de/publish.json` | Idem en aleman |
| `src/locales/it/publish.json` | Idem en italiano |
| `src/locales/pt/publish.json` | Idem en portugues |
| `src/locales/nl/publish.json` | Idem en neerlandes |
| `src/pages/dashboard/PublishDataset.tsx` | Reemplazar todos los strings por llamadas a `t()`, convertir constantes a dinamicas |

### Lo que NO cambia

- `src/i18n.ts` (el namespace `publish` ya esta registrado)
- `src/utils/odrlGenerator.ts` (ya usa keys desacopladas)
- La logica de negocio (mutaciones, validaciones, flujo de pasos)
- `AdminPublicationDetail.tsx`

