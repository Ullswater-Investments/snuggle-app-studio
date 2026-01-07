# Documento de Datos Sintéticos y Oportunidades de Mercado

> **Propósito**: Documentación completa de datos sintéticos existentes y 30 nuevas oportunidades de mercado para ProcureData
> **Versión**: 1.0
> **Fecha**: 2026-01-07
> **Destino**: Google AI Studio / Inserción en Base de Datos

---

## 1. RESUMEN DE DATOS SINTÉTICOS EXISTENTES

### 1.1 Tablas con Datos Demo

| Tabla | Registros Demo | Propósito |
|-------|----------------|-----------|
| `organizations` | 9 | Empresas demo (consumers, providers, data_holders) |
| `marketplace_opportunities` | 5 | Oportunidades de mercado activas |
| `data_products` | ~18 | Templates de productos de datos |
| `data_assets` | Variable | Activos listados en marketplace |
| `value_services` | ~21 | Servicios del catálogo |
| `esg_reports` | Por organización | Datos de sostenibilidad |
| `innovation_lab_concepts` | ~10 | Conceptos de innovación con charts |
| `wallets` | Por organización | Wallets EUROe |
| `success_stories` | ~5 | Casos de éxito |

---

## 2. ORGANIZACIONES DEMO EXISTENTES

### 2.1 Consumers (Compradores de Datos)

| ID | Nombre | Sector | Tax ID |
|----|--------|--------|--------|
| `11111111-2222-3333-4444-000000000001` | Retail Giant Corp | retail | B12345678 |
| `11111111-2222-3333-4444-000000000002` | Green Finance Bank | finance | B23456789 |
| `11111111-2222-3333-4444-000000000003` | Logistics AI Solutions | logistics | B34567890 |
| `11111111-2222-3333-4444-000000000004` | EcoTech Industrial | manufacturing | B45678901 |
| `11111111-2222-3333-4444-000000000005` | AgriData Consulting | agrifood | B56789012 |

### 2.2 Providers (Proveedores de Servicios)

| ID | Nombre | Sector | Descripción |
|----|--------|--------|-------------|
| `22222222-0000-0000-0000-000000000001` | GreenMetrics AI | Tecnología | Análisis de métricas ESG |
| `22222222-0000-0000-0000-000000000002` | DataShield Compliance | Legal | Cumplimiento normativo |
| `22222222-0000-0000-0000-000000000003` | ChainForge Labs | Blockchain | Desarrollo Web3 |
| `22222222-0000-0000-0000-000000000004` | PROCUREDATA Core | Tecnología | Plataforma core |

---

## 3. CONSTANTES OFICIALES (src/lib/constants.ts)

### 3.1 OFFICIAL_SECTORS

```typescript
export const OFFICIAL_SECTORS = [
  { id: "industrial", label: "Industrial", priority: 1, targetShare: 51, icon: "Factory" },
  { id: "comercio", label: "Comercio", priority: 2, targetShare: 15, icon: "ShoppingCart" },
  { id: "agroalimentario", label: "Agroalimentario", priority: 3, targetShare: 12, icon: "Wheat" },
  { id: "movilidad", label: "Movilidad Sostenible", priority: 4, targetShare: 10, icon: "Truck" },
  { id: "salud", label: "Salud", priority: 5, targetShare: 7, icon: "Heart" },
  { id: "economia_social", label: "Economía Social", priority: 6, targetShare: 5, icon: "Users" }
];
```

### 3.2 OFFICIAL_PRICING

```typescript
export const OFFICIAL_PRICING = {
  transactionFee: 1,
  transactionCurrency: "EUROe",
  proMembership: {
    annual: 2400,
    monthly: 249,
    currency: "EUR"
  },
  features: {
    free: ["Pay-per-use", "Basic analytics", "Standard support"],
    pro: ["Unlimited transactions", "Advanced BI", "Priority support", "API access"]
  }
};
```

### 3.3 EUROPEAN_STACK

```typescript
export const EUROPEAN_STACK = [
  { name: "Pontus-X", description: "Red blockchain europea para Data Spaces", status: "active", category: "blockchain" },
  { name: "EUROe", description: "Stablecoin euro-respaldada", status: "active", category: "payment" },
  { name: "Gaia-X", description: "Infraestructura de datos federada europea", status: "active", category: "governance" },
  { name: "IDSA", description: "International Data Spaces Association", status: "active", category: "protocol" },
  { name: "Eclipse EDC", description: "Dataspace Connector de referencia", status: "active", category: "connector" }
];
```

---

## 4. CATEGORÍAS DE PRODUCTOS DE DATOS

Categorías existentes en `data_products`:

| Categoría | Descripción |
|-----------|-------------|
| Fiscal | Datos tributarios y fiscales |
| Legal | Información jurídica y contractual |
| Financial | Scoring crediticio y financiero |
| ESG | Métricas de sostenibilidad |
| Certifications | ISO, EMAS, certificaciones sectoriales |
| Supply Chain | Trazabilidad y proveedores |
| IoT | Datos de sensores industriales |
| AI/ML | Datasets para entrenamiento |

---

## 5. SERVICIOS DE VALOR AÑADIDO (value_services)

| Servicio | Categoría | Precio | Descripción |
|----------|-----------|--------|-------------|
| Verificación Fiscal VIES | Compliance | 0.50€ | Validación automática NIF intracomunitario |
| Scoring ESG Automático | ESG | 2€/empresa | Puntuación sostenibilidad 0-100 |
| Certificado Blockchain | Blockchain | 1€ | Hash inmutable en Pontus-X |
| Monitor de Riesgo Proveedor | Risk | 5€/mes | Alertas de insolvencia |
| Normalización JSON-LD | Data Quality | 0.10€/registro | Conversión a semántica estándar |
| API de Consulta ODRL | Governance | 0€ (incluido Pro) | Políticas de uso de datos |

---

## 6. OPORTUNIDADES DE MERCADO EXISTENTES

| Título | Categoría | Presupuesto | Consumer |
|--------|-----------|-------------|----------|
| Supply Chain Data for Automotive | Automotive | 5,000 - 10,000 EUROe | Retail Giant Corp |
| Renewable Energy Certificates | Energy | 2,000 - 5,000 EUROe | Green Finance Bank |
| Pharma Compliance Records | Pharma | 10,000 - 20,000 EUROe | Logistics AI Solutions |
| Real Estate Market Analysis | Retail | 3,000 - 7,000 EUROe | EcoTech Industrial |
| Agricultural Yield Data | AgriFood | 1,500 - 3,500 EUROe | AgriData Consulting |

---

## 7. LAS 30 NUEVAS OPORTUNIDADES DE MERCADO

### Distribución por Sector (según OFFICIAL_SECTORS.targetShare)

| Sector | Target Share | Oportunidades |
|--------|--------------|---------------|
| Industrial | 51% | 16 |
| Comercio | 15% | 4 |
| Agroalimentario | 12% | 4 |
| Movilidad Sostenible | 10% | 3 |
| Salud | 7% | 2 |
| Economía Social | 5% | 1 |
| **TOTAL** | 100% | **30** |

---

### 7.1 INDUSTRIAL (16 oportunidades)

#### Oportunidad 1
- **Título**: Ficha Técnica Proveedores Tier 2 Automoción
- **Categoría**: Industrial
- **Presupuesto**: 5,000 - 10,000 EUROe
- **Descripción**: Buscamos datos maestros completos de proveedores metalúrgicos Tier 2 del sector automoción español. Necesitamos capacidad productiva trimestral, certificaciones IATF 16949 vigentes, histórico de entregas y datos de contacto verificados. Formato JSON-LD preferido.
- **Consumer**: EcoTech Industrial

#### Oportunidad 2
- **Título**: Certificaciones ISO Sector Aeronáutico
- **Categoría**: Aerospace
- **Presupuesto**: 3,000 - 6,000 EUROe
- **Descripción**: Base de datos actualizada de certificaciones EN9100 y NADCAP vigentes para proveedores del sector aeronáutico europeo. Incluir fechas de vencimiento, alcance de certificación y organismo certificador.
- **Consumer**: EcoTech Industrial

#### Oportunidad 3
- **Título**: Telemetría IoT Maquinaria CNC
- **Categoría**: IoT
- **Presupuesto**: 4,000 - 8,000 EUROe
- **Descripción**: Histórico de 2 años de datos de sensores de vibración, temperatura y consumo energético de máquinas CNC para entrenamiento de modelos de mantenimiento predictivo. Datos anonimizados aceptados.
- **Consumer**: Logistics AI Solutions

#### Oportunidad 4
- **Título**: Capacidad Productiva Fundiciones España
- **Categoría**: Industrial
- **Presupuesto**: 2,000 - 4,000 EUROe
- **Descripción**: Métricas de capacidad disponible por trimestre de fundiciones de hierro y aluminio en España. Incluir tonelaje máximo, plazos de entrega actuales y especialización por tipo de pieza.
- **Consumer**: EcoTech Industrial

#### Oportunidad 5
- **Título**: Histórico Pedidos Sector Plásticos
- **Categoría**: Industrial
- **Presupuesto**: 3,000 - 5,000 EUROe
- **Descripción**: Transacciones comerciales anonimizadas de los últimos 5 años del sector de inyección de plásticos. Interesa volúmenes, precios de referencia y estacionalidad de la demanda.
- **Consumer**: Retail Giant Corp

#### Oportunidad 6
- **Título**: Certificados CBAM Importadores Asia
- **Categoría**: ESG
- **Presupuesto**: 8,000 - 15,000 EUROe
- **Descripción**: Datos de huella de carbono verificada de proveedores asiáticos para cumplimiento del Mecanismo de Ajuste en Frontera por Carbono (CBAM). Necesitamos emisiones Scope 1 y 2 por tonelada de producto.
- **Consumer**: Green Finance Bank

#### Oportunidad 7
- **Título**: Homologación Proveedores MRO
- **Categoría**: Compliance
- **Presupuesto**: 2,000 - 4,000 EUROe
- **Descripción**: Base de datos de contratas de mantenimiento (MRO) homologadas con certificación ISO 45001 y seguros de responsabilidad civil vigentes. Sector industrial general.
- **Consumer**: EcoTech Industrial

#### Oportunidad 8
- **Título**: Consumo Energético Industrial por Planta
- **Categoría**: Energy
- **Presupuesto**: 5,000 - 10,000 EUROe
- **Descripción**: Métricas de consumo eléctrico (kWh) desglosadas por planta industrial para reporting CSRD. Incluir mix de fuentes renovables/no renovables y emisiones asociadas.
- **Consumer**: Green Finance Bank

#### Oportunidad 9
- **Título**: Trazabilidad Materias Primas Críticas
- **Categoría**: Blockchain
- **Presupuesto**: 6,000 - 12,000 EUROe
- **Descripción**: Datos de origen verificable en blockchain de materias primas críticas (litio, cobalto, tierras raras) para cumplimiento de la Directiva de Diligencia Debida. Cadena de custodia completa.
- **Consumer**: EcoTech Industrial

#### Oportunidad 10
- **Título**: Inventario Just-in-Time Componentes
- **Categoría**: Industrial
- **Presupuesto**: 3,000 - 6,000 EUROe
- **Descripción**: Stock disponible en tiempo real de componentes electrónicos (semiconductores, PCBs, conectores) de distribuidores europeos para optimización de inventario JIT.
- **Consumer**: Logistics AI Solutions

#### Oportunidad 11
- **Título**: Auditorías Sociales Proveedores Textiles
- **Categoría**: ESG
- **Presupuesto**: 4,000 - 7,000 EUROe
- **Descripción**: Informes Sedex/BSCI de auditorías sociales de fábricas textiles en Asia. Incluir ratings, no conformidades y planes de acción correctiva. Para Due Diligence CSDDD.
- **Consumer**: Retail Giant Corp

#### Oportunidad 12
- **Título**: Métricas de Calidad Six Sigma
- **Categoría**: Industrial
- **Presupuesto**: 2,000 - 4,000 EUROe
- **Descripción**: Datos de defectos y rechazos por proveedor industrial (PPM, DPMO) de los últimos 3 años. Para benchmarking de calidad y selección de proveedores.
- **Consumer**: EcoTech Industrial

#### Oportunidad 13
- **Título**: Predicción de Demanda Sector Químico
- **Categoría**: AI
- **Presupuesto**: 6,000 - 10,000 EUROe
- **Descripción**: Dataset histórico de demanda de productos químicos industriales (solventes, resinas, aditivos) para entrenar modelos de forecasting. Mínimo 5 años de datos.
- **Consumer**: Logistics AI Solutions

#### Oportunidad 14
- **Título**: Digital Twins Líneas de Producción
- **Categoría**: IoT
- **Presupuesto**: 8,000 - 15,000 EUROe
- **Descripción**: Datos de configuración y parámetros operativos de líneas de producción automatizadas para creación de gemelos digitales. Incluir layouts, tiempos de ciclo y cuellos de botella.
- **Consumer**: EcoTech Industrial

#### Oportunidad 15
- **Título**: Scoring Crediticio Proveedores B2B
- **Categoría**: Fintech
- **Presupuesto**: 3,000 - 5,000 EUROe
- **Descripción**: Evaluación de riesgo financiero de proveedores industriales españoles. Z-Score, ratios de solvencia, historial de pagos y alertas de morosidad.
- **Consumer**: Green Finance Bank

#### Oportunidad 16
- **Título**: Datos de Mantenimiento Predictivo
- **Categoría**: AI
- **Presupuesto**: 5,000 - 8,000 EUROe
- **Descripción**: Histórico de averías y fallos de maquinaria industrial para entrenar modelos de mantenimiento predictivo. Incluir tipo de fallo, tiempo de reparación y costes asociados.
- **Consumer**: Logistics AI Solutions

---

### 7.2 COMERCIO (4 oportunidades)

#### Oportunidad 17
- **Título**: Afluencia Peatonal Zonas Comerciales
- **Categoría**: Retail
- **Presupuesto**: 2,500 - 4,000 EUROe
- **Descripción**: Datos georeferenciados de tráfico peatonal en zonas comerciales de principales ciudades españolas. Granularidad horaria, segmentación por día de semana y eventos especiales.
- **Consumer**: Retail Giant Corp

#### Oportunidad 18
- **Título**: Histórico Ventas E-commerce España
- **Categoría**: Retail
- **Presupuesto**: 4,000 - 7,000 EUROe
- **Descripción**: Tendencias de consumo online anonimizadas por categoría de producto. Incluir estacionalidad, ticket medio y tasas de conversión. Últimos 3 años.
- **Consumer**: Retail Giant Corp

#### Oportunidad 19
- **Título**: Auditorías Ética Cadena de Suministro Retail
- **Categoría**: ESG
- **Presupuesto**: 3,000 - 5,000 EUROe
- **Descripción**: Validación de proveedores de productos de consumo contra estándares de derechos humanos y trabajo infantil. Certificaciones SA8000 y auditorías SMETA.
- **Consumer**: Retail Giant Corp

#### Oportunidad 20
- **Título**: Proveedores Logística Última Milla ZBE
- **Categoría**: Logistics
- **Presupuesto**: 2,000 - 4,000 EUROe
- **Descripción**: Base de datos de proveedores de reparto de última milla que cumplen normativas de Zonas de Bajas Emisiones. Incluir flota eléctrica, cobertura geográfica y tarifas.
- **Consumer**: Logistics AI Solutions

---

### 7.3 AGROALIMENTARIO (4 oportunidades)

#### Oportunidad 21
- **Título**: Trazabilidad Lotes Productos Ecológicos
- **Categoría**: AgriFood
- **Presupuesto**: 2,000 - 4,000 EUROe
- **Descripción**: Cadena de custodia completa desde origen agrícola hasta punto de distribución para productos ecológicos certificados. Incluir lotes, fechas y certificadores.
- **Consumer**: AgriData Consulting

#### Oportunidad 22
- **Título**: Certificados Sanitarios Importación
- **Categoría**: AgriFood
- **Presupuesto**: 3,000 - 5,000 EUROe
- **Descripción**: Documentación fitosanitaria de productos frescos importados (frutas, verduras, pescado). Certificados CITES, análisis de residuos y autorizaciones de importación.
- **Consumer**: AgriData Consulting

#### Oportunidad 23
- **Título**: Datos IoT Cadena de Frío
- **Categoría**: IoT
- **Presupuesto**: 4,000 - 7,000 EUROe
- **Descripción**: Histórico de sensores de temperatura y humedad en transporte refrigerado de productos perecederos. Para validación de cadena de frío y trazabilidad alimentaria.
- **Consumer**: AgriData Consulting

#### Oportunidad 24
- **Título**: Denominaciones de Origen Verificadas
- **Categoría**: Blockchain
- **Presupuesto**: 2,500 - 4,500 EUROe
- **Descripción**: Certificación blockchain de procedencia geográfica para productos con D.O. (vino, aceite, jamón). Verificación de autenticidad y lucha contra el fraude alimentario.
- **Consumer**: AgriData Consulting

---

### 7.4 MOVILIDAD SOSTENIBLE (3 oportunidades)

#### Oportunidad 25
- **Título**: Emisiones Scope 3 Flotas Logísticas
- **Categoría**: ESG
- **Presupuesto**: 5,000 - 8,000 EUROe
- **Descripción**: Cálculo de emisiones CO2 por ruta de transporte de mercancías para reporting de sostenibilidad corporativa. Incluir factores de emisión por tipo de vehículo y distancia.
- **Consumer**: Green Finance Bank

#### Oportunidad 26
- **Título**: Telemetría Flotas Vehículos Eléctricos
- **Categoría**: IoT
- **Presupuesto**: 4,000 - 7,000 EUROe
- **Descripción**: Datos reales de consumo, autonomía y degradación de batería de flotas de vehículos eléctricos comerciales. Para optimización de rutas y planificación de infraestructura de carga.
- **Consumer**: Logistics AI Solutions

#### Oportunidad 27
- **Título**: Optimización Retornos Vacíos
- **Categoría**: AI
- **Presupuesto**: 3,000 - 6,000 EUROe
- **Descripción**: Datos de rutas de transporte con carga de retorno disponible para reducir viajes en vacío. Incluir origen, destino, capacidad disponible y ventanas horarias.
- **Consumer**: Logistics AI Solutions

---

### 7.5 SALUD (2 oportunidades)

#### Oportunidad 28
- **Título**: Verificación Licencias Dispositivos Médicos
- **Categoría**: Pharma
- **Presupuesto**: 3,000 - 5,000 EUROe
- **Descripción**: Base de datos de dispositivos médicos con marcado CE y cumplimiento MDR (Reglamento de Dispositivos Médicos). Incluir clase de riesgo, organismo notificado y fecha de caducidad.
- **Consumer**: Logistics AI Solutions

#### Oportunidad 29
- **Título**: Datos Anonimizados Ensayos Clínicos
- **Categoría**: Pharma
- **Presupuesto**: 6,000 - 10,000 EUROe
- **Descripción**: Información anonimizada de ensayos clínicos para investigación secundaria, cumpliendo GDPR y normativa EMA. Datos demográficos, endpoints y resultados agregados.
- **Consumer**: Logistics AI Solutions

---

### 7.6 ECONOMÍA SOCIAL (1 oportunidad)

#### Oportunidad 30
- **Título**: Métricas SROI Empresas de Inserción
- **Categoría**: ESG
- **Presupuesto**: 1,500 - 3,000 EUROe
- **Descripción**: Impacto social verificado de centros especiales de empleo y empresas de inserción. Métricas de Social Return on Investment (SROI), personas insertadas y ahorro a la administración pública.
- **Consumer**: Green Finance Bank

---

## 8. SCRIPT SQL DE INSERCIÓN

```sql
-- =============================================================================
-- 30 NUEVAS OPORTUNIDADES DE MERCADO PARA PROCUREDATA
-- Distribución según OFFICIAL_SECTORS.targetShare
-- Fecha: 2026-01-07
-- =============================================================================

-- INDUSTRIAL (16 oportunidades)

INSERT INTO marketplace_opportunities 
(consumer_org_id, title, description, category, budget_range, status, expires_at) 
VALUES
('11111111-2222-3333-4444-000000000004', 
 'Ficha Técnica Proveedores Tier 2 Automoción',
 'Buscamos datos maestros completos de proveedores metalúrgicos Tier 2 del sector automoción español. Necesitamos capacidad productiva trimestral, certificaciones IATF 16949 vigentes, histórico de entregas y datos de contacto verificados. Formato JSON-LD preferido.',
 'Industrial', '5,000 - 10,000 EUROe', 'active', NOW() + INTERVAL '30 days'),

('11111111-2222-3333-4444-000000000004', 
 'Certificaciones ISO Sector Aeronáutico',
 'Base de datos actualizada de certificaciones EN9100 y NADCAP vigentes para proveedores del sector aeronáutico europeo. Incluir fechas de vencimiento, alcance de certificación y organismo certificador.',
 'Aerospace', '3,000 - 6,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

('11111111-2222-3333-4444-000000000003', 
 'Telemetría IoT Maquinaria CNC',
 'Histórico de 2 años de datos de sensores de vibración, temperatura y consumo energético de máquinas CNC para entrenamiento de modelos de mantenimiento predictivo. Datos anonimizados aceptados.',
 'IoT', '4,000 - 8,000 EUROe', 'active', NOW() + INTERVAL '60 days'),

('11111111-2222-3333-4444-000000000004', 
 'Capacidad Productiva Fundiciones España',
 'Métricas de capacidad disponible por trimestre de fundiciones de hierro y aluminio en España. Incluir tonelaje máximo, plazos de entrega actuales y especialización por tipo de pieza.',
 'Industrial', '2,000 - 4,000 EUROe', 'active', NOW() + INTERVAL '30 days'),

('11111111-2222-3333-4444-000000000001', 
 'Histórico Pedidos Sector Plásticos',
 'Transacciones comerciales anonimizadas de los últimos 5 años del sector de inyección de plásticos. Interesa volúmenes, precios de referencia y estacionalidad de la demanda.',
 'Industrial', '3,000 - 5,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

('11111111-2222-3333-4444-000000000002', 
 'Certificados CBAM Importadores Asia',
 'Datos de huella de carbono verificada de proveedores asiáticos para cumplimiento del Mecanismo de Ajuste en Frontera por Carbono (CBAM). Necesitamos emisiones Scope 1 y 2 por tonelada de producto.',
 'ESG', '8,000 - 15,000 EUROe', 'active', NOW() + INTERVAL '60 days'),

('11111111-2222-3333-4444-000000000004', 
 'Homologación Proveedores MRO',
 'Base de datos de contratas de mantenimiento (MRO) homologadas con certificación ISO 45001 y seguros de responsabilidad civil vigentes. Sector industrial general.',
 'Compliance', '2,000 - 4,000 EUROe', 'active', NOW() + INTERVAL '30 days'),

('11111111-2222-3333-4444-000000000002', 
 'Consumo Energético Industrial por Planta',
 'Métricas de consumo eléctrico (kWh) desglosadas por planta industrial para reporting CSRD. Incluir mix de fuentes renovables/no renovables y emisiones asociadas.',
 'Energy', '5,000 - 10,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

('11111111-2222-3333-4444-000000000004', 
 'Trazabilidad Materias Primas Críticas',
 'Datos de origen verificable en blockchain de materias primas críticas (litio, cobalto, tierras raras) para cumplimiento de la Directiva de Diligencia Debida. Cadena de custodia completa.',
 'Blockchain', '6,000 - 12,000 EUROe', 'active', NOW() + INTERVAL '60 days'),

('11111111-2222-3333-4444-000000000003', 
 'Inventario Just-in-Time Componentes',
 'Stock disponible en tiempo real de componentes electrónicos (semiconductores, PCBs, conectores) de distribuidores europeos para optimización de inventario JIT.',
 'Industrial', '3,000 - 6,000 EUROe', 'active', NOW() + INTERVAL '30 days'),

('11111111-2222-3333-4444-000000000001', 
 'Auditorías Sociales Proveedores Textiles',
 'Informes Sedex/BSCI de auditorías sociales de fábricas textiles en Asia. Incluir ratings, no conformidades y planes de acción correctiva. Para Due Diligence CSDDD.',
 'ESG', '4,000 - 7,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

('11111111-2222-3333-4444-000000000004', 
 'Métricas de Calidad Six Sigma',
 'Datos de defectos y rechazos por proveedor industrial (PPM, DPMO) de los últimos 3 años. Para benchmarking de calidad y selección de proveedores.',
 'Industrial', '2,000 - 4,000 EUROe', 'active', NOW() + INTERVAL '30 days'),

('11111111-2222-3333-4444-000000000003', 
 'Predicción de Demanda Sector Químico',
 'Dataset histórico de demanda de productos químicos industriales (solventes, resinas, aditivos) para entrenar modelos de forecasting. Mínimo 5 años de datos.',
 'AI', '6,000 - 10,000 EUROe', 'active', NOW() + INTERVAL '60 days'),

('11111111-2222-3333-4444-000000000004', 
 'Digital Twins Líneas de Producción',
 'Datos de configuración y parámetros operativos de líneas de producción automatizadas para creación de gemelos digitales. Incluir layouts, tiempos de ciclo y cuellos de botella.',
 'IoT', '8,000 - 15,000 EUROe', 'active', NOW() + INTERVAL '60 days'),

('11111111-2222-3333-4444-000000000002', 
 'Scoring Crediticio Proveedores B2B',
 'Evaluación de riesgo financiero de proveedores industriales españoles. Z-Score, ratios de solvencia, historial de pagos y alertas de morosidad.',
 'Fintech', '3,000 - 5,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

('11111111-2222-3333-4444-000000000003', 
 'Datos de Mantenimiento Predictivo',
 'Histórico de averías y fallos de maquinaria industrial para entrenar modelos de mantenimiento predictivo. Incluir tipo de fallo, tiempo de reparación y costes asociados.',
 'AI', '5,000 - 8,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

-- COMERCIO (4 oportunidades)

('11111111-2222-3333-4444-000000000001', 
 'Afluencia Peatonal Zonas Comerciales',
 'Datos georeferenciados de tráfico peatonal en zonas comerciales de principales ciudades españolas. Granularidad horaria, segmentación por día de semana y eventos especiales.',
 'Retail', '2,500 - 4,000 EUROe', 'active', NOW() + INTERVAL '30 days'),

('11111111-2222-3333-4444-000000000001', 
 'Histórico Ventas E-commerce España',
 'Tendencias de consumo online anonimizadas por categoría de producto. Incluir estacionalidad, ticket medio y tasas de conversión. Últimos 3 años.',
 'Retail', '4,000 - 7,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

('11111111-2222-3333-4444-000000000001', 
 'Auditorías Ética Cadena de Suministro Retail',
 'Validación de proveedores de productos de consumo contra estándares de derechos humanos y trabajo infantil. Certificaciones SA8000 y auditorías SMETA.',
 'ESG', '3,000 - 5,000 EUROe', 'active', NOW() + INTERVAL '60 days'),

('11111111-2222-3333-4444-000000000003', 
 'Proveedores Logística Última Milla ZBE',
 'Base de datos de proveedores de reparto de última milla que cumplen normativas de Zonas de Bajas Emisiones. Incluir flota eléctrica, cobertura geográfica y tarifas.',
 'Logistics', '2,000 - 4,000 EUROe', 'active', NOW() + INTERVAL '30 days'),

-- AGROALIMENTARIO (4 oportunidades)

('11111111-2222-3333-4444-000000000005', 
 'Trazabilidad Lotes Productos Ecológicos',
 'Cadena de custodia completa desde origen agrícola hasta punto de distribución para productos ecológicos certificados. Incluir lotes, fechas y certificadores.',
 'AgriFood', '2,000 - 4,000 EUROe', 'active', NOW() + INTERVAL '30 days'),

('11111111-2222-3333-4444-000000000005', 
 'Certificados Sanitarios Importación',
 'Documentación fitosanitaria de productos frescos importados (frutas, verduras, pescado). Certificados CITES, análisis de residuos y autorizaciones de importación.',
 'AgriFood', '3,000 - 5,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

('11111111-2222-3333-4444-000000000005', 
 'Datos IoT Cadena de Frío',
 'Histórico de sensores de temperatura y humedad en transporte refrigerado de productos perecederos. Para validación de cadena de frío y trazabilidad alimentaria.',
 'IoT', '4,000 - 7,000 EUROe', 'active', NOW() + INTERVAL '60 days'),

('11111111-2222-3333-4444-000000000005', 
 'Denominaciones de Origen Verificadas',
 'Certificación blockchain de procedencia geográfica para productos con D.O. (vino, aceite, jamón). Verificación de autenticidad y lucha contra el fraude alimentario.',
 'Blockchain', '2,500 - 4,500 EUROe', 'active', NOW() + INTERVAL '45 days'),

-- MOVILIDAD SOSTENIBLE (3 oportunidades)

('11111111-2222-3333-4444-000000000002', 
 'Emisiones Scope 3 Flotas Logísticas',
 'Cálculo de emisiones CO2 por ruta de transporte de mercancías para reporting de sostenibilidad corporativa. Incluir factores de emisión por tipo de vehículo y distancia.',
 'ESG', '5,000 - 8,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

('11111111-2222-3333-4444-000000000003', 
 'Telemetría Flotas Vehículos Eléctricos',
 'Datos reales de consumo, autonomía y degradación de batería de flotas de vehículos eléctricos comerciales. Para optimización de rutas y planificación de infraestructura de carga.',
 'IoT', '4,000 - 7,000 EUROe', 'active', NOW() + INTERVAL '60 days'),

('11111111-2222-3333-4444-000000000003', 
 'Optimización Retornos Vacíos',
 'Datos de rutas de transporte con carga de retorno disponible para reducir viajes en vacío. Incluir origen, destino, capacidad disponible y ventanas horarias.',
 'AI', '3,000 - 6,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

-- SALUD (2 oportunidades)

('11111111-2222-3333-4444-000000000003', 
 'Verificación Licencias Dispositivos Médicos',
 'Base de datos de dispositivos médicos con marcado CE y cumplimiento MDR (Reglamento de Dispositivos Médicos). Incluir clase de riesgo, organismo notificado y fecha de caducidad.',
 'Pharma', '3,000 - 5,000 EUROe', 'active', NOW() + INTERVAL '45 days'),

('11111111-2222-3333-4444-000000000003', 
 'Datos Anonimizados Ensayos Clínicos',
 'Información anonimizada de ensayos clínicos para investigación secundaria, cumpliendo GDPR y normativa EMA. Datos demográficos, endpoints y resultados agregados.',
 'Pharma', '6,000 - 10,000 EUROe', 'active', NOW() + INTERVAL '60 days'),

-- ECONOMÍA SOCIAL (1 oportunidad)

('11111111-2222-3333-4444-000000000002', 
 'Métricas SROI Empresas de Inserción',
 'Impacto social verificado de centros especiales de empleo y empresas de inserción. Métricas de Social Return on Investment (SROI), personas insertadas y ahorro a la administración pública.',
 'ESG', '1,500 - 3,000 EUROe', 'active', NOW() + INTERVAL '45 days');
```

---

## 9. ACTUALIZACIÓN PROPUESTA DE CATEGORÍAS UI

### Archivo: `src/pages/Opportunities.tsx`

**Categorías actuales:**
```typescript
const CATEGORIES = [
  "All", "Automotive", "Energy", "Pharma", "Retail", 
  "Construction", "Finance", "Logistics", "AgriFood", 
  "Aerospace", "Tech", "ESG", "AI"
];
```

**Categorías propuestas (alineadas con sectores y nuevas oportunidades):**
```typescript
const CATEGORIES = [
  "All",
  // Sectores oficiales
  "Industrial", 
  "Retail", 
  "AgriFood", 
  "Logistics",
  "Pharma",
  // Tecnologías transversales
  "ESG",
  "AI",
  "IoT",
  "Blockchain",
  "Fintech",
  // Especializaciones
  "Aerospace",
  "Energy",
  "Compliance"
];
```

---

## 10. DATOS JSON PARA GOOGLE AI STUDIO

### 10.1 Array de Oportunidades (formato JSON)

```json
{
  "opportunities": [
    {
      "id": 1,
      "sector": "Industrial",
      "title": "Ficha Técnica Proveedores Tier 2 Automoción",
      "category": "Industrial",
      "budget_min": 5000,
      "budget_max": 10000,
      "currency": "EUROe",
      "keywords": ["proveedores", "automoción", "tier2", "metalurgia", "IATF16949"],
      "regulations": ["IATF 16949"],
      "data_type": "master_data"
    },
    {
      "id": 2,
      "sector": "Industrial",
      "title": "Certificaciones ISO Sector Aeronáutico",
      "category": "Aerospace",
      "budget_min": 3000,
      "budget_max": 6000,
      "currency": "EUROe",
      "keywords": ["certificaciones", "aeronáutico", "EN9100", "NADCAP"],
      "regulations": ["EN9100", "NADCAP"],
      "data_type": "certifications"
    }
    // ... continúa con las 30 oportunidades
  ],
  "sectors_distribution": {
    "Industrial": 16,
    "Comercio": 4,
    "Agroalimentario": 4,
    "Movilidad": 3,
    "Salud": 2,
    "Economia_Social": 1
  },
  "categories_used": [
    "Industrial", "Aerospace", "IoT", "ESG", "Compliance", 
    "Energy", "Blockchain", "Fintech", "AI", "Retail", 
    "Logistics", "AgriFood", "Pharma"
  ],
  "budget_ranges": {
    "min": 1500,
    "max": 15000,
    "currency": "EUROe",
    "average": 5500
  }
}
```

---

## 11. INSTRUCCIONES PARA GOOGLE AI STUDIO

### Contexto de Uso

Este documento proporciona toda la información necesaria para:

1. **Generar datos sintéticos adicionales** alineados con el ecosistema ProcureData
2. **Crear visualizaciones** de las oportunidades de mercado
3. **Entrenar modelos** para clasificación de oportunidades por sector
4. **Generar descripciones** más detalladas de cada oportunidad

### Prompts Sugeridos

**Para generar más oportunidades:**
```
Basándote en las 30 oportunidades de mercado del documento, genera 10 oportunidades adicionales para el sector [SECTOR] manteniendo:
- Formato de título: específico y técnico
- Presupuesto: entre 1,500 y 15,000 EUROe
- Descripción: 2-3 frases con requisitos específicos
- Categoría: alineada con las categorías existentes
```

**Para mejorar descripciones:**
```
Mejora la descripción de la oportunidad "[TÍTULO]" añadiendo:
- Especificaciones técnicas más detalladas
- Referencias a normativas europeas aplicables
- Formato de datos preferido (JSON-LD, CSV, API)
- Requisitos de frecuencia de actualización
```

---

## 12. RESUMEN EJECUTIVO

| Métrica | Valor |
|---------|-------|
| Total oportunidades nuevas | 30 |
| Sectores cubiertos | 6 |
| Categorías únicas | 13 |
| Presupuesto total potencial | 135,000 - 230,000 EUROe |
| Organizaciones consumer involucradas | 5 |
| Alineación con OFFICIAL_SECTORS | ✅ 100% |

---

## 13. OPORTUNIDADES DE ALTA FIDELIDAD (ADICIÓN)

### 5 Oportunidades Premium Generadas

| # | Categoría | Título | Empresa | Presupuesto | Propósito |
|---|-----------|--------|---------|-------------|-----------|
| 31 | AgriFood | Huella Hídrica Aceite de Oliva - Jaén | OliveTrust Coop | 4,500 - 7,500 EUROe | Trazabilidad ESG para exportación UE |
| 32 | Logistics | Emisiones Scope 3 Flota Logística BCN | UrbanDeliver S.L. | 2,800 - 5,200 EUROe | Reporte cumplimiento CSRD |
| 33 | Pharma | Logs Mantenimiento Resonancias Magnéticas | BioMed Hospital Group | 8,000 - 12,000 EUROe | Mantenimiento predictivo hospitalario |
| 34 | Industrial | Histórico Fallos Brazos Robóticos CNC | GigaFactory North | 6,500 - 9,000 EUROe | Optimización paradas de línea |
| 35 | ESG | Diversidad e Impacto Proveedores Locales | Alianza Social Hub | 1,800 - 3,500 EUROe | Compra Pública Ética y SROI |

---

## 14. ESPECIFICACIÓN TÉCNICA DATASET: INC-ROB-CNC-2025-V4

### Metadatos del Dataset

| Campo | Valor |
|-------|-------|
| **Título** | Telemetría y Registro de Fallos - Brazos Robóticos Serie-X |
| **Formato** | JSON-LD (Estandarizado IDSA) / CSV (Exportable) |
| **Frecuencia** | 10 Hz (Datos procesados por Edge Functions) |
| **Volumen** | ~500,000 registros (6 meses) |
| **Oportunidad** | Histórico Fallos Brazos Robóticos CNC |

### Esquema de Columnas

| Columna | Tipo | Descripción | Ejemplo |
|---------|------|-------------|---------|
| `timestamp_utc` | DateTime (ISO) | Fecha y hora exacta del registro | 2025-11-24T14:20:01Z |
| `asset_did` | String (DID) | Identificador soberano del brazo robótico | did:ethr:0x7e...robot01 |
| `joint_temp_c` | Float | Temperatura del motor en eje crítico (°C) | 64.2 |
| `vibration_rms` | Float | Valor RMS de vibración eje Z (m/s²) | 0.15 |
| `torque_nm` | Float | Par motor detectado en ciclo actual | 125.4 |
| `cycle_count` | Integer | Ciclos desde último mantenimiento | 450230 |
| `operational_mode` | Enum | Estado: Auto, Manual, Calibration, Alarm | Auto |
| `error_code` | String | Código de error si estado es Alarm | E-402 (Overload) |
| `failure_label` | Boolean | Indica si resultó en parada de línea | 1 (True) |
| `notary_hash` | Hash (hex) | Prueba de integridad en blockchain | 0x8f3c...b2e1 |

### Muestra de Datos CSV

```csv
timestamp_utc,asset_did,joint_temp_c,vibration_rms,torque_nm,cycle_count,operational_mode,error_code,failure_label,notary_hash
2025-11-24T14:20:01Z,did:ethr:0x7e1a2b3c4d5e6f7robot01,58.4,0.12,120.1,450001,Auto,null,0,0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b
2025-11-24T14:25:10Z,did:ethr:0x7e1a2b3c4d5e6f7robot01,62.1,0.18,135.5,450120,Auto,null,0,0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e
2025-11-24T14:30:45Z,did:ethr:0x7e1a2b3c4d5e6f7robot01,78.9,0.45,158.2,450230,Alarm,E-402,1,0x8f3c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c
2025-11-24T14:35:20Z,did:ethr:0x7e1a2b3c4d5e6f7robot01,65.3,0.14,122.8,450231,Manual,null,0,0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c
2025-11-24T14:40:55Z,did:ethr:0x7e1a2b3c4d5e6f7robot02,55.2,0.11,118.3,320150,Auto,null,0,0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f
2025-11-24T14:45:30Z,did:ethr:0x7e1a2b3c4d5e6f7robot02,57.8,0.13,125.7,320280,Auto,null,0,0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b
2025-11-24T14:50:05Z,did:ethr:0x7e1a2b3c4d5e6f7robot02,82.4,0.52,165.9,320410,Alarm,E-501,1,0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d
```

### Gobernanza del Dataset (Motor ProcureData)

| Capacidad | Aplicación |
|-----------|------------|
| **Soberanía (ODRL)** | Uso exclusivo para entrenamiento de modelos IA. Prohibida redistribución a competidores sector automotriz |
| **Identidad (SSI)** | GigaFactory North firma veracidad con DID Corporativo. Check "KYB Verificado" visible |
| **Privacidad (GDPR)** | Edge Functions anonimizan `operator_id` antes de descarga |
| **Integridad (Blockchain)** | Merkle Root por lote de 1,000 filas anclado en Pontus-X |

### Umbrales de Alerta (para Health Score)

| Métrica | Normal | Warning | Critical |
|---------|--------|---------|----------|
| `joint_temp_c` | < 65°C | 65-80°C | > 80°C |
| `vibration_rms` | < 0.20 m/s² | 0.20-0.40 m/s² | > 0.40 m/s² |
| `torque_nm` | < 140 Nm | 140-160 Nm | > 160 Nm |

### Validación Automática del Dataset

```typescript
interface RoboticArmTelemetry {
  timestamp_utc: string; // ISO 8601
  asset_did: string; // did:ethr:0x...
  joint_temp_c: number; // 20-120 range
  vibration_rms: number; // 0-2 range
  torque_nm: number; // 0-250 range
  cycle_count: number; // positive integer
  operational_mode: 'Auto' | 'Manual' | 'Calibration' | 'Alarm';
  error_code: string | null;
  failure_label: 0 | 1;
  notary_hash: string; // 0x + 64 hex chars
}

// Validation rules for Health Score calculation
const VALIDATION_RULES = {
  completeness: ['timestamp_utc', 'asset_did', 'joint_temp_c', 'vibration_rms'],
  ranges: {
    joint_temp_c: { min: 20, max: 120 },
    vibration_rms: { min: 0, max: 2 },
    torque_nm: { min: 0, max: 250 }
  },
  consistency: {
    failure_label_requires_alarm: true,
    error_code_requires_alarm: true
  }
};
```

---

*Documento generado para transferencia de contexto a Google AI Studio*
*ProcureData © 2026*
