

## Plan: Eliminar el botón "Demo Interactiva"

Se eliminará el botón "Prova la Demo Interattiva" / "Prueba la Demo Interactiva" de la Landing page. Este botón aparece en dos lugares:

1. **Versión Desktop** (línea 372-374): Dentro de `div.hidden.lg:block`, junto al botón WHITEPAPER.
2. **Versión Mobile** (línea 384-385): Dentro de `div.lg:hidden`, misma estructura duplicada para móvil.

### Cambios en `src/pages/Landing.tsx`

- **Líneas 372-374**: Eliminar el bloque `<Button>` con `<Link to="/auth">` que renderiza `tc('tryInteractiveDemo')`.
- **Líneas 384-386 (aprox.)**: Eliminar el mismo bloque en la versión móvil.

El botón WHITEPAPER permanecerá visible en ambos breakpoints. Los contenedores flex se mantendrán para seguir centrando el botón restante.

