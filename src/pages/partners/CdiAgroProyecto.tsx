import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Wheat, 
  Tractor, 
  Leaf, 
  Shield, 
  CheckCircle2,
  Building2,
  Globe,
  Droplets,
  Sun,
  BarChart3,
  Lock
} from "lucide-react";

const CdiAgroProyecto = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Leaf,
      title: "Trazabilidad Completa",
      description: "Seguimiento del producto desde el origen hasta el consumidor final con tecnología blockchain"
    },
    {
      icon: Droplets,
      title: "Gestión Hídrica Inteligente",
      description: "Optimización del consumo de agua mediante sensores IoT y algoritmos predictivos"
    },
    {
      icon: BarChart3,
      title: "Inteligencia de Mercado",
      description: "Acceso a datos agregados de precios, tendencias y demanda en tiempo real"
    },
    {
      icon: Sun,
      title: "Agricultura de Precisión",
      description: "Datos satelitales y meteorológicos para maximizar el rendimiento de cultivos"
    }
  ];

  const features = [
    "Compartición soberana de datos agrícolas",
    "Certificaciones verificables (ecológico, DO, IGP)",
    "Predicción de cosechas y rendimientos",
    "Monitorización en tiempo real de cultivos",
    "Integración con cooperativas y mayoristas",
    "Cumplimiento normativo (PAC, Gaia-X)"
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
                  <h1 className="text-lg font-bold text-white">CDI Agro</h1>
                  <p className="text-xs text-green-300/70">Cluster de Innovación Agroalimentaria</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => navigate("/partners/cdi-agro")}
              className="bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600 text-white gap-2"
            >
              <Lock className="h-4 w-4" />
              Acceso Miembros
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
            PROCUREDATA PARTNER · SECTOR AGROALIMENTARIO
          </Badge>
          <h2 className="text-5xl font-bold text-white mb-6">
            Cluster de Innovación
            <span className="block text-green-400">Agroalimentaria</span>
          </h2>
          <p className="text-xl text-green-200/80 max-w-3xl mx-auto mb-8">
            Impulsamos la transformación digital del sector agrícola español conectando 
            productores, cooperativas y empresas tecnológicas para optimizar la cadena 
            de valor agroalimentaria
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="text-green-300 border-green-500/50 py-1.5 px-3">
              <Shield className="h-3 w-3 mr-1" /> Gaia-X Verified
            </Badge>
            <Badge variant="outline" className="text-green-300 border-green-500/50 py-1.5 px-3">
              <Globe className="h-3 w-3 mr-1" /> Pontus-X Network
            </Badge>
            <Badge variant="outline" className="text-green-300 border-green-500/50 py-1.5 px-3">
              <Building2 className="h-3 w-3 mr-1" /> +200 Explotaciones
            </Badge>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className="bg-green-800/30 border-green-700/50 h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-lime-500 flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{benefit.title}</CardTitle>
                      <CardDescription className="text-green-300/60">
                        {benefit.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Card className="bg-green-800/30 border-green-700/50">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <Tractor className="h-6 w-6 text-green-400" />
                Capacidades del Nodo Agroalimentario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-green-200">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-green-700/50 to-emerald-700/50 border-green-600/50">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Eres miembro del cluster?
              </h3>
              <p className="text-green-200/80 mb-6 max-w-xl mx-auto">
                Accede al portal exclusivo para explorar casos de uso, documentación técnica 
                y recursos estratégicos del nodo agroalimentario
              </p>
              <Button 
                onClick={() => navigate("/partners/cdi-agro")}
                size="lg"
                className="bg-white text-green-900 hover:bg-green-50 gap-2"
              >
                <Lock className="h-4 w-4" />
                Acceder al Área de Miembros
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-700/50 mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-green-400/60">
            © 2025 CDI Agro · Cluster de Innovación Agroalimentaria
          </p>
          <p className="text-xs text-green-500/40 mt-1">
            Nodo PROCUREDATA · Red Pontus-X · Gaia-X Ready
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CdiAgroProyecto;
