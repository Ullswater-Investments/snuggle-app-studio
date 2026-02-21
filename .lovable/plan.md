

## Flexibilizar el origen de la Wallet en el registro

### Problema actual

Cuando el control "Onboarding DeltaDAO" esta **desactivado**, la seccion de verificacion de wallet se oculta completamente (lineas 396-475 de `OrganizationRegistrationStep.tsx`). Esto significa que:
- No hay campo visible para que el usuario introduzca o modifique su wallet.
- Se usa silenciosamente la wallet del Paso 1 (via prop `walletAddress` o `localStorage`), sin que el usuario pueda confirmarla o cambiarla.

Cuando esta **activado**, el campo de wallet existe dentro del bloque de verificacion DeltaDAO, pero esta bloqueado (`disabled`) una vez verificado.

### Cambios planificados

#### 1. Anadir campo de Wallet Address visible siempre en el Paso 2

En `src/components/onboarding/OrganizationRegistrationStep.tsx`:

- **Caso DeltaDAO INACTIVO**: Mostrar un campo de texto editable "Wallet Address (opcional)" fuera del bloque de verificacion DeltaDAO. El usuario puede:
  - Dejarlo con la wallet pre-rellenada del Paso 1.
  - Modificarla libremente.
  - Dejarlo vacio (wallet opcional).
- **Caso DeltaDAO ACTIVO**: Sin cambios visuales. El campo de wallet ya existe dentro del bloque de verificacion. La wallet verificada es la que se usa.

#### 2. Asegurar que `onSubmit` use el valor actual de `walletInput`

Ya funciona asi (linea 309: `wallet_address: walletInput || null`), pero verificaremos que:
- Si DeltaDAO esta activo, solo se permite enviar si `isVerified === true` (ya implementado).
- Si DeltaDAO esta inactivo, se toma el valor actual de `walletInput` (editado o no por el usuario) y se verifica duplicados locales antes de guardar.

#### 3. Posicion del nuevo campo en el formulario

El campo de wallet se colocara justo antes de la seccion de "Consentimientos legales", despues del grid de Sector/Tamano, con:
- Label: "Wallet Address"
- Placeholder: "0x... (opcional)"
- Texto de ayuda: "Introduce la direccion de wallet que deseas asociar a tu organizacion. Si generaste una en el paso anterior, ya esta pre-rellenada."

---

### Archivo a modificar

| Archivo | Cambio |
|---|---|
| `src/components/onboarding/OrganizationRegistrationStep.tsx` | Anadir campo de wallet editable cuando DeltaDAO esta inactivo, posicionado antes de consentimientos legales |

### Detalle tecnico

El campo nuevo solo se renderiza cuando `!requireDeltadaoOnboarding`. Cuando DeltaDAO esta activo, el campo ya existe dentro del bloque de verificacion (lineas 412-426). No se duplica.

```text
Formulario Paso 2:
  [Verificacion DeltaDAO]  <-- solo si requireDeltadaoOnboarding === true
  [Nombre legal]
  [Tipo doc / Numero doc]
  [Pais]
  [Direccion]
  [Sector / Tamano]
  [Wallet Address]         <-- NUEVO, solo si requireDeltadaoOnboarding === false
  [Consentimientos]
  [Botones]
```
