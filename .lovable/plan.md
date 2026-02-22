

## Sistema de Calificaciones y Mejoras de Acceso en AssetDetailPage

### Archivo a modificar: `src/pages/ProductDetail.tsx`

---

### 1. Consulta de Acceso Verificado (Transaccion Completada)

Anadir una nueva query con `useQuery` que verifique si la organizacion activa tiene una transaccion `completed` para el `asset_id` actual:

```typescript
const { data: hasVerifiedAccess } = useQuery({
  queryKey: ['verified-access', id, activeOrgId],
  queryFn: async () => {
    const { data } = await supabase
      .from('data_transactions')
      .select('id')
      .eq('asset_id', id)
      .eq('consumer_org_id', activeOrgId)
      .eq('status', 'completed')
      .limit(1);
    return (data && data.length > 0);
  },
  enabled: !!id && !!activeOrgId,
});
```

**Logica del boton en el Sidebar (lineas 668-687):**
- Si `hasVerifiedAccess === true`: Mostrar boton "Explorar Dataset" con icono `Eye`, que redirige a `/data`.
- Si no: Mantener el boton "Solicitar Acceso" / "Comprar Ahora" actual.

---

### 2. Consulta de Reviews Reales y Promedio Dinamico

Anadir una query para obtener las resenas del activo desde `organization_reviews`, uniendo con `data_transactions` para filtrar por `asset_id`:

```typescript
const { data: reviews } = useQuery({
  queryKey: ['asset-reviews', id],
  queryFn: async () => {
    // Obtener transaction_ids de este asset
    const { data: txs } = await supabase
      .from('data_transactions')
      .select('id')
      .eq('asset_id', id);
    const txIds = txs?.map(t => t.id) || [];
    if (txIds.length === 0) return [];
    const { data } = await supabase
      .from('organization_reviews')
      .select('id, rating, comment, created_at, reviewer_org_id, organizations!reviewer_org_id(name)')
      .in('transaction_id', txIds);
    return data || [];
  },
  enabled: !!id,
});
```

**Promedio dinamico**: Calcular `avgRating` y `reviewCount` a partir de `reviews` y usarlos en la cabecera (debajo del titulo, linea 372) mostrando estrellas reales en lugar de texto estatico. Tambien actualizar el `reputation_score` mostrado en cualquier otra parte.

---

### 3. Pestana Resenas (lineas 605-616) - Rediseno completo

Reemplazar el estado vacio estatico actual con logica condicional:

**a) Si hay resenas**: Mostrar lista con nombre de organizacion, estrellas, comentario y fecha.

**b) Si `hasVerifiedAccess` es true y no ha dejado resena**: Mostrar formulario con selector de estrellas (1-5) y textarea para comentario, con boton "Publicar Resena" que inserta en `organization_reviews`.

**c) Si no tiene acceso verificado**: Mostrar mensaje: "Solo las organizaciones que han adquirido este activo pueden dejar una resena."

---

### 4. Pestana Muestra (lineas 567-587)

Modificar la logica de `sampleData` (linea 290):
- Eliminar `MOCK_SAMPLE` (lineas 282-288).
- Si `(product as any).sample_data` es null/vacio, en lugar de mostrar datos mock, mostrar un mensaje profesional:

> "El proveedor no ha proporcionado una muestra de datos para este activo. Puede solicitar mas informacion tecnica antes de realizar la compra."

Con icono `Eye` y un estilo de estado vacio elegante.

---

### 5. Mantenimiento de los 3 Bloques

No se alteran los 3 bloques existentes (Identidad, Metricas, Exploracion). Solo se modifica el contenido interno de las pestanas Resenas y Muestra, y la logica del boton del sidebar.

---

### Resumen tecnico

| Aspecto | Detalle |
|---|---|
| Archivo modificado | `src/pages/ProductDetail.tsx` (unico) |
| Nuevas queries | `verified-access` (data_transactions), `asset-reviews` (organization_reviews) |
| Nuevas importaciones | `Textarea` de `@/components/ui/textarea`, `useState` de react |
| Tabla usada para reviews | `organization_reviews` (ya existe con RLS) |
| Insert de reviews | Via `supabase.from('organization_reviews').insert(...)` con `reviewer_org_id = activeOrgId` |
| Cambios en BD | Ninguno - las tablas y politicas RLS ya existen |

