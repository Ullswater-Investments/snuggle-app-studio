# Arquitectura de Datos - ProcureData

> **Base de datos**: PostgreSQL (Supabase/Cloud AI)  
> **Tablas**: 28 tablas  
> **Seguridad**: Row Level Security (RLS) habilitado

---

## 1. Tablas Principales

### Organizaciones y Usuarios

| Tabla | Propósito | Campos Clave |
|-------|-----------|--------------|
| `organizations` | Empresas del ecosistema | id, name, type, sector, tax_id, kyb_verified |
| `user_profiles` | Perfiles de usuario | user_id, organization_id, full_name, position |
| `user_roles` | Roles RBAC | user_id, organization_id, role |

### Catálogo de Datos

| Tabla | Propósito | Campos Clave |
|-------|-----------|--------------|
| `data_products` | Templates de productos | id, name, category, schema_definition, version |
| `data_assets` | Activos en marketplace | id, product_id, holder_org_id, subject_org_id, price, status |
| `catalog_metadata` | Metadatos de catálogo | asset_id, tags, categories, visibility |

### Transacciones

| Tabla | Propósito | Campos Clave |
|-------|-----------|--------------|
| `data_transactions` | Solicitudes de datos | id, asset_id, consumer_org_id, subject_org_id, holder_org_id, status |
| `approval_history` | Historial de aprobaciones | transaction_id, actor_org_id, action, notes |
| `data_policies` | Contratos ODRL | transaction_id, odrl_policy_json |
| `data_payloads` | Contenido de datos | transaction_id, schema_type, data_content |
| `transaction_messages` | Chat de negociación | transaction_id, sender_org_id, content |
| `supplier_data` | Pasaporte de proveedor | transaction_id, company_name, tax_id, fiscal_address |

### Finanzas

| Tabla | Propósito | Campos Clave |
|-------|-----------|--------------|
| `wallets` | Billeteras por org | organization_id, balance, currency, address |
| `wallet_transactions` | Movimientos | from_wallet_id, to_wallet_id, amount, transaction_type |

### Servicios

| Tabla | Propósito | Campos Clave |
|-------|-----------|--------------|
| `value_services` | Catálogo de servicios | id, name, category, price, price_model, features |

### Sostenibilidad

| Tabla | Propósito | Campos Clave |
|-------|-----------|--------------|
| `esg_reports` | Reportes ESG | organization_id, report_year, scope1_total_tons, scope2_total_tons, energy_renewable_percent |

### Innovación

| Tabla | Propósito | Campos Clave |
|-------|-----------|--------------|
| `innovation_lab_concepts` | Conceptos I+D | id, title, chart_type, chart_data, maturity_level |

### Sistema

| Tabla | Propósito | Campos Clave |
|-------|-----------|--------------|
| `notifications` | Notificaciones | user_id, type, title, message, is_read |
| `privacy_preferences` | Preferencias usuario | user_id, profile_visible, access_alerts |
| `audit_logs` | Logs de auditoría | actor_id, action, resource, details |
| `login_attempts` | Intentos de login | email, ip_address, success |

---

## 2. Enums del Sistema

### organization_type
```
'consumer' | 'provider' | 'data_holder'
```

### transaction_status
```
'initiated'        → Creada por consumer
'pending_subject'  → Esperando provider
'pending_holder'   → Provider aprobó, esperando holder
'approved'         → Lista para entrega
'completed'        → Datos entregados
'denied_subject'   → Rechazada por provider
'denied_holder'    → Rechazada por holder
'cancelled'        → Cancelada
```

### app_role
```
'admin' | 'approver' | 'viewer' | 'api_configurator'
```

### approval_action
```
'pre_approve' | 'approve' | 'deny' | 'cancel'
```

---

## 3. Relaciones (Foreign Keys)

```
organizations
    ├─→ user_profiles.organization_id
    ├─→ user_roles.organization_id
    ├─→ data_assets.holder_org_id
    ├─→ data_assets.subject_org_id
    ├─→ data_transactions.consumer_org_id
    ├─→ data_transactions.subject_org_id
    ├─→ data_transactions.holder_org_id
    ├─→ wallets.organization_id (1:1)
    ├─→ esg_reports.organization_id
    └─→ value_services.provider_org_id

data_products
    └─→ data_assets.product_id

data_assets
    └─→ data_transactions.asset_id

data_transactions
    ├─→ approval_history.transaction_id
    ├─→ data_policies.transaction_id
    ├─→ data_payloads.transaction_id
    ├─→ transaction_messages.transaction_id
    ├─→ supplier_data.transaction_id
    └─→ organization_reviews.transaction_id

wallets
    ├─→ wallet_transactions.from_wallet_id
    └─→ wallet_transactions.to_wallet_id
```

---

## 4. Vistas

### marketplace_listings
Vista unificada del marketplace que combina:
- `data_assets` (activos)
- `data_products` (productos)
- `organizations` (proveedores)
- `esg_reports` (métricas ESG)
- `organization_reviews` (reputación)

Campos expuestos:
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

---

## 5. Estructura de value_services

```json
{
  "id": "uuid",
  "name": "Homologación Flash",
  "category": "Compliance",
  "description": "Validación automática de proveedores en 24h",
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

---

## 6. Estructura de esg_reports

```json
{
  "id": "uuid",
  "organization_id": "uuid",
  "report_year": 2025,
  "scope1_total_tons": 1250.5,
  "scope2_total_tons": 890.3,
  "energy_renewable_percent": 72.5,
  "certifications": ["ISO 14001", "ISO 9001", "Pontus-X Verified"]
}
```

---

## 7. Estructura de innovation_lab_concepts

```json
{
  "id": "uuid",
  "title": "Predicción de Demanda ML",
  "category": "ML/AI",
  "short_description": "Algoritmo de forecasting con horizonte 12 meses",
  "full_analysis": "Análisis detallado en markdown...",
  "business_impact": "Reducción del 15% en costes de inventario",
  "chart_type": "area",
  "chart_data": [
    { "month": "Ene", "predicted": 450, "actual": 420 },
    { "month": "Feb", "predicted": 480, "actual": 490 }
  ],
  "chart_config": {
    "xAxisKey": "month",
    "lines": ["predicted", "actual"]
  },
  "maturity_level": 4
}
```

---

## 8. Seguridad (RLS)

Todas las tablas tienen Row Level Security habilitado:

### Políticas de Organizations
- Usuarios solo ven organizaciones a las que pertenecen
- Admin puede ver todas las organizaciones en modo demo

### Políticas de Transactions
- Consumer ve sus transacciones como consumer
- Subject ve transacciones donde es el proveedor
- Holder ve transacciones donde es el custodio

### Políticas de Wallets
- Cada organización solo ve su propia wallet
- Transacciones financieras aisladas por organización

---

## 9. Funciones SQL Críticas

```sql
-- Verificar rol de usuario
has_role(_user_id, _organization_id, _role) → boolean

-- Obtener organización del usuario
get_user_organization(_user_id) → uuid

-- KPIs de organización
get_org_kpis(target_org_id) → json

-- Transacciones pendientes
get_pending_transactions(_user_id) → table
```
