# PROCUREDATA v3.0 - Auditoría de Migración Web3

**Fecha de Auditoría**: 2026-01-05  
**Auditado por**: Lead QA Engineer  
**Scope**: Migración Web2 → Web3 Híbrido (Pontus-X, SSI, Realtime)

---

## 🔴 PRIORIDAD CRÍTICA (Rompe la app o inseguro)

### Autenticación y Seguridad

- [x] **src/hooks/useAuth.tsx**: ~~El contexto de autenticación NO incluye información de wallet (did, wallet_address).~~  
  ✅ **COMPLETADO (Lote 1)**: Añadidos campos `walletAddress`, `did`, `isWeb3Connected`, `connectWallet` y `disconnectWallet` al AuthContextType. Integración completa con useWeb3Wallet.

- [x] **src/components/PaymentGateway.tsx**: ~~El botón "Pagar" ejecuta una simulación sin integración con pontusXService.~~  
  ✅ **COMPLETADO (Lote 4)**: Conectado con useAuth para verificar wallet, integración con pontusXService, muestra estado real de conexión y hash de transacción blockchain.

- [x] **src/pages/ProductDetail.tsx**: ~~El botón "Comprar Ahora" navega al wizard sin verificar wallet.~~  
  ✅ **COMPLETADO (Lote 4)**: Verificación de autenticación y `isWeb3Connected` antes de permitir compras. Toast con acción para conectar wallet si no está conectada.

- [x] **src/pages/Auth.tsx**: ~~Formularios de login/registro sin validación Zod.~~  
  ✅ **COMPLETADO (Lote 2)**: Implementado esquema Zod completo con react-hook-form para email y password. Mensajes de error descriptivos en español.

- [x] **src/pages/SettingsOrganization.tsx**: ~~El formulario usa react-hook-form sin validación Zod.~~  
  ✅ **COMPLETADO (Lote 2)**: Añadido zodResolver con esquema de validación para nombre, website, linkedin_url y marketplace_description. Skeleton de carga añadido.

### Datos y Trazabilidad

- [x] **src/pages/Data.tsx**: ~~La página lista datasets sin mostrar verificación blockchain.~~  
  ✅ **COMPLETADO (Lote 3)**: Añadido badge "Verificado" con icono ShieldCheck, contador de verificados blockchain, botón para ver auditoría y diálogo con DataLineageBlockchain.

---

## 🟡 PRIORIDAD ALTA (UX inconsistente)

### Botones sin Confirmación o Loading

- [ ] **src/pages/Requests.tsx (líneas 157-163)**: Los handlers `handleApprove` y `handleDeny` ejecutan mutaciones sin estado de loading visual en los botones específicos.  
  **Pendiente**: Añadir `isPending` por transacción o usar estado local.

- [ ] **src/pages/Opportunities.tsx (línea 301)**: El botón "Proponer mis Datos" ejecuta `handleProposal` que solo muestra un toast sin ninguna acción real.  
  **Pendiente**: Implementar AlertDialog de confirmación y lógica real de envío.

- [ ] **src/components/TeamManagement.tsx**: Revisar si las acciones de "Revocar" y "Cambiar Rol" tienen confirmación.  
  **Pendiente**: Los botones críticos de gestión de equipo deben tener doble confirmación.

### Preferencias Sin Persistencia

- [x] **src/pages/SettingsPreferences.tsx**: ~~Los Switch de preferencias NO están conectados a estado ni persisten en base de datos.~~  
  ✅ **COMPLETADO (Lote 3)**: Conectado con hook usePrivacyPreferences. Los switches de privacidad ahora persisten en Supabase (profile_visible, show_access_history, access_alerts, anonymous_research). Skeleton de carga añadido.

### Navegación y Flujo

- [ ] **src/pages/RequestWizard.tsx**: El header del wizard tiene navegación manual propia en lugar de usar AppLayout.  
  **Pendiente**: Evaluar si es intencional o debería usar layout estándar.

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

- [x] **src/components/PaymentGateway.tsx**: ~~La pestaña "Wallet" muestra saldo estático hardcodeado.~~  
  ✅ **COMPLETADO (Lote 4)**: Muestra estado real de conexión de wallet y mensaje dinámico.

- [ ] **src/pages/Dashboard.tsx**: Dashboard financiero no muestra información de wallet ni balance de tokens.  
  **Pendiente**: Añadir widget de estado Web3 para usuarios con wallet conectada.

- [ ] **src/pages/Catalog.tsx**: Las tarjetas de productos no muestran si la compra requiere wallet.  
  **Pendiente**: Añadir indicador visual para productos que requieren pago con EUROe.

### Patrones de Polling vs Realtime

- [ ] **src/pages/InnovationLab.tsx**: Usa `setInterval` para simular carga de AI. Aceptable para simulación UI pero documentar que no es polling de datos.

- [ ] **src/components/ActivityFeed.tsx**: Usa React Query pero NO tiene suscripción Realtime.  
  **Pendiente**: Añadir suscripción Supabase Realtime como en NotificationsBell.

### Estilos y Consistencia

- [ ] **Varios componentes**: Algunos usan clases Tailwind directas mientras otros usan variantes de shadcn/ui. Revisar consistencia.

- [ ] **src/pages/RequestWizard.tsx**: Clase `.procuredata-gradient` definida en CSS global. Evaluar migración a variable de diseño.

### Componentes Sin Usar (Potencial Código Muerto)

- [ ] **src/pages/Index.tsx**: Verificar si se usa o es reemplazado por Landing.tsx.

- [ ] **src/components/SmartContractViewer.tsx**: Revisar si está integrado en alguna vista o es placeholder.

---

## Orden de Corrección Completado

```
✅ 1. useAuth + useWeb3Wallet Integration (Lote 1)
         ↓
✅ 2. Auth.tsx Zod Validation (Lote 2)
         ↓
✅ 3. SettingsOrganization Validation (Lote 2)
         ↓
✅ 4. SettingsPreferences Persistence (Lote 3)
         ↓
✅ 5. Data.tsx Blockchain Badge (Lote 3)
         ↓
✅ 6. PaymentGateway + pontusXService (Lote 4)
         ↓
✅ 7. ProductDetail Wallet Check (Lote 4)
         ↓
⏳ 8. Remaining High Priority Items
         ↓
⏳ 9. Console.log Cleanup & Improvements
```

---

## Progreso

| Categoría | Total | Completados | Pendientes |
|-----------|-------|-------------|------------|
| 🔴 Crítico | 6 | **6** | 0 |
| 🟡 Alto | 6 | **1** | 5 |
| 🔵 Mejoras | 10 | **1** | 9 |
| **Total** | **22** | **8** | **14** |

---

## Resumen de Cambios por Lote

### Lote 1: Cimientos de Identidad
- `src/hooks/useAuth.tsx` - Integración completa con Web3Wallet

### Lote 2: Seguridad en Formularios
- `src/pages/Auth.tsx` - Validación Zod + react-hook-form
- `src/pages/SettingsOrganization.tsx` - Validación Zod + zodResolver

### Lote 3: Datos y Preferencias
- `src/pages/SettingsPreferences.tsx` - Persistencia con usePrivacyPreferences
- `src/pages/Data.tsx` - Badge blockchain + DataLineageBlockchain dialog

### Lote 4: Transacciones Web3
- `src/components/PaymentGateway.tsx` - Integración pontusXService + wallet real
- `src/pages/ProductDetail.tsx` - Verificación de wallet antes de compra

---

*Última actualización: 2026-01-05 - Post Lote 4*
