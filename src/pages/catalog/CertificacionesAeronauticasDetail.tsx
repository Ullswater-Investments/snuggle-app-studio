import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Plane, Calendar, Database, Download, FileJson, 
  Building2, Globe, CheckCircle2, XCircle, Shield,
  BarChart3, Award, FileCheck, Users, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface AeroCertificationRecord {
  company_id: string;
  company_name: string;
  country: string;
  region: string;
  certification_type: "EN_9100" | "AS_9100D" | "NADCAP" | "ISO_14001" | "PART_21";
  certification_status: "active" | "suspended" | "expired" | "pending";
  issue_date: string;
  expiry_date: string;
  certification_body: string;
  scope_description: string;
  process_categories: string[];
  customer_approvals: string[];
  last_audit_result: "pass" | "minor_nc" | "major_nc";
  next_surveillance_date: string;
}

const sampleData: AeroCertificationRecord[] = [
  {
    company_id: "AERO-FR-001",
    company_name: "Toulouse Aerostructures SAS",
    country: "France",
    region: "Occitanie",
    certification_type: "EN_9100",
    certification_status: "active",
    issue_date: "2022-03-15",
    expiry_date: "2025-03-14",
    certification_body: "Bureau Veritas",
    scope_description: "Design and manufacture of composite aerostructures",
    process_categories: ["Composite Layup", "Autoclave Curing", "NDT"],
    customer_approvals: ["Airbus", "Dassault", "ATR"],
    last_audit_result: "pass",
    next_surveillance_date: "2024-09-15"
  },
  {
    company_id: "AERO-FR-023",
    company_name: "Bordeaux Precision Machining",
    country: "France",
    region: "Nouvelle-Aquitaine",
    certification_type: "NADCAP",
    certification_status: "active",
    issue_date: "2023-06-01",
    expiry_date: "2025-05-31",
    certification_body: "PRI (Performance Review Institute)",
    scope_description: "Precision machining of titanium and aluminum alloys",
    process_categories: ["CNC Machining", "Heat Treatment", "Surface Finishing"],
    customer_approvals: ["Safran", "Thales", "Liebherr"],
    last_audit_result: "minor_nc",
    next_surveillance_date: "2024-06-01"
  },
  {
    company_id: "AERO-ES-012",
    company_name: "Sevilla Aerospace Components",
    country: "Spain",
    region: "Andalucía",
    certification_type: "AS_9100D",
    certification_status: "active",
    issue_date: "2021-11-20",
    expiry_date: "2024-11-19",
    certification_body: "AENOR",
    scope_description: "Manufacturing of hydraulic and pneumatic components",
    process_categories: ["Assembly", "Testing", "Quality Control"],
    customer_approvals: ["Airbus", "CASA"],
    last_audit_result: "pass",
    next_surveillance_date: "2024-05-20"
  },
  {
    company_id: "AERO-DE-045",
    company_name: "Hamburg Avionics GmbH",
    country: "Germany",
    region: "Hamburg",
    certification_type: "PART_21",
    certification_status: "active",
    issue_date: "2020-08-10",
    expiry_date: "2025-08-09",
    certification_body: "EASA",
    scope_description: "Design and production of avionics systems",
    process_categories: ["Electronics Assembly", "Software Development", "Integration"],
    customer_approvals: ["Lufthansa Technik", "Airbus", "Collins"],
    last_audit_result: "pass",
    next_surveillance_date: "2024-08-10"
  },
  {
    company_id: "AERO-FR-089",
    company_name: "Lyon Surface Treatments",
    country: "France",
    region: "Auvergne-Rhône-Alpes",
    certification_type: "ISO_14001",
    certification_status: "suspended",
    issue_date: "2022-01-05",
    expiry_date: "2025-01-04",
    certification_body: "AFNOR",
    scope_description: "Anodizing and chemical treatments for aerospace parts",
    process_categories: ["Anodizing", "Passivation", "Plating"],
    customer_approvals: ["Safran", "Daher"],
    last_audit_result: "major_nc",
    next_surveillance_date: "2024-04-05"
  }
];

const CertificacionesAeronauticasDetail: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const getCertTypeColor = (type: string) => {
    switch (type) {
      case "EN_9100": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "AS_9100D": return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      case "NADCAP": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "ISO_14001": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "PART_21": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "suspended": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "expired": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAuditColor = (result: string) => {
    switch (result) {
      case "pass": return "text-green-500";
      case "minor_nc": return "text-yellow-500";
      case "major_nc": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 text-sky-200 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30">
                  <Shield className="h-3 w-3 mr-1" />
                  EN 9100 Verified
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <Award className="h-3 w-3 mr-1" />
                  NADCAP Accredited
                </Badge>
              </div>

              <h1 className="text-3xl font-bold mb-3">
                Directorio de Certificaciones Aeronáuticas EN/AS
              </h1>
              
              <p className="text-sky-100 text-lg mb-6">
                Base de datos verificada de +600 empresas certificadas del sector aeroespacial 
                europeo, con estados de certificación, auditorías y aprobaciones de clientes.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Building2 className="h-4 w-4 text-sky-400" />
                  <span>Aerospace Valley (Toulouse)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span>Actualización: Mensual (día 15)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Database className="h-4 w-4 text-indigo-400" />
                  <span>+600 empresas</span>
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
                  <span className="text-4xl font-bold text-white">390€</span>
                  <span className="text-sky-200">/mes</span>
                </div>
                <div className="space-y-2 text-sm text-sky-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Directorio completo de empresas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Estados de certificación en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Alertas de vencimiento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Exportación JSON-LD + PDF</span>
                  </div>
                </div>
                <Button className="w-full bg-sky-600 hover:bg-sky-700">
                  Solicitar Acceso
                </Button>
                <p className="text-xs text-center text-sky-300">
                  Requiere membresía Aerospace Valley
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
                    <Users className="h-4 w-4" />
                    Empresas Certificadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">623</div>
                  <p className="text-sm text-muted-foreground">Sector aeroespacial EU</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Certificaciones Activas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">1,847</div>
                  <p className="text-sm text-muted-foreground">En vigor actualmente</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Por Vencer (90d)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-500">84</div>
                  <p className="text-sm text-muted-foreground">Próximas 12 semanas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    Auditorías Pass
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-500">92%</div>
                  <p className="text-sm text-muted-foreground">Último año</p>
                </CardContent>
              </Card>
            </div>

            {/* Certification Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Distribución por Tipo de Certificación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      EN 9100 (Sistema de Gestión Aeroespacial)
                    </span>
                    <span className="font-medium">512 (28%)</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-500" />
                      AS 9100D (Equivalente USA)
                    </span>
                    <span className="font-medium">421 (23%)</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      NADCAP (Procesos Especiales)
                    </span>
                    <span className="font-medium">384 (21%)</span>
                  </div>
                  <Progress value={21} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      ISO 14001 (Medioambiente)
                    </span>
                    <span className="font-medium">312 (17%)</span>
                  </div>
                  <Progress value={17} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      PART 21 (EASA Production)
                    </span>
                    <span className="font-medium">218 (11%)</span>
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
                    <p className="text-muted-foreground">OVHcloud Sovereign</p>
                    <p className="text-sm text-muted-foreground">Toulouse, Francia</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Certificaciones del Sistema</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">SecNumCloud</Badge>
                      <Badge variant="outline">ISO 27001</Badge>
                      <Badge variant="outline">HDS (Health Data)</Badge>
                      <Badge variant="outline">GDPR Compliant</Badge>
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
                        <TableHead>ID</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>País</TableHead>
                        <TableHead>Certificación</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Validez</TableHead>
                        <TableHead>Auditoría</TableHead>
                        <TableHead>Clientes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">{record.company_id}</TableCell>
                          <TableCell className="max-w-32 truncate" title={record.company_name}>
                            {record.company_name}
                          </TableCell>
                          <TableCell>{record.country}</TableCell>
                          <TableCell>
                            <Badge className={getCertTypeColor(record.certification_type)}>
                              {record.certification_type.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(record.certification_status)}>
                              {record.certification_status.charAt(0).toUpperCase() + record.certification_status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{record.expiry_date}</TableCell>
                          <TableCell className={getAuditColor(record.last_audit_result)}>
                            {record.last_audit_result.replace("_", " ").toUpperCase()}
                          </TableCell>
                          <TableCell className="max-w-24 truncate" title={record.customer_approvals.join(", ")}>
                            {record.customer_approvals.slice(0, 2).join(", ")}
                            {record.customer_approvals.length > 2 && "..."}
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
{`interface AeroCertificationRecord {
  company_id: string;                // ID único de empresa
  company_name: string;              // Nombre de la empresa
  country: string;                   // País
  region: string;                    // Región
  certification_type: "EN_9100" | "AS_9100D" | "NADCAP" | "ISO_14001" | "PART_21";
  certification_status: "active" | "suspended" | "expired" | "pending";
  issue_date: string;                // Fecha de emisión
  expiry_date: string;               // Fecha de expiración
  certification_body: string;        // Organismo certificador
  scope_description: string;         // Alcance de la certificación
  process_categories: string[];      // Categorías de proceso
  customer_approvals: string[];      // Aprobaciones de clientes OEM
  last_audit_result: "pass" | "minor_nc" | "major_nc";
  next_surveillance_date: string;    // Próxima auditoría de vigilancia
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
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
                        Entrenamiento de modelos de IA
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Análisis de patrones de certificación
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Selección y cualificación de proveedores
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Informes de cumplimiento
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
                        Reventa o redistribución
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Publicación de estados individuales
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Uso para campañas comerciales
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
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      USA
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Canadá
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

export default CertificacionesAeronauticasDetail;
