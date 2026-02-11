

## Plan: Token Wallet Virtual con Tracking de Consumo

### Objetivo
Crear un sistema completo de tracking de tokens consumidos por los agentes IA, con una wallet virtual de 1.000.000 tokens iniciales, registro de cada operacion, y una interfaz dedicada para consultar consumos individuales, agregados y saldo restante.

---

### 1. Context Global de Token Wallet

**Nuevo archivo:** `src/contexts/TokenWalletContext.tsx`

Un React Context que gestiona el estado global de la wallet de tokens:

- **Estado persistido en localStorage** para que sobreviva entre sesiones
- Balance inicial: 1.000.000 tokens
- Registro de operaciones (array de `TokenOperation`):
  - `id`: identificador unico
  - `timestamp`: fecha/hora
  - `agent`: "federated" | "success-story" (que agente se uso)
  - `caseLabel`: etiqueta del caso (ej: "GigaFactory North") o "Agente Federado"
  - `question`: pregunta del usuario (truncada a 80 chars)
  - `tokensConsumed`: tokens gastados en esa operacion
- Funciones expuestas: `recordOperation(...)`, `getBalance()`, `getHistory()`, `resetWallet()`
- Se envuelve la app en `<TokenWalletProvider>` en `App.tsx`

---

### 2. Integracion en los Chats (Tracking por Operacion)

**Modificar:** `FederatedHeroChat.tsx` y `SuccessStoryChatAgent.tsx`

Al finalizar cada respuesta del agente (cuando `isLoading` pasa a `false`):
- Llamar a `recordOperation()` del context con el `tokenCount` final
- Mostrar un badge junto a cada mensaje del asistente indicando los tokens consumidos en esa respuesta (ej: `⚡ 127 tokens`)
- El badge aparece con animacion fade-in al terminar el streaming

Cambios especificos:
- Cada mensaje del tipo `Msg` se extiende a `{ role, content, tokens?: number }`
- Al completar streaming, se guarda el `tokenCount` en el mensaje
- Se renderiza un chip `⚡ {tokens} tokens` debajo de cada burbuja de asistente

---

### 3. Mini-Widget de Wallet en el Chat

**Nuevo componente:** `src/components/ai/TokenWalletBadge.tsx`

Un badge compacto que aparece en la esquina superior derecha de cada interfaz de chat:

- Muestra el saldo restante: `🪙 945.230 tokens restantes`
- Barra de progreso mini indicando % consumido del millon
- Color que cambia segun nivel:
  - Verde: > 50% restante
  - Amarillo: 20-50% restante
  - Rojo: < 20% restante
- Click abre la pagina completa de wallet (`/token-wallet`)

---

### 4. Pagina Completa de Token Wallet

**Nuevo archivo:** `src/pages/TokenWallet.tsx`

Pagina dedicada accesible desde `/token-wallet` con las siguientes secciones:

**Seccion 1 - Balance Principal (Card grande estilo EnhancedWalletCard):**
- Balance actual en tokens grandes (ej: "945.230")
- Barra de progreso del millon
- Tokens consumidos totales
- Numero total de operaciones

**Seccion 2 - Consumo Agregado (Cards de resumen):**
- Tokens consumidos hoy / esta semana / este mes
- Promedio de tokens por operacion
- Agente mas utilizado (Federado vs Success Story)
- Grafico de dona (recharts) con distribucion por agente

**Seccion 3 - Grafico de Consumo Temporal:**
- Grafico de lineas (recharts) mostrando consumo diario de tokens
- Eje X: fechas, Eje Y: tokens

**Seccion 4 - Historial de Operaciones (Tabla):**
- Tabla con columnas: Fecha/Hora | Agente | Caso/Contexto | Pregunta | Tokens
- Ordenada por mas reciente
- Filtros por agente y rango de fechas
- Totalizador al pie de la tabla

**Seccion 5 - Acciones:**
- Boton "Resetear Wallet" (vuelve a 1M y limpia historial, con confirmacion)

---

### 5. Ruta y Navegacion

**Modificar:** `src/App.tsx`
- Agregar ruta `/token-wallet` apuntando a `TokenWallet.tsx`

**Modificar:** `src/pages/Settings.tsx`
- Agregar un nuevo modulo "Token Wallet IA" en la cuadricula de ajustes con icono `Coins` y enlace a `/token-wallet`

---

### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `src/contexts/TokenWalletContext.tsx` | Context global con estado persistido en localStorage |
| `src/components/ai/TokenWalletBadge.tsx` | Mini-widget de saldo en cada chat |
| `src/pages/TokenWallet.tsx` | Pagina completa con dashboard de consumo |

### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `src/App.tsx` | Envolver en `TokenWalletProvider` y agregar ruta `/token-wallet` |
| `src/components/landing/FederatedHeroChat.tsx` | Registrar operaciones, mostrar tokens por mensaje, agregar badge wallet |
| `src/components/success-stories/SuccessStoryChatAgent.tsx` | Mismo tracking adaptado al contexto de caso |
| `src/pages/Settings.tsx` | Agregar enlace a Token Wallet en la cuadricula |

---

### Detalles Tecnicos

**Estructura de datos en localStorage:**
```text
tokenWallet: {
  balance: number,          // saldo actual
  initialBalance: number,   // 1.000.000
  operations: [
    {
      id: string,
      timestamp: string (ISO),
      agent: "federated" | "success-story",
      caseLabel: string,
      question: string,
      tokensConsumed: number
    }
  ]
}
```

**Conteo de tokens:**
Se utiliza el conteo aproximado ya existente (basado en split por espacios) que ya funciona en ambos chats. Este valor se registra al finalizar cada operacion de streaming.

**Graficos:**
Se usa `recharts` (ya instalado) para el grafico de lineas temporal y el donut de distribucion por agente.

