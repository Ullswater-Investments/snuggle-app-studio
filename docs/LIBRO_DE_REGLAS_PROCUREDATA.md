# Libro de Reglas del Espacio de Datos ProcureData

## Preámbulo

El presente Libro de Reglas (Rulebook) establece el marco normativo, operativo y de gobernanza del Espacio de Datos **ProcureData**, conforme a los principios de la especificación **UNE 0087:2025**, el marco **IDSA Rulebook** y los requisitos del ecosistema **Gaia-X**.

Este documento es de obligado cumplimiento para todos los participantes del espacio de datos y constituye el acuerdo marco de adhesión al ecosistema ProcureData.

**Versión**: 1.0  
**Fecha de entrada en vigor**: Febrero 2026  
**Autoridad emisora**: Comité de Gobierno de ProcureData  
**Última revisión**: Febrero 2026

---

## Capítulo 1: Objeto y Ámbito de Aplicación

### 1.1 Objeto

El presente Libro de Reglas tiene por objeto:

1. **Definir las normas de participación** en el Espacio de Datos ProcureData.
2. **Establecer los derechos y obligaciones** de todos los participantes.
3. **Regular las condiciones de uso, acceso y compartición** de datos dentro del espacio.
4. **Garantizar la soberanía digital** de los participantes sobre sus datos, identidad e infraestructura.
5. **Asegurar la interoperabilidad** legal, organizativa, semántica y técnica conforme a UNE 0087:2025.

### 1.2 Ámbito de aplicación

Este Libro de Reglas se aplica a:

- **Todas las organizaciones** registradas en ProcureData, independientemente de su rol (Consumer, Provider, Data Holder).
- **Todas las transacciones de datos** realizadas a través de la plataforma.
- **Todos los servicios** ofrecidos dentro del ecosistema ProcureData.
- **Todos los nodos sectoriales** operados bajo la marca ProcureData.

### 1.3 Normativa de referencia

| Norma | Descripción |
|-------|-------------|
| UNE 0087:2025 | Definición y caracterización de los espacios de datos |
| UNE 0077 | Gobierno del dato |
| UNE 0079 | Calidad del dato |
| RGPD (UE) 2016/679 | Reglamento General de Protección de Datos |
| Data Governance Act (UE) 2022/868 | Gobernanza de datos |
| Data Act (UE) 2023/2854 | Acceso y uso justo de datos |
| ODRL 2.0 (W3C) | Lenguaje de políticas de uso de datos |
| IDSA Rulebook v2.0 | Marco de referencia para espacios de datos IDSA |
| Gaia-X Trust Framework | Marco de confianza del ecosistema Gaia-X |

---

## Capítulo 2: Requisitos de Adhesión

### 2.1 Elegibilidad

Pueden solicitar la adhesión al Espacio de Datos ProcureData:

1. **Personas jurídicas** con CIF/NIF válido, domiciliadas en la Unión Europea o en países con acuerdo de adecuación de protección de datos.
2. **Administraciones públicas** y entidades del sector público.
3. **Instituciones académicas y de investigación** con personalidad jurídica propia.

**No son elegibles**: personas físicas a título individual, entidades sin personalidad jurídica, ni organizaciones de países sin acuerdo de adecuación de datos con la UE.

### 2.2 Proceso de adhesión

El proceso de adhesión consta de las siguientes fases:

#### Fase 1: Solicitud (Día 0)
- Cumplimentar el formulario de registro con datos del representante legal, datos fiscales y descripción de la actividad.
- Aceptar los términos de uso, la política de privacidad y el presente Libro de Reglas.
- Aceptar el código de conducta del espacio de datos.

#### Fase 2: Verificación KYB (Día 0-1)
- **Homologación Flash** (24 horas): verificación automatizada de CIF/NIF contra registros oficiales, comprobación de dirección fiscal y validación de representante legal.
- Generación automática de **DID (Decentralized Identifier)** con método `did:ethr` en la red Pontus-X.
- Asignación de **wallet Web3** para operaciones con tokens EUROe.

#### Fase 3: Onboarding técnico (Día 1-3)
- Configuración del perfil organizacional: logo, descripción, sector, contacto.
- Configuración de integración ERP (opcional): SAP, Oracle, Microsoft Dynamics, Sage.
- Configuración de webhooks para notificaciones en tiempo real.
- Formación inicial sobre el uso de la plataforma (documentación + tour guiado interactivo).

#### Fase 4: Activación (Día 3)
- Firma digital del **Contrato de Adhesión** con registro en blockchain Pontus-X.
- Activación del acceso al catálogo de datos y servicios.
- Emisión de credenciales verificables.

### 2.3 Documentación requerida

| Documento | Obligatorio | Descripción |
|-----------|:-----------:|-------------|
| CIF/NIF de la entidad | ✅ | Identificación fiscal válida |
| Escritura de constitución | ✅ | Documento notarial de constitución |
| Poder de representación | ✅ | Del firmante del contrato de adhesión |
| Certificado de estar al corriente con Hacienda | ✅ | Vigente en los últimos 3 meses |
| Certificado de estar al corriente con la Seguridad Social | ✅ | Vigente en los últimos 3 meses |
| Certificado ISO 27001 | ❌ | Recomendado para proveedores de datos |
| Certificado ESG | ❌ | Requerido para badge "Green" |
| Informe de auditoría de datos | ❌ | Requerido para publicar datos premium |

### 2.4 Renovación y mantenimiento

- La adhesión se renueva automáticamente cada año, salvo notificación escrita de baja con 30 días de antelación.
- La verificación KYB se actualiza anualmente de forma automática.
- Los participantes deben mantener actualizada su documentación y notificar cambios relevantes en un plazo máximo de 15 días.

---

## Capítulo 3: Derechos y Obligaciones de los Participantes

### 3.1 Roles reconocidos

| Rol | Descripción | Capacidades |
|-----|-------------|-------------|
| **Consumer** (Consumidor de Datos) | Organización que solicita y utiliza datos de terceros | Buscar en catálogo, solicitar datos, aceptar políticas, usar datos según contrato |
| **Provider** (Proveedor de Datos) | Organización que publica datos propios o de terceros | Publicar activos, definir precios, configurar políticas ODRL, gestionar catálogo |
| **Data Holder** (Titular de Datos) | Organización que custodia los datos originales | Aprobar/denegar solicitudes, gestionar acceso, garantizar calidad |

### 3.2 Derechos comunes a todos los participantes

1. **Derecho a la soberanía digital**: control total sobre su identidad, datos y decisiones dentro del espacio.
2. **Derecho a la información**: acceso a las reglas, tarifas, métricas y decisiones de gobierno del espacio.
3. **Derecho a la portabilidad**: exportar todos sus datos y configuraciones en cualquier momento en formato estándar.
4. **Derecho a la participación**: votar en decisiones de gobernanza (usuarios Pro) y proponer mejoras.
5. **Derecho a la resolución de conflictos**: acceder al Comité de Ética para resolver disputas.
6. **Derecho a la baja voluntaria**: abandonar el espacio en cualquier momento, con portabilidad de datos garantizada.

### 3.3 Obligaciones comunes a todos los participantes

1. **Cumplir el presente Libro de Reglas** y la normativa aplicable (RGPD, Data Act, DGA).
2. **Mantener la información actualizada**: perfil, documentación, datos de contacto.
3. **Actuar de buena fe**: no manipular datos, no suplantar identidades, no realizar actividades fraudulentas.
4. **Respetar las políticas ODRL**: cumplir los permisos, prohibiciones y deberes de cada contrato de datos.
5. **Colaborar en auditorías**: facilitar la información necesaria cuando sea requerida por el Comité de Gobierno.
6. **Notificar incidentes de seguridad**: informar de brechas de datos en un plazo máximo de 72 horas (conforme RGPD Art. 33).

### 3.4 Obligaciones específicas por rol

#### Consumer
- Utilizar los datos exclusivamente para el propósito declarado en la solicitud.
- No redistribuir datos sin autorización explícita del Titular.
- Eliminar los datos al expirar el período de acceso contratado.
- Proporcionar feedback sobre la calidad de los datos recibidos.

#### Provider
- Garantizar la veracidad y actualización de los datos publicados.
- Declarar el nivel de calidad de los datos (Health Score mínimo).
- Definir políticas ODRL claras y completas para cada activo de datos.
- Responder a solicitudes de datos en un plazo máximo de 48 horas.

#### Data Holder
- Custodiar los datos con medidas de seguridad adecuadas (cifrado AES-256 en reposo, TLS 1.3 en tránsito).
- Aprobar o denegar solicitudes de acceso en un plazo máximo de 48 horas.
- Implementar el derecho al olvido cuando sea solicitado conforme al RGPD.
- Mantener registros de acceso y trazabilidad (audit logs) durante un mínimo de 5 años.

---

## Capítulo 4: Políticas de Uso de Datos

### 4.1 Marco de políticas ODRL

Todas las transacciones de datos en ProcureData se rigen por políticas expresadas en **ODRL 2.0 (Open Digital Rights Language)**, el estándar W3C para la expresión de derechos y obligaciones sobre activos digitales.

### 4.2 Estructura de una política ODRL en ProcureData

Cada política de datos incluye obligatoriamente:

#### Permisos (odrl:permission)
| Permiso | Código ODRL | Descripción |
|---------|-------------|-------------|
| Uso | `odrl:use` | Utilizar los datos para el propósito declarado |
| Lectura | `odrl:read` | Consultar y visualizar los datos |
| Distribución | `odrl:distribute` | Compartir con terceros autorizados |
| Agregación | `odrl:aggregate` | Combinar con otros conjuntos de datos |

#### Prohibiciones (odrl:prohibition)
| Prohibición | Código ODRL | Descripción |
|-------------|-------------|-------------|
| Modificación | `odrl:modify` | Alterar los datos originales |
| Comercialización | `odrl:commercialize` | Vender o monetizar los datos directamente |
| Eliminación | `odrl:delete` | Eliminar el dato original del titular |

#### Deberes (odrl:duty)
| Deber | Código ODRL | Descripción |
|-------|-------------|-------------|
| Atribución | `odrl:attribute` | Citar la fuente de los datos |
| Compensación | `odrl:compensate` | Pagar la tarifa acordada |
| Eliminación post-uso | `odrl:delete` | Eliminar datos al expirar el acceso |
| Notificación | `odrl:inform` | Informar al titular sobre el uso dado |

#### Restricciones (odrl:constraint)
| Restricción | Código ODRL | Descripción |
|-------------|-------------|-------------|
| Temporal | `odrl:temporal` | Período de validez del acceso |
| Geográfica | `odrl:spatial` | Jurisdicción de uso permitido |
| Propósito | `odrl:purpose` | Finalidad autorizada del uso |
| Formato | `odrl:format` | Formato de entrega permitido |

### 4.3 Políticas predefinidas

ProcureData ofrece plantillas de políticas predefinidas para facilitar la configuración:

1. **Estándar**: uso + lectura, atribución obligatoria, vigencia 365 días, ámbito UE.
2. **Restrictiva**: solo lectura, sin distribución, vigencia 90 días, propósito específico.
3. **Abierta**: uso + lectura + agregación + distribución, atribución obligatoria, sin restricción temporal.
4. **Personalizada**: configuración libre de todos los elementos ODRL.

### 4.4 Validación de políticas

- Toda política ODRL generada es validada sintácticamente antes de su publicación.
- Las políticas se registran como JSON-LD en la tabla `data_policies` con enlace inmutable a la transacción.
- El hash de cada política se registra en blockchain Pontus-X como prueba de existencia.

---

## Capítulo 5: Régimen Sancionador

### 5.1 Principios

El régimen sancionador se rige por los principios de **proporcionalidad**, **gradualidad**, **contradicción** (derecho a ser oído) y **non bis in idem** (no doble sanción por el mismo hecho).

### 5.2 Infracciones

#### Infracciones leves
- Retraso en la actualización de documentación (15-30 días).
- No responder a solicitudes de datos en el plazo establecido (48h-7 días).
- Incumplimiento menor de políticas ODRL sin perjuicio económico.

#### Infracciones graves
- Violación de políticas ODRL con perjuicio económico para el titular.
- No notificar incidentes de seguridad en el plazo de 72 horas.
- Proporcionar datos falsos o manipulados de forma negligente.
- Retraso superior a 30 días en la actualización de documentación crítica.

#### Infracciones muy graves
- Suplantación de identidad o uso fraudulento de credenciales.
- Redistribución no autorizada de datos protegidos.
- Proporcionar datos falsos o manipulados de forma deliberada y reiterada.
- Violación de la privacidad de datos personales (infracción RGPD).
- Actividades que pongan en riesgo la integridad del espacio de datos.

### 5.3 Sanciones

| Nivel | Sanción | Infracciones |
|-------|---------|-------------|
| **Advertencia** | Notificación formal + plazo de corrección (15 días) | Leves (1ª vez) |
| **Amonestación** | Registro público en el perfil + restricción temporal de publicación (30 días) | Leves (reincidencia) / Graves (1ª vez) |
| **Suspensión** | Inhabilitación temporal (30-180 días) para operar en el espacio | Graves (reincidencia) |
| **Expulsión** | Baja definitiva del espacio + comunicación a autoridades si procede | Muy graves |

### 5.4 Procedimiento sancionador

1. **Detección**: por auditoría automática, denuncia de otro participante o inspección del Comité de Gobierno.
2. **Notificación**: comunicación formal al participante afectado con descripción de los hechos y plazo de alegaciones (15 días).
3. **Alegaciones**: el participante puede presentar alegaciones y pruebas en su descargo.
4. **Resolución**: el Comité de Gobierno emite resolución motivada en un plazo máximo de 30 días.
5. **Recurso**: el participante puede recurrir ante el Comité de Ética en un plazo de 15 días.
6. **Ejecución**: la sanción se ejecuta al día siguiente de agotar los plazos de recurso.

---

## Capítulo 6: Resolución de Conflictos

### 6.1 Vías de resolución

ProcureData establece un sistema escalonado de resolución de conflictos:

#### Nivel 1: Negociación directa
- Las partes intentan resolver el conflicto de forma bilateral.
- Plazo máximo: 15 días desde la comunicación formal del conflicto.
- Canal: sistema de mensajería integrado en la plataforma (`transaction_messages`).

#### Nivel 2: Mediación del Comité de Ética
- Si la negociación directa fracasa, cualquier parte puede solicitar mediación.
- El Comité de Ética designa un mediador neutral.
- Plazo máximo: 30 días desde la solicitud de mediación.
- Coste: gratuito para la primera mediación; 50 EUROe a partir de la segunda.

#### Nivel 3: Arbitraje
- Si la mediación fracasa, las partes pueden someterse a arbitraje vinculante.
- El árbitro es designado por el Comité de Ética de una lista de árbitros acreditados.
- Plazo máximo: 60 días desde la solicitud de arbitraje.
- Coste: según la cuantía en disputa (baremo publicado en el Portal de Transparencia).

#### Nivel 4: Jurisdicción ordinaria
- En caso de que las vías anteriores no sean suficientes, las partes conservan su derecho a acudir a la jurisdicción ordinaria.
- Jurisdicción: Juzgados y Tribunales de Barcelona (España), salvo pacto en contrario.

### 6.2 Comité de Ética del Dato

El Comité de Ética del Dato está compuesto por:

- **3 miembros independientes**: expertos en protección de datos, derecho digital y ética de la IA.
- **2 representantes del ecosistema**: elegidos por votación de los participantes Pro.
- **1 representante del Operador**: designado por ProcureData.

**Mandato**: 2 años, renovable una vez.  
**Reuniones**: trimestrales ordinarias + extraordinarias cuando sea necesario.  
**Decisiones**: por mayoría simple, con voto de calidad del presidente.

---

## Capítulo 7: Política de Salida y Portabilidad de Datos

### 7.1 Derecho de salida

Todo participante puede abandonar el Espacio de Datos ProcureData en cualquier momento, notificando su decisión con un preaviso mínimo de **30 días naturales**.

### 7.2 Proceso de salida

1. **Solicitud de baja**: el participante comunica su decisión a través de la plataforma o por escrito al Comité de Gobierno.
2. **Periodo de transición** (30 días):
   - Cumplimiento de contratos vigentes y obligaciones pendientes.
   - Exportación de todos los datos propios en formato estándar (JSON, CSV, JSON-LD).
   - Descarga de historial de transacciones, políticas y audit logs.
3. **Desactivación**:
   - Se desactivan las credenciales y el acceso a la plataforma.
   - Se eliminan los datos del participante de los sistemas activos.
   - El DID y los registros en blockchain permanecen como evidencia inmutable.
4. **Certificado de baja**: se emite un certificado de baja que acredita el cumplimiento de las obligaciones y la fecha de desvinculación efectiva.

### 7.3 Portabilidad de datos

Conforme al **RGPD Art. 20** y al **Data Act Arts. 5-9**, ProcureData garantiza:

- **Exportación completa** de todos los datos propios en formatos interoperables (JSON, CSV, JSON-LD, RDF).
- **Exportación de metadatos**: catálogo, políticas ODRL, esquemas, historial de transacciones.
- **Exportación de configuraciones**: integraciones ERP, webhooks, campo de mapeo.
- **Plazo de entrega**: máximo 30 días desde la solicitud.
- **Formato de entrega**: archivo comprimido (ZIP) disponible para descarga + opción de transferencia directa a otro espacio de datos compatible con DSP.

### 7.4 Retención post-salida

Tras la baja efectiva, ProcureData retiene únicamente:

| Dato | Período de retención | Justificación |
|------|---------------------|---------------|
| Registros de auditoría | 5 años | Obligación legal (RGPD Art. 30) |
| Hashes de transacciones en blockchain | Permanente | Inmutabilidad de la cadena |
| Datos anonimizados para estadísticas | Permanente | Interés legítimo del operador |

---

## Capítulo 8: Acuerdos de Nivel de Servicio (SLAs)

### 8.1 SLAs de la plataforma

| KPI | Objetivo | Método de medición |
|-----|----------|-------------------|
| **Disponibilidad** | ≥ 99,5% mensual | Monitorización automatizada 24/7 |
| **Tiempo de respuesta API** | ≤ 500 ms (p95) | Prometheus + Grafana |
| **Tiempo de resolución de incidencias críticas** | ≤ 4 horas | Ticket system SLA tracking |
| **Tiempo de resolución de incidencias normales** | ≤ 24 horas | Ticket system SLA tracking |
| **Tiempo de verificación KYB** | ≤ 24 horas | Proceso automatizado |
| **Tiempo de respuesta a solicitudes de datos** | ≤ 48 horas | Medido en `data_transactions` |

### 8.2 SLAs de calidad de datos

| KPI | Objetivo | Método de medición |
|-----|----------|-------------------|
| **Health Score mínimo** | ≥ 70/100 | Health Score automático |
| **Integridad** | ≥ 85% campos completos | Validación automática |
| **Actualización** | Según frecuencia declarada | Timestamps en `data_assets` |
| **Veracidad** | ≥ 90% validación cruzada | Contraste con fuentes oficiales |
| **Cumplimiento** | 100% con esquema declarado | Validación JSON Schema |

### 8.3 Compensaciones por incumplimiento

| Incumplimiento | Compensación |
|----------------|-------------|
| Disponibilidad < 99,5% | Crédito del 10% de la factura mensual por cada 0,1% por debajo |
| Tiempo de respuesta API > 500ms (sostenido > 1h) | Crédito del 5% de la factura mensual |
| Datos con Health Score < 70 | Reembolso completo de la transacción afectada |
| No respuesta en 48h a solicitud de datos | Priorización automática + notificación al Comité |

### 8.4 Exclusiones

Los SLAs no aplican en los siguientes casos:

- **Mantenimiento programado**: comunicado con al menos 48 horas de antelación, máximo 4 horas mensuales.
- **Fuerza mayor**: desastres naturales, conflictos bélicos, pandemias, fallos de proveedores de infraestructura.
- **Acciones del participante**: uso indebido de la API, ataques de denegación de servicio originados por el participante.

---

## Capítulo 9: Tarifas Vigentes

### 9.1 Modelo de precios

ProcureData opera con un modelo de precios dual, transparente y predecible:

#### Plan Básico (Pay-per-use)
| Concepto | Tarifa | Moneda |
|----------|--------|--------|
| Transacción de datos (solicitar + recibir) | 1 EUROe | EUROe (stablecoin) |
| Registro y KYB | Gratuito | — |
| Acceso al catálogo | Gratuito | — |
| Uso de servicios básicos (búsqueda, filtrado) | Gratuito | — |

#### Plan Pro (Membresía mensual)
| Concepto | Tarifa | Moneda |
|----------|--------|--------|
| Membresía mensual Pro | 300 EUROe/mes | EUROe |
| Incluye | Votaciones de gobernanza, análisis avanzado, soporte prioritario, badge "Pro" | — |

#### Servicios adicionales
| Servicio | Tarifa | Descripción |
|----------|--------|-------------|
| Homologación Express (< 4h) | 25 EUROe | Verificación KYB acelerada |
| Informe de analítica avanzada | 10 EUROe | Informes personalizados de uso y calidad |
| Mediación de conflictos (2ª+) | 50 EUROe | A partir de la segunda mediación |
| Certificación de calidad de datos | 75 EUROe | Auditoría independiente de un activo de datos |
| Nodo sectorial dedicado | Consultar | Despliegue de infraestructura sectorial |

### 9.2 Método de pago

- **Stablecoin EUROe**: pago nativo en la plataforma a través de wallet Web3 (MetaMask).
- **Transferencia bancaria**: disponible para pagos anuales (Plan Pro, nodos sectoriales).
- **Facturación**: se emite factura electrónica conforme a la normativa española para cada transacción.

### 9.3 Política de reembolsos

- Las transacciones de datos son reembolsables si los datos no cumplen el Health Score declarado (< 70).
- Las membresías Pro son reembolsables de forma prorrateada dentro de los primeros 30 días.
- Los servicios adicionales no son reembolsables una vez ejecutados.

---

## Capítulo 10: Modificaciones y Versionado

### 10.1 Proceso de modificación

Las modificaciones al presente Libro de Reglas siguen el siguiente proceso:

1. **Propuesta**: cualquier participante Pro o el Comité de Gobierno puede proponer una modificación.
2. **Consulta pública**: la propuesta se publica durante 30 días para comentarios de todos los participantes.
3. **Votación**: los participantes Pro votan la propuesta (mayoría simple para cambios menores, 2/3 para cambios estructurales).
4. **Aprobación**: el Comité de Gobierno ratifica el resultado de la votación.
5. **Publicación**: la nueva versión se publica con un plazo de adaptación de 30 días antes de su entrada en vigor.

### 10.2 Versionado

| Tipo de cambio | Incremento de versión | Ejemplo |
|----------------|----------------------|---------|
| Corrección de erratas | Patch (x.x.+1) | 1.0.0 → 1.0.1 |
| Adición de cláusulas menores | Minor (x.+1.0) | 1.0.1 → 1.1.0 |
| Cambio estructural o de derechos | Major (+1.0.0) | 1.1.0 → 2.0.0 |

### 10.3 Historial de versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | Febrero 2026 | Versión inicial del Libro de Reglas |

### 10.4 Notificación de cambios

- Todos los participantes serán notificados de cambios mediante correo electrónico y notificación in-app.
- Los cambios mayores requieren aceptación explícita por cada participante.
- La no aceptación de un cambio mayor faculta al participante para ejercer su derecho de salida sin penalización.

---

## Anexo A: Glosario de Términos

| Término | Definición |
|---------|-----------|
| **Espacio de Datos** | Infraestructura descentralizada para compartir datos de forma soberana |
| **Participante** | Organización registrada en ProcureData con rol asignado |
| **Transacción de datos** | Proceso completo de solicitud, aprobación y entrega de datos |
| **Política ODRL** | Expresión en formato JSON-LD de los derechos y obligaciones sobre un activo de datos |
| **Health Score** | Indicador de calidad del dato basado en integridad, actualización, veracidad y cumplimiento |
| **DID** | Identificador Descentralizado (Decentralized Identifier) verificable en blockchain |
| **EUROe** | Stablecoin respaldada por euros, utilizada como medio de pago en ProcureData |
| **KYB** | Proceso de verificación de identidad empresarial (Know Your Business) |
| **Conector** | Componente software que facilita la interoperabilidad técnica entre espacios de datos |

## Anexo B: Contacto

| Canal | Detalle |
|-------|---------|
| **Soporte técnico** | soporte@procuredata.eu |
| **Comité de Gobierno** | gobierno@procuredata.eu |
| **Comité de Ética** | etica@procuredata.eu |
| **Delegado de Protección de Datos** | dpd@procuredata.eu |
| **Web** | https://procuredata.eu |

---

*Documento aprobado por el Comité de Gobierno de ProcureData · Febrero 2026*  
*Versión 1.0.0 · Uso público*
