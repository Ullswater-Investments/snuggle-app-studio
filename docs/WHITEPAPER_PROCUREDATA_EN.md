# PROCUREDATA: Data Orchestration for the Decentralized Economy

**Technical & Economic Whitepaper v1.0**

*Date: January 2026*  
*Ecosystem: Gaia-X / Pontus-X / IDSA*

---

## Abstract

ProcureData is the first Data Space infrastructure designed specifically for Procurement and Supply Chain functions. It eliminates operational redundancy in supplier validation through sovereign identities (DID) and smart data usage contracts (ODRL), transforming bureaucratic cost centers into liquid and secure data markets.

---

## 1. The Problem: The Redundancy Trap (n × m)

In today's economy, trust is manual, slow, and expensive.

### 1.1 Information Silos

The global supply chain operates in silos. A supplier (Data Subject) must send the same documentation (ISO certificates, tax data, ESG reports) to each of their clients (Data Consumers) individually.

### 1.2 The Cost of Verification

If 100 companies buy from the same 500 suppliers, **50,000 validation and maintenance processes** are performed redundantly. This generates:

- **Operational Friction**: Months to qualify a critical supplier.
- **Static Data Risk**: Information in the buyer's ERP expires the day after being validated.
- **Fraud and Greenwashing**: Lack of immutable traceability allows falsification of sustainability credentials.

---

## 2. The Solution: A Sovereign Data Space

ProcureData is not a "data lake" where everyone dumps their information. It's a system of **intelligent and secure pipelines** where data travels directly from Owner to Consumer, under strict rules.

### 2.1 The Trust Triangle (IDSA Model)

We adopt the reference architecture model of the International Data Spaces Association:

| Role | Description |
|------|-------------|
| **The Supplier (Data Provider/Subject)** | Maintains sovereignty. Data never leaves their control without a signed contract. |
| **The Buyer (Data Consumer)** | Accesses verified data in real-time for procurement, risk, or ESG processes. |
| **The Custodian (Data Holder)** | Neutral infrastructure (technical nodes) that facilitates exchange without "seeing" sensitive commercial content. |

### 2.2 Digital Supplier Passport

Instead of sending PDFs by email, each supplier in ProcureData has a **Self-Sovereign Identity (SSI)** based on DIDs (`did:ethr`). Their credentials (ISO, Solvency, ESG) are anchored to this identity, enabling instant and reusable verification:

> *"Verify once, use everywhere"*

---

## 3. Federated Data Space Architecture

ProcureData is structured in **10 architectural components** covering from base infrastructure to multi-sector governance. Our technology stack is **hybrid**, combining Web2 usability with immutable Web3 trust.

### 3.1 Foundations

Four-layer base infrastructure that underpins the entire ProcureData platform.

| Sublayer | Technologies | Description |
|----------|-------------|-------------|
| **Presentation** | Angular 21, Tailwind CSS 4, MetaMask | Mobile-first responsive interface with 5-phase Request Wizard and transaction signing via corporate Wallet. |
| **Orchestration** | AdonisJS, RBAC, State Manager | Central orchestrator for transaction lifecycle with 4 roles (Admin, Approver, Viewer, API Configurator) and dual cryptographic signature. |
| **Sovereignty** | Pontus-X, Data NFTs, DeltaDAO, SSI | Gaia-X network with Data NFTs and DDOs as sovereign digital assets, SSI identity (did:ethr) and blockchain-verified KYB. |
| **Persistence** | PostgreSQL, RLS, JSONB | Database with Row Level Security per organization_id, hybrid JSONB storage for DCAT-AP schemas and encryption at rest + TLS 1.3. |

### 3.2 Data Catalog

Registration, discovery, and governance engine for data assets connecting the 47 deployed success stories.

| Sublayer | Technologies | Description |
|----------|-------------|-------------|
| **Registration** | DCAT-AP, JSON-LD | Standardized schema for asset description with semantic metadata and automatic publication via ERP Connector. |
| **Discovery** | Federated Search, Gaia-X API | Full-text search across distributed catalogs with filters by sector, format, license and profile-based recommendations. |
| **Governance** | Scoring, Lineage, ODRL | Quality scoring (completeness, freshness), data lineage origin→transformation→consumption and ODRL policies integrated per asset. |

### 3.3 3-Actor Flow

IDSA-standard interaction model with three differentiated roles: Consumer, Subject, and Holder.

| Sublayer | Technologies | Description |
|----------|-------------|-------------|
| **Consumer (Buyer)** | Request Wizard, ODRL 2.0, Cryptographic Signature | Initiates data requests via 5-phase wizard, defines usage policies and signs acceptance after verification. |
| **Subject (Supplier)** | SSI, DID (did:ethr), MetaMask Wallet | Self-sovereign identity with W3C verifiable credentials, publishes Data NFTs and responds with dual cryptographic signature. |
| **Holder (Custodian)** | RLS, Smart Contracts, Compute-to-Data | Custodies data with organization_id isolation, Pontus-X verification and delivery without raw data transfer. |

### 3.4 ODRL Policies

ODRL 2.0 (W3C) digital contract engine governing every data access on the platform.

| Sublayer | Technologies | Description |
|----------|-------------|-------------|
| **Permissions** | ODRL 2.0, JSON-LD | Authorized actions (read, analyze, aggregate) with field-level granularity and configurable duration (P90D, P180D, P365D). |
| **Prohibitions** | Smart Contracts, Pontus-X | Redistribution and resale prohibited; derived insights inherit restrictions. Violations recorded on blockchain. |
| **Duties** | EUROe, Smart Settlement | Automatic payment (1 EUROe pay-per-use or 300 EUROe/month subscription) and mandatory usage reports with continuous auditing. |
| **Constraints** | Geographic, Sectoral, Temporal | EU-only processing, sector-specific per Self-Description, maximum query volume per period. |

### 3.5 Web3 and DIDs

Decentralized identity and programmable payments layer based on W3C standards and Pontus-X blockchain.

| Sublayer | Technologies | Description |
|----------|-------------|-------------|
| **SSI Identity** | DID (did:ethr), MetaMask, KYB | Self-managed identity without intermediaries, corporate wallet and KYB verification via DeltaDAO and Gaia-X Self-Description. |
| **Verifiable Credentials** | W3C VC Data Model, Zero-Knowledge | Issuance by verified organizations, selective presentation without revealing sensitive data and instant on-chain verification. |
| **Blockchain** | Data NFTs (ERC-721), DDOs, Smart Contracts | Each data asset is a unique token; DCAT-AP metadata indexed by Aquarius; automatic ODRL policy execution on Pontus-X (Chain ID 32460). |
| **EUROe Payments** | Pay-per-use, Subscription, Settlement | Automatic micropayments via Smart Contract (1 EUROe/tx or 300 EUROe/month); every payment recorded on blockchain with immutable timestamp. |

### 3.6 AI Assistant

Conversational AI system with specialized agents and knowledge base covering 47 success stories.

| Sublayer | Technologies | Description |
|----------|-------------|-------------|
| **NLU** | Intent Mapping, Google Gemini | Intent recognition with widget triggers (ROI, ImpactGauge, Radar), emotional detection and temperature 0.1–0.2 for maximum precision. |
| **Agents** | Concierge, Federated, Success Stories | General agent, Gaia-X/IDSA specialist and expert on 47 verified cases; each with dedicated system prompt and SECURITY_RULES. |
| **Knowledge Base** | Technical Memory, 47 Cases, 15 Docs | Architecture, IDSA/Gaia-X/ODRL protocols, cases with real metrics and controlled technical vocabulary. |
| **Learning** | Feedback 👍/👎, Correction, GitHub | Immediate quality capture, user correction, supervision at /admin/learning-hub and automatic update via repository. |

### 3.7 ERP/CRM Connectors

Enterprise integration layer connecting ProcureData with major market ERP systems.

| Sublayer | Technologies | Description |
|----------|-------------|-------------|
| **Supported ERPs** | SAP S/4HANA, Oracle NetSuite, Dynamics 365, Odoo, Salesforce | Native integration with MM/SD/FI modules (SAP), SuiteScript (Oracle), Dataverse API (Microsoft), JSON-RPC (Odoo), Lightning API (Salesforce). |
| **Protocols** | REST/GraphQL, EDI/XML, Webhooks, gRPC | Standard JSON-LD endpoints, flexible GraphQL queries, EDI EDIFACT/X12, real-time bidirectional webhooks. |
| **Bridge** | ETL Pipeline, Sync Engine, Field Mapping | Extract-transform-load with visual field mapping, bidirectional sync with exponential retry and IDS connector. |
| **Security** | OAuth 2.0, API Keys, Audit Trail | Delegated authentication with refresh tokens, rate limiting (1000 req/min Pro), TLS 1.3 + AES-256 encryption and per-organization RLS. |

### 3.8 Gaia-X Network

Native integration with the European federated data ecosystem Gaia-X and its trust standards.

| Sublayer | Technologies | Description |
|----------|-------------|-------------|
| **Trust Framework** | Self-Descriptions JSON-LD, GXDCH, VCs | Standardized participant and service metadata, verification via Digital Clearing House and Trust Anchors. |
| **IDS** | EDC Connector, Contract Negotiation, DSP | Open-source Eclipse Dataspace Connector for sovereign exchange, programmatic ODRL negotiation and DSP protocol. |
| **Catalog** | DCAT-AP, Aquarius Indexer | European Application Profile with distributed indexing, federated discovery and cross-dataspace semantic search. |
| **Compliance** | GDPR, Data Act, AI Act, CSRD | Complete regulatory compliance: data protection, intermediary governance, algorithmic auditing and ESG reports. Gaia-X Certification Level 1-3. |

### 3.9 Analytics and BI

Business intelligence platform with real-time dashboards, predictive analytics, and DataOps.

| Sublayer | Technologies | Description |
|----------|-------------|-------------|
| **Dashboards** | Real-time KPIs, Health Score | Metrics updated with every blockchain transaction, automatic threshold alerts and role-configurable panels. |
| **Spend Cube** | Multidimensional, Benchmarking | Classification by supplier, category, sector, geography and time; Pareto analysis and anonymous sectoral benchmarking. |
| **Predictive** | AI Forecasting, Risk Monitor, Simulator | Machine Learning for demand prediction, 24/7 supplier monitoring with Z-Score and scenario simulator. |
| **DataOps** | Cleansing, JSON-LD Normalization, Lineage | Duplicate detection, semantic format transformation, complete traceability and anonymized synthetic data. |

### 3.10 Multi-Sector Governance

Independent sectoral node architecture with cross-sector federation and ecosystem monetization.

| Sublayer | Technologies | Description |
|----------|-------------|-------------|
| **Sectoral Nodes** | Industrial (51%), Commerce (15%), Agri (12%), Mobility (10%), Health (7%), Social Economy (5%) | Each sector operates its own node with specific rules, catalog and governance. Configurable white-label with own domain. |
| **Governance** | IDSA Rulebook, ODRL, Multi-Tenant RLS | Decentralized governance per node, sectoral policies (CBAM, MDR, Sedex) and total data isolation between organizations. |
| **Federation** | Federated Catalog, Cross-Sector, Gaia-X | Data discovery between nodes without centralizing, cross-sector transactions and inter-node Smart Contracts. |
| **Monetization** | Marketplace, Value Services, EUROe | Sectoral marketplace with adapted model (subscription, pay-per-use, freemium), premium services and unified payments with European stablecoin. |

---

## 4. Data Economy and Tokenomics

Unlike speculative projects, ProcureData uses an economy based on **real utility** and **financial stability**.

### 4.1 Stablecoin: EUROe

For commercial transactions (dataset purchases, validation service payments), we use **EUROe**, the first regulated electronic money (EMI) on blockchain compatible with MiCA.

| Advantage | Description |
|-----------|-------------|
| **No Volatility** | 1 EUROe always equals 1 EUR. |
| **Programmable** | Payments settle automatically (Smart Settlement) only when data is delivered and validated. |
| **Legal** | Billable and compatible with European corporate accounting. |

### 4.2 Asset Monetization

Suppliers can transform "data waste" into assets:

- **Compute-to-Data**: A supplier can allow an AI algorithm (e.g., risk prediction) to run on their private data without revealing raw data, charging for compute usage.

---

## 5. Real Use Cases

### 5.1 Industrial: Flash Qualification

| Aspect | Detail |
|--------|--------|
| **Problem** | GigaFactory North took 22 days to qualify critical suppliers. |
| **Solution** | With the Digital Passport, they automatically verify ISO certificates and financial solvency against the blockchain. |
| **Result** | Time reduced to **48 hours**. |

### 5.2 Agrifood: Anti-Fraud Traceability

| Aspect | Detail |
|--------|--------|
| **Problem** | Falsification of Denominations of Origin in export wines. |
| **Solution** | NFC labels linked to unique DIDs on each bottle. |
| **Result** | **100% traceability** from vineyard to final consumer in Asia. |

### 5.3 ESG: Scope 3 Auditing

| Aspect | Detail |
|--------|--------|
| **Problem** | Impossibility of obtaining real carbon emissions data from Tier-2 and Tier-3 suppliers. |
| **Solution** | Automated ESG data request through the chain, with cryptographic signature of origin. |
| **Result** | **Auditable CSRD reports** and Greenwashing prevention. |

---

## 6. Roadmap and Future

| Phase | Period | Objectives |
|-------|--------|------------|
| **Phase 1** | Current - v3.1 | Production platform, Pontus-X integration, EUROe payments, KYB onboarding. |
| **Phase 2** | Q3 2026 | Full federation with Catena-X. Launch of Sovereign AI module for predictive supply chain analysis. |
| **Phase 3** | 2027 | Decentralization of validator nodes and expansion to maritime logistics. |

---

## 7. Conclusion

ProcureData is not just software; it's a **new market infrastructure**. By replacing bureaucratic intermediaries with cryptographic code and European standards, we return data control to those who generate it and speed to those who need it.

> **Join the sovereign data economy.**

---

## Glossary

| Term | Definition |
|------|------------|
| **DID** | Decentralized Identifier - Decentralized identifier per W3C standard |
| **ODRL** | Open Digital Rights Language - Data usage policy language |
| **SSI** | Self-Sovereign Identity |
| **Gaia-X** | European initiative for federated data spaces |
| **Pontus-X** | Gaia-X compatible blockchain network |
| **EUROe** | Regulated stablecoin 1:1 with Euro |
| **IDSA** | International Data Spaces Association |
| **EDC** | Eclipse Dataspace Components |
| **MiCA** | Markets in Crypto-Assets Regulation (EU) |
| **CSRD** | Corporate Sustainability Reporting Directive |

---

*© 2026 ProcureData. All rights reserved.*
