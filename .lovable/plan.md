

## Plan: Eliminar ARIA solo del front-end visible

### Filosofia
Mantener todas las claves de datos (`ariaQuote`, `aria.insight1`, etc.) intactas en el background. Solo cambiar lo que el usuario **ve**: el nombre "ARIA" y el avatar circular con "A".

---

### Cambios (minimos y seguros)

#### 1. Traducciones: Cambiar solo el VALOR de `aria.name` (6 idiomas)

En cada `simulators.json`, cambiar unicamente:
```
"aria.name": "ARIA"  -->  "aria.name": "AI Advisor"
```

Las claves `aria.role`, `aria.insight1`, etc. se mantienen identicas. Solo cambia el valor visible del nombre.

| Idioma | Antes | Despues |
|--------|-------|---------|
| es | "ARIA" | "AI Advisor" |
| en | "ARIA" | "AI Advisor" |
| it | "ARIA" | "Consulente IA" |
| nl | "ARIA" | "AI Adviseur" |
| pt | "ARIA" | "Consultor IA" |
| de | "ARIA" | "KI-Berater" |

#### 2. Simuladores (~31 archivos): Cambiar avatar "A" por icono Bot

En cada simulador, reemplazar:
```tsx
// ANTES
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-X to-Y flex items-center justify-center text-white font-black text-lg">A</div>

// DESPUES
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-X to-Y flex items-center justify-center">
  <BrainCircuit className="w-5 h-5 text-white" />
</div>
```

No se toca nada mas del simulador: ni las claves de traduccion, ni la logica, ni los insights.

#### 3. AriaDynamicReport.tsx: Cambiar solo el icono y el titulo visual

- Reemplazar el avatar de Sparkles por BrainCircuit
- El titulo ya usa `t('aria.name')` que se cambiara automaticamente con el paso 1
- NO se elimina el componente, solo se rebranda visualmente

#### 4. AriaQuoteCard.tsx: Cambiar "ARIA" hardcoded por "AI Advisor"

Linea 58: `<span className="font-bold">ARIA</span>` --> `<span className="font-bold">AI Advisor</span>`
Y cambiar "Strategic Insight" a algo como "Strategic Analysis"

#### 5. AIConcierge.tsx: Cambiar textos hardcoded

- Linea 341: "Soy **ARIA**" --> "Soy tu **Asistente IA**"
- Linea 598: "Error al conectar con ARIA" --> "Error al conectar con el asistente"
- Linea 657/687: "mejorar ARIA" --> "mejorar el asistente"
- Linea 776: "ARIA" --> "AI Assistant"
- Linea 951: "Pregunta a ARIA" --> "Pregunta al asistente"
- Linea 978: "respondido ARIA" --> "respondido el asistente"

#### 6. entrenamientoIA/15_NLU_DIALOG_TRAINING.md: NO se elimina

Se mantiene como documentacion interna. Opcionalmente se puede actualizar el nombre pero no es visible para usuarios.

---

### Lo que NO se toca

| Elemento | Razon para mantenerlo |
|----------|----------------------|
| Claves `ariaQuote` en success.json | El agente IA las usa como contexto |
| Claves `aria.role`, `aria.insight1/2/3` en simulators.json | Contenido narrativo valioso, solo cambia el nombre visible |
| Propiedad `ariaQuote` en CaseContext interface | El chat agent la necesita |
| Estructura de AriaDynamicReport | Solo se rebranda, no se elimina |
| Nombres de archivos (.tsx) | Cambiar nombres de archivos es riesgoso y no aporta valor al usuario |

---

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| 6x simulators.json (es/en/it/nl/pt/de) | Valor de `aria.name` |
| ~31 simuladores .tsx | Avatar "A" por icono BrainCircuit |
| AriaDynamicReport.tsx | Icono visual |
| AriaQuoteCard.tsx | Texto "ARIA" hardcoded |
| AIConcierge.tsx | ~6 textos hardcoded |

---

### Ventajas de este enfoque

- **0 riesgo de rotura logica**: No se tocan interfaces, claves de datos, ni flujos
- **~40 archivos** en vez de ~80+
- **Cambios puramente cosmeticos**: Buscar/reemplazar mecanico
- **El agente IA sigue funcionando** con todo su contexto intacto

