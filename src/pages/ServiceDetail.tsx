import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { 
  ArrowLeft, 
  CheckCircle, 
  Zap, 
  Code, 
  FileText, 
  Puzzle, 
  Copy,
  ExternalLink,
  BrainCircuit, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Leaf,
  ShieldAlert,
  Scale,
  DatabaseZap,
  Blocks,
  Tag
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const iconMap: Record<string, any> = {
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Leaf,
  ShieldAlert,
  Scale,
  DatabaseZap,
  Blocks
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Sostenibilidad": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    "Privacidad": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
    "IA & Analytics": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    "Compliance": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
    "Data Ops": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    "Blockchain": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  };
  return colors[category] || "bg-muted text-muted-foreground";
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [codeTab, setCodeTab] = useState("curl");

  const { data: service, isLoading, error } = useQuery({
    queryKey: ["service-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("value_services")
        .select(`
          *,
          provider:organizations!provider_org_id (id, name, sector, type)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleSubscribe = () => {
    if (isSubscribed) return;

    const priceText = service?.price && service.price > 0 ? `${service.price} EUROe` : "gratuito";
    toast.loading(`Procesando pago de ${priceText}...`, { id: "payment" });
    
    setTimeout(() => {
      setIsSubscribed(true);
      toast.success(`Servicio "${service?.name}" activado correctamente`, {
        id: "payment",
        description: "Ya puedes usarlo desde tu Dashboard.",
      });
    }, 1500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Código ${label} copiado al portapapeles`);
  };

  const formatPrice = (price: number | null, priceModel: string | null) => {
    if (price === null || price === 0) return "Gratis";
    return priceModel === "subscription" 
      ? `${price} EUROe/mes` 
      : `${price} EUROe/uso`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-64" />
            <Skeleton className="h-96" />
          </div>
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="py-12 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Servicio no encontrado</h3>
            <p className="text-sm text-muted-foreground mb-4">
              El servicio que buscas no existe o ha sido eliminado.
            </p>
            <Button onClick={() => navigate("/services")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon_name] || Sparkles;
  const codeExamples = (service as any).code_examples || {};
  const integrations = (service as any).integrations || [];
  const features = (service as any).features || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Breadcrumb */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/services")}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al Marketplace
        </Button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="p-4 rounded-xl bg-primary/10">
            <IconComponent className="h-10 w-10 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className={getCategoryColor(service.category || "")}>
                {service.category}
              </Badge>
              {(service as any).version && (
                <Badge variant="outline">v{(service as any).version}</Badge>
              )}
              {service.price === 0 && (
                <Badge variant="secondary">Core Service</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
            <p className="text-muted-foreground">
              {service.provider?.name ? `Por ${service.provider.name}` : "PROCUREDATA Platform"}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description" className="gap-2">
                  <FileText className="h-4 w-4 hidden sm:block" />
                  Descripción
                </TabsTrigger>
                <TabsTrigger value="documentation" className="gap-2">
                  <FileText className="h-4 w-4 hidden sm:block" />
                  Documentación
                </TabsTrigger>
                <TabsTrigger value="examples" className="gap-2">
                  <Code className="h-4 w-4 hidden sm:block" />
                  Ejemplos
                </TabsTrigger>
                <TabsTrigger value="integrations" className="gap-2">
                  <Puzzle className="h-4 w-4 hidden sm:block" />
                  Integraciones
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Descripción del Servicio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    {features.length > 0 && (
                      <div className="pt-4 border-t">
                        <h4 className="font-semibold mb-3">Características incluidas</h4>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {features.map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(service as any).api_endpoint && (
                      <div className="pt-4 border-t">
                        <h4 className="font-semibold mb-2">Endpoint API</h4>
                        <code className="text-sm bg-muted px-3 py-2 rounded-md block">
                          https://api.procuredata.eu{(service as any).api_endpoint}
                        </code>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documentation" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentación Técnica</CardTitle>
                    <CardDescription>
                      Guía de integración y uso del servicio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(service as any).documentation_md ? (
                      <MarkdownRenderer content={(service as any).documentation_md} />
                    ) : (
                      <p className="text-muted-foreground">
                        La documentación técnica estará disponible próximamente.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ejemplos de Código</CardTitle>
                    <CardDescription>
                      Snippets listos para copiar y usar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(codeExamples).length > 0 ? (
                      <Tabs value={codeTab} onValueChange={setCodeTab}>
                        <TabsList>
                          {codeExamples.curl && <TabsTrigger value="curl">cURL</TabsTrigger>}
                          {codeExamples.python && <TabsTrigger value="python">Python</TabsTrigger>}
                          {codeExamples.javascript && <TabsTrigger value="javascript">JavaScript</TabsTrigger>}
                        </TabsList>

                        {Object.entries(codeExamples).map(([lang, code]) => (
                          <TabsContent key={lang} value={lang} className="mt-4">
                            <div className="relative">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 gap-1"
                                onClick={() => copyToClipboard(code as string, lang)}
                              >
                                <Copy className="h-4 w-4" />
                                Copiar
                              </Button>
                              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                                <code>{code as string}</code>
                              </pre>
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    ) : (
                      <p className="text-muted-foreground">
                        Los ejemplos de código estarán disponibles próximamente.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Integraciones Compatibles</CardTitle>
                    <CardDescription>
                      Otros servicios PROCUREDATA con los que puedes combinar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {integrations.length > 0 ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {integrations.map((integration: string, idx: number) => (
                          <Card key={idx} className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardContent className="p-4 flex items-center gap-3">
                              <Puzzle className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{integration}</p>
                                <p className="text-xs text-muted-foreground">Servicio compatible</p>
                              </div>
                              <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Este servicio funciona de forma independiente.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Buy Box */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {formatPrice(service.price, service.price_model)}
                </CardTitle>
                <CardDescription>
                  {service.price_model === "subscription" 
                    ? "Facturación mensual" 
                    : service.price === 0 
                      ? "Sin coste" 
                      : "Pago por uso"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.length > 0 && (
                  <ul className="space-y-2">
                    {features.slice(0, 4).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="pt-4 border-t">
                  {isSubscribed ? (
                    <div className="text-center space-y-3">
                      <Badge className="bg-green-500/20 text-green-600 border-green-500/30 py-2 px-6">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Servicio Activo
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Accede desde tu Dashboard o usa la API.
                      </p>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleSubscribe} 
                      className="w-full gap-2" 
                      size="lg"
                    >
                      <Zap className="h-5 w-5" />
                      {service.price === 0 ? "Activar Gratis" : "Suscribirse"}
                    </Button>
                  )}
                </div>

                {(service as any).api_endpoint && (
                  <div className="pt-4 border-t text-center">
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Tag className="h-3 w-3" />
                      API disponible tras la suscripción
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
