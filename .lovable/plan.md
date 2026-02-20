

## Localizacion completa de la pagina de Solicitudes (/requests)

### Problema detectado

El archivo `src/pages/Requests.tsx` (1238 lineas) tiene **~70 textos hardcodeados en espanol** y no importa ni usa `useTranslation`. Los 7 archivos `requests.json` ya existen con claves base, pero faltan algunas claves adicionales necesarias para cubrir todos los textos del componente.

---

### 1. Claves nuevas a agregar en los 7 idiomas

Se necesitan agregar las siguientes claves que no existen en ningun `requests.json`:

**Estado "revoked" (falta en los 7 idiomas):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `status.revoked.label` | Acceso Revocado | Access Revoked | Acces Revoque | Zugang widerrufen | Accesso Revocato | Acesso Revogado | Toegang Ingetrokken |
| `status.revoked.tooltip` | El proveedor ha revocado el acceso | Provider has revoked access | Le fournisseur a revoque l'acces | Der Anbieter hat den Zugang widerrufen | Il fornitore ha revocato l'accesso | O fornecedor revogou o acesso | De aanbieder heeft de toegang ingetrokken |

**Columnas Kanban:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `kanban.pending` | Pendientes | Pending | En attente | Ausstehend | In sospeso | Pendentes | In afwachting |
| `kanban.negotiation` | En Negociacion | In Negotiation | En Negociation | In Verhandlung | In Negoziazione | Em Negociacao | In Onderhandeling |
| `kanban.approved` | Aprobados | Approved | Approuves | Genehmigt | Approvati | Aprovados | Goedgekeurd |
| `kanban.completed` | Completados | Completed | Termines | Abgeschlossen | Completati | Concluidos | Voltooid |

**Vista de detalle (TransactionDetailView):**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `detail.requester` | Solicitante | Requester | Demandeur | Antragsteller | Richiedente | Solicitante | Aanvrager |
| `detail.provider` | Proveedor | Provider | Fournisseur | Anbieter | Fornitore | Fornecedor | Aanbieder |
| `detail.currentStatus` | Estado Actual | Current Status | Statut Actuel | Aktueller Status | Stato Attuale | Estado Atual | Huidige Status |
| `detail.timeline` | Timeline de Aprobaciones | Approval Timeline | Chronologie des Approbations | Genehmigungszeitachse | Cronologia delle Approvazioni | Cronologia de Aprovacoes | Goedkeuringstijdlijn |
| `detail.noHistory` | No hay historial de aprobaciones aun | No approval history yet | Aucun historique d'approbation | Noch keine Genehmigungshistorie | Nessuna cronologia di approvazione | Sem historico de aprovacoes | Nog geen goedkeuringsgeschiedenis |
| `detail.policyProvider` | politica del proveedor | provider policy | politique du fournisseur | Anbieterrichtlinie | politica del fornitore | politica do fornecedor | aanbiederbeleid |

**Textos adicionales del empty state:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `empty.noRequests` | No has realizado ninguna solicitud | You haven't made any requests | Vous n'avez fait aucune demande | Sie haben keine Anfragen gestellt | Non hai effettuato nessuna richiesta | Voce nao fez nenhuma solicitacao | U heeft geen aanvragen ingediend |
| `empty.noHistory` | No hay transacciones historicas | No historical transactions | Aucune transaction historique | Keine historischen Transaktionen | Nessuna transazione storica | Sem transacoes historicas | Geen historische transacties |
| `empty.noHistoryDesc` | Las transacciones completadas, aprobadas o denegadas apareceran aqui | Completed, approved or denied transactions will appear here | Les transactions terminees, approuvees ou refusees apparaitront ici | Abgeschlossene, genehmigte oder abgelehnte Transaktionen erscheinen hier | Le transazioni completate, approvate o rifiutate appariranno qui | Transacoes concluidas, aprovadas ou negadas aparecerao aqui | Voltooide, goedgekeurde of geweigerde transacties verschijnen hier |

**Demo tooltip:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `demo.tooltip` | Transaccion sintetica de demostracion. En produccion, veras tus solicitudes reales. | Synthetic demo transaction. In production, you will see your real requests. | Transaction synthetique de demonstration. En production, vous verrez vos vraies demandes. | Synthetische Demotransaktion. In der Produktion sehen Sie Ihre echten Anfragen. | Transazione sintetica di dimostrazione. In produzione, vedrai le tue richieste reali. | Transacao sintetica de demonstracao. Em producao, vera suas solicitacoes reais. | Synthetische demotransactie. In productie ziet u uw echte aanvragen. |

**Toast de error:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `toast.error` | Error al realizar la accion | Error performing action | Erreur lors de l'action | Fehler bei der Aktion | Errore nell'esecuzione dell'azione | Erro ao realizar a acao | Fout bij het uitvoeren van de actie |
| `toast.denied` | Solicitud denegada | Request denied | Demande refusee | Anfrage abgelehnt | Richiesta rifiutata | Solicitacao negada | Aanvraag geweigerd |

**CSV headers:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `csv.noProduct` | Sin producto | No product | Sans produit | Kein Produkt | Senza prodotto | Sem produto | Geen product |

**Fecha/creacion:**
| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `fields.created` | Creada | Created | Creee | Erstellt | Creata | Criada | Aangemaakt |

---

### 2. Sustitucion de textos hardcodeados en Requests.tsx (~70 cambios)

**Importar useTranslation y locale dinamico:**
- Agregar `import { useTranslation } from 'react-i18next';` 
- Agregar logica para seleccionar el locale de date-fns segun el idioma activo (es, en, fr, de, it, pt, nl)
- Reemplazar todas las instancias de `{ locale: es }` por el locale dinamico

**STATUS_CONFIG -> funcion dinamica:**
- Convertir `STATUS_CONFIG` de constante estatica a una funcion `getStatusConfig(t)` que retorne las labels y tooltips usando `t('status.initiated.label')`, etc.
- Incluir el estado `revoked` con sus traducciones

**Hero section (lineas 275-308):**
- L277: `Solicitudes` -> `t('badge')`
- L280: `Gestiona tus Solicitudes de Datos` -> `t('title')`
- L283: `Administra solicitudes...` -> `t('subtitle')`
- L293: `Ocultar/Mostrar Analytics` -> `t('buttons.hideAnalytics')` / `t('buttons.showAnalytics')`
- L300: `Exportar CSV` -> `t('buttons.exportCSV')`
- L307: `Nueva Solicitud` -> `t('buttons.newRequest')`

**KPI cards (lineas 328-358):**
- L328: `Pendientes de Accion` -> `t('stats.pendingAction')`
- L340: `Mis Solicitudes` -> `t('stats.myRequests')`
- L352: `Total Transacciones` -> `t('stats.totalTransactions')`

**Filtros (lineas 371-386):**
- L371: placeholder -> `t('filters.searchPlaceholder')`
- L378: `Prioridad` -> `t('filters.priority')`
- L381-385: filtros -> `t('filters.all')`, `t('filters.critical')`, etc.

**Tabs (lineas 415-441):**
- L415: `Requiere Atencion` -> `t('tabs.requiresAttention')`
- L424: `Mis Solicitudes` -> `t('tabs.myRequests')`
- L431: `Historico` -> `t('tabs.historical')`
- L437: `Todas` -> `t('tabs.all')`

**Empty states:**
- L450-455: titulo y descripcion del empty state -> `t('empty.title')`, `t('empty.description')`, `t('empty.exploreCatalog')`
- L629-631: `No has realizado ninguna solicitud` -> `t('empty.noRequests')`, boton -> `t('empty.exploreCatalog')`
- L754-757: historico vacio -> `t('empty.noHistory')`, `t('empty.noHistoryDesc')`

**Tarjetas de transaccion (campos repetidos en 4 tabs):**
- `Solicitado por:` -> `t('fields.requestedBy')`
- `Proveedor:` -> `t('fields.subject')`
- `Consumer:` -> `t('fields.consumer')`
- `Precio` -> `t('fields.price')`
- `Gratis` -> `t('fields.free')`
- `Estado de Pago` -> `t('fields.paymentStatus')`
- `Pagado` -> `t('fields.paid')`
- `Pendiente` -> `t('fields.pending')`
- `Duracion` -> `t('fields.duration')`
- `dias` -> `t('fields.days')`
- `Proposito` -> `t('fields.purpose')`
- `Justificacion` -> `t('fields.justification')`

**Botones de accion:**
- `Pre-aprobar` -> `t('actions.preApprove')`
- `Aprobar y Compartir` -> `t('actions.approveAndShare')`
- `Denegar` -> `t('actions.deny')`
- `Ver Detalle` / `Ver Detalles` -> `t('actions.viewDetails')`

**Vista Kanban (lineas 973-1129):**
- L979: `Pendientes` -> `t('kanban.pending')`
- L1018: `En Negociacion` -> `t('kanban.negotiation')`
- L1057: `Aprobados` -> `t('kanban.approved')`
- L1096: `Completados` -> `t('kanban.completed')`
- Todas las fechas `toLocaleDateString("es-ES", ...)` -> locale dinamico

**TransactionDetailView (lineas 1137-1236):**
- L1160: `Solicitante` -> `t('detail.requester')`
- L1165: `Proveedor` -> `t('detail.provider')`
- L1171: `Proposito` -> `t('fields.purpose')`
- L1176: `Justificacion` -> `t('fields.justification')`
- L1182: `Duracion de Acceso` -> `t('fields.accessDuration')`
- L1183: `dias (politica del proveedor)` -> con interpolacion
- L1186: `Estado Actual` -> `t('detail.currentStatus')`
- L1198: `Timeline de Aprobaciones` -> `t('detail.timeline')`
- L1231: `No hay historial...` -> `t('detail.noHistory')`

**CSV export (lineas 220-258):**
- L222: toast error -> `t('toast.noData')`
- L226: headers -> usar claves traducidas
- L231: `Sin producto` -> `t('csv.noProduct')`
- L256-257: toast success -> `t('toast.exported')`, `t('toast.exportedDesc', { count: ... })`

**Loading state (L264):**
- `Cargando solicitudes...` -> `t('loading')`

**Mutation callbacks (L155-160):**
- L155: toast success -> `t('toast.success')`
- L159: toast error -> `t('toast.error')`

**Demo tooltips (multiples):**
- Texto del tooltip DEMO -> `t('demo.tooltip')`

---

### 3. Archivos a modificar (8 total)

1. `src/pages/Requests.tsx` -- importar useTranslation, convertir STATUS_CONFIG a funcion, reemplazar ~70 textos hardcodeados, locale dinamico para date-fns
2. `src/locales/es/requests.json` -- agregar claves: revoked, kanban, detail, empty (noRequests, noHistory, noHistoryDesc), demo, toast.error, toast.denied, csv, fields.created
3. `src/locales/en/requests.json` -- mismas claves nuevas
4. `src/locales/fr/requests.json` -- mismas claves nuevas
5. `src/locales/de/requests.json` -- mismas claves nuevas
6. `src/locales/it/requests.json` -- mismas claves nuevas
7. `src/locales/pt/requests.json` -- mismas claves nuevas
8. `src/locales/nl/requests.json` -- mismas claves nuevas

