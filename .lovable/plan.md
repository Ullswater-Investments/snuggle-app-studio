

## Eliminar AERCE del directorio de partners

### Alcance

Eliminar la card de AERCE del directorio `/partners`, sus rutas en App.tsx, y sus paginas dedicadas. Tambien corregir los 2 errores de build en `notification-handler`.

---

### 1. Eliminar card del directorio

**`src/data/partnersData.ts`**: Eliminar el objeto con `id: "aerce"` del array (lineas 42-54).

**`src/data/premiumPartnersData.ts`**: 
- Eliminar el export `aerce` (lineas 1078-1135 aprox).
- Eliminar la referencia `aerce` del array `premiumPartnersData` (linea 3770).

### 2. Eliminar rutas en App.tsx

**`src/App.tsx`**:
- Eliminar imports: `AerceProyecto`, `AerceMiembros`, `AerceDocInstitucional`, `AerceWhitepaper`, `AerceDocTecnico` (lineas 217-221).
- Eliminar las 5 rutas `/partners/aerce/*` (lineas 459-478).

### 3. Eliminar paginas

Eliminar estos archivos:
- `src/pages/partners/AerceProyecto.tsx`
- `src/pages/partners/AerceMiembros.tsx`
- `src/pages/partners/AerceDocInstitucional.tsx`
- `src/pages/partners/AerceDocTecnico.tsx`
- `src/pages/partners/AerceWhitepaper.tsx`

**Nota**: La ruta `/partners/aerce/login` usa el `DynamicPartnerLogin` generico (linea 413: `/partners/:partnerSlug/login`), no tiene pagina dedicada. Se eliminara automaticamente al no existir el partner en el directorio.

### 4. Limpiar i18n

**`src/i18n.ts`**: Eliminar los 7 imports de `aerce.json` (es, en, fr, de, it, pt, nl) y sus referencias en los objetos de recursos.

**Archivos locale**: Los 7 archivos `src/locales/*/aerce.json` se pueden eliminar.

### 5. Componentes AERCE (conservar o eliminar)

Los componentes en `src/components/partners/aerce/` ya no seran referenciados por ninguna pagina. Se eliminaran para limpieza completa.

### 6. Fix build errors (notification-handler)

**`supabase/functions/notification-handler/index.ts`**:
- Anadir template `download` al objeto `EMAIL_TEMPLATES` (linea 149, antes del cierre).
- Cambiar `error.message` a `(error as Error).message` en linea 379.

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/data/partnersData.ts` | Eliminar entrada aerce |
| `src/data/premiumPartnersData.ts` | Eliminar export aerce + referencia en array |
| `src/App.tsx` | Eliminar imports y rutas aerce |
| `src/i18n.ts` | Eliminar imports y refs de aerce namespace |
| `supabase/functions/notification-handler/index.ts` | Fix: template download + error typing |

### Archivos a eliminar

- `src/pages/partners/Aerce*.tsx` (5 archivos)
- `src/components/partners/aerce/` (directorio completo)
- `src/locales/*/aerce.json` (7 archivos)

