import { Outlet } from "react-router-dom";
import { DemoTour } from "@/components/DemoTour";
import { AppSidebar } from "@/components/AppSidebar";
import { AIConcierge } from "@/components/AIConcierge";
import { CommandMenu } from "@/components/CommandMenu";
import { UnifiedHeader } from "@/components/layout/UnifiedHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MaintenanceBanner } from "@/components/MaintenanceBanner";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DemoTour />
        <CommandMenu />
        <AppSidebar />

        <div className="flex-1 flex flex-col w-full">
          <UnifiedHeader />
          <MaintenanceBanner />

          <main className="flex-1">
            <Outlet />
          </main>
        </div>

        <AIConcierge />
      </div>
    </SidebarProvider>
  );
};