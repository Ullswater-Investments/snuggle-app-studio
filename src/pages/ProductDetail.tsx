import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, Building2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_products")
        .select(`
          *,
          data_assets (
            id,
            status,
            custom_metadata,
            subject_org:organizations!data_assets_subject_org_id_fkey (
              id,
              name,
              tax_id,
              type
            ),
            holder_org:organizations!data_assets_holder_org_id_fkey (
              id,
              name,
              tax_id,
              type
            ),
            catalog_metadata (
              visibility,
              tags,
              categories
            )
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleRequestAccess = (assetId: string) => {
    toast.info("Funcionalidad de solicitud disponible en Fase 3 (Motor de Gobernanza)");
    // En Fase 3: navigate(`/requests/new?asset=${assetId}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Producto no encontrado</p>
            <Button className="mt-4" onClick={() => navigate("/catalog")}>
              Volver al catálogo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const availableAssets = product.data_assets?.filter((a: any) => a.status === 'available') || [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
            PROCUREDATA
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/catalog")}>
              Catálogo
            </Button>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <Button variant="ghost" onClick={() => navigate("/catalog")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Información principal del producto */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Package className="h-12 w-12 text-primary" />
                  {product.category && (
                    <Badge variant="secondary" className="text-base">
                      {product.category}
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-4 text-3xl">{product.name}</CardTitle>
                <CardDescription className="text-base">
                  {product.description || "Sin descripción disponible"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Versión</h4>
                    <Badge variant="outline">{product.version}</Badge>
                  </div>
                  
                  {product.schema_definition && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Esquema de Datos</h4>
                      <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto">
                        {JSON.stringify(product.schema_definition, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Lista de activos disponibles */}
            <Card>
              <CardHeader>
                <CardTitle>Activos Disponibles ({availableAssets.length})</CardTitle>
                <CardDescription>
                  Proveedores que ofrecen este producto de datos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {availableAssets.length > 0 ? (
                  <div className="space-y-4">
                    {availableAssets.map((asset: any) => (
                      <Card key={asset.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{asset.holder_org.name}</span>
                                <Badge variant="outline">{asset.holder_org.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                CIF: {asset.holder_org.tax_id}
                              </p>
                              {asset.subject_org && (
                                <p className="text-sm text-muted-foreground">
                                  Datos de: {asset.subject_org.name}
                                </p>
                              )}
                              {asset.catalog_metadata?.tags && asset.catalog_metadata.tags.length > 0 && (
                                <div className="flex gap-1 flex-wrap">
                                  {asset.catalog_metadata.tags.map((tag: string, idx: number) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <Badge variant="default" className="gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Disponible
                              </Badge>
                              <Button size="sm" onClick={() => handleRequestAccess(asset.id)}>
                                Solicitar Datos
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      No hay activos disponibles para este producto actualmente
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral con información adicional */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de proveedores</p>
                  <p className="text-2xl font-bold">{availableAssets.length}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Creado</p>
                  <p className="text-sm">{new Date(product.created_at).toLocaleDateString('es-ES')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Última actualización</p>
                  <p className="text-sm">{new Date(product.updated_at).toLocaleDateString('es-ES')}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>¿Cómo solicitar datos?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>1. Selecciona un proveedor disponible</p>
                <p>2. Haz clic en "Solicitar Datos"</p>
                <p>3. Completa el formulario de solicitud</p>
                <p>4. Espera aprobación del titular y poseedor</p>
                <p className="text-xs mt-4 text-primary">
                  * Disponible en Fase 3 (Motor de Gobernanza)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
