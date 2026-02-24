

## Rediseno de la Pestana "Flujos de Datos" en /architecture

### Objetivo

Reemplazar los diagramas Mermaid (State Machine, Sequence) y la timeline generica de 4 pasos por un diseno UI completo con componentes Tailwind y Lucide Icons: un diagrama de flujo conceptual de 3 actores y una timeline de gobernanza de 5 pasos.

---

### Cambios en `src/pages/Architecture.tsx`

#### A. Eliminar contenido actual del tab Flows (lineas 508-561)

Se elimina:
- Card con MermaidDiagram de State Machine (`getStatesDiagram`)
- Card con MermaidDiagram de Sequence Diagram (`getSequenceDiagram`)
- Card con timeline de 4 pasos (`FLOW_TIMELINE`)
- La constante `FLOW_TIMELINE` (lineas 70-75)
- Imports de `getStatesDiagram`, `getSequenceDiagram`, `getRegistrationDiagram` desde architectureDiagrams
- Import de `MermaidDiagram` (ya no se usa en ninguna tab)

#### B. Nuevo contenido del tab Flows

**1. Hero de seccion** - Card oscura con gradiente (mismo estilo que los demas tabs):
- Titulo: "Flujo de Datos y Gobernanza"
- Descripcion: Texto introductorio sobre el ciclo de vida real de una transaccion en PROCUREDATA

**2. Diagrama de Flujo Conceptual** - 3 bloques conectados por flechas animadas:

| Bloque | Icono | Titulo | Descripcion |
|---|---|---|---|
| 1 | `Building` | Consumidor | Envia peticion de acceso |
| 2 | `Shield` | Operador PROCUREDATA / Clearing House | Valida politicas y registra en blockchain |
| 3 | `Database` | Proveedor / Access Controller | Libera los datos punto a punto |

Bloques laterales con estilo normal y bloque central con gradiente oscuro (misma estetica que los flujos de Web3 y Sovereign Data).

**3. Timeline de Gobernanza** - Stepper vertical con 5 pasos, linea conectora, iconos con colores segun estado:

| Paso | Icono | Color | Titulo |
|---|---|---|---|
| 1 | `FileText` | Azul/Gris | Solicitud de Acceso (Initiated) |
| 2 | `UserCheck` | Ambar | Pre-aprobacion (Subject Review) |
| 3 | `CheckCircle` | Verde | Aprobacion y Firma (Smart Contract) |
| 4 | `DownloadCloud` | Azul primario | Consumo Seguro (Data Gateway) |
| 5 | `ShieldAlert` | Rojo/Purpura | Revocacion / Expiracion (Timeout) |

Cada paso tendra: icono con fondo sutil de color, titulo en negrita, badge con estado, y descripcion corporativa. Diseno tipo stepper con linea vertical conectando los circulos.

#### C. Nuevos imports

- Anadir `Building`, `UserCheck`, `DownloadCloud`, `ShieldAlert`, `Clock` desde lucide-react
- Eliminar import de `MermaidDiagram`
- Eliminar imports de `getStatesDiagram`, `getSequenceDiagram`, `getRegistrationDiagram`

---

### Cambios en `src/utils/architectureDiagrams.ts`

Eliminar TODAS las funciones restantes (`getStatesDiagram`, `getSequenceDiagram`, `getRegistrationDiagram`, `getDataLineageDiagram`) ya que el archivo quedara vacio. Se puede dejar el archivo con solo comentarios o eliminarlo por completo si no hay otros imports.

---

### Cambios en traducciones (7 idiomas)

**Nuevas claves** (reemplazan las existentes en `flows.*`):

| Clave | ES | EN |
|---|---|---|
| `flows.heroTitle` | Flujo de Datos y Gobernanza | Data Flow and Governance |
| `flows.heroDesc` | Ciclo de vida completo de una transaccion de datos en PROCUREDATA. Desde la solicitud inicial hasta la revocacion automatica, cada paso queda trazado y auditado en la infraestructura del Espacio de Datos Europeo. | Complete lifecycle of a data transaction in PROCUREDATA. From the initial request to automatic revocation, every step is traced and audited in the European Data Space infrastructure. |
| `flows.diagramTitle` | Flujo Conceptual de Transaccion | Conceptual Transaction Flow |
| `flows.actor1Title` | Consumidor | Consumer |
| `flows.actor1Desc` | Envia peticion de acceso | Sends access request |
| `flows.actor2Title` | Operador PROCUREDATA / Clearing House | PROCUREDATA Operator / Clearing House |
| `flows.actor2Desc` | Valida politicas y registra en blockchain | Validates policies and records on blockchain |
| `flows.actor3Title` | Proveedor / Access Controller | Provider / Access Controller |
| `flows.actor3Desc` | Libera los datos punto a punto | Releases data peer-to-peer |
| `flows.timelineTitle` | Timeline de Gobernanza: Ciclo de Vida del Dato | Governance Timeline: Data Lifecycle |
| `flows.step1Title` | Solicitud de Acceso | Access Request |
| `flows.step1Status` | Initiated | Initiated |
| `flows.step1Desc` | El consumidor solicita acceso a un activo de datos, especificando el proposito comercial y aceptando preliminarmente las politicas ODRL. | The consumer requests access to a data asset, specifying the commercial purpose and preliminarily accepting ODRL policies. |
| `flows.step2Title` | Pre-aprobacion | Pre-approval |
| `flows.step2Status` | Subject Review | Subject Review |
| `flows.step2Desc` | El proveedor del dato revisa la solicitud y valida que el consumidor y su proposito se ajusten a su estrategia comercial. | The data provider reviews the request and validates that the consumer and their purpose align with their commercial strategy. |
| `flows.step3Title` | Aprobacion y Firma | Approval and Signature |
| `flows.step3Status` | Smart Contract | Smart Contract |
| `flows.step3Desc` | Se firma digitalmente el acuerdo. El Clearing House registra la transaccion en la red Pontus-X, generando la Licencia de Uso inmutable. | The agreement is digitally signed. The Clearing House records the transaction on the Pontus-X network, generating the immutable Usage License. |
| `flows.step4Title` | Consumo Seguro | Secure Consumption |
| `flows.step4Status` | Data Gateway | Data Gateway |
| `flows.step4Desc` | El consumidor descarga los datos a traves del Access Controller, sin exponer credenciales tecnicas. El uso queda registrado en los logs de auditoria. | The consumer downloads data through the Access Controller without exposing technical credentials. Usage is recorded in audit logs. |
| `flows.step5Title` | Revocacion / Expiracion | Revocation / Expiration |
| `flows.step5Status` | Timeout | Timeout |
| `flows.step5Desc` | Al cumplirse el plazo acordado o por decision del proveedor, el acceso se revoca automaticamente, rompiendo el vinculo de la pasarela. | When the agreed deadline is met or by the provider's decision, access is automatically revoked, breaking the gateway link. |

Traducciones analogas para FR, DE, IT, PT, NL.

**Claves a eliminar**: `flows.stateMachine`, `flows.stateDesc`, `flows.fullFlow`, `flows.flowDesc`, `flows.timeline` (se renombra a `flows.timelineTitle`), las antiguas `flows.step*` con sus status tecnicos, y toda la seccion `diagrams.states.*`, `diagrams.sequence.*`, `diagrams.registration.*`.

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/Architecture.tsx` | Eliminar FLOW_TIMELINE, MermaidDiagram import, diagram imports. Reescribir tab flows con hero + diagrama 3 actores + timeline 5 pasos. |
| `src/utils/architectureDiagrams.ts` | Eliminar todas las funciones restantes (archivo queda vacio o se elimina) |
| `src/locales/es/architecture.json` | Reemplazar flows.* y diagrams.states/sequence/registration por nuevas claves |
| `src/locales/en/architecture.json` | Idem en ingles |
| `src/locales/fr/architecture.json` | Idem en frances |
| `src/locales/de/architecture.json` | Idem en aleman |
| `src/locales/it/architecture.json` | Idem en italiano |
| `src/locales/pt/architecture.json` | Idem en portugues |
| `src/locales/nl/architecture.json` | Idem en neerlandes |

### Lo que NO cambia

- Tabs Overview, Sovereign Data, Security y Web3 permanecen intactos
- Header, Hero y FundingFooter no se modifican
- Claves de `diagrams.fe`, `diagrams.be`, `diagrams.bc`, `diagrams.rls` se mantienen (usadas en otros contextos)

