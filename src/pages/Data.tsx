import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Download, Eye, FileText, Info, Activity, DollarSign, Zap, Leaf, ShoppingCart, Building } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { EmptyState } from "@/components/EmptyState";

const Data = () => {
  const navigate = useNavigate();
  const { activeOrg, isDemo } = useOrganizationContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string>("all");

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
            name,
            sector
          ),
          supplier_data (
            company_name,
            tax_id,
            contact_person_name,
            contact_person_email
          ),
          data_payloads (
            schema_type
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

  // Get unique sectors for filter
  const sectors = useMemo(() => {
    if (!transactions) return [];
    const sectorSet = new Set(transactions.map(t => t.subject_org.sector).filter(Boolean));
    return Array.from(sectorSet);
  }, [transactions]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    
    return transactions.filter(t => {
      const matchesSearch = !searchQuery || 
        t.asset.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject_org.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSector = sectorFilter === "all" || t.subject_org.sector === sectorFilter;
      
      return matchesSearch && matchesSector;
    });
  }, [transactions, searchQuery, sectorFilter]);

  // Get badge info based on schema type
  const getDataTypeBadge = (transaction: any) => {
    const schemaType = transaction.data_payloads?.[0]?.schema_type;
    
    if (!schemaType) return { label: "Administrativo", icon: FileText, color: "default" as const };
    
    switch (schemaType) {
      case "iot_telemetry":
        return { label: "IoT", icon: Activity, color: "default" as const };
      case "financial_records":
        return { label: "Financiero", icon: DollarSign, color: "default" as const };
      case "energy_metering":
        return { label: "Energía", icon: Zap, color: "default" as const };
      case "esg_report":
      case "supply_chain_trace":
        return { label: "ESG", icon: Leaf, color: "default" as const };
      default:
        return { label: "Datos", icon: Database, color: "default" as const };
    }
  };

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
              <div className="text-3xl font-bold">{filteredTransactions?.length || 0}</div>
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
                {new Set(filteredTransactions?.map(t => t.subject_org_id)).size || 0}
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
              <div className="text-3xl font-bold">{filteredTransactions?.length || 0}</div>
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
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por producto o proveedor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filtrar por sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los sectores</SelectItem>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando datos...</p>
              </div>
            ) : !transactions || transactions.length === 0 ? (
              <EmptyState
                icon={Database}
                title="Tu biblioteca está vacía"
                description="Cuando completes una transacción, los datos aparecerán aquí. Explora el catálogo para encontrar datasets que necesites."
                action={
                  <Button onClick={() => navigate("/catalog")}>
                    Explorar Marketplace
                  </Button>
                }
              />
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Prueba ajustando los filtros de búsqueda
                </p>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setSectorFilter("all"); }}>
                  Limpiar Filtros
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => {
                  const dataTypeBadge = getDataTypeBadge(transaction);
                  const BadgeIcon = dataTypeBadge.icon;
                  
                  return (
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
                          <Badge variant={dataTypeBadge.color} className="flex items-center gap-1">
                            <BadgeIcon className="h-3 w-3" />
                            {dataTypeBadge.label}
                          </Badge>
                          {transaction.subject_org.sector && (
                            <Badge variant="outline">
                              {transaction.subject_org.sector}
                            </Badge>
                          )}
                          {isDemo && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700">
                                  <Info className="h-3 w-3 mr-1" />
                                  DEMO
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs max-w-xs">
                                  Datos sintéticos de demostración. En producción, verás datos reales de tus transacciones completadas.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                            </TooltipProvider>
                          )}
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
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default Data;