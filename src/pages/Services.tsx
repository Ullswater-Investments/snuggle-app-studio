import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BrainCircuit, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";
import { toast } from "sonner";

const iconMap: Record<string, any> = {
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap
};

const Services = () => {
  const { activeOrg } = useOrganizationContext();
  const { data: services, isLoading } = useQuery({
    queryKey: ["value-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("value_services")
        .select(`
          *,
          provider:organizations!provider_org_id (name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleActivateService = (serviceName: string) => {
    toast.success(`Servicio "${serviceName}" activado correctamente`, {
      description: "El servicio comenzará a procesar tus datos en breve.",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "AI Prediction": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Compliance": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Analytics": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const getPriceLabel = (priceModel: string) => {
    return priceModel === "subscription" ? "Suscripción mensual" : "Pago por uso";
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

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
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
        ) : services && services.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon_name] || Sparkles;
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <Badge className={getCategoryColor(service.category)}>
                        {service.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription>
                      Proveedor: {service.provider?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm">
                        <p className="font-medium">{getPriceLabel(service.price_model)}</p>
                      </div>
                      <Button
                        onClick={() => handleActivateService(service.name)}
                        className="gap-2"
                      >
                        <Zap className="h-4 w-4" />
                        Activar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Sparkles className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay servicios disponibles</h3>
              <p className="text-sm text-muted-foreground">
                Pronto habrá nuevos servicios disponibles en el marketplace.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Services;
