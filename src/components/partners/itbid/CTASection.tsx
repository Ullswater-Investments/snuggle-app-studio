import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/AnimatedSection";
import { 
  Presentation, FileText, Phone, Sparkles, 
  ArrowRight, CheckCircle2, Download
} from "lucide-react";
import confetti from "canvas-confetti";
import itbidLogo from "@/assets/itbid-logo.png";
import { generateWhitepaperPDF } from "@/utils/generateWhitepaperPDF";

const actions = [
  {
    icon: Presentation,
    title: "Solicitar Demo Técnica",
    description: "Demostración en vivo del Gateway itbid-x",
    primary: true,
    link: null,
  },
  {
    icon: FileText,
    title: "Descargar Whitepaper PDF",
    description: "Documento técnico completo para imprimir",
    primary: false,
    link: null,
    isPdf: true,
  },
  {
    icon: Phone,
    title: "Contactar Partner Manager",
    description: "Conversación directa con nuestro equipo",
    primary: false,
    link: null,
  },
];

export const CTASection = () => {
  const [clicked, setClicked] = useState(false);

  const handlePrimaryClick = () => {
    setClicked(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f97316", "#ea580c", "#fb923c"],
    });
    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-orange-500/5">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            {/* Dual Logos */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-xl font-bold procuredata-gradient">PROCUREDATA</span>
              <span className="text-2xl text-muted-foreground">×</span>
              <img src={itbidLogo} alt="itbid" className="h-8 object-contain" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Listo para liderar la <span className="procuredata-gradient">ECONOMÍA del DATO</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
              itbid-x es la apuesta estratégica para liderar la transición hacia 
              el ecosistema industrial digital europeo.
            </p>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              De digitalizar documentos a <span className="font-semibold text-foreground">federar la confianza</span>.
            </p>
          </div>
        </FadeIn>

        {/* Action Cards */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {actions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    action.primary 
                      ? "border-primary/50 bg-primary/5 hover:border-primary" 
                      : "hover:border-primary/30"
                  }`}
                  onClick={action.primary ? handlePrimaryClick : undefined}
                >
                  <CardContent className="pt-6 text-center">
                    <div className={`w-14 h-14 rounded-2xl ${
                      action.primary ? "bg-primary" : "bg-primary/10"
                    } flex items-center justify-center mx-auto mb-4`}>
                      <action.icon className={`h-7 w-7 ${
                        action.primary ? "text-primary-foreground" : "text-primary"
                      }`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                    {action.primary && (
                      <Button className="mt-4 w-full gap-2" onClick={handlePrimaryClick}>
                        {clicked ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            ¡Solicitud Enviada!
                          </>
                        ) : (
                          <>
                            Solicitar Ahora
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                    {action.isPdf && (
                      <Button variant="outline" className="mt-4 w-full gap-2" onClick={() => generateWhitepaperPDF()}>
                        <Download className="h-4 w-4" />
                        Descargar PDF
                      </Button>
                    )}
                    {action.link && (
                      <Button asChild variant="outline" className="mt-4 w-full gap-2">
                        <Link to={action.link}>
                          <Download className="h-4 w-4" />
                          Ver Online
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
