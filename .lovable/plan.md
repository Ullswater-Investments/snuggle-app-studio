
## Nuevo control de Onboarding DeltaDAO en Gobernanza

### Resumen

Se anade un nuevo interruptor en la tarjeta de "Configuracion de Identidad" del panel de Gobernanza que permite activar/desactivar la exigencia de verificacion en DeltaDAO para registrar organizaciones. Cuando esta desactivado, el registro omite la llamada al endpoint externo y solo valida duplicados locales.

---

### Cambios planificados

#### 1. Insertar nueva configuracion en `system_settings` (Data insert)

Insertar una fila con `key = "require_deltadao_onboarding"` y `value = "true"` (activado por defecto, ya que es el comportamiento actual).

No se necesita migracion de esquema: la tabla `system_settings` ya usa pares clave-valor.

#### 2. Modificar `src/pages/admin/AdminGovernance.tsx`

- Anadir `require_deltadao_onboarding` al estado `govSettings` y a la query de carga (linea 116).
- Anadir un cuarto Switch en la tarjeta de "Configuracion de Identidad" (despues del Switch de KYB, antes del separador con "Estado del Ecosistema"):
  - Label: "Onboarding DeltaDAO"
  - Descripcion: "Exigir registro verificado en el portal de DeltaDAO para dar de alta la organizacion"
  - Conectado a `toggleGovSetting("require_deltadao_onboarding", v)`.
- Anadir la etiqueta en el mapa `labels` de `toggleGovSetting` para que el log diga "Requisito de Onboarding DeltaDAO activado/desactivado".

#### 3. Modificar `src/hooks/useGovernanceSettings.ts`

- Anadir `"require_deltadao_onboarding"` a `GOVERNANCE_KEYS`.
- Anadir `requireDeltadaoOnboarding: boolean` al tipo `GovernanceSettings`.
- Mapear: `requireDeltadaoOnboarding: data?.require_deltadao_onboarding !== "false"` (true por defecto).

#### 4. Modificar `src/components/onboarding/OrganizationRegistrationStep.tsx`

- Importar `useGovernanceSettings`.
- Al inicio del componente, obtener `requireDeltadaoOnboarding` del hook.
- **Caso ACTIVO (true)**: Comportamiento actual sin cambios. La verificacion DeltaDAO es obligatoria. Si falla, mostrar: "No se encontro un registro valido en DeltaDAO para esta organizacion".
- **Caso INACTIVO (false)**:
  - Ocultar/deshabilitar la seccion de "Verificacion DeltaDAO" (el bloque de wallet verification).
  - Marcar `isVerified = true` automaticamente (skip verification).
  - En `onSubmit`, omitir la validacion de DeltaDAO y pasar directamente a verificar duplicados locales (tax_id y wallet_address).
  - Si la wallet ya existe localmente, mostrar: "Esta organizacion ya esta registrada en PROCUREDATA".
  - Permitir que el formulario se envie sin wallet si DeltaDAO esta desactivado (hacer wallet opcional).

#### 5. Trazabilidad de gobernanza

Ya esta cubierta por la funcion `toggleGovSetting` existente, que inserta en `governance_logs` automaticamente con el formato: "Requisito de Onboarding DeltaDAO activado/desactivado".

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| Base de datos (insert) | Insertar fila `require_deltadao_onboarding = "true"` en `system_settings` |
| `src/pages/admin/AdminGovernance.tsx` | Nuevo Switch en tarjeta de Identidad, estado local, label para logs |
| `src/hooks/useGovernanceSettings.ts` | Nueva key y propiedad `requireDeltadaoOnboarding` |
| `src/components/onboarding/OrganizationRegistrationStep.tsx` | Logica condicional basada en el setting para omitir/exigir verificacion DeltaDAO |

---

### Detalle tecnico del flujo condicional en registro

```text
Usuario entra a /onboarding/create-organization
  |
  v
Consulta useGovernanceSettings().requireDeltadaoOnboarding
  |
  +-- true --> Mostrar seccion DeltaDAO, exigir verificacion wallet
  |              Si falla: "No se encontro un registro valido en DeltaDAO"
  |              Si OK: verificar duplicados locales (tax_id, wallet) -> registrar
  |
  +-- false --> Ocultar seccion DeltaDAO
                 Wallet es opcional (campo visible pero no obligatorio)
                 Verificar duplicados locales (tax_id, y wallet si se proporciono)
                 Si duplicado: "Esta organizacion ya esta registrada en PROCUREDATA"
                 Si OK: registrar organizacion directamente
```
