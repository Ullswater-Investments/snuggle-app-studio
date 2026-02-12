# Informe de Conformidad Técnica: ProcureData vs UNE 0087:2025

## Resumen Ejecutivo

El presente informe analiza de manera exhaustiva el nivel de conformidad de la plataforma **ProcureData** respecto a la especificación **UNE 0087:2025 — Definición y Caracterización de los Espacios de Datos**, publicada por la Asociación Española de Normalización (UNE).

### Resultados Globales

| Métrica | Valor |
|---------|-------|
| **Requisitos analizados** | 22 |
| **Estado CUMPLE** | 14 (64%) |
| **Estado PARCIAL** | 7 (32%) |
| **Estado PENDIENTE** | 1 (4%) |
| **Nivel de conformidad estimado** | **78%** |

### Prioridades Inmediatas

1. **Implementar DCAT-AP 3.0** en el catálogo de metadatos
2. **Constituir formalmente la Autoridad de Gobierno** del espacio de datos
3. **Completar la implementación SSI** con credenciales verificables W3C
4. **Publicar el Libro de Reglas** (Rulebook) del espacio
5. **Desplegar instancias EDC operativas** para conectores reales

---

## 1. Objeto y Campo de Aplicación (Sección 1 UNE)

La norma UNE 0087:2025 define un espacio de datos como una infraestructura descentralizada que permite compartir datos de forma soberana entre organizaciones, con gobernanza, interoperabilidad y generación de valor.

### Puntos Fuertes ✅

- **ProcureData es un espacio de datos federado**, no un data lake centralizado. Los datos permanecen en origen (en el Data Holder) y solo se comparten bajo políticas ODRL explícitas.
- **Arquitectura tripartita Consumer-Provider-Holder** conforme al modelo IDSA, implementada con tablas `data_transactions`, `data_assets` y `organizations` con roles diferenciados.
- **Cumple los tres criterios** de la norma: descentralización, gobernanza y generación de valor económico (modelo pay-per-use + membresía Pro).
- **Orientación sectorial clara**: cadena de suministro industrial con 47 casos de uso verificados en 6 sectores (industrial, agroalimentario, movilidad, social, salud, retail).

### Puntos Débiles ⚠️

- **No ha obtenido verificación formal CRED** (Componente de Referencia para Espacios de Datos) conforme a la Guía del Promotor publicada en diciembre de 2025.
- **No referencia explícitamente** la alineación con UNE 0087 en su documentación técnica pública.

### Recomendaciones 📋

1. Solicitar verificación de conformidad UNE 0087 a través del marco CRED.
2. Publicar una declaración de conformidad en la documentación técnica del proyecto.
3. Documentar el mapeo explícito entre la arquitectura ProcureData y los requisitos de la Sección 1.

---

## 2. Normas para Consulta (Sección 2 UNE)

La norma referencia estándares complementarios: UNE 0077 (gobierno del dato), UNE 0078 (gestión del dato), UNE 0079 (calidad del dato), UNE 0080 (interoperabilidad del dato) y UNE 0081 (protección del dato).

### Puntos Fuertes ✅

- **ODRL 2.0 (W3C Recommendation)** implementado como motor de políticas de acceso y uso, con representación JSON-LD de permisos, prohibiciones y deberes.
- **Eclipse Dataspace Connector (EDC)** referenciado como conector IDSA para interoperabilidad con otros espacios.
- **Gaia-X Trust Framework** integrado a través de la red Pontus-X para Self-Descriptions y verificación de confianza.
- **Seguridad de nivel enterprise**: TLS 1.3 para comunicaciones, AES-256 para cifrado en reposo, JWT para autenticación, Row-Level Security (RLS) de PostgreSQL para aislamiento multi-tenant.

### Puntos Débiles ⚠️

- **No referencia explícitamente las normas UNE 0077-0081** como marco complementario de gobierno, calidad y protección del dato.
- **Sin mapeo formal** entre las métricas de calidad del Health Score de ProcureData y los indicadores de UNE 0079.

### Recomendaciones 📋

1. Mapear las 4 dimensiones del Health Score (integridad, actualización, veracidad, cumplimiento) contra los indicadores de UNE 0079 (calidad del dato).
2. Documentar el gobierno interno de datos según UNE 0077.
3. Verificar que la protección de datos cumple UNE 0081 además del RGPD.
4. Elaborar tabla de correspondencia UNE 0077-0081 ↔ capacidades ProcureData.

---

## 3. Términos y Definiciones (Sección 3 UNE)

La norma define conceptos clave: Espacio de Datos, Producto de Datos, Contrato Inteligente, Identidad Auto-Soberana (SSI), Conector, Catálogo y Vocabulario de Datos.

### Puntos Fuertes ✅

- **Producto de Datos** implementado con estructura `data_products` (nombre, versión, esquema, categoría) + `data_assets` (precio, moneda, modelo de pricing, datos de muestra) + `data_policies` (política ODRL vinculada).
- **Contrato Inteligente** operativo en dos niveles:
  - **Nivel 1 (ODRL)**: Políticas digitales con permisos (`odrl:use`, `odrl:distribute`), prohibiciones (`odrl:modify`) y deberes (`odrl:attribute`, `odrl:delete`).
  - **Nivel 2 (Blockchain)**: Smart Contracts en Pontus-X para registro inmutable de acuerdos, usando ethers.js para interacción.
- **Espacio de Datos** con las tres capas: conectores (EDC), semántica (JSON-LD), identidad (DID did:ethr).
- **Catálogo federado** con `catalog_metadata` (tags, categorías, visibilidad) y vista `marketplace_listings`.

### Puntos Débiles ⚠️

- **Terminología interna no alineada al 100%** con la norma. Ejemplo: ProcureData usa "Data Holder" donde la norma usa "Titular de los Datos"; usa "Consumer" donde la norma diferencia entre "Consumidor" y "Usuario de Datos".
- **El concepto de "Vocabulario de Datos"** (Sección 3.7 UNE) no está implementado formalmente como ontología reutilizable.

### Recomendaciones 📋

1. Renombrar entidades internas para coincidir con la terminología UNE 0087 en la documentación pública.
2. Publicar un glosario basado en la Sección 3 de la norma, mapeando cada término UNE a su implementación en ProcureData.
3. Desarrollar un vocabulario controlado (ontología OWL/SKOS) para los dominios sectoriales cubiertos.

---

## 4. Soberanía Digital (Sección 4 UNE)

### 4.1 Soberanía sobre Participantes

La norma exige que cada participante mantenga control sobre su identidad, autenticación y autorización dentro del espacio.

#### Puntos Fuertes ✅

- **DID (Decentralized Identifier)** implementado con método `did:ethr`, generado automáticamente al registrar una organización, verificable en blockchain Pontus-X (campo `did` en tabla `organizations`).
- **KYB (Know Your Business)** automatizado con proceso de "Homologación Flash" en 24 horas, incluyendo verificación de CIF/NIF, dirección fiscal y representante legal (tabla `registration_requests`).
- **RBAC (Role-Based Access Control)** con 4 roles diferenciados: `admin`, `approver`, `viewer`, `api_configurator` (tabla `user_roles` + enum `app_role`).
- **Wallet Web3** integrada con MetaMask para firma de transacciones y gestión de tokens EUROe.
- **Verificación Pontus-X** como capa adicional de confianza (campo `pontus_verified` en `organizations`).

#### Puntos Débiles ⚠️

- **No soporta eIDAS 2.0** ni el European Digital Identity Wallet (EUDIW) que entrará en vigor en 2026.
- **Sin niveles de aseguramiento (LoA)** diferenciados según el tipo de transacción o la sensibilidad de los datos.
- **Keycloak planificado pero no desplegado** para federación de identidades empresariales (LDAP, SAML, OIDC).

#### Recomendaciones 📋

1. Integrar EUDIW cuando el reglamento eIDAS 2.0 entre en vigor (previsto 2026-2027).
2. Implementar niveles de aseguramiento (LoA) según eIDAS: bajo, sustancial, alto.
3. Desplegar Keycloak como Identity Provider federado para permitir SSO con directorios corporativos.
4. Añadir soporte para credenciales verificables W3C (Verifiable Credentials) además de DIDs.

### 4.2 Soberanía sobre Activos

La norma requiere que los titulares de datos mantengan control total sobre sus activos: qué se comparte, con quién, durante cuánto tiempo, y bajo qué condiciones.

#### Puntos Fuertes ✅

- **Motor ODRL 2.0 completo** con soporte para:
  - **Permisos**: `odrl:use`, `odrl:distribute`, `odrl:read`, `odrl:aggregate`
  - **Prohibiciones**: `odrl:modify`, `odrl:delete`, `odrl:commercialize`
  - **Deberes**: `odrl:attribute`, `odrl:compensate`, `odrl:delete` (tras expiración)
  - **Restricciones**: geográficas (`odrl:spatial`), temporales (`odrl:temporal`), de propósito (`odrl:purpose`)
- **Revocación inmediata** desde el panel de control del Holder, con actualización en tiempo real del estado de la transacción.
- **Hash inmutable** en blockchain Pontus-X como prueba de existencia del acuerdo (campo `document_hash` en `signed_contracts`).
- **Control de expiración** con `subscription_expires_at` y `access_duration_days` en cada transacción.

#### Puntos Débiles ⚠️

- **Las políticas ODRL no se negocian automáticamente** entre conectores (la negociación es manual a través de la UI del flujo de aprobación).
- **Sin ejecución automática de caducidad**: cuando un `access_duration_days` expira, la revocación no es automática a nivel de conector.
- **Las políticas ODRL generadas no se validan** contra la suite de tests oficial del W3C.

#### Recomendaciones 📋

1. Implementar negociación automática conector-a-conector (EDC Contract Negotiation Protocol).
2. Añadir cron job o trigger para revocación automática cuando expire `access_duration_days`.
3. Certificar el generador ODRL contra la suite de tests W3C (https://www.w3.org/TR/odrl-model/).
4. Implementar logging detallado de cada ejercicio de política (quién accedió, cuándo, bajo qué política).

### 4.3 Soberanía sobre Infraestructura

La norma establece que la infraestructura del espacio debe ser transparente, auditable y preferiblemente basada en componentes open source.

#### Puntos Fuertes ✅

- **Pontus-X** como red blockchain Gaia-X para registro inmutable de transacciones.
- **Eclipse Dataspace Connector (EDC)** referenciado como conector open source IDSA.
- **ethers.js** para interacción directa con contratos inteligentes en la red.
- **Frontend React** con código fuente accesible.
- **PostgreSQL** como motor de base de datos (estándar abierto).

#### Puntos Débiles ⚠️

- **Backend dependiente de Supabase** (Backend-as-a-Service), que aunque está basado en PostgreSQL open source, añade una capa de dependencia propietaria en la gestión de autenticación, storage y edge functions.
- **Frontend desplegado en plataforma Cloud AI** propietaria, lo que limita la portabilidad.
- **Sin plan de portabilidad documentado** para migrar a infraestructura soberana europea.

#### Recomendaciones 📋

1. Documentar plan de portabilidad: exportación completa a PostgreSQL auto-gestionado + edge functions a Deno/Node.js.
2. Evaluar despliegue en nube soberana europea (OVHcloud, IONOS, T-Systems) para cumplir soberanía de infraestructura.
3. Publicar código fuente del backend (o al menos las edge functions) en repositorio público.
4. Implementar contenedores Docker para despliegue reproducible.

---

## 5. Interoperabilidad Legal (Sección 5.1 UNE)

La norma exige que las políticas de uso de datos sean expresables en formato legible por máquinas y conformes a la legislación europea (RGPD, Data Act, Data Governance Act).

### Puntos Fuertes ✅

- **ODRL 2.0** como lenguaje estándar W3C para políticas de uso, implementado con generación automática de JSON-LD.
- **Cumplimiento RGPD** con múltiples capas:
  - **Anonimizador GDPR**: función edge para eliminar datos personales antes de la compartición.
  - **PII Shield**: detección y enmascaramiento de información personal identificable.
  - **Derecho al olvido**: el hash permanece en blockchain como prueba, pero el dato se elimina del Holder.
  - **Consentimiento explícito**: campo `accepted_gdpr` en contratos firmados.
- **Motor ODRL dinámico** que permite actualizar políticas cuando cambia la regulación sin modificar los acuerdos existentes.
- **Contratos digitales firmados** con metadatos de eIDAS (campo `eidas_level`, `signature_provider`, `certificate_issuer`).

### Puntos Débiles ⚠️

- **No implementa explícitamente el Data Act** (Arts. 5-9 sobre portabilidad de datos IoT y acceso justo).
- **No implementa el Data Governance Act** (Arts. 10-15 sobre intermediarios de datos y altruismo de datos).
- **Las políticas ODRL no cubren** todas las bases legales del RGPD (interés legítimo, ejecución contractual) como restricciones formales.

### Recomendaciones 📋

1. Desarrollar módulo de portabilidad de datos según Data Act Arts. 5-9.
2. Implementar funcionalidad de "altruismo de datos" según DGA Art. 16.
3. Añadir restricciones ODRL para base legal RGPD (`odrl:constraint` con `rightOperand` de base legal).
4. Certificar el ODRL Validator contra la suite de tests W3C oficial.
5. Preparar registro como intermediario de datos según DGA Art. 11.

---

## 6. Interoperabilidad Organizativa (Sección 5.2 UNE)

La norma requiere acuerdos, roles y procesos claramente definidos entre los participantes del espacio de datos.

### Puntos Fuertes ✅

- **Roles claramente definidos** en el enum `organization_type`: `consumer`, `provider`, `data_holder`, con reglas de negocio diferenciadas para cada uno.
- **Flujo de aprobación multi-actor** con 8 estados de transacción (`initiated` → `pending_subject` → `pending_holder` → `approved` → `completed`), implementado en `data_transactions`.
- **Historial de aprobaciones** con auditoría completa (tabla `approval_history` con `actor_org_id`, `action`, `notes`).
- **SLAs implícitos** en servicios: "Homologación Flash" en 24 horas, respuesta a solicitudes de datos en 48 horas.
- **Contrato de adhesión** digital con firma electrónica y aceptación de términos y RGPD.

### Puntos Débiles ⚠️

- **No existe un Rulebook (Libro de Reglas)** publicado formalmente que defina derechos, obligaciones, sanciones y procedimientos de resolución de conflictos.
- **Falta proceso formal de onboarding** documentado como guía paso a paso para nuevos participantes.
- **Los SLAs no están formalizados** como acuerdos de nivel de servicio medibles con KPIs.

### Recomendaciones 📋

1. Redactar y publicar el **Libro de Reglas del Espacio ProcureData** con: requisitos de adhesión, derechos y obligaciones, régimen sancionador, procedimiento de resolución de conflictos, y política de salida.
2. Crear **"Guía del Participante ProcureData"** alineada con la Guía del Participante CRED.
3. Formalizar SLAs con KPIs medibles: tiempo de respuesta, disponibilidad del servicio, calidad de datos mínima.
4. Implementar un proceso de onboarding automatizado con checklist de requisitos.

---

## 7. Interoperabilidad Semántica (Sección 5.3 UNE)

La norma exige el uso de modelos de datos, vocabularios y ontologías comunes para garantizar la comprensión mutua entre participantes.

### Puntos Fuertes ✅

- **JSON-LD** como formato de normalización en el "Raw Data Normalizer" para representación semántica de datos.
- **Catálogo con metadatos estructurados**: tabla `catalog_metadata` con campos `tags`, `categories`, `visibility` y relación con `data_assets`.
- **Esquemas de datos definidos**: campo `schema_definition` (JSON Schema) en `data_products` para validación de estructura.
- **Datos de muestra** (`sample_data` en `data_assets`) para previsualización antes de la adquisición.

### Puntos Débiles ⚠️

- **No implementa DCAT-AP** (Data Catalog Application Profile) como perfil estándar europeo para descripción de catálogos de datos.
- **Sin validación SHACL** (Shapes Constraint Language) para verificar la conformidad de los datos contra sus esquemas.
- **Sin vocabularios controlados estándar** (como SKOS, eCl@ss, UNSPSC) para categorización uniforme.
- **Sin resolución de URIs** para identificadores persistentes de productos de datos.

### Recomendaciones 📋

1. **Implementar perfil DCAT-AP 3.0** en `catalog_metadata`: añadir campos `dct:title`, `dct:description`, `dct:publisher`, `dcat:distribution`, `dct:temporal`, `dct:spatial`.
2. **Añadir validación SHACL** como paso previo a la publicación de datos en el catálogo.
3. **Adoptar vocabularios controlados sectoriales**: eCl@ss para industrial, UNSPSC para compras, GPC para retail.
4. **Implementar resolución de URIs** con patrón `https://procuredata.eu/catalog/{product-id}`.
5. **Generar Self-Descriptions Gaia-X** para cada producto de datos publicado.

---

## 8. Interoperabilidad Técnica (Sección 5.4 UNE)

La norma requiere conectores estandarizados, protocolos de comunicación seguros y gestión de identidad federada.

### Puntos Fuertes ✅

- **API REST con JSON-LD** para comunicación entre servicios, con autenticación JWT y TLS 1.3.
- **Webhooks con firma HMAC-SHA256** para notificaciones en tiempo real de eventos (tabla `webhooks` con `events`, `secret`, `url`).
- **SDKs en múltiples lenguajes**: JavaScript (nativo), Python y Java (planificados).
- **Integración ERP completa**: configuraciones para SAP, Oracle, Microsoft Dynamics y Sage (tabla `erp_configurations` con `config_type`, `auth_method`, `field_mapping`, `endpoint_url`).
- **Edge Functions serverless** para lógica de negocio escalable (Deno runtime).
- **Protocolo de autenticación múltiple**: Bearer, API Key, OAuth 2.0, Basic Auth (enum `auth_method`).

### Puntos Débiles ⚠️

- **EDC no desplegado como conector operativo real**: está referenciado en la arquitectura y documentación, pero no se ejecuta como instancia de conector para negociación y transferencia de datos.
- **DSP (Dataspace Protocol) no implementado nativamente**: las transferencias de datos usan la API REST propia, no el protocolo estándar IDSA para negociación de contratos y transferencia de datos.
- **Sin Dataspace Protocol Connector** certificado por IDSA.
- **La federación de identidades** se limita a DID did:ethr; no hay soporte para SAML, OIDC federado o certificados X.509.

### Recomendaciones 📋

1. **Desplegar instancia EDC real** para cada participante, con soporte para Contract Negotiation y Data Transfer.
2. **Implementar DSP (Dataspace Protocol)** según la especificación IDSA v0.8+ para negociación y transferencia.
3. **Certificar conectores** contra el IDSA Certification Scheme.
4. **Añadir soporte OIDC/SAML** para federación de identidades empresariales (además de DID).
5. **Implementar Transfer Process Manager** para gestión del ciclo de vida de transferencias de datos.

---

## 9. Gobernanza del Espacio (Sección 6.1 UNE)

La norma define la necesidad de una Autoridad de Gobierno que administre el espacio con transparencia, rendición de cuentas y participación de los stakeholders.

### Puntos Fuertes ✅

- **Portal de Gobernanza** con sistema de votaciones para usuarios Pro, permitiendo participación en decisiones del espacio.
- **Comité de Ética del Dato** como instancia de resolución de disputas entre participantes.
- **Autonomía de nodos**: cualquier organización puede hospedar su propio nodo sectorial con infraestructura independiente.
- **Audit Logs exhaustivos**: tabla `audit_logs` con `action`, `actor_id`, `actor_email`, `details` (JSON), `ip_address`, `resource` para trazabilidad completa.
- **Registro de intentos de login** (tabla `login_attempts`) para detección de accesos no autorizados.

### Puntos Débiles ⚠️

- **La Autoridad de Gobierno no está constituida jurídicamente** como entidad independiente (asociación, fundación o consorcio).
- **Sin portal de transparencia público** donde se publiquen reglas, tarifas, auditorías y decisiones de gobierno.
- **Sin mecanismo formal de rendición de cuentas** hacia los participantes.

### Recomendaciones 📋

1. **Constituir la Autoridad de Gobierno** como asociación o fundación sin ánimo de lucro, con estatutos, junta directiva y mecanismo de elección.
2. **Publicar portal de transparencia** con: reglas del espacio, tarifas vigentes, informes de auditoría, actas de decisiones, métricas de uso.
3. **Implementar mecanismo de rendición de cuentas**: informes trimestrales, auditoría externa anual, canal de denuncias.
4. **Formalizar la participación de stakeholders** en la toma de decisiones más allá de las votaciones Pro.

---

## 10. Gobernanza de Interoperabilidad (Sección 6.2 UNE)

La norma exige protocolos de confianza, acuerdos de seguridad y mecanismos de verificación entre participantes.

### Puntos Fuertes ✅

- **Trust Framework Gaia-X** integrado con Self-Descriptions para publicación de capacidades y políticas de cada participante.
- **Verificación automática de certificaciones** a través del campo `kyb_verified` y `pontus_verified` en organizaciones.
- **Cifrado de comunicaciones**: TLS 1.3 para tránsito, AES-256 para reposo, JWT firmado para autenticación.
- **Row-Level Security (RLS)** de PostgreSQL como garantía de aislamiento multi-tenant a nivel de base de datos.
- **Verificación KYB** con proceso automatizado de 24 horas.

### Puntos Débiles ⚠️

- **Sin Trust Anchors formales** reconocidos por el ecosistema (no hay entidades certificadoras de confianza designadas).
- **Niveles de seguridad (LoA) no diferenciados**: todas las transacciones tienen el mismo nivel de aseguramiento independientemente de su sensibilidad.
- **Sin política de gestión de claves** publicada (rotación, custodia, recuperación).

### Recomendaciones 📋

1. **Definir Trust Anchors** del espacio: entidades que emiten credenciales de confianza (cámaras de comercio, registros mercantiles).
2. **Implementar LoA diferenciados**: nivel bajo (verificación de email), sustancial (KYB + DID), alto (eIDAS + certificado cualificado).
3. **Publicar política de gestión de claves**: rotación periódica, custodia segura (HSM), proceso de recuperación.
4. **Implementar mutual TLS (mTLS)** para comunicaciones entre conectores críticos.

---

## 11. Gobernanza de Datos (Sección 6.3 UNE)

La norma requiere contratos digitales vinculados a cada transacción de datos, métricas de calidad y trazabilidad del linaje.

### Puntos Fuertes ✅

- **Contratos ODRL vinculados a cada transacción**: tabla `data_policies` con `odrl_policy_json` ligada a `transaction_id`.
- **Health Score con 4 dimensiones de calidad**:
  - **Integridad**: completitud de campos obligatorios
  - **Actualización**: frecuencia de refresco de los datos
  - **Veracidad**: validación cruzada contra fuentes oficiales
  - **Cumplimiento**: conformidad con esquemas y políticas
- **Data Cleansing** automatizado: normalización de formatos, deduplicación, validación de tipos.
- **Linaje de datos** trazable: desde la fuente (Data Holder) hasta el consumidor, con registro de cada transformación.
- **Payloads de datos** con esquema tipado (tabla `data_payloads` con `schema_type` y `data_content`).

### Puntos Débiles ⚠️

- **La calidad del dato no es declarada formalmente** por los proveedores al publicar activos: no hay campo obligatorio de "declaración de calidad".
- **Sin verificación cruzada automática** de la calidad declarada vs. la calidad real del dato recibido.
- **Sin certificación de calidad por terceros** (auditoría independiente de la calidad de los datos).

### Recomendaciones 📋

1. **Añadir declaración de calidad obligatoria** al publicar activos en el catálogo: frecuencia de actualización, cobertura, método de validación.
2. **Implementar verificación cruzada** de calidad: comparar Health Score declarado vs. calculado automáticamente al recibir los datos.
3. **Crear programa de certificación de calidad** con auditoría independiente.
4. **Añadir SLA de calidad** a los contratos ODRL: score mínimo aceptable, penalización por incumplimiento.

---

## 12. Roles y Responsabilidades (Sección 6.4 UNE)

La norma define una matriz de roles: Consumidor, Proveedor, Titular de Datos, Operador del Espacio, Intermediario, Desarrollador de Aplicaciones.

### Puntos Fuertes ✅

- **Consumer, Provider, Data Holder** bien definidos con reglas de negocio diferenciadas y permisos RLS específicos.
- **Flujo de aprobación tripartito** que refleja la interacción entre los tres roles principales.
- **Catálogo diferenciado** por rol: los Providers publican, los Consumers buscan, los Holders custodian.

### Puntos Débiles ⚠️

- **Falta rol "Operador del Espacio"** formalizado como entidad responsable de la infraestructura y operación.
- **Falta rol "Proveedor de Servicios de Intermediación"** según DGA Art. 11 (intermediario neutral entre oferta y demanda de datos).
- **Falta rol "Desarrollador de Aplicaciones"** para terceros que construyan sobre el espacio de datos.
- **Los roles actuales no distinguen** entre "Titular de los Datos" (entidad custodia) y "Propietario de los Datos" (entidad con derechos legales).

### Recomendaciones 📋

1. **Formalizar el rol de Operador** del Espacio: ProcureData como entidad operadora con responsabilidades definidas (disponibilidad, seguridad, soporte).
2. **Preparar registro como intermediario** según DGA Art. 11: requisitos de neutralidad, transparencia y no discriminación.
3. **Abrir API/marketplace para desarrolladores** terceros con documentación, sandbox y programa de partners.
4. **Distinguir formalmente** entre Titular (custodia) y Propietario (derechos legales) en la matriz de roles.

---

## 13. Valor y Modelos de Negocio (Sección 7 UNE)

La norma establece que los espacios de datos deben generar valor económico sostenible para todos los participantes.

### Puntos Fuertes ✅

- **Modelo de negocio dual sostenible**:
  - **Pay-per-use**: 1 EUROe por transacción, sin compromisos de volumen.
  - **Membresía Pro**: 100 EUROe/año con beneficios adicionales (gobernanza, análisis avanzado, prioridad de soporte).
- **22 servicios de valor añadido** categorizados en: Identidad, Verificación, Transformación, Analítica, Integración, Gobernanza.
- **47 casos de uso verificados** en 6 sectores industriales con métricas de impacto.
- **Stablecoin EUROe** para pagos regulados, evitando volatilidad cripto.
- **Marketplace federado** donde proveedores publican y consumers descubren datos con precios transparentes.

### Puntos Débiles ⚠️

- **Sin plan formal de sostenibilidad** post-financiación pública: no se documenta cómo el proyecto será autosuficiente.
- **Sin métricas de impacto económico** agregadas (ROI promedio para participantes, ahorro de costes verificado).
- **Un solo modelo de monetización** para el operador (comisiones); falta diversificación.

### Recomendaciones 📋

1. **Documentar plan de sostenibilidad a 3 años** con proyecciones de ingresos, costes operativos y punto de equilibrio.
2. **Evaluar modelos adicionales de monetización**: barter de datos, comisiones de marketplace, servicios premium de IA, formación certificada.
3. **Publicar informe de impacto económico** con ROI verificado de participantes piloto.
4. **Implementar modelo freemium** documentado para atraer nuevos participantes con barrera de entrada baja.

---

## 14. Operacionalización CRED (Sección 8 UNE)

La norma describe la relación con el CRED (Componente de Referencia para Espacios de Datos) y el Kit Digital para Espacios de Datos como instrumentos de operacionalización en España.

### Puntos Fuertes ✅

- **Alineamiento natural** con los requisitos del Kit Espacios de Datos: arquitectura descentralizada, conectores, identidad digital, catálogo.
- **Arquitectura compatible** con el marco de referencia CRED publicado por el Gobierno de España.
- **Documentación técnica extensa** que facilita la evaluación de conformidad.
- **Nodos sectoriales** como modelo de despliegue compatible con la visión de espacios de datos sectoriales del CRED.

### Puntos Débiles ⚠️

- **Sin certificación formal CRED**: no se ha sometido al proceso de verificación de conformidad.
- **Sin alineamiento explícito** con la Guía del Promotor ni con la Guía del Participante CRED.
- **Sin participación formal** en los grupos de trabajo del CRED.

### Recomendaciones 📋

1. **Solicitar verificación de conformidad** UNE 0087 a través del proceso CRED.
2. **Documentar alineamiento** con la Guía del Promotor (estructura del espacio) y la Guía del Participante (requisitos de adhesión).
3. **Participar en los grupos de trabajo** del CRED para influir en la evolución del marco de referencia.
4. **Solicitar financiación** del Kit Espacios de Datos para despliegue de nodos sectoriales.

---

## Tabla Resumen de Conformidad

| # | Requisito UNE | Sección | Estado | Prioridad | Acción Requerida |
|---|---------------|---------|--------|-----------|-----------------|
| 1 | Descentralización | 4.3.1 | ✅ CUMPLE | — | Mantener arquitectura actual |
| 2 | Soberanía sobre Participantes | 4.1.1 | ✅ CUMPLE | — | Añadir eIDAS 2.0 cuando disponible |
| 3 | Soberanía sobre Activos | 4.1.2 | ✅ CUMPLE | — | Automatizar negociación ODRL |
| 4 | Soberanía sobre Infraestructura | 4.1.3 | ⚠️ PARCIAL | Media | Documentar plan de portabilidad |
| 5 | Interoperabilidad Legal | 5.1 | ✅ CUMPLE | — | Añadir soporte Data Act |
| 6 | Interoperabilidad Organizativa | 5.2 | ⚠️ PARCIAL | **Alta** | **Publicar Libro de Reglas** |
| 7 | Interoperabilidad Semántica | 5.3 | ⚠️ PARCIAL | **Alta** | **Implementar DCAT-AP 3.0** |
| 8 | Interoperabilidad Técnica | 5.4 | ✅ CUMPLE | Media | Desplegar EDC operativo |
| 9 | Gobernanza del Espacio | 6.1 | ⚠️ PARCIAL | **Alta** | **Constituir Autoridad de Gobierno** |
| 10 | Gobernanza de Interoperabilidad | 6.2 | ✅ CUMPLE | Baja | Definir Trust Anchors |
| 11 | Gobernanza de Datos | 6.3 | ✅ CUMPLE | Media | Declaración obligatoria de calidad |
| 12 | Matriz de Roles | 6.4 | ⚠️ PARCIAL | Media | Formalizar rol Operador |
| 13 | Modelos de Negocio | 7.1 | ✅ CUMPLE | Baja | Plan de sostenibilidad |
| 14 | Casos de Uso | 7.2 | ✅ CUMPLE | — | Mantener y ampliar |
| 15 | Servicios Habilitadores | 7.3 | ✅ CUMPLE | — | Ampliar catálogo de servicios |
| 16 | Gestión de Identidad Federada | 5.4 IAM | ⚠️ PARCIAL | **Alta** | **Completar SSI con VCs** |
| 17 | Calidad de Datos | 6.3.2 | ✅ CUMPLE | Media | Verificación cruzada |
| 18 | Trazabilidad y Auditoría | 6.3.3 | ✅ CUMPLE | — | Mantener audit logs |
| 19 | Derecho al Olvido GDPR | 5.1 RGPD | ✅ CUMPLE | — | Certificar proceso |
| 20 | Datos Sintéticos | 7.3.x | ✅ CUMPLE | — | Ampliar capacidades IA |
| 21 | Resiliencia | 4.1.3 | ✅ CUMPLE | Baja | Documentar modo offline |
| 22 | Alineamiento CRED | 8 | ⚠️ PARCIAL | **Alta** | **Solicitar certificación CRED** |

---

## Hoja de Ruta de Conformidad

### Fase 1: Corto Plazo (0-6 meses) — Prioridad Alta

| Acción | Responsable | Entregable |
|--------|-------------|-----------|
| Constituir Autoridad de Gobierno | Dirección | Estatutos + Junta Directiva |
| Publicar Libro de Reglas | Legal + Producto | Documento público v1.0 |
| Implementar DCAT-AP 3.0 en catálogo | Ingeniería | Campos DCAT-AP en catalog_metadata |
| Completar SSI con Verifiable Credentials | Ingeniería | Emisión y verificación de VCs |
| Solicitar certificación CRED | Dirección | Expediente de conformidad |
| Publicar glosario UNE 0087 | Documentación | Glosario público mapeado |

### Fase 2: Medio Plazo (6-12 meses) — Prioridad Media

| Acción | Responsable | Entregable |
|--------|-------------|-----------|
| Desplegar instancia EDC operativa | Ingeniería | EDC Connector v0.5+ |
| Implementar DSP (Dataspace Protocol) | Ingeniería | Módulo DSP para negociación |
| Integrar validación SHACL | Ingeniería | Validator SHACL en pipeline |
| Formalizar SLAs con KPIs | Producto | SLAs documentados |
| Crear portal de transparencia | Producto + Legal | Portal público |
| Documentar plan de portabilidad | Arquitectura | Plan de migración |

### Fase 3: Largo Plazo (12-24 meses) — Consolidación

| Acción | Responsable | Entregable |
|--------|-------------|-----------|
| Certificación IDSA | Dirección | Certificado IDSA |
| Integración eIDAS 2.0 / EUDIW | Ingeniería | Soporte EUDIW |
| Registro como intermediario DGA | Legal | Registro oficial |
| Despliegue en nube soberana europea | Infraestructura | Instancia OVH/IONOS |
| Auditoría de calidad por terceros | Calidad | Informe de auditoría |
| Plan de sostenibilidad a 3 años | Dirección | Documento financiero |

---

## Conclusiones

ProcureData presenta un **nivel de conformidad estimado del 78%** respecto a UNE 0087:2025, con fortalezas destacadas en:

- **Descentralización y soberanía**: la arquitectura tripartita y el motor ODRL proporcionan un control robusto sobre participantes, activos y políticas.
- **Interoperabilidad técnica**: APIs REST, webhooks, conectores ERP y SDKs multilenguaje.
- **Gobernanza de datos**: Health Score, contratos ODRL, trazabilidad blockchain y audit logs inmutables.
- **Generación de valor**: modelo de negocio dual (pay-per-use + Pro) con 47 casos verificados.

Las áreas prioritarias de mejora se concentran en:

1. **Gobernanza formal**: constitución jurídica de la Autoridad de Gobierno y publicación del Libro de Reglas.
2. **Interoperabilidad semántica**: adopción de DCAT-AP 3.0 y validación SHACL.
3. **Identidad digital avanzada**: completar SSI con credenciales verificables y preparar integración eIDAS 2.0.
4. **Conectores estandarizados**: despliegue operativo de EDC y implementación de DSP.
5. **Certificación formal**: solicitar verificación CRED y certificación IDSA.

La hoja de ruta propuesta permite alcanzar un **nivel de conformidad superior al 95%** en un horizonte de 24 meses, posicionando a ProcureData como uno de los primeros espacios de datos conformes a UNE 0087:2025 en el ecosistema español.

---

## Obras Citadas

1. UNE 0087:2025 — Definición y caracterización de los espacios de datos. Asociación Española de Normalización.
2. ODRL Information Model 2.2 — W3C Recommendation (2018). https://www.w3.org/TR/odrl-model/
3. Eclipse Dataspace Connector — Eclipse Foundation. https://github.com/eclipse-edc
4. Gaia-X Trust Framework — Gaia-X AISBL. https://gaia-x.eu/trust-framework/
5. DCAT-AP 3.0 — European Commission. https://semiceu.github.io/DCAT-AP/
6. SHACL — W3C Recommendation (2017). https://www.w3.org/TR/shacl/
7. Data Governance Act — Regulation (EU) 2022/868.
8. Data Act — Regulation (EU) 2023/2854.
9. eIDAS 2.0 — Regulation (EU) 2024/1183.
10. IDSA Reference Architecture Model 4.0 — International Data Spaces Association.
11. Pontus-X Network — deltaDAO AG. https://pontus-x.eu
12. CRED — Componente de Referencia para Espacios de Datos, Gobierno de España (2025).

---

*Documento elaborado por el equipo técnico de ProcureData · Febrero 2026*
*Versión 1.0 · Uso interno y público*
