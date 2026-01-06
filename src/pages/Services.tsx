import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  BrainCircuit, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Zap,
  Search,
  Car,
  MapPin,
  BatteryCharging,
  Leaf,
  Sun,
  Users,
  Dna,
  Thermometer,
  Tag,
  MessageCircle,
  ShieldAlert,
  Lock,
  Banknote,
  Anchor,
  Truck,
  FileCheck,
  Droplet,
  Wheat,
  Link,
  HardHat,
  Ruler,
  Shield,
  Plane,
  Fuel,
  Scale,
  DatabaseZap,
  Blocks,
  CheckCircle,
  FileText,
  Award,
  Activity,
  ArrowRightLeft,
  Plug,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ServiceInteractiveWidget } from "@/components/services/ServiceInteractiveWidget";
import { ServiceMetrics } from "@/components/services/ServiceMetrics";
import { ServicePopularityBadge } from "@/components/services/ServicePopularityBadge";

const iconMap: Record<string, any> = {
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
  Car,
  MapPin,
  BatteryCharging,
  Leaf,
  Sun,
  Users,
  Dna,
  Thermometer,
  Tag,
  MessageCircle,
  ShieldAlert,
  Lock,
  Banknote,
  Anchor,
  Truck,
  FileCheck,
  Droplet,
  Wheat,
  Link,
  HardHat,
  Ruler,
  Shield,
  Plane,
  Fuel,
  Scale,
  DatabaseZap,
  Blocks,
  Award,
  Activity,
  ArrowRightLeft,
  Plug,
  VenetianMask: Lock, // Fallback since VenetianMask doesn't exist
};
const Services = () => {
  const { activeOrg } = useOrganizationContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: services, isLoading } = useQuery({
    queryKey: ["value-services", activeOrg?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("value_services")
        .select(`
          *,
          provider:organizations!provider_org_id (id, name, sector, type)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleActivateService = (serviceName: string) => {
    toast.success(`Servicio "${serviceName}" activado correctamente`, {
      description: "Los resultados aparecerán en tu Dashboard en 24h.",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      // Nuevas categorías PROCUREDATA
      "Sostenibilidad": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
      "Privacidad": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
      "IA & Analytics": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      "Compliance": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
      "Data Ops": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
      "Blockchain": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      // Categorías existentes
      "Mantenimiento": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Logística": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "Certificación": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Operaciones": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "ESG": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
      "Analítica": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
      "I+D": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      "Bioinformática": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      "Ventas": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Marketing": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "Seguridad": "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
      "Riesgo": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      "Legal": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
      "Financiación": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
      "IoT": "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
      "Ingeniería": "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200",
      "IT": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
      "IA": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const formatPrice = (price: number | null, currency: string, priceModel: string | null) => {
    if (price === null || price === 0) {
      return "Gratis";
    }
    
    // Use EUROe format for consistency with PROCUREDATA
    const formatted = `${price} EUROe`;
    
    return priceModel === "subscription" 
      ? `${formatted}/mes` 
      : `${formatted}/uso`;
  };

  // Simulated subscription state
  const [subscribedServices, setSubscribedServices] = useState<string[]>([]);

  const handleSubscribe = (serviceId: string, serviceName: string, price: number | null) => {
    if (subscribedServices.includes(serviceId)) return;

    const priceText = price && price > 0 ? `${price} EUROe` : "gratuito";
    toast.loading(`Procesando pago de ${priceText}...`, { id: "payment" });
    
    setTimeout(() => {
      setSubscribedServices(prev => [...prev, serviceId]);
      toast.success(`Servicio "${serviceName}" activado correctamente`, {
        id: "payment",
        description: "Ya puedes usarlo desde tu Dashboard.",
      });
    }, 1500);
  };

  // Filter and sort services
  const { myServices, marketplaceServices } = useMemo(() => {
    if (!services || !activeOrg) return { myServices: [], marketplaceServices: [] };

    const my = services.filter(s => s.provider_org_id === activeOrg.id);
    const marketplace = services.filter(s => s.provider_org_id !== activeOrg.id);

    // Sort marketplace by sector relevance
    const sorted = [...marketplace].sort((a, b) => {
      const aSameSector = a.provider?.sector === activeOrg.sector ? 1 : 0;
      const bSameSector = b.provider?.sector === activeOrg.sector ? 1 : 0;
      return bSameSector - aSameSector;
    });

    return { myServices: my, marketplaceServices: sorted };
  }, [services, activeOrg]);

  // Apply search and category filters
  const filterServices = (serviceList: typeof services) => {
    if (!serviceList) return [];
    
    return serviceList.filter(service => {
      const matchesSearch = searchQuery === "" || 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  };

  // Get all unique categories
  const categories = useMemo(() => {
    if (!services) return [];
    const cats = new Set(services.map(s => s.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [services]);

  const isProvider = activeOrg?.type === 'provider' || activeOrg?.type === 'data_holder';

  const renderServiceGrid = (serviceList: typeof services) => {
    const filtered = filterServices(serviceList);

    if (filtered.length === 0) {
      return (
        <Card>
          <CardContent className="py-12 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron servicios</h3>
            <p className="text-sm text-muted-foreground">
              Intenta ajustar los filtros de búsqueda.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service, index) => {
          const IconComponent = iconMap[service.icon_name] || Sparkles;
          const isSameSector = service.provider?.sector === activeOrg?.sector;
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Card 
                className={`h-full hover:shadow-xl transition-all cursor-pointer ${isSameSector ? 'ring-2 ring-primary/20' : ''}`}
                onClick={() => navigate(`/services/${service.id}`)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <div className="flex gap-1">
                        <Badge className={getCategoryColor(service.category)}>
                          {service.category}
                        </Badge>
                        <ServicePopularityBadge 
                          serviceName={service.name}
                          price={service.price}
                          createdAt={service.created_at}
                        />
                      </div>
                      {isSameSector && (
                        <Badge variant="outline" className="text-xs">
                          Recomendado
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription>
                    {service.provider?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Interactive Widget */}
                  <ServiceInteractiveWidget 
                    category={service.category || "default"} 
                    serviceName={service.name}
                  />

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features List */}
                  {service.features && Array.isArray(service.features) && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {(service.features as string[]).slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                          <Check className="h-3 w-3 text-green-500" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Metrics Row */}
                  <ServiceMetrics serviceName={service.name} />
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-lg font-bold">
                        {formatPrice(service.price, service.currency || 'EUR', service.price_model)}
                      </p>
                      {service.price === 0 && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Core Service
                        </Badge>
                      )}
                    </div>
                    {subscribedServices.includes(service.id) ? (
                      <Badge className="bg-green-500/20 text-green-600 border-green-500/30 py-2 px-4">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Activo
                      </Badge>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/services/${service.id}`);
                          }}
                          className="gap-1"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="hidden sm:inline">Docs</span>
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubscribe(service.id, service.name, service.price);
                          }}
                          className="gap-1"
                        >
                          <Zap className="h-4 w-4" />
                          {service.price === 0 ? "Gratis" : "Suscribir"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace de Servicios</h1>
          <p className="text-muted-foreground">
            Algoritmos y servicios de valor añadido para procesar tus datos
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar servicios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              Todos
            </Button>
            {categories.slice(0, 5).map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isProvider ? (
          <Tabs defaultValue="marketplace" className="w-full">
            <TabsList>
              <TabsTrigger value="marketplace">Mercado Global</TabsTrigger>
              <TabsTrigger value="my-services">
                Mis Servicios ({myServices.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="marketplace" className="mt-6">
              {renderServiceGrid(marketplaceServices)}
            </TabsContent>
            <TabsContent value="my-services" className="mt-6">
              {renderServiceGrid(myServices)}
            </TabsContent>
          </Tabs>
        ) : (
          renderServiceGrid(marketplaceServices)
        )}
      </div>
    </div>
  );
};

export default Services;
