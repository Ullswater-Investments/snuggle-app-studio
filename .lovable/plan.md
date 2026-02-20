

## Conectar ecosistema a Pontus-X Testnet

### Resumen

Migrar de Ethereum Mainnet a Pontus-X Testnet (Chain ID 32457, RPC `https://rpc.test.pontus-x.eu`), con token nativo EURAU (1:1 con EUR). Incluye configuracion admin del RPC, dashboard actualizado y UX de cambio de red.

---

### 1. Base de datos: tabla `system_settings`

Crear tabla clave-valor para configuraciones globales:

```text
system_settings (id uuid PK, key text UNIQUE, value text, updated_at timestamptz, updated_by uuid)
```

- RLS: SELECT para autenticados, INSERT/UPDATE para admin/data_space_owner
- Seed: `blockchain_rpc_url` = `https://rpc.test.pontus-x.eu`

---

### 2. Actualizar `src/services/pontusX.ts`

- `chainId`: `0x7ecc` (32460) -> `0x7ec9` (32457)
- `chainName`: `Pontus-X Testnet`
- `nativeCurrency.symbol`: `GX` -> `EURAU`
- `rpcUrls`: `['https://rpc.test.pontus-x.eu']`

---

### 3. Actualizar `src/lib/oceanConfig.ts`

- `chainId` default: 32460 -> 32457
- `nodeUri` default: `https://rpc.test.pontus-x.eu`

---

### 4. Refactorizar `src/hooks/useEthWalletBalance.ts`

- Eliminar llamada a CoinGecko (EURAU = 1 EUR directamente)
- Leer RPC URL desde `system_settings` (fallback al default)
- Obtener balance nativo (EURAU) via `ethers.JsonRpcProvider`
- Intentar leer balance EUROe via contrato ERC-20 (con fallback a 0)
- Renombrar campos: `balanceNative` (EURAU), `euroeBalance`, `balanceEur` (= balanceNative)

---

### 5. Actualizar tarjeta wallet en `src/pages/Dashboard.tsx`

- Mostrar saldo en EUR directamente desde `balanceNative`
- Desglose: `X.XX EURAU` + `Y.YY EUROe`
- Eliminar referencias a ETH y precio CoinGecko

---

### 6. Nueva tarjeta en `src/pages/admin/AdminGovernance.tsx`

Tarjeta "Configuracion de Red Blockchain" con:
- Campo de texto editable para RPC URL (leido de `system_settings`)
- Boton "Guardar" que actualiza la tabla
- Indicador visual (punto verde/rojo) segun respuesta del RPC
- Toast de confirmacion

---

### 7. Actualizar `src/components/Web3StatusWidget.tsx`

- Detectar si chainId conectado no es `0x7ec9` -> mostrar boton amarillo "Cambiar a Pontus-X Testnet"
- Llamar a `pontusXService.switchNetwork()` al hacer click
- Cambiar etiqueta "Gas (GX)" a "EURAU"

---

### Archivos a modificar/crear (7)

1. Migracion SQL: crear `system_settings` + seed
2. `src/services/pontusX.ts`: chainId, symbol, rpcUrls
3. `src/lib/oceanConfig.ts`: chainId, nodeUri
4. `src/hooks/useEthWalletBalance.ts`: refactorizar para Pontus-X
5. `src/pages/Dashboard.tsx`: tarjeta wallet EURAU/EUROe
6. `src/pages/admin/AdminGovernance.tsx`: tarjeta config red
7. `src/components/Web3StatusWidget.tsx`: cambio de red + etiquetas EURAU

