
# Plan: Cambios Tecnicos para Adecuacion a UNE 0087:2025

Este plan detalla las modificaciones tecnicas concretas necesarias en la plataforma ProcureData para cerrar las brechas de conformidad identificadas en el informe (actualmente al 78%). Se organiza por area tecnica, priorizando los cambios de mayor impacto normativo.

---

## Estado Actual y Brechas Tecnicas

La plataforma tiene 7 requisitos en estado "Parcial" y 1 "Pendiente". Los cambios tecnicos que podemos implementar directamente afectan a 4 areas:

| Area | Brecha | Impacto |
|------|--------|---------|
| Interoperabilidad Semantica | `catalog_metadata` solo tiene 5 campos (id, asset_id, visibility, tags, categories). Faltan campos DCAT-AP 3.0 | Alto |
| Identidad SSI | DIDs implementados pero sin Verifiable Credentials W3C almacenables | Alto |
| Gobernanza de Datos | Sin declaracion obligatoria de calidad al publicar activos | Medio |
| Soberania de Infraestructura | Sin plan de portabilidad documentado ni Docker | Medio |

---

## Entregable 1: DCAT-AP 3.0 en Catalogo de Metadatos

Anadir campos estandar europeos a la tabla `catalog_metadata` para cumplir la interoperabilidad semantica (Seccion 5.3 UNE).

**Migracion SQL:**
Anadir columnas DCAT-AP 3.0:
- `dct_title` (text) — Titulo estandarizado del activo
- `dct_description` (text) — Descripcion conforme DCAT
- `dct_publisher` (text) — Organizacion publicadora
- `dct_issued` (timestamptz) — Fecha de publicacion
- `dct_modified` (timestamptz) — Ultima modificacion
- `dct_language` (text[], default '{es}') — Idiomas disponibles
- `dct_spatial` (text) — Cobertura geografica
- `dct_temporal_start` / `dct_temporal_end` (timestamptz) — Cobertura temporal
- `dcat_distribution` (jsonb) — Distribuciones disponibles (formato, URL, mediaType)
- `dcat_theme` (text[]) — Tematicas segun vocabulario EU
- `dct_access_rights` (text) — Derechos de acceso (public, restricted, non-public)
- `dct_conformsTo` (text) — Estandar al que se adhiere
- `dcat_contact_point` (jsonb) — Punto de contacto

**Codigo:**
- Crear componente `DcatApMetadataForm.tsx` para captura de metadatos DCAT-AP al publicar activos
- Crear funcion `generateDcatApJsonLd()` en `src/services/dcatAp.ts` que exporte metadatos en formato JSON-LD conforme DCAT-AP 3.0
- Modificar el flujo de publicacion de activos para incluir los campos DCAT-AP

---

## Entregable 2: Verifiable Credentials (VCs) W3C

Completar el sistema SSI pasando de DIDs simples a credenciales verificables almacenables y presentables.

**Migracion SQL:**
- Crear tabla `verifiable_credentials`:
  - `id` (uuid, PK)
  - `organization_id` (uuid, FK organizations)
  - `credential_type` (text) — ej: "KYBCredential", "SectorCertification", "GreenPartner"
  - `issuer_did` (text) — DID del emisor
  - `subject_did` (text) — DID del sujeto
  - `credential_data` (jsonb) — W3C VC completa en JSON-LD
  - `proof` (jsonb) — Prueba criptografica
  - `issued_at` (timestamptz)
  - `expires_at` (timestamptz, nullable)
  - `status` (text) — active, revoked, expired
  - `revocation_reason` (text, nullable)
  - RLS: organizaciones solo ven sus propias credenciales + credenciales publicas

**Codigo:**
- Crear servicio `src/services/verifiableCredentials.ts` con funciones para:
  - `issueCredential()` — Generar VC firmada con la wallet Web3 del emisor
  - `verifyCredential()` — Verificar firma y vigencia
  - `presentCredential()` — Crear Verifiable Presentation (VP) para compartir
- Crear componente `VerifiableCredentialsPanel.tsx` que muestre las VCs de una organizacion con estados
- Integrar en el dashboard de organizacion

---

## Entregable 3: Declaracion de Calidad Obligatoria

Implementar campo obligatorio de calidad al publicar activos (Seccion 6.3 UNE).

**Migracion SQL:**
- Anadir columnas a `data_assets`:
  - `quality_declaration` (jsonb) — Declaracion de calidad del proveedor
  - `update_frequency` (text) — Frecuencia de actualizacion (daily, weekly, monthly, quarterly, annual)
  - `coverage_percentage` (integer) — Porcentaje de cobertura de datos
  - `validation_method` (text) — Metodo de validacion usado
  - `quality_score_declared` (integer) — Health Score declarado por el proveedor (0-100)
  - `quality_score_verified` (integer, nullable) — Health Score calculado automaticamente

**Codigo:**
- Crear componente `QualityDeclarationForm.tsx` con formulario de declaracion de calidad
- Modificar el flujo de publicacion para hacer obligatoria la declaracion
- Crear funcion `calculateVerifiedQualityScore()` que compare declarado vs real

---

## Entregable 4: Revocacion Automatica por Expiracion

Implementar logica automatica para revocar acceso cuando expire `access_duration_days` (Seccion 4.1.2 UNE).

**Migracion SQL:**
- Crear funcion SQL `revoke_expired_transactions()` que actualice a estado `expired` las transacciones cuyo `created_at + access_duration_days` haya pasado
- Crear trigger o cron job usando `pg_cron` (si disponible) o una Edge Function programada

**Codigo:**
- Crear Edge Function `check-expired-transactions` que ejecute la revocacion periodicamente
- Crear Edge Function `auto-revoke-cron` invocable por cron que llame a la funcion SQL

---

## Entregable 5: Niveles de Aseguramiento (LoA) eIDAS

Implementar niveles diferenciados de confianza segun el tipo de verificacion (Seccion 6.2 UNE).

**Migracion SQL:**
- Anadir columna `assurance_level` (text) a `organizations`:
  - `low` — Solo email verificado
  - `substantial` — KYB + DID verificado
  - `high` — KYB + DID + Certificado cualificado eIDAS
- Anadir columna `required_assurance_level` (text) a `data_assets` para que los proveedores definan el nivel minimo requerido para acceder a sus datos

**Codigo:**
- Crear funcion `calculateAssuranceLevel()` que determine el nivel automaticamente basado en las verificaciones completadas
- Modificar flujo de solicitud de datos para validar que el consumer tenga el LoA requerido
- Crear componente `AssuranceLevelBadge.tsx` visual

---

## Entregable 6: Exportador JSON-LD / DCAT-AP

Crear endpoint que genere la descripcion completa del catalogo en formato DCAT-AP 3.0 para federacion con otros espacios de datos.

**Codigo:**
- Crear Edge Function `export-dcat-catalog` que genere un documento JSON-LD conforme DCAT-AP 3.0 con todos los activos publicos
- Incluir contextos `@context` con namespaces dct, dcat, foaf, vcard
- Anadir boton "Exportar Catalogo DCAT-AP" en el portal de transparencia

---

## Entregable 7: Plan de Portabilidad Documentado

Crear documentacion tecnica de portabilidad para soberania de infraestructura.

**Archivo:** `docs/PLAN_PORTABILIDAD_PROCUREDATA.md`

Contenido:
- Exportacion completa de PostgreSQL (pg_dump)
- Migracion de Edge Functions a Deno/Node.js standalone
- Contenedorizacion con Docker/Docker Compose
- Despliegue en nubes soberanas europeas (OVHcloud, IONOS, T-Systems)
- Estimacion de costes y timeline

---

## Resumen de Impacto en Conformidad

| Entregable | Requisito UNE | Estado Actual | Estado Esperado |
|------------|---------------|---------------|-----------------|
| 1. DCAT-AP 3.0 | Interoperabilidad Semantica (5.3) | Parcial | Cumple |
| 2. Verifiable Credentials | Identidad Federada (5.4 IAM) | Parcial | Cumple |
| 3. Calidad Obligatoria | Gobernanza de Datos (6.3) | Cumple | Cumple+ |
| 4. Revocacion Automatica | Soberania sobre Activos (4.1.2) | Cumple | Cumple+ |
| 5. Niveles LoA | Gobernanza Interoperabilidad (6.2) | Cumple | Cumple+ |
| 6. Exportador DCAT | Interoperabilidad Semantica (5.3) | Parcial | Cumple |
| 7. Plan Portabilidad | Soberania Infraestructura (4.1.3) | Parcial | Cumple |

**Conformidad estimada tras implementacion: 88-92%** (el 100% requiere acciones externas como certificacion CRED y constitucion juridica de la Autoridad de Gobierno).

---

## Secuencia de Implementacion

Dado el volumen, se recomienda implementar en 4 fases:
1. **Fase A** (Entregables 1 + 6): DCAT-AP 3.0 — migracion + formulario + exportador
2. **Fase B** (Entregable 2): Verifiable Credentials — tabla + servicio + panel
3. **Fase C** (Entregables 3 + 4 + 5): Calidad + Revocacion + LoA — migraciones + logica
4. **Fase D** (Entregable 7): Documentacion de portabilidad

## Seccion Tecnica

### Migraciones SQL necesarias
- 1 ALTER TABLE sobre `catalog_metadata` (13 columnas nuevas)
- 1 CREATE TABLE `verifiable_credentials` (12 columnas)
- 1 ALTER TABLE sobre `data_assets` (6 columnas nuevas)
- 1 ALTER TABLE sobre `organizations` (1 columna nueva)
- 1 ALTER TABLE sobre `data_assets` (1 columna nueva para LoA)
- 1 CREATE FUNCTION `revoke_expired_transactions()`
- Politicas RLS para la nueva tabla

### Archivos nuevos estimados
- `src/services/dcatAp.ts`
- `src/services/verifiableCredentials.ts`
- `src/components/DcatApMetadataForm.tsx`
- `src/components/VerifiableCredentialsPanel.tsx`
- `src/components/QualityDeclarationForm.tsx`
- `src/components/AssuranceLevelBadge.tsx`
- `supabase/functions/export-dcat-catalog/index.ts`
- `supabase/functions/check-expired-transactions/index.ts`
- `docs/PLAN_PORTABILIDAD_PROCUREDATA.md`

### Archivos a modificar
- Flujo de publicacion de activos (para incluir DCAT-AP y calidad)
- Dashboard de organizacion (para mostrar VCs y LoA)
- Portal de transparencia (para boton de exportacion DCAT)
- `src/pages/RecomendacionesUne.tsx` (actualizar porcentaje de conformidad)
