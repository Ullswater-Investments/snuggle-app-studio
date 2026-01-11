import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Database,
  Globe,
  Clock,
  RefreshCw,
  Download,
  CheckCircle2,
  XCircle,
  Star,
  ChevronRight,
  Eye,
  BarChart3,
  DollarSign,
  AlertTriangle,
  Gem,
  Scale
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface AeroAlloyPricingRecord {
  price_date: string;
  material_id: string;
  material_name: string;
  material_category: "titanium" | "aluminum" | "nickel_alloy" | "steel" | "composite" | "rare_earth";
  grade: string;
  aerospace_spec: string;
  price_usd_kg: number;
  price_change_mom_pct: number;
  price_change_yoy_pct: number;
  volatility_30d: number;
  supply_index: number;
  demand_index: number;
  lead_time_weeks: number;
  primary_source_countries: string[];
  sustainability_score: number;
}

const ALLOY_SAMPLE: AeroAlloyPricingRecord[] = [
  {
    price_date: "2025-01-03",
    material_id: "TI-6AL-4V-001",
    material_name: "Titanium 6Al-4V",
    material_category: "titanium",
    grade: "Aerospace Grade",
    aerospace_spec: "AMS 4911",
    price_usd_kg: 45.80,
    price_change_mom_pct: 2.3,
    price_change_yoy_pct: 8.7,
    volatility_30d: 4.2,
    supply_index: 72,
    demand_index: 89,
    lead_time_weeks: 12,
    primary_source_countries: ["USA", "Russia", "China"],
    sustainability_score: 65
  },
  {
    price_date: "2025-01-03",
    material_id: "AL-7075-002",
    material_name: "Aluminum 7075-T6",
    material_category: "aluminum",
    grade: "Aircraft Grade",
    aerospace_spec: "AMS 4045",
    price_usd_kg: 8.45,
    price_change_mom_pct: -1.2,
    price_change_yoy_pct: 3.4,
    volatility_30d: 2.8,
    supply_index: 85,
    demand_index: 78,
    lead_time_weeks: 4,
    primary_source_countries: ["Australia", "Canada", "UAE"],
    sustainability_score: 78
  },
  {
    price_date: "2025-01-03",
    material_id: "IN-718-003",
    material_name: "Inconel 718",
    material_category: "nickel_alloy",
    grade: "Engine Grade",
    aerospace_spec: "AMS 5662",
    price_usd_kg: 52.30,
    price_change_mom_pct: 4.1,
    price_change_yoy_pct: 15.2,
    volatility_30d: 6.5,
    supply_index: 58,
    demand_index: 92,
    lead_time_weeks: 16,
    primary_source_countries: ["USA", "Germany", "Japan"],
    sustainability_score: 55
  },
  {
    price_date: "2025-01-03",
    material_id: "CFRP-T800-004",
    material_name: "Carbon Fiber T800",
    material_category: "composite",
    grade: "Structural Grade",
    aerospace_spec: "BMS 8-256",
    price_usd_kg: 125.00,
    price_change_mom_pct: 0.8,
    price_change_yoy_pct: 5.6,
    volatility_30d: 3.1,
    supply_index: 68,
    demand_index: 85,
    lead_time_weeks: 8,
    primary_source_countries: ["Japan", "USA", "Germany"],
    sustainability_score: 72
  },
  {
    price_date: "2025-01-03",
    material_id: "RE-ND-005",
    material_name: "Neodymium (NdPr)",
    material_category: "rare_earth",
    grade: "Magnet Grade",
    aerospace_spec: "N/A",
    price_usd_kg: 89.50,
    price_change_mom_pct: 6.2,
    price_change_yoy_pct: 22.8,
    volatility_30d: 12.4,
    supply_index: 42,
    demand_index: 95,
    lead_time_weeks: 20,
    primary_source_countries: ["China", "Myanmar", "Australia"],
    sustainability_score: 35
  },
  {
    price_date: "2025-01-03",
    material_id: "ST-4340-006",
    material_name: "Steel 4340",
    material_category: "steel",
    grade: "High Strength",
    aerospace_spec: "AMS 6414",
    price_usd_kg: 4.20,
    price_change_mom_pct: -0.5,
    price_change_yoy_pct: 1.2,
    volatility_30d: 1.8,
    supply_index: 92,
    demand_index: 65,
    lead_time_weeks: 3,
    primary_source_countries: ["USA", "Germany", "Japan"],
    sustainability_score: 82
  }
];

const DATA_SCHEMA = [
  { field: "price_date", type: "Date (YYYY-MM-DD)", description: "Fecha del precio (día 3 de cada mes)" },
  { field: "material_id", type: "String", description: "Identificador único del material" },
  { field: "material_name", type: "String", description: "Nombre comercial del material" },
  { field: "material_category", type: "Enum", description: "Categoría del material" },
  { field: "grade", type: "String", description: "Grado de calidad" },
  { field: "aerospace_spec", type: "String", description: "Especificación aeroespacial (AMS, BMS, etc.)" },
  { field: "price_usd_kg", type: "Float", description: "Precio en USD por kilogramo" },
  { field: "price_change_mom_pct", type: "Float", description: "Cambio de precio mes a mes (%)" },
  { field: "price_change_yoy_pct", type: "Float", description: "Cambio de precio año a año (%)" },
  { field: "volatility_30d", type: "Float", description: "Volatilidad de 30 días (%)" },
  { field: "supply_index", type: "Integer (0-100)", description: "Índice de disponibilidad de suministro" },
  { field: "demand_index", type: "Integer (0-100)", description: "Índice de demanda del mercado" },
  { field: "lead_time_weeks", type: "Integer", description: "Tiempo de entrega (semanas)" },
  { field: "primary_source_countries", type: "Array[String]", description: "Principales países de origen" },
  { field: "sustainability_score", type: "Integer (0-100)", description: "Puntuación de sostenibilidad" }
];

export default function PreciosAleacionesDetail() {
  const [activeTab, setActiveTab] = useState("description");

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "titanium": return "Titanio";
      case "aluminum": return "Aluminio";
      case "nickel_alloy": return "Aleación Níquel";
      case "steel": return "Acero";
      case "composite": return "Composite";
      case "rare_earth": return "Tierras Raras";
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "titanium": return "bg-blue-100 text-blue-800";
      case "aluminum": return "bg-gray-100 text-gray-800";
      case "nickel_alloy": return "bg-orange-100 text-orange-800";
      case "steel": return "bg-slate-100 text-slate-800";
      case "composite": return "bg-green-100 text-green-800";
      case "rare_earth": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-red-600";
    if (change < 0) return "text-green-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header Navigation */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/catalog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al catálogo
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/catalog" className="hover:text-foreground transition-colors">Catálogo</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Índice Precios Aleaciones</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="uppercase text-xs tracking-wider">
                      Market
                    </Badge>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">
                          <Scale className="h-3 w-3 mr-1" />
                          LME Benchmark
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Datos licenciados del London Metal Exchange</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Market Intelligence
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Incluye índices de oferta/demanda y volatilidad</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-indigo-700 bg-clip-text text-transparent">
                    Índice de Precios de Aleaciones Aeronáuticas
                  </CardTitle>
                  
                  <CardDescription className="text-base mt-2">
                    Benchmark mensual de precios de materiales y aleaciones aeroespaciales con 
                    indicadores de volatilidad, oferta/demanda, tiempos de entrega y puntuaciones 
                    de sostenibilidad. Cubre titanio, aluminio, aleaciones de níquel, composites 
                    y tierras raras.
                  </CardDescription>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Proveedor:</span>
                      Aerospace Valley (Toulouse)
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Custodia:</span>
                      London Metal Exchange Data Services
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= 5 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/50 text-amber-400/50'}`} 
                        />
                      ))}
                      <span className="ml-1 font-semibold">4.9</span>
                      <span className="text-muted-foreground">(56 reseñas)</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-4 w-4 text-purple-300" />
                        <span className="font-semibold text-purple-300">MONTHLY</span>
                      </div>
                      <Clock className="h-8 w-8 mb-2 text-purple-300" />
                      <span className="text-sm text-purple-100">Día 3 cada mes</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Gem className="h-8 w-8 mb-2 text-blue-300" />
                      <span className="text-2xl font-bold">500+</span>
                      <span className="text-sm text-purple-100">Materiales</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <DollarSign className="h-8 w-8 mb-2 text-green-300" />
                      <span className="text-2xl font-bold">USD/kg</span>
                      <span className="text-sm text-purple-100">Benchmark</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Globe className="h-8 w-8 mb-2 text-cyan-300" />
                      <span className="text-2xl font-bold">Global</span>
                      <span className="text-sm text-purple-100">Cobertura</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
                      <TabsTrigger 
                        value="description" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        Descripción
                      </TabsTrigger>
                      <TabsTrigger 
                        value="schema" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        Estructura de Datos
                      </TabsTrigger>
                      <TabsTrigger 
                        value="sample" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        Muestra
                      </TabsTrigger>
                      <TabsTrigger 
                        value="rights" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        Derechos de Uso
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="p-6 space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Sobre este dataset</h3>
                        <p className="text-muted-foreground">
                          El Índice de Precios de Aleaciones Aeronáuticas proporciona inteligencia de mercado 
                          esencial para la industria aeroespacial. Los datos cubren precios de referencia, 
                          tendencias, volatilidad e indicadores de oferta/demanda para materiales críticos 
                          utilizados en la fabricación de aeronaves y motores.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Categorías de Materiales</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <Badge className="bg-blue-100 text-blue-800 justify-center">Titanio</Badge>
                          <Badge className="bg-gray-100 text-gray-800 justify-center">Aluminio</Badge>
                          <Badge className="bg-orange-100 text-orange-800 justify-center">Aleaciones Níquel</Badge>
                          <Badge className="bg-slate-100 text-slate-800 justify-center">Acero</Badge>
                          <Badge className="bg-green-100 text-green-800 justify-center">Composites</Badge>
                          <Badge className="bg-purple-100 text-purple-800 justify-center">Tierras Raras</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Casos de uso</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Negociación de contratos de suministro</li>
                          <li>Planificación de presupuestos de materiales</li>
                          <li>Análisis de riesgo de cadena de suministro</li>
                          <li>Estrategias de cobertura de commodities</li>
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="schema" className="p-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Campo</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Descripción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {DATA_SCHEMA.map((field) => (
                            <TableRow key={field.field}>
                              <TableCell className="font-mono text-sm">{field.field}</TableCell>
                              <TableCell className="text-sm">{field.type}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{field.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent value="sample" className="p-6">
                      <div className="mb-4">
                        <Badge variant="outline" className="mb-2">
                          <Eye className="h-3 w-3 mr-1" />
                          Vista previa: 6 materiales de muestra
                        </Badge>
                      </div>
                      <ScrollArea className="h-[400px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Material</TableHead>
                              <TableHead>Categoría</TableHead>
                              <TableHead>Precio USD/kg</TableHead>
                              <TableHead>Δ MoM</TableHead>
                              <TableHead>Lead Time</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {ALLOY_SAMPLE.map((record, idx) => (
                              <TableRow key={idx}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{record.material_name}</p>
                                    <p className="text-xs text-muted-foreground">{record.aerospace_spec}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={`text-xs ${getCategoryColor(record.material_category)}`}>
                                    {getCategoryLabel(record.material_category)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-mono font-semibold">
                                  ${record.price_usd_kg.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                  <span className={`flex items-center gap-1 ${getPriceChangeColor(record.price_change_mom_pct)}`}>
                                    {record.price_change_mom_pct > 0 ? (
                                      <TrendingUp className="h-3 w-3" />
                                    ) : (
                                      <TrendingDown className="h-3 w-3" />
                                    )}
                                    {record.price_change_mom_pct > 0 ? '+' : ''}{record.price_change_mom_pct}%
                                  </span>
                                </TableCell>
                                <TableCell>{record.lead_time_weeks} sem</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="rights" className="p-6 space-y-4">
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-amber-800">
                          <AlertTriangle className="h-4 w-4" />
                          Datos Licenciados LME
                        </h4>
                        <p className="text-sm text-amber-700">
                          Este dataset contiene información comercial sensible licenciada del London Metal Exchange. 
                          El uso está estrictamente limitado a análisis interno. No se permite el uso para 
                          entrenamiento de modelos AI, reventa o redistribución.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card className="border-green-200 bg-green-50/50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex items-center gap-2 text-green-800">
                              <CheckCircle2 className="h-4 w-4" />
                              Usos Permitidos
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm text-green-700">
                            <ul className="space-y-1">
                              <li>✓ Análisis interno de costes</li>
                              <li>✓ Planificación de compras</li>
                              <li>✓ Negociación con proveedores</li>
                              <li>✓ Reportes internos</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="border-red-200 bg-red-50/50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex items-center gap-2 text-red-800">
                              <XCircle className="h-4 w-4" />
                              Restricciones
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm text-red-700">
                            <ul className="space-y-1">
                              <li>✗ Entrenamiento de modelos AI</li>
                              <li>✗ Reventa o redistribución</li>
                              <li>✗ Publicación externa</li>
                              <li>✗ Compartir con terceros</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
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
                    <span>Suscripción</span>
                    <Badge className="bg-purple-100 text-purple-800">Market</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <span className="text-4xl font-bold">550€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <Separator />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Actualización mensual
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Formato Excel + JSON API
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      500+ materiales
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Histórico 5 años
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-400" />
                      AI Training NO permitido
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Solicitar Acceso
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Ficha Técnica
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Provider Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Proveedor de Datos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                      AV
                    </div>
                    <div>
                      <p className="font-semibold">Aerospace Valley</p>
                      <p className="text-sm text-muted-foreground">🇫🇷 Toulouse, Francia</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Custodia:</span>
                      <span>LME Data Services</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verificación:</span>
                      <Badge variant="outline" className="text-xs">KYB Verificado</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sector:</span>
                      <span>Commodities</span>
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
