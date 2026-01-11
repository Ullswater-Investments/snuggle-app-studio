import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Factory, Calendar, Database, Download, FileJson, 
  Building2, Globe, CheckCircle2, XCircle, Activity,
  BarChart3, Clock, Gauge, Wrench, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface ProductiveCapacityRecord {
  week_start: string;
  plant_id: string;
  plant_type: "assembly" | "stamping" | "powertrain" | "battery" | "logistics";
  region: string;
  total_capacity_units: number;
  utilized_capacity_pct: number;
  idle_capacity_pct: number;
  lead_time_days: number;
  shift_pattern: "1_shift" | "2_shift" | "3_shift" | "24_7";
  workforce_availability: number;
  equipment_oee: number;
  maintenance_scheduled: boolean;
  bottleneck_status: string;
  energy_consumption_mwh: number;
}

const sampleData: ProductiveCapacityRecord[] = [
  {
    week_start: "2024-01-08",
    plant_id: "PLT-DE-MUC-01",
    plant_type: "assembly",
    region: "Bavaria",
    total_capacity_units: 5200,
    utilized_capacity_pct: 87,
    idle_capacity_pct: 13,
    lead_time_days: 4,
    shift_pattern: "3_shift",
    workforce_availability: 94,
    equipment_oee: 82,
    maintenance_scheduled: false,
    bottleneck_status: "None",
    energy_consumption_mwh: 2450
  },
  {
    week_start: "2024-01-08",
    plant_id: "PLT-DE-STU-02",
    plant_type: "powertrain",
    region: "Baden-Württemberg",
    total_capacity_units: 12000,
    utilized_capacity_pct: 92,
    idle_capacity_pct: 8,
    lead_time_days: 6,
    shift_pattern: "24_7",
    workforce_availability: 96,
    equipment_oee: 88,
    maintenance_scheduled: false,
    bottleneck_status: "Minor - CNC Line 3",
    energy_consumption_mwh: 4120
  },
  {
    week_start: "2024-01-08",
    plant_id: "PLT-DE-WOB-03",
    plant_type: "stamping",
    region: "Lower Saxony",
    total_capacity_units: 8500,
    utilized_capacity_pct: 78,
    idle_capacity_pct: 22,
    lead_time_days: 3,
    shift_pattern: "2_shift",
    workforce_availability: 89,
    equipment_oee: 75,
    maintenance_scheduled: true,
    bottleneck_status: "Press Line A - Maintenance",
    energy_consumption_mwh: 3200
  },
  {
    week_start: "2024-01-08",
    plant_id: "PLT-DE-LEI-04",
    plant_type: "battery",
    region: "Saxony",
    total_capacity_units: 3200,
    utilized_capacity_pct: 95,
    idle_capacity_pct: 5,
    lead_time_days: 8,
    shift_pattern: "24_7",
    workforce_availability: 98,
    equipment_oee: 91,
    maintenance_scheduled: false,
    bottleneck_status: "None",
    energy_consumption_mwh: 5800
  },
  {
    week_start: "2024-01-08",
    plant_id: "PLT-DE-BRE-05",
    plant_type: "logistics",
    region: "Bremen",
    total_capacity_units: 15000,
    utilized_capacity_pct: 71,
    idle_capacity_pct: 29,
    lead_time_days: 2,
    shift_pattern: "2_shift",
    workforce_availability: 85,
    equipment_oee: 79,
    maintenance_scheduled: false,
    bottleneck_status: "Loading Dock C",
    energy_consumption_mwh: 1850
  }
];

const CapacidadProductivaDetail: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const getPlantTypeColor = (type: string) => {
    switch (type) {
      case "assembly": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "powertrain": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "stamping": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "battery": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "logistics": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getUtilizationColor = (pct: number) => {
    if (pct >= 90) return "text-green-500";
    if (pct >= 75) return "text-yellow-500";
    if (pct >= 50) return "text-orange-500";
    return "text-red-500";
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE').format(num);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 text-orange-200 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  <Factory className="h-3 w-3 mr-1" />
                  Industry 4.0 Connected
                </Badge>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  <Activity className="h-3 w-3 mr-1" />
                  Near Real-time
                </Badge>
              </div>

              <h1 className="text-3xl font-bold mb-3">
                Monitor de Capacidad Productiva Automotriz
              </h1>
              
              <p className="text-orange-100 text-lg mb-6">
                Dataset operacional de +800 plantas de producción del sector automotriz alemán, 
                con métricas de capacidad, OEE y estado de líneas actualizado semanalmente.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Building2 className="h-4 w-4 text-orange-400" />
                  <span>VDA (Verband der Automobilindustrie)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-amber-400" />
                  <span>Actualización: Semanal (Lunes 00:00 CET)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Database className="h-4 w-4 text-yellow-400" />
                  <span>+800 plantas</span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <Card className="w-full lg:w-80 bg-white/10 border-white/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Suscripción Mensual</span>
                  <Badge className="bg-green-500/20 text-green-300">Disponible</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold text-white">520€</span>
                  <span className="text-orange-200">/mes</span>
                </div>
                <div className="space-y-2 text-sm text-orange-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Datos OEE y capacidad en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>API OData compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Alertas de bottleneck</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Integración Siemens MindSphere</span>
                  </div>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Solicitar Acceso
                </Button>
                <p className="text-xs text-center text-orange-300">
                  Requiere contrato de confidencialidad
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="sample">Datos de Muestra</TabsTrigger>
            <TabsTrigger value="schema">Esquema</TabsTrigger>
            <TabsTrigger value="terms">Términos ODRL</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Factory className="h-4 w-4" />
                    Plantas Monitorizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">812</div>
                  <p className="text-sm text-muted-foreground">En toda Alemania</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    OEE Promedio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">83.2%</div>
                  <p className="text-sm text-muted-foreground">Overall Equipment Effectiveness</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Utilización Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-500">84.6%</div>
                  <p className="text-sm text-muted-foreground">Capacidad utilizada</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    En Mantenimiento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-500">47</div>
                  <p className="text-sm text-muted-foreground">Plantas esta semana</p>
                </CardContent>
              </Card>
            </div>

            {/* Plant Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Distribución por Tipo de Planta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      Assembly (Ensamblaje final)
                    </span>
                    <span className="font-medium">185 (23%)</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      Powertrain (Tren de potencia)
                    </span>
                    <span className="font-medium">142 (17%)</span>
                  </div>
                  <Progress value={17} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      Stamping (Estampación)
                    </span>
                    <span className="font-medium">98 (12%)</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      Battery (Producción de baterías)
                    </span>
                    <span className="font-medium">67 (8%)</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      Logistics (Centros logísticos)
                    </span>
                    <span className="font-medium">320 (40%)</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Custodian Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Custodia de Datos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Custodio</h4>
                    <p className="text-muted-foreground">Siemens MindSphere</p>
                    <p className="text-sm text-muted-foreground">Munich, Alemania</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Certificaciones</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">ISO 27001</Badge>
                      <Badge variant="outline">IEC 62443</Badge>
                      <Badge variant="outline">TISAX</Badge>
                      <Badge variant="outline">Industry 4.0</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sample">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Muestra de Datos (5 registros)
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Muestra
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Semana</TableHead>
                        <TableHead>ID Planta</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Región</TableHead>
                        <TableHead>Capacidad</TableHead>
                        <TableHead>Utilización</TableHead>
                        <TableHead>OEE</TableHead>
                        <TableHead>Turno</TableHead>
                        <TableHead>Bottleneck</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">{record.week_start}</TableCell>
                          <TableCell className="font-mono text-sm">{record.plant_id}</TableCell>
                          <TableCell>
                            <Badge className={getPlantTypeColor(record.plant_type)}>
                              {record.plant_type.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{record.region}</TableCell>
                          <TableCell>{formatNumber(record.total_capacity_units)}</TableCell>
                          <TableCell>
                            <span className={getUtilizationColor(record.utilized_capacity_pct)}>
                              {record.utilized_capacity_pct}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={record.equipment_oee >= 80 ? "text-green-500" : "text-orange-500"}>
                              {record.equipment_oee}%
                            </span>
                          </TableCell>
                          <TableCell>{record.shift_pattern.replace("_", " ")}</TableCell>
                          <TableCell className="max-w-32 truncate" title={record.bottleneck_status}>
                            {record.bottleneck_status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schema">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileJson className="h-5 w-5" />
                  Esquema de Datos (TypeScript)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`interface ProductiveCapacityRecord {
  week_start: string;                // Fecha inicio semana (ISO 8601)
  plant_id: string;                  // ID único de planta
  plant_type: "assembly" | "stamping" | "powertrain" | "battery" | "logistics";
  region: string;                    // Región/Estado federal
  total_capacity_units: number;      // Capacidad total en unidades
  utilized_capacity_pct: number;     // % capacidad utilizada
  idle_capacity_pct: number;         // % capacidad ociosa
  lead_time_days: number;            // Tiempo de entrega en días
  shift_pattern: "1_shift" | "2_shift" | "3_shift" | "24_7";
  workforce_availability: number;    // % disponibilidad de personal
  equipment_oee: number;             // Overall Equipment Effectiveness
  maintenance_scheduled: boolean;    // Mantenimiento programado
  bottleneck_status: string;         // Estado de cuellos de botella
  energy_consumption_mwh: number;    // Consumo energético semanal
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Términos de Uso (ODRL)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-500 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Usos Permitidos
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Planificación de producción
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Análisis de capacidad
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Optimización de supply chain
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Integración con ERP/MES
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-500 flex items-center gap-2">
                      <XCircle className="h-5 w-5" />
                      Usos Prohibidos
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Entrenamiento de modelos de IA
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Reventa o redistribución
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Uso fuera de EU + Suiza
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Análisis competitivo externo
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Restricciones Geográficas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Unión Europea
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Suiza
                    </Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      <XCircle className="h-3 w-3 mr-1" />
                      Resto del mundo
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CapacidadProductivaDetail;
