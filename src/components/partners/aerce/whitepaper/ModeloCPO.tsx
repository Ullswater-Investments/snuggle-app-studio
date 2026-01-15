import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, Users, Building2, Crown, 
  ArrowUp, Target, Briefcase, Star 
} from "lucide-react";

const nivelesCPO = [
  {
    nivel: 1,
    titulo: "Buyer / Comprador",
    descripcion: "Profesional operativo que ejecuta compras tácticas siguiendo políticas establecidas.",
    experiencia: "0-3 años",
    color: "bg-slate-500",
    competencias: ["Negociación básica", "Gestión de pedidos", "Evaluación de ofertas"],
    icon: User
  },
  {
    nivel: 2,
    titulo: "Senior Buyer / Category Manager",
    descripcion: "Especialista en categorías que desarrolla estrategias de sourcing y gestiona proveedores clave.",
    experiencia: "3-7 años",
    color: "bg-blue-500",
    competencias: ["Category Management", "Análisis de mercado", "Gestión de contratos"],
    icon: Users
  },
  {
    nivel: 3,
    titulo: "Procurement Manager",
    descripcion: "Líder de equipos que define estrategias departamentales y gestiona stakeholders internos.",
    experiencia: "7-12 años",
    color: "bg-purple-500",
    competencias: ["Liderazgo de equipos", "Estrategia de compras", "Gestión del cambio"],
    icon: Building2
  },
  {
    nivel: 4,
    titulo: "CPO / Director de Compras",
    descripcion: "Ejecutivo C-Level que alinea Compras con la estrategia corporativa y genera valor sostenible.",
    experiencia: "12+ años",
    color: "bg-amber-500",
    competencias: ["Visión estratégica", "Gestión de riesgos", "Transformación digital"],
    icon: Crown
  }
];

const rolCPO = [
  { aspecto: "De ejecutor", a: "Estratega", icon: Target },
  { aspecto: "De reducir costes", a: "Crear valor", icon: Star },
  { aspecto: "De departamento", a: "Partner de negocio", icon: Briefcase },
];

export const ModeloCPO = () => {
  return (
    <div className="py-16 px-4 bg-muted/30 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-purple-600 uppercase tracking-wider">
            03 — Modelo de Desarrollo CPO
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            La Carrera del Profesional de Compras
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            AERCE ha definido un modelo de desarrollo profesional que guía la evolución 
            del comprador desde roles operativos hasta posiciones de liderazgo ejecutivo.
          </p>
        </motion.div>

        {/* Career Ladder */}
        <div className="relative mb-16">
          {/* Connection Line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 via-blue-400 via-purple-400 to-amber-400" />
          
          <div className="space-y-6">
            {nivelesCPO.map((nivel, index) => (
              <motion.div
                key={nivel.titulo}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <Card className="ml-0 md:ml-16 border-l-4" style={{ borderLeftColor: nivel.color.replace('bg-', '#').replace('-500', '') }}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className={`hidden md:flex absolute -left-[52px] w-10 h-10 rounded-full ${nivel.color} items-center justify-center text-white font-bold`}>
                          {nivel.nivel}
                        </div>
                        <div className={`md:hidden p-2 rounded-lg ${nivel.color}/10`}>
                          <nivel.icon className={`h-5 w-5 ${nivel.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{nivel.titulo}</CardTitle>
                          <Badge variant="outline" className="mt-1">{nivel.experiencia}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{nivel.descripcion}</p>
                    <div className="flex flex-wrap gap-2">
                      {nivel.competencias.map((comp) => (
                        <Badge key={comp} variant="secondary" className="text-xs">
                          {comp}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Evolution of CPO Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-blue-600/5 to-purple-600/5">
            <CardHeader>
              <CardTitle className="text-center">La Evolución del Rol del CPO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {rolCPO.map((item, index) => (
                  <motion.div
                    key={item.aspecto}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-lg bg-background/50"
                  >
                    <item.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                    <p className="text-sm text-muted-foreground line-through mb-1">{item.aspecto}</p>
                    <ArrowUp className="h-4 w-4 mx-auto text-emerald-500 my-1" />
                    <p className="font-semibold text-foreground">{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
