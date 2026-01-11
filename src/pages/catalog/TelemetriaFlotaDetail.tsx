import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Leaf,
  Activity,
  Database,
  Globe,
  Lock,
  Zap,
  Battery,
  MapPin,
  Clock,
  RefreshCw,
  FileJson,
  Download,
  CheckCircle2,
  XCircle,
  Star,
  Truck,
  Thermometer,
  Gauge,
  Route,
  ChevronRight,
  Eye
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

// Interfaz para el esquema de datos de telemetría
interface FleetTelemetryRecord {
  timestamp: string;
  vehicle_id: string;
  driver_id: string;
  battery_level: number;
  battery_health: number;
  speed_kmh: number;
  latitude: number;
  longitude: number;
  charging_status: "charging" | "discharging" | "idle";
  range_km: number;
  energy_consumed_kwh: number;
  regeneration_kwh: number;
  ambient_temp_c: number;
  tire_pressure_psi: number[];
  route_id: string;
}

// Datos de muestra realistas
const TELEMETRY_SAMPLE: FleetTelemetryRecord[] = [
  {
    timestamp: "2025-01-11T09:15:32Z",
    vehicle_id: "EV-MAD-001",
    driver_id: "DRV-4521",
    battery_level: 78,
    battery_health: 96,
    speed_kmh: 52,
    latitude: 40.4168,
    longitude: -3.7038,
    charging_status: "discharging",
    range_km: 245,
    energy_consumed_kwh: 12.4,
    regeneration_kwh: 1.8,
    ambient_temp_c: 18,
    tire_pressure_psi: [32, 32, 31, 32],
    route_id: "RTE-BCN-MAD-07"
  },
  {
    timestamp: "2025-01-11T09:15:31Z",
    vehicle_id: "EV-BCN-042",
    driver_id: "DRV-8832",
    battery_level: 45,
    battery_health: 92,
    speed_kmh: 0,
    latitude: 41.3851,
    longitude: 2.1734,
    charging_status: "charging",
    range_km: 142,
    energy_consumed_kwh: 28.7,
    regeneration_kwh: 4.2,
    ambient_temp_c: 14,
    tire_pressure_psi: [33, 33, 32, 33],
    route_id: "RTE-BCN-LOCAL-12"
  },
  {
    timestamp: "2025-01-11T09:15:30Z",
    vehicle_id: "EV-VAL-015",
    driver_id: "DRV-2219",
    battery_level: 92,
    battery_health: 98,
    speed_kmh: 85,
    latitude: 39.4699,
    longitude: -0.3763,
    charging_status: "discharging",
    range_km: 312,
    energy_consumed_kwh: 5.2,
    regeneration_kwh: 0.8,
    ambient_temp_c: 21,
    tire_pressure_psi: [32, 31, 32, 32],
    route_id: "RTE-VAL-MAD-03"
  },
  {
    timestamp: "2025-01-11T09:15:29Z",
    vehicle_id: "EV-SEV-008",
    driver_id: "DRV-6654",
    battery_level: 23,
    battery_health: 89,
    speed_kmh: 35,
    latitude: 37.3891,
    longitude: -5.9845,
    charging_status: "discharging",
    range_km: 68,
    energy_consumed_kwh: 41.3,
    regeneration_kwh: 6.1,
    ambient_temp_c: 24,
    tire_pressure_psi: [31, 31, 30, 31],
    route_id: "RTE-SEV-LOCAL-09"
  },
  {
    timestamp: "2025-01-11T09:15:28Z",
    vehicle_id: "EV-BIL-023",
    driver_id: "DRV-1147",
    battery_level: 67,
    battery_health: 94,
    speed_kmh: 72,
    latitude: 43.2630,
    longitude: -2.9350,
    charging_status: "discharging",
    range_km: 198,
    energy_consumed_kwh: 18.9,
    regeneration_kwh: 3.4,
    ambient_temp_c: 12,
    tire_pressure_psi: [33, 32, 33, 33],
    route_id: "RTE-BIL-MAD-01"
  },
  {
    timestamp: "2025-01-11T09:15:27Z",
    vehicle_id: "EV-MAD-087",
    driver_id: "DRV-9903",
    battery_level: 100,
    battery_health: 99,
    speed_kmh: 0,
    latitude: 40.4532,
    longitude: -3.6883,
    charging_status: "idle",
    range_km: 340,
    energy_consumed_kwh: 0,
    regeneration_kwh: 0,
    ambient_temp_c: 17,
    tire_pressure_psi: [32, 32, 32, 32],
    route_id: "RTE-DEPOT-MAD"
  },
  {
    timestamp: "2025-01-11T09:15:26Z",
    vehicle_id: "EV-ZGZ-011",
    driver_id: "DRV-3378",
    battery_level: 54,
    battery_health: 91,
    speed_kmh: 110,
    latitude: 41.6488,
    longitude: -0.8891,
    charging_status: "discharging",
    range_km: 167,
    energy_consumed_kwh: 24.1,
    regeneration_kwh: 2.9,
    ambient_temp_c: 16,
    tire_pressure_psi: [32, 32, 31, 32],
    route_id: "RTE-ZGZ-BCN-04"
  },
  {
    timestamp: "2025-01-11T09:15:25Z",
    vehicle_id: "EV-MLG-019",
    driver_id: "DRV-5541",
    battery_level: 81,
    battery_health: 95,
    speed_kmh: 45,
    latitude: 36.7213,
    longitude: -4.4214,
    charging_status: "discharging",
    range_km: 256,
    energy_consumed_kwh: 9.7,
    regeneration_kwh: 1.5,
    ambient_temp_c: 26,
    tire_pressure_psi: [33, 33, 33, 32],
    route_id: "RTE-MLG-LOCAL-06"
  },
  {
    timestamp: "2025-01-11T09:15:24Z",
    vehicle_id: "EV-ALI-005",
    driver_id: "DRV-7789",
    battery_level: 12,
    battery_health: 87,
    speed_kmh: 0,
    latitude: 38.3452,
    longitude: -0.4810,
    charging_status: "charging",
    range_km: 35,
    energy_consumed_kwh: 48.2,
    regeneration_kwh: 5.8,
    ambient_temp_c: 22,
    tire_pressure_psi: [31, 31, 31, 31],
    route_id: "RTE-ALI-VAL-02"
  },
  {
    timestamp: "2025-01-11T09:15:23Z",
    vehicle_id: "EV-VIG-033",
    driver_id: "DRV-4456",
    battery_level: 88,
    battery_health: 97,
    speed_kmh: 65,
    latitude: 42.2406,
    longitude: -8.7207,
    charging_status: "discharging",
    range_km: 287,
    energy_consumed_kwh: 7.3,
    regeneration_kwh: 1.2,
    ambient_temp_c: 11,
    tire_pressure_psi: [32, 32, 32, 32],
    route_id: "RTE-VIG-LOCAL-15"
  }
];

// Esquema de datos con descripciones
const DATA_SCHEMA = [
  { field: "timestamp", type: "ISO 8601 DateTime", description: "Marca temporal UTC del registro" },
  { field: "vehicle_id", type: "String", description: "Identificador único del vehículo (formato: EV-[CIUDAD]-[NUM])" },
  { field: "driver_id", type: "String", description: "ID del conductor asignado" },
  { field: "battery_level", type: "Integer (0-100)", description: "Nivel de carga de la batería en porcentaje" },
  { field: "battery_health", type: "Integer (0-100)", description: "Estado de salud de la batería (SoH)" },
  { field: "speed_kmh", type: "Float", description: "Velocidad instantánea en km/h" },
  { field: "latitude", type: "Float", description: "Coordenada de latitud (WGS84)" },
  { field: "longitude", type: "Float", description: "Coordenada de longitud (WGS84)" },
  { field: "charging_status", type: "Enum", description: "'charging' | 'discharging' | 'idle'" },
  { field: "range_km", type: "Integer", description: "Autonomía estimada restante en km" },
  { field: "energy_consumed_kwh", type: "Float", description: "Energía consumida acumulada en el trayecto" },
  { field: "regeneration_kwh", type: "Float", description: "Energía recuperada por frenado regenerativo" },
  { field: "ambient_temp_c", type: "Float", description: "Temperatura ambiente exterior en °C" },
  { field: "tire_pressure_psi", type: "Array[4]", description: "Presión de cada neumático [FL, FR, RL, RR]" },
  { field: "route_id", type: "String", description: "ID de la ruta asignada" }
];

export default function TelemetriaFlotaDetail() {
  const { t } = useTranslation("catalog");
  const [activeTab, setActiveTab] = useState("description");

  const getChargingStatusColor = (status: string) => {
    switch (status) {
      case "charging": return "text-green-600 bg-green-100";
      case "discharging": return "text-orange-600 bg-orange-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getChargingStatusText = (status: string) => {
    switch (status) {
      case "charging": return "Cargando";
      case "discharging": return "En uso";
      default: return "Inactivo";
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return "text-green-600";
    if (level > 30) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
              <span className="text-foreground font-medium">Telemetría Flota Eléctrica</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ZONA A: Header con confianza y procedencia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="uppercase text-xs tracking-wider">
                      Movilidad
                    </Badge>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          KYB Verificado
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Proveedor verificado mediante proceso Know Your Business</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                          <Leaf className="h-3 w-3 mr-1" />
                          ESG Certified
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>85% energía renovable en la infraestructura de datos</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Telemetría Flota Eléctrica
                  </CardTitle>
                  
                  <CardDescription className="text-base mt-2">
                    Dataset completo en tiempo real con telemetría de vehículos eléctricos de flota comercial. 
                    Incluye datos de batería, consumo energético, geolocalización, rutas y estado operativo.
                  </CardDescription>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Proveedor:</span>
                      EcoFleet Analytics
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Custodia:</span>
                      T-Systems DataHub (Frankfurt, DE)
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
                      <span className="text-muted-foreground">(78 reseñas)</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* ZONA B: Hero Visual con métricas destacadas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Live Indicator */}
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="font-semibold text-green-400">LIVE</span>
                      </div>
                      <Activity className="h-8 w-8 mb-2 text-green-400" />
                      <span className="text-sm text-slate-300">Tiempo Real</span>
                    </div>

                    {/* Volumen */}
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Database className="h-8 w-8 mb-2 text-blue-400" />
                      <span className="text-2xl font-bold">2.5M+</span>
                      <span className="text-sm text-slate-300">Registros</span>
                    </div>

                    {/* Completitud */}
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <CheckCircle2 className="h-8 w-8 mb-2 text-emerald-400" />
                      <span className="text-2xl font-bold">98%</span>
                      <span className="text-sm text-slate-300">Completitud</span>
                    </div>

                    {/* Flota */}
                    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                      <Truck className="h-8 w-8 mb-2 text-purple-400" />
                      <span className="text-2xl font-bold">150+</span>
                      <span className="text-sm text-slate-300">Vehículos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ZONA C: Tabs con información detallada */}
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
                        value="format" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        Formato y Entrega
                      </TabsTrigger>
                      <TabsTrigger 
                        value="rights" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        Derechos (ODRL)
                      </TabsTrigger>
                      <TabsTrigger 
                        value="sample" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Muestra de Datos
                      </TabsTrigger>
                      <TabsTrigger 
                        value="quality" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                      >
                        Calidad
                      </TabsTrigger>
                    </TabsList>

                    {/* Tab: Descripción */}
                    <TabsContent value="description" className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">¿Qué incluye este dataset?</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Este dataset proporciona acceso a telemetría completa de una flota de más de 150 vehículos 
                          eléctricos comerciales operando en las principales ciudades de España. Los datos se actualizan 
                          en tiempo real (streaming cada segundo) y permiten análisis avanzados de eficiencia energética, 
                          optimización de rutas y mantenimiento predictivo.
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Casos de Uso Recomendados</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { icon: Route, title: "Optimización de Rutas", desc: "Análisis de patrones de consumo por ruta y condiciones de tráfico" },
                            { icon: Battery, title: "Gestión de Carga", desc: "Predicción de necesidades de carga y planificación de paradas" },
                            { icon: Gauge, title: "Eficiencia Operativa", desc: "KPIs de rendimiento por vehículo, conductor y zona geográfica" },
                            { icon: Zap, title: "Mantenimiento Predictivo", desc: "Alertas tempranas basadas en degradación de batería y patrones anómalos" }
                          ].map((item, idx) => (
                            <div key={idx} className="flex gap-3 p-4 rounded-lg bg-slate-50 border">
                              <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Cobertura Geográfica</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Zaragoza", "Málaga", "Alicante", "Vigo"].map((city) => (
                            <Badge key={city} variant="outline" className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {city}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Tab: Estructura de Datos */}
                    <TabsContent value="schema" className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Esquema del Dataset</h3>
                        <p className="text-sm text-muted-foreground">
                          Cada registro contiene 15 campos con información completa del estado del vehículo.
                        </p>
                      </div>
                      <ScrollArea className="h-[400px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[180px]">Campo</TableHead>
                              <TableHead className="w-[150px]">Tipo</TableHead>
                              <TableHead>Descripción</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {DATA_SCHEMA.map((row, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-mono text-sm font-medium text-primary">
                                  {row.field}
                                </TableCell>
                                <TableCell className="font-mono text-xs text-muted-foreground">
                                  {row.type}
                                </TableCell>
                                <TableCell className="text-sm">
                                  {row.description}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </TabsContent>

                    {/* Tab: Formato y Entrega */}
                    <TabsContent value="format" className="p-6 space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Formatos Disponibles</h3>
                          <div className="space-y-3">
                            {[
                              { format: "JSON", desc: "Formato nativo, ideal para APIs", icon: FileJson },
                              { format: "CSV", desc: "Para análisis en hojas de cálculo", icon: Download },
                              { format: "Parquet", desc: "Optimizado para Big Data", icon: Database }
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border bg-slate-50">
                                <item.icon className="h-5 w-5 text-primary" />
                                <div>
                                  <span className="font-medium">{item.format}</span>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Métodos de Entrega</h3>
                          <div className="space-y-3">
                            {[
                              { method: "API REST", desc: "Consultas bajo demanda con paginación", icon: Globe },
                              { method: "WebSocket", desc: "Streaming en tiempo real", icon: Activity },
                              { method: "Webhook", desc: "Push de eventos configurables", icon: RefreshCw }
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border bg-slate-50">
                                <item.icon className="h-5 w-5 text-primary" />
                                <div>
                                  <span className="font-medium">{item.method}</span>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Frecuencia de Actualización</h3>
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 border border-green-200">
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <Clock className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-green-800">Tiempo Real (1 segundo)</span>
                            <p className="text-sm text-green-700">Datos actualizados cada segundo via WebSocket</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Tab: Derechos ODRL */}
                    <TabsContent value="rights" className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Política de Uso (ODRL)</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Este dataset está sujeto a las siguientes restricciones según el estándar ODRL (Open Digital Rights Language).
                        </p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        {/* AI Training */}
                        <div className="p-4 rounded-lg border-2 border-green-200 bg-green-50">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <span className="font-semibold text-green-800">AI Ready</span>
                          </div>
                          <p className="text-sm text-green-700">
                            Permitido usar para entrenamiento de modelos de IA/ML propios.
                          </p>
                        </div>

                        {/* No Resale */}
                        <div className="p-4 rounded-lg border-2 border-red-200 bg-red-50">
                          <div className="flex items-center gap-2 mb-2">
                            <XCircle className="h-5 w-5 text-red-600" />
                            <span className="font-semibold text-red-800">Sin Reventa</span>
                          </div>
                          <p className="text-sm text-red-700">
                            No está permitida la redistribución o reventa de los datos.
                          </p>
                        </div>

                        {/* Geo Restriction */}
                        <div className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold text-blue-800">Solo UE</span>
                          </div>
                          <p className="text-sm text-blue-700">
                            Los datos solo pueden procesarse en jurisdicción europea.
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="p-4 rounded-lg bg-slate-50 border">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Otros Términos
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Duración mínima del contrato: 3 meses</li>
                          <li>• Los datos deben eliminarse al finalizar la suscripción</li>
                          <li>• Se requiere anonimización para cualquier publicación derivada</li>
                          <li>• Auditorías de cumplimiento pueden ser requeridas anualmente</li>
                        </ul>
                      </div>
                    </TabsContent>

                    {/* Tab: Muestra de Datos */}
                    <TabsContent value="sample" className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">Vista Previa de Datos</h3>
                          <p className="text-sm text-muted-foreground">
                            Muestra de 10 registros reales (datos anonimizados)
                          </p>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" />
                          Actualizado hace 2 seg
                        </Badge>
                      </div>

                      <ScrollArea className="h-[500px] rounded-lg border">
                        <Table>
                          <TableHeader className="sticky top-0 bg-white z-10">
                            <TableRow>
                              <TableHead className="w-[100px]">Vehículo</TableHead>
                              <TableHead className="w-[80px]">Batería</TableHead>
                              <TableHead className="w-[80px]">Estado</TableHead>
                              <TableHead className="w-[80px]">Velocidad</TableHead>
                              <TableHead className="w-[80px]">Autonomía</TableHead>
                              <TableHead className="w-[100px]">Ubicación</TableHead>
                              <TableHead className="w-[60px]">Temp</TableHead>
                              <TableHead>Ruta</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {TELEMETRY_SAMPLE.map((record, idx) => (
                              <TableRow key={idx} className="hover:bg-slate-50">
                                <TableCell className="font-mono text-xs font-medium">
                                  {record.vehicle_id}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1.5">
                                    <Battery className={`h-4 w-4 ${getBatteryColor(record.battery_level)}`} />
                                    <span className={`font-medium ${getBatteryColor(record.battery_level)}`}>
                                      {record.battery_level}%
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={`text-xs ${getChargingStatusColor(record.charging_status)}`}>
                                    {getChargingStatusText(record.charging_status)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <span className="font-medium">{record.speed_kmh}</span>
                                  <span className="text-xs text-muted-foreground"> km/h</span>
                                </TableCell>
                                <TableCell>
                                  <span className="font-medium">{record.range_km}</span>
                                  <span className="text-xs text-muted-foreground"> km</span>
                                </TableCell>
                                <TableCell className="font-mono text-xs text-muted-foreground">
                                  {record.latitude.toFixed(2)}, {record.longitude.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Thermometer className="h-3 w-3 text-muted-foreground" />
                                    <span>{record.ambient_temp_c}°C</span>
                                  </div>
                                </TableCell>
                                <TableCell className="font-mono text-xs text-muted-foreground">
                                  {record.route_id}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>

                      <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
                        <strong>Nota:</strong> Esta muestra representa datos reales anonimizados. 
                        Los identificadores de vehículos y conductores han sido modificados por privacidad.
                      </div>
                    </TabsContent>

                    {/* Tab: Calidad */}
                    <TabsContent value="quality" className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Métricas de Calidad de Datos</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {[
                            { label: "Completitud", value: 98, desc: "Campos con valores válidos" },
                            { label: "Precisión", value: 99.5, desc: "Exactitud de geolocalización" },
                            { label: "Consistencia", value: 97, desc: "Coherencia entre campos" },
                            { label: "Disponibilidad", value: 99.9, desc: "Uptime del servicio" }
                          ].map((metric, idx) => (
                            <div key={idx} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">{metric.label}</span>
                                <span className="text-muted-foreground">{metric.value}%</span>
                              </div>
                              <Progress value={metric.value} className="h-2" />
                              <p className="text-xs text-muted-foreground">{metric.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Certificaciones y Compliance</h3>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { name: "ISO 27001", desc: "Seguridad de la información" },
                            { name: "GDPR", desc: "Protección de datos personales" },
                            { name: "Gaia-X", desc: "Data Space europeo" },
                            { name: "ODRL", desc: "Contratos digitales estándar" }
                          ].map((cert, idx) => (
                            <Badge key={idx} variant="outline" className="px-3 py-1.5 text-sm">
                              <ShieldCheck className="h-3 w-3 mr-1.5 text-green-600" />
                              {cert.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">SLA Garantizado</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Disponibilidad: 99.9% mensual</li>
                          <li>• Latencia máxima: 200ms (P99)</li>
                          <li>• Tiempo de respuesta soporte: &lt; 4 horas (días laborables)</li>
                          <li>• Créditos automáticos por incumplimiento de SLA</li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="sticky top-24"
            >
              <Card className="overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                <CardHeader>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">200€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          <Leaf className="h-3 w-3 mr-1" />
                          Low Carbon Data
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>85% de la energía proviene de fuentes renovables</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Incluido en la suscripción:</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Acceso API ilimitado",
                        "Streaming en tiempo real",
                        "Soporte técnico 24/7",
                        "SLA 99.9% garantizado",
                        "Dashboard de monitoreo",
                        "Documentación completa",
                        "Hasta 5 usuarios por cuenta"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <Button 
                    asChild
                    size="lg" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
                  >
                    <Link to="/auth">
                      Solicitar Acceso
                    </Link>
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Período mínimo: 3 meses. Cancelación con 30 días de antelación.
                  </p>
                </CardContent>
              </Card>

              {/* Trust indicators */}
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                      <span>Transacción segura</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span>Datos cifrados</span>
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
