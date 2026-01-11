import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { PremiumPartner } from "@/data/premiumPartnersData";

interface PremiumPartnerCTAProps {
  partner: PremiumPartner;
}

export const PremiumPartnerCTA = ({ partner }: PremiumPartnerCTAProps) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
      
      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/10 opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para acceder a la inteligencia de{" "}
            <span className="text-primary">{partner.name}</span>?
          </h2>
          
          <p className="text-muted-foreground mb-8">
            Explore el catálogo completo de datos o solicite acceso personalizado a la API
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link to="/catalog">
                Acceder al Marketplace
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <Link to="/auth">
                Contactar para API
                <MessageSquare className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Datos verificados GAIA-X</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Cumplimiento GDPR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Blockchain Polygon</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
