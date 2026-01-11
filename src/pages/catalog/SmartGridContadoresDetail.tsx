import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Cpu,
  Globe,
  Calendar,
  Database,
  FileJson,
  Clock,
  CheckCircle2,
  XCircle,
  Gauge,
  Activity,
  Home,
  Factory,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const SmartGridContadoresDetail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRequestAccess = () => {
    toast.success("Solicitud de acceso iniciada", {
      description: "Serás redirigido al formulario de solicitud."
    });
    navigate("/auth");
  };

  const sampleData = [
    {
      meter_cluster_id: "SMC-DE-RES-089765",
      cluster_type: "residential",
      postcode_area: "10115",
      meter_count: 2450,
      total_consumption_kwh: 18750000,
      avg_consumption_kwh: 7653,
      peak_demand_kw: 4200,
      peak_hour: 19,
      load_factor_pct: 42.5,
      pv_injection_kwh: 890000,
      ev_charging_kwh: 125000,
      demand_flexibility_pct: 12.3
    },
    {
      meter_cluster_id: "SMC-DE-IND-045231",
      cluster_type: "industrial",
      postcode_area: "70173",
      meter_count: 85,
      total_consumption_kwh: 125000000,
      avg_consumption_kwh: 1470588,
      peak_demand_kw: 35000,
      peak_hour: 11,
      load_factor_pct: 68.2,
      pv_injection_kwh: 4500000,
      ev_charging_kwh: 0,
      demand_flexibility_pct: 28.5
    },
    {
      meter_cluster_id: "SMC-DE-COM-023156",
      cluster_type: "commercial",
      postcode_area: "80331",
      meter_count: 420,
      total_consumption_kwh: 8900000,
      avg_consumption_kwh: 21190,
      peak_demand_kw: 2800,
      peak_hour: 14,
      load_factor_pct: 55.8,
      pv_injection_kwh: 320000,
      ev_charging_kwh: 45000,
      demand_flexibility_pct: 18.7
    }
  ];

  const getClusterIcon = (type: string) => {
    if (type === "residential") return <Home className="h-4 w-4 text-blue-500" />;
    if (type === "industrial") return <Factory className="h-4 w-4 text-orange-500" />;
    return <Activity className="h-4 w-4 text-purple-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-cyan-700 via-teal-600 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container mx-auto px-4 py-8 relative">
          <Button
            variant="ghost"
            onClick={() => navigate("/catalog")}
            className="mb-6 text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Catálogo
          </Button>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Badge className="bg-white/20 text-white border-white/30">
                  🇩🇪 Alemania
                </Badge>
                <Badge className="bg-cyan-400/30 text-white border-cyan-300/50">
                  <Cpu className="h-3 w-3 mr-1" />
                  R&D
                </Badge>
                <Badge className="bg-emerald-400/30 text-white border-emerald-300/50">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Ready
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Dataset de Smart Grid y Contadores Inteligentes
              </h1>

              <p className="text-lg text-cyan-100 mb-6 max-w-2xl">
                Datos anonimizados de contadores inteligentes, curvas de carga y patrones de consumo 
                residencial e industrial. Optimizado para modelos de ML y predicción de demanda.
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Globe className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-cyan-200">Custodio</p>
                    <p className="font-semibold text-sm">BDEW Smart Grid Munich</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-cyan-200">Actualización</p>
                    <p className="font-semibold text-sm">Anual (nueva versión)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Database className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-cyan-200">Volumen</p>
                    <p className="font-semibold text-sm">+500M lecturas</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="w-full lg:w-80 bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Licencia Anual</span>
                  <Badge className="bg-cyan-500 text-white">R&D</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold">1.800€</span>
                  <span className="text-cyan-200">/año</span>
                </div>
                <Separator className="bg-white/20" />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Dataset completo anonimizado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Formatos Parquet + Arrow
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Licencia AI Training incluida
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Notebooks de ejemplo
                  </li>
                </ul>
                <Button onClick={handleRequestAccess} className="w-full bg-white text-cyan-700 hover:bg-cyan-50">
                  Solicitar Acceso
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="preview">Vista Previa</TabsTrigger>
            <TabsTrigger value="schema">Esquema</TabsTrigger>
            <TabsTrigger value="odrl">ODRL</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-cyan-600" />
                  Muestra de Datos - Clusters de Contadores (Agregados)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Cluster</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>CP</TableHead>
                        <TableHead>Contadores</TableHead>
                        <TableHead>Consumo Total kWh</TableHead>
                        <TableHead>Pico kW</TableHead>
                        <TableHead>Factor Carga</TableHead>
                        <TableHead>Flex. %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((row) => (
                        <TableRow key={row.meter_cluster_id}>
                          <TableCell className="font-mono text-xs">{row.meter_cluster_id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getClusterIcon(row.cluster_type)}
                              <span className="text-xs capitalize">{row.cluster_type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{row.postcode_area}</TableCell>
                          <TableCell>{row.meter_count.toLocaleString()}</TableCell>
                          <TableCell>{(row.total_consumption_kwh / 1000000).toFixed(1)}M</TableCell>
                          <TableCell>{row.peak_demand_kw.toLocaleString()}</TableCell>
                          <TableCell>{row.load_factor_pct}%</TableCell>
                          <TableCell className="text-cyan-600 font-semibold">{row.demand_flexibility_pct}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12M</p>
                      <p className="text-sm text-muted-foreground">Residenciales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Factory className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">850K</p>
                      <p className="text-sm text-muted-foreground">Industriales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-cyan-100 rounded-lg">
                      <Database className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">500M+</p>
                      <p className="text-sm text-muted-foreground">Lecturas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Sparkles className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">100%</p>
                      <p className="text-sm text-muted-foreground">Anonimizado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`interface SmartMeterClusterRecord {
  meter_cluster_id: string;
  cluster_type: "residential" | "commercial" | "industrial" | "agricultural";
  postcode_area: string;
  meter_count: number;
  total_consumption_kwh: number;
  avg_consumption_kwh: number;
  peak_demand_kw: number;
  peak_hour: number;
  load_factor_pct: number;
  pv_injection_kwh: number;
  ev_charging_kwh: number;
  demand_flexibility_pct: number;
  load_profile: {
    hour: number;
    avg_kw: number;
    std_dev_kw: number;
  }[];
  seasonal_adjustment: {
    winter_factor: number;
    summer_factor: number;
  };
  building_vintage: "pre_1980" | "1980_2000" | "2000_2015" | "post_2015";
  heating_type: "gas" | "electric" | "heat_pump" | "district" | "mixed";
  anonymization_level: "k_10" | "k_50" | "k_100";
}`}</pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="odrl">
            <Card>
              <CardHeader>
                <CardTitle>Condiciones de Uso (ODRL)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Permitido
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        AI Training y Machine Learning
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Modelos de predicción de demanda
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Investigación académica
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Desarrollo de productos propios
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-700 flex items-center gap-2">
                      <XCircle className="h-4 w-4" /> No Permitido
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Redistribución del dataset
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Intentos de re-identificación
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Uso fuera de EU + UK + CH
                      </li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-cyan-800 mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" /> Licencia AI Training
                  </h4>
                  <p className="text-sm text-cyan-700">
                    Dataset diseñado específicamente para entrenamiento de modelos de ML. Incluye 
                    anonimización k-anonymity conforme a GDPR y directrices del EDPB para datos de energía.
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

export default SmartGridContadoresDetail;
