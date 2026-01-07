import { Link } from "react-router-dom";
import { ArrowLeft, Compass, Shield, Zap, CheckCircle, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TourGuiado() {
  const tourSteps = [
    { step: 1, title: "Conecta tu Wallet", desc: "Vincula tu identidad corporativa", completed: true },
    { step: 2, title: "Verifica tu empresa", desc: "Sube CIF y documentación", completed: true },
    { step: 3, title: "Explora el Marketplace", desc: "Descubre proveedores verificados", completed: false },
    { step: 4, title: "Primera transacción", desc: "Solicita tu primer dato", completed: false }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/#features" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al Motor
          </Link>
          <Badge variant="outline" className="border-teal-500 text-teal-400">Experiencia UX</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-500/30 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="h-12 w-12 text-teal-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tour Guiado</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Onboarding Interactivo que elimina la curva de aprendizaje
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Tour Simulation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Dashboard Preview with Spotlight */}
            <Card className="bg-card dark:bg-gradient-to-br dark:from-slate-900 dark:to-teal-900/20 border-border dark:border-teal-500/30 overflow-hidden relative">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted dark:bg-white/5">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Compass className="h-5 w-5 text-teal-400" />
                  Vista de Dashboard (Simulación)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 relative">
                {/* Simulated Dashboard */}
                <div className="bg-muted dark:bg-slate-800/50 rounded-xl p-4 space-y-4">
                  {/* Header simulation */}
                  <div className="flex items-center justify-between p-3 bg-background dark:bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg" />
                      <span className="text-sm text-muted-foreground">Dashboard</span>
                    </div>
                    <div className="w-20 h-6 bg-muted-foreground/10 dark:bg-white/10 rounded" />
                  </div>

                  {/* Content simulation */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-background dark:bg-white/5 rounded-lg h-16" />
                    <div className="p-3 bg-background dark:bg-white/5 rounded-lg h-16" />
                  </div>

                  {/* Highlighted button with spotlight effect */}
                  <motion.div
                    animate={{ boxShadow: ["0 0 0 0 rgba(20, 184, 166, 0)", "0 0 0 20px rgba(20, 184, 166, 0.3)", "0 0 0 0 rgba(20, 184, 166, 0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-3 bg-teal-500/20 border-2 border-teal-500 rounded-lg text-center relative"
                  >
                    <span className="text-sm text-teal-400 font-medium">Conectar Wallet</span>
                  </motion.div>
                </div>

                {/* ARIA Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -right-2 bottom-4 w-64 bg-gradient-to-br from-primary to-primary/80 rounded-xl p-4 shadow-2xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">ARIA</p>
                      <p className="text-xs text-white/80 mt-1">
                        "Paso 1: Aquí puedes conectar tu Wallet para empezar a operar con identidad soberana."
                      </p>
                    </div>
                  </div>
                  <div className="absolute -left-2 bottom-4 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-primary border-b-8 border-b-transparent" />
                </motion.div>
              </CardContent>
            </Card>

            {/* Progress Steps */}
            <Card className="bg-card dark:bg-white/5 border-border dark:border-white/10">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted dark:bg-white/5">
                <CardTitle className="text-foreground text-sm">Progreso del Onboarding</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {tourSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-lg ${step.completed ? 'bg-teal-500/10 border border-teal-500/30' : 'bg-muted dark:bg-white/5'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-teal-500' : 'bg-muted-foreground/20 dark:bg-white/10'}`}>
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : (
                          <span className="text-sm text-muted-foreground">{step.step}</span>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</p>
                        <p className="text-xs text-muted-foreground/70">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
              <h2 className="text-2xl font-bold mb-4">Eliminando la Curva de Aprendizaje</h2>
              <p className="text-muted-foreground leading-relaxed">
                Sabemos que la transición hacia la Economía del Dato y la tecnología Web3 puede parecer 
                compleja. Por ello, el motor de ProcureData incorpora un sistema de Tour Guiado que 
                acompaña al usuario desde su primer inicio de sesión.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                No se trata de manuales estáticos; es una <strong className="text-foreground">capa de interfaz 
                inteligente</strong> que detecta el rol del usuario (Comprador o Proveedor) y resalta 
                las acciones críticas. Acompañado por ARIA, nuestra asistente virtual.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-card dark:bg-gradient-to-br dark:from-teal-900/20 dark:to-slate-900 border-border dark:border-teal-500/20">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Motor de Ayuda", value: "Guías personalizadas según rol y flujo de trabajo" },
                  { label: "Integración ARIA", value: "Chatbot con IA entrenado en 10,000+ referencias" },
                  { label: "Enfoque", value: "Reducción del Time-to-Value (tiempo hasta obtener valor)" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{spec.label}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
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
                    <h3 className="font-bold text-foreground mb-2">Adopción Acelerada</h3>
                    <p className="text-muted-foreground">
                      Reduzca los costes de formación de su equipo. Transforme a un comprador tradicional 
                      en un experto en gestión de espacios de datos en 
                      <strong className="text-orange-400"> cuestión de horas, no semanas</strong>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1 border-border dark:border-white/20 hover:bg-accent dark:hover:bg-white/10">
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
