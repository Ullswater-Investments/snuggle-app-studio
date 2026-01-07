# 08 - Guía de Usuario, Interfaz y Soporte

> Basado en Documento Explicativo 6
> Manual de consulta rápida para navegación, gestión de usuarios y resolución de incidencias.

---

## 1. Navegación y Elementos de la Interfaz

La plataforma ProcureData ofrece una experiencia de usuario **intuitiva** dividida en secciones clave:

### Componentes Principales

| Elemento | Descripción |
|----------|-------------|
| **Dashboard Principal** | Centro de mando con balance de Wallet, Health Score y transacciones recientes |
| **Barra Lateral (Sidebar)** | Acceso rápido a Marketplace, Catálogo de Servicios, Innovation Lab y Configuración |
| **Centro de Notificaciones** | Icono de campana para aprobaciones pendientes, mensajes y alertas de saldo |
| **Selector de Organización** | Alterna entre empresas sin necesidad de cerrar sesión |
| **Modo Visual** | Soporta modo claro y oscuro configurable desde ajustes de perfil |

---

## 2. Gestión de Equipos y Roles (RBAC)

El sistema utiliza un modelo de **Control de Acceso Basado en Roles (RBAC)** para garantizar la seguridad operativa.

### Roles Disponibles

| Rol | Descripción | Permisos Clave |
|-----|-------------|----------------|
| **Administrador (Admin)** | Control total | Invitar/eliminar usuarios, configurar integraciones ERP, gestionar Wallet corporativa |
| **Aprobador (Approver)** | Perfil operativo | Autorizar o denegar solicitudes de intercambio de datos |
| **Lector (Viewer)** | Acceso restringido | Consultar marketplace e historial, sin pagos ni aprobaciones |

### Asignación de Roles
- Solo los Administradores pueden asignar roles
- Cada usuario puede tener un rol por organización
- Es posible pertenecer a múltiples organizaciones con roles diferentes

---

## 3. Uso Eficiente del Marketplace

Para encontrar información precisa entre miles de proveedores, utiliza los **filtros avanzados**:

### Filtros Disponibles

1. **Filtro de Certificación**
   - Segmenta por normativas ISO 9001, ISO 14001
   - Incluye certificaciones sectoriales específicas

2. **Badge Green Partner**
   - Identifica proveedores con auditoría de sostenibilidad aprobada
   - Verificación realizada por ProcureData

3. **Reputation Score**
   - Ordena por valoración (1-5 ⭐)
   - Incluye historial de cumplimiento registrado en blockchain

---

## 4. Resolución de Errores Comunes

### Tabla de Errores y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| **Fondos Insuficientes** | Saldo EUROe menor al coste | Recargar desde la sección Wallet |
| **Entidad No Verificada (KYB)** | Acceso al marketplace bloqueado | Subir CIF y documentación en Ajustes de Organización |
| **Transacción en Espera** | Solicitud no avanza | Revisar si falta aprobación del Provider o Data Holder |
| **Error de API (Invalid API Key)** | ERP no conecta | Regenerar llave y verificar endpoint |
| **Límite de Peticiones (Rate Limit)** | Rate Limit Exceeded | Esperar 60 segundos antes de reintentar |

---

## 5. Canales de Soporte y Ayuda

Si un problema persiste, la plataforma ofrece los siguientes recursos:

### Opciones de Soporte

| Canal | Disponibilidad | Descripción |
|-------|----------------|-------------|
| **ARIA** | 24/7 | Asistente Virtual para dudas sobre servicios, precios y navegación |
| **Centro de Ayuda** | /docs | Documentación técnica completa y guías paso a paso |
| **Soporte Técnico** | Email | Respuesta < 4 horas para usuarios Pro (Nivel 1) |
| **Reporte de Errores** | Directo | Botón en footer para enviar capturas y logs al equipo |

---

## 6. Reglas de Respuesta para ARIA

### Triggers de Interfaz
- "no encuentro" → Guiar al Dashboard o sección específica
- "error" / "no funciona" → Consultar tabla de errores comunes
- "rol" / "permiso" → Explicar sistema RBAC
- "wallet" / "saldo" → Indicar cómo recargar

### Frases Sugeridas
- "Puedes acceder a [X] desde el menú lateral izquierdo."
- "Ese error suele resolverse con [solución]. ¿Lo intentamos?"
- "Como Viewer no puedes aprobar transacciones. Un Admin puede cambiar tu rol."
