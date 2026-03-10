import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Search, Database, Eye, FileText } from "lucide-react";
import { dataAssetService, type DataAssetListItem } from "@/services/dataAssetService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState } from "@/components/EmptyState";

const getPriceLabel = (pricingType: string, t: (key: string) => string) => {
  if (pricingType === "free") return t("publicationsTable.priceFree");
  return t("publicationsTable.pricePaid");
};

export const CatalogTab = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("data");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string>("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["catalog-published", page],
    queryFn: () => dataAssetService.listCatalog(page, "published"),
  });

  const assets = data?.data ?? [];
  const meta = data?.meta;

  const filteredAssets = useMemo(() => {
    let list = assets;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.name?.toLowerCase().includes(q) ||
          (a.did && a.did.toLowerCase().includes(q)) ||
          ((a.publisher_info as { name?: string })?.name ?? "")
            .toLowerCase()
            .includes(q)
      );
    }
    if (sectorFilter !== "all") {
      list = list.filter((a) => {
        const info = a.publisher_info as { sector?: string; country?: string };
        const value = info?.sector ?? info?.country ?? "";
        return value === sectorFilter;
      });
    }
    return list;
  }, [assets, search, sectorFilter]);

  const sectors = useMemo(() => {
    const set = new Set(
      assets
        .map((a) => {
          const info = a.publisher_info as { sector?: string; country?: string };
          return info?.sector ?? info?.country;
        })
        .filter(Boolean)
    );
    return Array.from(set) as string[];
  }, [assets]);

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-destructive font-medium">
          {error instanceof Error ? error.message : "Error al cargar el catálogo"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("stats.activeDatasets")}
            </CardTitle>
            <Database className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{meta?.total ?? filteredAssets.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("stats.providers")}
            </CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Set(assets.map((a) => (a.publisher_info as { uuid?: string })?.uuid).filter(Boolean)).size || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("stats.blockchainVerified")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">—</div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("filters.searchProducts")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder={t("filters.filterBySector")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.allSectors")}</SelectItem>
                {sectors.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      ) : !assets.length ? (
        <EmptyState
          icon={Database}
          title={t("empty.catalogTitle")}
          description={t("empty.catalogDesc")}
          action={
            <Button onClick={() => navigate("/catalog")}>
              {t("empty.libraryBtn")}
            </Button>
          }
        />
      ) : filteredAssets.length === 0 ? (
        <div className="text-center py-12">
          <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t("noResults")}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t("adjustFilters")}</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setSectorFilter("all");
            }}
          >
            {t("clearFilters")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => {
            const publisherName = (asset.publisher_info as { name?: string })?.name ?? "—";
            return (
              <Card
                key={asset.uuid}
                className="group hover:shadow-lg transition-all duration-300 hover:border-primary"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base mb-1 group-hover:text-primary transition-colors truncate">
                    {asset.name || t("card.noName")}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {asset.description || t("card.noDesc")}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {getPriceLabel(asset.pricing_type, t)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3 truncate">
                    {t("card.publisher")}: {publisherName}
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate("/catalog")}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {t("card.viewDetails")}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
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
