import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Shield, Calendar, Database, Clock, Download, FileJson, 
  Building2, Globe, Lock, AlertTriangle, CheckCircle2, XCircle,
  Factory, TrendingUp, Users, FileCheck, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface SupplyChainResilienceRecord {
  assessment_date: string;
  supplier_id: string;
  supplier_tier: "tier_1" | "tier_2" | "tier_3";
  vda63_score: number;
  compliance_status: "compliant" | "partial" | "non_compliant";
  component_category: string;
  risk_index: number;
  delivery_reliability: number;
  quality_index: number;
  financial_stability: string;
  country_of_origin: string;
  last_audit_date: string;
  next_audit_due: string;
  critical_dependencies: number;
}

const sampleData: SupplyChainResilienceRecord[] = [
  {
    assessment_date: "2024-01-01",
    supplier_id: "SUP-DE-4521",
    supplier_tier: "tier_1",
    vda63_score: 92,
    compliance_status: "compliant",
    component_category: "Powertrain",
    risk_index: 15,
    delivery_reliability: 98.5,
    quality_index: 96,
    financial_stability: "A+",
    country_of_origin: "Germany",
    last_audit_date: "2023-11-15",
    next_audit_due: "2024-11-15",
    critical_dependencies: 2
  },
  {
    assessment_date: "2024-01-01",
    supplier_id: "SUP-CZ-8834",
    supplier_tier: "tier_2",
    vda63_score: 78,
    compliance_status: "partial",
    component_category: "Electronics",
    risk_index: 42,
    delivery_reliability: 91.2,
    quality_index: 85,
    financial_stability: "B+",
    country_of_origin: "Czech Republic",
    last_audit_date: "2023-09-20",
    next_audit_due: "2024-03-20",
    critical_dependencies: 5
  },
  {
    assessment_date: "2024-01-01",
    supplier_id: "SUP-PL-2219",
    supplier_tier: "tier_2",
    vda63_score: 85,
    compliance_status: "compliant",
    component_category: "Interior",
    risk_index: 28,
    delivery_reliability: 94.7,
    quality_index: 91,
    financial_stability: "A-",
    country_of_origin: "Poland",
    last_audit_date: "2023-10-05",
    next_audit_due: "2024-10-05",
    critical_dependencies: 3
  },
  {
    assessment_date: "2024-01-01",
    supplier_id: "SUP-RO-6652",
    supplier_tier: "tier_3",
    vda63_score: 65,
    compliance_status: "non_compliant",
    component_category: "Raw Materials",
    risk_index: 72,
    delivery_reliability: 82.3,
    quality_index: 74,
    financial_stability: "B-",
    country_of_origin: "Romania",
    last_audit_date: "2023-06-12",
    next_audit_due: "2024-01-12",
    critical_dependencies: 8
  },
  {
    assessment_date: "2024-01-01",
    supplier_id: "SUP-ES-3347",
    supplier_tier: "tier_1",
    vda63_score: 88,
    compliance_status: "compliant",
    component_category: "Chassis",
    risk_index: 22,
    delivery_reliability: 96.1,
    quality_index: 93,
    financial_stability: "A",
    country_of_origin: "Spain",
    last_audit_date: "2023-12-01",
    next_audit_due: "2024-12-01",
    critical_dependencies: 1
  }
];

const ResilienciaSupplyChainDetail: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "partial": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "non_compliant": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle2 className="h-4 w-4" />;
      case "partial": return <AlertTriangle className="h-4 w-4" />;
      case "non_compliant": return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "tier_1": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "tier_2": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "tier_3": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 25) return "text-green-400";
    if (risk <= 50) return "text-yellow-400";
    if (risk <= 75) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 text-slate-300 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <Shield className="h-3 w-3 mr-1" />
                  VDA 6.3 Certified
                </Badge>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  <Lock className="h-3 w-3 mr-1" />
                  Datos Sensibles
                </Badge>
              </div>

              <h1 className="text-3xl font-bold mb-3">
                Índice de Resiliencia de Cadena de Suministro Automotriz
              </h1>
              
              <p className="text-slate-300 text-lg mb-6">
                Dataset de evaluación de riesgos y compliance de +2.500 proveedores Tier 1-3 
                del sector automotriz alemán, con métricas VDA 6.3 actualizadas mensualmente.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  <span>VDA (Verband der Automobilindustrie)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-green-400" />
                  <span>Actualización: Mensual (día 1)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Database className="h-4 w-4 text-purple-400" />
                  <span>+2.500 proveedores</span>
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
                  <span className="text-4xl font-bold text-white">450€</span>
                  <span className="text-slate-300">/mes</span>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Acceso API completo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Exportación JSON + Excel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Alertas de riesgo en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Soporte técnico prioritario</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Solicitar Acceso
                </Button>
                <p className="text-xs text-center text-slate-400">
                  Requiere validación de membresía VDA
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
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Factory className="h-4 w-4" />
                    Proveedores Monitorizados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,547</div>
                  <p className="text-sm text-muted-foreground">Tier 1, 2 y 3 activos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Score VDA 6.3 Promedio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">84.2%</div>
                  <p className="text-sm text-muted-foreground">+2.1% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Proveedores en Riesgo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-500">127</div>
                  <p className="text-sm text-muted-foreground">Requieren acción inmediata</p>
                </CardContent>
              </Card>
            </div>

            {/* Distribution by Tier */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Distribución por Nivel de Proveedor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      Tier 1 (Proveedores directos)
                    </span>
                    <span className="font-medium">412 (16%)</span>
                  </div>
                  <Progress value={16} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      Tier 2 (Proveedores secundarios)
                    </span>
                    <span className="font-medium">891 (35%)</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      Tier 3 (Proveedores terciarios)
                    </span>
                    <span className="font-medium">1,244 (49%)</span>
                  </div>
                  <Progress value={49} className="h-2" />
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
                    <p className="text-muted-foreground">Deutsche Telekom T-Systems</p>
                    <p className="text-sm text-muted-foreground">Frankfurt, Alemania</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Certificaciones de Seguridad</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">ISO 27001</Badge>
                      <Badge variant="outline">SOC 2 Type II</Badge>
                      <Badge variant="outline">TISAX</Badge>
                      <Badge variant="outline">C5 Attestation</Badge>
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
                        <TableHead>ID Proveedor</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Score VDA 6.3</TableHead>
                        <TableHead>Compliance</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Índice Riesgo</TableHead>
                        <TableHead>Fiabilidad Entrega</TableHead>
                        <TableHead>País</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">{record.supplier_id}</TableCell>
                          <TableCell>
                            <Badge className={getTierColor(record.supplier_tier)}>
                              {record.supplier_tier.replace("_", " ").toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={record.vda63_score >= 80 ? "text-green-500" : record.vda63_score >= 60 ? "text-yellow-500" : "text-red-500"}>
                              {record.vda63_score}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getComplianceColor(record.compliance_status)}>
                              {getComplianceIcon(record.compliance_status)}
                              <span className="ml-1 capitalize">{record.compliance_status.replace("_", " ")}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>{record.component_category}</TableCell>
                          <TableCell>
                            <span className={getRiskColor(record.risk_index)}>
                              {record.risk_index}
                            </span>
                          </TableCell>
                          <TableCell>{record.delivery_reliability}%</TableCell>
                          <TableCell>{record.country_of_origin}</TableCell>
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
{`interface SupplyChainResilienceRecord {
  assessment_date: string;           // ISO 8601 (YYYY-MM-DD)
  supplier_id: string;               // ID único del proveedor
  supplier_tier: "tier_1" | "tier_2" | "tier_3";
  vda63_score: number;               // 0-100, puntuación VDA 6.3
  compliance_status: "compliant" | "partial" | "non_compliant";
  component_category: string;        // Categoría de componente
  risk_index: number;                // 0-100, índice de riesgo
  delivery_reliability: number;      // 0-100%, fiabilidad de entrega
  quality_index: number;             // 0-100, índice de calidad
  financial_stability: string;       // Rating crediticio (A+, A, B+, etc.)
  country_of_origin: string;         // País de origen
  last_audit_date: string;           // Fecha última auditoría
  next_audit_due: string;            // Próxima auditoría programada
  critical_dependencies: number;     // Nº de dependencias críticas
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
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
                        Análisis de riesgo de cadena de suministro
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Informes internos de compliance
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Integración con sistemas ERP
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Benchmarking de proveedores
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
                        Uso fuera de la UE + UK
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Compartir con terceros no autorizados
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
                      Reino Unido
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

export default ResilienciaSupplyChainDetail;
