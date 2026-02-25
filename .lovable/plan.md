

## Reglas Explicitas + dcterms:references en la Raiz

### Objetivo

Reincorporar `target` y `assigner` dentro de cada regla (permission, prohibition, duty) para pasar validadores estrictos, manteniendo el enlace legal `dcterms:references` en la raiz.

---

### Cambios en `src/utils/odrlGenerator.ts`

#### 1. Actualizar la interfaz `OdrlRule`

Anadir `target` y `assigner` a la interfaz:

```text
interface OdrlRule {
  target: string;
  assigner: string;
  action: string;
  description: string;
}
```

#### 2. Actualizar `mapLabels` para recibir `target` y `assigner`

```text
function mapLabels(
  labels: string[],
  dictionary: Record<string, string>,
  target: string,
  assigner: string
): OdrlRule[]
```

Cada regla devuelta incluira los cuatro campos: `target`, `assigner`, `action`, `description`.

#### 3. Actualizar `generateODRLPolicy`

- Eliminar `assigner` y `target` de la raiz del objeto (ya no van ahi)
- Pasar `target` y `assigner` a cada llamada de `mapLabels`
- Mantener `dcterms` en el `@context` y la inyeccion condicional de `dcterms:references`

Estructura resultante:

```text
{
  "@context": [
    "http://www.w3.org/ns/odrl.jsonld",
    { "dcterms": "http://purl.org/dc/terms/" }
  ],
  "type": "Offer",
  "uid": "urn:uuid:<uuid>",
  "profile": "http://www.w3.org/ns/odrl/2/",
  "dcterms:references": "<terms_url>",   // solo si existe
  "permission": [{
    "target": "urn:uuid:<assetId>",
    "assigner": "did:ethr:<wallet>",
    "action": "commercialize",
    "description": "Uso comercial"
  }],
  "prohibition": [{
    "target": "urn:uuid:<assetId>",
    "assigner": "did:ethr:<wallet>",
    "action": "distribute",
    "description": "No redistribucion"
  }],
  "duty": [{
    "target": "urn:uuid:<assetId>",
    "assigner": "did:ethr:<wallet>",
    "action": "attribute",
    "description": "Atribucion requerida"
  }]
}
```

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/utils/odrlGenerator.ts` | Reglas explicitas con target/assigner + dcterms:references condicional en raiz |

### Lo que NO cambia

- `PublishDataset.tsx` (ya pasa `termsUrl` correctamente)
- `AdminPublicationDetail.tsx`
- El flujo de guardado en dos pasos
- Los diccionarios de mapeo de acciones

