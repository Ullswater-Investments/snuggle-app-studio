import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NotificationsBell } from "@/components/NotificationsBell";
import { OrganizationSwitcher } from "@/components/OrganizationSwitcher";
import { DemoHelpButton } from "@/components/DemoHelpButton";


import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, LogIn, LogOut, ChevronLeft, ChevronRight } from "lucide-react";

export const UnifiedHeader = () => {
  const { t } = useTranslation('common');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t: tNav } = useTranslation('nav');

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Izquierda: Menu + Marca + Navegación */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <SidebarTrigger />
          <Link to="/dashboard" className="hover:opacity-80 transition-opacity">
            <span className="text-xl font-bold tracking-tight text-[hsl(210,100%,65%)]">PROCUREDATA</span>
          </Link>
          <div className="flex items-center gap-0.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(-1)}
                  className="h-7 w-7 p-0"
                  aria-label={tNav('back')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{tNav('back')}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(1)}
                  className="h-7 w-7 p-0"
                  aria-label={tNav('forward')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{tNav('forward')}</TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {/* Central: Command Palette */}
        <div className="hidden sm:flex flex-1 justify-center">
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
        <div className="flex items-center justify-end gap-2 flex-shrink-0">
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
