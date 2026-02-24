

## Generacion de ODRL 2.0 JSON-LD en el Wizard de Publicacion

### Objetivo

Implementar un traductor silencioso que convierta las selecciones amigables del usuario (checkboxes en espanol) en un JSON-LD valido segun el estandar ODRL 2.0 de la W3C, y mostrar el resultado en el panel de administracion.

---

### 1. Nuevo archivo de utilidades: `src/utils/odrlGenerator.ts`

Contendra:

**Diccionarios de mapeo** (label en espanol -> accion ODRL oficial):

```text
ODRL_PERMISSIONS:
  "Uso comercial"                    -> "commercialize"
  "Analisis interno"                 -> "use"
  "Generar informes derivados"       -> "derive"
  "Integracion en sistemas internos" -> "execute"
  "Uso en investigacion"             -> "use"

ODRL_PROHIBITIONS:
  "No redistribucion"       -> "distribute"
  "No ingenieria inversa"   -> "reverseEngineer"
  "No reventa a terceros"   -> "sell"
  "No divulgacion publica"  -> "display"

ODRL_DUTIES:
  "Atribucion requerida"        -> "attribute"
  "Cumplimiento GDPR"           -> "ensureExclusivity"
  "Notificar uso a proveedor"   -> "inform"
```

**Funcion `generateODRLPolicy`**:
- Recibe 3 arrays de strings (permissions, prohibitions, obligations)
- Para cada elemento, busca en el diccionario correspondiente
- Si no encuentra match, usa accion generica `"use"` con propiedad `"description": "texto_personalizado"`
- Genera un UUID con `crypto.randomUUID()`
- Retorna el JSON-LD completo con `@context`, `@type: "Offer"`, `uid`, `profile`, `permission`, `prohibition`, `duty`

---

### 2. Modificacion de `src/pages/dashboard/PublishDataset.tsx`

En la funcion `publishMutation` (lineas 484-528), se mantiene el `accessPolicy` actual para whitelist/blacklist/timeout (Smart Contract), y se anade un campo nuevo:

**Separacion de responsabilidades en `custom_metadata`:**

| Campo | Contenido | Uso |
|---|---|---|
| `custom_metadata.access_policy` | Whitelist, Blacklist, Timeout | Smart Contract / Pontus-X |
| `custom_metadata.odrl_policy` | JSON-LD ODRL 2.0 completo | Semantica / UNE 0087 |

Cambios concretos:
- Importar `generateODRLPolicy` desde `@/utils/odrlGenerator`
- Antes de construir el objeto `custom_metadata`, llamar a `generateODRLPolicy()` con los labels de permissions, prohibitions y obligations
- Inyectar el resultado en `custom_metadata.odrl_policy`
- El `access_policy` existente se mantiene exactamente igual (no se rompe nada)

Ejemplo del objeto `custom_metadata` resultante:

```text
custom_metadata: {
  api_url: "...",
  access_policy: {
    permissions: ["Uso comercial", ...],    // labels amigables (legacy)
    prohibitions: [...],
    obligations: [...],
    allowed_wallets: [...],                  // Smart Contract
    denied_wallets: [...],                   // Smart Contract
    access_timeout_days: 90                  // Smart Contract
  },
  odrl_policy: {
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "@type": "Offer",
    "uid": "urn:uuid:...",
    "profile": "http://www.w3.org/ns/odrl/2/",
    "permission": [{ "action": "commercialize" }],
    "prohibition": [{ "action": "distribute" }],
    "duty": [{ "action": "attribute" }]
  }
}
```

---

### 3. Modificacion de `src/pages/admin/AdminPublicationDetail.tsx`

En la seccion de Gobernanza (Card con icono Shield, linea 315), despues del bloque de `access_policy`, anadir una nueva subseccion:

**Bloque "Politica ODRL 2.0":**
- Solo se muestra si `customMeta?.odrl_policy` existe
- Icono `FileJson` con titulo "Politica ODRL 2.0 (UNE 0087)"
- Muestra el JSON-LD formateado con `JSON.stringify(odrl, null, 2)` usando el componente `CopyField` con `mono`
- Badge `"W3C ODRL 2.0"` en verde para indicar conformidad

---

### 4. Impacto en la UI del usuario

**Cero cambios visuales** en el wizard de publicacion. El usuario sigue viendo:
- Checkboxes con textos en espanol
- Campos de whitelist/blacklist/timeout
- Todo funciona exactamente igual

La generacion ODRL ocurre transparentemente al hacer clic en "Publicar".

---

### Archivos a modificar/crear

| Archivo | Accion |
|---|---|
| `src/utils/odrlGenerator.ts` | **Crear** - Diccionarios + funcion generadora |
| `src/pages/dashboard/PublishDataset.tsx` | **Modificar** - Importar generador, inyectar `odrl_policy` en `custom_metadata` |
| `src/pages/admin/AdminPublicationDetail.tsx` | **Modificar** - Anadir bloque visual de ODRL en seccion Gobernanza |

### Lo que NO cambia

- La interfaz del Step 3 del wizard (checkboxes, inputs, listas)
- El campo `access_policy` existente (whitelist, blacklist, timeout)
- Las traducciones existentes
- La logica de aprobacion/rechazo del admin
- Ningun otro archivo del proyecto

