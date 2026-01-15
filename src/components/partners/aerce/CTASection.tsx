import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Users className="w-16 h-16 text-blue-200 mx-auto mb-6" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Eres miembro de AERCE?
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Accede al área exclusiva de miembros para disfrutar de recursos premium, 
            formación especializada y conexión con la comunidad de profesionales de compras.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/partners/aerce/login">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-6 text-lg shadow-lg"
              >
                Acceso Miembros
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <a 
              href="https://www.aerce.org" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
              >
                Web Oficial AERCE
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>

          <p className="text-blue-200 text-sm mt-8">
            ¿Aún no eres socio? <a href="https://www.aerce.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Descubre las ventajas de asociarte</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
