import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, Leaf, Link, ShoppingCart, 
  Recycle, Star, TrendingUp 
} from "lucide-react";

const useCases = [
  {
    icon: Layers,
    title: "Multi-Tier Visibility",
    subtitle: "Visibilidad en Cadena",
    color: "itbid-cyan",
    description: "Un fabricante OEM necesita verificar que su proveedor Tier-1 cumple normativas laborales. El Tier-1 puede demostrar cumplimiento sin revelar sus propios proveedores Tier-2.",
    metric: { value: "78%", label: "Transparencia" },
    impact: "Reducción del 50% en auditorías presenciales"
  },
  {
    icon: Leaf,
    title: "ESG Compliance",
    subtitle: "Cumplimiento Sostenibilidad",
    color: "itbid-lime",
    description: "Una empresa sujeta a CSRD necesita datos de huella de carbono de su cadena. Los proveedores comparten métricas ESG agregadas sin revelar costes de producción.",
    metric: { value: "92%", label: "Cobertura CSRD" },
    impact: "Reporting automático para directiva CSRD"
  },
  {
    icon: Link,
    title: "Blockchain Audit",
    subtitle: "Auditoría Inmutable",
    color: "itbid-purple",
    description: "Cada transacción de datos queda registrada en Pontus-X. Un auditor externo puede verificar la cadena de custodia sin acceder a los datos originales.",
    metric: { value: "100%", label: "Trazabilidad" },
    impact: "Certificación automática de origen"
  },
  {
    icon: ShoppingCart,
    title: "Smart Procurement Network",
    subtitle: "Benchmarking Anónimo",
    color: "itbid-cyan",
    description: "Múltiples compradores comparan precios y condiciones sin revelar sus proveedores. ITBID-X agrega datos de mercado real para optimizar negociaciones.",
    metric: { value: "85%", label: "Ahorro Negociación" },
    impact: "Hasta 15% de ahorro en categorías estratégicas"
  },
  {
    icon: Recycle,
    title: "Circular Supply Loop",
    subtitle: "Pasaporte de Materiales",
    color: "itbid-lime",
    description: "Verifica el contenido reciclado de materias primas sin exponer la fórmula del proveedor. Cumple con la Directiva de Ecodiseño UE.",
    metric: { value: "100%", label: "Trazabilidad Circular" },
    impact: "Cumplimiento Directiva Ecodiseño UE"
  },
  {
    icon: Star,
    title: "Supplier Trust Score",
    subtitle: "Reputación Federada",
    color: "itbid-purple",
    description: "Un proveedor acumula reputación de todos sus clientes ITBID. Nuevo cliente puede consultar score agregado sin ver datos individuales.",
    metric: { value: "92%", label: "Confianza Colectiva" },
    impact: "Reducción del 60% en auditorías presenciales"
  }
];

export const UseCasesWhitepaper = () => {
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
            08 — Casos de Uso
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            Escenarios de Aplicación Real
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            ITBID-X habilita escenarios de colaboración que antes eran imposibles 
            debido a la falta de confianza y control sobre los datos compartidos.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full border-[hsl(var(--${useCase.color})/0.3)] hover:border-[hsl(var(--${useCase.color}))] transition-colors`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-[hsl(var(--${useCase.color})/0.1)]`}>
                        <useCase.icon className={`h-5 w-5 text-[hsl(var(--${useCase.color}))]`} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{useCase.title}</CardTitle>
                        <p className="text-xs text-muted-foreground">{useCase.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold text-[hsl(var(--${useCase.color}))]`}>
                        {useCase.metric.value}
                      </p>
                      <p className="text-xs text-muted-foreground">{useCase.metric.label}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  <div className={`p-3 rounded-lg bg-[hsl(var(--${useCase.color})/0.05)] border border-[hsl(var(--${useCase.color})/0.2)]`}>
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`h-4 w-4 text-[hsl(var(--${useCase.color}))]`} />
                      <p className="text-sm font-medium">{useCase.impact}</p>
                    </div>
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
