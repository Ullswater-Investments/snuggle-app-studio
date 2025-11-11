# 🎭 Modo Demostración - PROCUREDATA

## Descripción General

El **Modo Demo** permite explorar todas las funcionalidades de PROCUREDATA sin afectar datos de producción. El usuario demo tiene acceso a múltiples organizaciones, permitiendo experimentar con los tres roles del sistema.

## Acceso Rápido

### Opción 1: Botón Demo (Recomendado)
1. Ir a la página de login: `/auth`
2. Hacer clic en el botón **🎭 Acceder a Versión Demo**
3. El sistema automáticamente:
   - Registra el usuario demo si no existe
   - Hace login automático
   - Configura 6 organizaciones con sus roles
   - **Inserta 5 transacciones en diferentes estados**
   - **Crea 4 registros de datos de proveedores**
   - **🎯 Inicia el tour guiado automáticamente**
   
Todo el entorno demo se configura en segundos sin intervención manual.

### 🎓 Tour Guiado Interactivo

Al primer login, se activa automáticamente un **tour guiado** de 6 pasos que te muestra:

1. **Bienvenida**: Introducción al sistema y datos demo disponibles
2. **Selector de Organización**: Cómo cambiar entre las 6 organizaciones
3. **Solicitudes Pendientes**: Dónde ver y aprobar transacciones
4. **Visualización de Datos**: Acceso a datos de transacciones completadas
5. **Catálogo**: Exploración de activos y creación de solicitudes
6. **Escenarios Recomendados**: Guía de flujos completos

**Características del Tour:**
- ✨ Resaltado visual de elementos importantes
- 📊 Información contextual en cada paso
- ⏭️ Navegación: Siguiente, Atrás, Saltar
- 🔄 Reiniciable en cualquier momento desde el botón de ayuda (?)
- 💾 Se marca como completado automáticamente

**Reiniciar el Tour:**
- Hacer clic en el botón de ayuda (?) en el header
- Seleccionar "Reiniciar Tour Guiado"
- O eliminar `demo-tour-completed` de localStorage

### Opción 2: Credenciales Manuales
- **Email**: `demo@procuredata.app`
- **Contraseña**: `demo123456`

## Datos Demo Incluidos

### 🏢 Organizaciones (6)
El usuario demo tiene acceso inmediato a 6 organizaciones:

### Consumers (Consumidores de Datos)
1. **NovaTech Solutions S.L.**
   - Rol: Usuario
   - Puede crear solicitudes de datos

2. **Fabricaciones Reunidas S.A.U.**
   - Rol: Usuario
   - Puede crear solicitudes de datos

### Holders (Poseedores de Datos)
3. **ACME Industrial S.L.**
   - Rol: Admin
   - Puede aprobar como poseedor final
   - Tiene activos de datos disponibles

4. **Gestión Logística Global S.A.**
   - Rol: Admin
   - Puede aprobar como poseedor final
   - Tiene activos de datos disponibles

### Providers (Sujetos de Datos - Proveedores)
5. **Tornillería TÉCNICA S.A.**
   - Rol: Admin
   - Puede pre-aprobar como sujeto de datos

6. **Soluciones Químicas del Sur S.L.**
   - Rol: Admin
   - Puede pre-aprobar como sujeto de datos

### 📊 Transacciones (5)
El sistema incluye automáticamente 5 transacciones en diferentes estados:

1. **Estado: `initiated`** (Recién creada)
   - Consumer: NovaTech → Proveedor: Innovatec → Holder: ACME
   - Propósito: Homologación de proveedor electrónico

2. **Estado: `pending_subject`** (Esperando pre-aprobación)
   - Consumer: NovaTech → Proveedor: Tornillería → Holder: ACME
   - Propósito: Alta de nuevo proveedor en sistema ERP
   - ✨ Prueba el flujo desde el rol de Tornillería

3. **Estado: `pending_holder`** (Esperando aprobación final)
   - Consumer: Fabricaciones → Proveedor: Soluciones Químicas → Holder: Logística
   - Propósito: Validación ISO 14001
   - ✨ Prueba el flujo desde el rol de Gestión Logística

4. **Estado: `approved`** (Aprobada, lista para completar)
   - Consumer: Fabricaciones → Proveedor: Tornillería → Holder: ACME
   - Propósito: Alta urgente de proveedor metalúrgico

5. **Estado: `completed`** ✅ (Completada con datos disponibles)
   - Consumer: Energías Renovables → Proveedor: Biocen → Holder: FarmaGlobal
   - Propósito: Evaluación de proveedor biotecnológico
   - ✨ Ver datos en `/data-view` como Energías Renovables

### 📋 Datos de Proveedores (4)
Información completa de 4 proveedores vinculada a las transacciones:
- Biocen S.A. (transacción completada)
- Tornillería TÉCNICA S.A. (2 transacciones)
- Soluciones Químicas del Sur S.L.

## Flujo de Demostración Completo

### Escenario 1: Explorar Transacción en `pending_subject`

**Objetivo**: Pre-aprobar una solicitud como proveedor (Subject)

1. **Login con el botón demo**
2. **Como Tornillería TÉCNICA** (ya activo por defecto o cambiar):
   - Ir a `/requests`
   - Ver transacción: "Alta de nuevo proveedor en sistema ERP"
   - Estado actual: `pending_subject` (esperando tu pre-aprobación)
   - Hacer clic en "Aprobar"
   - ✅ Estado cambia a `pending_holder`

3. **Como ACME Industrial**:
   - Cambiar organización a "ACME Industrial S.L."
   - Ir a `/requests`
   - Ver la misma transacción ahora en `pending_holder`
   - Aprobar → Estado cambia a `approved`

4. **Volver a NovaTech**:
   - Cambiar a "NovaTech Solutions S.L."
   - Ver la transacción aprobada
   - Ir a `/data-view` para ver los datos

### Escenario 2: Consultar Datos Completados

**Objetivo**: Ver y exportar datos de una transacción completada

1. **Como Energías Renovables del Este**:
   - Login con el botón demo
   - Cambiar a organización: "Energías Renovables del Este S.A."
   - Ir a `/data-view`
   - Ver datos completos de **Biocen S.A.** (transacción completada)
   - Exportar a CSV
   - (Opcional) Enviar a ERP si tienes configuración

### Escenario 3: Crear Nueva Solicitud

**Objetivo**: Crear una solicitud completa desde cero

1. **Como Consumer**:
   - Cambiar a "NovaTech Solutions S.L." o "Fabricaciones Reunidas"
   - Ir a `/catalog`
   - Explorar activos disponibles
   - Seleccionar un activo
   - Ir a `/request-wizard`
   - Completar los 5 pasos del wizard
   - Enviar solicitud

### Escenario 4: Configuración ERP

1. Cambiar a cualquier organización con rol Admin
2. Ir a `/settings/erp-config`
3. Crear nueva configuración ERP
4. Probar conexión
5. Enviar datos de transacciones completadas

## Indicadores Visuales

### Banner de Demostración
- Un banner amarillo aparece en la parte superior de todas las páginas
- Texto: "🎭 MODO DEMOSTRACIÓN - Los datos mostrados son sintéticos y no afectan al entorno de producción"

### Selector de Organización
- Ubicado en el header, al lado del email del usuario
- Muestra la organización activa y su rol
- Permite cambiar rápidamente entre organizaciones
- Las organizaciones demo tienen un badge "Demo"

### Botón de Ayuda (?)
- Ubicado en el header del dashboard
- Permite reiniciar el tour guiado
- Muestra escenarios rápidos de uso
- Siempre disponible en modo demo

## Datos Sintéticos Incluidos

### Organizaciones
- **30+ organizaciones demo** distribuidas en:
  - 9 Consumers
  - 9 Holders  
  - 12 Providers

### Productos de Datos
- "Alta de Proveedor - Datos Básicos"
- Esquema definido para información de proveedores

### Activos de Datos
- 10 activos vinculados a diferentes holders
- Metadatos de catálogo configurados
- Categorías y tags para búsqueda

### Transacciones
- Transacciones en diferentes estados:
  - `pending_subject`: Esperando pre-aprobación del proveedor
  - `pending_holder`: Esperando aprobación final del poseedor
  - `completed`: Transacción completada con datos disponibles
  - `approved`: Aprobada y lista para completar
  - `initiated`: Recién creada

### Datos de Proveedores
- Información completa de proveedores (supplier_data):
  - Nombre comercial y legal
  - NIF/CIF
  - Direcciones fiscal y legal
  - Contactos
  - Administradores legales

## Arquitectura Técnica

### Tour Guiado
- **Librería**: react-joyride
- **Componente**: `DemoTour.tsx`
- **Activación**: Automática al primer login del usuario demo en `/dashboard`
- **Persistencia**: localStorage key `demo-tour-completed`
- **Pasos**: 6 pasos interactivos con navegación
- **Estilos**: Personalizados según el tema de la aplicación
- **Localización**: Textos en español

### Base de Datos
- Campo `is_demo` en tabla `organizations` identifica organizaciones demo
- Mismo esquema y RLS que producción
- Aislamiento lógico, no físico

### Autenticación
- Usuario demo creado automáticamente al hacer clic en el botón
- Trigger `on_demo_user_created` configura perfiles y roles automáticamente
- Constraints únicos previenen duplicados

### Contexto de Organización
- Hook `useOrganizationContext` gestiona la organización activa
- Estado almacenado en `sessionStorage`
- Cambio de contexto sin necesidad de logout/login

## Limitaciones del Modo Demo

1. **No se pueden eliminar organizaciones demo** (tienen `is_demo = true`)
2. **Los datos son sintéticos** - nombres, direcciones y contactos son ficticios
3. **El usuario demo no puede modificar su email o contraseña**
4. **Las notificaciones por email** se envían pero a direcciones ficticias

## Testing y Desarrollo

### Resetear Usuario Demo
Si necesitas resetear el usuario demo:

```sql
-- Eliminar perfiles y roles
DELETE FROM user_roles 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'demo@procuredata.app');

DELETE FROM user_profiles 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'demo@procuredata.app');

-- El trigger recreará automáticamente los perfiles en el próximo login
```

### Agregar Más Organizaciones Demo
Para agregar una nueva organización al usuario demo, editar la función `setup_demo_user()` en la migración.

## Soporte

Para preguntas sobre el modo demo:
1. Revisar este documento
2. Consultar `ARCHITECTURE.md` para detalles técnicos
3. Ver `scripts/setup-demo-user.sql` para el script manual de configuración

---

**Nota**: El modo demo está diseñado para evaluación y demostración. Para uso en producción, crear usuarios y organizaciones reales con datos verificados.
