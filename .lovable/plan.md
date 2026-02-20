

## Conectar el ecosistema a Pontus-X Testnet (RPC real + Admin Config + Dashboard)

### Resumen

Actualmente el hook `useEthWalletBalance` apunta a Ethereum Mainnet (`eth.llamarpc.com`) y convierte ETH a EUR via CoinGecko. Hay que cambiarlo a Pontus-X Testnet donde el token nativo (EURAU) equivale directamente a 1 EUR, y ademas permitir que el admin configure el RPC desde la vista de Gobernanza.

---

### 1. Nueva tabla `system_settings` en la base de datos

Crear una tabla clave-valor para guardar configuraciones globales del ecosistema:

```text
system_settings
  id          uuid (PK, default gen_random_uuid())
  key         text (UNIQUE, NOT NULL)
  value       text (NOT NULL)
  updated_at  timestamptz (default now())
  updated_by  uuid (nullable)
```

Politicas RLS:
- SELECT: cualquier usuario autenticado puede leer
- INSERT/UPDATE: solo usuarios con rol `admin` o `data_space_owner`

Insertar valor por defecto:
```sql
INSERT INTO system_settings (key, value)
VALUES ('blockchain_rpc_url', 'https://rpc.test.pontus-x.eu');
```

---

### 2. Actualizar `PONTUSX_NETWORK_CONFIG` en `src/services/pontusX.ts`

- Cambiar `chainId` de `0x7ecc` (32460) a `0x7ec9` (32457)
- Cambiar `chainName` a `Pontus-X Testnet`
- Cambiar el simbolo del token nativo de `GX` a `EURAU`
- Cambiar `rpcUrls` a `['https://rpc.test.pontus-x.eu']`

---

### 3. Actualizar `src/lib/oceanConfig.ts`

- Cambiar `chainId` default de `32460` a `32457`
- Cambiar `nodeUri` default a `https://rpc.test.pontus-x.eu`

---

### 4. Refactorizar `src/hooks/useEthWalletBalance.ts`

Cambios principales:

- Renombrar la interfaz interna a `PontusXWalletBalance` con campos: `walletAddress`, `balanceNative` (EURAU), `balanceEur` (= balanceNative ya que 1 EURAU ~ 1 EUR), `euroeBalance` (token ERC-20 EUROe), `isConfigured`
- Eliminar la llamada a CoinGecko (ya no se necesita conversion)
- Leer el RPC URL desde `system_settings` en Supabase (con fallback a `https://rpc.test.pontus-x.eu`)
- Usar `ethers.JsonRpcProvider` con el RPC de Pontus-X para obtener balance nativo
- Intentar leer el balance del token EUROe via contrato ERC-20 (usando la direccion del contrato definida en `pontusX.ts`), con fallback a "0.00" si falla
- La funcion devuelve `balanceEur = balanceNative` (ya que EURAU ~ EUR)

---

### 5. Actualizar la tarjeta "Balance Wallet" en `src/pages/Dashboard.tsx`

- Mostrar el saldo en EUR directamente desde `balanceNative` (EURAU)
- Debajo, mostrar desglose: `X.XX EURAU` (nativo) + `Y.YY EUROe` (token)
- Eliminar la referencia a "ETH" y "1 ETH ~ X EUR"
- Mantener el boton de refrescar

---

### 6. Nueva tarjeta "Configuracion de Red Blockchain" en `src/pages/admin/AdminGovernance.tsx`

Anadir una nueva tarjeta en la fila 1 (convertirla a grid de 3 columnas o anadirla debajo) con:

- Icono: `Network` o `Link2`
- Titulo: "Configuracion de Red Blockchain"
- Campo de texto editable con el RPC URL actual (leido de `system_settings`)
- Boton "Guardar" que actualiza el valor en `system_settings`
- Indicador visual de estado: punto verde si el RPC responde, rojo si no
- Al guardar, mostrar toast de confirmacion

---

### 7. Boton "Cambiar a Pontus-X Testnet" en `src/components/Web3StatusWidget.tsx`

- Cuando la wallet esta conectada pero el `chainId` no coincide con `0x7ec9` (32457), mostrar un banner/boton amarillo: "Red incorrecta - Cambiar a Pontus-X Testnet"
- Al hacer click, llamar a `pontusXService.switchNetwork()` que ya tiene la logica de `wallet_addEthereumChain` / `wallet_switchEthereumChain`
- Mostrar el simbolo "EURAU" en vez de "GX" en los balances

---

### Archivos a modificar/crear (7)

1. **Migracion SQL** -- crear tabla `system_settings` + seed con RPC por defecto
2. `src/services/pontusX.ts` -- actualizar chainId a 32457, symbol a EURAU, rpcUrls
3. `src/lib/oceanConfig.ts` -- actualizar chainId y nodeUri defaults
4. `src/hooks/useEthWalletBalance.ts` -- refactorizar para Pontus-X (sin CoinGecko, leer RPC de DB, leer EUROe)
5. `src/pages/Dashboard.tsx` -- actualizar tarjeta wallet para mostrar EURAU/EUROe
6. `src/pages/admin/AdminGovernance.tsx` -- nueva tarjeta de configuracion de red
7. `src/components/Web3StatusWidget.tsx` -- boton de cambio de red y etiquetas EURAU

