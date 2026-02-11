

## Plan: Integrar Chat de Agentes IA y Visualizador de Datos en la Pagina Principal

### Vision
Crear una nueva seccion destacada en la pagina principal que combine un **chat de agentes IA embebido** (no solo flotante) con un **visualizador de datos interactivo** que muestre metricas del ecosistema federado, el diagrama de red y animaciones de flujo de datos. Esta seccion reemplazara o complementara el hero actual para que sea lo primero que el usuario vea.

---

### Cambios Principales

#### 1. Nueva Seccion "Centro de Inteligencia Federada"
Una seccion prominente en la pagina principal con layout de dos paneles:

```text
+------------------------------------------------------+
|          CENTRO DE INTELIGENCIA FEDERADA              |
+---------------------------+--------------------------+
|                           |                          |
|   CHAT AGENTES IA         |   VISUALIZADOR DE DATOS  |
|   (embebido, no flotante) |                          |
|                           |   - Diagrama red federada|
|   - Preguntas sugeridas   |   - Metricas animadas    |
|   - Streaming en vivo     |   - Flujo de datos       |
|   - Markdown render       |   - KPIs del ecosistema  |
|                           |                          |
+---------------------------+--------------------------+
```

- **Panel izquierdo**: Chat de agente IA embebido directamente en la pagina (no como widget flotante). Misma funcionalidad del `FederatedAgentChat` pero con interfaz mas amplia y visible.
- **Panel derecho**: Visualizador con pestanas que alterna entre:
  - Diagrama de red federada animado (ya existente)
  - Metricas del ecosistema (graficos Recharts con datos sinteticos: transacciones, nodos activos, politicas ODRL generadas)
  - Animacion de flujo de datos en tiempo real

#### 2. Componentes Nuevos a Crear

| Componente | Descripcion |
|------------|-------------|
| `FederatedIntelligenceSection` | Seccion contenedora con layout de 2 paneles responsivo |
| `EmbeddedAgentChat` | Version embebida del chat IA (mas grande, siempre visible, sin boton flotante) |
| `DataVisualizer` | Panel con pestanas: Red Federada, Metricas, Flujo de Datos |
| `EcosystemMetrics` | Graficos Recharts con metricas sinteticas del espacio de datos |
| `LiveDataFlow` | Animacion Framer Motion de datos fluyendo entre nodos con contadores |

#### 3. Metricas del Ecosistema (datos sinteticos)
Graficos interactivos mostrando:
- **Transacciones federadas**: Grafico de area con transacciones por mes
- **Nodos activos**: Indicador con numero de organizaciones conectadas
- **Politicas ODRL**: Contador de contratos generados automaticamente
- **Soberania de datos**: Porcentaje de datos bajo control del titular

#### 4. Cambios en Landing.tsx
- Insertar la nueva seccion `FederatedIntelligenceSection` justo despues del hero actual
- El widget flotante `FederatedAgentChat` se mantiene como acceso rapido en el resto de paginas, pero en Landing se oculta para no duplicar
- Mantener todas las demas secciones intactas

#### 5. Responsividad
- En desktop: dos columnas (chat | visualizador)
- En tablet: dos columnas compactas
- En movil: apilado vertical (visualizador arriba, chat debajo)

---

### Detalle Tecnico

**Archivos a crear:**
- `src/components/landing/FederatedIntelligenceSection.tsx` - Contenedor principal
- `src/components/landing/EmbeddedAgentChat.tsx` - Chat IA embebido (reutiliza logica de streaming del `FederatedAgentChat` existente)
- `src/components/landing/DataVisualizer.tsx` - Panel con pestanas de visualizacion
- `src/components/landing/EcosystemMetrics.tsx` - Graficos Recharts
- `src/components/landing/LiveDataFlow.tsx` - Animacion de flujo de datos en vivo

**Archivos a modificar:**
- `src/pages/Landing.tsx` - Importar e insertar `FederatedIntelligenceSection`, ocultar widget flotante duplicado

**Sin cambios backend:**
- Reutiliza la edge function `federated-agent` ya desplegada
- No necesita nuevas tablas ni migraciones

**Librerias utilizadas (ya instaladas):**
- `recharts` para graficos
- `framer-motion` para animaciones
- `react-markdown` para renderizado de respuestas IA
- `lucide-react` para iconografia

