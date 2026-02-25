

## Internacionalizacion del Paso 3: Arquitectura de Llaves Desacopladas

### Objetivo

Desacoplar la logica ODRL del idioma de la UI. Las llaves (keys) se almacenan en el estado y se pasan al generador, mientras la UI muestra textos traducidos via `t()`. El JSON-LD final usa descripciones en ingles estandar para llaves predefinidas, y texto original para reglas personalizadas.

---

### 1. Nuevo namespace de traducciones: `publish`

Crear `src/locales/{es,en,fr,de,it,pt,nl}/publish.json` con las traducciones del Paso 3.

**Estructura del JSON** (ejemplo `es`):

```text
{
  "step3": {
    "title": "Paso 3: Politicas de Acceso Pontus-X",
    "description": "Define las reglas de gobernanza y condiciones de uso para tu dataset",
    "permissions": {
      "heading": "Permisos -- Lo que el usuario PUEDE hacer",
      "addCustom": "Anadir permiso personalizado...",
      "COMMERCIAL_USE": "Uso comercial",
      "INTERNAL_ANALYSIS": "Analisis interno",
      "DERIVATIVE_WORKS": "Generar informes derivados",
      "SYSTEM_INTEGRATION": "Integracion en sistemas internos",
      "RESEARCH_USE": "Uso en investigacion"
    },
    "prohibitions": {
      "heading": "Prohibiciones -- Lo que el usuario NO PUEDE hacer",
      "addCustom": "Anadir prohibicion personalizada...",
      "NO_REDISTRIBUTION": "No redistribucion",
      "NO_REVERSE_ENGINEERING": "No ingenieria inversa",
      "NO_RESALE": "No reventa a terceros",
      "NO_PUBLIC_DISCLOSURE": "No divulgacion publica"
    },
    "obligations": {
      "heading": "Obligaciones -- Compromisos adicionales",
      "addCustom": "Anadir obligacion personalizada...",
      "ATTRIBUTION_REQUIRED": "Atribucion requerida",
      "GDPR_COMPLIANCE": "Cumplimiento GDPR",
      "NOTIFY_PROVIDER": "Notificar uso a proveedor",
      "LICENSE_RENEWAL": "Renovacion de licencia"
    },
    "termsUrl": {
      "label": "Enlace a Terminos y Condiciones (Opcional)",
      "placeholder": "https://ejemplo.com/terminos",
      "invalidUrl": "Introduce una URL valida (ej: https://ejemplo.com/terminos)",
      "hint": "Introduce una URL resoluble a su documento legal de T&C"
    },
    "accessControl": {
      "heading": "Control de Acceso (Pontus-X)",
      "whitelist": "Organizaciones con Acceso Permitido (Whitelist)",
      "whitelistHint": "Si anades organizaciones aqui, el activo se vuelve PRIVADO.",
      "blacklist": "Organizaciones con Acceso Denegado (Blacklist)",
      "blacklistHint": "Estas organizaciones no podran ver ni solicitar el activo.",
      "searchPlaceholder": "Buscar organizacion por nombre..."
    }
  }
}
```

Se crearan los 7 archivos con traducciones nativas para cada idioma. El namespace `publish` se registrara en `src/i18n.ts`.

---

### 2. Refactorizar constantes con Keys en `PublishDataset.tsx`

**Reemplazar** los arrays `QUICK_PERMISSIONS`, `QUICK_PROHIBITIONS`, `QUICK_OBLIGATIONS` para usar Keys en mayusculas como `label`:

```text
const QUICK_PERMISSIONS: PolicyRule[] = [
  { id: "COMMERCIAL_USE", label: "COMMERCIAL_USE" },
  { id: "INTERNAL_ANALYSIS", label: "INTERNAL_ANALYSIS" },
  { id: "DERIVATIVE_WORKS", label: "DERIVATIVE_WORKS" },
  { id: "SYSTEM_INTEGRATION", label: "SYSTEM_INTEGRATION" },
  { id: "RESEARCH_USE", label: "RESEARCH_USE" },
];

const QUICK_PROHIBITIONS: PolicyRule[] = [
  { id: "NO_REDISTRIBUTION", label: "NO_REDISTRIBUTION" },
  { id: "NO_REVERSE_ENGINEERING", label: "NO_REVERSE_ENGINEERING" },
  { id: "NO_RESALE", label: "NO_RESALE" },
  { id: "NO_PUBLIC_DISCLOSURE", label: "NO_PUBLIC_DISCLOSURE" },
];

const QUICK_OBLIGATIONS: PolicyRule[] = [
  { id: "ATTRIBUTION_REQUIRED", label: "ATTRIBUTION_REQUIRED" },
  { id: "GDPR_COMPLIANCE", label: "GDPR_COMPLIANCE" },
  { id: "NOTIFY_PROVIDER", label: "NOTIFY_PROVIDER" },
  { id: "LICENSE_RENEWAL", label: "LICENSE_RENEWAL" },
];
```

**NOTA**: Se elimina "No uso ilegal o discriminatorio" (no tenia mapeo ODRL) y "Citar fuente de datos" (duplicado de ATTRIBUTION). Si se desean mantener, se agregan como keys adicionales.

**En la UI**, al renderizar badges y reglas seleccionadas, se usara `t()` para mostrar el texto traducido:

- Badge text: `t(\`publish:step3.permissions.${q.label}\`, q.label)` (fallback a la key si no existe traduccion)
- Regla seleccionada: `t(\`publish:step3.permissions.${rule.label}\`, rule.label)` -- si la key no se encuentra en el diccionario (regla personalizada), se muestra el texto original

**Titulos y placeholders**: reemplazar todos los strings hardcodeados del Paso 3 por llamadas a `t()`.

---

### 3. Refactorizar `odrlGenerator.ts` con diccionario de Keys

**Reemplazar** los tres diccionarios separados por un unico `ODRL_DICTIONARY`:

```text
const ODRL_DICTIONARY: Record<string, { action: string; enDesc: string }> = {
  COMMERCIAL_USE:       { action: "commercialize", enDesc: "Commercial use" },
  INTERNAL_ANALYSIS:    { action: "use",           enDesc: "Internal analysis" },
  DERIVATIVE_WORKS:     { action: "derive",        enDesc: "Generate derivative reports" },
  SYSTEM_INTEGRATION:   { action: "execute",       enDesc: "System integration" },
  RESEARCH_USE:         { action: "use",           enDesc: "Research use" },
  NO_REDISTRIBUTION:    { action: "distribute",    enDesc: "No redistribution" },
  NO_REVERSE_ENGINEERING: { action: "reverseEngineer", enDesc: "No reverse engineering" },
  NO_RESALE:            { action: "sell",          enDesc: "No resale to third parties" },
  NO_PUBLIC_DISCLOSURE: { action: "display",       enDesc: "No public disclosure" },
  ATTRIBUTION_REQUIRED: { action: "attribute",     enDesc: "Attribution required" },
  GDPR_COMPLIANCE:      { action: "ensureExclusivity", enDesc: "GDPR compliance" },
  NOTIFY_PROVIDER:      { action: "inform",        enDesc: "Notify provider of usage" },
  LICENSE_RENEWAL:      { action: "use",           enDesc: "License renewal" },
};
```

**Actualizar `mapLabels`** para usar el diccionario unificado:

```text
function mapLabels(items: string[], target: string, assigner: string): OdrlRule[] {
  return items.map((item) => {
    const config = ODRL_DICTIONARY[item];
    return {
      target,
      assigner,
      action: config ? config.action : "use",
      description: config ? config.enDesc : item,  // custom rules keep original text
    };
  });
}
```

**Actualizar `generateODRLPolicy`** para pasar un solo array a `mapLabels` (sin el diccionario de texto espanol):

```text
permission: mapLabels(permissions, target, assigner),
prohibition: mapLabels(prohibitions, target, assigner),
duty: mapLabels(obligations, target, assigner),
```

---

### 4. Registrar namespace en `src/i18n.ts`

Anadir imports para `publish.json` en los 7 idiomas y registrar `publish` en el objeto `resources` y en el array `ns`.

---

### Archivos a modificar/crear

| Archivo | Cambio |
|---|---|
| `src/locales/es/publish.json` | CREAR -- traducciones Step 3 en espanol |
| `src/locales/en/publish.json` | CREAR -- traducciones Step 3 en ingles |
| `src/locales/fr/publish.json` | CREAR -- traducciones Step 3 en frances |
| `src/locales/de/publish.json` | CREAR -- traducciones Step 3 en aleman |
| `src/locales/it/publish.json` | CREAR -- traducciones Step 3 en italiano |
| `src/locales/pt/publish.json` | CREAR -- traducciones Step 3 en portugues |
| `src/locales/nl/publish.json` | CREAR -- traducciones Step 3 en neerlandes |
| `src/i18n.ts` | Registrar namespace `publish` (7 imports + resources + ns) |
| `src/utils/odrlGenerator.ts` | Diccionario unificado ODRL_DICTIONARY, mapLabels simplificado |
| `src/pages/dashboard/PublishDataset.tsx` | Keys en QUICK_*, UI con t(), useTranslation('publish') |

### Lo que NO cambia

- La interfaz `PolicyRule` (sigue con `id` y `label`)
- El flujo de guardado en dos pasos (INSERT, UPDATE)
- `AdminPublicationDetail.tsx` (DDO viewer)
- Las reglas personalizadas siguen siendo texto libre
- La estructura del JSON-LD ODRL (target/assigner explicitos, dcterms:references)
