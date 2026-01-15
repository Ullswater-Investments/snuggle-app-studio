import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, GraduationCap, Users, 
  ArrowRight, CheckCircle2, Sparkles 
} from "lucide-react";
import confetti from "canvas-confetti";
import aerceLogo from "@/assets/aerce-logo.png";

const acciones = [
  {
    icon: Award,
    titulo: "Obtener Certificación",
    descripcion: "Inicia tu proceso de certificación UNE 15896",
    primary: true
  },
  {
    icon: GraduationCap,
    titulo: "Explorar Formación",
    descripcion: "Descubre nuestros programas formativos",
    primary: false
  },
  {
    icon: Users,
    titulo: "Unirse a la Red",
    descripcion: "Conecta con +2.000 profesionales CPO",
    primary: false
  }
];

export const WhitepaperCTA = () => {
  const [clicked, setClicked] = useState(false);

  const handlePrimaryClick = () => {
    setClicked(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563eb", "#7c3aed", "#059669"]
    });
    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <div className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Logos */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-xl font-bold procuredata-gradient">PROCUREDATA</span>
            <span className="text-2xl text-muted-foreground">×</span>
            <img src={aerceLogo} alt="AERCE" className="h-10 object-contain" />
          </div>

          <span className="text-sm font-medium text-purple-600 uppercase tracking-wider">
            13 — Próximos Pasos
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 mb-4 text-foreground/80">
            ¿Listo para Impulsar tu Carrera?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AERCE es tu aliado estratégico para el desarrollo profesional. 
            Únete a la comunidad de referencia en Compras y transforma tu carrera.
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {acciones.map((accion, index) => (
            <motion.div
              key={accion.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  accion.primary 
                    ? "border-blue-600/50 bg-blue-600/5 hover:border-blue-600" 
                    : "hover:border-blue-600/30"
                }`}
                onClick={accion.primary ? handlePrimaryClick : undefined}
              >
                <CardContent className="pt-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl ${
                    accion.primary ? "bg-blue-600" : "bg-blue-600/10"
                  } flex items-center justify-center mx-auto mb-4`}>
                    <accion.icon className={`h-7 w-7 ${
                      accion.primary ? "text-white" : "text-blue-600"
                    }`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{accion.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{accion.descripcion}</p>
                  {accion.primary && (
                    <Button className="mt-4 w-full gap-2 bg-blue-600 hover:bg-blue-700" onClick={handlePrimaryClick}>
                      {clicked ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          ¡Solicitud Enviada!
                        </>
                      ) : (
                        <>
                          Iniciar Proceso
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Final Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-emerald-600/5">
            <CardContent className="py-8 text-center">
              <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2 italic">
                "El CPO del futuro no será solo un negociador, sino un arquitecto de valor sostenible"
              </p>
              <p className="text-muted-foreground">
                AERCE Connect ofrece a los profesionales de Compras las herramientas, 
                la formación y la red necesarias para 
                <span className="font-semibold text-foreground"> liderar la transformación </span>
                de sus organizaciones.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <p>© 2026 PROCUREDATA × AERCE. Whitepaper Estratégico v1.0</p>
          <p className="mt-1">
            UNE 15896 · IFPSM Certified · +30 Años de Excelencia · +2.000 Profesionales
          </p>
        </motion.div>
      </div>
    </div>
  );
};
