import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, Clock, Ban, FileCheck, 
  Lock, Unlock, AlertTriangle, CheckCircle2 
} from "lucide-react";

const odrlComponents = [
  {
    icon: CheckCircle2,
    title: "Permissions",
    description: "Acciones autorizadas",
    examples: ["Lectura para homologación", "Análisis para ESG", "Visualización en dashboard"],
    color: "itbid-lime"
  },
  {
    icon: Ban,
    title: "Prohibitions",
    description: "Acciones vetadas",
    examples: ["Distribuir a terceros", "Almacenar permanentemente", "Uso comercial"],
    color: "destructive"
  },
  {
    icon: FileCheck,
    title: "Duties",
    description: "Obligaciones del comprador",
    examples: ["Pagar 1 EUROe", "Generar reporte de uso", "Notificar incidentes"],
    color: "itbid-cyan"
  },
  {
    icon: Clock,
    title: "Constraints",
    description: "Limitaciones temporales/espaciales",
    examples: ["Válido 90 días", "Solo territorio UE", "Horario 8:00-18:00"],
    color: "itbid-purple"
  }
];

const odrlExample = `{
  "@context": "http://www.w3.org/ns/odrl/2/",
  "@type": "Agreement",
  "uid": "policy:itbid-x:550e8400-e29b...",
  "permission": [{
    "target": "asset:supplier-fiscal-data",
    "action": "use",
    "constraint": [{
      "leftOperand": "dateTime",
      "operator": "lteq",
      "rightOperand": "2026-04-05T00:00:00Z"
    }]
  }],
  "prohibition": [{
    "action": "transfer"
  }],
  "duty": [{
    "action": "compensate",
    "constraint": {
      "payAmount": "500",
      "unit": "EUR"
    }
  }]
}`;

export const DataSovereignty = () => {
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
            05 — Soberanía del Dato
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            Mecanismos de Control Total
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            ODRL (Open Digital Rights Language) es el estándar W3C que permite crear 
            contratos digitales ejecutables por máquinas, garantizando que las condiciones 
            de uso se cumplan automáticamente.
          </p>
        </motion.div>

        {/* ODRL Components Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {odrlComponents.map((component, index) => (
            <motion.div
              key={component.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${component.color === 'destructive' ? 'destructive' : `[hsl(var(--${component.color}))]`}/10`}>
                      <component.icon className={`h-5 w-5 ${component.color === 'destructive' ? 'text-destructive' : `text-[hsl(var(--${component.color}))]`}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{component.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{component.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {component.examples.map((example) => (
                      <Badge 
                        key={example} 
                        variant="outline" 
                        className="text-xs"
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ODRL Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                  <CardTitle className="text-base">Ejemplo de Política ODRL</CardTitle>
                </div>
                <Badge variant="outline">JSON-LD</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="p-4 text-xs overflow-x-auto bg-muted/30">
                <code className="language-json">{odrlExample}</code>
              </pre>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revocation Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <CardTitle>Revocación de Acceso Instantánea</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Panel de Control → Mis Activos → Revocar
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                El propietario del dato puede revocar el acceso en cualquier momento. 
                Esta acción se ejecuta instantáneamente y queda registrada en blockchain 
                para auditoría.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background border flex items-center gap-3">
                  <Unlock className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                  <div>
                    <p className="text-sm font-medium">Acceso Activo</p>
                    <p className="text-xs text-muted-foreground">Consumer puede consultar datos</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-background border flex items-center gap-3">
                  <Lock className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="text-sm font-medium">Acceso Revocado</p>
                    <p className="text-xs text-muted-foreground">Inmediato + hash en blockchain</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
