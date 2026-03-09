

## Plan: Entrenar ARIA con el caso etailers.procuredata.org + Fix build error

### Contexto

El subdominio `etailers.procuredata.org` es un informe estrategico presentado a un cliente del sector construccion. Trata sobre estandarizacion inteligente y optimizacion de compras usando espacios de datos federados Gaia-X/Pontus-X, con foco en fabricantes y distribuidores de materiales de construccion. NO es contenido core de ProcureData, sino un caso de uso de nicho.

---

### 1. Crear archivo de conocimiento aislado

**Archivo**: `entrenamientoIA/18_CASO_ETAILERS_CONSTRUCCION.md`

Documento Markdown con el conocimiento extraido del subdominio, estructurado como:

- Identificacion del caso (subdominio, sector, cliente objetivo)
- El problema: 3 barreras (duplicidades de codificacion, descriptivos inconsistentes, fragmentacion de compra)
- La solucion: 3 pilares (depuracion IA, espacio de datos comun GXDCH, optimizacion predictiva)
- Stack tecnologico (EDC, AAS, Pontus-X CtD, GXDCH, Digital TER-X 2050)
- Caso de uso: fabricante como propietario soberano del dato (tipos de datos federables)
- Ayudas Kit Espacio de Datos (Red.es, hasta 30.000 EUR, plazo marzo 2026)
- Proximos pasos con Agile Procurement (3 fases)
- Metricas clave: ahorro 3-8%, subvencion 30.000 EUR

Con una cabecera clara: "Este conocimiento es de un SUBDOMINIO especifico. No mezclar con la base de conocimiento general."

---

### 2. Inyectar conocimiento en el agente concierge (chat-ai)

**Archivo**: `supabase/functions/chat-ai/index.ts`

Anadir una nueva constante `ETAILERS_KNOWLEDGE` con el resumen del caso de uso, justo antes de `serve()`. Incluir una regla explicita:

```text
## CASO DE USO NICHO: etailers.procuredata.org (Sector Construccion)

IMPORTANTE: Este es un SUBDOMINIO especifico para un caso de uso de nicho.
NO forma parte de la oferta general de ProcureData. Solo mencionar si el
usuario pregunta especificamente sobre: construccion, materiales, fabricantes,
distribuidores, estandarizacion de productos, ETIM, GS1, AAS, Digital TER-X,
Kit Espacio de Datos, o el subdominio etailers.

[contenido resumido del caso]
```

Inyectar esta constante en `enrichedInstructions` despues de `SYSTEM_INSTRUCTIONS`.

Anadir tambien una nueva Regla 46 al system prompt:

```text
### Regla 46: Caso etailers / Construccion
> "Si el usuario pregunta sobre construccion, materiales, fabricantes, distribuidores, 
> estandarizacion de productos, ETIM, Kit Espacio de Datos, o etailers.procuredata.org:
> Responder con el conocimiento del subdominio etailers. Aclarar que es un caso de uso
> sectorial especifico, no el producto general de ProcureData."
```

---

### 3. Fix build error: notification-handler

**Archivo**: `supabase/functions/notification-handler/index.ts`

El template `download` (linea 150-157) usa `html` estatico mientras que la linea 363 llama `template.getBody(templateData)`. Cambiar el template `download` para usar `getBody` como todos los demas:

```typescript
download: {
  subject: "Descarga de datos disponible - ProcureData",
  getBody: (data: any) => `
    <h1>Descarga disponible</h1>
    <p>Los datos solicitados están listos para su descarga.</p>
    <p>Acceda a la plataforma para descargar los datos.</p>
  `,
},
```

---

### Archivos a modificar/crear

| Archivo | Cambio |
|---|---|
| `entrenamientoIA/18_CASO_ETAILERS_CONSTRUCCION.md` | Crear: documento de conocimiento aislado |
| `supabase/functions/chat-ai/index.ts` | Anadir constante ETAILERS_KNOWLEDGE + Regla 46 + inyeccion en enrichedInstructions |
| `supabase/functions/notification-handler/index.ts` | Fix: download template html -> getBody |

### Lo que NO cambia

- La base de conocimiento general (SYSTEM_INSTRUCTIONS existente)
- Los otros agentes especializados (federated-agent, success-story-agent, etc.)
- Los archivos de entrenamientoIA existentes (01-17)
- Ningun archivo de traduccion ni componente frontend

