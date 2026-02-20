# PROCUREDATA: Orchestrazione dei Dati per l'Economia Decentralizzata

**Whitepaper Tecnico & Economico v1.0**

*Data: Gennaio 2026*  
*Ecosistema: Gaia-X / Pontus-X / IDSA*

---

## Abstract

ProcureData è la prima infrastruttura di Data Space progettata specificamente per la funzione Acquisti e Supply Chain. Elimina la ridondanza operativa nella validazione dei fornitori attraverso identità sovrane (DID) e smart contract per l'uso dei dati (ODRL), trasformando centri di costo burocratici in mercati di dati liquidi e sicuri.

---

## 1. Il Problema: La Trappola della Ridondanza (n × m)

Nell'economia attuale, la fiducia è manuale, lenta e costosa.

### 1.1 Silos Informativi

La supply chain globale opera in silos. Un fornitore (Data Subject) deve inviare la stessa documentazione (certificati ISO, dati fiscali, report ESG) a ciascuno dei suoi clienti (Data Consumer) individualmente.

### 1.2 Il Costo della Verifica

Se 100 aziende acquistano dagli stessi 500 fornitori, vengono eseguiti **50.000 processi di validazione** e manutenzione ridondanti. Questo genera:

- **Frizione Operativa**: Mesi per qualificare un fornitore critico.
- **Rischio Dati Statici**: Le informazioni nell'ERP del compratore scadono il giorno dopo la validazione.
- **Frode e Greenwashing**: La mancanza di tracciabilità immutabile permette la falsificazione delle credenziali di sostenibilità.

---

## 2. La Soluzione: Un Data Space Sovrano

ProcureData non è un "data lake" dove tutti scaricano le proprie informazioni. È un sistema di **pipeline intelligenti e sicure** dove il dato viaggia direttamente dal Proprietario al Consumatore, sotto regole rigorose.

### 2.1 Il Triangolo della Fiducia (Modello IDSA)

Adottiamo il modello di architettura di riferimento della International Data Spaces Association:

| Ruolo | Descrizione |
|-------|-------------|
| **Il Fornitore (Data Provider/Subject)** | Mantiene la sovranità. Il dato non lascia mai il suo controllo senza un contratto firmato. |
| **Il Compratore (Data Consumer)** | Accede al dato verificato in tempo reale per i suoi processi di acquisto, rischio o ESG. |
| **Il Custode (Data Holder)** | Infrastruttura neutrale (nodi tecnici) che facilita lo scambio senza "vedere" il contenuto commerciale sensibile. |

### 2.2 Passaporto Digitale del Fornitore

Invece di inviare PDF via email, ogni fornitore in ProcureData ha un'**Identità Auto-Sovrana (SSI)** basata su DIDs (`did:ethr`). Le sue credenziali (ISO, Solvibilità, ESG) sono ancorate a questa identità, permettendo una verifica istantanea e riutilizzabile:

> *"Verificare una volta, usare ovunque"*

---

## 3. Architettura del Data Space Federato

ProcureData si articola in **10 componenti architetturali** che coprono dall'infrastruttura di base alla governance multi-settoriale. Il nostro stack tecnologico è **ibrido**, combinando l'usabilità del Web2 con la fiducia immutabile del Web3.

### 3.1 Fondamenti

Infrastruttura di base a quattro livelli che sostiene l'intera piattaforma ProcureData.

| Sottolivello | Tecnologie | Descrizione |
|-------------|------------|-------------|
| **Presentazione** | Angular 21, Tailwind CSS 4, MetaMask | Interfaccia responsive mobile-first con Request Wizard a 5 fasi e firma delle transazioni tramite Wallet aziendale. |
| **Orchestrazione** | AdonisJS, RBAC, State Manager | Orchestratore centrale del ciclo di vita delle transazioni con 4 ruoli (Admin, Approver, Viewer, API Configurator) e doppia firma crittografica. |
| **Sovranità** | Pontus-X, Data NFTs, DeltaDAO, SSI | Rete Gaia-X con Data NFTs e DDOs come asset digitali sovrani, identità SSI (did:ethr) e KYB verificato su blockchain. |
| **Persistenza** | PostgreSQL, RLS, JSONB | Database con Row Level Security per organization_id, storage ibrido JSONB per schemi DCAT-AP e crittografia a riposo + TLS 1.3. |

### 3.2 Catalogo Dati

Motore di registrazione, scoperta e governance degli asset di dati che collega i 47 casi di successo implementati.

| Sottolivello | Tecnologie | Descrizione |
|-------------|------------|-------------|
| **Registrazione** | DCAT-AP, JSON-LD | Schema standardizzato per la descrizione degli asset con metadati semantici e pubblicazione automatica tramite ERP Connector. |
| **Scoperta** | Ricerca federata, API Gaia-X | Ricerca full-text nei cataloghi distribuiti con filtri per settore, formato, licenza e raccomandazioni basate sul profilo organizzativo. |
| **Governance** | Scoring, Lineage, ODRL | Scoring di qualità (completezza, freschezza), lineage dei dati origine→trasformazione→consumo e policy ODRL integrate per asset. |

### 3.3 Flusso 3 Attori

Modello di interazione basato sullo standard IDSA con tre ruoli differenziati: Consumer, Subject e Holder.

| Sottolivello | Tecnologie | Descrizione |
|-------------|------------|-------------|
| **Consumer (Acquirente)** | Request Wizard, ODRL 2.0, Firma crittografica | Inizia le richieste di dati tramite wizard a 5 fasi, definisce le policy di utilizzo e firma l'accettazione dopo la verifica. |
| **Subject (Fornitore)** | SSI, DID (did:ethr), Wallet MetaMask | Identità auto-sovrana con credenziali verificabili W3C, pubblica Data NFTs e risponde con doppia firma crittografica. |
| **Holder (Custode)** | RLS, Smart Contracts, Compute-to-Data | Custodia i dati con isolamento per organization_id, verifica tramite Pontus-X e consegna senza trasferimento di dati grezzi. |

### 3.4 Policy ODRL

Motore di contratti digitali basato su ODRL 2.0 (W3C) che governa ogni accesso ai dati sulla piattaforma.

| Sottolivello | Tecnologie | Descrizione |
|-------------|------------|-------------|
| **Permessi** | ODRL 2.0, JSON-LD | Azioni autorizzate (read, analyze, aggregate) con granularità per campo e durata configurabile (P90D, P180D, P365D). |
| **Divieti** | Smart Contracts, Pontus-X | Redistribuzione e rivendita vietate; gli insights derivati ereditano le restrizioni. Violazioni registrate su blockchain. |
| **Obblighi** | EUROe, Smart Settlement | Pagamento automatico (1 EUROe pay-per-use o 300 EUROe/mese abbonamento) e report di utilizzo obbligatori con audit continuo. |
| **Vincoli** | Geografici, Settoriali, Temporali | Elaborazione esclusiva nell'UE, settore specifico secondo Self-Description, volume massimo di query per periodo. |

### 3.5 Web3 e DIDs

Layer di identità decentralizzata e pagamenti programmabili basato su standard W3C e blockchain Pontus-X.

| Sottolivello | Tecnologie | Descrizione |
|-------------|------------|-------------|
| **Identità SSI** | DID (did:ethr), MetaMask, KYB | Identità autogestita senza intermediari, wallet aziendale e verifica KYB tramite DeltaDAO e Self-Description Gaia-X. |
| **Credenziali Verificabili** | W3C VC Data Model, Zero-Knowledge | Emissione da organizzazioni verificate, presentazione selettiva senza rivelare dati sensibili e verifica on-chain istantanea. |
| **Blockchain** | Data NFTs (ERC-721), DDOs, Smart Contracts | Ogni asset di dati è un token unico; metadati DCAT-AP indicizzati da Aquarius; esecuzione automatica delle policy ODRL su Pontus-X (Chain ID 32460). |
| **Pagamenti EUROe** | Pay-per-use, Abbonamento, Regolamento | Micropagamenti automatici tramite Smart Contract (1 EUROe/tx o 300 EUROe/mese); ogni pagamento registrato su blockchain con timestamp immutabile. |

### 3.6 Assistente IA

Sistema di IA conversazionale con agenti specializzati e base di conoscenza dei 47 casi di successo.

| Sottolivello | Tecnologie | Descrizione |
|-------------|------------|-------------|
| **NLU** | Intent Mapping, Google Gemini | Riconoscimento delle intenzioni con trigger di widget (ROI, ImpactGauge, Radar), rilevamento emotivo e temperatura 0.1–0.2 per massima precisione. |
| **Agenti** | Concierge, Federato, Casi di Successo | Agente generale, specialista Gaia-X/IDSA ed esperto dei 47 casi verificati; ciascuno con system prompt dedicato e SECURITY_RULES. |
| **Base di Conoscenza** | Memoria Tecnica, 47 Casi, 15 Docs | Architettura, protocolli IDSA/Gaia-X/ODRL, casi con metriche reali e vocabolario tecnico controllato. |
| **Apprendimento** | Feedback 👍/👎, Correzione, GitHub | Cattura immediata della qualità, correzione utente, supervisione in /admin/learning-hub e aggiornamento automatico tramite repository. |

### 3.7 Connettori ERP/CRM

Layer di integrazione aziendale che connette ProcureData ai principali sistemi ERP del mercato.

| Sottolivello | Tecnologie | Descrizione |
|-------------|------------|-------------|
| **ERP Supportati** | SAP S/4HANA, Oracle NetSuite, Dynamics 365, Odoo, Salesforce | Integrazione nativa con moduli MM/SD/FI (SAP), SuiteScript (Oracle), Dataverse API (Microsoft), JSON-RPC (Odoo), Lightning API (Salesforce). |
| **Protocolli** | REST/GraphQL, EDI/XML, Webhooks, gRPC | Endpoint JSON-LD standard, query flessibili GraphQL, EDI EDIFACT/X12, webhook bidirezionali in tempo reale. |
| **Bridge** | ETL Pipeline, Sync Engine, Field Mapping | Estrazione-trasformazione-caricamento con mappatura visuale dei campi, sincronizzazione bidirezionale con retry esponenziale e connettore IDS. |
| **Sicurezza** | OAuth 2.0, API Keys, Audit Trail | Autenticazione delegata con refresh token, rate limiting (1000 req/min Pro), crittografia TLS 1.3 + AES-256 e RLS per organizzazione. |

### 3.8 Rete Gaia-X

Integrazione nativa con l'ecosistema europeo di dati federati Gaia-X e i suoi standard di fiducia.

| Sottolivello | Tecnologie | Descrizione |
|-------------|------------|-------------|
| **Trust Framework** | Self-Descriptions JSON-LD, GXDCH, VCs | Metadati standardizzati di partecipanti e servizi, verifica tramite Digital Clearing House e Trust Anchors. |
| **IDS** | EDC Connector, Contract Negotiation, DSP | Connettore Eclipse Dataspace open-source per scambio sovrano, negoziazione ODRL programmatica e protocollo DSP. |
| **Catalogo** | DCAT-AP, Aquarius Indexer | Application Profile europeo con indicizzazione distribuita, scoperta federata e ricerca semantica cross-dataspace. |
| **Compliance** | GDPR, Data Act, AI Act, CSRD | Conformità normativa completa: protezione dei dati, governance degli intermediari, audit algoritmico e report ESG. Certificazione Gaia-X Level 1-3. |

### 3.9 Analytics e BI

Piattaforma di business intelligence con dashboard in tempo reale, analytics predittivo e DataOps.

| Sottolivello | Tecnologie | Descrizione |
|-------------|------------|-------------|
| **Dashboard** | KPIs tempo reale, Health Score | Metriche aggiornate con ogni transazione blockchain, alert automatici per soglie e pannelli configurabili per ruolo. |
| **Cubo di Spesa** | Multidimensionale, Benchmarking | Classificazione per fornitore, categoria, settore, geografia e tempo; analisi di Pareto e benchmarking anonimo settoriale. |
| **Predittivo** | Forecasting IA, Monitor Rischio, Simulatore | Machine Learning per previsione della domanda, sorveglianza 24/7 dei fornitori con Z-Score e simulatore di scenari. |
| **DataOps** | Cleansing, Normalizzazione JSON-LD, Lineage | Rilevamento duplicati, trasformazione in formato semantico standardizzato, tracciabilità completa e dati sintetici anonimizzati. |

### 3.10 Governance Multi-Settore

Architettura di nodi settoriali indipendenti con federazione cross-sector e monetizzazione per ecosistema.

| Sottolivello | Tecnologie | Descrizione |
|-------------|------------|-------------|
| **Nodi Settoriali** | Industriale (51%), Commercio (15%), Agro (12%), Mobilità (10%), Sanità (7%), Economia Sociale (5%) | Ogni settore opera il proprio nodo con regole, catalogo e governance specifici. White-label configurabile con dominio proprio. |
| **Governance** | IDSA Rulebook, ODRL, Multi-Tenant RLS | Governance decentralizzata per nodo, policy settoriali (CBAM, MDR, Sedex) e isolamento totale dei dati tra organizzazioni. |
| **Federazione** | Catalogo Federato, Cross-Sector, Gaia-X | Scoperta di dati tra nodi senza centralizzare, transazioni cross-sector e Smart Contracts inter-nodo. |
| **Monetizzazione** | Marketplace, Value Services, EUROe | Marketplace settoriale con modello adattato (abbonamento, pay-per-use, freemium), servizi premium e pagamenti unificati con stablecoin europeo. |

---

## 4. Economia del Dato e Tokenomics

A differenza dei progetti speculativi, ProcureData utilizza un'economia basata su **utilità reale** e **stabilità finanziaria**.

### 4.1 Stablecoin: EUROe

Per le transazioni commerciali (acquisto di dataset, pagamento di servizi di validazione), utilizziamo **EUROe**, la prima moneta elettronica regolamentata (EMI) su blockchain compatibile con MiCA.

| Vantaggio | Descrizione |
|-----------|-------------|
| **Nessuna Volatilità** | 1 EUROe vale sempre 1 EUR. |
| **Programmabile** | I pagamenti vengono regolati automaticamente (Smart Settlement) solo quando il dato viene consegnato e validato. |
| **Legale** | Fatturabile e compatibile con la contabilità aziendale europea. |

### 4.2 Monetizzazione degli Asset

I fornitori possono trasformare i "rifiuti di dati" in asset:

- **Compute-to-Data**: Un fornitore può permettere a un algoritmo di IA (es. previsione del rischio) di essere eseguito sui propri dati privati senza rivelare i dati grezzi, addebitando l'uso del calcolo.

---

## 5. Casi d'Uso Reali

### 5.1 Industriale: Qualificazione Flash

| Aspetto | Dettaglio |
|---------|-----------|
| **Problema** | GigaFactory North impiegava 22 giorni per qualificare fornitori critici. |
| **Soluzione** | Con il Passaporto Digitale, verificano automaticamente i certificati ISO e la solvibilità finanziaria contro la blockchain. |
| **Risultato** | Tempo ridotto a **48 ore**. |

### 5.2 Agroalimentare: Tracciabilità Anti-Frode

| Aspetto | Dettaglio |
|---------|-----------|
| **Problema** | Falsificazione delle Denominazioni d'Origine nei vini da esportazione. |
| **Soluzione** | Etichette NFC collegate a DIDs unici su ogni bottiglia. |
| **Risultato** | **100% di tracciabilità** dalla vigna al consumatore finale in Asia. |

### 5.3 ESG: Audit Scope 3

| Aspetto | Dettaglio |
|---------|-----------|
| **Problema** | Impossibilità di ottenere dati reali sulle emissioni di carbonio dai fornitori Tier-2 e Tier-3. |
| **Soluzione** | Richiesta automatizzata di dati ESG attraverso la catena, con firma crittografica dell'origine. |
| **Risultato** | Report **CSRD verificabili** e prevenzione del Greenwashing. |

---

## 6. Roadmap e Futuro

| Fase | Periodo | Obiettivi |
|------|---------|-----------|
| **Fase 1** | Attuale - v3.1 | Piattaforma in produzione, integrazione Pontus-X, Pagamenti EUROe, Onboarding KYB. |
| **Fase 2** | Q3 2026 | Federazione completa con Catena-X. Lancio del modulo IA Sovrana per analisi predittiva della supply chain. |
| **Fase 3** | 2027 | Decentralizzazione dei nodi validatori ed espansione alla logistica marittima. |

---

## 7. Conclusione

ProcureData non è solo software; è una **nuova infrastruttura di mercato**. Sostituendo gli intermediari burocratici con codice crittografico e standard europei, restituiamo il controllo del dato a chi lo genera e la velocità a chi ne ha bisogno.

> **Unisciti all'economia dei dati sovrana.**

---

## Glossario

| Termine | Definizione |
|---------|-------------|
| **DID** | Decentralized Identifier - Identificatore decentralizzato secondo lo standard W3C |
| **ODRL** | Open Digital Rights Language - Linguaggio di policy per l'uso dei dati |
| **SSI** | Self-Sovereign Identity - Identità auto-sovrana |
| **Gaia-X** | Iniziativa europea per i data space federati |
| **Pontus-X** | Rete blockchain compatibile con Gaia-X |
| **EUROe** | Stablecoin regolamentata 1:1 con l'Euro |
| **IDSA** | International Data Spaces Association |
| **EDC** | Eclipse Dataspace Components |
| **MiCA** | Markets in Crypto-Assets Regulation (UE) |
| **CSRD** | Corporate Sustainability Reporting Directive |

---

*© 2026 ProcureData. Tutti i diritti riservati.*
