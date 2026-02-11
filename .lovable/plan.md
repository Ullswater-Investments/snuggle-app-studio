

## Plan: Mejoras Visuales e Interactivas para los Agentes IA

### Resumen

Transformar los agentes IA actuales (Hero Federado + Casos de Exito) de interfaces de texto plano a experiencias inmersivas con visualizaciones reactivas, avatares animados, citaciones de fuentes, y efectos que respondan en tiempo real al contenido de las respuestas.

---

### 1. Avatar Animado del Agente con Estados Visuales

**Nuevo componente:** `src/components/ai/AgentAvatar.tsx`

Un avatar circular animado con Framer Motion que cambia de estado segun la actividad del agente:

- **Idle**: Pulso suave en gradiente morado/azul con icono de Sparkles
- **Listening**: Ondas concentricas simulando escucha activa
- **Thinking**: Orbitas de particulas girando alrededor del avatar (3 puntos en rotacion)
- **Speaking**: Barras de ecualizador animadas dentro del avatar simulando voz

Se coloca junto a cada burbuja de respuesta del asistente, reemplazando el texto plano por una experiencia mas "humana".

---

### 2. Citaciones de Fuentes Federadas en Respuestas

**Nuevo componente:** `src/components/ai/SourceCitation.tsx`

Cuando el agente menciona fuentes (Gaia-X, Pontus-X, ODRL, nodo industrial), se renderizan como chips interactivos al pie de cada respuesta:

- Chips con icono + nombre de fuente (ej: icono Globe + "Red Gaia-X", icono Shield + "Politica ODRL")
- Hover muestra tooltip con descripcion breve
- Animacion de entrada escalonada (stagger) al aparecer
- Color diferenciado por tipo de fuente

**Cambio en edge functions:** Instruir al modelo para que envuelva referencias en marcadores especiales (ej: `[source:gaiax]`, `[source:pontus]`) que el frontend parsea y renderiza como chips.

---

### 3. Diagrama de Red Reactivo al Chat (solo Hero)

**Mejora en:** `FederatedNetworkDiagram.tsx`

Conectar el diagrama de red al contenido del chat:

- Cuando el agente menciona "Consumer", el nodo Consumer se ilumina con un brillo pulsante
- Cuando menciona "Gaia-X", el nodo Gaia-X emite particulas
- Cuando menciona "ODRL" o "politicas", las lineas de conexion cambian a color verde con efecto de "verificacion"
- Nueva prop `highlightedNodes: string[]` que el chat actualiza en tiempo real parseando las palabras clave de la respuesta streaming

---

### 4. Panel de Metricas en Vivo durante Respuestas

**Nuevo componente:** `src/components/ai/LiveMetricsBar.tsx`

Barra horizontal animada que aparece durante el streaming mostrando:

- Tokens procesados (contador animado)
- Nodos consultados (iconos que se encienden secuencialmente)
- Tiempo de respuesta (cronometro en tiempo real)
- Nivel de confianza (barra de progreso que crece durante el streaming)

Usa Framer Motion para numeros que hacen "flip" al cambiar y barras con transiciones suaves.

---

### 5. Efecto de Typing Mejorado con Cursor Parpadeante

**Mejora en:** `FederatedHeroChat.tsx` y `SuccessStoryChatAgent.tsx`

Agregar un cursor parpadeante (`|`) al final del texto durante el streaming, igual que ChatGPT:

- Cursor con animacion `animate-pulse` despues del ultimo caracter
- Se oculta automaticamente cuando termina el streaming
- Efecto visual de "maquina de escribir" mas convincente

---

### 6. Preguntas de Seguimiento Dinamicas

**Nuevo componente:** `src/components/ai/FollowUpSuggestions.tsx`

Despues de cada respuesta del agente, mostrar 2-3 preguntas de seguimiento contextuales:

- Generadas por el propio modelo (instruccion en el system prompt para incluir `[followup:pregunta]` al final)
- Aparecen con animacion de slide-up escalonada
- Chips clickeables que envian la pregunta automaticamente
- Desaparecen cuando el usuario escribe una nueva pregunta

---

### 7. ThinkingPanel Mejorado con Barra de Progreso Global

**Mejora en:** `ThinkingPanel.tsx`

Agregar una barra de progreso continua sobre los pasos de pensamiento:

- Barra horizontal con gradiente que avanza conforme se completan pasos (0%, 25%, 50%, 75%, 100%)
- Efecto de particulas/chispas en el borde de avance de la barra
- Los pasos de pensamiento se personalizan por contexto:
  - Hero: "Conectando nodo ProcureData... / Federando red Gaia-X... / Verificando ODRL..."
  - Casos de exito: "Analizando caso {company}... / Consultando metricas... / Preparando informe..."

---

### 8. Modo de Vista Expandida para el Chat

**Nuevo componente:** `src/components/ai/ExpandableChatWrapper.tsx`

Boton para expandir el chat a pantalla completa (modal/drawer):

- Boton `Expand` (icono Maximize2) en la esquina superior derecha del chat
- Al expandir, el chat ocupa un overlay con fondo blur
- Layout de dos columnas en pantalla completa: chat a la izquierda, visualizaciones/metricas a la derecha
- Boton para volver al tamano normal

---

### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `src/components/ai/AgentAvatar.tsx` | Avatar animado con estados (idle, thinking, speaking) |
| `src/components/ai/SourceCitation.tsx` | Chips de fuentes federadas con tooltips |
| `src/components/ai/LiveMetricsBar.tsx` | Barra de metricas en tiempo real durante streaming |
| `src/components/ai/FollowUpSuggestions.tsx` | Preguntas de seguimiento dinamicas post-respuesta |
| `src/components/ai/ExpandableChatWrapper.tsx` | Wrapper para modo pantalla completa |

### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `src/components/landing/FederatedHeroChat.tsx` | Integrar avatar, citaciones, cursor, follow-ups, metricas, expand |
| `src/components/success-stories/SuccessStoryChatAgent.tsx` | Mismas mejoras adaptadas al contexto de caso |
| `src/components/landing/ThinkingPanel.tsx` | Agregar barra de progreso global y pasos contextuales |
| `src/components/landing/FederatedNetworkDiagram.tsx` | Nueva prop `highlightedNodes` para iluminacion reactiva |
| `supabase/functions/federated-agent/index.ts` | Actualizar prompt para emitir marcadores de fuentes y follow-ups |
| `supabase/functions/success-story-agent/index.ts` | Misma actualizacion de prompt |

---

### Detalles Tecnicos

**Parseo de marcadores en streaming:**
El frontend detecta patrones como `[source:gaiax]` y `[followup:pregunta]` en el texto streaming y los extrae antes de renderizar con ReactMarkdown. Los marcadores se convierten en componentes React interactivos.

**Deteccion de nodos para el diagrama:**
Un hook `useNodeHighlighter` escanea el texto de la ultima respuesta buscando palabras clave (Consumer, Provider, Gaia-X, ODRL, ERP, Pontus-X) y actualiza el array `highlightedNodes` que se pasa al diagrama.

**Todas las animaciones** usan Framer Motion (ya instalado) para consistencia con el sistema actual.

