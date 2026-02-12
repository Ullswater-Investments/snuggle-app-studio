import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { TokenWalletProvider } from "@/contexts/TokenWalletContext";
import { AuthProvider } from "@/hooks/useAuth";
import { OrganizationProvider } from "@/hooks/useOrganizationContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppLayout } from "@/components/AppLayout";
import { PublicDemoLayout } from "@/components/PublicDemoLayout";
import { ScrollToTop } from "@/components/ScrollToTop";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Guide from "./pages/Guide";
import Dashboard from "./pages/Dashboard";
import Architecture from "./pages/Architecture";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Requests from "./pages/Requests";
import RequestWizard from "./pages/RequestWizard";
import Data from "./pages/Data";
import DataView from "./pages/DataView";
import Reports from "./pages/Reports";
import SellerAnalytics from "./pages/SellerAnalytics";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import ERPConfig from "./pages/ERPConfig";
import SettingsOrganization from "./pages/SettingsOrganization";
import SettingsPreferences from "./pages/SettingsPreferences";
import SettingsNotifications from "./pages/SettingsNotifications";
import WebhookSettings from "./pages/WebhookSettings";
import AuditLogs from "./pages/AuditLogs";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Sustainability from "./pages/Sustainability";
import InnovationLab from "./pages/InnovationLab";
import Opportunities from "./pages/Opportunities";
import SuccessStories from "./pages/SuccessStories";
import SuccessStoryDetail from "./pages/SuccessStoryDetail";
import Whitepaper from "./pages/Whitepaper";
import TechnicalDocs from "./pages/TechnicalDocs";
import BusinessModels from "./pages/BusinessModels";
import UseCases from "./pages/UseCases";
import AdminFeedback from "./pages/AdminFeedback";
import UserGuide from "./pages/UserGuide";
import DocumentoExplicativo1 from "./pages/DocumentoExplicativo1";
import DocumentoExplicativo2 from "./pages/DocumentoExplicativo2";
import DocumentoExplicativo3 from "./pages/DocumentoExplicativo3";
import DocumentoExplicativo4 from "./pages/DocumentoExplicativo4";
import DocumentoExplicativo5 from "./pages/DocumentoExplicativo5";
import DocumentoExplicativo6 from "./pages/DocumentoExplicativo6";
import DocumentoExplicativo7 from "./pages/DocumentoExplicativo7";
import DocumentoExplicativo8 from "./pages/DocumentoExplicativo8";
import DocumentoExplicativo9 from "./pages/DocumentoExplicativo9";
import DocumentoExplicativo10 from "./pages/DocumentoExplicativo10";
import DocumentoExplicativo11 from "./pages/DocumentoExplicativo11";
import DocumentoExplicativo12 from "./pages/DocumentoExplicativo12";
import DocumentoExplicativo13 from "./pages/DocumentoExplicativo13";
import DocumentoExplicativo14 from "./pages/DocumentoExplicativo14";
import DocumentoExplicativo15 from "./pages/DocumentoExplicativo15";
import CapacidadesEnterprise from "./pages/CapacidadesEnterprise";
import WalletWeb3 from "./pages/motor/WalletWeb3";
import IdentidadSSI from "./pages/motor/IdentidadSSI";
import PagosEUROe from "./pages/motor/PagosEUROe";
import MotorActivityFeed from "./pages/motor/ActivityFeed";
import SmartAlerts from "./pages/motor/SmartAlerts";
import GobernanzaODRL from "./pages/motor/GobernanzaODRL";
import MultiTenantRLS from "./pages/motor/MultiTenantRLS";
import MotorAuditLogs from "./pages/motor/AuditLogs";
import ModeloIDSA from "./pages/motor/ModeloIDSA";
import ConectoresERP from "./pages/motor/ConectoresERP";
import EdgeFunctions from "./pages/motor/EdgeFunctions";
import TourGuiado from "./pages/motor/TourGuiado";
import DocsInteractivos from "./pages/motor/DocsInteractivos";
import Partners from "./pages/Partners";
import PremiumPartners from "./pages/PremiumPartners";
import Register from "./pages/Register";
import PremiumPartnerPage from "./pages/partners/PremiumPartnerPage";
import TelemetriaFlotaDetail from "./pages/catalog/TelemetriaFlotaDetail";
import ConsumoElectricoDetail from "./pages/catalog/ConsumoElectricoDetail";
import HistoricoMeteorologicoDetail from "./pages/catalog/HistoricoMeteorologicoDetail";
import TrazabilidadAceiteDetail from "./pages/catalog/TrazabilidadAceiteDetail";
import ScoreCrediticioDetail from "./pages/catalog/ScoreCrediticioDetail";
import HuellaHidricaDetail from "./pages/catalog/HuellaHidricaDetail";
import ResilienciaSupplyChainDetail from "./pages/catalog/ResilienciaSupplyChainDetail";
import HuellaCarbonAutomotrizDetail from "./pages/catalog/HuellaCarbonAutomotrizDetail";
import CapacidadProductivaDetail from "./pages/catalog/CapacidadProductivaDetail";
import BenchmarkingPreciosDetail from "./pages/catalog/BenchmarkingPreciosDetail";
import TelemetriaIAAutomotrizDetail from "./pages/catalog/TelemetriaIAAutomotrizDetail";
import CertificacionesAeronauticasDetail from "./pages/catalog/CertificacionesAeronauticasDetail";
import CombustiblesSAFDetail from "./pages/catalog/CombustiblesSAFDetail";
import DisponibilidadMRODetail from "./pages/catalog/DisponibilidadMRODetail";
import PreciosAleacionesDetail from "./pages/catalog/PreciosAleacionesDetail";
import ToleranciaTérmicaDetail from "./pages/catalog/ToleranciaTérmicaDetail";
import ProveedoresPremiumDetail from "./pages/catalog/ProveedoresPremiumDetail";
import EnergiaLimpiaMotorValleyDetail from "./pages/catalog/EnergiaLimpiaMotorValleyDetail";
import ProduccionArtesanalDetail from "./pages/catalog/ProduccionArtesanalDetail";
import PreciosComponentesSuperdeportivosDetail from "./pages/catalog/PreciosComponentesSuperdeportivosDetail";
import TelemetriaAltoDesempenoDetail from "./pages/catalog/TelemetriaAltoDesempenoDetail";
import CertificacionesSemiconductoresDetail from "./pages/catalog/CertificacionesSemiconductoresDetail";
import ImpactoAmbientalChipsDetail from "./pages/catalog/ImpactoAmbientalChipsDetail";
import CapacidadSalaLimpiaDetail from "./pages/catalog/CapacidadSalaLimpiaDetail";
import PreciosComponentesElectronicosDetail from "./pages/catalog/PreciosComponentesElectronicosDetail";
import CaracterizacionNanomaterialesDetail from "./pages/catalog/CaracterizacionNanomaterialesDetail";
import MadurezDigitalTICDetail from "./pages/catalog/MadurezDigitalTICDetail";
import EconomiaCircularTICDetail from "./pages/catalog/EconomiaCircularTICDetail";
import CapacidadDesarrolloSoftwareDetail from "./pages/catalog/CapacidadDesarrolloSoftwareDetail";
import ScoringFinancieroDigitalDetail from "./pages/catalog/ScoringFinancieroDigitalDetail";
import OperadoresRedEnergeticaDetail from "./pages/catalog/OperadoresRedEnergeticaDetail";
import MixEnergeticoAlemaniaDetail from "./pages/catalog/MixEnergeticoAlemaniaDetail";
import FlexibilidadEnergeticaDetail from "./pages/catalog/FlexibilidadEnergeticaDetail";
import PreciosMayoristasEnergiaDetail from "./pages/catalog/PreciosMayoristasEnergiaDetail";
import SmartGridContadoresDetail from "./pages/catalog/SmartGridContadoresDetail";
import EmpresasTecnologicasBelgasDetail from "./pages/catalog/EmpresasTecnologicasBelgasDetail";
// Green Procurement Detail Pages
import FactoresEmisionDetail from "./pages/catalog/green-procurement/FactoresEmisionDetail";
import IntensidadCarbonoRedDetail from "./pages/catalog/green-procurement/IntensidadCarbonoRedDetail";
import EmisionesLogisticasDetail from "./pages/catalog/green-procurement/EmisionesLogisticasDetail";
import EmisionesScope3CloudDetail from "./pages/catalog/green-procurement/EmisionesScope3CloudDetail";
import PreciosMaterialesRecicladosDetail from "./pages/catalog/green-procurement/PreciosMaterialesRecicladosDetail";
import InventarioBioplasticosDetail from "./pages/catalog/green-procurement/InventarioBioplasticosDetail";
import RiesgoHidricoDetail from "./pages/catalog/green-procurement/RiesgoHidricoDetail";
import MineralesConflictoDetail from "./pages/catalog/green-procurement/MineralesConflictoDetail";
import RegistroEcolabelsDetail from "./pages/catalog/green-procurement/RegistroEcolabelsDetail";
import SustanciasReachRohsDetail from "./pages/catalog/green-procurement/SustanciasReachRohsDetail";
import DeforestacionEudrDetail from "./pages/catalog/green-procurement/DeforestacionEudrDetail";
import EpdConstruccionDetail from "./pages/catalog/green-procurement/EpdConstruccionDetail";
import ScoringEsgDetail from "./pages/catalog/green-procurement/ScoringEsgDetail";
import ViolacionesLaboralesDetail from "./pages/catalog/green-procurement/ViolacionesLaboralesDetail";
import IndiceReparabilidadDetail from "./pages/catalog/green-procurement/IndiceReparabilidadDetail";
import DiversidadProveedoresDetail from "./pages/catalog/green-procurement/DiversidadProveedoresDetail";
import GarantiasOrigenDetail from "./pages/catalog/green-procurement/GarantiasOrigenDetail";
import TcoVehiculosDetail from "./pages/catalog/green-procurement/TcoVehiculosDetail";
import CreditosCarbonoDetail from "./pages/catalog/green-procurement/CreditosCarbonoDetail";
import EficienciaMaquinariaDetail from "./pages/catalog/green-procurement/EficienciaMaquinariaDetail";
// Partner Product Detail Pages - GAIA
import TelemetriaIotDetail from "./pages/catalog/partners/gaia/TelemetriaIotDetail";
// Partner Product Detail Pages - FEIQUE
import CumplimientoReachDetail from "./pages/catalog/partners/feique/CumplimientoReachDetail";
import HuellaQuimicaDetail from "./pages/catalog/partners/feique/HuellaQuimicaDetail";
import CapacidadQuimicaDetail from "./pages/catalog/partners/feique/CapacidadQuimicaDetail";
import PreciosQuimicosDetail from "./pages/catalog/partners/feique/PreciosQuimicosDetail";
import AnalisisLaboratorioDetail from "./pages/catalog/partners/feique/AnalisisLaboratorioDetail";
// Partner Product Detail Pages - Agoria
import SostenibilidadIndustrialDetail from "./pages/catalog/partners/agoria/SostenibilidadIndustrialDetail";
import IntegracionRoboticaDetail from "./pages/catalog/partners/agoria/IntegracionRoboticaDetail";
import PreciosAutomatizacionDetail from "./pages/catalog/partners/agoria/PreciosAutomatizacionDetail";
import TelemetriaCobotDetail from "./pages/catalog/partners/agoria/TelemetriaCobotDetail";
// Partner Product Detail Pages - ANFIA
import ProveedoresAutomotricesItalianosDet from "./pages/catalog/partners/anfia/ProveedoresAutomotricesItalianosDet";
import TransicionEvItaliaDetail from "./pages/catalog/partners/anfia/TransicionEvItaliaDetail";
import EstampacionFundicionDetail from "./pages/catalog/partners/anfia/EstampacionFundicionDetail";
import PreciosRecambiosDetail from "./pages/catalog/partners/anfia/PreciosRecambiosDetail";
import EnsayosSeguridadDetail from "./pages/catalog/partners/anfia/EnsayosSeguridadDetail";
// Partner Product Detail Pages - FNSEA
import ExplotacionesAgricolasDetail from "./pages/catalog/partners/fnsea/ExplotacionesAgricolasDetail";
import SostenibilidadAgricolaDetail from "./pages/catalog/partners/fnsea/SostenibilidadAgricolaDetail";
import CapacidadCosechaDetail from "./pages/catalog/partners/fnsea/CapacidadCosechaDetail";
import PreciosCommoditiesDetail from "./pages/catalog/partners/fnsea/PreciosCommoditiesDetail";
import AgriculturaPrecisionDetail from "./pages/catalog/partners/fnsea/AgriculturaPrecisionDetail";
// Partner Product Detail Pages - NEVI
import ProfesionalesComprasDetail from "./pages/catalog/partners/nevi/ProfesionalesComprasDetail";
import ComprasSosteniblesDetail from "./pages/catalog/partners/nevi/ComprasSosteniblesDetail";
import ProveedoresPrecualificadosDetail from "./pages/catalog/partners/nevi/ProveedoresPrecualificadosDetail";
import AnalisisGastoDetail from "./pages/catalog/partners/nevi/AnalisisGastoDetail";
import RiesgoSupplyChainDetail from "./pages/catalog/partners/nevi/RiesgoSupplyChainDetail";
// Partner Product Detail Pages - AIP
import DirectorioIndustrialDetail from "./pages/catalog/partners/aip/DirectorioIndustrialDetail";
import SostenibilidadPortugalDetail from "./pages/catalog/partners/aip/SostenibilidadPortugalDetail";
import FabricacionSubcontratacionDetail from "./pages/catalog/partners/aip/FabricacionSubcontratacionDetail";
import CostesIndustrialesDetail from "./pages/catalog/partners/aip/CostesIndustrialesDetail";
import FabricacionMoldesDetail from "./pages/catalog/partners/aip/FabricacionMoldesDetail";
// Partner Product Detail Pages - Food Valley
import EmpresasAgroalimentariasDetail from "./pages/catalog/partners/food-valley/EmpresasAgroalimentariasDetail";
import NutricionSostenibleDetail from "./pages/catalog/partners/food-valley/NutricionSostenibleDetail";
import ProcesamientoAlimentarioDetail from "./pages/catalog/partners/food-valley/ProcesamientoAlimentarioDetail";
import PreciosIngredientesDetail from "./pages/catalog/partners/food-valley/PreciosIngredientesDetail";
import AnalisisSensorialDetail from "./pages/catalog/partners/food-valley/AnalisisSensorialDetail";
// Partner Product Detail Pages - BioWin
import EmpresasBiotechDetail from "./pages/catalog/partners/biowin/EmpresasBiotechDetail";
import SostenibilidadFarmaDetail from "./pages/catalog/partners/biowin/SostenibilidadFarmaDetail";
import EnsayosClinicosDetail from "./pages/catalog/partners/biowin/EnsayosClinicosDetail";
import PreciosApiDetail from "./pages/catalog/partners/biowin/PreciosApiDetail";
import GenomicaBiomarcadoresDetail from "./pages/catalog/partners/biowin/GenomicaBiomarcadoresDetail";
import PartnerItbidLogin from "./pages/PartnerItbidLogin";
import DynamicPartnerLogin from "./pages/DynamicPartnerLogin";
import ItbidProyecto from "./pages/partners/ItbidProyecto";
import ItbidCasosExito from "./pages/partners/ItbidCasosExito";
import ItbidWhitepaper from "./pages/partners/ItbidWhitepaper";
import ItbidDocTecnico from "./pages/partners/ItbidDocTecnico";
import ItbidProtectedRoute from "./components/ItbidProtectedRoute";
import TeleNaturaProyecto from "./pages/partners/TeleNaturaProyecto";
import TeleNaturaPresentacion from "./pages/partners/TeleNaturaPresentacion";
import TeleNaturaCatalogo from "./pages/partners/TeleNaturaCatalogo";
import TeleNaturaAcuerdo from "./pages/partners/TeleNaturaAcuerdo";
import TeleNaturaMiembros from "./pages/partners/TeleNaturaMiembros";
import TeleNaturaDocTecnico from "./pages/partners/TeleNaturaDocTecnico";
import TeleNaturaWhitepaper from "./pages/partners/TeleNaturaWhitepaper";
import AerceProyecto from "./pages/partners/AerceProyecto";
import AerceMiembros from "./pages/partners/AerceMiembros";
import AerceDocInstitucional from "./pages/partners/AerceDocInstitucional";
import AerceWhitepaper from "./pages/partners/AerceWhitepaper";
import AerceDocTecnico from "./pages/partners/AerceDocTecnico";
import AraceaProyecto from "./pages/partners/AraceaProyecto";
import AraceaMiembros from "./pages/partners/AraceaMiembros";
import CloserStillProyecto from "./pages/partners/CloserStillProyecto";
import CloserStillLogin from "./pages/partners/CloserStillLogin";
import CloserStillMiembros from "./pages/partners/CloserStillMiembros";
import CloserStill365 from "./pages/partners/CloserStill365";
import CloserStillCasosUso from "./pages/partners/CloserStillCasosUso";
import CloserStillInnovation from "./pages/partners/CloserStillInnovation";
import CloserStillPioneer from "./pages/partners/CloserStillPioneer";
import CloserStillPrismaticos from "./pages/partners/CloserStillPrismaticos";
import CloserStillUseCaseDetail from "./pages/partners/CloserStillUseCaseDetail";
import { PartnerProtectedRoute } from "./components/partners/PartnerProtectedRoute";
import ValerdataMiembros from "./pages/partners/ValerdataMiembros";
import ValerdataProyecto from "./pages/partners/ValerdataProyecto";
import SeresProyecto from "./pages/partners/SeresProyecto";
import SeresLogin from "./pages/partners/SeresLogin";
import SeresMiembros from "./pages/partners/SeresMiembros";
import SeresExploracion from "./pages/partners/SeresExploracion";
import SeresArquitectura from "./pages/partners/SeresArquitectura";
import SeresFuncionalidades from "./pages/partners/SeresFuncionalidades";
import SeresCasosUso from "./pages/partners/SeresCasosUso";
import SeresMonetizacion from "./pages/partners/SeresMonetizacion";
import SeresRoadmap from "./pages/partners/SeresRoadmap";
// CDI Agro
import CdiAgroLogin from "./pages/partners/CdiAgroLogin";
import CdiAgroMiembros from "./pages/partners/CdiAgroMiembros";
import CdiAgroProyecto from "./pages/partners/CdiAgroProyecto";
// SERES Case Study Detail Pages
import SeresNestle from "./pages/partners/seres/casos/SeresNestle";
import SeresCovirán from "./pages/partners/seres/casos/SeresCovirán";
import SeresIlunion from "./pages/partners/seres/casos/SeresIlunion";
import SeresSiemensGamesa from "./pages/partners/seres/casos/SeresSiemensGamesa";
import SeresAmadeus from "./pages/partners/seres/casos/SeresAmadeus";
import SeresBT from "./pages/partners/seres/casos/SeresBT";
import TokenWallet from "./pages/TokenWallet";
import Fundamentos from "./pages/Fundamentos";
import CatalogoDatos from "./pages/CatalogoDatos";
import Flujo3Actores from "./pages/Flujo3Actores";
import PoliticasOdrl from "./pages/PoliticasOdrl";
import Web3Dids from "./pages/Web3Dids";
import IAConversacional from "./pages/IAConversacional";
import ConectoresErpPage from "./pages/ConectoresErp";
import RedGaiaX from "./pages/RedGaiaX";
import NotFound from "./pages/NotFound";
import KitEspacioDatos from "./pages/KitEspacioDatos";
import ContratoAdhesion from "./pages/ContratoAdhesion";
import SectoralNodesPage from "./pages/SectoralNodesPage";
import MarketplacePage from "./pages/nodos/MarketplacePage";
import OdrlPage from "./pages/nodos/OdrlPage";
import MonetizacionPage from "./pages/nodos/MonetizacionPage";
import MarcaBlancaPage from "./pages/nodos/MarcaBlancaPage";
import IdentidadDIDPage from "./pages/nodos/IdentidadDIDPage";
import SmartContractsPage from "./pages/nodos/SmartContractsPage";
import PagosEUROePage from "./pages/nodos/PagosEUROePage";
import ConectoresERPPage from "./pages/nodos/ConectoresERPPage";
import GobernanzaIDSAPage from "./pages/nodos/GobernanzaIDSAPage";
import MultiTenantRLSPage from "./pages/nodos/MultiTenantRLSPage";
import NodeRequirementsPage from "./pages/nodos/NodeRequirementsPage";
import NodeTechPage from "./pages/nodos/NodeTechPage";
import AgileProcurementPrivateArea from "./pages/AgileProcurementPrivateArea";
import AgileProcurementLogin from "./pages/AgileProcurementLogin";
import AgileProcurementProtectedRoute from "./components/AgileProcurementProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <TokenWalletProvider>
            <AuthProvider>
              <OrganizationProvider>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/guide" element={<Guide />} />
                  <Route path="/architecture" element={<Architecture />} />
                  <Route path="/whitepaper" element={<Whitepaper />} />
                  <Route path="/docs/tecnico" element={<TechnicalDocs />} />
                  <Route path="/models" element={<BusinessModels />} />
                  <Route path="/use-cases" element={<UseCases />} />
                  <Route path="/user-guide" element={<UserGuide />} />
                  <Route path="/documento-explicativo-1" element={<DocumentoExplicativo1 />} />
                  <Route path="/documento-explicativo-2" element={<DocumentoExplicativo2 />} />
                  <Route path="/documento-explicativo-3" element={<DocumentoExplicativo3 />} />
                  <Route path="/documento-explicativo-4" element={<DocumentoExplicativo4 />} />
                  <Route path="/documento-explicativo-5" element={<DocumentoExplicativo5 />} />
                  <Route path="/documento-explicativo-6" element={<DocumentoExplicativo6 />} />
                  <Route path="/documento-explicativo-7" element={<DocumentoExplicativo7 />} />
                  <Route path="/documento-explicativo-8" element={<DocumentoExplicativo8 />} />
                  <Route path="/documento-explicativo-9" element={<DocumentoExplicativo9 />} />
                  <Route path="/documento-explicativo-10" element={<DocumentoExplicativo10 />} />
                  <Route path="/documento-explicativo-11" element={<DocumentoExplicativo11 />} />
                  <Route path="/documento-explicativo-12" element={<DocumentoExplicativo12 />} />
                  <Route path="/documento-explicativo-13" element={<DocumentoExplicativo13 />} />
                  <Route path="/documento-explicativo-14" element={<DocumentoExplicativo14 />} />
                  <Route path="/documento-explicativo-15" element={<DocumentoExplicativo15 />} />
                  <Route path="/capacidades-enterprise" element={<CapacidadesEnterprise />} />
                  <Route path="/kit-espacio-datos" element={<KitEspacioDatos />} />
                  <Route path="/contrato-adhesion" element={<ContratoAdhesion />} />
                  <Route path="/token-wallet" element={<TokenWallet />} />
                  <Route path="/fundamentos" element={<Fundamentos />} />
                  <Route path="/catalogo-datos" element={<CatalogoDatos />} />
                  <Route path="/flujo-3-actores" element={<Flujo3Actores />} />
                  <Route path="/politicas-odrl" element={<PoliticasOdrl />} />
                  <Route path="/web3-dids" element={<Web3Dids />} />
                  <Route path="/ia-conversacional" element={<IAConversacional />} />
                  <Route path="/conectores-erp" element={<ConectoresErpPage />} />
                  <Route path="/red-gaia-x" element={<RedGaiaX />} />
                  <Route path="/nodos-sectoriales" element={<SectoralNodesPage />} />
                  <Route path="/nodos/marketplace" element={<MarketplacePage />} />
                  <Route path="/nodos/odrl" element={<OdrlPage />} />
                  <Route path="/nodos/monetizacion" element={<MonetizacionPage />} />
                  <Route path="/nodos/marca-blanca" element={<MarcaBlancaPage />} />
                  <Route path="/nodos/identidad-did" element={<IdentidadDIDPage />} />
                  <Route path="/nodos/smart-contracts" element={<SmartContractsPage />} />
                  <Route path="/nodos/pagos-euroe" element={<PagosEUROePage />} />
                  <Route path="/nodos/conectores-erp" element={<ConectoresERPPage />} />
                  <Route path="/nodos/gobernanza-idsa" element={<GobernanzaIDSAPage />} />
                  <Route path="/nodos/multi-tenant-rls" element={<MultiTenantRLSPage />} />
                  <Route path="/nodos/requisitos" element={<NodeRequirementsPage />} />
                  <Route path="/nodos/tecnologia" element={<NodeTechPage />} />
                  <Route path="/agile-procurement/login" element={<AgileProcurementLogin />} />
                  <Route path="/agile-procurement" element={
                    <AgileProcurementProtectedRoute>
                      <AgileProcurementPrivateArea />
                    </AgileProcurementProtectedRoute>
                  } />
                  
                  {/* Motor de ProcureData - Technical Deep Dives */}
                  <Route path="/motor" element={<Navigate to="/models" replace />} />
                  <Route path="/motor/wallet-web3" element={<WalletWeb3 />} />
                  <Route path="/motor/identidad-ssi" element={<IdentidadSSI />} />
                  <Route path="/motor/pagos-euroe" element={<PagosEUROe />} />
                  <Route path="/motor/activity-feed" element={<MotorActivityFeed />} />
                  <Route path="/motor/smart-alerts" element={<SmartAlerts />} />
                  <Route path="/motor/gobernanza-odrl" element={<GobernanzaODRL />} />
                  <Route path="/motor/multi-tenant-rls" element={<MultiTenantRLS />} />
                  <Route path="/motor/audit-logs" element={<MotorAuditLogs />} />
                  <Route path="/motor/modelo-idsa" element={<ModeloIDSA />} />
                  <Route path="/motor/conectores-erp" element={<ConectoresERP />} />
                  <Route path="/motor/edge-functions" element={<EdgeFunctions />} />
                  <Route path="/motor/tour-guiado" element={<TourGuiado />} />
                  <Route path="/motor/docs-interactivos" element={<DocsInteractivos />} />

                  {/* Public Demo Routes - Accessible without authentication */}
                  <Route element={<PublicDemoLayout />}>
                    <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/telemetria-flota" element={<TelemetriaFlotaDetail />} />
            <Route path="/catalog/consumo-electrico-industrial" element={<ConsumoElectricoDetail />} />
            <Route path="/catalog/historico-meteorologico" element={<HistoricoMeteorologicoDetail />} />
            <Route path="/catalog/trazabilidad-aceite-oliva" element={<TrazabilidadAceiteDetail />} />
            <Route path="/catalog/score-crediticio-b2b" element={<ScoreCrediticioDetail />} />
            <Route path="/catalog/huella-hidrica-agricola" element={<HuellaHidricaDetail />} />
            <Route path="/catalog/resiliencia-supply-chain" element={<ResilienciaSupplyChainDetail />} />
            <Route path="/catalog/huella-carbono-automotriz" element={<HuellaCarbonAutomotrizDetail />} />
            <Route path="/catalog/capacidad-productiva-automotriz" element={<CapacidadProductivaDetail />} />
            <Route path="/catalog/benchmarking-precios-componentes" element={<BenchmarkingPreciosDetail />} />
            <Route path="/catalog/telemetria-ia-automotriz" element={<TelemetriaIAAutomotrizDetail />} />
            <Route path="/catalog/certificaciones-aeronauticas" element={<CertificacionesAeronauticasDetail />} />
            <Route path="/catalog/combustibles-saf-aviacion" element={<CombustiblesSAFDetail />} />
            <Route path="/catalog/disponibilidad-mro-aeronautico" element={<DisponibilidadMRODetail />} />
            <Route path="/catalog/precios-aleaciones-aeronauticas" element={<PreciosAleacionesDetail />} />
            <Route path="/catalog/tolerancia-termica-aleaciones" element={<ToleranciaTérmicaDetail />} />
            <Route path="/catalog/proveedores-premium-automotrices" element={<ProveedoresPremiumDetail />} />
            <Route path="/catalog/energia-limpia-motor-valley" element={<EnergiaLimpiaMotorValleyDetail />} />
            <Route path="/catalog/produccion-artesanal-automotriz" element={<ProduccionArtesanalDetail />} />
            <Route path="/catalog/precios-componentes-superdeportivos" element={<PreciosComponentesSuperdeportivosDetail />} />
            <Route path="/catalog/telemetria-alto-desempeno" element={<TelemetriaAltoDesempenoDetail />} />
            <Route path="/catalog/certificaciones-semiconductores" element={<CertificacionesSemiconductoresDetail />} />
            <Route path="/catalog/impacto-ambiental-chips" element={<ImpactoAmbientalChipsDetail />} />
            <Route path="/catalog/capacidad-sala-limpia" element={<CapacidadSalaLimpiaDetail />} />
            <Route path="/catalog/precios-componentes-electronicos" element={<PreciosComponentesElectronicosDetail />} />
            <Route path="/catalog/caracterizacion-nanomateriales" element={<CaracterizacionNanomaterialesDetail />} />
            <Route path="/catalog/madurez-digital-tic" element={<MadurezDigitalTICDetail />} />
            <Route path="/catalog/economia-circular-tic" element={<EconomiaCircularTICDetail />} />
            <Route path="/catalog/capacidad-desarrollo-software" element={<CapacidadDesarrolloSoftwareDetail />} />
            <Route path="/catalog/scoring-financiero-digital" element={<ScoringFinancieroDigitalDetail />} />
            <Route path="/catalog/operadores-red-energetica" element={<OperadoresRedEnergeticaDetail />} />
            <Route path="/catalog/mix-energetico-alemania" element={<MixEnergeticoAlemaniaDetail />} />
            <Route path="/catalog/flexibilidad-energetica" element={<FlexibilidadEnergeticaDetail />} />
            <Route path="/catalog/precios-mayoristas-energia" element={<PreciosMayoristasEnergiaDetail />} />
            <Route path="/catalog/smart-grid-contadores" element={<SmartGridContadoresDetail />} />
            <Route path="/catalog/empresas-tecnologicas-belgas" element={<EmpresasTecnologicasBelgasDetail />} />
            {/* Green Procurement Catalog Routes */}
            <Route path="/catalog/factores-emision-materiales" element={<FactoresEmisionDetail />} />
            <Route path="/catalog/intensidad-carbono-red" element={<IntensidadCarbonoRedDetail />} />
            <Route path="/catalog/emisiones-logisticas-modal" element={<EmisionesLogisticasDetail />} />
            <Route path="/catalog/emisiones-scope3-cloud" element={<EmisionesScope3CloudDetail />} />
            <Route path="/catalog/precios-materiales-reciclados" element={<PreciosMaterialesRecicladosDetail />} />
            <Route path="/catalog/inventario-bioplasticos" element={<InventarioBioplasticosDetail />} />
            <Route path="/catalog/riesgo-hidrico-proveedores" element={<RiesgoHidricoDetail />} />
            <Route path="/catalog/minerales-conflicto-3tg" element={<MineralesConflictoDetail />} />
            <Route path="/catalog/registro-ecolabels" element={<RegistroEcolabelsDetail />} />
            <Route path="/catalog/sustancias-reach-rohs" element={<SustanciasReachRohsDetail />} />
            <Route path="/catalog/deforestacion-eudr" element={<DeforestacionEudrDetail />} />
            <Route path="/catalog/epd-construccion" element={<EpdConstruccionDetail />} />
            <Route path="/catalog/scoring-esg-proveedores" element={<ScoringEsgDetail />} />
            <Route path="/catalog/violaciones-laborales" element={<ViolacionesLaboralesDetail />} />
            <Route path="/catalog/indice-reparabilidad" element={<IndiceReparabilidadDetail />} />
            <Route path="/catalog/diversidad-proveedores" element={<DiversidadProveedoresDetail />} />
            <Route path="/catalog/garantias-origen-renovable" element={<GarantiasOrigenDetail />} />
            <Route path="/catalog/tco-vehiculos-ev-ice" element={<TcoVehiculosDetail />} />
            <Route path="/catalog/creditos-carbono-voluntarios" element={<CreditosCarbonoDetail />} />
            <Route path="/catalog/eficiencia-maquinaria-industrial" element={<EficienciaMaquinariaDetail />} />
            {/* Partner Product Detail Routes - GAIA */}
            <Route path="/catalog/telemetria-industrial-iot" element={<TelemetriaIotDetail />} />
            {/* Partner Product Detail Routes - FEIQUE */}
            <Route path="/catalog/cumplimiento-reach-clp" element={<CumplimientoReachDetail />} />
            <Route path="/catalog/huella-ambiental-quimica" element={<HuellaQuimicaDetail />} />
            <Route path="/catalog/capacidad-produccion-quimica" element={<CapacidadQuimicaDetail />} />
            <Route path="/catalog/precios-productos-quimicos" element={<PreciosQuimicosDetail />} />
            <Route path="/catalog/analisis-laboratorio-quimico" element={<AnalisisLaboratorioDetail />} />
            {/* Partner Product Detail Routes - Agoria */}
            <Route path="/catalog/sostenibilidad-industria-belga" element={<SostenibilidadIndustrialDetail />} />
            <Route path="/catalog/integracion-robotica" element={<IntegracionRoboticaDetail />} />
            <Route path="/catalog/precios-automatizacion" element={<PreciosAutomatizacionDetail />} />
            <Route path="/catalog/telemetria-cobots" element={<TelemetriaCobotDetail />} />
            {/* Partner Product Detail Routes - ANFIA */}
            <Route path="/catalog/proveedores-automotrices-italianos" element={<ProveedoresAutomotricesItalianosDet />} />
            <Route path="/catalog/transicion-ev-italia" element={<TransicionEvItaliaDetail />} />
            <Route path="/catalog/estampacion-fundicion" element={<EstampacionFundicionDetail />} />
            <Route path="/catalog/precios-recambios-automotrices" element={<PreciosRecambiosDetail />} />
            <Route path="/catalog/ensayos-seguridad-vehicular" element={<EnsayosSeguridadDetail />} />
            {/* Partner Product Detail Routes - FNSEA */}
            <Route path="/catalog/explotaciones-agricolas-francesas" element={<ExplotacionesAgricolasDetail />} />
            <Route path="/catalog/sostenibilidad-agricola" element={<SostenibilidadAgricolaDetail />} />
            <Route path="/catalog/capacidad-cosecha" element={<CapacidadCosechaDetail />} />
            <Route path="/catalog/precios-commodities-agricolas" element={<PreciosCommoditiesDetail />} />
            <Route path="/catalog/agricultura-precision" element={<AgriculturaPrecisionDetail />} />
            {/* Partner Product Detail Routes - NEVI */}
            <Route path="/catalog/profesionales-compras" element={<ProfesionalesComprasDetail />} />
            <Route path="/catalog/compras-sostenibles" element={<ComprasSosteniblesDetail />} />
            <Route path="/catalog/proveedores-precualificados" element={<ProveedoresPrecualificadosDetail />} />
            <Route path="/catalog/analisis-gasto-categoria" element={<AnalisisGastoDetail />} />
            <Route path="/catalog/riesgo-supply-chain" element={<RiesgoSupplyChainDetail />} />
            {/* Partner Product Detail Routes - AIP */}
            <Route path="/catalog/directorio-industrial-portugues" element={<DirectorioIndustrialDetail />} />
            <Route path="/catalog/sostenibilidad-portugal" element={<SostenibilidadPortugalDetail />} />
            <Route path="/catalog/fabricacion-subcontratacion" element={<FabricacionSubcontratacionDetail />} />
            <Route path="/catalog/costes-industriales-portugal" element={<CostesIndustrialesDetail />} />
            <Route path="/catalog/fabricacion-moldes" element={<FabricacionMoldesDetail />} />
            {/* Partner Product Detail Routes - Food Valley */}
            <Route path="/catalog/empresas-agroalimentarias" element={<EmpresasAgroalimentariasDetail />} />
            <Route path="/catalog/nutricion-sostenible" element={<NutricionSostenibleDetail />} />
            <Route path="/catalog/procesamiento-alimentario" element={<ProcesamientoAlimentarioDetail />} />
            <Route path="/catalog/precios-ingredientes" element={<PreciosIngredientesDetail />} />
            <Route path="/catalog/analisis-sensorial" element={<AnalisisSensorialDetail />} />
            {/* Partner Product Detail Routes - BioWin */}
            <Route path="/catalog/empresas-biotecnologicas" element={<EmpresasBiotechDetail />} />
            <Route path="/catalog/sostenibilidad-farmaceutica" element={<SostenibilidadFarmaDetail />} />
            <Route path="/catalog/ensayos-clinicos" element={<EnsayosClinicosDetail />} />
            <Route path="/catalog/precios-apis-farmaceuticos" element={<PreciosApiDetail />} />
            <Route path="/catalog/genomica-biomarcadores" element={<GenomicaBiomarcadoresDetail />} />
                    <Route path="/sustainability" element={<Sustainability />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:id" element={<ServiceDetail />} />
                    <Route path="/innovation" element={<InnovationLab />} />
                    <Route path="/success-stories" element={<SuccessStories />} />
                    <Route path="/success-stories/:id" element={<SuccessStoryDetail />} />
                    <Route path="/partners" element={<Partners />} />
                  </Route>
                  
                  {/* Premium Partners */}
                  <Route path="/partners/premium" element={<PremiumPartners />} />
                  <Route path="/partners/premium/:partnerId" element={<PremiumPartnerPage />} />

                  {/* Partner Pages - Dynamic route */}
                  <Route path="/partners/:partnerSlug/login" element={<DynamicPartnerLogin />} />
                  
                  {/* Partner Pages - ITBID specific */}
                  <Route path="/partners/itbid" element={<PartnerItbidLogin />} />
                  <Route path="/partners/itbid/proyecto" element={<ItbidProtectedRoute><ItbidProyecto /></ItbidProtectedRoute>} />
                  <Route path="/partners/itbid/casos-exito" element={<ItbidProtectedRoute><ItbidCasosExito /></ItbidProtectedRoute>} />
                  <Route path="/partners/itbid/whitepaper" element={<ItbidProtectedRoute><ItbidWhitepaper /></ItbidProtectedRoute>} />
                  <Route path="/partners/itbid/doc-tecnico" element={<ItbidProtectedRoute><ItbidDocTecnico /></ItbidProtectedRoute>} />

                  {/* Partner Pages - TeleNatura EBT specific */}
                  <Route path="/partners/telenatura-ebt/miembros" element={
                    <PartnerProtectedRoute partnerSlug="telenatura-ebt">
                      <TeleNaturaMiembros />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/telenatura-ebt/proyecto" element={
                    <PartnerProtectedRoute partnerSlug="telenatura-ebt">
                      <TeleNaturaProyecto />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/telenatura-ebt/doc-tecnico" element={
                    <PartnerProtectedRoute partnerSlug="telenatura-ebt">
                      <TeleNaturaDocTecnico />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/telenatura-ebt/whitepaper" element={
                    <PartnerProtectedRoute partnerSlug="telenatura-ebt">
                      <TeleNaturaWhitepaper />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/telenatura-ebt/presentacion" element={
                    <PartnerProtectedRoute partnerSlug="telenatura-ebt">
                      <TeleNaturaPresentacion />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/telenatura-ebt/catalogo" element={
                    <PartnerProtectedRoute partnerSlug="telenatura-ebt">
                      <TeleNaturaCatalogo />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/telenatura-ebt/acuerdo" element={
                    <PartnerProtectedRoute partnerSlug="telenatura-ebt">
                      <TeleNaturaAcuerdo />
                    </PartnerProtectedRoute>
                  } />

                  {/* Partner Pages - AERCE */}
                  <Route path="/partners/aerce/proyecto" element={<AerceProyecto />} />
                  <Route path="/partners/aerce/miembros" element={
                    <PartnerProtectedRoute partnerSlug="aerce">
                      <AerceMiembros />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/aerce/doc-tecnico" element={
                    <PartnerProtectedRoute partnerSlug="aerce">
                      <AerceDocTecnico />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/aerce/doc-institucional" element={
                    <Navigate to="/partners/aerce/doc-tecnico" replace />
                  } />
                  <Route path="/partners/aerce/whitepaper" element={
                    <PartnerProtectedRoute partnerSlug="aerce">
                      <AerceWhitepaper />
                    </PartnerProtectedRoute>
                  } />

                  {/* Partner Pages - ARACEA */}
                  <Route path="/partners/aracea/proyecto" element={<AraceaProyecto />} />
                  <Route path="/partners/aracea/miembros" element={
                    <PartnerProtectedRoute partnerSlug="aracea">
                      <AraceaMiembros />
                    </PartnerProtectedRoute>
                  } />

                  {/* Partner Pages - VALERDATA */}
                  <Route path="/partners/valerdata/proyecto" element={<ValerdataProyecto />} />
                  <Route path="/partners/valerdata/miembros" element={
                    <PartnerProtectedRoute partnerSlug="valerdata">
                      <ValerdataMiembros />
                    </PartnerProtectedRoute>
                  } />

                  {/* Partner Pages - SERES */}
                  <Route path="/partners/seres" element={<SeresLogin />} />
                  <Route path="/partners/seres/proyecto" element={<SeresProyecto />} />
                  <Route path="/partners/seres/miembros" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresMiembros />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/exploracion" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresExploracion />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/arquitectura" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresArquitectura />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/funcionalidades" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresFuncionalidades />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/casos-uso" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresCasosUso />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/casos-uso/nestle" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresNestle />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/casos-uso/coviran" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresCovirán />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/casos-uso/ilunion" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresIlunion />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/casos-uso/siemens-gamesa" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresSiemensGamesa />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/casos-uso/amadeus" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresAmadeus />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/casos-uso/bt" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresBT />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/monetizacion" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresMonetizacion />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/seres/miembros/roadmap" element={
                    <PartnerProtectedRoute partnerSlug="seres">
                      <SeresRoadmap />
                    </PartnerProtectedRoute>
                  } />

                  {/* Partner Pages - CDI Agro */}
                  <Route path="/partners/cdi-agro" element={<CdiAgroLogin />} />
                  <Route path="/partners/cdi-agro/login" element={<CdiAgroLogin />} />
                  <Route path="/partners/cdi-agro/proyecto" element={<CdiAgroProyecto />} />
                  <Route path="/partners/cdi-agro/miembros" element={
                    <PartnerProtectedRoute partnerSlug="cdi-agro">
                      <CdiAgroMiembros />
                    </PartnerProtectedRoute>
                  } />

                  {/* Partner Pages - CloserStill Media */}
                  <Route path="/partners/closerstill" element={<CloserStillLogin />} />
                  <Route path="/partners/closerstill/proyecto" element={<CloserStillProyecto />} />
                  <Route path="/partners/closerstill/miembros" element={
                    <PartnerProtectedRoute partnerSlug="closerstill">
                      <CloserStillMiembros />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/closerstill/miembros/365" element={
                    <PartnerProtectedRoute partnerSlug="closerstill">
                      <CloserStill365 />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/closerstill/miembros/casos-uso" element={
                    <PartnerProtectedRoute partnerSlug="closerstill">
                      <CloserStillCasosUso />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/closerstill/miembros/innovacion" element={
                    <PartnerProtectedRoute partnerSlug="closerstill">
                      <CloserStillInnovation />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/closerstill/miembros/innovacion/:caseId" element={
                    <PartnerProtectedRoute partnerSlug="closerstill">
                      <CloserStillUseCaseDetail />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/closerstill/miembros/pioneer" element={
                    <PartnerProtectedRoute partnerSlug="closerstill">
                      <CloserStillPioneer />
                    </PartnerProtectedRoute>
                  } />
                  <Route path="/partners/closerstill/miembros/prismaticos" element={
                    <PartnerProtectedRoute partnerSlug="closerstill">
                      <CloserStillPrismaticos />
                    </PartnerProtectedRoute>
                  } />

                  {/* Protected routes with AppLayout */}
                  <Route element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/catalog/product/:id" element={<ProductDetail />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/requests/new" element={<RequestWizard />} />
                    <Route path="/data" element={<Data />} />
                    <Route path="/data/view/:id" element={<DataView />} />
                    <Route path="/opportunities" element={<Opportunities />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/analytics" element={<SellerAnalytics />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/settings/erp-config" element={<ERPConfig />} />
                    <Route path="/settings/organization" element={<SettingsOrganization />} />
                    <Route path="/settings/preferences" element={<SettingsPreferences />} />
                    <Route path="/settings/notifications" element={<SettingsNotifications />} />
                    <Route path="/settings/webhooks" element={<WebhookSettings />} />
                    <Route path="/settings/audit" element={<AuditLogs />} />
                    <Route path="/admin/feedback" element={<AdminFeedback />} />
                  </Route>
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </OrganizationProvider>
            </AuthProvider>
            </TokenWalletProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
