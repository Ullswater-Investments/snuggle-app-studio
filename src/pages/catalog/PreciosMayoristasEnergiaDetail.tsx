import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  BarChart3,
  Globe,
  Calendar,
  Database,
  FileJson,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Coins
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

const PreciosMayoristasEnergiaDetail = () => {
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
      transaction_id: "EPEX-DE-2024-001589",
      market: "EPEX Spot",
      product_type: "day_ahead",
      delivery_zone: "DE-LU",
      delivery_date: "2024-01-16",
      delivery_hour: 14,
      price_eur_mwh: 87.45,
      price_change_pct: 3.2,
      volume_mwh: 12500,
      clearing_type: "auction",
      renewable_share_pct: 62.3,
      congestion_rent_eur: 15200
    },
    {
      transaction_id: "EEX-DE-FUT-Q2-2024",
      market: "EEX Futures",
      product_type: "quarter_future",
      delivery_zone: "DE",
      delivery_date: "2024-Q2",
      delivery_hour: null,
      price_eur_mwh: 78.90,
      price_change_pct: -1.5,
      volume_mwh: 85000,
      clearing_type: "continuous",
      renewable_share_pct: null,
      congestion_rent_eur: null
    },
    {
      transaction_id: "EPEX-DE-INTRA-2024-089",
      market: "EPEX Intraday",
      product_type: "intraday_continuous",
      delivery_zone: "DE-LU",
      delivery_date: "2024-01-15",
      delivery_hour: 18,
      price_eur_mwh: 92.30,
      price_change_pct: 8.7,
      volume_mwh: 450,
      clearing_type: "continuous",
      renewable_share_pct: 48.5,
      congestion_rent_eur: 0
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-600 text-white">
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
                <Badge className="bg-purple-400/30 text-white border-purple-300/50">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Market
                </Badge>
                <Badge className="bg-yellow-400/30 text-white border-yellow-300/50">
                  <Coins className="h-3 w-3 mr-1" />
                  Price Index
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Índice de Precios Mayoristas de Energía
              </h1>

              <p className="text-lg text-purple-100 mb-6 max-w-2xl">
                Precios spot, futuros y PPAs de electricidad y gas natural en mercados alemanes y europeos. 
                Datos de EPEX Spot, EEX y mercados OTC para trading y hedging.
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Globe className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-purple-200">Custodio</p>
                    <p className="font-semibold text-sm">BDEW Market Intel</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-purple-200">Actualización</p>
                    <p className="font-semibold text-sm">Horaria (real-time)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Database className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-purple-200">Volumen</p>
                    <p className="font-semibold text-sm">+100K tx/día</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="w-full lg:w-80 bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Suscripción</span>
                  <Badge className="bg-purple-500 text-white">Market</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold">680€</span>
                  <span className="text-purple-200">/mes</span>
                </div>
                <Separator className="bg-white/20" />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Precios spot y futuros
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Volúmenes por hora
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Curvas forward completas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    API tick-by-tick
                  </li>
                </ul>
                <Button onClick={handleRequestAccess} className="w-full bg-white text-purple-700 hover:bg-purple-50">
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
                  <Activity className="h-5 w-5 text-purple-600" />
                  Muestra de Datos - Transacciones de Mercado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Transacción</TableHead>
                        <TableHead>Mercado</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Zona</TableHead>
                        <TableHead>Precio €/MWh</TableHead>
                        <TableHead>Cambio %</TableHead>
                        <TableHead>Volumen MWh</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((row) => (
                        <TableRow key={row.transaction_id}>
                          <TableCell className="font-mono text-xs">{row.transaction_id}</TableCell>
                          <TableCell className="font-medium">{row.market}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {row.product_type.replace(/_/g, " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>{row.delivery_zone}</TableCell>
                          <TableCell className="font-bold">{row.price_eur_mwh.toFixed(2)}€</TableCell>
                          <TableCell>
                            <span className={`flex items-center gap-1 ${row.price_change_pct > 0 ? "text-green-600" : "text-red-600"}`}>
                              {row.price_change_pct > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {row.price_change_pct > 0 ? "+" : ""}{row.price_change_pct}%
                            </span>
                          </TableCell>
                          <TableCell>{row.volume_mwh.toLocaleString()}</TableCell>
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
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">87.45€</p>
                      <p className="text-sm text-muted-foreground">Spot Actual</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">78.90€</p>
                      <p className="text-sm text-muted-foreground">Futuro Q2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Activity className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">+105K</p>
                      <p className="text-sm text-muted-foreground">Tx Hoy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Coins className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">62%</p>
                      <p className="text-sm text-muted-foreground">% Renovable</p>
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
{`interface WholesalePriceRecord {
  transaction_id: string;
  market: "EPEX Spot" | "EEX Futures" | "EPEX Intraday" | "OTC" | "PPA";
  product_type: "day_ahead" | "intraday_continuous" | "intraday_auction" 
    | "week_future" | "month_future" | "quarter_future" | "year_future";
  delivery_zone: "DE" | "DE-LU" | "DE-AT-LU" | string;
  delivery_date: string;
  delivery_hour: number | null;
  price_eur_mwh: number;
  price_change_pct: number;
  volume_mwh: number;
  clearing_type: "auction" | "continuous";
  renewable_share_pct: number | null;
  congestion_rent_eur: number | null;
  bid_ask_spread: number;
  open_interest_mwh: number | null;
  settlement_price: number;
  timestamp: string;
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
                        Trading y hedging interno
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Análisis de mercado propietario
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Valoración de portafolios
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Modelos de predicción de precios
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
                        Redistribución a terceros
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Publicación de índices derivados
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        AI Training comercial externo
                      </li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Licencia de Mercado
                  </h4>
                  <p className="text-sm text-purple-700">
                    Requiere licencia de participante en mercados EPEX/EEX o acuerdo de datos de mercado. 
                    Conforme a regulación REMIT y MiFID II para transparencia de mercados energéticos.
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

export default PreciosMayoristasEnergiaDetail;
