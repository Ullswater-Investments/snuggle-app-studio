import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Database, 
  Shield, 
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building,
  Download,
  Leaf,
  Droplets,
  Zap,
  Factory,
  Recycle,
  TreePine,
  Waves,
  Beaker,
  TrendingDown,
  BarChart2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Data interfaces
interface ChipFabEnvironmentalImpact {
  fab_id: string;
  fab_name: string;
  operator: string;
  location_country: string;
  location_city: string;
  process_type: "logic" | "memory" | "analog" | "mems" | "power" | "photonics";
  process_node_nm: number;
  reporting_quarter: string;
  water_consumption_m3: number;
  water_recycled_pct: number;
  ultrapure_water_m3: number;
  energy_consumption_mwh: number;
  renewable_energy_pct: number;
  co2_emissions_scope1_tonnes: number;
  co2_emissions_scope2_tonnes: number;
  pfc_emissions_tonnes_co2eq: number;
  waste_generated_tonnes: number;
  waste_recycled_pct: number;
  chemicals_used_tonnes: number;
  chemicals_recycled_pct: number;
  water_intensity_liters_per_wafer: number;
  energy_intensity_kwh_per_wafer: number;
}

const ENVIRONMENTAL_SAMPLE: ChipFabEnvironmentalImpact[] = [
  {
    fab_id: "NXP-EHV-FAB1",
    fab_name: "NXP Eindhoven Fab 1",
    operator: "NXP Semiconductors",
    location_country: "Netherlands",
    location_city: "Eindhoven",
    process_type: "analog",
    process_node_nm: 40,
    reporting_quarter: "Q4-2025",
    water_consumption_m3: 285000,
    water_recycled_pct: 72,
    ultrapure_water_m3: 145000,
    energy_consumption_mwh: 42500,
    renewable_energy_pct: 85,
    co2_emissions_scope1_tonnes: 1250,
    co2_emissions_scope2_tonnes: 3800,
    pfc_emissions_tonnes_co2eq: 890,
    waste_generated_tonnes: 1850,
    waste_recycled_pct: 91,
    chemicals_used_tonnes: 425,
    chemicals_recycled_pct: 45,
    water_intensity_liters_per_wafer: 1850,
    energy_intensity_kwh_per_wafer: 285
  },
  {
    fab_id: "INF-DRS-FAB2",
    fab_name: "Infineon Dresden Fab",
    operator: "Infineon Technologies",
    location_country: "Germany",
    location_city: "Dresden",
    process_type: "power",
    process_node_nm: 28,
    reporting_quarter: "Q4-2025",
    water_consumption_m3: 520000,
    water_recycled_pct: 78,
    ultrapure_water_m3: 285000,
    energy_consumption_mwh: 68000,
    renewable_energy_pct: 92,
    co2_emissions_scope1_tonnes: 1850,
    co2_emissions_scope2_tonnes: 2100,
    pfc_emissions_tonnes_co2eq: 1250,
    waste_generated_tonnes: 2450,
    waste_recycled_pct: 88,
    chemicals_used_tonnes: 680,
    chemicals_recycled_pct: 52,
    water_intensity_liters_per_wafer: 2100,
    energy_intensity_kwh_per_wafer: 320
  },
  {
    fab_id: "STM-CRL-FAB3",
    fab_name: "STMicro Crolles Mega-Fab",
    operator: "STMicroelectronics",
    location_country: "France",
    location_city: "Crolles",
    process_type: "logic",
    process_node_nm: 18,
    reporting_quarter: "Q4-2025",
    water_consumption_m3: 780000,
    water_recycled_pct: 82,
    ultrapure_water_m3: 420000,
    energy_consumption_mwh: 125000,
    renewable_energy_pct: 95,
    co2_emissions_scope1_tonnes: 2100,
    co2_emissions_scope2_tonnes: 1850,
    pfc_emissions_tonnes_co2eq: 1680,
    waste_generated_tonnes: 3200,
    waste_recycled_pct: 94,
    chemicals_used_tonnes: 920,
    chemicals_recycled_pct: 58,
    water_intensity_liters_per_wafer: 2450,
    energy_intensity_kwh_per_wafer: 395
  }
];

const DATA_SCHEMA = [
  { field: "fab_id", type: "string", description: "Identificador único de la fábrica" },
  { field: "fab_name", type: "string", description: "Nombre de la instalación" },
  { field: "operator", type: "string", description: "Empresa operadora" },
  { field: "location_country", type: "string", description: "País de ubicación" },
  { field: "location_city", type: "string", description: "Ciudad de ubicación" },
  { field: "process_type", type: "enum", description: "Tipo de proceso: logic, memory, analog, mems, power, photonics" },
  { field: "process_node_nm", type: "integer", description: "Nodo de proceso en nanómetros" },
  { field: "reporting_quarter", type: "string", description: "Trimestre de reporte (Q1-Q4 YYYY)" },
  { field: "water_consumption_m3", type: "float", description: "Consumo total de agua (m³)" },
  { field: "water_recycled_pct", type: "float", description: "Porcentaje de agua reciclada" },
  { field: "ultrapure_water_m3", type: "float", description: "Agua ultrapura consumida (m³)" },
  { field: "energy_consumption_mwh", type: "float", description: "Consumo energético (MWh)" },
  { field: "renewable_energy_pct", type: "float", description: "Porcentaje de energía renovable" },
  { field: "co2_emissions_scope1_tonnes", type: "float", description: "Emisiones CO₂ Scope 1 (toneladas)" },
  { field: "co2_emissions_scope2_tonnes", type: "float", description: "Emisiones CO₂ Scope 2 (toneladas)" },
  { field: "pfc_emissions_tonnes_co2eq", type: "float", description: "Emisiones PFC (toneladas CO₂eq)" },
  { field: "waste_generated_tonnes", type: "float", description: "Residuos generados (toneladas)" },
  { field: "waste_recycled_pct", type: "float", description: "Porcentaje de residuos reciclados" },
  { field: "chemicals_used_tonnes", type: "float", description: "Químicos utilizados (toneladas)" },
  { field: "chemicals_recycled_pct", type: "float", description: "Porcentaje de químicos reciclados" },
  { field: "water_intensity_liters_per_wafer", type: "float", description: "Intensidad de agua (L/wafer)" },
  { field: "energy_intensity_kwh_per_wafer", type: "float", description: "Intensidad energética (kWh/wafer)" }
];

export default function ImpactoAmbientalChipsDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");

  const getProcessTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      logic: "Lógica",
      memory: "Memoria",
      analog: "Analógico",
      mems: "MEMS",
      power: "Potencia",
      photonics: "Fotónica"
    };
    return labels[type] || type;
  };

  const getProcessTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      logic: "bg-blue-100 text-blue-800",
      memory: "bg-purple-100 text-purple-800",
      analog: "bg-orange-100 text-orange-800",
      mems: "bg-cyan-100 text-cyan-800",
      power: "bg-red-100 text-red-800",
      photonics: "bg-green-100 text-green-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/partners/premium')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Catálogo de Partners
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 overflow-hidden border-green-200">
            <div className="h-2 bg-gradient-to-r from-green-500 via-teal-400 to-cyan-500" />
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs px-2">
                      🇳🇱 Brainport Eindhoven (NL)
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Leaf className="h-3 w-3 mr-1" />
                      ESG
                    </Badge>
                    <Badge className="bg-teal-100 text-teal-800 border-teal-200">
                      <Droplets className="h-3 w-3 mr-1" />
                      Water Stewardship
                    </Badge>
                    <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200">
                      <TreePine className="h-3 w-3 mr-1" />
                      Carbon Neutral
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">
                    Impacto Ambiental de la Fabricación de Chips
                  </CardTitle>
                  <CardDescription className="text-base max-w-2xl">
                    Métricas ESG trimestrales de más de 150 fábricas de semiconductores en Europa. 
                    Consumo de agua, energía, emisiones de CO₂ y gestión de residuos químicos.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 px-3 py-1">
                          <Leaf className="h-4 w-4 mr-1" />
                          ESG Verified
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Datos verificados por NXP Sustainability Office</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Hero Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center p-4 bg-gradient-to-br from-green-50 to-teal-50 border-green-100">
              <div className="text-3xl font-bold text-green-700">+150</div>
              <div className="text-sm text-muted-foreground">Fábricas Monitorizadas</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
              <div className="text-3xl font-bold text-blue-700">6</div>
              <div className="text-sm text-muted-foreground">Tipos de Proceso</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-teal-50 to-green-50 border-teal-100">
              <div className="text-3xl font-bold text-teal-700">Trimestral</div>
              <div className="text-sm text-muted-foreground">Actualización</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-100">
              <div className="text-3xl font-bold text-emerald-700">CSV + XBRL</div>
              <div className="text-sm text-muted-foreground">Formatos ESG</div>
            </Card>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="schema">Estructura</TabsTrigger>
                <TabsTrigger value="sample">Muestra</TabsTrigger>
                <TabsTrigger value="rights">Derechos</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Descripción del Dataset
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      El dataset de <strong>Impacto Ambiental de la Fabricación de Chips</strong> proporciona 
                      métricas ESG detalladas de las principales fábricas de semiconductores en Europa. 
                      Diseñado para informes de sostenibilidad y optimización ambiental.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Waves className="h-4 w-4 text-green-600" />
                          Métricas de Agua
                        </h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Consumo total de agua</li>
                          <li>• Agua ultrapura (UPW)</li>
                          <li>• Porcentaje de reciclaje</li>
                          <li>• Intensidad por wafer</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-teal-50 border border-teal-100">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-teal-600" />
                          Métricas de Energía
                        </h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Consumo energético total</li>
                          <li>• Energía renovable (%)</li>
                          <li>• Emisiones Scope 1 y 2</li>
                          <li>• Emisiones PFC</li>
                        </ul>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-100">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Recycle className="h-4 w-4 text-cyan-600" />
                          Gestión de Residuos
                        </h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Residuos generados</li>
                          <li>• Tasa de reciclaje</li>
                          <li>• Químicos utilizados</li>
                          <li>• Reciclaje de químicos</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-emerald-600" />
                          Custodio de Datos
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>NXP Semiconductors Sustainability Office</strong> - Eindhoven
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Datos consolidados del European Semiconductor ESG Consortium.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 mt-4">
                      <h4 className="font-semibold mb-2">Casos de Uso Principales</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Reportes ESG y CSRD para inversores
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Benchmarking de eficiencia ambiental
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Optimización de procesos mediante AI
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Due diligence ambiental de proveedores
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schema" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Estructura de Datos
                    </CardTitle>
                    <CardDescription>
                      Esquema de métricas ambientales por fábrica
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Campo</TableHead>
                            <TableHead className="w-[100px]">Tipo</TableHead>
                            <TableHead>Descripción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {DATA_SCHEMA.map((field) => (
                            <TableRow key={field.field}>
                              <TableCell className="font-mono text-sm">{field.field}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {field.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {field.description}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sample" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5" />
                      Muestra de Datos Ambientales
                    </CardTitle>
                    <CardDescription>
                      Métricas ESG de fábricas europeas (Q4 2025)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fábrica</TableHead>
                            <TableHead>Proceso</TableHead>
                            <TableHead>Agua</TableHead>
                            <TableHead>Energía</TableHead>
                            <TableHead>CO₂ Total</TableHead>
                            <TableHead>Reciclaje</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ENVIRONMENTAL_SAMPLE.map((record) => (
                            <TableRow key={record.fab_id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-sm">{record.fab_name}</div>
                                  <div className="text-xs text-muted-foreground">{record.location_city}, {record.location_country}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getProcessTypeColor(record.process_type)}>
                                  {getProcessTypeLabel(record.process_type)}
                                </Badge>
                                <div className="text-xs text-muted-foreground mt-1">{record.process_node_nm}nm</div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm">
                                  <Droplets className="h-3 w-3 text-blue-500" />
                                  {(record.water_consumption_m3 / 1000).toFixed(0)}k m³
                                </div>
                                <div className="text-xs text-green-600">
                                  {record.water_recycled_pct}% reciclada
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm">
                                  <Zap className="h-3 w-3 text-yellow-500" />
                                  {(record.energy_consumption_mwh / 1000).toFixed(0)}k MWh
                                </div>
                                <div className="text-xs text-green-600">
                                  {record.renewable_energy_pct}% renovable
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm font-medium">
                                  {((record.co2_emissions_scope1_tonnes + record.co2_emissions_scope2_tonnes) / 1000).toFixed(1)}k t
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  +{(record.pfc_emissions_tonnes_co2eq / 1000).toFixed(1)}k PFC
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <Progress value={record.waste_recycled_pct} className="w-12 h-2" />
                                    <span className="text-xs">{record.waste_recycled_pct}%</span>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rights" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Derechos de Uso (ODRL)
                    </CardTitle>
                    <CardDescription>
                      Condiciones para datos ESG
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-green-700 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Usos Permitidos
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Reportes ESG y CSRD corporativos
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Entrenamiento de modelos AI de optimización
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Uso global (reporting ESG internacional)
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Benchmarking sectorial agregado
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-red-700 flex items-center gap-2">
                          <XCircle className="h-5 w-5" />
                          Usos Prohibidos
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Reventa de datos brutos
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Publicación de métricas individuales sin consentimiento
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Uso para campañas de desprestigio
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold flex items-center gap-2 mb-2 text-green-800">
                        <TrendingDown className="h-5 w-5" />
                        AI Training Autorizado
                      </h4>
                      <p className="text-sm text-green-700">
                        Este dataset puede utilizarse para entrenar modelos de inteligencia artificial 
                        enfocados en la optimización de procesos y reducción del impacto ambiental. 
                        Los modelos derivados deben atribuir la fuente de datos.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-green-200 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
                  <CardTitle className="text-xl">Suscripción ESG</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-green-700">420€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Actualización trimestral (Q1-Q4)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      +150 fábricas monitorizadas
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Formatos CSV + XBRL (ESG standard)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      AI training autorizado
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Dashboard de visualización
                    </li>
                  </ul>

                  <Separator />

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Solicitar Acceso
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Descargar Ficha Técnica
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Provider Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Proveedor de Datos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">NXP Sustainability Office</div>
                      <div className="text-sm text-muted-foreground">Eindhoven, Países Bajos</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo</span>
                      <span className="font-medium">ESG Data Provider</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fábricas</span>
                      <span className="font-medium">+150</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Desde</span>
                      <span className="font-medium">2020</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Update Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Beaker className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-semibold">Próximo Reporte</div>
                      <div className="text-2xl font-bold text-green-700">Q1 2026</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Los datos ESG se publican 45 días después del cierre de cada trimestre, 
                    permitiendo la consolidación y verificación de métricas.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
