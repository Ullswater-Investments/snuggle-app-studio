import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Leaf, 
  Star, 
  CheckCircle2, 
  ShoppingCart, 
  FileText, 
  Activity, 
  Lock,
  Globe,
  Eye,
  Wallet,
  Bot,
  Clock,
  Layers,
  RefreshCw,
  Hash,
  Code2,
  Shield,
  Download,
  XCircle,
  AlertCircle,
  ExternalLink,
  MessageSquare
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrayDataView } from "@/components/ArrayDataView";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { AssetDetailChatAgent } from "@/components/asset-detail/AssetDetailChatAgent";

interface MarketplaceListing {
  asset_id: string;
  asset_name: string;
  asset_description: string;
  product_name: string;
  category: string;
  provider_id: string;
  provider_name: string;
  seller_category: string;
  kyb_verified: boolean;
  pricing_model: string;
  price: number;
  currency: string;
  billing_period?: string;
  has_green_badge: boolean;
  reputation_score: number;
  review_count: number;
  status?: string;
  version?: string;
  schema_definition?: Record<string, any> | null;
  custom_metadata?: Record<string, any> | null;
}

// Star rating component
function StarRating({ rating, size = 16, interactive = false, onRate }: { 
  rating: number; 
  size?: number; 
  interactive?: boolean; 
  onRate?: (r: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          style={{ width: size, height: size }}
          fill={s <= rating ? 'hsl(var(--primary))' : 'none'}
          stroke={s <= rating ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
          onClick={() => interactive && onRate?.(s)}
        />
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isWeb3Connected, connectWallet, user } = useAuth();
  const { isDemo, activeOrgId } = useOrganizationContext();

  // Review form state
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // --- Fetch Data (Marketplace View) ---
  const { data: product, isLoading } = useQuery<MarketplaceListing>({
    queryKey: ["product-detail", id],
    queryFn: async (): Promise<MarketplaceListing> => {
      // Intentar leer de la vista marketplace
      const { data, error } = await supabase
        .from('marketplace_listings' as any)
        .select('*')
        .eq('asset_id', id)
        .maybeSingle();

      if (!error && data) {
        const { data: assetExtra } = await supabase
          .from('data_assets')
          .select(`
            custom_metadata,
            sample_data,
            product:data_products(schema_definition, version, description)
          `)
          .eq('id', id)
          .maybeSingle();

        const listing = data as any;
        return {
          ...listing,
          asset_id: listing.asset_id,
          asset_name: listing.product_name || 'Dataset',
          asset_description: listing.product_description || (assetExtra?.product as any)?.description,
          product_name: listing.product_name,
          category: listing.category || "General",
          provider_id: listing.provider_id,
          provider_name: listing.provider_name || 'Proveedor',
          seller_category: listing.seller_category || "Enterprise",
          kyb_verified: listing.kyb_verified ?? true,
          pricing_model: listing.pricing_model || 'subscription',
          price: listing.price || 0,
          currency: listing.currency || 'EUR',
          billing_period: listing.billing_period,
          has_green_badge: listing.has_green_badge ?? false,
          reputation_score: listing.reputation_score || 0,
          review_count: listing.review_count || 0,
          version: listing.version || (assetExtra?.product as any)?.version || '1.0',
          schema_definition: (assetExtra?.product as any)?.schema_definition || null,
          custom_metadata: assetExtra?.custom_metadata as any || null,
          sample_data: (assetExtra as any)?.sample_data || null,
        } as MarketplaceListing;
      }

      // Fallback
      console.warn("Usando fallback para detalle de producto");
      const { data: asset, error: assetError } = await supabase
        .from('data_assets')
        .select(`
          id, status, pricing_model, price, currency, billing_period, custom_metadata, sample_data,
          product:data_products(name, description, category, schema_definition, version),
          org:organizations!subject_org_id(id, name)
        `)
        .eq('id', id)
        .single();
      
      if (assetError || !asset) throw new Error("Producto no encontrado");

      return {
        asset_id: asset.id,
        asset_name: (asset.product as any)?.name || 'Dataset',
        asset_description: (asset.product as any)?.description,
        product_name: (asset.product as any)?.name,
        category: (asset.product as any)?.category || "General",
        provider_id: (asset.org as any)?.id,
        provider_name: (asset.org as any)?.name || 'Proveedor',
        seller_category: "Enterprise",
        kyb_verified: true,
        pricing_model: asset.pricing_model || 'subscription',
        price: asset.price || 0,
        currency: asset.currency || 'EUR',
        billing_period: asset.billing_period || 'monthly',
        has_green_badge: true,
        reputation_score: 0,
        review_count: 0,
        status: asset.status,
        version: (asset.product as any)?.version || '1.0',
        schema_definition: (asset.product as any)?.schema_definition || null,
        custom_metadata: asset.custom_metadata as any || null,
        sample_data: (asset as any).sample_data || null,
      } as MarketplaceListing;
    }
  });

  // === QUERY: Verified Access (completed transaction) ===
  const { data: hasVerifiedAccess } = useQuery({
    queryKey: ['verified-access', id, activeOrgId],
    queryFn: async () => {
      const { data } = await supabase
        .from('data_transactions')
        .select('id')
        .eq('asset_id', id!)
        .eq('consumer_org_id', activeOrgId!)
        .eq('status', 'completed')
        .limit(1);
      return (data && data.length > 0);
    },
    enabled: !!id && !!activeOrgId,
  });

  // === QUERY: Asset Reviews ===
  const { data: reviews = [] } = useQuery({
    queryKey: ['asset-reviews', id],
    queryFn: async () => {
      const { data: txs } = await supabase
        .from('data_transactions')
        .select('id')
        .eq('asset_id', id!);
      const txIds = txs?.map(t => t.id) || [];
      if (txIds.length === 0) return [];
      const { data } = await supabase
        .from('organization_reviews')
        .select('id, rating, comment, created_at, reviewer_org_id, target_org_id')
        .in('transaction_id', txIds);
      
      if (!data || data.length === 0) return [];

      // Fetch reviewer org names
      const reviewerIds = [...new Set(data.map(r => r.reviewer_org_id))];
      const { data: orgs } = await supabase
        .from('organizations')
        .select('id, name')
        .in('id', reviewerIds);
      const orgMap = new Map((orgs || []).map(o => [o.id, o.name]));

      return data.map(r => ({
        ...r,
        reviewer_name: orgMap.get(r.reviewer_org_id) || 'Organización',
      }));
    },
    enabled: !!id,
  });

  // Dynamic rating calculations
  const { avgRating, reviewCount } = useMemo(() => {
    if (!reviews || reviews.length === 0) return { avgRating: 0, reviewCount: 0 };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return { avgRating: Math.round((sum / reviews.length) * 10) / 10, reviewCount: reviews.length };
  }, [reviews]);

  // Check if current org already left a review
  const hasLeftReview = useMemo(() => {
    return reviews.some(r => r.reviewer_org_id === activeOrgId);
  }, [reviews, activeOrgId]);

  // === MUTATION: Submit Review ===
  const submitReview = useMutation({
    mutationFn: async () => {
      // Get a completed transaction for this asset by this org
      const { data: tx } = await supabase
        .from('data_transactions')
        .select('id, holder_org_id')
        .eq('asset_id', id!)
        .eq('consumer_org_id', activeOrgId!)
        .eq('status', 'completed')
        .limit(1)
        .single();
      
      if (!tx) throw new Error('No transaction found');

      const { error } = await supabase
        .from('organization_reviews')
        .insert({
          transaction_id: tx.id,
          reviewer_org_id: activeOrgId!,
          target_org_id: tx.holder_org_id,
          rating: reviewRating,
          comment: reviewComment || null,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Reseña publicada correctamente");
      setReviewRating(0);
      setReviewComment("");
      queryClient.invalidateQueries({ queryKey: ['asset-reviews', id] });
    },
    onError: () => {
      toast.error("Error al publicar la reseña");
    },
  });

  // === GUARDIA DE SEGURIDAD ===
  const shouldBlockAccess = isDemo || !activeOrgId;
  const accessPolicyRaw = product?.custom_metadata?.access_policy as Record<string, any> | undefined;
  const allowedWallets = accessPolicyRaw?.allowed_wallets;
  const deniedWallets = accessPolicyRaw?.denied_wallets;
  const isAllowlistBlocked = Array.isArray(allowedWallets) && allowedWallets.length > 0 && !allowedWallets.includes(activeOrgId);
  const isDenylistBlocked = Array.isArray(deniedWallets) && deniedWallets.includes(activeOrgId);

  useEffect(() => {
    if (!isLoading && shouldBlockAccess) {
      toast.warning("Detalle de activos solo disponible para organizaciones registradas.");
      navigate("/catalog", { replace: true });
    }
  }, [isLoading, shouldBlockAccess, navigate]);

  useEffect(() => {
    if (!isLoading && product && isAllowlistBlocked) {
      toast.error("Acceso denegado: tu organización no tiene permisos para ver este activo.");
      navigate("/catalog", { replace: true });
    }
  }, [isLoading, product, isAllowlistBlocked, navigate]);

  if (isLoading) return <ProductSkeleton />;
  if (!product) return <div className="container py-20 text-center">Producto no encontrado</div>;
  if (shouldBlockAccess) return <ProductSkeleton />;
  if (isAllowlistBlocked) return <ProductSkeleton />;

  // Pending validation screen
  if (product.status === "pending") {
    return (
      <div className="container py-8 fade-in min-h-screen bg-muted/10">
        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:underline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-center">Activo en proceso de validación técnica</h1>
          <p className="text-muted-foreground text-center max-w-md">
            Un administrador del ecosistema está verificando la calidad y conectividad de este activo. Se le notificará una vez esté disponible.
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-1">
            <Clock className="h-4 w-4 mr-2" /> Pendiente de revisión
          </Badge>
        </div>
      </div>
    );
  }

  const isPaid = product.price > 0;
  const schemaColumns = product.schema_definition && Array.isArray((product.schema_definition as any).columns)
    ? (product.schema_definition as any).columns
    : [];
  const schemaFieldCount = schemaColumns.length;

  const sanitizeFileName = (name: string): string => {
    return name
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_ ]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 50);
  };

  const handleDownloadSheet = () => {
    const customMeta = product.custom_metadata || {} as any;
    const accessPolicyData = customMeta.access_policy || {};

    const sheet = {
      informacion_general: {
        nombre: product.asset_name,
        descripcion: product.asset_description,
        categoria: product.category,
        proveedor: product.provider_name,
        version: product.version,
        precio: product.price,
        moneda: product.currency,
        modelo_precio: product.pricing_model,
        fecha_publicacion: customMeta.published_at || null,
        idioma: customMeta.language || null,
      },
      esquema_tecnico: {
        campos: schemaColumns,
        numero_de_campos: schemaFieldCount,
        formato: "JSON / API",
      },
      politicas_de_gobernanza: {
        permisos: accessPolicyData.permissions || [],
        prohibiciones: accessPolicyData.prohibitions || [],
        obligaciones: accessPolicyData.obligations || [],
        terminos_url: accessPolicyData.terms_url || null,
      },
      metricas_de_calidad: customMeta.quality_metrics || {},
    };

    const blob = new Blob([JSON.stringify(sheet, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const cleanName = sanitizeFileName(product.asset_name || 'Activo');
    a.download = `${cleanName}_Ficha_Tecnica.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Ficha técnica descargada");
  };

  // Sample data: use real data or show empty state
  const sampleData = (product as any).sample_data;
  const hasSampleData = sampleData && (Array.isArray(sampleData) ? sampleData.length > 0 : Object.keys(sampleData).length > 0);

  const handleAction = async () => {
    if (!user) {
      toast.error("Inicia sesión para continuar", {
        description: "Necesitas una cuenta para adquirir datasets",
        action: { label: "Ir a Login", onClick: () => navigate("/auth") }
      });
      return;
    }

    if (isPaid && !isWeb3Connected) {
      toast.error("Conecta tu wallet para comprar", {
        description: "Los productos de pago requieren una wallet Web3 para completar la transacción con EUROe",
        action: {
          label: "Conectar Wallet",
          onClick: async () => {
            try {
              await connectWallet();
              toast.success("Wallet conectada", { description: "Ahora puedes continuar con la compra" });
            } catch (error) {
              toast.error("Error al conectar wallet");
            }
          }
        }
      });
      return;
    }

    navigate(`/requests/new?asset=${product.asset_id}`);
  };

  const accessPolicy = accessPolicyRaw;

  if (isDenylistBlocked) {
    return (
      <div className="container py-8 fade-in min-h-screen bg-muted/10">
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <Shield className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-center">🛡️ Acceso Denegado</h1>
          <p className="text-muted-foreground text-center max-w-md">
            Tu organización se encuentra en la lista de exclusión de este activo. Si consideras que es un error, contacta al proveedor.
          </p>
          <Button variant="outline" onClick={() => navigate("/catalog")}>
            Volver al Catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 fade-in min-h-screen bg-muted/10">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ═══ BLOQUE 1: Identidad Comercial ═══ */}
          <Card className="border bg-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="uppercase">{product.category}</Badge>
                {product.status && (
                  <Badge variant="outline">{product.status}</Badge>
                )}
                {product.has_green_badge && (
                  <Badge variant="outline" className="border-green-600 text-green-700 bg-green-50 gap-1">
                    <Leaf className="h-3 w-3" /> Sustainable Data
                  </Badge>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">{product.asset_name}</h1>
                {/* Dynamic star rating */}
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={Math.round(avgRating)} size={18} />
                  <span className="text-sm font-medium text-foreground">{avgRating > 0 ? avgRating.toFixed(1) : '—'}</span>
                  <span className="text-sm text-muted-foreground">({reviewCount} {reviewCount === 1 ? 'reseña' : 'reseñas'})</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {product.asset_description || "Este dataset proporciona información crítica para la toma de decisiones en tiempo real."}
                </p>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {product.provider_name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vendido y operado por</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{product.provider_name}</span>
                    {product.kyb_verified && (
                      <span title="Verificado KYB">
                        <ShieldCheck className="h-4 w-4 text-blue-500" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ═══ BLOQUE 2: Panel de Métricas Técnicas ═══ */}
          <Card className="border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-amber-200 dark:divide-amber-900">
                <div className="p-4 flex flex-col items-center text-center">
                  <Layers className="h-5 w-5 text-amber-600 mb-1" />
                  <span className="text-xs text-muted-foreground uppercase">Versión</span>
                  <span className="text-lg font-bold">{product.version || '1.0'}</span>
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                  <RefreshCw className="h-5 w-5 text-amber-600 mb-1" />
                  <span className="text-xs text-muted-foreground uppercase">Frecuencia</span>
                  <span className="text-lg font-bold">Tiempo Real</span>
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                  <Hash className="h-5 w-5 text-amber-600 mb-1" />
                  <span className="text-xs text-muted-foreground uppercase">N.º Campos</span>
                  <span className="text-lg font-bold">{schemaFieldCount}</span>
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                  <Code2 className="h-5 w-5 text-amber-600 mb-1" />
                  <span className="text-xs text-muted-foreground uppercase">Formato</span>
                  <span className="text-lg font-bold">JSON / API</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ═══ BLOQUE 3: Centro de Exploración ═══ */}
          <Card className="border bg-card overflow-hidden">
            <Tabs defaultValue="schema" className="w-full">
              <div className="border-b px-6 pt-4">
                <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0 gap-0">
                  <TabsTrigger value="schema" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3">Esquema</TabsTrigger>
                  <TabsTrigger value="policies" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 gap-1">
                    <Shield className="h-3 w-3" />
                    Políticas
                  </TabsTrigger>
                  <TabsTrigger value="sample" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 gap-1">
                    <Eye className="h-3 w-3" />
                    Muestra
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 gap-1">
                    <Bot className="h-3 w-3" />
                    Asistente IA
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 gap-1">
                    <Star className="h-3 w-3" />
                    Reseñas
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab: Esquema */}
              <TabsContent value="schema" className="m-0 p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    Definición del Esquema
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Estructura de datos del producto ({schemaFieldCount} campos)
                  </p>
                </div>
                {schemaColumns.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campo</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Descripción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schemaColumns.map((col: any, i: number) => (
                        <TableRow key={col.field || col.name || i}>
                          <TableCell className="font-mono text-sm font-medium text-foreground">{col.field || col.name || '—'}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {col.type || 'unknown'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {col.description || '—'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
                      <Code2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-semibold mb-1">Esquema no disponible</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Este activo no tiene un esquema técnico definido.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Tab: Políticas de Uso */}
              <TabsContent value="policies" className="m-0 p-6 space-y-4">
                {/* Permisos (Verde) */}
                <div className="rounded-lg border border-green-200 dark:border-green-900 p-4">
                  <h4 className="flex items-center gap-2 text-green-700 dark:text-green-400 text-base font-semibold mb-3">
                    <CheckCircle2 className="h-5 w-5" />
                    Permisos
                  </h4>
                  <ul className="space-y-2">
                    {(accessPolicy?.permissions as string[] || ["Uso comercial permitido", "Análisis interno"]).map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prohibiciones (Rojo) */}
                <div className="rounded-lg border border-red-200 dark:border-red-900 p-4">
                  <h4 className="flex items-center gap-2 text-red-700 dark:text-red-400 text-base font-semibold mb-3">
                    <XCircle className="h-5 w-5" />
                    Prohibiciones
                  </h4>
                  <ul className="space-y-2">
                    {(accessPolicy?.prohibitions as string[] || ["Redistribución a terceros", "Uso para training IA sin consentimiento"]).map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Obligaciones (Azul) */}
                <div className="rounded-lg border border-blue-200 dark:border-blue-900 p-4">
                  <h4 className="flex items-center gap-2 text-blue-700 dark:text-blue-400 text-base font-semibold mb-3">
                    <AlertCircle className="h-5 w-5" />
                    Obligaciones
                  </h4>
                  <ul className="space-y-2">
                    {(accessPolicy?.obligations as string[] || ["Conformidad RGPD", "Notificación de brechas en 72h"]).map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Términos y Condiciones */}
                {accessPolicy?.terms_url && (
                  <div className="rounded-lg border border-muted p-4 flex items-center gap-3">
                    <ExternalLink className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Términos y Condiciones</p>
                      <a 
                        href={String(accessPolicy.terms_url)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Consultar documento completo
                      </a>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Tab: Muestra */}
              <TabsContent value="sample" className="m-0 p-6">
                {hasSampleData ? (
                  <>
                    <Alert className="mb-4 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900">
                      <Activity className="h-4 w-4 text-yellow-600" />
                      <AlertTitle className="text-yellow-800 dark:text-yellow-200">⚠️ MUESTRA DE DATOS</AlertTitle>
                      <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                        Estos registros están anonimizados y contienen ruido estadístico añadido por seguridad. Los datos reales pueden variar en formato y contenido.
                      </AlertDescription>
                    </Alert>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Data Sandbox - Vista Previa
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explora una muestra de {Array.isArray(sampleData) ? sampleData.length : 1} registros para evaluar la estructura y calidad del dataset.
                      </p>
                    </div>
                    <ArrayDataView data={sampleData} schemaType="sample_data" />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-semibold">Muestra no disponible</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      El proveedor no ha proporcionado una muestra de datos para este activo. Puede solicitar más información técnica antes de realizar la compra.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Tab: Asistente IA */}
              <TabsContent value="chat" className="m-0">
                <AssetDetailChatAgent product={product} schemaColumns={schemaColumns} />
              </TabsContent>

              {/* Tab: Reseñas */}
              <TabsContent value="reviews" className="m-0 p-6 space-y-6">
                {/* Existing reviews */}
                {reviews.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Reseñas verificadas ({reviewCount})
                    </h3>
                    <div className="space-y-3">
                      {reviews.map((review) => (
                        <div key={review.id} className="rounded-lg border p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                                  {(review.reviewer_name || 'O').substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{review.reviewer_name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(review.created_at).toLocaleDateString('es-ES')}
                            </span>
                          </div>
                          <StarRating rating={review.rating} size={14} />
                          {review.comment && (
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Review form or access message */}
                {hasVerifiedAccess && !hasLeftReview ? (
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-4">
                    <h4 className="text-sm font-semibold">Deja tu reseña</h4>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Puntuación</label>
                      <StarRating rating={reviewRating} size={24} interactive onRate={setReviewRating} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Comentario (opcional)</label>
                      <Textarea
                        placeholder="Describe tu experiencia con este dataset..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => submitReview.mutate()}
                      disabled={reviewRating === 0 || submitReview.isPending}
                    >
                      {submitReview.isPending ? "Publicando..." : "Publicar Reseña"}
                    </Button>
                  </div>
                ) : hasVerifiedAccess && hasLeftReview ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Ya has publicado tu reseña para este activo.
                    </p>
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center">
                      <Star className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">Aún no hay reseñas</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Solo las organizaciones que han adquirido este activo pueden dejar una reseña.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Solo las organizaciones que han adquirido este activo pueden dejar una reseña.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR DE CONFIANZA (STICKY) --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <Card className="border-t-4 border-t-primary shadow-lg">
              <CardHeader className="pb-4">
                <CardDescription>Licencia de uso comercial</CardDescription>
                <div className="flex items-baseline gap-1 mt-2">
                  {isPaid ? (
                    <>
                      <span className="text-3xl font-bold">
                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: product.currency }).format(product.price)}
                      </span>
                      {product.pricing_model === 'subscription' && (
                        <span className="text-sm text-muted-foreground font-medium">
                          / {product.billing_period === 'monthly' ? 'mes' : 'año'}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-green-600">Gratis</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pb-4">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-xs flex items-start gap-2">
                  <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Transacción segura vía Smart Contract y auditada en Blockchain privada.</span>
                </div>

                {isPaid && (
                  <div className={`p-3 rounded text-xs flex items-center gap-2 ${
                    isWeb3Connected 
                      ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900"
                      : "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900"
                  }`}>
                    <Wallet className="h-4 w-4 shrink-0" />
                    <span>
                      {isWeb3Connected 
                        ? "Wallet conectada - Listo para pagar con EUROe"
                        : "Conecta tu wallet para pagar con EUROe"
                      }
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                {hasVerifiedAccess ? (
                  <Button 
                    size="lg" 
                    className="w-full text-base font-semibold" 
                    onClick={() => navigate('/data')}
                  >
                    <Eye className="mr-2 h-5 w-5" /> Explorar Dataset
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    className="w-full text-base font-semibold" 
                    onClick={handleAction}
                    disabled={isDemo}
                  >
                    {isDemo ? (
                      <>
                        <Lock className="mr-2 h-5 w-5" /> Solicitudes no disponibles en demo
                      </>
                    ) : isPaid ? (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" /> Comprar Ahora
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-5 w-5" /> Solicitar Acceso
                      </>
                    )}
                  </Button>
                )}
                <Button variant="outline" className="w-full" size="lg" onClick={handleDownloadSheet}>
                  <Download className="mr-2 h-4 w-4" /> Descargar Ficha Técnica
                </Button>
              </CardFooter>
            </Card>

            {/* Summary Table */}
            <Card>
              <CardContent className="p-4">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-muted-foreground text-sm py-2">Proveedor</TableCell>
                      <TableCell className="text-sm py-2 text-right font-medium">{product.provider_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-muted-foreground text-sm py-2">Versión</TableCell>
                      <TableCell className="text-sm py-2 text-right font-medium">{product.version || '1.0'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-muted-foreground text-sm py-2">Estado</TableCell>
                      <TableCell className="text-sm py-2 text-right">
                        <Badge variant="secondary" className="text-xs">{product.status || 'Disponible'}</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Support Box */}
            <div className="text-center">
              <Button variant="link" className="text-muted-foreground text-xs">
                ¿Necesitas una licencia personalizada? Contactar ventas
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="container py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
      <div className="lg:col-span-1">
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  );
}
