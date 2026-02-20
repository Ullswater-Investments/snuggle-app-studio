# PROCUREDATA : Orchestration des Données pour l'Économie Décentralisée

**Livre Blanc Technique & Économique v1.0**

*Date : Janvier 2026*  
*Écosystème : Gaia-X / Pontus-X / IDSA*

---

## Résumé

ProcureData est la première infrastructure d'Espaces de Données conçue spécifiquement pour les fonctions Achats et Chaîne d'Approvisionnement. Elle élimine la redondance opérationnelle dans la validation des fournisseurs grâce aux identités souveraines (DID) et aux contrats intelligents d'utilisation des données (ODRL), transformant les centres de coûts bureaucratiques en marchés de données liquides et sécurisés.

---

## 1. Le Problème : Le Piège de la Redondance (n × m)

Dans l'économie actuelle, la confiance est manuelle, lente et coûteuse.

### 1.1 Silos d'Information

La chaîne d'approvisionnement mondiale fonctionne en silos. Un fournisseur (Data Subject) doit envoyer la même documentation (certificats ISO, données fiscales, rapports ESG) à chacun de ses clients (Data Consumers) individuellement.

### 1.2 Le Coût de la Vérification

Si 100 entreprises achètent aux mêmes 500 fournisseurs, **50 000 processus de validation** et de maintenance redondants sont effectués. Cela génère :

- **Friction Opérationnelle** : Des mois pour qualifier un fournisseur critique.
- **Risque de Données Statiques** : Les informations dans l'ERP de l'acheteur expirent le jour après leur validation.
- **Fraude et Greenwashing** : L'absence de traçabilité immuable permet la falsification des références de durabilité.

---

## 2. La Solution : Un Espace de Données Souverain

ProcureData n'est pas un « lac de données » où tout le monde déverse ses informations. C'est un système de **pipelines intelligents et sécurisés** où les données voyagent directement du Propriétaire au Consommateur, sous des règles strictes.

### 2.1 Le Triangle de Confiance (Modèle IDSA)

Nous adoptons le modèle d'architecture de référence de l'International Data Spaces Association :

| Rôle | Description |
|------|-------------|
| **Le Fournisseur (Data Provider/Subject)** | Maintient la souveraineté. Les données ne quittent jamais son contrôle sans contrat signé. |
| **L'Acheteur (Data Consumer)** | Accède aux données vérifiées en temps réel pour ses processus d'achats, de risque ou ESG. |
| **Le Dépositaire (Data Holder)** | Infrastructure neutre (nœuds techniques) qui facilite l'échange sans « voir » le contenu commercial sensible. |

### 2.2 Passeport Numérique Fournisseur

Au lieu d'envoyer des PDF par email, chaque fournisseur dans ProcureData dispose d'une **Identité Auto-Souveraine (SSI)** basée sur les DIDs (`did:ethr`). Ses références (ISO, Solvabilité, ESG) sont ancrées à cette identité, permettant une vérification instantanée et réutilisable :

> *« Vérifier une fois, utiliser partout »*

---

## 3. Architecture de l'Espace de Données Fédéré

ProcureData s'articule en **10 composants architecturaux** couvrant de l'infrastructure de base à la gouvernance multi-sectorielle. Notre pile technologique est **hybride**, combinant l'utilisabilité du Web2 avec la confiance immuable du Web3.

### 3.1 Fondations

Infrastructure de base à quatre couches qui soutient l'ensemble de la plateforme ProcureData.

| Sous-couche | Technologies | Description |
|-------------|-------------|-------------|
| **Présentation** | Angular 21, Tailwind CSS 4, MetaMask | Interface responsive mobile-first avec Request Wizard en 5 phases et signature de transactions via Wallet d'entreprise. |
| **Orchestration** | AdonisJS, RBAC, State Manager | Orchestrateur central du cycle de vie des transactions avec 4 rôles (Admin, Approver, Viewer, API Configurator) et double signature cryptographique. |
| **Souveraineté** | Pontus-X, Data NFTs, DeltaDAO, SSI | Réseau Gaia-X avec Data NFTs et DDOs comme actifs numériques souverains, identité SSI (did:ethr) et KYB vérifié sur blockchain. |
| **Persistance** | PostgreSQL, RLS, JSONB | Base de données avec Row Level Security par organization_id, stockage hybride JSONB pour les schémas DCAT-AP et chiffrement au repos + TLS 1.3. |

### 3.2 Catalogue de Données

Moteur d'enregistrement, de découverte et de gouvernance des actifs de données connectant les 47 cas de succès déployés.

| Sous-couche | Technologies | Description |
|-------------|-------------|-------------|
| **Enregistrement** | DCAT-AP, JSON-LD | Schéma standardisé pour la description des actifs avec métadonnées sémantiques et publication automatique via ERP Connector. |
| **Découverte** | Recherche fédérée, API Gaia-X | Recherche full-text dans les catalogues distribués avec filtres par secteur, format, licence et recommandations par profil organisationnel. |
| **Gouvernance** | Scoring, Lignage, ODRL | Scoring de qualité (complétude, fraîcheur), lignage des données origine→transformation→consommation et politiques ODRL intégrées par actif. |

### 3.3 Flux 3 Acteurs

Modèle d'interaction basé sur le standard IDSA avec trois rôles différenciés : Consumer, Subject et Holder.

| Sous-couche | Technologies | Description |
|-------------|-------------|-------------|
| **Consumer (Acheteur)** | Request Wizard, ODRL 2.0, Signature cryptographique | Initie les demandes de données via wizard en 5 phases, définit les politiques d'usage et signe l'acceptation après vérification. |
| **Subject (Fournisseur)** | SSI, DID (did:ethr), Wallet MetaMask | Identité auto-souveraine avec credentials vérifiables W3C, publie des Data NFTs et répond avec double signature cryptographique. |
| **Holder (Dépositaire)** | RLS, Smart Contracts, Compute-to-Data | Garde les données avec isolation par organization_id, vérification via Pontus-X et livraison sans transfert de données brutes. |

### 3.4 Politiques ODRL

Moteur de contrats numériques basé sur ODRL 2.0 (W3C) gouvernant chaque accès aux données sur la plateforme.

| Sous-couche | Technologies | Description |
|-------------|-------------|-------------|
| **Permissions** | ODRL 2.0, JSON-LD | Actions autorisées (read, analyze, aggregate) avec granularité par champ et durée configurable (P90D, P180D, P365D). |
| **Interdictions** | Smart Contracts, Pontus-X | Redistribution et revente interdites ; les insights dérivés héritent des restrictions. Violations enregistrées sur blockchain. |
| **Obligations** | EUROe, Smart Settlement | Paiement automatique (1 EUROe pay-per-use ou 300 EUROe/mois abonnement) et rapports d'utilisation obligatoires avec audit continu. |
| **Contraintes** | Géographiques, Sectorielles, Temporelles | Traitement exclusif dans l'UE, secteur spécifique selon Self-Description, volume maximum de requêtes par période. |

### 3.5 Web3 et DIDs

Couche d'identité décentralisée et de paiements programmables basée sur les standards W3C et la blockchain Pontus-X.

| Sous-couche | Technologies | Description |
|-------------|-------------|-------------|
| **Identité SSI** | DID (did:ethr), MetaMask, KYB | Identité auto-gérée sans intermédiaires, wallet d'entreprise et vérification KYB via DeltaDAO et Self-Description Gaia-X. |
| **Credentials Vérifiables** | W3C VC Data Model, Zero-Knowledge | Émission par organisations vérifiées, présentation sélective sans révéler de données sensibles et vérification on-chain instantanée. |
| **Blockchain** | Data NFTs (ERC-721), DDOs, Smart Contracts | Chaque actif de données est un token unique ; métadonnées DCAT-AP indexées par Aquarius ; exécution automatique des politiques ODRL sur Pontus-X (Chain ID 32460). |
| **Paiements EUROe** | Pay-per-use, Abonnement, Règlement | Micropaiements automatiques via Smart Contract (1 EUROe/tx ou 300 EUROe/mois) ; chaque paiement enregistré sur blockchain avec horodatage immuable. |

### 3.6 Assistant IA

Système d'IA conversationnelle avec agents spécialisés et base de connaissances couvrant les 47 cas de succès.

| Sous-couche | Technologies | Description |
|-------------|-------------|-------------|
| **NLU** | Intent Mapping, Google Gemini | Reconnaissance d'intentions avec déclencheurs de widgets (ROI, ImpactGauge, Radar), détection émotionnelle et température 0.1–0.2 pour précision maximale. |
| **Agents** | Concierge, Fédéré, Cas de Succès | Agent général, spécialiste Gaia-X/IDSA et expert des 47 cas vérifiés ; chacun avec system prompt dédié et SECURITY_RULES. |
| **Base de Connaissances** | Mémoire Technique, 47 Cas, 15 Docs | Architecture, protocoles IDSA/Gaia-X/ODRL, cas avec métriques réelles et vocabulaire technique contrôlé. |
| **Apprentissage** | Feedback 👍/👎, Correction, GitHub | Capture immédiate de qualité, correction utilisateur, supervision à /admin/learning-hub et mise à jour automatique via dépôt. |

### 3.7 Connecteurs ERP/CRM

Couche d'intégration entreprise connectant ProcureData aux principaux systèmes ERP du marché.

| Sous-couche | Technologies | Description |
|-------------|-------------|-------------|
| **ERPs Supportés** | SAP S/4HANA, Oracle NetSuite, Dynamics 365, Odoo, Salesforce | Intégration native avec modules MM/SD/FI (SAP), SuiteScript (Oracle), Dataverse API (Microsoft), JSON-RPC (Odoo), Lightning API (Salesforce). |
| **Protocoles** | REST/GraphQL, EDI/XML, Webhooks, gRPC | Endpoints JSON-LD standard, requêtes flexibles GraphQL, EDI EDIFACT/X12, webhooks bidirectionnels en temps réel. |
| **Bridge** | ETL Pipeline, Sync Engine, Field Mapping | Extraction-transformation-chargement avec mappage visuel des champs, synchronisation bidirectionnelle avec retry exponentiel et connecteur IDS. |
| **Sécurité** | OAuth 2.0, API Keys, Audit Trail | Authentification déléguée avec refresh tokens, rate limiting (1000 req/min Pro), chiffrement TLS 1.3 + AES-256 et RLS par organisation. |

### 3.8 Réseau Gaia-X

Intégration native avec l'écosystème européen de données fédérées Gaia-X et ses standards de confiance.

| Sous-couche | Technologies | Description |
|-------------|-------------|-------------|
| **Trust Framework** | Self-Descriptions JSON-LD, GXDCH, VCs | Métadonnées standardisées des participants et services, vérification via Digital Clearing House et Trust Anchors. |
| **IDS** | EDC Connector, Contract Negotiation, DSP | Connecteur Eclipse Dataspace open-source pour échange souverain, négociation ODRL programmatique et protocole DSP. |
| **Catalogue** | DCAT-AP, Aquarius Indexer | Application Profile européen avec indexation distribuée, découverte fédérée et recherche sémantique cross-dataspace. |
| **Conformité** | RGPD, Data Act, AI Act, CSRD | Conformité réglementaire complète : protection des données, gouvernance des intermédiaires, audit algorithmique et rapports ESG. Certification Gaia-X Level 1-3. |

### 3.9 Analytics et BI

Plateforme d'intelligence économique avec tableaux de bord en temps réel, analytique prédictive et DataOps.

| Sous-couche | Technologies | Description |
|-------------|-------------|-------------|
| **Tableaux de Bord** | KPIs temps réel, Health Score | Métriques mises à jour à chaque transaction blockchain, alertes automatiques par seuils et panneaux configurables par rôle. |
| **Cube de Dépenses** | Multidimensionnel, Benchmarking | Classification par fournisseur, catégorie, secteur, géographie et temps ; analyse de Pareto et benchmarking anonyme sectoriel. |
| **Prédictif** | Forecasting IA, Moniteur de Risque, Simulateur | Machine Learning pour prédiction de demande, surveillance 24/7 des fournisseurs avec Z-Score et simulateur de scénarios. |
| **DataOps** | Cleansing, Normalisation JSON-LD, Lignage | Détection de doublons, transformation en format sémantique standardisé, traçabilité complète et données synthétiques anonymisées. |

### 3.10 Gouvernance Multi-Secteur

Architecture de nœuds sectoriels indépendants avec fédération cross-sector et monétisation par écosystème.

| Sous-couche | Technologies | Description |
|-------------|-------------|-------------|
| **Nœuds Sectoriels** | Industriel (51%), Commerce (15%), Agro (12%), Mobilité (10%), Santé (7%), Économie Sociale (5%) | Chaque secteur opère son propre nœud avec règles, catalogue et gouvernance spécifiques. Marque blanche configurable avec domaine propre. |
| **Gouvernance** | IDSA Rulebook, ODRL, Multi-Tenant RLS | Gouvernance décentralisée par nœud, politiques sectorielles (CBAM, MDR, Sedex) et isolation totale des données entre organisations. |
| **Fédération** | Catalogue Fédéré, Cross-Sector, Gaia-X | Découverte de données entre nœuds sans centraliser, transactions cross-sector et Smart Contracts inter-nœuds. |
| **Monétisation** | Marketplace, Value Services, EUROe | Marketplace sectoriel avec modèle adapté (abonnement, pay-per-use, freemium), services premium et paiements unifiés avec stablecoin européen. |

---

## 4. Économie des Données et Tokenomics

Contrairement aux projets spéculatifs, ProcureData utilise une économie basée sur l'**utilité réelle** et la **stabilité financière**.

### 4.1 Monnaie Stable : EUROe

Pour les transactions commerciales (achat de datasets, paiement de services de validation), nous utilisons **EUROe**, la première monnaie électronique régulée (EMI) sur blockchain compatible avec MiCA.

| Avantage | Description |
|----------|-------------|
| **Sans Volatilité** | 1 EUROe vaut toujours 1 EUR. |
| **Programmable** | Les paiements sont réglés automatiquement (Smart Settlement) uniquement lorsque les données sont livrées et validées. |
| **Légal** | Facturable et compatible avec la comptabilité d'entreprise européenne. |

### 4.2 Monétisation des Actifs

Les fournisseurs peuvent transformer les « déchets de données » en actifs :

- **Compute-to-Data** : Un fournisseur peut permettre à un algorithme d'IA (ex. prédiction de risque) de s'exécuter sur ses données privées sans révéler les données brutes, en facturant l'utilisation du calcul.

---

## 5. Cas d'Usage Réels

### 5.1 Industriel : Qualification Flash

| Aspect | Détail |
|--------|--------|
| **Problème** | GigaFactory North mettait 22 jours pour qualifier les fournisseurs critiques. |
| **Solution** | Avec le Passeport Numérique, ils vérifient automatiquement les certificats ISO et la solvabilité financière contre la blockchain. |
| **Résultat** | Temps réduit à **48 heures**. |

### 5.2 Agroalimentaire : Traçabilité Anti-Fraude

| Aspect | Détail |
|--------|--------|
| **Problème** | Falsification des Appellations d'Origine dans les vins d'exportation. |
| **Solution** | Étiquettes NFC liées à des DIDs uniques sur chaque bouteille. |
| **Résultat** | **100% de traçabilité** du vignoble au consommateur final en Asie. |

### 5.3 ESG : Audit du Scope 3

| Aspect | Détail |
|--------|--------|
| **Problème** | Impossibilité d'obtenir des données réelles d'émissions carbone des fournisseurs Tier-2 et Tier-3. |
| **Solution** | Demande automatisée de données ESG à travers la chaîne, avec signature cryptographique de l'origine. |
| **Résultat** | Rapports **CSRD auditables** et prévention du Greenwashing. |

---

## 6. Feuille de Route et Avenir

| Phase | Période | Objectifs |
|-------|---------|-----------|
| **Phase 1** | Actuelle - v3.1 | Plateforme en production, intégration Pontus-X, paiements EUROe, onboarding KYB. |
| **Phase 2** | T3 2026 | Fédération complète avec Catena-X. Lancement du module IA Souveraine pour l'analyse prédictive de la chaîne d'approvisionnement. |
| **Phase 3** | 2027 | Décentralisation des nœuds validateurs et expansion vers la logistique maritime. |

---

## 7. Conclusion

ProcureData n'est pas qu'un logiciel ; c'est une **nouvelle infrastructure de marché**. En remplaçant les intermédiaires bureaucratiques par du code cryptographique et des standards européens, nous rendons le contrôle des données à ceux qui les génèrent et la rapidité à ceux qui en ont besoin.

> **Rejoignez l'économie des données souveraines.**

---

## Glossaire

| Terme | Définition |
|-------|------------|
| **DID** | Decentralized Identifier - Identifiant décentralisé selon la norme W3C |
| **ODRL** | Open Digital Rights Language - Langage de politiques d'utilisation des données |
| **SSI** | Self-Sovereign Identity - Identité auto-souveraine |
| **Gaia-X** | Initiative européenne pour les espaces de données fédérés |
| **Pontus-X** | Réseau blockchain compatible Gaia-X |
| **EUROe** | Stablecoin régulé 1:1 avec l'Euro |
| **IDSA** | International Data Spaces Association |
| **EDC** | Eclipse Dataspace Components |
| **MiCA** | Markets in Crypto-Assets Regulation (UE) |
| **CSRD** | Corporate Sustainability Reporting Directive |

---

*© 2026 ProcureData. Tous droits réservés.*
