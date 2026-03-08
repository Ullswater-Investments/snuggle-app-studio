import {
  Building2,
  Wallet,
  Globe,
  Plus,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

function abbreviateAddress(address: string | null | undefined): string {
  if (!address) return "—";
  if (address.length <= 12) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

function getVisiblePages(
  current: number,
  last: number,
): (number | "ellipsis")[] {
  if (last <= 5) return Array.from({ length: last }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(last - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < last - 2) pages.push("ellipsis");

  pages.push(last);
  return pages;
}

export const OrganizationCardsGrid = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const {
    availableOrgs,
    switchOrganization,
    paginationMeta,
    currentPage,
    goToPage,
    loading,
  } = useOrganizationContext();

  const handleSelectOrganization = (orgId: string) => {
    switchOrganization(orgId);
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("workspace.selectTitle", "Selecciona tu Espacio de Trabajo")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t(
              "workspace.selectSubtitle",
              "Elige una organización para comenzar a operar",
            )}
          </p>
        </div>
        <Button
          variant="brand"
          className="gap-2"
          onClick={() => navigate("/onboarding/create-organization")}
        >
          <Plus className="h-4 w-4" />
          {t("workspace.newOrg", "Nueva Organización")}
        </Button>
      </div>

      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableOrgs.map((org) => (
          <StaggerItem key={org.id}>
            <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl cursor-pointer bg-card/80 backdrop-blur-sm h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="relative z-10 pb-2 flex-grow">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Building2 className="h-7 w-7 text-primary" />
                  </div>

                  {org.document_country_code && (
                    <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                      {org.document_country_code}
                    </span>
                  )}
                </div>

                <CardTitle className="text-xl font-bold line-clamp-2">
                  {org.name}
                </CardTitle>

                <CardDescription className="mt-2 space-y-2">
                  {org.document && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {org.document_type}: {org.document}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm font-mono">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">
                      {abbreviateAddress(org.wallet_address)}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 pt-4 mt-auto">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">
                    {t("workspace.verified", "Verificado en la Red")}
                  </span>
                </div>

                <Button
                  variant="brand"
                  className="w-full gap-2 group-hover:shadow-lg transition-all"
                  onClick={() => handleSelectOrganization(org.id)}
                >
                  {t("workspace.selectButton", "Seleccionar para operar")}
                  <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {paginationMeta && paginationMeta.last_page > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) goToPage(currentPage - 1);
                }}
                className={
                  currentPage <= 1 || loading
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {getVisiblePages(currentPage, paginationMeta.last_page).map(
              (page, idx) =>
                page === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(page);
                      }}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (paginationMeta.next_page_url) goToPage(currentPage + 1);
                }}
                className={
                  !paginationMeta.next_page_url || loading
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <p className="text-center text-sm text-muted-foreground">
        {t(
          "workspace.helpText",
          "¿No ves tu organización? Solicita una invitación al administrador o registra una nueva.",
        )}
      </p>
    </div>
  );
};
