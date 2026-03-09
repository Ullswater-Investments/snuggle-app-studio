

## Ajustes criticos en vista de detalle del producto

### Objetivo

Corregir tres problemas en `/catalog/product/:id`: (1) botones de accion activos para activos rechazados, (2) politicas ODRL mostrando keys internas en lugar de texto traducido, (3) descripcion hardcodeada como fallback.

---

### 1. Logica condicional de botones para activos rechazados

**Problema**: Cuando un propietario ve su activo rechazado, los botones "Solicitar Acceso" / "Comprar Ahora" y "Descargar Ficha Tecnica" siguen activos.

**Solucion**: En la sidebar (CardFooter, lineas 893-927), envolver los botones en una condicion `isOwnerOfRejected`:

- Si `isOwnerOfRejected === true`: Mostrar un unico boton "Editar publicacion" que redirija a `/datos/publicar?edit=<asset_id>` (o la ruta de edicion existente). Ocultar botones de compra y descarga de ficha.
- Si `isOwnerOfRejected === false`: Renderizar normalmente (este caso ya esta cubierto por el guard 404).

Se anadira la clave `editPublication` al namespace `catalogDetails` en los 7 idiomas.

---

### 2. Internacionalizacion de politicas ODRL en la pestana "Politicas"

**Problema**: La pestana de politicas (lineas 650-716) renderiza los valores del array `accessPolicy.permissions/prohibitions/obligations` directamente. Tras la refactorizacion de "llaves desacopladas", estos arrays contienen keys como `COMMERCIAL_USE`, `NO_REDISTRIBUTION`, etc., que se muestran tal cual al usuario.

**Solucion**: Crear una funcion `translatePolicyItem(key, category, t)` en `ProductDetail.tsx`:

```text
function translatePolicyItem(
  item: string,
  category: 'permissions' | 'prohibitions' | 'obligations',
  t: TFunction
): string {
  // Intentar traducir como key predefinida usando el namespace publish
  const translated = t(`publish:step3.${category}.${item}`, { defaultValue: '' });
  // Si existe traduccion, usarla; si no, es texto personalizado
  return translated || item;
}
```

Esto reutiliza las traducciones ya existentes en `publish.json` (step3.permissions.COMMERCIAL_USE, etc.) sin duplicar claves.

Al renderizar cada item de la lista:
```text
<span>{translatePolicyItem(item, 'permissions', t)}</span>
```

Tambien se eliminaran los fallbacks de mock data en espanol (lineas 658, 674, 690) que se usan cuando `accessPolicy` es nulo:
- `["Uso comercial permitido", "Analisis interno"]` -> Se usara un empty state traducido si no hay politicas.

Se anadira la clave `noPoliciesDefined` al namespace `catalogDetails`.

---

### 3. Eliminacion de descripcion mock / fallback correcto

**Problema**: La linea 157 de `catalogDetails.json` tiene `defaultDescription: "Este dataset proporciona informacion critica para la toma de decisiones en tiempo real."` que se usa como fallback generico (linea 522).

**Solucion**: 
- Reemplazar la linea 522 para que use `product.asset_description` directamente.
- Si es nulo/vacio, renderizar un fallback elegante en cursiva con una clave i18n nueva `noDescription`.
- Actualizar/eliminar la clave `defaultDescription` de los 7 idiomas y reemplazarla por `noDescription`.

```text
{product.asset_description ? (
  <p className="text-muted-foreground leading-relaxed">{product.asset_description}</p>
) : (
  <p className="text-muted-foreground italic">{t('common.assetDetail.noDescription')}</p>
)}
```

---

### 4. Nuevas claves de traduccion (7 idiomas)

En `catalogDetails.json`, dentro de `common.assetDetail`:

| Clave | ES | EN |
|---|---|---|
| `editPublication` | Editar publicacion | Edit Publication |
| `noDescription` | No se ha proporcionado una descripcion para este activo. | No description has been provided for this asset. |
| `noPoliciesDefined` | No se han definido politicas para este activo. | No policies have been defined for this asset. |

Se anadiran las traducciones nativas para FR, DE, IT, PT y NL.

---

### 5. Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/ProductDetail.tsx` | (1) Botones condicionales para rejected, (2) funcion `translatePolicyItem` + eliminar mock data, (3) descripcion con fallback elegante, (4) importar namespace `publish` |
| `src/locales/es/catalogDetails.json` | Nuevas claves: editPublication, noDescription, noPoliciesDefined. Eliminar defaultDescription |
| `src/locales/en/catalogDetails.json` | Idem en ingles |
| `src/locales/fr/catalogDetails.json` | Idem en frances |
| `src/locales/de/catalogDetails.json` | Idem en aleman |
| `src/locales/it/catalogDetails.json` | Idem en italiano |
| `src/locales/pt/catalogDetails.json` | Idem en portugues |
| `src/locales/nl/catalogDetails.json` | Idem en neerlandes |

### Lo que NO cambia

- `src/utils/odrlGenerator.ts` (ya correcto)
- `src/locales/*/publish.json` (ya tiene las keys de step3)
- El route guard de rejected (ya implementado)
- La logica de negocio ni las queries
