import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/AnimatedSection";
import { ScoreRing } from "@/components/gamification/ScoreRing";
import { 
  Leaf, AlertTriangle, Brain, ChevronLeft, ChevronRight, 
  FileCheck, ShieldCheck, Banknote, Network, Cpu,
  ShoppingCart, Recycle, Star, BarChart3, Search, Handshake, Award, Package
} from "lucide-react";

const useCases = [
  {
    id: 1,
    icon: Leaf,
    title: "Pasaporte Digital de Producto (ESG)",
    subtitle: "Credenciales Verificables para Sostenibilidad",
    color: "text-[hsl(var(--itbid-lime))]",
    bgColor: "bg-[hsl(var(--itbid-lime)/0.1)]",
    borderColor: "border-[hsl(var(--itbid-lime)/0.3)]",
    description: "La Directiva CS3D exige auditar la sostenibilidad de proveedores. itbid-x transforma PDFs por email en credenciales criptográficamente verificables.",
    flow: [
      { step: "Emisión", desc: "Certificadora emite VC a la Wallet del Proveedor", icon: FileCheck },
      { step: "Solicitud", desc: "itbid detecta dato faltante y solicita automáticamente", icon: Network },
      { step: "Verificación", desc: "Proveedor presenta prueba criptográfica", icon: ShieldCheck },
      { step: "Resultado", desc: "Scoring ESG actualizado en tiempo real", icon: Leaf },
    ],
    metric: { label: "Confianza ESG", value: 100 },
    impact: "Eliminación del riesgo de 'Greenwashing' mediante documentación falsa",
  },
  {
    id: 2,
    icon: AlertTriangle,
    title: "Gestión de Riesgos Colaborativa",
    subtitle: "Inteligencia de Enjambre (Swarm Intelligence)",
    color: "text-[hsl(var(--itbid-magenta))]",
    bgColor: "bg-[hsl(var(--itbid-magenta)/0.1)]",
    borderColor: "border-[hsl(var(--itbid-magenta)/0.3)]",
    description: "En un modelo federado, itbid puede anonimizar y agregar señales de riesgo de miles de transacciones sin exponer quién compra a quién.",
    flow: [
      { step: "Evento", desc: "Proveedor Tier-2 notifica retraso de 4 semanas", icon: AlertTriangle },
      { step: "Propagación", desc: "Señal viaja a clientes directos (Tier 1)", icon: Network },
      { step: "Alerta", desc: "OEMs reciben alerta de impacto en cadena", icon: ShieldCheck },
      { step: "Financiación", desc: "Bancos ofrecen factoring instantáneo", icon: Banknote },
    ],
    metric: { label: "Tiempo de Alerta", value: 95 },
    impact: "Factoring instantáneo con menor riesgo y mejores tasas",
  },
  {
    id: 3,
    icon: Brain,
    title: "AVI-A y Federated Learning",
    subtitle: "Compute-to-Data: La IA viaja al Dato",
    color: "text-[hsl(var(--itbid-purple))]",
    bgColor: "bg-[hsl(var(--itbid-purple)/0.1)]",
    borderColor: "border-[hsl(var(--itbid-purple)/0.3)]",
    description: "En lugar de mover datos a la nube, enviamos el algoritmo al entorno seguro del cliente. Ningún texto de contrato sale jamás del perímetro del cliente.",
    flow: [
      { step: "Envío", desc: "Instancia de algoritmo viaja al cliente", icon: Cpu },
      { step: "Aprendizaje", desc: "IA aprende localmente de contratos", icon: Brain },
      { step: "Retorno", desc: "Solo parámetros matemáticos vuelven", icon: Network },
      { step: "Mejora", desc: "Cerebro central más inteligente", icon: ShieldCheck },
    ],
    metric: { label: "Privacidad", value: 100 },
    impact: "AVI-A: la IA más inteligente, entrenada sin leer secretos industriales",
  },
  {
    id: 4,
    icon: ShoppingCart,
    title: "Smart Procurement Network",
    subtitle: "Benchmarking Anónimo entre Compradores",
    color: "text-[hsl(var(--itbid-cyan))]",
    bgColor: "bg-[hsl(var(--itbid-cyan)/0.1)]",
    borderColor: "border-[hsl(var(--itbid-cyan)/0.3)]",
    description: "Múltiples compradores comparan precios y condiciones sin revelar sus proveedores. itbid-x agrega datos de mercado real para optimizar negociaciones.",
    flow: [
      { step: "Consulta", desc: "Comprador solicita benchmark de categoría", icon: Search },
      { step: "Agregación", desc: "Red federada agrega datos anónimos", icon: Network },
      { step: "Análisis", desc: "IA calcula posición competitiva", icon: BarChart3 },
      { step: "Acción", desc: "Recomendaciones de negociación", icon: Handshake },
    ],
    metric: { label: "Ahorro Negociación", value: 85 },
    impact: "Hasta 15% de ahorro en categorías estratégicas con datos de mercado real",
  },
  {
    id: 5,
    icon: Recycle,
    title: "Circular Supply Loop",
    subtitle: "Pasaporte de Materiales Reciclados",
    color: "text-[hsl(var(--itbid-lime))]",
    bgColor: "bg-[hsl(var(--itbid-lime)/0.1)]",
    borderColor: "border-[hsl(var(--itbid-lime)/0.3)]",
    description: "Verifica el contenido reciclado de materias primas sin exponer la fórmula del proveedor. Cumple con la Directiva de Ecodiseño UE.",
    flow: [
      { step: "Registro", desc: "Material entra con hash de composición", icon: Package },
      { step: "Verificación", desc: "Certificadora valida % reciclado", icon: ShieldCheck },
      { step: "Trazabilidad", desc: "Token acompaña al lote en fabricación", icon: Network },
      { step: "Cumplimiento", desc: "Informe automático para auditoría", icon: FileCheck },
    ],
    metric: { label: "Trazabilidad Circular", value: 100 },
    impact: "Cumplimiento Directiva Ecodiseño sin revelar secretos industriales",
  },
  {
    id: 6,
    icon: Star,
    title: "Supplier Trust Score",
    subtitle: "Score de Confianza Colaborativo",
    color: "text-[hsl(var(--itbid-purple))]",
    bgColor: "bg-[hsl(var(--itbid-purple)/0.1)]",
    borderColor: "border-[hsl(var(--itbid-purple)/0.3)]",
    description: "Un proveedor acumula reputación de todos sus clientes itbid. Nuevo cliente puede consultar score agregado sin ver datos individuales.",
    flow: [
      { step: "Evaluación", desc: "Clientes califican entregas y calidad", icon: Star },
      { step: "Agregación", desc: "Puntuaciones se promedian anónimamente", icon: Network },
      { step: "Consulta", desc: "Nuevo cliente solicita Trust Score", icon: Search },
      { step: "Decisión", desc: "Adjudicación basada en datos reales", icon: Award },
    ],
    metric: { label: "Confianza Colectiva", value: 92 },
    impact: "Reducción del 60% en auditorías presenciales gracias a reputación federada",
  },
];

export const UseCasesSection = () => {
  const [activeCase, setActiveCase] = useState(0);
  const currentCase = useCases[activeCase];

  return (
    <section className="py-12 pb-8 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] mb-4">
              <Network className="h-4 w-4" />
              <span className="text-sm font-medium itbid-font">Casos de Uso</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light itbid-gradient-gray mb-4">Impacto Real</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Seis escenarios que transforman la cadena de suministro
            </p>
          </div>
        </FadeIn>

        {/* Case Selector */}
        <div className="flex justify-center gap-4 mb-12">
          {useCases.map((uc, index) => (
            <Button
              key={uc.id}
              variant={activeCase === index ? "default" : "outline"}
              onClick={() => setActiveCase(index)}
              className={`gap-2 ${activeCase === index ? "bg-gradient-to-r from-[hsl(var(--itbid-cyan))] to-[hsl(var(--itbid-purple))]" : ""}`}
            >
              <uc.icon className="h-4 w-4" />
              <span className="hidden md:inline itbid-font">{uc.title.split(" ")[0]}</span>
            </Button>
          ))}
        </div>

        {/* Active Case Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`max-w-5xl mx-auto border-2 ${currentCase.bgColor} ${currentCase.borderColor}`}>
              <CardHeader>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl ${currentCase.bgColor}`}>
                      <currentCase.icon className={`h-8 w-8 ${currentCase.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl itbid-font">{currentCase.title}</CardTitle>
                      <p className="text-muted-foreground">{currentCase.subtitle}</p>
                    </div>
                  </div>
                  <ScoreRing
                    score={currentCase.metric.value}
                    size={80}
                    strokeWidth={6}
                    label={currentCase.metric.label}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-lg text-muted-foreground">{currentCase.description}</p>

                {/* Flow Diagram */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentCase.flow.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <Card className="p-4 text-center h-full hover:shadow-md transition-shadow">
                        <div className={`w-10 h-10 rounded-full ${currentCase.bgColor} flex items-center justify-center mx-auto mb-3`}>
                          <step.icon className={`h-5 w-5 ${currentCase.color}`} />
                        </div>
                        <p className="font-semibold text-sm mb-1 itbid-font">{step.step}</p>
                        <p className="text-xs text-muted-foreground">{step.desc}</p>
                      </Card>
                      {index < currentCase.flow.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                          <ChevronRight className={`h-4 w-4 ${currentCase.color}`} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Impact */}
                <div className={`p-4 rounded-lg ${currentCase.bgColor} ${currentCase.borderColor} border`}>
                  <p className="font-semibold itbid-font">
                    💡 Impacto: <span className="font-normal">{currentCase.impact}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setActiveCase((prev) => (prev === 0 ? useCases.length - 1 : prev - 1))}
            className="border-[hsl(var(--itbid-cyan)/0.3)]"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2 items-center">
            {useCases.map((uc, index) => {
              const dotColors = [
                "bg-[hsl(var(--itbid-lime))]",
                "bg-[hsl(var(--itbid-magenta))]",
                "bg-[hsl(var(--itbid-purple))]",
                "bg-[hsl(var(--itbid-cyan))]",
                "bg-[hsl(var(--itbid-lime))]",
                "bg-[hsl(var(--itbid-purple))]",
              ];
              return (
                <button
                  key={index}
                  onClick={() => setActiveCase(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeCase === index 
                      ? `w-6 ${dotColors[index]}`
                      : "bg-muted-foreground/30"
                  }`}
                />
              );
            })}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setActiveCase((prev) => (prev === useCases.length - 1 ? 0 : prev + 1))}
            className="border-[hsl(var(--itbid-purple)/0.3)]"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
