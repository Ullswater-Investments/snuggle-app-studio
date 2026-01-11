import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Leaf,
  Globe,
  Calendar,
  Database,
  FileJson,
  Clock,
  CheckCircle2,
  XCircle,
  Sun,
  Wind,
  Droplets,
  Flame,
  Atom
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

const MixEnergeticoAlemaniaDetail = () => {
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
      plant_id: "RE-DE-WIND-00158",
      plant_name: "Offshore Windpark Baltic 2",
      energy_source: "wind_offshore",
      installed_capacity_mw: 288,
      current_output_mw: 245.3,
      capacity_factor_pct: 85.2,
      federal_state: "Mecklenburg-Vorpommern",
      grid_connection: "50hertz",
      co2_avoided_tonnes: 156780,
      operational_since: "2015-09-01",
      renewable_certificate: "GO-DE-2024-001"
    },
    {
      plant_id: "RE-DE-SOLAR-02341",
      plant_name: "Solarpark Weesow-Willmersdorf",
      energy_source: "solar_pv",
      installed_capacity_mw: 187,
      current_output_mw: 142.8,
      capacity_factor_pct: 76.4,
      federal_state: "Brandenburg",
      grid_connection: "50hertz",
      co2_avoided_tonnes: 89450,
      operational_since: "2020-08-15",
      renewable_certificate: "GO-DE-2024-002"
    },
    {
      plant_id: "RE-DE-HYDRO-00087",
      plant_name: "Wasserkraftwerk Iffezheim",
      energy_source: "hydro_run_of_river",
      installed_capacity_mw: 148,
      current_output_mw: 132.5,
      capacity_factor_pct: 89.5,
      federal_state: "Baden-Württemberg",
      grid_connection: "transnetbw",
      co2_avoided_tonnes: 78920,
      operational_since: "1978-06-12",
      renewable_certificate: "GO-DE-2024-003"
    }
  ];

  const getSourceIcon = (source: string) => {
    if (source.includes("wind")) return <Wind className="h-4 w-4 text-blue-500" />;
    if (source.includes("solar")) return <Sun className="h-4 w-4 text-yellow-500" />;
    if (source.includes("hydro")) return <Droplets className="h-4 w-4 text-cyan-500" />;
    if (source.includes("biomass")) return <Flame className="h-4 w-4 text-orange-500" />;
    return <Atom className="h-4 w-4 text-purple-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
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
                <Badge className="bg-green-400/30 text-white border-green-300/50">
                  <Leaf className="h-3 w-3 mr-1" />
                  ESG
                </Badge>
                <Badge className="bg-emerald-400/30 text-white border-emerald-300/50">
                  <Sun className="h-3 w-3 mr-1" />
                  Energiewende
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Mix Energético y Renovables en Alemania
              </h1>

              <p className="text-lg text-green-100 mb-6 max-w-2xl">
                Datos de generación por fuente, capacidad instalada y proyección de renovables 
                en el sistema eléctrico alemán. Seguimiento diario de la transición energética (Energiewende).
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Globe className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-green-200">Custodio</p>
                    <p className="font-semibold text-sm">BDEW Renewables</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-green-200">Actualización</p>
                    <p className="font-semibold text-sm">Diaria (06:00 CET)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Database className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-green-200">Volumen</p>
                    <p className="font-semibold text-sm">+50.000 plantas</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="w-full lg:w-80 bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Suscripción</span>
                  <Badge className="bg-green-500 text-white">ESG</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold">350€</span>
                  <span className="text-green-200">/mes</span>
                </div>
                <Separator className="bg-white/20" />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Todas las fuentes renovables
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Proyecciones de capacidad
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Certificados de origen (GO)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    CO2 evitado por planta
                  </li>
                </ul>
                <Button onClick={handleRequestAccess} className="w-full bg-white text-green-700 hover:bg-green-50">
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
                  <Leaf className="h-5 w-5 text-green-600" />
                  Muestra de Datos - Plantas Renovables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Planta</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Fuente</TableHead>
                        <TableHead>Capacidad MW</TableHead>
                        <TableHead>Output MW</TableHead>
                        <TableHead>Factor %</TableHead>
                        <TableHead>CO2 Evitado (t)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((row) => (
                        <TableRow key={row.plant_id}>
                          <TableCell className="font-mono text-xs">{row.plant_id}</TableCell>
                          <TableCell className="font-medium">{row.plant_name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSourceIcon(row.energy_source)}
                              <span className="text-xs">{row.energy_source.replace(/_/g, " ")}</span>
                            </div>
                          </TableCell>
                          <TableCell>{row.installed_capacity_mw}</TableCell>
                          <TableCell className="text-green-600 font-semibold">{row.current_output_mw}</TableCell>
                          <TableCell>{row.capacity_factor_pct}%</TableCell>
                          <TableCell>{row.co2_avoided_tonnes.toLocaleString()}</TableCell>
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
                      <Wind className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">65 GW</p>
                      <p className="text-sm text-muted-foreground">Eólica Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Sun className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">82 GW</p>
                      <p className="text-sm text-muted-foreground">Solar FV</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-cyan-100 rounded-lg">
                      <Droplets className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">5.6 GW</p>
                      <p className="text-sm text-muted-foreground">Hidráulica</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">52%</p>
                      <p className="text-sm text-muted-foreground">% Renovable 2024</p>
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
{`interface RenewablePlantRecord {
  plant_id: string;
  plant_name: string;
  energy_source: "wind_onshore" | "wind_offshore" | "solar_pv" | "solar_thermal" 
    | "hydro_run_of_river" | "hydro_pumped" | "biomass" | "biogas" | "geothermal";
  installed_capacity_mw: number;
  current_output_mw: number;
  capacity_factor_pct: number;
  federal_state: string;
  grid_connection: "tennet" | "amprion" | "transnetbw" | "50hertz";
  co2_avoided_tonnes: number;
  operational_since: string;
  renewable_certificate: string;
  location: {
    latitude: number;
    longitude: number;
  };
  manufacturer: string;
  expected_annual_generation_gwh: number;
  subsidies_kwh_ct: number;
  ppa_status: "none" | "active" | "negotiating";
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
                        Reportes ESG y sostenibilidad
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Análisis de transición energética
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Planificación de inversiones verdes
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        AI Training para modelos de predicción
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
                        Redistribución comercial sin licencia
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Trading algorítmico directo
                      </li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Cobertura Geográfica
                  </h4>
                  <p className="text-sm text-green-700">
                    Uso permitido en la UE y países con acuerdos de reconocimiento de Garantías de Origen (GO). 
                    Compatible con taxonomía UE y estándares GRI para reporting.
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

export default MixEnergeticoAlemaniaDetail;
