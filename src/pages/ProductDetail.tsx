import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
  ExternalLink
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

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isWeb3Connected, connectWallet, user } = useAuth();
  const { isDemo } = useOrganizationContext();

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
        // Also fetch extended data from data_assets for schema_definition and custom_metadata
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
          reputation_score: listing.reputation_score || 4.8,
          review_count: listing.review_count || 0,
          version: listing.version || (assetExtra?.product as any)?.version || '1.0',
          schema_definition: (assetExtra?.product as any)?.schema_definition || null,
          custom_metadata: assetExtra?.custom_metadata as any || null,
          sample_data: (assetExtra as any)?.sample_data || null,
        } as MarketplaceListing;
      }

      // Fallback robusto si la vista no está lista
      console.warn("Usando fallback para detalle de producto");
      const { data: asset, error: assetError } = await supabase
        .from('data_assets')
        .select(`
          id,
          status,
          pricing_model,
          price,
          currency,
          billing_period,
          custom_metadata,
          sample_data,
          product:data_products(name, description, category, schema_definition, version),
          org:organizations!subject_org_id(id, name)
        `)
        .eq('id', id)
        .single();
      
      if (assetError || !asset) {
        throw new Error("Producto no encontrado");
      }

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
        reputation_score: 4.8,
        review_count: 24,
        status: asset.status,
        version: (asset.product as any)?.version || '1.0',
        schema_definition: (asset.product as any)?.schema_definition || null,
        custom_metadata: asset.custom_metadata as any || null,
        sample_data: (asset as any).sample_data || null,
      } as MarketplaceListing;
    }
  });

  if (isLoading) return <ProductSkeleton />;
  if (!product) return <div className="container py-20 text-center">Producto no encontrado</div>;

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
    const accessPolicy = customMeta.access_policy || {};

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
        permisos: accessPolicy.permissions || [],
        prohibiciones: accessPolicy.prohibitions || [],
        obligaciones: accessPolicy.obligations || [],
        terminos_url: accessPolicy.terms_url || null,
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

  // Datos mock para la muestra
  const MOCK_SAMPLE = [
    { id: 1, timestamp: "2024-03-10T10:00:00Z", sensor_id: "S-01", value: 45.2, status: "OK" },
    { id: 2, timestamp: "2024-03-10T10:05:00Z", sensor_id: "S-01", value: 46.1, status: "OK" },
    { id: 3, timestamp: "2024-03-10T10:10:00Z", sensor_id: "S-01", value: 48.5, status: "WARNING" },
    { id: 4, timestamp: "2024-03-10T10:15:00Z", sensor_id: "S-01", value: 44.9, status: "OK" },
    { id: 5, timestamp: "2024-03-10T10:20:00Z", sensor_id: "S-01", value: 45.5, status: "OK" }
  ];

  const sampleData = (product as any).sample_data || MOCK_SAMPLE;

  const handleAction = async () => {
    if (!user) {
      toast.error("Inicia sesión para continuar", {
        description: "Necesitas una cuenta para adquirir datasets",
        action: {
          label: "Ir a Login",
          onClick: () => navigate("/auth")
        }
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
              toast.success("Wallet conectada", {
                description: "Ahora puedes continuar con la compra"
              });
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

  // Access policy from custom_metadata
  const accessPolicy = product.custom_metadata?.access_policy as Record<string, any> | undefined;

  return (
    <div className="container py-8 fade-in min-h-screen bg-muted/10">
      {/* Breadcrumb / Back */}
      <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:underline" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Catálogo
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
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
            <h1 className="text-3xl font-bold tracking-tight mb-2">{product.asset_name}</h1>
            <p className="text-muted-foreground leading-relaxed">
              {product.asset_description || "Este dataset proporciona información crítica para la toma de decisiones en tiempo real."}
            </p>
          </div>

          {/* Provider Card Mini */}
          <Card className="bg-background/50">
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
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
            </CardContent>
          </Card>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Layers className="h-5 w-5 text-amber-600 mb-1" />
                <span className="text-xs text-muted-foreground uppercase">Versión</span>
                <span className="text-lg font-bold">{product.version || '1.0'}</span>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <RefreshCw className="h-5 w-5 text-amber-600 mb-1" />
                <span className="text-xs text-muted-foreground uppercase">Frecuencia</span>
                <span className="text-lg font-bold">Tiempo Real</span>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Hash className="h-5 w-5 text-amber-600 mb-1" />
                <span className="text-xs text-muted-foreground uppercase">N.º Campos</span>
                <span className="text-lg font-bold">{schemaFieldCount}</span>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Code2 className="h-5 w-5 text-amber-600 mb-1" />
                <span className="text-xs text-muted-foreground uppercase">Formato</span>
                <span className="text-lg font-bold">JSON / API</span>
              </CardContent>
            </Card>
          </div>

          {/* Info Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="schema">Esquema</TabsTrigger>
              <TabsTrigger value="policies" className="gap-1">
                <Shield className="h-3 w-3" />
                Políticas
              </TabsTrigger>
              <TabsTrigger value="sample" className="gap-1">
                <Eye className="h-3 w-3" />
                Muestra
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-1">
                <Bot className="h-3 w-3" />
                Asistente IA
              </TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            
            {/* Tab: Descripción */}
            <TabsContent value="description" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre este activo de datos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-semibold text-foreground">Casos de Uso Comunes:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Entrenamiento de modelos predictivos (Machine Learning).</li>
                    <li>Análisis de tendencias de mercado y benchmarking.</li>
                    <li>Optimización de cadena de suministro.</li>
                    <li>Compliance y auditoría regulatoria.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Esquema */}
            <TabsContent value="schema" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    Definición del Esquema
                  </CardTitle>
                  <CardDescription>
                    Estructura de datos del producto ({schemaFieldCount} campos)
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Políticas de Uso */}
            <TabsContent value="policies" className="mt-6 space-y-4">
              {/* Permisos (Verde) */}
              <Card className="border-green-200 dark:border-green-900">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400 text-base">
                    <CheckCircle2 className="h-5 w-5" />
                    Permisos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(accessPolicy?.permissions as string[] || ["Uso comercial permitido", "Análisis interno"]).map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Prohibiciones (Rojo) */}
              <Card className="border-red-200 dark:border-red-900">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400 text-base">
                    <XCircle className="h-5 w-5" />
                    Prohibiciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(accessPolicy?.prohibitions as string[] || ["Redistribución a terceros", "Uso para training IA sin consentimiento"]).map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Obligaciones (Azul) */}
              <Card className="border-blue-200 dark:border-blue-900">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400 text-base">
                    <AlertCircle className="h-5 w-5" />
                    Obligaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(accessPolicy?.obligations as string[] || ["Conformidad RGPD", "Notificación de brechas en 72h"]).map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Términos y Condiciones */}
              {accessPolicy?.terms_url && (
                <Card className="border-muted">
                  <CardContent className="p-4 flex items-center gap-3">
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
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Tab: Muestra */}
            <TabsContent value="sample" className="mt-6">
              <Alert className="mb-4 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900">
                <Activity className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-800 dark:text-yellow-200">⚠️ MUESTRA DE DATOS</AlertTitle>
                <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                  Estos registros están anonimizados y contienen ruido estadístico añadido por seguridad. Los datos reales pueden variar en formato y contenido.
                </AlertDescription>
              </Alert>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Data Sandbox - Vista Previa
                  </CardTitle>
                  <CardDescription>
                    Explora una muestra de {sampleData.length} registros para evaluar la estructura y calidad del dataset.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ArrayDataView data={sampleData} schemaType="sample_data" />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Asistente IA */}
            <TabsContent value="chat" className="mt-6">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10">
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-5 px-6">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                      <Bot className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Asistente IA — Próximamente</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Podrás interactuar con un asistente inteligente que te ayudará a explorar el esquema, generar queries SQL de ejemplo, evaluar la calidad del dataset y obtener recomendaciones de uso personalizadas.
                    </p>
                    <Badge variant="secondary" className="text-xs">En desarrollo</Badge>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab: Reseñas */}
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="py-16">
                  <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center">
                      <Star className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">Aún no hay reseñas verificadas</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Solo las organizaciones que han completado una transacción verificada mediante Smart Contract pueden publicar reseñas. Este sistema garantiza la autenticidad de cada valoración.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* --- RIGHT COLUMN: BUY BOX (STICKY) --- */}
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

                {/* Wallet Status Indicator for paid products */}
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
