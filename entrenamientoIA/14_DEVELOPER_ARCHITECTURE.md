# 14 - Manual del Desarrollador y Arquitectura

> **Versión**: 3.2  
> **Última actualización**: 2026-01-13  
> Basado en Documento Explicativo 12  
> Stack técnico, esquema de base de datos, funciones serverless y flujo de despliegue.

---

## 1. Stack Tecnológico de ProcureData

### Capas de la Arquitectura

| Capa | Tecnología | Descripción |
|------|------------|-------------|
| **Frontend** | React 18+ con Vite y TypeScript | Seguridad de tipos y rendimiento optimizado |
| **Estilos** | Tailwind CSS + shadcn/ui | Diseño responsivo con componentes base |
| **Backend (BaaS)** | Supabase | Autenticación, almacenamiento, base de datos y Edge Functions |
| **Infraestructura** | Lovable Cloud | Orquesta despliegue y sincronización con código fuente |

### Librerías Principales
- React Router (navegación)
- TanStack Query (gestión de estado servidor)
- Framer Motion (animaciones)
- Recharts (visualizaciones)
- ethers.js (Web3)

---

## 2. Esquema de Base de Datos (PostgreSQL)

**31 tablas** optimizadas para transacciones soberanas de datos.

### Tablas Principales

| Tabla | Propósito |
|-------|-----------|
| `organizations` | Identidad legal, CIF, sector y estado de verificación KYB |
| `user_profiles` | Vincula usuarios Supabase Auth con organizaciones y roles |
| `data_transactions` | Ciclo de vida del intercambio (initiated → completed) |
| `data_policies` | Contratos digitales JSONB siguiendo estándar ODRL |
| `data_assets` | Activos de datos disponibles para intercambio |
| `wallets` | Saldos EUROe por organización |
| `wallet_transactions` | Historial inmutable de pagos |
| `registration_requests` | Solicitudes de adhesión con estados y metadatos |
| `ai_feedback` | Feedback de usuarios sobre respuestas de ARIA |
| `privacy_preferences` | Preferencias de privacidad y notificaciones por usuario |

### Estados de Transacción
```
initiated → pending_subject → pending_holder → approved → completed
                    ↓               ↓
              denied_subject   denied_holder
```

---

## 3. Lógica Serverless: Edge Functions

Funciones en TypeScript ejecutadas bajo runtime **Deno**.

### Edge Functions Principales

| Función | Propósito |
|---------|-----------|
| `chat-ai` | Cerebro de ARIA v3.2, conecta con Google Gemini 3 Flash y procesa base de conocimiento |
| `submit-registration` | Procesa formularios de adhesión y crea registros en `registration_requests` |
| `send-welcome-email` | Envía emails de bienvenida diferenciados por rol (Buyer/Supplier) vía Resend |
| `sync-to-github` | Escribe correcciones validadas automáticamente al repositorio GitHub |
| `notification-handler` | Gestiona envío de notificaciones a usuarios |
| `erp-api-tester` | Prueba conectividad con APIs de ERPs configurados |
| `erp-data-uploader` | Procesa datos subidos desde sistemas ERP |

### Seguridad de Edge Functions
- API Keys nunca expuestas al cliente
- Secrets cifrados en Supabase (RESEND_API_KEY, GITHUB_PAT, LOVABLE_API_KEY)
- CORS configurado restrictivamente
- Validación JWT en funciones protegidas

---

## 4. Seguridad y Row Level Security (RLS)

**Política Zero Trust (Confianza Cero)** a nivel de datos.

### Principios de Seguridad

| Principio | Implementación |
|-----------|----------------|
| **RLS Activo** | Las 28 tablas tienen RLS; una empresa solo accede a sus propias filas |
| **Autenticación JWT** | Cada petición lleva token que identifica usuario y organización |
| **Roles RBAC** | Permisos segmentados (admin, approver, viewer) según perfil |

### Ejemplo de Política RLS
```sql
CREATE POLICY "Users can only view their organization's data"
ON data_transactions
FOR SELECT
USING (consumer_org_id = get_user_organization(auth.uid()));
```

---

## 5. Flujo de Desarrollo e Integración Continua (CI/CD)

### Pipeline de Desarrollo

| Etapa | Descripción |
|-------|-------------|
| **Sincronización GitHub** | Cada cambio en Lovable genera commit automático al repositorio |
| **Control de Versiones** | Pull Requests desde GitHub para lógica compleja o migraciones SQL |
| **Despliegue Automático** | Al fusionar en rama principal, Lovable Cloud y Supabase despliegan automáticamente |

### Flujo de Trabajo
```
Desarrollo en Lovable → Commit automático a GitHub → Review/PR → Merge → Deploy automático
```

---

## 6. Integración Web3 y DIDs

### Componentes Web3

| Componente | Descripción |
|------------|-------------|
| **Pontus-X** | Red blockchain oficial de Gaia-X |
| **ethers.js** | Librería para interacción con blockchain |
| **DIDs** | Formato estándar `did:ethr:0x...` |
| **EUROe** | Token ERC-20 en red Pontus-X |

### Configuración de Red
- Chain ID: 32460
- RPC URL: https://rpc.2040.pontus-x.eu
- Block Explorer: https://explorer.2040.pontus-x.eu

---

## 7. Reglas de Respuesta para ARIA

### Triggers de Arquitectura
- "stack" / "tecnología" → Describir capas del sistema
- "base de datos" / "PostgreSQL" → Explicar esquema (31 tablas)
- "edge function" → Describir funciones serverless
- "RLS" / "seguridad" → Explicar políticas de acceso
- "deploy" / "despliegue" → Describir flujo CI/CD
- "registro" / "onboarding" → Explicar flujo de adhesión

### Frases Sugeridas
- "ProcureData usa React con TypeScript en el frontend y Supabase como backend."
- "La base de datos tiene 31 tablas con RLS activo en todas ellas."
- "El despliegue es automático: cada merge en main activa el pipeline."
- "El proceso de registro diferencia entre Buyers y Suppliers con onboarding personalizado."
