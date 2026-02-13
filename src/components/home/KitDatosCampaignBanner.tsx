import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Euro, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logoKitEspacioDatos from "@/assets/logo-kit-espacio-datos.jpg";
import logoGobiernoRedEs from "@/assets/logo-gobierno-red-es.jpg";

export function KitDatosCampaignBanner() {
  const benefits = [
    "Tramitación incluida en la cuota mensual",
    "Subvención 85-90%",
    "Sin letra pequeña",
  ];

  return (
    <section id="cases" className="py-16 bg-gradient-to-b from-emerald-50/80 to-background dark:from-emerald-950/20 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-card rounded-2xl border shadow-xl p-8 md:p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />

          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Euro className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">
              AYUDAS KIT ESPACIO DE DATOS
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Badge className="bg-amber-500 text-white hover:bg-amber-500 text-sm px-4 py-1.5">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  Inscripción hasta 20 de Marzo del 2026
                </Badge>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Badge variant="destructive" className="text-sm px-4 py-1.5">
                  PLAZAS LIMITADAS
                </Badge>
              </motion.div>
            </div>
          </div>

          {/* Main message */}
          <p className="text-center text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Digitaliza tu cadena de suministro con hasta{" "}
            <span className="font-bold text-foreground text-2xl">30.000 €</span>{" "}
            de Subvención a fondo perdido de RED.ES
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm md:text-base">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-foreground font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Hero CTA */}
          <div className="text-center mb-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white shadow-2xl shadow-emerald-500/30 rounded-full px-8 py-6 text-base md:text-lg font-bold border-0"
              >
                <Link to="/condiciones-kit-espacio-datos">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                  SOLICITA LAS AYUDAS KIT ESPACIO DE DATOS
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
            <Button asChild>
              <Link to="/inscripcion-kit-espacio-datos">
                Solicitar Inscripción por 190€ al mes
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/condiciones-kit-espacio-datos">
                Ver Condiciones
              </Link>
            </Button>
          </div>

          {/* Institutional logos */}
          <div className="flex items-center justify-center gap-8 pt-6 border-t border-border">
            <a href="https://acelerapyme.gob.es" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <img src={logoKitEspacioDatos} alt="Kit Espacio de Datos" className="h-12 md:h-16 object-contain" />
            </a>
            <a href="https://www.red.es" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <img src={logoGobiernoRedEs} alt="Gobierno de España - Red.es" className="h-12 md:h-16 object-contain" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
