import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NotificationsBell } from "@/components/NotificationsBell";
import { DemoHelpButton } from "@/components/DemoHelpButton";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
          <ProcuredataLogo size="md" showNavigation={true} />
        </div>
        
        {/* Columna Central: Barra de Búsqueda */}
        <div className="hidden sm:flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar datasets, proveedores o servicios..."
              className="w-full pl-10 pr-4 rounded-full bg-muted/50 border-transparent focus:border-primary/30 focus:bg-background transition-colors"
            />
          </div>
        </div>
        
        {/* Columna Derecha: Controles */}
        <div className="flex items-center justify-end gap-2">
          {/* Icono de búsqueda en móvil */}
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Search className="h-4 w-4" />
          </Button>

          {user ? (
            <>
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
