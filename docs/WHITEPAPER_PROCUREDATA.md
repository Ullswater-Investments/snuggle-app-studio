# PROCUREDATA: Infraestructura de Espacios de Datos para Compras y Cadena de Suministro

**Whitepaper Técnico & Económico v2.0**

*Fecha: Febrero 2026*  
*Ecosistema: Gaia-X / Pontus-X / IDSA*  
*47 Casos de Éxito Verificados · 9 Super-Categorías Sectoriales · 10 Componentes Arquitectónicos*

---

## Abstract

ProcureData es la primera infraestructura de **Espacios de Datos Soberanos** diseñada específicamente para la función de Compras y Cadena de Suministro. Elimina la redundancia operativa en la validación de proveedores mediante identidades auto-soberanas (DID) y contratos inteligentes de uso de datos (ODRL), transformando centros de coste burocráticos en mercados de datos líquidos y seguros.

Esta segunda versión del whitepaper incorpora el análisis de **47 casos de éxito estándar** desplegados en 9 super-categorías sectoriales y **10 casos internacionales de Green Procurement**, extrayendo el valor de negocio y tecnológico demostrado en cada uno de ellos. Asimismo, documenta los 10 componentes arquitectónicos que articulan la plataforma y el nuevo programa **Kit Espacio de Datos** subvencionado por RED.ES.

---

## 1. El Problema: La Trampa de la Redundancia (n × m)

En la economía actual, la confianza es manual, lenta y costosa.

### 1.1 Silos de Información

La cadena de suministro global opera en silos. Un proveedor (Data Subject) debe enviar la misma documentación (certificados ISO, datos fiscales, reportes ESG) a cada uno de sus clientes (Data Consumers) individualmente. Nuestros 47 casos de éxito han identificado este patrón en todos los sectores: desde la homologación industrial de GigaFactory North (22 días por proveedor) hasta la certificación aeronáutica EN9100 de SkyAero Systems (meses de bloqueo en licitaciones).

### 1.2 El Coste de la Verificación

Si 100 empresas compran a los mismos 500 proveedores, se realizan **50.000 procesos de validación** y mantenimiento redundantes. Los 47 casos verificados documentan:

- **Fricción Operativa**: De 22 días a 48 horas (GigaFactory North, -85% tiempo de alta).
- **Riesgo de Datos Estáticos**: La información en el ERP del comprador caduca el día después de ser validada. Casos como Citrus-Check demuestran que las normativas fitosanitarias de 150 países cambian constantemente.
- **Fraude y Greenwashing**: La falta de trazabilidad inmutable permite la falsificación de credenciales. VinosD.O. Elite detectó falsificación de etiquetas D.O. en mercados asiáticos; FastFashion Trace enfrentó acusaciones de greenwashing en fibra reciclada.

### 1.3 Impacto Cuantificado

| Indicador | Antes de ProcureData | Con ProcureData | Fuente |
|-----------|---------------------|-----------------|--------|
| Tiempo homologación | 22 días | 48 horas | GigaFactory North |
| Verificación EN9100 | Meses | Minutos | SkyAero Systems |
| Incidencias éticas | Variable | 0 | GlobalRetail Prime |
| Fraude D.O. | Frecuente | 0% | VinosD.O. Elite |
| Fallos críticos equipos | Frecuente | -30% | BioMed Hospital |

---

## 2. La Solución: Un Espacio de Datos Soberano

ProcureData no es un "lago de datos" donde todos vuelcan su información. Es un sistema de **tuberías inteligentes y seguras** donde el dato viaja directamente del Propietario al Consumidor, bajo reglas estrictas.

### 2.1 El Triángulo de Confianza (Modelo IDSA)

Adoptamos el modelo de arquitectura de referencia de la International Data Spaces Association:

| Rol | Descripción | Casos que lo validan |
|-----|-------------|---------------------|
| **Proveedor (Data Provider/Subject)** | Mantiene la soberanía. El dato nunca sale de su control sin un contrato firmado. | OliveTrust, SkyAero, PureLithium |
| **Comprador (Data Consumer)** | Accede al dato verificado en tiempo real para sus procesos de compras, riesgo o ESG. | GigaFactory, GlobalRetail, Turbine-Chain |
| **Custodio (Data Holder)** | Infraestructura neutral que facilita el intercambio sin "ver" el contenido comercial sensible. | BioMed Hospital (GDPR), Eco-Orchestrator (Multi-Tenant) |

### 2.2 Pasaporte Digital de Proveedor

Cada proveedor en ProcureData tiene una **Identidad Auto-Soberana (SSI)** basada en DIDs (`did:ethr`). Sus credenciales (ISO, Solvencia, ESG) están ancladas a esta identidad, permitiendo una verificación instantánea y reutilizable.

> *"Verificar una vez, usar en todas partes"*

Este modelo ha sido validado en los 47 casos: desde el Pasaporte Digital de Producto para aceite D.O. (Olive-Origin) hasta el Pasaporte Digital de Batería (Battery-Life) y el Pasaporte Digital de Residuo (Rare-Earth Recover).

---

## 3. Arquitectura del Espacio de Datos Federado

ProcureData se articula en **10 componentes arquitectónicos** que cubren desde la infraestructura base hasta la gobernanza multi-sectorial. Nuestra pila tecnológica es **híbrida**, combinando la usabilidad de Web2 con la confianza inmutable de Web3.

### 3.1 Fundamentos

Infraestructura base de cuatro capas que sustenta toda la plataforma.

| Subcapa | Tecnologías | Descripción |
|---------|-------------|-------------|
| **Presentación** | Angular 21, Tailwind CSS 4, MetaMask | Interfaz responsive mobile-first con Request Wizard de 5 fases y firma de transacciones vía Wallet corporativa. |
| **Orquestación** | AdonisJS, RBAC, State Manager | Orquestador central del ciclo de vida de transacciones con 4 roles (Admin, Approver, Viewer, API Configurator) y doble firma criptográfica. |
| **Soberanía** | Pontus-X, Data NFTs, DeltaDAO, SSI | Red Gaia-X con Data NFTs y DDOs como activos digitales soberanos, identidad SSI (did:ethr) y KYB verificado en blockchain. |
| **Persistencia** | PostgreSQL, RLS, JSONB | Base de datos con Row Level Security por organization_id, almacenamiento híbrido JSONB para esquemas DCAT-AP y cifrado en reposo + TLS 1.3. |

**Casos validadores**: GigaFactory North (orquestación de homologación), EcoVolt Manufacturing (firma de Smart Contracts), Eco-Orchestrator (Multi-Tenant RLS).

### 3.2 Catálogo de Datos

Motor de registro, descubrimiento y gobernanza de activos de datos.

| Subcapa | Tecnologías | Descripción |
|---------|-------------|-------------|
| **Registro** | DCAT-AP, JSON-LD | Esquema estandarizado con metadatos semánticos y publicación automática vía ERP Connector. |
| **Descubrimiento** | Búsqueda federada, API Gaia-X | Full-text en catálogos distribuidos con filtros por sector, formato, licencia y recomendaciones. |
| **Gobernanza** | Scoring, Linaje, ODRL | Scoring de calidad (completitud, frescura), linaje de datos y políticas ODRL integradas en cada activo. |

**Casos validadores**: FurnData Alliance (sincronización de catálogo en 50+ portales), Raw-Market (marketplace de materias primas secundarias).

### 3.3 Flujo de 3 Actores

Modelo de interacción basado en el estándar IDSA con tres roles diferenciados.

| Subcapa | Tecnologías | Descripción |
|---------|-------------|-------------|
| **Consumer (Comprador)** | Request Wizard, ODRL 2.0 | Inicia solicitudes mediante wizard de 5 fases, define políticas de uso y firma aceptación. |
| **Subject (Proveedor)** | SSI, DID (did:ethr), MetaMask | Identidad auto-soberana con credenciales verificables W3C, publica Data NFTs. |
| **Holder (Custodio)** | RLS, Smart Contracts, Compute-to-Data | Custodia datos con aislamiento por organization_id, verificación vía Pontus-X. |

**Casos validadores**: PortBCN Smart-Trade (validación KYB portuaria), PharmaCold Logistix (cadena de frío con Smart Contracts), Alianza Social Hub (verificación SROI).

### 3.4 Políticas ODRL

Motor de contratos digitales basado en ODRL 2.0 (W3C).

| Subcapa | Tecnologías | Descripción |
|---------|-------------|-------------|
| **Permisos** | ODRL 2.0, JSON-LD | Acciones autorizadas (read, analyze, aggregate) con granularidad por campo y duración configurable. |
| **Prohibiciones** | Smart Contracts, Pontus-X | Redistribución y reventa vetadas; violaciones registradas en blockchain. |
| **Obligaciones** | EUROe, Smart Settlement | Pago automático (1 EUROe pay-per-use o 300 EUROe/mes suscripción). |
| **Restricciones** | Geográficas, Sectoriales, Temporales | Procesamiento solo en UE, sector específico, volumen máximo. |

**Casos validadores**: PureLithium Sourcing (ODRL para uso ético de minerales), Polígono Eco-Link (gobernanza ODRL para energía P2P), Raw-Market (ODRL uso final de residuos).

### 3.5 Web3 y DIDs

Capa de identidad descentralizada y pagos programables.

| Subcapa | Tecnologías | Descripción |
|---------|-------------|-------------|
| **Identidad SSI** | DID (did:ethr), MetaMask, KYB | Identidad auto-gestionada sin intermediarios, wallet corporativa y verificación KYB. |
| **Credenciales Verificables** | W3C VC, Zero-Knowledge | Emisión por organizaciones verificadas, presentación selectiva sin revelar datos sensibles. |
| **Blockchain** | Data NFTs (ERC-721), DDOs, Smart Contracts | Cada activo de datos es un token único en Pontus-X (Chain ID 32460). |
| **Pagos EUROe** | Pay-per-use, Suscripción, Liquidación | Micropagos automáticos vía Smart Contract; stablecoin regulada (EMI) compatible con MiCA. |

**Casos validadores**: EcoVolt Manufacturing (pagos EUROe en tiempo real), InvoiceTrust (Trade Finance Scoring blockchain), Aeolus Wind (liquidación de PPAs en 2 segundos).

### 3.6 Asistente IA

Sistema de inteligencia artificial conversacional con agentes especializados.

| Subcapa | Tecnologías | Descripción |
|---------|-------------|-------------|
| **NLU** | Intent Mapping, Google Gemini | Reconocimiento de intenciones con triggers de widgets (ROI, ImpactGauge, Radar). |
| **Agentes** | Concierge, Federado, Casos de Éxito | Agente general, especialista Gaia-X/IDSA y experto en los 47 casos verificados. |
| **Base de Conocimiento** | Memoria Técnica, 47 Casos, 15 Docs | Arquitectura, protocolos IDSA/Gaia-X/ODRL, casos con métricas reales. |
| **Aprendizaje** | Feedback 👍/👎, Corrección, GitHub | Captura inmediata de calidad, corrección por usuario, mejora continua. |

**Casos validadores**: AI-Labs Research (datasets sintéticos con IA), Greenhouse-AI (IA anti-mildiu), Batería-Hub (IA para arbitraje energético).

### 3.7 Conectores ERP/CRM

Capa de integración empresarial con los principales sistemas ERP.

| Subcapa | Tecnologías | Descripción |
|---------|-------------|-------------|
| **ERPs** | SAP S/4HANA, Oracle NetSuite, Dynamics 365, Odoo, Salesforce | Integración nativa con módulos MM/SD/FI, SuiteScript, Dataverse, JSON-RPC, Lightning API. |
| **Protocolos** | REST/GraphQL, EDI/XML, Webhooks, gRPC | Endpoints JSON-LD estándar, webhooks bidireccionales en tiempo real. |
| **Bridge** | ETL Pipeline, Sync Engine, Field Mapping | Mapeo visual de campos, sincronización bidireccional con retry exponencial. |
| **Seguridad** | OAuth 2.0, API Keys, Audit Trail | Rate limiting, cifrado TLS 1.3 + AES-256, RLS por organización. |

**Casos validadores**: UrbanDeliver BCN (conector ERP para telemetría de flota), FastFashion Trace (sincronización PLM textil), FurnData Alliance (multi-portal eCommerce).

### 3.8 Red Gaia-X

Integración nativa con el ecosistema europeo de datos federados Gaia-X.

| Subcapa | Tecnologías | Descripción |
|---------|-------------|-------------|
| **Trust Framework** | Self-Descriptions JSON-LD, GXDCH, VCs | Metadatos estandarizados, verificación vía Digital Clearing House. |
| **IDS** | EDC Connector, Contract Negotiation, DSP | Eclipse Dataspace Connector para intercambio soberano. |
| **Catálogo** | DCAT-AP, Aquarius Indexer | Application Profile europeo con descubrimiento federado. |
| **Compliance** | GDPR, Data Act, AI Act, CSRD | Cumplimiento regulatorio completo. Certificación Gaia-X Level 1-3. |

**Casos validadores**: Turbine-Chain (reporte CSRD consolidado para 50M€), BioHeat District (certificación RED III), Avocado-Trust (certificación USDA).

### 3.9 Analytics y BI

Plataforma de inteligencia de negocio con dashboards en tiempo real.

| Subcapa | Tecnologías | Descripción |
|---------|-------------|-------------|
| **Dashboards** | KPIs en tiempo real, Health Score | Métricas actualizadas con cada transacción, alertas automáticas. |
| **Cubo de Gasto** | Multidimensional, Benchmarking | Análisis de Pareto y benchmarking anónimo sectorial. |
| **Predictivo** | Forecasting IA, Monitor de Riesgo | Machine Learning para predicción de demanda, vigilancia de proveedores. |
| **DataOps** | Cleansing, Normalización, Linaje | Detección de duplicados, transformación a formato semántico. |

**Casos validadores**: Alianza Social Hub (Dashboard SROI 1:3.8), Ayuntamiento Ético (transparencia 99%), Producer-Trust (auditoría RAP en 1 hora).

### 3.10 Gobernanza Multi-Sector

Arquitectura de nodos sectoriales independientes con federación cross-sector.

| Subcapa | Tecnologías | Descripción |
|---------|-------------|-------------|
| **Nodos Sectoriales** | Industrial, Comercio, Agro, Movilidad, Salud, Economía Social | Cada sector opera su propio nodo con reglas y catálogo específicos. |
| **Gobernanza** | IDSA Rulebook, ODRL, Multi-Tenant RLS | Gobernanza descentralizada por nodo, políticas sectoriales. |
| **Federación** | Catálogo Federado, Cross-Sector, Gaia-X | Descubrimiento de datos entre nodos sin centralizar. |
| **Monetización** | Marketplace, Value Services, EUROe | Modelo adaptado (suscripción, pay-per-use, freemium). |

**Casos validadores**: Eco-Orchestrator (Multi-Tenant RLS para SCRAPS), AquaPower (gobernanza nexo agua-energía cross-sector), GridFlex (certificados de flexibilidad Smart Grid).

---

## 4. Análisis de Valor por Sector

El núcleo de esta actualización: análisis detallado de los 47 casos de éxito organizados en 9 super-categorías sectoriales, extrayendo el valor de negocio y el valor del uso de la tecnología demostrado en cada uno.

### 4.1 Industria e Infraestructura

**8 casos** · Sectores: Industrial, Aeroespacial, Minería, Puertos

| Caso | Métrica Clave | Valor de Negocio |
|------|--------------|-----------------|
| **GigaFactory North** | -85% tiempo de alta | De 22 días a 48h en homologación de proveedores Tier 2 metalúrgicos |
| **SkyAero Systems** | -90% tiempo verificación | Validación automática de certificados EN9100 de 120 proveedores globales |
| **PureLithium Sourcing** | Certificación B-Corp | Trazabilidad Tier 3 de litio sin explotación infantil para reporte CSRD |
| **PortBCN Smart-Trade** | 450€ ahorro/container | Aduana digital instantánea con KYB verificado para despacho portuario |
| **Turbine-Chain** | 50M€ contrato ganado | Consolidación Scope 3 de 15 proveedores de acero para licitación |
| **Helios Fields** | -25% costes reparación | Mantenimiento predictivo solar con 1M lecturas IoT diarias |
| **Aeolus Wind** | 2s conciliación PPA | Liquidación instantánea de contratos de energía eólica |
| **AquaPower** | +12% eficiencia hídrica | Gestión del nexo agua-energía con políticas ODRL en tiempo real |

**Valor tecnológico demostrado:**
- **ODRL automático**: Los contratos se firman automáticamente al cumplir requisitos de seguridad (GigaFactory)
- **DID aeroespacial**: Certificados EN9100 auto-gestionados que nunca caducan sin aviso (SkyAero)
- **Pasaporte Digital**: Trazabilidad del litio desde la mina hasta el coche eléctrico (PureLithium)
- **Webhooks IDS**: Interoperabilidad con sistemas portuarios para KYB instantáneo (PortBCN)
- **Edge Functions IoT**: Telemetría de paneles solares dispara órdenes de trabajo automáticas en ERP (Helios)
- **Smart Contracts EUROe**: Liquidación de PPAs en 2 segundos, el viento convertido en liquidez inmediata (Aeolus)

### 4.2 Agroalimentario

**12 casos** · Sectores: Agroalimentario, Exportación Fitosanitaria, Aceite D.O., Vinos Orgánicos, Cítricos, Eficiencia Hídrica, Validación Remota, Algodón Orgánico, Control Fitosanitario, Logística Tropical, Agricultura Urbana

| Caso | Métrica Clave | Valor de Negocio |
|------|--------------|-----------------|
| **OliveTrust Coop** | +12% valor exportación | Certificación de huella hídrica para mercado alemán con precio premium |
| **VinosD.O. Elite** | +35% confianza consumidor | Fraude cero en exportación D.O. con QR dinámico vinculado a DID |
| **Avocado-Trust** | 0.01% rechazo aduana | Pre-certificado fitosanitario USDA con evidencia blockchain |
| **Olive-Origin** | +15% precio premium | Soberanía de marca D.O. Jaén con GPS de recolección |
| **Zero-Chem Wine** | 100% Zero Residue | 36 meses sin síntesis química certificados con sensores IoT |
| **Citrus-Check** | 12 países aptos | Validación LMR automática cruzando normativas de 150 países |
| **Berry-Water** | 94% eficiencia riego | Certificación huella hídrica para GlobalG.A.P. |
| **Rice-Satellite** | 99% confianza D.O. | Firma espectral NDVI bloquea mezclas con grano de importación |
| **Bio-Cotton Trace** | 100% transparencia | Cadena de custodia GOTS: Semilla → Campo → Desmotadora → Bala |
| **Greenhouse-AI** | -80% químicos | IA gestiona microclima para prevenir hongos sin fungicidas |
| **Tropical-Flash** | +3 días frescura | Pre-validación digital 48h antes reduce merma en aduana |
| **Urban-Hydro** | 0 huella logística | Granja vertical Km 0 con energía renovable certificada |

**Valor tecnológico demostrado:**
- **IoT + blockchain**: Sensores de campo capturan datos de riego y los notarizan en Pontus-X (OliveTrust, Berry-Water)
- **NDVI satelital**: Firma espectral desde satélite confirma variedad de cultivo y bloquea fraude (Rice-Satellite)
- **QR dinámico con DID**: Cada botella tiene un QR vinculado a identidad descentralizada del productor (VinosD.O.)
- **IA predictiva agrícola**: Machine Learning gestiona microclima para prevenir enfermedades (Greenhouse-AI)
- **Certificación multi-país**: Cruce automático de normativas fitosanitarias de 150 países (Citrus-Check)
- **Pasaporte Digital de Producto**: Trazabilidad completa desde la semilla hasta el consumidor final

### 4.3 Movilidad y Energía

**12 casos** · Sectores: Movilidad Sostenible, Movilidad Eléctrica, Energía Industrial, Solar, Eólica, Hidrógeno Verde, Autoconsumo, Smart Grid, Almacenamiento, Biomasa, Cadena de Suministro, Hidráulica

| Caso | Métrica Clave | Valor de Negocio |
|------|--------------|-----------------|
| **UrbanDeliver BCN** | 1h auditoría CSRD | Reporting Scope 3 instantáneo para crédito verde de 2M€ |
| **EcoVolt Manufacturing** | 100% energía renovable | Liquidación instantánea de certificados GdO mediante Smart Contracts |
| **GridFlow** | 50 naves conectadas | Liquidación diaria de micro-pagos de energía entre comunidades |
| **H2-Pure** | +20% valor de venta | Certificación de hidrógeno verde con GdO digital inmutable |
| **Polígono Eco-Link** | -15% factura eléctrica | Marketplace de comunidad energética con gobernanza ODRL |
| **GridFlex** | 0 apagones/año | Certificados de flexibilidad Smart Grid con incentivos EUROe |
| **Batería-Hub** | -3 años ROI batería | Arbitraje energético con IA que predice precios del pool |
| **BioHeat District** | 99% cumplimiento RED | Trazabilidad de biomasa con DID por lote y geolocalización |
| **Turbine-Chain** | 50M€ contrato | Reporte CSRD consolidado de 15 proveedores de acero |
| **Smart-Charge** | +40% fidelización EV | Garantía de origen renovable visible en App de carga |
| **PortBCN Smart-Trade** | 450€ ahorro/container | Aduana digital con validación KYB instantánea |
| **AquaPower** | +12% eficiencia hídrica | Nexo agua-energía con políticas ODRL en tiempo real |

**Valor tecnológico demostrado:**
- **Smart Contracts IoT**: Contador reporta consumo en tiempo real; pago y certificado en el mismo bloque blockchain (EcoVolt)
- **EUROe micropagos**: Liquidación diaria de excedentes energéticos entre naves industriales (GridFlow)
- **Comunidades energéticas P2P**: Gobernanza ODRL para intercambio de excedentes solares (Polígono Eco-Link)
- **IA Analytics**: Predicción de precios del pool eléctrico para optimizar carga/descarga de baterías (Batería-Hub)
- **Certificación GdO digital**: Notarización blockchain del vínculo parque eólico-electrolizador (H2-Pure)
- **API Nodo Notario**: El usuario final ve en su móvil el hash que certifica energía renovable (Smart-Charge)

### 4.4 Salud y Pharma

**3 casos** · Sectores: Salud, Farmacéutico

| Caso | Métrica Clave | Valor de Negocio |
|------|--------------|-----------------|
| **BioMed Hospital** | -30% fallos críticos | Mantenimiento predictivo de equipos RM con telemetría anonimizada GDPR |
| **PharmaCold Logistix** | 0% pérdida térmica | Smart Contracts bloquean pago si sensores detectan T>8°C +10min |
| **Novo Nordisk** *(Green)* | 1M+ plumas recuperadas | Sistema circular para dispositivos médicos inyectables |

**Valor tecnológico demostrado:**
- **Edge Functions GDPR**: Anonimización de datos de pacientes mientras se envían logs de error en tiempo real (BioMed)
- **Smart Contracts cadena de frío**: El contrato actúa como guardián de la salud pública, liberando pago solo ante calidad total (PharmaCold)
- **Modelo predictivo**: Detecta fallos 72h antes, evitando paradas de 15.000€/día (BioMed)
- **Logística inversa certificada**: Descontaminación de residuos biológicos peligrosos a escala industrial (Novo Nordisk)

### 4.5 Retail y Consumo

**3 casos** · Sectores: Comercio, Retail Muebles

| Caso | Métrica Clave | Valor de Negocio |
|------|--------------|-----------------|
| **GlobalRetail Prime** | 0 incidencias éticas | Verificación SA8000 en 200 proveedores textiles asiáticos |
| **FastFashion Trace** | 100% etiquetado preciso | Sincronización PLM con certificados textiles para 1M de prendas |
| **FurnData Alliance** | -95% errores catálogo | Sincronización de fichas de producto con 50+ portales eCommerce |

**Valor tecnológico demostrado:**
- **SA8000 digital**: Pasaporte Digital de Proveedor con auditorías firmadas por certificadoras externas (GlobalRetail)
- **Conectores ERP multi-portal**: Intercambio de certificados de composición textil via conectores ERP (FastFashion)
- **Espacio de datos federado**: Un dato, cincuenta portales sincronizados automáticamente (FurnData)
- **Anti-Greenwashing**: Validación de circularidad "hilo por hilo" con datos reales, no declaraciones (FastFashion)

### 4.6 Economía Circular

**10 casos** · Sectores: Reciclaje Textil, RAEE/E-Waste, Aluminio Secundario, Certificación RAP, Gestión SCRAPS, Revalorización, Baterías Litio, Metales Preciosos, Zero Waste, Compra Pública Verde

| Caso | Métrica Clave | Valor de Negocio |
|------|--------------|-----------------|
| **Fiber-Loop** | 100% cumplimiento RAP | Trazabilidad de fibra post-consumo para colección 40% poliéster reciclado |
| **Rare-Earth Recover** | +45% margen venta | Minería urbana de tierras raras con IA para fundiciones especializadas |
| **Alu-Cycle** | -95% energía vs virgen | Smart Contract emite Certificados de Ahorro Energético (CAEs) |
| **Producer-Trust** | 1h auditoría anual | Auditoría RAP automática agregando datos de múltiples Holders |
| **Eco-Orchestrator** | -15% ecotasa | Multi-Tenant RLS: cada socio ve su cuota, el SCRAP ve el agregado |
| **Raw-Market** | +30% ingresos vs gestión | Marketplace B2B con ODRL que asegura uso final de reciclaje |
| **Battery-Life** | +5 años vida útil | Audit Logs inmutables certifican historial para 2ª vida en solar |
| **Urban Mining** | +10% sobreprecio ético | Certificación de oro ético reciclado con blockchain |
| **Waste-to-Value** | 99.9% desviación vertedero | Conciliación automática salida fábrica ↔ entrada reciclador |
| **Green-Gov Circular** | SROI 1:2.4 | Licitación pública de plástico reciclado local con DID |

**Valor tecnológico demostrado:**
- **Pasaporte Digital de Residuo**: Cada gramo de fibra, metal o batería rastreado desde origen hasta destino final
- **ODRL uso final**: Políticas que garantizan que el residuo llega a reciclaje, no a vertedero (Raw-Market)
- **Smart Contracts CAE**: Cálculo automático de CO2 ahorrado para emitir certificados vendibles (Alu-Cycle)
- **Multi-Tenant RLS**: Privacidad y transparencia coexisten: cada empresa ve su dato, el SCRAP ve el total (Eco-Orchestrator)
- **IA Analytics**: Datasets de composición química para vender a fundiciones especializadas (Rare-Earth)
- **Audit Logs blockchain**: Historial de uso inmutable para decidir reciclaje vs almacenamiento estacionario (Battery-Life)

### 4.7 Sector Público y Social

**2 casos** · Sectores: Economía Social, Gobierno

| Caso | Métrica Clave | Valor de Negocio |
|------|--------------|-----------------|
| **Alianza Social Hub** | Ratio SROI 1:3.8 | Demostración verificada del retorno social de inversión en proveedores éticos |
| **Ayuntamiento Ético** | 99% transparencia | Dashboard SROI para verificar cuota de discapacidad en licitaciones |

**Valor tecnológico demostrado:**
- **Dashboard SROI**: Cálculo de ahorro en subsidios públicos con verificación DID (Alianza Social Hub)
- **Verificación LGD en tiempo real**: Comprobación automática de cuotas de discapacidad en portales de contratación (Ayuntamiento)
- **Pasaporte de Proveedor Ético**: Auditoría Social Digital con anti-social-washing (Alianza Social Hub)

### 4.8 Finanzas y Tecnología

**2 casos** · Sectores: Finanzas B2B, Tecnología

| Caso | Métrica Clave | Valor de Negocio |
|------|--------------|-----------------|
| **InvoiceTrust** | 2M€ liquidez pymes | Factoring con score blockchain basado en cumplimiento ODRL |
| **AI-Labs Research** | -40% tiempo training IA | Datasets sintéticos con alta fidelidad estadística sin fugas |

**Valor tecnológico demostrado:**
- **Trade Finance Scoring blockchain**: Score de solvencia inmutable basado en historial de contratos ODRL (InvoiceTrust)
- **Datasets sintéticos**: Anonimizador GDPR + Raw Data Normalizer para IA colaborativa europea (AI-Labs)
- **Wallet EUROe**: Pagos programables que desbloquean liquidez para pymes industriales (InvoiceTrust)

### 4.9 Green Procurement Internacional

**10 casos internacionales** · Líderes globales en compra verde transformadora

| Caso | País | Métrica | Tipo de Intervención |
|------|------|---------|---------------------|
| **Novo Nordisk** (Returpen) | Dinamarca | 1M+ plumas recuperadas | Educación proveedores |
| **Maersk** (Metanol Verde) | Dinamarca | 1º buque metanol global | Co-inversión |
| **Apple + Alcoa + Rio Tinto** (Elysis) | EE.UU./Canadá | 0 CO₂ directo | Co-inversión |
| **BMW Group** (Acero Verde) | Alemania | -95% CO₂ en acero | Trazabilidad forense |
| **BASF** (Biomass Balance) | Alemania | 100% trazabilidad biomasa | Educación proveedores |
| **Kering** (EP&L) | Francia | EP&L coste natural € | Trazabilidad forense |
| **Airbus** (SAF) | Europa | 100% SAF certificado | Co-inversión |
| **Google** (CFE 24/7) | EE.UU./Global | 24/7 energía limpia | Co-inversión |
| **Schneider Electric** (Zero Carbon) | Francia | 1.000 proveedores formados | Educación proveedores |
| **Unilever** (Palma Satelital) | Global | GPS trazabilidad satelital | Trazabilidad forense |

**Tres modelos de intervención identificados:**

1. **Co-inversión**: Crear mercados inexistentes invirtiendo en I+D antes de que existan (Maersk, Apple, Airbus, Google). *"Comprar la tecnología que aún no existe para que exista."*

2. **Trazabilidad forense**: Usar satélites, blockchain y química para ver lo invisible en la cadena (BMW, Kering, Unilever). *"El dato verifica lo que el ojo no puede."*

3. **Educación de proveedores**: Transferencia de conocimiento técnico que transforma toda la cadena (Novo Nordisk, BASF, Schneider). *"No solo exigir, enseñar."*

---

## 5. Economía del Dato y Tokenomics

A diferencia de proyectos especulativos, ProcureData utiliza una economía basada en **utilidad real** y **estabilidad financiera**.

### 5.1 Moneda Estable: EUROe

Para las transacciones comerciales utilizamos **EUROe**, el primer dinero electrónico regulado (EMI) en blockchain compatible con MiCA.

| Ventaja | Descripción | Caso validador |
|---------|-------------|----------------|
| **Sin Volatilidad** | 1 EUROe = 1 EUR siempre | GridFlow (micropagos diarios) |
| **Programable** | Pagos automáticos cuando el dato es entregado y validado | EcoVolt (Smart Settlement) |
| **Legal** | Facturable y compatible con contabilidad empresarial europea | InvoiceTrust (factoring) |

### 5.2 Monetización de Activos

Los proveedores transforman "residuos de datos" en activos:

- **Compute-to-Data**: Un proveedor permite que un algoritmo de IA se ejecute sobre sus datos privados sin revelar datos brutos, cobrando por el uso del cómputo. Validado en AI-Labs Research (-40% tiempo de training).
- **Data NFTs**: Cada activo de datos es un token ERC-721 único con metadatos DCAT-AP indexados por Aquarius.
- **Certificados vendibles**: Smart Contracts emiten Certificados de Ahorro Energético (CAEs) automáticamente (Alu-Cycle).

---

## 6. Métricas Agregadas de Impacto

### 6.1 KPIs Consolidados de los 47 Casos

| Indicador | Valor Agregado |
|-----------|---------------|
| Casos de éxito verificados | 47 estándar + 10 Green Procurement |
| Super-categorías sectoriales | 9 |
| Componentes arquitectónicos | 10 |
| Reducción media tiempo homologación | -85% (industrial) |
| Ahorro medio cadena de suministro | 15-45% según sector |
| Tasa de fraude post-implementación | 0% (D.O., ético, cadena frío) |
| Cobertura geográfica | España + 10 países (Green Procurement) |

### 6.2 Distribución por Sector

| Super-Categoría | Nº Casos | Servicios más utilizados |
|-----------------|----------|------------------------|
| Industria e Infraestructura | 8 | Homologación Flash, ODRL, Conector ERP |
| Agroalimentario | 12 | Pasaporte Digital, IoT, Certificación D.O. |
| Movilidad y Energía | 12 | Smart Contracts, EUROe, Edge Functions IoT |
| Salud y Pharma | 3 | Anonimizador GDPR, Smart Contracts cadena frío |
| Retail y Consumo | 3 | Conectores ERP, SA8000 Digital, Anti-Greenwashing |
| Economía Circular | 10 | Pasaporte Digital de Residuo, ODRL uso final |
| Sector Público y Social | 2 | Dashboard SROI, Verificador LGD |
| Finanzas y Tecnología | 2 | Trade Finance Scoring, Datasets Sintéticos |
| Green Procurement (intl.) | 10 | Co-inversión, Trazabilidad forense, Educación |

### 6.3 Servicios Más Demandados

| Servicio | Nº de Casos que lo utilizan |
|----------|---------------------------|
| Pasaporte Digital (Proveedor/Producto/Residuo) | 25+ |
| Políticas ODRL / Gobernanza | 15+ |
| Smart Contracts / EUROe | 12+ |
| Conectores ERP Universal | 10+ |
| Sensores IoT / Edge Functions | 10+ |
| Certificación ESG / CSRD | 8+ |
| IA Analytics / Predictivo | 5+ |
| Dashboard SROI | 4 |

---

## 7. Kit Espacio de Datos

### 7.1 Programa de Ayudas RED.ES

ProcureData es **Agente Digitalizador Adherido** al programa Kit Espacio de Datos de RED.ES, la entidad pública que promueve la digitalización en España.

### 7.2 Subvención

Las empresas beneficiarias pueden acceder a una subvención de hasta **30.000 EUR** para la implantación de un Espacio de Datos soberano basado en la infraestructura ProcureData.

### 7.3 Servicios Incluidos

| Servicio | Descripción |
|----------|-------------|
| **Diseño del Espacio de Datos** | Análisis de necesidades y diseño de la arquitectura federada adaptada al sector |
| **Implantación técnica** | Despliegue de nodos, configuración de conectores ERP y políticas ODRL |
| **Identidad Digital** | Creación de DIDs corporativos, wallets Web3 y credenciales verificables |
| **Formación** | Capacitación del equipo técnico en operación del espacio de datos |
| **Soporte** | 12 meses de soporte técnico y mantenimiento evolutivo |

### 7.4 Condiciones

- Empresa constituida en España
- Segmento PYME o Gran Empresa según convocatoria
- Adhesión al programa Kit Espacio de Datos de RED.ES
- Compromiso de mantenimiento mínimo de 12 meses

---

## 8. Roadmap y Futuro

| Fase | Periodo | Objetivos | Estado |
|------|---------|-----------|--------|
| **Fase 1** | 2025-2026 | Plataforma productiva, 47 casos verificados, integración Pontus-X, pagos EUROe, onboarding KYB, Kit Espacio de Datos. | ✅ Completada |
| **Fase 2** | Q3-Q4 2026 | Federación completa con Catena-X. IA Soberana para análisis predictivo de cadena de suministro. Nodos sectoriales autónomos con marca blanca. | 🔄 En progreso |
| **Fase 3** | 2027 | Descentralización de nodos validadores. Expansión a logística marítima e interoperabilidad cross-dataspace paneuropea. | 📋 Planificada |

---

## 9. Conclusión

ProcureData no es solo software; es una **nueva infraestructura de mercado**. Al reemplazar intermediarios burocráticos con código criptográfico y estándares europeos, devolvemos el control del dato a quien lo genera y la velocidad a quien lo necesita.

Los 47 casos de éxito verificados y los 10 referentes internacionales de Green Procurement demuestran que esta infraestructura genera valor cuantificable y medible en todos los sectores: desde la reducción del 85% en tiempos de homologación industrial hasta la eliminación total del fraude en denominaciones de origen, pasando por la creación de comunidades energéticas P2P y la certificación de economía circular a escala.

> **Únete a la economía de datos soberana.**

---

## Glosario

| Término | Definición |
|---------|------------|
| **DID** | Decentralized Identifier - Identificador descentralizado según estándar W3C |
| **ODRL** | Open Digital Rights Language - Lenguaje de políticas de uso de datos |
| **SSI** | Self-Sovereign Identity - Identidad auto-soberana |
| **Gaia-X** | Iniciativa europea para espacios de datos federados |
| **Pontus-X** | Red blockchain compatible con Gaia-X |
| **EUROe** | Stablecoin regulada 1:1 con el Euro |
| **IDSA** | International Data Spaces Association |
| **EDC** | Eclipse Dataspace Components |
| **MiCA** | Markets in Crypto-Assets Regulation (EU) |
| **CSRD** | Corporate Sustainability Reporting Directive |
| **RAP** | Responsabilidad Ampliada del Productor |
| **SCRAPS** | Sistemas Colectivos de Responsabilidad Ampliada del Productor |
| **CAE** | Certificado de Ahorro Energético |
| **PPA** | Power Purchase Agreement - Contrato de compra de energía |
| **GdO** | Garantía de Origen (energía renovable) |
| **SAF** | Sustainable Aviation Fuel - Combustible de aviación sostenible |
| **LMR** | Límite Máximo de Residuos (fitosanitarios) |
| **SROI** | Social Return on Investment |
| **LGD** | Ley General de Discapacidad |
| **NDVI** | Normalized Difference Vegetation Index |
| **RAEE** | Residuos de Aparatos Eléctricos y Electrónicos |
| **KYB** | Know Your Business - Verificación de identidad empresarial |

---

*© 2026 ProcureData. Todos los derechos reservados.*
