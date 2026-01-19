import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileSignature, UserPlus, PlugZap, PartyPopper, CheckCircle2, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    id: 1,
    title: "Acuerdo & Financiación",
    month: "Mes 1",
    description: "Firma del acuerdo y solicitud del Kit Espacio de Datos. Selección de los 50 Pioneers.",
    icon: FileSignature,
    badge: "Responsable: ProcureData",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    iconBg: "from-blue-500 to-blue-600",
    glowColor: "shadow-blue-500/30"
  },
  {
    id: 2,
    title: "Digital Onboarding",
    month: "Mes 2",
    description: "Validación KYB automática de los 50 expositores. Emisión de DIDs y Pasaportes Digitales.",
    icon: UserPlus,
    badge: "Automático",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    iconBg: "from-emerald-500 to-emerald-600",
    glowColor: "shadow-emerald-500/30"
  },
  {
    id: 3,
    title: "Integración Técnica",
    month: "Mes 3",
    description: "Conexión API con el sistema de acreditaciones del e-Show y configuración de la App.",
    icon: PlugZap,
    badge: "Low-Code",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    iconBg: "from-violet-500 to-violet-600",
    glowColor: "shadow-violet-500/30"
  },
  {
    id: 4,
    title: "Go Live!",
    month: "Días del Evento",
    description: "Activación del Fast-Track en stands y monitoreo de transacciones en tiempo real.",
    icon: PartyPopper,
    badge: "En Vivo",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    iconBg: "from-pink-500 to-rose-500",
    glowColor: "shadow-pink-500/30"
  }
];

const ExecutionRoadmap = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-violet-500/20 text-violet-300 border-violet-500/30">
            <Calendar className="h-3 w-3 mr-1" />
            Execution Roadmap
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hoja de Ruta <span className="text-violet-400">Pioneer</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Un plan de ejecución diseñado para minimizar el impacto operativo en tu equipo y maximizar el resultado.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-700 rounded-full">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-violet-500 to-pink-500 rounded-full"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  className="relative flex items-center"
                >
                  {/* Content Card - Left or Right */}
                  <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 ml-auto'}`}>
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600 transition-colors">
                      <CardContent className="p-6">
                        <div className={`flex items-center gap-3 mb-3 ${isEven ? 'justify-end' : ''}`}>
                          <Badge variant="outline" className="text-slate-400 border-slate-600">
                            {step.month}
                          </Badge>
                          <Badge className={step.badgeColor}>
                            {step.badge}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.iconBg} flex items-center justify-center shadow-lg ${step.glowColor}`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                  </motion.div>

                  {/* Spacer for the other side */}
                  <div className="w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-emerald-300 font-medium">
              Financiación 100% Cubierta por Kit Espacio de Datos
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-6">
            ¿Listo para activar el e-Show Pioneer Program?
          </h3>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white shadow-lg shadow-violet-500/25"
          >
            Agendar Reunión de Inicio
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExecutionRoadmap;
