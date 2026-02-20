import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NotificationsBell } from "@/components/NotificationsBell";
import { OrganizationSwitcher } from "@/components/OrganizationSwitcher";
import { DemoHelpButton } from "@/components/DemoHelpButton";
import procuredataHeroLogo from "@/assets/procuredata-hero-logo.png";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, LogIn, LogOut } from "lucide-react";

export const UnifiedHeader = () => {
  const { t } = useTranslation('common');
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="grid grid-cols-3 h-16 items-center px-4">
        {/* Columna Izquierda: Logo */}
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Link to="/dashboard" className="hover:opacity-80 transition-opacity flex-shrink-0">
            <img src={procuredataHeroLogo} alt="PROCUREDATA" className="h-9 object-contain" />
          </Link>
        </div>
        
        {/* Columna Central: Command Palette Trigger */}
        <div className="hidden sm:flex justify-center">
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
              document.dispatchEvent(event);
            }}
            className="relative w-full max-w-md flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-transparent hover:border-primary/30 hover:bg-background transition-colors cursor-pointer text-left"
          >
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm text-muted-foreground flex-1">{t('searchPlaceholder')}</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
        
        {/* Columna Derecha: Controles */}
        <div className="flex items-center justify-end gap-2">
          {/* Icono de búsqueda en móvil */}
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Search className="h-4 w-4" />
          </Button>

          {user ? (
            <>
              <div data-tour="org-switcher">
                <OrganizationSwitcher />
              </div>
              <NotificationsBell />
              <LanguageSwitcher />
              <ThemeToggle />
              <DemoHelpButton />
              <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{t('logout')}</span>
              </Button>
            </>
          ) : (
            <>
              <LanguageSwitcher />
              <ThemeToggle />
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  {t('login')}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
