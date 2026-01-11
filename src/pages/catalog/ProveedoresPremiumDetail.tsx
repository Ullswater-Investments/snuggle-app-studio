import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
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
  Building2,
  Award,
  MapPin,
  Users,
  Car,
  Gem
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

interface PremiumSupplierRecord {
  supplier_id: string;
  company_name: string;
  vat_number: string;
  region: string;
  province: string;
  specialty: "bodywork" | "leather" | "electronics" | "engine_parts" | "suspension" | "carbon_fiber";
  tier_level: "tier_1" | "tier_2";
  oem_partnerships: string[];
  founded_year: number;
  employees: number;
  revenue_range_eur: string;
  iso_certifications: string[];
  iatf_certified: boolean;
  artisan_classification: boolean;
  sustainability_rating: string;
  lead_time_weeks: number;
  capacity_utilization_pct: number;
  reputation_score: number;
}

const SUPPLIER_SAMPLE: PremiumSupplierRecord[] = [
  {
    supplier_id: "MV-SUP-001",
    company_name: "Carrozzeria Touring Superleggera",
    vat_number: "IT01234567890",
    region: "Lombardia",
    province: "Milano",
    specialty: "bodywork",
    tier_level: "tier_1",
    oem_partnerships: ["Ferrari", "Alfa Romeo", "Maserati"],
    founded_year: 1926,
    employees: 85,
    revenue_range_eur: "20-50M",
    iso_certifications: ["ISO 9001:2015", "ISO 14001:2015"],
    iatf_certified: true,
    artisan_classification: true,
    sustainability_rating: "A",
    lead_time_weeks: 12,
    capacity_utilization_pct: 78,
    reputation_score: 4.9
  },
  {
    supplier_id: "MV-SUP-002",
    company_name: "Poltrona Frau Interiors",
    vat_number: "IT09876543210",
    region: "Marche",
    province: "Macerata",
    specialty: "leather",
    tier_level: "tier_1",
    oem_partnerships: ["Ferrari", "Lamborghini", "Bentley", "Rolls-Royce"],
    founded_year: 1912,
    employees: 420,
    revenue_range_eur: "100-200M",
    iso_certifications: ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"],
    iatf_certified: true,
    artisan_classification: true,
    sustainability_rating: "A+",
    lead_time_weeks: 8,
    capacity_utilization_pct: 85,
    reputation_score: 5.0
  },
  {
    supplier_id: "MV-SUP-003",
    company_name: "Magneti Marelli Racing",
    vat_number: "IT11223344556",
    region: "Emilia-Romagna",
    province: "Bologna",
    specialty: "electronics",
    tier_level: "tier_1",
    oem_partnerships: ["Ferrari", "Ducati", "Maserati", "Alfa Romeo"],
    founded_year: 1919,
    employees: 1200,
    revenue_range_eur: "500M+",
    iso_certifications: ["ISO 9001:2015", "ISO 14001:2015", "IATF 16949:2016"],
    iatf_certified: true,
    artisan_classification: false,
    sustainability_rating: "A",
    lead_time_weeks: 6,
    capacity_utilization_pct: 72,
    reputation_score: 4.7
  },
  {
    supplier_id: "MV-SUP-004",
    company_name: "Dallara Compositi",
    vat_number: "IT55667788990",
    region: "Emilia-Romagna",
    province: "Parma",
    specialty: "carbon_fiber",
    tier_level: "tier_1",
    oem_partnerships: ["Lamborghini", "Bugatti", "Pagani"],
    founded_year: 1972,
    employees: 650,
    revenue_range_eur: "200-500M",
    iso_certifications: ["ISO 9001:2015", "AS9100D"],
    iatf_certified: true,
    artisan_classification: false,
    sustainability_rating: "A",
    lead_time_weeks: 10,
    capacity_utilization_pct: 88,
    reputation_score: 4.8
  },
  {
    supplier_id: "MV-SUP-005",
    company_name: "Brembo Performance",
    vat_number: "IT99887766554",
    region: "Lombardia",
    province: "Bergamo",
    specialty: "suspension",
    tier_level: "tier_1",
    oem_partnerships: ["Ferrari", "Porsche", "McLaren", "Aston Martin"],
    founded_year: 1961,
    employees: 2500,
    revenue_range_eur: "500M+",
    iso_certifications: ["ISO 9001:2015", "IATF 16949:2016", "ISO 14001:2015"],
    iatf_certified: true,
    artisan_classification: false,
    sustainability_rating: "A+",
    lead_time_weeks: 4,
    capacity_utilization_pct: 82,
    reputation_score: 4.9
  }
];

const DATA_SCHEMA = [
  { field: "supplier_id", type: "String", description: "Identificador único del proveedor" },
  { field: "company_name", type: "String", description: "Nombre comercial de la empresa" },
  { field: "vat_number", type: "String", description: "Número de IVA italiano" },
  { field: "region", type: "String", description: "Región italiana" },
  { field: "province", type: "String", description: "Provincia" },
  { field: "specialty", type: "Enum", description: "Especialidad principal" },
  { field: "tier_level", type: "Enum", description: "Nivel en la cadena (Tier 1/2)" },
  { field: "oem_partnerships", type: "Array[String]", description: "OEMs con los que trabaja" },
  { field: "founded_year", type: "Integer", description: "Año de fundación" },
  { field: "employees", type: "Integer", description: "Número de empleados" },
  { field: "revenue_range_eur", type: "String", description: "Rango de facturación" },
  { field: "iso_certifications", type: "Array[String]", description: "Certificaciones ISO" },
  { field: "iatf_certified", type: "Boolean", description: "Certificación IATF 16949" },
  { field: "artisan_classification", type: "Boolean", description: "Clasificación artesanal" },
  { field: "sustainability_rating", type: "String", description: "Rating de sostenibilidad" },
  { field: "lead_time_weeks", type: "Integer", description: "Tiempo de entrega (semanas)" },
  { field: "capacity_utilization_pct", type: "Float", description: "Utilización de capacidad (%)" },
  { field: "reputation_score", type: "Float", description: "Puntuación de reputación (1-5)" }
];

export default function ProveedoresPremiumDetail() {
  const [activeTab, setActiveTab] = useState("description");

  const getSpecialtyLabel = (specialty: string) => {
    switch (specialty) {
      case "bodywork": return "Carrocería";
      case "leather": return "Piel/Cuero";
      case "electronics": return "Electrónica";
      case "engine_parts": return "Motor";
      case "suspension": return "Suspensión/Frenos";
      case "carbon_fiber": return "Fibra Carbono";
      default: return specialty;
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case "bodywork": return "bg-red-100 text-red-800";
      case "leather": return "bg-amber-100 text-amber-800";
      case "electronics": return "bg-blue-100 text-blue-800";
      case "engine_parts": return "bg-gray-100 text-gray-800";
      case "suspension": return "bg-orange-100 text-orange-800";
      case "carbon_fiber": return "bg-slate-100 text-slate-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
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
              <span className="text-foreground font-medium">Proveedores Premium Automotrices</span>
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
                <div className="h-3 bg-gradient-to-r from-red-600 via-red-500 to-rose-500" />
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="uppercase text-xs tracking-wider">
                      Compliance
                    </Badge>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Verified Premium
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Proveedores verificados y auditados</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                          <Award className="h-3 w-3 mr-1" />
                          Made in Italy
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Proveedores 100% italianos certificados</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-900 to-rose-700 bg-clip-text text-transparent">
                    Registro de Proveedores Premium Automotrices
                  </CardTitle>
                  
                  <CardDescription className="text-base mt-2">
                    Directorio verificado del ecosistema de proveedores de lujo del Motor Valley italiano. 
                    Incluye información detallada de capacidades, certificaciones, partnerships con OEMs 
                    y ratings de sostenibilidad de más de 300 proveedores Tier 1 y Tier 2.
                  </CardDescription>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Proveedor:</span>
                      Motor Valley (Bologna)
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Custodia:</span>
                      Confindustria Digital Hub
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
                      <span className="text-muted-foreground">(67 reseñas)</span>
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
              <Card className="bg-gradient-to-br from-red-900 to-rose-800 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-4 w-4 text-red-300" />
                        <span className="font-semibold text-red-300">MONTHLY</span>
                      </div>
                      <Clock className="h-8 w-8 mb-2 text-red-300" />
                      <span className="text-sm text-red-100">Día 15 cada mes</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Building2 className="h-8 w-8 mb-2 text-rose-300" />
                      <span className="text-2xl font-bold">300+</span>
                      <span className="text-sm text-red-100">Proveedores</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Car className="h-8 w-8 mb-2 text-pink-300" />
                      <span className="text-2xl font-bold">15+</span>
                      <span className="text-sm text-red-100">OEMs de Lujo</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <MapPin className="h-8 w-8 mb-2 text-orange-300" />
                      <span className="text-2xl font-bold">🇮🇹</span>
                      <span className="text-sm text-red-100">Made in Italy</span>
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
                          El Registro de Proveedores Premium es el directorio más completo del ecosistema 
                          de proveedores de la industria automotriz de lujo italiana. Incluye información 
                          verificada sobre capacidades, certificaciones, relaciones con OEMs y métricas 
                          de sostenibilidad de empresas que forman parte del legendario Motor Valley.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Especialidades Cubiertas</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <Badge className="bg-red-100 text-red-800 justify-center">Carrocería</Badge>
                          <Badge className="bg-amber-100 text-amber-800 justify-center">Piel/Cuero</Badge>
                          <Badge className="bg-blue-100 text-blue-800 justify-center">Electrónica</Badge>
                          <Badge className="bg-gray-100 text-gray-800 justify-center">Motor</Badge>
                          <Badge className="bg-orange-100 text-orange-800 justify-center">Frenos/Suspensión</Badge>
                          <Badge className="bg-slate-100 text-slate-800 justify-center">Fibra de Carbono</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">OEMs Representados</h3>
                        <p className="text-muted-foreground">
                          Ferrari, Lamborghini, Maserati, Alfa Romeo, Pagani, Ducati, Dallara, 
                          Pininfarina, Zagato, y más de 10 marcas de lujo adicionales.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Casos de uso</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Sourcing de proveedores de alto rendimiento</li>
                          <li>Due diligence para partnerships</li>
                          <li>Evaluación de riesgos de cadena de suministro</li>
                          <li>Benchmarking de capacidades</li>
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
                          Vista previa: 5 proveedores de muestra
                        </Badge>
                      </div>
                      <ScrollArea className="h-[400px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Empresa</TableHead>
                              <TableHead>Especialidad</TableHead>
                              <TableHead>OEMs</TableHead>
                              <TableHead>Rating</TableHead>
                              <TableHead>Capacidad</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {SUPPLIER_SAMPLE.map((record, idx) => (
                              <TableRow key={idx}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{record.company_name}</p>
                                    <p className="text-xs text-muted-foreground">{record.region}, {record.province}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={`text-xs ${getSpecialtyColor(record.specialty)}`}>
                                    {getSpecialtyLabel(record.specialty)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs">
                                  {record.oem_partnerships.slice(0, 2).join(", ")}
                                  {record.oem_partnerships.length > 2 && "..."}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    <span className="font-medium">{record.reputation_score}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress value={record.capacity_utilization_pct} className="w-12 h-2" />
                                    <span className="text-xs">{record.capacity_utilization_pct}%</span>
                                  </div>
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
                              <li>✓ Búsqueda de proveedores</li>
                              <li>✓ Due diligence interno</li>
                              <li>✓ Análisis de cadena de suministro</li>
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
                              <li>✗ Uso fuera de la EU</li>
                              <li>✗ Compartir datos de contacto</li>
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
                          Unión Europea. Los datos de contacto están protegidos y solo se revelan 
                          tras solicitud formal.
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
                    <Badge className="bg-red-100 text-red-800">Compliance</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <span className="text-4xl font-bold">520€</span>
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
                      Formato JSON + PDF
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      300+ proveedores
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Verificación KYB incluida
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-400" />
                      AI Training NO permitido
                    </li>
                  </ul>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
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
                      <span>Confindustria</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verificación:</span>
                      <Badge variant="outline" className="text-xs">KYB Verificado</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sector:</span>
                      <span>Automotriz Premium</span>
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
