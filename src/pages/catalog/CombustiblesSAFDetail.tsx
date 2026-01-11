import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Leaf,
  Plane,
  Database,
  Globe,
  Lock,
  Fuel,
  Clock,
  RefreshCw,
  FileJson,
  Download,
  CheckCircle2,
  XCircle,
  Star,
  ChevronRight,
  Eye,
  Factory,
  TrendingDown,
  Award
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

interface SAFAdoptionRecord {
  reporting_quarter: string;
  operator_id: string;
  operator_type: "airline" | "manufacturer" | "mro_provider" | "airport";
  country: string;
  total_fuel_consumed_liters: number;
  saf_consumed_liters: number;
  saf_blend_percentage: number;
  co2_avoided_tonnes: number;
  saf_supplier: string;
  saf_feedstock: "waste_oils" | "algae" | "municipal_waste" | "power_to_liquid";
  corsia_eligible: boolean;
  emissions_scope1: number;
  emissions_scope2: number;
  emissions_reduction_yoy_pct: number;
  sustainability_certificate: string;
}

const SAF_SAMPLE: SAFAdoptionRecord[] = [
  {
    reporting_quarter: "2024-Q4",
    operator_id: "AF-001",
    operator_type: "airline",
    country: "France",
    total_fuel_consumed_liters: 45000000,
    saf_consumed_liters: 4500000,
    saf_blend_percentage: 10,
    co2_avoided_tonnes: 11250,
    saf_supplier: "TotalEnergies SAF",
    saf_feedstock: "waste_oils",
    corsia_eligible: true,
    emissions_scope1: 112500,
    emissions_scope2: 8500,
    emissions_reduction_yoy_pct: 12.5,
    sustainability_certificate: "RSB-EU-RED"
  },
  {
    reporting_quarter: "2024-Q4",
    operator_id: "LH-002",
    operator_type: "airline",
    country: "Germany",
    total_fuel_consumed_liters: 62000000,
    saf_consumed_liters: 3100000,
    saf_blend_percentage: 5,
    co2_avoided_tonnes: 7750,
    saf_supplier: "Neste MY SAF",
    saf_feedstock: "waste_oils",
    corsia_eligible: true,
    emissions_scope1: 155000,
    emissions_scope2: 12000,
    emissions_reduction_yoy_pct: 8.3,
    sustainability_certificate: "ISCC-CORSIA"
  },
  {
    reporting_quarter: "2024-Q4",
    operator_id: "AIR-MFG-003",
    operator_type: "manufacturer",
    country: "France",
    total_fuel_consumed_liters: 2800000,
    saf_consumed_liters: 840000,
    saf_blend_percentage: 30,
    co2_avoided_tonnes: 2100,
    saf_supplier: "SkyNRG",
    saf_feedstock: "power_to_liquid",
    corsia_eligible: true,
    emissions_scope1: 5600,
    emissions_scope2: 1200,
    emissions_reduction_yoy_pct: 25.0,
    sustainability_certificate: "RSB-EU-RED"
  },
  {
    reporting_quarter: "2024-Q4",
    operator_id: "CDG-APT-004",
    operator_type: "airport",
    country: "France",
    total_fuel_consumed_liters: 125000000,
    saf_consumed_liters: 6250000,
    saf_blend_percentage: 5,
    co2_avoided_tonnes: 15625,
    saf_supplier: "Multiple",
    saf_feedstock: "waste_oils",
    corsia_eligible: true,
    emissions_scope1: 0,
    emissions_scope2: 45000,
    emissions_reduction_yoy_pct: 6.2,
    sustainability_certificate: "Airport Carbon Accred."
  },
  {
    reporting_quarter: "2024-Q4",
    operator_id: "MRO-TLS-005",
    operator_type: "mro_provider",
    country: "France",
    total_fuel_consumed_liters: 450000,
    saf_consumed_liters: 225000,
    saf_blend_percentage: 50,
    co2_avoided_tonnes: 562,
    saf_supplier: "Gevo SAF",
    saf_feedstock: "algae",
    corsia_eligible: true,
    emissions_scope1: 900,
    emissions_scope2: 350,
    emissions_reduction_yoy_pct: 45.0,
    sustainability_certificate: "ISCC-CORSIA"
  }
];

const DATA_SCHEMA = [
  { field: "reporting_quarter", type: "String (YYYY-QN)", description: "Trimestre del reporte (Q1-Q4)" },
  { field: "operator_id", type: "String", description: "Identificador único del operador" },
  { field: "operator_type", type: "Enum", description: "'airline' | 'manufacturer' | 'mro_provider' | 'airport'" },
  { field: "country", type: "String (ISO 3166)", description: "País de operación principal" },
  { field: "total_fuel_consumed_liters", type: "Integer", description: "Combustible total consumido (litros)" },
  { field: "saf_consumed_liters", type: "Integer", description: "SAF consumido (litros)" },
  { field: "saf_blend_percentage", type: "Float (0-100)", description: "Porcentaje de mezcla SAF" },
  { field: "co2_avoided_tonnes", type: "Float", description: "Toneladas de CO2 evitadas" },
  { field: "saf_supplier", type: "String", description: "Proveedor del SAF" },
  { field: "saf_feedstock", type: "Enum", description: "Fuente de materia prima del SAF" },
  { field: "corsia_eligible", type: "Boolean", description: "Elegibilidad bajo esquema CORSIA" },
  { field: "emissions_scope1", type: "Float", description: "Emisiones directas (tCO2e)" },
  { field: "emissions_scope2", type: "Float", description: "Emisiones indirectas energía (tCO2e)" },
  { field: "emissions_reduction_yoy_pct", type: "Float", description: "Reducción interanual (%)" },
  { field: "sustainability_certificate", type: "String", description: "Certificación de sostenibilidad" }
];

export default function CombustiblesSAFDetail() {
  const [activeTab, setActiveTab] = useState("description");

  const getOperatorTypeLabel = (type: string) => {
    switch (type) {
      case "airline": return "Aerolínea";
      case "manufacturer": return "Fabricante";
      case "mro_provider": return "Proveedor MRO";
      case "airport": return "Aeropuerto";
      default: return type;
    }
  };

  const getFeedstockLabel = (feedstock: string) => {
    switch (feedstock) {
      case "waste_oils": return "Aceites Residuales";
      case "algae": return "Algas";
      case "municipal_waste": return "Residuos Urbanos";
      case "power_to_liquid": return "Power-to-Liquid";
      default: return feedstock;
    }
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
              <span className="text-foreground font-medium">Combustibles SAF Aviación</span>
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
                <div className="h-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="uppercase text-xs tracking-wider">
                      ESG
                    </Badge>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                          <Award className="h-3 w-3 mr-1" />
                          CORSIA Verified
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Datos elegibles bajo el esquema CORSIA de ICAO</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">
                          <Leaf className="h-3 w-3 mr-1" />
                          ESG Certified
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cumple estándares RSB y ISCC de sostenibilidad</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-900 to-emerald-700 bg-clip-text text-transparent">
                    Informe de Combustibles Sostenibles SAF en Aviación
                  </CardTitle>
                  
                  <CardDescription className="text-base mt-2">
                    Dataset trimestral con métricas de adopción de combustibles de aviación sostenibles (SAF) 
                    por aerolíneas, fabricantes, operadores MRO y aeropuertos. Incluye datos de emisiones, 
                    certificaciones CORSIA y seguimiento de reducción de huella de carbono.
                  </CardDescription>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Proveedor:</span>
                      Aerospace Valley (Toulouse)
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Custodia:</span>
                      Airbus Digital Services (Frankfurt, DE)
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
                      <span className="ml-1 font-semibold">4.7</span>
                      <span className="text-muted-foreground">(42 reseñas)</span>
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
              <Card className="bg-gradient-to-br from-green-900 to-emerald-800 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-4 w-4 text-green-300" />
                        <span className="font-semibold text-green-300">QUARTERLY</span>
                      </div>
                      <Clock className="h-8 w-8 mb-2 text-green-300" />
                      <span className="text-sm text-green-100">Trimestral</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Plane className="h-8 w-8 mb-2 text-blue-300" />
                      <span className="text-2xl font-bold">200+</span>
                      <span className="text-sm text-green-100">Operadores</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <TrendingDown className="h-8 w-8 mb-2 text-emerald-300" />
                      <span className="text-2xl font-bold">-15%</span>
                      <span className="text-sm text-green-100">CO₂ Promedio</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Award className="h-8 w-8 mb-2 text-yellow-300" />
                      <span className="text-2xl font-bold">CORSIA</span>
                      <span className="text-sm text-green-100">Certificado</span>
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
                          El Informe de Combustibles Sostenibles SAF proporciona una visión completa del progreso 
                          de la industria aeronáutica hacia la descarbonización. Los datos cubren métricas de 
                          adopción de SAF (Sustainable Aviation Fuel), incluyendo volúmenes consumidos, mezclas, 
                          proveedores, materias primas y certificaciones de sostenibilidad.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Cobertura</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>200+ operadores aeronáuticos (aerolíneas, fabricantes, MRO, aeropuertos)</li>
                          <li>Datos trimestrales desde 2022</li>
                          <li>Cobertura geográfica: EU + países miembros ICAO</li>
                          <li>Certificaciones RSB, ISCC-CORSIA y RED II</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Casos de uso</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Reporting ESG y cumplimiento CORSIA</li>
                          <li>Análisis de tendencias de descarbonización</li>
                          <li>Benchmarking de adopción SAF entre competidores</li>
                          <li>Planificación de inversiones en sostenibilidad</li>
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
                          Vista previa: 5 registros de muestra
                        </Badge>
                      </div>
                      <ScrollArea className="h-[400px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Trimestre</TableHead>
                              <TableHead>Operador</TableHead>
                              <TableHead>Tipo</TableHead>
                              <TableHead>SAF %</TableHead>
                              <TableHead>CO₂ Evitado</TableHead>
                              <TableHead>CORSIA</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {SAF_SAMPLE.map((record, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{record.reporting_quarter}</TableCell>
                                <TableCell className="font-mono text-xs">{record.operator_id}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">
                                    {getOperatorTypeLabel(record.operator_type)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <span className="font-semibold text-green-600">{record.saf_blend_percentage}%</span>
                                </TableCell>
                                <TableCell>{record.co2_avoided_tonnes.toLocaleString()} t</TableCell>
                                <TableCell>
                                  {record.corsia_eligible ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="rights" className="p-6 space-y-4">
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
                              <li>✓ Entrenamiento de modelos AI (predicción climática)</li>
                              <li>✓ Análisis interno y reporting ESG</li>
                              <li>✓ Integración en dashboards corporativos</li>
                              <li>✓ Publicaciones académicas (con atribución)</li>
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
                              <li>✗ Reventa o sublicenciamiento</li>
                              <li>✗ Compartir con terceros no autorizados</li>
                              <li>✗ Uso fuera de zona EU + ICAO members</li>
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
                          Este dataset está disponible únicamente para organizaciones con sede en la 
                          Unión Europea o países miembros de ICAO (Organización de Aviación Civil Internacional).
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
                    <span className="text-4xl font-bold">420€</span>
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
                      Formato JSON + XBRL
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      API REST incluida
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Soporte técnico 24/7
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      AI Training permitido
                    </li>
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
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
                      <span>Airbus Digital Services</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verificación:</span>
                      <Badge variant="outline" className="text-xs">KYB Verificado</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sector:</span>
                      <span>Aeronáutica</span>
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
