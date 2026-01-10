import { useState, useMemo } from "react";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { 
  Bot, 
  BrainCircuit, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle,
  TrendingUp,
  Microscope,
  Search,
  Lightbulb,
  Cpu,
  Leaf,
  Link2,
  Zap,
  Target,
  Eye,
  Compass,
  Rocket,
  Sparkles,
  FileSignature,
  Cloud,
  Coins,
  Check,
  Play,
  ShieldAlert,
  FileUp,
  ScanLine
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { ConceptDetailModal } from "@/components/innovation/ConceptDetailModal";
import { cn } from "@/lib/utils";

interface InnovationConcept {
  id: string;
  title: string;
  short_description: string;
  full_analysis: string;
  category: string;
  business_impact: string;
  maturity_level: number | null;
  chart_type: string;
  chart_data: unknown;
  chart_config: unknown;
  created_at: string | null;
}

const CATEGORY_COLORS: Record<string, string> = {
  'AI': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'Blockchain': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'IoT': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  'Sustainability': 'bg-green-500/10 text-green-600 border-green-500/20',
};

const CATEGORY_COLORS_HEX: Record<string, string> = {
  'AI': '#9333ea',
  'Blockchain': '#2563eb',
  'IoT': '#ea580c',
  'Sustainability': '#16a34a',
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'AI': return Bot;
    case 'Blockchain': return Link2;
    case 'IoT': return Cpu;
    case 'Sustainability': return Leaf;
    default: return Lightbulb;
  }
};

// --- WIDGET 1: Radar Data ---
const TECH_RADAR_DATA = [
  { subject: "IA Adoption", company: 78, leader: 95, fullMark: 100 },
  { subject: "Blockchain Readiness", company: 45, leader: 88, fullMark: 100 },
  { subject: "IoT Integration", company: 62, leader: 75, fullMark: 100 },
  { subject: "ESG Compliance", company: 85, leader: 92, fullMark: 100 },
  { subject: "Data Governance", company: 70, leader: 98, fullMark: 100 },
];

const getInnovationLevel = (score: number) => {
  if (score < 40) return { label: "Observador", icon: Eye, color: "text-slate-500" };
  if (score < 60) return { label: "Explorador", icon: Compass, color: "text-blue-500" };
  if (score < 80) return { label: "Pionero", icon: Rocket, color: "text-purple-500" };
  return { label: "Visionario", icon: Sparkles, color: "text-amber-500" };
};

// Custom Tooltip for ScatterChart
const CustomScatterTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; category: string; x: number; y: number } }> }) => {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-sm">{data.name}</p>
        <Badge variant="outline" className="text-xs mt-1">{data.category}</Badge>
        <div className="mt-2 text-xs text-muted-foreground space-y-1">
          <p>Esfuerzo: {data.x}%</p>
          <p>Impacto: {data.y}%</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function InnovationLab() {
  const { activeOrg } = useOrganizationContext();
  const { t } = useTranslation('innovation');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [qualityScore, setQualityScore] = useState(72);
  
  // --- Estado para búsqueda y filtrado ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedConcept, setSelectedConcept] = useState<InnovationConcept | null>(null);
  
  // --- Estado para el Simulador ---
  const [demandFactor, setDemandFactor] = useState([50]);
  const [supplyVolatility, setSupplyVolatility] = useState([20]);
  const [innovationImpact, setInnovationImpact] = useState([30]);

  // --- Estado para Smart Contract Simulator ---
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // --- Estado para Contract Sentinel ---
  const [scanPhase, setScanPhase] = useState<"idle" | "uploading" | "analyzing" | "complete">("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [riskScore, setRiskScore] = useState(0);

  // Categories with translations (inside component to react to language changes)
  const CATEGORIES = [
    { id: 'all', label: t('categories.all'), icon: Lightbulb },
    { id: 'AI', label: t('categories.ai'), icon: Bot },
    { id: 'Blockchain', label: t('categories.blockchain'), icon: Link2 },
    { id: 'IoT', label: t('categories.iot'), icon: Cpu },
    { id: 'Sustainability', label: t('categories.sustainability'), icon: Leaf },
  ];

  // Contract steps with translations (inside component to react to language changes)
  const CONTRACT_STEPS = [
    {
      id: 1,
      icon: FileSignature,
      title: t('contractSteps.step1Title'),
      description: t('contractSteps.step1Desc'),
      detail: "DUA-2025-0842 | Titan Manufacturas ↔ Global Retail",
      timestamp: "T+0ms",
    },
    {
      id: 2,
      icon: Cloud,
      title: t('contractSteps.step2Title'),
      description: t('contractSteps.step2Desc'),
      detail: "Oráculo climático: Temperatura = 22°C (Umbral: 25°C)",
      timestamp: "T+2.3s",
    },
    {
      id: 3,
      icon: Zap,
      title: t('contractSteps.step3Title'),
      description: t('contractSteps.step3Desc'),
      detail: "Retraso detectado: 48h > Límite 24h → Penalización 5%",
      timestamp: "T+3.1s",
    },
    {
      id: 4,
      icon: Coins,
      title: t('contractSteps.step4Title'),
      description: t('contractSteps.step4Desc'),
      detail: "Importe final: 47,500 EUR (descuento 2,500 EUR)",
      timestamp: "T+4.5s",
    }
  ];

  // Contract Sentinel Alerts with translations
  const DETECTED_ALERTS = [
    {
      id: 1,
      severity: "critical" as const,
      title: t('sentinel.criticalClause'),
      description: "Penalización del 15% por retraso > 24h supera el umbral estándar del 5%",
      location: "Sección 4.2, Párrafo 3"
    },
    {
      id: 2,
      severity: "warning" as const,
      title: t('sentinel.ambiguousTerms'),
      description: "Fecha de pago no especifica días hábiles vs naturales",
      location: "Sección 6.1"
    },
    {
      id: 3,
      severity: "info" as const,
      title: t('sentinel.standardClause'),
      description: "Detectada cláusula INCOTERMS 2020 compatible",
      location: "Sección 8"
    }
  ];

  // --- Fetch concepts from database ---
  const { data: concepts, isLoading: loadingConcepts } = useQuery({
    queryKey: ['innovation-concepts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('innovation_lab_concepts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as InnovationConcept[];
    },
  });

  // --- Filter concepts ---
  const filteredConcepts = useMemo(() => {
    if (!concepts) return [];
    
    return concepts.filter(concept => {
      const matchesSearch = searchQuery === "" || 
        concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
        concept.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [concepts, searchQuery, selectedCategory]);

  // --- Scatter data for prioritization matrix ---
  const scatterData = useMemo(() => {
    if (!concepts) return [];
    return concepts.map(concept => ({
      x: concept.maturity_level ? (6 - concept.maturity_level) * 20 : 50,
      y: Math.floor(Math.random() * 40) + 50, // Simulated impact 50-90
      z: 200,
      name: concept.title,
      category: concept.category,
    }));
  }, [concepts]);

  // --- Innovation level calculation ---
  const avgCompanyScore = TECH_RADAR_DATA.reduce((acc, curr) => acc + curr.company, 0) / TECH_RADAR_DATA.length;
  const innovationLevel = getInnovationLevel(avgCompanyScore);
  const InnovationIcon = innovationLevel.icon;

  // --- Lógica del Simulador ---
  const simulationData = useMemo(() => {
    const baseData = [];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    let previousValue = 1000;

    for (let i = 0; i < 12; i++) {
      const growth = (demandFactor[0] - 50) / 10;
      const volatility = (Math.random() - 0.5) * (supplyVolatility[0] * 5);
      const innovationBoost = i > 5 ? (innovationImpact[0] * i * 2) : 0;

      const newValue = previousValue * (1 + growth / 100) + volatility + innovationBoost;
      previousValue = newValue;

      baseData.push({
        name: months[i],
        proyeccion: Math.round(newValue),
        limite_seguridad: Math.round(newValue * 0.8),
        capacidad_max: Math.round(newValue * 1.2)
      });
    }
    return baseData;
  }, [demandFactor, supplyVolatility, innovationImpact]);

  // --- Simulación de Auditoría AI ---
  const runAiAudit = () => {
    setIsAnalyzing(true);
    setQualityScore(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        clearInterval(interval);
        setIsAnalyzing(false);
        setQualityScore(Math.floor(Math.random() * 15) + 80);
        toast.success(t('toast.aiAnalysisComplete'));
      } else {
        setQualityScore(Math.min(Math.round(progress), 99));
      }
    }, 300);
  };

  // --- Smart Contract Simulation ---
  const runContractSimulation = async () => {
    setIsSimulating(true);
    setCurrentStep(0);
    
    for (let i = 0; i < CONTRACT_STEPS.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setCurrentStep(i + 1);
    }
    
    setIsSimulating(false);
    toast.success(t('toast.contractExecuted'), {
      description: t('toast.allStepsValidated')
    });
  };

  // --- Contract Sentinel Scan ---
  const runContractScan = async () => {
    setScanPhase("uploading");
    setScanProgress(0);
    
    await new Promise(r => setTimeout(r, 800));
    setScanProgress(20);
    
    setScanPhase("analyzing");
    for (let i = 20; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 150));
      setScanProgress(i);
    }
    
    setScanPhase("complete");
    setRiskScore(68);
    toast.info(t('toast.scanComplete', { count: 3 }));
  };

  const renderConceptChart = (concept: InnovationConcept) => {
    const chartData = concept.chart_data as Array<Record<string, unknown>>;
    const chartConfig = concept.chart_config as Record<string, unknown>;
    
    if (!chartData || chartData.length === 0) return null;

    const CHART_COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

    switch (concept.chart_type) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey={chartConfig?.dataKey as string || 'value'}
                nameKey={chartConfig?.nameKey as string || 'name'}
                cx="50%"
                cy="50%"
                outerRadius={45}
                innerRadius={25}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
      case 'line':
      default:
        return (
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${concept.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fill={`url(#gradient-${concept.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="container py-8 space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Microscope className="h-8 w-8 text-purple-600" />
            {t('pageTitle')} <Badge variant="secondary" className="ml-2 text-xs">{t('pageBadge')}</Badge>
          </h2>
          <p className="text-muted-foreground mt-1">
            {t('pageDescription')}
          </p>
        </div>
      </div>

      <Tabs defaultValue="concepts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="concepts">{t('tabs.concepts')}</TabsTrigger>
          <TabsTrigger value="simulator">{t('tabs.simulator')}</TabsTrigger>
          <TabsTrigger value="quality">{t('tabs.aiAuditor')}</TabsTrigger>
          <TabsTrigger value="insights">{t('tabs.insights')}</TabsTrigger>
        </TabsList>

        {/* --- TAB 0: CONCEPTS --- */}
        <TabsContent value="concepts" className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {cat.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Concepts Grid */}
          {loadingConcepts ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader>
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[120px] w-full" />
                    <Skeleton className="h-4 w-1/2 mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredConcepts.length === 0 ? (
            <div className="py-16 text-center">
              <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium">{t('emptyState.title')}</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== 'all' 
                  ? t('emptyState.description')
                  : t('emptyState.description')}
              </p>
            </div>
          ) : (
            <motion.div 
              layout 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredConcepts.map((concept) => {
                  const CategoryIcon = getCategoryIcon(concept.category);
                  return (
                    <motion.div
                      key={concept.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedConcept(concept)}
                      className="cursor-pointer"
                    >
                      <Card className="overflow-hidden h-full hover:shadow-lg hover:scale-[1.02] transition-all group">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                                {concept.title}
                              </CardTitle>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`shrink-0 ${CATEGORY_COLORS[concept.category] || ''}`}
                            >
                              <CategoryIcon className="h-3 w-3 mr-1" />
                              {concept.category}
                            </Badge>
                          </div>
                          <CardDescription className="line-clamp-2 mt-1">
                            {concept.short_description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Chart Preview */}
                          <div className="bg-muted/30 rounded-lg p-2">
                            {renderConceptChart(concept)}
                          </div>

                          {/* Maturity Level */}
                          {concept.maturity_level && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">{t('concept.maturity')}</span>
                                <span className="font-medium">Nivel {concept.maturity_level}/5</span>
                              </div>
                              <Progress 
                                value={(concept.maturity_level / 5) * 100} 
                                className="h-1.5"
                              />
                            </div>
                          )}

                          {/* Business Impact */}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Zap className="h-3 w-3" />
                            <span className="line-clamp-1">{concept.business_impact}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* WIDGET 2: Matriz de Priorización */}
          {concepts && concepts.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {t('prioritization.title')}
                </CardTitle>
                <CardDescription>{t('prioritization.description')}</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name="Esfuerzo" 
                      domain={[0, 100]} 
                      label={{ value: `${t('prioritization.effort')} →`, position: 'bottom', offset: 20 }}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name="Impacto" 
                      domain={[0, 100]} 
                      label={{ value: `← ${t('prioritization.impact')}`, angle: -90, position: 'left', offset: 10 }}
                      tick={{ fontSize: 11 }}
                    />
                    <ZAxis type="number" dataKey="z" range={[100, 400]} />
                    <ReferenceLine x={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
                    <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
                    <Tooltip content={<CustomScatterTooltip />} />
                    <Scatter data={scatterData} fill="hsl(var(--primary))">
                      {scatterData.map((entry, index) => (
                        <Cell key={index} fill={CATEGORY_COLORS_HEX[entry.category] || 'hsl(var(--primary))'} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
                {/* Quadrant Labels */}
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground">
                  <div className="text-left">⬆️ <span className="text-green-600 font-medium">{t('prioritization.quickWins')}</span></div>
                  <div className="text-right">⬆️ <span className="text-blue-600 font-medium">{t('prioritization.strategic')}</span></div>
                  <div className="text-left">⬇️ Fill-Ins</div>
                  <div className="text-right">⬇️ <span className="text-red-600 font-medium">Evitar</span></div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Summary */}
          {concepts && concepts.length > 0 && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
              <span>
                Mostrando <strong className="text-foreground">{filteredConcepts.length}</strong> de{" "}
                <strong className="text-foreground">{concepts.length}</strong> conceptos
              </span>
              {(searchQuery || selectedCategory !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        {/* --- TAB 1: SIMULADOR --- */}
        <TabsContent value="simulator" className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Controles */}
            <Card className="lg:col-span-1 h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Variables</CardTitle>
                <CardDescription>{t('simulator.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{t('simulator.demandFactor')}</span>
                    <span className="text-muted-foreground">{demandFactor}%</span>
                  </div>
                  <Slider value={demandFactor} onValueChange={setDemandFactor} max={100} step={1} className="[&>span]:bg-blue-600" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{t('simulator.supplyVolatility')}</span>
                    <span className="text-muted-foreground">{supplyVolatility}%</span>
                  </div>
                  <Slider value={supplyVolatility} onValueChange={setSupplyVolatility} max={100} step={1} className="[&>span]:bg-orange-600" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{t('simulator.innovationImpact')}</span>
                    <span className="text-muted-foreground">{innovationImpact}%</span>
                  </div>
                  <Slider value={innovationImpact} onValueChange={setInnovationImpact} max={100} step={1} className="[&>span]:bg-purple-600" />
                </div>

                <div className="pt-4 p-3 bg-muted/30 rounded-lg border text-xs text-muted-foreground">
                  <p><strong>Nota:</strong> Este modelo utiliza regresión lineal simple con inyección de ruido estocástico basada en los sliders.</p>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico Interactivo */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  {t('simulator.projection')} (12 Meses)
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={simulationData}>
                    <defs>
                      <linearGradient id="colorProyeccion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="proyeccion" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProyeccion)" name={t('simulator.projection')} />
                    <Area type="monotone" dataKey="limite_seguridad" stroke="#f97316" fill="none" strokeDasharray="5 5" name={t('simulator.safetyLimit')} />
                    <Area type="monotone" dataKey="capacidad_max" stroke="#22c55e" fill="none" strokeDasharray="3 3" name={t('simulator.maxCapacity')} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Smart Contract Simulator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSignature className="h-5 w-5 text-purple-600" />
                {t('smartContract.title')}
              </CardTitle>
              <CardDescription>{t('smartContract.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Steps */}
                <div className="grid md:grid-cols-4 gap-4">
                  {CONTRACT_STEPS.map((step, index) => {
                    const StepIcon = step.icon;
                    const isCompleted = currentStep > index;
                    const isActive = currentStep === index && isSimulating;
                    
                    return (
                      <div 
                        key={step.id}
                        className={cn(
                          "p-4 rounded-lg border transition-all",
                          isCompleted && "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
                          isActive && "bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700 ring-2 ring-blue-400/50",
                          !isCompleted && !isActive && "bg-muted/30"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn(
                            "p-2 rounded-full",
                            isCompleted && "bg-green-500 text-white",
                            isActive && "bg-blue-500 text-white animate-pulse",
                            !isCompleted && !isActive && "bg-muted"
                          )}>
                            {isCompleted ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{step.title}</p>
                            <p className="text-xs text-muted-foreground">{step.timestamp}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                        {(isCompleted || isActive) && (
                          <p className="text-xs mt-2 p-2 bg-background rounded border font-mono">
                            {step.detail}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Controls */}
                <div className="flex justify-center">
                  <Button
                    onClick={runContractSimulation}
                    disabled={isSimulating}
                    size="lg"
                    className="gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {isSimulating ? t('smartContract.simulating') : t('smartContract.startSimulation')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Sentinel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-600" />
                {t('sentinel.title')}
              </CardTitle>
              <CardDescription>{t('sentinel.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Upload & Scan */}
                <div className="space-y-4">
                  <Button
                    onClick={runContractScan}
                    disabled={scanPhase !== "idle" && scanPhase !== "complete"}
                    className="w-full gap-2"
                    variant={scanPhase === "complete" ? "outline" : "default"}
                  >
                    {scanPhase === "idle" && <><FileUp className="h-4 w-4" /> {t('sentinel.uploadContract')}</>}
                    {scanPhase === "uploading" && <><RefreshCw className="h-4 w-4 animate-spin" /> Cargando...</>}
                    {scanPhase === "analyzing" && <><ScanLine className="h-4 w-4 animate-pulse" /> {t('sentinel.analyzing')}</>}
                    {scanPhase === "complete" && <><Check className="h-4 w-4" /> {t('sentinel.scanComplete')}</>}
                  </Button>

                  {scanPhase !== "idle" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span>{scanProgress}%</span>
                      </div>
                      <Progress value={scanProgress} className="h-2" />
                    </div>
                  )}

                  {scanPhase === "complete" && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold text-amber-600">{riskScore}</div>
                        <div>
                          <p className="font-medium">{t('sentinel.riskScore')}</p>
                          <p className="text-xs text-muted-foreground">Riesgo moderado</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Alerts */}
                {scanPhase === "complete" && (
                  <div className="space-y-3">
                    {DETECTED_ALERTS.map((alert) => (
                      <div 
                        key={alert.id}
                        className={cn(
                          "p-3 rounded-lg border",
                          alert.severity === "critical" && "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
                          alert.severity === "warning" && "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800",
                          alert.severity === "info" && "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={cn(
                            "h-4 w-4 mt-0.5",
                            alert.severity === "critical" && "text-red-600",
                            alert.severity === "warning" && "text-amber-600",
                            alert.severity === "info" && "text-blue-600"
                          )} />
                          <div>
                            <p className="font-medium text-sm">{alert.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                            <Badge variant="outline" className="mt-2 text-xs">{alert.location}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB 2: AI AUDITOR --- */}
        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-purple-600" />
                {t('auditor.title')}
              </CardTitle>
              <CardDescription>{t('auditor.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Button 
                    onClick={runAiAudit} 
                    disabled={isAnalyzing}
                    className="w-full gap-2"
                  >
                    <RefreshCw className={cn("h-4 w-4", isAnalyzing && "animate-spin")} />
                    {isAnalyzing ? t('auditor.analyzing') : t('auditor.startAudit')}
                  </Button>

                  <div className="p-6 bg-muted/30 rounded-lg text-center">
                    <div className="text-6xl font-bold text-primary mb-2">{qualityScore}</div>
                    <p className="text-sm text-muted-foreground">{t('auditor.qualityScore')}</p>
                    <Progress value={qualityScore} className="mt-4 h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">{t('auditor.dataIntegrity')}</span>
                    </div>
                    <Badge className="bg-green-500">98%</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{t('auditor.gdprCompliance')}</span>
                    </div>
                    <Badge className="bg-blue-500">95%</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">{t('auditor.schemaValidation')}</span>
                    </div>
                    <Badge className="bg-purple-500">100%</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium">{t('auditor.freshness')}</span>
                    </div>
                    <Badge className="bg-amber-500">72%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB 3: INSIGHTS (Radar) --- */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {t('radar.title')}
              </CardTitle>
              <CardDescription>{t('radar.description')}</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm">{t('radar.yourCompany')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-sm">{t('radar.sectorLeader')}</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="85%">
                <RadarChart data={TECH_RADAR_DATA}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Tu Empresa" dataKey="company" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                  <Radar name="Líder Sector" dataKey="leader" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <InnovationIcon className={cn("h-5 w-5", innovationLevel.color)} />
                  <span className="font-medium">{t('radar.innovationLevel')}:</span>
                  <Badge variant="secondary">{innovationLevel.label}</Badge>
                  <span className="text-sm text-muted-foreground">({Math.round(avgCompanyScore)}%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Concept Detail Modal */}
      {selectedConcept && (
        <ConceptDetailModal
          concept={selectedConcept}
          open={!!selectedConcept}
          onOpenChange={(open) => !open && setSelectedConcept(null)}
        />
      )}
    </div>
  );
}
