import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Leaf,
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
  Zap,
  Factory,
  Sun,
  TrendingDown,
  Award,
  Battery
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
import { Progress } from "@/components/ui/progress";

interface CleanEnergyProfileRecord {
  reporting_quarter: string;
  plant_id: string;
  plant_name: string;
  location: string;
  oem_owner: string;
  plant_type: "assembly" | "powertrain" | "r_and_d" | "logistics" | "paint_shop";
  total_consumption_mwh: number;
  renewable_consumption_mwh: number;
  renewable_percentage: number;
  solar_pv_installed_kw: number;
  grid_electricity_mwh: number;
  natural_gas_mwh: number;
  co2_emissions_tonnes: number;
  co2_intensity_kg_per_vehicle: number;
  energy_efficiency_index: number;
  ppa_contracts: boolean;
  green_certificates_purchased: number;
  target_2030_renewable_pct: number;
}

const ENERGY_SAMPLE: CleanEnergyProfileRecord[] = [
  {
    reporting_quarter: "2024-Q4",
    plant_id: "FER-MAR-001",
    plant_name: "Ferrari Maranello Factory",
    location: "Maranello, Emilia-Romagna",
    oem_owner: "Ferrari",
    plant_type: "assembly",
    total_consumption_mwh: 45000,
    renewable_consumption_mwh: 40500,
    renewable_percentage: 90,
    solar_pv_installed_kw: 8500,
    grid_electricity_mwh: 4500,
    natural_gas_mwh: 12000,
    co2_emissions_tonnes: 2850,
    co2_intensity_kg_per_vehicle: 285,
    energy_efficiency_index: 92,
    ppa_contracts: true,
    green_certificates_purchased: 15000,
    target_2030_renewable_pct: 100
  },
  {
    reporting_quarter: "2024-Q4",
    plant_id: "LAM-SAN-002",
    plant_name: "Lamborghini Sant'Agata",
    location: "Sant'Agata Bolognese, Emilia-Romagna",
    oem_owner: "Lamborghini",
    plant_type: "assembly",
    total_consumption_mwh: 38000,
    renewable_consumption_mwh: 32300,
    renewable_percentage: 85,
    solar_pv_installed_kw: 6200,
    grid_electricity_mwh: 5700,
    natural_gas_mwh: 9500,
    co2_emissions_tonnes: 2280,
    co2_intensity_kg_per_vehicle: 456,
    energy_efficiency_index: 88,
    ppa_contracts: true,
    green_certificates_purchased: 12000,
    target_2030_renewable_pct: 100
  },
  {
    reporting_quarter: "2024-Q4",
    plant_id: "MAS-MOD-003",
    plant_name: "Maserati Modena Plant",
    location: "Modena, Emilia-Romagna",
    oem_owner: "Maserati",
    plant_type: "powertrain",
    total_consumption_mwh: 28000,
    renewable_consumption_mwh: 21000,
    renewable_percentage: 75,
    solar_pv_installed_kw: 4500,
    grid_electricity_mwh: 7000,
    natural_gas_mwh: 8200,
    co2_emissions_tonnes: 1960,
    co2_intensity_kg_per_vehicle: 196,
    energy_efficiency_index: 82,
    ppa_contracts: false,
    green_certificates_purchased: 8000,
    target_2030_renewable_pct: 95
  },
  {
    reporting_quarter: "2024-Q4",
    plant_id: "DAL-VAR-004",
    plant_name: "Dallara R&D Center",
    location: "Varano de' Melegari, Emilia-Romagna",
    oem_owner: "Dallara",
    plant_type: "r_and_d",
    total_consumption_mwh: 12000,
    renewable_consumption_mwh: 10800,
    renewable_percentage: 90,
    solar_pv_installed_kw: 3200,
    grid_electricity_mwh: 1200,
    natural_gas_mwh: 2800,
    co2_emissions_tonnes: 720,
    co2_intensity_kg_per_vehicle: 0,
    energy_efficiency_index: 95,
    ppa_contracts: true,
    green_certificates_purchased: 4000,
    target_2030_renewable_pct: 100
  },
  {
    reporting_quarter: "2024-Q4",
    plant_id: "DUC-BOR-005",
    plant_name: "Ducati Borgo Panigale",
    location: "Bologna, Emilia-Romagna",
    oem_owner: "Ducati",
    plant_type: "assembly",
    total_consumption_mwh: 22000,
    renewable_consumption_mwh: 17600,
    renewable_percentage: 80,
    solar_pv_installed_kw: 5100,
    grid_electricity_mwh: 4400,
    natural_gas_mwh: 6500,
    co2_emissions_tonnes: 1540,
    co2_intensity_kg_per_vehicle: 28,
    energy_efficiency_index: 86,
    ppa_contracts: true,
    green_certificates_purchased: 6000,
    target_2030_renewable_pct: 100
  }
];

const DATA_SCHEMA = [
  { field: "reporting_quarter", type: "String (YYYY-QN)", description: "Trimestre del reporte" },
  { field: "plant_id", type: "String", description: "Identificador único de la planta" },
  { field: "plant_name", type: "String", description: "Nombre de la instalación" },
  { field: "location", type: "String", description: "Ubicación geográfica" },
  { field: "oem_owner", type: "String", description: "OEM propietario" },
  { field: "plant_type", type: "Enum", description: "Tipo de planta" },
  { field: "total_consumption_mwh", type: "Float", description: "Consumo total (MWh)" },
  { field: "renewable_consumption_mwh", type: "Float", description: "Consumo renovable (MWh)" },
  { field: "renewable_percentage", type: "Float", description: "Porcentaje renovable (%)" },
  { field: "solar_pv_installed_kw", type: "Float", description: "Solar fotovoltaica instalada (kW)" },
  { field: "grid_electricity_mwh", type: "Float", description: "Electricidad de red (MWh)" },
  { field: "natural_gas_mwh", type: "Float", description: "Gas natural (MWh equiv.)" },
  { field: "co2_emissions_tonnes", type: "Float", description: "Emisiones CO2 (toneladas)" },
  { field: "co2_intensity_kg_per_vehicle", type: "Float", description: "Intensidad CO2 por vehículo (kg)" },
  { field: "energy_efficiency_index", type: "Integer (0-100)", description: "Índice de eficiencia energética" },
  { field: "ppa_contracts", type: "Boolean", description: "Tiene contratos PPA activos" },
  { field: "green_certificates_purchased", type: "Integer", description: "Certificados verdes comprados" },
  { field: "target_2030_renewable_pct", type: "Integer", description: "Objetivo renovable 2030 (%)" }
];

export default function EnergiaLimpiaMotorValleyDetail() {
  const [activeTab, setActiveTab] = useState("description");

  const getPlantTypeLabel = (type: string) => {
    switch (type) {
      case "assembly": return "Ensamblaje";
      case "powertrain": return "Tren Motriz";
      case "r_and_d": return "I+D";
      case "logistics": return "Logística";
      case "paint_shop": return "Pintura";
      default: return type;
    }
  };

  const getPlantTypeColor = (type: string) => {
    switch (type) {
      case "assembly": return "bg-blue-100 text-blue-800";
      case "powertrain": return "bg-orange-100 text-orange-800";
      case "r_and_d": return "bg-purple-100 text-purple-800";
      case "logistics": return "bg-gray-100 text-gray-800";
      case "paint_shop": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRenewableColor = (pct: number) => {
    if (pct >= 90) return "text-green-600";
    if (pct >= 75) return "text-emerald-600";
    if (pct >= 50) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
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
              <span className="text-foreground font-medium">Energía Limpia Motor Valley</span>
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
                <div className="h-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500" />
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="uppercase text-xs tracking-wider">
                      ESG
                    </Badge>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                          <Leaf className="h-3 w-3 mr-1" />
                          ESG Certified
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Datos verificados para reporting ESG</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">
                          <Sun className="h-3 w-3 mr-1" />
                          Renewable Powered
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>+85% energía renovable promedio</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-900 to-green-700 bg-clip-text text-transparent">
                    Perfil de Consumo de Energía Limpia en Ingeniería de Alto Rendimiento
                  </CardTitle>
                  
                  <CardDescription className="text-base mt-2">
                    Dataset trimestral ESG con perfiles de consumo energético y emisiones de CO2 
                    de plantas de producción del Motor Valley italiano. Incluye datos de solar 
                    fotovoltaica, contratos PPA, certificados verdes y objetivos de descarbonización 2030.
                  </CardDescription>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Proveedor:</span>
                      Motor Valley (Bologna)
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Custodia:</span>
                      Enel X Industrial (Milan)
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
                      <span className="ml-1 font-semibold">4.6</span>
                      <span className="text-muted-foreground">(31 reseñas)</span>
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
              <Card className="bg-gradient-to-br from-emerald-900 to-green-800 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-4 w-4 text-emerald-300" />
                        <span className="font-semibold text-emerald-300">QUARTERLY</span>
                      </div>
                      <Clock className="h-8 w-8 mb-2 text-emerald-300" />
                      <span className="text-sm text-emerald-100">Trimestral</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Factory className="h-8 w-8 mb-2 text-green-300" />
                      <span className="text-2xl font-bold">120+</span>
                      <span className="text-sm text-emerald-100">Plantas</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Sun className="h-8 w-8 mb-2 text-yellow-300" />
                      <span className="text-2xl font-bold">85%</span>
                      <span className="text-sm text-emerald-100">Renovable</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <TrendingDown className="h-8 w-8 mb-2 text-teal-300" />
                      <span className="text-2xl font-bold">-25%</span>
                      <span className="text-sm text-emerald-100">CO₂ YoY</span>
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
                          El Perfil de Energía Limpia proporciona visibilidad completa sobre el progreso 
                          de descarbonización de las plantas de producción del Motor Valley. Los datos 
                          cubren consumo energético, mix de fuentes renovables, instalaciones solares, 
                          contratos PPA y metas de neutralidad de carbono para 2030.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Tipos de Plantas</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <Badge className="bg-blue-100 text-blue-800 justify-center">Ensamblaje</Badge>
                          <Badge className="bg-orange-100 text-orange-800 justify-center">Tren Motriz</Badge>
                          <Badge className="bg-purple-100 text-purple-800 justify-center">I+D</Badge>
                          <Badge className="bg-gray-100 text-gray-800 justify-center">Logística</Badge>
                          <Badge className="bg-pink-100 text-pink-800 justify-center">Pintura</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">OEMs Incluidos</h3>
                        <p className="text-muted-foreground">
                          Ferrari, Lamborghini, Maserati, Pagani, Dallara, Ducati, y más de 15 
                          fabricantes premium del ecosistema Motor Valley.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Casos de uso</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Reporting ESG y cumplimiento CSRD</li>
                          <li>Benchmarking de eficiencia energética</li>
                          <li>Optimización de modelos AI para consumo</li>
                          <li>Planificación de inversiones en renovables</li>
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
                          Vista previa: 5 plantas de muestra
                        </Badge>
                      </div>
                      <ScrollArea className="h-[400px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Planta</TableHead>
                              <TableHead>Tipo</TableHead>
                              <TableHead>% Renovable</TableHead>
                              <TableHead>Solar kW</TableHead>
                              <TableHead>Meta 2030</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {ENERGY_SAMPLE.map((record, idx) => (
                              <TableRow key={idx}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{record.plant_name}</p>
                                    <p className="text-xs text-muted-foreground">{record.oem_owner}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={`text-xs ${getPlantTypeColor(record.plant_type)}`}>
                                    {getPlantTypeLabel(record.plant_type)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress value={record.renewable_percentage} className="w-12 h-2" />
                                    <span className={`font-semibold ${getRenewableColor(record.renewable_percentage)}`}>
                                      {record.renewable_percentage}%
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>{record.solar_pv_installed_kw.toLocaleString()}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">
                                    {record.target_2030_renewable_pct}%
                                  </Badge>
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
                          <Zap className="h-4 w-4" />
                          AI Training Permitido
                        </h4>
                        <p className="text-sm text-cyan-700">
                          Este dataset puede utilizarse para entrenamiento de modelos de optimización 
                          energética y predicción de consumo. Se recomienda para proyectos de 
                          eficiencia energética y planificación de transición energética.
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
                              <li>✓ Entrenamiento de modelos AI</li>
                              <li>✓ Reporting ESG y CSRD</li>
                              <li>✓ Benchmarking interno</li>
                              <li>✓ Publicaciones académicas</li>
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
                              <li>✗ Reventa o redistribución</li>
                              <li>✗ Uso fuera de EU + UK</li>
                              <li>✗ Compartir datos individuales</li>
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
                          Dataset disponible para organizaciones en la Unión Europea y Reino Unido. 
                          Ideal para empresas que necesitan datos de referencia para cumplimiento 
                          de la Directiva CSRD.
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
                    <span>Suscripción</span>
                    <Badge className="bg-green-100 text-green-800">ESG</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <span className="text-4xl font-bold">380€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <Separator />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Actualización trimestral
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Formato CSV + API REST
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      120+ plantas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      AI Training permitido
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Soporte CSRD incluido
                    </li>
                  </ul>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
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
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold">
                      MV
                    </div>
                    <div>
                      <p className="font-semibold">Motor Valley</p>
                      <p className="text-sm text-muted-foreground">🇮🇹 Bologna, Italia</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Custodia:</span>
                      <span>Enel X Industrial</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verificación:</span>
                      <Badge variant="outline" className="text-xs">KYB Verificado</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sector:</span>
                      <span>ESG / Energía</span>
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
