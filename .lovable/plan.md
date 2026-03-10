

## Acceso directo a Casos de Exito desde Landing + Fix build error

### Problema

1. Las rutas `/success-stories` y `/success-stories/:id` estan dentro del bloque `ProtectedRoute > ProfileGuard > AppLayout` (lineas 962-1478 de App.tsx), lo que obliga a registrarse para ver los casos de exito.
2. Los links en la Landing (linea 567: `<Link to={/success-stories/${sector.caseId}}>`) apuntan correctamente pero el destino requiere autenticacion.
3. Build error en `CatalogTab.tsx` linea 197: `asset.description` es `unknown` (por el index signature `[key: string]: unknown` en `DataAssetListItem`).

### Solucion

#### 1. Mover rutas de success-stories fuera del bloque protegido

En `src/App.tsx`, extraer las 2 rutas de success-stories (lineas 1386-1393) del bloque protegido y colocarlas como rutas publicas (junto a las rutas de partners, motor, etc., antes de la linea 962). Se necesita envolver en un layout minimo (AppLayout) sin proteccion, o renderizar directamente sin layout.

Como las paginas de success-stories ya usan AppLayout internamente o necesitan sidebar, la solucion mas limpia es crear un bloque publico con AppLayout:

```text
{/* Public success stories - no auth required */}
<Route element={<AppLayout />}>
  <Route path="/success-stories" element={<SuccessStories />} />
  <Route path="/success-stories/:id" element={<SuccessStoryDetail />} />
</Route>
```

Colocar esto justo antes del bloque protegido (antes de linea 962), y eliminar las 2 rutas del bloque protegido.

#### 2. Fix build error CatalogTab.tsx

En linea 197, castear `asset.description` a string:

```typescript
{String(asset.description || '') || t("card.noDesc")}
```

O alternativamente anadir `description` como campo explicito en `DataAssetListItem`. La opcion mas limpia es anadir `description?: string;` al interface.

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/App.tsx` | Mover 2 rutas success-stories a bloque publico con AppLayout |
| `src/services/dataAssetService.ts` | Anadir `description?: string` a `DataAssetListItem` (fix build error) |

