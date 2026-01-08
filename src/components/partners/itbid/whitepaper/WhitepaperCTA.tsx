import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Presentation, Phone, FileText, 
  ArrowRight, CheckCircle2, Sparkles 
} from "lucide-react";
import confetti from "canvas-confetti";
import itbidLogo from "@/assets/itbid-logo.png";

const actions = [
  {
    icon: Presentation,
    title: "Solicitar Demo Técnica",
    description: "Demostración en vivo del Gateway ITBID-X",
    primary: true
  },
  {
    icon: FileText,
    title: "Descargar PDF",
    description: "Este whitepaper en formato PDF",
    primary: false
  },
  {
    icon: Phone,
    title: "Contactar Partner Manager",
    description: "Conversación directa con nuestro equipo",
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
      colors: ["#00D4FF", "#B4FF00", "#FF4D8D"]
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
            <img src={itbidLogo} alt="ITBID" className="h-8 object-contain" />
          </div>

          <span className="text-sm font-medium text-[hsl(var(--itbid-magenta))] uppercase tracking-wider">
            12 — Próximos Pasos
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 mb-4 itbid-gradient-gray">
            ¿Listo para la Cadena de Suministro del Futuro?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ITBID-X representa la evolución natural del procurement digital. 
            De gestionar documentos a federar la confianza.
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
          <Card className="bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.05)] via-[hsl(var(--itbid-lime)/0.05)] to-[hsl(var(--itbid-purple)/0.05)]">
            <CardContent className="py-8 text-center">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
              <p className="text-lg font-medium mb-2 italic">
                "Las plataformas cerradas quedarán obsoletas frente a los ecosistemas interoperables"
              </p>
              <p className="text-muted-foreground">
                ITBID-X ofrece a nuestros clientes no solo una herramienta de compras, 
                sino una <span className="font-semibold text-foreground">llave maestra</span> para 
                el futuro industrial de Europa.
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
          <p>© 2026 PROCUREDATA × ITBID. Whitepaper Técnico v1.0</p>
          <p className="mt-1">
            Gaia-X Compliant · IDSA Standard · GDPR Ready · Web3 Enabled
          </p>
        </motion.div>
      </div>
    </div>
  );
};
