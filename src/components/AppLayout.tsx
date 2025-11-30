import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { OrganizationSwitcher } from "@/components/OrganizationSwitcher";
import { DemoBanner } from "@/components/DemoBanner";
import { DemoTour } from "@/components/DemoTour";
import { DemoHelpButton } from "@/components/DemoHelpButton";
import { WalletButton } from "@/components/WalletButton";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const AppLayout = () => {
  const { user, signOut } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DemoTour />
        <AppSidebar />
        
        <div className="flex-1 flex flex-col w-full">
          <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold">
                <span className="procuredata-gradient">PROCUREDATA</span>
              </h1>
              
              <div className="ml-auto flex items-center gap-4">
                <div data-tour="org-switcher">
                  <OrganizationSwitcher />
                </div>
                <WalletButton />
                <DemoHelpButton />
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user?.email}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </header>

          <DemoBanner />

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};