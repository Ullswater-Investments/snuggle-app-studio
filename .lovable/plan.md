
## Ajustes de seguridad y branding en el flujo inicial

### 1. Validacion de mayoria de edad en Auth.tsx

**Archivo:** `src/pages/Auth.tsx`

**Cambios en el schema Zod (linea 43):**
- Anadir `.refine()` al campo `birthDate` para verificar que la fecha corresponde a 18 anos o mas respecto a `new Date()`
- Mensaje de error: "Debes ser mayor de 18 anos para registrarte en la plataforma"

**Cambios en el Calendar (linea 521-532):**
- Modificar la funcion `disabled` del componente `Calendar` para que el rango maximo sea `toYear={new Date().getFullYear() - 18}` y la fecha maxima seleccionable sea hace 18 anos exactos
- Calcular `maxDate = new Date()` restando 18 anos al ano, manteniendo mes y dia actuales
- Esto hace imposible seleccionar una fecha que no cumpla el requisito

**Logica combinada:** La validacion Zod actua como red de seguridad (server-side validation) mientras que el `disabled` del calendar previene la seleccion visual (UX).

---

### 2. Gradiente premium en el titulo de WelcomeScreen

**Archivo:** `src/components/WelcomeScreen.tsx`

- En el `<h1>` del titulo "Bienvenido a PROCUREDATA" (linea ~40), envolver "PROCUREDATA" en un `<span>` con la clase `procuredata-gradient font-bold tracking-tight` para que use el degradado oficial ya definido en `index.css`
- El resto del texto ("Bienvenido a") mantiene su estilo normal

---

### 3. Gradiente premium en RequestInvite

**Archivo:** `src/pages/onboarding/RequestInvite.tsx`

- En el `<CardTitle>` "Solicitar Invitacion", no hay texto PROCUREDATA que cambiar
- El logo ya usa `<ProcuredataLogo>` con el logo oficial (circulo azul con socket). No se necesita cambio de logo aqui
- Si el usuario quiere anadir el texto con gradiente debajo del logo, se puede anadir un subtitulo con `procuredata-gradient`

**Nota:** Ambas paginas ya usan `<ProcuredataLogo>` que muestra el logo oficial (circulo azul). No hay "icono naranja" visible en estas pantallas - el logo ya es correcto. El cambio principal es aplicar el gradiente al texto "PROCUREDATA" en el titulo de bienvenida.

---

### Resumen de archivos

| Archivo | Cambio |
|---|---|
| `src/pages/Auth.tsx` | Validacion Zod de 18+ anos y restriccion en Calendar picker |
| `src/components/WelcomeScreen.tsx` | Gradiente en texto "PROCUREDATA" del titulo |
| `src/pages/onboarding/RequestInvite.tsx` | Sin cambios necesarios (logo ya es correcto) |
