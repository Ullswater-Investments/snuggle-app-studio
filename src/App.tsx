import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import InteractiveWhitepaper from "./pages/InteractiveWhitepaper";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
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
            <Route path="/guide" element={<Guide />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/whitepaper" element={<InteractiveWhitepaper />} />
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
            
            {/* Motor de ProcureData - Technical Deep Dives */}
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
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/innovation" element={<InnovationLab />} />
            </Route>
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
  </ErrorBoundary>
);

export default App;
