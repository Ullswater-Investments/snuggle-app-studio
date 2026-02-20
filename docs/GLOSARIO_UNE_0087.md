# Glosario UNE 0087:2025 — Mapeo ProcureData

## Introducción

Este glosario mapea cada término definido en la especificación **UNE 0087:2025 — Definición y Caracterización de los Espacios de Datos** a su implementación concreta en la plataforma ProcureData. Sirve como documento de referencia para auditorías de conformidad y para facilitar la comprensión del ecosistema.

---

## Términos y Definiciones

### 1. Espacio de Datos (Data Space)

**Definición UNE:** Infraestructura descentralizada que permite compartir datos de forma soberana entre organizaciones, con gobernanza común, interoperabilidad técnica y generación de valor.

**Implementación ProcureData:** Plataforma federada construida sobre Eclipse Dataspace Connector (EDC) + red Pontus-X (Gaia-X). Los datos permanecen en origen (Data Holder) y solo se comparten bajo políticas ODRL explícitas. Arquitectura multi-tenant con Row-Level Security (RLS) de PostgreSQL.

**Estado:** ✅ Cumple

---

### 2. Producto de Datos (Data Product)

**Definición UNE:** Conjunto de datos con metadatos descriptivos, políticas de uso y condiciones de acceso, preparado para su consumo en un espacio de datos.

**Implementación ProcureData:** Estructura tripartita: `data_products` (nombre, versión, esquema, categoría) + `data_assets` (precio, moneda, modelo de pricing, datos de muestra) + `data_policies` (política ODRL vinculada con permisos, prohibiciones y deberes).

**Estado:** ✅ Cumple

---

### 3. Participante (Participant)

**Definición UNE:** Entidad que se adhiere al espacio de datos y acepta las reglas de gobernanza, pudiendo actuar como proveedor, consumidor o titular.

**Implementación ProcureData:** Tabla `organizations` con campo `type` que distingue `consumer`, `provider` y `data_holder`. Cada organización pasa proceso KYB (`kyb_verified`) y obtiene identidad DID (`did`). Registro formal mediante `registration_requests`.

**Estado:** ✅ Cumple

---

### 4. Proveedor de Datos (Data Provider)

**Definición UNE:** Participante que ofrece datos para su consumo bajo condiciones controladas, manteniendo la soberanía sobre los mismos.

**Implementación ProcureData:** Rol `provider` en `organizations.type`. Publica activos en `data_assets` con `is_public_marketplace = true`. Controla políticas de acceso via `data_policies`. Monetización mediante modelo pay-per-use (1 EUROe/transacción) o membresía Pro.

**Estado:** ✅ Cumple

---

### 5. Consumidor de Datos (Data Consumer)

**Definición UNE:** Participante que solicita y utiliza datos compartidos conforme a las políticas establecidas por el proveedor.

**Implementación ProcureData:** Rol `consumer` en `organizations.type`. Solicita datos via `data_transactions` con `justification` y `purpose`. Flujo de aprobación multi-paso (initiated → pending_subject → pending_holder → approved). Historial en `approval_history`.

**Estado:** ✅ Cumple

---

### 6. Titular de Datos (Data Holder)

**Definición UNE:** Entidad que custodia físicamente los datos y los entrega bajo instrucciones del propietario o conforme a las políticas acordadas.

**Implementación ProcureData:** Rol `data_holder` en `organizations.type`. Referenciado como `holder_org_id` en `data_assets` y `data_transactions`. Participa en el flujo de aprobación (`pending_holder`). Responsable de la entrega via `data_payloads`.

**Estado:** ✅ Cumple

---

### 7. Autoridad de Gobierno (Governance Authority)

**Definición UNE:** Órgano responsable de definir, supervisar y hacer cumplir las reglas del espacio de datos, incluyendo adhesión, sanciones y resolución de conflictos.

**Implementación ProcureData:** Descrita en el Libro de Reglas con composición tripartita (Comité Técnico, Comité de Ética, Secretaría Ejecutiva). Funciones de supervisión, auditoría (`audit_logs`) y gestión de incidencias. Proceso de decisión por mayoría cualificada.

**Estado:** ⚠️ Parcial — Constituida documentalmente pero sin entidad jurídica independiente.

---

### 8. Conector (Connector)

**Definición UNE:** Componente software estandarizado que implementa los protocolos de intercambio de datos del espacio, garantizando interoperabilidad y soberanía.

**Implementación ProcureData:** Eclipse Dataspace Connector (EDC) referenciado como conector IDSA. Configurado en `erp_configurations` con `config_type`, `endpoint_url`, `auth_method`. Protocolo DSP (Dataspace Protocol) para negociación y transferencia.

**Estado:** ⚠️ Parcial — EDC referenciado pero sin instancia operativa desplegada para producción.

---

### 9. Catálogo Federado (Federated Catalog)

**Definición UNE:** Registro distribuido de productos de datos disponibles en el espacio, con metadatos estandarizados que permiten su descubrimiento.

**Implementación ProcureData:** Tabla `catalog_metadata` (tags, categorías, visibilidad) vinculada a `data_assets`. Vista materializada `marketplace_listings` que agrega información de producto, proveedor, precio, reputación y badges ESG. Búsqueda por categoría, sector y tags.

**Estado:** ⚠️ Parcial — Funcional pero sin implementar DCAT-AP 3.0 para metadatos estandarizados.

---

### 10. Contrato Inteligente (Smart Contract)

**Definición UNE:** Acuerdo digital ejecutable automáticamente que codifica las condiciones de uso de datos y se ejecuta cuando se cumplen las condiciones acordadas.

**Implementación ProcureData:** Operativo en dos niveles:
- **Nivel 1 (ODRL):** Políticas digitales con permisos (`odrl:use`, `odrl:distribute`), prohibiciones (`odrl:modify`) y deberes (`odrl:attribute`, `odrl:delete`).
- **Nivel 2 (Blockchain):** Smart Contracts en Pontus-X para registro inmutable, usando ethers.js y ABI para interacción.

**Estado:** ✅ Cumple

---

### 11. Identidad Auto-Soberana (Self-Sovereign Identity / SSI)

**Definición UNE:** Sistema de identidad digital descentralizada donde la entidad controla sus propias credenciales sin depender de una autoridad central.

**Implementación ProcureData:** DIDs (Decentralized Identifiers) con método `did:ethr` almacenados en `organizations.did`. Integración con Pontus-X para verificación. Wallet Web3 para gestión de llaves privadas.

**Estado:** ⚠️ Parcial — DIDs implementados pero sin Verifiable Credentials (VC) W3C completas.

---

### 12. Vocabulario de Datos (Data Vocabulary)

**Definición UNE:** Ontología reutilizable que define los conceptos, relaciones y restricciones de un dominio, facilitando la interoperabilidad semántica.

**Implementación ProcureData:** JSON-LD utilizado en el Raw Data Normalizer para contexto semántico. Esquemas definidos en `data_products.schema_definition`. Sin ontología OWL/SKOS formal publicada.

**Estado:** ⚠️ Parcial — Contexto semántico básico sin ontología formal.

---

### 13. Self-Description (Autodescripción Gaia-X)

**Definición UNE:** Descripción estandarizada de un participante, servicio o recurso conforme al marco Gaia-X Trust Framework, firmada criptográficamente.

**Implementación ProcureData:** Trust Framework Gaia-X integrado a través de la red Pontus-X. Self-Descriptions generadas para organizaciones verificadas (`pontus_verified`). Incluye información de identidad, capacidades y certificaciones.

**Estado:** ✅ Cumple

---

### 14. Política de Uso (Usage Policy)

**Definición UNE:** Conjunto de reglas que definen los permisos, prohibiciones y obligaciones asociadas al uso de un producto de datos.

**Implementación ProcureData:** Motor ODRL 2.0 completo en `data_policies.odrl_policy_json`. Soporta:
- **Permisos:** `odrl:use`, `odrl:distribute`, `odrl:derive`
- **Prohibiciones:** `odrl:modify`, `odrl:commercialize`
- **Deberes:** `odrl:attribute`, `odrl:delete`, `odrl:report`
- **Restricciones:** temporales, geográficas, por propósito

**Estado:** ✅ Cumple

---

### 15. Clearing House (Cámara de Compensación)

**Definición UNE:** Servicio que facilita la liquidación de acuerdos, el registro de cumplimiento y la trazabilidad de las transacciones en el espacio.

**Implementación ProcureData:** Funcionalidad distribuida entre:
- `wallet_transactions` para liquidación de pagos en EUROe
- `approval_history` para registro de cumplimiento
- `audit_logs` para trazabilidad completa
- Smart Contracts en Pontus-X para escrow y verificación

**Estado:** ✅ Cumple

---

### 16. Interoperabilidad (Interoperability)

**Definición UNE:** Capacidad de los sistemas y participantes del espacio de datos para intercambiar información de forma efectiva, a nivel técnico, semántico y organizativo.

**Implementación ProcureData:**
- **Técnica:** API REST, EDC, JSON-LD, JWT, TLS 1.3
- **Semántica:** ODRL 2.0, JSON-LD para contexto, esquemas en `schema_definition`
- **Organizativa:** Libro de Reglas, proceso de adhesión KYB, roles IDSA

**Estado:** ⚠️ Parcial — Sin DCAT-AP 3.0 ni vocabulario controlado formal.

---

### 17. Soberanía del Dato (Data Sovereignty)

**Definición UNE:** Derecho de una entidad a decidir cómo, cuándo y bajo qué condiciones se comparten y utilizan sus datos.

**Implementación ProcureData:** Principio fundacional implementado mediante:
- Datos en origen (nunca se copian al repositorio central)
- Políticas ODRL explícitas por transacción
- Consentimiento multi-paso (Consumer → Subject → Holder)
- Revocación de acceso disponible
- Auditoría completa en `audit_logs`

**Estado:** ✅ Cumple

---

### 18. Modelo de Negocio (Business Model)

**Definición UNE:** Esquema que define cómo se genera, entrega y captura valor económico en el espacio de datos.

**Implementación ProcureData:**
- **Pay-per-use:** 1 EUROe por transacción de datos
- **Membresía Pro:** 300 EUROe/mes con funcionalidades avanzadas
- **Servicios de valor:** Marketplace de servicios complementarios (`value_services`)
- **Monetización:** Modelo de revenue sharing para proveedores

**Estado:** ✅ Cumple

---

### 19. Nivel de Aseguramiento (Assurance Level)

**Definición UNE:** Grado de confianza proporcionado por los mecanismos de seguridad e identidad del espacio de datos.

**Implementación ProcureData:**
- **Autenticación:** JWT + Row-Level Security (RLS) multi-tenant
- **Cifrado:** TLS 1.3 en tránsito, AES-256 en reposo
- **Identidad:** DID did:ethr + KYB verificación
- **Trazabilidad:** Blockchain Pontus-X para registro inmutable
- **Auditoría:** Logs completos en `audit_logs` con IP, actor, acción

**Estado:** ✅ Cumple

---

### 20. Marco de Confianza (Trust Framework)

**Definición UNE:** Conjunto de reglas técnicas, legales y operativas que garantizan la confianza entre los participantes del espacio.

**Implementación ProcureData:**
- **Técnico:** Gaia-X Trust Framework via Pontus-X
- **Legal:** Contrato de adhesión con firma digital (eIDAS)
- **Operativo:** Libro de Reglas con SLAs medibles
- **Verificación:** KYB, DID, Self-Descriptions Gaia-X

**Estado:** ✅ Cumple

---

### 21. Operador del Espacio (Data Space Operator)

**Definición UNE:** Entidad responsable de la operación técnica del espacio de datos, incluyendo infraestructura, mantenimiento y soporte.

**Implementación ProcureData:** ProcureData actúa como operador del espacio. Funciones:
- Gestión de infraestructura (base de datos, Edge Functions, APIs)
- Mantenimiento de la plataforma y actualizaciones
- Soporte técnico y atención a participantes
- Monitorización y reporting

**Estado:** ⚠️ Parcial — Sin formalización del rol de Operador según la DGA (Data Governance Act).

---

### 22. Componente de Referencia (CRED)

**Definición UNE:** Componente de Referencia para Espacios de Datos, marco de verificación de conformidad publicado por el gobierno español.

**Implementación ProcureData:** No se ha solicitado verificación formal CRED. La plataforma cumple la mayoría de requisitos técnicos pero carece de la certificación oficial.

**Estado:** ❌ Pendiente — Requiere solicitud formal al organismo competente.

---

## Resumen de Conformidad

| Estado | Cantidad | Porcentaje |
|--------|----------|------------|
| ✅ Cumple | 14 | 64% |
| ⚠️ Parcial | 7 | 32% |
| ❌ Pendiente | 1 | 4% |
| **Total** | **22** | **78% conformidad** |

---

## Términos Complementarios de ProcureData

Además de los términos normativos, ProcureData utiliza terminología específica de su ecosistema:

| Término | Definición | Relación UNE |
|---------|------------|--------------|
| **EUROe** | Stablecoin con paridad 1:1 con el euro, regulada bajo MiCA | Medio de pago del Modelo de Negocio (§18) |
| **Health Score** | Calificación de integridad y actualidad de datos de una organización | Indicador de Calidad del Dato (UNE 0079) |
| **ARIA** | Asistente IA conversacional entrenado con 10,000+ referencias | Servicio de valor añadido del espacio |
| **Pontus-X** | Red blockchain Gaia-X para registro inmutable | Infraestructura del Marco de Confianza (§20) |
| **Green Partner** | Badge de excelencia para proveedores sostenibles verificados | Atributo de Self-Description (§13) |
| **KYB** | Know Your Business, verificación de legitimidad legal | Requisito de adhesión del Participante (§3) |
| **Raw Data Normalizer** | Servicio de transformación y normalización de datos | Componente del Vocabulario de Datos (§12) |
| **Edge Function** | Código serverless ejecutado en la periferia de la red | Componente técnico del Conector (§8) |

---

*Documento generado por el Equipo Técnico de ProcureData · Versión 1.0.0 · 2026*
*Basado en UNE 0087:2025 — Definición y Caracterización de los Espacios de Datos*
