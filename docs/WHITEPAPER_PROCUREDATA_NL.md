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

## 3. Technische Architectuur

Onze technologiestack is **hybride** en combineert Web2-bruikbaarheid met onveranderlijk Web3-vertrouwen.

### 3.1 Vertrouwenslaag (Blockchain)

We gebruiken het **Pontus-X**-netwerk (Gaia-X-ecosysteem) voor transactienotarisatie.

| Kenmerk | Beschrijving |
|---------|--------------|
| **Onveranderlijkheid** | Elke datatoegangsovereenkomst genereert een unieke hash die on-chain wordt vastgelegd. |
| **Identiteit** | Gebruik van W3C DID-standaarden voor wachtwoordloze bedrijfsauthenticatie. |
| **Smart Contracts** | Automatische uitvoering van bedrijfslogica (betalingen, intrekkingen). |

### 3.2 Governance-laag (ODRL)

Het hart van ProcureData is de **ODRL**-beleidsengine (Open Digital Rights Language). In tegenstelling tot een traditionele API komt datatoegang hier met een bijgevoegd "digitaal contract" dat bepaalt:

- **Toestemmingen**: Wie mag dit zien? *(Bijv. "Alleen bedrijven in de automobielsector")*
- **Beperkingen**: Hoe lang? *(Bijv. "Toegang ingetrokken op 31/12/2026")*
- **Verplichtingen**: Wat moet er gebeuren? *(Bijv. "Betaling van 50 EUROe per query")*

### 3.3 Interoperabiliteitslaag (EDC)

We implementeren connectoren die compatibel zijn met **Eclipse Dataspace Components**, zodat ProcureData kan "praten" met andere Europese data spaces (Catena-X, Manufacturing-X) zonder kostbare integraties.

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
