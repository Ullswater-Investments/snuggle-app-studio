# 🚀 PROCUREDATA: Guía Completa de Migración

> **Versión**: 2.0 | **Fecha**: 2026-01-10  
> **Proyecto**: Espacio de Datos Soberano para la Función de Compras  
> **Financiado por**: NextGenerationEU / Kit Digital  

---

## 📋 Índice

1. [Stack Tecnológico](#1-stack-tecnológico)
2. [Estructura del Proyecto](#2-estructura-del-proyecto)
3. [Esquema de Base de Datos](#3-esquema-de-base-de-datos)
4. [Edge Functions (Backend)](#4-edge-functions-backend)
5. [Sistema de Rutas](#5-sistema-de-rutas)
6. [Hooks Personalizados](#6-hooks-personalizados)
7. [Blueprint 2.0 de Simuladores](#7-blueprint-20-de-simuladores)
8. [Configuración Web3/Pontus-X](#8-configuración-web3pontus-x)
9. [Sistema de Diseño](#9-sistema-de-diseño)
10. [Variables de Entorno](#10-variables-de-entorno)
11. [Guía de Instalación](#11-guía-de-instalación)
12. [Instrucciones para IA del IDE](#12-instrucciones-para-ia-del-ide)
13. [Troubleshooting](#13-troubleshooting)
14. [Referencias](#14-referencias)

---

## 1. Stack Tecnológico

### 1.1 Core Framework

| Categoría | Librería | Versión | Propósito |
|-----------|----------|---------|-----------|
| **Framework** | React | 18.3.1 | UI Library |
| **Bundler** | Vite | 5.4.19 | Build tool con HMR |
| **Lenguaje** | TypeScript | 5.8.3 | Tipado estático |
| **Estilos** | Tailwind CSS | 3.4.17 | Utility-first CSS |

### 1.2 UI Components (Radix/Shadcn)

```json
{
  "@radix-ui/react-accordion": "^1.2.11",
  "@radix-ui/react-alert-dialog": "^1.1.14",
  "@radix-ui/react-avatar": "^1.1.10",
  "@radix-ui/react-checkbox": "^1.3.2",
  "@radix-ui/react-dialog": "^1.1.14",
  "@radix-ui/react-dropdown-menu": "^2.1.15",
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-popover": "^1.1.14",
  "@radix-ui/react-progress": "^1.1.7",
  "@radix-ui/react-select": "^2.2.5",
  "@radix-ui/react-slider": "^1.3.5",
  "@radix-ui/react-switch": "^1.2.5",
  "@radix-ui/react-tabs": "^1.1.12",
  "@radix-ui/react-toast": "^1.2.14",
  "@radix-ui/react-tooltip": "^1.2.7"
}
```

### 1.3 Backend & Estado

| Librería | Versión | Propósito |
|----------|---------|-----------|
| @supabase/supabase-js | 2.81.1 | Cliente Supabase (Auth, DB, Realtime) |
| @tanstack/react-query | 5.83.0 | Server state management |
| react-hook-form | 7.61.1 | Gestión de formularios |
| zod | 3.25.76 | Validación de esquemas |

### 1.4 Web3 & Blockchain

| Librería | Versión | Propósito |
|----------|---------|-----------|
| ethers | 6.16.0 | Interacción con EVM (Pontus-X) |

### 1.5 Visualización & UX

| Librería | Versión | Propósito |
|----------|---------|-----------|
| recharts | 2.15.4 | Gráficos interactivos |
| framer-motion | 12.23.24 | Animaciones |
| lucide-react | 0.462.0 | Iconografía |
| react-joyride | 2.9.3 | Tours guiados |
| mermaid | 11.12.2 | Diagramas |

### 1.6 Utilidades

| Librería | Versión | Propósito |
|----------|---------|-----------|
| date-fns | 3.6.0 | Manipulación de fechas |
| jspdf | 3.0.4 | Generación de PDFs |
| react-markdown | 10.1.0 | Renderizado Markdown |
| sonner | 1.7.4 | Notificaciones toast |
| cmdk | 1.1.1 | Command palette |

---

## 2. Estructura del Proyecto

```
procuredata/
├── src/
│   ├── assets/                      # Imágenes y recursos estáticos
│   │   ├── itbid-logo.png
│   │   └── kit-espacios-datos-logo.png
│   │
│   ├── components/                  # 200+ componentes React
│   │   ├── ui/                      # 45 componentes Shadcn/UI
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ... (28 más)
│   │   │
│   │   ├── success-stories/         # Sistema Blueprint 2.0
│   │   │   ├── simulators/          # 47 simuladores interactivos
│   │   │   │   ├── AeolusWindSimulator.tsx
│   │   │   │   ├── AluCycleSimulator.tsx
│   │   │   │   ├── AquaPowerNexusSimulator.tsx
│   │   │   │   ├── AvocadoTrustSimulator.tsx
│   │   │   │   ├── BateriaHubSimulator.tsx
│   │   │   │   ├── BatteryLifeSimulator.tsx
│   │   │   │   ├── BerryWaterSimulator.tsx
│   │   │   │   ├── BioCottonTraceSimulator.tsx
│   │   │   │   ├── BioHeatDistrictSimulator.tsx
│   │   │   │   ├── BioMedSimulator.tsx
│   │   │   │   ├── CitrusCheckSimulator.tsx
│   │   │   │   ├── DataCloudSecureSimulator.tsx
│   │   │   │   ├── EcoOrchestratorSimulator.tsx
│   │   │   │   ├── FastFashionSimulator.tsx
│   │   │   │   ├── FiberLoopSimulator.tsx
│   │   │   │   ├── FleetCarbonZeroSimulator.tsx
│   │   │   │   ├── GigaFactorySimulator.tsx
│   │   │   │   ├── GlobalBridgeSimulator.tsx
│   │   │   │   ├── GovNetSimulator.tsx
│   │   │   │   ├── GreenFinanceESGSimulator.tsx
│   │   │   │   ├── GreenGovCircularSimulator.tsx
│   │   │   │   ├── GreenhouseAISimulator.tsx
│   │   │   │   ├── GridFlexSimulator.tsx
│   │   │   │   ├── H2PureSimulator.tsx
│   │   │   │   ├── HeliosFieldsSimulator.tsx
│   │   │   │   ├── KYCSovereignSimulator.tsx
│   │   │   │   ├── OliveOriginSimulator.tsx
│   │   │   │   ├── OliveTrustSimulator.tsx
│   │   │   │   ├── PharmaColdSimulator.tsx
│   │   │   │   ├── PoligonoEcoLinkSimulator.tsx
│   │   │   │   ├── PortBCNSimulator.tsx
│   │   │   │   ├── ProducerTrustSimulator.tsx
│   │   │   │   ├── PureLithiumSimulator.tsx
│   │   │   │   ├── RareEarthRecoverSimulator.tsx
│   │   │   │   ├── RawMarketSimulator.tsx
│   │   │   │   ├── RiceSatelliteSimulator.tsx
│   │   │   │   ├── SmartChargeSimulator.tsx
│   │   │   │   ├── SocialHubSimulator.tsx
│   │   │   │   ├── TropicalFlashSimulator.tsx
│   │   │   │   ├── TurbineChainSimulator.tsx
│   │   │   │   ├── UniSynthSimulator.tsx
│   │   │   │   ├── UrbanDeliverSimulator.tsx
│   │   │   │   ├── UrbanHydroSimulator.tsx
│   │   │   │   ├── UrbanMiningSimulator.tsx
│   │   │   │   ├── VinosDOSimulator.tsx
│   │   │   │   ├── WasteToValueSimulator.tsx
│   │   │   │   └── index.ts          # Export barrel
│   │   │   │
│   │   │   ├── AriaDynamicReport.tsx
│   │   │   ├── AriaQuoteCard.tsx
│   │   │   ├── BlockchainProofCard.tsx
│   │   │   ├── EnergySmartContract.tsx
│   │   │   ├── HealthMaintenanceSimulator.tsx
│   │   │   ├── ImpactSimulator.tsx
│   │   │   ├── MobilityScope3Report.tsx
│   │   │   ├── NarrativeBlock.tsx
│   │   │   ├── RetailEthicsAudit.tsx
│   │   │   ├── SectorSelector.tsx
│   │   │   ├── SuccessStoriesFilter.tsx
│   │   │   ├── SuccessStoryNavButtons.tsx
│   │   │   ├── SuccessStoryNavigator.tsx
│   │   │   └── SuccessVisualRenderer.tsx
│   │   │
│   │   ├── partners/itbid/          # Componentes partner ITBID
│   │   │   ├── doctecnico/          # Documento técnico
│   │   │   │   ├── DemoSchedulerDialog.tsx
│   │   │   │   ├── DocActualizacion.tsx
│   │   │   │   ├── DocCTA.tsx
│   │   │   │   ├── DocDiferenciacion.tsx
│   │   │   │   ├── DocGobernanza.tsx
│   │   │   │   ├── DocHojaDeRuta.tsx
│   │   │   │   ├── DocModeloNegocio.tsx
│   │   │   │   ├── DocParticipantes.tsx
│   │   │   │   ├── DocPropiedadDatos.tsx
│   │   │   │   ├── DocRequisitosTecnicos.tsx
│   │   │   │   ├── DocResponsabilidadLegal.tsx
│   │   │   │   ├── DocResumenEjecutivo.tsx
│   │   │   │   ├── DocTecnicoHero.tsx
│   │   │   │   ├── DocTiposInformacion.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── whitepaper/          # Whitepaper interactivo
│   │   │   │   ├── ArchitectureDiagram.tsx
│   │   │   │   ├── DataSovereignty.tsx
│   │   │   │   ├── ExecutiveSummary.tsx
│   │   │   │   ├── FederatedFlowSteps.tsx
│   │   │   │   ├── GaiaXContext.tsx
│   │   │   │   ├── Glossary.tsx
│   │   │   │   ├── SecurityFramework.tsx
│   │   │   │   ├── StakeholderBenefits.tsx
│   │   │   │   ├── TechnicalSpecs.tsx
│   │   │   │   ├── TripartiteModel.tsx
│   │   │   │   ├── UseCasesWhitepaper.tsx
│   │   │   │   ├── WhitepaperCTA.tsx
│   │   │   │   └── WhitepaperHero.tsx
│   │   │   │
│   │   │   ├── ArchitectureSection.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── DataSpaceKitSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProblemSection.tsx
│   │   │   ├── RoadmapSection.tsx
│   │   │   ├── SolutionSection.tsx
│   │   │   ├── SuccessCasesSection.tsx
│   │   │   └── UseCasesSection.tsx
│   │   │
│   │   ├── services/                # Widgets de servicios
│   │   │   ├── widgets/
│   │   │   │   ├── CapabilityTree.tsx
│   │   │   │   ├── ImpactGauge.tsx
│   │   │   │   ├── ProcessFlow.tsx
│   │   │   │   ├── RoiCalculator.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ServiceFlowDiagram.tsx
│   │   │   ├── ServiceInteractiveWidget.tsx
│   │   │   ├── ServiceMetrics.tsx
│   │   │   └── ServicePopularityBadge.tsx
│   │   │
│   │   ├── dashboard/               # Widgets del dashboard
│   │   │   ├── HealthScoreGauge.tsx
│   │   │   ├── MiniPieChart.tsx
│   │   │   ├── ProgressCard.tsx
│   │   │   └── SparklineCard.tsx
│   │   │
│   │   ├── data/                    # Componentes de calidad de datos
│   │   │   ├── DataQualityAlerts.tsx
│   │   │   ├── DataQualityDashboard.tsx
│   │   │   ├── DataQualityOverview.tsx
│   │   │   ├── DataQualityScore.tsx
│   │   │   ├── FreshnessBar.tsx
│   │   │   ├── HeartbeatIndicator.tsx
│   │   │   ├── QualityTrendSparkline.tsx
│   │   │   └── SectorDistributionChart.tsx
│   │   │
│   │   ├── enterprise/              # Componentes enterprise
│   │   │   ├── SectionAuditLogs.tsx
│   │   │   ├── SectionERPConnectors.tsx
│   │   │   ├── SectionIDSA.tsx
│   │   │   └── SectionNextSteps.tsx
│   │   │
│   │   ├── gamification/            # Gamificación
│   │   │   ├── LevelBadge.tsx
│   │   │   ├── ScoreRing.tsx
│   │   │   └── TrendIndicator.tsx
│   │   │
│   │   ├── innovation/              # Innovation Lab
│   │   │   └── ConceptDetailModal.tsx
│   │   │
│   │   ├── sustainability/          # Sostenibilidad
│   │   │   ├── EcoGauge.tsx
│   │   │   ├── GrowthTree.tsx
│   │   │   └── SectorRanking.tsx
│   │   │
│   │   ├── AIConcierge.tsx          # Chat con ARIA
│   │   ├── ActivityFeed.tsx
│   │   ├── AgroROISimulator.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── AppLayout.tsx            # Layout principal
│   │   ├── AppSidebar.tsx           # Sidebar navegación
│   │   ├── ArrayDataView.tsx
│   │   ├── AssetChatInterface.tsx
│   │   ├── AssetDownloadButton.tsx
│   │   ├── CodeIntegrationModal.tsx
│   │   ├── CommandMenu.tsx          # Cmd+K palette
│   │   ├── DashboardStats.tsx
│   │   ├── DataLineage.tsx
│   │   ├── DataLineageBlockchain.tsx
│   │   ├── DataPreviewDialog.tsx
│   │   ├── DemoBanner.tsx
│   │   ├── DemoHelpButton.tsx
│   │   ├── DemoTour.tsx
│   │   ├── DynamicBreadcrumbs.tsx
│   │   ├── EmptyState.tsx
│   │   ├── EnhancedWalletCard.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ESGDataView.tsx
│   │   ├── FundingFooter.tsx
│   │   ├── GaiaXBadge.tsx
│   │   ├── GenericJSONView.tsx
│   │   ├── GlobalNavigation.tsx
│   │   ├── GovernancePanel.tsx
│   │   ├── InnovationChart.tsx
│   │   ├── IoTDataView.tsx
│   │   ├── ItbidProtectedRoute.tsx
│   │   ├── LicenseRenewalDialog.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   ├── MermaidDiagram.tsx
│   │   ├── MotorNavigation.tsx
│   │   ├── NavLink.tsx
│   │   ├── NegotiationChat.tsx
│   │   ├── NotificationsBell.tsx
│   │   ├── OrderSummary.tsx
│   │   ├── OrganizationSwitcher.tsx
│   │   ├── PageSkeleton.tsx
│   │   ├── PaymentGateway.tsx
│   │   ├── ProcuredataLogo.tsx      # Logo SVG con tipografía
│   │   ├── ProtectedRoute.tsx       # HOC autenticación
│   │   ├── PublicDemoBanner.tsx
│   │   ├── PublicDemoLayout.tsx
│   │   ├── RecentTransactions.tsx
│   │   ├── RequestsAnalyticsDashboard.tsx
│   │   ├── RevokeAccessButton.tsx
│   │   ├── ROISimulator.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── SectorIcon.tsx
│   │   ├── SmartContractViewer.tsx
│   │   ├── SocialImpactDashboard.tsx
│   │   ├── SuccessStoriesSection.tsx
│   │   ├── TeamManagement.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TransactionProgress.tsx
│   │   ├── UseCasesCarousel.tsx
│   │   ├── WalletButton.tsx         # Botón conexión wallet
│   │   └── Web3StatusWidget.tsx
│   │
│   ├── hooks/                       # 10 hooks personalizados
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useAuth.tsx              # Autenticación + Web3
│   │   ├── useConsumeAsset.tsx
│   │   ├── useNotifications.tsx
│   │   ├── useOrgSector.tsx
│   │   ├── useOrganizationContext.tsx
│   │   ├── usePrivacyPreferences.tsx
│   │   ├── usePurchaseAsset.tsx
│   │   └── useWeb3Wallet.tsx        # Gestión wallet Web3
│   │
│   ├── integrations/supabase/       # Cliente Supabase (AUTO-GENERADO)
│   │   ├── client.ts                # ⚠️ NO MODIFICAR
│   │   └── types.ts                 # ⚠️ NO MODIFICAR
│   │
│   ├── lib/                         # Configuraciones y utilidades
│   │   ├── chartTheme.ts            # Tema de gráficos
│   │   ├── constants.ts             # Constantes globales
│   │   ├── oceanConfig.ts           # Config Pontus-X/Ocean
│   │   └── utils.ts                 # Utilidad cn() para clases
│   │
│   ├── pages/                       # 70+ páginas
│   │   ├── motor/                   # 13 páginas técnicas
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── AuditLogs.tsx
│   │   │   ├── ConectoresERP.tsx
│   │   │   ├── DocsInteractivos.tsx
│   │   │   ├── EdgeFunctions.tsx
│   │   │   ├── GobernanzaODRL.tsx
│   │   │   ├── IdentidadSSI.tsx
│   │   │   ├── ModeloIDSA.tsx
│   │   │   ├── MultiTenantRLS.tsx
│   │   │   ├── PagosEUROe.tsx
│   │   │   ├── SmartAlerts.tsx
│   │   │   ├── TourGuiado.tsx
│   │   │   └── WalletWeb3.tsx
│   │   │
│   │   ├── partners/                # Páginas partner ITBID
│   │   │   ├── ItbidCasosExito.tsx
│   │   │   ├── ItbidDocTecnico.tsx
│   │   │   ├── ItbidProyecto.tsx
│   │   │   └── ItbidWhitepaper.tsx
│   │   │
│   │   ├── AdminFeedback.tsx
│   │   ├── Architecture.tsx
│   │   ├── AuditLogs.tsx
│   │   ├── Auth.tsx                 # Página de autenticación
│   │   ├── BusinessModels.tsx
│   │   ├── CapacidadesEnterprise.tsx
│   │   ├── Catalog.tsx              # Catálogo marketplace
│   │   ├── Dashboard.tsx            # Dashboard principal
│   │   ├── Data.tsx
│   │   ├── DataView.tsx
│   │   ├── DocumentoExplicativo1-15.tsx  # 15 documentos
│   │   ├── ERPConfig.tsx
│   │   ├── Guide.tsx
│   │   ├── Index.tsx                # Landing principal
│   │   ├── InnovationLab.tsx
│   │   ├── InteractiveWhitepaper.tsx
│   │   ├── Landing.tsx
│   │   ├── NotFound.tsx
│   │   ├── Notifications.tsx
│   │   ├── Opportunities.tsx
│   │   ├── PartnerItbidLogin.tsx
│   │   ├── Partners.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Reports.tsx
│   │   ├── Requests.tsx
│   │   ├── RequestWizard.tsx
│   │   ├── SellerAnalytics.tsx
│   │   ├── ServiceDetail.tsx
│   │   ├── Services.tsx
│   │   ├── Settings.tsx
│   │   ├── SettingsNotifications.tsx
│   │   ├── SettingsOrganization.tsx
│   │   ├── SettingsPreferences.tsx
│   │   ├── SuccessStories.tsx
│   │   ├── SuccessStoryDetail.tsx
│   │   ├── Sustainability.tsx
│   │   ├── TechnicalDocs.tsx
│   │   ├── UseCases.tsx
│   │   ├── UserGuide.tsx
│   │   └── WebhookSettings.tsx
│   │
│   ├── services/                    # Servicios externos
│   │   └── pontusX.ts               # Cliente Pontus-X
│   │
│   ├── types/                       # Definiciones TypeScript
│   │   ├── database.extensions.ts
│   │   ├── pontus.types.ts
│   │   └── web3.types.ts
│   │
│   ├── utils/                       # Utilidades
│   │   ├── generateItbidDocTecnicoPDF.ts
│   │   ├── generateItbidProyectoPDF.ts
│   │   ├── generateTechnicalDocPDF.ts
│   │   ├── generateWhitepaperPDF.ts
│   │   ├── pdfGenerator.ts
│   │   └── purchaseStorage.ts
│   │
│   ├── App.css
│   ├── App.tsx                      # Router principal
│   ├── index.css                    # Variables CSS globales
│   ├── main.tsx                     # Entry point
│   └── vite-env.d.ts
│
├── supabase/
│   ├── functions/                   # 6 Edge Functions (Deno)
│   │   ├── chat-ai/
│   │   │   └── index.ts             # Cerebro ARIA (~800 líneas)
│   │   ├── erp-api-tester/
│   │   │   └── index.ts
│   │   ├── erp-data-uploader/
│   │   │   └── index.ts
│   │   ├── notification-handler/
│   │   │   └── index.ts
│   │   ├── send-demo-request/
│   │   │   └── index.ts
│   │   └── sync-to-github/
│   │       └── index.ts
│   │
│   ├── migrations/                  # 21 migraciones SQL
│   └── config.toml                  # ⚠️ NO MODIFICAR
│
├── docs/                            # Documentación
│   ├── ContextDocument.md
│   ├── DOCUMENTO_TECNICO.md
│   ├── TechnicalSpecification_v3.1.md
│   ├── ai_training_context.md
│   ├── casosexito_context.md        # Fuente de verdad para simuladores
│   ├── context_capacidades.md
│   ├── synthetic_data.md
│   └── synthetic_opportunities.md
│
├── entrenamientoIA/                 # Base de conocimiento ARIA
│   ├── 01_SYSTEM_INSTRUCTIONS.md
│   ├── 02_KNOWLEDGE_BASE.md
│   ├── 03_SERVICES_CATALOG.md
│   ├── 04_DATA_ARCHITECTURE.md
│   ├── 05_INTERACTIVE_WIDGETS.md
│   ├── 06_RESPONSE_RULES.md
│   ├── 07_CONSTANTS_REFERENCE.md
│   ├── 08_USER_INTERFACE_SUPPORT.md
│   ├── 09_DATA_GOVERNANCE_ODRL.md
│   ├── 10_ANALYTICS_BI_SYNTHETIC.md
│   ├── 11_TECHNICAL_INTEGRATION.md
│   ├── 12_RESILIENCE_GOVERNANCE.md
│   ├── 13_SECTOR_DEEP_DIVE.md
│   ├── 14_DEVELOPER_ARCHITECTURE.md
│   ├── 15_NLU_DIALOG_TRAINING.md
│   ├── 16_USER_STORIES_LIBRARY.md
│   ├── 17_GLOSSARY_DICTIONARY.md
│   └── README.md
│
├── scripts/                         # Scripts de setup
│   ├── seeds/                       # Seeds de datos demo
│   │   ├── 01_extend_orgs.sql
│   │   ├── 02_extend_wallets.sql
│   │   ├── 03_products_assets.sql
│   │   ├── 04_transactions.sql
│   │   └── 05_esg_services.sql
│   ├── insert-demo-transactions.sql
│   └── setup-demo-user.sql
│
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── .env                             # ⚠️ NO SUBIR A GIT
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── components.json                  # Config Shadcn
└── package.json
```

---

## 3. Esquema de Base de Datos

### 3.1 Diagrama ER (Simplificado)

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  organizations  │───────│  user_profiles  │───────│   user_roles    │
│  (29 campos)    │       │  (7 campos)     │       │  (5 campos)     │
└────────┬────────┘       └─────────────────┘       └─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    wallets      │       │  data_assets    │───────│  data_products  │
│  (8 campos)     │       │  (15 campos)    │       │  (8 campos)     │
└────────┬────────┘       └────────┬────────┘       └─────────────────┘
         │                         │
         │                         │ 1:N
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│wallet_transactions│     │data_transactions│───────│approval_history │
│  (10 campos)    │       │  (18 campos)    │       │  (7 campos)     │
└─────────────────┘       └────────┬────────┘       └─────────────────┘
                                   │
                                   │ 1:1
                                   ▼
                          ┌─────────────────┐
                          │  data_policies  │
                          │  (4 campos)     │
                          └─────────────────┘
```

### 3.2 Lista Completa de Tablas (29)

| # | Tabla | Campos Clave | RLS | Descripción |
|---|-------|--------------|-----|-------------|
| 1 | `organizations` | id, name, tax_id, type, sector, did, wallet_address, kyb_verified | ✅ | Empresas participantes |
| 2 | `user_profiles` | id, user_id, organization_id, full_name, position | ✅ | Perfiles de usuario |
| 3 | `user_roles` | id, user_id, organization_id, role | ✅ | Roles RBAC |
| 4 | `data_transactions` | id, consumer_org_id, subject_org_id, holder_org_id, asset_id, status, purpose | ✅ | Transacciones de datos |
| 5 | `data_assets` | id, product_id, holder_org_id, subject_org_id, price, status | ✅ | Activos de datos |
| 6 | `data_products` | id, name, description, category, schema_definition | ✅ | Catálogo de productos |
| 7 | `data_policies` | id, transaction_id, odrl_policy_json | ✅ | Contratos ODRL |
| 8 | `data_payloads` | id, transaction_id, schema_type, data_content | ✅ | Contenido transferido |
| 9 | `wallets` | id, organization_id, address, balance, currency | ✅ | Wallets EUROe |
| 10 | `wallet_transactions` | id, from_wallet_id, to_wallet_id, amount, status | ✅ | Historial pagos |
| 11 | `approval_history` | id, transaction_id, actor_org_id, action, notes | ✅ | Log aprobaciones |
| 12 | `supplier_data` | id, transaction_id, company_name, tax_id, fiscal_address | ✅ | Datos proveedor |
| 13 | `erp_configurations` | id, organization_id, config_type, endpoint_url, auth_method | ✅ | Config ERP |
| 14 | `export_logs` | id, organization_id, transaction_id, export_type, export_status | ✅ | Logs exportación |
| 15 | `esg_reports` | id, organization_id, report_year, scope1_total_tons | ✅ | Informes ESG |
| 16 | `notifications` | id, user_id, title, message, type, is_read | ✅ | Notificaciones |
| 17 | `webhooks` | id, organization_id, url, secret, events, is_active | ✅ | Webhooks |
| 18 | `audit_logs` | id, organization_id, action, actor_id, details | ✅ | Auditoría |
| 19 | `value_services` | id, name, description, category, price, features | ✅ | Servicios de valor |
| 20 | `success_stories` | id, company_name, sector, challenge, solution, metrics | ✅ | Casos de éxito |
| 21 | `innovation_lab_concepts` | id, title, category, maturity_level, chart_data | ✅ | Conceptos I+D |
| 22 | `ai_feedback` | id, user_id, user_question, bot_response, is_positive | ✅ | Feedback ARIA |
| 23 | `privacy_preferences` | id, user_id, email_notifications, profile_visible | ✅ | Preferencias |
| 24 | `login_attempts` | id, email, ip_address, success, attempted_at | ✅ | Intentos login |
| 25 | `catalog_metadata` | id, asset_id, categories, tags, visibility | ✅ | Metadatos catálogo |
| 26 | `organization_reviews` | id, target_org_id, reviewer_org_id, rating, comment | ✅ | Reviews |
| 27 | `transaction_messages` | id, transaction_id, sender_org_id, content | ✅ | Mensajes |
| 28 | `user_wishlist` | id, user_id, asset_id | ✅ | Lista deseos |
| 29 | `marketplace_opportunities` | id, consumer_org_id, title, category, budget_range | ✅ | Oportunidades |

### 3.3 Vista Materializada

| Vista | Descripción |
|-------|-------------|
| `marketplace_listings` | Combina assets, productos, organizaciones y reviews para el marketplace |

### 3.4 Enums Definidos

```sql
-- Roles de aplicación
CREATE TYPE app_role AS ENUM (
  'admin',           -- Control total
  'approver',        -- Puede aprobar transacciones
  'viewer',          -- Solo lectura
  'api_configurator' -- Configura integraciones
);

-- Estados de transacción
CREATE TYPE transaction_status AS ENUM (
  'initiated',       -- Solicitud creada
  'pending_subject', -- Esperando aprobación del sujeto
  'pending_holder',  -- Esperando aprobación del holder
  'approved',        -- Aprobada, pendiente de completar
  'denied_subject',  -- Rechazada por sujeto
  'denied_holder',   -- Rechazada por holder
  'completed',       -- Completada exitosamente
  'cancelled'        -- Cancelada
);

-- Tipos de organización
CREATE TYPE organization_type AS ENUM (
  'consumer',    -- Compra datos
  'provider',    -- Vende datos
  'data_holder'  -- Custodia datos de terceros
);

-- Acciones de aprobación
CREATE TYPE approval_action AS ENUM (
  'pre_approve', -- Pre-aprobación
  'approve',     -- Aprobación final
  'deny',        -- Denegación
  'cancel'       -- Cancelación
);

-- Métodos de autenticación ERP
CREATE TYPE auth_method AS ENUM (
  'bearer',   -- Token Bearer
  'api_key',  -- API Key
  'oauth',    -- OAuth 2.0
  'basic'     -- Basic Auth
);

-- Tipos de configuración ERP
CREATE TYPE erp_config_type AS ENUM (
  'download', -- Descarga desde ERP
  'upload'    -- Carga hacia ERP
);
```

### 3.5 Funciones de Base de Datos

```sql
-- Obtener organización del usuario actual
get_user_organization(_user_id uuid) RETURNS uuid
-- Uso: SELECT get_user_organization(auth.uid());

-- Verificar si usuario tiene un rol específico
has_role(_user_id uuid, _organization_id uuid, _role app_role) RETURNS boolean
-- Uso: SELECT has_role(auth.uid(), '...', 'admin');

-- Obtener KPIs de una organización
get_org_kpis(target_org_id uuid) RETURNS jsonb
-- Retorna: { approval_rate, avg_time_hours, compliance_percent, total_volume }

-- Listar transacciones pendientes del usuario
get_pending_transactions(_user_id uuid) RETURNS TABLE
-- Retorna: transaction_id, role_in_transaction, asset_name, consumer_name, status, etc.

-- Limpiar intentos de login antiguos (>30 días)
cleanup_old_login_attempts() RETURNS void
```

### 3.6 Flujo de Estados de Transacción

```
                    ┌──────────────────────────────────────────────────┐
                    │                                                  │
                    ▼                                                  │
┌──────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────┐     │
│ initiated │──▶│pending_subject│──▶│pending_holder│──▶│ approved │─────┤
└──────────┘   └──────┬───────┘   └──────┬───────┘   └────┬─────┘     │
                      │                   │                 │          │
                      ▼                   ▼                 ▼          │
               ┌──────────────┐   ┌──────────────┐   ┌───────────┐    │
               │denied_subject│   │denied_holder │   │ completed │    │
               └──────────────┘   └──────────────┘   └───────────┘    │
                                                                       │
                    ┌─────────────────┐                                │
                    │    cancelled    │◀───────────────────────────────┘
                    └─────────────────┘
```

---

## 4. Edge Functions (Backend)

### 4.1 chat-ai (Cerebro de ARIA)

**Ubicación**: `supabase/functions/chat-ai/index.ts`

**Propósito**: Procesa conversaciones con la IA ARIA, usando RAG con documentos internos.

**Secrets Requeridos**:
- `GOOGLE_AI_API_KEY` o modelo interno de Lovable

**Flujo**:
```
1. Recibe mensaje del usuario
2. Carga contexto desde docs/casosexito_context.md y entrenamientoIA/
3. Detecta intención (pregunta técnica, caso de uso, navegación)
4. Genera respuesta con Gemini 2.5/Flash
5. Retorna respuesta estructurada con posibles acciones
```

**Endpoint**: `POST /functions/v1/chat-ai`

**Payload**:
```json
{
  "message": "¿Cómo funciona la trazabilidad en Pontus-X?",
  "context": {
    "currentPage": "/success-stories",
    "userSector": "Agroalimentario"
  }
}
```

### 4.2 sync-to-github

**Ubicación**: `supabase/functions/sync-to-github/index.ts`

**Propósito**: Sincroniza correcciones validadas de ARIA al repositorio GitHub.

**Secrets Requeridos**:
- `GITHUB_PAT` - Personal Access Token
- `GITHUB_REPO_OWNER` - Propietario del repo
- `GITHUB_REPO_NAME` - Nombre del repo

**Flujo**:
```
1. Recibe feedback aprobado desde AdminFeedback
2. Genera contenido actualizado
3. Crea commit vía GitHub API
4. Actualiza estado del feedback
```

### 4.3 notification-handler

**Ubicación**: `supabase/functions/notification-handler/index.ts`

**Propósito**: Envía notificaciones por email usando Resend.

**Secrets Requeridos**:
- `RESEND_API_KEY`

### 4.4 erp-api-tester

**Ubicación**: `supabase/functions/erp-api-tester/index.ts`

**Propósito**: Prueba conectividad con endpoints ERP configurados.

### 4.5 erp-data-uploader

**Ubicación**: `supabase/functions/erp-data-uploader/index.ts`

**Propósito**: Carga datos desde/hacia sistemas ERP.

### 4.6 send-demo-request

**Ubicación**: `supabase/functions/send-demo-request/index.ts`

**Propósito**: Procesa solicitudes de demo del formulario público.

---

## 5. Sistema de Rutas

### 5.1 Rutas Públicas (Sin autenticación)

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `Index` | Landing page principal |
| `/landing` | `Landing` | Landing alternativa |
| `/auth` | `Auth` | Login/Registro |
| `/guide` | `Guide` | Guía introductoria |
| `/architecture` | `Architecture` | Diagrama de arquitectura |
| `/whitepaper` | `InteractiveWhitepaper` | Whitepaper interactivo |
| `/docs/tecnico` | `TechnicalDocs` | Documentación técnica |
| `/business-models` | `BusinessModels` | Modelos de negocio |
| `/use-cases` | `UseCases` | Casos de uso |
| `/docs/explicativo/:id` | `DocumentoExplicativo[1-15]` | 15 documentos |

### 5.2 Rutas Públicas con Demo Layout

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/catalog` | `Catalog` | Catálogo marketplace |
| `/catalog/:id` | `ProductDetail` | Detalle de producto |
| `/services` | `Services` | Catálogo de servicios |
| `/services/:id` | `ServiceDetail` | Detalle de servicio |
| `/success-stories` | `SuccessStories` | Casos de éxito |
| `/success-stories/:id` | `SuccessStoryDetail` | Detalle con simulador |
| `/innovation-lab` | `InnovationLab` | Laboratorio de innovación |
| `/sustainability` | `Sustainability` | Dashboard sostenibilidad |
| `/opportunities` | `Opportunities` | Oportunidades marketplace |

### 5.3 Rutas Protegidas (Requieren autenticación)

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/dashboard` | `Dashboard` | Panel principal |
| `/requests` | `Requests` | Gestión de solicitudes |
| `/request-wizard` | `RequestWizard` | Wizard nueva solicitud |
| `/data` | `Data` | Explorador de datos |
| `/data/:id` | `DataView` | Vista detallada |
| `/reports` | `Reports` | Informes |
| `/seller-analytics` | `SellerAnalytics` | Analytics vendedor |
| `/audit-logs` | `AuditLogs` | Logs de auditoría |
| `/notifications` | `Notifications` | Centro notificaciones |
| `/settings` | `Settings` | Configuración |
| `/settings/organization` | `SettingsOrganization` | Config organización |
| `/settings/preferences` | `SettingsPreferences` | Preferencias |
| `/settings/notifications` | `SettingsNotifications` | Config notificaciones |
| `/settings/webhooks` | `WebhookSettings` | Webhooks |
| `/erp-config` | `ERPConfig` | Configuración ERP |
| `/admin/feedback` | `AdminFeedback` | Admin feedback ARIA |
| `/user-guide` | `UserGuide` | Guía de usuario |
| `/enterprise` | `CapacidadesEnterprise` | Capacidades enterprise |

### 5.4 Rutas Motor Técnico

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/motor/wallet-web3` | `WalletWeb3` | Wallet Web3 |
| `/motor/identidad-ssi` | `IdentidadSSI` | Identidad SSI |
| `/motor/pagos-euroe` | `PagosEUROe` | Pagos EUROe |
| `/motor/modelo-idsa` | `ModeloIDSA` | Modelo IDSA |
| `/motor/gobernanza-odrl` | `GobernanzaODRL` | Gobernanza ODRL |
| `/motor/multi-tenant-rls` | `MultiTenantRLS` | Multi-tenant RLS |
| `/motor/conectores-erp` | `ConectoresERP` | Conectores ERP |
| `/motor/edge-functions` | `EdgeFunctions` | Edge Functions |
| `/motor/docs-interactivos` | `DocsInteractivos` | Docs interactivos |
| `/motor/activity-feed` | `ActivityFeed` | Feed actividad |
| `/motor/audit-logs` | `AuditLogs` | Logs auditoría |
| `/motor/smart-alerts` | `SmartAlerts` | Alertas inteligentes |
| `/motor/tour-guiado` | `TourGuiado` | Tour guiado |

### 5.5 Rutas Partner ITBID (Protegidas)

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/partners/itbid/proyecto` | `ItbidProyecto` | Documento proyecto |
| `/partners/itbid/doc-tecnico` | `ItbidDocTecnico` | Doc técnico |
| `/partners/itbid/whitepaper` | `ItbidWhitepaper` | Whitepaper |
| `/partners/itbid/casos-exito` | `ItbidCasosExito` | Casos de éxito |

---

## 6. Hooks Personalizados

### 6.1 useAuth

**Archivo**: `src/hooks/useAuth.tsx`

**Propósito**: Gestión centralizada de autenticación (Supabase + Web3).

**Exports**:
```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  walletAddress: string | null;
  did: string | null;
  isWeb3Connected: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  connectWallet: (silent?: boolean) => Promise<void>;
  disconnectWallet: () => void;
}
```

### 6.2 useWeb3Wallet

**Archivo**: `src/hooks/useWeb3Wallet.tsx`

**Propósito**: Gestión del estado de la wallet Web3.

**Exports**:
```typescript
interface WalletState {
  address: string | null;
  chainId: number | null;
  balance: string | null;
  did: string | null;
  isConnected: boolean;
}

function useWeb3Wallet(): {
  wallet: WalletState;
  isConnecting: boolean;
  hasWeb3: boolean;
  connect: (silent?: boolean) => Promise<void>;
  disconnect: () => void;
}
```

### 6.3 useOrganizationContext

**Archivo**: `src/hooks/useOrganizationContext.tsx`

**Propósito**: Contexto de organización actual del usuario.

### 6.4 useOrgSector

**Archivo**: `src/hooks/useOrgSector.tsx`

**Propósito**: Obtiene el sector de la organización.

### 6.5 usePurchaseAsset

**Archivo**: `src/hooks/usePurchaseAsset.tsx`

**Propósito**: Lógica de compra de activos de datos.

### 6.6 useConsumeAsset

**Archivo**: `src/hooks/useConsumeAsset.tsx`

**Propósito**: Lógica de consumo/descarga de datos.

### 6.7 useNotifications

**Archivo**: `src/hooks/useNotifications.tsx`

**Propósito**: Gestión del sistema de notificaciones.

### 6.8 usePrivacyPreferences

**Archivo**: `src/hooks/usePrivacyPreferences.tsx`

**Propósito**: Gestión de preferencias de privacidad.

---

## 7. Blueprint 2.0 de Simuladores

### 7.1 Arquitectura Visual

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     SIMULADOR PREMIUM v2.0                              │
│                     SuccessStoryDetail.tsx                              │
├────────────────────────────────────┬────────────────────────────────────┤
│   COLUMNA IZQUIERDA (7/12)         │   COLUMNA DERECHA (5/12)           │
│   ┌─────────────────────────────┐  │   ┌─────────────────────────────┐  │
│   │  Sliders Interactivos       │  │   │  Avatar ARIA (Bot-4)        │  │
│   │  - Input 1: [━━━━━━━○━━━━]  │  │   │  ┌─────┐                    │  │
│   │  - Input 2: [━━━○━━━━━━━━]  │  │   │  │ 🤖  │ "Analizando..."   │  │
│   │  - Input 3: [━━━━━━━━━━○━]  │  │   │  └─────┘                    │  │
│   └─────────────────────────────┘  │   └─────────────────────────────┘  │
│   ┌─────────────────────────────┐  │   ┌─────────────────────────────┐  │
│   │  Gráfico Recharts           │  │   │  Insights Dinámicos         │  │
│   │  BarChart/AreaChart         │  │   │  • Insight 1 basado en      │  │
│   │  Reactivo a sliders         │  │   │    valores actuales         │  │
│   │                             │  │   │  • Insight 2 calculado      │  │
│   │  ████████████               │  │   │  • Recomendación            │  │
│   │  ██████████                 │  │   │                             │  │
│   │  ████████                   │  │   └─────────────────────────────┘  │
│   └─────────────────────────────┘  │   ┌─────────────────────────────┐  │
│   ┌─────────────────────────────┐  │   │  CTA + Blockchain           │  │
│   │  Grid KPIs (2x2)            │  │   │  ┌─────────────────────┐    │  │
│   │  ┌───────┐ ┌───────┐       │  │   │  │ Solicitar Demo      │    │  │
│   │  │ €245K │ │ 34%   │       │  │   │  └─────────────────────┘    │  │
│   │  │Ahorro │ │Efic.  │       │  │   │  Hash: 0x7f3a...b2c1        │  │
│   │  └───────┘ └───────┘       │  │   │  ✓ Verificado Pontus-X      │  │
│   │  ┌───────┐ ┌───────┐       │  │   └─────────────────────────────┘  │
│   │  │ 1.2   │ │ 89%   │       │  │                                    │
│   │  │ FTEs  │ │Compli.│       │  │                                    │
│   │  └───────┘ └───────┘       │  │                                    │
│   └─────────────────────────────┘  │                                    │
├────────────────────────────────────┴────────────────────────────────────┤
│  Fondo Panel ARIA: #020617 (Negro Profundo) | Look Enterprise          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Lista de 47 Simuladores

| # | Simulador | Sector | Archivo |
|---|-----------|--------|---------|
| 1 | AeolusWindSimulator | Energía | `AeolusWindSimulator.tsx` |
| 2 | AluCycleSimulator | Materiales | `AluCycleSimulator.tsx` |
| 3 | AquaPowerNexusSimulator | Energía/Agua | `AquaPowerNexusSimulator.tsx` |
| 4 | AvocadoTrustSimulator | Agroalimentario | `AvocadoTrustSimulator.tsx` |
| 5 | AyuntamientoSimulator | Gobierno | `AyuntamientoSimulator.tsx` |
| 6 | BateriaHubSimulator | Automoción | `BateriaHubSimulator.tsx` |
| 7 | BatteryLifeSimulator | Automoción | `BatteryLifeSimulator.tsx` |
| 8 | BerryWaterSimulator | Agroalimentario | `BerryWaterSimulator.tsx` |
| 9 | BioCottonTraceSimulator | Textil | `BioCottonTraceSimulator.tsx` |
| 10 | BioHeatDistrictSimulator | Energía | `BioHeatDistrictSimulator.tsx` |
| 11 | BioMedSimulator | Salud | `BioMedSimulator.tsx` |
| 12 | CitrusCheckSimulator | Agroalimentario | `CitrusCheckSimulator.tsx` |
| 13 | DataCloudSecureSimulator | TIC | `DataCloudSecureSimulator.tsx` |
| 14 | EcoOrchestratorSimulator | Sostenibilidad | `EcoOrchestratorSimulator.tsx` |
| 15 | FastFashionSimulator | Textil | `FastFashionSimulator.tsx` |
| 16 | FiberLoopSimulator | Textil | `FiberLoopSimulator.tsx` |
| 17 | FleetCarbonZeroSimulator | Movilidad | `FleetCarbonZeroSimulator.tsx` |
| 18 | GigaFactorySimulator | Automoción | `GigaFactorySimulator.tsx` |
| 19 | GlobalBridgeSimulator | Comercio | `GlobalBridgeSimulator.tsx` |
| 20 | GovNetSimulator | Gobierno | `GovNetSimulator.tsx` |
| 21 | GreenFinanceESGSimulator | Finanzas | `GreenFinanceESGSimulator.tsx` |
| 22 | GreenGovCircularSimulator | Gobierno | `GreenGovCircularSimulator.tsx` |
| 23 | GreenhouseAISimulator | Agroalimentario | `GreenhouseAISimulator.tsx` |
| 24 | GridFlexSimulator | Energía | `GridFlexSimulator.tsx` |
| 25 | H2PureSimulator | Energía | `H2PureSimulator.tsx` |
| 26 | HeliosFieldsSimulator | Energía | `HeliosFieldsSimulator.tsx` |
| 27 | KYCSovereignSimulator | Finanzas | `KYCSovereignSimulator.tsx` |
| 28 | OliveOriginSimulator | Agroalimentario | `OliveOriginSimulator.tsx` |
| 29 | OliveTrustSimulator | Agroalimentario | `OliveTrustSimulator.tsx` |
| 30 | PharmaColdSimulator | Salud | `PharmaColdSimulator.tsx` |
| 31 | PoligonoEcoLinkSimulator | Industrial | `PoligonoEcoLinkSimulator.tsx` |
| 32 | PortBCNSimulator | Logística | `PortBCNSimulator.tsx` |
| 33 | ProducerTrustSimulator | Agroalimentario | `ProducerTrustSimulator.tsx` |
| 34 | PureLithiumSimulator | Materiales | `PureLithiumSimulator.tsx` |
| 35 | RareEarthRecoverSimulator | Materiales | `RareEarthRecoverSimulator.tsx` |
| 36 | RawMarketSimulator | Comercio | `RawMarketSimulator.tsx` |
| 37 | RiceSatelliteSimulator | Agroalimentario | `RiceSatelliteSimulator.tsx` |
| 38 | SmartChargeSimulator | Movilidad | `SmartChargeSimulator.tsx` |
| 39 | SocialHubSimulator | Social | `SocialHubSimulator.tsx` |
| 40 | TropicalFlashSimulator | Agroalimentario | `TropicalFlashSimulator.tsx` |
| 41 | TurbineChainSimulator | Energía | `TurbineChainSimulator.tsx` |
| 42 | UniSynthSimulator | Educación | `UniSynthSimulator.tsx` |
| 43 | UrbanDeliverSimulator | Movilidad | `UrbanDeliverSimulator.tsx` |
| 44 | UrbanHydroSimulator | Agua | `UrbanHydroSimulator.tsx` |
| 45 | UrbanMiningSimulator | Materiales | `UrbanMiningSimulator.tsx` |
| 46 | VinosDOSimulator | Agroalimentario | `VinosDOSimulator.tsx` |
| 47 | WasteToValueSimulator | Sostenibilidad | `WasteToValueSimulator.tsx` |

### 7.3 Componentes Auxiliares de Simuladores

| Componente | Propósito |
|------------|-----------|
| `ImpactSimulator` | Wrapper genérico con sliders y cálculos |
| `AriaDynamicReport` | Panel de insights con avatar ARIA |
| `BlockchainProofCard` | Card de verificación blockchain |
| `SuccessVisualRenderer` | Router de visualizaciones |
| `SectorSelector` | Selector de sector con iconos |

### 7.4 Paleta de Colores por Sector

```typescript
const SECTOR_COLORS = {
  'Agroalimentario': { primary: '#22c55e', gradient: 'from-green-500 to-emerald-600' },
  'Energía': { primary: '#f59e0b', gradient: 'from-amber-500 to-orange-600' },
  'Automoción': { primary: '#3b82f6', gradient: 'from-blue-500 to-indigo-600' },
  'Salud': { primary: '#ef4444', gradient: 'from-red-500 to-rose-600' },
  'Textil': { primary: '#8b5cf6', gradient: 'from-violet-500 to-purple-600' },
  'Gobierno': { primary: '#6366f1', gradient: 'from-indigo-500 to-blue-600' },
  'Finanzas': { primary: '#10b981', gradient: 'from-emerald-500 to-teal-600' },
  'Logística': { primary: '#06b6d4', gradient: 'from-cyan-500 to-blue-600' },
  'TIC': { primary: '#0ea5e9', gradient: 'from-sky-500 to-blue-600' },
  'Materiales': { primary: '#64748b', gradient: 'from-slate-500 to-gray-600' },
  'Movilidad': { primary: '#14b8a6', gradient: 'from-teal-500 to-cyan-600' },
  'Industrial': { primary: '#78716c', gradient: 'from-stone-500 to-gray-600' }
};
```

---

## 8. Configuración Web3/Pontus-X

### 8.1 Configuración de Red

**Archivo**: `src/lib/oceanConfig.ts`

```typescript
export const PONTUSX_NETWORK_CONFIG = {
  chainId: 32460,
  chainName: 'Pontus-X Testnet',
  rpcUrls: ['https://rpc.2040.pontus-x.eu'],
  blockExplorerUrls: ['https://explorer.2040.pontus-x.eu'],
  nativeCurrency: {
    name: 'EUROe',
    symbol: 'EUROe',
    decimals: 18
  }
};

export const AQUARIUS_URL = 'https://aquarius.pontus-x.eu';
export const PROVIDER_URL = 'https://provider.pontus-x.eu';
```

### 8.2 Servicios Web3

**Archivo**: `src/services/pontusX.ts`

```typescript
// Funciones principales
fetchDDO(did: string): Promise<DDO>
searchAssets(query: string): Promise<Asset[]>
verifyTransaction(txHash: string): Promise<boolean>
```

### 8.3 Tipos Web3

**Archivo**: `src/types/web3.types.ts`

```typescript
interface WalletState {
  address: string | null;
  chainId: number | null;
  balance: string | null;
  did: string | null;
  isConnected: boolean;
}

interface DDO {
  id: string;
  metadata: {
    name: string;
    description: string;
    author: string;
  };
  services: Service[];
}
```

---

## 9. Sistema de Diseño

### 9.1 Variables CSS (index.css)

```css
:root {
  /* Colores base */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  
  /* Colores primarios */
  --primary: 199 89% 48%;        /* Sky-500 */
  --primary-foreground: 210 40% 98%;
  
  /* Colores secundarios */
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  /* Colores de estado */
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  
  /* Semánticos */
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 199 89% 48%;
  
  /* Sidebar */
  --sidebar-background: 0 0% 98%;
  --sidebar-foreground: 240 5.3% 26.1%;
  --sidebar-primary: 199 89% 48%;
  --sidebar-accent: 240 4.8% 95.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --primary: 199 89% 48%;
  --secondary: 217.2 32.6% 17.5%;
  /* ... resto de variables dark */
}
```

### 9.2 Clases de Utilidad Personalizadas

```css
/* Gradiente del logo (legacy) */
.procuredata-gradient {
  background: linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Sombra enterprise */
.shadow-enterprise {
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.02),
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 16px 32px rgba(0, 0, 0, 0.06);
}

/* Glow para modo oscuro */
.dark .glow-primary {
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.2);
}
```

### 9.3 Configuración Tailwind

**Archivo**: `tailwind.config.ts`

```typescript
export default {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // ... resto de colores semánticos
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          accent: 'hsl(var(--sidebar-accent))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': { /* ... */ },
        'accordion-up': { /* ... */ }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  }
}
```

---

## 10. Variables de Entorno

### 10.1 Variables Requeridas

```env
# Supabase (AUTO-GENERADAS por Lovable Cloud)
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIs...
VITE_SUPABASE_PROJECT_ID=[project-id]
```

### 10.2 Variables Opcionales

```env
# Pontus-X / Web3
VITE_PONTUS_NETWORK_ID=32460
VITE_AQUARIUS_URL=https://aquarius.pontus-x.eu
VITE_PROVIDER_URL=https://provider.pontus-x.eu
VITE_NODE_URI=https://rpc.2040.pontus-x.eu
```

### 10.3 Secrets de Edge Functions

| Secret | Propósito | Requerido |
|--------|-----------|-----------|
| `SUPABASE_SERVICE_ROLE_KEY` | Admin access a DB | ✅ Auto |
| `SUPABASE_DB_URL` | Conexión directa | ✅ Auto |
| `RESEND_API_KEY` | Envío de emails | ⚠️ Manual |
| `GITHUB_PAT` | Sync a GitHub | ⚠️ Manual |
| `GITHUB_REPO_OWNER` | Owner del repo | ⚠️ Manual |
| `GITHUB_REPO_NAME` | Nombre del repo | ⚠️ Manual |
| `LOVABLE_API_KEY` | API Lovable | ✅ Auto |

---

## 11. Guía de Instalación

### 11.1 Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0 o Bun
- Git
- Supabase CLI (opcional para desarrollo local)
- Deno (para Edge Functions locales)

### 11.2 Instalación Paso a Paso

```bash
# 1. Clonar el repositorio
git clone https://github.com/[owner]/procuredata.git
cd procuredata

# 2. Instalar dependencias
npm install
# o
bun install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con las credenciales de Supabase

# 4. (Opcional) Instalar Supabase CLI
npm install -g supabase

# 5. (Opcional) Iniciar Supabase local
supabase start

# 6. (Opcional) Ejecutar migraciones locales
supabase db push

# 7. Iniciar servidor de desarrollo
npm run dev
# o
bun dev

# La aplicación estará disponible en http://localhost:5173
```

### 11.3 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm run lint` | Ejecuta ESLint |
| `supabase start` | Inicia Supabase local |
| `supabase db push` | Aplica migraciones |
| `supabase functions serve` | Sirve Edge Functions |

### 11.4 Estructura de .env.example

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id

# Pontus-X Configuration (Optional)
VITE_PONTUS_NETWORK_ID=32460
VITE_AQUARIUS_URL=https://aquarius.pontus-x.eu
```

---

## 12. Instrucciones para IA del IDE

### 12.1 Contexto del Proyecto

```markdown
Eres el asistente de desarrollo de PROCUREDATA, un Espacio de Datos Soberano 
para la Función de Compras. El proyecto está desarrollado con React 18, 
TypeScript, Tailwind CSS, y Supabase como backend.

REGLAS CRÍTICAS:
1. NO modifiques archivos auto-generados:
   - src/integrations/supabase/client.ts
   - src/integrations/supabase/types.ts
   - supabase/config.toml
   - .env

2. Respeta el Blueprint 2.0 para simuladores:
   - Layout de 2 columnas (7/12 + 5/12)
   - Panel ARIA siempre con fondo #020617
   - Sliders reactivos a gráficos Recharts

3. Usa siempre variables CSS semánticas:
   - `bg-background` en lugar de `bg-white`
   - `text-foreground` en lugar de `text-gray-900`
   - `border-border` en lugar de `border-gray-200`

4. Consulta la documentación antes de modificar:
   - docs/casosexito_context.md → Lógica de simuladores
   - entrenamientoIA/*.md → Base de conocimiento ARIA
   - MIGRATION_GUIDE.md → Arquitectura general
```

### 12.2 Patrones de Código Preferidos

```typescript
// ✅ Correcto: Usar hook useAuth
import { useAuth } from '@/hooks/useAuth';
const { user, session } = useAuth();

// ❌ Incorrecto: Acceso directo a Supabase Auth
const { data: { user } } = await supabase.auth.getUser();

// ✅ Correcto: Usar variables semánticas
<div className="bg-background text-foreground border-border">

// ❌ Incorrecto: Colores hardcodeados
<div className="bg-white text-gray-900 border-gray-200">

// ✅ Correcto: Importar tipos desde supabase
import type { Database } from '@/integrations/supabase/types';
type Organization = Database['public']['Tables']['organizations']['Row'];

// ✅ Correcto: Usar componentes UI de Shadcn
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
```

### 12.3 Debugging Tips

```typescript
// Verificar estado de autenticación
console.log('User:', useAuth().user);
console.log('Session:', useAuth().session);

// Verificar RLS policies
const { data, error } = await supabase
  .from('organizations')
  .select('*');
if (error) console.error('RLS Error:', error.message);

// Verificar conexión Web3
const { wallet, hasWeb3 } = useWeb3Wallet();
console.log('Web3 Available:', hasWeb3);
console.log('Wallet Connected:', wallet.isConnected);
```

---

## 13. Troubleshooting

### 13.1 Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `RLS policy violation` | Usuario no tiene permisos | Verificar autenticación y roles |
| `Network request failed` | Variables de entorno incorrectas | Revisar `.env` |
| `Component not found` | Import incorrecto | Usar alias `@/` |
| `Type error on supabase` | Types desactualizados | Regenerar con `supabase gen types` |
| `Web3 not available` | Sin wallet instalada | Instalar MetaMask |

### 13.2 Verificación de Configuración

```bash
# Verificar Supabase
curl https://[project-id].supabase.co/rest/v1/ \
  -H "apikey: [anon-key]"

# Verificar Edge Functions
curl https://[project-id].supabase.co/functions/v1/chat-ai \
  -H "Authorization: Bearer [anon-key]" \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'

# Verificar Pontus-X RPC
curl https://rpc.2040.pontus-x.eu \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

### 13.3 Logs Útiles

```typescript
// Habilitar logs de Supabase
import { supabase } from '@/integrations/supabase/client';
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth Event:', event, session);
});

// Logs de React Query
import { QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: console.error,
  },
});
```

---

## 14. Referencias

### 14.1 Documentación Oficial

| Recurso | URL |
|---------|-----|
| React | https://react.dev |
| TypeScript | https://www.typescriptlang.org/docs |
| Vite | https://vitejs.dev/guide |
| Tailwind CSS | https://tailwindcss.com/docs |
| Shadcn/UI | https://ui.shadcn.com |
| Supabase | https://supabase.com/docs |
| TanStack Query | https://tanstack.com/query |
| Recharts | https://recharts.org |
| Framer Motion | https://www.framer.com/motion |
| ethers.js | https://docs.ethers.org/v6 |

### 14.2 Documentación del Proyecto

| Documento | Ubicación |
|-----------|-----------|
| Arquitectura | `ARCHITECTURE.md` |
| Auditoría | `SYSTEM_AUDIT_REPORT.md` |
| Edge Functions | `EDGE_FUNCTIONS.md` |
| Modo Demo | `DEMO_MODE.md` |
| Contexto Técnico | `docs/TechnicalSpecification_v3.1.md` |
| Casos de Éxito | `docs/casosexito_context.md` |
| Base ARIA | `entrenamientoIA/README.md` |

### 14.3 Servicios Externos

| Servicio | Propósito | Docs |
|----------|-----------|------|
| Pontus-X | Red blockchain Gaia-X | https://pontus-x.eu |
| Aquarius | Metadatos de activos | https://aquarius.pontus-x.eu |
| Resend | Envío de emails | https://resend.com/docs |
| Google AI | Gemini API | https://ai.google.dev |

---

## 📝 Changelog

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 2.0 | 2026-01-10 | Documento inicial completo |

---

## ✅ Checklist de Migración

- [ ] Clonar repositorio
- [ ] Instalar dependencias (`npm install`)
- [ ] Configurar `.env` con credenciales Supabase
- [ ] Verificar conexión a base de datos
- [ ] Ejecutar `npm run dev`
- [ ] Verificar rutas públicas funcionan
- [ ] Probar autenticación
- [ ] Verificar Edge Functions (si aplica)
- [ ] Probar conexión Web3 (si aplica)
- [ ] Revisar simuladores Blueprint 2.0
- [ ] Verificar modo oscuro/claro

---

**Documento generado para el equipo de desarrollo de PROCUREDATA**  
*Financiado por NextGenerationEU*
