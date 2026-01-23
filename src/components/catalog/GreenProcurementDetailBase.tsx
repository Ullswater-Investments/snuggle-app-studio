import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Database,
  Clock,
  FileJson,
  Download,
  CheckCircle2,
  XCircle,
  Star,
  ChevronRight,
  AlertTriangle,
  Leaf,
  Recycle,
  Globe,
  TrendingUp,
  BarChart3,
  FileCheck,
  Scale,
  Zap,
  TreePine
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
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

interface SampleColumn {
  header: string;
  accessorKey: string;
  format?: "number" | "percent" | "currency" | "date" | "text";
}

interface GreenProcurementDetailBaseProps {
  productSlug: string;
  sampleData: Record<string, unknown>[];
  sampleColumns: SampleColumn[];
  gradientColors?: {
    from: string;
    via: string;
    to: string;
    bgFrom: string;
    bgVia: string;
    bgTo: string;
  };
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Impacto Ambiental": <Leaf className="h-4 w-4" />,
  "Energía": <Zap className="h-4 w-4" />,
  "Transporte": <TrendingUp className="h-4 w-4" />,
  "IT / Servicios": <Database className="h-4 w-4" />,
  "Economía Circular": <Recycle className="h-4 w-4" />,
  "Materiales": <FileCheck className="h-4 w-4" />,
  "Recursos Naturales": <TreePine className="h-4 w-4" />,
  "Cumplimiento": <Scale className="h-4 w-4" />,
  "Certificaciones": <ShieldCheck className="h-4 w-4" />,
  "Geoespacial": <Globe className="h-4 w-4" />,
  "Gestión de Riesgos": <AlertTriangle className="h-4 w-4" />,
  "Social": <Globe className="h-4 w-4" />,
  "Finanzas": <TrendingUp className="h-4 w-4" />,
  "Movilidad": <TrendingUp className="h-4 w-4" />,
  "CapEx": <BarChart3 className="h-4 w-4" />,
};

const defaultGradient = {
  from: "emerald-500",
  via: "green-500",
  to: "teal-500",
  bgFrom: "emerald-50",
  bgVia: "white",
  bgTo: "green-50",
};

export function GreenProcurementDetailBase({
  productSlug,
  sampleData,
  sampleColumns,
  gradientColors = defaultGradient,
}: GreenProcurementDetailBaseProps) {
  const { t } = useTranslation('greenProcurement');
  const { t: tCommon } = useTranslation('catalogDetails');
  const [activeTab, setActiveTab] = useState("description");

  const product = t(`products.${productSlug}`, { returnObjects: true }) as Record<string, unknown>;
  const schema = t(`products.${productSlug}.schema`, { returnObjects: true }) as Array<{ field: string; type: string; description: string }>;
  const useCases = t(`products.${productSlug}.useCases`, { returnObjects: true }) as string[];
  const odrl = t(`products.${productSlug}.odrl`, { returnObjects: true }) as { permitted: string[]; prohibited: string[]; obligations: string[] };
  const quality = t(`products.${productSlug}.quality`, { returnObjects: true }) as Record<string, { value: number; description: string }>;
  const metrics = t(`products.${productSlug}.metrics`, { returnObjects: true }) as Record<string, string>;
  const pricing = t(`products.${productSlug}.pricing`, { returnObjects: true }) as { amount: string; model: string; description: string };

  const formatCellValue = (value: unknown, format?: string): string => {
    if (value === null || value === undefined) return "-";
    
    switch (format) {
      case "number":
        return typeof value === "number" ? value.toLocaleString() : String(value);
      case "percent":
        return typeof value === "number" ? `${value.toFixed(1)}%` : String(value);
      case "currency":
        return typeof value === "number" ? `€${value.toLocaleString()}` : String(value);
      case "date":
        return String(value);
      default:
        return String(value);
    }
  };

  const category = String(product?.category || "");
  const CategoryIcon = categoryIcons[category] || <Leaf className="h-4 w-4" />;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${gradientColors.bgFrom} via-${gradientColors.bgVia} to-${gradientColors.bgTo}`}>
      {/* Header Navigation */}
      <div className="border-b bg-white/80 dark:bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/catalog" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {tCommon('common.backToCatalog')}
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <nav className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/catalog" className="hover:text-foreground transition-colors">{tCommon('common.catalog')}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-emerald-600 font-medium">Green Procurement</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium truncate max-w-[200px]">{String(product?.title || "")}</span>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
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
                <div className={`h-3 bg-gradient-to-r from-${gradientColors.from} via-${gradientColors.via} to-${gradientColors.to}`} />
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {/* Green Procurement Badge */}
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">
                      <Leaf className="h-3 w-3 mr-1" />
                      Green Procurement
                    </Badge>
                    {/* Category Badge */}
                    <Badge variant="secondary" className="uppercase text-xs tracking-wider">
                      {CategoryIcon}
                      <span className="ml-1">{category}</span>
                    </Badge>
                    {/* KYB Badge if applicable */}
                    {pricing?.model !== "free" && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            {tCommon('common.badges.kybVerified')}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{tCommon('common.badges.kybTooltip')}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {/* Open Data Badge for free datasets */}
                    {pricing?.model === "free" && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                        <Globe className="h-3 w-3 mr-1" />
                        Open Data
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-900 to-green-700 bg-clip-text text-transparent">
                    {String(product?.title || "")}
                  </CardTitle>
                  
                  <CardDescription className="text-base mt-2">
                    {String(product?.shortDescription || "")}
                  </CardDescription>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">{tCommon('common.labels.provider')}:</span>
                      {String(product?.provider || "")}
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">{tCommon('common.labels.custody')}:</span>
                      {String(product?.custody || "")}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => {
                        const rating = parseFloat(String(product?.rating || "4"));
                        return (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= Math.floor(rating) ? 'fill-emerald-400 text-emerald-400' : 'fill-emerald-400/30 text-emerald-400/30'}`} 
                          />
                        );
                      })}
                      <span className="ml-1 font-semibold">{String(product?.rating || "")}</span>
                      <span className="text-muted-foreground">({String(product?.reviewCount || "")} {tCommon('common.labels.reviews')})</span>
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
              <Card className="bg-gradient-to-br from-emerald-900 to-green-800 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    {Object.entries(metrics || {}).slice(0, 4).map(([key, value], index) => {
                      const icons = [Clock, Database, BarChart3, Globe];
                      const IconComponent = icons[index % icons.length];
                      const colors = ["emerald-300", "green-300", "teal-300", "cyan-300"];
                      return (
                        <div key={key} className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                          <IconComponent className={`h-8 w-8 mb-2 text-${colors[index % colors.length]}`} />
                          <span className="text-lg font-bold text-center">{value}</span>
                          <span className="text-sm text-emerald-200 capitalize">{key.replace(/_/g, " ")}</span>
                        </div>
                      );
                    })}
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
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {tCommon('common.tabs.description')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="schema" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {tCommon('common.tabs.schema')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="format" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {tCommon('common.tabs.format')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="rights" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {tCommon('common.tabs.rights')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="sample" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {tCommon('common.tabs.sample')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="quality" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent px-6 py-3"
                      >
                        {tCommon('common.tabs.quality')}
                      </TabsTrigger>
                    </TabsList>

                    {/* Tab: Descripción */}
                    <TabsContent value="description" className="p-6 space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">{tCommon('common.sections.datasetDescription')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {String((product?.description as Record<string, unknown>)?.paragraph1 || "")}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-3">
                          {String((product?.description as Record<string, unknown>)?.paragraph2 || "")}
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold text-lg mb-3">{tCommon('common.sections.useCases')}</h3>
                        <ul className="space-y-2">
                          {(useCases || []).map((useCase, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Leaf className="h-5 w-5 text-emerald-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-emerald-900">Green Procurement Dataset</h4>
                            <p className="text-sm text-emerald-700 mt-1">
                              Este dataset está diseñado para apoyar decisiones de compra sostenible y cumplimiento ESG.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Tab: Estructura de Datos */}
                    <TabsContent value="schema" className="p-6">
                      <h3 className="font-semibold text-lg mb-4">{tCommon('common.sections.dataSchema')}</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead className="font-semibold">{tCommon('common.sections.schemaTable.field')}</TableHead>
                              <TableHead className="font-semibold">{tCommon('common.sections.schemaTable.type')}</TableHead>
                              <TableHead className="font-semibold">{tCommon('common.sections.schemaTable.description')}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {(schema || []).map((field, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-mono text-sm text-emerald-700">{field.field}</TableCell>
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
                              <FileJson className="h-5 w-5 text-emerald-600" />
                              {tCommon('common.sections.formats.title')}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <Badge variant="outline">Principal</Badge>
                                JSON / Apache Parquet
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
                              <Download className="h-5 w-5 text-emerald-600" />
                              {tCommon('common.sections.delivery.title')}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                {tCommon('common.sections.delivery.s3')}
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                {tCommon('common.sections.delivery.sftp')}
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                {tCommon('common.sections.delivery.api')}
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Clock className="h-5 w-5 text-emerald-600" />
                            {tCommon('common.labels.update')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Periodicidad:</span>
                              <Badge className="bg-emerald-100 text-emerald-800">{metrics?.update || metrics?.actualizacion || "Variable"}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Tab: Derechos (ODRL) */}
                    <TabsContent value="rights" className="p-6 space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">{tCommon('common.sections.odrlRights')} (ODRL 2.2)</h3>
                        <p className="text-muted-foreground mb-6">
                          Política de uso y distribución para este dataset de Green Procurement.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Permitted */}
                        <Card className="border-green-200 bg-green-50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2 text-green-900">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                              {tCommon('common.sections.odrl.permitted')}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-green-800">
                              {(odrl?.permitted || []).map((item, index) => (
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
                              {tCommon('common.sections.odrl.prohibited')}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-red-800">
                              {(odrl?.prohibited || []).map((item, index) => (
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
                            {tCommon('common.sections.odrl.obligations')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {(odrl?.obligations || []).map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
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
                        <h3 className="font-semibold text-lg">{tCommon('common.sections.sampleData')}</h3>
                        <Badge variant="outline" className="text-emerald-700">
                          {sampleData.length} registros de muestra
                        </Badge>
                      </div>
                      <ScrollArea className="h-[400px] border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              {sampleColumns.map((col) => (
                                <TableHead key={col.accessorKey} className="font-semibold whitespace-nowrap">
                                  {col.header}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sampleData.map((row, rowIndex) => (
                              <TableRow key={rowIndex}>
                                {sampleColumns.map((col) => (
                                  <TableCell key={col.accessorKey} className="text-sm whitespace-nowrap">
                                    {formatCellValue(row[col.accessorKey], col.format)}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </TabsContent>

                    {/* Tab: Calidad */}
                    <TabsContent value="quality" className="p-6 space-y-6">
                      <h3 className="font-semibold text-lg mb-4">{tCommon('common.sections.qualityMetrics')}</h3>
                      <div className="grid gap-4">
                        {Object.entries(quality || {}).map(([key, metric]) => (
                          <div key={key} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium capitalize">{key.replace(/_/g, " ")}</span>
                              <span className="text-sm font-semibold text-emerald-700">
                                {typeof metric.value === "number" ? `${metric.value}%` : metric.value}
                              </span>
                            </div>
                            <Progress 
                              value={typeof metric.value === "number" ? metric.value : 0} 
                              className="h-2"
                            />
                            <p className="text-xs text-muted-foreground">{metric.description}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-emerald-600" />
                    {tCommon('common.sections.pricing')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4 bg-white rounded-lg border">
                    <span className="text-3xl font-bold text-emerald-700">{pricing?.amount || "Consultar"}</span>
                    <p className="text-sm text-muted-foreground mt-1">{pricing?.description || ""}</p>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                    Solicitar Acceso
                  </Button>

                  <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50" size="lg">
                    Solicitar Demo
                  </Button>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Datos verificados para ESG</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>API y descarga directa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Soporte técnico incluido</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Cumplimiento CSRD/ESRS</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
