# 11 - Integración Técnica y Seguridad para Desarrolladores

> Basado en Documento Explicativo 9
> Referencia técnica para equipos de IT: APIs, Webhooks, SDKs y seguridad.

---

## 1. Arquitectura de la API REST

### Especificaciones Técnicas

| Aspecto | Detalle |
|---------|---------|
| **Formato** | REST con JSON-LD para interoperabilidad semántica (Linked Data) |
| **Producción** | `https://api.procuredata.eu/v1` |
| **Sandbox** | `https://sandbox.api.procuredata.eu/v1` |
| **Autenticación** | API Keys de organización + tokens JWT en header `Authorization: Bearer <token>` |
| **Rate Limiting** | 1000 peticiones/minuto para Pro, error HTTP 429 si se excede |

### Códigos de Estado Comunes

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 401 | Unauthorized - Token inválido o expirado |
| 403 | Forbidden - Sin permisos para el recurso |
| 429 | Too Many Requests - Límite de peticiones excedido |
| 500 | Server Error - Error interno |

---

## 2. Webhooks: Arquitectura Orientada a Eventos

Notificaciones en tiempo real sin polling constante a tus servidores.

### Eventos Disponibles

| Evento | Descripción |
|--------|-------------|
| `transaction.completed` | Intercambio de datos finalizado con éxito |
| `provider.approved` | Un proveedor autorizó tu solicitud de acceso |
| `kyb.status_changed` | Validación legal aprobada o rechazada |
| `wallet.low_balance` | Saldo EUROe insuficiente para operar |

### Seguridad de Webhooks
- Firma `X-ProcureData-Signature` con HMAC-SHA256
- Verificar legitimidad antes de procesar
- Timeout de 30 segundos para respuesta

---

## 3. SDKs y Librerías Oficiales

Kits de desarrollo que encapsulan llamadas API y gestión de firmas digitales.

### Lenguajes Soportados

| Lenguaje | Uso Recomendado | Instalación |
|----------|-----------------|-------------|
| **JavaScript/TypeScript** | Node.js, React, aplicaciones web | `npm install @procuredata/sdk-js` |
| **Python** | Analítica, Data Science | `pip install procuredata` |
| **Java** | Entornos corporativos | Maven/Gradle |

### Componentes UI React
- Botón "Pagar con EUROe"
- Visor "Pasaporte Digital de Proveedor"
- Widget de Health Score

---

## 4. Seguridad Avanzada y DevSecOps

### Principios de Seguridad

| Principio | Implementación |
|-----------|----------------|
| **Zero Trust** | Cada petición validada individualmente con tokens temporales |
| **Row Level Security (RLS)** | Imposible leer datos de otra organización por diseño |
| **Cifrado en tránsito** | TLS 1.3 |
| **Cifrado en reposo** | AES-256 |
| **Gestión de secretos** | HSM o bóvedas cifradas, nunca en texto plano |

### Checklist de Seguridad para Integraciones
- [ ] Almacenar API Keys en variables de entorno
- [ ] Validar firmas de webhooks
- [ ] Implementar retry con backoff exponencial
- [ ] Registrar logs de auditoría
- [ ] Rotar credenciales periódicamente

---

## 5. Endpoints Críticos

### Endpoints de Uso Frecuente

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/organizations/search` | Buscar proveedores por sector o certificación |
| POST | `/transactions/initiate` | Iniciar flujo de compra de activo de datos |
| GET | `/wallets/balance` | Consultar saldo disponible en EUROe |
| GET | `/transactions/{id}/payload` | Recuperar contenido final tras transacción completada |

### Ejemplo de Petición
```bash
curl -X POST https://api.procuredata.eu/v1/transactions/initiate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "asset_id": "uuid-del-activo",
    "purpose": "homologación",
    "justification": "Validación anual de proveedor"
  }'
```

---

## 6. Reglas de Respuesta para ARIA

### Triggers Técnicos
- "API" / "endpoint" → Proporcionar documentación técnica
- "webhook" → Explicar eventos y seguridad
- "SDK" → Indicar instalación según lenguaje
- "seguridad" / "RLS" → Describir principios de protección

### Frases Sugeridas
- "Puedes instalar el SDK de JavaScript con `npm install @procuredata/sdk-js`."
- "Los webhooks se firman con HMAC-SHA256 para garantizar su autenticidad."
- "El Row Level Security garantiza que cada organización solo vea sus propios datos."
