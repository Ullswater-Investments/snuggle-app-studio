import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, Building, Sparkles, 
  Check, TrendingUp, Shield, Clock, Coins 
} from "lucide-react";
import { ScoreRing } from "@/components/gamification/ScoreRing";

const stakeholders = [
  {
    icon: ShoppingCart,
    title: "Para el Comprador",
    subtitle: "Data Consumer",
    score: 95,
    color: "#00D4FF",
    benefits: [
      { icon: Clock, text: "Reducción del 40% en tiempos de validación" },
      { icon: Check, text: "Acceso a datos verificados sin duplicar auditorías" },
      { icon: Shield, text: "Cumplimiento CSRD con datos trazables" },
      { icon: Coins, text: "Optimización de costes de homologación" }
    ]
  },
  {
    icon: Building,
    title: "Para el Proveedor",
    subtitle: "Data Subject",
    score: 90,
    color: "#B4FF00",
    benefits: [
      { icon: Shield, text: "Control total sobre quién accede a sus datos" },
      { icon: TrendingUp, text: "Monetización de activos de información" },
      { icon: Check, text: "Reputación federada que reduce auditorías" },
      { icon: Clock, text: "Una sola certificación sirve para todos los clientes" }
    ]
  },
  {
    icon: Sparkles,
    title: "Para ITBID",
    subtitle: "Operador de Espacio de Datos",
    score: 100,
    color: "#FF4D8D",
    benefits: [
      { icon: TrendingUp, text: "Liderazgo en transformación digital industrial" },
      { icon: Shield, text: "Compliance por diseño con regulación UE" },
      { icon: Coins, text: "Nuevo modelo de negocio basado en valor" },
      { icon: Check, text: "Posicionamiento como hub de confianza" }
    ]
  }
];

export const StakeholderBenefits = () => {
  return (
    <div className="py-16 px-4 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-[hsl(var(--itbid-magenta))] uppercase tracking-wider">
            09 — Beneficios
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            Valor para Cada Stakeholder
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            ITBID-X genera valor diferenciado para cada participante del ecosistema, 
            alineando incentivos para crear un círculo virtuoso de colaboración.
          </p>
        </motion.div>

        {/* Stakeholder Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {stakeholders.map((stakeholder, index) => (
            <motion.div
              key={stakeholder.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-4">
                    <ScoreRing 
                      value={stakeholder.score} 
                      size={100} 
                      strokeWidth={8}
                      color={stakeholder.color}
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 w-fit mx-auto mb-2">
                    <stakeholder.icon className="h-6 w-6" style={{ color: stakeholder.color }} />
                  </div>
                  <CardTitle className="text-lg">{stakeholder.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{stakeholder.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {stakeholder.benefits.map((benefit) => (
                      <li key={benefit.text} className="flex items-start gap-3">
                        <benefit.icon 
                          className="h-4 w-4 shrink-0 mt-0.5" 
                          style={{ color: stakeholder.color }} 
                        />
                        <span className="text-sm">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.05)] via-[hsl(var(--itbid-lime)/0.05)] to-[hsl(var(--itbid-magenta)/0.05)]">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "40%", label: "Reducción tiempo validación" },
                  { value: "60%", label: "Menos auditorías presenciales" },
                  { value: "15%", label: "Ahorro en negociaciones" },
                  { value: "100%", label: "Cumplimiento CSRD" }
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-bold itbid-gradient">{stat.value}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
