import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserCheck, Upload, Search, Send, 
  CheckCheck, Lock, FileSearch, ArrowDown 
} from "lucide-react";

const flowSteps = [
  {
    step: 1,
    icon: UserCheck,
    title: "Registro y Verificación",
    description: "La organización se registra en ITBID-X y obtiene su Identificador Descentralizado (DID). Se verifica su identidad mediante KYB.",
    details: ["Creación de cuenta", "Generación de DID:ethr", "Verificación KYB", "Emisión de Self-Description"],
    color: "itbid-cyan"
  },
  {
    step: 2,
    icon: Upload,
    title: "Publicación de Activos",
    description: "El proveedor (Subject) publica sus datos en el catálogo federado, definiendo las políticas ODRL que rigen el acceso.",
    details: ["Carga de metadatos DCAT", "Definición de políticas ODRL", "Configuración de precios", "Activación en marketplace"],
    color: "itbid-lime"
  },
  {
    step: 3,
    icon: Search,
    title: "Descubrimiento",
    description: "El comprador (Consumer) busca en el catálogo federado y encuentra activos que coinciden con sus necesidades.",
    details: ["Búsqueda por categoría", "Filtrado por certificaciones", "Vista previa de metadatos", "Comparación de ofertas"],
    color: "itbid-purple"
  },
  {
    step: 4,
    icon: Send,
    title: "Solicitud y Negociación",
    description: "El Consumer envía una solicitud formal especificando el propósito, justificación y duración del acceso requerido.",
    details: ["Selección de producto", "Definición de propósito", "Justificación de uso", "Propuesta de duración"],
    color: "itbid-cyan"
  },
  {
    step: 5,
    icon: CheckCheck,
    title: "Aprobación Multi-Etapa",
    description: "Flujo de aprobación en dos fases: primero el Subject (propietario) pre-aprueba, luego el Holder (custodio) libera.",
    details: ["Subject evalúa solicitud", "Pre-aprobación con condiciones", "Holder verifica firmas", "Aprobación final"],
    color: "itbid-lime"
  },
  {
    step: 6,
    icon: Lock,
    title: "Entrega Cifrada",
    description: "Los datos se transfieren mediante túnel seguro end-to-end. Solo el Consumer autorizado puede descifrar el contenido.",
    details: ["Cifrado E2E", "Transfer vía EDC", "Verificación de integridad", "Descifrado local"],
    color: "itbid-magenta"
  },
  {
    step: 7,
    icon: FileSearch,
    title: "Auditoría Inmutable",
    description: "El hash de la transacción se registra en blockchain Pontus-X, creando un registro verificable e inmutable.",
    details: ["Hash en Pontus-X", "Timestamp verificable", "Prueba de acceso", "Trazabilidad completa"],
    color: "itbid-purple"
  }
];

export const FederatedFlowSteps = () => {
  return (
    <div className="py-16 px-4 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-[hsl(var(--itbid-lime))] uppercase tracking-wider">
            07 — Flujo de Datos Federado
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            Funcionamiento Paso a Paso
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            El espacio de datos federado ITBID-X sigue un proceso estructurado de 7 pasos 
            que garantiza la soberanía, seguridad y trazabilidad en cada transacción.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(var(--itbid-cyan))] via-[hsl(var(--itbid-lime))] to-[hsl(var(--itbid-purple))] hidden md:block" />

          <div className="space-y-6">
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="md:ml-16 relative overflow-hidden">
                  {/* Step Number Circle */}
                  <div className={`absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 -ml-8 w-8 h-8 rounded-full bg-[hsl(var(--${step.color}))] text-white flex items-center justify-center font-bold text-sm hidden md:flex`}>
                    {step.step}
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-[hsl(var(--${step.color})/0.1)] md:hidden`}>
                        <span className={`text-sm font-bold text-[hsl(var(--${step.color}))]`}>
                          {step.step}
                        </span>
                      </div>
                      <div className={`p-2 rounded-lg bg-[hsl(var(--${step.color})/0.1)]`}>
                        <step.icon className={`h-5 w-5 text-[hsl(var(--${step.color}))]`} />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.details.map((detail) => (
                        <Badge 
                          key={detail} 
                          variant="outline" 
                          className={`text-xs border-[hsl(var(--${step.color})/0.3)]`}
                        >
                          {detail}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.05)] via-[hsl(var(--itbid-lime)/0.05)] to-[hsl(var(--itbid-purple)/0.05)]">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold itbid-gradient">7</p>
                  <p className="text-sm text-muted-foreground">Pasos del flujo</p>
                </div>
                <div>
                  <p className="text-3xl font-bold itbid-gradient">2</p>
                  <p className="text-sm text-muted-foreground">Aprobaciones requeridas</p>
                </div>
                <div>
                  <p className="text-3xl font-bold itbid-gradient">100%</p>
                  <p className="text-sm text-muted-foreground">Trazabilidad blockchain</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
