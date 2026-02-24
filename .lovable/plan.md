

## Rediseno de la Pestana "Seguridad y Privacidad" en /architecture

### Objetivo

Reemplazar el contenido tecnico actual (diagrama RLS Mermaid, politicas por rol, ejemplo SQL) por una presentacion corporativa de "Defensa en Profundidad" alineada con la Memoria Tecnica y los principios Gaia-X.

---

### Cambios en `src/pages/Architecture.tsx`

#### A. Eliminar el contenido actual del tab Security (lineas 357-432)

Se elimina:
- El diagrama Mermaid de RLS (`getRlsDiagram`)
- Las tarjetas de "Politicas por Rol" y "Ejemplo de Politica" (con codigo SQL)
- La constante `RLS_POLICIES` (lineas 62-67)
- El import de `getRlsDiagram`

#### B. Nuevo contenido del tab Security

**1. Hero de la seccion** - Card oscura con gradiente:
- Titulo: "Seguridad y Privacidad: Defensa en Profundidad"
- Descripcion: Texto sobre la distribucion de confianza via Pontus-X e Identidades Digitales Soberanas

**2. Grid de 6 Pilares** (3 columnas desktop, 2 tablet, 1 movil):

| Pilar | Icono | Titulo |
|---|---|---|
| 1 | `Wallet` | Identidad Soberana (SSI) |
| 2 | `Layers` | Aislamiento Multi-Tenant (RLS) |
| 3 | `Lock` | Cifrado Extremo a Extremo |
| 4 | `Cpu` | Compute-to-Data (C2D) |
| 5 | `ShieldCheck` | Cumplimiento RGPD & Data Act |
| 6 | `FileText` | Auditoria Inmutable |

Cada tarjeta tendra icono con fondo sutil, titulo en negrita y descripcion corporativa. Estilo `rounded-2xl` con bordes suaves.

**3. Seccion destacada "IPFS Privado"** - Card con borde degradado y fondo distinto (`bg-gradient-to-r from-amber-500/10 to-purple-500/10`):
- Titulo: "Persistencia Desacoplada: IPFS Privado"
- Descripcion introductoria sobre soberania de almacenamiento
- 3 pasos visuales con iconos numerados:
  1. Integridad por CIDs (SHA-256)
  2. Desacoplamiento identidad/contenido
  3. Gateways Privados con llaves criptograficas

#### C. Actualizar tab label

Cambiar de "Seguridad & RLS" a "Seguridad & Privacidad" en el array `TABS`.

---

### Cambios en traducciones (7 idiomas)

**Nuevas claves** (reemplazan las existentes en `security.*`):

| Clave | ES | EN |
|---|---|---|
| `tabs.security` | Seguridad & Privacidad | Security & Privacy |
| `security.heroTitle` | Seguridad y Privacidad: Defensa en Profundidad | Security and Privacy: Defense in Depth |
| `security.heroDesc` | A diferencia de las plataformas centralizadas, PROCUREDATA distribuye la confianza a traves de la red Pontus-X y las Identidades Digitales Soberanas. La privacidad no es solo una politica legal, sino una imposibilidad tecnica de acceso no consentido. | Unlike centralized platforms, PROCUREDATA distributes trust through the Pontus-X network and Sovereign Digital Identities. Privacy is not just a legal policy, but a technical impossibility of non-consented access. |
| `security.pillar1Title` | Identidad Soberana (SSI) | Sovereign Identity (SSI) |
| `security.pillar1Desc` | Acceso blindado mediante Wallets corporativas y criptografia de clave publica. Firma digital obligatoria para el no repudio. | Armored access through corporate Wallets and public key cryptography. Mandatory digital signature for non-repudiation. |
| `security.pillar2Title` | Aislamiento Multi-Tenant (RLS) | Multi-Tenant Isolation (RLS) |
| `security.pillar2Desc` | Politicas de Row Level Security (RLS) directamente en el motor de base de datos para garantizar que cada organizacion solo acceda a su silo de informacion. | Row Level Security (RLS) policies directly in the database engine to ensure each organization only accesses its own information silo. |
| `security.pillar3Title` | Cifrado Extremo a Extremo | End-to-End Encryption |
| `security.pillar3Desc` | Comunicaciones blindadas bajo TLS 1.3 y cifrado simetrico de datos en reposo, con llaves vinculadas a la logica de Smart Contracts. | Communications secured under TLS 1.3 and symmetric encryption of data at rest, with keys linked to Smart Contract logic. |
| `security.pillar4Title` | Compute-to-Data (C2D) | Compute-to-Data (C2D) |
| `security.pillar4Desc` | Privacidad industrial maxima: permite procesar algoritmos sobre el dato en su ubicacion original sin transferir archivos, protegiendo el secreto comercial. | Maximum industrial privacy: allows processing algorithms on data at its original location without transferring files, protecting trade secrets. |
| `security.pillar5Title` | Cumplimiento RGPD & Data Act | GDPR & Data Act Compliance |
| `security.pillar5Desc` | Minimizacion de datos y derecho al olvido mediante gestion de punteros, permitiendo la revocacion del acceso a datos sensibles sin alterar el registro blockchain. | Data minimization and right to be forgotten through pointer management, allowing revocation of access to sensitive data without altering the blockchain record. |
| `security.pillar6Title` | Auditoria Inmutable | Immutable Audit |
| `security.pillar6Desc` | Trazabilidad forense en tiempo real. Cada interaccion de seguridad queda registrada inalterablemente en los logs del sistema. | Real-time forensic traceability. Every security interaction is immutably recorded in system logs. |
| `security.ipfsTitle` | Persistencia Desacoplada: IPFS Privado | Decoupled Persistence: Private IPFS |
| `security.ipfsDesc` | Para archivos estaticos, garantizamos una Soberania de Almacenamiento Irreversible mediante una arquitectura de tres niveles: | For static files, we guarantee Irreversible Storage Sovereignty through a three-tier architecture: |
| `security.ipfsStep1Title` | Integridad por CIDs | Integrity via CIDs |
| `security.ipfsStep1Desc` | Hashing criptografico (SHA-256) que actua como huella digital del activo. | Cryptographic hashing (SHA-256) acting as the asset's digital fingerprint. |
| `security.ipfsStep2Title` | Desacoplamiento | Decoupling |
| `security.ipfsStep2Desc` | Separacion fisica y logica entre la identidad corporativa y el contenido tecnico. | Physical and logical separation between corporate identity and technical content. |
| `security.ipfsStep3Title` | Gateways Privados | Private Gateways |
| `security.ipfsStep3Desc` | Control total mediante llaves criptograficas administradas por el propietario del dato. | Full control through cryptographic keys managed by the data owner. |

Se traduciran las mismas claves a FR, DE, IT, PT y NL.

**Claves a eliminar**: `security.rlsFlow`, `security.rlsDesc`, `security.policiesByRole`, `security.policyExample`, `security.rlsActive`, `security.securityDefiner`, `security.auditAuto`, y toda la seccion `rlsPolicies.*`.

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/Architecture.tsx` | Eliminar RLS_POLICIES y import getRlsDiagram. Reescribir tab security con hero + 6 pilares + seccion IPFS. |
| `src/utils/architectureDiagrams.ts` | Eliminar funcion `getRlsDiagram` (ya no se usa) |
| `src/locales/es/architecture.json` | Reemplazar security.* y rlsPolicies.* por nuevas claves |
| `src/locales/en/architecture.json` | Idem en ingles |
| `src/locales/fr/architecture.json` | Idem en frances |
| `src/locales/de/architecture.json` | Idem en aleman |
| `src/locales/it/architecture.json` | Idem en italiano |
| `src/locales/pt/architecture.json` | Idem en portugues |
| `src/locales/nl/architecture.json` | Idem en neerlandes |

### Lo que NO cambia

- Tabs Overview, Sovereign Data, Web3 y Flows permanecen intactos
- Header, Hero y FundingFooter no se modifican
- Los diagramas Mermaid de Web3 y Flows se mantienen

