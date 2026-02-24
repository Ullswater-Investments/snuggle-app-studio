

## Rediseno de la Pestana "Base de Datos" -> "Arquitectura de Datos Soberana"

### Objetivo

Reemplazar completamente el contenido tecnico interno (tablas PostgreSQL, diagrama ER, campos de base de datos) por una presentacion conceptual alineada con los principios Gaia-X: el operador NO almacena datos de los participantes.

---

### Cambios en `src/pages/Architecture.tsx`

#### A. Eliminar codigo del tab Database (lineas 340-396)

Se elimina:
- El diagrama ER Mermaid (`getErDiagram`)
- El accordion de categorias de tablas (`DB_CATEGORIES`)
- Las constantes `DB_CATEGORIES` (lineas 61-115)

#### B. Nuevo contenido del tab Database

1. **Hero de seccion**: Texto destacado sobre fondo gradiente oscuro explicando que PROCUREDATA no almacena datos transaccionados.

2. **3 Cards de Pilares**:

| Card | Icono | Titulo | Descripcion |
|---|---|---|---|
| 1 | `ServerCog` (servidor+candado) | Almacenamiento en Origen | Los datos originales (Payloads) permanecen en los sistemas del proveedor. Solo se exponen cuando un Smart Contract valida los permisos. |
| 2 | `Network` (nodos P2P) | Intercambio Punto a Punto (P2P) | La transferencia se realiza mediante pasarelas seguras (Access Controllers). PROCUREDATA facilita el canal sin inspeccionar ni retener contenido. |
| 3 | `Tags` (metadatos) | Separacion de Metadatos | La infraestructura gestiona exclusivamente el Catalogo Federado (descripciones, esquemas, reglas ODRL) y el Clearing House (trazabilidad y logs). |

3. **Flujo visual conceptual**: 3 bloques horizontales conectados por flechas:
- `[Infraestructura del Proveedor]` --> `(Verificacion de Identidad y Reglas - PROCUREDATA)` --> `[Infraestructura del Consumidor]`
- El bloque central PROCUREDATA en gris/slate para indicar que es un validador, no un contenedor.

#### C. Actualizar tab label

Cambiar el tab de "Base de Datos" a "Datos Soberanos" en el array `TABS`.

#### D. Eliminar import de `getErDiagram`

Ya no se usa en este tab.

---

### Cambios en traducciones (7 idiomas)

**Nuevas claves** (bajo `database.*` renombrado a `sovereignData.*`):

| Clave | ES | EN |
|---|---|---|
| `tabs.database` | Datos Soberanos | Sovereign Data |
| `sovereignData.title` | Arquitectura de Datos Soberana | Sovereign Data Architecture |
| `sovereignData.heroText` | PROCUREDATA actua como Operador del Espacio de Datos y orquestador de confianza. Fieles a los principios de Gaia-X, NO almacenamos los datos transaccionados. La informacion viaja de forma cifrada y directa (Punto a Punto) desde la infraestructura del Proveedor hasta el Consumidor. | PROCUREDATA acts as the Data Space Operator and trust orchestrator. True to Gaia-X principles, we DO NOT store transacted data. Information travels encrypted and directly (Peer-to-Peer) from the Provider's infrastructure to the Consumer. |
| `sovereignData.pillar1Title` | Almacenamiento en Origen | Storage at Source |
| `sovereignData.pillar1Desc` | Los datos originales (Payloads) permanecen en los sistemas y bases de datos del proveedor. Solo se exponen al ecosistema cuando un Smart Contract valida los permisos de acceso del consumidor. | Original data (Payloads) remains in the provider's systems and databases. It is only exposed to the ecosystem when a Smart Contract validates the consumer's access permissions. |
| `sovereignData.pillar2Title` | Intercambio Punto a Punto (P2P) | Peer-to-Peer Exchange (P2P) |
| `sovereignData.pillar2Desc` | La transferencia de informacion se realiza mediante pasarelas seguras (Access Controllers). PROCUREDATA facilita el canal de comunicacion sin inspeccionar ni retener el contenido de los activos compartidos. | Information transfer is performed through secure gateways (Access Controllers). PROCUREDATA facilitates the communication channel without inspecting or retaining the content of shared assets. |
| `sovereignData.pillar3Title` | Separacion de Metadatos | Metadata Separation |
| `sovereignData.pillar3Desc` | Nuestra infraestructura tecnica gestiona exclusivamente el Catalogo Federado (descripciones, esquemas tecnicos, reglas ODRL) y el Clearing House (trazabilidad y logs de auditoria), garantizando privacidad absoluta por diseno. | Our technical infrastructure exclusively manages the Federated Catalog (descriptions, technical schemas, ODRL rules) and the Clearing House (traceability and audit logs), ensuring absolute privacy by design. |
| `sovereignData.providerInfra` | Infraestructura del Proveedor | Provider Infrastructure |
| `sovereignData.validationBridge` | Verificacion de Identidad y Reglas | Identity and Rules Verification |
| `sovereignData.consumerInfra` | Infraestructura del Consumidor | Consumer Infrastructure |
| `sovereignData.bridgeNote` | PROCUREDATA: Solo validacion, sin almacenamiento de datos | PROCUREDATA: Validation only, no data storage |

Se traduciran a FR, DE, IT, PT y NL.

**Claves a eliminar**: `database.*`, `dbCategories.*`, `dbTables.*` (ya no se usan), y `diagrams.er.*`.

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/Architecture.tsx` | Eliminar DB_CATEGORIES, reescribir tab database con hero + 3 cards + flujo visual. Eliminar import getErDiagram. |
| `src/utils/architectureDiagrams.ts` | Eliminar funcion `getErDiagram` (ya no se usa) |
| `src/locales/es/architecture.json` | Reemplazar claves database/dbCategories/dbTables por sovereignData.* |
| `src/locales/en/architecture.json` | Idem en ingles |
| `src/locales/fr/architecture.json` | Idem en frances |
| `src/locales/de/architecture.json` | Idem en aleman |
| `src/locales/it/architecture.json` | Idem en italiano |
| `src/locales/pt/architecture.json` | Idem en portugues |
| `src/locales/nl/architecture.json` | Idem en neerlandes |

### Lo que NO cambia

- Tabs Overview, Security, Web3 y Flows permanecen intactos
- Header, Hero y FundingFooter no se modifican
- Los diagramas Mermaid de Security (RLS), Web3 y Flows se mantienen

