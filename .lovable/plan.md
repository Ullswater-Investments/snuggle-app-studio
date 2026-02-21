

## Gobernanza del Ecosistema Funcional

### Resumen

Convertir la pagina `/admin/governance` de un panel semi-estatico a uno completamente funcional con: tabla de logs dinamica, selector de red Devnet/Testnet, health checks reales, y DID con copia al portapapeles.

---

### 1. Nueva tabla `governance_logs` en la base de datos

Crear una tabla para registrar eventos del ecosistema:

```text
governance_logs
  id          uuid  PK  default gen_random_uuid()
  level       text  NOT NULL  ('info' | 'warn' | 'error')
  category    text  NOT NULL  ('user_registration' | 'asset_verification' | 'config_change' | 'system')
  message     text  NOT NULL
  actor_id    uuid  NULLABLE  (quien ejecuto la accion)
  metadata    jsonb NULLABLE  (datos adicionales)
  created_at  timestamptz  default now()
```

**RLS**: SELECT para usuarios con rol `admin` o `data_space_owner`. INSERT restringido a funciones SECURITY DEFINER (sistema).

**Seed data**: Insertar unos 5-7 registros iniciales representativos (registro de usuario, verificacion de activo, cambio de configuracion).

---

### 2. Selector de Red Blockchain (Devnet / Testnet)

Modificar la tarjeta "Configuracion de Red Blockchain" en `AdminGovernance.tsx`:

- Anadir un dropdown/Select con dos opciones predefinidas:
  - **Pontus-X Testnet**: RPC `https://rpc.test.pontus-x.eu`, Chain ID `32457`
  - **Pontus-X Devnet**: RPC `https://rpc.dev.pontus-x.eu`, Chain ID `32456`
- Al seleccionar una opcion, se auto-rellena el campo RPC URL.
- Al pulsar "Guardar", se actualizan dos claves en `system_settings`:
  - `blockchain_rpc_url` con la nueva URL
  - `blockchain_chain_id` con el nuevo Chain ID (nueva clave a insertar)
- Actualizar los hooks `useEthWalletBalance` y `useBlockchainActivity` para leer tambien `blockchain_chain_id` de `system_settings`.

---

### 3. Health Checks reales

Reemplazar la simulacion aleatoria de `runHealthCheck()` con llamadas reales:

- **Blockchain**: `fetch(rpcUrl, { method: 'POST', body: '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' })` - si devuelve `result`, esta online.
- **Aquarius**: `fetch(aquariusUrl)` - si responde 200, esta online.
- **Provider**: `fetch(providerUrl)` - si responde 200, esta online.
- **Identity Provider**: `fetch("https://identity.pontus-x.eu")` - si responde, esta online.

Cada check tendra un timeout de 5 segundos. Si falla o excede el timeout, se marca como "Caido".

---

### 4. Registro de Eventos dinamico

Reemplazar el array hardcoded `ecosystemEvents` con una consulta a `governance_logs`:

- Consultar los ultimos 50 registros ordenados por `created_at DESC`.
- Mantener los colores de severidad: info (azul/muted), warn (amarillo), error (rojo).
- Anadir un boton "Refrescar" en la cabecera del panel.

---

### 5. Logging automatico de cambios de configuracion

Cuando el admin guarda el RPC URL (funcion `saveRpcUrl`), insertar automaticamente un registro en `governance_logs`:

```
level: 'info'
category: 'config_change'  
message: 'URL del RPC actualizada a [URL]'
```

---

### 6. DID con copia al portapapeles

La funcionalidad de copia ya existe en el codigo actual (boton Copy junto al DID, funcion `copy()`). Solo verificar que funciona correctamente y que el badge "Verificado GAIA-X" se muestra. No se requieren cambios aqui.

---

### Secuencia tecnica

**Paso 1 - Migracion SQL**: Crear tabla `governance_logs` + RLS + seed data + insertar clave `blockchain_chain_id` en `system_settings`.

**Paso 2 - AdminGovernance.tsx**: 
- Anadir Select de red (Devnet/Testnet) que auto-rellena RPC y Chain ID
- Reemplazar health check simulado por llamadas reales con timeout
- Reemplazar eventos mock por consulta a `governance_logs`
- Insertar log al guardar configuracion

**Paso 3 - Actualizar hooks** (si se decide persistir chain_id): Opcional, ya que el RPC URL es el valor principal que usan los hooks.

---

### Archivos a modificar/crear (2-3)

1. **Nueva migracion SQL** -- crear tabla `governance_logs`, seed data, nueva clave `blockchain_chain_id`
2. **`src/pages/admin/AdminGovernance.tsx`** -- selector de red, health checks reales, logs dinamicos, logging automatico
3. **`src/integrations/supabase/types.ts`** -- se actualizara automaticamente tras la migracion

