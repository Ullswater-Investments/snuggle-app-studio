import { Link } from "react-router-dom";
import { ArrowLeft, Network, Shield, Zap, CheckCircle, Globe, Users, Building } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ModeloIDSA() {
  const roles = [
    { 
      name: "Consumer", 
      desc: "Quien solicita acceso a los datos", 
      icon: Users, 
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400" 
    },
    { 
      name: "Subject", 
      desc: "Propietario legal del dato", 
      icon: Building, 
      color: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400" 
    },
    { 
      name: "Data Holder", 
      desc: "Custodio técnico neutral", 
      icon: Shield, 
      color: "from-green-500/20 to-green-600/20 border-green-500/30 text-green-400" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-slate-950/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/#features" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al Motor
          </Link>
          <Badge variant="outline" className="border-green-500 text-green-400">Seguridad</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-green-600/20 border border-blue-500/30 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <Network className="h-12 w-12 text-blue-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Modelo IDSA</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Arquitectura Basada en el Estándar de la International Data Spaces Association
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Europe Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Data Space Network */}
            <Card className="bg-gradient-to-br from-slate-900 to-blue-900/20 border-blue-500/30 overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-white/5">
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  Red de Data Spaces Europea
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Simplified network visualization */}
                <div className="relative h-64 bg-gradient-to-br from-blue-900/30 to-green-900/20 rounded-xl border border-white/10 overflow-hidden">
                  {/* Central ProcureData Node */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center border-4 border-white/30 z-10"
                  >
                    <span className="text-xs font-bold text-white text-center">PROCURE<br/>DATA</span>
                  </motion.div>

                  {/* Connected Data Spaces */}
                  {[
                    { name: "Catena-X", x: "20%", y: "30%", delay: 0 },
                    { name: "GAIA-X", x: "75%", y: "25%", delay: 0.2 },
                    { name: "DSBA", x: "15%", y: "70%", delay: 0.4 },
                    { name: "Mobility DS", x: "80%", y: "65%", delay: 0.6 }
                  ].map((ds, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + ds.delay }}
                      className="absolute w-14 h-14 bg-white/10 rounded-full flex items-center justify-center border border-white/20"
                      style={{ left: ds.x, top: ds.y }}
                    >
                      <span className="text-[10px] font-medium text-white text-center">{ds.name}</span>
                    </motion.div>
                  ))}

                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                    {[
                      { x1: "50%", y1: "50%", x2: "27%", y2: "37%" },
                      { x1: "50%", y1: "50%", x2: "82%", y2: "32%" },
                      { x1: "50%", y1: "50%", x2: "22%", y2: "77%" },
                      { x1: "50%", y1: "50%", x2: "87%", y2: "72%" }
                    ].map((line, i) => (
                      <motion.line
                        key={i}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="rgba(59, 130, 246, 0.3)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                      />
                    ))}
                  </svg>
                </div>

                <p className="text-sm text-gray-400 text-center mt-4">
                  ProcureData como nodo certificado en la red europea de Data Spaces
                </p>
              </CardContent>
            </Card>

            {/* Roles Diagram */}
            <div className="grid grid-cols-3 gap-4">
              {roles.map((role, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <Card className={`bg-gradient-to-br ${role.color} h-full`}>
                    <CardContent className="p-4 text-center">
                      <role.icon className={`h-8 w-8 mx-auto mb-2 ${role.color.split(' ').pop()}`} />
                      <p className="font-bold text-white text-sm">{role.name}</p>
                      <p className="text-xs text-gray-300 mt-1">{role.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Estándar de Intercambio Soberano</h2>
              <p className="text-gray-400 leading-relaxed">
                ProcureData no es una isla tecnológica. Nuestra arquitectura sigue fielmente el modelo 
                de referencia de la <strong className="text-white">IDSA</strong>, el estándar de facto 
                para el intercambio de datos en Europa.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                Este modelo define roles claros para garantizar la confianza: el <strong className="text-blue-400">Consumer</strong> (quien 
                solicita), el <strong className="text-purple-400">Subject</strong> (propietario del dato) y 
                el <strong className="text-green-400">Data Holder</strong> (custodio técnico).
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-br from-blue-900/20 to-slate-900 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Arquitectura", value: "Basada en IDS Reference Architecture Model (IDS-RAM)" },
                  { label: "Roles", value: "Separación clara de responsabilidades técnicas y legales" },
                  { label: "Certificación", value: "Alineado con esquemas de confianza de Gaia-X" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">{spec.label}</p>
                      <p className="text-sm text-gray-400">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Benefit */}
            <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <Zap className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">Interoperabilidad Futura</h3>
                    <p className="text-gray-300">
                      No quede atrapado en una solución propietaria. Al elegir ProcureData, su infraestructura 
                      es <strong className="text-orange-400">compatible por diseño</strong> con el ecosistema 
                      de datos europeo del futuro.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1 border-white/20 hover:bg-white/10">
                <Link to="/auth">Probar Demo</Link>
              </Button>
              <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                <Link to="/architecture">Ver Arquitectura</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
