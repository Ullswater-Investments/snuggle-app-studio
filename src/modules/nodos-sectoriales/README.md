# Módulo: Nodos Sectoriales

## Descripción
Sección completa de Nodos Sectoriales para la plataforma PROCUREDATA.
Permite a Clústers, Asociaciones y Grandes Empresas crear sus propios
espacios de datos soberanos bajo normativa Gaia-X.

## Estructura del Módulo

```
src/modules/nodos-sectoriales/
├── README.md                          # Esta documentación
├── routes.tsx                         # Rutas para integrar en App.tsx
├── pages/
│   ├── SectoralNodesPage.tsx          # /nodos-sectoriales
│   ├── NodeRequirementsPage.tsx       # /nodos/requisitos
│   ├── NodeTechPage.tsx               # /nodos/tecnologia
│   ├── NodeFeatureLayout.tsx          # Layout compartido
│   ├── MarketplacePage.tsx            # /nodos/marketplace
│   ├── OdrlPage.tsx                   # /nodos/odrl
│   ├── MonetizacionPage.tsx           # /nodos/monetizacion
│   ├── MarcaBlancaPage.tsx            # /nodos/marca-blanca
│   ├── IdentidadDIDPage.tsx           # /nodos/identidad-did
│   ├── SmartContractsPage.tsx         # /nodos/smart-contracts
│   ├── PagosEUROePage.tsx             # /nodos/pagos-euroe
│   ├── ConectoresERPPage.tsx          # /nodos/conectores-erp
│   ├── GobernanzaIDSAPage.tsx         # /nodos/gobernanza-idsa
│   └── MultiTenantRLSPage.tsx         # /nodos/multi-tenant-rls
├── components/
│   ├── FundingFooter.tsx              # Footer con financiación EU
│   ├── ProcuredataLogo.tsx            # Logo de la marca
│   ├── LanguageSwitcher.tsx           # Selector de idioma
│   └── ThemeToggle.tsx                # Toggle modo claro/oscuro
├── hooks/
│   └── useNodeEligibility.ts          # Hook para formulario de solicitud
├── assets/
│   └── (copiar manualmente los logos del proyecto original)
├── edge-functions/
│   └── submit-node-eligibility/
│       └── index.ts                   # Edge function para solicitudes
└── lib/
    └── constants.ts                   # Constantes oficiales PROCUREDATA
```

## Dependencias NPM Requeridas

```bash
npm install framer-motion lucide-react react-router-dom sonner @supabase/supabase-js next-themes i18next react-i18next
```

## Componentes Shadcn/UI Requeridos

Ejecutar en el proyecto destino:

```bash
npx shadcn-ui@latest add button card badge input label select dropdown-menu tooltip
```

## Integración en el Proyecto Destino

### 1. Copiar el módulo

Copiar la carpeta `src/modules/nodos-sectoriales/` al proyecto destino.

### 2. Copiar los assets

Copiar manualmente los siguientes archivos a `src/assets/`:
- `procuredata-logo.png`
- `kit-espacios-datos-logo.png` (si existe)

### 3. Actualizar imports en páginas

En cada archivo de página, actualizar los imports para usar rutas relativas:

```typescript
// Antes (proyecto original)
import { FundingFooter } from '@/components/FundingFooter';
import { ProcuredataLogo } from '@/components/ProcuredataLogo';

// Después (módulo exportado)
import { FundingFooter } from '../components/FundingFooter';
import { ProcuredataLogo } from '../components/ProcuredataLogo';
```

### 4. Integrar rutas en App.tsx

```typescript
import { nodosRoutes } from './modules/nodos-sectoriales/routes';

// En tu configuración de rutas:
<Routes>
  {/* Tus rutas existentes */}
  {nodosRoutes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ))}
</Routes>
```

### 5. Configurar Supabase (Backend)

#### 5.1 Crear tabla en la base de datos

```sql
CREATE TABLE node_eligibility_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_name TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  ecosystem_status TEXT NOT NULL,
  email TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE node_eligibility_requests ENABLE ROW LEVEL SECURITY;

-- Política para insertar (cualquiera puede enviar solicitud)
CREATE POLICY "Anyone can insert eligibility requests"
ON node_eligibility_requests FOR INSERT
WITH CHECK (true);

-- Política para lectura (solo admins)
CREATE POLICY "Only authenticated users can read"
ON node_eligibility_requests FOR SELECT
USING (auth.role() = 'authenticated');
```

#### 5.2 Desplegar Edge Function

Copiar `edge-functions/submit-node-eligibility/` a `supabase/functions/`

#### 5.3 Configurar secreto RESEND_API_KEY

Añadir el secreto `RESEND_API_KEY` en la configuración de Supabase para envío de emails de notificación.

## Configuración de i18n (Opcional)

Si tu proyecto usa internacionalización, este módulo requiere las claves de traducción correspondientes. Los textos están actualmente en español hardcoded. Para internacionalizar:

1. Extraer todos los strings a archivos de traducción
2. Usar `useTranslation()` de react-i18next

## Personalización

### Cambiar logo

Reemplazar el archivo `procuredata-logo.png` en assets o modificar el componente `ProcuredataLogo.tsx`.

### Cambiar colores

Los colores principales usan la paleta naranja (orange-500, orange-600). Para cambiarlos:
- Buscar y reemplazar `orange-` por tu color preferido en todos los archivos

### Cambiar email de notificación

En `edge-functions/submit-node-eligibility/index.ts`, línea ~323:
```typescript
to: ["tu-email@tudominio.com"],
```

## Rutas Disponibles

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/nodos-sectoriales` | SectoralNodesPage | Landing principal de Nodos |
| `/nodos/requisitos` | NodeRequirementsPage | Requisitos y formulario de solicitud |
| `/nodos/tecnologia` | NodeTechPage | Arquitectura técnica |
| `/nodos/marketplace` | MarketplacePage | Marketplace propio |
| `/nodos/odrl` | OdrlPage | Políticas ODRL |
| `/nodos/monetizacion` | MonetizacionPage | Modelo de monetización |
| `/nodos/marca-blanca` | MarcaBlancaPage | Personalización marca blanca |
| `/nodos/identidad-did` | IdentidadDIDPage | Identidad descentralizada |
| `/nodos/smart-contracts` | SmartContractsPage | Contratos inteligentes |
| `/nodos/pagos-euroe` | PagosEUROePage | Sistema de pagos EUROe |
| `/nodos/conectores-erp` | ConectoresERPPage | Integraciones ERP |
| `/nodos/gobernanza-idsa` | GobernanzaIDSAPage | Gobernanza IDSA/Gaia-X |
| `/nodos/multi-tenant-rls` | MultiTenantRLSPage | Aislamiento multi-tenant |

## Soporte

Este módulo fue exportado desde el proyecto PROCUREDATA. Para soporte técnico, contactar al equipo de desarrollo original.
