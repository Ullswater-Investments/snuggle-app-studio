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
import { toast } from "sonner";
import { Plus, Leaf, TrendingUp, History } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// --- Schema de Validación (Zod) ---
const esgFormSchema = z.object({
  report_year: z.coerce.number().min(2000).max(2100),
  scope1_total_tons: z.coerce.number().min(0, "Debe ser positivo"),
  scope2_total_tons: z.coerce.number().min(0, "Debe ser positivo"),
  energy_renewable_percent: z.coerce.number().min(0).max(100, "Entre 0 y 100"),
});

type ESGFormValues = z.infer<typeof esgFormSchema>;

export default function Sustainability() {
  const { activeOrg } = useOrganizationContext();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // --- 1. Fetch de Datos ---
  const { data: reports, isLoading } = useQuery({
    queryKey: ["esg-reports", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return [];
      const { data, error } = await supabase
        .from("esg_reports")
        .select("*")
        .eq("organization_id", activeOrg.id)
        .order("report_year", { ascending: false }); // El más reciente primero

      if (error) throw error;
      return data || [];
    },
    enabled: !!activeOrg,
  });

  // --- 2. Mutación (Crear Reporte) ---
  const createReportMutation = useMutation({
    mutationFn: async (values: ESGFormValues) => {
      if (!activeOrg) throw new Error("No hay organización activa");
      
      const { error } = await supabase.from("esg_reports").insert({
        organization_id: activeOrg.id,
        report_year: values.report_year,
        scope1_total_tons: values.scope1_total_tons,
        scope2_total_tons: values.scope2_total_tons,
        energy_renewable_percent: values.energy_renewable_percent,
        certifications: ["Auto-Declarado"], // Default para este ejemplo
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
      // Manejo simple de error de duplicados
      if (error.code === '23505') {
        toast.error(`Ya existe un reporte para el año seleccionado.`);
      } else {
        toast.error("Error al guardar el reporte: " + error.message);
      }
    },
  });

  // --- 3. Configuración del Formulario ---
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

  // --- 4. Preparación de Datos para Gráfico ---
  // Recharts necesita los datos ordenados cronológicamente (ascendente)
  const chartData = reports 
    ? [...reports].sort((a, b) => a.report_year - b.report_year).map(r => ({
        year: r.report_year,
        total: Number(r.scope1_total_tons) + Number(r.scope2_total_tons),
        renewable: Number(r.energy_renewable_percent)
      }))
    : [];

  const latestReport = reports && reports.length > 0 ? reports[0] : null;

  // --- Renderizado ---
  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Cargando datos de sostenibilidad...</div>;
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
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Adaptador para usar el componente existente ESGDataView */}
            {latestReport && (
              <div className="space-y-6">
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
                        energy_mix: {
                          renewable: Number(latestReport.energy_renewable_percent),
                          fossil: 100 - Number(latestReport.energy_renewable_percent)
                        },
                        certifications: latestReport.certifications as string[] || [],
                      }} 
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" /> Evolución de Emisiones
                </CardTitle>
                <CardDescription>Histórico de toneladas CO2 equivalente</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#16a34a" 
                      fillOpacity={1} 
                      fill="url(#colorTotal)" 
                      name="Total Emisiones"
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
                          Creado el {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-700">
                          {(Number(report.scope1_total_tons) + Number(report.scope2_total_tons)).toFixed(2)} tCO2e
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
