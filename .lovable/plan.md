

## Unificar Precio de Membresia Pro en Toda la Plataforma

Cambiar **todas** las referencias de "Membresia Anual Pro 100 EUROe/ano" a **"Membresia Pro Mensual 300 EUROe/mes"** en toda la plataforma.

### Inventario Completo de Archivos a Modificar

Se han identificado **21 archivos** con referencias a la membresia Pro anual de 100 EUROe que deben actualizarse:

#### A. Constantes del Sistema (2 archivos)

| Archivo | Cambio |
|---------|--------|
| `src/lib/constants.ts` | `annualMembership: 100` → `monthlyMembership: 300` + comentario actualizado |
| `src/modules/nodos-sectoriales/lib/constants.ts` | Idem |

#### B. Locales i18n (2 archivos)

| Archivo | Cambios |
|---------|---------|
| `src/locales/es/docs.json` | `proPrice: "100 EUROe"` → `"300 EUROe"`, `proUnit: "por ano"` → `"por mes"` |
| `src/locales/en/docs.json` | `proPrice: "100 EUROe"` → `"300 EUROe"`, `proUnit: "per year"` → `"per month"` |

#### C. Paginas UI con texto hardcodeado (4 archivos)

| Archivo | Linea | Cambio |
|---------|-------|--------|
| `src/pages/PortalTransparencia.tsx` | 41 | `'100 EUROe/ano'` → `'300 EUROe/mes'` |
| `src/pages/DocumentoExplicativo2.tsx` | 132-133 | `100 EUROe` + `por ano` → `300 EUROe` + `por mes` |
| `src/pages/BusinessModels.tsx` | 146 | Comentario: `100 EUROe/ano` → `300 EUROe/mes` |
| `src/components/politicas-odrl/PoliticasOdrlInfographic.tsx` | 53 | `100 EUROe/ano suscripcion` → `300 EUROe/mes suscripcion` |
| `src/components/web3-dids/Web3DidsInfographic.tsx` | 69 | `Suscripcion anual: 100 EUROe/ano` → `Suscripcion mensual: 300 EUROe/mes` |

#### D. Edge Functions (4 archivos)

| Archivo | Cambio |
|---------|--------|
| `supabase/functions/chat-ai/index.ts` | 2 ocurrencias: tabla de precios + regla de respuesta |
| `supabase/functions/fundamentos-agent/index.ts` | `100 EUROe/year` → `300 EUROe/month` |
| `supabase/functions/politicas-odrl-agent/index.ts` | `100 EUROe/ano (suscripcion)` → `300 EUROe/mes` |
| `supabase/functions/web3-dids-agent/index.ts` | `100 EUROe/ano` → `300 EUROe/mes` |
| `supabase/functions/flujo-3-actores-agent/index.ts` | `100 EUROe/year subscription` → `300 EUROe/month` |

#### E. Documentacion y Training (7 archivos)

| Archivo | Cambio |
|---------|--------|
| `docs/LIBRO_DE_REGLAS_PROCUREDATA.md` | "Membresia anual Pro / 100 EUROe" → "Membresia mensual Pro / 300 EUROe" |
| `docs/GLOSARIO_UNE_0087.md` | `100 EUROe/ano` → `300 EUROe/mes` |
| `docs/ai_training_context.md` | 3 ocurrencias (tabla precios, reglas, datos clave) |
| `docs/synthetic_data.md` | `annualMembership: 100` → `monthlyMembership: 300` |
| `entrenamientoIA/01_SYSTEM_INSTRUCTIONS.md` | 2 ocurrencias |
| `entrenamientoIA/02_KNOWLEDGE_BASE.md` | `100 EUROe/ano` → `300 EUROe/mes` |
| `entrenamientoIA/06_RESPONSE_RULES.md` | 2 ocurrencias (ejemplo de respuesta + datos clave) |
| `entrenamientoIA/07_CONSTANTS_REFERENCE.md` | Tabla y codigo TypeScript |

### Nota Importante

Los servicios individuales que cuestan 100 EUROe (Anonimizador GDPR, Certificacion Green Partner, Sincronizador ERP) **NO se modifican** -- solo cambia la membresia Pro de suscripcion.

