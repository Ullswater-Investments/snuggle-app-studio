import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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
  Wallet
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
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isWeb3Connected, connectWallet, user } = useAuth();

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
        return data as unknown as MarketplaceListing;
      }

      // Fallback robusto si la vista no está lista
      console.warn("Usando fallback para detalle de producto");
      const { data: asset, error: assetError } = await supabase
        .from('data_assets')
        .select(`
          id,
          pricing_model,
          price,
          currency,
          billing_period,
          product:data_products(name, description, category),
          org:organizations!subject_org_id(id, name)
        `)
        .eq('id', id)
        .single();
      
      if (assetError || !asset) {
        throw new Error("Producto no encontrado");
      }

      // Mapeo a estructura comercial
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
        price: asset.price || 450,
        currency: asset.currency || 'EUR',
        billing_period: asset.billing_period || 'monthly',
        has_green_badge: true,
        reputation_score: 4.8,
        review_count: 24
      };
    }
  });

  if (isLoading) return <ProductSkeleton />;
  if (!product) return <div className="container py-20 text-center">Producto no encontrado</div>;

  const isPaid = product.price > 0;

  // Datos mock para la vista previa (sandbox)
  const MOCK_SAMPLE = [
    { id: 1, timestamp: "2024-03-10T10:00:00Z", sensor_id: "S-01", value: 45.2, status: "OK" },
    { id: 2, timestamp: "2024-03-10T10:05:00Z", sensor_id: "S-01", value: 46.1, status: "OK" },
    { id: 3, timestamp: "2024-03-10T10:10:00Z", sensor_id: "S-01", value: 48.5, status: "WARNING" },
    { id: 4, timestamp: "2024-03-10T10:15:00Z", sensor_id: "S-01", value: 44.9, status: "OK" },
    { id: 5, timestamp: "2024-03-10T10:20:00Z", sensor_id: "S-01", value: 45.5, status: "OK" }
  ];

  const sampleData = (product as any).sample_data || MOCK_SAMPLE;

  const handleAction = async () => {
    // Check if user is authenticated
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

    // For paid products, verify wallet is connected
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

    // Proceed to request wizard with preselected asset
    navigate("/requests/new", { state: { preselectedAssetId: product.asset_id } });
  };

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
              {product.has_green_badge && (
                <Badge variant="outline" className="border-green-600 text-green-700 bg-green-50 gap-1">
                  <Leaf className="h-3 w-3" /> Sustainable Data
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{product.asset_name}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">{product.reputation_score}</span>
                <span>({product.review_count} reseñas)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>Versión 2.1 (Live)</span>
              </div>
            </div>
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

          {/* Info Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Descripción</TabsTrigger>
              <TabsTrigger value="specs">Especificaciones</TabsTrigger>
              <TabsTrigger value="preview" className="gap-1">
                <Eye className="h-3 w-3" />
                Vista Previa
              </TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre este activo de datos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="leading-relaxed text-muted-foreground">
                    {product.asset_description || "Este dataset proporciona información crítica para la toma de decisiones en tiempo real. Incluye históricos validados y limpieza de datos automatizada."}
                  </p>
                  
                  <h3 className="font-semibold text-foreground mt-4">Casos de Uso Comunes:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Entrenamiento de modelos predictivos (Machine Learning).</li>
                    <li>Análisis de tendencias de mercado y benchmarking.</li>
                    <li>Optimización de cadena de suministro.</li>
                    <li>Compliance y auditoría regulatoria.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase font-bold">Formato</span>
                      <p className="font-medium">JSON / CSV (API Rest)</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase font-bold">Frecuencia</span>
                      <p className="font-medium">Tiempo Real (Webhook)</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase font-bold">Protocolo</span>
                      <p className="font-medium">HTTPS / EDC (DSP)</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase font-bold">Cobertura</span>
                      <p className="font-medium">Global (Multi-región)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="mt-6">
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
                    Explora una muestra de {sampleData.length} registros para evaluar la estructura y calidad del dataset antes de comprarlo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ArrayDataView data={sampleData} schemaType="sample_data" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Alert>
                <Activity className="h-4 w-4" />
                <AlertTitle>Opiniones Verificadas</AlertTitle>
                <AlertDescription>
                  Solo las organizaciones que han completado una transacción mediante Smart Contract pueden dejar una reseña.
                </AlertDescription>
              </Alert>
              {/* Placeholder para reviews */}
              <div className="mt-4 space-y-4">
                {[1, 2].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold text-sm">Consumer Corp {i}</div>
                        <div className="flex">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">"Excelente calidad de datos, integración muy rápida gracias a la documentación ODRL."</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Acceso Inmediato (API)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>SLA Garantizado 99.9%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Soporte Técnico 24/7</span>
                  </div>
                </div>
                
                <Separator />

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
                
                <div className="bg-muted/50 p-3 rounded text-xs text-muted-foreground flex gap-2">
                  <Lock className="h-4 w-4 shrink-0" />
                  <span>Transacción segura vía Smart Contract y auditada en Blockchain privada.</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full text-base font-semibold" onClick={handleAction}>
                  {isPaid ? (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" /> Comprar Ahora
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" /> Solicitar Acceso
                    </>
                  )}
                </Button>
              </CardFooter>
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
        <Skeleton className="h-64 w-full" />
      </div>
      <div className="lg:col-span-1">
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  );
}
