import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Leaf, Calendar, Database, Download, FileJson, 
  Building2, Globe, CheckCircle2, XCircle, TrendingDown,
  Factory, BarChart3, Target, Zap, Wind
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface CarbonFootprintRecord {
  reporting_quarter: string;
  company_id: string;
  company_size: "sme" | "mid" | "large" | "enterprise";
  sector_segment: string;
  scope1_tco2e: number;
  scope2_tco2e: number;
  scope3_tco2e: number;
  total_emissions_tco2e: number;
  intensity_per_vehicle: number;
  reduction_target_pct: number;
  renewable_energy_pct: number;
  carbon_offset_tco2e: number;
  sbti_aligned: boolean;
  verification_status: string;
}

const sampleData: CarbonFootprintRecord[] = [
  {
    reporting_quarter: "2024-Q1",
    company_id: "AUTO-DE-001",
    company_size: "enterprise",
    sector_segment: "OEM",
    scope1_tco2e: 125000,
    scope2_tco2e: 89000,
    scope3_tco2e: 1450000,
    total_emissions_tco2e: 1664000,
    intensity_per_vehicle: 8.2,
    reduction_target_pct: 42,
    renewable_energy_pct: 68,
    carbon_offset_tco2e: 45000,
    sbti_aligned: true,
    verification_status: "Third-party verified"
  },
  {
    reporting_quarter: "2024-Q1",
    company_id: "AUTO-DE-045",
    company_size: "large",
    sector_segment: "Tier 1 Supplier",
    scope1_tco2e: 18500,
    scope2_tco2e: 12300,
    scope3_tco2e: 156000,
    total_emissions_tco2e: 186800,
    intensity_per_vehicle: 2.1,
    reduction_target_pct: 35,
    renewable_energy_pct: 52,
    carbon_offset_tco2e: 8000,
    sbti_aligned: true,
    verification_status: "Third-party verified"
  },
  {
    reporting_quarter: "2024-Q1",
    company_id: "AUTO-DE-128",
    company_size: "mid",
    sector_segment: "Electronics",
    scope1_tco2e: 4200,
    scope2_tco2e: 6800,
    scope3_tco2e: 42000,
    total_emissions_tco2e: 53000,
    intensity_per_vehicle: 0.8,
    reduction_target_pct: 28,
    renewable_energy_pct: 41,
    carbon_offset_tco2e: 2500,
    sbti_aligned: false,
    verification_status: "Self-reported"
  },
  {
    reporting_quarter: "2024-Q1",
    company_id: "AUTO-DE-256",
    company_size: "sme",
    sector_segment: "Raw Materials",
    scope1_tco2e: 8900,
    scope2_tco2e: 3200,
    scope3_tco2e: 28000,
    total_emissions_tco2e: 40100,
    intensity_per_vehicle: 1.2,
    reduction_target_pct: 20,
    renewable_energy_pct: 25,
    carbon_offset_tco2e: 0,
    sbti_aligned: false,
    verification_status: "Pending verification"
  },
  {
    reporting_quarter: "2024-Q1",
    company_id: "AUTO-DE-312",
    company_size: "large",
    sector_segment: "Battery",
    scope1_tco2e: 32000,
    scope2_tco2e: 48000,
    scope3_tco2e: 280000,
    total_emissions_tco2e: 360000,
    intensity_per_vehicle: 4.5,
    reduction_target_pct: 55,
    renewable_energy_pct: 78,
    carbon_offset_tco2e: 25000,
    sbti_aligned: true,
    verification_status: "Third-party verified"
  }
];

const HuellaCarbonAutomotrizDetail: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const getSizeColor = (size: string) => {
    switch (size) {
      case "enterprise": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "large": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "mid": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "sme": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE').format(num);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 text-green-200 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Leaf className="h-3 w-3 mr-1" />
                  GHG Protocol Verified
                </Badge>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  <Target className="h-3 w-3 mr-1" />
                  ESG Certified
                </Badge>
              </div>

              <h1 className="text-3xl font-bold mb-3">
                Huella de Carbono Agregada de Industria Automotriz Alemana
              </h1>
              
              <p className="text-green-100 text-lg mb-6">
                Dataset ESG con emisiones Scope 1, 2 y 3 de +1.800 empresas del sector automotriz 
                alemán, siguiendo el protocolo GHG y alineado con Science Based Targets.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Building2 className="h-4 w-4 text-green-400" />
                  <span>VDA (Verband der Automobilindustrie)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  <span>Actualización: Trimestral (Q1-Q4)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Database className="h-4 w-4 text-teal-400" />
                  <span>+1.800 empresas</span>
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
                  <span className="text-4xl font-bold text-white">380€</span>
                  <span className="text-green-200">/mes</span>
                </div>
                <div className="space-y-2 text-sm text-green-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Datos Scope 1, 2 y 3 completos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Exportación CSV + Parquet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Compatible con AI Training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Dashboard ESG incluido</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Solicitar Acceso
                </Button>
                <p className="text-xs text-center text-green-300">
                  Incluye verificación GHG Protocol
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
                    Empresas Reportando
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,847</div>
                  <p className="text-sm text-muted-foreground">Sector automotriz alemán</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" />
                    Reducción Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">-12.4%</div>
                  <p className="text-sm text-muted-foreground">vs año anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Energía Renovable
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-500">54%</div>
                  <p className="text-sm text-muted-foreground">Media del sector</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    SBTi Alineados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-500">682</div>
                  <p className="text-sm text-muted-foreground">37% del total</p>
                </CardContent>
              </Card>
            </div>

            {/* Emissions Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Desglose de Emisiones por Scope (Q1 2024)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      Scope 1 (Emisiones directas)
                    </span>
                    <span className="font-medium">2.4M tCO2e (8%)</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      Scope 2 (Electricidad comprada)
                    </span>
                    <span className="font-medium">4.1M tCO2e (14%)</span>
                  </div>
                  <Progress value={14} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      Scope 3 (Cadena de valor)
                    </span>
                    <span className="font-medium">23.5M tCO2e (78%)</span>
                  </div>
                  <Progress value={78} className="h-2" />
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
                    <p className="text-muted-foreground">SAP Sustainability Cloud</p>
                    <p className="text-sm text-muted-foreground">Walldorf, Alemania</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Certificaciones</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">GHG Protocol</Badge>
                      <Badge variant="outline">ISO 14064</Badge>
                      <Badge variant="outline">CDP Verified</Badge>
                      <Badge variant="outline">SBTi Partner</Badge>
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
                        <TableHead>Trimestre</TableHead>
                        <TableHead>ID Empresa</TableHead>
                        <TableHead>Tamaño</TableHead>
                        <TableHead>Segmento</TableHead>
                        <TableHead>Scope 1</TableHead>
                        <TableHead>Scope 2</TableHead>
                        <TableHead>Scope 3</TableHead>
                        <TableHead>% Renovable</TableHead>
                        <TableHead>SBTi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">{record.reporting_quarter}</TableCell>
                          <TableCell className="font-mono text-sm">{record.company_id}</TableCell>
                          <TableCell>
                            <Badge className={getSizeColor(record.company_size)}>
                              {record.company_size.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{record.sector_segment}</TableCell>
                          <TableCell>{formatNumber(record.scope1_tco2e)}</TableCell>
                          <TableCell>{formatNumber(record.scope2_tco2e)}</TableCell>
                          <TableCell>{formatNumber(record.scope3_tco2e)}</TableCell>
                          <TableCell>
                            <span className={record.renewable_energy_pct >= 50 ? "text-green-500" : "text-orange-500"}>
                              {record.renewable_energy_pct}%
                            </span>
                          </TableCell>
                          <TableCell>
                            {record.sbti_aligned ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-muted-foreground" />
                            )}
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
{`interface CarbonFootprintRecord {
  reporting_quarter: string;         // Formato: YYYY-QN
  company_id: string;                // ID anonimizado de empresa
  company_size: "sme" | "mid" | "large" | "enterprise";
  sector_segment: string;            // Segmento del sector automotriz
  scope1_tco2e: number;              // Emisiones directas (tCO2e)
  scope2_tco2e: number;              // Electricidad comprada (tCO2e)
  scope3_tco2e: number;              // Cadena de valor (tCO2e)
  total_emissions_tco2e: number;     // Total emisiones
  intensity_per_vehicle: number;     // tCO2e por vehículo producido
  reduction_target_pct: number;      // Objetivo de reducción (%)
  renewable_energy_pct: number;      // % energía renovable
  carbon_offset_tco2e: number;       // Compensaciones de carbono
  sbti_aligned: boolean;             // Alineado con Science Based Targets
  verification_status: string;       // Estado de verificación
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="h-5 w-5" />
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
                        Entrenamiento de modelos de IA predictiva
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Análisis de tendencias climáticas
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Informes ESG corporativos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Benchmarking de sostenibilidad
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
                        Reventa o redistribución comercial
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Uso fuera de la Unión Europea
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Identificación de empresas individuales
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

export default HuellaCarbonAutomotrizDetail;
