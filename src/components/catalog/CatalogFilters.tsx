import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Filter, Globe, Building2, FolderOpen, Leaf, ShieldCheck, X, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PartnerProduct } from "./PartnerProductCard";

// Country flag mapping
const countryFlags: Record<string, string> = {
  DE: "🇩🇪",
  FR: "🇫🇷",
  ES: "🇪🇸",
  IT: "🇮🇹",
  NL: "🇳🇱",
  BE: "🇧🇪",
  PT: "🇵🇹",
  AT: "🇦🇹",
  PL: "🇵🇱",
  SE: "🇸🇪",
  DK: "🇩🇰",
  FI: "🇫🇮",
  IE: "🇮🇪",
  GR: "🇬🇷",
  CZ: "🇨🇿",
  RO: "🇷🇴",
  HU: "🇭🇺",
  SK: "🇸🇰",
  BG: "🇧🇬",
  HR: "🇭🇷",
  SI: "🇸🇮",
  LT: "🇱🇹",
  LV: "🇱🇻",
  EE: "🇪🇪",
  LU: "🇱🇺",
  MT: "🇲🇹",
  CY: "🇨🇾",
};

// Country names for display
const countryNames: Record<string, Record<string, string>> = {
  es: {
    DE: "Alemania",
    FR: "Francia",
    ES: "España",
    IT: "Italia",
    NL: "Países Bajos",
    BE: "Bélgica",
    PT: "Portugal",
    AT: "Austria",
    PL: "Polonia",
    SE: "Suecia",
  },
  en: {
    DE: "Germany",
    FR: "France",
    ES: "Spain",
    IT: "Italy",
    NL: "Netherlands",
    BE: "Belgium",
    PT: "Portugal",
    AT: "Austria",
    PL: "Poland",
    SE: "Sweden",
  },
  fr: {
    DE: "Allemagne",
    FR: "France",
    ES: "Espagne",
    IT: "Italie",
    NL: "Pays-Bas",
    BE: "Belgique",
    PT: "Portugal",
    AT: "Autriche",
    PL: "Pologne",
    SE: "Suède",
  },
  de: {
    DE: "Deutschland",
    FR: "Frankreich",
    ES: "Spanien",
    IT: "Italien",
    NL: "Niederlande",
    BE: "Belgien",
    PT: "Portugal",
    AT: "Österreich",
    PL: "Polen",
    SE: "Schweden",
  },
  it: {
    DE: "Germania",
    FR: "Francia",
    ES: "Spagna",
    IT: "Italia",
    NL: "Paesi Bassi",
    BE: "Belgio",
    PT: "Portogallo",
    AT: "Austria",
    PL: "Polonia",
    SE: "Svezia",
  },
  pt: {
    DE: "Alemanha",
    FR: "França",
    ES: "Espanha",
    IT: "Itália",
    NL: "Países Baixos",
    BE: "Bélgica",
    PT: "Portugal",
    AT: "Áustria",
    PL: "Polónia",
    SE: "Suécia",
  },
  nl: {
    DE: "Duitsland",
    FR: "Frankrijk",
    ES: "Spanje",
    IT: "Italië",
    NL: "Nederland",
    BE: "België",
    PT: "Portugal",
    AT: "Oostenrijk",
    PL: "Polen",
    SE: "Zweden",
  },
};

export interface CatalogFiltersState {
  onlyGreen: boolean;
  onlyVerified: boolean;
  priceType: "all" | "free" | "paid";
  partner: string;
  country: string;
  category: string;
  onlyAcquired: boolean;
  onlyPending: boolean;
  dataNature: "all" | "demo" | "production";
}

interface CatalogFiltersProps {
  filters: CatalogFiltersState;
  onFiltersChange: (filters: CatalogFiltersState) => void;
  partnerProducts: PartnerProduct[];
  categories: string[];
}

export function CatalogFilters({
  filters,
  onFiltersChange,
  partnerProducts,
  categories,
}: CatalogFiltersProps) {
  const { t } = useTranslation("catalog");
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split("-")[0] || "en";

  // Extract unique partners
  const partners = useMemo(() => {
    const partnerMap = new Map<string, { id: string; name: string; flag: string }>();
    partnerProducts.forEach((product) => {
      if (product.partnerId && !partnerMap.has(product.partnerId)) {
        partnerMap.set(product.partnerId, {
          id: product.partnerId,
          name: product.partnerName || product.partnerId,
          flag: product.partnerFlag || "",
        });
      }
    });
    return Array.from(partnerMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [partnerProducts]);

  // Extract unique countries
  const countries = useMemo(() => {
    const countrySet = new Set<string>();
    partnerProducts.forEach((product) => {
      if (product.partnerCountry) {
        countrySet.add(product.partnerCountry);
      }
    });
    return Array.from(countrySet).sort();
  }, [partnerProducts]);

  // Get country display name
  const getCountryName = (code: string) => {
    return countryNames[currentLang]?.[code] || countryNames.en[code] || code;
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.onlyGreen) count++;
    if (filters.onlyVerified) count++;
    if (filters.priceType !== "all") count++;
    if (filters.partner !== "all") count++;
    if (filters.country !== "all") count++;
    if (filters.category !== "all") count++;
    if (filters.onlyAcquired) count++;
    if (filters.onlyPending) count++;
    if (filters.dataNature !== "all") count++;
    return count;
  }, [filters]);

  const clearAllFilters = () => {
    onFiltersChange({
      onlyGreen: false,
      onlyVerified: false,
      priceType: "all",
      partner: "all",
      country: "all",
      category: "all",
      onlyAcquired: false,
      onlyPending: false,
      dataNature: "all",
    });
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-24">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" /> {t("filters.title")}
          </h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </div>

        <Card className="bg-card">
          <CardContent className="p-4 space-y-5">
            {/* Partner Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                {t("filters.partner", "Partner")}
              </Label>
              <Select
                value={filters.partner}
                onValueChange={(value) =>
                  onFiltersChange({ ...filters, partner: value })
                }
              >
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder={t("filters.all")} />
                </SelectTrigger>
                <SelectContent className="bg-popover max-h-[300px]">
                  <SelectItem value="all">{t("filters.all")}</SelectItem>
                  {partners.map((partner) => (
                    <SelectItem key={partner.id} value={partner.id}>
                      <span className="flex items-center gap-2">
                        <span>{partner.flag}</span>
                        <span>{partner.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                {t("filters.country", "Country")}
              </Label>
              <Select
                value={filters.country}
                onValueChange={(value) =>
                  onFiltersChange({ ...filters, country: value })
                }
              >
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder={t("filters.all")} />
                </SelectTrigger>
                <SelectContent className="bg-popover max-h-[300px]">
                  <SelectItem value="all">{t("filters.all")}</SelectItem>
                  {countries.map((code) => (
                    <SelectItem key={code} value={code}>
                      <span className="flex items-center gap-2">
                        <span>{countryFlags[code] || "🌍"}</span>
                        <span>{getCountryName(code)}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                {t("filters.category", "Category")}
              </Label>
              <Select
                value={filters.category}
                onValueChange={(value) =>
                  onFiltersChange({ ...filters, category: value })
                }
              >
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder={t("filters.all")} />
                </SelectTrigger>
                <SelectContent className="bg-popover max-h-[300px]">
                  <SelectItem value="all">{t("filters.all")}</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Price Model Filter */}
            <div className="space-y-3">
              <Label>{t("filters.priceModel")}</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="price-all"
                    checked={filters.priceType === "all"}
                    onCheckedChange={() =>
                      onFiltersChange({ ...filters, priceType: "all" })
                    }
                  />
                  <label htmlFor="price-all" className="text-sm font-medium">
                    {t("filters.all")}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="price-free"
                    checked={filters.priceType === "free"}
                    onCheckedChange={() =>
                      onFiltersChange({
                        ...filters,
                        priceType: filters.priceType === "free" ? "all" : "free",
                      })
                    }
                  />
                  <label htmlFor="price-free" className="text-sm">
                    {t("filters.freeOpenData")}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="price-paid"
                    checked={filters.priceType === "paid"}
                    onCheckedChange={() =>
                      onFiltersChange({
                        ...filters,
                        priceType: filters.priceType === "paid" ? "all" : "paid",
                      })
                    }
                  />
                  <label htmlFor="price-paid" className="text-sm">
                    {t("filters.premiumPaid")}
                  </label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Mis Estados Filter */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium">
                {t("filters.myStatus")}
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="check-acquired"
                    checked={filters.onlyAcquired}
                    onCheckedChange={(c) =>
                      onFiltersChange({ ...filters, onlyAcquired: !!c, onlyPending: false })
                    }
                  />
                  <label
                    htmlFor="check-acquired"
                    className="text-sm flex items-center gap-1"
                  >
                    <CheckCircle2 className="h-3 w-3 text-green-600" /> {t("filters.acquired")}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="check-pending"
                    checked={filters.onlyPending}
                    onCheckedChange={(c) =>
                      onFiltersChange({ ...filters, onlyPending: !!c, onlyAcquired: false })
                    }
                  />
                  <label
                    htmlFor="check-pending"
                    className="text-sm flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3 text-amber-600" /> {t("filters.pending")}
                  </label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Data Nature Filter */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium">
                {t("filters.dataNature")}
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nature-demo"
                    checked={filters.dataNature === "demo"}
                    onCheckedChange={(c) =>
                      onFiltersChange({ ...filters, dataNature: c ? "demo" : "all" })
                    }
                  />
                  <label htmlFor="nature-demo" className="text-sm flex items-center gap-1">
                    🧪 {t("filters.demo")}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nature-production"
                    checked={filters.dataNature === "production"}
                    onCheckedChange={(c) =>
                      onFiltersChange({ ...filters, dataNature: c ? "production" : "all" })
                    }
                  />
                  <label htmlFor="nature-production" className="text-sm flex items-center gap-1">
                    🏭 {t("filters.production")}
                  </label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Trust & Quality Filter */}
            <div className="space-y-3">
              <Label>{t("filters.trustGuarantee")}</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="check-green"
                    checked={filters.onlyGreen}
                    onCheckedChange={(c) =>
                      onFiltersChange({ ...filters, onlyGreen: !!c })
                    }
                  />
                  <label
                    htmlFor="check-green"
                    className="text-sm flex items-center gap-1"
                  >
                    <Leaf className="h-3 w-3 text-emerald-600" />{" "}
                    {t("filters.sustainableESG")}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="check-kyb"
                    checked={filters.onlyVerified}
                    onCheckedChange={(c) =>
                      onFiltersChange({ ...filters, onlyVerified: !!c })
                    }
                  />
                  <label
                    htmlFor="check-kyb"
                    className="text-sm flex items-center gap-1"
                  >
                    <ShieldCheck className="h-3 w-3 text-primary" />{" "}
                    {t("filters.verifiedKYB")}
                  </label>
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            {activeFilterCount > 0 && (
              <>
                <Separator />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  {t("emptyState.clearFilters")}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
