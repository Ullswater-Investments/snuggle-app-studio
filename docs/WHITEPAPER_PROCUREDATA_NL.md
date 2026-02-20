# PROCUREDATA: Data-orchestratie voor de Gedecentraliseerde Economie

**Technisch & Economisch Whitepaper v1.0**

*Datum: Januari 2026*  
*Ecosysteem: Gaia-X / Pontus-X / IDSA*

---

## Samenvatting

ProcureData is de eerste Data Space-infrastructuur die specifiek is ontworpen voor de Inkoop- en Supply Chain-functie. Het elimineert operationele redundantie bij leveranciersvalidatie door soevereine identiteiten (DID) en slimme datagebruikscontracten (ODRL), en transformeert bureaucratische kostenplaatsen in liquide en veilige datamarkten.

---

## 1. Het Probleem: De Redundantieval (n × m)

In de huidige economie is vertrouwen handmatig, traag en duur.

### 1.1 Informatiesilo's

De wereldwijde supply chain werkt in silo's. Een leverancier (Data Subject) moet dezelfde documentatie (ISO-certificaten, fiscale gegevens, ESG-rapporten) afzonderlijk naar elk van zijn klanten (Data Consumers) sturen.

### 1.2 De Kosten van Verificatie

Als 100 bedrijven bij dezelfde 500 leveranciers inkopen, worden er **50.000 redundante validatie- en onderhoudsprocessen** uitgevoerd. Dit genereert:

- **Operationele Wrijving**: Maanden om een kritieke leverancier te kwalificeren.
- **Statisch Datarisico**: Informatie in de ERP van de koper verloopt de dag na validatie.
- **Fraude en Greenwashing**: Gebrek aan onveranderlijke traceerbaarheid maakt vervalsing van duurzaamheidsreferenties mogelijk.

---

## 2. De Oplossing: Een Soevereine Data Space

ProcureData is geen "data lake" waar iedereen zijn informatie dumpt. Het is een systeem van **intelligente en veilige pipelines** waar data direct van Eigenaar naar Consument reist, onder strikte regels.

### 2.1 De Vertrouwensdriehoek (IDSA-Model)

We adopteren het referentiearchitectuurmodel van de International Data Spaces Association:

| Rol | Beschrijving |
|-----|--------------|
| **De Leverancier (Data Provider/Subject)** | Behoudt soevereiniteit. Data verlaat nooit zijn controle zonder getekend contract. |
| **De Koper (Data Consumer)** | Krijgt realtime toegang tot geverifieerde data voor zijn inkoop-, risico- of ESG-processen. |
| **De Beheerder (Data Holder)** | Neutrale infrastructuur (technische knooppunten) die uitwisseling faciliteert zonder gevoelige commerciële inhoud te "zien". |

### 2.2 Digitaal Leverancierspaspoort

In plaats van PDF's per e-mail te versturen, heeft elke leverancier in ProcureData een **Zelf-Soevereine Identiteit (SSI)** gebaseerd op DIDs (`did:ethr`). Hun referenties (ISO, Solvabiliteit, ESG) zijn verankerd aan deze identiteit, wat directe en herbruikbare verificatie mogelijk maakt:

> *"Eenmaal verifiëren, overal gebruiken"*

---

## 3. Architectuur van de Gefedereerde Data Space

ProcureData is opgebouwd uit **10 architectuurcomponenten** die reiken van basisinfrastructuur tot multi-sectorale governance. Onze technologiestack is **hybride** en combineert Web2-bruikbaarheid met onveranderlijk Web3-vertrouwen.

### 3.1 Fundamenten

Vier-laags basisinfrastructuur die het volledige ProcureData-platform ondersteunt.

| Sublaag | Technologieën | Beschrijving |
|---------|---------------|--------------|
| **Presentatie** | Angular 21, Tailwind CSS 4, MetaMask | Mobile-first responsieve interface met 5-fasen Request Wizard en transactieondertekening via bedrijfs-Wallet. |
| **Orchestratie** | AdonisJS, RBAC, State Manager | Centrale orchestrator voor de transactielevenscyclus met 4 rollen (Admin, Approver, Viewer, API Configurator) en dubbele cryptografische handtekening. |
| **Soevereiniteit** | Pontus-X, Data NFTs, DeltaDAO, SSI | Gaia-X-netwerk met Data NFTs en DDOs als soevereine digitale activa, SSI-identiteit (did:ethr) en blockchain-geverifieerd KYB. |
| **Persistentie** | PostgreSQL, RLS, JSONB | Database met Row Level Security per organization_id, hybride JSONB-opslag voor DCAT-AP-schema's en versleuteling in rust + TLS 1.3. |

### 3.2 Datacatalogus

Registratie-, ontdekkings- en governance-engine voor data-assets die de 47 ingezette succesverhalen verbindt.

| Sublaag | Technologieën | Beschrijving |
|---------|---------------|--------------|
| **Registratie** | DCAT-AP, JSON-LD | Gestandaardiseerd schema voor assetbeschrijving met semantische metadata en automatische publicatie via ERP Connector. |
| **Ontdekking** | Gefedereerd Zoeken, Gaia-X API | Full-text zoeken in gedistribueerde catalogi met filters op sector, formaat, licentie en profielgebaseerde aanbevelingen. |
| **Governance** | Scoring, Herkomst, ODRL | Kwaliteitsscoring (volledigheid, versheid), data-herkomst oorsprong→transformatie→consumptie en geïntegreerde ODRL-beleid per asset. |

### 3.3 3-Actoren Stroom

IDSA-standaard interactiemodel met drie gedifferentieerde rollen: Consumer, Subject en Holder.

| Sublaag | Technologieën | Beschrijving |
|---------|---------------|--------------|
| **Consumer (Koper)** | Request Wizard, ODRL 2.0, Cryptografische Handtekening | Initieert dataverzoeken via 5-fasen wizard, definieert gebruiksbeleid en ondertekent acceptatie na verificatie. |
| **Subject (Leverancier)** | SSI, DID (did:ethr), MetaMask Wallet | Zelf-soevereine identiteit met W3C verifieerbare credentials, publiceert Data NFTs en reageert met dubbele cryptografische handtekening. |
| **Holder (Beheerder)** | RLS, Smart Contracts, Compute-to-Data | Bewaakt data met organization_id-isolatie, Pontus-X-verificatie en levering zonder overdracht van ruwe data. |

### 3.4 ODRL-beleid

ODRL 2.0 (W3C) digitale contractengine die elke datatoegang op het platform regelt.

| Sublaag | Technologieën | Beschrijving |
|---------|---------------|--------------|
| **Toestemmingen** | ODRL 2.0, JSON-LD | Geautoriseerde acties (read, analyze, aggregate) met veldniveau-granulariteit en configureerbare duur (P90D, P180D, P365D). |
| **Verboden** | Smart Contracts, Pontus-X | Herverdeling en doorverkoop verboden; afgeleide inzichten erven beperkingen. Overtredingen vastgelegd op blockchain. |
| **Verplichtingen** | EUROe, Smart Settlement | Automatische betaling (1 EUROe pay-per-use of 300 EUROe/maand abonnement) en verplichte gebruiksrapporten met continue audit. |
| **Beperkingen** | Geografisch, Sectoraal, Temporeel | Uitsluitend EU-verwerking, sectorspecifiek volgens Self-Description, maximaal queryvolume per periode. |

### 3.5 Web3 en DIDs

Gedecentraliseerde identiteits- en programmeerbare betalingslaag gebaseerd op W3C-standaarden en Pontus-X-blockchain.

| Sublaag | Technologieën | Beschrijving |
|---------|---------------|--------------|
| **SSI-identiteit** | DID (did:ethr), MetaMask, KYB | Zelfbeheerde identiteit zonder tussenpersonen, bedrijfswallet en KYB-verificatie via DeltaDAO en Gaia-X Self-Description. |
| **Verifieerbare Credentials** | W3C VC Data Model, Zero-Knowledge | Uitgifte door geverifieerde organisaties, selectieve presentatie zonder gevoelige data en directe on-chain verificatie. |
| **Blockchain** | Data NFTs (ERC-721), DDOs, Smart Contracts | Elk data-asset is een uniek token; DCAT-AP-metadata geïndexeerd door Aquarius; automatische ODRL-beleidsuitvoering op Pontus-X (Chain ID 32460). |
| **EUROe-betalingen** | Pay-per-use, Abonnement, Afwikkeling | Automatische microbetalingen via Smart Contract (1 EUROe/tx of 300 EUROe/maand); elke betaling vastgelegd op blockchain met onveranderlijk tijdstempel. |

### 3.6 AI-assistent

Conversationeel AI-systeem met gespecialiseerde agenten en kennisbasis van de 47 succesverhalen.

| Sublaag | Technologieën | Beschrijving |
|---------|---------------|--------------|
| **NLU** | Intent Mapping, Google Gemini | Intentieherkenning met widget-triggers (ROI, ImpactGauge, Radar), emotiedetectie en temperatuur 0.1–0.2 voor maximale precisie. |
| **Agenten** | Concierge, Gefedereerd, Succesverhalen | Algemene agent, Gaia-X/IDSA-specialist en expert in 47 geverifieerde cases; elk met toegewijd system prompt en SECURITY_RULES. |
| **Kennisbasis** | Technisch Geheugen, 47 Cases, 15 Docs | Architectuur, IDSA/Gaia-X/ODRL-protocollen, cases met echte metrics en gecontroleerd technisch vocabulaire. |
| **Leren** | Feedback 👍/👎, Correctie, GitHub | Directe kwaliteitsvastlegging, gebruikerscorrectie, supervisie op /admin/learning-hub en automatische update via repository. |

### 3.7 ERP/CRM-connectoren

Bedrijfsintegratielaag die ProcureData verbindt met de belangrijkste ERP-systemen.

| Sublaag | Technologieën | Beschrijving |
|---------|---------------|--------------|
| **Ondersteunde ERPs** | SAP S/4HANA, Oracle NetSuite, Dynamics 365, Odoo, Salesforce | Native integratie met MM/SD/FI-modules (SAP), SuiteScript (Oracle), Dataverse API (Microsoft), JSON-RPC (Odoo), Lightning API (Salesforce). |
| **Protocollen** | REST/GraphQL, EDI/XML, Webhooks, gRPC | Standaard JSON-LD-endpoints, flexibele GraphQL-queries, EDI EDIFACT/X12, bidirectionele real-time webhooks. |
| **Bridge** | ETL Pipeline, Sync Engine, Field Mapping | Extract-transform-load met visuele veldmapping, bidirectionele synchronisatie met exponentiële retry en IDS-connector. |
| **Beveiliging** | OAuth 2.0, API Keys, Audit Trail | Gedelegeerde authenticatie met refresh tokens, rate limiting (1000 req/min Pro), TLS 1.3 + AES-256-versleuteling en RLS per organisatie. |

### 3.8 Gaia-X-netwerk

Native integratie met het Europese gefedereerde data-ecosysteem Gaia-X en zijn vertrouwensstandaarden.

| Sublaag | Technologieën | Beschrijving |
|---------|---------------|--------------|
| **Trust Framework** | Self-Descriptions JSON-LD, GXDCH, VCs | Gestandaardiseerde deelnemer- en servicemetadata, verificatie via Digital Clearing House en Trust Anchors. |
| **IDS** | EDC Connector, Contract Negotiation, DSP | Open-source Eclipse Dataspace Connector voor soevereine uitwisseling, programmatische ODRL-onderhandeling en DSP-protocol. |
| **Catalogus** | DCAT-AP, Aquarius Indexer | Europees Application Profile met gedistribueerde indexering, gefedereerde ontdekking en cross-dataspace semantisch zoeken. |
| **Compliance** | AVG, Data Act, AI Act, CSRD | Volledige regelgevende compliance: gegevensbescherming, intermediair-governance, algoritmische audit en ESG-rapporten. Gaia-X-certificering Level 1-3. |

### 3.9 Analytics en BI

Business intelligence-platform met real-time dashboards, voorspellende analytics en DataOps.

| Sublaag | Technologieën | Beschrijving |
|---------|---------------|--------------|
| **Dashboards** | Real-time KPIs, Health Score | Metrics bijgewerkt bij elke blockchain-transactie, automatische drempelwaardealarmen en rolconfigureerbare panelen. |
| **Uitgavenkubus** | Multidimensionaal, Benchmarking | Classificatie op leverancier, categorie, sector, geografie en tijd; Pareto-analyse en anonieme sectorale benchmarking. |
| **Voorspellend** | AI Forecasting, Risicomonitor, Simulator | Machine Learning voor vraagvoorspelling, 24/7 leveranciersbewaking met Z-Score en scenariosimulator. |
| **DataOps** | Cleansing, JSON-LD Normalisatie, Herkomst | Duplicaatdetectie, semantische formaattransformatie, volledige traceerbaarheid en geanonimiseerde synthetische data. |

### 3.10 Multi-sectorale Governance

Onafhankelijke sectorale knooppuntarchitectuur met cross-sectorale federatie en ecosysteemmonetisatie.

| Sublaag | Technologieën | Beschrijving |
|---------|---------------|--------------|
| **Sectorale Knooppunten** | Industrie (51%), Handel (15%), Agri (12%), Mobiliteit (10%), Gezondheid (7%), Sociale Economie (5%) | Elke sector beheert zijn eigen knooppunt met specifieke regels, catalogus en governance. Configureerbaar white-label met eigen domein. |
| **Governance** | IDSA Rulebook, ODRL, Multi-Tenant RLS | Gedecentraliseerde governance per knooppunt, sectoraal beleid (CBAM, MDR, Sedex) en totale data-isolatie tussen organisaties. |
| **Federatie** | Gefedereerde Catalogus, Cross-Sector, Gaia-X | Dataontdekking tussen knooppunten zonder centralisatie, cross-sectorale transacties en inter-knooppunt Smart Contracts. |
| **Monetisatie** | Marketplace, Value Services, EUROe | Sectorale marketplace met aangepast model (abonnement, pay-per-use, freemium), premiumdiensten en uniforme betalingen met Europese stablecoin. |

---

## 4. Data-economie en Tokenomics

In tegenstelling tot speculatieve projecten gebruikt ProcureData een economie gebaseerd op **echte bruikbaarheid** en **financiële stabiliteit**.

### 4.1 Stablecoin: EUROe

Voor commerciële transacties (aankoop van datasets, betaling van validatiediensten) gebruiken we **EUROe**, het eerste gereguleerde elektronische geld (EMI) op blockchain dat compatibel is met MiCA.

| Voordeel | Beschrijving |
|----------|--------------|
| **Geen Volatiliteit** | 1 EUROe is altijd gelijk aan 1 EUR. |
| **Programmeerbaar** | Betalingen worden automatisch afgewikkeld (Smart Settlement) alleen wanneer data is geleverd en gevalideerd. |
| **Legaal** | Factureerbaar en compatibel met Europese bedrijfsboekhouding. |

### 4.2 Asset-monetisatie

Leveranciers kunnen "data-afval" omzetten in activa:

- **Compute-to-Data**: Een leverancier kan een AI-algoritme (bijv. risicovoorspelling) toestaan om op zijn privégegevens te draaien zonder ruwe data te onthullen, en kosten in rekening brengen voor het rekengebruik.

---

## 5. Echte Use Cases

### 5.1 Industrieel: Flash-kwalificatie

| Aspect | Detail |
|--------|--------|
| **Probleem** | GigaFactory North had 22 dagen nodig om kritieke leveranciers te kwalificeren. |
| **Oplossing** | Met het Digitale Paspoort verifiëren ze automatisch ISO-certificaten en financiële solvabiliteit tegen de blockchain. |
| **Resultaat** | Tijd teruggebracht naar **48 uur**. |

### 5.2 Agrifood: Anti-fraude Traceerbaarheid

| Aspect | Detail |
|--------|--------|
| **Probleem** | Vervalsing van Herkomstbenamingen bij exportwijnen. |
| **Oplossing** | NFC-labels gekoppeld aan unieke DIDs op elke fles. |
| **Resultaat** | **100% traceerbaarheid** van wijngaard tot eindconsument in Azië. |

### 5.3 ESG: Scope 3-audit

| Aspect | Detail |
|--------|--------|
| **Probleem** | Onmogelijkheid om echte koolstofemissiegegevens te verkrijgen van Tier-2- en Tier-3-leveranciers. |
| **Oplossing** | Geautomatiseerd ESG-dataverzoek door de keten, met cryptografische handtekening van de oorsprong. |
| **Resultaat** | **Controleerbare CSRD-rapporten** en Greenwashing-preventie. |

---

## 6. Roadmap en Toekomst

| Fase | Periode | Doelstellingen |
|------|---------|----------------|
| **Fase 1** | Huidig - v3.1 | Productieplatform, Pontus-X-integratie, EUROe-betalingen, KYB-onboarding. |
| **Fase 2** | Q3 2026 | Volledige federatie met Catena-X. Lancering van Soevereine AI-module voor voorspellende supply chain-analyse. |
| **Fase 3** | 2027 | Decentralisatie van validatorknooppunten en uitbreiding naar maritieme logistiek. |

---

## 7. Conclusie

ProcureData is niet alleen software; het is een **nieuwe marktinfrastructuur**. Door bureaucratische tussenpersonen te vervangen door cryptografische code en Europese standaarden, geven we de controle over data terug aan degenen die het genereren en snelheid aan degenen die het nodig hebben.

> **Sluit je aan bij de soevereine data-economie.**

---

## Woordenlijst

| Term | Definitie |
|------|-----------|
| **DID** | Decentralized Identifier - Gedecentraliseerde identificatie volgens W3C-standaard |
| **ODRL** | Open Digital Rights Language - Taal voor datagebruiksbeleid |
| **SSI** | Self-Sovereign Identity - Zelf-soevereine identiteit |
| **Gaia-X** | Europees initiatief voor gefedereerde data spaces |
| **Pontus-X** | Gaia-X-compatibel blockchain-netwerk |
| **EUROe** | Gereguleerde stablecoin 1:1 met de Euro |
| **IDSA** | International Data Spaces Association |
| **EDC** | Eclipse Dataspace Components |
| **MiCA** | Markets in Crypto-Assets Regulation (EU) |
| **CSRD** | Corporate Sustainability Reporting Directive |

---

*© 2026 ProcureData. Alle rechten voorbehouden.*
