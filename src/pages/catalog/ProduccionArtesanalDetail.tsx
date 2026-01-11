import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Database, 
  Calendar, 
  Shield, 
  Globe, 
  Clock, 
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building,
  Star,
  Download,
  Users,
  Hammer,
  Award,
  Palette,
  Wrench,
  CalendarClock,
  Factory
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
interface ArtisanWorkshopRecord {
  workshop_id: string;
  workshop_name: string;
  master_craftsman: string;
  location_city: string;
  region: string;
  specialty: "upholstery" | "wood_trim" | "paint_custom" | "bodywork_hand" | "stitching" | "restoration";
  active_projects: number;
  max_capacity_projects: number;
  availability_pct: number;
  next_slot_date: string;
  avg_project_duration_weeks: number;
  oem_exclusive: boolean;
  oem_clients: string[];
  heritage_certified: boolean;
  master_years_experience: number;
  apprentices_count: number;
  hourly_rate_eur: number;
  specialization_rating: number;
}

const ARTISAN_SAMPLE: ArtisanWorkshopRecord[] = [
  {
    workshop_id: "ART-MO-001",
    workshop_name: "Carrozzeria Scaglietti Heritage",
    master_craftsman: "Giovanni Scaglietti III",
    location_city: "Modena",
    region: "Emilia-Romagna",
    specialty: "bodywork_hand",
    active_projects: 3,
    max_capacity_projects: 5,
    availability_pct: 40,
    next_slot_date: "2026-03-15",
    avg_project_duration_weeks: 12,
    oem_exclusive: true,
    oem_clients: ["Ferrari", "Maserati"],
    heritage_certified: true,
    master_years_experience: 35,
    apprentices_count: 4,
    hourly_rate_eur: 285,
    specialization_rating: 5.0
  },
  {
    workshop_id: "ART-BO-002",
    workshop_name: "Selleria Fontana",
    master_craftsman: "Marco Fontana",
    location_city: "Bologna",
    region: "Emilia-Romagna",
    specialty: "upholstery",
    active_projects: 7,
    max_capacity_projects: 8,
    availability_pct: 12.5,
    next_slot_date: "2026-04-28",
    avg_project_duration_weeks: 6,
    oem_exclusive: false,
    oem_clients: ["Lamborghini", "Pagani", "Bugatti"],
    heritage_certified: true,
    master_years_experience: 28,
    apprentices_count: 6,
    hourly_rate_eur: 195,
    specialization_rating: 4.9
  },
  {
    workshop_id: "ART-RE-003",
    workshop_name: "Verniciatura d'Arte Reggiani",
    master_craftsman: "Alessandro Reggiani",
    location_city: "Reggio Emilia",
    region: "Emilia-Romagna",
    specialty: "paint_custom",
    active_projects: 2,
    max_capacity_projects: 4,
    availability_pct: 50,
    next_slot_date: "2026-02-10",
    avg_project_duration_weeks: 8,
    oem_exclusive: false,
    oem_clients: ["Ferrari", "Alfa Romeo", "Restoration Projects"],
    heritage_certified: true,
    master_years_experience: 42,
    apprentices_count: 3,
    hourly_rate_eur: 320,
    specialization_rating: 5.0
  },
  {
    workshop_id: "ART-MR-004",
    workshop_name: "Ebanisteria Autoveicoli Maranello",
    master_craftsman: "Lucia Bertoni",
    location_city: "Maranello",
    region: "Emilia-Romagna",
    specialty: "wood_trim",
    active_projects: 4,
    max_capacity_projects: 6,
    availability_pct: 33.3,
    next_slot_date: "2026-03-22",
    avg_project_duration_weeks: 4,
    oem_exclusive: true,
    oem_clients: ["Ferrari"],
    heritage_certified: true,
    master_years_experience: 25,
    apprentices_count: 2,
    hourly_rate_eur: 175,
    specialization_rating: 4.8
  }
];

const DATA_SCHEMA = [
  { field: "workshop_id", type: "string", description: "Identificador único del taller artesanal" },
  { field: "workshop_name", type: "string", description: "Nombre comercial del taller" },
  { field: "master_craftsman", type: "string", description: "Nombre del maestro artesano principal" },
  { field: "location_city", type: "string", description: "Ciudad de ubicación del taller" },
  { field: "region", type: "string", description: "Región italiana" },
  { field: "specialty", type: "enum", description: "Especialidad: upholstery, wood_trim, paint_custom, bodywork_hand, stitching, restoration" },
  { field: "active_projects", type: "integer", description: "Proyectos actualmente en curso" },
  { field: "max_capacity_projects", type: "integer", description: "Capacidad máxima de proyectos simultáneos" },
  { field: "availability_pct", type: "float", description: "Porcentaje de disponibilidad actual" },
  { field: "next_slot_date", type: "date", description: "Fecha del próximo slot disponible (ISO 8601)" },
  { field: "avg_project_duration_weeks", type: "integer", description: "Duración media de proyecto en semanas" },
  { field: "oem_exclusive", type: "boolean", description: "Si trabaja exclusivamente para un OEM" },
  { field: "oem_clients", type: "array[string]", description: "Lista de marcas cliente" },
  { field: "heritage_certified", type: "boolean", description: "Certificación de artesanía tradicional italiana" },
  { field: "master_years_experience", type: "integer", description: "Años de experiencia del maestro artesano" },
  { field: "apprentices_count", type: "integer", description: "Número de aprendices en formación" },
  { field: "hourly_rate_eur", type: "float", description: "Tarifa horaria en EUR" },
  { field: "specialization_rating", type: "float", description: "Calificación de especialización (1-5)" }
];

export default function ProduccionArtesanalDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");

  const getSpecialtyLabel = (specialty: string) => {
    const labels: Record<string, string> = {
      upholstery: "Tapicería",
      wood_trim: "Ebanistería",
      paint_custom: "Pintura Artística",
      bodywork_hand: "Carrocería Manual",
      stitching: "Costura Artesanal",
      restoration: "Restauración"
    };
    return labels[specialty] || specialty;
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors: Record<string, string> = {
      upholstery: "bg-amber-100 text-amber-800",
      wood_trim: "bg-orange-100 text-orange-800",
      paint_custom: "bg-purple-100 text-purple-800",
      bodywork_hand: "bg-rose-100 text-rose-800",
      stitching: "bg-pink-100 text-pink-800",
      restoration: "bg-teal-100 text-teal-800"
    };
    return colors[specialty] || "bg-gray-100 text-gray-800";
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
          <Card className="mb-8 overflow-hidden border-rose-200">
            <div className="h-2 bg-gradient-to-r from-rose-600 via-amber-500 to-orange-400" />
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs px-2">
                      🇮🇹 Motor Valley (IT)
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      <Factory className="h-3 w-3 mr-1" />
                      Ops
                    </Badge>
                    <Badge className="bg-rose-100 text-rose-800 border-rose-200">
                      <Hammer className="h-3 w-3 mr-1" />
                      Artisan Certified
                    </Badge>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      <Award className="h-3 w-3 mr-1" />
                      Heritage Craft
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">
                    Capacidad de Producción Artesanal Automotiva
                  </CardTitle>
                  <CardDescription className="text-base max-w-2xl">
                    Monitorización semanal de disponibilidad de talleres artesanales especializados en acabados premium 
                    para la industria automotriz de lujo en la región de Emilia-Romagna, corazón de Motor Valley.
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
                        <p>Proveedor verificado por Confindustria Modena</p>
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
            <Card className="text-center p-4 bg-gradient-to-br from-rose-50 to-amber-50 border-rose-100">
              <div className="text-3xl font-bold text-rose-700">+80</div>
              <div className="text-sm text-muted-foreground">Talleres Artesanales</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
              <div className="text-3xl font-bold text-amber-700">6</div>
              <div className="text-sm text-muted-foreground">Especialidades</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-orange-50 to-rose-50 border-orange-100">
              <div className="text-3xl font-bold text-orange-700">Semanal</div>
              <div className="text-sm text-muted-foreground">Actualización</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-purple-50 to-rose-50 border-purple-100">
              <div className="text-3xl font-bold text-purple-700">Calendar</div>
              <div className="text-sm text-muted-foreground">Formato API</div>
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
                      Este dataset proporciona información actualizada semanalmente sobre la capacidad y disponibilidad 
                      de los talleres artesanales especializados en la industria automotriz de lujo de la región de 
                      Emilia-Romagna, conocida mundialmente como <strong>Motor Valley</strong>.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 rounded-lg bg-rose-50 border border-rose-100">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Palette className="h-4 w-4 text-rose-600" />
                          Especialidades Cubiertas
                        </h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Tapicería en cuero (upholstery)</li>
                          <li>• Ebanistería automotriz (wood trim)</li>
                          <li>• Pintura artística personalizada</li>
                          <li>• Carrocería manual (hand-beaten panels)</li>
                          <li>• Costura artesanal (stitching)</li>
                          <li>• Restauración de clásicos</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-amber-600" />
                          Custodio de Datos
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Confindustria Modena</strong> - Federación Industrial de Emilia-Romagna
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Datos recopilados en colaboración con la Cámara de Comercio regional y las 
                          asociaciones de artesanos tradicionales italianos.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 mt-4">
                      <h4 className="font-semibold mb-2">Casos de Uso Principales</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Planificación de producción de series especiales y one-offs para OEMs de lujo
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Gestión de proyectos de restauración de vehículos clásicos
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Benchmarking de tarifas y tiempos de entrega del sector artesanal
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Identificación de maestros artesanos disponibles para proyectos especiales
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
                      Esquema detallado del dataset de capacidad artesanal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[180px]">Campo</TableHead>
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
                      <FileText className="h-5 w-5" />
                      Muestra de Datos
                    </CardTitle>
                    <CardDescription>
                      Ejemplo de registros de talleres artesanales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Taller</TableHead>
                            <TableHead>Maestro</TableHead>
                            <TableHead>Especialidad</TableHead>
                            <TableHead>Disponibilidad</TableHead>
                            <TableHead>Próximo Slot</TableHead>
                            <TableHead>Tarifa/h</TableHead>
                            <TableHead>Rating</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ARTISAN_SAMPLE.map((record) => (
                            <TableRow key={record.workshop_id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-sm">{record.workshop_name}</div>
                                  <div className="text-xs text-muted-foreground">{record.location_city}, {record.region}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">{record.master_craftsman}</div>
                                <div className="text-xs text-muted-foreground">{record.master_years_experience} años exp.</div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getSpecialtyColor(record.specialty)}>
                                  {getSpecialtyLabel(record.specialty)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className={`font-medium ${record.availability_pct > 30 ? 'text-green-600' : 'text-amber-600'}`}>
                                  {record.availability_pct}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {record.active_projects}/{record.max_capacity_projects} proyectos
                                </div>
                              </TableCell>
                              <TableCell className="text-sm">{record.next_slot_date}</TableCell>
                              <TableCell className="font-medium">€{record.hourly_rate_eur}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{record.specialization_rating}</span>
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
                      Condiciones de licencia y restricciones de uso
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
                            Análisis interno y planificación de producción
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Integración con sistemas de gestión de proyectos
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Uso dentro de EU + Suiza + UK
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Sincronización con calendarios corporativos
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
                            Entrenamiento de modelos AI (datos comerciales sensibles)
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Reventa o sublicencia de los datos
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Contacto directo con artesanos sin autorización
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Publicación de tarifas individuales
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                      <h4 className="font-semibold flex items-center gap-2 mb-2 text-amber-800">
                        <AlertTriangle className="h-5 w-5" />
                        Restricciones Geográficas
                      </h4>
                      <p className="text-sm text-amber-700">
                        Este dataset solo puede ser accedido y procesado desde direcciones IP dentro de la 
                        <strong> Unión Europea, Suiza y Reino Unido</strong>. Intentos de acceso desde otras 
                        jurisdicciones serán bloqueados automáticamente.
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
              <Card className="border-rose-200 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-rose-50 to-amber-50">
                  <CardTitle className="text-xl">Suscripción Premium</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-rose-700">450€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Actualización semanal (lunes 08:00 CET)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      API JSON + Calendar (iCal) sync
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Alertas de disponibilidad en tiempo real
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Filtros por especialidad y OEM
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Soporte prioritario en italiano/inglés
                    </li>
                  </ul>

                  <Separator />

                  <Button className="w-full bg-rose-600 hover:bg-rose-700">
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
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                      <Hammer className="h-6 w-6 text-rose-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Confindustria Modena</div>
                      <div className="text-sm text-muted-foreground">Emilia-Romagna, Italia</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoría</span>
                      <span className="font-medium">Federación Industrial</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verificación</span>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        KYB Verificado
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Desde</span>
                      <span className="font-medium">2019</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Artesanos registrados</span>
                      <span className="font-medium">+80</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Freshness */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-amber-50 to-rose-50 border-amber-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CalendarClock className="h-8 w-8 text-amber-600" />
                    <div>
                      <div className="font-semibold">Última Actualización</div>
                      <div className="text-2xl font-bold text-amber-700">Lunes 08:00 CET</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Los datos se actualizan automáticamente cada lunes con la disponibilidad 
                    confirmada por cada taller para las próximas 12 semanas.
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
