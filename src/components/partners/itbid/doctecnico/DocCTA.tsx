import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { 
  Presentation, Phone, FileText, ArrowRight, 
  CheckCircle2, Sparkles
} from "lucide-react";
import itbidLogo from "@/assets/itbid-logo.png";
import { DemoSchedulerDialog } from "./DemoSchedulerDialog";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

const actions = [
  {
    icon: Presentation,
    title: "Solicitar Demo Técnica",
    description: "Demostración en vivo del Gateway itbid-x",
    primary: true,
  },
  {
    icon: Phone,
    title: "Contactar Partner Manager",
    description: "Eduardo Ranz",
    email: "eduardo@agileprocurement.es",
    phone: "+34 680820492",
    primary: false,
  },
  {
    icon: FileText,
    title: "Ver Proyecto Completo",
    description: "Volver a la página del proyecto ITBID",
    link: "/partners/itbid/proyecto",
    primary: false,
  },
];

export const DocCTA = () => {
  const [clicked, setClicked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePrimaryClick = () => {
    setDialogOpen(true);
  };

  const handleSuccess = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[hsl(var(--itbid-cyan)/0.1)] via-background to-[hsl(var(--itbid-magenta)/0.1)]">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            {/* Dual Logos */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <ProcuredataLogo size="md" />
              <span className="text-3xl text-muted-foreground">×</span>
              <img src={itbidLogo} alt="itbid" className="h-10 object-contain" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Preparados para construir{" "}
              <span className="bg-gradient-to-r from-[hsl(var(--itbid-cyan))] to-[hsl(var(--itbid-magenta))] bg-clip-text text-transparent">
                itbid-x
              </span>
              ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Este documento responde a las preguntas iniciales. El siguiente paso es 
              una sesión de trabajo conjunto para definir el roadmap de implementación.
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
                      ? "border-[hsl(var(--itbid-cyan)/0.5)] bg-[hsl(var(--itbid-cyan)/0.05)] hover:border-[hsl(var(--itbid-cyan))]" 
                      : "hover:border-[hsl(var(--itbid-cyan)/0.3)]"
                  }`}
                  onClick={action.primary ? handlePrimaryClick : undefined}
                >
                  <CardContent className="pt-6 text-center">
                    <div className={`w-14 h-14 rounded-2xl ${
                      action.primary ? "bg-[hsl(var(--itbid-cyan))]" : "bg-[hsl(var(--itbid-cyan)/0.1)]"
                    } flex items-center justify-center mx-auto mb-4`}>
                      <action.icon className={`h-7 w-7 ${
                        action.primary ? "text-white" : "text-[hsl(var(--itbid-cyan))]"
                      }`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                    
                    {action.email && (
                      <div className="mt-3 space-y-1">
                        <a 
                          href={`mailto:${action.email}`} 
                          className="text-sm text-[hsl(var(--itbid-cyan))] hover:underline block"
                        >
                          {action.email}
                        </a>
                        {action.phone && (
                          <a 
                            href={`tel:${action.phone.replace(/\s/g, '')}`} 
                            className="text-sm text-muted-foreground hover:text-[hsl(var(--itbid-cyan))] block"
                          >
                            Tel. {action.phone}
                          </a>
                        )}
                      </div>
                    )}
                    
                    {action.primary && (
                      <Button 
                        className="mt-4 w-full gap-2 bg-[hsl(var(--itbid-cyan))] hover:bg-[hsl(var(--itbid-cyan)/0.9)]" 
                        onClick={handlePrimaryClick}
                      >
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
                    
                    {action.link && (
                      <Button asChild variant="outline" className="mt-4 w-full gap-2">
                        <Link to={action.link}>
                          <ArrowRight className="h-4 w-4" />
                          Ver Proyecto
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Closing Quote */}
        <FadeIn delay={0.3}>
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.1)] via-[hsl(var(--itbid-magenta)/0.1)] to-[hsl(var(--itbid-lime)/0.1)] border-0">
            <CardContent className="py-10 text-center">
              <Sparkles className="h-8 w-8 mx-auto mb-4 text-[hsl(var(--itbid-magenta))]" />
              <blockquote className="text-xl md:text-2xl font-medium italic mb-4">
                "ITBID tiene la oportunidad de liderar la transformación hacia 
                espacios de datos federados en el mercado de compras español y europeo."
              </blockquote>
              <p className="text-muted-foreground">
                — Equipo PROCUREDATA
              </p>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.4}>
          <div className="text-center mt-12 pt-8 border-t">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Badge variant="outline" className="text-xs">
                Documento Técnico v1.0
              </Badge>
              <Badge variant="outline" className="text-xs">
                Enero 2025
              </Badge>
              <Badge variant="outline" className="text-xs bg-[hsl(var(--itbid-lime)/0.1)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
                Confidencial
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 PROCUREDATA × ITBID. Alineados con la estrategia de Espacios de Datos de la UE.
            </p>
          </div>
        </FadeIn>
      </div>

      <DemoSchedulerDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        onSuccess={handleSuccess}
      />
    </section>
  );
};
