import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Wheat, 
  Tractor, 
  Cloud, 
  Shield, 
  Calendar,
  Building2,
  Lightbulb,
  BarChart3,
  Map,
  LogOut,
  ExternalLink,
  BookOpen,
  Layers,
  Leaf,
  Droplets,
  Sun
} from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";

const CdiAgroMiembros = () => {
  const navigate = useNavigate();
  const { session, logout } = usePartnerAuth("cdi-agro");

  const handleLogout = () => {
    logout();
    navigate("/partners/cdi-agro");
  };

  const useCases = [
    {
      id: "trazabilidad",
      title: "Trazabilidad del Campo a la Mesa",
      description: "Seguimiento completo del origen y procesado de productos agrícolas",
      icon: Leaf,
      color: "from-green-500 to-emerald-600",
      badge: "Trazabilidad"
    },
    {
      id: "optimizacion",
      title: "Optimización de Cosechas",
      description: "Predicciones y análisis de rendimiento basados en datos satelitales y IoT",
      icon: Tractor,
      color: "from-amber-500 to-orange-600",
      badge: "Producción"
    },
    {
      id: "riego",
      title: "Gestión Inteligente de Riego",
      description: "Reducción del consumo hídrico mediante sensores y algoritmos predictivos",
      icon: Droplets,
      color: "from-blue-500 to-cyan-600",
      badge: "Sostenibilidad"
    },
    {
      id: "clima",
      title: "Alertas Meteorológicas",
      description: "Predicciones climáticas localizadas para protección de cultivos",
      icon: Cloud,
      color: "from-slate-500 to-zinc-600",
      badge: "Prevención"
    },
    {
      id: "energia",
      title: "Eficiencia Energética Rural",
      description: "Monitorización y optimización del consumo en explotaciones",
      icon: Sun,
      color: "from-yellow-500 to-amber-600",
      badge: "Energía"
    },
    {
      id: "mercados",
      title: "Inteligencia de Mercados",
      description: "Precios en tiempo real y tendencias de commodities agrícolas",
      icon: BarChart3,
      color: "from-purple-500 to-violet-600",
      badge: "Mercado"
    }
  ];

  const stats = [
    { label: "+200", value: "Explotaciones", icon: Tractor },
    { label: "+50", value: "Cooperativas", icon: Building2 },
    { label: "5M", value: "Ha monitorizadas", icon: Map },
    { label: "Gaia-X", value: "Ready", icon: Shield }
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

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
            Documentación Exclusiva · Innovación Agroalimentaria
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Cluster de Innovación Agroalimentaria
          </h2>
          <p className="text-xl text-green-200/80 max-w-3xl mx-auto">
            Transformación digital del sector agrícola español mediante datos compartidos, 
            <span className="text-green-400 font-semibold"> trazabilidad blockchain</span> y 
            agricultura de precisión en la red Pontus-X
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-green-800/50 border-green-700/50 text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.label}</div>
                  <div className="text-sm text-green-300/70">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Use Cases Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-green-400" />
            Casos de Uso del Sector Agroalimentario
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card 
                  className="bg-green-800/50 border-green-700/50 hover:border-green-500/50 transition-all duration-300 group h-full"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <useCase.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-green-300/70 border-green-600">
                        {useCase.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-white group-hover:text-green-300 transition-colors">
                      {useCase.title}
                    </CardTitle>
                    <CardDescription className="text-green-300/60">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <Card className="bg-green-800/50 border-green-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-400" />
              Recursos Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="justify-start gap-3 h-auto py-4 border-green-600 text-green-200 hover:bg-green-700/50"
                onClick={() => navigate("/partners/cdi-agro/proyecto")}
              >
                <Layers className="h-5 w-5 text-green-400" />
                <div className="text-left">
                  <div className="font-semibold">Página Pública del Proyecto</div>
                  <div className="text-xs text-green-400/60">Información general sobre CDI Agro y PROCUREDATA</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start gap-3 h-auto py-4 border-green-600 text-green-200 hover:bg-green-700/50"
                onClick={() => window.open("https://pontus-x.eu", "_blank")}
              >
                <ExternalLink className="h-5 w-5 text-emerald-400" />
                <div className="text-left">
                  <div className="font-semibold">Ecosistema Pontus-X</div>
                  <div className="text-xs text-green-400/60">Documentación oficial de la red federada</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-700/50 mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-green-400/60">
            © 2025 CDI Agro · Cluster de Innovación Agroalimentaria · Nodo PROCUREDATA
          </p>
          <p className="text-xs text-green-500/40 mt-1">
            Documentación confidencial para partners estratégicos
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CdiAgroMiembros;
