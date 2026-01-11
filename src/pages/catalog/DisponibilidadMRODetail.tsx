import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Wrench,
  Database,
  Globe,
  Lock,
  Clock,
  RefreshCw,
  Download,
  CheckCircle2,
  XCircle,
  Star,
  ChevronRight,
  Eye,
  Warehouse,
  Calendar,
  Users,
  Plane,
  AlertTriangle
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

interface MROAvailabilityRecord {
  week_start: string;
  facility_id: string;
  facility_name: string;
  location_city: string;
  location_country: string;
  easa_approval: string;
  capability_type: "airframe" | "engine" | "component" | "line_maintenance" | "base_maintenance";
  aircraft_families: string[];
  total_hangar_capacity_sqm: number;
  available_slots: number;
  occupied_slots: number;
  utilization_rate_pct: number;
  avg_turnaround_days: number;
  certified_engineers: number;
  specialty_services: string[];
  next_available_slot: string;
  booking_lead_time_weeks: number;
}

const MRO_SAMPLE: MROAvailabilityRecord[] = [
  {
    week_start: "2025-01-13",
    facility_id: "MRO-TLS-001",
    facility_name: "Airbus MRO Toulouse",
    location_city: "Toulouse",
    location_country: "France",
    easa_approval: "EASA.145.0123",
    capability_type: "base_maintenance",
    aircraft_families: ["A320", "A330", "A350"],
    total_hangar_capacity_sqm: 45000,
    available_slots: 2,
    occupied_slots: 6,
    utilization_rate_pct: 75,
    avg_turnaround_days: 21,
    certified_engineers: 245,
    specialty_services: ["C-Check", "D-Check", "Structural Repair"],
    next_available_slot: "2025-02-15",
    booking_lead_time_weeks: 8
  },
  {
    week_start: "2025-01-13",
    facility_id: "MRO-HAM-002",
    facility_name: "Lufthansa Technik Hamburg",
    location_city: "Hamburg",
    location_country: "Germany",
    easa_approval: "EASA.145.0047",
    capability_type: "engine",
    aircraft_families: ["CFM56", "LEAP-1A", "GE90"],
    total_hangar_capacity_sqm: 28000,
    available_slots: 4,
    occupied_slots: 8,
    utilization_rate_pct: 67,
    avg_turnaround_days: 45,
    certified_engineers: 180,
    specialty_services: ["Engine Overhaul", "Performance Restoration", "LLP Replacement"],
    next_available_slot: "2025-01-27",
    booking_lead_time_weeks: 4
  },
  {
    week_start: "2025-01-13",
    facility_id: "MRO-CDG-003",
    facility_name: "AFI KLM E&M Paris",
    location_city: "Paris CDG",
    location_country: "France",
    easa_approval: "EASA.145.0189",
    capability_type: "component",
    aircraft_families: ["Landing Gear", "APU", "Hydraulics"],
    total_hangar_capacity_sqm: 15000,
    available_slots: 12,
    occupied_slots: 28,
    utilization_rate_pct: 70,
    avg_turnaround_days: 14,
    certified_engineers: 95,
    specialty_services: ["APU Overhaul", "Landing Gear Overhaul", "Hydraulic Testing"],
    next_available_slot: "2025-01-20",
    booking_lead_time_weeks: 2
  },
  {
    week_start: "2025-01-13",
    facility_id: "MRO-LHR-004",
    facility_name: "British Airways Engineering",
    location_city: "London Heathrow",
    location_country: "United Kingdom",
    easa_approval: "EASA.145.0034",
    capability_type: "line_maintenance",
    aircraft_families: ["B777", "B787", "A380"],
    total_hangar_capacity_sqm: 8000,
    available_slots: 8,
    occupied_slots: 12,
    utilization_rate_pct: 60,
    avg_turnaround_days: 1,
    certified_engineers: 120,
    specialty_services: ["AOG Support", "Daily Checks", "Transit Checks"],
    next_available_slot: "2025-01-14",
    booking_lead_time_weeks: 1
  },
  {
    week_start: "2025-01-13",
    facility_id: "MRO-ZRH-005",
    facility_name: "SR Technics Zurich",
    location_city: "Zurich",
    location_country: "Switzerland",
    easa_approval: "EASA.145.0156",
    capability_type: "airframe",
    aircraft_families: ["A320", "B737", "E190"],
    total_hangar_capacity_sqm: 32000,
    available_slots: 1,
    occupied_slots: 4,
    utilization_rate_pct: 80,
    avg_turnaround_days: 28,
    certified_engineers: 165,
    specialty_services: ["Cabin Modification", "Avionic Upgrades", "Paint"],
    next_available_slot: "2025-03-01",
    booking_lead_time_weeks: 10
  }
];

const DATA_SCHEMA = [
  { field: "week_start", type: "Date (YYYY-MM-DD)", description: "Inicio de la semana del reporte" },
  { field: "facility_id", type: "String", description: "Identificador único de la instalación MRO" },
  { field: "facility_name", type: "String", description: "Nombre comercial de la instalación" },
  { field: "location_city", type: "String", description: "Ciudad de ubicación" },
  { field: "location_country", type: "String", description: "País de ubicación" },
  { field: "easa_approval", type: "String", description: "Número de aprobación EASA Part 145" },
  { field: "capability_type", type: "Enum", description: "Tipo de capacidad MRO" },
  { field: "aircraft_families", type: "Array[String]", description: "Familias de aeronaves/motores soportados" },
  { field: "total_hangar_capacity_sqm", type: "Integer", description: "Capacidad total del hangar (m²)" },
  { field: "available_slots", type: "Integer", description: "Slots disponibles para reserva" },
  { field: "occupied_slots", type: "Integer", description: "Slots actualmente ocupados" },
  { field: "utilization_rate_pct", type: "Float", description: "Tasa de utilización (%)" },
  { field: "avg_turnaround_days", type: "Integer", description: "Tiempo medio de servicio (días)" },
  { field: "certified_engineers", type: "Integer", description: "Ingenieros certificados disponibles" },
  { field: "specialty_services", type: "Array[String]", description: "Servicios especializados ofrecidos" },
  { field: "next_available_slot", type: "Date", description: "Próximo slot disponible" },
  { field: "booking_lead_time_weeks", type: "Integer", description: "Tiempo de anticipación requerido (semanas)" }
];

export default function DisponibilidadMRODetail() {
  const [activeTab, setActiveTab] = useState("description");

  const getCapabilityLabel = (type: string) => {
    switch (type) {
      case "airframe": return "Fuselaje";
      case "engine": return "Motor";
      case "component": return "Componentes";
      case "line_maintenance": return "Línea";
      case "base_maintenance": return "Base";
      default: return type;
    }
  };

  const getCapabilityColor = (type: string) => {
    switch (type) {
      case "airframe": return "bg-blue-100 text-blue-800";
      case "engine": return "bg-orange-100 text-orange-800";
      case "component": return "bg-purple-100 text-purple-800";
      case "line_maintenance": return "bg-green-100 text-green-800";
      case "base_maintenance": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getUtilizationColor = (pct: number) => {
    if (pct >= 80) return "text-red-600";
    if (pct >= 60) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
              <span className="text-foreground font-medium">Disponibilidad MRO Aeronáutico</span>
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
                <div className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="uppercase text-xs tracking-wider">
                      Ops
                    </Badge>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          EASA Part 145
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Instalaciones certificadas según EASA Part 145</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200">
                          <Warehouse className="h-3 w-3 mr-1" />
                          150+ Facilities
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Más de 150 instalaciones MRO certificadas</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-700 bg-clip-text text-transparent">
                    Disponibilidad de Servicios MRO Aeronáuticos
                  </CardTitle>
                  
                  <CardDescription className="text-base mt-2">
                    Dataset operacional en tiempo real con disponibilidad de slots, capacidades y tiempos 
                    de servicio de instalaciones MRO (Mantenimiento, Reparación y Overhaul) certificadas 
                    en Europa. Actualización semanal todos los lunes.
                  </CardDescription>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Proveedor:</span>
                      Aerospace Valley (Toulouse)
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Custodia:</span>
                      Dassault Systèmes 3DEXPERIENCE (Paris)
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
                      <span className="ml-1 font-semibold">4.5</span>
                      <span className="text-muted-foreground">(38 reseñas)</span>
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
              <Card className="bg-gradient-to-br from-blue-900 to-indigo-800 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-300" />
                        <span className="font-semibold text-blue-300">WEEKLY</span>
                      </div>
                      <RefreshCw className="h-8 w-8 mb-2 text-blue-300" />
                      <span className="text-sm text-blue-100">Lunes 00:00 CET</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Warehouse className="h-8 w-8 mb-2 text-indigo-300" />
                      <span className="text-2xl font-bold">150+</span>
                      <span className="text-sm text-blue-100">Instalaciones</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Users className="h-8 w-8 mb-2 text-purple-300" />
                      <span className="text-2xl font-bold">12K+</span>
                      <span className="text-sm text-blue-100">Ingenieros</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Plane className="h-8 w-8 mb-2 text-cyan-300" />
                      <span className="text-2xl font-bold">EU+UK</span>
                      <span className="text-sm text-blue-100">Cobertura</span>
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
                          El dataset de Disponibilidad MRO proporciona visibilidad operacional en tiempo real 
                          sobre la capacidad y disponibilidad de servicios de mantenimiento aeronáutico en Europa. 
                          Permite a aerolíneas y operadores planificar sus paradas de mantenimiento de forma 
                          óptima, reduciendo tiempos de inactividad y costes operativos.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Tipos de Capacidades</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <Badge className="bg-blue-100 text-blue-800 justify-center">Fuselaje</Badge>
                          <Badge className="bg-orange-100 text-orange-800 justify-center">Motores</Badge>
                          <Badge className="bg-purple-100 text-purple-800 justify-center">Componentes</Badge>
                          <Badge className="bg-green-100 text-green-800 justify-center">Línea</Badge>
                          <Badge className="bg-red-100 text-red-800 justify-center">Base</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Casos de uso</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Planificación de paradas de mantenimiento programado</li>
                          <li>Gestión de AOG (Aircraft on Ground) emergencias</li>
                          <li>Optimización de costes de mantenimiento</li>
                          <li>Análisis de capacidad de la cadena de suministro</li>
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
                          Vista previa: 5 instalaciones MRO
                        </Badge>
                      </div>
                      <ScrollArea className="h-[400px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Instalación</TableHead>
                              <TableHead>Tipo</TableHead>
                              <TableHead>Utilización</TableHead>
                              <TableHead>Slots Libres</TableHead>
                              <TableHead>Próximo Slot</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {MRO_SAMPLE.map((record, idx) => (
                              <TableRow key={idx}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{record.facility_name}</p>
                                    <p className="text-xs text-muted-foreground">{record.location_city}, {record.location_country}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={`text-xs ${getCapabilityColor(record.capability_type)}`}>
                                    {getCapabilityLabel(record.capability_type)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress value={record.utilization_rate_pct} className="w-16 h-2" />
                                    <span className={`text-sm font-medium ${getUtilizationColor(record.utilization_rate_pct)}`}>
                                      {record.utilization_rate_pct}%
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className={`font-semibold ${record.available_slots <= 2 ? 'text-red-600' : 'text-green-600'}`}>
                                    {record.available_slots}
                                  </span>
                                </TableCell>
                                <TableCell className="text-sm">{record.next_available_slot}</TableCell>
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
                          Datos Operacionales Sensibles
                        </h4>
                        <p className="text-sm text-amber-700">
                          Este dataset contiene información operacional sensible. El uso está restringido 
                          a fines internos de planificación de mantenimiento. No se permite el uso para 
                          entrenamiento de modelos AI ni compartir con terceros.
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
                              <li>✓ Planificación interna de mantenimiento</li>
                              <li>✓ Análisis de capacidad operativa</li>
                              <li>✓ Integración en sistemas ERP/MRO</li>
                              <li>✓ Dashboards internos</li>
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
                              <li>✗ Reventa o sublicenciamiento</li>
                              <li>✗ Compartir con terceros</li>
                              <li>✗ Uso fuera de EU + UK + Switzerland</li>
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
                    <Badge className="bg-blue-100 text-blue-800">Ops</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <span className="text-4xl font-bold">480€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <Separator />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Actualización semanal
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Formato JSON + OData API
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      150+ instalaciones MRO
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Alertas de disponibilidad
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-400" />
                      AI Training NO permitido
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
                      <span>Dassault Systèmes</span>
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
