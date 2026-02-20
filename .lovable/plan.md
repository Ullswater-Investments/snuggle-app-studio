
## Actualizar Header de la Landing Page

### Cambios en `src/pages/Landing.tsx`

#### 1. Logo del Header: Usar el icono del circulo azul

Reemplazar el componente `ProcuredataLogo` en el header (linea 308) por el logo hero (`procuredata-hero-logo.png` / `procuredata-logo-dark.png`) con tamano reducido (~32px) apropiado para la barra superior. Se mantendran ambas variantes (claro/oscuro).

#### 2. Logica del boton principal (lineas 326-330)

La logica actual esta **invertida**: muestra "Empezar Registro" cuando hay usuario, y "Acceso Demo" cuando no lo hay. Se corregira:

- **Usuario logueado**: Boton "Ir al Dashboard" con enlace a `/dashboard`, variante `brand`
- **Usuario NO logueado**: Boton "Empezar Registro" con enlace a `/auth`, variante `hero`

#### 3. Logo clicable con logica dinamica

El logo del header redirigira a:
- `/dashboard` si el usuario esta autenticado
- `/` (landing) si no lo esta

#### Detalle tecnico

```text
Archivo: src/pages/Landing.tsx

Linea 308:
  ANTES:  <ProcuredataLogo size="lg" showNavigation={true} />
  DESPUES: <Link to={user ? "/dashboard" : "/"}>
             <img src={procuredataHeroLogo} alt="PROCUREDATA" className="h-8 object-contain dark:hidden" />
             <img src={procuredataLogoDark} alt="PROCUREDATA" className="h-8 object-contain hidden dark:block" />
           </Link>

Lineas 326-330:
  ANTES:  user ? Link to /register : Link to /auth
  DESPUES: user ? "Ir al Dashboard" -> /dashboard : "Empezar Registro" -> /auth
```

Solo se modifica `src/pages/Landing.tsx`. No se requieren cambios en otros archivos.
