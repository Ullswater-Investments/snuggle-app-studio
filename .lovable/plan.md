

## ODRL con Asset ID Real: Insercion en Dos Pasos + Enriquecimiento Semantico

### Problema actual

La politica ODRL se genera con `target: "urn:uuid:pending-asset"` porque el Asset ID aun no existe al momento de la insercion. Esto invalida semanticamente el JSON-LD.

### Solucion: Two-Step Save

Dividir el guardado en dos fases para obtener primero el ID real de la base de datos y luego generar el ODRL con ese ID.

---

### Cambios

#### 1. `src/utils/odrlGenerator.ts`

Enriquecer el sobre JSON-LD:

- Cambiar `"@context"` de un string simple a un array que incluya el contexto Dublin Core:
  ```text
  "@context": [
    "http://www.w3.org/ns/odrl.jsonld",
    { "dct": "http://purl.org/dc/terms/" }
  ]
  ```
- Anadir propiedad `"dct:source": "PROCUREDATA"` al objeto raiz
- Hacer `assetId` un parametro obligatorio (ya no opcional) puesto que ahora siempre se llamara con el ID real

#### 2. `src/pages/dashboard/PublishDataset.tsx` (lineas 508-548)

Reestructurar la mutacion `publishMutation` en tres fases:

**Fase 1 - INSERT sin ODRL:**
- Insertar el activo en `data_assets` con `custom_metadata` que incluya `access_policy`, `access_control`, y `additionalInformation: {}` (vacio, sin ODRL)
- Obtener el `id` devuelto por Supabase

**Fase 2 - Generar ODRL con ID real:**
- Llamar a `generateODRLPolicy()` pasando el `id` real como `assetId` y `activeOrgId` como `providerId`

**Fase 3 - UPDATE con ODRL:**
- Realizar un UPDATE al registro recien creado para inyectar el ODRL en `custom_metadata.additionalInformation.odrlPolicy`
- Se usara una lectura del `custom_metadata` actual, se le anadira el `odrlPolicy`, y se hara el UPDATE completo del campo

Pseudocodigo del flujo:

```text
// Fase 1: INSERT
const { data: asset } = await supabase
  .from("data_assets")
  .insert({ ..., custom_metadata: { ...sin odrlPolicy } })
  .select("id, custom_metadata")
  .single();

// Fase 2: Generar ODRL con ID real
const odrlPolicy = generateODRLPolicy(
  permissions, prohibitions, obligations,
  activeOrgId,
  asset.id   // <-- ID REAL
);

// Fase 3: UPDATE
await supabase
  .from("data_assets")
  .update({
    custom_metadata: {
      ...asset.custom_metadata,
      additionalInformation: { odrlPolicy }
    }
  })
  .eq("id", asset.id);
```

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/utils/odrlGenerator.ts` | Enriquecer `@context` con Dublin Core, anadir `dct:source`, hacer `assetId` obligatorio |
| `src/pages/dashboard/PublishDataset.tsx` | Reestructurar mutacion en 3 fases (INSERT, generar ODRL, UPDATE) |

### Lo que NO cambia

- La interfaz del usuario (wizard, checkboxes, pasos)
- La vista admin (`AdminPublicationDetail.tsx`) — ya lee de `additionalInformation.odrlPolicy`
- El bloque `access_policy` y `access_control`
- Las traducciones
- Ningun otro archivo

