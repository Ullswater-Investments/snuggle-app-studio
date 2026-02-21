import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { UnifiedHeader } from "@/components/layout/UnifiedHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MaintenanceBanner } from "@/components/MaintenanceBanner";

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col w-full">
          <UnifiedHeader />
          <MaintenanceBanner />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
