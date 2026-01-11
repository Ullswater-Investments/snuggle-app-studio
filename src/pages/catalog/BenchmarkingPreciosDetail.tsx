import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, TrendingUp, Calendar, Database, Download, FileJson, 
  Building2, Globe, CheckCircle2, XCircle, DollarSign,
  BarChart3, LineChart, AlertTriangle, Package, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface ComponentPricingRecord {
  price_date: string;
  sku_category: string;
  component_type: "electronic" | "mechanical" | "raw_material" | "chemical";
  commodity_group: string;
  price_index: number;
  price_change_mom_pct: number;
  price_change_yoy_pct: number;
  volatility_index: number;
  supply_tension_indicator: string;
  regional_premium_pct: number;
  currency: string;
  forecast_trend: "rising" | "stable" | "falling";
  confidence_level: number;
}

const sampleData: ComponentPricingRecord[] = [
  {
    price_date: "2024-01-05",
    sku_category: "Semiconductors",
    component_type: "electronic",
    commodity_group: "Microcontrollers",
    price_index: 142,
    price_change_mom_pct: 2.3,
    price_change_yoy_pct: 18.5,
    volatility_index: 28,
    supply_tension_indicator: "High",
    regional_premium_pct: 12,
    currency: "EUR",
    forecast_trend: "rising",
    confidence_level: 85
  },
  {
    price_date: "2024-01-05",
    sku_category: "Steel Alloys",
    component_type: "raw_material",
    commodity_group: "High-Strength Steel",
    price_index: 118,
    price_change_mom_pct: -1.2,
    price_change_yoy_pct: 8.4,
    volatility_index: 15,
    supply_tension_indicator: "Medium",
    regional_premium_pct: 5,
    currency: "EUR",
    forecast_trend: "stable",
    confidence_level: 78
  },
  {
    price_date: "2024-01-05",
    sku_category: "Battery Cells",
    component_type: "electronic",
    commodity_group: "Li-Ion NMC",
    price_index: 95,
    price_change_mom_pct: -3.8,
    price_change_yoy_pct: -22.1,
    volatility_index: 32,
    supply_tension_indicator: "Low",
    regional_premium_pct: 8,
    currency: "EUR",
    forecast_trend: "falling",
    confidence_level: 72
  },
  {
    price_date: "2024-01-05",
    sku_category: "Wiring Harness",
    component_type: "mechanical",
    commodity_group: "Copper Wire",
    price_index: 128,
    price_change_mom_pct: 0.8,
    price_change_yoy_pct: 12.3,
    volatility_index: 22,
    supply_tension_indicator: "Medium",
    regional_premium_pct: 3,
    currency: "EUR",
    forecast_trend: "stable",
    confidence_level: 81
  },
  {
    price_date: "2024-01-05",
    sku_category: "Adhesives",
    component_type: "chemical",
    commodity_group: "Structural Adhesives",
    price_index: 108,
    price_change_mom_pct: 1.5,
    price_change_yoy_pct: 6.2,
    volatility_index: 12,
    supply_tension_indicator: "Low",
    regional_premium_pct: 2,
    currency: "EUR",
    forecast_trend: "rising",
    confidence_level: 88
  }
];

const BenchmarkingPreciosDetail: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const getTypeColor = (type: string) => {
    switch (type) {
      case "electronic": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "mechanical": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "raw_material": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "chemical": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "rising": return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "falling": return <ArrowDownRight className="h-4 w-4 text-green-500" />;
      default: return <span className="text-yellow-500">→</span>;
    }
  };

  const getTensionColor = (tension: string) => {
    switch (tension) {
      case "High": return "text-red-500";
      case "Medium": return "text-yellow-500";
      case "Low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 text-blue-200 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Market Intelligence
                </Badge>
                <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                  <LineChart className="h-3 w-3 mr-1" />
                  Premium Data
                </Badge>
              </div>

              <h1 className="text-3xl font-bold mb-3">
                Benchmarking de Precios de Componentes Automotrices
              </h1>
              
              <p className="text-blue-100 text-lg mb-6">
                Índices de precios anonimizados de +15.000 SKUs del sector automotriz, 
                con análisis de tendencias, volatilidad y proyecciones de mercado.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  <span>VDA (Verband der Automobilindustrie)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-indigo-400" />
                  <span>Actualización: Mensual (día 5)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Database className="h-4 w-4 text-purple-400" />
                  <span>+15.000 SKUs</span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <Card className="w-full lg:w-80 bg-white/10 border-white/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Suscripción Premium</span>
                  <Badge className="bg-amber-500/20 text-amber-300">Premium</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold text-white">680€</span>
                  <span className="text-blue-200">/mes</span>
                </div>
                <div className="space-y-2 text-sm text-blue-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Acceso completo a índices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Proyecciones de mercado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>API + SFTP delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Alertas de volatilidad</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Solicitar Acceso
                </Button>
                <p className="text-xs text-center text-blue-300">
                  Incluye 3 usuarios con licencia
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
                    <Package className="h-4 w-4" />
                    SKUs Monitorizados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">15,423</div>
                  <p className="text-sm text-muted-foreground">Componentes automotrices</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Cambio Medio YoY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-500">+8.2%</div>
                  <p className="text-sm text-muted-foreground">Índice general</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Alta Volatilidad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-500">1,247</div>
                  <p className="text-sm text-muted-foreground">SKUs en alerta</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Cobertura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-500">42</div>
                  <p className="text-sm text-muted-foreground">Grupos de commodities</p>
                </CardContent>
              </Card>
            </div>

            {/* Component Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Distribución por Tipo de Componente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      Electronic (Semiconductores, sensores, ECUs)
                    </span>
                    <span className="font-medium">5,812 (38%)</span>
                  </div>
                  <Progress value={38} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      Mechanical (Transmisión, chasis, frenos)
                    </span>
                    <span className="font-medium">4,628 (30%)</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-500" />
                      Raw Material (Acero, aluminio, cobre)
                    </span>
                    <span className="font-medium">3,240 (21%)</span>
                  </div>
                  <Progress value={21} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      Chemical (Adhesivos, lubricantes, pinturas)
                    </span>
                    <span className="font-medium">1,743 (11%)</span>
                  </div>
                  <Progress value={11} className="h-2" />
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
                    <p className="text-muted-foreground">IHS Markit Data Hub</p>
                    <p className="text-sm text-muted-foreground">London, Reino Unido</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Certificaciones</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">ISO 27001</Badge>
                      <Badge variant="outline">SOC 2 Type II</Badge>
                      <Badge variant="outline">GDPR Compliant</Badge>
                      <Badge variant="outline">FCA Regulated</Badge>
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
                        <TableHead>Fecha</TableHead>
                        <TableHead>Categoría SKU</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Índice</TableHead>
                        <TableHead>MoM</TableHead>
                        <TableHead>YoY</TableHead>
                        <TableHead>Tensión</TableHead>
                        <TableHead>Tendencia</TableHead>
                        <TableHead>Confianza</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">{record.price_date}</TableCell>
                          <TableCell>{record.sku_category}</TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(record.component_type)}>
                              {record.component_type.replace("_", " ").toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-bold">{record.price_index}</TableCell>
                          <TableCell>
                            <span className={record.price_change_mom_pct >= 0 ? "text-red-500" : "text-green-500"}>
                              {record.price_change_mom_pct >= 0 ? "+" : ""}{record.price_change_mom_pct}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={record.price_change_yoy_pct >= 0 ? "text-red-500" : "text-green-500"}>
                              {record.price_change_yoy_pct >= 0 ? "+" : ""}{record.price_change_yoy_pct}%
                            </span>
                          </TableCell>
                          <TableCell className={getTensionColor(record.supply_tension_indicator)}>
                            {record.supply_tension_indicator}
                          </TableCell>
                          <TableCell className="flex items-center gap-1">
                            {getTrendIcon(record.forecast_trend)}
                            <span className="capitalize">{record.forecast_trend}</span>
                          </TableCell>
                          <TableCell>{record.confidence_level}%</TableCell>
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
{`interface ComponentPricingRecord {
  price_date: string;                // Fecha del índice (YYYY-MM-DD)
  sku_category: string;              // Categoría de SKU
  component_type: "electronic" | "mechanical" | "raw_material" | "chemical";
  commodity_group: string;           // Grupo de commodity
  price_index: number;               // Índice de precio (base 100)
  price_change_mom_pct: number;      // Cambio mes a mes (%)
  price_change_yoy_pct: number;      // Cambio año a año (%)
  volatility_index: number;          // Índice de volatilidad (0-100)
  supply_tension_indicator: string;  // Indicador de tensión de suministro
  regional_premium_pct: number;      // Prima regional (%)
  currency: string;                  // Moneda (EUR)
  forecast_trend: "rising" | "stable" | "falling";
  confidence_level: number;          // Nivel de confianza de la predicción
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
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
                        Análisis de costes internos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Negociación con proveedores
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Planificación presupuestaria
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Informes estratégicos internos
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
                        Reventa o sublicencia
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Publicación de índices
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Compartir con competidores
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
                      Norteamérica
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      LATAM
                    </Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      <XCircle className="h-3 w-3 mr-1" />
                      Asia-Pacífico
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

export default BenchmarkingPreciosDetail;
