import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ShieldCheck,
  Globe,
  Building2,
  Calendar,
  Database,
  FileJson,
  Download,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Users,
  Zap,
  Network
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

const OperadoresRedEnergeticaDetail = () => {
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
      operator_id: "TSO-DE-001",
      operator_name: "TenneT TSO GmbH",
      operator_type: "tso",
      grid_type: "extra_high_voltage",
      control_area: "tennet",
      voltage_levels: ["220kV", "380kV"],
      licensed_capacity_mw: 42000,
      renewable_integration_pct: 67.3,
      grid_km: 11850,
      cross_border_connections: 8,
      bundesnetzagentur_id: "BNA-TSO-001",
      isms_certified: true,
      unbundling_model: "ownership"
    },
    {
      operator_id: "DSO-DE-158",
      operator_name: "Stadtwerke München",
      operator_type: "dso",
      grid_type: "medium_voltage",
      control_area: "amprion",
      voltage_levels: ["10kV", "20kV", "110kV"],
      licensed_capacity_mw: 3800,
      renewable_integration_pct: 45.2,
      grid_km: 7200,
      cross_border_connections: 0,
      bundesnetzagentur_id: "BNA-DSO-158",
      isms_certified: true,
      unbundling_model: "legal"
    },
    {
      operator_id: "TSO-DE-003",
      operator_name: "50Hertz Transmission",
      operator_type: "tso",
      grid_type: "extra_high_voltage",
      control_area: "50hertz",
      voltage_levels: ["220kV", "380kV"],
      licensed_capacity_mw: 38500,
      renewable_integration_pct: 72.8,
      grid_km: 10400,
      cross_border_connections: 6,
      bundesnetzagentur_id: "BNA-TSO-003",
      isms_certified: true,
      unbundling_model: "ownership"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white">
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
                <Badge className="bg-blue-400/30 text-white border-blue-300/50">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Compliance
                </Badge>
                <Badge className="bg-amber-400/30 text-white border-amber-300/50">
                  <Network className="h-3 w-3 mr-1" />
                  Grid Operators
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Registro de Operadores de Red Energética
              </h1>

              <p className="text-lg text-blue-100 mb-6 max-w-2xl">
                Directorio verificado de operadores de redes de electricidad, gas y calor en Alemania. 
                Información regulatoria completa conforme a los requisitos de la Bundesnetzagentur.
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Globe className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-blue-200">Custodio</p>
                    <p className="font-semibold text-sm">BDEW Berlin</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-blue-200">Actualización</p>
                    <p className="font-semibold text-sm">Mensual (día 1)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Database className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-blue-200">Volumen</p>
                    <p className="font-semibold text-sm">+1.500 operadores</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="w-full lg:w-80 bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Suscripción</span>
                  <Badge className="bg-blue-500 text-white">Compliance</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold">390€</span>
                  <span className="text-blue-200">/mes</span>
                </div>
                <Separator className="bg-white/20" />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Directorio completo TSO/DSO
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Datos de licencias BNA
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Certificaciones ISMS
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Interconexiones transfronterizas
                  </li>
                </ul>
                <Button onClick={handleRequestAccess} className="w-full bg-white text-blue-700 hover:bg-blue-50">
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
                  <Network className="h-5 w-5 text-blue-600" />
                  Muestra de Datos - Operadores de Red
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Operador</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Zona Control</TableHead>
                        <TableHead>Capacidad MW</TableHead>
                        <TableHead>% Renovable</TableHead>
                        <TableHead>km Red</TableHead>
                        <TableHead>ISMS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((row) => (
                        <TableRow key={row.operator_id}>
                          <TableCell className="font-mono text-xs">{row.operator_id}</TableCell>
                          <TableCell className="font-medium">{row.operator_name}</TableCell>
                          <TableCell>
                            <Badge variant={row.operator_type === "tso" ? "default" : "secondary"}>
                              {row.operator_type.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{row.control_area}</TableCell>
                          <TableCell>{row.licensed_capacity_mw.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className={row.renewable_integration_pct > 60 ? "text-green-600 font-semibold" : ""}>
                              {row.renewable_integration_pct}%
                            </span>
                          </TableCell>
                          <TableCell>{row.grid_km.toLocaleString()}</TableCell>
                          <TableCell>
                            {row.isms_certified ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-sm text-muted-foreground">TSOs Alemanes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Building2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">+800</p>
                      <p className="text-sm text-muted-foreground">DSOs Registrados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Globe className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-sm text-muted-foreground">Interconexiones UE</p>
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
{`interface GridOperatorRecord {
  operator_id: string;
  operator_name: string;
  operator_type: "tso" | "dso" | "storage_operator" | "lds_operator";
  grid_type: "extra_high_voltage" | "high_voltage" | "medium_voltage" | "low_voltage" | "gas" | "heat";
  control_area: "tennet" | "amprion" | "transnetbw" | "50hertz" | null;
  voltage_levels: string[];
  licensed_capacity_mw: number;
  renewable_integration_pct: number;
  grid_km: number;
  cross_border_connections: number;
  bundesnetzagentur_id: string;
  isms_certified: boolean;
  unbundling_model: "ownership" | "legal" | "functional" | "accounting";
  contact_address: {
    street: string;
    city: string;
    postal_code: string;
    country: "DE";
  };
  license_valid_until: string;
  last_audit_date: string;
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
                        Análisis regulatorio interno
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Due diligence de proveedores
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Planificación de infraestructuras
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Reportes al regulador (BNA)
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
                        AI Training / Machine Learning
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Redistribución comercial
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Publicación de datos individuales
                      </li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Restricción Geográfica
                  </h4>
                  <p className="text-sm text-blue-700">
                    Uso limitado a entidades registradas en la UE + EFTA. Requisito de conformidad con regulación 
                    energética alemana (EnWG) y directivas REMIT.
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

export default OperadoresRedEnergeticaDetail;
