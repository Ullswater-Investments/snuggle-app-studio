# Base de Conocimiento - ProcureData

> **Fuente**: Documentos oficiales del proyecto  
> **Propósito**: Contexto de negocio para la IA

---

## 1. ¿Qué es ProcureData?

**PROCUREDATA** es la primera plataforma de orquestación de datos diseñada para la **Economía Descentralizada**. A diferencia de los Data Lakes tradicionales, no almacenamos datos; gestionamos **acuerdos soberanos** entre quienes tienen los datos y quienes los necesitan.

### El Problema que Resuelve

El intercambio de datos B2B es actualmente:
- **Lento**: Meses de negociación legal
- **Inseguro**: Sin garantías de cumplimiento
- **Manual**: Emails, PDFs, firmas físicas

PROCUREDATA lo transforma en un **Marketplace Transaccional** instantáneo con:
- Gobernanza automática (ODRL 2.0)
- Seguridad financiera integrada
- Calidad técnica garantizada

---

## 2. Modelo de Negocio: El Triángulo de Confianza

```
    ┌─────────────────────────────────────────────────┐
    │                                                 │
    │     CONSUMER ◄───── 1. Solicita ─────► PROVIDER │
    │    (Comprador)                      (Proveedor) │
    │         ▲                                ▼      │
    │         │                                │      │
    │         │                    2. Autoriza │      │
    │         │                                │      │
    │    3. Libera datos                       ▼      │
    │         │                                       │
    │         └────────── DATA HOLDER ────────────────┘
    │                     (Custodio)                  │
    └─────────────────────────────────────────────────┘
```

| Rol | Responsabilidad | Ejemplo |
|-----|-----------------|---------|
| **Consumer** | Solicita acceso a datos para un propósito específico | Empresa compradora que necesita validar proveedores |
| **Provider** (Subject) | Propietario original de los datos, decide sobre su uso | Proveedor cuyos datos fiscales se solicitan |
| **Data Holder** | Custodio técnico que almacena y entrega los datos | Agencia tributaria, cámara de comercio, certificadora |

---

## 3. El Problema "nxm"

### Situación Tradicional

En el modelo tradicional, cada empresa compradora (n) valida independientemente a cada proveedor (m), generando **n × m validaciones redundantes**.

**Ejemplo numérico**:
- 100 empresas compradoras
- 500 proveedores comunes
- = 50,000 validaciones manuales

### Solución ProcureData

Con identidades compartidas, el cálculo cambia a:
- 500 validaciones únicas (una por proveedor)
- **Ahorro del 99%** en procesos de validación

---

## 4. Pasaporte Digital de Proveedor

El producto principal es un paquete de datos verificados que incluye:

### Datos Fiscales
- CIF/NIF de la empresa
- Razón social y nombre comercial
- Dirección fiscal y legal
- Nombre del representante legal
- Datos de contacto

### Certificaciones
- ISO 9001 (Gestión de Calidad)
- ISO 14001 (Gestión Ambiental)
- ISO 45001 (Seguridad y Salud Laboral)
- Certificaciones sectoriales específicas

### Métricas ESG
- Emisiones Scope 1 (directas)
- Emisiones Scope 2 (electricidad)
- Emisiones Scope 3 (cadena de suministro)
- Porcentaje de energía renovable
- Certificaciones ambientales

### Scoring Financiero
- Evaluación de riesgo crediticio
- Historial de pagos
- Rating financiero

### Reputación
- Puntuación media de transacciones (1-5 estrellas)
- Número de reviews verificadas
- Historial de transacciones completadas

---

## 5. Arquitectura Híbrida Web2 + Web3

ProcureData utiliza un modelo híbrido que combina:

### Capa Web2 (Cloud AI/Supabase)
- **PostgreSQL**: Base de datos relacional con 28 tablas
- **Supabase Auth**: Autenticación JWT con múltiples providers
- **Edge Functions**: Lógica serverless en Deno
- **Realtime**: WebSockets para actualizaciones en tiempo real
- **RLS (Row Level Security)**: Seguridad multi-tenant

### Capa Web3 (Pontus-X Blockchain)
- **Pontus-X Testnet**: Red blockchain del ecosistema Gaia-X
- **EUROe Token (ERC-20)**: Stablecoin para pagos
- **DID (did:ethr)**: Identificadores descentralizados
- **Block Explorer**: Verificación de transacciones

---

## 6. Stack Europeo de Datos

ProcureData implementa componentes oficiales del ecosistema europeo de datos:

| Componente | Función | Estándar |
|------------|---------|----------|
| **Eclipse Dataspace Connector (EDC)** | Conector de intercambio de datos | IDS/IDSA |
| **IDS Dataspace Protocol** | Interoperabilidad entre espacios de datos | IDSA |
| **Keycloak** | Gestión de identidades federadas | OpenID Connect |
| **Gaia-X Trust Framework** | Marco de confianza europeo | Gaia-X AISBL |
| **ODRL 2.0** | Contratos inteligentes de licencia | W3C |

---

## 7. Flujo de Transacción

```
PASO 1: Consumer crea solicitud (estado: initiated)
         ↓
PASO 2: Sistema notifica al Provider
         ↓
PASO 3: Provider aprueba (estado: pending_holder)
         ↓
PASO 4: Sistema notifica al Data Holder
         ↓
PASO 5: Data Holder libera datos (estado: completed)
         ↓
PASO 6: Hash se notariza en blockchain Pontus-X
         ↓
PASO 7: Consumer accede a los datos con prueba verificable
```

### Estados de una Transacción

| Estado | Descripción |
|--------|-------------|
| `initiated` | Creada por el consumer |
| `pending_subject` | Esperando aprobación del provider |
| `pending_holder` | Provider aprobó, esperando holder |
| `approved` | Holder aprobó, lista para entrega |
| `completed` | Datos entregados |
| `denied_subject` | Rechazada por provider |
| `denied_holder` | Rechazada por holder |
| `cancelled` | Cancelada por el consumer |

---

## 8. Modelo de Precios

### Tier Gratuito (Pay-per-use)
- **1 EUROe por transacción**
- Sin compromiso
- Ideal para pruebas y uso ocasional
- Funcionalidad completa

### Membresía Pro
- **100 EUROe/año**
- Transacciones ilimitadas
- Soporte prioritario
- APIs avanzadas
- Rentable si haces +100 altas/año

### Moneda
- **EUROe**: Euro tokenizado en blockchain Pontus-X
- Respaldado 1:1 con Euro fiat
- Trazabilidad total de pagos

---

## 9. Financiación del Proyecto

```
Financiado por la Unión Europea - NextGenerationEU

Plan de Recuperación, Transformación y Resiliencia

Ministerio para la Transformación Digital y de la Función Pública
```

---

## 10. Sectores Prioritarios

| Prioridad | Sector | Cuota Objetivo | Ejemplos |
|-----------|--------|----------------|----------|
| 1 | **Industrial** | 51% | Manufactura, automoción, maquinaria |
| 2 | **Comercio** | 15% | Retail, distribución, e-commerce |
| 3 | **Agroalimentario** | 12% | Agricultura, ganadería, alimentación |
| 4 | **Movilidad Sostenible** | 10% | Transporte, logística, vehículos eléctricos |
| 5 | **Salud** | 7% | Farmacéutico, equipamiento médico |
| 6 | **Economía Social** | 5% | Cooperativas, tercer sector |

---

## 11. Ventajas Competitivas

1. **Verificación descentralizada**: No dependemos de un tercero central
2. **Trazabilidad blockchain**: Cada acceso queda registrado en Pontus-X
3. **Interoperabilidad europea**: Estándares IDSA/IDS/Gaia-X
4. **Soberanía de datos**: Los propietarios mantienen control total
5. **Cumplimiento normativo**: GDPR, CSRD, regulaciones sectoriales
6. **Integración ERP**: Conectores para SAP, Oracle, Microsoft Dynamics
