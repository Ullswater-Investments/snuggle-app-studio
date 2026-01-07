import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { PublicDemoBanner } from "@/components/PublicDemoBanner";
import { AppSidebar } from "@/components/AppSidebar";
import { AIConcierge } from "@/components/AIConcierge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogIn, Home } from "lucide-react";

interface PublicDemoLayoutProps {
  children?: React.ReactNode;
}

export const PublicDemoLayout = ({ children }: PublicDemoLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col w-full">
          <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-4">
              <SidebarTrigger />
              <Link to="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
                <span className="procuredata-gradient">PROCUREDATA</span>
              </Link>
              
              <div className="ml-auto flex items-center gap-2">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">Inicio</span>
                  </Button>
                </Link>
                <ThemeToggle />
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          <PublicDemoBanner />

          <main className="flex-1">
            {children || <Outlet />}
          </main>
        </div>

        {/* AI Concierge - Disponible en modo demo */}
        <AIConcierge />
      </div>
    </SidebarProvider>
  );
};
