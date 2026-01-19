import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Leaf, Euro, Zap, Shield, Landmark, Users, Target, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const PilotLaunchpad = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-950"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
            Pilot Program
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            e-Show <span className="text-amber-400">Pioneer</span> Program 2026
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Think Big, Start Small, Scale Fast. Tres pilotos de alto impacto para la próxima edición.
          </p>
        </div>

        {/* Pilot Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Pilot 1: Sales Fast-Track */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-rose-500/30 backdrop-blur-sm h-full hover:border-rose-500/60 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 w-fit mb-4 shadow-lg shadow-rose-500/30">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <Badge className="w-fit mx-auto mb-2 bg-rose-500/20 text-rose-300 border-rose-500/30">
                  Sales Acceleration
                </Badge>
                <CardTitle className="text-xl text-white">Fast-Track Homologación</CardTitle>
                <CardDescription className="text-slate-400">
                  Vende antes de acabar la feria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="h-4 w-4 text-rose-400" />
                  <span className="text-sm">50 Expositores VIP</span>
                </div>

                {/* Animated Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span className="text-rose-400">30 días</span>
                    <span className="text-emerald-400">5 minutos</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-rose-500 to-emerald-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: "100%" } : {}}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 text-center">Tiempo de alta de proveedor</p>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">
                      <Zap className="h-4 w-4 mr-2" />
                      Activar Cohorte 1
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">KPI: Reducción del tiempo de alta de proveedor de 30 días a 5 minutos</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pilot 2: Green Scouting */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-emerald-500/30 backdrop-blur-sm h-full hover:border-emerald-500/60 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 w-fit mb-4 shadow-lg shadow-emerald-500/30">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <Badge className="w-fit mx-auto mb-2 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  Trust & ESG
                </Badge>
                <CardTitle className="text-xl text-white">Green Scouting ESG</CardTitle>
                <CardDescription className="text-slate-400">
                  Sostenibilidad verificada, sin Greenwashing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Target className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">Compradores C-Level</span>
                </div>

                {/* Animated Radar */}
                <div className="relative h-24 flex items-center justify-center">
                  <motion.div
                    className="absolute w-20 h-20 rounded-full border-2 border-emerald-500/30"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: [0.5, 1.5], opacity: [0.8, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute w-20 h-20 rounded-full border-2 border-emerald-500/30"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: [0.5, 1.5], opacity: [0.8, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  />
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center z-10">
                    <Shield className="h-6 w-6 text-emerald-400" />
                  </div>
                  <motion.div
                    className="absolute top-2 right-8"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.5, duration: 0.3 }}
                  >
                    <Badge className="bg-emerald-500 text-white text-xs">Match ✓</Badge>
                  </motion.div>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                      <Shield className="h-4 w-4 mr-2" />
                      Desplegar Filtros
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">KPI: % de leads generados a través del filtro de sostenibilidad</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pilot 3: Kit Espacio de Datos */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur-sm h-full hover:border-blue-500/60 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 w-fit mb-4 shadow-lg shadow-blue-500/30">
                  <Landmark className="h-8 w-8 text-white" />
                </div>
                <Badge className="w-fit mx-auto mb-2 bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Financiación Pública
                </Badge>
                <CardTitle className="text-xl text-white">Kit Espacio de Datos</CardTitle>
                <CardDescription className="text-slate-400">
                  Tu transformación digital gratis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Ecosistema Completo</span>
                </div>

                {/* Animated Counter */}
                <div className="text-center py-4">
                  <CountUpAnimation isInView={isInView} />
                  <p className="text-xs text-slate-500 mt-1">por empresa participante</p>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Euro className="h-4 w-4 mr-2" />
                      Iniciar Tramitación
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">KPI: Nº de solicitudes de subvención presentadas y aprobadas</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-violet-500/10 border border-emerald-500/30"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Euro className="h-6 w-6 text-emerald-400" />
            <span className="text-2xl font-bold text-white">Coste para e-Show: 0€</span>
          </div>
          <p className="text-emerald-300">
            100% Financiado por el Kit Espacio de Datos (SEDIA / NextGenerationEU)
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Count Up Animation Component
const CountUpAnimation = ({ isInView }: { isInView: boolean }) => {
  const [count, setCount] = useState(0);
  const targetAmount = 150000;

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = targetAmount / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, targetAmount);
      setCount(Math.floor(current));
      
      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={isInView ? { scale: 1 } : {}}
      className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
    >
      {count.toLocaleString('es-ES')}€
    </motion.div>
  );
};

export default PilotLaunchpad;
