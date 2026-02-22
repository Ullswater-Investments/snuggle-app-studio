

## Correcciones en el panel de administracion: Equipo de organizaciones y Linaje de acciones de usuarios

### Resumen

Se corregiran dos problemas de visualizacion de datos en el panel de administracion:
1. La pestana "Equipo" en organizaciones no muestra usuarios correctamente.
2. La pestana "Linaje de Acciones" en usuarios solo muestra datos de `approval_history`, sin incluir acciones de gobernanza.

---

### Problema 1: Pestana "Equipo" muestra 0 usuarios

**Causa raiz**: La consulta de `team` (linea 170) trae datos de `user_profiles`, pero el contador y la lista se basan en `userEmails` (linea 171), que solo consulta `user_roles`. Si un usuario tiene perfil pero no tiene rol explicito en esa organizacion, no aparece. Ademas, no se obtiene el email real del usuario (solo el `user_id`).

**Solucion**: Refactorizar la pestana "Equipo" para:
- Usar la consulta de `user_profiles` (que ya tiene `organization_id`) como fuente principal de miembros.
- Obtener los roles desde `user_roles` para complementar.
- Como los emails estan en `auth.users` (no accesible desde el cliente), se mostrara el `user_id` como identificador secundario (esto ya lo hace el codigo actual). Para obtener emails reales, se ampliara la edge function `admin-users` con un nuevo endpoint que devuelva los miembros de una organizacion con sus emails.

**Implementacion concreta**:
- Ampliar la edge function `admin-users` para aceptar un query param `?orgId=xxx` que devuelva los miembros de la organizacion con nombre, email y rol.
- En `AdminOrganizations.tsx`, crear una nueva query que llame a este endpoint cuando se seleccione una organizacion.
- Mostrar nombre, email y badge de rol para cada miembro del equipo.

---

### Problema 2: Linaje de Acciones vacio

**Causa raiz**: La pestana "Linaje de Acciones" solo muestra datos de `approval_history` (aprobaciones/denegaciones de transacciones). Si el usuario no ha realizado acciones de aprobacion, la lista queda vacia. Las acciones de gobernanza (cambios de configuracion, publicacion de activos, etc.) se registran en la tabla `governance_logs` con el campo `actor_id`, pero no se consultan.

**Solucion**: Ampliar la edge function `admin-users` para incluir tambien los registros de `governance_logs` filtrados por `actor_id`, y combinarlos con el historial de aprobaciones en un unico "linaje de acciones".

**Implementacion concreta**:
- En la edge function, consultar `governance_logs` filtrado por `actor_id = uid` y devolver los ultimos 20 registros como campo `governanceLogs` en cada usuario.
- En `AdminUsers.tsx`, combinar `approvalHistory` y `governanceLogs` en una lista unificada ordenada por fecha.
- Cada entrada mostrara: descripcion de la accion (del campo `message`), categoria, nivel, y fecha/hora.
- Actualizar el mensaje de estado vacio a: "Este usuario aun no ha realizado acciones registrables en el sistema".

---

### Archivos modificados

1. **`supabase/functions/admin-users/index.ts`**:
   - Agregar consulta de `governance_logs` en el GET de listado de usuarios (junto a profiles, roles, etc.).
   - Incluir campo `governanceLogs` en cada objeto de usuario.
   - Agregar endpoint para obtener miembros de organizacion con email (`?orgId=xxx`).

2. **`src/pages/admin/AdminUsers.tsx`**:
   - Agregar `governanceLogs` a la interfaz `AdminUser`.
   - Refactorizar la pestana "Linaje de Acciones" para mostrar tanto aprobaciones como logs de gobernanza, unificados y ordenados por fecha.
   - Cambiar el mensaje vacio a la clave de traduccion correspondiente.

3. **`src/pages/admin/AdminOrganizations.tsx`**:
   - Reemplazar la consulta de la pestana "Equipo" por una llamada a la edge function con `?orgId=xxx`.
   - Mostrar nombre, email y rol de cada miembro.

4. **`src/locales/{es,en,fr,de,it,pt,nl}/admin.json`**:
   - Agregar claves: `users.noActions` ("Este usuario aun no ha realizado acciones registrables en el sistema"), `users.governanceAction` ("Accion de Gobernanza"), `users.email` ("Email"), `organizations.role` ("Rol"), `organizations.email` ("Email").

---

### Detalle tecnico

**Edge function - nuevo endpoint orgId**:
```typescript
// GET ?orgId=xxx
const orgId = url.searchParams.get("orgId");
if (orgId) {
  // Fetch profiles + roles for this org
  const { data: profiles } = await adminClient.from("user_profiles")
    .select("user_id, full_name").eq("organization_id", orgId);
  const { data: roles } = await adminClient.from("user_roles")
    .select("user_id, role").eq("organization_id", orgId);
  // Get emails from auth
  const userIds = [...new Set(profiles.map(p => p.user_id))];
  // Fetch emails from auth.users
  const members = await Promise.all(userIds.map(async (uid) => {
    const { data } = await adminClient.auth.admin.getUserById(uid);
    const role = roles.find(r => r.user_id === uid);
    const profile = profiles.find(p => p.user_id === uid);
    return { id: uid, email: data.user?.email, fullName: profile?.full_name, role: role?.role ?? "viewer" };
  }));
  return Response(JSON.stringify({ members }));
}
```

**Governance logs en listado de usuarios**:
```typescript
// Add to Promise.all
const govLogsRes = await adminClient.from("governance_logs")
  .select("actor_id, category, level, message, created_at")
  .order("created_at", { ascending: false });

// Per user:
const governanceLogs = allGovLogs
  .filter(g => g.actor_id === uid)
  .slice(0, 20);
```

**Lista unificada en el frontend**:
```typescript
const allActions = [
  ...user.approvalHistory.map(a => ({
    type: 'approval', date: a.created_at, description: actionLabels[a.action], ...a
  })),
  ...user.governanceLogs.map(g => ({
    type: 'governance', date: g.created_at, description: g.message, category: g.category, level: g.level
  })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
```

