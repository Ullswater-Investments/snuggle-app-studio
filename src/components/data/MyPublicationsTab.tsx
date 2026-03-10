import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Search, Edit, RotateCcw, AlertCircle, ArrowUp, Database, Plus } from "lucide-react";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { dataAssetService, type DataAssetListItem } from "@/services/dataAssetService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/EmptyState";
import { format } from "date-fns";
import { es, fr, pt, de, it, nl, enUS } from "date-fns/locale";
import { toast } from "sonner";

const DATE_LOCALES: Record<string, typeof es> = { es, fr, pt, de, it, nl, en: enUS };

const getStatusBadge = (status: string, t: (key: string) => string) => {
  switch (status) {
    case "error":
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3 w-3" />
          {t("pubStatus.error")}
        </Badge>
      );
    case "publishing":
    case "publicando":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 gap-1">
          <ArrowUp className="h-3 w-3" />
          {t("pubStatus.publishing")}
        </Badge>
      );
    case "published":
    case "active":
    case "available":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          {t("pubStatus.published")}
        </Badge>
      );
    case "pending":
    case "pending_validation":
      return (
        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
          {t("pubStatus.validation")}
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          {t("pubStatus.rejected")}
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getPriceLabel = (pricingType: string, t: (key: string) => string) => {
  if (pricingType === "free") return t("publicationsTable.priceFree");
  return t("publicationsTable.pricePaid");
};

export const MyPublicationsTab = () => {
  const navigate = useNavigate();
  const { activeOrgId } = useOrganizationContext();
  const { t, i18n } = useTranslation("data");
  const dateLocale = DATE_LOCALES[i18n.language] || DATE_LOCALES.en;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["data-assets", activeOrgId, page],
    queryFn: () => dataAssetService.list(activeOrgId!, page),
    enabled: !!activeOrgId,
  });

  const assets = data?.data ?? [];
  const meta = data?.meta;

  const filteredAssets = useMemo(() => {
    let list = assets;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.name?.toLowerCase().includes(q) || (a.did && a.did.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== "all") {
      list = list.filter((a) => a.status === statusFilter);
    }
    return list;
  }, [assets, search, statusFilter]);

  const handleEdit = (asset: DataAssetListItem) => {
    toast.info(t("publicationsTable.edit") + " - Próximamente");
    // TODO: navigate to edit flow when available
  };

  const handleRetry = (asset: DataAssetListItem) => {
    toast.info(t("publicationsTable.retry") + " - Próximamente");
    // TODO: call retry endpoint when available
  };

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-destructive font-medium">
          {error instanceof Error ? error.message : "Error al cargar publicaciones"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("publicationsTable.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder={t("publicationsTable.filterAll")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("publicationsTable.filterAll")}</SelectItem>
            <SelectItem value="error">{t("pubStatus.error")}</SelectItem>
            <SelectItem value="publishing"> {t("pubStatus.publishing")}</SelectItem>
            <SelectItem value="published">{t("pubStatus.published")}</SelectItem>
            <SelectItem value="pending">{t("pubStatus.validation")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("loadingPub")}</p>
        </div>
      ) : !assets.length ? (
        <EmptyState
          icon={Database}
          title={t("empty.pubTitle")}
          description={t("empty.pubDesc")}
          action={
            <Button onClick={() => navigate("/datos/publicar")}>
              <Plus className="h-4 w-4 mr-2" />
              {t("empty.pubBtn")}
            </Button>
          }
        />
      ) : filteredAssets.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">{t("noResults")}</p>
          <p className="text-sm text-muted-foreground mt-1">{t("adjustFilters")}</p>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="uppercase text-muted-foreground font-medium">
                  {t("publicationsTable.didDate")}
                </TableHead>
                <TableHead className="uppercase text-muted-foreground font-medium">
                  {t("publicationsTable.price")}
                </TableHead>
                <TableHead className="uppercase text-muted-foreground font-medium">
                  {t("publicationsTable.status")}
                </TableHead>
                <TableHead className="uppercase text-muted-foreground font-medium text-right">
                  {t("publicationsTable.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.uuid}>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-medium">{asset.name || "—"}</p>
                      <p className="text-xs text-muted-foreground">
                        {asset.did ? asset.did : "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {asset.created_at
                          ? format(new Date(asset.created_at), "d MMM yyyy", {
                              locale: dateLocale,
                            })
                          : "—"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getPriceLabel(asset.pricing_type, t)}</TableCell>
                  <TableCell>{getStatusBadge(asset.status, t)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(asset)}
                        aria-label={t("publicationsTable.edit")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRetry(asset)}
                        aria-label={t("publicationsTable.retry")}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination (if multiple pages) */}
      {meta && meta.last_page > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Anterior
          </Button>
          <span className="flex items-center px-4 text-sm text-muted-foreground">
            {meta.current_page} / {meta.last_page}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= meta.last_page}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
};
