

## Actualizacion profunda de `generateLicensePDF` - Contrato Legal v2

### Resumen de cambios

Se reescribira completamente `src/utils/pdfGenerator.ts` y se ajustara la consulta en `DataView.tsx` para pasar datos adicionales de las organizaciones y la fecha de aprobacion.

---

### Cambios en la consulta de DataView.tsx

**Archivo:** `src/pages/DataView.tsx`

1. **Ampliar la consulta de organizaciones** para incluir `tax_id`, `sector`, `description` (usado como direccion social si no hay campo dedicado):
   - `consumer_org`: anadir `tax_id, sector, description`
   - `subject_org`: anadir `tax_id, sector, description`
   - `holder_org`: anadir `tax_id, sector, description`

2. **Consultar `approval_history`** para obtener la fecha real de aprobacion:
   - Buscar el registro con `action = 'approve'` para esta transaccion
   - Pasar esa fecha al generador de PDF como `approvalDate`

3. **Actualizar la llamada a `generateLicensePDF`** para pasar los objetos completos de organizacion y la fecha de aprobacion en lugar de solo los nombres.

---

### Reescritura completa de pdfGenerator.ts

**Archivo:** `src/utils/pdfGenerator.ts`

#### Estructura del documento actualizado:

1. **Encabezado en cada pagina**
   - Texto "PROCUREDATA" en azul corporativo (como marca de agua de cabecera) en la parte superior de cada pagina
   - Linea separadora azul debajo

2. **Pie de pagina en cada pagina**
   - Sello de integridad blockchain (Hash SHA-256) a la izquierda
   - Texto "Documento generado automaticamente por el nodo notario de PROCUREDATA"
   - Contador "Pagina X | Y" en el margen inferior derecho
   - Se implementara usando el evento `didDrawPage` de jsPDF o se dibujara manualmente tras finalizar el contenido recorriendo todas las paginas

3. **Titulo principal**
   - "CONTRATO DE LICENCIA DE USO DE DATOS" (sin "ECOSISTEMA PONTUS-X")

4. **Fecha de emision**
   - Usar la fecha de aprobacion real de la transaccion (de `approval_history` con action='approve')
   - Si no existe, fallback a `updated_at` de la transaccion

5. **Comparecientes ampliados**
   - EL LICENCIANTE (subject_org/holder_org): nombre, CIF/VAT (`tax_id`), pais (extraido de sector o hardcode "Espana"), direccion social (`description` como fallback)
   - EL LICENCIATARIO (consumer_org): mismos campos

6. **Identificacion detallada del activo**
   - Nombre del activo
   - Version (de `data_products.version`)
   - Categoria (de `data_products.category`)
   - UUID de la transaccion

7. **Clausulas con narrativa introductoria**
   - Clausula 1 (Permisos): texto intro "Define las acciones y derechos de explotacion tecnica autorizados sobre el activo." + lista numerada
   - Clausula 2 (Prohibiciones): texto intro "Establece las limitaciones de uso para salvaguardar la propiedad industrial y confidencialidad." + lista
   - Clausula 3 (Obligaciones): texto intro "Determina los requisitos imperativos que el LICENCIATARIO debe cumplir para mantener la vigencia de esta licencia." + lista
   - Clausula 4 (Duracion): sin cambios en contenido
   - Clausula 5 (Proposito): sin cambios en contenido
   - Clausula 6 (Compromiso Normativo RGPD + Data Act): sin cambios en contenido
   - **Clausula 7 (Nueva) - Terminos y Condiciones Particulares**: Si `custom_metadata.terms_and_conditions` o similar existe, incluir clausula donde el LICENCIATARIO se compromete a cumplir los terminos y condiciones particulares proporcionados por el LICENCIANTE. Si no hay T&C, se omite esta clausula.

8. **Tipografia**
   - Helvetica 10pt, interlineado 1.13, 6pt entre parrafos (sin cambios)

---

### Detalle tecnico

- El encabezado y pie de pagina se dibujaran recorriendo todas las paginas al final (`doc.getNumberOfPages()` + `doc.setPage(i)`)
- El hash SHA-256 se calculara antes de generar el footer para poder incluirlo en cada pagina
- El contador de paginas se renderizara como "Pagina 1 | 3" en la esquina inferior derecha
- La nueva firma de la funcion sera:

```text
generateLicensePDF(
  transaction: any,        // transaction completa con orgs expandidas
  assetName: string,
  providerOrg: { name, tax_id, sector, description },
  consumerOrg: { name, tax_id, sector, description },
  approvalDate?: string    // fecha ISO de aprobacion real
)
```

### Archivos a modificar

| Archivo | Accion |
|---|---|
| `src/utils/pdfGenerator.ts` | Reescribir completamente |
| `src/pages/DataView.tsx` | Ampliar query de orgs + pasar datos extra al PDF |

