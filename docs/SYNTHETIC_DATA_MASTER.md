# PROCUREDATA: Catálogo Maestro de Datos Sintéticos

> **Documento Único de Referencia para Generación de Demos**  
> Versión: 2.0 | Fecha: 2026-01-10  
> Propósito: Fuente única de verdad para datos sintéticos, arquitectura y generación de demos realistas  
> Consolidación de: `synthetic_data.md` + `synthetic_opportunities.md`

---

## Índice

1. [Constantes Oficiales](#1-constantes-oficiales)
2. [Arquitectura de Datos](#2-arquitectura-de-datos)
3. [Organizaciones Demo](#3-organizaciones-demo)
4. [Productos de Datos](#4-productos-de-datos)
5. [Servicios de Valor Añadido](#5-servicios-de-valor-añadido)
6. [Oportunidades de Mercado](#6-oportunidades-de-mercado)
7. [Análisis por Página (UI ↔ DB)](#7-análisis-por-página-ui--db)
8. [Scripts de Semilla](#8-scripts-de-semilla)
9. [Dataset Técnico Ejemplo](#9-dataset-técnico-ejemplo)
10. [Instrucciones para IA/Gemini](#10-instrucciones-para-iagemini)
11. [Validaciones y Notas](#11-validaciones-y-notas)
12. [Widgets Interactivos](#12-widgets-interactivos)

---

## 1. Constantes Oficiales

### 1.1 OFFICIAL_SECTORS

```typescript
// src/lib/constants.ts
export const OFFICIAL_SECTORS = [
  { id: "industrial", label: "Industrial", priority: 1, targetShare: 51, icon: "Factory" },
  { id: "comercio", label: "Comercio", priority: 2, targetShare: 15, icon: "ShoppingBag" },
  { id: "agroalimentario", label: "Agroalimentario", priority: 3, targetShare: 12, icon: "Wheat" },
  { id: "movilidad_sostenible", label: "Movilidad Sostenible", priority: 4, targetShare: 10, icon: "Truck" },
  { id: "salud", label: "Salud", priority: 5, targetShare: 7, icon: "Heart" },
  { id: "economia_social", label: "Economía Social", priority: 6, targetShare: 5, icon: "Users" }
];
```

### 1.2 OFFICIAL_PRICING

```typescript
export const OFFICIAL_PRICING = {
  transactionFee: 1.00,           // EUROe por alta de proveedor
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

### 1.3 EUROPEAN_STACK

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

## 2. Arquitectura de Datos

### 2.1 Tablas Críticas (29 tablas + 1 vista)

| Tabla | Propósito | Campos Obligatorios | Notas |
|-------|-----------|---------------------|-------|
| `organizations` | Entidades del ecosistema | `id`, `name`, `type`, `tax_id` | `type`: consumer, provider, data_holder |
| `user_profiles` | Usuarios asociados a orgs | `user_id`, `organization_id` | FK a auth.users |
| `user_roles` | Permisos RBAC | `user_id`, `organization_id`, `role` | `role`: admin, approver, viewer, api_configurator |
| `data_products` | Definición de productos | `id`, `name`, `version` | Templates de datos |
| `data_assets` | Activos listados en marketplace | `id`, `product_id`, `subject_org_id`, `holder_org_id`, `status` | `status`: available, reserved |
| `data_transactions` | Flujo de solicitudes | `id`, `asset_id`, `consumer_org_id`, `status` | Ver enum `transaction_status` |
| `approval_history` | Historial de aprobaciones | `id`, `transaction_id`, `action` | Tracking de workflow |
| `data_payloads` | Contenido de datos intercambiados | `id`, `transaction_id`, `schema_type`, `data_content` | JSONB |
| `data_policies` | Políticas ODRL | `id`, `transaction_id`, `odrl_policy_json` | Gobernanza |
| `wallets` | Saldos por organización | `id`, `organization_id`, `balance`, `address` | 1:1 con organization |
| `wallet_transactions` | Movimientos financieros | `id`, `amount`, `from_wallet_id` o `to_wallet_id` | Auditables |
| `esg_reports` | Datos de sostenibilidad | `id`, `organization_id`, `report_year` | Scope 1, 2, certificaciones |
| `value_services` | Servicios del marketplace | `id`, `name`, `category`, `price` | Incluye `features` JSONB |
| `marketplace_opportunities` | Demandas de datos | `id`, `consumer_org_id`, `title`, `status` | `status`: active, closed |
| `innovation_lab_concepts` | Conceptos I+D | `id`, `title`, `chart_type`, `chart_data` | Charts dinámicos |
| `supplier_data` | Pasaporte de proveedor | `id`, `transaction_id`, `company_name`, `tax_id` | Datos validados |
| `organization_reviews` | Reseñas y ratings | `id`, `transaction_id`, `rating` | 1-5 estrellas |
| `catalog_metadata` | Metadatos de catálogo | `id`, `asset_id`, `tags`, `categories` | Visibilidad |
| `erp_configurations` | Configuraciones ERP | `id`, `organization_id`, `config_type` | Conectores |
| `export_logs` | Logs de exportación | `id`, `transaction_id`, `export_type` | Auditoría |
| `notifications` | Notificaciones | `id`, `user_id`, `title`, `type` | Sistema de alertas |
| `privacy_preferences` | Preferencias de privacidad | `id`, `user_id` | GDPR |
| `success_stories` | Casos de éxito | `id`, `company_name`, `sector` | Marketing |
| `audit_logs` | Logs de auditoría | `id`, `organization_id`, `action` | Compliance |
| `login_attempts` | Intentos de login | `id`, `email`, `success` | Seguridad |
| `webhooks` | Configuración webhooks | `id`, `organization_id`, `url`, `events` | Integraciones |
| `ai_feedback` | Feedback de ARIA | `id`, `user_question`, `bot_response` | Mejora continua |
| `transaction_messages` | Mensajes de negociación | `id`, `transaction_id`, `content` | Chat |
| `user_wishlist` | Lista de deseos | `id`, `user_id`, `asset_id` | Favoritos |
| **Vista** `marketplace_listings` | Vista consolidada marketplace | Combina assets + products + orgs | Optimizada para UI |

### 2.2 Enums del Sistema

```sql
-- transaction_status
'initiated' | 'pending_subject' | 'pending_holder' | 'approved' | 
'denied_subject' | 'denied_holder' | 'completed' | 'cancelled'

-- organization_type
'consumer' | 'provider' | 'data_holder'

-- app_role
'admin' | 'approver' | 'viewer' | 'api_configurator'

-- approval_action
'pre_approve' | 'approve' | 'deny' | 'cancel'

-- auth_method
'bearer' | 'api_key' | 'oauth' | 'basic'

-- erp_config_type
'download' | 'upload'
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
user_profiles.organization_id      → organizations.id
user_roles.organization_id         → organizations.id
approval_history.transaction_id    → data_transactions.id
catalog_metadata.asset_id          → data_assets.id
```

### 2.4 Funciones SQL Disponibles

| Función | Parámetros | Retorno | Uso |
|---------|------------|---------|-----|
| `get_user_organization` | `_user_id: UUID` | `UUID` | Obtener org del usuario |
| `has_role` | `_user_id, _organization_id, _role` | `BOOLEAN` | Verificar permisos |
| `get_org_kpis` | `target_org_id: UUID` | `JSONB` | KPIs: approval_rate, avg_time, compliance |
| `get_pending_transactions` | `_user_id: UUID` | `TABLE` | Transacciones pendientes |
| `cleanup_old_login_attempts` | - | `void` | Limpieza de logs |

---

## 3. Organizaciones Demo

### 3.1 Organizaciones Actuales en BD

| ID | Nombre | Tipo | Sector | KYB |
|----|--------|------|--------|-----|
| `22222222-0000-...01` | GreenMetrics AI | provider | Tecnología | ✅ |
| `22222222-0000-...02` | DataShield Compliance | provider | Legal | ✅ |
| `22222222-0000-...03` | ChainForge Labs | provider | Blockchain | ✅ |
| `22222222-0000-...04` | PROCUREDATA Core | provider | Tecnología | ✅ |
| `11111111-2222-...01` | Retail Giant Corp | consumer | retail | ✅ |
| `11111111-2222-...02` | Green Finance Bank | consumer | finance | ✅ |
| `11111111-2222-...03` | Logistics AI Solutions | consumer | logistics | ❌ |
| `11111111-2222-...04` | EcoTech Industrial | consumer | manufacturing | ✅ |
| `11111111-2222-...05` | AgriData Consulting | consumer | agrifood | ✅ |

### 3.2 Organizaciones Adicionales (Seed Scripts)

| ID | Nombre | Tipo | Sector | Descripción |
|----|--------|------|--------|-------------|
| `aaaaaaaa-0001-...01` | Titan Manufacturas S.A. | provider | Industrial | Fabricante líder de componentes industriales |
| `aaaaaaaa-0001-...02` | Iberia Industrial Supplies | provider | Industrial | Distribuidor mayorista de suministros |
| `aaaaaaaa-0001-...03` | EcoVolt Generación | provider | Energía | Generación de energía renovable |
| `aaaaaaaa-0002-...01` | Constructora Horizonte | consumer | Construcción | Constructora sostenible |
| `aaaaaaaa-0002-...02` | Global Retail Group | consumer | Comercio | Grupo de distribución minorista |
| `aaaaaaaa-0002-...03` | EcoMotion Flotas | consumer | Movilidad Sostenible | Gestión de flotas eléctricas |
| `aaaaaaaa-0003-...01` | AgroBio Foods Koop | provider | Agroalimentario | Cooperativa ecológica |
| `aaaaaaaa-0003-...02` | PharmaCare Labs | provider | Salud | Laboratorio farmacéutico |
| `aaaaaaaa-0004-...01` | Capital Trade Bank | data_holder | Financiero | Trade finance B2B |
| `aaaaaaaa-0004-...02` | TechSolutions ERP | data_holder | Tecnológico | Proveedor ERP |

### 3.3 Distribución por Tipo

| Tipo | Cantidad | Rol en Transacciones |
|------|----------|---------------------|
| `consumer` | 8 | Solicitan datos |
| `provider` | 8 | Proveen/venden datos |
| `data_holder` | 3 | Custodian datos de terceros |

---

## 4. Productos de Datos

### 4.1 Catálogo Actual (23+ productos)

| Producto | Categoría | Versión | Descripción |
|----------|-----------|---------|-------------|
| Ficha Técnica Proveedor Certificada | Compliance | v2.0 | Datos maestros completos del proveedor |
| Pack Certificaciones ISO Completo | Compliance | v1.5 | ISO 9001, 14001, 45001 |
| Telemetría IoT Maquinaria Industrial | Industrial | v2.0 | Datos de sensores en tiempo real |
| ESG Corporate Report | ESG | v1.0 | Scope 1, 2, 3 + certificaciones |
| Historial de Pedidos B2B | Industrial | v1.0 | Registro de transacciones comerciales |
| Scoring Crediticio Empresarial | Financial | v1.5 | Z-Score, ratios, alertas |
| Capacidad Productiva Trimestral | Industrial | v1.0 | Métricas de producción |
| Trazabilidad Cadena de Suministro | Supply Chain | v2.0 | Origen a destino |
| Certificados CBAM | ESG | v1.0 | Huella de carbono importadores |
| Digital Twin Dataset | IoT | v1.0 | Parámetros operativos |
| Predicción Demanda AI | AI/ML | v1.5 | Dataset para forecasting |
| Pasaporte Producto Digital | Compliance | v1.0 | DPP según normativa EU |
| Datos Sanitarios Anonimizados | Salud | v1.0 | GDPR compliant |
| Métricas Impacto Social | ESG | v1.0 | SROI, inserción laboral |

### 4.2 Categorías de Productos

| Categoría | Descripción | Ejemplos |
|-----------|-------------|----------|
| Compliance | Datos regulatorios y certificaciones | ISO, KYB, Due Diligence |
| ESG | Métricas de sostenibilidad | Scope 1-3, renovables, CSRD |
| Industrial | Datos de producción y operaciones | Telemetría, capacidad, calidad |
| IoT | Datos de sensores y telemetría | Temperatura, vibración, consumo |
| Financial | Scoring y datos financieros | Crediticio, pagos, riesgo |
| Supply Chain | Trazabilidad y logística | Origen, transporte, stock |
| AI/ML | Datasets para entrenamiento | Históricos, predicción |
| Salud | Datos sanitarios regulados | Ensayos, dispositivos, licencias |

### 4.3 Modelos de Precio

| Modelo | Descripción | Ejemplo |
|--------|-------------|---------|
| `one_time` | Pago único | Ficha técnica: 150€ |
| `subscription` | Suscripción periódica | Telemetría IoT: 200€/mes |
| `usage` | Pago por uso | Validación VIES: 0.50€/consulta |
| `free` | Gratuito (freemium) | Carbon Calculator |

---

## 5. Servicios de Valor Añadido

### 5.1 Catálogo de Servicios (21 servicios)

| Servicio | Categoría | Precio | Modelo | Widget |
|----------|-----------|--------|--------|--------|
| Homologación Flash | Compliance | 150€ | one_time | ProcessFlow |
| Auditoría Digital ISO | Compliance | 300€ | one_time | ProcessFlow |
| Due Diligence Express | Compliance | 300€ | one_time | ProcessFlow |
| Auditoría CSRD | Compliance | 500€ | one_time | ProcessFlow |
| Trade Finance Scoring | Financiación | 200€ | one_time | RoiCalculator |
| Invoice Factoring Connect | Financiación | 50€ | one_time | RoiCalculator |
| Predicción Demanda AI | IA & Analytics | 300€ | subscription | CapabilityTree |
| Supplier Risk Monitor | IA & Analytics | 150€ | subscription | CapabilityTree |
| Price Intelligence | IA & Analytics | 100€ | subscription | CapabilityTree |
| Carbon Footprint Calculator | Sostenibilidad | 0€ | free | ImpactGauge |
| ESG Report Generator | Sostenibilidad | 200€ | one_time | ImpactGauge |
| Green Badge Certification | Sostenibilidad | 100€ | subscription | ImpactGauge |
| Carbon Tracker ISO 14064 | Sostenibilidad | 50€ | subscription | ImpactGauge |
| Pontus-X Notary Node | Blockchain | 10€ | subscription | ImpactGauge |
| Certificado Blockchain | Blockchain | 1€ | per_use | ImpactGauge |
| ERP Connector Pack | Data Ops | 200€ | one_time | ProcessFlow |
| Data Quality Validator | Data Ops | 0€ | free | ProcessFlow |
| Normalización JSON-LD | Data Quality | 0.10€ | per_use | ProcessFlow |
| Verificación Fiscal VIES | Compliance | 0.50€ | per_use | ProcessFlow |
| Monitor de Riesgo Proveedor | Risk | 5€ | subscription | CapabilityTree |
| API de Consulta ODRL | Governance | 0€ | included_pro | ProcessFlow |

### 5.2 Estructura de `value_services`

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
  "api_endpoint": "/api/v1/validate/supplier",
  "provider_org_id": "uuid | null"
}
```

---

## 6. Oportunidades de Mercado

### 6.1 Distribución por Sector

| Sector | Target Share | Oportunidades | % Real |
|--------|--------------|---------------|--------|
| Industrial | 51% | 16 | 53% |
| Comercio | 15% | 4 | 13% |
| Agroalimentario | 12% | 4 | 13% |
| Movilidad Sostenible | 10% | 3 | 10% |
| Salud | 7% | 2 | 7% |
| Economía Social | 5% | 1 | 3% |
| **TOTAL** | 100% | **30** | 100% |

### 6.2 Oportunidades por Categoría UI

| Categoría | Cantidad | Presupuesto Promedio |
|-----------|----------|---------------------|
| Industrial | 6 | 4,500 EUROe |
| ESG | 6 | 5,000 EUROe |
| IoT | 4 | 6,000 EUROe |
| AI | 3 | 6,500 EUROe |
| Blockchain | 3 | 7,000 EUROe |
| Retail | 2 | 4,000 EUROe |
| AgriFood | 2 | 3,500 EUROe |
| Pharma | 2 | 7,000 EUROe |
| Compliance | 1 | 3,000 EUROe |
| Fintech | 1 | 4,000 EUROe |
| Logistics | 1 | 3,000 EUROe |
| Energy | 1 | 7,500 EUROe |
| Aerospace | 1 | 4,500 EUROe |

### 6.3 Las 30 Oportunidades Detalladas

#### INDUSTRIAL (16 oportunidades)

| # | Título | Categoría | Presupuesto | Consumer |
|---|--------|-----------|-------------|----------|
| 1 | Ficha Técnica Proveedores Tier 2 Automoción | Industrial | 5,000-10,000 | EcoTech Industrial |
| 2 | Certificaciones ISO Sector Aeronáutico | Aerospace | 3,000-6,000 | EcoTech Industrial |
| 3 | Telemetría IoT Maquinaria CNC | IoT | 4,000-8,000 | Logistics AI Solutions |
| 4 | Capacidad Productiva Fundiciones España | Industrial | 2,000-4,000 | EcoTech Industrial |
| 5 | Histórico Pedidos Sector Plásticos | Industrial | 3,000-5,000 | Retail Giant Corp |
| 6 | Certificados CBAM Importadores Asia | ESG | 8,000-15,000 | Green Finance Bank |
| 7 | Homologación Proveedores MRO | Compliance | 2,000-4,000 | EcoTech Industrial |
| 8 | Consumo Energético Industrial por Planta | Energy | 5,000-10,000 | Green Finance Bank |
| 9 | Trazabilidad Materias Primas Críticas | Blockchain | 6,000-12,000 | EcoTech Industrial |
| 10 | Inventario Just-in-Time Componentes | Industrial | 3,000-6,000 | Logistics AI Solutions |
| 11 | Auditorías Sociales Proveedores Textiles | ESG | 4,000-7,000 | Retail Giant Corp |
| 12 | Métricas de Calidad Six Sigma | Industrial | 2,000-4,000 | EcoTech Industrial |
| 13 | Predicción de Demanda Sector Químico | AI | 6,000-10,000 | Logistics AI Solutions |
| 14 | Digital Twins Líneas de Producción | IoT | 8,000-15,000 | EcoTech Industrial |
| 15 | Scoring Crediticio Proveedores B2B | Fintech | 3,000-5,000 | Green Finance Bank |
| 16 | Datos de Mantenimiento Predictivo | AI | 5,000-8,000 | Logistics AI Solutions |

#### COMERCIO (4 oportunidades)

| # | Título | Categoría | Presupuesto | Consumer |
|---|--------|-----------|-------------|----------|
| 17 | Afluencia Peatonal Zonas Comerciales | Retail | 2,500-4,000 | Retail Giant Corp |
| 18 | Histórico Ventas E-commerce España | Retail | 4,000-7,000 | Retail Giant Corp |
| 19 | Auditorías Ética Cadena de Suministro Retail | ESG | 3,000-5,000 | Retail Giant Corp |
| 20 | Proveedores Logística Última Milla ZBE | Logistics | 2,000-4,000 | Logistics AI Solutions |

#### AGROALIMENTARIO (4 oportunidades)

| # | Título | Categoría | Presupuesto | Consumer |
|---|--------|-----------|-------------|----------|
| 21 | Trazabilidad Lotes Productos Ecológicos | AgriFood | 2,000-4,000 | AgriData Consulting |
| 22 | Certificados Sanitarios Importación | AgriFood | 3,000-5,000 | AgriData Consulting |
| 23 | Datos IoT Cadena de Frío | IoT | 4,000-7,000 | AgriData Consulting |
| 24 | Denominaciones de Origen Verificadas | Blockchain | 2,500-4,500 | AgriData Consulting |

#### MOVILIDAD SOSTENIBLE (3 oportunidades)

| # | Título | Categoría | Presupuesto | Consumer |
|---|--------|-----------|-------------|----------|
| 25 | Emisiones Scope 3 Flotas Logísticas | ESG | 5,000-8,000 | Green Finance Bank |
| 26 | Telemetría Flotas Vehículos Eléctricos | IoT | 4,000-7,000 | Logistics AI Solutions |
| 27 | Optimización Retornos Vacíos | AI | 3,000-6,000 | Logistics AI Solutions |

#### SALUD (2 oportunidades)

| # | Título | Categoría | Presupuesto | Consumer |
|---|--------|-----------|-------------|----------|
| 28 | Verificación Licencias Dispositivos Médicos | Pharma | 3,000-5,000 | Logistics AI Solutions |
| 29 | Datos Anonimizados Ensayos Clínicos | Pharma | 6,000-10,000 | Logistics AI Solutions |

#### ECONOMÍA SOCIAL (1 oportunidad)

| # | Título | Categoría | Presupuesto | Consumer |
|---|--------|-----------|-------------|----------|
| 30 | Métricas SROI Empresas de Inserción | ESG | 1,500-3,000 | Green Finance Bank |

### 6.4 Oportunidades Premium Adicionales

| # | Categoría | Título | Empresa | Presupuesto |
|---|-----------|--------|---------|-------------|
| 31 | AgriFood | Huella Hídrica Aceite de Oliva - Jaén | OliveTrust Coop | 4,500-7,500 |
| 32 | Logistics | Emisiones Scope 3 Flota Logística BCN | UrbanDeliver S.L. | 2,800-5,200 |
| 33 | Pharma | Logs Mantenimiento Resonancias Magnéticas | BioMed Hospital Group | 8,000-12,000 |
| 34 | Industrial | Histórico Fallos Brazos Robóticos CNC | GigaFactory North | 6,500-9,000 |
| 35 | ESG | Diversidad e Impacto Proveedores Locales | Alianza Social Hub | 1,800-3,500 |

### 6.5 Estructura de `marketplace_opportunities`

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

---

## 7. Análisis por Página (UI ↔ DB)

### 7.1 Dashboard (`/dashboard`)

**Layout:** Grid 2x2 KPIs + AreaChart (span 2) + ActivityFeed

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `SparklineCard` (Wallet) | `{ value: number, data: Array<{value}>, trend: number }` | `wallets.balance`, `wallet_transactions` |
| `ProgressCard` (Gastos) | `{ value: number, maxValue: number, trend: number }` | Calculado de `wallet_transactions` salientes |
| `MiniPieChart` (Status) | `Array<{ name: string, value: number, color: string }>` | `data_transactions` GROUP BY status |
| `HealthScoreGauge` | `{ dataQuality: 0-100, sustainability: 0-100, activity: 0-100 }` | Calculado multi-tabla |

**Cálculo de HealthScoreGauge:**
```typescript
dataQuality = (data_assets.count / 10) * 100  // Cap at 100
sustainability = esg_reports.energy_renewable_percent || 50
activity = (transactions_last_30d / 5) * 100  // Cap at 100
```

### 7.2 Catalog (`/catalog`)

**Layout:** Hero + Sidebar filtros + Grid 3 columnas ProductCards + Paginación

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `ProductCard` | `MarketplaceListing` | Vista `marketplace_listings` |
| `StarRating` | `{ rating: number, count: number }` | `organization_reviews` agregado |
| Badge Verificado | `kyb_verified: boolean` | `organizations.kyb_verified` |
| Badge Verde | `has_green_badge: boolean` | Calculado de ESG |

**Interface `MarketplaceListing`:**
```typescript
interface MarketplaceListing {
  asset_id: string;
  product_id: string;
  product_name: string;
  product_description: string;
  category: string;
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
  reputation_score: number;
  review_count: number;
}
```

### 7.3 Services (`/services`)

**Layout:** Hero + Tabs (categorías) + Grid 3 columnas ServiceCards

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `ServiceCard` | Objeto `value_services` completo | `value_services` |
| `ServiceFlowDiagram` | `{ category: string, serviceName: string }` | Generado dinámicamente |
| `ServiceMetrics` | `{ serviceName: string }` | Simulado |
| `ServicePopularityBadge` | `{ price: number, createdAt: Date }` | Calculado |
| `ServiceInteractiveWidget` | `{ category: string }` | Renderiza widget por categoría |

### 7.4 Requests (`/requests`)

**Layout:** 4 KPI cards + Tabs (Pendientes, Mis Solicitudes, Historial) + RequestsAnalyticsDashboard

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| KPI Cards | Conteos filtrados por status | `data_transactions` COUNT |
| `RequestsAnalyticsDashboard` | `Array<Transaction>` | `data_transactions` + joins |
| Transaction Row | Objeto completo con relaciones | `data_transactions` + assets + orgs |
| `NegotiationChat` | `{ transactionId, messages }` | `transaction_messages` |

**Estructura de Transaction:**
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
    product: { name: string; category: string; };
    price: number;
  };
  consumer_org: { id: string; name: string; };
  subject_org: { id: string; name: string; };
  holder_org: { id: string; name: string; };
}
```

### 7.5 Sustainability (`/sustainability`)

**Layout:** 4 EcoGauges (row) + 2 columnas (GrowthTree | SectorRanking) + AreaChart tendencias

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `EcoGauge` (Scope 1) | `{ value, maxValue: 5000, label: "Scope 1", unit: "tCO₂e" }` | `esg_reports.scope1_total_tons` |
| `EcoGauge` (Scope 2) | `{ value, maxValue: 5000 }` | `esg_reports.scope2_total_tons` |
| `EcoGauge` (Renovable) | `{ value, maxValue: 100, unit: "%" }` | `esg_reports.energy_renewable_percent` |
| `GrowthTree` | `{ level: 1-5, progress: 0-100, totalPoints, badges }` | Calculado ESG + certifications |
| `SectorRanking` | `{ position, totalCompanies, yourScore, sectorAverage, trend }` | Simulado vs otras orgs |

### 7.6 Innovation Lab (`/innovation`)

**Layout:** Tabs (Concepts, Simulator, Insights) + Grid ConceptCards con charts dinámicos

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `ConceptCard` | Objeto `innovation_lab_concepts` | `innovation_lab_concepts` |
| `InnovationChart` | `{ chartType, chartData, chartConfig }` | Campo JSONB |
| `ConceptDetailModal` | Concepto completo + `full_analysis` | `innovation_lab_concepts` |
| Radar de Madurez | `TECH_RADAR_DATA` | Hardcoded inline |
| Matriz Priorización | Generado de `concepts` | ScatterChart |
| Smart Contract Simulator | `CONTRACT_STEPS` | Hardcoded inline |

### 7.7 Data View (`/data`)

**Layout:** KPI cards + DataQualityDashboard + Grid de DatasetCards colapsables

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `DataQualityScore` | `{ completeness, accuracy, timeliness }` | Calculado |
| `HeartbeatIndicator` | `{ frequency }` | Basado en categoría |
| `FreshnessBar` | `{ lastUpdated, maxAgeDays }` | `transaction.updated_at` |
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
  "contact_person_name": "Carlos Ruiz",
  "contact_person_email": "cruiz@titanmanufacturas.es",
  "contact_person_phone": "+34 932 123 456",
  "data_source": "Registro Mercantil + Validación KYB"
}
```

**Estructura de `data_payloads` (según `schema_type`):**
```typescript
// schema_type: "supplier_data"
{ company_info: {...}, certifications: [...], financial_summary: {...} }

// schema_type: "iot_telemetry"
{
  sensors: [
    { id: "TEMP-001", type: "temperature", value: 22.5, unit: "°C", timestamp: "..." }
  ],
  aggregations: { avg_temperature: 21.8, max_humidity: 52 }
}

// schema_type: "esg_report"
{
  emissions: { scope1: 1250, scope2: 890 },
  energy: { renewable_percent: 72.5, total_kwh: 1500000 },
  certifications: ["ISO 14001", "Pontus-X Verified"]
}
```

### 7.8 Opportunities (`/opportunities`)

**Layout:** Hero + Grid 3 columnas OpportunityCards

| Componente | Input Requerido | Tabla Origen |
|------------|-----------------|--------------|
| `OpportunityCard` | Objeto `marketplace_opportunities` | `marketplace_opportunities` |
| Deadline Progress | Calculado de `expires_at - now()` | Campos de tabla |
| Category Badge | `category` string | Campo de tabla |

---

## 8. Scripts de Semilla

### 8.1 Orden de Ejecución

| # | Archivo | Contenido | Dependencias |
|---|---------|-----------|--------------|
| 1 | `01_extend_orgs.sql` | Organizaciones adicionales | Ninguna |
| 2 | `02_extend_wallets.sql` | Wallets con saldos | `organizations` |
| 3 | `03_products_assets.sql` | Productos y activos | `organizations` |
| 4 | `04_transactions.sql` | Transacciones históricas | `data_assets`, `organizations` |
| 5 | `05_esg_services.sql` | ESG, servicios, oportunidades, innovación | `organizations` |

### 8.2 Script 01: Organizaciones

```sql
-- ============================================================
-- FASE 1: ORGANIZACIONES ADICIONALES
-- Compatible con enum: 'consumer' | 'provider' | 'data_holder'
-- ============================================================

INSERT INTO organizations (id, name, type, sector, tax_id, kyb_verified, is_demo, description)
VALUES
  -- Industriales (Providers)
  ('aaaaaaaa-0001-0001-0001-000000000001', 'Titan Manufacturas S.A.', 'provider', 'Industrial', 'A-28000001', true, true, 'Fabricante líder de componentes industriales de precisión'),
  ('aaaaaaaa-0001-0001-0001-000000000002', 'Iberia Industrial Supplies', 'provider', 'Industrial', 'B-28000002', true, true, 'Distribuidor mayorista de suministros industriales'),
  ('aaaaaaaa-0001-0001-0001-000000000003', 'EcoVolt Generación', 'provider', 'Energía', 'A-28000003', true, true, 'Generación de energía renovable y soluciones de eficiencia'),
  
  -- Consumidores
  ('aaaaaaaa-0002-0002-0002-000000000001', 'Constructora Horizonte', 'consumer', 'Construcción', 'B-28000004', true, true, 'Constructora especializada en edificación sostenible'),
  ('aaaaaaaa-0002-0002-0002-000000000002', 'Global Retail Group', 'consumer', 'Comercio', 'A-08000001', true, true, 'Grupo líder en distribución minorista'),
  ('aaaaaaaa-0002-0002-0002-000000000003', 'EcoMotion Flotas', 'consumer', 'Movilidad Sostenible', 'B-46000001', true, true, 'Gestión de flotas eléctricas y movilidad verde'),
  
  -- Agroalimentario y Salud (Providers)
  ('aaaaaaaa-0003-0003-0003-000000000001', 'AgroBio Foods Koop', 'provider', 'Agroalimentario', 'F-20000001', true, true, 'Cooperativa de producción agroalimentaria ecológica'),
  ('aaaaaaaa-0003-0003-0003-000000000002', 'PharmaCare Labs', 'provider', 'Salud', 'A-33000001', true, true, 'Laboratorio farmacéutico especializado'),
  
  -- Data Holders (Servicios Financieros y Tecnológicos)
  ('aaaaaaaa-0004-0004-0004-000000000001', 'Capital Trade Bank', 'data_holder', 'Financiero', 'A-80000001', true, true, 'Entidad financiera especializada en trade finance B2B'),
  ('aaaaaaaa-0004-0004-0004-000000000002', 'TechSolutions ERP', 'data_holder', 'Tecnológico', 'B-50000001', true, true, 'Proveedor de soluciones ERP y digitalización empresarial')

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  kyb_verified = EXCLUDED.kyb_verified;
```

### 8.3 Script 02: Wallets

```sql
-- ============================================================
-- FASE 2: WALLETS PARA NUEVAS ORGANIZACIONES
-- Columna correcta: 'address' (no 'wallet_address')
-- ============================================================

INSERT INTO wallets (organization_id, balance, currency, address)
SELECT 
  o.id,
  CASE 
    WHEN o.sector = 'Industrial' THEN 45000.00
    WHEN o.sector = 'Comercio' THEN 85000.00
    WHEN o.sector = 'Financiero' THEN 250000.00
    WHEN o.sector = 'Energía' THEN 120000.00
    WHEN o.sector = 'Agroalimentario' THEN 35000.00
    ELSE 15000.00 
  END,
  'EUR',
  '0x' || encode(gen_random_bytes(20), 'hex')
FROM organizations o
WHERE o.is_demo = true
  AND NOT EXISTS (
    SELECT 1 FROM wallets w WHERE w.organization_id = o.id
  );
```

### 8.4 Instrucciones de Ejecución

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

## 9. Dataset Técnico Ejemplo

### 9.1 Especificación INC-ROB-CNC-2025-V4

| Campo | Valor |
|-------|-------|
| **Título** | Telemetría y Registro de Fallos - Brazos Robóticos Serie-X |
| **Formato** | JSON-LD (Estandarizado IDSA) / CSV (Exportable) |
| **Frecuencia** | 10 Hz (Datos procesados por Edge Functions) |
| **Volumen** | ~500,000 registros (6 meses) |
| **Oportunidad** | Histórico Fallos Brazos Robóticos CNC |

### 9.2 Esquema de Columnas

| Columna | Tipo | Descripción | Ejemplo |
|---------|------|-------------|---------|
| `timestamp_utc` | DateTime (ISO) | Fecha y hora exacta | 2025-11-24T14:20:01Z |
| `asset_did` | String (DID) | Identificador soberano | did:ethr:0x7e...robot01 |
| `joint_temp_c` | Float | Temperatura motor (°C) | 64.2 |
| `vibration_rms` | Float | Vibración RMS (m/s²) | 0.15 |
| `torque_nm` | Float | Par motor (Nm) | 125.4 |
| `cycle_count` | Integer | Ciclos desde mantenimiento | 450230 |
| `operational_mode` | Enum | Auto, Manual, Calibration, Alarm | Auto |
| `error_code` | String | Código de error | E-402 (Overload) |
| `failure_label` | Boolean | Indica parada de línea | 1 (True) |
| `notary_hash` | Hash (hex) | Prueba blockchain | 0x8f3c...b2e1 |

### 9.3 Muestra CSV

```csv
timestamp_utc,asset_did,joint_temp_c,vibration_rms,torque_nm,cycle_count,operational_mode,error_code,failure_label,notary_hash
2025-11-24T14:20:01Z,did:ethr:0x7e1a2b3c4d5e6f7robot01,58.4,0.12,120.1,450001,Auto,null,0,0x1a2b3c...
2025-11-24T14:25:10Z,did:ethr:0x7e1a2b3c4d5e6f7robot01,62.1,0.18,135.5,450120,Auto,null,0,0x4d5e6f...
2025-11-24T14:30:45Z,did:ethr:0x7e1a2b3c4d5e6f7robot01,78.9,0.45,158.2,450230,Alarm,E-402,1,0x8f3c9d...
2025-11-24T14:35:20Z,did:ethr:0x7e1a2b3c4d5e6f7robot01,65.3,0.14,122.8,450231,Manual,null,0,0x2b3c4d...
```

### 9.4 Umbrales de Alerta (Health Score)

| Métrica | Normal | Warning | Critical |
|---------|--------|---------|----------|
| `joint_temp_c` | < 65°C | 65-80°C | > 80°C |
| `vibration_rms` | < 0.20 m/s² | 0.20-0.40 m/s² | > 0.40 m/s² |
| `torque_nm` | < 140 Nm | 140-160 Nm | > 160 Nm |

### 9.5 Gobernanza del Dataset

| Capacidad | Aplicación |
|-----------|------------|
| **Soberanía (ODRL)** | Uso exclusivo para entrenamiento de modelos IA. Prohibida redistribución |
| **Identidad (SSI)** | GigaFactory North firma veracidad con DID Corporativo |
| **Privacidad (GDPR)** | Edge Functions anonimizan `operator_id` antes de descarga |
| **Integridad (Blockchain)** | Merkle Root por lote de 1,000 filas anclado en Pontus-X |

### 9.6 Validación TypeScript

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

## 10. Instrucciones para IA/Gemini

### 10.1 Contexto de Uso

Este documento proporciona toda la información necesaria para:

1. **Generar datos sintéticos** alineados con el ecosistema ProcureData
2. **Crear visualizaciones** de las oportunidades de mercado
3. **Entrenar modelos** para clasificación de oportunidades por sector
4. **Generar descripciones** más detalladas de cada oportunidad
5. **Simular transacciones** con flujo de estados realista

### 10.2 Prompts Sugeridos

**Para generar más oportunidades:**
```
Basándote en las 30 oportunidades de mercado del documento, genera 10 oportunidades adicionales para el sector [SECTOR] manteniendo:
- Formato de título: específico y técnico
- Presupuesto: entre 1,500 y 15,000 EUROe
- Descripción: 2-3 frases con requisitos específicos
- Categoría: alineada con las 14 categorías existentes
```

**Para mejorar descripciones:**
```
Mejora la descripción de la oportunidad "[TÍTULO]" añadiendo:
- Especificaciones técnicas más detalladas
- Referencias a normativas europeas aplicables
- Formato de datos preferido (JSON-LD, CSV, API)
- Requisitos de frecuencia de actualización
```

**Para generar transacciones:**
```
Genera 20 transacciones de datos para una demo realista:
- Distribución de estados: 55% completed, 20% pending, 15% approved, 10% otros
- Propósitos: homologación, ESG, licitación, auditoría, due diligence
- Duración de acceso: 30-365 días
- Fechas: últimos 6 meses con distribución natural
```

### 10.3 JSON para Google AI Studio

```json
{
  "opportunities_summary": {
    "total": 35,
    "sectors_distribution": {
      "Industrial": 16,
      "Comercio": 4,
      "Agroalimentario": 4,
      "Movilidad": 3,
      "Salud": 2,
      "Economia_Social": 1,
      "Premium_additions": 5
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
  },
  "organizations_summary": {
    "total_demo": 19,
    "by_type": {
      "consumer": 8,
      "provider": 8,
      "data_holder": 3
    }
  },
  "products_summary": {
    "total": 23,
    "categories": ["Compliance", "ESG", "Industrial", "IoT", "Financial", "Supply Chain", "AI/ML", "Salud"]
  },
  "services_summary": {
    "total": 21,
    "by_category": {
      "Compliance": 5,
      "Sostenibilidad": 4,
      "IA & Analytics": 3,
      "Financiación": 2,
      "Blockchain": 2,
      "Data Ops": 3,
      "Risk": 1,
      "Governance": 1
    }
  }
}
```

---

## 11. Validaciones y Notas

### 11.1 Queries de Validación

```sql
-- Verificar integridad referencial
SELECT COUNT(*) FROM organizations WHERE type = 'provider';   -- Debe ser >= 8
SELECT COUNT(*) FROM organizations WHERE type = 'consumer';   -- Debe ser >= 8
SELECT COUNT(*) FROM organizations WHERE type = 'data_holder';-- Debe ser >= 3

-- Verificar distribución de transacciones
SELECT status, COUNT(*), ROUND(COUNT(*)::decimal / SUM(COUNT(*)) OVER() * 100, 1) as pct
FROM data_transactions GROUP BY status;

-- Verificar oportunidades activas
SELECT category, COUNT(*) FROM marketplace_opportunities 
WHERE status = 'active' GROUP BY category ORDER BY COUNT(*) DESC;

-- Verificar servicios por categoría
SELECT category, COUNT(*), AVG(price) as avg_price 
FROM value_services GROUP BY category;
```

### 11.2 Errores Comunes y Correcciones

| Error Común | Valor Incorrecto | Valor Correcto |
|-------------|------------------|----------------|
| `organizations.type` | `'service_provider'` | `'data_holder'` |
| `wallets` columna | `wallet_address` | `address` |
| `data_transactions` columna | `price` | N/A (precio en `data_assets.price`) |
| `data_transactions` columna | `completed_at` | N/A (usar `updated_at`) |
| `esg_reports` columna | `scope3_total_tons` | N/A (solo scope1, scope2) |
| `data_transactions.status` | `'pending_payment'` | `'pending_holder'` |

### 11.3 Campos Obligatorios en `data_transactions`

```sql
-- Estos campos son NOT NULL y DEBEN incluirse:
INSERT INTO data_transactions (
  asset_id,             -- UUID del activo
  consumer_org_id,      -- UUID de quien solicita
  subject_org_id,       -- UUID del proveedor (dueño de datos)
  holder_org_id,        -- UUID de quien custodia los datos
  purpose,              -- VARCHAR: Propósito de la solicitud
  justification,        -- TEXT: Justificación detallada
  access_duration_days, -- INT: Días de acceso solicitados
  requested_by,         -- UUID: auth.users.id del solicitante
  status                -- ENUM: usar valor válido
) VALUES (...);
```

### 11.4 Propósitos Sugeridos para Transacciones

- "Homologación nuevo proveedor"
- "Validación ESG para licitación pública"
- "Auditoría de cadena de suministro"
- "Verificación de capacidad productiva"
- "Due diligence para adquisición"
- "Cumplimiento normativo CSRD"
- "Evaluación de riesgo crediticio"
- "Certificación blockchain de origen"

---

## 12. Widgets Interactivos

### 12.1 Widgets de Servicios

Los servicios se renderizan con widgets dinámicos según su categoría.  
Archivo: `src/components/services/ServiceInteractiveWidget.tsx`

| Categoría | Widget | Descripción | Archivo |
|-----------|--------|-------------|---------|
| Financiación | `RoiCalculator` | Calculadora ROI con slider y gráfico animado | `widgets/RoiCalculator.tsx` |
| Compliance | `ProcessFlow` | Flujo Input→Proceso→Output con animación | `widgets/ProcessFlow.tsx` |
| Data Ops | `ProcessFlow` | Mismo widget de flujo | `widgets/ProcessFlow.tsx` |
| Privacidad | `ProcessFlow` | Mismo widget de flujo | `widgets/ProcessFlow.tsx` |
| IA & Analytics | `CapabilityTree` | Árbol Raw Data→AI Engine→Insight | `widgets/CapabilityTree.tsx` |
| Inteligencia | `CapabilityTree` | Mismo widget de árbol | `widgets/CapabilityTree.tsx` |
| Sostenibilidad | `ImpactGauge` | Gauge semicircular ESG con confetti | `widgets/ImpactGauge.tsx` |
| Blockchain | `ImpactGauge` | Mismo gauge adaptado | `widgets/ImpactGauge.tsx` |

### 12.2 Mapeo de Categorías

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

### 12.3 Widgets Inline del Innovation Lab

| Widget | Tab | Datos | Descripción |
|--------|-----|-------|-------------|
| **Radar de Madurez Tecnológica** | Insights | `TECH_RADAR_DATA` hardcoded | RadarChart: tu empresa vs líder del sector |
| **Matriz de Priorización** | Insights | Generado de `concepts` | ScatterChart Esfuerzo (X) vs Impacto (Y) |
| **Smart Contract Simulator** | Insights | `CONTRACT_STEPS` hardcoded | 4 pasos animados de ejecución |
| **Contract Sentinel** | Insights | `DETECTED_ALERTS` hardcoded | Escáner de cláusulas con alertas |

### 12.4 Mapeo de Iconos (Lucide)

```typescript
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
  AlertTriangle: AlertTriangle,
  TrendingUp: TrendingUp,
  CheckCircle: CheckCircle,
  ArrowRightLeft: ArrowRightLeft,
};
```

---

## Apéndice: Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| **Tablas en BD** | 29 + 1 vista |
| **Organizaciones demo** | 19 (8 consumer, 8 provider, 3 data_holder) |
| **Productos de datos** | 23+ |
| **Servicios de valor** | 21 |
| **Oportunidades activas** | 35+ |
| **Categorías UI** | 14 |
| **Scripts de semilla** | 5 |
| **Sectores oficiales** | 6 |
| **Alineación OFFICIAL_SECTORS** | ✅ 100% |

---

*Documento consolidado de synthetic_data.md + synthetic_opportunities.md*  
*ProcureData © 2026 | Última actualización: 2026-01-10*
