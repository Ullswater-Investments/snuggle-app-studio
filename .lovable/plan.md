

## Fix: Remove last HOKODO references from CondicionesKitEspacioDatos.tsx

One file remains with outdated content: `src/pages/CondicionesKitEspacioDatos.tsx`

### Changes (lines 27-34)

**Remove** the HOKODO FAQ item and update the Acta de Conformidad FAQ:

| FAQ Item | Before | After |
|----------|--------|-------|
| "¿Puedo cancelar...?" | References "6 meses irrevocable" | **Replace with**: "¿En qué consiste la cuota de adhesión?" → explains 1.500€ + IVA single payment |
| "¿Qué ocurre si conceden?" | "Fase 2 equivalente a subvención" | Updated: "permanencia 24 meses a 250€/mes, hasta 30.000€" |
| "¿Qué es el Acta de Conformidad?" | "activa la financiación de **HOKODO**" | "activa la obligación de pago de la cuota de adhesión" |
| "¿Qué pasa si no conceden?" | "Fase 1 (6 meses)" | "Fase 1. Sin permanencia ni cuotas mensuales" |
| **"¿Qué es la financiación HOKODO?"** | Entire FAQ item exists | **Deleted entirely** |

No other files contain "HOKODO" or "190€" references after the previous round of updates.

