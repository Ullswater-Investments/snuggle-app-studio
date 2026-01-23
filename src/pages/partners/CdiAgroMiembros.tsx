import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Wheat, 
  Shield, 
  Cloud,
  LogOut,
  Download,
  Receipt,
  Coins,
  TrendingUp,
  CheckCircle2,
  ArrowDown,
  Building2,
  Truck,
  Factory,
  Store,
  Calendar,
  Rocket,
  Target,
  Zap
} from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const CdiAgroMiembros = () => {
  const navigate = useNavigate();
  const { session, logout } = usePartnerAuth("cdi-agro");

  const handleLogout = () => {
    logout();
    navigate("/partners/cdi-agro");
  };

  const scrollToFinancial = () => {
    document.getElementById('financial-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mermaid diagram for architecture
  const architectureDiagram = `graph TD
    subgraph "Tu Infraestructura Soberana"
        A["🚜 Tu Cooperativa<br/>(Promotor)"] -->|Controla| B("Conector ProcureData")
        B -->|Guarda| C[("Tus Datos Seguros")]
    end
    
    subgraph "El Ecosistema Mercado"
        D["🚚 Logística"]
        E["🏦 Bancos/Seguros"]
        F["🏭 Clientes"]
    end

    B <-->|Intercambio Seguro<br/>y Auditado| D
    B <-->|Certificación<br/>Automática| E
    B <-->|Venta de Datos| F

    style A fill:#e6f4ea,stroke:#1e8e3e,stroke-width:2px
    style B fill:#ce93d8,stroke:#8e24aa,stroke-width:2px
    style C fill:#fff,stroke:#333,stroke-width:1px`;

  // Mermaid diagram for ecosystem
  const ecosystemDiagram = `graph TD
    center(("📡 NODO<br/>PROCUREDATA"))
    
    subgraph "Promotores Inversión"
        P1["🏢 Promotor 1<br/>(+15.300€)"] --- center
        P2["🏢 Promotor 2<br/>(+15.300€)"] --- center
        P3["🏢 Promotor 3<br/>(+15.300€)"] --- center
        P4["🏢 Promotor 4<br/>(+15.300€)"] --- center
    end
    
    subgraph "Usuarios Consumo"
        U1["🚛 Usuario 1<br/>(+9.000€)"] -.- center
        U2["🚜 Usuario 2<br/>(+9.000€)"] -.- center
        U3["🏭 Usuario 3<br/>(+9.000€)"] -.- center
        U4["🏪 Usuario 4<br/>(+9.000€)"] -.- center
    end

    style center fill:#2962ff,color:white,stroke:#000`;

  // Mermaid diagram for roadmap
  const roadmapDiagram = `gantt
    title Hoja de Ruta CDI Agro
    dateFormat YYYY-MM
    section Fase 1
    Firma Consorcio          :2025-02, 1M
    Solicitud Kit Digital    :2025-02, 2M
    section Fase 2
    Instalación Nodo         :2025-04, 3M
    Cobro Ayuda              :2025-06, 1M
    section Fase 3
    Conexión ERPs            :2025-07, 4M
    Primeros Ahorros         :2025-09, 3M
    section Fase 4
    Venta de Datos           :2026-01, 6M
    Autonomía Financiera     :2026-06, 6M`;

  const businessCases = [
    {
      icon: Receipt,
      title: "Ahorro Operativo",
      description: "Automatiza compras y certificaciones. Adiós al papeleo manual.",
      highlight: "-30% costes administrativos",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Coins,
      title: "Monetización Directa",
      description: "Vende 'Inteligencia de Mercado' agregada a aseguradoras y traders sin revelar tus secretos.",
      highlight: "Nuevo ingreso recurrente",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: TrendingUp,
      title: "Financiación Premium",
      description: "Usa tus datos verificados para obtener mejores créditos y vender Bonos de Carbono.",
      highlight: "Acceso a capital verde",
      color: "from-green-500 to-emerald-600"
    }
  ];

  const roadmapPhases = [
    {
      phase: 1,
      period: "Inmediato",
      title: "Firma y Solicitud",
      description: "Adhesión al consorcio y solicitud Kit Digital",
      icon: Calendar,
      color: "bg-blue-500"
    },
    {
      phase: 2,
      period: "Mes 3-6",
      title: "Despliegue + Cobro",
      description: "Instalación del nodo y recepción de la ayuda",
      icon: Rocket,
      color: "bg-purple-500"
    },
    {
      phase: 3,
      period: "Año 1",
      title: "Integración ERPs",
      description: "Conexión con sistemas de gestión, primeros ahorros",
      icon: Target,
      color: "bg-amber-500"
    },
    {
      phase: 4,
      period: "Año 2+",
      title: "Rentabilidad",
      description: "Venta de datos y autonomía financiera",
      icon: Zap,
      color: "bg-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-950 to-green-900">
      {/* Header */}
      <header className="border-b border-green-700/50 bg-green-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/partners")}
                className="text-green-300/70 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-lime-500 flex items-center justify-center">
                  <Wheat className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">CDI Agro - Portal de Miembros</h1>
                  <p className="text-xs text-green-300/70">Nodo PROCUREDATA · Sector Agroalimentario</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {session?.partner_name || "CDI Agro"}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-green-300/70 hover:text-white gap-2"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* SECTION 1: HERO */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30 text-sm px-4 py-1">
            Documentación Exclusiva · Kit Digital 2025
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Recupera el Valor de<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400">
              tus Datos Agrícolas
            </span>
          </h2>
          <p className="text-xl text-green-200/80 max-w-3xl mx-auto mb-8">
            Construye tu propia infraestructura soberana con ProcureData. 
            <span className="font-semibold text-green-400"> Coste Cero</span> gracias al Kit Digital. 
            <span className="font-semibold text-lime-400"> Beneficio neto desde el día 1.</span>
          </p>
          <Button 
            size="lg" 
            onClick={scrollToFinancial}
            className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-semibold px-8 py-6 text-lg"
          >
            Ver Estudio Económico
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </motion.section>

        {/* SECTION 2: PROBLEM VS SOLUTION */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">El modelo actual te quita dinero</h3>
            <p className="text-green-300/70">El modelo ProcureData te da control</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Problem Card */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gray-700/50 flex items-center justify-center">
                    <Cloud className="h-6 w-6 text-gray-400" />
                  </div>
                  <Badge variant="outline" className="text-red-400 border-red-500/50">
                    Pérdida de Control
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl">Modelo Split-X</CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Envías tus datos a plataformas extranjeras. Ellos los venden, tú pierdes el control.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 font-semibold text-center">
                    ❌ Eres un proveedor de datos gratis
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Solution Card */}
            <Card className="bg-gradient-to-br from-green-800 to-emerald-900 border-green-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-lime-500" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-green-600/30 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    Soberanía Total
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl">Modelo Gaia-X</CardTitle>
                <CardDescription className="text-green-200 text-base">
                  Tus datos se quedan en tu casa. Tú decides quién los ve y cobras por ello.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 font-semibold text-center">
                    ✅ Eres dueño de un activo digital
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* SECTION 3: ARCHITECTURE DIAGRAM */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Tu Infraestructura Soberana</h3>
            <p className="text-green-300/70">No es una base de datos gigante, es una red segura entre socios</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <MermaidDiagram 
              chart={architectureDiagram} 
              className="bg-green-800/30 border-green-700/50"
              mobileScale={0.55}
            />
          </div>
        </motion.section>

        {/* SECTION 4: BUSINESS CASE */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">¿Cómo Gano Dinero?</h3>
            <p className="text-green-300/70">Tres fuentes de valor inmediato para tu organización</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {businessCases.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-green-800/50 border-green-700/50 h-full hover:border-green-500/50 transition-all">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{item.title}</CardTitle>
                    <CardDescription className="text-green-300/70">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {item.highlight}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 5: FINANCIAL SCENARIO */}
        <motion.section 
          id="financial-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="scroll-mt-24"
        >
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
              Kit Digital · NextGenerationEU
            </Badge>
            <h3 className="text-3xl font-bold text-white mb-2">El Kit Digital te Paga a Ti</h3>
            <p className="text-green-200">Escenario financiero del Consorcio 4+4</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Promoter Card */}
            <Card className="bg-gradient-to-br from-blue-900 to-indigo-900 border-blue-500 overflow-hidden">
              <CardHeader className="border-b border-blue-500/30 bg-blue-950">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-blue-400" />
                  <CardTitle className="text-white">Empresa PROMOTORA</CardTitle>
                </div>
                <CardDescription className="text-blue-200">Líder del Consorcio</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <span className="text-blue-300">💰 Recibes Ayuda</span>
                  <span className="text-2xl font-bold text-blue-400">+30.000€</span>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-500/10 rounded-lg border border-gray-500/30">
                  <span className="text-gray-400">📉 Pagas Infraestructura</span>
                  <span className="text-xl font-semibold text-gray-400">-14.700€</span>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-lg border-2 border-green-500/50">
                  <span className="text-green-300 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    BENEFICIO NETO
                  </span>
                  <span className="text-3xl font-bold text-green-400">+15.300€</span>
                </div>
              </CardContent>
            </Card>

            {/* User Card */}
            <Card className="bg-gradient-to-br from-purple-900 to-violet-900 border-purple-500 overflow-hidden">
              <CardHeader className="border-b border-purple-500/30 bg-purple-950">
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-purple-400" />
                  <CardTitle className="text-white">Empresa USUARIA</CardTitle>
                </div>
                <CardDescription className="text-purple-200">Socio del Consorcio</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <span className="text-purple-300">💰 Recibes Ayuda</span>
                  <span className="text-2xl font-bold text-purple-400">+15.000€</span>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-500/10 rounded-lg border border-gray-500/30">
                  <span className="text-gray-400">📉 Pagas Conexión</span>
                  <span className="text-xl font-semibold text-gray-400">-6.000€</span>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-lg border-2 border-green-500/50">
                  <span className="text-green-300 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    BENEFICIO NETO
                  </span>
                  <span className="text-3xl font-bold text-green-400">+9.000€</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* SECTION 6: ECOSYSTEM STRUCTURE */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Formamos un Consorcio de 8 Empresas</h3>
            <p className="text-green-300/70">Modelo 4 Promotores + 4 Usuarios</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <MermaidDiagram 
              chart={ecosystemDiagram} 
              className="bg-green-800/30 border-green-700/50"
              mobileScale={0.5}
            />
          </div>
          
          <div className="text-center mt-8">
            <Card className="bg-gradient-to-r from-green-700 to-lime-700 border-green-500 inline-block">
              <CardContent className="py-6 px-10">
                <p className="text-green-100 mb-2">Beneficio TOTAL del Consorcio</p>
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400">
                  +97.200€
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* SECTION 7: ROADMAP */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Hoja de Ruta</h3>
            <p className="text-green-300/70">Tu camino hacia la rentabilidad autónoma</p>
          </div>
          
          {/* Horizontal Timeline for Desktop */}
          <div className="hidden md:flex justify-between items-start max-w-5xl mx-auto mb-8">
            {roadmapPhases.map((phase, index) => (
              <div key={phase.phase} className="flex-1 relative">
                {/* Connector Line */}
                {index < roadmapPhases.length - 1 && (
                  <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-green-500/50 to-green-500/20" />
                )}
                
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center mb-4 z-10 shadow-lg`}>
                    <phase.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="outline" className="mb-2 text-green-300 border-green-600">
                    {phase.period}
                  </Badge>
                  <h4 className="text-white font-semibold mb-1">{phase.title}</h4>
                  <p className="text-green-300/60 text-sm px-2">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Vertical Timeline for Mobile */}
          <div className="md:hidden space-y-4">
            {roadmapPhases.map((phase) => (
              <Card key={phase.phase} className="bg-green-800/50 border-green-700/50">
                <CardContent className="py-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center shrink-0`}>
                    <phase.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 text-green-300 border-green-600 text-xs">
                      {phase.period}
                    </Badge>
                    <h4 className="text-white font-semibold">{phase.title}</h4>
                    <p className="text-green-300/60 text-sm">{phase.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gantt Diagram */}
          <div className="max-w-4xl mx-auto mt-8">
            <MermaidDiagram 
              chart={roadmapDiagram} 
              className="bg-green-800/30 border-green-700/50"
              mobileScale={0.45}
            />
          </div>
        </motion.section>

        {/* SECTION 8: CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center py-12"
        >
          <Card className="bg-gradient-to-br from-green-700 to-emerald-800 border-green-500 max-w-3xl mx-auto">
            <CardContent className="py-10 px-6">
              <h3 className="text-3xl font-bold text-white mb-4">
                ¿Listo para Recuperar el Control?
              </h3>
              <p className="text-green-100 text-lg mb-8">
                Únete al consorcio CDI Agro y empieza a ganar desde el día 1
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-semibold"
                  onClick={() => navigate("/partners/cdi-agro/proyecto")}
                >
                  Contactar Ahora
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-300 hover:bg-green-500/20"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Descargar Propuesta PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      {/* Floating Download Button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button 
          size="lg"
          className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white shadow-xl shadow-green-900/50"
        >
          <Download className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Descargar Propuesta Económica</span>
          <span className="sm:hidden">PDF</span>
        </Button>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-green-700/50 mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-green-400/60">
            © 2025 CDI Agro · Cluster de Innovación Agroalimentaria · Nodo PROCUREDATA
          </p>
          <p className="text-xs text-green-500/40 mt-1">
            Financiado por el Plan de Recuperación, Transformación y Resiliencia · NextGenerationEU
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CdiAgroMiembros;
