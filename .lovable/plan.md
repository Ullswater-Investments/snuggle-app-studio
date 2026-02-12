

## Plan: Eliminar ARIA de toda la plataforma

### Contexto
ARIA (Asistente de Recursos e Informacion Automatizada) ha sido sustituida por los agentes de IA especificos por caso. Todos los componentes, referencias visuales y textos de ARIA deben eliminarse o renombrarse.

---

### Alcance del cambio

El nombre "ARIA" aparece en **3 niveles** de la plataforma:

| Nivel | Archivos afectados | Tipo de cambio |
|-------|-------------------|----------------|
| Componentes dedicados | 2 archivos | Eliminar |
| Simuladores con panel ARIA | ~47 simuladores | Renombrar/reemplazar branding |
| Pagina de detalle | 1 archivo | Eliminar seccion AriaQuoteCard |
| Archivos de traduccion | ~30 archivos JSON (6 idiomas) | Eliminar/renombrar claves `aria.*` y `ariaQuote` |
| Datos de entrenamiento IA | 1 archivo MD | Eliminar |
| Chat agent | 1 archivo | Limpiar referencia `ariaQuote` |

---

### Cambios detallados

#### 1. Eliminar componentes ARIA dedicados

- **Eliminar** `src/components/success-stories/AriaDynamicReport.tsx`
- **Eliminar** `src/components/success-stories/AriaQuoteCard.tsx`

#### 2. Refactorizar `ImpactSimulator.tsx`

- Eliminar import de `AriaDynamicReport`
- Reemplazar el panel ARIA por un panel generico "Informe Estrategico" o "AI Insights" sin branding ARIA
- Mantener la misma estructura visual pero con titulo generico (ej: "Analisis Estrategico", "Strategic Insights")

#### 3. Refactorizar `SuccessStoryDetail.tsx`

- Eliminar import de `AriaQuoteCard`
- Eliminar la ZONA 3 completa ("ARIA Quote - Consultoria Humana")
- O reemplazarla por una tarjeta generica de "Strategic Insight" sin branding ARIA

#### 4. Refactorizar ~47 simuladores

En cada simulador que muestra `t('aria.name')` o un avatar con "A":

- Reemplazar `t('aria.name')` por `t('ai.name')` o texto generico como "AI Assistant" / "Asistente IA"
- Reemplazar el avatar circular con "A" por un icono generico (ej: `Bot`, `BrainCircuit` de lucide)
- Eliminar referencias a `aria.role`, `aria.insight` etc.

Simuladores afectados (lista parcial):
- BateriaHubSimulator, SocialHubSimulator, TropicalFlashSimulator
- PureLithiumSimulator, KYCSovereignSimulator, GreenFinanceESGSimulator
- WasteToValueSimulator, UrbanMiningSimulator, UniSynthSimulator
- BerryWaterSimulator, RetailEthicsAudit
- Y todos los demas que referencien `aria.*`

#### 5. Limpiar archivos de traduccion

En los 6 idiomas (`es`, `en`, `fr`, `it`, `nl`, `pt`, `de`):

**simulators.json:**
- Renombrar claves `aria.name`, `aria.strategicReport`, `aria.insight` a `ai.name`, `ai.strategicReport`, `ai.insight`
- Cambiar valores de "ARIA" a "AI Assistant" / "Asistente IA" (segun idioma)
- Renombrar todas las claves `*.aria.role`, `*.aria.insight1`, etc. a `*.ai.role`, `*.ai.insight1`

**success.json:**
- Las claves `ariaQuote` en cada caso se pueden renombrar a `strategicInsight` o eliminarse si ya no se muestran

#### 6. Limpiar SuccessStoryChatAgent.tsx

- Eliminar la propiedad `ariaQuote` de la interfaz del caso si ya no se usa en la UI
- O mantenerla renombrada como `strategicInsight` si el chat agent la necesita como contexto

#### 7. Eliminar archivo de entrenamiento

- Eliminar `entrenamientoIA/15_NLU_DIALOG_TRAINING.md` (define personalidad y capacidades de ARIA)

---

### Estrategia de reemplazo

| Antes (ARIA) | Despues |
|--------------|---------|
| "ARIA" como nombre | "AI Assistant" / "Asistente IA" |
| Avatar circular con "A" gradiente | Icono `BrainCircuit` o `Bot` de lucide |
| `AriaDynamicReport` | Panel inline "Strategic Insights" |
| `AriaQuoteCard` | Eliminar o card generico |
| `t('aria.name')` | `t('ai.name')` |
| `ariaQuote` en datos | `strategicInsight` (renombrar) |

---

### Orden de ejecucion

1. Eliminar `AriaDynamicReport.tsx` y `AriaQuoteCard.tsx`
2. Actualizar `ImpactSimulator.tsx` (reemplazar panel ARIA por panel generico)
3. Actualizar `SuccessStoryDetail.tsx` (eliminar AriaQuoteCard)
4. Actualizar los ~47 simuladores (renombrar branding)
5. Actualizar archivos de traduccion en los 6 idiomas
6. Limpiar `SuccessStoryChatAgent.tsx`
7. Eliminar `entrenamientoIA/15_NLU_DIALOG_TRAINING.md`

---

### Riesgo

- **Alto volumen de archivos**: ~80+ archivos modificados
- **Mitigacion**: Los cambios son mecanicos (buscar/reemplazar), no logicos
- **Las traducciones `ariaQuote`** en success.json se mantendran renombradas como `strategicInsight` para no perder el contenido narrativo que usan los agentes de IA como contexto

