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
  TrendingUp,
  TrendingDown,
  Gem,
  Car,
  DollarSign,
  BarChart3,
  Package,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Data interfaces
interface SupercarComponentPricing {
  component_id: string;
  component_name: string;
  category: "engine" | "transmission" | "exhaust" | "suspension" | "brakes" | "interior" | "electronics" | "body_panels";
  subcategory: string;
  oem_applications: string[];
  manufacturer: string;
  country_origin: string;
  unit_price_eur: number;
  price_change_mom_pct: number;
  price_change_yoy_pct: number;
  supply_chain_risk: "low" | "medium" | "high" | "critical";
  lead_time_weeks: number;
  material_composition: string[];
  weight_kg: number;
  is_custom_order: boolean;
  minimum_order_qty: number;
  certification_standards: string[];
}

const SUPERCAR_SAMPLE: SupercarComponentPricing[] = [
  {
    component_id: "SC-ENG-V12-001",
    component_name: "V12 Naturally Aspirated Engine Block",
    category: "engine",
    subcategory: "Engine Block",
    oem_applications: ["Ferrari 812 Superfast", "Lamborghini Aventador"],
    manufacturer: "Motori Ferrari S.p.A.",
    country_origin: "Italy",
    unit_price_eur: 185000,
    price_change_mom_pct: 2.3,
    price_change_yoy_pct: 8.7,
    supply_chain_risk: "medium",
    lead_time_weeks: 16,
    material_composition: ["Aluminum alloy", "Titanium", "Inconel"],
    weight_kg: 198,
    is_custom_order: true,
    minimum_order_qty: 1,
    certification_standards: ["ISO 9001", "IATF 16949"]
  },
  {
    component_id: "SC-TRN-DCT-002",
    component_name: "7-Speed Dual-Clutch Transmission Assembly",
    category: "transmission",
    subcategory: "Complete Gearbox",
    oem_applications: ["Porsche 911 GT3", "McLaren 720S"],
    manufacturer: "Getrag Ford Transmissions",
    country_origin: "Germany",
    unit_price_eur: 42500,
    price_change_mom_pct: -0.8,
    price_change_yoy_pct: 5.2,
    supply_chain_risk: "low",
    lead_time_weeks: 12,
    material_composition: ["Steel", "Aluminum", "Carbon fiber synchros"],
    weight_kg: 87,
    is_custom_order: false,
    minimum_order_qty: 5,
    certification_standards: ["ISO 9001", "IATF 16949", "VDA 6.3"]
  },
  {
    component_id: "SC-BRK-CCM-003",
    component_name: "Carbon Ceramic Brake Disc Set (Front)",
    category: "brakes",
    subcategory: "Brake Discs",
    oem_applications: ["Ferrari SF90", "Bugatti Chiron", "Pagani Huayra"],
    manufacturer: "Brembo S.p.A.",
    country_origin: "Italy",
    unit_price_eur: 28900,
    price_change_mom_pct: 4.1,
    price_change_yoy_pct: 12.5,
    supply_chain_risk: "high",
    lead_time_weeks: 20,
    material_composition: ["Carbon fiber", "Silicon carbide", "Ceramic matrix"],
    weight_kg: 4.2,
    is_custom_order: true,
    minimum_order_qty: 2,
    certification_standards: ["ECE R90", "ISO 9001"]
  },
  {
    component_id: "SC-INT-SEA-004",
    component_name: "Full Carbon Racing Seat",
    category: "interior",
    subcategory: "Seating",
    oem_applications: ["Lamborghini Essenza SCV12", "Ferrari FXX-K"],
    manufacturer: "Sparco S.p.A.",
    country_origin: "Italy",
    unit_price_eur: 15800,
    price_change_mom_pct: 1.2,
    price_change_yoy_pct: 6.8,
    supply_chain_risk: "low",
    lead_time_weeks: 8,
    material_composition: ["Carbon fiber", "Alcantara", "FIA-homologated foam"],
    weight_kg: 5.8,
    is_custom_order: true,
    minimum_order_qty: 2,
    certification_standards: ["FIA 8862-2009", "ISO 9001"]
  }
];

const DATA_SCHEMA = [
  { field: "component_id", type: "string", description: "Identificador único del componente" },
  { field: "component_name", type: "string", description: "Nombre comercial completo" },
  { field: "category", type: "enum", description: "Categoría: engine, transmission, exhaust, suspension, brakes, interior, electronics, body_panels" },
  { field: "subcategory", type: "string", description: "Subcategoría específica" },
  { field: "oem_applications", type: "array[string]", description: "Vehículos donde se aplica este componente" },
  { field: "manufacturer", type: "string", description: "Fabricante del componente" },
  { field: "country_origin", type: "string", description: "País de origen" },
  { field: "unit_price_eur", type: "float", description: "Precio unitario en EUR" },
  { field: "price_change_mom_pct", type: "float", description: "Cambio de precio mes a mes (%)" },
  { field: "price_change_yoy_pct", type: "float", description: "Cambio de precio año a año (%)" },
  { field: "supply_chain_risk", type: "enum", description: "Nivel de riesgo: low, medium, high, critical" },
  { field: "lead_time_weeks", type: "integer", description: "Tiempo de entrega en semanas" },
  { field: "material_composition", type: "array[string]", description: "Composición de materiales" },
  { field: "weight_kg", type: "float", description: "Peso en kilogramos" },
  { field: "is_custom_order", type: "boolean", description: "Si requiere pedido personalizado" },
  { field: "minimum_order_qty", type: "integer", description: "Cantidad mínima de pedido" },
  { field: "certification_standards", type: "array[string]", description: "Estándares de certificación" }
];

export default function PreciosComponentesSuperdeportivosDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      engine: "Motor",
      transmission: "Transmisión",
      exhaust: "Escape",
      suspension: "Suspensión",
      brakes: "Frenos",
      interior: "Interior",
      electronics: "Electrónica",
      body_panels: "Carrocería"
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      engine: "bg-red-100 text-red-800",
      transmission: "bg-blue-100 text-blue-800",
      exhaust: "bg-gray-100 text-gray-800",
      suspension: "bg-orange-100 text-orange-800",
      brakes: "bg-yellow-100 text-yellow-800",
      interior: "bg-purple-100 text-purple-800",
      electronics: "bg-cyan-100 text-cyan-800",
      body_panels: "bg-emerald-100 text-emerald-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getRiskColor = (risk: string) => {
    const colors: Record<string, string> = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800"
    };
    return colors[risk] || "bg-gray-100 text-gray-800";
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
          <Card className="mb-8 overflow-hidden border-amber-200">
            <div className="h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500" />
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs px-2">
                      🇮🇹 Motor Valley (IT)
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Market
                    </Badge>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      <Gem className="h-3 w-3 mr-1" />
                      Supercar Index
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Exclusive Data
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">
                    Índice de Precios de Componentes de Superdeportivos
                  </CardTitle>
                  <CardDescription className="text-base max-w-2xl">
                    Benchmark mensual de costes de componentes premium para fabricantes de superdeportivos 
                    y vehículos de ultra-alto rendimiento. Información exclusiva del ecosistema Motor Valley.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 px-3 py-1">
                          <Shield className="h-4 w-4 mr-1" />
                          KYB Verificado
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Proveedor verificado por Motor Valley BI</p>
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
            <Card className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
              <div className="text-3xl font-bold text-amber-700">+2.000</div>
              <div className="text-sm text-muted-foreground">Componentes</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
              <div className="text-3xl font-bold text-purple-700">8</div>
              <div className="text-sm text-muted-foreground">Categorías</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <div className="text-3xl font-bold text-blue-700">Mensual</div>
              <div className="text-sm text-muted-foreground">Actualización</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
              <div className="text-3xl font-bold text-green-700">Excel + API</div>
              <div className="text-sm text-muted-foreground">Formatos</div>
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
                      El <strong>Índice de Precios de Componentes de Superdeportivos</strong> es el benchmark 
                      más completo del mercado para fabricantes de vehículos de ultra-alto rendimiento. 
                      Cubre más de 2.000 componentes premium desde motores V12 hasta sistemas de frenos 
                      cerámicos de carbono.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Car className="h-4 w-4 text-amber-600" />
                          Marcas Cubiertas
                        </h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Ferrari, Lamborghini, Pagani</li>
                          <li>• McLaren, Bugatti, Koenigsegg</li>
                          <li>• Porsche (GT Division)</li>
                          <li>• Aston Martin, Maserati</li>
                          <li>• Rimac, Pininfarina</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-purple-600" />
                          Custodio de Datos
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Motor Valley Business Intelligence</strong> - Maranello, Italia
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Datos recopilados directamente de proveedores tier-1 y OEMs mediante 
                          acuerdos de confidencialidad bilateral.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 mt-4">
                      <h4 className="font-semibold mb-2">Casos de Uso Principales</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Negociación de contratos con proveedores tier-1
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Análisis de tendencias de precios de materiales críticos
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Evaluación de riesgos de cadena de suministro
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Planificación de costes para nuevos modelos
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
                      Esquema del índice de precios de componentes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[180px]">Campo</TableHead>
                            <TableHead className="w-[120px]">Tipo</TableHead>
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
                      <FileText className="h-5 w-5" />
                      Muestra de Datos
                    </CardTitle>
                    <CardDescription>
                      Ejemplo de componentes con precios actuales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Componente</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Precio EUR</TableHead>
                            <TableHead>Var. MoM</TableHead>
                            <TableHead>Riesgo</TableHead>
                            <TableHead>Lead Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {SUPERCAR_SAMPLE.map((record) => (
                            <TableRow key={record.component_id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-sm">{record.component_name}</div>
                                  <div className="text-xs text-muted-foreground">{record.manufacturer}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getCategoryColor(record.category)}>
                                  {getCategoryLabel(record.category)}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-bold">
                                €{record.unit_price_eur.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <div className={`flex items-center gap-1 ${record.price_change_mom_pct >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                                  {record.price_change_mom_pct >= 0 ? (
                                    <TrendingUp className="h-3 w-3" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3" />
                                  )}
                                  {record.price_change_mom_pct >= 0 ? '+' : ''}{record.price_change_mom_pct}%
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getRiskColor(record.supply_chain_risk)}>
                                  {record.supply_chain_risk.toUpperCase()}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm">
                                {record.lead_time_weeks} semanas
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
                      Condiciones de licencia para datos comerciales confidenciales
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
                            Análisis interno de costes y negociación
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Reportes internos para dirección
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Uso en EU + USA + Middle East
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Integración con sistemas ERP propios
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
                            Entrenamiento de modelos AI (información comercial)
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Reventa o sublicencia (datos propietarios)
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Publicación de precios individuales
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Compartir con competidores directos
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                      <h4 className="font-semibold flex items-center gap-2 mb-2 text-amber-800">
                        <AlertTriangle className="h-5 w-5" />
                        Confidencialidad Extrema
                      </h4>
                      <p className="text-sm text-amber-700">
                        Este dataset contiene información comercial altamente sensible. El acceso requiere 
                        firma de NDA específico con Motor Valley BI. Violaciones pueden resultar en 
                        acciones legales y exclusión permanente del ecosistema.
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
              <Card className="border-amber-200 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
                  <CardTitle className="text-xl">Suscripción Exclusiva</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-amber-700">720€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Actualización mensual (día 1 hábil)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Formatos Excel + JSON API
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      +2.000 componentes indexados
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Análisis de tendencias YoY/MoM
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Indicadores de riesgo supply chain
                    </li>
                  </ul>

                  <Separator />

                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
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
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                      <Gem className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Motor Valley BI</div>
                      <div className="text-sm text-muted-foreground">Maranello, Italia</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo</span>
                      <span className="font-medium">Business Intelligence</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verificación</span>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        KYB Verificado
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Componentes</span>
                      <span className="font-medium">+2.000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Update Frequency */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-8 w-8 text-amber-600" />
                    <div>
                      <div className="font-semibold">Próxima Actualización</div>
                      <div className="text-2xl font-bold text-amber-700">1 Febrero 2026</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Los índices se actualizan el primer día hábil de cada mes con datos 
                    consolidados del mes anterior.
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
