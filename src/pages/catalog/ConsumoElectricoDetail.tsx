import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Zap,
  Database,
  Globe,
  Clock,
  FileJson,
  Download,
  CheckCircle2,
  XCircle,
  Star,
  Factory,
  Gauge,
  ChevronRight,
  AlertTriangle,
  Building2,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

// Interfaz para el esquema de datos de consumo eléctrico industrial
interface IndustrialEnergyRecord {
  timestamp: string;
  postal_code: string;
  sector_type: "manufacturing" | "logistics" | "retail" | "office";
  consumption_kwh: number;
  peak_demand_kw: number;
  power_factor: number;
  voltage_quality: number;
  grid_zone: string;
  tariff_period: "punta" | "llano" | "valle";
  co2_emissions_kg: number;
}

// Datos de muestra realistas
const ENERGY_SAMPLE: IndustrialEnergyRecord[] = [
  {
    timestamp: "2025-01-11T08:00:00Z",
    postal_code: "28001",
    sector_type: "manufacturing",
    consumption_kwh: 4523.7,
    peak_demand_kw: 892.4,
    power_factor: 0.94,
    voltage_quality: 99.2,
    grid_zone: "MAD-CENTRO",
    tariff_period: "punta",
    co2_emissions_kg: 1584.3
  },
  {
    timestamp: "2025-01-11T08:00:00Z",
    postal_code: "08019",
    sector_type: "logistics",
    consumption_kwh: 2187.3,
    peak_demand_kw: 456.8,
    power_factor: 0.91,
    voltage_quality: 98.7,
    grid_zone: "BCN-LITORAL",
    tariff_period: "punta",
    co2_emissions_kg: 765.6
  },
  {
    timestamp: "2025-01-11T08:00:00Z",
    postal_code: "46001",
    sector_type: "retail",
    consumption_kwh: 892.1,
    peak_demand_kw: 178.4,
    power_factor: 0.96,
    voltage_quality: 99.5,
    grid_zone: "VAL-CENTRO",
    tariff_period: "punta",
    co2_emissions_kg: 312.2
  },
  {
    timestamp: "2025-01-11T08:00:00Z",
    postal_code: "41001",
    sector_type: "office",
    consumption_kwh: 567.8,
    peak_demand_kw: 134.2,
    power_factor: 0.98,
    voltage_quality: 99.8,
    grid_zone: "SEV-CENTRO",
    tariff_period: "punta",
    co2_emissions_kg: 198.7
  },
  {
    timestamp: "2025-01-11T07:00:00Z",
    postal_code: "28001",
    sector_type: "manufacturing",
    consumption_kwh: 4789.2,
    peak_demand_kw: 945.7,
    power_factor: 0.93,
    voltage_quality: 99.1,
    grid_zone: "MAD-CENTRO",
    tariff_period: "llano",
    co2_emissions_kg: 1677.2
  },
  {
    timestamp: "2025-01-11T07:00:00Z",
    postal_code: "48001",
    sector_type: "manufacturing",
    consumption_kwh: 6234.5,
    peak_demand_kw: 1234.8,
    power_factor: 0.92,
    voltage_quality: 98.9,
    grid_zone: "BIL-INDUSTRIAL",
    tariff_period: "llano",
    co2_emissions_kg: 2182.1
  },
  {
    timestamp: "2025-01-11T06:00:00Z",
    postal_code: "50001",
    sector_type: "logistics",
    consumption_kwh: 1876.4,
    peak_demand_kw: 398.2,
    power_factor: 0.90,
    voltage_quality: 98.5,
    grid_zone: "ZGZ-PLAZA",
    tariff_period: "valle",
    co2_emissions_kg: 656.7
  },
  {
    timestamp: "2025-01-11T06:00:00Z",
    postal_code: "15001",
    sector_type: "manufacturing",
    consumption_kwh: 3421.7,
    peak_demand_kw: 678.9,
    power_factor: 0.94,
    voltage_quality: 99.3,
    grid_zone: "COR-PUERTO",
    tariff_period: "valle",
    co2_emissions_kg: 1197.6
  },
  {
    timestamp: "2025-01-11T05:00:00Z",
    postal_code: "29001",
    sector_type: "retail",
    consumption_kwh: 234.5,
    peak_demand_kw: 56.7,
    power_factor: 0.97,
    voltage_quality: 99.6,
    grid_zone: "MLG-CENTRO",
    tariff_period: "valle",
    co2_emissions_kg: 82.1
  },
  {
    timestamp: "2025-01-11T05:00:00Z",
    postal_code: "03001",
    sector_type: "logistics",
    consumption_kwh: 1567.8,
    peak_demand_kw: 312.4,
    power_factor: 0.91,
    voltage_quality: 98.8,
    grid_zone: "ALI-PUERTO",
    tariff_period: "valle",
    co2_emissions_kg: 548.7
  }
];

export default function ConsumoElectricoDetail() {
  const { t } = useTranslation('catalogDetails');
  const [activeTab, setActiveTab] = useState("description");

  const productKey = "consumo-electrico-industrial";
  const product = t(`products.${productKey}`, { returnObjects: true }) as Record<string, unknown>;
  const schema = t(`products.${productKey}.schema`, { returnObjects: true }) as Array<{ field: string; type: string; description: string }>;
  const useCases = t(`products.${productKey}.useCases`, { returnObjects: true }) as string[];
  const odrl = t(`products.${productKey}.odrl`, { returnObjects: true }) as { permitted: string[]; prohibited: string[]; obligations: string[] };
  const quality = t(`products.${productKey}.quality`, { returnObjects: true }) as Record<string, { value: number; description: string }>;

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case "manufacturing": return <Factory className="h-4 w-4" />;
      case "logistics": return <Building2 className="h-4 w-4" />;
      case "retail": return <Building2 className="h-4 w-4" />;
      default: return <Building2 className="h-4 w-4" />;
    }
  };

  const getSectorLabel = (sector: string) => {
    return t(`common.sectorTypes.${sector}`);
  };

  const getTariffColor = (tariff: string) => {
    switch (tariff) {
      case "punta": return "text-red-600 bg-red-100";
      case "llano": return "text-yellow-600 bg-yellow-100";
      default: return "text-green-600 bg-green-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header Navigation */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/catalog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('common.backToCatalog')}
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/catalog" className="hover:text-foreground transition-colors">{t('common.catalog')}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{t(`products.${productKey}.title`)}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ZONA A: Header con confianza y procedencia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="uppercase text-xs tracking-wider">
                      {t(`products.${productKey}.category`)}
                    </Badge>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          {t('common.badges.kybVerified')}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('common.badges.kybTooltip')}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
                          <Lock className="h-3 w-3 mr-1" />
                          {t('common.badges.criticalInfrastructure')}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('common.badges.criticalTooltip')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-900 to-orange-700 bg-clip-text text-transparent">
                    {t(`products.${productKey}.title`)}
                  </CardTitle>
                  
                  <CardDescription className="text-base mt-2">
                    {t(`products.${productKey}.shortDescription`)}
                  </CardDescription>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">{t('common.labels.provider')}:</span>
                      {t(`products.${productKey}.provider`)}
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">{t('common.labels.custody')}:</span>
                      {t(`products.${productKey}.custody`)}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/50 text-amber-400/50'}`} 
                        />
                      ))}
                      <span className="ml-1 font-semibold">{t(`products.${productKey}.rating`)}</span>
                      <span className="text-muted-foreground">({t(`products.${productKey}.reviewCount`)} {t('common.labels.reviews')})</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* ZONA B: Hero Visual con métricas destacadas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-amber-900 to-orange-800 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Hourly Update */}
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Clock className="h-8 w-8 mb-2 text-amber-300" />
                      <span className="text-lg font-bold">{t(`products.${productKey}.metrics.update`)}</span>
                      <span className="text-sm text-amber-200">{t('common.labels.update')}</span>
                    </div>

                    {/* Volumen */}
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Database className="h-8 w-8 mb-2 text-orange-300" />
                      <span className="text-2xl font-bold">{t(`products.${productKey}.metrics.records`)}</span>
                      <span className="text-sm text-amber-200">{t('common.labels.records')}</span>
                    </div>

                    {/* Completitud */}
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <BarChart3 className="h-8 w-8 mb-2 text-yellow-300" />
                      <span className="text-2xl font-bold">{t(`products.${productKey}.metrics.completeness`)}</span>
                      <span className="text-sm text-amber-200">{t('common.labels.completeness')}</span>
                    </div>

                    {/* Cobertura */}
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Factory className="h-8 w-8 mb-2 text-red-300" />
                      <span className="text-2xl font-bold">{t(`products.${productKey}.metrics.postalCodes`)}</span>
                      <span className="text-sm text-amber-200">{t('common.labels.postalCodes')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ZONA C: Tabs con información detallada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto flex-wrap">
                      <TabsTrigger 
                        value="description" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {t('common.tabs.description')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="schema" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {t('common.tabs.schema')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="format" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {t('common.tabs.format')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="rights" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {t('common.tabs.rights')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="sample" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {t('common.tabs.sample')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="quality" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {t('common.tabs.quality')}
                      </TabsTrigger>
                    </TabsList>

                    {/* Tab: Descripción */}
                    <TabsContent value="description" className="p-6 space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">{t('common.sections.datasetDescription')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t(`products.${productKey}.description.paragraph1`)}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-3">
                          {t(`products.${productKey}.description.paragraph2`)}
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold text-lg mb-3">{t('common.sections.useCases')}</h3>
                        <ul className="space-y-2">
                          {useCases.map((useCase, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-amber-900">{t('common.badges.criticalInfrastructure')}</h4>
                            <p className="text-sm text-amber-700 mt-1">
                              {t(`products.${productKey}.criticalWarning`)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Tab: Estructura de Datos */}
                    <TabsContent value="schema" className="p-6">
                      <h3 className="font-semibold text-lg mb-4">{t('common.sections.dataSchema')}</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead className="font-semibold">{t('common.sections.schemaTable.field')}</TableHead>
                              <TableHead className="font-semibold">{t('common.sections.schemaTable.type')}</TableHead>
                              <TableHead className="font-semibold">{t('common.sections.schemaTable.description')}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {schema.map((field, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-mono text-sm text-orange-700">{field.field}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{field.type}</TableCell>
                                <TableCell className="text-sm">{field.description}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* Tab: Formato y Entrega */}
                    <TabsContent value="format" className="p-6 space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <FileJson className="h-5 w-5 text-orange-600" />
                              {t('common.sections.formats.title')}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <Badge variant="outline">Principal</Badge>
                                Apache Parquet (Big Data optimizado)
                              </li>
                              <li className="flex items-center gap-2">
                                <Badge variant="outline">Alternativo</Badge>
                                CSV comprimido (gzip)
                              </li>
                              <li className="flex items-center gap-2">
                                <Badge variant="outline">Encoding</Badge>
                                UTF-8
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Download className="h-5 w-5 text-orange-600" />
                              {t('common.sections.delivery.title')}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                {t('common.sections.delivery.s3')}
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                {t('common.sections.delivery.sftp')}
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                {t('common.sections.delivery.api')}
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Clock className="h-5 w-5 text-orange-600" />
                            {t('common.labels.update')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Periodicidad:</span>
                              <Badge className="bg-amber-100 text-amber-800">{t('common.labels.hourly')}</Badge>
                            </div>
                            <Separator orientation="vertical" className="h-6" />
                            <div className="text-sm text-muted-foreground">
                              Datos disponibles con latencia máxima de 2 horas desde cierre del período
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Tab: Derechos (ODRL) */}
                    <TabsContent value="rights" className="p-6 space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">{t('common.sections.odrlRights')} (ODRL 2.2)</h3>
                        <p className="text-muted-foreground mb-6">
                          Este dataset tiene restricciones especiales por tratarse de datos 
                          de infraestructura crítica nacional.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Permitted */}
                        <Card className="border-green-200 bg-green-50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2 text-green-900">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                              {t('common.sections.odrl.permitted')}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-green-800">
                              {odrl.permitted.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        {/* Prohibited */}
                        <Card className="border-red-200 bg-red-50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2 text-red-900">
                              <XCircle className="h-5 w-5 text-red-600" />
                              {t('common.sections.odrl.prohibited')}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-red-800">
                              {odrl.prohibited.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Obligations */}
                      <Card className="border-amber-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Lock className="h-5 w-5 text-amber-600" />
                            {t('common.sections.odrl.obligations')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {odrl.obligations.map((item, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-amber-600" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Tab: Muestra de Datos */}
                    <TabsContent value="sample" className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{t('common.sections.dataSample')}</h3>
                        <Badge variant="outline" className="text-muted-foreground">
                          Mostrando 10 de {t(`products.${productKey}.metrics.records`)} registros
                        </Badge>
                      </div>
                      
                      <ScrollArea className="h-[500px] border rounded-lg">
                        <Table>
                          <TableHeader className="sticky top-0 bg-background">
                            <TableRow>
                              <TableHead className="font-semibold min-w-[180px]">Timestamp</TableHead>
                              <TableHead className="font-semibold">CP</TableHead>
                              <TableHead className="font-semibold">Sector</TableHead>
                              <TableHead className="font-semibold text-right">kWh</TableHead>
                              <TableHead className="font-semibold text-right">Peak kW</TableHead>
                              <TableHead className="font-semibold text-right">PF</TableHead>
                              <TableHead className="font-semibold">Zona</TableHead>
                              <TableHead className="font-semibold">Tarifa</TableHead>
                              <TableHead className="font-semibold text-right">CO2 kg</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {ENERGY_SAMPLE.map((record, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-mono text-xs">
                                  {new Date(record.timestamp).toLocaleString('es-ES')}
                                </TableCell>
                                <TableCell className="font-medium">{record.postal_code}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    {getSectorIcon(record.sector_type)}
                                    <span className="text-sm">{getSectorLabel(record.sector_type)}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                  {record.consumption_kwh.toLocaleString('es-ES', { maximumFractionDigits: 1 })}
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                  {record.peak_demand_kw.toLocaleString('es-ES', { maximumFractionDigits: 1 })}
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                  {record.power_factor.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-sm">{record.grid_zone}</TableCell>
                                <TableCell>
                                  <Badge className={`${getTariffColor(record.tariff_period)} text-xs`}>
                                    {t(`common.tariffPeriods.${record.tariff_period}`)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono text-muted-foreground">
                                  {record.co2_emissions_kg.toLocaleString('es-ES', { maximumFractionDigits: 1 })}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </TabsContent>

                    {/* Tab: Calidad */}
                    <TabsContent value="quality" className="p-6 space-y-6">
                      <h3 className="font-semibold text-lg mb-4">{t('common.sections.qualityMetrics')}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{t('common.quality.completeness')}</span>
                            <span className="text-sm text-muted-foreground">{quality.completeness?.value}%</span>
                          </div>
                          <Progress value={quality.completeness?.value || 0} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{t('common.quality.accuracy')}</span>
                            <span className="text-sm text-muted-foreground">{quality.accuracy?.value}%</span>
                          </div>
                          <Progress value={quality.accuracy?.value || 0} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{t('common.quality.consistency')}</span>
                            <span className="text-sm text-muted-foreground">{quality.consistency?.value}%</span>
                          </div>
                          <Progress value={quality.consistency?.value || 0} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{t('common.quality.availability')}</span>
                            <span className="text-sm text-muted-foreground">{quality.availability?.value}%</span>
                          </div>
                          <Progress value={quality.availability?.value || 0} className="h-2" />
                        </div>
                      </div>

                      <Separator />

                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Certificaciones</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">ISO 27001</Badge>
                              <Badge variant="outline">SOC 2 Type II</Badge>
                              <Badge variant="outline">GDPR Compliant</Badge>
                              <Badge variant="outline">ENS Alto</Badge>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">SLA Garantizado</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Disponibilidad:</span>
                                <span className="font-medium">99.95%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Latencia máxima:</span>
                                <span className="font-medium">2 horas</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Soporte:</span>
                                <span className="font-medium">24/7 Premium</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-24">
              {/* Card de Transacción */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="shadow-lg border-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-amber-600">{t(`products.${productKey}.pricing.amount`)}</span>
                    </div>
                    <CardDescription>{t(`products.${productKey}.pricing.description`)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Acceso a datos históricos (2 años)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Actualización horaria incluida
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        AWS S3 + SFTP Access
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Soporte técnico 24/7
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        SLA 99.95% garantizado
                      </li>
                    </ul>
                    
                    <Separator />
                    
                    <Button className="w-full bg-amber-600 hover:bg-amber-700" size="lg" asChild>
                      <Link to="/auth">
                        <Zap className="h-4 w-4 mr-2" />
                        {t('common.pricing.requestAccess')}
                      </Link>
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Requiere verificación adicional por datos de infraestructura crítica
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card de Proveedor */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6"
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Sobre el Proveedor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{t(`products.${productKey}.provider`)}</div>
                        <div className="text-sm text-muted-foreground">Utility Data Provider</div>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Datasets</div>
                        <div className="font-semibold">12</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Clientes</div>
                        <div className="font-semibold">340+</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">En ProcureData</div>
                        <div className="font-semibold">3 años</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Rating</div>
                        <div className="font-semibold flex items-center gap-1">
                          {t(`products.${productKey}.rating`)} <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
