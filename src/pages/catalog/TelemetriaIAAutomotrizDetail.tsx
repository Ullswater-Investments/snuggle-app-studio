import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Brain, Calendar, Database, Download, FileJson, 
  Building2, Globe, CheckCircle2, XCircle, Cpu,
  BarChart3, Zap, Activity, Waves, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface AITelemetryRecord {
  timestamp: string;
  sensor_id: string;
  sensor_type: "vibration" | "temperature" | "pressure" | "acoustic" | "vision";
  machine_id: string;
  machine_type: string;
  reading_value: number;
  reading_unit: string;
  anomaly_flag: boolean;
  anomaly_score: number;
  failure_label: string | null;
  time_to_failure_hours: number | null;
  operating_mode: string;
  data_quality_score: number;
}

const sampleData: AITelemetryRecord[] = [
  {
    timestamp: "2024-01-08T14:32:15.847Z",
    sensor_id: "VIB-CNC-001-A",
    sensor_type: "vibration",
    machine_id: "CNC-LATHE-042",
    machine_type: "CNC Lathe",
    reading_value: 2.847,
    reading_unit: "mm/s",
    anomaly_flag: false,
    anomaly_score: 0.12,
    failure_label: null,
    time_to_failure_hours: null,
    operating_mode: "production",
    data_quality_score: 98
  },
  {
    timestamp: "2024-01-08T14:32:15.923Z",
    sensor_id: "TEMP-MOTOR-003",
    sensor_type: "temperature",
    machine_id: "PRESS-HYD-018",
    machine_type: "Hydraulic Press",
    reading_value: 78.4,
    reading_unit: "°C",
    anomaly_flag: true,
    anomaly_score: 0.82,
    failure_label: "bearing_wear",
    time_to_failure_hours: 168,
    operating_mode: "production",
    data_quality_score: 95
  },
  {
    timestamp: "2024-01-08T14:32:16.012Z",
    sensor_id: "PRES-PUMP-007",
    sensor_type: "pressure",
    machine_id: "ROBOT-WELD-089",
    machine_type: "Welding Robot",
    reading_value: 145.2,
    reading_unit: "bar",
    anomaly_flag: false,
    anomaly_score: 0.08,
    failure_label: null,
    time_to_failure_hours: null,
    operating_mode: "production",
    data_quality_score: 99
  },
  {
    timestamp: "2024-01-08T14:32:16.156Z",
    sensor_id: "ACOU-GEAR-012",
    sensor_type: "acoustic",
    machine_id: "GEARBOX-ASM-023",
    machine_type: "Gearbox Assembly",
    reading_value: 72.3,
    reading_unit: "dB",
    anomaly_flag: true,
    anomaly_score: 0.67,
    failure_label: "gear_misalignment",
    time_to_failure_hours: 720,
    operating_mode: "testing",
    data_quality_score: 94
  },
  {
    timestamp: "2024-01-08T14:32:16.234Z",
    sensor_id: "VIS-INSPECT-004",
    sensor_type: "vision",
    machine_id: "PAINT-BOOTH-056",
    machine_type: "Paint Booth",
    reading_value: 0.94,
    reading_unit: "quality_index",
    anomaly_flag: false,
    anomaly_score: 0.15,
    failure_label: null,
    time_to_failure_hours: null,
    operating_mode: "production",
    data_quality_score: 97
  }
];

const TelemetriaIAAutomotrizDetail: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const getSensorTypeColor = (type: string) => {
    switch (type) {
      case "vibration": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "temperature": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "pressure": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "acoustic": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "vision": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE').format(num);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 text-purple-200 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Brain className="h-3 w-3 mr-1" />
                  AI Ready
                </Badge>
                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                  <Cpu className="h-3 w-3 mr-1" />
                  ML Optimized
                </Badge>
                <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                  <Zap className="h-3 w-3 mr-1" />
                  Big Data
                </Badge>
              </div>

              <h1 className="text-3xl font-bold mb-3">
                Dataset de Telemetría para IA Automotriz
              </h1>
              
              <p className="text-purple-100 text-lg mb-6">
                Dataset masivo de +50M registros de sensores industriales, etiquetado para 
                entrenamiento de modelos de mantenimiento predictivo y detección de anomalías.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Building2 className="h-4 w-4 text-purple-400" />
                  <span>VDA (Verband der Automobilindustrie)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-violet-400" />
                  <span>Actualización: Anual (versiones)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Database className="h-4 w-4 text-indigo-400" />
                  <span>+50M registros</span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <Card className="w-full lg:w-80 bg-white/10 border-white/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Licencia Perpetua</span>
                  <Badge className="bg-green-500/20 text-green-300">Pago Único</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold text-white">1.200€</span>
                  <span className="text-purple-200"> único</span>
                </div>
                <div className="space-y-2 text-sm text-purple-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Licencia perpetua de uso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Formatos Parquet + TFRecord</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Etiquetas de fallo incluidas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Uso para AI Training permitido</span>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Comprar Dataset
                </Button>
                <p className="text-xs text-center text-purple-300">
                  Descarga vía AWS Data Exchange
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
                    <Database className="h-4 w-4" />
                    Total Registros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">52.4M</div>
                  <p className="text-sm text-muted-foreground">Lecturas de sensores</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Tipos de Sensor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-500">5</div>
                  <p className="text-sm text-muted-foreground">Categorías diferentes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Waves className="h-4 w-4" />
                    Anomalías Etiquetadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-500">8.2M</div>
                  <p className="text-sm text-muted-foreground">15.6% del dataset</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Calidad Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">96.4%</div>
                  <p className="text-sm text-muted-foreground">Score de calidad</p>
                </CardContent>
              </Card>
            </div>

            {/* Sensor Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Distribución por Tipo de Sensor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      Vibration (Acelerómetros, vibraciones)
                    </span>
                    <span className="font-medium">18.3M (35%)</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      Temperature (Termopares, RTDs)
                    </span>
                    <span className="font-medium">14.7M (28%)</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      Pressure (Transductores de presión)
                    </span>
                    <span className="font-medium">10.5M (20%)</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      Acoustic (Micrófonos, ultrasonidos)
                    </span>
                    <span className="font-medium">5.2M (10%)</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      Vision (Cámaras, inspección visual)
                    </span>
                    <span className="font-medium">3.7M (7%)</span>
                  </div>
                  <Progress value={7} className="h-2" />
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
                    <p className="text-muted-foreground">AWS Data Exchange</p>
                    <p className="text-sm text-muted-foreground">Frankfurt, Alemania (eu-central-1)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Formatos Disponibles</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Apache Parquet</Badge>
                      <Badge variant="outline">TFRecord (TensorFlow)</Badge>
                      <Badge variant="outline">CSV (comprimido)</Badge>
                      <Badge variant="outline">Delta Lake</Badge>
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
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Sensor ID</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Máquina</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Anomalía</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Fallo</TableHead>
                        <TableHead>TTF (h)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-xs">{record.timestamp.split("T")[1].split(".")[0]}</TableCell>
                          <TableCell className="font-mono text-sm">{record.sensor_id}</TableCell>
                          <TableCell>
                            <Badge className={getSensorTypeColor(record.sensor_type)}>
                              {record.sensor_type.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-24 truncate" title={record.machine_type}>
                            {record.machine_type}
                          </TableCell>
                          <TableCell>{record.reading_value} {record.reading_unit}</TableCell>
                          <TableCell>
                            {record.anomaly_flag ? (
                              <Badge className="bg-red-500/20 text-red-400">⚠️ Sí</Badge>
                            ) : (
                              <Badge className="bg-green-500/20 text-green-400">✓ No</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className={record.anomaly_score > 0.5 ? "text-red-500" : "text-green-500"}>
                              {record.anomaly_score.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-24 truncate">
                            {record.failure_label || "-"}
                          </TableCell>
                          <TableCell>
                            {record.time_to_failure_hours || "-"}
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
{`interface AITelemetryRecord {
  timestamp: string;                 // ISO 8601 con millisegundos
  sensor_id: string;                 // ID único del sensor
  sensor_type: "vibration" | "temperature" | "pressure" | "acoustic" | "vision";
  machine_id: string;                // ID de la máquina
  machine_type: string;              // Tipo de máquina
  reading_value: number;             // Valor de la lectura
  reading_unit: string;              // Unidad de medida
  anomaly_flag: boolean;             // Flag de anomalía detectada
  anomaly_score: number;             // Score de anomalía (0-1)
  failure_label: string | null;      // Etiqueta de tipo de fallo
  time_to_failure_hours: number | null; // Horas hasta el fallo
  operating_mode: string;            // Modo de operación
  data_quality_score: number;        // Score de calidad (0-100)
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
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
                        Entrenamiento de modelos de IA/ML
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Investigación y desarrollo
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Benchmarking de algoritmos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Publicaciones académicas
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
                        Reventa del dataset
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Redistribución no autorizada
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Identificación de plantas originales
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
                      Sin restricciones geográficas
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Este dataset puede utilizarse en cualquier ubicación geográfica.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TelemetriaIAAutomotrizDetail;
