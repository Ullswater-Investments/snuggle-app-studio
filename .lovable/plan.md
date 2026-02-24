

## Ajustes Esteticos y Coherencia Visual en Landing Page

### 1. Unificacion del Logo: Usar `procuredata-hero-logo.png` en todas partes

**Problema**: El componente `ProcuredataLogo.tsx` usa `procuredata-logo.png` (version antigua). La version oficial es `procuredata-hero-logo.png`.

**Cambio en `src/components/ProcuredataLogo.tsx`**:
- Reemplazar `import procuredataLogo from "@/assets/procuredata-logo.png"` por `import procuredataLogo from "@/assets/procuredata-hero-logo.png"`
- Esto automaticamente actualiza el logo en: la cabecera de la Landing, el `UnifiedHeader`, y cualquier otro lugar que use `<ProcuredataLogo />`.

**Tambien en `src/modules/nodos-sectoriales/components/ProcuredataLogo.tsx`**: Mismo cambio de import.

### 2. Actualizacion de CTAs: "Probar Demo" -> "Acceder"

Se actualizan las claves `tryDemo` en todos los namespaces y los 7 idiomas para que digan "Acceder" en lugar de "Probar Demo":

| Namespace | Archivos afectados | Clave |
|---|---|---|
| `motor` | 7 archivos (common.tryDemo) | "Acceder" / "Access" / "Acceder" / "Zugang" / "Accedere" / "Acessar" / "Toegang" |
| `architecture` | 7 archivos (tryDemo) | Idem |
| `whitepaper` | 7 archivos (tryDemo) | Idem |
| `docs` | 7 archivos (technicalDoc.tryDemo) | Idem |

Valores por idioma:
- ES: "Acceder"
- EN: "Access"
- FR: "Acceder"
- DE: "Zugang"
- IT: "Accedere"
- PT: "Acessar"
- NL: "Toegang"

(Estos valores ya existen como `demoAccess` en `common.json`, se reutiliza la misma traduccion.)

### 3. Espaciado y Bordes

El espaciado (`gap-4 md:gap-8`), padding (`p-4 md:p-5`) y bordes (`rounded-2xl`) de las tarjetas de sectores y features ya fueron aplicados en la iteracion anterior. Se verificara que no haya cards restantes con `rounded-lg` o `rounded-xl` en `Landing.tsx`.

### 4. Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/components/ProcuredataLogo.tsx` | Cambiar import de `procuredata-logo.png` a `procuredata-hero-logo.png` |
| `src/modules/nodos-sectoriales/components/ProcuredataLogo.tsx` | Idem |
| `src/locales/es/motor.json` | `common.tryDemo`: "Acceder" |
| `src/locales/en/motor.json` | `common.tryDemo`: "Access" |
| `src/locales/fr/motor.json` | `common.tryDemo`: "Accéder" |
| `src/locales/de/motor.json` | `common.tryDemo`: "Zugang" |
| `src/locales/it/motor.json` | `common.tryDemo`: "Accedere" |
| `src/locales/pt/motor.json` | `common.tryDemo`: "Acessar" |
| `src/locales/nl/motor.json` | `common.tryDemo`: "Toegang" |
| `src/locales/es/architecture.json` | `tryDemo`: "Acceder" |
| `src/locales/en/architecture.json` | `tryDemo`: "Access" |
| `src/locales/fr/architecture.json` | `tryDemo`: "Accéder" |
| `src/locales/de/architecture.json` | `tryDemo`: "Zugang" |
| `src/locales/it/architecture.json` | `tryDemo`: "Accedere" |
| `src/locales/pt/architecture.json` | `tryDemo`: "Acessar" |
| `src/locales/nl/architecture.json` | `tryDemo`: "Toegang" |
| `src/locales/es/whitepaper.json` | `tryDemo`: "Acceder" |
| `src/locales/en/whitepaper.json` | `tryDemo`: "Access" |
| `src/locales/fr/whitepaper.json` | `tryDemo`: "Accéder" |
| `src/locales/de/whitepaper.json` | `tryDemo`: "Zugang" |
| `src/locales/it/whitepaper.json` | `tryDemo`: "Accedere" |
| `src/locales/pt/whitepaper.json` | `tryDemo`: "Acessar" |
| `src/locales/nl/whitepaper.json` | `tryDemo`: "Toegang" |
| `src/locales/{7 idiomas}/docs.json` | `technicalDoc.tryDemo`: Mismos valores |

Total: ~30 archivos con cambios menores (1-2 lineas cada uno).

