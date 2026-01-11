import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Database, 
  Shield, 
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building,
  Download,
  Cpu,
  Award,
  ClipboardCheck,
  FileCheck,
  Globe2,
  Calendar,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Data interfaces
interface SemiconductorCertification {
  company_id: string;
  company_name: string;
  headquarters_country: string;
  eu_facility_location: string;
  company_type: "fab" | "fabless" | "idm" | "foundry" | "osat" | "equipment";
  process_nodes: string[];
  iso_14644_class: string;
  iso_14644_valid_until: string;
  iatf_16949_certified: boolean;
  iatf_valid_until: string | null;
  jedec_member: boolean;
  jedec_standards: string[];
  aec_q100_qualified: boolean;
  reach_compliant: boolean;
  rohs_compliant: boolean;
  conflict_minerals_certified: boolean;
  last_audit_date: string;
  audit_score: number;
  non_conformities_open: number;
  employees_eu: number;
}

const CERTIFICATION_SAMPLE: SemiconductorCertification[] = [
  {
    company_id: "ASML-NL-001",
    company_name: "ASML Holding N.V.",
    headquarters_country: "Netherlands",
    eu_facility_location: "Veldhoven",
    company_type: "equipment",
    process_nodes: ["EUV", "DUV", "Metrology"],
    iso_14644_class: "ISO 3",
    iso_14644_valid_until: "2027-03-15",
    iatf_16949_certified: true,
    iatf_valid_until: "2026-09-30",
    jedec_member: true,
    jedec_standards: ["JESD22", "JESD51", "JESD79"],
    aec_q100_qualified: true,
    reach_compliant: true,
    rohs_compliant: true,
    conflict_minerals_certified: true,
    last_audit_date: "2025-11-15",
    audit_score: 98,
    non_conformities_open: 0,
    employees_eu: 28500
  },
  {
    company_id: "NXP-NL-002",
    company_name: "NXP Semiconductors",
    headquarters_country: "Netherlands",
    eu_facility_location: "Eindhoven",
    company_type: "idm",
    process_nodes: ["14nm", "28nm", "40nm", "55nm"],
    iso_14644_class: "ISO 4",
    iso_14644_valid_until: "2026-12-01",
    iatf_16949_certified: true,
    iatf_valid_until: "2027-06-15",
    jedec_member: true,
    jedec_standards: ["JESD22", "JESD47", "JESD79", "JESD204"],
    aec_q100_qualified: true,
    reach_compliant: true,
    rohs_compliant: true,
    conflict_minerals_certified: true,
    last_audit_date: "2025-10-22",
    audit_score: 95,
    non_conformities_open: 2,
    employees_eu: 12800
  },
  {
    company_id: "INF-DE-003",
    company_name: "Infineon Technologies",
    headquarters_country: "Germany",
    eu_facility_location: "Dresden",
    company_type: "idm",
    process_nodes: ["12nm", "28nm", "40nm", "90nm"],
    iso_14644_class: "ISO 4",
    iso_14644_valid_until: "2027-01-30",
    iatf_16949_certified: true,
    iatf_valid_until: "2026-11-20",
    jedec_member: true,
    jedec_standards: ["JESD22", "JESD47", "JESD51"],
    aec_q100_qualified: true,
    reach_compliant: true,
    rohs_compliant: true,
    conflict_minerals_certified: true,
    last_audit_date: "2025-09-18",
    audit_score: 96,
    non_conformities_open: 1,
    employees_eu: 18200
  },
  {
    company_id: "STM-FR-004",
    company_name: "STMicroelectronics",
    headquarters_country: "Switzerland",
    eu_facility_location: "Grenoble, Crolles",
    company_type: "idm",
    process_nodes: ["18nm", "28nm", "40nm", "65nm"],
    iso_14644_class: "ISO 5",
    iso_14644_valid_until: "2026-08-15",
    iatf_16949_certified: true,
    iatf_valid_until: "2027-02-28",
    jedec_member: true,
    jedec_standards: ["JESD22", "JESD204B", "JESD79"],
    aec_q100_qualified: true,
    reach_compliant: true,
    rohs_compliant: true,
    conflict_minerals_certified: true,
    last_audit_date: "2025-12-05",
    audit_score: 94,
    non_conformities_open: 3,
    employees_eu: 22500
  }
];

const DATA_SCHEMA = [
  { field: "company_id", type: "string", description: "Identificador único de la empresa" },
  { field: "company_name", type: "string", description: "Nombre comercial de la empresa" },
  { field: "headquarters_country", type: "string", description: "País de la sede central" },
  { field: "eu_facility_location", type: "string", description: "Ubicación de instalaciones en la UE" },
  { field: "company_type", type: "enum", description: "Tipo: fab, fabless, idm, foundry, osat, equipment" },
  { field: "process_nodes", type: "array[string]", description: "Nodos de proceso soportados" },
  { field: "iso_14644_class", type: "string", description: "Clasificación de sala limpia ISO 14644" },
  { field: "iso_14644_valid_until", type: "date", description: "Fecha de vencimiento certificación ISO 14644" },
  { field: "iatf_16949_certified", type: "boolean", description: "Certificación IATF 16949 (automoción)" },
  { field: "iatf_valid_until", type: "date|null", description: "Fecha vencimiento IATF 16949" },
  { field: "jedec_member", type: "boolean", description: "Miembro de JEDEC Solid State Technology" },
  { field: "jedec_standards", type: "array[string]", description: "Estándares JEDEC implementados" },
  { field: "aec_q100_qualified", type: "boolean", description: "Calificación AEC-Q100 (automoción)" },
  { field: "reach_compliant", type: "boolean", description: "Cumplimiento REACH" },
  { field: "rohs_compliant", type: "boolean", description: "Cumplimiento RoHS" },
  { field: "conflict_minerals_certified", type: "boolean", description: "Certificación de minerales sin conflicto" },
  { field: "last_audit_date", type: "date", description: "Fecha de última auditoría" },
  { field: "audit_score", type: "integer", description: "Puntuación de auditoría (0-100)" },
  { field: "non_conformities_open", type: "integer", description: "No conformidades abiertas" },
  { field: "employees_eu", type: "integer", description: "Empleados en la UE" }
];

export default function CertificacionesSemiconductoresDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");

  const getCompanyTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      fab: "Fabricante (FAB)",
      fabless: "Fabless",
      idm: "IDM",
      foundry: "Foundry",
      osat: "OSAT",
      equipment: "Equipamiento"
    };
    return labels[type] || type;
  };

  const getCompanyTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      fab: "bg-purple-100 text-purple-800",
      fabless: "bg-blue-100 text-blue-800",
      idm: "bg-green-100 text-green-800",
      foundry: "bg-orange-100 text-orange-800",
      osat: "bg-cyan-100 text-cyan-800",
      equipment: "bg-rose-100 text-rose-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/partners/premium')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Catálogo de Partners
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 overflow-hidden border-blue-200">
            <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs px-2">
                      🇳🇱 Brainport Eindhoven (NL)
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Compliance
                    </Badge>
                    <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                      <Award className="h-3 w-3 mr-1" />
                      ISO 14644 Certified
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      <Cpu className="h-3 w-3 mr-1" />
                      JEDEC Compliant
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">
                    Directorio de Certificaciones de Semiconductores
                  </CardTitle>
                  <CardDescription className="text-base max-w-2xl">
                    Estado de conformidad actualizado mensualmente del ecosistema europeo de semiconductores. 
                    Cubre más de 400 empresas con sus certificaciones ISO, IATF, JEDEC y compliance medioambiental.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 px-3 py-1">
                          <Shield className="h-4 w-4 mr-1" />
                          KYB Verificado
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Datos verificados por ASML Digital Compliance Hub</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Hero Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <div className="text-3xl font-bold text-blue-700">+400</div>
              <div className="text-sm text-muted-foreground">Empresas Certificadas</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
              <div className="text-3xl font-bold text-indigo-700">6</div>
              <div className="text-sm text-muted-foreground">Tipos de Empresa</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
              <div className="text-3xl font-bold text-purple-700">Mensual</div>
              <div className="text-sm text-muted-foreground">Actualización</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-100">
              <div className="text-3xl font-bold text-cyan-700">JSON + PDF</div>
              <div className="text-sm text-muted-foreground">Formatos</div>
            </Card>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="schema">Estructura</TabsTrigger>
                <TabsTrigger value="sample">Muestra</TabsTrigger>
                <TabsTrigger value="rights">Derechos</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Descripción del Dataset
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      El <strong>Directorio de Certificaciones de Semiconductores</strong> es la fuente más completa 
                      de información sobre el estado de conformidad del ecosistema europeo de semiconductores. 
                      Mantenido por ASML Digital Compliance Hub desde Veldhoven, Países Bajos.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <ClipboardCheck className="h-4 w-4 text-blue-600" />
                          Certificaciones Cubiertas
                        </h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• ISO 14644 (Salas Limpias)</li>
                          <li>• IATF 16949 (Automoción)</li>
                          <li>• JEDEC Standards</li>
                          <li>• AEC-Q100 (Automotive Electronics)</li>
                          <li>• REACH & RoHS Compliance</li>
                          <li>• Conflict Minerals Certification</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-indigo-600" />
                          Custodio de Datos
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>ASML Digital Compliance Hub</strong> - Veldhoven, Países Bajos
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Datos recopilados mediante acuerdos de colaboración con los principales 
                          fabricantes europeos de semiconductores y organismos de certificación.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 mt-4">
                      <h4 className="font-semibold mb-2">Casos de Uso Principales</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Due diligence de proveedores para OEMs automotrices
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Verificación de compliance para cadena de suministro
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Monitorización de vencimientos de certificaciones
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          Análisis de riesgos de conformidad regulatoria
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schema" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Estructura de Datos
                    </CardTitle>
                    <CardDescription>
                      Esquema del directorio de certificaciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[180px]">Campo</TableHead>
                            <TableHead className="w-[120px]">Tipo</TableHead>
                            <TableHead>Descripción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {DATA_SCHEMA.map((field) => (
                            <TableRow key={field.field}>
                              <TableCell className="font-mono text-sm">{field.field}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {field.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {field.description}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sample" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Muestra de Certificaciones
                    </CardTitle>
                    <CardDescription>
                      Empresas del ecosistema europeo de semiconductores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>ISO 14644</TableHead>
                            <TableHead>Audit Score</TableHead>
                            <TableHead>Certifications</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {CERTIFICATION_SAMPLE.map((record) => (
                            <TableRow key={record.company_id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-sm">{record.company_name}</div>
                                  <div className="text-xs text-muted-foreground">{record.eu_facility_location}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getCompanyTypeColor(record.company_type)}>
                                  {getCompanyTypeLabel(record.company_type)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm font-medium">{record.iso_14644_class}</div>
                                <div className="text-xs text-muted-foreground">
                                  Hasta: {record.iso_14644_valid_until}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <Progress value={record.audit_score} className="w-16 h-2" />
                                    <span className="text-sm font-medium">{record.audit_score}%</span>
                                  </div>
                                  {record.non_conformities_open > 0 && (
                                    <Badge variant="outline" className="text-xs text-amber-600 border-amber-200">
                                      {record.non_conformities_open} NC abiertas
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {record.iatf_16949_certified && (
                                    <Badge variant="outline" className="text-xs">IATF</Badge>
                                  )}
                                  {record.jedec_member && (
                                    <Badge variant="outline" className="text-xs">JEDEC</Badge>
                                  )}
                                  {record.aec_q100_qualified && (
                                    <Badge variant="outline" className="text-xs">AEC-Q100</Badge>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rights" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Derechos de Uso (ODRL)
                    </CardTitle>
                    <CardDescription>
                      Condiciones para datos regulatorios sensibles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-green-700 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Usos Permitidos
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Due diligence de proveedores
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Reportes internos de compliance
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Uso en EU + Taiwan + South Korea + Japan + USA
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Integración con sistemas de gestión de calidad
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-red-700 flex items-center gap-2">
                          <XCircle className="h-5 w-5" />
                          Usos Prohibidos
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Entrenamiento de modelos AI
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Reventa o redistribución
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Publicación de scores individuales
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500" />
                            Uso para ranking público
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold flex items-center gap-2 mb-2 text-blue-800">
                        <Globe2 className="h-5 w-5" />
                        Restricciones Geográficas
                      </h4>
                      <p className="text-sm text-blue-700">
                        Acceso permitido desde <strong>UE, Taiwan, Corea del Sur, Japón y Estados Unidos</strong>. 
                        Jurisdicciones adicionales requieren aprobación específica del Data Holder.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-blue-200 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl">Suscripción Compliance</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-blue-700">580€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Actualización mensual (día 5)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      +400 empresas certificadas
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      JSON API + certificados PDF
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Alertas de vencimiento
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Soporte en neerlandés/inglés
                    </li>
                  </ul>

                  <Separator />

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Solicitar Acceso
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Descargar Ficha Técnica
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Provider Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Proveedor de Datos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <Cpu className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">ASML Digital Compliance Hub</div>
                      <div className="text-sm text-muted-foreground">Veldhoven, Países Bajos</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo</span>
                      <span className="font-medium">Semiconductor Equipment</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Empresas</span>
                      <span className="font-medium">+400</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Desde</span>
                      <span className="font-medium">2018</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Update Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-semibold">Próxima Actualización</div>
                      <div className="text-2xl font-bold text-blue-700">5 Feb 2026</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Los datos de certificaciones se actualizan el día 5 de cada mes 
                    con información consolidada de auditorías del mes anterior.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
