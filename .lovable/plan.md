

## Precision On-chain y Etiquetas Profesionales del Dashboard

### Resumen

Ajustar la lectura on-chain para que refleje exactamente las 95 transacciones, eliminar toda mencion a "Testnet" en la interfaz de usuario, refinar la visualizacion del balance EURAU, y anadir las nuevas etiquetas traducidas a los 7 idiomas.

---

### 1. Verificar lectura correcta de transacciones

El hook `useBlockchainActivity` ya lee `wallet_address` de la organizacion activa en la base de datos (no esta hardcodeado). Usa `provider.getTransactionCount(walletAddress)` que devuelve el nonce total. Si el explorador muestra 95 transacciones, el valor deberia coincidir.

**Accion**: Verificar que no hay ningun filtro o cache que altere el resultado. Anadir un `console.log` temporal o revisar que `staleTime` no impida la actualizacion. No se requiere cambio de logica significativo ya que la implementacion es correcta.

---

### 2. Humanizar etiquetas (eliminar "Testnet")

**Archivo: `src/pages/Dashboard.tsx`** (linea ~426)

Cambiar el texto hardcodeado `"On-chain · Pontus-X Testnet"` por una clave i18n:

```
t('cards.onchainVerified', 'Actividad Verificada On-chain')
```

**Archivo: `src/components/Web3StatusWidget.tsx`** (linea ~158)

Cambiar `"Cambiar a Pontus-X Testnet"` por:

```
"Cambiar a Red de Datos Segura"
```

Y el toast de exito de `"Red cambiada a Pontus-X Testnet"` por `"Conectado a la Red de Datos Segura"`.

---

### 3. Refinamiento del Balance

**Archivo: `src/pages/Dashboard.tsx`** (linea ~322-323)

Asegurar que el balance nativo muestre exactamente 4 decimales: `27.0882 EURAU`.

Eliminar cualquier referencia residual a "Testnet" en tooltips o textos de carga. En el loading state, usar la clave `t('cards.walletLoading', 'Conectando a la Red de Datos Segura...')`.

---

### 4. Traducciones a 7 idiomas

Anadir las siguientes claves al namespace `dashboard` en los 7 archivos de localizacion:

| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `cards.onchainVerified` | Actividad Verificada On-chain | On-chain Verified Activity | Activite verifiee on-chain | On-chain verifizierte Aktivitat | Attivita verificata on-chain | Atividade Verificada On-chain | On-chain Geverifieerde Activiteit |
| `cards.secureNetwork` | Conectado a la Red de Datos Segura | Connected to Secure Data Network | Connecte au reseau de donnees securise | Verbunden mit dem sicheren Datennetzwerk | Connesso alla Rete Dati Sicura | Conectado a Rede de Dados Segura | Verbonden met beveiligd datanetwerk |
| `cards.walletLoading` | Conectando a la Red de Datos Segura... | Connecting to Secure Data Network... | Connexion au reseau securise... | Verbindung zum sicheren Netzwerk... | Connessione alla rete sicura... | Conectando a rede segura... | Verbinden met beveiligd netwerk... |

---

### Archivos a modificar (9)

1. `src/pages/Dashboard.tsx` -- reemplazar texto hardcodeado por claves i18n, refinar formato balance
2. `src/components/Web3StatusWidget.tsx` -- humanizar etiquetas de red
3. `src/locales/es/dashboard.json` -- anadir 3 claves nuevas
4. `src/locales/en/dashboard.json` -- anadir 3 claves nuevas
5. `src/locales/fr/dashboard.json` -- anadir 3 claves nuevas
6. `src/locales/de/dashboard.json` -- anadir 3 claves nuevas
7. `src/locales/it/dashboard.json` -- anadir 3 claves nuevas
8. `src/locales/pt/dashboard.json` -- anadir 3 claves nuevas
9. `src/locales/nl/dashboard.json` -- anadir 3 claves nuevas

