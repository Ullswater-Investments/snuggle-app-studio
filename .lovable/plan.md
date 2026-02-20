

## Localizacion completa de la pagina Gestion de Datos (/data)

### Resumen

Se identificaron **~60 textos hardcodeados** en 3 archivos: `Data.tsx` (6 textos), `MyLibraryTab.tsx` (~30 textos) y `MyPublicationsTab.tsx` (~24 textos). Ninguno usa `useTranslation`. Los diccionarios `data.json` existen pero les faltan las claves especificas de esta pagina.

---

### 1. Nuevas claves a agregar en los 7 idiomas (`data.json`)

**Cabecera (Data.tsx):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `hero.badge` | Centro de Datos | Data Center | Centre de Donnees | Datenzentrum | Centro Dati | Centro de Dados | Datacentrum |
| `hero.title` | Gestion de Datos | Data Management | Gestion des Donnees | Datenverwaltung | Gestione Dati | Gestao de Dados | Databeheer |
| `hero.description` | Accede a tu biblioteca de datasets adquiridos y gestiona tus publicaciones en el marketplace. | Access your library of acquired datasets and manage your marketplace publications. | Accedez a votre bibliotheque de datasets acquis et gerez vos publications sur le marketplace. | Greifen Sie auf Ihre Bibliothek erworbener Datasets zu und verwalten Sie Ihre Marketplace-Veroffentlichungen. | Accedi alla tua libreria di dataset acquisiti e gestisci le tue pubblicazioni nel marketplace. | Acesse sua biblioteca de datasets adquiridos e gerencie suas publicacoes no marketplace. | Toegang tot uw bibliotheek van verworven datasets en beheer uw marketplace-publicaties. |
| `hero.publishBtn` | Publicar Nuevo Dataset | Publish New Dataset | Publier un Nouveau Dataset | Neuen Dataset Veroffentlichen | Pubblica Nuovo Dataset | Publicar Novo Dataset | Nieuw Dataset Publiceren |

**Tabs:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `tabs.library` | Mi Biblioteca | My Library | Ma Bibliotheque | Meine Bibliothek | La Mia Libreria | Minha Biblioteca | Mijn Bibliotheek |
| `tabs.publications` | Mis Publicaciones | My Publications | Mes Publications | Meine Veroffentlichungen | Le Mie Pubblicazioni | Minhas Publicacoes | Mijn Publicaties |

**KPIs Biblioteca (MyLibraryTab):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `stats.activeDatasets` | Datasets Activos | Active Datasets | Datasets Actifs | Aktive Datasets | Dataset Attivi | Datasets Ativos | Actieve Datasets |
| `stats.providers` | Proveedores | Providers | Fournisseurs | Anbieter | Fornitori | Fornecedores | Aanbieders |
| `stats.blockchainVerified` | Verificados Blockchain | Blockchain Verified | Verifies Blockchain | Blockchain-Verifiziert | Verificati Blockchain | Verificados Blockchain | Blockchain Geverifieerd |

**KPIs Publicaciones (MyPublicationsTab):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `stats.published` | Datasets Publicados | Published Datasets | Datasets Publies | Veroffentlichte Datasets | Dataset Pubblicati | Datasets Publicados | Gepubliceerde Datasets |
| `stats.listed` | Activos en Catalogo | Listed in Catalog | Actifs au Catalogue | Im Katalog Gelistet | Attivi nel Catalogo | Ativos no Catalogo | Actief in Catalogus |
| `stats.totalValue` | Valor Total Listado | Total Listed Value | Valeur Totale Listee | Gesamtlistenwert | Valore Totale Listato | Valor Total Listado | Totale Vermelde Waarde |

**Filtros:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `filters.searchProducts` | Buscar por producto o proveedor... | Search by product or provider... | Rechercher par produit ou fournisseur... | Nach Produkt oder Anbieter suchen... | Cerca per prodotto o fornitore... | Buscar por produto ou fornecedor... | Zoeken op product of aanbieder... |
| `filters.allSectors` | Todos los sectores | All sectors | Tous les secteurs | Alle Sektoren | Tutti i settori | Todos os setores | Alle sectoren |
| `filters.filterBySector` | Filtrar por sector | Filter by sector | Filtrer par secteur | Nach Sektor filtern | Filtra per settore | Filtrar por setor | Filteren op sector |

**Estados vacios:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `empty.libraryTitle` | Tu biblioteca esta vacia | Your library is empty | Votre bibliotheque est vide | Ihre Bibliothek ist leer | La tua libreria e vuota | Sua biblioteca esta vazia | Uw bibliotheek is leeg |
| `empty.libraryDesc` | Cuando completes una transaccion, los datos apareceran aqui. Explora el catalogo para encontrar datasets que necesites. | When you complete a transaction, data will appear here. Explore the catalog to find datasets you need. | Lorsque vous terminerez une transaction, les donnees apparaitront ici. Explorez le catalogue pour trouver les datasets dont vous avez besoin. | Wenn Sie eine Transaktion abschliessen, erscheinen die Daten hier. Durchsuchen Sie den Katalog, um benotigte Datasets zu finden. | Quando completerai una transazione, i dati appariranno qui. Esplora il catalogo per trovare i dataset di cui hai bisogno. | Quando concluir uma transacao, os dados aparecerao aqui. Explore o catalogo para encontrar os datasets que precisa. | Wanneer u een transactie voltooit, verschijnen de gegevens hier. Verken de catalogus om datasets te vinden die u nodig heeft. |
| `empty.libraryBtn` | Explorar Marketplace | Explore Marketplace | Explorer le Marketplace | Marketplace Durchsuchen | Esplora il Marketplace | Explorar Marketplace | Marketplace Verkennen |
| `empty.pubTitle` | Sin publicaciones | No publications | Aucune publication | Keine Veroffentlichungen | Nessuna pubblicazione | Sem publicacoes | Geen publicaties |
| `empty.pubDesc` | Aun no has publicado ningun dataset. Comparte tus datos con el ecosistema y genera ingresos. | You haven't published any datasets yet. Share your data with the ecosystem and generate revenue. | Vous n'avez publie aucun dataset. Partagez vos donnees avec l'ecosysteme et generez des revenus. | Sie haben noch kein Dataset veroffentlicht. Teilen Sie Ihre Daten mit dem Okosystem und generieren Sie Einnahmen. | Non hai ancora pubblicato alcun dataset. Condividi i tuoi dati con l'ecosistema e genera entrate. | Voce ainda nao publicou nenhum dataset. Compartilhe seus dados com o ecossistema e gere receita. | U heeft nog geen datasets gepubliceerd. Deel uw gegevens met het ecosysteem en genereer inkomsten. |
| `empty.pubBtn` | Publicar Dataset | Publish Dataset | Publier un Dataset | Dataset Veroffentlichen | Pubblica Dataset | Publicar Dataset | Dataset Publiceren |

**Textos de tarjetas (MyLibraryTab):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `card.downloadData` | Descargar Datos | Download Data | Telecharger les Donnees | Daten Herunterladen | Scarica Dati | Baixar Dados | Gegevens Downloaden |
| `card.viewDetails` | Ver Detalles | View Details | Voir les Details | Details Anzeigen | Vedi Dettagli | Ver Detalhes | Details Bekijken |
| `card.noDataSource` | Activo sin fuente de datos configurada | Asset without configured data source | Actif sans source de donnees configuree | Asset ohne konfigurierte Datenquelle | Asset senza fonte dati configurata | Ativo sem fonte de dados configurada | Asset zonder geconfigureerde databron |
| `card.blockchainTooltip` | Datos verificados con trazabilidad blockchain | Data verified with blockchain traceability | Donnees verifiees avec tracabilite blockchain | Daten mit Blockchain-Ruckverfolgbarkeit verifiziert | Dati verificati con tracciabilita blockchain | Dados verificados com rastreabilidade blockchain | Gegevens geverifieerd met blockchain-traceerbaarheid |
| `card.blockchainAudit` | Auditoria de Trazabilidad Blockchain | Blockchain Traceability Audit | Audit de Tracabilite Blockchain | Blockchain-Ruckverfolgbarkeits-Audit | Audit di Tracciabilita Blockchain | Auditoria de Rastreabilidade Blockchain | Blockchain Traceerbaarheidsaudit |

**Textos de tarjetas (MyPublicationsTab):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `card.noName` | Dataset sin nombre | Unnamed dataset | Dataset sans nom | Unbenannter Dataset | Dataset senza nome | Dataset sem nome | Dataset zonder naam |
| `card.noDesc` | Sin descripcion | No description | Sans description | Keine Beschreibung | Senza descrizione | Sem descricao | Geen beschrijving |
| `card.price` | Precio | Price | Prix | Preis | Prezzo | Preco | Prijs |
| `card.published` | Publicado | Published | Publie | Veroffentlicht | Pubblicato | Publicado | Gepubliceerd |
| `card.view` | Ver | View | Voir | Ansehen | Vedi | Ver | Bekijken |
| `card.analytics` | Analytics | Analytics | Analytique | Analytik | Analitica | Analitica | Analyse |
| `card.inReview` | En revision | In review | En revision | In Prufung | In revisione | Em revisao | In beoordeling |
| `card.visibleInCatalog` | Visible en Catalogo | Visible in Catalog | Visible dans le Catalogue | Im Katalog Sichtbar | Visibile nel Catalogo | Visivel no Catalogo | Zichtbaar in Catalogus |
| `card.notEditable` | No editable mientras esta en validacion tecnica. | Not editable while in technical validation. | Non modifiable pendant la validation technique. | Nicht bearbeitbar wahrend der technischen Validierung. | Non modificabile durante la validazione tecnica. | Nao editavel durante a validacao tecnica. | Niet bewerkbaar tijdens technische validatie. |

**Modelos de precio (MyPublicationsTab):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `pricing.free` | Gratuito | Free | Gratuit | Kostenlos | Gratuito | Gratuito | Gratis |
| `pricing.subscription` | Suscripcion | Subscription | Abonnement | Abonnement | Abbonamento | Assinatura | Abonnement |
| `pricing.oneTime` | Pago Unico | One-time | Paiement Unique | Einmalzahlung | Pagamento Unico | Pagamento Unico | Eenmalig |
| `pricing.usage` | Por Uso | Per Use | Par Utilisation | Pro Nutzung | Per Utilizzo | Por Uso | Per Gebruik |
| `pricing.undefined` | Sin definir | Undefined | Non defini | Nicht definiert | Non definito | Nao definido | Niet gedefinieerd |
| `pricing.perMonth` | /mes | /month | /mois | /Monat | /mese | /mes | /maand |

**Status badges (MyPublicationsTab):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `pubStatus.validation` | En Validacion Tecnica | In Technical Validation | En Validation Technique | In Technischer Validierung | In Validazione Tecnica | Em Validacao Tecnica | In Technische Validatie |
| `pubStatus.available` | Disponible | Available | Disponible | Verfugbar | Disponibile | Disponivel | Beschikbaar |
| `pubStatus.published` | Publicado | Published | Publie | Veroffentlicht | Pubblicato | Publicado | Gepubliceerd |
| `pubStatus.rejected` | Rechazado | Rejected | Rejete | Abgelehnt | Rifiutato | Rejeitado | Afgewezen |
| `pubStatus.draft` | Borrador | Draft | Brouillon | Entwurf | Bozza | Rascunho | Concept |
| `pubStatus.archived` | Archivado | Archived | Archive | Archiviert | Archiviato | Arquivado | Gearchiveerd |

**Expiracion (MyLibraryTab):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `expiration.expired` | Expirado | Expired | Expire | Abgelaufen | Scaduto | Expirado | Verlopen |
| `expiration.expiresIn` | Expira en {{days}}d | Expires in {{days}}d | Expire dans {{days}}j | Lauft in {{days}}T ab | Scade tra {{days}}g | Expira em {{days}}d | Verloopt over {{days}}d |
| `expiration.active` | Activo | Active | Actif | Aktiv | Attivo | Ativo | Actief |

**Formato/Tipo (MyLibraryTab):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `dataType.administrative` | Administrativo | Administrative | Administratif | Administrativ | Amministrativo | Administrativo | Administratief |
| `dataType.iot` | IoT | IoT | IoT | IoT | IoT | IoT | IoT |
| `dataType.financial` | Financiero | Financial | Financier | Finanziell | Finanziario | Financeiro | Financieel |
| `dataType.energy` | Energia | Energy | Energie | Energie | Energia | Energia | Energie |
| `dataType.esg` | ESG | ESG | ESG | ESG | ESG | ESG | ESG |
| `dataType.data` | Datos | Data | Donnees | Daten | Dati | Dados | Gegevens |

**Loading y errores:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `loading` | Cargando datos... | Loading data... | Chargement des donnees... | Daten werden geladen... | Caricamento dati... | Carregando dados... | Gegevens laden... |
| `loadingPub` | Cargando publicaciones... | Loading publications... | Chargement des publications... | Veroffentlichungen werden geladen... | Caricamento pubblicazioni... | Carregando publicacoes... | Publicaties laden... |
| `noResults` | No se encontraron resultados | No results found | Aucun resultat trouve | Keine Ergebnisse gefunden | Nessun risultato trovato | Nenhum resultado encontrado | Geen resultaten gevonden |
| `clearFilters` | Limpiar Filtros | Clear Filters | Effacer les Filtres | Filter Loschen | Cancella Filtri | Limpar Filtros | Filters Wissen |
| `adjustFilters` | Prueba ajustando los filtros de busqueda | Try adjusting the search filters | Essayez d'ajuster les filtres de recherche | Versuchen Sie die Suchfilter anzupassen | Prova a modificare i filtri di ricerca | Tente ajustar os filtros de busca | Probeer de zoekfilters aan te passen |

**Toasts:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `toast.visibleOn` | Activo visible en el catalogo | Asset visible in catalog | Actif visible dans le catalogue | Asset im Katalog sichtbar | Asset visibile nel catalogo | Ativo visivel no catalogo | Asset zichtbaar in catalogus |
| `toast.visibleOff` | Activo oculto del catalogo | Asset hidden from catalog | Actif masque du catalogue | Asset aus dem Katalog ausgeblendet | Asset nascosto dal catalogo | Ativo oculto do catalogo | Asset verborgen uit catalogus |
| `toast.visibilityError` | Error al cambiar la visibilidad | Error changing visibility | Erreur lors du changement de visibilite | Fehler beim Andern der Sichtbarkeit | Errore nel cambio di visibilita | Erro ao alterar a visibilidade | Fout bij het wijzigen van zichtbaarheid |
| `toast.downloadSuccess` | Archivo descargado correctamente | File downloaded successfully | Fichier telecharge avec succes | Datei erfolgreich heruntergeladen | File scaricato con successo | Arquivo baixado com sucesso | Bestand succesvol gedownload |
| `toast.downloadError` | Error al descargar | Download error | Erreur de telechargement | Download-Fehler | Errore di download | Erro ao baixar | Downloadfout |
| `toast.noDataSource` | Este activo aun no tiene una fuente de datos configurada. | This asset doesn't have a configured data source yet. | Cet actif n'a pas encore de source de donnees configuree. | Dieses Asset hat noch keine konfigurierte Datenquelle. | Questo asset non ha ancora una fonte dati configurata. | Este ativo ainda nao tem uma fonte de dados configurada. | Dit asset heeft nog geen geconfigureerde databron. |
| `toast.downloading` | Descargando datos a traves del Gateway... | Downloading data through the Gateway... | Telechargement des donnees via le Gateway... | Daten werden uber das Gateway heruntergeladen... | Download dei dati tramite il Gateway... | Baixando dados atraves do Gateway... | Gegevens downloaden via de Gateway... |
| `toast.connectionError` | Error de Conexion: El servidor del proveedor no responde. | Connection Error: The provider server is not responding. | Erreur de Connexion: Le serveur du fournisseur ne repond pas. | Verbindungsfehler: Der Anbieterserver antwortet nicht. | Errore di Connessione: Il server del fornitore non risponde. | Erro de Conexao: O servidor do fornecedor nao responde. | Verbindingsfout: De server van de aanbieder reageert niet. |

---

### 2. Cambios en componentes (3 archivos)

**`src/pages/Data.tsx` (6 textos):**
- Importar `useTranslation('data')`
- `Centro de Datos` -> `t('hero.badge')`
- `Gestion de Datos` -> `t('hero.title')`
- `Accede a tu biblioteca...` -> `t('hero.description')`
- `Publicar Nuevo Dataset` -> `t('hero.publishBtn')`
- `Mi Biblioteca` -> `t('tabs.library')`
- `Mis Publicaciones` -> `t('tabs.publications')`

**`src/components/data/MyLibraryTab.tsx` (~30 textos):**
- Importar `useTranslation('data')` y locales dinamicos de date-fns
- KPIs: `Datasets Activos`, `Proveedores`, `Verificados Blockchain` -> claves `stats.*`
- Filtros: placeholder, selector sectores -> claves `filters.*`
- Empty states: titulo, descripcion, botones -> claves `empty.*`
- Tarjetas: `Descargar Datos`, `Ver Detalles`, tooltip blockchain -> claves `card.*`
- Expiracion: `Expirado`, `Activo`, `Expira en Xd` -> claves `expiration.*` con interpolacion
- Tipo de dato: `Administrativo`, `Financiero`, etc. -> claves `dataType.*`
- Loading: `Cargando datos...` -> `t('loading')`
- `No se encontraron resultados` / `Limpiar Filtros` -> `t('noResults')` / `t('clearFilters')`
- Toasts de descarga -> claves `toast.*`
- Mapas `FORMAT_MAP` y `UPDATE_FREQ_MAP`: las keys del mapa se cambian de nombres en espanol a keys neutrales (ej: `Logistica` -> `logistics`) y se usa `t('categories.logistics')` para mostrar. Se usa `t('frequency.realtime')` etc. para labels de frecuencia.
- Dialog blockchain: `Auditoria de Trazabilidad Blockchain` -> `t('card.blockchainAudit')`

**`src/components/data/MyPublicationsTab.tsx` (~24 textos):**
- Importar `useTranslation('data')` y locales dinamicos de date-fns
- KPIs: `Datasets Publicados`, `Activos en Catalogo`, `Valor Total Listado` -> claves `stats.*`
- Status badges: `En Validacion Tecnica`, `Disponible`, `Publicado`, `Rechazado`, `Borrador`, `Archivado` -> claves `pubStatus.*`
- Pricing labels: `Gratuito`, `Suscripcion`, `Pago Unico`, `Por Uso`, `Sin definir` -> claves `pricing.*`
- Precio con `/mes` -> `t('pricing.perMonth')`
- Empty state -> claves `empty.pubTitle`, `empty.pubDesc`, `empty.pubBtn`
- Tarjeta: `Ver`, `Analytics`, `En revision`, `Visible en Catalogo`, `No editable...` -> claves `card.*`
- `Publicado {fecha}` -> `t('card.published')` + locale dinamico en date-fns
- Loading -> `t('loadingPub')`
- Toasts de visibilidad -> claves `toast.*`
- Reemplazar `{ locale: es }` por locale dinamico

---

### 3. Archivos a modificar (10 total)

1. `src/locales/es/data.json` -- agregar ~55 claves nuevas
2. `src/locales/en/data.json` -- agregar ~55 claves nuevas
3. `src/locales/fr/data.json` -- agregar ~55 claves nuevas
4. `src/locales/de/data.json` -- agregar ~55 claves nuevas
5. `src/locales/it/data.json` -- agregar ~55 claves nuevas
6. `src/locales/pt/data.json` -- agregar ~55 claves nuevas
7. `src/locales/nl/data.json` -- agregar ~55 claves nuevas
8. `src/pages/Data.tsx` -- importar useTranslation, reemplazar 6 textos
9. `src/components/data/MyLibraryTab.tsx` -- importar useTranslation, reemplazar ~30 textos, locale dinamico
10. `src/components/data/MyPublicationsTab.tsx` -- importar useTranslation, reemplazar ~24 textos, locale dinamico

Nota: La conexion a base de datos ya esta implementada correctamente en ambos tabs (MyLibraryTab consulta `data_transactions` con status `completed`, MyPublicationsTab filtra `data_assets` por `subject_org_id`). Los contadores ya se calculan dinamicamente. Solo falta la internacionalizacion.

