import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, Building, Database, 
  ArrowRight, Check, Users 
} from "lucide-react";

const roles = [
  {
    icon: ShoppingCart,
    title: "Data Consumer",
    subtitle: "Comprador",
    color: "itbid-cyan",
    description: "Solicita acceso a datos para un propósito específico",
    example: "Empresa compradora que necesita validar proveedores",
    responsibilities: [
      "Inicia solicitud de acceso",
      "Define propósito y justificación",
      "Acepta términos de uso (ODRL)",
      "Paga por el acceso al dato"
    ]
  },
  {
    icon: Building,
    title: "Data Subject",
    subtitle: "Proveedor / Propietario",
    color: "itbid-lime",
    description: "Propietario original de los datos, decide sobre su uso",
    example: "Proveedor cuyos datos fiscales o ESG se solicitan",
    responsibilities: [
      "Pre-aprueba solicitudes entrantes",
      "Define políticas ODRL permitidas",
      "Puede revocar acceso en cualquier momento",
      "Mantiene soberanía sobre sus datos"
    ]
  },
  {
    icon: Database,
    title: "Data Holder",
    subtitle: "Custodio Técnico",
    color: "itbid-purple",
    description: "Custodio técnico neutral que almacena y entrega los datos",
    example: "Agencia tributaria, cámara de comercio, certificadora",
    responsibilities: [
      "Custodia técnica neutral",
      "Verifica firmas de todas las partes",
      "Libera datos cifrados al Consumer",
      "Opera bajo protocolo IDS"
    ]
  }
];

const flowSteps = [
  { from: "Consumer", action: "Solicita dato", to: "Subject" },
  { from: "Subject", action: "Autoriza uso", to: "Holder" },
  { from: "Holder", action: "Libera acceso", to: "Consumer" },
];

export const TripartiteModel = () => {
  return (
    <div className="py-16 px-4 bg-muted/30 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-[hsl(var(--itbid-cyan))] uppercase tracking-wider">
            04 — Modelo IDSA
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            El Modelo Tripartito de Roles
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            ITBID-X implementa el modelo de tres roles fundamentales del estándar 
            International Data Spaces Association (IDSA) para garantizar la soberanía 
            y trazabilidad del dato.
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="p-6 overflow-x-auto">
            <div className="flex items-center justify-between gap-4 min-w-[500px]">
              {flowSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-[hsl(var(--${
                      step.from === "Consumer" ? "itbid-cyan" : 
                      step.from === "Subject" ? "itbid-lime" : "itbid-purple"
                    })/0.1)] flex items-center justify-center mx-auto mb-2`}>
                      <Users className={`h-6 w-6 text-[hsl(var(--${
                        step.from === "Consumer" ? "itbid-cyan" : 
                        step.from === "Subject" ? "itbid-lime" : "itbid-purple"
                      }))]`} />
                    </div>
                    <p className="text-sm font-medium">{step.from}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 px-4">
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {index + 1}. {step.action}
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  {index === flowSteps.length - 1 && (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-[hsl(var(--itbid-cyan)/0.1)] flex items-center justify-center mx-auto mb-2">
                        <Users className="h-6 w-6 text-[hsl(var(--itbid-cyan))]" />
                      </div>
                      <p className="text-sm font-medium">{step.to}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full border-[hsl(var(--${role.color})/0.3)] hover:border-[hsl(var(--${role.color}))] transition-colors`}>
                <CardHeader>
                  <div className={`p-3 rounded-xl bg-[hsl(var(--${role.color})/0.1)] w-fit`}>
                    <role.icon className={`h-6 w-6 text-[hsl(var(--${role.color}))]`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <p className={`text-sm text-[hsl(var(--${role.color}))]`}>{role.subtitle}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Ejemplo:</p>
                    <p className="text-sm">{role.example}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Responsabilidades:</p>
                    <ul className="space-y-1.5">
                      {role.responsibilities.map((resp) => (
                        <li key={resp} className="flex items-start gap-2 text-sm">
                          <Check className={`h-4 w-4 text-[hsl(var(--${role.color}))] shrink-0 mt-0.5`} />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
