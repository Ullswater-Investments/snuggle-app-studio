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
  Flag,
  Cpu,
  Zap,
  Activity,
  Gauge,
  Timer,
  HardDrive,
  Brain
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
interface HighPerformanceTelemetry {
  session_id: string;
  vehicle_id: string;
  vehicle_class: "gt3" | "gt4" | "formula" | "hypercar" | "prototype";
  track_id: string;
  track_name: string;
  timestamp_ms: number;
  lap_number: number;
  sector: number;
  speed_kmh: number;
  throttle_pct: number;
  brake_pressure_bar: number;
  steering_angle_deg: number;
  engine_rpm: number;
  gear: number;
  tire_temp_fl: number;
  tire_temp_fr: number;
  tire_temp_rl: number;
  tire_temp_rr: number;
  g_force_lateral: number;
  g_force_longitudinal: number;
  fuel_remaining_liters: number;
  battery_soc_pct: number | null;
  drs_active: boolean;
  weather_condition: string;
}

const TELEMETRY_SAMPLE: HighPerformanceTelemetry[] = [
  {
    session_id: "SES-2025-MZ-001",
    vehicle_id: "DAL-HYP-001",
    vehicle_class: "hypercar",
    track_id: "MONZA",
    track_name: "Autodromo Nazionale Monza",
    timestamp_ms: 1704067200000,
    lap_number: 15,
    sector: 1,
    speed_kmh: 342.5,
    throttle_pct: 100,
    brake_pressure_bar: 0,
    steering_angle_deg: -2.3,
    engine_rpm: 8750,
    gear: 8,
    tire_temp_fl: 98.2,
    tire_temp_fr: 102.1,
    tire_temp_rl: 95.8,
    tire_temp_rr: 97.3,
    g_force_lateral: 0.15,
    g_force_longitudinal: 0.42,
    fuel_remaining_liters: 45.2,
    battery_soc_pct: 78,
    drs_active: true,
    weather_condition: "sunny"
  },
  {
    session_id: "SES-2025-MZ-001",
    vehicle_id: "DAL-GT3-005",
    vehicle_class: "gt3",
    track_id: "MONZA",
    track_name: "Autodromo Nazionale Monza",
    timestamp_ms: 1704067200500,
    lap_number: 22,
    sector: 2,
    speed_kmh: 185.3,
    throttle_pct: 45,
    brake_pressure_bar: 28.5,
    steering_angle_deg: 78.2,
    engine_rpm: 6200,
    gear: 3,
    tire_temp_fl: 105.8,
    tire_temp_fr: 92.1,
    tire_temp_rl: 101.2,
    tire_temp_rr: 88.5,
    g_force_lateral: 2.85,
    g_force_longitudinal: -1.2,
    fuel_remaining_liters: 32.1,
    battery_soc_pct: null,
    drs_active: false,
    weather_condition: "cloudy"
  },
  {
    session_id: "SES-2025-IM-002",
    vehicle_id: "DAL-F3-012",
    vehicle_class: "formula",
    track_id: "IMOLA",
    track_name: "Autodromo Enzo e Dino Ferrari",
    timestamp_ms: 1704153600000,
    lap_number: 8,
    sector: 3,
    speed_kmh: 265.8,
    throttle_pct: 88,
    brake_pressure_bar: 0,
    steering_angle_deg: -45.5,
    engine_rpm: 9850,
    gear: 6,
    tire_temp_fl: 110.2,
    tire_temp_fr: 108.5,
    tire_temp_rl: 107.8,
    tire_temp_rr: 106.2,
    g_force_lateral: 1.95,
    g_force_longitudinal: 0.65,
    fuel_remaining_liters: 28.5,
    battery_soc_pct: null,
    drs_active: false,
    weather_condition: "overcast"
  }
];

const DATA_SCHEMA = [
  { field: "session_id", type: "string", description: "Identificador único de la sesión de prueba" },
  { field: "vehicle_id", type: "string", description: "Identificador del vehículo" },
  { field: "vehicle_class", type: "enum", description: "Clase: gt3, gt4, formula, hypercar, prototype" },
  { field: "track_id", type: "string", description: "Código del circuito" },
  { field: "track_name", type: "string", description: "Nombre completo del circuito" },
  { field: "timestamp_ms", type: "integer", description: "Marca de tiempo en milisegundos (Unix epoch)" },
  { field: "lap_number", type: "integer", description: "Número de vuelta actual" },
  { field: "sector", type: "integer", description: "Sector del circuito (1-3)" },
  { field: "speed_kmh", type: "float", description: "Velocidad instantánea en km/h" },
  { field: "throttle_pct", type: "float", description: "Porcentaje de acelerador (0-100)" },
  { field: "brake_pressure_bar", type: "float", description: "Presión de freno en bares" },
  { field: "steering_angle_deg", type: "float", description: "Ángulo de dirección en grados" },
  { field: "engine_rpm", type: "integer", description: "Revoluciones por minuto del motor" },
  { field: "gear", type: "integer", description: "Marcha engranada (0=neutral)" },
  { field: "tire_temp_fl", type: "float", description: "Temperatura neumático delantero izquierdo (°C)" },
  { field: "tire_temp_fr", type: "float", description: "Temperatura neumático delantero derecho (°C)" },
  { field: "tire_temp_rl", type: "float", description: "Temperatura neumático trasero izquierdo (°C)" },
  { field: "tire_temp_rr", type: "float", description: "Temperatura neumático trasero derecho (°C)" },
  { field: "g_force_lateral", type: "float", description: "Fuerza G lateral" },
  { field: "g_force_longitudinal", type: "float", description: "Fuerza G longitudinal" },
  { field: "fuel_remaining_liters", type: "float", description: "Combustible restante en litros" },
  { field: "battery_soc_pct", type: "float|null", description: "Estado de carga batería híbrida (%)" },
  { field: "drs_active", type: "boolean", description: "DRS activado (si aplica)" },
  { field: "weather_condition", type: "string", description: "Condición meteorológica" }
];

export default function TelemetriaAltoDesempenoDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");

  const getVehicleClassLabel = (vehicleClass: string) => {
    const labels: Record<string, string> = {
      gt3: "GT3",
      gt4: "GT4",
      formula: "Fórmula",
      hypercar: "Hypercar",
      prototype: "Prototipo"
    };
    return labels[vehicleClass] || vehicleClass;
  };

  const getVehicleClassColor = (vehicleClass: string) => {
    const colors: Record<string, string> = {
      gt3: "bg-blue-100 text-blue-800",
      gt4: "bg-green-100 text-green-800",
      formula: "bg-red-100 text-red-800",
      hypercar: "bg-purple-100 text-purple-800",
      prototype: "bg-orange-100 text-orange-800"
    };
    return colors[vehicleClass] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <div className="border-b border-gray-700 bg-gray-900/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/partners/premium')}
            className="gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
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
          <Card className="mb-8 overflow-hidden border-red-500/50 bg-gray-800/80 backdrop-blur">
            <div className="h-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400" />
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs px-2 border-gray-600 text-gray-300">
                      🇮🇹 Motor Valley (IT)
                    </Badge>
                    <Badge className="bg-cyan-900/50 text-cyan-400 border-cyan-500/50">
                      <Cpu className="h-3 w-3 mr-1" />
                      R&D
                    </Badge>
                    <Badge className="bg-green-900/50 text-green-400 border-green-500/50">
                      <Brain className="h-3 w-3 mr-1" />
                      AI Ready
                    </Badge>
                    <Badge className="bg-red-900/50 text-red-400 border-red-500/50">
                      <Flag className="h-3 w-3 mr-1" />
                      Racing Data
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl text-white">
                    Dataset de Telemetría de Vehículos de Alto Desempeño
                  </CardTitle>
                  <CardDescription className="text-base max-w-2xl text-gray-400">
                    Big Data de competición y pruebas en circuito. Más de 100 millones de registros 
                    de telemetría de vehículos GT3, GT4, Fórmula y Hypercar capturados en circuitos europeos.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="border-green-500/50 bg-green-900/30 text-green-400 px-3 py-1">
                          <Shield className="h-4 w-4 mr-1" />
                          Licenciado
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Datos licenciados por Dallara Data Engineering</p>
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
            <Card className="text-center p-4 bg-gray-800/60 border-gray-700">
              <div className="text-3xl font-bold text-red-400">+100M</div>
              <div className="text-sm text-gray-400">Registros de Telemetría</div>
            </Card>
            <Card className="text-center p-4 bg-gray-800/60 border-gray-700">
              <div className="text-3xl font-bold text-cyan-400">5</div>
              <div className="text-sm text-gray-400">Clases de Vehículos</div>
            </Card>
            <Card className="text-center p-4 bg-gray-800/60 border-gray-700">
              <div className="text-3xl font-bold text-orange-400">Anual</div>
              <div className="text-sm text-gray-400">Release de Temporada</div>
            </Card>
            <Card className="text-center p-4 bg-gray-800/60 border-gray-700">
              <div className="text-3xl font-bold text-green-400">Parquet</div>
              <div className="text-sm text-gray-400">Formato ML-Ready</div>
            </Card>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full bg-gray-800/60 border border-gray-700">
                <TabsTrigger value="description" className="data-[state=active]:bg-gray-700">Descripción</TabsTrigger>
                <TabsTrigger value="schema" className="data-[state=active]:bg-gray-700">Estructura</TabsTrigger>
                <TabsTrigger value="sample" className="data-[state=active]:bg-gray-700">Muestra</TabsTrigger>
                <TabsTrigger value="rights" className="data-[state=active]:bg-gray-700">Derechos</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card className="bg-gray-800/60 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <FileText className="h-5 w-5" />
                      Descripción del Dataset
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-gray-300">
                    <p>
                      Este dataset masivo contiene <strong className="text-white">más de 100 millones de registros</strong> de 
                      telemetría capturados durante sesiones de prueba y competición en los principales circuitos europeos. 
                      Diseñado específicamente para el entrenamiento de modelos de inteligencia artificial aplicados al 
                      automovilismo de alto rendimiento.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 rounded-lg bg-red-900/30 border border-red-500/30">
                        <h4 className="font-semibold flex items-center gap-2 mb-2 text-red-400">
                          <Flag className="h-4 w-4" />
                          Circuitos Incluidos
                        </h4>
                        <ul className="text-sm space-y-1 text-gray-400">
                          <li>• Monza, Imola, Mugello (Italia)</li>
                          <li>• Spa-Francorchamps (Bélgica)</li>
                          <li>• Nürburgring, Hockenheim (Alemania)</li>
                          <li>• Barcelona, Valencia (España)</li>
                          <li>• Le Mans, Paul Ricard (Francia)</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-cyan-900/30 border border-cyan-500/30">
                        <h4 className="font-semibold flex items-center gap-2 mb-2 text-cyan-400">
                          <Building className="h-4 w-4" />
                          Custodio de Datos
                        </h4>
                        <p className="text-sm text-gray-400 mb-2">
                          <strong className="text-cyan-400">Dallara Data Engineering</strong>
                        </p>
                        <p className="text-sm text-gray-400">
                          Varano de' Melegari, Italia. Líder mundial en diseño y desarrollo 
                          de vehículos de competición y prototipos.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-700/50 mt-4">
                      <h4 className="font-semibold mb-2 text-white">Casos de Uso Principales</h4>
                      <ul className="text-sm space-y-2 text-gray-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                          Entrenamiento de modelos predictivos de rendimiento vehicular
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                          Optimización de estrategias de carrera mediante ML
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                          Análisis de desgaste de neumáticos y componentes
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                          Simulación de condiciones de conducción extremas
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schema" className="mt-6">
                <Card className="bg-gray-800/60 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Database className="h-5 w-5" />
                      Estructura de Datos
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Esquema optimizado para procesamiento ML (Parquet + HDF5)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700">
                            <TableHead className="w-[180px] text-gray-300">Campo</TableHead>
                            <TableHead className="w-[120px] text-gray-300">Tipo</TableHead>
                            <TableHead className="text-gray-300">Descripción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {DATA_SCHEMA.map((field) => (
                            <TableRow key={field.field} className="border-gray-700">
                              <TableCell className="font-mono text-sm text-cyan-400">{field.field}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                                  {field.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-gray-400">
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
                <Card className="bg-gray-800/60 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Activity className="h-5 w-5" />
                      Muestra de Telemetría
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Registros de ejemplo de sesiones reales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700">
                            <TableHead className="text-gray-300">Vehículo</TableHead>
                            <TableHead className="text-gray-300">Circuito</TableHead>
                            <TableHead className="text-gray-300">Velocidad</TableHead>
                            <TableHead className="text-gray-300">RPM</TableHead>
                            <TableHead className="text-gray-300">G-Force</TableHead>
                            <TableHead className="text-gray-300">Temp. Neum.</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {TELEMETRY_SAMPLE.map((record, index) => (
                            <TableRow key={index} className="border-gray-700">
                              <TableCell>
                                <div>
                                  <Badge className={getVehicleClassColor(record.vehicle_class)}>
                                    {getVehicleClassLabel(record.vehicle_class)}
                                  </Badge>
                                  <div className="text-xs text-gray-500 mt-1">{record.vehicle_id}</div>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-300">
                                <div className="text-sm">{record.track_name}</div>
                                <div className="text-xs text-gray-500">Sector {record.sector} - Vuelta {record.lap_number}</div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-green-400 font-mono">
                                  <Gauge className="h-3 w-3" />
                                  {record.speed_kmh} km/h
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-orange-400">
                                {record.engine_rpm.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-sm">
                                <div className="text-cyan-400">Lat: {record.g_force_lateral}g</div>
                                <div className="text-yellow-400">Long: {record.g_force_longitudinal}g</div>
                              </TableCell>
                              <TableCell className="text-xs text-gray-400">
                                FL: {record.tire_temp_fl}°C<br/>
                                FR: {record.tire_temp_fr}°C
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
                <Card className="bg-gray-800/60 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Shield className="h-5 w-5" />
                      Derechos de Uso (ODRL)
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Licencia especial para entrenamiento de AI
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-green-400 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Usos Permitidos
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            Entrenamiento de modelos AI/ML
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            Investigación académica y desarrollo
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            Uso comercial en productos derivados
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            Acceso mundial (licencia perpetua)
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-red-400 flex items-center gap-2">
                          <XCircle className="h-5 w-5" />
                          Usos Prohibidos
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-gray-300">
                            <XCircle className="h-4 w-4 text-red-400" />
                            Reventa del dataset original
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-300">
                            <XCircle className="h-4 w-4 text-red-400" />
                            Redistribución sin modificar
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-300">
                            <XCircle className="h-4 w-4 text-red-400" />
                            Identificación de pilotos/equipos
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div className="p-4 rounded-lg bg-green-900/30 border border-green-500/30">
                      <h4 className="font-semibold flex items-center gap-2 mb-2 text-green-400">
                        <Brain className="h-5 w-5" />
                        AI Training Autorizado
                      </h4>
                      <p className="text-sm text-gray-300">
                        Este dataset está específicamente diseñado y licenciado para el entrenamiento 
                        de modelos de inteligencia artificial. Los modelos entrenados pueden ser 
                        comercializados libremente con atribución a Dallara Data Engineering.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card - ONE TIME PURCHASE */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-red-500/50 sticky top-24 bg-gray-800/80">
                <CardHeader className="bg-gradient-to-r from-red-900/50 to-orange-900/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                      Pago Único
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">Licencia Perpetua</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-red-400">2.500€</span>
                    <span className="text-gray-400">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      Release anual de temporada completa
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      +100M registros de telemetría
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      Formatos Parquet + HDF5 (ML-ready)
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      Licencia comercial perpetua
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      Acceso API bulk download
                    </li>
                  </ul>

                  <Separator className="bg-gray-700" />

                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Comprar Licencia
                  </Button>
                  <Button variant="outline" className="w-full gap-2 border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Download className="h-4 w-4" />
                    Muestra Gratuita (1GB)
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
              <Card className="bg-gray-800/60 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-white">
                    <Building className="h-5 w-5" />
                    Proveedor de Datos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-900/50 to-orange-900/50 flex items-center justify-center border border-red-500/30">
                      <Zap className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Dallara Data Engineering</div>
                      <div className="text-sm text-gray-400">Varano de' Melegari, Italia</div>
                    </div>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tipo</span>
                      <span className="font-medium text-gray-200">Race Engineering</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Registros</span>
                      <span className="font-medium text-gray-200">+100M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Formato</span>
                      <span className="font-medium text-gray-200">Parquet / HDF5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Size */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border-red-500/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <HardDrive className="h-8 w-8 text-red-400" />
                    <div>
                      <div className="font-semibold text-white">Tamaño del Dataset</div>
                      <div className="text-2xl font-bold text-red-400">~85 GB</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Dataset comprimido en formato Parquet optimizado para 
                    procesamiento distribuido (Spark, Dask, Ray).
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
