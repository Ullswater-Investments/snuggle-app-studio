
## Internacionalizacion completa de la pagina Catalogo (/catalog)

### Resumen

Se identificaron **~25 textos hardcodeados** en `Catalog.tsx` y `CatalogFilters.tsx` que necesitan migrarse al sistema i18n. Ademas, se deben agregar nuevas claves de traduccion en los 7 archivos `catalog.json`.

---

### 1. Nuevas claves de traduccion a agregar en los 7 idiomas

Se agregaran las siguientes claves al objeto raiz de cada `catalog.json` (ES/EN/FR/DE/IT/PT/NL):

**Hero y acciones:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `hero.publish` | Publicar Dataset | Publish Dataset | Publier Dataset | Dataset veroffentlichen | Pubblica Dataset | Publicar Dataset | Dataset Publiceren |

**Filtros sidebar:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `filters.myStatus` | Mis Estados | My Status | Mes Statuts | Meine Status | I Miei Stati | Meus Estados | Mijn Statussen |
| `filters.dataNature` | Naturaleza del Dato | Data Nature | Nature des Donnees | Datennatur | Natura del Dato | Natureza do Dado | Datatype |
| `filters.acquired` | Adquiridos | Acquired | Acquis | Erworben | Acquisiti | Adquiridos | Verworven |
| `filters.pending` | Pendientes | Pending | En attente | Ausstehend | In sospeso | Pendentes | In afwachting |
| `filters.demo` | Demo / Sinteticos | Demo / Synthetic | Demo / Synthetiques | Demo / Synthetisch | Demo / Sintetici | Demo / Sinteticos | Demo / Synthetisch |
| `filters.production` | Produccion | Production | Production | Produktion | Produzione | Producao | Productie |

**Naturaleza del dato (badges en cards):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `nature.synthetic` | Sintetico | Synthetic | Synthetique | Synthetisch | Sintetico | Sintetico | Synthetisch |
| `nature.production` | Produccion | Production | Production | Produktion | Produzione | Producao | Productie |

**Acciones de la tarjeta (ProductCard):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `actions.request` | Solicitar Acceso | Request Access | Demander l'Acces | Zugang anfordern | Richiedi Accesso | Solicitar Acesso | Toegang Aanvragen |
| `actions.accessDownload` | Acceder / Descargar | Access / Download | Acceder / Telecharger | Zugreifen / Herunterladen | Accedi / Scarica | Aceder / Descarregar | Openen / Downloaden |
| `actions.requestInProgress` | Solicitud en proceso | Request in progress | Demande en cours | Anfrage in Bearbeitung | Richiesta in corso | Solicitacao em curso | Aanvraag in behandeling |

**Tabla de comparacion:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `compareTable.feature` | Caracteristica | Feature | Caracteristique | Eigenschaft | Caratteristica | Caracteristica | Kenmerk |
| `compareTable.provider` | Proveedor | Provider | Fournisseur | Anbieter | Fornitore | Fornecedor | Aanbieder |
| `compareTable.price` | Precio | Price | Prix | Preis | Prezzo | Preco | Prijs |
| `compareTable.model` | Modelo | Model | Modele | Modell | Modello | Modelo | Model |
| `compareTable.category` | Categoria | Category | Categorie | Kategorie | Categoria | Categoria | Categorie |
| `compareTable.dataType` | Tipo de Datos | Data Type | Type de Donnees | Datentyp | Tipo di Dati | Tipo de Dados | Datatype |
| `compareTable.reputation` | Reputacion | Reputation | Reputation | Reputation | Reputazione | Reputacao | Reputatie |
| `compareTable.verified` | Verificado | Verified | Verifie | Verifiziert | Verificato | Verificado | Geverifieerd |
| `compareTable.sustainable` | Sostenible | Sustainable | Durable | Nachhaltig | Sostenibile | Sustentavel | Duurzaam |
| `compareTable.yes` | Si | Yes | Oui | Ja | Si | Sim | Ja |
| `compareTable.subscription` | Suscripcion | Subscription | Abonnement | Abonnement | Abbonamento | Assinatura | Abonnement |
| `compareTable.oneTime` | Pago unico | One-time | Paiement unique | Einmalzahlung | Pagamento unico | Pagamento unico | Eenmalig |
| `compareTable.usage` | Por uso | Per use | Par utilisation | Pro Nutzung | Per utilizzo | Por uso | Per gebruik |
| `compareTable.freeModel` | Gratuito | Free | Gratuit | Kostenlos | Gratuito | Gratuito | Gratis |

**Tabs:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `tabs.myAcquisitions` | Mis Adquisiciones | My Acquisitions | Mes Acquisitions | Meine Erwerbungen | Le Mie Acquisizioni | Minhas Aquisicoes | Mijn Acquisities |

Nota: EN ya tiene `compareTable` parcialmente; se completara. FR, DE, IT, PT, NL no lo tienen.

---

### 2. Sustitucion de textos hardcodeados en componentes

**Archivo `src/pages/Catalog.tsx` -- cambios en ~15 lineas:**

- Linea 467: `"Mis Adquisiciones"` -> `t('tabs.myAcquisitions')`
- Linea 530: `"Publicar Dataset"` -> `t('hero.publish')`
- Linea 686: `"Caracteristica"` -> `t('compareTable.feature')`
- Linea 694: `"Proveedor"` -> `t('compareTable.provider')`
- Linea 700: `"Precio"` -> `t('compareTable.price')`
- Linea 717: `"Modelo"` -> `t('compareTable.model')`
- Linea 720: Pricing model labels -> usar claves `compareTable.subscription`, etc.
- Linea 725: `"Categoria"` -> `t('compareTable.category')`
- Linea 731: `"Tipo de Datos"` -> `t('compareTable.dataType')`
- Linea 737: `'Produccion'`/`'Sintetico'` -> `t('nature.production')`/`t('nature.synthetic')`
- Linea 744: `"Reputacion"` -> `t('compareTable.reputation')`
- Linea 752: `"Verificado"` -> `t('compareTable.verified')`
- Linea 757: `"Si"` -> `t('compareTable.yes')`
- Linea 766: `"Sostenible"` -> `t('compareTable.sustainable')`
- Linea 850: Nature badge en ProductCard -> `t('nature.production')`/`t('nature.synthetic')`
- Linea 954: `"Acceder / Descargar"` -> `t('actions.accessDownload')`
- Linea 965: `"Solicitud en proceso"` -> `t('actions.requestInProgress')`
- Linea 976: `"Solicitar Acceso"` -> `t('actions.request')`

**Archivo `src/components/catalog/CatalogFilters.tsx` -- cambios en 6 lineas:**

- Linea 383: `"Mis Estados"` -> `t('filters.myStatus')`
- Linea 398: `"Adquiridos"` -> `t('filters.acquired')`
- Linea 413: `"Pendientes"` -> `t('filters.pending')`
- Linea 424: `"Naturaleza del Dato"` -> `t('filters.dataNature')`
- Linea 436: `"Demo / Sinteticos"` -> `t('filters.demo')`
- Linea 448: `"Produccion"` -> `t('filters.production')`

---

### 3. Archivos a modificar (9 total)

1. `src/locales/es/catalog.json` -- agregar claves nuevas
2. `src/locales/en/catalog.json` -- agregar claves nuevas
3. `src/locales/fr/catalog.json` -- agregar claves nuevas
4. `src/locales/de/catalog.json` -- agregar claves nuevas
5. `src/locales/it/catalog.json` -- agregar claves nuevas
6. `src/locales/pt/catalog.json` -- agregar claves nuevas
7. `src/locales/nl/catalog.json` -- agregar claves nuevas
8. `src/pages/Catalog.tsx` -- reemplazar ~18 textos hardcodeados por t()
9. `src/components/catalog/CatalogFilters.tsx` -- reemplazar 6 textos hardcodeados por t()
