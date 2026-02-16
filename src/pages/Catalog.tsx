import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useTranslation } from "react-i18next";

// Transaction status type for catalog intelligence
interface AssetTransactionStatus {
  id: string;
  status: string;
  asset_id: string;
}

import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Leaf, 
  ShieldCheck, 
  Star, 
  Database,
  ArrowRight,
  BarChart3,
  Wallet,
  Zap,
  Award,
  Globe,
  Users,
  Settings,
  Gauge,
  Clock,
  Download,
  CheckCircle2
} from "lucide-react";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

// Partner Products Component
import { PartnerProductCard, PartnerProduct } from "@/components/catalog/PartnerProductCard";
import { CatalogFilters, CatalogFiltersState } from "@/components/catalog/CatalogFilters";

// --- Tipos alineados con la vista SQL 'marketplace_listings' ---
interface MarketplaceListing {
  asset_id: string;
  product_name: string | null;
  product_description: string | null;
  category: string | null;
  provider_id: string;
  provider_name: string | null;
  seller_category: string | null;
  kyb_verified: boolean;
  pricing_model: 'free' | 'one_time' | 'subscription' | 'usage' | null;
  price: number | null;
  currency: string | null;
  billing_period?: string | null;
  has_green_badge: boolean;
  reputation_score: number;
  review_count: number;
  energy_renewable_percent?: number | null;
  product_id?: string | null;
  version?: string | null;
  created_at?: string | null;
}

// --- Componente de Estrellas de Reputación ---
const StarRating = ({ rating, count }: { rating: number, count: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={`h-3 w-3 ${star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} 
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">({count})</span>
    </div>
  );
};

export default function Catalog() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { activeOrgId, activeOrg } = useOrganizationContext();
  const { t } = useTranslation('catalog');
  const { t: tPartners } = useTranslation('partnerProducts');
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<CatalogFiltersState>({
    onlyGreen: false,
    onlyVerified: false,
    priceType: 'all',
    partner: 'all',
    country: 'all',
    category: 'all',
    onlyAcquired: false,
    onlyPending: false,
    dataNature: 'all',
  });
  
  // Estado para comparación
  const [compareList, setCompareList] = useState<Set<string>>(new Set());
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);

  // --- Load Partner Products from translations ---
  const partnerProducts = useMemo(() => {
    const partnersData = tPartners('partners', { returnObjects: true });
    if (!partnersData || typeof partnersData !== 'object') return [];
    
    const products: PartnerProduct[] = [];
    Object.entries(partnersData as Record<string, any>).forEach(([partnerId, partner]) => {
      if (partner.products && typeof partner.products === 'object') {
        Object.entries(partner.products as Record<string, any>).forEach(([productKey, product]) => {
          products.push({
            id: product.id || `${partnerId}-${productKey}`,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price || 0,
            pricingModel: product.pricingModel || 'subscription',
            tags: product.tags || [],
            hasGreenBadge: product.hasGreenBadge || false,
            kybVerified: product.kybVerified || false,
            reputationScore: product.reputationScore || 4.5,
            reviewCount: product.reviewCount || 0,
            dataPoints: product.dataPoints,
            updateFrequency: product.updateFrequency,
            partnerId,
            partnerName: partner.name,
            partnerCountry: partner.country,
            partnerFlag: partner.flag,
            sector: partner.sector
          });
        });
      }
    });
    return products;
  }, [tPartners]);

  // --- Fetch Wishlist from Supabase ---
  const { data: wishlistData } = useQuery({
    queryKey: ["user-wishlist", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_wishlist")
        .select("asset_id")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data?.map(item => item.asset_id) || [];
    },
    enabled: !!user,
  });

  const wishlist = new Set(wishlistData || []);

  // --- Wishlist Mutation ---
  const toggleWishlistMutation = useMutation({
    mutationFn: async (assetId: string) => {
      if (!user) throw new Error("User not authenticated");

      const isInWishlist = wishlist.has(assetId);
      
      if (isInWishlist) {
        const { error } = await supabase
          .from("user_wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("asset_id", assetId);
        if (error) throw error;
        return { action: "removed" };
      } else {
        const { error } = await supabase
          .from("user_wishlist")
          .insert({ user_id: user.id, asset_id: assetId });
        if (error) throw error;
        return { action: "added" };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["user-wishlist"] });
      if (result.action === "added") {
        toast(t('toast.addedToFavorites'), { icon: "❤️" });
      } else {
        toast(t('toast.removedFromFavorites'), { icon: "💔" });
      }
    },
    onError: () => {
      toast.error(t('toast.errorFavorites'));
    },
  });

  const toggleWishlist = (assetId: string) => {
    if (!user) {
      toast.error(t('toast.loginRequired'));
      return;
    }
    toggleWishlistMutation.mutate(assetId);
  };

  // --- Synthetic Assets from translations (for demo when DB is empty) ---
  interface SyntheticAsset {
    id: string;
    name: string;
    description: string;
    category: string;
    provider: string;
    price: number;
    pricingModel: string;
    tags: string[];
    hasGreenBadge: boolean;
    kybVerified: boolean;
    reputationScore: number;
    reviewCount: number;
  }

  const syntheticAssets = t('syntheticAssets', { returnObjects: true }) as SyntheticAsset[];

  // --- Fetch de Datos (Conecta con la vista SQL) ---
  const { data: dbListings, isLoading } = useQuery({
    queryKey: ["marketplace-listings"],
    queryFn: async () => {
      // Intentamos leer de la vista nueva
      const { data, error } = await supabase
        .from('marketplace_listings' as any) // Cast as any si los tipos no se han regenerado aún
        .select('*');
      
      if (error) {
        console.warn("Vista marketplace_listings no encontrada, usando fallback...");
        // Fallback a data_assets normal si la migración no se ha corrido
        const { data: rawAssets } = await supabase
          .from('data_assets')
          .select(`
            id,
            subject_org_id,
            price,
            currency,
            pricing_model,
            is_visible,
            product:data_products(name, category, description),
            org:organizations!subject_org_id(name)
          `)
          .eq('is_visible', true)
          .eq('status', 'active');
        
        // Mapeo manual para simular la estructura del marketplace
        const fallbackData: MarketplaceListing[] = rawAssets?.map(a => ({
          asset_id: a.id,
          product_name: a.product?.name || "Producto Sin Nombre",
          product_description: a.product?.description || "Sin descripción",
          category: a.product?.category || "General",
          provider_name: a.org?.name || "Proveedor Desconocido",
          provider_id: a.subject_org_id,
          seller_category: '',
          pricing_model: (a.pricing_model as any) || 'free',
          price: a.price || 0,
          currency: a.currency || 'EUR',
          billing_period: undefined,
          reputation_score: 4.5,
          review_count: 12,
          has_green_badge: Math.random() > 0.5,
          kyb_verified: true
        })) || [];
        
        return fallbackData;
      }
      
      return ((data || []) as unknown) as MarketplaceListing[];
    }
  });

  // --- Fetch access policies for visibility filtering ---
  const { data: accessPolicies } = useQuery({
    queryKey: ["asset-access-policies"],
    queryFn: async () => {
      const { data } = await supabase
        .from("data_assets")
        .select("id, custom_metadata, subject_org_id")
        .eq("status", "active");
      return (data ?? []) as { id: string; custom_metadata: any; subject_org_id: string }[];
    },
  });

  const accessPolicyMap = useMemo(() => {
    const map = new Map<string, { allowedWallets: { org_id: string }[]; deniedWallets: { org_id: string }[]; ownerOrgId: string }>();
    (accessPolicies ?? []).forEach((a) => {
      const policy = a.custom_metadata?.access_policy;
      if (!policy) return;
      const allowed = policy.allowed_wallets || policy.access_list || [];
      const denied = policy.denied_wallets || [];
      // Only add to map if there's actual restriction
      if (allowed.length > 0 || denied.length > 0) {
        map.set(a.id, {
          allowedWallets: allowed,
          deniedWallets: denied,
          ownerOrgId: a.subject_org_id,
        });
      }
    });
    return map;
  }, [accessPolicies]);

  // --- Fetch user's active transactions for catalog intelligence ---
  const { data: userTransactions } = useQuery({
    queryKey: ["user-asset-transactions", activeOrgId],
    queryFn: async () => {
      if (!activeOrgId) return [];
      const { data } = await supabase
        .from("data_transactions")
        .select("id, status, asset_id")
        .eq("consumer_org_id", activeOrgId)
        .in("status", ["initiated", "pending_subject", "pending_holder", "approved", "completed"]);
      return (data ?? []) as AssetTransactionStatus[];
    },
    enabled: !!activeOrgId,
  });

  const transactionMap = useMemo(() => {
    const map = new Map<string, AssetTransactionStatus>();
    (userTransactions ?? []).forEach((tx) => {
      // Keep the most relevant transaction per asset (completed > pending > initiated)
      const existing = map.get(tx.asset_id);
      if (!existing || tx.status === "completed" || (tx.status === "approved" && existing.status !== "completed")) {
        map.set(tx.asset_id, tx);
      }
    });
    return map;
  }, [userTransactions]);

  // --- Hybrid Logic: Use DB data if available, otherwise use translated synthetic data ---
  const listings = useMemo(() => {
    // If we have real data from the database, use it
    if (dbListings && dbListings.length > 0) {
      return dbListings;
    }
    
    // Fallback to translated synthetic data for demo
    if (Array.isArray(syntheticAssets) && syntheticAssets.length > 0) {
      return syntheticAssets.map((asset): MarketplaceListing => ({
        asset_id: asset.id,
        product_name: asset.name,
        product_description: asset.description,
        category: asset.category,
        provider_name: asset.provider,
        provider_id: 'synthetic-provider',
        seller_category: null,
        pricing_model: asset.pricingModel as 'free' | 'one_time' | 'subscription' | 'usage',
        price: asset.price,
        currency: 'EUR',
        billing_period: asset.pricingModel === 'subscription' ? 'monthly' : null,
        has_green_badge: asset.hasGreenBadge,
        kyb_verified: asset.kybVerified,
        reputation_score: asset.reputationScore,
        review_count: asset.reviewCount
      }));
    }
    
    return [];
  }, [dbListings, syntheticAssets]);

  // UUID regex for nature classification
  const UUID_REGEX_FILTER = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  // --- Lógica de Filtrado en Cliente ---
  const filteredListings = listings?.filter(item => {
    const matchesSearch = (item.product_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.provider_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.product_description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || activeTab === 'my-acquisitions' || item.category === activeTab;
    
    // "Mis Adquisiciones" filter
    const matchesAcquisitions = activeTab !== 'my-acquisitions' || transactionMap.has(item.asset_id);
    const matchesGreen = !filters.onlyGreen || item.has_green_badge;
    const matchesVerified = !filters.onlyVerified || item.kyb_verified;

    // Sidebar "Mis Estados" filters - EXCLUSIVE: only show matching assets
    const txForAsset = transactionMap.get(item.asset_id);
    const hasStatusFilter = filters.onlyAcquired || filters.onlyPending;
    let matchesStatus = true;
    if (hasStatusFilter) {
      const isAcquired = txForAsset?.status === "completed";
      const isPending = txForAsset && ["initiated", "pending_subject", "pending_holder", "approved"].includes(txForAsset.status);
      matchesStatus = (filters.onlyAcquired && isAcquired) || (filters.onlyPending && !!isPending);
      if (!matchesStatus) return false;
    }

    // Data nature filter
    const isProduction = UUID_REGEX_FILTER.test(item.asset_id);
    let matchesNature = true;
    if (filters.dataNature === "production") matchesNature = isProduction;
    if (filters.dataNature === "demo") matchesNature = !isProduction;

    const matchesPrice = filters.priceType === 'all' 
      ? true 
      : filters.priceType === 'free' ? (item.price || 0) === 0 : (item.price || 0) > 0;
    
    // Cuando hay filtro de partner o país activo, ocultar listings sintéticos
    const matchesPartner = filters.partner === 'all';
    const matchesCountry = filters.country === 'all';

    // Access control: Pontus-X priority logic
    const policy = accessPolicyMap.get(item.asset_id);
    let matchesAccess = true;
    if (policy && activeOrgId) {
      if (policy.ownerOrgId !== activeOrgId) {
        if (policy.allowedWallets.length > 0) {
          matchesAccess = policy.allowedWallets.some((entry) => entry.org_id === activeOrgId);
        } else if (policy.deniedWallets.length > 0) {
          matchesAccess = !policy.deniedWallets.some((entry) => entry.org_id === activeOrgId);
        }
      }
    } else if (policy && !activeOrgId) {
      if (policy.allowedWallets.length > 0) matchesAccess = false;
    }

    return matchesSearch && matchesCategory && matchesAcquisitions && matchesGreen && matchesVerified && matchesPrice && matchesPartner && matchesCountry && matchesAccess && matchesNature;
  });

  // --- Filtrado de Partner Products ---
  const filteredPartnerProducts = partnerProducts.filter(item => {
    // When status filters are active, hide ALL partner products (they have no transactions)
    if (filters.onlyAcquired || filters.onlyPending) return false;
    // When production filter is active, hide partner products (they are demo/synthetic)
    if (filters.dataNature === "production") return false;

    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.partnerName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = (activeTab === 'all' && filters.category === 'all') || 
                            item.category === activeTab ||
                            item.category === filters.category;
    const matchesGreen = !filters.onlyGreen || item.hasGreenBadge;
    const matchesVerified = !filters.onlyVerified || item.kybVerified;
    const matchesPrice = filters.priceType === 'all' 
      ? true 
      : filters.priceType === 'free' ? item.price === 0 : item.price > 0;
    const matchesPartner = filters.partner === 'all' || item.partnerId === filters.partner;
    const matchesCountry = filters.country === 'all' || item.partnerCountry === filters.country;

    return matchesSearch && matchesCategory && matchesGreen && matchesVerified && matchesPrice && matchesPartner && matchesCountry;
  });

  // Categorías dinámicas extraídas de los datos reales + partner products
  const partnerCategories = Array.from(new Set(partnerProducts.map(p => p.category).filter(Boolean)));
  const dynamicCategories = Array.from(
    new Set([
      ...(listings?.map(l => l.category).filter(Boolean) || []),
      ...partnerCategories
    ])
  ).sort();
  
  const allCategories = [
    { id: "all", label: t('filters.all'), targetShare: null },
    ...(activeOrgId ? [{ id: "my-acquisitions", label: "Mis Adquisiciones", targetShare: null }] : []),
    ...dynamicCategories.map(cat => ({
      id: cat!,
      label: cat!,
      targetShare: null
    }))
  ];

  // Funciones para comparador
  const toggleCompare = (assetId: string) => {
    setCompareList(prev => {
      const newSet = new Set(prev);
      if (newSet.has(assetId)) {
        newSet.delete(assetId);
      } else {
        if (newSet.size >= 4) {
          toast.error(t('toast.maxCompare'));
          return prev;
        }
        newSet.add(assetId);
      }
      return newSet;
    });
  };

  const compareProducts = listings?.filter(l => compareList.has(l.asset_id)) || [];

  return (
    <div className="container py-8 space-y-8 fade-in bg-muted/10 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <div className="relative rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Database className="h-64 w-64 -mr-16 -mt-16" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4 border-none">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{t('hero.title')}</h1>
            <p className="text-blue-100 text-lg mb-8">
              {t('hero.description')}
            </p>
            
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder={t('hero.searchPlaceholder')} 
                className="pl-10 h-12 bg-white text-gray-900 border-none shadow-lg focus-visible:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Publish Dataset Button */}
          <Button 
            size="lg"
            onClick={() => navigate("/datos/publicar")}
            className="bg-white text-blue-600 hover:bg-blue-50 shrink-0 shadow-lg"
          >
            <Database className="h-5 w-5 mr-2" />
            Publicar Dataset
          </Button>
        </div>
      </div>

      {/* --- MARKETPLACE LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR DE FILTROS */}
        <div className="hidden lg:block">
          <CatalogFilters
            filters={filters}
            onFiltersChange={setFilters}
            partnerProducts={partnerProducts}
            categories={dynamicCategories}
          />
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Stats del catálogo unificado */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1">
                <Database className="h-3.5 w-3.5" />
                {(filteredListings?.length || 0) + filteredPartnerProducts.length} {t('hero.badge')}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                <Users className="h-3.5 w-3.5" />
                {partnerProducts.length} {tPartners('badges.aggregated')}
              </Badge>
            </div>
          </div>

          {/* Tabs de Categoría - Orden oficial según Memoria Técnica */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-transparent gap-2">
              {allCategories.map(cat => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white border bg-white capitalize px-4 py-2 rounded-full flex items-center gap-1"
                >
                  {cat.label}
                  {cat.targetShare && (
                    <Badge variant="outline" className="ml-1 text-[10px] px-1.5 py-0">
                      {cat.targetShare}%
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-[350px] rounded-xl" />)}
            </div>
          ) : (
            // Unified Catalog Grid - All Products Together
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Marketplace listings first */}
              {filteredListings?.map((item) => {
                // UUID regex pattern to detect database IDs
                const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                const isDbAsset = UUID_REGEX.test(item.asset_id);
                const detailUrl = isDbAsset 
                  ? `/catalog/asset/${item.asset_id}` 
                  : `/catalog/product/${item.asset_id}`;
                
                const txStatus = transactionMap.get(item.asset_id);
                
                return (
                  <ProductCard 
                    key={item.asset_id} 
                    item={item} 
                    onAction={() => navigate(detailUrl)} 
                    onCompareToggle={() => toggleCompare(item.asset_id)}
                    isInCompare={compareList.has(item.asset_id)}
                    transactionStatus={txStatus}
                    t={t}
                  />
                );
              })}
              
              {/* Partner products after */}
              {filteredPartnerProducts.map((product) => (
                <PartnerProductCard key={product.id} product={product} />
              ))}
              
              {/* Empty state when no products */}
              {(filteredListings?.length === 0 && filteredPartnerProducts.length === 0) && (
                <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed">
                  <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                    <Search className="h-full w-full" />
                  </div>
                  <h3 className="text-lg font-medium">{t('emptyState.title')}</h3>
                  <p className="text-muted-foreground">{t('emptyState.description')}</p>
                  <Button variant="link" onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      onlyGreen: false, 
                      onlyVerified: false, 
                      priceType: 'all',
                      partner: 'all',
                      country: 'all',
                      category: 'all',
                      onlyAcquired: false,
                      onlyPending: false,
                      dataNature: 'all',
                    });
                    setActiveTab("all");
                  }}>{t('emptyState.clearFilters')}</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Barra Flotante de Comparación */}
      {compareList.size >= 2 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <Card className="shadow-2xl border-2 border-primary">
            <CardContent className="flex items-center gap-4 p-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">{t('compare.comparing', { count: compareList.size })}</p>
                <p className="text-xs text-muted-foreground">{t('compare.selectUpTo')}</p>
              </div>
              <Button onClick={() => setCompareDialogOpen(true)} size="sm">
                {t('compare.viewTable')}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setCompareList(new Set())}>
                {t('compare.clear')}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dialog de Comparación */}
      <Dialog open={compareDialogOpen} onOpenChange={setCompareDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{t('compare.dialogTitle')}</DialogTitle>
            <DialogDescription>
              {t('compare.dialogDescription', { count: compareProducts.length })}
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Característica</TableHead>
                  {compareProducts.map(p => (
                    <TableHead key={p.asset_id}>{p.product_name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Proveedor</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>{p.provider_name}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Precio</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>
                      {p.price === 0 ? (
                        <Badge variant="outline" className="text-green-600">{t('card.free')}</Badge>
                      ) : (
                        <div className="flex items-center gap-1">
                          {`${p.price} ${p.currency}`}
                          {p.currency === 'EUROe' && (
                            <Wallet className="h-3 w-3 text-purple-600" />
                          )}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Modelo</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id} className="capitalize">
                      {p.pricing_model === 'subscription' ? 'Suscripción' : p.pricing_model === 'one_time' ? 'Pago único' : p.pricing_model === 'usage' ? 'Por uso' : 'Gratuito'}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Categoría</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>{p.category}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tipo de Datos</TableCell>
                  {compareProducts.map(p => {
                    const isProduction = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(p.asset_id);
                    return (
                      <TableCell key={p.asset_id}>
                        <Badge className={`rounded-full border text-[10px] px-2 py-0.5 font-medium ${isProduction ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-purple-50 text-purple-700 border-purple-300'}`}>
                          {isProduction ? '🏭 Producción' : '🧪 Sintético'}
                        </Badge>
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Reputación</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>
                      <StarRating rating={p.reputation_score} count={p.review_count} />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Verificado</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>
                      {p.kyb_verified ? (
                        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                          <ShieldCheck className="h-3 w-3 mr-1" /> Sí
                        </Badge>
                      ) : (
                        'No'
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sostenible</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>
                      {p.has_green_badge ? (
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                          <Leaf className="h-3 w-3 mr-1" /> Sí
                        </Badge>
                      ) : (
                        'No'
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setCompareDialogOpen(false)}>
              {t('compare.close')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- Subcomponente: Tarjeta de Producto ---
// --- Helper: Category Icon ---
const getCategoryIcon = (category: string | null) => {
  switch (category) {
    case "Compliance": return ShieldCheck;
    case "ESG": return Leaf;
    case "Ops": return Gauge;
    case "Logistics": return Gauge;
    case "Market": return BarChart3;
    default: return Database;
  }
};

// --- Helper: Category Color ---
const getCategoryColor = (category: string | null) => {
  switch (category) {
    case "Compliance": return "bg-blue-100 text-blue-800 border-blue-200";
    case "ESG": return "bg-green-100 text-green-800 border-green-200";
    case "Ops": return "bg-orange-100 text-orange-800 border-orange-200";
    case "Logistics": return "bg-orange-100 text-orange-800 border-orange-200";
    case "Market": return "bg-purple-100 text-purple-800 border-purple-200";
    default: return "bg-slate-100 text-slate-600 border-slate-200";
  }
};

function ProductCard({ 
  item, 
  onAction,
  onCompareToggle,
  isInCompare,
  transactionStatus,
  t
}: { 
  item: MarketplaceListing;
  onAction: () => void;
  onCompareToggle?: () => void;
  isInCompare?: boolean;
  transactionStatus?: AssetTransactionStatus;
  t: (key: string) => string;
}) {
  const navigate = useNavigate();
  const isPaid = (item.price || 0) > 0;
  const isWeb3Asset = item.currency === 'EUROe' || item.currency === 'GX';
  const CategoryIcon = getCategoryIcon(item.category);
  const categoryColorClass = getCategoryColor(item.category);

  // Determine data nature based on UUID
  const isProductionAsset = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.asset_id);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-muted/60 overflow-hidden flex flex-col h-full relative">
      <div className={`h-2 ${item.has_green_badge ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-indigo-500 to-purple-400'} group-hover:h-3 transition-all`} />

      {/* Data Nature Badge — positioned to avoid overlap with category */}
      <div className="absolute top-4 right-3 z-10">
        <Badge className={`rounded-full border text-[10px] px-2 py-0.5 font-medium shadow-sm whitespace-nowrap ${isProductionAsset ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-purple-50 text-purple-700 border-purple-300'}`}>
          {isProductionAsset ? '🏭 Producción' : '🧪 Sintético'}
        </Badge>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2 gap-2">
          {/* Category Badge with icon - matching PartnerProductCard style */}
          <Badge className={`${categoryColorClass} px-2 py-0.5 text-[10px] font-semibold`}>
            <CategoryIcon className="h-3 w-3 mr-1" />
            {item.category}
          </Badge>
          
          {/* Insignias Superiores */}
          <div className="flex flex-wrap gap-1">
            {/* Badge Web3 */}
            {isWeb3Asset && (
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200 px-1.5" title="Requiere Wallet Web3">
                <Wallet className="h-3 w-3 mr-1" />
                {item.currency}
              </Badge>
            )}
            {/* ESG Badge - Highly Renewable */}
            {(item.energy_renewable_percent || 0) > 80 && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 px-1.5" title="80%+ Energía Renovable">
                <Zap className="h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
        
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {item.product_name}
        </CardTitle>
        
        {/* Published By Badge - matching PartnerProductCard style */}
        {item.provider_name && (
          <Badge variant="outline" className="mt-2 text-xs px-2 py-1 border-primary/40 bg-primary/5 w-fit">
            <Globe className="h-3 w-3 mr-1.5 text-primary" />
            <span className="font-medium">{item.provider_name}</span>
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 min-h-[60px]">
          {item.product_description || t('card.noDescription')}
        </p>
        
        <div className="flex items-center justify-between">
          <StarRating rating={item.reputation_score} count={item.review_count} />
          
          <div className="text-right">
            {isPaid ? (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-foreground">
                    {new Intl.NumberFormat('es-ES', { 
                      style: item.currency === 'EUR' ? 'currency' : 'decimal', 
                      currency: item.currency === 'EUR' ? 'EUR' : undefined 
                    }).format(item.price || 0)}
                  </span>
                  {isWeb3Asset && (
                    <span className="text-sm font-medium text-purple-700">{item.currency}</span>
                  )}
                </div>
                {item.pricing_model === 'subscription' && (
                  <span className="text-[10px] text-muted-foreground uppercase font-medium">
                    / {item.billing_period === 'monthly' ? t('card.month') : t('card.year')}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-lg font-bold text-green-600">{t('card.free')}</span>
            )}
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="pt-4 bg-muted/30 flex-col gap-2">
        {/* Checkbox de Comparación */}
        {onCompareToggle && (
          <div className="w-full flex items-center gap-2 text-sm mb-2">
            <Checkbox 
              id={`compare-${item.asset_id}`}
              checked={isInCompare}
              onCheckedChange={onCompareToggle}
            />
            <label htmlFor={`compare-${item.asset_id}`} className="cursor-pointer text-muted-foreground">
              {t('card.compareThis')}
            </label>
          </div>
        )}
        
        {transactionStatus ? (
          transactionStatus.status === "completed" ? (
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/data/view/${transactionStatus.id}`);
              }} 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" /> Acceder / Descargar
            </Button>
          ) : (
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/requests/${transactionStatus.id}`);
              }} 
              variant="outline"
              className="w-full"
            >
              <Clock className="mr-2 h-4 w-4" /> Solicitud en proceso
            </Button>
          )
        ) : (
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onAction();
            }} 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Solicitar Acceso <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
