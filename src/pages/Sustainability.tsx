import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useTranslation } from "react-i18next";
import { ESGDataView } from "@/components/ESGDataView";
import { EcoGauge } from "@/components/sustainability/EcoGauge";
import { SectorRanking } from "@/components/sustainability/SectorRanking";
import { GrowthTree } from "@/components/sustainability/GrowthTree";
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
  const { t } = useTranslation('sustainability');
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
      toast.success(t('toast.reportSaved'));
      queryClient.invalidateQueries({ queryKey: ["esg-reports"] });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      if (error.code === '23505') {
        toast.error(t('toast.duplicateYear'));
      } else {
        toast.error(t('toast.error', { message: error.message }));
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

  // Calculate gamification data
  const { ecoLevel, ecoProgress, ecoPoints, earnedBadges, sectorPosition, esgScore } = useMemo(() => {
    if (!latestReport) return { 
      ecoLevel: 1 as const, 
      ecoProgress: 0, 
      ecoPoints: 0, 
      earnedBadges: [] as string[], 
      sectorPosition: 15, 
      esgScore: 50 
    };
    
    let points = 0;
    const badges: string[] = [];
    
    // Points for renewable energy
    const renewable = Number(latestReport.energy_renewable_percent) || 0;
    points += renewable;
    if (renewable >= 80) badges.push(`🌿 ${t('badges.renewableLeader')}`);
    if (renewable >= 50) badges.push(`⚡ ${t('badges.energyTransition')}`);
    
    // Points for certifications
    const certs = latestReport.certifications?.length || 0;
    points += certs * 20;
    if (certs >= 3) badges.push(`🏅 ${t('badges.multiCertified')}`);
    if (latestReport.certifications?.some(c => c.includes("ISO 14001"))) {
      badges.push(`🌍 ${t('badges.iso14001')}`);
    }
    
    // Points for low Scope 3
    const s3 = scope3Data?.totalScope3 || 0;
    const s3Points = Math.max(0, 100 - Math.min(s3, 100));
    points += s3Points;
    if (s3 < 10) badges.push(`🌱 ${t('badges.cleanChain')}`);
    
    // Calculate level (1-5)
    let level: 1 | 2 | 3 | 4 | 5 = 1;
    const thresholds = [0, 50, 100, 200, 300];
    for (let i = 4; i >= 0; i--) {
      if (points >= thresholds[i]) {
        level = (i + 1) as 1 | 2 | 3 | 4 | 5;
        break;
      }
    }
    
    // Progress to next level
    const currentThreshold = thresholds[level - 1];
    const nextThreshold = thresholds[level] || 400;
    const progress = Math.round(((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100);
    
    // Simulate sector position (based on points)
    const position = Math.max(1, Math.round(28 - (points / 15)));
    const score = Math.min(100, Math.round(points / 3));
    
    return { 
      ecoLevel: level, 
      ecoProgress: Math.min(progress, 100), 
      ecoPoints: points, 
      earnedBadges: badges,
      sectorPosition: position,
      esgScore: score
    };
  }, [latestReport, scope3Data, t]);

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
            {t('pageTitle')}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t('pageDescription', { orgName: activeOrg?.name })}
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-700 hover:bg-green-800">
              <Plus className="mr-2 h-4 w-4" /> {t('newReport')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('dialog.title')}</DialogTitle>
              <DialogDescription>
                {t('dialog.description')}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="report_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dialog.reportYear')}</FormLabel>
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
                        <FormLabel>{t('dialog.scope1')}</FormLabel>
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
                        <FormLabel>{t('dialog.scope2')}</FormLabel>
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
                      <FormLabel>{t('dialog.renewablePercent')}</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" max={100} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={createReportMutation.isPending}>
                    {createReportMutation.isPending ? t('dialog.saving') : t('dialog.save')}
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
            <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
            <TabsTrigger value="scope3">{t('tabs.scope3')}</TabsTrigger>
            <TabsTrigger value="trends">{t('tabs.trends')}</TabsTrigger>
            <TabsTrigger value="history">{t('tabs.history')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPIs with EcoGauge */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <EcoGauge
                value={Number(latestReport?.scope1_total_tons) || 0}
                maxValue={5000}
                label={t('kpis.scope1')}
                description={t('kpis.scope1Desc')}
                icon={Leaf}
                color="green"
                targetValue={1000}
                delay={0}
              />
              <EcoGauge
                value={Number(latestReport?.scope2_total_tons) || 0}
                maxValue={5000}
                label={t('kpis.scope2')}
                description={t('kpis.scope2Desc')}
                icon={TrendingUp}
                color="blue"
                targetValue={800}
                delay={0.1}
              />
              <EcoGauge
                value={scope3Data?.totalScope3 || 0}
                maxValue={1000}
                label={t('kpis.scope3')}
                description={t('kpis.scope3Desc', { count: scope3Data?.supplierCount || 0 })}
                icon={Truck}
                color="purple"
                delay={0.2}
              />
              <EcoGauge
                value={totalEmissions}
                maxValue={10000}
                label={t('kpis.total')}
                description={t('kpis.year', { year: latestReport?.report_year })}
                icon={Factory}
                color="primary"
                delay={0.3}
              />
            </div>

            {/* Gamification Section: GrowthTree + SectorRanking */}
            <div className="grid gap-6 md:grid-cols-2">
              <GrowthTree
                level={ecoLevel}
                progress={ecoProgress}
                totalPoints={ecoPoints}
                badges={earnedBadges}
              />
              <SectorRanking
                position={sectorPosition}
                totalCompanies={28}
                yourScore={esgScore}
                sectorAverage={65}
                sectorName={activeOrg?.sector || "Industrial"}
                trend="up"
                trendDelta={2}
              />
            </div>

            {/* ESG Data View existente */}
            {latestReport && (
              <Card className="border-l-4 border-l-green-600">
                <CardHeader>
                  <CardTitle>{t('currentReport.title', { year: latestReport.report_year })}</CardTitle>
                  <CardDescription>{t('currentReport.description')}</CardDescription>
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
                  {t('scope3Section.title')}
                </CardTitle>
                <CardDescription>
                  {t('scope3Section.description')}
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
                          <p className="text-xs text-muted-foreground">{t('scope3Section.yourContribution')}</p>
                        </div>
                        <div className="h-12 w-px bg-border" />
                        <div>
                          <p className="text-2xl font-bold">{scope3Data.supplierCount}</p>
                          <p className="text-xs text-muted-foreground">{t('scope3Section.supplier')}</p>
                        </div>
                      </div>
                    </div>

                    <h4 className="font-semibold mt-6">{t('scope3Section.supplier')}</h4>
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
                              <p className="font-medium">{report.organization?.name || t('scope3Section.supplier')}</p>
                              <p className="text-xs text-muted-foreground">
                                {t('history.year')} {report.report_year}
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
                                  {t('scope3Section.renewable')}
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
                    <h3 className="text-lg font-semibold mb-2">{t('scope3Section.noSuppliers')}</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {t('scope3Section.noSuppliersDesc')}
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
                  <TrendingUp className="h-5 w-5" /> {t('trends.title')}
                </CardTitle>
                <CardDescription>{t('trends.description')}</CardDescription>
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
                  <History className="h-5 w-5" /> {t('history.title')}
                </CardTitle>
                <CardDescription>{t('history.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-bold text-lg">{report.report_year}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.created_at || '').toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-700">
                          {(Number(report.scope1_total_tons) + Number(report.scope2_total_tons)).toFixed(2)} tCO₂e
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {report.energy_renewable_percent}% {t('scope3Section.renewable')}
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
            <h3 className="text-xl font-semibold mb-2">{t('emptyState.title')}</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              {t('emptyState.description')}
            </p>
            <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Plus className="mr-2 h-4 w-4" /> {t('emptyState.cta')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
