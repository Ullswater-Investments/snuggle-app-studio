

## Plan: Rediseño del Hero + Agente IA Especializado + Visualización de Red Federada

### Visión General
Rediseñar la sección hero de la página principal para mostrar ProcureData como un **espacio de datos federados con IA**, con un chat de agente especializado integrado, un diagrama interactivo de red federada con animaciones de flujo de datos, y mantener el resto de secciones existentes (features, how it works, benefits, auth).

---

### Cambios Principales

#### 1. Nuevo Hero Interactivo
Reemplazar el hero actual por un diseño en **dos columnas**:
- **Columna izquierda**: Título, subtítulo descriptivo del espacio de datos federados, y badges de tecnologías clave (Gaia-X, ODRL, Pontus-X)
- **Columna derecha**: Diagrama animado de red federada con nodos conectados que muestran flujo de datos en tiempo real

#### 2. Diagrama de Red Federada Animado
Un componente visual interactivo que muestra:
- **Nodos** representando organizaciones (Consumer, Subject, Holder, ProcureData Hub)
- **Conexiones animadas** con partículas/puntos que fluyen entre nodos simulando transacciones de datos
- **Colores diferenciados** por tipo de actor
- Animaciones continuas con Framer Motion mostrando datos en movimiento
- Efecto de "pulso" en el nodo central (ProcureData)

#### 3. Chat de Agente IA Especializado
Un nuevo agente de IA integrado en la página principal:
- **Interfaz de chat compacta** en la parte inferior del hero o como widget flotante
- **Agente especializado** en consultas sobre espacios de datos federados, arquitectura y capacidades de la plataforma
- Conectado al backend mediante una nueva edge function dedicada
- Respuestas con formato markdown y streaming en tiempo real
- Ejemplos de preguntas sugeridas: "¿Qué es un espacio de datos federado?", "¿Cómo funciona la soberanía de datos?", "¿Qué papel juega Gaia-X?"

#### 4. 10 Fases del Roadmap Técnico (Sección Nueva)
Una nueva sección debajo del hero con las 10 fases de evolución incremental:

| Fase | Nombre | Descripción |
|------|--------|-------------|
| 1 | **Fundamentos** | Plataforma base con autenticación, RBAC y RLS multi-tenant |
| 2 | **Catálogo de Datos** | Registro y descubrimiento de activos de datos con metadatos |
| 3 | **Flujo de Aprobaciones 3-Actores** | Máquina de estados Consumer → Subject → Holder |
| 4 | **Políticas ODRL** | Contratos digitales automáticos siguiendo estándar ODRL 2.0 |
| 5 | **Integración Web3 y DIDs** | Identidades descentralizadas y pagos EUROe en Pontus-X |
| 6 | **IA Conversacional (ARIA)** | Asistente inteligente con base de conocimiento contextual |
| 7 | **Conectores ERP** | Integración bidireccional con sistemas empresariales |
| 8 | **Red Federada Gaia-X** | Conectores IDS, Eclipse Dataspace y credenciales verificables |
| 9 | **Analytics Avanzado y BI** | Dashboards predictivos, datos sintéticos e inteligencia de mercado |
| 10 | **Ecosistema Multi-Sector** | Nodos sectoriales, marketplace de servicios y gobernanza distribuida |

Cada fase se mostrará como un nodo en un diagrama de flujo con animaciones de progreso.

---

### Componentes Nuevos a Crear

1. **`FederatedNetworkDiagram`** - Diagrama SVG/Canvas animado con nodos y flujos de datos
2. **`DataFlowAnimation`** - Partículas animadas que fluyen entre nodos usando Framer Motion
3. **`FederatedAgentChat`** - Widget de chat compacto para el agente especializado
4. **`RoadmapPhases`** - Sección visual de las 10 fases con estados y progreso

### Backend (Edge Function)
- **`federated-agent`** - Nueva edge function para el agente IA especializado en datos federados, usando Lovable AI con prompt especializado en arquitectura de espacios de datos, Gaia-X y soberanía de datos

### Resultado Visual Esperado
- Hero moderno y dinámico con animaciones de flujo de datos
- Chat IA accesible directamente desde la portada
- Las 10 fases visibles como roadmap interactivo
- El resto de la página (features, how it works, benefits, auth) se mantiene intacto

