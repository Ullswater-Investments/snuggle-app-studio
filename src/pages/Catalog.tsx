import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Catalog = () => {
  const navigate = useNavigate();
  const { activeOrg, isDemo } = useOrganizationContext();

  // Query to get assets based on organization role
  const { data: assets, isLoading } = useQuery({
    queryKey: ["catalog-assets", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return [];

      let query = supabase
        .from("data_assets")
        .select(`
          *,
          product:data_products(*),
          metadata:catalog_metadata(*),
          holder:organizations!data_assets_holder_org_id_fkey(name, type, sector),
          subject:organizations!data_assets_subject_org_id_fkey(name, type, sector)
        `)
        .eq("status", "available");

      // Role-based filtering
      if (activeOrg.type === 'provider' || activeOrg.type === 'data_holder') {
        // Show only OWN products
        query = query.or(`holder_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id}`);
      } else {
        // Consumer: Show products from OTHER organizations
        query = query.not('holder_org_id', 'eq', activeOrg.id).not('subject_org_id', 'eq', activeOrg.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Sort by sector relevance for consumers
      if (activeOrg.type === 'consumer' && activeOrg.sector && data) {
        return data.sort((a, b) => {
          const aRelevant = a.product?.category === activeOrg.sector;
          const bRelevant = b.product?.category === activeOrg.sector;
          if (aRelevant && !bRelevant) return -1;
          if (!aRelevant && bRelevant) return 1;
          return 0;
        });
      }
      
      return data;
    },
    enabled: !!activeOrg,
  });

  const isProvider = activeOrg?.type === 'provider' || activeOrg?.type === 'data_holder';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {isProvider ? 'Mi Catálogo de Productos' : 'Marketplace de Datos'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isProvider 
              ? 'Gestiona los productos que ofreces en el marketplace'
              : `Explora productos de datos${activeOrg?.sector ? ` relevantes para ${activeOrg.sector}` : ''}`
            }
          </p>
        </div>
        {isProvider && (
          <Button onClick={() => navigate("/catalog/new")}>
            <Package className="mr-2 h-4 w-4" />
            Crear Producto
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : assets && assets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset: any) => (
            <Card
              key={asset.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/catalog/product/${asset.product.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Package className="h-8 w-8 text-primary" />
                  <div className="flex gap-2 flex-wrap">
                    {asset.product?.category && (
                      <Badge variant="secondary">{asset.product.category}</Badge>
                    )}
                    {asset.holder_org_id === activeOrg?.id && (
                      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/30">
                        Propio
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="mt-4">{asset.product?.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {asset.product?.description || "Sin descripción"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Proveedor</span>
                    <span className="font-medium">{asset.holder?.name || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Versión</span>
                    <Badge variant="outline">{asset.product?.version}</Badge>
                  </div>
                </div>
                <Button className="mt-4 w-full" variant={isProvider ? "outline" : "default"}>
                  {isProvider ? "Ver Detalles" : "Solicitar Acceso"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {isProvider ? 'No tienes productos publicados' : 'No hay productos disponibles'}
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              {isProvider 
                ? 'Comienza a ofrecer tus datos en el marketplace'
                : activeOrg?.sector 
                  ? `No hay productos disponibles para tu sector (${activeOrg.sector}) en este momento`
                  : 'Aún no hay productos de datos en el catálogo'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Catalog;
