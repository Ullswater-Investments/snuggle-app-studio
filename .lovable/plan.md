

## Refactorizacion ODRL a Politica Compacta (W3C Best Practices 3.3.1)

### Objetivo

Alinear `generateODRLPolicy` con el patron de "Compact Policies" de la W3C ODRL 2.2, moviendo `target` y `assigner` a la raiz y simplificando las reglas internas.

---

### Cambios

#### 1. `src/utils/odrlGenerator.ts`

**Simplificar la interfaz `OdrlRule`** para que solo contenga `action` y `description` (eliminar `target` y `assigner`).

**Simplificar `mapLabels`** para que no reciba `target` ni `assigner`, y devuelva solo `{ action, description }`.

**Actualizar `generateODRLPolicy`:**

- Anadir parametro opcional `termsUrl?: string`
- Mover `target` y `assigner` a la raiz del objeto
- Cambiar `@context` a un array con Dublin Core Terms: `["http://www.w3.org/ns/odrl.jsonld", { "dcterms": "http://purl.org/dc/terms/" }]`
- Usar `"type": "Offer"` (sin @)
- Si `termsUrl` tiene valor, incluir `"dcterms:references": termsUrl` en la raiz
- Si no tiene valor, omitir la propiedad completamente

Estructura resultante:

```text
{
  "@context": ["http://www.w3.org/ns/odrl.jsonld", { "dcterms": "http://purl.org/dc/terms/" }],
  "type": "Offer",
  "uid": "urn:uuid:<uuid>",
  "profile": "http://www.w3.org/ns/odrl/2/",
  "assigner": "did:ethr:<wallet>",
  "target": "urn:uuid:<assetId>",
  "dcterms:references": "<terms_url>",   // solo si existe
  "permission": [{ "action": "...", "description": "..." }],
  "prohibition": [{ "action": "...", "description": "..." }],
  "duty": [{ "action": "...", "description": "..." }]
}
```

#### 2. `src/pages/dashboard/PublishDataset.tsx` (linea 553)

Pasar `termsUrl` como sexto argumento a `generateODRLPolicy`:

```text
const odrlPolicy = generateODRLPolicy(
  step3Data.permissions.map((r) => r.label),
  step3Data.prohibitions.map((r) => r.label),
  step3Data.obligations.map((r) => r.label),
  providerWallet,
  asset.id,
  step3Data.termsUrl?.trim() || undefined
);
```

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/utils/odrlGenerator.ts` | Compact Policy: target/assigner en raiz, reglas simplificadas, dcterms:references condicional |
| `src/pages/dashboard/PublishDataset.tsx` | Pasar termsUrl a generateODRLPolicy |

### Lo que NO cambia

- La interfaz del usuario (wizard, checkboxes, pasos)
- La vista admin (`AdminPublicationDetail.tsx`)
- El flujo de guardado en dos pasos (INSERT, generar, UPDATE)
- Los bloques `access_policy` y `access_control`
