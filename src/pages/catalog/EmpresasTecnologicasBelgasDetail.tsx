import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ShieldCheck,
  Globe,
  Calendar,
  Database,
  FileJson,
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  Cpu,
  Bot,
  Settings
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

const EmpresasTecnologicasBelgasDetail = () => {
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
      company_id: "AGORIA-BE-2024-0158",
      company_name: "Melexis NV",
      vat_number: "BE0435604729",
      sector: "semiconductors",
      subsector: "automotive_sensors",
      headquarters: "Ieper",
      region: "West-Vlaanderen",
      employees: 1850,
      revenue_eur_m: 782,
      export_ratio_pct: 94.5,
      rd_investment_pct: 14.2,
      patents_count: 487,
      agoria_member_since: 1998,
      certifications: ["ISO 9001", "IATF 16949", "ISO 14001"]
    },
    {
      company_id: "AGORIA-BE-2024-0089",
      company_name: "Automation Partners BVBA",
      vat_number: "BE0875234561",
      sector: "automation",
      subsector: "industrial_robotics",
      headquarters: "Mechelen",
      region: "Antwerpen",
      employees: 245,
      revenue_eur_m: 48,
      export_ratio_pct: 72.3,
      rd_investment_pct: 8.5,
      patents_count: 12,
      agoria_member_since: 2012,
      certifications: ["ISO 9001", "ISO 27001"]
    },
    {
      company_id: "AGORIA-BE-2024-0267",
      company_name: "AI Solutions Brussels SA",
      vat_number: "BE0712345678",
      sector: "software",
      subsector: "artificial_intelligence",
      headquarters: "Brussels",
      region: "Brussels-Capital",
      employees: 85,
      revenue_eur_m: 12,
      export_ratio_pct: 45.0,
      rd_investment_pct: 28.5,
      patents_count: 3,
      agoria_member_since: 2019,
      certifications: ["ISO 27001", "SOC 2 Type II"]
    }
  ];

  const getSectorIcon = (sector: string) => {
    if (sector === "semiconductors") return <Cpu className="h-4 w-4 text-purple-500" />;
    if (sector === "automation") return <Settings className="h-4 w-4 text-orange-500" />;
    if (sector === "software") return <Bot className="h-4 w-4 text-blue-500" />;
    return <Building2 className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-zinc-700 text-white">
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
                  🇧🇪 Bélgica
                </Badge>
                <Badge className="bg-blue-400/30 text-white border-blue-300/50">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Compliance
                </Badge>
                <Badge className="bg-yellow-400/30 text-white border-yellow-300/50">
                  <Building2 className="h-3 w-3 mr-1" />
                  Tech Directory
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Directorio de Empresas Tecnológicas Belgas
              </h1>

              <p className="text-lg text-slate-300 mb-6 max-w-2xl">
                Registro verificado de empresas de tecnología industrial, robótica y automatización 
                en Bélgica. Directorio oficial de Agoria, la federación de la industria tecnológica belga.
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Globe className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-slate-400">Custodio</p>
                    <p className="font-semibold text-sm">Agoria Brussels</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-slate-400">Actualización</p>
                    <p className="font-semibold text-sm">Mensual (día 10)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Database className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-slate-400">Volumen</p>
                    <p className="font-semibold text-sm">+2.000 empresas</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="w-full lg:w-80 bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Suscripción</span>
                  <Badge className="bg-slate-500 text-white">Compliance</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold">340€</span>
                  <span className="text-slate-300">/mes</span>
                </div>
                <Separator className="bg-white/20" />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Directorio completo verificado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Datos de I+D y patentes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Certificaciones industriales
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    API de búsqueda avanzada
                  </li>
                </ul>
                <Button onClick={handleRequestAccess} className="w-full bg-white text-slate-800 hover:bg-slate-100">
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
                  <Building2 className="h-5 w-5 text-slate-600" />
                  Muestra de Datos - Empresas Tecnológicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Empresa</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead>Región</TableHead>
                        <TableHead>Empleados</TableHead>
                        <TableHead>Ingresos (M€)</TableHead>
                        <TableHead>% I+D</TableHead>
                        <TableHead>Patentes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((row) => (
                        <TableRow key={row.company_id}>
                          <TableCell className="font-mono text-xs">{row.company_id}</TableCell>
                          <TableCell className="font-medium">{row.company_name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSectorIcon(row.sector)}
                              <span className="text-xs capitalize">{row.sector}</span>
                            </div>
                          </TableCell>
                          <TableCell>{row.region}</TableCell>
                          <TableCell>{row.employees.toLocaleString()}</TableCell>
                          <TableCell>{row.revenue_eur_m}M€</TableCell>
                          <TableCell className="text-blue-600 font-semibold">{row.rd_investment_pct}%</TableCell>
                          <TableCell>{row.patents_count}</TableCell>
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
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Cpu className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">450+</p>
                      <p className="text-sm text-muted-foreground">Semiconductores</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Settings className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">680+</p>
                      <p className="text-sm text-muted-foreground">Automatización</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Bot className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">520+</p>
                      <p className="text-sm text-muted-foreground">AI/Software</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <ShieldCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">100%</p>
                      <p className="text-sm text-muted-foreground">Verificado</p>
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
{`interface BelgianTechCompanyRecord {
  company_id: string;
  company_name: string;
  vat_number: string;
  sector: "semiconductors" | "automation" | "software" | "telecom" 
    | "iot" | "cleantech" | "medtech" | "aerospace";
  subsector: string;
  headquarters: string;
  region: "West-Vlaanderen" | "Oost-Vlaanderen" | "Antwerpen" 
    | "Limburg" | "Vlaams-Brabant" | "Brussels-Capital" 
    | "Brabant-Wallon" | "Hainaut" | "Namur" | "Liège" | "Luxembourg";
  employees: number;
  revenue_eur_m: number;
  export_ratio_pct: number;
  rd_investment_pct: number;
  patents_count: number;
  agoria_member_since: number;
  certifications: string[];
  contact: {
    website: string;
    email: string;
    phone: string;
  };
  management: {
    ceo_name: string;
    cto_name: string | null;
  };
  financial_year_end: string;
  last_verified: string;
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
                        Due diligence de proveedores
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Análisis de mercado B2B
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Identificación de partners tecnológicos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Estudios sectoriales internos
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
                        Reventa de datos de contacto
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Marketing directo masivo
                      </li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className="bg-slate-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Cobertura Geográfica
                  </h4>
                  <p className="text-sm text-slate-700">
                    Uso permitido en la UE. El directorio Agoria es la fuente oficial de la industria 
                    tecnológica belga y cumple con los requisitos de datos del BCE (Banque-Carrefour des Entreprises).
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

export default EmpresasTecnologicasBelgasDetail;
