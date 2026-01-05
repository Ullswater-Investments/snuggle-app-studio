# PROCUREDATA v3.0 - Auditoría de Migración Web3

**Fecha de Auditoría**: 2026-01-05  
**Auditado por**: Lead QA Engineer  
**Scope**: Migración Web2 → Web3 Híbrido (Pontus-X, SSI, Realtime)

---

## 🔴 PRIORIDAD CRÍTICA (Rompe la app o inseguro)

### Autenticación y Seguridad

- [ ] **src/hooks/useAuth.tsx**: El contexto de autenticación NO incluye información de wallet (did, wallet_address). El usuario puede tener email pero no identidad Web3 asociada.  
  **Actualizar**: Añadir campos `walletAddress` y `did` al AuthContextType y sincronizar con useWeb3Wallet.

- [ ] **src/components/PaymentGateway.tsx**: El botón "Pagar" ejecuta una simulación sin integración con pontusXService.  
  **Actualizar**: Conectar el método de pago "Wallet" con el servicio pontusXService para transacciones reales con EUROe.

- [ ] **src/pages/ProductDetail.tsx**: El botón "Comprar Ahora" (línea 351) navega al wizard sin verificar si el usuario tiene wallet conectada.  
  **Actualizar**: Verificar `wallet.isConnected` antes de permitir la compra y mostrar prompt de conexión si no está conectada.

- [ ] **src/pages/Auth.tsx**: Formularios de login/registro sin validación Zod. Solo validación HTML básica (required, minLength).  
  **Actualizar**: Implementar esquema Zod completo para email y password.

- [ ] **src/pages/SettingsOrganization.tsx**: El formulario usa `react-hook-form` sin validación Zod. El `onSubmit` no valida datos antes de enviar a Supabase.  
  **Actualizar**: Añadir zodResolver con esquema de validación.

### Datos y Trazabilidad

- [ ] **src/pages/Data.tsx**: La página lista datasets adquiridos pero NO muestra columna de verificación blockchain ni integra DataLineageBlockchain.  
  **Actualizar**: Añadir indicador de estado de verificación Web3 en cada card.

---

## 🟡 PRIORIDAD ALTA (UX inconsistente)

### Botones sin Confirmación o Loading

- [ ] **src/pages/Requests.tsx (líneas 157-163)**: Los handlers `handleApprove` y `handleDeny` ejecutan mutaciones sin estado de loading visual en los botones específicos.  
  **Actualizar**: Añadir `isPending` por transacción o usar estado local.

- [ ] **src/pages/Opportunities.tsx (línea 301)**: El botón "Proponer mis Datos" ejecuta `handleProposal` que solo muestra un toast sin ninguna acción real ni confirmación previa.  
  **Actualizar**: Implementar AlertDialog de confirmación y lógica real de envío.

- [ ] **src/components/TeamManagement.tsx**: Revisar si las acciones de "Revocar" y "Cambiar Rol" tienen confirmación.  
  **Actualizar**: Los botones críticos de gestión de equipo deben tener doble confirmación.

### Preferencias Sin Persistencia

- [ ] **src/pages/SettingsPreferences.tsx**: Los Switch de preferencias NO están conectados a estado ni persisten en base de datos. Son decorativos.  
  **Actualizar**: Conectar con hook usePrivacyPreferences o crear tabla user_preferences en Supabase.

### Navegación y Flujo

- [ ] **src/pages/RequestWizard.tsx**: El header del wizard tiene navegación manual propia en lugar de usar AppLayout.  
  **Actualizar**: Evaluar si es intencional o debería usar layout estándar.

- [ ] **src/App.tsx**: La ruta `/whitepaper` es pública. Considerar si debería estar protegida para usuarios registrados.

### Componentes Legacy

- [ ] **src/components/DataLineage.tsx**: Existe junto a DataLineageBlockchain.tsx. Revisar si DataLineage.tsx sigue usándose o es código muerto tras la migración.

---

## 🔵 MEJORAS RECOMENDADAS (Refactorización)

### Console.logs en Producción

- [ ] **src/hooks/useNotifications.tsx (línea 20)**: `console.log("Notification sent:", data);` - Eliminar o reemplazar por logging estructurado.

- [ ] **src/components/NotificationsBell.tsx (línea 49)**: `console.log('Nueva notificación:', payload);` - Eliminar en producción.

- [ ] **src/components/CodeIntegrationModal.tsx (línea 42)**: Código de ejemplo incluye `console.log(data);` - Mantener solo en ejemplos de documentación.

### Web3 Readiness - Componentes Desconectados

- [ ] **src/components/PaymentGateway.tsx**: La pestaña "Wallet" muestra saldo estático hardcodeado ("€85,420.00").  
  **Actualizar**: Leer balance real desde useWeb3Wallet.

- [ ] **src/pages/Dashboard.tsx**: Dashboard financiero no muestra información de wallet ni balance de tokens.  
  **Actualizar**: Añadir widget de estado Web3 para usuarios con wallet conectada.

- [ ] **src/pages/Catalog.tsx**: Las tarjetas de productos no muestran si la compra requiere wallet.  
  **Actualizar**: Añadir indicador visual para productos que requieren pago con EUROe.

### Patrones de Polling vs Realtime

- [ ] **src/pages/InnovationLab.tsx**: Usa `setInterval` para simular carga de AI. Aceptable para simulación UI pero documentar que no es polling de datos.

- [ ] **src/components/ActivityFeed.tsx**: Usa React Query pero NO tiene suscripción Realtime. Las actividades no se actualizan automáticamente.  
  **Actualizar**: Añadir suscripción Supabase Realtime como en NotificationsBell.

### Estilos y Consistencia

- [ ] **Varios componentes**: Algunos usan clases Tailwind directas mientras otros usan variantes de shadcn/ui. Revisar consistencia en uso de `variant="destructive"` vs clases hardcodeadas.

- [ ] **src/pages/RequestWizard.tsx**: Clase `.procuredata-gradient` definida en CSS global. Evaluar migración a variable de diseño de Tailwind.

### Componentes Sin Usar (Potencial Código Muerto)

- [ ] **src/pages/Index.tsx**: Verificar si se usa o es reemplazado por Landing.tsx.

- [ ] **src/components/SmartContractViewer.tsx**: Revisar si está integrado en alguna vista o es placeholder.

---

## Orden de Corrección Recomendado

```
1. useAuth + useWeb3Wallet Integration
         ↓
2. PaymentGateway + pontusXService
         ↓
3. ProductDetail Wallet Check
         ↓
4. Auth.tsx Zod Validation
         ↓
5. SettingsOrganization Validation
         ↓
6. SettingsPreferences Persistence
         ↓
7. ActivityFeed Realtime
         ↓
8. Console.log Cleanup
```

---

## Progreso

| Categoría | Total | Completados | Pendientes |
|-----------|-------|-------------|------------|
| 🔴 Crítico | 6 | 0 | 6 |
| 🟡 Alto | 6 | 0 | 6 |
| 🔵 Mejoras | 10 | 0 | 10 |
| **Total** | **22** | **0** | **22** |

---

*Última actualización: 2026-01-05*
