import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Download, Eye, FileText } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";

const Data = () => {
  const navigate = useNavigate();
  const { activeOrg, isDemo } = useOrganizationContext();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["completed-transactions", activeOrg?.id, isDemo],
    queryFn: async () => {
      if (!activeOrg) return [];

      let query = supabase
        .from("data_transactions")
        .select(`
          *,
          asset:data_assets (
            id,
            product:data_products (
              name,
              category
            )
          ),
          consumer_org:organizations!data_transactions_consumer_org_id_fkey (
            name
          ),
          subject_org:organizations!data_transactions_subject_org_id_fkey (
            name
          ),
          supplier_data (
            company_name,
            tax_id,
            contact_person_name,
            contact_person_email
          )
        `)
        .eq("status", "completed")
        .order("created_at", { ascending: false });

      // En modo demo, mostrar todas las transacciones completadas demo
      if (isDemo) {
        const { data: demoOrgs } = await supabase
          .from("organizations")
          .select("id")
          .eq("is_demo", true);
        const demoOrgIds = demoOrgs?.map((o) => o.id) || [];
        query = query.in("consumer_org_id", demoOrgIds);
      } else {
        query = query.eq("consumer_org_id", activeOrg.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
    enabled: !!activeOrg,
  });

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-500/10 via-background to-background border border-purple-500/20 p-8">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4">
              <Database className="mr-1 h-3 w-3" />
              Datos
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              Visualiza y Exporta tus Datos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Accede a todos los datos que has recibido de transacciones completadas.
              Visualiza, descarga o integra con tu ERP.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Transacciones Completadas
              </CardTitle>
              <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{transactions?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Proveedores
              </CardTitle>
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {new Set(transactions?.map(t => t.subject_org_id)).size || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Exportaciones Disponibles
              </CardTitle>
              <Download className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{transactions?.length || 0}</div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>Transacciones Completadas</CardTitle>
            <CardDescription data-tour="data-view-link">
              Haz clic en cualquier transacción para visualizar y exportar los datos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando datos...</p>
              </div>
            ) : !transactions || transactions.length === 0 ? (
              <div className="text-center py-12">
                <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay datos disponibles</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Aún no tienes transacciones completadas con datos disponibles
                </p>
                <Button onClick={() => navigate("/catalog")}>
                  Explorar Catálogo
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">
                          {transaction.asset.product.name}
                        </h4>
                        <Badge variant="secondary">
                          {transaction.asset.product.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Proveedor: {transaction.subject_org.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Completada: {new Date(transaction.created_at).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/data/view/${transaction.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default Data;