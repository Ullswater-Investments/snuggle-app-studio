

## Ajustes de UX en DataView.tsx

### Resumen

Aplicar 5 correcciones de texto, iconografia y visibilidad en `src/pages/DataView.tsx` para eliminar ruido visual y alinear la terminologia con el ecosistema Pontus-X.

---

### 1. Eliminar boton "Volver a solicitudes"

**Lineas 341-346**: Eliminar el bloque completo del boton con `ArrowLeft` y `navigate("/requests")`. Mantener unicamente el `RevokeAccessButton` alineado a la derecha cuando corresponda. Tambien eliminar el boton "Volver a solicitudes" del estado de error (linea 299).

---

### 2. Renombrar "Politicas de Acceso" (eliminar ODRL)

**Linea 464-467**: La tab ya dice "Politicas de Acceso" sin ODRL. Sin embargo, revisar el aviso legal al final (linea 662) que menciona "PROCUREDATA y la red Pontus-X" -- mantener esa referencia ya que es correcta en contexto.

**Linea 605**: El titulo `h3` dentro de la tab dice "Politicas de Acceso" -- correcto, sin cambios.

No hay referencias a "ODRL" en este archivo, asi que este punto ya esta cubierto.

---

### 3. Ocultar tab "Calidad"

**Lineas 461-463**: Eliminar el `TabsTrigger` de "Calidad" y su contenido `TabsContent` (lineas 574-601) para que no aparezca hasta que existan metricas registradas.

---

### 4. Mejorar empty state de "Muestra"

**Lineas 563-569**: Reemplazar el empty state actual con el patron del catalogo (`ProductDetail.tsx`): circulo con icono `Eye`, titulo "Muestra no disponible", y mensaje profesional similar al del catalogo.

```text
Antes:
  <Database icon> "Sin muestras disponibles"
  "El proveedor no ha proporcionado datos de ejemplo..."

Despues:
  <Eye icon dentro de circulo muted>
  "Muestra no disponible"
  "El proveedor no ha proporcionado una muestra de datos para este activo.
   Puede solicitar mas informacion tecnica contactando con el proveedor."
```

---

### 5. Traducir etiquetas tecnicas a texto legible

| Ubicacion | Antes | Despues |
|---|---|---|
| Linea 489 (Estado en tab Descripcion) | `{transaction.status}` | Mapa: `completed` -> "Completado", `approved` -> "Aprobado", `pending` -> "Pendiente", `denied` -> "Denegado", `pre_approved` -> "Pre-aprobado", `revoked` -> "Revocado" |
| Linea 683 (Estado actual en "datos no disponibles") | `{transaction.status}` | Mismo mapa de traduccion |

Crear un mapa `STATUS_LABELS` al inicio del componente:

```typescript
const STATUS_LABELS: Record<string, string> = {
  created: "Creada",
  pending: "Pendiente",
  pre_approved: "Pre-aprobada",
  approved: "Aprobada",
  completed: "Completado",
  denied: "Denegada",
  revoked: "Revocado",
};
```

---

### 6. Reescribir seccion "Acceso al Activo" (Gateway)

**Lineas 706-718**: Reemplazar la descripcion del panel de Gateway para consumidores. Eliminar la referencia a "Gateway seguro de PROCUREDATA" y usar terminologia del ecosistema Pontus-X (Access Controller):

```text
Antes:
  Titulo: "Acceso al Activo"
  Desc: "Este activo se consume a traves del Gateway seguro de PROCUREDATA..."
  Texto: "Al descargar, el Gateway se conecta de forma segura al proveedor..."

Despues:
  Titulo: "Acceso al Activo"
  Desc: "Este activo se consume a traves del Access Controller del espacio de datos.
         Los datos se obtienen en tiempo real desde la fuente del proveedor,
         garantizando la privacidad y seguridad del intercambio."
  Texto: "Al descargar, el Access Controller verifica tus permisos y se conecta
          de forma segura al proveedor, entregandote los datos actualizados
          sin exponer credenciales tecnicas."
```

---

### Archivos a Modificar

| Archivo | Cambio |
|---|---|
| `src/pages/DataView.tsx` | Todos los cambios descritos arriba |

### Sin Nuevas Dependencias

El icono `Eye` de `lucide-react` necesita ser importado (actualmente no esta en las importaciones del archivo).

