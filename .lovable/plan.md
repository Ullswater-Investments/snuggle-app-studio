

## Plan: Interfaz de Chat IA en cada Caso de Exito

### Objetivo
Agregar a cada pagina de detalle de caso de exito (`/success-stories/:id`) una interfaz de chat IA identica a la del hero principal (`FederatedHeroChat`), pero con un agente especializado en el caso concreto. El agente conocera todos los detalles del caso (reto, solucion, servicios, metricas, cita ARIA, sector) y podra responder preguntas especificas.

---

### Cambios

#### 1. Componente reutilizable: `SuccessStoryChatAgent`
Nuevo archivo: `src/components/success-stories/SuccessStoryChatAgent.tsx`

- Reutiliza la misma estructura visual que `FederatedHeroChat` (barra de entrada, mensajes con markdown, streaming SSE, panel de pensamiento)
- Recibe como props los datos del caso: `title`, `company`, `sector`, `challenge`, `solution`, `services`, `ariaQuote`, `metric`, `metricLabel`
- Las preguntas sugeridas se generan dinamicamente segun el sector y caso, por ejemplo:
  - "Cual fue el reto principal de {company}?"
  - "Que servicios de ProcureData se usaron?"
  - "Que resultados se obtuvieron?"
  - "Como se aplica esto a mi sector?"
- El badge superior dira "Agente IA - {company}" en lugar de "Agente IA Federado"
- El placeholder dira "Pregunta sobre el caso {company}..."

#### 2. Nueva Edge Function: `success-story-agent`
Archivo: `supabase/functions/success-story-agent/index.ts`

- Recibe `messages` + `caseContext` (objeto con todos los datos del caso)
- Construye un system prompt dinamico que incluye:
  - Todos los datos del caso (challenge, solution, services, ariaQuote, metric, etc.)
  - Contexto general de ProcureData (mismo que el agente federado)
  - Instrucciones para responder solo sobre ese caso y redirigir al contexto general si la pregunta no aplica
- Usa `google/gemini-3-flash-preview` con streaming SSE
- Manejo de errores 429/402

#### 3. Integracion en `SuccessStoryDetail.tsx`
- Agregar el componente `SuccessStoryChatAgent` como nueva seccion entre la cita ARIA y el simulador de impacto
- Pasar todos los datos de `caseData` como props al componente
- Titulo de seccion: "Pregunta al Agente IA sobre este caso"

#### 4. Actualizacion de `supabase/config.toml`
- Agregar la configuracion de la nueva edge function `success-story-agent`

---

### Estructura Visual del Chat en cada Caso

```text
+--------------------------------------------------+
|  [Sparkles] Agente IA - GigaFactory North        |
|                                                    |
|  Pregunta sobre el caso de GigaFactory North,     |
|  su reto, solucion o los servicios utilizados.     |
|                                                    |
|  [Cual fue el reto?] [Que servicios se usaron?]   |
|  [Que resultados?]  [Aplicable a mi sector?]      |
|                                                    |
|  +----------------------------------------------+ |
|  | Pregunta sobre el caso GigaFactory North...  | |
|  +----------------------------------------------+ |
+--------------------------------------------------+
```

### Flujo de Datos

1. Usuario entra en `/success-stories/gigafactory-north`
2. Se carga `caseData` con todos los detalles del caso
3. Se renderiza `SuccessStoryChatAgent` con esos datos
4. Al enviar una pregunta, se llama a `success-story-agent` con `messages` + `caseContext`
5. La edge function construye el prompt con contexto completo del caso
6. Streaming de respuesta con panel de pensamiento ("Analizando datos del caso...", "Consultando metricas...", "Preparando respuesta...")

### Archivos a Crear
| Archivo | Descripcion |
|---------|-------------|
| `src/components/success-stories/SuccessStoryChatAgent.tsx` | Chat IA reutilizable para casos de exito |
| `supabase/functions/success-story-agent/index.ts` | Edge function con prompt dinamico por caso |

### Archivos a Modificar
| Archivo | Cambio |
|---------|--------|
| `src/pages/SuccessStoryDetail.tsx` | Agregar seccion de chat IA con SuccessStoryChatAgent |
| `supabase/config.toml` | Agregar configuracion de success-story-agent |

