import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, Bot, Leaf, Globe, 
  Shield, Zap, Users, TrendingUp 
} from "lucide-react";

const tendencias2030 = [
  {
    icon: Bot,
    titulo: "IA Generativa en Compras",
    horizonte: "2025-2027",
    descripcion: "Asistentes IA para negociación, análisis de contratos y predicción de demanda transformarán el día a día del comprador.",
    impacto: "Transformacional",
    preparacion: "Alta",
    color: "purple"
  },
  {
    icon: Leaf,
    titulo: "Economía Circular Obligatoria",
    horizonte: "2026-2028",
    descripcion: "Regulación UE exigirá trazabilidad de materiales y pasaportes digitales de producto en toda la cadena.",
    impacto: "Alto",
    preparacion: "Media",
    color: "emerald"
  },
  {
    icon: Globe,
    titulo: "Nearshoring Acelerado",
    horizonte: "2024-2026",
    descripcion: "Reshoring y nearshoring de producción crítica a Europa, rediseñando las estrategias de sourcing global.",
    impacto: "Alto",
    preparacion: "Alta",
    color: "blue"
  },
  {
    icon: Shield,
    titulo: "Ciberseguridad Supply Chain",
    horizonte: "2025-2027",
    descripcion: "Directiva NIS2 y estándares de ciberseguridad obligatorios para proveedores de sectores críticos.",
    impacto: "Alto",
    preparacion: "Baja",
    color: "red"
  },
  {
    icon: Users,
    titulo: "Talento Híbrido Tech-Business",
    horizonte: "2025-2030",
    descripcion: "Demanda de perfiles que combinen expertise en compras con competencias digitales avanzadas.",
    impacto: "Alto",
    preparacion: "Media",
    color: "amber"
  },
  {
    icon: Zap,
    titulo: "Autonomous Procurement",
    horizonte: "2028-2032",
    descripcion: "Sistemas de compras autónomas para categorías commoditizadas, liberando tiempo para estrategia.",
    impacto: "Transformacional",
    preparacion: "Baja",
    color: "cyan"
  }
];

const competenciasFuturo = [
  { nombre: "Gestión de IA y algoritmos", prioridad: "Crítica" },
  { nombre: "Data storytelling", prioridad: "Alta" },
  { nombre: "Pensamiento sistémico", prioridad: "Alta" },
  { nombre: "Gestión de ecosistemas", prioridad: "Alta" },
  { nombre: "Resiliencia y adaptabilidad", prioridad: "Crítica" },
  { nombre: "Negociación con máquinas", prioridad: "Media" },
];

export const TendenciasFuturo = () => {
  return (
    <div className="py-16 px-4 bg-muted/30 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-cyan-600 uppercase tracking-wider">
            11 — Tendencias 2030
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            El Futuro de la Función de Compras
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            Las megatendencias que transformarán el rol del CPO en la próxima década. 
            AERCE prepara a sus miembros para liderar esta evolución.
          </p>
        </motion.div>

        {/* Trends Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {tendencias2030.map((tendencia, index) => (
            <motion.div
              key={tendencia.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full border-${tendencia.color}-200/50 hover:border-${tendencia.color}-400 transition-colors`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${tendencia.color}-500/10`}>
                        <tendencia.icon className={`h-5 w-5 text-${tendencia.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{tendencia.titulo}</CardTitle>
                        <p className="text-xs text-muted-foreground">{tendencia.horizonte}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={tendencia.impacto === "Transformacional" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {tendencia.impacto}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{tendencia.descripcion}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Preparación del mercado:</span>
                    <Badge 
                      variant="outline" 
                      className={
                        tendencia.preparacion === "Alta" ? "text-emerald-600 border-emerald-600/30" :
                        tendencia.preparacion === "Media" ? "text-amber-600 border-amber-600/30" :
                        "text-red-600 border-red-600/30"
                      }
                    >
                      {tendencia.preparacion}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Future Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-purple-600/5 to-cyan-600/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-purple-600" />
                <CardTitle>Competencias del CPO 2030</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Las habilidades que diferenciarán a los líderes de Compras del futuro
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {competenciasFuturo.map((comp, index) => (
                  <motion.div
                    key={comp.nombre}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border"
                  >
                    <span className="text-sm font-medium">{comp.nombre}</span>
                    <Badge 
                      variant={comp.prioridad === "Crítica" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {comp.prioridad}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vision 2030 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="py-8 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-semibold mb-4">Visión AERCE 2030</h3>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                "Liderar la transformación de la función de Compras hacia un rol 
                estratégico, digital y sostenible, formando a la próxima generación 
                de CPOs que impulsen la competitividad de las empresas españolas."
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
