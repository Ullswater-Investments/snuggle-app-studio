

## Rediseno de la Pestana "Integracion Web3" -> "Infraestructura Web3 y Clearing House"

### Objetivo

Reemplazar el contenido tecnico de bajo nivel (RPC URLs, Chain IDs, diagrama Mermaid de secuencia, DataLineageBlockchain generico) por una presentacion corporativa enfocada en el valor de auditoria y soberania.

---

### Cambios en `src/pages/Architecture.tsx`

#### A. Eliminar contenido actual del tab Web3 (lineas 428-524)

Se elimina:
- Diagrama Mermaid de secuencia (`getWeb3Diagram`)
- Card de "Configuracion de Red" (RPC URL, Chain ID, Testnet, etc.)
- Card de "Funcionalidades Web3" (badges DID/EUROe/Notarization)
- Card de "Data Lineage Blockchain" con componente `DataLineageBlockchain`
- Import de `DataLineageBlockchain`
- Import de `getWeb3Diagram` desde architectureDiagrams

#### B. Nuevo contenido del tab Web3

**1. Hero de seccion** - Card oscura con gradiente (mismo estilo que Security y Sovereign Data):
- Titulo: "Infraestructura Web3 y Clearing House"
- Descripcion: "PROCUREDATA opera sobre la red Pontus-X, un ecosistema Web3 disenado especificamente para la economia del dato bajo los estandares de Gaia-X. Utilizamos tecnologia DLT (Distributed Ledger Technology) no para almacenar datos, sino para descentralizar la confianza y generar auditorias inmutables."

**2. Grid de 3 Tarjetas Core** (3 columnas desktop, 1 movil):

| Tarjeta | Icono | Titulo |
|---|---|---|
| 1 | `Wallet` | Identidad Soberana y Firma (SSI) |
| 2 | `CreditCard` | Tokenizacion de Activos (Ocean Protocol) |
| 3 | `ShieldCheck` | Clearing House (Notaria Digital) |

Cada tarjeta tendra icono con fondo sutil de color, titulo en negrita, y descripcion corporativa. Estilo `rounded-2xl`.

**3. Flujo Visual de Smart Contract** - Card con aspecto tecnologico:
- 3 bloques horizontales conectados por flechas con bordes brillantes sutiles
- `[Firma de Solicitud (Consumidor)]` -> `[Validacion de Politicas (Smart Contract)]` -> `[Emision de Recibo (Clearing House)]`
- Colores de acento de la marca, bloque central con borde glow sutil

#### C. Actualizar tab label

Cambiar de "Integracion Web3" a "Web3 & Clearing House" en el array TABS.

#### D. Limpiar imports

- Eliminar import de `DataLineageBlockchain`
- Eliminar import de `getWeb3Diagram`
- Eliminar import de `MermaidDiagram` si ya no se usa en ningun tab (verificar Flows - aun usa MermaidDiagram, asi que se mantiene)

---

### Cambios en `src/utils/architectureDiagrams.ts`

Eliminar la funcion `getWeb3Diagram` ya que no se usara mas.

---

### Cambios en traducciones (7 idiomas)

**Nuevas claves** (reemplazan las existentes en `web3.*`):

| Clave | ES | EN |
|---|---|---|
| `tabs.web3` | Web3 & Clearing House | Web3 & Clearing House |
| `web3.heroTitle` | Infraestructura Web3 y Clearing House | Web3 Infrastructure and Clearing House |
| `web3.heroDesc` | PROCUREDATA opera sobre la red Pontus-X, un ecosistema Web3 disenado especificamente para la economia del dato bajo los estandares de Gaia-X. Utilizamos tecnologia DLT (Distributed Ledger Technology) no para almacenar datos, sino para descentralizar la confianza y generar auditorias inmutables. | PROCUREDATA operates on the Pontus-X network, a Web3 ecosystem specifically designed for the data economy under Gaia-X standards. We use DLT (Distributed Ledger Technology) not to store data, but to decentralize trust and generate immutable audits. |
| `web3.card1Title` | Identidad Soberana y Firma (SSI) | Sovereign Identity and Signature (SSI) |
| `web3.card1Desc` | Autenticacion y firmas digitales mediante Wallets corporativas. Cada solicitud o aprobacion de datos requiere una firma criptografica, garantizando el no repudio de las operaciones institucionales. | Authentication and digital signatures through corporate Wallets. Every data request or approval requires a cryptographic signature, ensuring non-repudiation of institutional operations. |
| `web3.card2Title` | Tokenizacion de Activos (Ocean Protocol) | Asset Tokenization (Ocean Protocol) |
| `web3.card2Desc` | Conversion de activos de datos en contratos inteligentes. Los Data NFTs representan la propiedad intelectual del proveedor, mientras que los Datatokens actuan como licencias de acceso temporal para los consumidores. | Conversion of data assets into smart contracts. Data NFTs represent the provider's intellectual property, while Datatokens act as temporary access licenses for consumers. |
| `web3.card3Title` | Clearing House (Notaria Digital) | Clearing House (Digital Notary) |
| `web3.card3Desc` | Registro inmutable de transacciones. El sistema actua como un Clearing House descentralizado: cada vez que se concede un acceso o se descarga un dato, el evento queda sellado en la blockchain, creando un audit trail perfecto para inspecciones legales. | Immutable transaction record. The system acts as a decentralized Clearing House: every time access is granted or data is downloaded, the event is sealed on the blockchain, creating a perfect audit trail for legal inspections. |
| `web3.flowTitle` | Ciclo de Vida del Smart Contract | Smart Contract Lifecycle |
| `web3.flowStep1` | Firma de Solicitud | Request Signature |
| `web3.flowStep1Sub` | Consumidor | Consumer |
| `web3.flowStep2` | Validacion de Politicas | Policy Validation |
| `web3.flowStep2Sub` | Smart Contract | Smart Contract |
| `web3.flowStep3` | Emision de Recibo | Receipt Issuance |
| `web3.flowStep3Sub` | Clearing House | Clearing House |

Traducciones analogas para FR, DE, IT, PT, NL.

**Claves a eliminar**: `web3.pontusIntegration`, `web3.pontusDesc`, `web3.networkConfig`, `web3.network`, `web3.chainId`, `web3.rpcUrl`, `web3.currency`, `web3.viewExplorer`, `web3.web3Features`, `web3.didDesc`, `web3.euroeDesc`, `web3.notarizationDesc`, `web3.dataLineage`, `web3.dataLineageDesc`, y `diagrams.web3.*`.

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/Architecture.tsx` | Eliminar imports de DataLineageBlockchain y getWeb3Diagram. Reescribir tab web3 con hero + 3 cards + flujo visual. Actualizar tab label. |
| `src/utils/architectureDiagrams.ts` | Eliminar funcion `getWeb3Diagram` |
| `src/locales/es/architecture.json` | Reemplazar web3.* por nuevas claves |
| `src/locales/en/architecture.json` | Idem en ingles |
| `src/locales/fr/architecture.json` | Idem en frances |
| `src/locales/de/architecture.json` | Idem en aleman |
| `src/locales/it/architecture.json` | Idem en italiano |
| `src/locales/pt/architecture.json` | Idem en portugues |
| `src/locales/nl/architecture.json` | Idem en neerlandes |

### Lo que NO cambia

- Tabs Overview, Sovereign Data, Security y Flows permanecen intactos
- Header, Hero y FundingFooter no se modifican
- Los diagramas Mermaid de Flows (State Machine, Sequence) se mantienen
- El componente MermaidDiagram sigue importado para uso en Flows

