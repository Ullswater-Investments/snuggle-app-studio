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
  Factory,
  Activity,
  Clock,
  Server,
  Gauge,
  Layers,
  Timer,
  Radio,
  CalendarClock,
  Wrench
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
interface CleanroomCapacityMonitor {
  facility_id: string;
  facility_name: string;
  operator: string;
  location_city: string;
  location_country: string;
  cleanroom_class: "ISO_1" | "ISO_2" | "ISO_3" | "ISO_4" | "ISO_5" | "ISO_6" | "ISO_7";
  total_area_sqm: number;
  service_type: "lithography" | "etching" | "deposition" | "ion_implant" | "packaging" | "testing" | "full_fab";
  wafer_sizes: string[];
  current_utilization_pct: number;
  available_capacity_wafers_month: number;
  booked_capacity_wafers_month: number;
  maintenance_scheduled: boolean;
  next_maintenance_date: string | null;
  queue_length_days: number;
  min_order_wafers: number;
  lead_time_weeks: number;
  certified_processes: string[];
  equipment_vintage_year: number;
  price_per_wafer_layer_eur: number;
}

const CLEANROOM_SAMPLE: CleanroomCapacityMonitor[] = [
  {
    facility_id: "BP-CLN-001",
    facility_name: "Brainport Microelectronics Center",
    operator: "Brainport Industries Cooperative",
    location_city: "Eindhoven",
    location_country: "Netherlands",
    cleanroom_class: "ISO_4",
    total_area_sqm: 8500,
    service_type: "full_fab",
    wafer_sizes: ["200mm", "300mm"],
    current_utilization_pct: 78,
    available_capacity_wafers_month: 4500,
    booked_capacity_wafers_month: 3510,
    maintenance_scheduled: false,
    next_maintenance_date: "2026-03-15",
    queue_length_days: 18,
    min_order_wafers: 25,
    lead_time_weeks: 6,
    certified_processes: ["CMOS", "BiCMOS", "BCD", "GaN"],
    equipment_vintage_year: 2022,
    price_per_wafer_layer_eur: 145
  },
  {
    facility_id: "BP-CLN-002",
    facility_name: "Philips High-Tech Campus Cleanroom",
    operator: "Philips Innovation Services",
    location_city: "Eindhoven",
    location_country: "Netherlands",
    cleanroom_class: "ISO_5",
    total_area_sqm: 3200,
    service_type: "packaging",
    wafer_sizes: ["150mm", "200mm"],
    current_utilization_pct: 65,
    available_capacity_wafers_month: 2800,
    booked_capacity_wafers_month: 1820,
    maintenance_scheduled: true,
    next_maintenance_date: "2026-02-01",
    queue_length_days: 8,
    min_order_wafers: 10,
    lead_time_weeks: 3,
    certified_processes: ["Flip-chip", "Wire bonding", "Die attach"],
    equipment_vintage_year: 2020,
    price_per_wafer_layer_eur: 85
  },
  {
    facility_id: "BP-CLN-003",
    facility_name: "SMART Photonics Fab",
    operator: "SMART Photonics B.V.",
    location_city: "Eindhoven",
    location_country: "Netherlands",
    cleanroom_class: "ISO_3",
    total_area_sqm: 2100,
    service_type: "lithography",
    wafer_sizes: ["100mm", "150mm"],
    current_utilization_pct: 92,
    available_capacity_wafers_month: 1200,
    booked_capacity_wafers_month: 1104,
    maintenance_scheduled: false,
    next_maintenance_date: null,
    queue_length_days: 35,
    min_order_wafers: 5,
    lead_time_weeks: 10,
    certified_processes: ["InP", "III-V", "Photonic IC"],
    equipment_vintage_year: 2023,
    price_per_wafer_layer_eur: 480
  },
  {
    facility_id: "BP-CLN-004",
    facility_name: "imec.nl Research Cleanroom",
    operator: "imec Netherlands",
    location_city: "Eindhoven",
    location_country: "Netherlands",
    cleanroom_class: "ISO_4",
    total_area_sqm: 1800,
    service_type: "deposition",
    wafer_sizes: ["200mm", "300mm"],
    current_utilization_pct: 85,
    available_capacity_wafers_month: 800,
    booked_capacity_wafers_month: 680,
    maintenance_scheduled: false,
    next_maintenance_date: "2026-04-20",
    queue_length_days: 22,
    min_order_wafers: 3,
    lead_time_weeks: 5,
    certified_processes: ["ALD", "CVD", "PVD", "Epitaxy"],
    equipment_vintage_year: 2024,
    price_per_wafer_layer_eur: 210
  }
];

const DATA_SCHEMA = [
  { field: "facility_id", type: "string", description: "Identificador único de la instalación" },
  { field: "facility_name", type: "string", description: "Nombre de la instalación" },
  { field: "operator", type: "string", description: "Empresa operadora" },
  { field: "location_city", type: "string", description: "Ciudad de ubicación" },
  { field: "location_country", type: "string", description: "País de ubicación" },
  { field: "cleanroom_class", type: "enum", description: "Clasificación ISO: ISO_1 a ISO_7" },
  { field: "total_area_sqm", type: "integer", description: "Área total de sala limpia (m²)" },
  { field: "service_type", type: "enum", description: "Tipo de servicio: lithography, etching, deposition, ion_implant, packaging, testing, full_fab" },
  { field: "wafer_sizes", type: "array[string]", description: "Tamaños de wafer soportados" },
  { field: "current_utilization_pct", type: "float", description: "Utilización actual (%)" },
  { field: "available_capacity_wafers_month", type: "integer", description: "Capacidad total mensual (wafers)" },
  { field: "booked_capacity_wafers_month", type: "integer", description: "Capacidad reservada (wafers)" },
  { field: "maintenance_scheduled", type: "boolean", description: "Mantenimiento programado" },
  { field: "next_maintenance_date", type: "date|null", description: "Fecha del próximo mantenimiento" },
  { field: "queue_length_days", type: "integer", description: "Días de cola actual" },
  { field: "min_order_wafers", type: "integer", description: "Pedido mínimo (wafers)" },
  { field: "lead_time_weeks", type: "integer", description: "Tiempo de entrega (semanas)" },
  { field: "certified_processes", type: "array[string]", description: "Procesos certificados" },
  { field: "equipment_vintage_year", type: "integer", description: "Año del equipamiento" },
  { field: "price_per_wafer_layer_eur", type: "float", description: "Precio por capa de wafer (EUR)" }
];

export default function CapacidadSalaLimpiaDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");

  const getServiceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      lithography: "Litografía",
      etching: "Grabado",
      deposition: "Deposición",
      ion_implant: "Implantación Iónica",
      packaging: "Encapsulado",
      testing: "Pruebas",
      full_fab: "Fab Completa"
    };
    return labels[type] || type;
  };

  const getServiceTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      lithography: "bg-purple-100 text-purple-800",
      etching: "bg-red-100 text-red-800",
      deposition: "bg-blue-100 text-blue-800",
      ion_implant: "bg-orange-100 text-orange-800",
      packaging: "bg-green-100 text-green-800",
      testing: "bg-cyan-100 text-cyan-800",
      full_fab: "bg-indigo-100 text-indigo-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getUtilizationColor = (pct: number) => {
    if (pct >= 90) return "text-red-600";
    if (pct >= 75) return "text-amber-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <div className="border-b bg-white/95 backdrop-blur sticky top-0 z-10">
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
          <Card className="mb-8 overflow-hidden border-slate-200">
            <div className="h-2 bg-gradient-to-r from-slate-600 via-gray-400 to-slate-500" />
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs px-2">
                      🇳🇱 Brainport Eindhoven (NL)
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      <Gauge className="h-3 w-3 mr-1" />
                      Ops
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-800 border-slate-200">
                      <Factory className="h-3 w-3 mr-1" />
                      Cleanroom Certified
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Radio className="h-3 w-3 mr-1" />
                      Real-time Monitor
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">
                    Monitor de Capacidad de Sala Limpia y Microelectrónica
                  </CardTitle>
                  <CardDescription className="text-base max-w-2xl">
                    Disponibilidad operacional actualizada semanalmente de más de 80 instalaciones de 
                    sala limpia en el ecosistema Brainport. Datos de utilización, colas y precios en tiempo real.
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
                        <p>Datos verificados por Brainport Industries Cooperative</p>
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
            <Card className="text-center p-4 bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200">
              <div className="text-3xl font-bold text-slate-700">+80</div>
              <div className="text-sm text-muted-foreground">Instalaciones</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100">
              <div className="text-3xl font-bold text-purple-700">7</div>
              <div className="text-sm text-muted-foreground">Tipos de Servicio</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
              <div className="text-3xl font-bold text-green-700">Semanal</div>
              <div className="text-sm text-muted-foreground">Actualización</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
              <div className="text-3xl font-bold text-blue-700">OData API</div>
              <div className="text-sm text-muted-foreground">Real-time Queries</div>
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
                      El <strong>Monitor de Capacidad de Sala Limpia</strong> proporciona información operacional 
                      en tiempo casi-real sobre la disponibilidad de instalaciones de fabricación de semiconductores 
                      y microelectrónica en el ecosistema Brainport Eindhoven.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Layers className="h-4 w-4 text-slate-600" />
                          Servicios Cubiertos
                        </h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Litografía (EUV, DUV, i-line)</li>
                          <li>• Grabado seco y húmedo</li>
                          <li>• Deposición (ALD, CVD, PVD)</li>
                          <li>• Implantación iónica</li>
                          <li>• Encapsulado y packaging</li>
                          <li>• Testing y caracterización</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-gray-600" />
                          Custodio de Datos
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Brainport Industries Cooperative</strong> - Eindhoven
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Datos agregados de más de 80 instalaciones miembros del ecosistema 
                          Brainport con actualizaciones en tiempo real.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 mt-4">
                      <h4 className="font-semibold mb-2">Casos de Uso Principales</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Planificación de producción y sourcing de capacidad fab
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Optimización de lead times mediante análisis predictivo
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Identificación de instalaciones con disponibilidad inmediata
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Benchmarking de precios y tiempos de entrega
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
                      Esquema del monitor de capacidad operacional
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Campo</TableHead>
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
                      <Activity className="h-5 w-5" />
                      Estado Actual de Instalaciones
                    </CardTitle>
                    <CardDescription>
                      Disponibilidad en tiempo real (última actualización: Domingo 23:59 CET)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Instalación</TableHead>
                            <TableHead>Servicio</TableHead>
                            <TableHead>Utilización</TableHead>
                            <TableHead>Cola</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {CLEANROOM_SAMPLE.map((record) => (
                            <TableRow key={record.facility_id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-sm">{record.facility_name}</div>
                                  <div className="text-xs text-muted-foreground">{record.operator}</div>
                                  <Badge variant="outline" className="text-[10px] mt-1">
                                    {record.cleanroom_class.replace('_', ' ')}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getServiceTypeColor(record.service_type)}>
                                  {getServiceTypeLabel(record.service_type)}
                                </Badge>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {record.wafer_sizes.join(', ')}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <Progress value={record.current_utilization_pct} className="w-16 h-2" />
                                    <span className={`text-sm font-medium ${getUtilizationColor(record.current_utilization_pct)}`}>
                                      {record.current_utilization_pct}%
                                    </span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {record.available_capacity_wafers_month - record.booked_capacity_wafers_month} wafers libres
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm">
                                  <Clock className="h-3 w-3 text-muted-foreground" />
                                  {record.queue_length_days} días
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Lead: {record.lead_time_weeks} sem
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                €{record.price_per_wafer_layer_eur}/capa
                              </TableCell>
                              <TableCell>
                                {record.maintenance_scheduled ? (
                                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                                    <Wrench className="h-3 w-3 mr-1" />
                                    Mant. {record.next_maintenance_date}
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Operativo
                                  </Badge>
                                )}
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
                      Condiciones para datos operacionales confidenciales
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
                            Planificación interna de producción
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Sourcing y comparación de proveedores
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Uso en EU + EFTA (Suiza, Noruega, etc.)
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Integración con sistemas ERP/MES
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
                            Entrenamiento de modelos AI
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Reventa o redistribución de datos
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Publicación de utilización individual
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Uso para negociación contra instalaciones
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                      <h4 className="font-semibold flex items-center gap-2 mb-2 text-amber-800">
                        <AlertTriangle className="h-5 w-5" />
                        Datos Operacionales Confidenciales
                      </h4>
                      <p className="text-sm text-amber-700">
                        Este dataset contiene información operacional sensible. Los datos de utilización 
                        y precios son confidenciales y no pueden ser compartidos con terceros ni utilizados 
                        en negociaciones adversariales contra las instalaciones miembros.
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
              <Card className="border-slate-200 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-100">
                  <CardTitle className="text-xl">Suscripción Operacional</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-700">650€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Actualización semanal (Dom 23:59 CET)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      +80 instalaciones de sala limpia
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      OData API para consultas en tiempo real
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Alertas de disponibilidad
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Integración ERP/MES incluida
                    </li>
                  </ul>

                  <Separator />

                  <Button className="w-full bg-slate-700 hover:bg-slate-800">
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
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center">
                      <Factory className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Brainport Industries</div>
                      <div className="text-sm text-muted-foreground">Eindhoven, Países Bajos</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo</span>
                      <span className="font-medium">Industry Cooperative</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instalaciones</span>
                      <span className="font-medium">+80</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Desde</span>
                      <span className="font-medium">2017</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Real-time Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CalendarClock className="h-8 w-8 text-slate-600" />
                    <div>
                      <div className="font-semibold">Próxima Actualización</div>
                      <div className="text-2xl font-bold text-slate-700">Dom 23:59 CET</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Los datos se actualizan automáticamente cada domingo a las 23:59 CET 
                    con el estado operacional de la semana entrante.
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
