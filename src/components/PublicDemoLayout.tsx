import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { PublicDemoBanner } from "@/components/PublicDemoBanner";
import { AppSidebar } from "@/components/AppSidebar";
import { AIConcierge } from "@/components/AIConcierge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { OrganizationSwitcher } from "@/components/OrganizationSwitcher";
import { NotificationsBell } from "@/components/NotificationsBell";
import { CommandMenu } from "@/components/CommandMenu";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogIn, Search } from "lucide-react";
import { GlobalNavigation } from "@/components/GlobalNavigation";

interface PublicDemoLayoutProps {
  children?: React.ReactNode;
}

export const PublicDemoLayout = ({ children }: PublicDemoLayoutProps) => {
  const { t } = useTranslation('common');
  const { user, signOut } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {user && <CommandMenu />}
        <AppSidebar />

        <div className="flex-1 flex flex-col w-full">
          <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-4">
              <SidebarTrigger />

              {user ? (
                <>
                  <ProcuredataLogo size="md" showNavigation={true} variant="text" />
                  <div className="ml-auto flex items-center gap-2">
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
                </>
              ) : (
                <>
                  <GlobalNavigation />
                  <Link to="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
                    <span className="procuredata-gradient">PROCUREDATA</span>
                  </Link>
                  <div className="ml-auto flex items-center gap-2">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <Link to="/auth">
                      <Button variant="outline" size="sm" className="gap-2">
                        <LogIn className="h-4 w-4" />
                        {t('login')}
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </header>

          {!user && <PublicDemoBanner />}

          <main className="flex-1">
            {children || <Outlet />}
          </main>
        </div>

        <AIConcierge />
      </div>
    </SidebarProvider>
  );
};
