
## Correccion de la proteccion de rutas por organizacion

### Problema raiz identificado

El `OrganizationGuard` no funciona correctamente porque:

1. **Valor obsoleto en sessionStorage**: `activeOrgId` se inicializa desde `sessionStorage` (linea 35-37 de `useOrganizationContext.tsx`). Si un usuario tuvo una org anteriormente, ese ID persiste incluso si ya no tiene acceso a ninguna organizacion.
2. **Sin validacion cruzada**: El guard solo verifica si `activeOrgId` existe, pero no confirma que ese ID corresponda a una organizacion real en `availableOrgs`.
3. **Timing incorrecto**: `loading` solo refleja el estado del query, pero `activeOrgId` ya tiene un valor de sessionStorage antes de que el query termine, asi que el guard ve un ID valido y deja pasar.

---

### Cambios planificados

#### 1. Corregir `useOrganizationContext.tsx` - Validacion cruzada

- Despues de que `availableOrgs` cargue, verificar que `activeOrgId` realmente existe en la lista de organizaciones disponibles.
- Si `activeOrgId` de sessionStorage no esta en `availableOrgs`, limpiarlo (ponerlo a `null` y eliminar de sessionStorage).
- Cambiar el valor de `loading` para que sea `true` mientras el query no ha terminado Y mientras no se haya validado el `activeOrgId` contra `availableOrgs`.

Esto es el cambio critico que resuelve el problema de raiz.

#### 2. Reforzar `OrganizationGuard.tsx`

- Cambiar la ruta de redireccion de `/dashboard` a `/dashboard` (el dashboard ya muestra el WelcomeScreen cuando no hay org, asi que esto es correcto).
- Agregar `console.log("OrganizationGuard - activeOrgId:", activeOrgId, "loading:", loading)` para depuracion.
- Asegurar que la validacion sea estricta: solo pasar si `activeOrgId` no es null/undefined Y `loading` es false.

#### 3. Validacion interna en `PublishDataset.tsx`

- Al inicio del componente, agregar una verificacion de seguridad: si `activeOrgId` es null/undefined y no esta cargando, mostrar `<Navigate to="/dashboard" replace />`.
- Importar `Navigate` de react-router-dom y `useOrganizationContext` (ya importado).

#### 4. Validacion interna en `RequestWizard.tsx`

- Misma logica de seguridad adicional: importar `useOrganizationContext` y `Navigate`.
- Al inicio del componente, si no hay org activa y no esta cargando, redirigir a `/dashboard`.

#### 5. Mejorar `SettingsOrganization.tsx` - Estado vacio con hero logo

- Sustituir el icono `Building2` del `EmptyState` actual por el asset `procuredata-hero-logo.png`.
- Cambiar el texto del boton a "Registrar u Unirse a Organizacion".
- Hacer el boton mas grande y prominente.
- Redirigir al `/dashboard` (que muestra el WelcomeScreen con las opciones de registrar o unirse).

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/hooks/useOrganizationContext.tsx` | Validar activeOrgId contra availableOrgs, limpiar valores obsoletos de sessionStorage |
| `src/components/OrganizationGuard.tsx` | Agregar console.log de depuracion, mantener redireccion a /dashboard |
| `src/pages/dashboard/PublishDataset.tsx` | Agregar validacion interna de seguridad con Navigate |
| `src/pages/RequestWizard.tsx` | Agregar validacion interna de seguridad con Navigate |
| `src/pages/SettingsOrganization.tsx` | Hero logo en estado vacio, boton "Registrar u Unirse a Organizacion" |

---

### Detalle tecnico clave

El cambio mas importante es en `useOrganizationContext.tsx`. Actualmente el useEffect (lineas 90-96) auto-selecciona la primera org si no hay activeOrgId. Pero falta el caso inverso: si `activeOrgId` tiene un valor de sessionStorage que NO esta en `availableOrgs` (porque el usuario ya no pertenece a esa org), hay que limpiarlo. Se anadira:

```text
useEffect(() => {
  if (!isLoading && availableOrgs.length === 0) {
    // Usuario sin organizaciones: limpiar cualquier valor obsoleto
    setActiveOrgId(null);
    sessionStorage.removeItem('activeOrgId');
  } else if (!isLoading && activeOrgId && !availableOrgs.find(o => o.id === activeOrgId)) {
    // activeOrgId obsoleto: no existe en las orgs disponibles
    setActiveOrgId(null);
    sessionStorage.removeItem('activeOrgId');
  }
}, [isLoading, availableOrgs, activeOrgId]);
```

Esto garantiza que el guard nunca vera un `activeOrgId` falso, resolviendo el problema de raiz.
