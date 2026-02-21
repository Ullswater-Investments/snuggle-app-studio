# PROCUREDATA: Datenorchestrierung für die Dezentralisierte Wirtschaft

**Technisches & Wirtschaftliches Whitepaper v1.0**

*Datum: Januar 2026*  
*Ökosystem: Gaia-X / Pontus-X / IDSA*

---

## Zusammenfassung

ProcureData ist die erste Datenraum-Infrastruktur, die speziell für die Einkaufs- und Lieferkettenfunktion entwickelt wurde. Sie eliminiert die operative Redundanz bei der Lieferantenvalidierung durch souveräne Identitäten (DID) und intelligente Datennutzungsverträge (ODRL) und verwandelt bürokratische Kostenstellen in liquide und sichere Datenmärkte.

---

## 1. Das Problem: Die Redundanzfalle (n × m)

In der heutigen Wirtschaft ist Vertrauen manuell, langsam und teuer.

### 1.1 Informationssilos

Die globale Lieferkette arbeitet in Silos. Ein Lieferant (Data Subject) muss dieselbe Dokumentation (ISO-Zertifikate, Steuerdaten, ESG-Berichte) einzeln an jeden seiner Kunden (Data Consumers) senden.

### 1.2 Die Kosten der Verifizierung

Wenn 100 Unternehmen bei denselben 500 Lieferanten einkaufen, werden **50.000 redundante Validierungs- und Wartungsprozesse** durchgeführt. Dies erzeugt:

- **Operative Reibung**: Monate, um einen kritischen Lieferanten zu qualifizieren.
- **Statisches Datenrisiko**: Die Informationen im ERP des Käufers verfallen am Tag nach der Validierung.
- **Betrug und Greenwashing**: Fehlende unveränderliche Rückverfolgbarkeit ermöglicht die Fälschung von Nachhaltigkeitsnachweisen.

---

## 2. Die Lösung: Ein Souveräner Datenraum

ProcureData ist kein „Datensee", in den alle ihre Informationen kippen. Es ist ein System von **intelligenten und sicheren Pipelines**, in dem Daten direkt vom Eigentümer zum Verbraucher fließen, unter strengen Regeln.

### 2.1 Das Vertrauensdreieck (IDSA-Modell)

Wir übernehmen das Referenzarchitekturmodell der International Data Spaces Association:

| Rolle | Beschreibung |
|-------|--------------|
| **Der Lieferant (Data Provider/Subject)** | Behält die Souveränität. Daten verlassen seine Kontrolle nie ohne unterzeichneten Vertrag. |
| **Der Käufer (Data Consumer)** | Greift in Echtzeit auf verifizierte Daten für seine Einkaufs-, Risiko- oder ESG-Prozesse zu. |
| **Der Verwahrer (Data Holder)** | Neutrale Infrastruktur (technische Knoten), die den Austausch erleichtert, ohne sensible kommerzielle Inhalte zu „sehen". |

### 2.2 Digitaler Lieferantenpass

Anstatt PDFs per E-Mail zu versenden, hat jeder Lieferant in ProcureData eine **Selbstsouveräne Identität (SSI)** basierend auf DIDs (`did:ethr`). Seine Referenzen (ISO, Solvenz, ESG) sind an diese Identität verankert und ermöglichen eine sofortige und wiederverwendbare Verifizierung:

> *„Einmal verifizieren, überall nutzen"*

---

## 3. Architektur des Föderierten Datenraums

ProcureData gliedert sich in **10 Architekturkomponenten**, die von der Basisinfrastruktur bis zur Multi-Sektor-Governance reichen. Unser Technologie-Stack ist **hybrid** und kombiniert Web2-Benutzerfreundlichkeit mit unveränderlichem Web3-Vertrauen.

### 3.1 Grundlagen

Vier-Schichten-Basisinfrastruktur, die die gesamte ProcureData-Plattform trägt.

| Unterschicht | Technologien | Beschreibung |
|-------------|-------------|--------------|
| **Präsentation** | Angular 21, Tailwind CSS 4, MetaMask | Mobile-first responsive Oberfläche mit 5-Phasen Request Wizard und Transaktionssignierung über Unternehmens-Wallet. |
| **Orchestrierung** | AdonisJS, RBAC, State Manager | Zentraler Orchestrator für den Transaktionslebenszyklus mit 4 Rollen (Admin, Approver, Viewer, API Configurator) und dualer kryptographischer Signatur. |
| **Souveränität** | Pontus-X, Data NFTs, DeltaDAO, SSI | Gaia-X-Netzwerk mit Data NFTs und DDOs als souveräne digitale Assets, SSI-Identität (did:ethr) und Blockchain-verifiziertes KYB. |
| **Persistenz** | PostgreSQL, RLS, JSONB | Datenbank mit Row Level Security pro organization_id, hybride JSONB-Speicherung für DCAT-AP-Schemata und Verschlüsselung im Ruhezustand + TLS 1.3. |

### 3.2 Datenkatalog

Registrierungs-, Entdeckungs- und Governance-Engine für Datenbestände, die die 47 eingesetzten Erfolgsfälle verbindet.

| Unterschicht | Technologien | Beschreibung |
|-------------|-------------|--------------|
| **Registrierung** | DCAT-AP, JSON-LD | Standardisiertes Schema zur Asset-Beschreibung mit semantischen Metadaten und automatischer Veröffentlichung über ERP Connector. |
| **Entdeckung** | Föderierte Suche, Gaia-X API | Volltextsuche in verteilten Katalogen mit Filtern nach Sektor, Format, Lizenz und profilbasierten Empfehlungen. |
| **Governance** | Scoring, Herkunft, ODRL | Qualitäts-Scoring (Vollständigkeit, Aktualität), Datenherkunft Ursprung→Transformation→Verbrauch und integrierte ODRL-Richtlinien pro Asset. |

### 3.3 3-Akteure-Fluss

IDSA-Standard-Interaktionsmodell mit drei differenzierten Rollen: Consumer, Subject und Holder.

| Unterschicht | Technologien | Beschreibung |
|-------------|-------------|--------------|
| **Consumer (Käufer)** | Request Wizard, ODRL 2.0, Kryptographische Signatur | Initiiert Datenanfragen über 5-Phasen-Wizard, definiert Nutzungsrichtlinien und signiert Akzeptanz nach Verifizierung. |
| **Subject (Lieferant)** | SSI, DID (did:ethr), MetaMask Wallet | Selbstsouveräne Identität mit W3C verifizierbaren Credentials, veröffentlicht Data NFTs und antwortet mit dualer kryptographischer Signatur. |
| **Holder (Verwahrer)** | RLS, Smart Contracts, Compute-to-Data | Verwahrt Daten mit organization_id-Isolation, Pontus-X-Verifizierung und Lieferung ohne Rohdatentransfer. |

### 3.4 ODRL-Richtlinien

ODRL 2.0 (W3C) digitale Vertragsengine, die jeden Datenzugriff auf der Plattform regelt.

| Unterschicht | Technologien | Beschreibung |
|-------------|-------------|--------------|
| **Berechtigungen** | ODRL 2.0, JSON-LD | Autorisierte Aktionen (read, analyze, aggregate) mit Feldgranularität und konfigurierbarer Dauer (P90D, P180D, P365D). |
| **Verbote** | Smart Contracts, Pontus-X | Weiterverteilung und Weiterverkauf verboten; abgeleitete Insights erben Beschränkungen. Verstöße werden auf der Blockchain aufgezeichnet. |
| **Pflichten** | EUROe, Smart Settlement | Automatische Zahlung (1 EUROe Pay-per-use oder 300 EUROe/Monat Abonnement) und obligatorische Nutzungsberichte mit kontinuierlicher Prüfung. |
| **Einschränkungen** | Geographisch, Sektoral, Zeitlich | Ausschließliche EU-Verarbeitung, sektorspezifisch gemäß Self-Description, maximales Abfragevolumen pro Zeitraum. |

### 3.5 Web3 und DIDs

Dezentrale Identitäts- und programmierbare Zahlungsschicht basierend auf W3C-Standards und Pontus-X-Blockchain.

| Unterschicht | Technologien | Beschreibung |
|-------------|-------------|--------------|
| **SSI-Identität** | DID (did:ethr), MetaMask, KYB | Selbstverwaltete Identität ohne Vermittler, Unternehmens-Wallet und KYB-Verifizierung über DeltaDAO und Gaia-X Self-Description. |
| **Verifizierbare Credentials** | W3C VC Data Model, Zero-Knowledge | Ausstellung durch verifizierte Organisationen, selektive Präsentation ohne sensible Daten und sofortige On-Chain-Verifizierung. |
| **Blockchain** | Data NFTs (ERC-721), DDOs, Smart Contracts | Jedes Daten-Asset ist ein einzigartiger Token; DCAT-AP-Metadaten durch Aquarius indexiert; automatische ODRL-Richtlinienausführung auf Pontus-X (Chain ID 32460). |
| **EUROe-Zahlungen** | Pay-per-use, Abonnement, Abwicklung | Automatische Mikrozahlungen via Smart Contract (1 EUROe/tx oder 300 EUROe/Monat); jede Zahlung auf Blockchain mit unveränderlichem Zeitstempel erfasst. |

### 3.6 KI-Assistent

Konversationelles KI-System mit spezialisierten Agenten und Wissensbasis der 47 Erfolgsfälle.

| Unterschicht | Technologien | Beschreibung |
|-------------|-------------|--------------|
| **NLU** | Intent Mapping, Google Gemini | Absichtserkennung mit Widget-Triggern (ROI, ImpactGauge, Radar), emotionale Erkennung und Temperatur 0.1–0.2 für maximale Präzision. |
| **Agenten** | Concierge, Föderiert, Erfolgsfälle | Allgemeiner Agent, Gaia-X/IDSA-Spezialist und Experte für 47 verifizierte Fälle; jeder mit dediziertem System-Prompt und SECURITY_RULES. |
| **Wissensbasis** | Technisches Gedächtnis, 47 Fälle, 15 Docs | Architektur, IDSA/Gaia-X/ODRL-Protokolle, Fälle mit realen Metriken und kontrolliertes Fachvokabular. |
| **Lernen** | Feedback 👍/👎, Korrektur, GitHub | Sofortige Qualitätserfassung, Benutzerkorrektur, Supervision unter /admin/learning-hub und automatische Aktualisierung über Repository. |

### 3.7 ERP/CRM-Konnektoren

Unternehmensintegrationsschicht, die ProcureData mit den wichtigsten ERP-Systemen verbindet.

| Unterschicht | Technologien | Beschreibung |
|-------------|-------------|--------------|
| **Unterstützte ERPs** | SAP S/4HANA, Oracle NetSuite, Dynamics 365, Odoo, Salesforce | Native Integration mit MM/SD/FI-Modulen (SAP), SuiteScript (Oracle), Dataverse API (Microsoft), JSON-RPC (Odoo), Lightning API (Salesforce). |
| **Protokolle** | REST/GraphQL, EDI/XML, Webhooks, gRPC | Standard JSON-LD-Endpunkte, flexible GraphQL-Abfragen, EDI EDIFACT/X12, bidirektionale Echtzeit-Webhooks. |
| **Bridge** | ETL Pipeline, Sync Engine, Field Mapping | Extraktion-Transformation-Laden mit visuellem Feldmapping, bidirektionale Synchronisation mit exponentiellem Retry und IDS-Konnektor. |
| **Sicherheit** | OAuth 2.0, API Keys, Audit Trail | Delegierte Authentifizierung mit Refresh-Tokens, Rate Limiting (1000 Req/Min Pro), TLS 1.3 + AES-256-Verschlüsselung und RLS pro Organisation. |

### 3.8 Gaia-X-Netzwerk

Native Integration mit dem europäischen föderierten Datenökosystem Gaia-X und seinen Vertrauensstandards.

| Unterschicht | Technologien | Beschreibung |
|-------------|-------------|--------------|
| **Trust Framework** | Self-Descriptions JSON-LD, GXDCH, VCs | Standardisierte Teilnehmer- und Service-Metadaten, Verifizierung über Digital Clearing House und Trust Anchors. |
| **IDS** | EDC Connector, Contract Negotiation, DSP | Open-Source Eclipse Dataspace Connector für souveränen Austausch, programmatische ODRL-Verhandlung und DSP-Protokoll. |
| **Katalog** | DCAT-AP, Aquarius Indexer | Europäisches Application Profile mit verteilter Indexierung, föderierter Entdeckung und semantischer Cross-Dataspace-Suche. |
| **Compliance** | DSGVO, Data Act, AI Act, CSRD | Vollständige regulatorische Compliance: Datenschutz, Intermediär-Governance, algorithmische Prüfung und ESG-Berichte. Gaia-X-Zertifizierung Level 1-3. |

### 3.9 Analytics und BI

Business-Intelligence-Plattform mit Echtzeit-Dashboards, prädiktiver Analytik und DataOps.

| Unterschicht | Technologien | Beschreibung |
|-------------|-------------|--------------|
| **Dashboards** | Echtzeit-KPIs, Health Score | Metriken mit jeder Blockchain-Transaktion aktualisiert, automatische Schwellenwert-Alerts und rollenspezifisch konfigurierbare Panels. |
| **Ausgabenwürfel** | Multidimensional, Benchmarking | Klassifizierung nach Lieferant, Kategorie, Sektor, Geographie und Zeit; Pareto-Analyse und anonymes sektorales Benchmarking. |
| **Prädiktiv** | KI-Forecasting, Risikomonitor, Simulator | Machine Learning zur Bedarfsprognose, 24/7-Lieferantenüberwachung mit Z-Score und Szenario-Simulator. |
| **DataOps** | Cleansing, JSON-LD-Normalisierung, Herkunft | Duplikaterkennung, semantische Formattransformation, vollständige Rückverfolgbarkeit und anonymisierte synthetische Daten. |

### 3.10 Multi-Sektor-Governance

Unabhängige sektorale Knotenarchitektur mit Cross-Sektor-Föderation und Ökosystem-Monetarisierung.

| Unterschicht | Technologien | Beschreibung |
|-------------|-------------|--------------|
| **Sektorale Knoten** | Industrie (51%), Handel (15%), Agrar (12%), Mobilität (10%), Gesundheit (7%), Sozialwirtschaft (5%) | Jeder Sektor betreibt seinen eigenen Knoten mit spezifischen Regeln, Katalog und Governance. Konfigurierbares White-Label mit eigener Domain. |
| **Governance** | IDSA Rulebook, ODRL, Multi-Tenant RLS | Dezentrale Governance pro Knoten, sektorale Richtlinien (CBAM, MDR, Sedex) und totale Datenisolation zwischen Organisationen. |
| **Föderation** | Föderierter Katalog, Cross-Sektor, Gaia-X | Datenentdeckung zwischen Knoten ohne Zentralisierung, Cross-Sektor-Transaktionen und Inter-Knoten Smart Contracts. |
| **Monetarisierung** | Marketplace, Value Services, EUROe | Sektoraler Marktplatz mit angepasstem Modell (Abonnement, Pay-per-use, Freemium), Premium-Services und einheitliche Zahlungen mit europäischem Stablecoin. |

---

## 4. Datenökonomie und Tokenomics

Im Gegensatz zu spekulativen Projekten verwendet ProcureData eine Wirtschaft, die auf **realem Nutzen** und **finanzieller Stabilität** basiert.

### 4.1 Stablecoin: EUROe

Für kommerzielle Transaktionen (Datensatzkäufe, Zahlung von Validierungsdiensten) verwenden wir **EUROe**, das erste regulierte elektronische Geld (EMI) auf Blockchain, das mit MiCA kompatibel ist.

| Vorteil | Beschreibung |
|---------|--------------|
| **Keine Volatilität** | 1 EUROe entspricht immer 1 EUR. |
| **Programmierbar** | Zahlungen werden automatisch abgewickelt (Smart Settlement), nur wenn Daten geliefert und validiert werden. |
| **Legal** | Fakturierbar und kompatibel mit der europäischen Unternehmensbuchhaltung. |

### 4.2 Asset-Monetarisierung

Lieferanten können „Datenabfall" in Assets verwandeln:

- **Compute-to-Data**: Ein Lieferant kann einem KI-Algorithmus (z.B. Risikovorhersage) erlauben, auf seinen privaten Daten zu laufen, ohne Rohdaten preiszugeben, und für die Rechennutzung Gebühren erheben.

---

## 5. Reale Anwendungsfälle

### 5.1 Industrie: Flash-Qualifikation

| Aspekt | Detail |
|--------|--------|
| **Problem** | GigaFactory North benötigte 22 Tage, um kritische Lieferanten zu qualifizieren. |
| **Lösung** | Mit dem Digitalen Pass werden ISO-Zertifikate und finanzielle Solvenz automatisch gegen die Blockchain verifiziert. |
| **Ergebnis** | Zeit reduziert auf **48 Stunden**. |

### 5.2 Agrar- und Lebensmittel: Betrugsbekämpfung durch Rückverfolgbarkeit

| Aspekt | Detail |
|--------|--------|
| **Problem** | Fälschung von Herkunftsbezeichnungen bei Exportweinen. |
| **Lösung** | NFC-Etiketten, die mit eindeutigen DIDs auf jeder Flasche verknüpft sind. |
| **Ergebnis** | **100% Rückverfolgbarkeit** vom Weinberg bis zum Endverbraucher in Asien. |

### 5.3 ESG: Scope-3-Audit

| Aspekt | Detail |
|--------|--------|
| **Problem** | Unmöglichkeit, echte Kohlenstoffemissionsdaten von Tier-2- und Tier-3-Lieferanten zu erhalten. |
| **Lösung** | Automatisierte ESG-Datenanfrage durch die Kette, mit kryptografischer Signatur des Ursprungs. |
| **Ergebnis** | **Prüfbare CSRD-Berichte** und Greenwashing-Prävention. |

---

## 6. Roadmap und Zukunft

| Phase | Zeitraum | Ziele |
|-------|----------|-------|
| **Phase 1** | Aktuell - v3.1 | Produktionsplattform, Pontus-X-Integration, EUROe-Zahlungen, KYB-Onboarding. |
| **Phase 2** | Q3 2026 | Vollständige Föderation mit Catena-X. Start des Sovereign-KI-Moduls für prädiktive Lieferkettenanalyse. |
| **Phase 3** | 2027 | Dezentralisierung der Validierungsknoten und Expansion in die Seelogistik. |

---

## 7. Fazit

ProcureData ist nicht nur Software; es ist eine **neue Marktinfrastruktur**. Durch den Ersatz bürokratischer Vermittler durch kryptografischen Code und europäische Standards geben wir die Datenkontrolle an diejenigen zurück, die sie erzeugen, und die Geschwindigkeit an diejenigen, die sie benötigen.

> **Treten Sie der souveränen Datenwirtschaft bei.**

---

## Glossar

| Begriff | Definition |
|---------|------------|
| **DID** | Decentralized Identifier - Dezentraler Identifikator nach W3C-Standard |
| **ODRL** | Open Digital Rights Language - Datennutzungs-Policy-Sprache |
| **SSI** | Self-Sovereign Identity - Selbstsouveräne Identität |
| **Gaia-X** | Europäische Initiative für föderierte Datenräume |
| **Pontus-X** | Gaia-X-kompatibles Blockchain-Netzwerk |
| **EUROe** | Regulierter Stablecoin 1:1 mit dem Euro |
| **IDSA** | International Data Spaces Association |
| **EDC** | Eclipse Dataspace Components |
| **MiCA** | Markets in Crypto-Assets Regulation (EU) |
| **CSRD** | Corporate Sustainability Reporting Directive |

---

*© 2026 ProcureData. Alle Rechte vorbehalten.*
