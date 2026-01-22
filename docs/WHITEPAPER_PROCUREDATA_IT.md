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

## 3. Architettura Tecnica

Il nostro stack tecnologico è **ibrido**, combinando l'usabilità del Web2 con la fiducia immutabile del Web3.

### 3.1 Layer di Fiducia (Blockchain)

Utilizziamo la rete **Pontus-X** (ecosistema Gaia-X) per la notarizzazione delle transazioni.

| Caratteristica | Descrizione |
|----------------|-------------|
| **Immutabilità** | Ogni accordo di accesso ai dati genera un hash unico registrato on-chain. |
| **Identità** | Uso degli standard W3C DIDs per l'autenticazione aziendale senza password. |
| **Smart Contract** | Esecuzione automatica della logica di business (pagamenti, revoche). |

### 3.2 Layer di Governance (ODRL)

Il cuore di ProcureData è il motore di policy **ODRL** (Open Digital Rights Language). A differenza di un'API tradizionale, l'accesso ai dati qui viene fornito con un "contratto digitale" allegato che stabilisce:

- **Permessi**: Chi può vedere questo? *(Es. "Solo aziende del settore automotive")*
- **Restrizioni**: Per quanto tempo? *(Es. "Accesso revocato il 31/12/2026")*
- **Obblighi**: Cosa deve accadere? *(Es. "Pagamento di 50 EUROe per query")*

### 3.3 Layer di Interoperabilità (EDC)

Implementiamo connettori compatibili con **Eclipse Dataspace Components**, garantendo che ProcureData possa "parlare" con altri data space europei (Catena-X, Manufacturing-X) senza integrazioni costose.

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
