

## Ajustes finales de DataView.tsx: Spacing, Naming, Asistente IA y Notificaciones

### 1. Spacing entre "Acceso al Activo" y "Historial de Accesos"

Actualmente el bloque `<div className="space-y-6">` (linea 686) contiene las Cards de datos, pero el `AccessHistoryTable` (linea 1124) esta fuera de ese `div`, dentro de un `motion.div` sin margen superior. Se anadira `className="mt-6"` al `motion.div` del AccessHistoryTable para crear la separacion visual.

**Archivo:** `src/pages/DataView.tsx` (linea ~1125)

---

### 2. Renombrar "Contrato ODRL / Licencia ODRL" a "Contrato Digital de Gobernanza"

Las referencias dentro del scope de DataView se encuentran en:

- **`src/utils/pdfGenerator.ts`**: El titulo del PDF dice `"CONTRATO DE LICENCIA DE USO DE DATOS"` -- se mantiene porque es el titulo legal del PDF, no menciona ODRL
- **`src/locales/*/catalogDetails.json`**: La pestana `"rights": "Derechos (ODRL)"` -- esto afecta al catalogo, no a DataView
- **`src/pages/DataView.tsx`**: La pestana de "Politicas de Acceso" (linea 509-512) no menciona ODRL directamente
- **`src/locales/*/dataView.json`**: Los archivos de i18n para DataView usan `downloadLicensePDF` con texto como "Descargar Licencia PDF"

Cambios concretos en los 7 archivos `dataView.json`:
- `data.downloadLicensePDF`: Cambiar de "Descargar Licencia PDF" a "Descargar Contrato Digital de Gobernanza" (y equivalentes en cada idioma)
- `toast.licenseSuccess`: Cambiar de "Licencia descargada correctamente" a "Contrato de Gobernanza descargado" (y equivalentes)
- `toast.licenseError`: Cambiar de "Error al generar la licencia" a "Error al generar el Contrato de Gobernanza" (y equivalentes)

Cambios en `pdfGenerator.ts`:
- Nombre del archivo generado: de `Licencia_PROCUREDATA_...` a `Contrato_Gobernanza_PROCUREDATA_...`
- Comentarios internos de ODRL -> Gobernanza (solo limpieza)

---

### 3. Integracion del Asistente IA (ARIA) en DataView

Se reutilizara el componente `AssetDetailChatAgent` ya existente en `src/components/asset-detail/AssetDetailChatAgent.tsx`. Este componente:
- Ya implementa la funcion `getAriaContext()` que extrae SOLO metadatos publicos (nombre, descripcion, categoria, version, esquema, casos de uso)
- Ya BLOQUEA explicitamente: `api_url`, `api_headers`, `allowed_wallets`, `denied_wallets`, IDs internos
- Ya incluye ChatGuard (3 strikes), TokenWallet, streaming SSE y preguntas sugeridas
- Ya usa el namespace `catalogDetails` con traducciones en 7 idiomas

**Cambios en DataView.tsx:**

1. Importar `AssetDetailChatAgent`
2. Anadir una nueva pestana `"ai"` en el TabsList (linea ~513), con icono Sparkles y texto `t('tabs.aiAssistant')`
3. Anadir el `TabsContent value="ai"` con el componente `AssetDetailChatAgent`, pasandole:
   - `product.asset_id`: `transaction.asset?.id`
   - `product.asset_name`: `productData?.name`
   - `product.asset_description`: `productData?.description`
   - `product.category`: `productData?.category`
   - `product.version`: `productData?.version`
   - `product.schema_definition`: `productData?.schema_definition`
   - `product.custom_metadata`: (objeto limpio sin api_url/api_headers/wallets)
   - `schemaColumns`: el array `schema` ya existente

4. Anadir clave `tabs.aiAssistant` en los 7 archivos `dataView.json`

**Seguridad:** El contexto se filtra a traves de `getAriaContext()` del propio componente, que ya excluye api_url, api_headers, allowed_wallets, denied_wallets e IDs de sistema. Ademas, al pasar `custom_metadata`, se creara un objeto sanitizado que excluya explicitamente esos campos sensibles.

---

### 4. Verificacion de Notificaciones de "Aprobacion Final"

La funcion de base de datos `notify_on_transaction_change` ya gestiona correctamente el estado `approved`:

```text
WHEN 'approved' THEN
  _title := _product_name || ': Solicitud aprobada';
  _msg := 'La solicitud de datos ha sido aprobada...';
```

Esta funcion inserta registros en la tabla `notifications` para todos los usuarios de las organizaciones involucradas. No se requieren cambios adicionales -- las notificaciones de aprobacion final ya se guardan correctamente en la base de datos y apareceran en `/notifications`.

---

### Resumen de archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/DataView.tsx` | Spacing AccessHistory, nueva pestana AI, import del chat agent |
| `src/utils/pdfGenerator.ts` | Renombrar archivo de salida del PDF |
| `src/locales/es/dataView.json` | Nuevas claves: `tabs.aiAssistant`, renaming licencia->contrato gobernanza |
| `src/locales/en/dataView.json` | Idem |
| `src/locales/fr/dataView.json` | Idem |
| `src/locales/de/dataView.json` | Idem |
| `src/locales/it/dataView.json` | Idem |
| `src/locales/pt/dataView.json` | Idem |
| `src/locales/nl/dataView.json` | Idem |

