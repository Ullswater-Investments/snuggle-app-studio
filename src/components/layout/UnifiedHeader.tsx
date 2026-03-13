import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NotificationsBell } from "@/components/NotificationsBell";
import { OrganizationSwitcher } from "@/components/OrganizationSwitcher";
import { DemoHelpButton } from "@/components/DemoHelpButton";
import { usePendingInvitations } from "@/hooks/usePendingInvitations";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Search, LogIn, PanelLeft } from "lucide-react";
import { UserMenu } from "@/components/UserMenu";
import { ProcuredataLogo } from "../ProcuredataLogo";
import { InstitutionalLogos } from "@/components/InstitutionalLogos";

export const UnifiedHeader = () => {
  const { t } = useTranslation("common");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t: tNav } = useTranslation("nav");
  const { toggleSidebar } = useSidebar();

  const { data: invitationsData } = usePendingInvitations({
    enabled: !!user,
  });
  const pendingInvitationsCount =
    invitationsData?.data?.filter((i) => i.status === "pending").length ?? 0;

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Izquierda: Menu + Marca + Navegación */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button
            data-sidebar="trigger"
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 shrink-0"
            onClick={toggleSidebar}
            title={tNav("myInvitations")}
          >
            <PanelLeft className="h-5 w-5 text-muted-foreground" />
            {user && pendingInvitationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 min-w-5 items-center justify-center rounded-full bg-red-600 text-[11px] font-semibold text-white leading-none border-2 border-background">
                {pendingInvitationsCount}
              </span>
            )}
            <span className="sr-only">{tNav("myInvitations")}</span>
          </Button>
          <Link to="/dashboard" className="hover:opacity-80 transition-opacity">
            <ProcuredataLogo
              size="md"
              linkToHome={false}
              showNavigation={true}
            />
          </Link>
          <InstitutionalLogos size="sm" showFrom="lg" />
        </div>

        {/* Central: Command Palette */}
        <div className="hidden sm:flex flex-1 justify-center">
          <button
            onClick={() => {
              const event = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
                bubbles: true,
              });
              document.dispatchEvent(event);
            }}
            className="relative w-full max-w-md flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-transparent hover:border-primary/30 hover:bg-background transition-colors cursor-pointer text-left"
          >
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm text-muted-foreground flex-1">
              {t("searchPlaceholder")}
            </span>
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
              {/* <div data-tour="org-switcher">
                <OrganizationSwitcher />
              </div> */}
              {/* <NotificationsBell /> */}
              <LanguageSwitcher />
              <ThemeToggle />
              <DemoHelpButton />
              <UserMenu user={user} onSignOut={signOut} />
            </>
          ) : (
            <>
              <LanguageSwitcher />
              <ThemeToggle />
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  {t("login")}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
