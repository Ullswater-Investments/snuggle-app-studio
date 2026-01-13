import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
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
import PartnerItbidLogin from "./pages/PartnerItbidLogin";
import ItbidProyecto from "./pages/partners/ItbidProyecto";
import ItbidCasosExito from "./pages/partners/ItbidCasosExito";
import ItbidWhitepaper from "./pages/partners/ItbidWhitepaper";
import ItbidDocTecnico from "./pages/partners/ItbidDocTecnico";
import ItbidProtectedRoute from "./components/ItbidProtectedRoute";
import NotFound from "./pages/NotFound";
import KitEspacioDatos from "./pages/KitEspacioDatos";

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

                  {/* Partner Pages */}
                  <Route path="/partners/itbid" element={<PartnerItbidLogin />} />
                  <Route path="/partners/itbid/proyecto" element={<ItbidProtectedRoute><ItbidProyecto /></ItbidProtectedRoute>} />
                  <Route path="/partners/itbid/casos-exito" element={<ItbidProtectedRoute><ItbidCasosExito /></ItbidProtectedRoute>} />
                  <Route path="/partners/itbid/whitepaper" element={<ItbidProtectedRoute><ItbidWhitepaper /></ItbidProtectedRoute>} />
                  <Route path="/partners/itbid/doc-tecnico" element={<ItbidProtectedRoute><ItbidDocTecnico /></ItbidProtectedRoute>} />

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
          </BrowserRouter>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
