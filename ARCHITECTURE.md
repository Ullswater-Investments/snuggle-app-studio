# ARQUITECTURA PROCUREDATA

## 🎭 Modo Demostración

PROCUREDATA incluye un **modo demo completo** que se configura automáticamente:

- **Usuario**: `demo@procuredata.app` (contraseña: `demo123456`)
- **6 organizaciones** con roles Consumer, Holder y Provider  
- **5 transacciones** en estados: initiated, pending_subject, pending_holder, approved, completed
- **4 registros de proveedores** con datos sintéticos completos
- **🎓 Tour guiado interactivo** de 6 pasos al primer login

👉 **Documentación completa**: [DEMO_MODE.md](./DEMO_MODE.md)

**Configuración automática**: Al registrarse el usuario demo, un trigger de base de datos (`setup_demo_user`) inserta automáticamente todos los perfiles, roles, transacciones y datos de proveedores en una sola operación.

**Tour Guiado**: Utilizando react-joyride, el sistema presenta automáticamente un recorrido interactivo que explica las funcionalidades principales y guía al usuario a través de los escenarios demo más importantes.

---

# ARQUITECTURA PROCUREDATA - FASE 1 COMPLETADA

## ✅ Implementación Actual

### 1. Base de Datos

#### Tablas Creadas:
- **organizations**: Organizaciones participantes (consumer, provider, data_holder)
- **user_profiles**: Perfiles de usuario vinculados a organizaciones
- **user_roles**: Sistema de roles separado para seguridad

#### Enums:
- **organization_type**: 'consumer', 'provider', 'data_holder'
- **app_role**: 'admin', 'approver', 'viewer', 'api_configurator'

#### Funciones de Seguridad:
- `has_role()`: Verifica roles con SECURITY DEFINER (evita recursión RLS)
- `get_user_organization()`: Obtiene organización del usuario
- `update_updated_at_column()`: Actualiza timestamps automáticamente

#### Políticas RLS Implementadas:
- ✅ Todos los usuarios autenticados pueden ver organizaciones
- ✅ Solo admins pueden crear/modificar organizaciones
- ✅ Los usuarios pueden ver perfiles de su organización
- ✅ Los usuarios pueden gestionar su propio perfil
- ✅ Los usuarios pueden ver roles de su organización
- ✅ Solo admins pueden gestionar roles

### 2. Autenticación

#### Hook useAuth:
- ✅ Gestión de sesiones con Supabase Auth
- ✅ signUp() con redirect automático
- ✅ signIn() con navegación a dashboard
- ✅ signOut() con limpieza de sesión
- ✅ Listeners de cambio de estado de auth
- ✅ Notificaciones con toast

#### Configuración:
- ✅ Auto-confirmación de email (modo desarrollo)
- ✅ Registro habilitado
- ✅ Usuarios anónimos deshabilitados

### 3. Routing y Páginas

#### Rutas Implementadas:
- `/` → Redirige a `/dashboard`
- `/auth` → Página de login/registro (tabs)
- `/dashboard` → Dashboard principal (protegido)
- `/*` → Página 404

#### Componentes:
- **ProtectedRoute**: Protege rutas que requieren autenticación
- **AuthProvider**: Proveedor de contexto de autenticación
- **Auth**: Página de login/registro con tabs
- **Dashboard**: Dashboard principal con estado del sistema

### 4. Diseño

#### Sistema de Tokens (index.css):
- Colores semánticos en HSL para light/dark mode
- Variables CSS para todos los componentes
- Tokens de sidebar configurados

## 📋 Próximos Pasos (Fases Pendientes)

### FASE 2: Catálogo de Datos ✅ COMPLETADA
- [x] Tabla `data_products` - Productos de datos con esquema y versiones
- [x] Tabla `data_assets` - Activos disponibles por proveedor
- [x] Tabla `catalog_metadata` - Metadatos, tags y categorías
- [x] Página `/catalog` con búsqueda y filtros
- [x] Página `/catalog/product/:id` con detalle completo
- [x] Filtros por categoría y búsqueda por nombre
- [x] Visualización de proveedores y disponibilidad
- [x] Datos de prueba cargados
- [x] Integración completa con RLS

### FASE 3: Motor de Gobernanza ✅ COMPLETADA
- [x] Tabla `data_transactions` con máquina de estados (8 estados)
- [x] Tabla `approval_history` con acciones pre_approve/approve/deny
- [x] Tabla `data_policies` con políticas ODRL 2.0 en JSON
- [x] Wizard de solicitud (5 pasos) con validación Zod
- [x] Dashboard contextual `/requests` con tabs por rol
- [x] Sistema de aprobaciones multi-actor (Subject → Holder)
- [x] Generación automática de políticas ODRL
- [x] Función DB `get_pending_transactions()` para consultas eficientes
- [x] RLS policies completas para multi-tenancy
- [x] Integración completa con catálogo (botón "Solicitar Datos" funcional)

### FASE 4: Visualización y Exportación ✅ COMPLETADA
- [x] Tabla `supplier_data` con estructura Tabla VI.B del documento
- [x] Tabla `erp_configurations` para gestión de APIs ERP
- [x] Tabla `export_logs` para auditoría de exportaciones
- [x] Página `/data/view/:transaction_id` con tabla interactiva
- [x] Exportación a CSV con descarga automática
- [x] Página `/settings/erp-config` para configurar integraciones
- [x] Selector de configuración ERP para envío de datos
- [x] RLS policies para datos sensibles de proveedores
- [x] Visualización solo para transacciones completadas
- [x] Logs de exportación (CSV, JSON, ERP)

### FASE 5: Integraciones Externas ✅ COMPLETADA (Parcial)
- [x] Edge Function `erp-api-tester` - Test real de conexión a APIs ERP
- [x] Edge Function `erp-data-uploader` - Envío real de datos a ERP
- [x] Edge Function `notification-handler` - Sistema de notificaciones por email
- [x] Integración con Resend para envío de emails
- [x] Notificaciones automáticas en cambios de estado
- [x] Test de conexión funcional desde página de configuración
- [x] Envío real a ERP desde visualización de datos
- [x] Logs de auditoría de todas las operaciones
- [ ] Integración con EDC (Eclipse Dataspace Connector) - Requiere infraestructura externa
- [ ] Integración con SSI Wallet - Requiere infraestructura Gaia-X externa
- [ ] Edge Function `catalog-sync` - Sincronización con catálogo externo

**Nota**: EDC y SSI Wallet requieren sistemas externos que deben ser mockeados o integrados según disponibilidad de infraestructura.

### FASE 6: Refinamiento y Optimización - PRÓXIMO

## 🔐 Seguridad Implementada

### Medidas de Seguridad:
1. **Roles en tabla separada**: Previene escalación de privilegios
2. **RLS en todas las tablas**: Aislamiento multi-tenant
3. **Funciones SECURITY DEFINER**: Evitan recursión en policies
4. **Validación server-side**: No confiamos en cliente
5. **Autenticación requerida**: Todas las rutas críticas protegidas

### Advertencias Importantes:
- ⚠️ Nunca verificar roles desde localStorage/sessionStorage
- ⚠️ Siempre usar `has_role()` para verificación de permisos
- ⚠️ No exponer auth.users directamente (usar user_profiles)
- ⚠️ Mantener user_id NOT NULL en tablas con RLS

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 📊 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes shadcn
│   ├── ProtectedRoute.tsx
│   └── NavLink.tsx
├── hooks/
│   └── useAuth.tsx      # Hook de autenticación
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts     # Types auto-generados
├── pages/
│   ├── Index.tsx        # Redirect a dashboard
│   ├── Auth.tsx         # Login/Registro
│   ├── Dashboard.tsx    # Dashboard principal
│   ├── Catalog.tsx      # Catálogo de datos
│   ├── ProductDetail.tsx # Detalle de producto
│   ├── Requests.tsx     # Gestión de solicitudes
│   ├── RequestWizard.tsx # Wizard de solicitud (5 pasos)
│   ├── DataView.tsx     # Visualización de datos recibidos
│   ├── ERPConfig.tsx    # Configuración de ERP
│   └── NotFound.tsx
├── App.tsx
├── index.css            # Design system
└── main.tsx

supabase/
└── config.toml
```

## 🎯 Estado Actual

**Fase 1 (Fundación): ✅ 100% COMPLETA**
- Base de datos configurada
- Autenticación funcional
- Routing implementado
- Sistema de roles operativo
- Seguridad RLS activa

**Fase 2 (Catálogo de Datos): ✅ 100% COMPLETA**
- Tablas de productos, activos y metadatos creadas
- Página de catálogo con búsqueda y filtros
- Página de detalle de producto con proveedores
- Datos de prueba cargados (4 productos, 5 activos)
- RLS policies implementadas

**Fase 3 (Motor de Gobernanza): ✅ 100% COMPLETA**
- Tablas de transacciones, historial y políticas creadas
- Wizard de solicitud de 5 pasos con validación
- Dashboard de solicitudes contextual por rol
- Sistema de aprobaciones Subject → Holder
- Generación automática de políticas ODRL 2.0
- Máquina de estados con 8 estados
- Función DB para consultas eficientes
- Integración completa con catálogo

**Fase 4 (Visualización y Exportación): ✅ 100% COMPLETA**
- Tablas de datos de proveedores y configuraciones ERP
- Página de visualización con tabla interactiva
- Exportación a CSV funcional
- Página de configuración de ERP con gestión de endpoints
- Sistema de logs de exportación
- RLS policies para datos sensibles
- Integración con requests (Ver Datos Recibidos)

**Fase 5 (Integraciones Externas): ✅ COMPLETADA (Parcial)**
- Edge Functions para ERP (tester y uploader) funcionando
- Sistema de notificaciones por email con Resend
- Test de conexión real a APIs ERP
- Envío de datos a ERP configurado
- Notificaciones automáticas en flujo de aprobaciones
- Pendiente: EDC y SSI Wallet (requieren infraestructura externa)

**Próximo Objetivo**: Fase 6 (Refinamiento: UX/UI polish, Dashboard mejorado, Páginas de detalle)
