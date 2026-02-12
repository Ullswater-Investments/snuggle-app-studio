

## Plan: Actualizar Fundamentos con la Memoria Tecnica oficial de ProcureData

La Memoria Tecnica revela que la arquitectura real de ProcureData es significativamente diferente a lo que actualmente muestra la pagina. Se actualizaran 3 elementos clave: la infografia, el system prompt del agente IA, y las traducciones.

---

### Cambios principales segun la Memoria Tecnica

La arquitectura real tiene **4 capas** (no 3), e incluye conceptos como SSI (Identidad Digital Soberana), Wallets corporativas, Pontus-X blockchain, Data NFTs, Smart Contracts, y el Triangulo de Confianza.

**Arquitectura real (4 capas):**

```text
+--------------------------------------------------+
|  CAPA 1: PRESENTACION & UX (Frontend)            |
|  Angular 21 + Tailwind + MetaMask Integration     |
|  Request Wizard (5 fases de transaccion)          |
+--------------------------------------------------+
           |
           v
+--------------------------------------------------+
|  CAPA 2: ORQUESTACION & LOGICA (Backend)         |
|  AdonisJS + State Manager + RBAC Security         |
|  Roles: Admin, Approver, Viewer, API Configurator |
+--------------------------------------------------+
           |
           v
+--------------------------------------------------+
|  CAPA 3: SOBERANIA & WEB3 (Red de Confianza)     |
|  Pontus-X + Data NFTs & DDOs + DeltaDAO (KYB)    |
|  SSI + Wallets Corporativas + Smart Contracts     |
+--------------------------------------------------+
           |
           v
+--------------------------------------------------+
|  CAPA 4: PERSISTENCIA & SEGURIDAD (Base de Datos) |
|  PostgreSQL + Row Level Security (RLS)             |
|  Almacenamiento hibrido JSONB + Multi-Tenant       |
+--------------------------------------------------+
```

---

### 1. Actualizar la Infografia (`FundamentosInfographic.tsx`)

Se reemplaza el diagrama de 3 capas por uno de 4 capas fiel a la Memoria Tecnica:

- **Capa 1 - Presentacion & UX**: Nodos "Angular 21", "MetaMask Wallet", "Request Wizard"
- **Capa 2 - Orquestacion & Logica**: Nodos "AdonisJS", "RBAC", "State Manager"
- **Capa 3 - Soberania & Web3**: Nodos "Pontus-X", "Data NFTs", "DeltaDAO"
- **Capa 4 - Persistencia & Seguridad**: Nodos "PostgreSQL", "RLS Multi-Tenant", "JSONB"

Detalles expandibles de cada capa actualizados con informacion real del documento:
- Capa 1: Tailwind CSS 4, Spartan UI, firma de transacciones via Wallet corporativa
- Capa 2: Lifecycle control, roles admin/approver/viewer/api_configurator, orquestacion de estados
- Capa 3: SSI, DIDs, Credenciales Verificables, Compute-to-Data, Ocean Protocol
- Capa 4: RLS por organization_id, JSONB para esquemas flexibles, cifrado en reposo

### 2. Actualizar el System Prompt del agente IA (`fundamentos-agent/index.ts`)

Se reescribe completamente el SYSTEM_PROMPT para reflejar la arquitectura real descrita en la Memoria Tecnica:

- **Triangulo de Confianza**: Sujeto (Proveedor), Poseedor (Data Holder/ERP), Consumidor (Comprador), Orquestador (Agile Procurement)
- **Identidad Digital Soberana (SSI)**: Wallets corporativas, MetaMask, DIDs (did:ethr), KYB via DeltaDAO
- **Onboarding en 3 fases**: Registro y generacion de Wallet, Validacion KYB en DeltaDAO, Activacion en Pontus-X
- **Flujo de transaccion**: initiated -> pending_subject -> pending_holder -> approved -> completed, con doble firma criptografica
- **Arquitectura de 4 capas** con las tecnologias reales
- **Data NFTs y DDOs**: Activos digitales soberanos en la red Pontus-X
- **ODRL 2.0**: Politicas de uso automatizadas via Smart Contracts
- **Compute-to-Data**: Procesamiento sin transferencia para privacidad extrema
- **Seguridad**: Defensa en profundidad, TLS 1.3, cifrado JSONB, trazabilidad inmutable en blockchain
- **Modelo de negocio**: Pay-per-use (1 EUROe), suscripcion (100 EUROe/ano), marketplace de terceros
- **Sectores**: Industrial 51%, Comercio 15%, Agroalimentario 12%, Movilidad 10%, Salud 7%, Economia Social 5%
- **Socios clave**: PTIC, Laticompras, UPM, DeltaDAO
- **Estandares**: Gaia-X Trust Framework, DSSC, IDSA, DCAT-AP, W3C DIDs

Se mantienen las SECURITY_RULES y LANGUAGE_BRIDGE existentes.

### 3. Actualizar traducciones (7 idiomas)

Se actualizan los archivos `src/locales/*/fundamentos.json` para reflejar las 4 capas:

Nuevas claves:
- `layers.presentacion.label/title` (Capa 1 - Presentacion & UX)
- `layers.orquestacion.label/title` (Capa 2 - Orquestacion & Logica)
- `layers.soberania.label/title` (Capa 3 - Soberania & Web3)
- `layers.persistencia.label/title` (Capa 4 - Persistencia & Seguridad)

Nuevas preguntas sugeridas del chat:
- q1: "Como funciona el Triangulo de Confianza en ProcureData?"
- q2: "Que es la Identidad Digital Soberana (SSI) y como se implementa?"
- q3: "Como funcionan los Data NFTs y Smart Contracts en Pontus-X?"
- q4: "Como protege RLS los datos en la capa de persistencia?"

Se actualizan titulo y subtitulo para reflejar la arquitectura de 4 capas.

### 4. Actualizar metricas en la pagina (`Fundamentos.tsx`)

Metricas actualizadas basadas en la Memoria Tecnica:
- "4 Capas de Confianza Federadas" (en lugar de 47 Casos)
- "100% Multi-Tenant con RLS verificado" (se mantiene)
- "3 Fases de Onboarding Soberano" (en lugar de 24h)

---

### Resumen de archivos

| Archivo | Accion |
|---------|--------|
| `src/components/fundamentos/FundamentosInfographic.tsx` | MODIFICAR - 4 capas reales |
| `supabase/functions/fundamentos-agent/index.ts` | MODIFICAR - System prompt completo |
| `src/pages/Fundamentos.tsx` | MODIFICAR - Metricas actualizadas |
| `src/locales/es/fundamentos.json` | MODIFICAR - 4 capas + nuevas preguntas |
| `src/locales/en/fundamentos.json` | MODIFICAR |
| `src/locales/fr/fundamentos.json` | MODIFICAR |
| `src/locales/de/fundamentos.json` | MODIFICAR |
| `src/locales/it/fundamentos.json` | MODIFICAR |
| `src/locales/pt/fundamentos.json` | MODIFICAR |
| `src/locales/nl/fundamentos.json` | MODIFICAR |

