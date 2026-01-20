import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, ArrowRight, ShieldCheck, Globe, 
  Coins, Satellite, BookOpen 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { greenProcurementCases, interventionTypes, InterventionType } from "@/data/greenProcurementCases";
import { cn } from "@/lib/utils";

export function GreenProcurementSection() {
  const [activeFilter, setActiveFilter] = useState<InterventionType | "all">("all");

  const filteredCases = activeFilter === "all" 
    ? greenProcurementCases 
    : greenProcurementCases.filter(c => c.interventionType === activeFilter);

  const getInterventionIcon = (type: InterventionType) => {
    switch (type) {
      case "co-inversion": return Coins;
      case "trazabilidad-forense": return Satellite;
      case "educacion-proveedores": return BookOpen;
    }
  };

  const getInterventionColor = (type: InterventionType) => {
    switch (type) {
      case "co-inversion": return "text-amber-500 bg-amber-500/10";
      case "trazabilidad-forense": return "text-cyan-500 bg-cyan-500/10";
      case "educacion-proveedores": return "text-violet-500 bg-violet-500/10";
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50/50 via-background to-teal-50/30 dark:from-emerald-950/20 dark:via-background dark:to-teal-950/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4">
            <Leaf className="w-4 h-4" />
            Green Procurement
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Intervención Estructural en{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Industrias Críticas
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            10 casos del sector privado que demuestran que el Green Procurement moderno es 
            <strong className="text-foreground"> diseñar ecosistemas</strong>, no comprar cosas.
          </p>
        </motion.div>

        {/* Intervention Type Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {interventionTypes.map((type) => {
            const isActive = activeFilter === type.id;
            const Icon = type.icon;
            const count = type.id === "all" 
              ? greenProcurementCases.length 
              : greenProcurementCases.filter(c => c.interventionType === type.id).length;
            
            return (
              <motion.button
                key={type.id}
                onClick={() => setActiveFilter(type.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                  isActive 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30" 
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{type.label}</span>
                <span className={cn(
                  "text-xs font-bold px-1.5 py-0.5 rounded-full",
                  isActive ? "bg-white/20" : "bg-muted-foreground/10"
                )}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Description of active filter */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeFilter}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center text-sm text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {interventionTypes.find(t => t.id === activeFilter)?.description}
          </motion.p>
        </AnimatePresence>

        {/* Cases Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredCases.map((caseItem, index) => {
              const InterventionIcon = getInterventionIcon(caseItem.interventionType);
              const interventionColor = getInterventionColor(caseItem.interventionType);
              
              return (
                <motion.div
                  key={caseItem.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="group h-full overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 border-2 hover:border-emerald-500/30">
                    {/* Header with gradient */}
                    <div className={`h-2 bg-gradient-to-r ${caseItem.color}`} />
                    
                    <CardContent className="p-6 space-y-4">
                      {/* Top Row: Sector + Intervention Type */}
                      <div className="flex items-center justify-between gap-2">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${caseItem.bgColor} ${caseItem.textColor}`}>
                          <caseItem.sectorIcon className="w-3 h-3" />
                          {caseItem.sector}
                        </div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${interventionColor}`}>
                          <InterventionIcon className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Green Procurement Badge */}
                      <div className="flex items-center justify-between">
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
                          <Leaf className="w-3 h-3 mr-1" />
                          Green Procurement
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-500" />
                          {caseItem.blockchainProof}
                        </span>
                      </div>

                      {/* Company & Program */}
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">{caseItem.company}</p>
                        <h3 className="text-lg font-bold mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {caseItem.program}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {caseItem.country} • {caseItem.regulatoryContext}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {caseItem.description}
                      </p>

                      {/* Metric Highlight */}
                      <div className="pt-4 border-t flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                            {caseItem.metricLabel}
                          </p>
                          <p className={`text-2xl font-bold bg-gradient-to-r ${caseItem.color} bg-clip-text text-transparent`}>
                            {caseItem.metric}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
            <div className="text-left">
              <p className="font-semibold text-foreground">
                ¿Tu organización quiere implementar Green Procurement?
              </p>
              <p className="text-sm text-muted-foreground">
                Descubre cómo Dataspace puede ayudarte a diseñar ecosistemas sostenibles.
              </p>
            </div>
            <Link 
              to="/servicios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shrink-0"
            >
              Ver Servicios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
