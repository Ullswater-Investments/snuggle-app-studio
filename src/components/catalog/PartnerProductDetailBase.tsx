import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ShieldCheck,
  Database,
  Clock,
  FileJson,
  Download,
  CheckCircle2,
  XCircle,
  Star,
  ChevronRight,
  Leaf,
  Globe,
  TrendingUp,
  BarChart3,
  Gauge,
  Cpu,
  Scale,
  Factory,
  Zap,
  Users,
  Beaker
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

interface SampleColumn {
  header: string;
  accessorKey: string;
  format?: "number" | "percent" | "currency" | "date" | "text";
}

interface PartnerProductDetailBaseProps {
  partnerId: string;
  productKey: string;
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
  "Compliance": <Scale className="h-4 w-4" />,
  "ESG": <Leaf className="h-4 w-4" />,
  "Ops": <Gauge className="h-4 w-4" />,
  "Market": <BarChart3 className="h-4 w-4" />,
  "R&D": <Cpu className="h-4 w-4" />,
};

const categoryGradients: Record<string, { from: string; via: string; to: string; bgFrom: string; bgVia: string; bgTo: string }> = {
  "Compliance": { from: "blue-500", via: "indigo-500", to: "blue-600", bgFrom: "blue-50", bgVia: "white", bgTo: "indigo-50" },
  "ESG": { from: "emerald-500", via: "green-500", to: "teal-500", bgFrom: "emerald-50", bgVia: "white", bgTo: "green-50" },
  "Ops": { from: "orange-500", via: "amber-500", to: "orange-600", bgFrom: "orange-50", bgVia: "white", bgTo: "amber-50" },
  "Market": { from: "purple-500", via: "violet-500", to: "purple-600", bgFrom: "purple-50", bgVia: "white", bgTo: "violet-50" },
  "R&D": { from: "cyan-500", via: "teal-500", to: "cyan-600", bgFrom: "cyan-50", bgVia: "white", bgTo: "teal-50" },
};

const defaultGradient = {
  from: "indigo-500",
  via: "purple-500",
  to: "indigo-600",
  bgFrom: "indigo-50",
  bgVia: "white",
  bgTo: "purple-50",
};

export function PartnerProductDetailBase({
  partnerId,
  productKey,
  sampleData,
  sampleColumns,
  gradientColors,
}: PartnerProductDetailBaseProps) {
  const { t } = useTranslation('partnerProducts');
  const { t: tCommon } = useTranslation('catalogDetails');
  const [activeTab, setActiveTab] = useState("description");

  // Get partner and product data from translations
  const partner = t(`partners.${partnerId}`, { returnObjects: true }) as Record<string, unknown>;
  const product = t(`partners.${partnerId}.products.${productKey}`, { returnObjects: true }) as Record<string, unknown>;
  
  const category = String(product?.category || "Compliance");
  const gradient = gradientColors || categoryGradients[category] || defaultGradient;
  const CategoryIcon = categoryIcons[category] || <Database className="h-4 w-4" />;

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

  const price = Number(product?.price || 0);
  const pricingModel = String(product?.pricingModel || "subscription");
  const hasGreenBadge = Boolean(product?.hasGreenBadge);
  const kybVerified = Boolean(product?.kybVerified);
  const reputationScore = Number(product?.reputationScore || 4.5);
  const reviewCount = Number(product?.reviewCount || 0);
  const dataPoints = String(product?.dataPoints || "");
  const updateFrequency = String(product?.updateFrequency || "");
  const tags = (product?.tags as string[]) || [];

  // Generate sample schema based on sample columns
  const schema = sampleColumns.map(col => ({
    field: col.accessorKey,
    type: col.format === "number" ? "INTEGER" : col.format === "percent" ? "DECIMAL" : col.format === "currency" ? "DECIMAL" : col.format === "date" ? "DATE" : "VARCHAR",
    description: col.header
  }));

  // Generate ODRL permissions based on category
  const odrlPermissions = {
    permitted: [
      "Uso comercial dentro de la organización",
      "Análisis e integración en sistemas internos",
      "Generación de informes derivados",
      category === "ESG" ? "Reporting de sostenibilidad" : "Benchmarking sectorial"
    ],
    prohibited: [
      "Redistribución a terceros sin autorización",
      "Ingeniería inversa de datos individuales",
      "Uso para fines ilegales o discriminatorios"
    ],
    obligations: [
      "Atribución al proveedor de datos",
      "Renovación de licencia según modelo de precio",
      "Cumplimiento GDPR para datos personales"
    ]
  };

  // Generate use cases based on category
  const useCases = {
    "Compliance": [
      "Verificación de cumplimiento normativo de proveedores",
      "Auditoría de cadena de suministro",
      "Due diligence en procesos de homologación",
      "Monitorización de certificaciones activas"
    ],
    "ESG": [
      "Reporting de sostenibilidad corporativa",
      "Cálculo de huella de carbono (Scope 3)",
      "Evaluación de riesgos climáticos en supply chain",
      "Benchmarking ESG sectorial"
    ],
    "Ops": [
      "Planificación de capacidad productiva",
      "Optimización de inventarios y lead times",
      "Identificación de cuellos de botella operativos",
      "Gestión de riesgos de disponibilidad"
    ],
    "Market": [
      "Negociación informada con proveedores",
      "Análisis de tendencias de precios",
      "Benchmarking de costes de adquisición",
      "Predicción de volatilidad de precios"
    ],
    "R&D": [
      "Entrenamiento de modelos de machine learning",
      "Investigación y desarrollo de productos",
      "Análisis predictivo de mantenimiento",
      "Simulación y optimización de procesos"
    ]
  }[category] || [];

  // Quality metrics
  const qualityMetrics = {
    completeness: { value: 94, description: "Porcentaje de campos sin valores nulos" },
    accuracy: { value: 98, description: "Validación cruzada con fuentes oficiales" },
    timeliness: { value: 96, description: "Datos actualizados según frecuencia indicada" },
    consistency: { value: 95, description: "Formato y estructura homogéneos" }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${gradient.bgFrom} via-${gradient.bgVia} to-${gradient.bgTo}`}>
      {/* Header Navigation */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/catalog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {tCommon('common.backToCatalog')}
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/catalog" className="hover:text-foreground transition-colors">{tCommon('common.catalog')}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-medium">{String(partner?.name || "")}</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{String(product?.name || "")}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className={`h-3 bg-gradient-to-r from-${gradient.from} via-${gradient.via} to-${gradient.to}`} />
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {/* Partner Badge */}
                    <Badge variant="outline" className="text-xs">
                      {String(partner?.flag || "")} {String(partner?.name || "")}
                    </Badge>
                    {/* Category Badge */}
                    <Badge className={`uppercase text-xs tracking-wider ${
                      category === "Compliance" ? "bg-blue-100 text-blue-800" :
                      category === "ESG" ? "bg-emerald-100 text-emerald-800" :
                      category === "Ops" ? "bg-orange-100 text-orange-800" :
                      category === "Market" ? "bg-purple-100 text-purple-800" :
                      "bg-cyan-100 text-cyan-800"
                    }`}>
                      {CategoryIcon}
                      <span className="ml-1">{category}</span>
                    </Badge>
                    {/* KYB Badge */}
                    {kybVerified && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            KYB Verified
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Proveedor verificado mediante proceso Know Your Business</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {/* Green Badge */}
                    {hasGreenBadge && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                        <Leaf className="h-3 w-3 mr-1" />
                        Sostenible
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className={`text-3xl font-bold bg-gradient-to-r from-${gradient.from} to-${gradient.to} bg-clip-text text-transparent`}>
                    {String(product?.name || "")}
                  </CardTitle>
                  
                  <CardDescription className="text-base mt-2">
                    {String(product?.description || "")}
                  </CardDescription>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Sector:</span>
                      {String(partner?.sector || "")}
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">País:</span>
                      {String(partner?.flag || "")} {String(partner?.country || "")}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= Math.floor(reputationScore) ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/30 text-yellow-400/30'}`} 
                        />
                      ))}
                      <span className="ml-1 font-semibold">{reputationScore.toFixed(1)}</span>
                      <span className="text-muted-foreground">({reviewCount} reviews)</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Metrics Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className={`bg-gradient-to-br from-${gradient.from} to-${gradient.to} text-white overflow-hidden`}>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Database className="h-8 w-8 mb-2" />
                      <span className="text-lg font-bold text-center">{dataPoints}</span>
                      <span className="text-sm opacity-80">Cobertura</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Clock className="h-8 w-8 mb-2" />
                      <span className="text-lg font-bold text-center">{updateFrequency}</span>
                      <span className="text-sm opacity-80">Actualización</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <FileJson className="h-8 w-8 mb-2" />
                      <span className="text-lg font-bold text-center">{schema.length} campos</span>
                      <span className="text-sm opacity-80">Esquema</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Globe className="h-8 w-8 mb-2" />
                      <span className="text-lg font-bold text-center">JSON/CSV</span>
                      <span className="text-sm opacity-80">Formato</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tabs Content */}
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
                        className={`rounded-none border-b-2 border-transparent data-[state=active]:border-${gradient.from} data-[state=active]:bg-transparent px-6 py-3`}
                      >
                        Descripción
                      </TabsTrigger>
                      <TabsTrigger 
                        value="schema" 
                        className={`rounded-none border-b-2 border-transparent data-[state=active]:border-${gradient.from} data-[state=active]:bg-transparent px-6 py-3`}
                      >
                        Esquema
                      </TabsTrigger>
                      <TabsTrigger 
                        value="rights" 
                        className={`rounded-none border-b-2 border-transparent data-[state=active]:border-${gradient.from} data-[state=active]:bg-transparent px-6 py-3`}
                      >
                        Derechos ODRL
                      </TabsTrigger>
                      <TabsTrigger 
                        value="sample" 
                        className={`rounded-none border-b-2 border-transparent data-[state=active]:border-${gradient.from} data-[state=active]:bg-transparent px-6 py-3`}
                      >
                        Muestra
                      </TabsTrigger>
                      <TabsTrigger 
                        value="quality" 
                        className={`rounded-none border-b-2 border-transparent data-[state=active]:border-${gradient.from} data-[state=active]:bg-transparent px-6 py-3`}
                      >
                        Calidad
                      </TabsTrigger>
                    </TabsList>

                    {/* Description Tab */}
                    <TabsContent value="description" className="p-6 space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Descripción del Dataset</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {String(product?.description || "")}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-3">
                          Este producto de datos es proporcionado por <strong>{String(partner?.name || "")}</strong>, 
                          una organización líder en el sector de <strong>{String(partner?.sector || "")}</strong> en {String(partner?.country || "")}.
                          Los datos se actualizan con frecuencia <strong>{updateFrequency.toLowerCase()}</strong> y cubren {dataPoints}.
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold text-lg mb-3">Casos de Uso</h3>
                        <ul className="space-y-2">
                          {useCases.map((useCase, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className={`h-5 w-5 text-${gradient.from} mt-0.5 flex-shrink-0`} />
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4">
                        {tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Schema Tab */}
                    <TabsContent value="schema" className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Estructura de Datos</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead className="font-semibold">Campo</TableHead>
                              <TableHead className="font-semibold">Tipo</TableHead>
                              <TableHead className="font-semibold">Descripción</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {schema.map((field, index) => (
                              <TableRow key={index}>
                                <TableCell className={`font-mono text-sm text-${gradient.from}`}>{field.field}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{field.type}</TableCell>
                                <TableCell className="text-sm">{field.description}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* Rights Tab */}
                    <TabsContent value="rights" className="p-6 space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          Usos Permitidos
                        </h3>
                        <ul className="space-y-2">
                          {odrlPermissions.permitted.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-green-700">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-red-600" />
                          Usos Prohibidos
                        </h3>
                        <ul className="space-y-2">
                          {odrlPermissions.prohibited.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-red-700">
                              <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Scale className="h-5 w-5 text-amber-600" />
                          Obligaciones
                        </h3>
                        <ul className="space-y-2">
                          {odrlPermissions.obligations.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-amber-700">
                              <Scale className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    {/* Sample Tab */}
                    <TabsContent value="sample" className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Vista Previa de Datos</h3>
                        <Badge variant="outline" className="text-xs">
                          Mostrando {Math.min(5, sampleData.length)} de {sampleData.length} registros
                        </Badge>
                      </div>
                      <ScrollArea className="w-full">
                        <div className="border rounded-lg overflow-hidden min-w-[600px]">
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
                              {sampleData.slice(0, 5).map((row, rowIndex) => (
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
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* Quality Tab */}
                    <TabsContent value="quality" className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Métricas de Calidad</h3>
                      <div className="grid gap-4">
                        {Object.entries(qualityMetrics).map(([key, metric]) => (
                          <div key={key} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium capitalize">{key}</span>
                              <span className="text-sm font-semibold">{metric.value}%</span>
                            </div>
                            <Progress value={metric.value} className="h-2" />
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
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Precio</span>
                    {hasGreenBadge && <Leaf className="h-5 w-5 text-green-500" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {price > 0 ? `€${price.toLocaleString()}` : "Gratuito"}
                    </div>
                    {price > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {pricingModel === "subscription" ? "/ mes" : "pago único"}
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Formato</span>
                      <span className="font-medium">JSON, CSV</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Actualización</span>
                      <span className="font-medium">{updateFrequency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Cobertura</span>
                      <span className="font-medium">{dataPoints}</span>
                    </div>
                  </div>

                  <Separator />

                  <Button className={`w-full bg-gradient-to-r from-${gradient.from} to-${gradient.to} hover:opacity-90`} asChild>
                    <Link to="/auth">
                      Solicitar Acceso
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/catalog">
                      <Download className="h-4 w-4 mr-2" />
                      Ver Muestra
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Partner Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sobre el Proveedor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{String(partner?.flag || "")}</div>
                    <div>
                      <div className="font-semibold">{String(partner?.name || "")}</div>
                      <div className="text-sm text-muted-foreground">{String(partner?.sector || "")}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {kybVerified && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                    <Badge variant="outline">
                      {String(partner?.country || "")}
                    </Badge>
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

export default PartnerProductDetailBase;
