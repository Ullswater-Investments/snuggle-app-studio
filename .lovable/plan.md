

## Volver a 3 cards por línea en /success-stories

### Cambio

En `src/pages/SuccessStories.tsx` (línea 901), revertir la grilla de 4 columnas máximo a 3:

- De: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- A: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

Esto eliminará el breakpoint `xl:grid-cols-4` y mantendrá un máximo de 3 cards por línea, dando más espacio y respiración visual a cada tarjeta.

### Archivo modificado

- `src/pages/SuccessStories.tsx` (1 línea)

