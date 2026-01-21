import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  FileSignature, 
  Server, 
  Cpu, 
  Shield, 
  Coins, 
  Calendar,
  Building2,
  Lightbulb,
  BarChart3,
  Map,
  LogOut,
  ExternalLink,
  BookOpen,
  Layers
} from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";

const SeresMiembros = () => {
  const navigate = useNavigate();
  const { session, logout } = usePartnerAuth("seres");

  const handleLogout = () => {
    logout();
    navigate("/partners/seres");
  };

  const sections = [
    {
      id: "exploracion",
      title: "Exploración Estratégica",
      description: "Transformación de SERES a Oráculo de Datos Industriales",
      icon: Lightbulb,
      path: "/partners/seres/miembros/exploracion",
      color: "from-amber-500 to-orange-600",
      badge: "Estrategia"
    },
    {
      id: "arquitectura",
      title: "Arquitectura Técnica",
      description: "Componentes del Nodo Pontus-X: Provider, Aquarius, C2D",
      icon: Server,
      path: "/partners/seres/miembros/arquitectura",
      color: "from-blue-500 to-cyan-600",
      badge: "Técnico"
    },
    {
      id: "funcionalidades",
      title: "Funcionalidades Avanzadas",
      description: "IA Federada, Identidad Soberana (SSI), DeFi y Tokenización",
      icon: Cpu,
      path: "/partners/seres/miembros/funcionalidades",
      color: "from-purple-500 to-violet-600",
      badge: "Innovación"
    },
    {
      id: "casos-uso",
      title: "Casos de Uso por Sector",
      description: "Retail, Industria, Impacto Social, LATAM, Telecom",
      icon: Building2,
      path: "/partners/seres/miembros/casos-uso",
      color: "from-emerald-500 to-teal-600",
      badge: "Aplicaciones"
    },
    {
      id: "monetizacion",
      title: "Modelos de Negocio",
      description: "Nuevos mecanismos de ingresos y monetización de datos",
      icon: Coins,
      path: "/partners/seres/miembros/monetizacion",
      color: "from-pink-500 to-rose-600",
      badge: "Business"
    },
    {
      id: "roadmap",
      title: "Hoja de Ruta",
      description: "Fases de implementación: Identidad → Piloto → Escalamiento",
      icon: Map,
      path: "/partners/seres/miembros/roadmap",
      color: "from-slate-500 to-zinc-600",
      badge: "Planificación"
    }
  ];

  const stats = [
    { label: "+30 años", value: "Experiencia", icon: Calendar },
    { label: "+100 países", value: "Cobertura Global", icon: Building2 },
    { label: "Millones", value: "Documentos/año", icon: FileSignature },
    { label: "Gaia-X", value: "Ready", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/partners")}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center">
                  <FileSignature className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">SERES - Portal de Miembros</h1>
                  <p className="text-xs text-slate-400">Nodo PROCUREDATA · Grupo Docaposte</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {session?.partner_name || "SERES"}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-slate-400 hover:text-white gap-2"
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
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
            Documentación Exclusiva · Nodo PROCUREDATA
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Portal de Transformación Digital
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explora la evolución de SERES de intermediario EDI a <span className="text-blue-400 font-semibold">Oráculo de Datos Industriales</span> 
            {" "}mediante la iniciativa PROCUREDATA en la red Pontus-X
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
              <Card className="bg-slate-800/50 border-slate-700/50 text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.label}</div>
                  <div className="text-sm text-slate-400">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card 
                className="bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group h-full"
                onClick={() => navigate(section.path)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-slate-400 border-slate-600">
                      {section.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between text-blue-400 hover:text-blue-300 group-hover:bg-blue-500/10">
                    Explorar sección
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Access */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              Recursos Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="justify-start gap-3 h-auto py-4 border-slate-600 text-slate-300 hover:bg-slate-700/50"
                onClick={() => navigate("/partners/seres/proyecto")}
              >
                <Layers className="h-5 w-5 text-blue-400" />
                <div className="text-left">
                  <div className="font-semibold">Página Pública del Proyecto</div>
                  <div className="text-xs text-slate-500">Información general sobre SERES y PROCUREDATA</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start gap-3 h-auto py-4 border-slate-600 text-slate-300 hover:bg-slate-700/50"
                onClick={() => window.open("https://pontus-x.eu", "_blank")}
              >
                <ExternalLink className="h-5 w-5 text-emerald-400" />
                <div className="text-left">
                  <div className="font-semibold">Ecosistema Pontus-X</div>
                  <div className="text-xs text-slate-500">Documentación oficial de la red federada</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            © 2025 SERES · Grupo Docaposte · Nodo PROCUREDATA
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Documentación confidencial para partners estratégicos
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SeresMiembros;
