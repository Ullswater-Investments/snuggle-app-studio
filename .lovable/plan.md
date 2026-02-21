

## Conexion real de las paginas de Admin: Usuarios y Transacciones

### Diagnostico

1. **AdminUsers** (`/admin/users`): Llama a una edge function `admin-users` que **no existe**. Por eso muestra 0 usuarios.
2. **AdminTransactions** (`/admin/transactions`): Ya esta conectada correctamente a Supabase con queries reales. Los 0 registros se deben a que la tabla `data_transactions` esta vacia en este entorno (las transacciones demo solo se crean para `demo@procuredata.app`). Los filtros y KPIs ya funcionan correctamente.

El trabajo principal es crear la edge function `admin-users` que el frontend ya espera.

---

### Cambios a realizar

#### 1. Crear edge function `admin-users`

**Archivo:** `supabase/functions/admin-users/index.ts`

Esta funcion necesita el `SUPABASE_SERVICE_ROLE_KEY` (ya configurado como secret) para listar usuarios de `auth.users`.

**Logica GET (listar usuarios):**
- Verificar que el usuario autenticado tiene rol `data_space_owner` o `admin` (seguridad)
- Consultar `auth.users` con el service role client para obtener email, created_at, last_sign_in_at
- Hacer join con `user_profiles` y `user_roles` para obtener organizaciones, nombres y roles
- Contar transacciones por usuario (via `data_transactions.requested_by`)
- Obtener historial de aprobaciones de `approval_history`
- Devolver array de objetos `AdminUser` que el frontend ya espera

**Logica POST con action=delete:**
- Verificar que el usuario target no tiene organizaciones, transacciones ni es DSO
- Eliminar el usuario de `auth.users` usando admin API

#### 2. Ajustes menores en AdminTransactions

El codigo ya esta conectado a datos reales. Solo se realizaran ajustes cosmeticos:
- Cambiar "Volumen Total" para sumar transacciones `approved` ademas de `completed` (como pide el usuario)
- Verificar que el `!inner` join no excluye transacciones sin asset (cambiarlo a left join si es necesario para no perder registros)

#### 3. Sin cambios necesarios en filtros

Los filtros de ambas paginas ya estan implementados con logica funcional:
- **AdminUsers**: Filtra por email/nombre y por estado de organizacion (client-side sobre datos de la edge function)
- **AdminTransactions**: Filtra por busqueda, estado, organizacion y rango de fechas (client-side sobre datos de Supabase)

---

### Resumen tecnico

| Archivo | Accion |
|---|---|
| `supabase/functions/admin-users/index.ts` | Crear: edge function que lista usuarios reales de auth.users con profiles, roles, transacciones y approval history |
| `src/pages/admin/AdminTransactions.tsx` | Ajuste menor: incluir `approved` en calculo de Volumen Total y cambiar `!inner` a left join |

### Nota sobre datos

Actualmente hay 3 usuarios en `auth.users` y 0 transacciones en `data_transactions`. La pagina de transacciones mostrara "0" hasta que se generen transacciones reales. La pagina de usuarios mostrara los 3 usuarios registrados una vez la edge function este desplegada.

