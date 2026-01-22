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

## 3. Technische Architektur

Unser Technologie-Stack ist **hybrid** und kombiniert Web2-Benutzerfreundlichkeit mit unveränderlichem Web3-Vertrauen.

### 3.1 Vertrauensschicht (Blockchain)

Wir verwenden das **Pontus-X**-Netzwerk (Gaia-X-Ökosystem) für die Transaktionsnotarisierung.

| Merkmal | Beschreibung |
|---------|--------------|
| **Unveränderlichkeit** | Jede Datenzugriffsvereinbarung erzeugt einen eindeutigen Hash, der on-chain aufgezeichnet wird. |
| **Identität** | Verwendung von W3C-DID-Standards für passwortlose Unternehmensauthentifizierung. |
| **Smart Contracts** | Automatische Ausführung der Geschäftslogik (Zahlungen, Widerrufe). |

### 3.2 Governance-Schicht (ODRL)

Das Herzstück von ProcureData ist die **ODRL**-Policy-Engine (Open Digital Rights Language). Anders als bei einer traditionellen API kommt der Datenzugriff hier mit einem angehängten „digitalen Vertrag", der festlegt:

- **Berechtigungen**: Wer darf das sehen? *(Z.B. „Nur Unternehmen der Automobilbranche")*
- **Einschränkungen**: Wie lange? *(Z.B. „Zugriff am 31.12.2026 widerrufen")*
- **Pflichten**: Was muss geschehen? *(Z.B. „Zahlung von 50 EUROe pro Abfrage")*

### 3.3 Interoperabilitätsschicht (EDC)

Wir implementieren Konnektoren, die mit **Eclipse Dataspace Components** kompatibel sind, um sicherzustellen, dass ProcureData mit anderen europäischen Datenräumen (Catena-X, Manufacturing-X) ohne kostspielige Integrationen „sprechen" kann.

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
