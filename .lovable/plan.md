

## Añadir llaves de traducción `detail.askAgent` y `detail.caseArchitecture` en 7 idiomas

### Situación actual

- **ES, EN, FR, PT**: Tienen sección `detail` pero les faltan las llaves `askAgent` y `caseArchitecture`.
- **DE, IT, NL**: No tienen sección `detail` en absoluto (ni `navigation` ni `narrative`). Estas secciones también se añadirán para completar la paridad.

El componente `SuccessStoryDetail.tsx` ya usa `t('detail.askAgent', { ns: 'success' })` y `t('detail.caseArchitecture', { ns: 'success' })`, pero al no existir las llaves, se muestran las claves técnicas en la UI.

---

### Cambios

**Archivos a modificar (4):**

1. `src/locales/es/success.json` -- añadir 2 llaves dentro de `detail`
2. `src/locales/en/success.json` -- añadir 2 llaves dentro de `detail`
3. `src/locales/fr/success.json` -- añadir 2 llaves dentro de `detail`
4. `src/locales/pt/success.json` -- añadir 2 llaves dentro de `detail`

**Archivos a modificar (3) -- secciones completas nuevas:**

5. `src/locales/de/success.json` -- añadir secciones `detail`, `navigation` y `narrative` completas (incluyendo `askAgent` y `caseArchitecture`)
6. `src/locales/it/success.json` -- igual que DE
7. `src/locales/nl/success.json` -- igual que DE

### Traducciones

| Llave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `detail.askAgent` | Preguntar al Agente ARIA | Ask ARIA Agent | Demander a l'Agent ARIA | ARIA-Agent fragen | Chiedi all'Agente ARIA | Perguntar ao Agente ARIA | Vraag aan ARIA Agent |
| `detail.caseArchitecture` | Arquitectura del Caso | Case Architecture | Architecture du Cas | Fallarchitektur | Architettura del Caso | Arquitetura do Caso | Case Architectuur |

Para DE, IT y NL tambien se añadiran las llaves existentes de `detail` (`notFound`, `backToStories`, `verifiedOn`, `block`, `sectorImpactPanel`, `impactSimulator`, `ctaTitle`, `ctaDescription`, `exploreCatalog`, `viewServices`) y las secciones `navigation` y `narrative` para mantener la paridad completa.

### Sin cambios en componentes

El componente `SuccessStoryDetail.tsx` ya usa las llamadas correctas a `t()` con el namespace `success`, por lo que no necesita ninguna modificación.

