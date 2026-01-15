import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, BookOpen, Building2, Clock, 
  Users, Award, Star, ArrowRight 
} from "lucide-react";

const programasFormacion = [
  {
    tipo: "Master Executive",
    partner: "EADA Business School",
    duracion: "12 meses",
    modalidad: "Blended",
    descripcion: "Programa executive para directivos de Compras con visión estratégica y liderazgo.",
    destacado: true,
    color: "border-blue-500"
  },
  {
    tipo: "Master Executive",
    partner: "ESIC Business School",
    duracion: "10 meses",
    modalidad: "Presencial / Online",
    descripcion: "Formación integral en gestión de compras y cadena de suministro moderna.",
    destacado: true,
    color: "border-purple-500"
  },
  {
    tipo: "Programa Superior",
    partner: "AERCE Academy",
    duracion: "6 meses",
    modalidad: "Online",
    descripcion: "Especialización en Category Management y estrategia de sourcing.",
    destacado: false,
    color: "border-emerald-500"
  },
  {
    tipo: "Cursos Especializados",
    partner: "AERCE Formación",
    duracion: "8-40 horas",
    modalidad: "Presencial / Online",
    descripcion: "Módulos cortos en negociación, contratos, sostenibilidad y digitalización.",
    destacado: false,
    color: "border-amber-500"
  }
];

const areasFormacion = [
  { nombre: "Estrategia de Compras", horas: 120 },
  { nombre: "Category Management", horas: 80 },
  { nombre: "Negociación Avanzada", horas: 60 },
  { nombre: "Gestión de Proveedores", horas: 50 },
  { nombre: "Sostenibilidad & ESG", horas: 40 },
  { nombre: "Digitalización", horas: 40 },
  { nombre: "Aspectos Legales", horas: 30 },
  { nombre: "Liderazgo & Soft Skills", horas: 30 }
];

export const FormacionExcelencia = () => {
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
            05 — Formación de Excelencia
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            Desarrollo Profesional Continuo
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            AERCE colabora con las mejores escuelas de negocio para ofrecer formación 
            de primer nivel adaptada a cada etapa de la carrera profesional.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {programasFormacion.map((programa, index) => (
            <motion.div
              key={`${programa.partner}-${programa.tipo}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full ${programa.color} border-l-4`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={programa.destacado ? "default" : "secondary"} className="mb-2">
                        {programa.tipo}
                      </Badge>
                      <CardTitle className="text-lg">{programa.partner}</CardTitle>
                    </div>
                    {programa.destacado && (
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{programa.descripcion}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {programa.duracion}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      {programa.modalidad}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Training Areas Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <CardTitle>Áreas de Conocimiento del Programa CPO</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Distribución de horas formativas por área de especialización
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {areasFormacion.map((area, index) => {
                  const percentage = (area.horas / 120) * 100;
                  return (
                    <motion.div
                      key={area.nombre}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{area.nombre}</span>
                        <span className="text-sm text-muted-foreground">{area.horas}h</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.05 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* In-Company */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-blue-600/5 to-purple-600/5">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 rounded-xl bg-blue-600/10">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2">Formación In-Company</h3>
                  <p className="text-muted-foreground">
                    Programas a medida para equipos de Compras. Contenido adaptado a los retos 
                    específicos de cada organización con métricas de impacto.
                  </p>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-600/30">
                  Solicitar propuesta <ArrowRight className="h-3 w-3 ml-1" />
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
