

## Rediseno completo de `generateLicensePDF` - Contrato Legal Profesional

### Archivo a modificar

| Archivo | Accion |
|---|---|
| `src/utils/pdfGenerator.ts` | Reescribir completamente |

### Especificaciones del documento

**Formato:**
- Margenes de 25mm (2.5cm) en todos los lados
- Fuente Helvetica (equivalente sin serifa disponible en jsPDF, similar a Segoe UI)
- Cuerpo: 10pt, titulos de clausula: 12pt bold, titulo principal: 16pt bold
- Interlineado 1.13x (controlado via espaciado vertical entre lineas)
- 6pt de espaciado entre parrafos

**Estructura del documento:**

1. **Cabecera con logo**: Logo PROCUREDATA embebido como base64 (usando `procuredata-logo.png` convertido). Debajo, titulo centrado: "CONTRATO DE LICENCIA DE USO DE DATOS - ECOSISTEMA PONTUS-X"

2. **Identificacion del contrato**: ID de transaccion, fecha de emision

3. **Comparecientes**:
   - "De una parte, [providerName], en adelante EL LICENCIANTE"
   - "De otra parte, [consumerName], en adelante EL LICENCIATARIO"

4. **Clausulas ODRL dinamicas** (extraidas de `transaction.asset.custom_metadata.access_policy`):
   - Clausula 1 - Permisos: lista numerada de `access_policy.permissions`
   - Clausula 2 - Prohibiciones: lista de `access_policy.prohibitions`
   - Clausula 3 - Obligaciones: lista de `access_policy.obligations`
   - Clausula 4 - Duracion: `access_duration_days` dias desde la aprobacion
   - Clausula 5 - Proposito: `transaction.purpose`

5. **Compromiso normativo RGPD y Data Act**: Parrafo legal donde ambas partes se comprometen al cumplimiento del Reglamento (UE) 2016/679 (RGPD) y el Reglamento (UE) 2023/2854 (Data Act)

6. **Pie con validacion blockchain**:
   - Hash SHA-256 generado a partir de los datos del contrato (no aleatorio)
   - Texto: "Documento generado automaticamente por el nodo notario de PROCUREDATA. Este contrato tiene validez juridica mediante evidencia en red blockchain privada."

### Detalle tecnico

- Se usara `jsPDF` directamente (no se necesita `jspdf-autotable` ya que no hay tablas complejas)
- El logo se embebera como cadena base64 dentro del archivo para evitar problemas de carga asincrona
- El hash se calculara con `crypto.subtle.digest('SHA-256', ...)` usando datos reales del contrato (no `Math.random`)
- Se usaran valores por defecto para las politicas ODRL si `access_policy` no existe (los mismos defaults que ya usa DataView.tsx)
- La firma del PDF es `Licencia_PROCUREDATA_{id_corto}.pdf`
- Se controlara el salto de pagina automatico cuando el contenido exceda la primera pagina

