import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Gauge,
  Globe,
  Calendar,
  Database,
  FileJson,
  Clock,
  CheckCircle2,
  XCircle,
  Battery,
  Zap,
  Activity,
  RefreshCw
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

const FlexibilidadEnergeticaDetail = () => {
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
      asset_id: "FLEX-DE-BAT-0012",
      asset_name: "Jardelund Battery Park",
      asset_type: "battery_storage",
      capacity_mw: 48,
      available_mw: 42.5,
      availability_pct: 88.5,
      response_time_sec: 1.2,
      state_of_charge_pct: 67,
      bid_price_eur_mwh: 85.50,
      market_status: "available",
      grid_zone: "tennet_north",
      prequalified_markets: ["FCR", "aFRR", "mFRR"]
    },
    {
      asset_id: "FLEX-DE-DSR-0158",
      asset_name: "BMW Leipzig Demand Response",
      asset_type: "demand_response",
      capacity_mw: 25,
      available_mw: 25,
      availability_pct: 100,
      response_time_sec: 15,
      state_of_charge_pct: null,
      bid_price_eur_mwh: 120.00,
      market_status: "available",
      grid_zone: "50hertz_east",
      prequalified_markets: ["mFRR", "RR"]
    },
    {
      asset_id: "FLEX-DE-PUMP-0003",
      asset_name: "Goldisthal Pumped Storage",
      asset_type: "pumped_hydro",
      capacity_mw: 1060,
      available_mw: 890,
      availability_pct: 84.0,
      response_time_sec: 90,
      state_of_charge_pct: 45,
      bid_price_eur_mwh: 65.00,
      market_status: "partial",
      grid_zone: "50hertz_south",
      prequalified_markets: ["FCR", "aFRR", "mFRR", "RR"]
    }
  ];

  const getAssetTypeIcon = (type: string) => {
    if (type.includes("battery")) return <Battery className="h-4 w-4 text-green-500" />;
    if (type.includes("demand")) return <Zap className="h-4 w-4 text-orange-500" />;
    if (type.includes("pump")) return <RefreshCw className="h-4 w-4 text-blue-500" />;
    return <Activity className="h-4 w-4 text-purple-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white">
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
                <Badge className="bg-orange-400/30 text-white border-orange-300/50">
                  <Gauge className="h-3 w-3 mr-1" />
                  Ops
                </Badge>
                <Badge className="bg-red-400/30 text-white border-red-300/50">
                  <Clock className="h-3 w-3 mr-1" />
                  Real-Time
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Disponibilidad de Flexibilidad Energética
              </h1>

              <p className="text-lg text-orange-100 mb-6 max-w-2xl">
                Capacidad de respuesta a la demanda, almacenamiento y generación flexible 
                disponible en tiempo real. Datos para operadores de mercados de balance y agregadores.
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Globe className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-orange-200">Custodio</p>
                    <p className="font-semibold text-sm">BDEW Grid Ops Frankfurt</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-orange-200">Actualización</p>
                    <p className="font-semibold text-sm">Horaria (cada 15 min)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Database className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-orange-200">Volumen</p>
                    <p className="font-semibold text-sm">+2.000 activos</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="w-full lg:w-80 bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Suscripción</span>
                  <Badge className="bg-orange-500 text-white">Ops</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold">520€</span>
                  <span className="text-orange-200">/mes</span>
                </div>
                <Separator className="bg-white/20" />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Datos en tiempo real (15 min)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Precios de ofertas de balance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Estado de carga baterías
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    API streaming WebSocket
                  </li>
                </ul>
                <Button onClick={handleRequestAccess} className="w-full bg-white text-orange-700 hover:bg-orange-50">
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
                  <Activity className="h-5 w-5 text-orange-600" />
                  Muestra de Datos - Activos de Flexibilidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Activo</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Cap. MW</TableHead>
                        <TableHead>Disp. MW</TableHead>
                        <TableHead>Resp. (s)</TableHead>
                        <TableHead>Precio €/MWh</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((row) => (
                        <TableRow key={row.asset_id}>
                          <TableCell className="font-mono text-xs">{row.asset_id}</TableCell>
                          <TableCell className="font-medium">{row.asset_name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getAssetTypeIcon(row.asset_type)}
                              <span className="text-xs">{row.asset_type.replace(/_/g, " ")}</span>
                            </div>
                          </TableCell>
                          <TableCell>{row.capacity_mw}</TableCell>
                          <TableCell className="text-green-600 font-semibold">{row.available_mw}</TableCell>
                          <TableCell>{row.response_time_sec}</TableCell>
                          <TableCell>{row.bid_price_eur_mwh.toFixed(2)}€</TableCell>
                          <TableCell>
                            <Badge variant={row.market_status === "available" ? "default" : "secondary"}>
                              {row.market_status}
                            </Badge>
                          </TableCell>
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
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Battery className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">8.5 GW</p>
                      <p className="text-sm text-muted-foreground">Baterías</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Zap className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4.2 GW</p>
                      <p className="text-sm text-muted-foreground">Demand Response</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <RefreshCw className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">9.8 GW</p>
                      <p className="text-sm text-muted-foreground">Bombeo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">&lt;30s</p>
                      <p className="text-sm text-muted-foreground">Resp. Media</p>
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
{`interface FlexibilityAssetRecord {
  asset_id: string;
  asset_name: string;
  asset_type: "battery_storage" | "demand_response" | "pumped_hydro" 
    | "v2g" | "electrolysis" | "chp_flexible" | "industrial_load";
  capacity_mw: number;
  available_mw: number;
  availability_pct: number;
  response_time_sec: number;
  state_of_charge_pct: number | null;
  bid_price_eur_mwh: number;
  market_status: "available" | "partial" | "committed" | "offline";
  grid_zone: string;
  prequalified_markets: ("FCR" | "aFRR" | "mFRR" | "RR")[];
  ramp_rate_mw_min: number;
  minimum_activation_mw: number;
  maximum_duration_hours: number;
  aggregator_id: string | null;
  last_update_timestamp: string;
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
                        Optimización de portafolio energético
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Participación en mercados de balance
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Agregación de recursos flexibles
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Planificación de despacho
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
                        AI Training sin autorización
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Redistribución de señales en tiempo real
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Uso fuera de la UE + UK
                      </li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Latencia y SLA
                  </h4>
                  <p className="text-sm text-orange-700">
                    Datos actualizados cada 15 minutos con latencia máxima garantizada de 60 segundos. 
                    SLA 99.9% uptime para operaciones críticas de balance.
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

export default FlexibilidadEnergeticaDetail;
