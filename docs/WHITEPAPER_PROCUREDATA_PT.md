# PROCUREDATA: Orquestração de Dados para a Economia Descentralizada

**Whitepaper Técnico & Económico v1.0**

*Data: Janeiro 2026*  
*Ecossistema: Gaia-X / Pontus-X / IDSA*

---

## Resumo

ProcureData é a primeira infraestrutura de Espaços de Dados concebida especificamente para a função de Compras e Cadeia de Abastecimento. Elimina a redundância operacional na validação de fornecedores através de identidades soberanas (DID) e contratos inteligentes de uso de dados (ODRL), transformando centros de custo burocráticos em mercados de dados líquidos e seguros.

---

## 1. O Problema: A Armadilha da Redundância (n × m)

Na economia atual, a confiança é manual, lenta e dispendiosa.

### 1.1 Silos de Informação

A cadeia de abastecimento global opera em silos. Um fornecedor (Data Subject) deve enviar a mesma documentação (certificados ISO, dados fiscais, relatórios ESG) a cada um dos seus clientes (Data Consumers) individualmente.

### 1.2 O Custo da Verificação

Se 100 empresas compram aos mesmos 500 fornecedores, são realizados **50.000 processos de validação** e manutenção redundantes. Isto gera:

- **Fricção Operacional**: Meses para homologar um fornecedor crítico.
- **Risco de Dados Estáticos**: A informação no ERP do comprador expira no dia seguinte à sua validação.
- **Fraude e Greenwashing**: A falta de rastreabilidade imutável permite a falsificação de credenciais de sustentabilidade.

---

## 2. A Solução: Um Espaço de Dados Soberano

ProcureData não é um "lago de dados" onde todos despejam a sua informação. É um sistema de **pipelines inteligentes e seguros** onde o dado viaja diretamente do Proprietário ao Consumidor, sob regras estritas.

### 2.1 O Triângulo de Confiança (Modelo IDSA)

Adotamos o modelo de arquitetura de referência da International Data Spaces Association:

| Papel | Descrição |
|-------|-----------|
| **O Fornecedor (Data Provider/Subject)** | Mantém a soberania. O dado nunca sai do seu controlo sem um contrato assinado. |
| **O Comprador (Data Consumer)** | Acede ao dado verificado em tempo real para os seus processos de compras, risco ou ESG. |
| **O Custodiante (Data Holder)** | Infraestrutura neutra (nós técnicos) que facilita a troca sem "ver" o conteúdo comercial sensível. |

### 2.2 Passaporte Digital de Fornecedor

Em vez de enviar PDFs por email, cada fornecedor no ProcureData tem uma **Identidade Auto-Soberana (SSI)** baseada em DIDs (`did:ethr`). As suas credenciais (ISO, Solvência, ESG) estão ancoradas a esta identidade, permitindo uma verificação instantânea e reutilizável:

> *"Verificar uma vez, usar em todo o lado"*

---

## 3. Arquitetura do Espaço de Dados Federado

O ProcureData articula-se em **10 componentes arquitetónicos** que cobrem desde a infraestrutura base até à governança multi-setorial. A nossa stack tecnológica é **híbrida**, combinando a usabilidade do Web2 com a confiança imutável do Web3.

### 3.1 Fundamentos

Infraestrutura base de quatro camadas que suporta toda a plataforma ProcureData.

| Subcamada | Tecnologias | Descrição |
|-----------|-------------|-----------|
| **Apresentação** | Angular 21, Tailwind CSS 4, MetaMask | Interface responsive mobile-first com Request Wizard de 5 fases e assinatura de transações via Wallet corporativa. |
| **Orquestração** | AdonisJS, RBAC, State Manager | Orquestrador central do ciclo de vida de transações com 4 papéis (Admin, Approver, Viewer, API Configurator) e dupla assinatura criptográfica. |
| **Soberania** | Pontus-X, Data NFTs, DeltaDAO, SSI | Rede Gaia-X com Data NFTs e DDOs como ativos digitais soberanos, identidade SSI (did:ethr) e KYB verificado em blockchain. |
| **Persistência** | PostgreSQL, RLS, JSONB | Base de dados com Row Level Security por organization_id, armazenamento híbrido JSONB para esquemas DCAT-AP e encriptação em repouso + TLS 1.3. |

### 3.2 Catálogo de Dados

Motor de registo, descoberta e governança de ativos de dados que conecta os 47 casos de sucesso implantados.

| Subcamada | Tecnologias | Descrição |
|-----------|-------------|-----------|
| **Registo** | DCAT-AP, JSON-LD | Esquema padronizado para descrição de ativos com metadados semânticos e publicação automática via ERP Connector. |
| **Descoberta** | Pesquisa federada, API Gaia-X | Pesquisa full-text em catálogos distribuídos com filtros por setor, formato, licença e recomendações por perfil organizativo. |
| **Governança** | Scoring, Linhagem, ODRL | Scoring de qualidade (completude, frescura), linhagem de dados origem→transformação→consumo e políticas ODRL integradas por ativo. |

### 3.3 Fluxo de 3 Atores

Modelo de interação baseado no padrão IDSA com três papéis diferenciados: Consumer, Subject e Holder.

| Subcamada | Tecnologias | Descrição |
|-----------|-------------|-----------|
| **Consumer (Comprador)** | Request Wizard, ODRL 2.0, Assinatura criptográfica | Inicia pedidos de dados via wizard de 5 fases, define políticas de uso e assina aceitação após verificação. |
| **Subject (Fornecedor)** | SSI, DID (did:ethr), Wallet MetaMask | Identidade auto-soberana com credenciais verificáveis W3C, publica Data NFTs e responde com dupla assinatura criptográfica. |
| **Holder (Custodiante)** | RLS, Smart Contracts, Compute-to-Data | Custodia dados com isolamento por organization_id, verificação via Pontus-X e entrega sem transferência de dados brutos. |

### 3.4 Políticas ODRL

Motor de contratos digitais baseado em ODRL 2.0 (W3C) que governa cada acesso a dados na plataforma.

| Subcamada | Tecnologias | Descrição |
|-----------|-------------|-----------|
| **Permissões** | ODRL 2.0, JSON-LD | Ações autorizadas (read, analyze, aggregate) com granularidade por campo e duração configurável (P90D, P180D, P365D). |
| **Proibições** | Smart Contracts, Pontus-X | Redistribuição e revenda proibidas; insights derivados herdam restrições. Violações registadas em blockchain. |
| **Obrigações** | EUROe, Smart Settlement | Pagamento automático (1 EUROe pay-per-use ou 300 EUROe/mês subscrição) e relatórios de uso obrigatórios com auditoria contínua. |
| **Restrições** | Geográficas, Setoriais, Temporais | Processamento exclusivo na UE, setor específico segundo Self-Description, volume máximo de consultas por período. |

### 3.5 Web3 e DIDs

Camada de identidade descentralizada e pagamentos programáveis baseada em padrões W3C e blockchain Pontus-X.

| Subcamada | Tecnologias | Descrição |
|-----------|-------------|-----------|
| **Identidade SSI** | DID (did:ethr), MetaMask, KYB | Identidade autogerida sem intermediários, wallet corporativa e verificação KYB via DeltaDAO e Self-Description Gaia-X. |
| **Credenciais Verificáveis** | W3C VC Data Model, Zero-Knowledge | Emissão por organizações verificadas, apresentação seletiva sem revelar dados sensíveis e verificação on-chain instantânea. |
| **Blockchain** | Data NFTs (ERC-721), DDOs, Smart Contracts | Cada ativo de dados é um token único; metadados DCAT-AP indexados pelo Aquarius; execução automática de políticas ODRL no Pontus-X (Chain ID 32460). |
| **Pagamentos EUROe** | Pay-per-use, Subscrição, Liquidação | Micropagamentos automáticos via Smart Contract (1 EUROe/tx ou 300 EUROe/mês); cada pagamento registado em blockchain com selo temporal imutável. |

### 3.6 Assistente IA

Sistema de IA conversacional com agentes especializados e base de conhecimento dos 47 casos de sucesso.

| Subcamada | Tecnologias | Descrição |
|-----------|-------------|-----------|
| **NLU** | Intent Mapping, Google Gemini | Reconhecimento de intenções com triggers de widgets (ROI, ImpactGauge, Radar), deteção emocional e temperatura 0.1–0.2 para máxima precisão. |
| **Agentes** | Concierge, Federado, Casos de Sucesso | Agente geral, especialista Gaia-X/IDSA e perito nos 47 casos verificados; cada um com system prompt dedicado e SECURITY_RULES. |
| **Base de Conhecimento** | Memória Técnica, 47 Casos, 15 Docs | Arquitetura, protocolos IDSA/Gaia-X/ODRL, casos com métricas reais e vocabulário técnico controlado. |
| **Aprendizagem** | Feedback 👍/👎, Correção, GitHub | Captura imediata de qualidade, correção pelo utilizador, supervisão em /admin/learning-hub e atualização automática via repositório. |

### 3.7 Conectores ERP/CRM

Camada de integração empresarial que conecta o ProcureData com os principais sistemas ERP do mercado.

| Subcamada | Tecnologias | Descrição |
|-----------|-------------|-----------|
| **ERPs Suportados** | SAP S/4HANA, Oracle NetSuite, Dynamics 365, Odoo, Salesforce | Integração nativa com módulos MM/SD/FI (SAP), SuiteScript (Oracle), Dataverse API (Microsoft), JSON-RPC (Odoo), Lightning API (Salesforce). |
| **Protocolos** | REST/GraphQL, EDI/XML, Webhooks, gRPC | Endpoints JSON-LD padrão, consultas flexíveis GraphQL, EDI EDIFACT/X12, webhooks bidirecionais em tempo real. |
| **Bridge** | ETL Pipeline, Sync Engine, Field Mapping | Extração-transformação-carga com mapeamento visual de campos, sincronização bidirecional com retry exponencial e conector IDS. |
| **Segurança** | OAuth 2.0, API Keys, Audit Trail | Autenticação delegada com refresh tokens, rate limiting (1000 req/min Pro), encriptação TLS 1.3 + AES-256 e RLS por organização. |

### 3.8 Rede Gaia-X

Integração nativa com o ecossistema europeu de dados federados Gaia-X e os seus padrões de confiança.

| Subcamada | Tecnologias | Descrição |
|-----------|-------------|-----------|
| **Trust Framework** | Self-Descriptions JSON-LD, GXDCH, VCs | Metadados padronizados de participantes e serviços, verificação via Digital Clearing House e Trust Anchors. |
| **IDS** | EDC Connector, Contract Negotiation, DSP | Conector Eclipse Dataspace open-source para intercâmbio soberano, negociação ODRL programática e protocolo DSP. |
| **Catálogo** | DCAT-AP, Aquarius Indexer | Application Profile europeu com indexação distribuída, descoberta federada e pesquisa semântica cross-dataspace. |
| **Conformidade** | RGPD, Data Act, AI Act, CSRD | Conformidade regulatória completa: proteção de dados, governança de intermediários, auditoria algorítmica e relatórios ESG. Certificação Gaia-X Level 1-3. |

### 3.9 Analytics e BI

Plataforma de inteligência de negócio com dashboards em tempo real, analítica preditiva e DataOps.

| Subcamada | Tecnologias | Descrição |
|-----------|-------------|-----------|
| **Dashboards** | KPIs tempo real, Health Score | Métricas atualizadas com cada transação blockchain, alertas automáticos por limiares e painéis configuráveis por papel. |
| **Cubo de Gastos** | Multidimensional, Benchmarking | Classificação por fornecedor, categoria, setor, geografia e tempo; análise de Pareto e benchmarking anónimo setorial. |
| **Preditivo** | Forecasting IA, Monitor de Risco, Simulador | Machine Learning para previsão de procura, vigilância 24/7 de fornecedores com Z-Score e simulador de cenários. |
| **DataOps** | Cleansing, Normalização JSON-LD, Linhagem | Deteção de duplicados, transformação para formato semântico padronizado, rastreabilidade completa e dados sintéticos anonimizados. |

### 3.10 Governança Multi-Setor

Arquitetura de nós setoriais independentes com federação cross-sector e monetização por ecossistema.

| Subcamada | Tecnologias | Descrição |
|-----------|-------------|-----------|
| **Nós Setoriais** | Industrial (51%), Comércio (15%), Agro (12%), Mobilidade (10%), Saúde (7%), Economia Social (5%) | Cada setor opera o seu próprio nó com regras, catálogo e governança específicos. Marca branca configurável com domínio próprio. |
| **Governança** | IDSA Rulebook, ODRL, Multi-Tenant RLS | Governança descentralizada por nó, políticas setoriais (CBAM, MDR, Sedex) e isolamento total de dados entre organizações. |
| **Federação** | Catálogo Federado, Cross-Sector, Gaia-X | Descoberta de dados entre nós sem centralizar, transações cross-sector e Smart Contracts inter-nós. |
| **Monetização** | Marketplace, Value Services, EUROe | Marketplace setorial com modelo adaptado (subscrição, pay-per-use, freemium), serviços premium e pagamentos unificados com stablecoin europeu. |

---

## 4. Economia do Dado e Tokenomics

Ao contrário de projetos especulativos, o ProcureData utiliza uma economia baseada em **utilidade real** e **estabilidade financeira**.

### 4.1 Moeda Estável: EUROe

Para as transações comerciais (compra de datasets, pagamento de serviços de validação), utilizamos **EUROe**, o primeiro dinheiro eletrónico regulado (EMI) em blockchain compatível com MiCA.

| Vantagem | Descrição |
|----------|-----------|
| **Sem Volatilidade** | 1 EUROe vale sempre 1 EUR. |
| **Programável** | Os pagamentos são liquidados automaticamente (Smart Settlement) apenas quando o dado é entregue e validado. |
| **Legal** | Faturável e compatível com a contabilidade empresarial europeia. |

### 4.2 Monetização de Ativos

Os fornecedores podem transformar "resíduos de dados" em ativos:

- **Compute-to-Data**: Um fornecedor pode permitir que um algoritmo de IA (ex. previsão de risco) seja executado sobre os seus dados privados sem revelar os dados brutos, cobrando pelo uso do cálculo.

---

## 5. Casos de Uso Reais

### 5.1 Industrial: Homologação Flash

| Aspeto | Detalhe |
|--------|---------|
| **Problema** | GigaFactory North demorava 22 dias a homologar fornecedores críticos. |
| **Solução** | Com o Passaporte Digital, verificam automaticamente certificados ISO e solvência financeira contra a blockchain. |
| **Resultado** | Tempo reduzido para **48 horas**. |

### 5.2 Agroalimentar: Rastreabilidade Anti-Fraude

| Aspeto | Detalhe |
|--------|---------|
| **Problema** | Falsificação de Denominações de Origem em vinhos de exportação. |
| **Solução** | Etiquetas NFC vinculadas a DIDs únicos em cada garrafa. |
| **Resultado** | **100% de rastreabilidade** desde a vinha até ao consumidor final na Ásia. |

### 5.3 ESG: Auditoria de Âmbito 3

| Aspeto | Detalhe |
|--------|---------|
| **Problema** | Impossibilidade de obter dados reais de emissões de carbono de fornecedores Tier-2 e Tier-3. |
| **Solução** | Pedido automatizado de dados ESG através da cadeia, com assinatura criptográfica da origem. |
| **Resultado** | Relatórios **CSRD auditáveis** e prevenção de Greenwashing. |

---

## 6. Roadmap e Futuro

| Fase | Período | Objetivos |
|------|---------|-----------|
| **Fase 1** | Atual - v3.1 | Plataforma produtiva, integração Pontus-X, Pagamentos EUROe, Onboarding KYB. |
| **Fase 2** | T3 2026 | Federação completa com Catena-X. Lançamento do módulo de IA Soberana para análise preditiva de cadeia de abastecimento. |
| **Fase 3** | 2027 | Descentralização dos nós validadores e expansão para logística marítima. |

---

## 7. Conclusão

ProcureData não é apenas software; é uma **nova infraestrutura de mercado**. Ao substituir intermediários burocráticos por código criptográfico e standards europeus, devolvemos o controlo do dado a quem o gera e a velocidade a quem o necessita.

> **Junte-se à economia de dados soberana.**

---

## Glossário

| Termo | Definição |
|-------|-----------|
| **DID** | Decentralized Identifier - Identificador descentralizado segundo o standard W3C |
| **ODRL** | Open Digital Rights Language - Linguagem de políticas de uso de dados |
| **SSI** | Self-Sovereign Identity - Identidade auto-soberana |
| **Gaia-X** | Iniciativa europeia para espaços de dados federados |
| **Pontus-X** | Rede blockchain compatível com Gaia-X |
| **EUROe** | Stablecoin regulada 1:1 com o Euro |
| **IDSA** | International Data Spaces Association |
| **EDC** | Eclipse Dataspace Components |
| **MiCA** | Markets in Crypto-Assets Regulation (UE) |
| **CSRD** | Corporate Sustainability Reporting Directive |

---

*© 2026 ProcureData. Todos os direitos reservados.*
