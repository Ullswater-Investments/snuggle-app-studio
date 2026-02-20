import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { OrganizationSwitcher } from "@/components/OrganizationSwitcher";
import { DemoTour } from "@/components/DemoTour";

import { AppSidebar } from "@/components/AppSidebar";
import { AIConcierge } from "@/components/AIConcierge";
import { CommandMenu } from "@/components/CommandMenu";
import { NotificationsBell } from "@/components/NotificationsBell";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { useState } from "react";

export const AppLayout = () => {
  const { t } = useTranslation('common');
  const { user, signOut } = useAuth();
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DemoTour />
        <CommandMenu />
        <AppSidebar />

        <div className="flex-1 flex flex-col w-full">
          <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-4">
              <SidebarTrigger />
              <ProcuredataLogo size="md" showNavigation={true} variant="text" />

              <div className="ml-auto flex items-center gap-2">
                {/* Command Palette Trigger */}
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                    document.dispatchEvent(event);
                  }}
                >
                  <Search className="h-4 w-4" />
                  <span className="text-xs">{t('searchPlaceholder')}</span>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>

                <div data-tour="org-switcher">
                  <OrganizationSwitcher />
                </div>
                <NotificationsBell />
                <LanguageSwitcher />
                <ThemeToggle />
                
                <Button variant="outline" size="sm" onClick={signOut}>
                  {t('logout')}
                </Button>
              </div>
            </div>
          </header>

          

          <main className="flex-1">
            <Outlet />
          </main>
        </div>

        {/* AI Concierge - Asistente Virtual Flotante */}
        <AIConcierge />
      </div>
    </SidebarProvider>
  );
};