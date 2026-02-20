# Constantes Oficiales - ProcureData

> **Archivo fuente**: `src/lib/constants.ts`  
> **Propósito**: Datos invariantes del sistema

---

## 1. Sectores Oficiales (OFFICIAL_SECTORS)

Según Memoria Técnica - Apartado 1.3 "Sector Estratégico"

| ID | Label | Prioridad | Cuota Objetivo | Icono |
|----|-------|-----------|----------------|-------|
| `industrial` | Industrial | 1 | 51% | Factory |
| `comercio` | Comercio | 2 | 15% | ShoppingBag |
| `agroalimentario` | Agroalimentario | 3 | 12% | Wheat |
| `movilidad_sostenible` | Movilidad Sostenible | 4 | 10% | Truck |
| `salud` | Salud | 5 | 7% | Heart |
| `economia_social` | Economía Social | 6 | 5% | Users |

### Código TypeScript
```typescript
export const OFFICIAL_SECTORS = [
  { id: "industrial", label: "Industrial", priority: 1, targetShare: 51, icon: "Factory" },
  { id: "comercio", label: "Comercio", priority: 2, targetShare: 15, icon: "ShoppingBag" },
  { id: "agroalimentario", label: "Agroalimentario", priority: 3, targetShare: 12, icon: "Wheat" },
  { id: "movilidad_sostenible", label: "Movilidad Sostenible", priority: 4, targetShare: 10, icon: "Truck" },
  { id: "salud", label: "Salud", priority: 5, targetShare: 7, icon: "Heart" },
  { id: "economia_social", label: "Economía Social", priority: 6, targetShare: 5, icon: "Users" },
] as const;
```

---

## 2. Precios Oficiales (OFFICIAL_PRICING)

Según Plan de Negocio

| Concepto | Valor | Notas |
|----------|-------|-------|
| Transacción (tier gratuito) | 1.00 EUROe | Por alta de proveedor |
| Membresía Pro | 300 EUROe/mes | Transacciones ilimitadas |
| Moneda | EUROe | Euro tokenizado en Pontus-X |

### Código TypeScript
```typescript
export const OFFICIAL_PRICING = {
  transactionFee: 1.00,        // EUROe por alta de proveedor
  monthlyMembership: 300,      // EUROe/mes membresía Pro
  currency: "EUROe",
} as const;
```

---

## 3. Stack Europeo de Datos (EUROPEAN_STACK)

Componentes del Data Space Europeo - Parte 2: Solución Técnica

| Componente | Descripción | Estado | Categoría |
|------------|-------------|--------|-----------|
| Eclipse Dataspace Connector (EDC) | Conector oficial del Data Space europeo | activo | connector |
| IDS Dataspace Protocol | Protocolo de interoperabilidad IDSA | activo | protocol |
| Keycloak (Federated Identity) | Gestión de identidades federadas | activo | identity |
| Gaia-X Trust Framework | Marco de confianza europeo | activo | trust |

### Código TypeScript
```typescript
export const EUROPEAN_STACK = [
  {
    name: "Eclipse Dataspace Connector (EDC)",
    description: "Conector oficial del Data Space europeo",
    status: "activo",
    category: "connector"
  },
  {
    name: "IDS Dataspace Protocol",
    description: "Protocolo de interoperabilidad IDSA",
    status: "activo",
    category: "protocol"
  },
  {
    name: "Keycloak (Federated Identity)",
    description: "Gestión de identidades federadas",
    status: "activo",
    category: "identity"
  },
  {
    name: "Gaia-X Trust Framework",
    description: "Marco de confianza europeo",
    status: "activo",
    category: "trust"
  },
] as const;
```

---

## 4. Textos Oficiales (OFFICIAL_COPY)

Según Resumen Ejecutivo

| Campo | Valor |
|-------|-------|
| **Título** | PROCUREDATA |
| **Tagline** | Espacio de Datos para la Función de Compras |
| **Subtítulo** | Solución al problema 'nxm' en el alta de proveedores mediante identidades compartidas |
| **Caso de Uso** | El caso de uso principal permite el alta automática de un nuevo proveedor en tu ERP a partir de datos ya validados por otros clientes (Industrial, Comercio, Agro), eliminando la burocracia manual. |

### Financiación
| Campo | Valor |
|-------|-------|
| **UE** | Financiado por la Unión Europea - NextGenerationEU |
| **Plan** | Plan de Recuperación, Transformación y Resiliencia |
| **Ministerio** | Ministerio para la Transformación Digital y de la Función Pública |

### Código TypeScript
```typescript
export const OFFICIAL_COPY = {
  title: "PROCUREDATA",
  tagline: "Espacio de Datos para la Función de Compras",
  subtitle: "Solución al problema 'nxm' en el alta de proveedores mediante identidades compartidas",
  useCase: "El caso de uso principal permite el alta automática de un nuevo proveedor en tu ERP a partir de datos ya validados por otros clientes (Industrial, Comercio, Agro), eliminando la burocracia manual.",
  funding: {
    eu: "Financiado por la Unión Europea - NextGenerationEU",
    plan: "Plan de Recuperación, Transformación y Resiliencia",
    ministry: "Ministerio para la Transformación Digital y de la Función Pública",
    full: "Financiado por la Unión Europea - NextGenerationEU. Plan de Recuperación, Transformación y Resiliencia. Ministerio para la Transformación Digital y de la Función Pública."
  }
} as const;
```

---

## 5. Links de Transparencia (TRANSPARENCY_LINKS)

| Label | URL |
|-------|-----|
| Memoria Técnica | /docs/tecnico |
| Modelo de Gobernanza | /architecture |
| Especificaciones Técnicas | /whitepaper |

### Código TypeScript
```typescript
export const TRANSPARENCY_LINKS = [
  { label: "Memoria Técnica", href: "/docs/tecnico" },
  { label: "Modelo de Gobernanza", href: "/architecture" },
  { label: "Especificaciones Técnicas", href: "/whitepaper" },
] as const;
```

---

## 6. Configuración Blockchain

### Pontus-X Network
| Campo | Valor |
|-------|-------|
| Chain ID | 0x7ecc (32460 decimal) |
| Chain Name | Pontus-X Testnet |
| Currency Symbol | GX |
| RPC URL | https://rpc.dev.pontus-x.eu |
| Block Explorer | https://explorer.pontus-x.eu/ |

### Token EUROe
| Campo | Valor |
|-------|-------|
| Tipo | ERC-20 |
| Símbolo | EUROe |
| Decimales | 18 |
| Respaldo | 1:1 con Euro fiat |

### Formato DID
```
did:ethr:0x7ecc:<ethereum_address>
```
Ejemplo: `did:ethr:0x7ecc:0x742d35cc6634c0532925a3b844bc9e7595f8fe00`

---

## 7. Roles de Usuario

| Rol | Permisos |
|-----|----------|
| `admin` | Control total de la organización |
| `approver` | Aprobar/rechazar transacciones |
| `viewer` | Solo lectura |
| `api_configurator` | Configurar integraciones ERP |

---

## 8. Estados de Transacción

| Estado | Significado |
|--------|-------------|
| `initiated` | Creada por consumer |
| `pending_subject` | Esperando aprobación del provider |
| `pending_holder` | Provider aprobó, esperando holder |
| `approved` | Lista para entrega |
| `completed` | Datos entregados |
| `denied_subject` | Rechazada por provider |
| `denied_holder` | Rechazada por holder |
| `cancelled` | Cancelada por consumer |

---

## 9. Tipos de Organización

| Tipo | Rol en Transacción |
|------|-------------------|
| `consumer` | Solicita datos |
| `provider` | Autoriza uso de sus datos |
| `data_holder` | Custodia y entrega datos |
