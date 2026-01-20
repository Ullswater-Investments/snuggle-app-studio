import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Database, 
  Shield, 
  Wallet, 
  FileCheck, 
  Target, 
  Calendar,
  TrendingUp,
  Download,
  ExternalLink,
  Coins,
  Users,
  CheckCircle2,
  Clock,
  BarChart3,
  Layers
} from "lucide-react";
import { Link } from "react-router-dom";

const ValerdataMiembros = () => {
  const [activeTab, setActiveTab] = useState("resumen");

  const phases = [
    { name: "Onboarding", start: "21/07/2025", end: "04/08/2025", status: "pending", progress: 0 },
    { name: "Preparación", start: "05/08/2025", end: "08/09/2025", status: "pending", progress: 0 },
    { name: "Integración", start: "09/09/2025", end: "13/10/2025", status: "pending", progress: 0 },
    { name: "Validación", start: "14/10/2025", end: "11/11/2025", status: "pending", progress: 0 },
  ];

  const kpis = [
    { label: "Datasets Contratados", value: "3+", icon: Database, color: "text-blue-600" },
    { label: "Presupuesto Aprobado", value: "15.000€", icon: Coins, color: "text-emerald-600" },
    { label: "Duración Proyecto", value: "4 meses", icon: Calendar, color: "text-purple-600" },
    { label: "Financiación", value: "100%", icon: TrendingUp, color: "text-amber-600" },
  ];

  const datasets = [
    { name: "Precios Industriales B2B", provider: "DataHub Industrial", type: "Histórico + Streaming" },
    { name: "Índices de Materias Primas", provider: "Commodity Exchange", type: "Tiempo Real" },
    { name: "Benchmarking Sectorial", provider: "Industry Analytics", type: "Trimestral" },
  ];

  const complianceItems = [
    { standard: "Gaia-X", status: "verified", description: "Federación de datos europea" },
    { standard: "GDPR", status: "verified", description: "Protección de datos personales" },
    { standard: "ODRL v2.2", status: "verified", description: "Políticas de uso de datos" },
    { standard: "FAIR/DCAT-AP", status: "verified", description: "Interoperabilidad de metadatos" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/partners">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">VALERDATA</h1>
                <p className="text-sm text-muted-foreground">Memoria de Ejecución PROCUREDATA</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              Consumer
            </Badge>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
              Kit Espacios de Datos
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Proyecto PROCUREDATA
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ingesta de 3+ datasets industriales para entrenar modelos de IA de predicción de precios, 
            financiado por el Kit Espacios de Datos (NextGenerationEU).
          </p>
        </motion.section>

        {/* KPIs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <kpi.icon className={`h-8 w-8 mx-auto mb-2 ${kpi.color}`} />
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="text-sm text-muted-foreground">{kpi.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Objetivo Estratégico */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Objetivo Estratégico
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    VALERDATA S.L. actúa como <strong>Consumer</strong> en el ecosistema PROCUREDATA, 
                    adquiriendo datasets industriales para potenciar sus modelos de IA de predicción de precios.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-1" />
                      <span>Ingesta de 3+ datasets industriales certificados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-1" />
                      <span>Entrenamiento de modelos de IA predictivos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-1" />
                      <span>Validación de calidad y trazabilidad Gaia-X</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Infraestructura Web3 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-purple-600" />
                    Infraestructura Web3
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium">DID Soberano</span>
                      <code className="text-xs bg-slate-200 px-2 py-1 rounded">did:ethr:valerdat</code>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium">Moneda de Pago</span>
                      <Badge variant="outline">EUROe (Stablecoin €)</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium">Trazabilidad</span>
                      <Badge variant="outline">Pontus-X Blockchain</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Presupuesto */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-emerald-600" />
                  Presupuesto y Financiación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-emerald-50 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-700">15.000€</div>
                    <div className="text-sm text-muted-foreground">Presupuesto Total</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-700">100%</div>
                    <div className="text-sm text-muted-foreground">Financiación Pública</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-3xl font-bold text-purple-700">NextGenEU</div>
                    <div className="text-sm text-muted-foreground">Programa de Fondos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="datasets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  Datasets Contratados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {datasets.map((dataset, index) => (
                    <motion.div
                      key={dataset.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Layers className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{dataset.name}</div>
                          <div className="text-sm text-muted-foreground">{dataset.provider}</div>
                        </div>
                      </div>
                      <Badge variant="outline">{dataset.type}</Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cronograma" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Cronograma de Ejecución
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {phases.map((phase, index) => (
                    <motion.div
                      key={phase.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{phase.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {phase.start} - {phase.end}
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 rounded-full transition-all"
                              style={{ width: `${phase.progress}%` }}
                            />
                          </div>
                        </div>
                        <Badge variant={phase.status === "completed" ? "default" : "secondary"}>
                          {phase.status === "completed" ? "Completado" : "Pendiente"}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Periodo de Ejecución: 21/07/2025 - 11/11/2025 (4 meses)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  Cumplimiento Normativo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {complianceItems.map((item, index) => (
                    <motion.div
                      key={item.standard}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 border rounded-lg bg-emerald-50/50"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium">{item.standard}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Descargar Memoria PDF
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link to="/catalog">
              <ExternalLink className="h-5 w-5" />
              Explorar Catálogo
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" 
              alt="EU Flag" 
              className="h-6"
            />
            <span className="text-sm">Financiado por NextGenerationEU</span>
          </div>
          <p className="text-sm text-slate-400">
            Kit Espacios de Datos · PROCUREDATA · VALERDATA S.L.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ValerdataMiembros;
