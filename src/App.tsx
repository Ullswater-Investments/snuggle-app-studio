import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { OrganizationProvider } from "@/hooks/useOrganizationContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Requests from "./pages/Requests";
import RequestWizard from "./pages/RequestWizard";
import Data from "./pages/Data";
import DataView from "./pages/DataView";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import ERPConfig from "./pages/ERPConfig";
import SettingsOrganization from "./pages/SettingsOrganization";
import SettingsPreferences from "./pages/SettingsPreferences";
import Services from "./pages/Services";
import Sustainability from "./pages/Sustainability";
import InnovationLab from "./pages/InnovationLab";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <OrganizationProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
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
                <Route path="/innovation" element={<InnovationLab />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/erp-config" element={<ERPConfig />} />
                <Route path="/settings/organization" element={<SettingsOrganization />} />
                <Route path="/settings/preferences" element={<SettingsPreferences />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </OrganizationProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
