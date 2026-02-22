

## Sustitucion de PaymentGateway por ConfirmRequestModal en RequestWizard

### Resumen

Se reemplazara el componente `PaymentGateway` (con logica de tarjeta, wallet Web3 y transferencia bancaria) por un nuevo modal de confirmacion de gobernanza ligero y enfocado en la experiencia de solicitud de acceso. Sin logica de pago externa ni Ethers.js.

---

### 1. Nuevo componente: `src/components/ConfirmRequestModal.tsx`

Se creara un Dialog (shadcn) con las siguientes secciones:

**Props:**
```typescript
interface ConfirmRequestModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  asset: any; // el objeto asset del wizard con product, subject_org, price, pricing_model
  isPending: boolean;
}
```

**Contenido del modal:**

- **Titulo dinamico:** "Confirmar Solicitud de Acceso Gratuito" o "Confirmar Solicitud de Acceso de Pago" segun `asset.price > 0`.
- **Resumen del Pedido:** Seccion con borde y fondo suave mostrando:
  - Producto: `asset.product.name`
  - Proveedor: `asset.subject_org.name`
  - Separador
  - Total alineado a la derecha: "Gratuito" en verde si price es 0, o precio formateado si es de pago.
- **Bloque 1 (verde):** Icono CheckCircle + "Acceso gobernado bajo Politicas de Uso"
- **Bloque 2 (azul/info):** Icono Shield + texto dinamico: "Este activo es gratuito/de pago. Tu solicitud sera enviada al proveedor para su aprobacion antes de conceder el acceso."
- **Boton de accion:** Ancho completo, variante `brand` o fondo ambar/naranja, texto "Confirmar Solicitud". Muestra "Enviando..." cuando `isPending` es true.

---

### 2. Cambios en `src/pages/RequestWizard.tsx`

- **Eliminar** la importacion de `PaymentGateway` (linea 19).
- **Importar** el nuevo `ConfirmRequestModal`.
- **Reemplazar** el bloque `<PaymentGateway ... />` (lineas 719-724) por:
  ```tsx
  <ConfirmRequestModal
    open={isPaymentOpen}
    onClose={() => setIsPaymentOpen(false)}
    onConfirm={handlePaymentConfirm}
    asset={asset}
    isPending={createTransactionMutation.isPending}
  />
  ```
- La funcion `handlePaymentConfirm` (linea 316-319) ya llama a `createTransactionMutation.mutate()`, por lo que no necesita cambios.

---

### 3. Resumen tecnico

| Aspecto | Detalle |
|---|---|
| Archivo nuevo | `src/components/ConfirmRequestModal.tsx` |
| Archivo modificado | `src/pages/RequestWizard.tsx` (solo imports y bloque del modal) |
| PaymentGateway.tsx | No se elimina el archivo (sigue en uso por `LicenseRenewalDialog.tsx`) |
| Logica de pago | Ninguna: solo persiste la transaccion en BD via `createTransactionMutation` |
| Cambios en BD | Ninguno |
| Nuevas dependencias | Ninguna |

