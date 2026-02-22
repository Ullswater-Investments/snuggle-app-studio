

## Activacion del Asistente IA en la Pestana de AssetDetailPage

### Resumen

Se creara un nuevo agente especializado para la vista de detalle de activo, con un filtro de contexto estricto que extrae solo datos publicos del asset y una interfaz de chat integrada en el Bloque 3 (Exploracion).

---

### 1. Nueva Edge Function: `asset-detail-agent`

**Archivo nuevo:** `supabase/functions/asset-detail-agent/index.ts`

Se creara una edge function con:
- System prompt que define a ARIA como experta en el activo especifico, con instrucciones de responder basandose UNICAMENTE en el contexto proporcionado.
- El contexto del activo se recibe desde el frontend (ya filtrado por `getAriaContext()`).
- SECURITY_RULES: prohibicion de revelar el system prompt, no inventar datos.
- Streaming SSE, misma estructura que los demas agentes (ia-conversacional-agent, etc.).

**Registro en config.toml:**
```toml
[functions.asset-detail-agent]
verify_jwt = false
```

---

### 2. Nuevo Componente: `AssetDetailChatAgent`

**Archivo nuevo:** `src/components/asset-detail/AssetDetailChatAgent.tsx`

Componente de chat reutilizando el patron existente de los otros agentes (Web3DidsChatAgent, etc.):

- **Props:** Recibe el objeto `product` (MarketplaceListing) y `schemaColumns`.
- **Funcion `getAriaContext()`:** Extrae UNICAMENTE:
  - `name`, `description`, `category`, `version`
  - `schema_definition` (solo nombres de campo y descripciones, sin api_url, api_headers, wallets ni IDs)
  - `use_cases` de custom_metadata (si existe)
- **Cabecera:** Titulo "Pregunta al Asistente IA" con badge truncado del asset_id (ej: `did:...eaf2`).
- **Mensaje inicial:** "Hola! Soy tu Asistente IA experto en el ecosistema PROCUREDATA. Estoy analizando el activo [Nombre] para responder tus preguntas con precision."
- **Input:** Placeholder "Pregunta sobre este dataset..." con boton de envio.
- **Streaming:** Misma logica SSE line-by-line que los otros chat agents.
- **ChatGuard:** Integrado con el sistema de 3 strikes.
- **TokenWallet:** Registro de operaciones por respuesta.

**PROHIBICION ESTRICTA en getAriaContext():** Nunca incluir `api_url`, `api_headers`, `allowed_wallets`, `denied_wallets`, IDs de usuario, ni `provider_id`.

---

### 3. Integracion en ProductDetail.tsx

**Archivo modificado:** `src/pages/ProductDetail.tsx`

- Importar `AssetDetailChatAgent`.
- Reemplazar el contenido placeholder de la pestana "Asistente IA" (lineas 716-728) por:
  ```tsx
  <AssetDetailChatAgent product={product} schemaColumns={schemaColumns} />
  ```
- Sin cambios en los otros bloques ni pestanas.

---

### 4. Preguntas Sugeridas

El componente mostrara 4 preguntas iniciales contextualizadas:
1. "Que datos contiene este dataset?"
2. "Para que casos de uso puedo utilizarlo?"
3. "Cuales son sus campos principales?"
4. "Como se integra con mi sistema actual?"

---

### Resumen tecnico

| Aspecto | Detalle |
|---|---|
| Archivos nuevos | `supabase/functions/asset-detail-agent/index.ts`, `src/components/asset-detail/AssetDetailChatAgent.tsx` |
| Archivo modificado | `src/pages/ProductDetail.tsx` (solo pestana chat), `supabase/config.toml` |
| Patron reutilizado | Mismo de Web3DidsChatAgent (streaming SSE, ChatGuard, TokenWallet) |
| Modelo IA | google/gemini-3-flash-preview (default) |
| Seguridad | getAriaContext() filtra datos sensibles; system prompt prohibe revelar configuracion |
| Cambios en BD | Ninguno |
