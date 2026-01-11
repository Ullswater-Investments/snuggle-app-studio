import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Cpu,
  Database,
  Globe,
  Clock,
  Download,
  CheckCircle2,
  XCircle,
  Star,
  ChevronRight,
  Eye,
  FlaskConical,
  Thermometer,
  Atom,
  Binary,
  FileCode,
  Sparkles
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

interface ThermalToleranceRecord {
  test_id: string;
  sample_id: string;
  alloy_composition: string;
  alloy_family: "ti_6al_4v" | "inconel_718" | "al_7075" | "haynes_282" | "cmsx_4";
  test_type: "tensile" | "creep" | "fatigue" | "oxidation" | "thermal_shock";
  temperature_celsius: number;
  pressure_mpa: number;
  duration_hours: number;
  stress_mpa: number;
  strain_rate: number;
  cycles_to_failure: number | null;
  elongation_pct: number;
  yield_strength_mpa: number;
  ultimate_strength_mpa: number;
  microstructure_notes: string;
  lab_certification: string;
}

const THERMAL_SAMPLE: ThermalToleranceRecord[] = [
  {
    test_id: "TT-2024-00001",
    sample_id: "SPL-TI64-A001",
    alloy_composition: "Ti-6Al-4V ELI",
    alloy_family: "ti_6al_4v",
    test_type: "tensile",
    temperature_celsius: 538,
    pressure_mpa: 0.1,
    duration_hours: 2.5,
    stress_mpa: 0,
    strain_rate: 0.001,
    cycles_to_failure: null,
    elongation_pct: 12.4,
    yield_strength_mpa: 758,
    ultimate_strength_mpa: 862,
    microstructure_notes: "Equiaxed alpha-beta, grain size 8μm",
    lab_certification: "NADCAP AC7101"
  },
  {
    test_id: "TT-2024-00002",
    sample_id: "SPL-IN718-B023",
    alloy_composition: "Inconel 718",
    alloy_family: "inconel_718",
    test_type: "creep",
    temperature_celsius: 650,
    pressure_mpa: 0.1,
    duration_hours: 1000,
    stress_mpa: 550,
    strain_rate: 0,
    cycles_to_failure: null,
    elongation_pct: 3.2,
    yield_strength_mpa: 1034,
    ultimate_strength_mpa: 1241,
    microstructure_notes: "Gamma prime precipitates, δ phase <2%",
    lab_certification: "NADCAP AC7101"
  },
  {
    test_id: "TT-2024-00003",
    sample_id: "SPL-H282-C045",
    alloy_composition: "Haynes 282",
    alloy_family: "haynes_282",
    test_type: "fatigue",
    temperature_celsius: 760,
    pressure_mpa: 0.1,
    duration_hours: 48,
    stress_mpa: 620,
    strain_rate: 0,
    cycles_to_failure: 45000,
    elongation_pct: 0,
    yield_strength_mpa: 0,
    ultimate_strength_mpa: 0,
    microstructure_notes: "Fine gamma prime distribution",
    lab_certification: "NADCAP AC7101"
  },
  {
    test_id: "TT-2024-00004",
    sample_id: "SPL-CMSX4-D012",
    alloy_composition: "CMSX-4 Single Crystal",
    alloy_family: "cmsx_4",
    test_type: "oxidation",
    temperature_celsius: 1100,
    pressure_mpa: 0.1,
    duration_hours: 500,
    stress_mpa: 0,
    strain_rate: 0,
    cycles_to_failure: null,
    elongation_pct: 0,
    yield_strength_mpa: 0,
    ultimate_strength_mpa: 0,
    microstructure_notes: "Al2O3 scale formation, 2.3mg/cm² mass gain",
    lab_certification: "NADCAP AC7101"
  },
  {
    test_id: "TT-2024-00005",
    sample_id: "SPL-AL7075-E078",
    alloy_composition: "Al 7075-T651",
    alloy_family: "al_7075",
    test_type: "thermal_shock",
    temperature_celsius: 175,
    pressure_mpa: 0.1,
    duration_hours: 0.5,
    stress_mpa: 0,
    strain_rate: 0,
    cycles_to_failure: 250,
    elongation_pct: 0,
    yield_strength_mpa: 503,
    ultimate_strength_mpa: 572,
    microstructure_notes: "No visible cracking after 250 cycles",
    lab_certification: "NADCAP AC7101"
  }
];

const DATA_SCHEMA = [
  { field: "test_id", type: "String", description: "Identificador único del ensayo" },
  { field: "sample_id", type: "String", description: "Identificador de la muestra" },
  { field: "alloy_composition", type: "String", description: "Composición de la aleación" },
  { field: "alloy_family", type: "Enum", description: "Familia de aleación" },
  { field: "test_type", type: "Enum", description: "Tipo de ensayo realizado" },
  { field: "temperature_celsius", type: "Float", description: "Temperatura del ensayo (°C)" },
  { field: "pressure_mpa", type: "Float", description: "Presión del ensayo (MPa)" },
  { field: "duration_hours", type: "Float", description: "Duración del ensayo (horas)" },
  { field: "stress_mpa", type: "Float", description: "Tensión aplicada (MPa)" },
  { field: "strain_rate", type: "Float", description: "Velocidad de deformación (s⁻¹)" },
  { field: "cycles_to_failure", type: "Integer | null", description: "Ciclos hasta fallo (si aplica)" },
  { field: "elongation_pct", type: "Float", description: "Elongación (%)" },
  { field: "yield_strength_mpa", type: "Float", description: "Límite elástico (MPa)" },
  { field: "ultimate_strength_mpa", type: "Float", description: "Resistencia última (MPa)" },
  { field: "microstructure_notes", type: "String", description: "Notas de microestructura" },
  { field: "lab_certification", type: "String", description: "Certificación del laboratorio" }
];

export default function ToleranciaTérmicaDetail() {
  const [activeTab, setActiveTab] = useState("description");

  const getAlloyLabel = (family: string) => {
    switch (family) {
      case "ti_6al_4v": return "Ti-6Al-4V";
      case "inconel_718": return "Inconel 718";
      case "al_7075": return "Al 7075";
      case "haynes_282": return "Haynes 282";
      case "cmsx_4": return "CMSX-4";
      default: return family;
    }
  };

  const getTestTypeLabel = (type: string) => {
    switch (type) {
      case "tensile": return "Tracción";
      case "creep": return "Fluencia";
      case "fatigue": return "Fatiga";
      case "oxidation": return "Oxidación";
      case "thermal_shock": return "Choque Térmico";
      default: return type;
    }
  };

  const getTestTypeColor = (type: string) => {
    switch (type) {
      case "tensile": return "bg-blue-100 text-blue-800";
      case "creep": return "bg-orange-100 text-orange-800";
      case "fatigue": return "bg-red-100 text-red-800";
      case "oxidation": return "bg-purple-100 text-purple-800";
      case "thermal_shock": return "bg-cyan-100 text-cyan-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
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
              <span className="text-foreground font-medium">Tolerancia Térmica Aleaciones</span>
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
                <div className="h-3 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="uppercase text-xs tracking-wider">
                      R&D
                    </Badge>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200 border-cyan-200">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI Ready
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Formato optimizado para entrenamiento de modelos ML</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200">
                          <FlaskConical className="h-3 w-3 mr-1" />
                          Lab Verified
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ensayos certificados NADCAP</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-900 to-amber-700 bg-clip-text text-transparent">
                    Dataset de Tolerancia Térmica en Aleaciones Aeronáuticas
                  </CardTitle>
                  
                  <CardDescription className="text-base mt-2">
                    Big Data de I+D con más de 10 millones de ensayos de laboratorio de propiedades 
                    mecánicas a alta temperatura. Incluye datos de tracción, fluencia, fatiga, oxidación 
                    y choque térmico de superaleaciones aeroespaciales. Formato optimizado para 
                    entrenamiento de modelos de machine learning.
                  </CardDescription>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Proveedor:</span>
                      Aerospace Valley (Toulouse)
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Custodia:</span>
                      CNES Data Hub (Toulouse)
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
                      <span className="ml-1 font-semibold">4.8</span>
                      <span className="text-muted-foreground">(23 reseñas)</span>
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
              <Card className="bg-gradient-to-br from-orange-900 to-amber-800 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-orange-300" />
                        <span className="font-semibold text-orange-300">ANNUAL</span>
                      </div>
                      <Binary className="h-8 w-8 mb-2 text-orange-300" />
                      <span className="text-sm text-orange-100">v2024.1</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Database className="h-8 w-8 mb-2 text-amber-300" />
                      <span className="text-2xl font-bold">10M+</span>
                      <span className="text-sm text-orange-100">Ensayos</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Thermometer className="h-8 w-8 mb-2 text-red-300" />
                      <span className="text-2xl font-bold">1200°C</span>
                      <span className="text-sm text-orange-100">Temp. Max</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Atom className="h-8 w-8 mb-2 text-yellow-300" />
                      <span className="text-2xl font-bold">50+</span>
                      <span className="text-sm text-orange-100">Aleaciones</span>
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
                          El Dataset de Tolerancia Térmica es una colección masiva de datos de ensayos 
                          de laboratorio diseñada específicamente para el desarrollo de modelos predictivos 
                          de comportamiento de materiales aeroespaciales. Los datos provienen de laboratorios 
                          certificados NADCAP y cubren las principales superaleaciones utilizadas en motores 
                          de aviación y estructuras de alta temperatura.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Tipos de Ensayos</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <Badge className="bg-blue-100 text-blue-800 justify-center">Tracción</Badge>
                          <Badge className="bg-orange-100 text-orange-800 justify-center">Fluencia</Badge>
                          <Badge className="bg-red-100 text-red-800 justify-center">Fatiga</Badge>
                          <Badge className="bg-purple-100 text-purple-800 justify-center">Oxidación</Badge>
                          <Badge className="bg-cyan-100 text-cyan-800 justify-center">Choque Térmico</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Formatos de Entrega</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <FileCode className="h-3 w-3" />
                            HDF5
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <FileCode className="h-3 w-3" />
                            Parquet
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Optimizados para procesamiento con TensorFlow, PyTorch y Apache Spark
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Casos de uso</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Entrenamiento de modelos de predicción de vida útil</li>
                          <li>Diseño de nuevas aleaciones por simulación</li>
                          <li>Optimización de parámetros de proceso</li>
                          <li>Validación de modelos de elementos finitos</li>
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
                          Vista previa: 5 ensayos de muestra
                        </Badge>
                      </div>
                      <ScrollArea className="h-[400px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Aleación</TableHead>
                              <TableHead>Ensayo</TableHead>
                              <TableHead>Temp °C</TableHead>
                              <TableHead>Duración</TableHead>
                              <TableHead>Resultado</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {THERMAL_SAMPLE.map((record, idx) => (
                              <TableRow key={idx}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{record.alloy_composition}</p>
                                    <p className="text-xs text-muted-foreground">{record.sample_id}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={`text-xs ${getTestTypeColor(record.test_type)}`}>
                                    {getTestTypeLabel(record.test_type)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-mono">
                                  <span className="text-orange-600">{record.temperature_celsius}°C</span>
                                </TableCell>
                                <TableCell>{record.duration_hours}h</TableCell>
                                <TableCell className="text-xs">
                                  {record.yield_strength_mpa > 0 && (
                                    <span>σy: {record.yield_strength_mpa} MPa</span>
                                  )}
                                  {record.cycles_to_failure && (
                                    <span>Ciclos: {record.cycles_to_failure.toLocaleString()}</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="rights" className="p-6 space-y-4">
                      <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-cyan-800">
                          <Sparkles className="h-4 w-4" />
                          AI Training Permitido
                        </h4>
                        <p className="text-sm text-cyan-700">
                          Este dataset está diseñado para entrenamiento de modelos de machine learning. 
                          Se permite el uso para desarrollo de modelos predictivos internos y publicaciones 
                          académicas con atribución. La propiedad intelectual de los modelos derivados 
                          pertenece al licenciatario.
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
                              <li>✓ Entrenamiento de modelos AI/ML</li>
                              <li>✓ Investigación y desarrollo interno</li>
                              <li>✓ Publicaciones académicas</li>
                              <li>✓ Validación de simulaciones</li>
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
                              <li>✗ Reventa del dataset</li>
                              <li>✗ Redistribución pública</li>
                              <li>✗ Uso fuera de EU + USA + Japan</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Restricciones Geográficas
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Acceso limitado a organizaciones en EU, USA y Japón (partners del programa ITER 
                          y consorcios de investigación aeroespacial).
                        </p>
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
                    <span>Licencia Perpetua</span>
                    <Badge className="bg-orange-100 text-orange-800">R&D</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <span className="text-4xl font-bold">1.500€</span>
                    <p className="text-sm text-muted-foreground mt-1">Pago único</p>
                  </div>
                  <Separator />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Licencia perpetua
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Formato HDF5 + Parquet
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      10M+ ensayos
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      AI Training permitido
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Actualizaciones anuales
                    </li>
                  </ul>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
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
                      <span>CNES Data Hub</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verificación:</span>
                      <Badge variant="outline" className="text-xs">KYB Verificado</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sector:</span>
                      <span>I+D Aeroespacial</span>
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
