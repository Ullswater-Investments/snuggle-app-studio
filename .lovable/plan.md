

## Rediseno de /architecture: Alineacion con Memoria Tecnica y Gaia-X

### Objetivo

Transformar la pagina de Arquitectura de una vista tecnica interna (que expone React, PostgreSQL, Tailwind, etc.) a una presentacion corporativa de alto nivel alineada con los estandares Gaia-X y la Memoria Tecnica oficial. El foco se desplaza a **Soberania del Dato**, **Seguridad B2B** y **Cumplimiento Normativo**.

---

### Cambios detallados

#### 1. Rediseno del bloque "Arquitectura de Alto Nivel" (Tab Overview)

**Eliminar**: El diagrama Mermaid actual (`getOverviewDiagram`) que muestra "Frontend React + Vite", "shadcn UI", "TanStack Query", etc.

**Reemplazar por**: Una representacion visual con 3 bloques horizontales conectados por flechas animadas:

```text
+---------------------------+     +-------------------------------+     +---------------------------+
|  PROVEEDOR DE DATOS       | --> |  TRUST FRAMEWORK (Pontus-X)   | --> |  CONSUMIDOR DE DATOS      |
|                           |     |                               |     |                           |
|  [Database] [API]         |     |  - Gestion de Identidades     |     |  [Server] [BarChart]      |
|  Fuentes de Datos Locales |     |    (DID)                      |     |  Access Controller        |
|  Conector de Publicacion  |     |  - Controles de Acceso        |     |  Sistemas ERP / Analisis  |
|                           |     |  - Registro Inmutable         |     |                           |
+---------------------------+     |    (Blockchain)               |     +---------------------------+
                                  +-------------------------------+
```

- Los bloques se construyen con `Card` + iconos Lucide (`Database`, `FileInput`, `Shield`, `Lock`, `Blocks`, `Server`, `BarChart3`)
- Las flechas intermedias usan `ArrowRight` con animacion CSS (pulse o slide)
- Responsive: en movil se apilan verticalmente con `ArrowDown`

**Eliminar las 3 tarjetas inferiores** que dicen "Frontend SPA" (con "React 18 + TypeScript", "49 shadcn/ui components"), "Backend Cloud AI" (con "PostgreSQL 15 + RLS", "Edge Functions (Deno)"), y "Web3 Layer" (con "Pontus-X Testnet"). Estas exponen tecnologias internas.

#### 2. Rediseno de "Componentes del Data Space Europeo"

**Eliminar** los 4 componentes actuales (EDC, IDS Protocol, Keycloak, Gaia-X Trust Framework) que son demasiado tecnicos.

**Reemplazar por 4 pilares conceptuales** con tarjetas elegantes:

| Pilar | Icono | Descripcion |
|---|---|---|
| Identidad Federada y Confianza (Trust Framework) | `ShieldCheck` | Utilizacion de Identificadores Descentralizados (DID) y Credenciales Verificables para autenticar a los participantes (KYB) sin depender de un directorio central. |
| Intercambio Soberano (Access Controller) | `Network` | Los datos no se almacenan en un lago central. El intercambio se realiza punto a punto (P2P) mediante pasarelas seguras que verifican las politicas de acceso antes de autorizar la transferencia. |
| Catalogo y Trazabilidad (Clearing House) | `Blocks` | Registro inmutable de todas las transacciones de datos mediante Smart Contracts en la red Pontus-X, garantizando una pista de auditoria perfecta y no repudiable. |
| Interoperabilidad Semantica | `DatabaseZap` | Estandarizacion de vocabularios y esquemas de datos para asegurar que la informacion compartida sea comprensible y procesable automaticamente por los sistemas del ecosistema. |

Cada tarjeta tendra un fondo con gradiente sutil azul/ambar, icono grande, titulo en negrita y descripcion corporativa.

#### 3. Limpieza del Tab "Tech Stack"

**Eliminar completamente** el tab "Tech Stack" (tab id `stack`) ya que expone tecnologias internas (React, Tailwind, shadcn, Vite, TanStack, etc.), lo cual contradice directamente el requisito de no mencionar el stack interno.

Actualizar el array `TABS` para quitar `{ id: "stack", ... }` y la constante `TECH_STACK`.

#### 4. Limpieza de hardcoded en Overview

Eliminar las listas hardcodeadas en las tarjetas inferiores (lineas 356-401):
- "React 18 + TypeScript"
- "49 shadcn/ui components"
- "Framer Motion animations"
- "PostgreSQL 15 + RLS"
- "Edge Functions (Deno)"
- "Pontus-X Testnet"

#### 5. Actualizacion de traducciones (7 idiomas)

Anadir nuevas claves al namespace `architecture` en los 7 archivos de idiomas:

**Nuevas claves:**

| Clave | ES | EN |
|---|---|---|
| `overview.providerBlock` | Proveedor de Datos | Data Provider |
| `overview.providerLocalSources` | Fuentes de Datos Locales | Local Data Sources |
| `overview.providerConnector` | Conector de Publicacion | Publication Connector |
| `overview.trustFramework` | Marco de Confianza (Pontus-X) | Trust Framework (Pontus-X) |
| `overview.trustIdentity` | Gestion de Identidades (DID) | Identity Management (DID) |
| `overview.trustAccess` | Controles de Acceso | Access Controls |
| `overview.trustLedger` | Registro Inmutable (Blockchain) | Immutable Ledger (Blockchain) |
| `overview.consumerBlock` | Consumidor de Datos | Data Consumer |
| `overview.consumerGateway` | Access Controller | Access Controller |
| `overview.consumerSystems` | Sistemas ERP / Analisis | ERP Systems / Analytics |
| `overview.secureDataFlow` | Flujo de datos seguro y verificado | Secure and verified data flow |
| `overview.pillar1Title` | Identidad Federada y Confianza | Federated Identity and Trust |
| `overview.pillar1Desc` | Utilizacion de Identificadores Descentralizados (DID) y Credenciales Verificables para autenticar a los participantes (KYB) sin depender de un directorio central. | Use of Decentralized Identifiers (DID) and Verifiable Credentials to authenticate participants (KYB) without relying on a central directory. |
| `overview.pillar2Title` | Intercambio Soberano | Sovereign Exchange |
| `overview.pillar2Desc` | Los datos no se almacenan en un lago central. El intercambio se realiza punto a punto (P2P) mediante pasarelas seguras que verifican las politicas de acceso antes de autorizar la transferencia. | Data is not stored in a central lake. Exchange is performed peer-to-peer (P2P) through secure gateways that verify access policies before authorizing the transfer. |
| `overview.pillar3Title` | Catalogo y Trazabilidad | Catalog and Traceability |
| `overview.pillar3Desc` | Registro inmutable de todas las transacciones de datos mediante Smart Contracts en la red Pontus-X, garantizando una pista de auditoria perfecta y no repudiable. | Immutable record of all data transactions via Smart Contracts on the Pontus-X network, ensuring a perfect, non-repudiable audit trail. |
| `overview.pillar4Title` | Interoperabilidad Semantica | Semantic Interoperability |
| `overview.pillar4Desc` | Estandarizacion de vocabularios y esquemas de datos para asegurar que la informacion compartida sea comprensible y procesable automaticamente por los sistemas del ecosistema. | Standardization of vocabularies and data schemas to ensure shared information is understandable and automatically processable by ecosystem systems. |

Se traduciran las mismas claves a FR, DE, IT, PT y NL.

**Claves a eliminar** (ya no se usan): `overview.frontendSpa`, `overview.backendCloud`, `overview.web3Layer`, `overview.edc`, `overview.edcDesc`, `overview.idsProtocol`, `overview.idsDesc`, `overview.keycloak`, `overview.keycloakDesc`, `overview.gaiaX`, `overview.gaiaXDesc`, `overview.active`, todas las claves de `techStack.*` y `techItems.*`.

#### 6. Estilo visual

- Seccion del Trust Framework central: fondo con gradiente `bg-gradient-to-br from-[#1C2B40] to-[#233144]` con texto claro
- Tarjetas laterales (Proveedor/Consumidor): bordes sutiles con `border-primary/30`
- Pilares: Cards con `bg-gradient-to-br from-slate-900 to-slate-800 text-white` en modo oscuro, con acento ambar en el icono
- Flechas animadas: `animate-pulse` en los iconos `ArrowRight`/`ArrowDown`

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/Architecture.tsx` | Redisenar Tab Overview (eliminar Mermaid + 3 cards + 4 componentes, construir 3 bloques + 4 pilares). Eliminar Tab Stack y constante TECH_STACK. |
| `src/utils/architectureDiagrams.ts` | Eliminar `getOverviewDiagram` (ya no se usa) |
| `src/locales/es/architecture.json` | Anadir ~20 claves nuevas, eliminar claves de techStack/techItems/overview obsoletas |
| `src/locales/en/architecture.json` | Idem en ingles |
| `src/locales/fr/architecture.json` | Idem en frances |
| `src/locales/de/architecture.json` | Idem en aleman |
| `src/locales/it/architecture.json` | Idem en italiano |
| `src/locales/pt/architecture.json` | Idem en portugues |
| `src/locales/nl/architecture.json` | Idem en neerlandes |

---

### Lo que NO cambia

- Tabs de Database, Security, Web3, y Flows permanecen intactos (contienen informacion tecnica legitima para audiencia tecnica)
- Header, Hero y FundingFooter no se modifican
- Los diagramas Mermaid de los demas tabs (ER, RLS, Web3, States, Sequence) se mantienen
- La descripcion del Hero se actualizara para quitar "PostgreSQL (31 tablas) + RLS" y usar lenguaje de alto nivel

