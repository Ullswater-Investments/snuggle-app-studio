

## Completar claves faltantes en `card` para 5 idiomas

### Problema detectado

Los archivos `catalog.json` de **ES** y **EN** tienen el bloque `card` completo con 8 claves, pero **FR, DE, IT, PT y NL** solo tienen 5 claves (`viewDetails`, `addToCart`, `freeAccess`, `verifiedProvider`, `reviews`). Faltan las siguientes en esos 5 idiomas:

- `card.by`
- `card.free`
- `card.month`
- `card.year`
- `card.compareThis`
- `card.noDescription`

### Claves a agregar

| Clave | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|
| `card.by` | par | von | di | por | door |
| `card.free` | GRATUIT | KOSTENLOS | GRATIS | GRATIS | GRATIS |
| `card.month` | mois | Monat | mese | mes | maand |
| `card.year` | an | Jahr | anno | ano | jaar |
| `card.compareThis` | Comparer ce produit | Dieses Produkt vergleichen | Confronta questo prodotto | Comparar este produto | Dit product vergelijken |
| `card.noDescription` | Aucune description disponible | Keine Beschreibung verfugbar | Nessuna descrizione disponibile | Sem descricao disponivel | Geen beschrijving beschikbaar |

### Archivos a modificar (5)

1. `src/locales/fr/catalog.json` -- agregar 6 claves al bloque `card`
2. `src/locales/de/catalog.json` -- agregar 6 claves al bloque `card`
3. `src/locales/it/catalog.json` -- agregar 6 claves al bloque `card`
4. `src/locales/pt/catalog.json` -- agregar 6 claves al bloque `card`
5. `src/locales/nl/catalog.json` -- agregar 6 claves al bloque `card`

No se requieren cambios en componentes TSX ya que estos usan `t('card.compareThis')` y `t('card.month')` correctamente; solo faltan las traducciones.

