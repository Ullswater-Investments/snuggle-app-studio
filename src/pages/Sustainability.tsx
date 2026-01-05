import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { ESGDataView } from "@/components/ESGDataView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Plus, Leaf, TrendingUp, History, Factory, Truck, Award, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// --- Schema de Validación (Zod) ---
const esgFormSchema = z.object({
  report_year: z.coerce.number().min(2000).max(2100),
  scope1_total_tons: z.coerce.number().min(0, "Debe ser positivo"),
  scope2_total_tons: z.coerce.number().min(0, "Debe ser positivo"),
  energy_renewable_percent: z.coerce.number().min(0).max(100, "Entre 0 y 100"),
});

type ESGFormValues = z.infer<typeof esgFormSchema>;

// Factor de ponderación para Scope 3
const SCOPE3_WEIGHT_FACTOR = 0.1;

export default function Sustainability() {
  const { activeOrg } = useOrganizationContext();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // --- 1. Fetch de Datos Propios ---
  const { data: reports, isLoading } = useQuery({
    queryKey: ["esg-reports", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return [];
      const { data, error } = await supabase
        .from("esg_reports")
        .select("*")
        .eq("organization_id", activeOrg.id)
        .order("report_year", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!activeOrg,
  });

  // --- 2. Fetch de Scope 3 (Cadena de Suministro) ---
  const { data: scope3Data, isLoading: loadingScope3 } = useQuery({
    queryKey: ["scope3-emissions", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return null;

      // 1. Obtener transacciones completadas donde somos consumers
      const { data: transactions, error: txError } = await supabase
        .from("data_transactions")
        .select("subject_org_id")
        .eq("consumer_org_id", activeOrg.id)
        .eq("status", "completed");

      if (txError) throw txError;
      if (!transactions || transactions.length === 0) {
        return { totalScope3: 0, supplierCount: 0, supplierReports: [] };
      }

      // 2. Obtener IDs únicos de proveedores
      const supplierIds = [...new Set(transactions.map(t => t.subject_org_id))];

      // 3. Consultar ESG reports de esos proveedores
      const { data: supplierReports, error: esgError } = await supabase
        .from("esg_reports")
        .select(`
          *,
          organization:organizations(name)
        `)
        .in("organization_id", supplierIds)
        .order("report_year", { ascending: false });

      if (esgError) throw esgError;

      // 4. Tomar solo el reporte más reciente por proveedor
      const latestBySupplier = supplierReports?.reduce((acc, report) => {
        if (!acc[report.organization_id] || acc[report.organization_id].report_year < report.report_year) {
          acc[report.organization_id] = report;
        }
        return acc;
      }, {} as Record<string, any>) || {};

      const latestReports = Object.values(latestBySupplier);

      // 5. Calcular Scope 3 (emisiones de proveedores * factor)
      const supplierEmissions = latestReports.reduce((sum, report: any) => {
        return sum + (Number(report.scope1_total_tons) + Number(report.scope2_total_tons));
      }, 0);

      const totalScope3 = supplierEmissions * SCOPE3_WEIGHT_FACTOR;

      return {
        totalScope3,
        supplierCount: latestReports.length,
        supplierReports: latestReports,
      };
    },
    enabled: !!activeOrg,
  });

  // --- 3. Mutación (Crear Reporte) ---
  const createReportMutation = useMutation({
    mutationFn: async (values: ESGFormValues) => {
      if (!activeOrg) throw new Error("No hay organización activa");
      
      const { error } = await supabase.from("esg_reports").insert({
        organization_id: activeOrg.id,
        report_year: values.report_year,
        scope1_total_tons: values.scope1_total_tons,
        scope2_total_tons: values.scope2_total_tons,
        energy_renewable_percent: values.energy_renewable_percent,
        certifications: ["Auto-Declarado"],
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Reporte ESG guardado correctamente");
      queryClient.invalidateQueries({ queryKey: ["esg-reports"] });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      if (error.code === '23505') {
        toast.error(`Ya existe un reporte para el año seleccionado.`);
      } else {
        toast.error("Error al guardar el reporte: " + error.message);
      }
    },
  });

  // --- 4. Configuración del Formulario ---
  const form = useForm<ESGFormValues>({
    resolver: zodResolver(esgFormSchema),
    defaultValues: {
      report_year: new Date().getFullYear(),
      scope1_total_tons: 0,
      scope2_total_tons: 0,
      energy_renewable_percent: 0,
    },
  });

  const onSubmit = (values: ESGFormValues) => {
    createReportMutation.mutate(values);
  };

  // --- 5. Preparación de Datos para Gráfico ---
  const chartData = reports 
    ? [...reports].sort((a, b) => a.report_year - b.report_year).map(r => ({
        year: r.report_year,
        scope1: Number(r.scope1_total_tons),
        scope2: Number(r.scope2_total_tons),
        scope3: scope3Data?.totalScope3 || 0,
        total: Number(r.scope1_total_tons) + Number(r.scope2_total_tons) + (scope3Data?.totalScope3 || 0),
        renewable: Number(r.energy_renewable_percent)
      }))
    : [];

  const latestReport = reports && reports.length > 0 ? reports[0] : null;
  const totalEmissions = latestReport 
    ? Number(latestReport.scope1_total_tons) + Number(latestReport.scope2_total_tons) + (scope3Data?.totalScope3 || 0)
    : 0;

  // --- Renderizado ---
  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <Skeleton className="h-20 w-full" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            Sostenibilidad Corporativa
          </h2>
          <p className="text-muted-foreground mt-1">
            Gestión de huella de carbono y métricas ESG para {activeOrg?.name}
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-700 hover:bg-green-800">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Reporte Anual
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Métricas ESG</DialogTitle>
              <DialogDescription>
                Ingresa los datos de emisiones y energía correspondientes al año fiscal.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="report_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año del Reporte</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="scope1_total_tons"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alcance 1 (tCO2e)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="scope2_total_tons"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alcance 2 (tCO2e)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="energy_renewable_percent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>% Energía Renovable</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" max={100} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={createReportMutation.isPending}>
                    {createReportMutation.isPending ? "Guardando..." : "Guardar Reporte"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contenido Principal */}
      {reports && reports.length > 0 ? (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visión General</TabsTrigger>
            <TabsTrigger value="scope3">Scope 3 (Cadena)</TabsTrigger>
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* KPIs con Scope 3 */}
            <div className="grid gap-4 md:grid-cols-4">
              {/* Scope 1 */}
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    Alcance 1 (Directas)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {latestReport?.scope1_total_tons?.toLocaleString() || "0"} t
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">CO₂e - Combustibles propios</p>
                </CardContent>
              </Card>

              {/* Scope 2 */}
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    Alcance 2 (Indirectas)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {latestReport?.scope2_total_tons?.toLocaleString() || "0"} t
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">CO₂e - Electricidad comprada</p>
                </CardContent>
              </Card>

              {/* Scope 3 - NUEVO */}
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Truck className="h-4 w-4 text-purple-600" />
                    Alcance 3 (Cadena)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingScope3 ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <div className="text-2xl font-bold text-purple-600">
                      {(scope3Data?.totalScope3 || 0).toFixed(1)} t
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {scope3Data?.supplierCount || 0} proveedores
                  </p>
                </CardContent>
              </Card>

              {/* Total */}
              <Card className="border-primary bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Factory className="h-4 w-4" />
                    Total Emisiones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalEmissions.toFixed(1)} t
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">CO₂e total {latestReport?.report_year}</p>
                </CardContent>
              </Card>
            </div>

            {/* ESG Data View existente */}
            {latestReport && (
              <Card className="border-l-4 border-l-green-600">
                <CardHeader>
                  <CardTitle>Reporte Actual ({latestReport.report_year})</CardTitle>
                  <CardDescription>Resumen ejecutivo de impacto ambiental</CardDescription>
                </CardHeader>
                <CardContent>
                  <ESGDataView 
                    data={{
                      report_year: latestReport.report_year,
                      scope1_total_tons: Number(latestReport.scope1_total_tons),
                      scope2_total_tons: Number(latestReport.scope2_total_tons),
                      scope3_total_tons: scope3Data?.totalScope3,
                      energy_mix: {
                        renewable: Number(latestReport.energy_renewable_percent),
                        fossil: 100 - Number(latestReport.energy_renewable_percent)
                      },
                      certifications: latestReport.certifications as string[] || [],
                    }} 
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* NUEVO TAB: Scope 3 */}
          <TabsContent value="scope3" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-purple-600" />
                  Emisiones Scope 3 - Cadena de Suministro
                </CardTitle>
                <CardDescription>
                  Emisiones indirectas de tus proveedores de datos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingScope3 ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
                  </div>
                ) : scope3Data && scope3Data.supplierReports.length > 0 ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <p className="text-sm text-muted-foreground mb-2">
                        Metodología: Se aplica un factor de {(SCOPE3_WEIGHT_FACTOR * 100).toFixed(0)}% sobre las emisiones 
                        totales (Scope 1+2) de tus proveedores, ponderado por transacciones completadas.
                      </p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-2xl font-bold text-purple-600">
                            {scope3Data.totalScope3.toFixed(2)} tCO₂e
                          </p>
                          <p className="text-xs text-muted-foreground">Scope 3 estimado</p>
                        </div>
                        <div className="h-12 w-px bg-border" />
                        <div>
                          <p className="text-2xl font-bold">{scope3Data.supplierCount}</p>
                          <p className="text-xs text-muted-foreground">Proveedores analizados</p>
                        </div>
                      </div>
                    </div>

                    <h4 className="font-semibold mt-6">Desglose por Proveedor</h4>
                    <div className="space-y-3">
                      {scope3Data.supplierReports.map((report: any) => (
                        <div 
                          key={report.id} 
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-lg">
                              <Factory className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">{report.organization?.name || "Proveedor"}</p>
                              <p className="text-xs text-muted-foreground">
                                Reporte {report.report_year}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {(Number(report.scope1_total_tons) + Number(report.scope2_total_tons)).toFixed(1)} t
                            </p>
                            <div className="flex gap-1 mt-1">
                              {Number(report.energy_renewable_percent) > 80 && (
                                <Badge className="bg-green-100 text-green-700 text-xs gap-1">
                                  <Zap className="h-3 w-3" />
                                  Renovable
                                </Badge>
                              )}
                              {report.certifications?.includes("ISO 14001") && (
                                <Badge className="bg-blue-100 text-blue-700 text-xs gap-1">
                                  <Award className="h-3 w-3" />
                                  ISO
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Sin datos de proveedores</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Completa transacciones con proveedores que tengan reportes ESG 
                      para calcular tu Scope 3.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" /> Evolución de Emisiones
                </CardTitle>
                <CardDescription>Histórico de toneladas CO2 equivalente por alcance</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorScope1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorScope2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorScope3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="scope1" 
                      stroke="#16a34a" 
                      fillOpacity={1} 
                      fill="url(#colorScope1)" 
                      name="Scope 1"
                      stackId="1"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="scope2" 
                      stroke="#2563eb" 
                      fillOpacity={1} 
                      fill="url(#colorScope2)" 
                      name="Scope 2"
                      stackId="1"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="scope3" 
                      stroke="#9333ea" 
                      fillOpacity={1} 
                      fill="url(#colorScope3)" 
                      name="Scope 3"
                      stackId="1"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" /> Registro Histórico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-bold text-lg">{report.report_year}</p>
                        <p className="text-sm text-muted-foreground">
                          Creado el {new Date(report.created_at || '').toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-700">
                          {(Number(report.scope1_total_tons) + Number(report.scope2_total_tons)).toFixed(2)} tCO₂e
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {report.energy_renewable_percent}% Renovable
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        // Empty State
        <Card className="border-dashed border-2 bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 mb-4">
              <Leaf className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hay datos de sostenibilidad</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Comienza a realizar el seguimiento de tu huella de carbono agregando tu primer reporte anual.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Plus className="mr-2 h-4 w-4" /> Crear Primer Reporte
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}