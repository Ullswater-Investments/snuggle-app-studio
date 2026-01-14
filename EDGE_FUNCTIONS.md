# Edge Functions - PROCUREDATA

## 📋 Funciones Implementadas

### 1. erp-api-tester
**Ruta**: `supabase/functions/erp-api-tester/index.ts`  
**Autenticación**: Requiere JWT (usuario autenticado)

**Propósito**: Probar la conexión a APIs ERP configuradas antes de enviar datos reales.

**Request Body**:
```json
{
  "configId": "uuid-de-configuracion-erp"
}
```

**Response**:
```json
{
  "success": true,
  "status": "success",
  "message": "Connection successful",
  "tested_url": "https://api.ejemplo-erp.com/v1/suppliers",
  "auth_method": "api_key"
}
```

**Funcionalidad**:
- Obtiene la configuración ERP de la base de datos
- Prepara headers según método de autenticación (Bearer, API Key, Basic, OAuth)
- Realiza un HEAD request al endpoint configurado
- Actualiza `last_test_date` y `last_test_status` en la BD
- Maneja errores de conexión y timeouts

**Seguridad**:
- ✅ Verifica que el usuario esté autenticado
- ✅ RLS policies garantizan acceso solo a configs de su organización
- ✅ No expone credenciales en logs

---

### 2. erp-data-uploader
**Ruta**: `supabase/functions/erp-data-uploader/index.ts`  
**Autenticación**: Requiere JWT (usuario autenticado)

**Propósito**: Enviar datos reales de proveedores a sistemas ERP externos configurados.

**Request Body**:
```json
{
  "transactionId": "uuid-de-transaccion",
  "erpConfigId": "uuid-de-configuracion-erp"
}
```

**Response**:
```json
{
  "success": true,
  "status": "success",
  "message": "Data uploaded to ERP successfully",
  "records_sent": 5
}
```

**Funcionalidad**:
- Obtiene datos del proveedor desde `supplier_data`
- Obtiene configuración ERP activa
- Prepara headers según método de autenticación
- Aplica field mapping si está configurado (transformación de campos)
- Envía POST request con los datos al ERP
- Registra log de exportación en `export_logs`
- Maneja errores y reintentos

**Seguridad**:
- ✅ Verifica autenticación del usuario
- ✅ Solo envía datos de transacciones de la organización del usuario
- ✅ RLS policies protegen acceso a datos sensibles
- ✅ Registra auditoría de todas las operaciones

**Field Mapping**:
Si `erp_configurations.field_mapping` contiene un JSON, la función puede transformar los campos antes de enviarlos. Ejemplo:
```json
{
  "company_name": "supplier_name",
  "tax_id": "vat_number",
  "contact_person_email": "primary_email"
}
```

---

### 3. notification-handler
**Ruta**: `supabase/functions/notification-handler/index.ts`  
**Autenticación**: No requiere JWT (función pública con validación interna)

**Propósito**: Enviar notificaciones por email cuando cambia el estado de una transacción.

**Request Body**:
```json
{
  "transactionId": "uuid-de-transaccion",
  "eventType": "created" | "pre_approved" | "approved" | "denied" | "completed"
}
```

**Response**:
```json
{
  "success": true,
  "event": "created",
  "recipients": 2,
  "sent": 2,
  "failed": 0
}
```

**Eventos y Destinatarios**:

| Evento | Destinatario | Trigger |
|--------|--------------|---------|
| `created` | Subject (Proveedor) | Consumer crea solicitud |
| `pre_approved` | Holder (Poseedor) | Subject pre-aprueba |
| `approved` | Consumer (Solicitante) | Holder aprueba |
| `denied` | Consumer (Solicitante) | Subject o Holder deniega |
| `completed` | Consumer (Solicitante) | Transacción completada |

**Templates de Email**:
- Cada evento tiene un template HTML específico
- Incluye detalles de la transacción (producto, propósito, organizaciones)
- Branding: "PROCUREDATA" como remitente

**Funcionalidad**:
- Obtiene la transacción completa con relaciones
- Identifica destinatarios según el evento y organización
- Usa `auth.admin.getUserById()` para obtener emails (requiere SERVICE_ROLE_KEY)
- Envía emails usando Resend API directamente (fetch a https://api.resend.com/emails)
- Maneja múltiples destinatarios con Promise.allSettled
- Registra éxito/fallo de cada envío

**Seguridad**:
- ⚠️ Función pública (verify_jwt = false) pero validación interna
- ✅ Usa SERVICE_ROLE_KEY para acceso a auth.users
- ✅ No expone datos sensibles en logs
- ✅ Rate limiting recomendado en producción

---

## 🔧 Configuración Requerida

### 1. Resend API Key
Para enviar notificaciones por email, necesitas:
1. Crear cuenta en [Resend.com](https://resend.com)
2. **CRÍTICO**: Verificar tu dominio en [Resend Domains](https://resend.com/domains)
3. Crear un API key en [Resend API Keys](https://resend.com/api-keys)
4. El API key ya está configurado como secret `RESEND_API_KEY`

**Importante**: Sin verificar el dominio, los emails solo se pueden enviar a direcciones de prueba.

### 2. Actualizar el remitente de emails
En producción, cambiar:
```typescript
from: "PROCUREDATA <onboarding@resend.dev>"
```
Por:
```typescript
from: "PROCUREDATA <notificaciones@tu-dominio.com>"
```

### 3. Secrets de Supabase Configurados
- ✅ `RESEND_API_KEY` - Para envío de emails
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Para acceso a auth.users (auto-configurado)

---

## 🚀 Uso desde el Frontend

### Test de Conexión ERP
```typescript
const { data, error } = await supabase.functions.invoke("erp-api-tester", {
  body: { configId: "uuid-config" }
});
```

### Envío de Datos a ERP
```typescript
const { data, error } = await supabase.functions.invoke("erp-data-uploader", {
  body: {
    transactionId: "uuid-transaction",
    erpConfigId: "uuid-config"
  }
});
```

### Envío de Notificación
```typescript
const { data, error } = await supabase.functions.invoke("notification-handler", {
  body: {
    transactionId: "uuid-transaction",
    eventType: "created"
  }
});
```

---

## 🔍 Debugging

### Ver Logs de Edge Functions
En el panel de control:
1. Ve a Cloud tab
2. Selecciona "Functions"
3. Busca logs de cada función

### Errores Comunes

**1. "Domain not verified" en Resend**
- Solución: Verificar dominio en https://resend.com/domains

**2. "Unauthorized" en erp-api-tester**
- Solución: Verificar que el usuario esté autenticado
- La función requiere JWT válido

**3. "Configuration not found"**
- Solución: Verificar que la configuración ERP exista y esté activa
- Verificar RLS policies si el usuario no puede acceder

**4. "Connection timeout" en ERP**
- Solución: Verificar que la URL del ERP sea correcta
- Verificar que el ERP esté accesible desde internet

---

## 🎯 Próximas Mejoras (Fase 6)

- [ ] Implementar reintentos automáticos con exponential backoff
- [ ] Sistema de webhooks para notificaciones bidireccionales
- [ ] Cache de configuraciones ERP para mejor performance
- [ ] Validación de schemas antes de enviar a ERP
- [ ] Dashboard de monitoreo de Edge Functions
- [ ] Rate limiting y throttling
- [ ] Encriptación de credenciales con Supabase Vault
