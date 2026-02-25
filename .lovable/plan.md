

## Traductor Silencioso ODRL 2.0 -- Reestructuracion Completa

### Objetivo

Alinear el generador ODRL con los ejemplos oficiales W3C y reestructurar el payload de `custom_metadata` para separar claramente la semantica ODRL del control de acceso tecnico (Smart Contract).

---

### Cambios

#### 1. `src/utils/odrlGenerator.ts`

- Cambiar `"@type": "Offer"` a `"type": "Offer"` (formato W3C correcto cuando se usa `@context`)
- Renombrar campo `source_label` a `description` en la interfaz `OdrlRule` y en `mapLabels`
- Anadir `"Renovacion de licencia": "use"` al diccionario `ODRL_DUTIES`
- La firma y logica de `mapLabels` y `generateODRLPolicy` se mantienen (ya reciben `providerId` y `assetId`)

Estructura resultante de cada regla:

```text
{
  "target": "urn:uuid:<assetId>",
  "assigner": "urn:uuid:<providerId>",
  "action": "use",
  "description": "Analisis interno"
}
```

#### 2. `src/pages/dashboard/PublishDataset.tsx` (lineas 485-535)

Reestructurar `custom_metadata` para separar responsabilidades:

**Antes:**
```text
custom_metadata: {
  ...apiConfig,
  access_policy: { permissions, prohibitions, obligations, allowed_wallets, denied_wallets, access_timeout_days },
  odrl_policy: { ... }
}
```

**Despues:**
```text
custom_metadata: {
  ...apiConfig,
  access_policy: { permissions, prohibitions, obligations, terms_url },  // Labels amigables (legacy/UI)
  access_control: { allowed_wallets, denied_wallets, access_timeout_days },  // Smart Contract / Pontus-X
  additionalInformation: {
    odrlPolicy: { ... }  // JSON-LD ODRL 2.0 completo
  }
}
```

Esto implica:
- Mover `allowed_wallets`, `denied_wallets` y `access_timeout_days` de `access_policy` a un nuevo bloque `access_control`
- Mover `odrl_policy` dentro de `additionalInformation.odrlPolicy`
- `access_policy` conserva solo los labels de permisos/prohibiciones/obligaciones y `terms_url`

#### 3. `src/pages/admin/AdminPublicationDetail.tsx`

Actualizar las referencias para leer de la nueva estructura:

| Antes | Despues |
|---|---|
| `customMeta.access_policy.allowed_wallets` | `customMeta.access_control?.allowed_wallets` |
| `customMeta.access_policy.denied_wallets` | `customMeta.access_control?.denied_wallets` |
| `customMeta.access_policy.access_timeout_days` | `customMeta.access_control?.access_timeout_days` |
| `customMeta.odrl_policy` | `customMeta.additionalInformation?.odrlPolicy` |

**Retrocompatibilidad:** Usar fallbacks con `||` para que registros antiguos (con la estructura anterior) sigan funcionando. Por ejemplo:
```text
const allowed = customMeta.access_control?.allowed_wallets || customMeta.access_policy?.allowed_wallets || [];
```

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/utils/odrlGenerator.ts` | `type` en vez de `@type`, `description` en vez de `source_label`, nuevo duty |
| `src/pages/dashboard/PublishDataset.tsx` | Reestructurar custom_metadata con `access_control` y `additionalInformation.odrlPolicy` |
| `src/pages/admin/AdminPublicationDetail.tsx` | Actualizar lecturas con fallbacks retrocompatibles |

### Lo que NO cambia

- La interfaz del usuario (checkboxes, textos, wizard)
- La logica de aprobacion/rechazo del admin
- Las traducciones
- Ningun otro archivo del proyecto

