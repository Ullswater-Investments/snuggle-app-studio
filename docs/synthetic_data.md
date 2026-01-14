# Synthetic Data Architecture Map

> **Documento Maestro para Generación de Datos Demo**  
> Versión: 1.0 | Fecha: 2026-01-06  
> Objetivo: Mapear la UI con la Base de Datos para demos realistas y auditoría

---

## 1. Introducción

Este documento proporciona un mapa exhaustivo de la arquitectura de datos de PROCUREDATA, detallando:

- **Tablas críticas** de Supabase y sus relaciones
- **Contratos de datos** (Data Contracts) para cada componente de UI
- **Recetas de datos sintéticos** para generar demos de alta fidelidad

### Constantes Oficiales (Referencia)

```typescript
// src/lib/constants.ts
OFFICIAL_SECTORS = [
  { id: "industrial", label: "Industrial", priority: 1, targetShare: 51, icon: "Factory" },
  { id: "comercio", label: "Comercio", priority: 2, targetShare: 15, icon: "ShoppingBag" },
  { id: "agroalimentario", label: "Agroalimentario", priority: 3, targetShare: 12, icon: "Wheat" },
  { id: "movilidad_sostenible", label: "Movilidad Sostenible", priority: 4, targetShare: 10, icon: "Truck" },
  { id: "salud", label: "Salud", priority: 5, targetShare: 7, icon: "Heart" },
  { id: "economia_social", label: "Economía Social", priority: 6, targetShare: 5, icon: "Users" }
]

OFFICIAL_PRICING = {
  transactionFee: 1.00,      // EUROe por alta de proveedor
  annualMembership: 100,     // EUROe/año membresía Pro
  currency: "EUROe"
}
```

---

## 2. Arquitectura de Datos (Supabase Schema)

### 2.1 Tablas Críticas

| Tabla | Propósito | Campos Obligatorios | Notas |
|-------|-----------|---------------------|-------|
| `organizations` | Entidades del ecosistema | `id`, `name`, `type`, `tax_id` | `type`: consumer, provider, data_holder |
| `user_profiles` | Usuarios asociados a orgs | `user_id`, `organization_id` | FK a auth.users |
| `user_roles` | Permisos RBAC | `user_id`, `organization_id`, `role` | `role`: admin, approver, viewer, api_configurator |
| `data_products` | Definición de productos | `id`, `name`, `version` | Templates de datos |
| `data_assets` | Activos listados en marketplace | `id`, `product_id`, `subject_org_id`, `holder_org_id`, `status` | `status`: available, reserved |
| `data_transactions` | Flujo de solicitudes | `id`, `asset_id`, `consumer_org_id`, `status` | Ver enum `transaction_status` |
| `wallets` | Saldos por organización | `id`, `organization_id`, `balance` | 1:1 con organization |
| `wallet_transactions` | Movimientos financieros | `id`, `amount`, `from_wallet_id` o `to_wallet_id` | Auditables |
| `esg_reports` | Datos de sostenibilidad | `id`, `organization_id`, `report_year` | Scope 1, 2, certificaciones |
| `value_services` | Servicios del marketplace | `id`, `name`, `category`, `price` | Incluye `features` JSONB |
| `marketplace_opportunities` | Demandas de datos | `id`, `consumer_org_id`, `title`, `status` | `status`: active, closed |
| `innovation_lab_concepts` | Conceptos I+D | `id`, `title`, `chart_type`, `chart_data` | Charts dinámicos |
| `supplier_data` | Pasaporte de proveedor | `id`, `transaction_id`, `company_name`, `tax_id` | Datos validados |
| `organization_reviews` | Reseñas y ratings | `id`, `transaction_id`, `rating` | 1-5 estrellas |

### 2.2 Enums Críticos

```sql
-- transaction_status
'initiated' | 'pending_subject' | 'pending_holder' | 'approved' | 
'denied_subject' | 'denied_holder' | 'completed' | 'cancelled'

-- organization_type
'consumer' | 'provider' | 'data_holder'

-- app_role
'admin' | 'approver' | 'viewer' | 'api_configurator'
```

### 2.3 Relaciones (Foreign Keys)

```
data_transactions.consumer_org_id  → organizations.id
data_transactions.subject_org_id   → organizations.id
data_transactions.holder_org_id    → organizations.id
data_transactions.asset_id         → data_assets.id
data_assets.product_id             → data_products.id
data_assets.subject_org_id         → organizations.id
data_assets.holder_org_id          → organizations.id
wallets.organization_id            → organizations.id (1:1)
esg_reports.organization_id        → organizations.id
value_services.provider_org_id     → organizations.id
supplier_data.transaction_id       → data_transactions.id
organization_reviews.transaction_id → data_transactions.id
```

---

## 3. Análisis por Página

### 3.1 Dashboard (`/dashboard`)

**Layout:** Grid 2x2 KPIs + AreaChart (span 2) + ActivityFeed

#### Componentes y Contratos de Datos

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `SparklineCard` (Wallet) | `{ value: number, data: Array<{value: number}>, trend: number }` | `wallets.balance`, `wallet_transactions` |
| `ProgressCard` (Gastos) | `{ value: number, maxValue: number, trend: number }` | Calculado de `wallet_transactions` salientes |
| `MiniPieChart` (Status) | `Array<{ name: string, value: number, color: string }>` | `data_transactions` GROUP BY status |
| `HealthScoreGauge` | `{ dataQuality: 0-100, sustainability: 0-100, activity: 0-100 }` | Calculado multi-tabla |

**Cálculo de HealthScoreGauge:**
```typescript
dataQuality = (data_assets.count / 10) * 100  // Cap at 100
sustainability = esg_reports.energy_renewable_percent || 50
activity = (transactions_last_30d / 5) * 100  // Cap at 100
```

#### Receta de Datos

```sql
-- Wallet con saldo atractivo
INSERT INTO wallets (organization_id, balance, currency) VALUES
  ('{demo_org_id}', 15750.00, 'EUR');

-- Transacciones históricas para gráfico (últimos 6 meses)
-- Distribuir: 60% completed, 20% pending_*, 15% approved, 5% denied
INSERT INTO data_transactions (asset_id, consumer_org_id, ..., status, created_at) VALUES
  -- 50+ registros con fechas espaciadas cada 3-4 días
```

---

### 3.2 Sustainability (`/sustainability`)

**Layout:** 4 EcoGauges (row) + 2 columnas (GrowthTree | SectorRanking) + AreaChart tendencias

#### Componentes y Contratos de Datos

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `EcoGauge` (Scope 1) | `{ value: number, maxValue: 5000, label: "Scope 1", unit: "tCO₂e", targetValue?: number }` | `esg_reports.scope1_total_tons` |
| `EcoGauge` (Scope 2) | `{ value: number, maxValue: 5000, ... }` | `esg_reports.scope2_total_tons` |
| `EcoGauge` (Renovable) | `{ value: number, maxValue: 100, unit: "%" }` | `esg_reports.energy_renewable_percent` |
| `EcoGauge` (Score) | `{ value: number, maxValue: 100 }` | Calculado |
| `GrowthTree` | `{ level: 1-5, progress: 0-100, totalPoints: number, badges: string[] }` | Calculado desde ESG + certifications |
| `SectorRanking` | `{ position: number, totalCompanies: number, yourScore: number, sectorAverage: number, sectorName: string, trend?: "up"\|"down"\|"stable" }` | Simulado vs otras orgs |

**Estructura de `esg_reports`:**
```json
{
  "organization_id": "uuid",
  "report_year": 2025,
  "scope1_total_tons": 1250.5,
  "scope2_total_tons": 890.3,
  "energy_renewable_percent": 72.5,
  "certifications": ["ISO 14001", "ISO 9001", "Pontus-X Verified"]
}
```

#### Receta de Datos

```sql
-- 3 años de reports para mostrar tendencias
INSERT INTO esg_reports (organization_id, report_year, scope1_total_tons, scope2_total_tons, energy_renewable_percent, certifications) VALUES
  ('{org_id}', 2025, 1250.5, 890.3, 72.5, ARRAY['ISO 14001', 'Pontus-X Verified']),
  ('{org_id}', 2024, 1450.2, 980.1, 65.0, ARRAY['ISO 14001']),
  ('{org_id}', 2023, 1680.0, 1100.0, 55.0, ARRAY['ISO 9001']);
```

---

### 3.3 Services (`/services`)

**Layout:** Hero + Tabs (categorías) + Grid 3 columnas ServiceCards

#### Componentes y Contratos de Datos

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `ServiceCard` | Objeto `value_services` completo | `value_services` |
| `ServiceFlowDiagram` | `{ category: string, serviceName: string }` | Generado dinámicamente |
| `ServiceMetrics` | `{ serviceName: string }` | Simulado |
| `ServicePopularityBadge` | `{ price: number, createdAt: Date }` | Calculado |

**Estructura de `value_services`:**
```json
{
  "id": "uuid",
  "name": "Homologación Flash",
  "category": "Compliance",
  "description": "Validación automática de proveedores en 24h con verificación KYB",
  "icon_name": "ShieldCheck",
  "price": 150.00,
  "price_model": "one_time",
  "currency": "EUR",
  "version": "1.0",
  "features": [
    "Validación KYB automática",
    "Scoring crediticio básico",
    "Verificación de certificados ISO",
    "Historial de transacciones"
  ],
  "documentation_md": "## Guía de Uso\n\n### Requisitos previos...",
  "code_examples": {
    "curl": "curl -X POST ...",
    "javascript": "const response = await fetch(..."
  },
  "integrations": ["SAP", "Oracle", "Microsoft Dynamics"],
  "api_endpoint": "/api/v1/validate/supplier"
}
```

#### Receta de Datos (Servicios de Memoria Técnica)

```sql
INSERT INTO value_services (name, category, description, price, price_model, icon_name, features, provider_org_id) VALUES
-- Compliance (3)
('Homologación Flash', 'Compliance', 'Validación de proveedores en 24h con KYB automático', 150, 'one_time', 'ShieldCheck', '["Validación KYB", "Scoring crediticio", "Certificados ISO"]', NULL),
('Due Diligence Express', 'Compliance', 'Análisis de riesgo empresarial completo', 300, 'one_time', 'Search', '["Background check", "Análisis financiero", "Reputación digital"]', NULL),
('Auditoría CSRD', 'Compliance', 'Preparación para directiva europea CSRD', 500, 'one_time', 'FileCheck', '["Scope 1-2-3", "Materialidad", "Certificado oficial"]', NULL),

-- Sostenibilidad (3)
('Carbon Footprint Calculator', 'Sostenibilidad', 'Cálculo automático de huella de carbono', 0, 'free', 'Leaf', '["Scope 1-2", "Benchmark sectorial", "Recomendaciones"]', NULL),
('ESG Report Generator', 'Sostenibilidad', 'Generación de informes ESG automatizados', 200, 'one_time', 'FileText', '["Templates CSRD", "Gráficos interactivos", "Export PDF"]', NULL),
('Green Badge Certification', 'Sostenibilidad', 'Certificación de proveedor sostenible', 100, 'subscription', 'Award', '["Auditoría anual", "Badge verificable", "Listing prioritario"]', NULL),

-- Financiación (2)
('Trade Finance Scoring', 'Financiación', 'Evaluación de riesgo para financiación comercial', 200, 'one_time', 'Banknote', '["Score 0-100", "Probabilidad de impago", "Límite sugerido"]', NULL),
('Invoice Factoring Connect', 'Financiación', 'Conexión con entidades de factoring', 50, 'one_time', 'ArrowRightLeft', '["3 entidades", "Ofertas comparativas", "Integración ERP"]', NULL),

-- IA & Analytics (3)
('Demand Forecasting AI', 'IA & Analytics', 'Predicción de demanda con machine learning', 300, 'subscription', 'Brain', '["Modelo ML", "Horizonte 12 meses", "API REST"]', NULL),
('Supplier Risk Monitor', 'IA & Analytics', 'Monitorización continua de riesgo', 150, 'subscription', 'AlertTriangle', '["Alertas real-time", "Score dinámico", "Eventos externos"]', NULL),
('Price Intelligence', 'IA & Analytics', 'Análisis de precios de mercado', 100, 'subscription', 'TrendingUp', '["Benchmark", "Alertas de variación", "Histórico 5 años"]', NULL),

-- Data Ops (2)
('ERP Connector Pack', 'Data Ops', 'Conectores para ERPs principales', 200, 'one_time', 'Plug', '["SAP", "Oracle", "Microsoft Dynamics", "Sage"]', NULL),
('Data Quality Validator', 'Data Ops', 'Validación automática de calidad de datos', 0, 'free', 'CheckCircle', '["Completitud", "Formato", "Duplicados"]', NULL);
```

### 3.3.1 Widgets Interactivos de Servicios (Gamificación)

Los servicios se renderizan con widgets dinámicos según su categoría.  
Archivo: `src/components/services/ServiceInteractiveWidget.tsx`

| Categoría | Widget | Descripción | Archivo |
|-----------|--------|-------------|---------|
| Financiación | `RoiCalculator` | Calculadora de ROI con slider y gráfico animado | `widgets/RoiCalculator.tsx` |
| Compliance | `ProcessFlow` | Flujo de proceso Input→Proceso→Output con animación | `widgets/ProcessFlow.tsx` |
| Data Ops | `ProcessFlow` | Mismo widget de flujo | `widgets/ProcessFlow.tsx` |
| Privacidad | `ProcessFlow` | Mismo widget de flujo | `widgets/ProcessFlow.tsx` |
| IA & Analytics | `CapabilityTree` | Árbol Raw Data→AI Engine→Insight con hover effects | `widgets/CapabilityTree.tsx` |
| Inteligencia | `CapabilityTree` | Mismo widget de árbol | `widgets/CapabilityTree.tsx` |
| Sostenibilidad | `ImpactGauge` | Gauge semicircular ESG con confetti de hojas | `widgets/ImpactGauge.tsx` |
| Blockchain | `ImpactGauge` | Mismo gauge adaptado | `widgets/ImpactGauge.tsx` |

**Estructura de Widgets:**

```typescript
// RoiCalculator (widgets/RoiCalculator.tsx)
const COST_MODEL = {
  manualCostPerUnit: 15,  // Coste manual por operación
  autoCostPerUnit: 2,     // Coste con ProcureData
};
// Renderiza: BarChart horizontal + Slider de volumen (10-1000) + Badge "High Saver"
// Estados: volume (slider), displaySavings (animado)

// ProcessFlow (widgets/ProcessFlow.tsx)
type ProcessState = 'idle' | 'processing' | 'success';
// Renderiza: 3 nodos (Input→Processor→Output) con línea animada
// Botón "Simular Proceso" que ejecuta animación de 3 pasos

// CapabilityTree (widgets/CapabilityTree.tsx)
// Renderiza: 3 nodos (Raw Data → AI Engine → Insight) con hover glow
// Efecto: Al hacer hover, líneas se iluminan y nodo central pulsa

// ImpactGauge (widgets/ImpactGauge.tsx)
// Renderiza: PieChart semicircular (0-100) con colores semáforo
// Botón "Optimizar Huella" → Incrementa score + confetti de hojas verdes
// Badge "Eco-Hero" si score > 85
```

**Mapeo de Categorías (ServiceInteractiveWidget.tsx líneas 9-22):**

```typescript
const getCategoryWidget = (category: string | null) => {
  switch (category?.toLowerCase()) {
    case 'financiación': return <RoiCalculator />;
    case 'compliance':
    case 'data ops':
    case 'privacidad': return <ProcessFlow />;
    case 'ia & analytics':
    case 'inteligencia': return <CapabilityTree />;
    case 'sostenibilidad':
    case 'blockchain': return <ImpactGauge />;
    default: return <ProcessFlow />;
  }
};
```

---

### 3.4 Catalog (`/catalog`)

**Layout:** Hero + Sidebar filtros + Grid 3 columnas ProductCards + Paginación

#### Componentes y Contratos de Datos

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `ProductCard` | `MarketplaceListing` | Vista `marketplace_listings` |
| `StarRating` | `{ rating: number, count: number }` | `organization_reviews` agregado |
| Filtros Sector | `OFFICIAL_SECTORS` labels | Constante |
| Badge Verificado | `kyb_verified: boolean` | `organizations.kyb_verified` |
| Badge Verde | `has_green_badge: boolean` | Calculado de ESG |

**Interface `MarketplaceListing`:**
```typescript
interface MarketplaceListing {
  asset_id: string;
  product_id: string;
  product_name: string;
  product_description: string;
  category: string;  // Debe mapear a OFFICIAL_SECTORS
  version: string;
  provider_id: string;
  provider_name: string;
  seller_category: 'enterprise' | 'startup' | 'sme';
  kyb_verified: boolean;
  pricing_model: 'free' | 'one_time' | 'subscription' | 'usage';
  price: number;
  currency: string;
  billing_period: string | null;
  has_green_badge: boolean;
  energy_renewable_percent: number | null;
  reputation_score: number;  // 1-5
  review_count: number;
  created_at: string;
}
```

#### Receta de Datos

**Distribución por Sector (según `OFFICIAL_SECTORS.targetShare`):**

| Sector | Target | Productos | Ejemplos |
|--------|--------|-----------|----------|
| Industrial | 51% | 10-11 | Ficha técnica proveedor, Telemetría IoT, Certificados calidad |
| Comercio | 15% | 3 | Catálogo productos, Histórico ventas, Stock tiempo real |
| Agroalimentario | 12% | 2-3 | Trazabilidad lotes, Certificados sanitarios |
| Movilidad | 10% | 2 | Flotas GPS, Consumo combustible |
| Salud | 7% | 1-2 | Homologación sanitaria |
| Economía Social | 5% | 1 | Impacto social verificado |

```sql
-- Productos (templates)
INSERT INTO data_products (name, category, description, version) VALUES
-- Industrial (10)
('Ficha Técnica Proveedor', 'Industrial', 'Datos maestros completos del proveedor', '2.1'),
('Certificados ISO', 'Industrial', 'Certificaciones de calidad y gestión', '1.0'),
('Telemetría IoT Planta', 'Industrial', 'Datos de sensores en tiempo real', '1.5'),
('Historial de Pedidos', 'Industrial', 'Registro de transacciones comerciales', '1.0'),
('Capacidad Productiva', 'Industrial', 'Métricas de producción y capacidad', '1.0'),
-- ... más productos

-- Assets (listados)
INSERT INTO data_assets (product_id, subject_org_id, holder_org_id, price, pricing_model, status, is_public_marketplace) VALUES
('{product_ficha_tecnica}', '{titan_manufacturas_id}', '{holder_id}', 150, 'one_time', 'available', true),
-- 20+ assets
```

---

### 3.5 Requests (`/requests`)

**Layout:** 4 KPI cards + Tabs (Pendientes, Mis Solicitudes, Historial) + RequestsAnalyticsDashboard

#### Componentes y Contratos de Datos

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| KPI Cards | Conteos filtrados por status | `data_transactions` COUNT |
| `RequestsAnalyticsDashboard` | `Array<Transaction>` | `data_transactions` + joins |
| Transaction Row | Objeto completo con relaciones | `data_transactions` + assets + orgs |
| `NegotiationChat` | `{ transactionId: string, messages: Message[] }` | `transaction_messages` |

**Estructura de Transaction (para UI):**
```typescript
interface TransactionWithDetails {
  id: string;
  status: TransactionStatus;
  purpose: string;
  justification: string;
  access_duration_days: number;
  created_at: string;
  updated_at: string;
  asset: {
    id: string;
    product: {
      name: string;
      category: string;
    };
    price: number;
  };
  consumer_org: { id: string; name: string; };
  subject_org: { id: string; name: string; };
  holder_org: { id: string; name: string; };
}
```

#### Receta de Datos

```sql
-- Transacciones con distribución realista
-- Estados: initiated(5%), pending_subject(10%), pending_holder(10%), approved(15%), completed(55%), denied(5%)
INSERT INTO data_transactions (
  asset_id, consumer_org_id, subject_org_id, holder_org_id,
  requested_by, purpose, justification, status, created_at
) VALUES
-- 50+ transacciones, fechas últimos 6 meses
('{asset_1}', '{consumer_1}', '{provider_1}', '{holder_1}', 
 '{user_id}', 'Homologación nuevo proveedor', 'Necesidad de diversificar cartera de proveedores industriales', 
 'completed', NOW() - INTERVAL '45 days'),
('{asset_2}', '{consumer_1}', '{provider_2}', '{holder_1}', 
 '{user_id}', 'Validación ESG para licitación pública', 'Requisito obligatorio en pliego de condiciones', 
 'pending_subject', NOW() - INTERVAL '3 days'),
-- ...
```

**Propósitos sugeridos:**
- "Homologación nuevo proveedor"
- "Validación ESG para licitación pública"
- "Auditoría de cadena de suministro"
- "Verificación de capacidad productiva"
- "Due diligence para adquisición"
- "Cumplimiento normativo CSRD"
- "Evaluación de riesgo crediticio"

---

### 3.6 Data View (`/data`)

**Layout:** KPI cards + DataQualityDashboard + Grid de DatasetCards colapsables

#### Componentes y Contratos de Datos

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `DataQualityScore` | `{ completeness: 0-100, accuracy: 0-100, timeliness: 0-100 }` | Calculado |
| `HeartbeatIndicator` | `{ frequency: "realtime"\|"daily"\|"weekly"\|"monthly" }` | Basado en categoría |
| `FreshnessBar` | `{ lastUpdated: Date, maxAgeDays: number }` | `transaction.updated_at` |
| Collapsible Pasaporte | Datos de `supplier_data` | `supplier_data` JOIN transaction |
| `ESGDataView` | `ESGData` object | `esg_reports` |
| `IoTDataView` | Array de telemetría | `data_payloads.data_content` |

**Estructura de `supplier_data` (Pasaporte):**
```json
{
  "id": "uuid",
  "transaction_id": "uuid",
  "company_name": "Titan Manufacturas S.L.",
  "legal_name": "TITAN MANUFACTURAS SOCIEDAD LIMITADA",
  "tax_id": "B12345678",
  "legal_admin_name": "María García López",
  "fiscal_address": {
    "street": "Calle Industrial 45",
    "city": "Barcelona",
    "postal_code": "08019",
    "country": "ES"
  },
  "legal_address": {
    "street": "Calle Industrial 45",
    "city": "Barcelona",
    "postal_code": "08019",
    "country": "ES"
  },
  "contact_person_name": "Carlos Ruiz",
  "contact_person_email": "cruiz@titanmanufacturas.es",
  "contact_person_phone": "+34 932 123 456",
  "data_source": "Registro Mercantil + Validación KYB"
}
```

**Estructura de `data_payloads` (según `schema_type`):**

```typescript
// schema_type: "supplier_data"
{
  company_info: {...},
  certifications: [...],
  financial_summary: {...}
}

// schema_type: "iot_telemetry"
{
  sensors: [
    { id: "TEMP-001", type: "temperature", value: 22.5, unit: "°C", timestamp: "..." },
    { id: "HUM-001", type: "humidity", value: 45, unit: "%", timestamp: "..." }
  ],
  aggregations: {
    avg_temperature: 21.8,
    max_humidity: 52
  }
}

// schema_type: "esg_report"
{
  emissions: { scope1: 1250, scope2: 890 },
  energy: { renewable_percent: 72.5, total_kwh: 1500000 },
  certifications: ["ISO 14001", "Pontus-X Verified"]
}
```

#### Receta de Datos

```sql
-- Supplier data para transacciones completadas
INSERT INTO supplier_data (transaction_id, company_name, legal_name, tax_id, fiscal_address, contact_person_name, contact_person_email) VALUES
('{completed_tx_1}', 'Titan Manufacturas S.L.', 'TITAN MANUFACTURAS SOCIEDAD LIMITADA', 'B12345678', 
 '{"street":"Calle Industrial 45","city":"Barcelona","postal_code":"08019","country":"ES"}',
 'Carlos Ruiz', 'cruiz@titanmanufacturas.es'),
-- ...

-- Data payloads con contenido variado
INSERT INTO data_payloads (transaction_id, schema_type, data_content) VALUES
('{tx_id}', 'iot_telemetry', '{"sensors":[{"id":"TEMP-001","value":22.5}]}'::jsonb),
('{tx_id_2}', 'esg_report', '{"emissions":{"scope1":1250,"scope2":890}}'::jsonb);
```

---

### 3.7 Innovation Lab (`/innovation`)

**Layout:** Tabs (Concepts, Simulator, Insights) + Grid ConceptCards con charts dinámicos

#### Componentes y Contratos de Datos

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `ConceptCard` | Objeto `innovation_lab_concepts` | `innovation_lab_concepts` |
| `InnovationChart` | `{ chartType, chartData, chartConfig }` | Campo JSONB |
| `ConceptDetailModal` | Concepto completo + `full_analysis` | `innovation_lab_concepts` |
| Maturity Badge | `maturity_level: 1-5` | Campo de tabla |

**Estructura de `innovation_lab_concepts`:**
```json
{
  "id": "uuid",
  "title": "Predicción de Demanda con IA",
  "short_description": "Algoritmo ML para optimización de cadena de suministro",
  "full_analysis": "## Análisis Completo\n\n### Contexto\nLa predicción de demanda...\n\n### Metodología\n...",
  "category": "AI",
  "business_impact": "Reducción del 15% en costes de inventario y mejora del 20% en nivel de servicio",
  "maturity_level": 3,
  "chart_type": "area",
  "chart_data": [
    { "name": "Ene", "actual": 100, "predicted": 98 },
    { "name": "Feb", "actual": 120, "predicted": 118 },
    { "name": "Mar", "actual": 115, "predicted": 122 },
    { "name": "Abr", "actual": 140, "predicted": 138 },
    { "name": "May", "actual": 160, "predicted": 155 },
    { "name": "Jun", "actual": 155, "predicted": 162 }
  ],

### 3.7.1 Widgets Inline del Innovation Lab

Los siguientes widgets están implementados **inline** en `InnovationLab.tsx` (no en tabla de DB):

| Widget | Tab | Datos | Descripción |
|--------|-----|-------|-------------|
| **Radar de Madurez Tecnológica** | Insights | `TECH_RADAR_DATA` hardcoded | RadarChart comparando tu empresa vs líder del sector |
| **Matriz de Priorización** | Insights | Generado de `concepts` | ScatterChart Esfuerzo (X) vs Impacto (Y) |
| **Smart Contract Simulator** | Insights | `CONTRACT_STEPS` hardcoded | 4 pasos animados de ejecución de contrato |
| **Contract Sentinel** | Insights | `DETECTED_ALERTS` hardcoded | Escáner de cláusulas con alertas de riesgo |

**Estructura de Datos Inline (InnovationLab.tsx):**

```typescript
// Radar de Madurez Tecnológica (líneas 117-129)
const TECH_RADAR_DATA = [
  { subject: "IA Adoption", company: 78, leader: 95, fullMark: 100 },
  { subject: "Blockchain Readiness", company: 45, leader: 88, fullMark: 100 },
  { subject: "IoT Integration", company: 62, leader: 75, fullMark: 100 },
  { subject: "ESG Compliance", company: 85, leader: 92, fullMark: 100 },
  { subject: "Data Governance", company: 70, leader: 98, fullMark: 100 },
];

// Smart Contract Simulator (líneas 133-166)
const CONTRACT_STEPS = [
  { id: 1, title: "Firma de Acuerdo", description: "Ambas partes...", timestamp: "T+0ms", icon: FileSignature },
  { id: 2, title: "Validación Oráculo", description: "El oráculo blockchain...", timestamp: "T+2.3s", icon: Search },
  { id: 3, title: "Trigger Activado", description: "Se activa la cláusula...", timestamp: "T+3.1s", icon: Zap },
  { id: 4, title: "Liquidación de Pagos", description: "El pago se ejecuta...", timestamp: "T+4.5s", icon: BadgeCheck },
];

// Contract Sentinel (líneas 168-208)
const DETECTED_ALERTS = [
  { type: 'warning', clause: 'Cláusula 4.2', message: 'Penalización excesiva...', severity: 'medium' },
  { type: 'info', clause: 'Cláusula 7.1', message: 'Período de preaviso...', severity: 'low' },
  { type: 'error', clause: 'Cláusula 9', message: 'Limitación de responsabilidad...', severity: 'high' },
];

// Matriz de Priorización (líneas 267-276, generada dinámicamente)
const priorityMatrix = useMemo(() => {
  return concepts?.slice(0, 6).map((c, i) => ({
    name: c.title,
    effort: (c.maturity_level || 3) * 20 + Math.random() * 20,
    impact: (5 - (c.maturity_level || 3)) * 20 + 20 + Math.random() * 20,
    category: c.category,
  }));
}, [concepts]);
```

**Simulador de Demanda (Tab "Simulator"):**

```typescript
// 3 sliders interactivos (líneas 431-487)
const [scenario, setScenario] = useState({
  marketGrowth: 5,      // -10% a +20%
  seasonality: 50,      // 0-100
  disruption: 0,        // 0-100
});

// Genera predicción dinámica basada en sliders
const demandForecast = useMemo(() => {
  const baseValues = [100, 110, 105, 120, 115, 130, 125, 140, 135, 150, 145, 160];
  return baseValues.map((base, i) => {
    let value = base * (1 + scenario.marketGrowth / 100);
    value *= (1 + (Math.sin(i * Math.PI / 6) * scenario.seasonality / 200));
    if (scenario.disruption > 0 && i > 5) value *= (1 - scenario.disruption / 200);
    return { month: MONTHS[i], baseline: base, predicted: Math.round(value) };
  });
}, [scenario]);
```
  "chart_config": {
    "dataKeys": ["actual", "predicted"],
    "colors": ["#3b82f6", "#10b981"],
    "xAxisKey": "name"
  }
}
```

**Categorías de Conceptos:**
- `AI` - Machine Learning, NLP, Computer Vision
- `Blockchain` - Smart contracts, Tokenization, DeFi
- `IoT` - Sensores, Edge computing, Digital twins
- `Sustainability` - Carbon tracking, Circular economy

#### Receta de Datos

```sql
INSERT INTO innovation_lab_concepts (title, category, short_description, full_analysis, business_impact, maturity_level, chart_type, chart_data, chart_config) VALUES

-- AI (3)
('Predicción de Demanda con IA', 'AI', 'ML para cadena de suministro', 
 '## Análisis\n\nEste concepto utiliza redes neuronales LSTM para predecir la demanda con un horizonte de 12 meses...',
 'Reducción 15% costes inventario', 3, 'area',
 '[{"name":"Ene","actual":100,"predicted":98},{"name":"Feb","actual":120,"predicted":118},{"name":"Mar","actual":115,"predicted":122},{"name":"Abr","actual":140,"predicted":138}]',
 '{"dataKeys":["actual","predicted"],"colors":["#3b82f6","#10b981"]}'
),

('Clasificación Automática de Documentos', 'AI', 'NLP para procesamiento de facturas y albaranes',
 '## Análisis\n\nSistema de OCR + NLP para extraer datos estructurados de documentos escaneados...',
 'Ahorro 80% tiempo administrativo', 4, 'bar',
 '[{"name":"Manual","time":120},{"name":"OCR Básico","time":45},{"name":"NLP Avanzado","time":8}]',
 '{"dataKeys":["time"],"colors":["#f59e0b"]}'
),

('Detección de Anomalías en Transacciones', 'AI', 'ML para prevención de fraude',
 '## Análisis\n\nModelo de detección de outliers usando Isolation Forest...',
 'Reducción 90% fraude', 2, 'pie',
 '[{"name":"Normal","value":95},{"name":"Sospechoso","value":4},{"name":"Fraude","value":1}]',
 '{"dataKey":"value"}'
),

-- Blockchain (3)
('Tokenización de Activos de Datos', 'Blockchain', 'NFTs para licencias de datos',
 '## Análisis\n\nRepresentación de licencias de acceso a datos como tokens ERC-721...',
 'Mercado secundario de licencias', 2, 'area',
 '[{"name":"Q1","licenses":50},{"name":"Q2","licenses":120},{"name":"Q3","licenses":280},{"name":"Q4","licenses":450}]',
 '{"dataKeys":["licenses"],"colors":["#8b5cf6"]}'
),

('Smart Contracts para Pagos Automáticos', 'Blockchain', 'Escrow descentralizado',
 '## Análisis\n\nContratos inteligentes que liberan pagos automáticamente al completar transacciones...',
 'Eliminación intermediarios', 3, 'bar',
 '[{"name":"Tradicional","days":15},{"name":"Smart Contract","days":0.1}]',
 '{"dataKeys":["days"],"colors":["#06b6d4"]}'
),

('Trazabilidad en Cadena de Bloques', 'Blockchain', 'Registro inmutable de proveniencia',
 '## Análisis\n\nCada paso de la cadena de suministro registrado en blockchain...',
 'Confianza total en origen', 4, 'area',
 '[{"name":"Origen","verified":100},{"name":"Transporte","verified":100},{"name":"Almacén","verified":98},{"name":"Destino","verified":98}]',
 '{"dataKeys":["verified"],"colors":["#22c55e"]}'
),

-- IoT (2)
('Digital Twin de Planta Industrial', 'IoT', 'Réplica virtual para simulación',
 '## Análisis\n\nModelo 3D conectado a sensores reales para simulación de escenarios...',
 'Reducción 30% paradas no planificadas', 2, 'area',
 '[{"hour":"00:00","efficiency":92},{"hour":"06:00","efficiency":95},{"hour":"12:00","efficiency":88},{"hour":"18:00","efficiency":91}]',
 '{"dataKeys":["efficiency"],"colors":["#f97316"]}'
),

('Mantenimiento Predictivo', 'IoT', 'Sensores + ML para anticipar fallos',
 '## Análisis\n\nCombinación de datos de vibración, temperatura y consumo eléctrico...',
 'Extensión 40% vida útil equipos', 3, 'bar',
 '[{"name":"Reactivo","cost":100},{"name":"Preventivo","cost":60},{"name":"Predictivo","cost":25}]',
 '{"dataKeys":["cost"],"colors":["#ef4444"]}'
),

-- Sustainability (2)
('Carbon Credit Marketplace', 'Sustainability', 'Trading de créditos de carbono',
 '## Análisis\n\nPlataforma para compra-venta de créditos de carbono verificados...',
 'Monetización de reducción de emisiones', 1, 'area',
 '[{"month":"Ene","credits":1000},{"month":"Feb","credits":1200},{"month":"Mar","credits":1800},{"month":"Abr","credits":2500}]',
 '{"dataKeys":["credits"],"colors":["#22c55e"]}'
),

('Economía Circular Tracker', 'Sustainability', 'Seguimiento de materiales reciclados',
 '## Análisis\n\nTrazabilidad de materiales desde residuo hasta nuevo producto...',
 'Cumplimiento directivas UE 2030', 2, 'pie',
 '[{"name":"Reciclado","value":35},{"name":"Reutilizado","value":25},{"name":"Virgen","value":40}]',
 '{"dataKey":"value"}'
);
```

---

### 3.8 Reports (`/reports`)

**Layout:** 4 KPI cards + AreaChart mensual + PieChart estados + BarChart top productos + Tabla exportable

#### Componentes y Contratos de Datos

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| KPI (Gasto Total) | `sum(price)` de transacciones salientes | `data_transactions` + `data_assets` |
| KPI (Ingreso Total) | `sum(price)` de transacciones entrantes | `data_transactions` + `data_assets` |
| AreaChart Tendencias | `Array<{ month: string, gasto: number, ingreso: number }>` | Agregado mensual |
| PieChart Estados | `Array<{ name: status, value: count }>` | COUNT GROUP BY status |
| BarChart Top Productos | `Array<{ name: string, count: number, revenue: number }>` | Agregado por producto |

#### Receta de Datos

Los datos vienen de las transacciones existentes. Asegurar:
- Mínimo 6 meses de histórico
- Variación en precios (0 - 500 EUR)
- Distribución realista de estados

---

### 3.9 Opportunities (`/opportunities`)

**Layout:** Hero + Grid 3 columnas OpportunityCards

#### Componentes y Contratos de Datos

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `OpportunityCard` | Objeto `marketplace_opportunities` | `marketplace_opportunities` |
| Deadline Progress | Calculado de `expires_at - now()` | Campos de tabla |
| Category Badge | `category` string | Campo de tabla |

**Estructura de `marketplace_opportunities`:**
```json
{
  "id": "uuid",
  "consumer_org_id": "uuid",
  "title": "Necesitamos datos de telemetría IoT para flota de vehículos",
  "description": "Buscamos proveedor que pueda suministrar datos GPS y consumo de combustible de flotas comerciales para análisis de eficiencia logística.",
  "category": "Movilidad Sostenible",
  "budget_range": "2,000 - 5,000 EUR",
  "status": "active",
  "expires_at": "2026-02-15T23:59:59Z",
  "created_at": "2026-01-05T10:00:00Z"
}
```

#### Receta de Datos

```sql
INSERT INTO marketplace_opportunities (consumer_org_id, title, description, category, budget_range, status, expires_at) VALUES
-- Industrial (5)
('{consumer_id}', 'Datos de capacidad productiva sector automoción', 
 'Necesitamos información sobre capacidad disponible de proveedores Tier 2 del sector automoción para planificación de aprovisionamiento Q2 2026.',
 'Industrial', '5,000 - 10,000 EUR', 'active', NOW() + INTERVAL '25 days'),

('{consumer_id}', 'Certificaciones ISO de proveedores metalúrgicos',
 'Buscamos base de datos actualizada de proveedores metalúrgicos con certificación ISO 9001 e ISO 14001 vigente.',
 'Industrial', '1,000 - 3,000 EUR', 'active', NOW() + INTERVAL '15 days'),

-- Comercio (2)
('{consumer_id}', 'Histórico de ventas retail alimentación',
 'Datos agregados de ventas en canal retail para análisis de tendencias de consumo.',
 'Comercio', '3,000 - 5,000 EUR', 'active', NOW() + INTERVAL '20 days'),

-- Agroalimentario (2)
('{consumer_id}', 'Trazabilidad de productos ecológicos',
 'Información de cadena de custodia de productos con certificación ecológica.',
 'Agroalimentario', '2,000 - 4,000 EUR', 'active', NOW() + INTERVAL '30 days'),

-- Movilidad (1)
('{consumer_id}', 'Telemetría flotas de reparto urbano',
 'Datos GPS y consumo de última milla para optimización de rutas.',
 'Movilidad Sostenible', '2,000 - 5,000 EUR', 'active', NOW() + INTERVAL '18 days'),

-- Salud (1)
('{consumer_id}', 'Homologación proveedores sanitarios',
 'Validación de proveedores con licencia de actividad sanitaria.',
 'Salud', '500 - 1,500 EUR', 'active', NOW() + INTERVAL '12 days'),

-- Economía Social (1)
('{consumer_id}', 'Impacto social de empresas de inserción',
 'Métricas de impacto social verificadas de centros especiales de empleo.',
 'Economía Social', '1,000 - 2,000 EUR', 'active', NOW() + INTERVAL '22 days');
```

---

## 4. Estrategia de Generación (Para Gemini)

### 4.1 Orden de Ejecución

1. **Fase 1: Organizaciones Base** (prerequisito para todo)
   - 8-10 organizaciones demo cubriendo los 3 tipos
   - Distribución por sector según `OFFICIAL_SECTORS`

2. **Fase 2: Productos y Assets**
   - 15 productos template
   - 20+ assets listados con precios variados

3. **Fase 3: Transacciones Históricas**
   - 50+ transacciones (6 meses)
   - Distribución de estados realista

4. **Fase 4: Datos Financieros**
   - Wallets con saldo >10k
   - 30+ wallet_transactions

5. **Fase 5: ESG Reports**
   - 2-3 años por organización
   - Tendencia de mejora

6. **Fase 6: Servicios de Valor**
   - 12 servicios (según lista arriba)
   - Features y documentación

7. **Fase 7: Innovation Concepts**
   - 10 conceptos con charts
   - 4 categorías

8. **Fase 8: Opportunities**
   - 10-12 oportunidades activas

9. **Fase 9: Supplier Data y Payloads**
   - Datos para transacciones completed

### 4.2 Validaciones Críticas

```sql
-- Verificar integridad referencial antes de INSERT
SELECT COUNT(*) FROM organizations WHERE type = 'provider';  -- Debe haber al menos 5
SELECT COUNT(*) FROM organizations WHERE type = 'consumer';  -- Debe haber al menos 3
SELECT COUNT(*) FROM organizations WHERE type = 'data_holder';  -- Debe haber al menos 2

-- Verificar distribución de transacciones
SELECT status, COUNT(*), ROUND(COUNT(*)::decimal / SUM(COUNT(*)) OVER() * 100, 1) as pct
FROM data_transactions GROUP BY status;
```

### 4.3 IDs de Referencia

> **IMPORTANTE**: Antes de generar SQL, ejecutar:
```sql
SELECT id, name, type FROM organizations WHERE is_demo = true;
```
> Para obtener los UUIDs reales y usarlos en los INSERT.

---

## 5. Apéndice: Mapeo de Iconos

```typescript
// Para SectorIcon.tsx y ServiceCard
const ICON_MAP = {
  // Sectores
  industrial: Factory,
  comercio: ShoppingBag,
  agroalimentario: Wheat,
  movilidad_sostenible: Truck,
  salud: Heart,
  economia_social: Users,
  
  // Servicios
  ShieldCheck: ShieldCheck,
  Search: Search,
  FileCheck: FileCheck,
  Leaf: Leaf,
  FileText: FileText,
  Award: Award,
  Banknote: Banknote,
  Brain: Brain,
  Plug: Plug,
  // ...
};
```

---

## 6. Notas de Compatibilidad del Esquema

### 6.1 Diferencias con Scripts Externos

Los scripts SQL generados externamente pueden tener incompatibilidades con el esquema real de Supabase. Esta tabla documenta las correcciones necesarias:

| Error Común | Valor Incorrecto | Valor Correcto |
|-------------|------------------|----------------|
| `organizations.type` | `'service_provider'` | `'data_holder'` (para bancos, ERPs, etc.) |
| `wallets` columna | `wallet_address` | `address` |
| `data_transactions` columna | `price` | N/A (precio está en `data_assets.price`) |
| `data_transactions` columna | `completed_at` | N/A (no existe, usar `updated_at`) |
| `esg_reports` columna | `scope3_total_tons` | N/A (solo `scope1_total_tons`, `scope2_total_tons`) |
| `data_transactions.status` | `'pending_payment'` | `'pending_holder'` |
| `value_services` columna | `price_model` | `price_model` (verificar que exista) |

### 6.2 Campos Obligatorios en `data_transactions`

```sql
-- Estos campos son NOT NULL y DEBEN incluirse:
INSERT INTO data_transactions (
  asset_id,           -- UUID del activo
  consumer_org_id,    -- UUID de quien solicita
  subject_org_id,     -- UUID del proveedor (dueño de datos)
  holder_org_id,      -- UUID de quien custodia los datos
  purpose,            -- VARCHAR: Propósito de la solicitud
  justification,      -- TEXT: Justificación detallada
  access_duration_days, -- INT: Días de acceso solicitados
  requested_by,       -- UUID: auth.users.id del solicitante
  status              -- ENUM: usar valor válido
) VALUES (...);
```

### 6.3 Scripts de Semilla Corregidos

Ubicación: `scripts/seeds/`

| Archivo | Contenido | Orden de Ejecución |
|---------|-----------|-------------------|
| `01_extend_orgs.sql` | Organizaciones adicionales de la Memoria Técnica | 1º |
| `02_extend_wallets.sql` | Wallets con columna `address` correcta | 2º |
| `03_products_assets.sql` | Productos y activos del catálogo | 3º |
| `04_transactions.sql` | Transacciones con todos los campos obligatorios | 4º |
| `05_esg_services.sql` | ESG, servicios de valor, oportunidades e innovación | 5º |

### 6.4 Instrucciones de Ejecución

```bash
# Opción 1: Ejecución manual en SQL Editor de Cloud AI
# Copiar y pegar cada archivo en orden

# Opción 2: Usando psql (si tienes acceso CLI)
psql $DATABASE_URL -f scripts/seeds/01_extend_orgs.sql
psql $DATABASE_URL -f scripts/seeds/02_extend_wallets.sql
psql $DATABASE_URL -f scripts/seeds/03_products_assets.sql
psql $DATABASE_URL -f scripts/seeds/04_transactions.sql
psql $DATABASE_URL -f scripts/seeds/05_esg_services.sql
```

> **IMPORTANTE**: Ejecutar siempre en orden numérico para respetar las dependencias de foreign keys.

---

*Documento generado automáticamente por análisis de código fuente.*
*Última actualización: 2026-01-06*
