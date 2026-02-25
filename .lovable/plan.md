

## Correccion de Validacion ODRL 2.0: Inyeccion de `assigner` y `target`

### Problema

El validador `odrlapi` rechaza la politica generada con el error **"Rule in offer without assigner"** porque cada regla (permission, prohibition, duty) carece de los campos obligatorios `target` y `assigner`. Ademas, cuando varias opciones mapean a la misma accion (ej. "use"), se pierde contexto del texto original.

---

### Cambios

#### 1. `src/utils/odrlGenerator.ts`

**Ampliar la firma de `generateODRLPolicy`** para recibir `providerId` y `assetId`:

```text
generateODRLPolicy(permissions, prohibitions, obligations, providerId, assetId)
```

- Si `assetId` es falsy, usar `urn:uuid:pending-asset` como placeholder
- Formatear ambos IDs como URIs: `urn:uuid:<id>`

**Modificar `mapLabels`** para recibir `target` y `assigner` e inyectarlos en cada regla:

Cada objeto del array resultante tendra esta estructura:

```text
{
  "target": "urn:uuid:<assetId>",
  "assigner": "urn:uuid:<providerId>",
  "action": "<accion_mapeada>",
  "source_label": "<texto_original_del_checkbox>"
}
```

- `source_label` siempre se incluye para preservar el texto original de la interfaz
- Si la accion no se encuentra en el diccionario, se mantiene `"action": "use"` con el `source_label` como unico diferenciador

#### 2. `src/pages/dashboard/PublishDataset.tsx`

**Actualizar la llamada** a `generateODRLPolicy` (linea 528) para pasar los dos nuevos parametros:

- `providerId`: `activeOrgId` (ya disponible en scope)
- `assetId`: No existe aun en el momento de la insercion, asi que se pasara como `undefined` (el generador usara el placeholder `urn:uuid:pending-asset`)

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/utils/odrlGenerator.ts` | Ampliar firma, inyectar `target`/`assigner` en cada regla, anadir `source_label` |
| `src/pages/dashboard/PublishDataset.tsx` | Pasar `activeOrgId` y `undefined` como nuevos parametros |

### Lo que NO cambia

- La interfaz del usuario (checkboxes, textos)
- El campo `access_policy` existente
- La visualizacion en `AdminPublicationDetail.tsx` (ya muestra el JSON completo, los nuevos campos apareceran automaticamente)
