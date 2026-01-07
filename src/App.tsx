import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { OrganizationProvider } from "@/hooks/useOrganizationContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppLayout } from "@/components/AppLayout";
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
              
              {/* Protected routes with AppLayout */}
              <Route element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/product/:id" element={<ProductDetail />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/requests/new" element={<RequestWizard />} />
                <Route path="/data" element={<Data />} />
                <Route path="/data/view/:id" element={<DataView />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/innovation" element={<InnovationLab />} />
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
