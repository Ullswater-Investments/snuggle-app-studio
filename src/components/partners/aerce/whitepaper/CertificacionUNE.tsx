import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, CheckCircle2, FileCheck, Globe, 
  Shield, Star, Target, Users 
} from "lucide-react";

const beneficiosCertificacion = [
  {
    icon: Globe,
    titulo: "Reconocimiento Internacional",
    descripcion: "La certificación UNE 15896 está armonizada con el estándar IFPSM, reconocido en más de 50 países."
  },
  {
    icon: Shield,
    titulo: "Validación de Competencias",
    descripcion: "Demuestra dominio en 40+ competencias específicas evaluadas por auditores independientes."
  },
  {
    icon: Target,
    titulo: "Diferenciación Profesional",
    descripcion: "Te posiciona como referente en un mercado donde menos del 5% de profesionales están certificados."
  },
  {
    icon: Star,
    titulo: "Desarrollo Continuo",
    descripcion: "Acceso a formación exclusiva y red de profesionales certificados para networking cualificado."
  }
];

const procesoCertificacion = [
  { paso: 1, titulo: "Solicitud", descripcion: "Presentación de expediente académico y profesional" },
  { paso: 2, titulo: "Evaluación", descripcion: "Análisis de competencias y experiencia documentada" },
  { paso: 3, titulo: "Examen", descripcion: "Prueba teórico-práctica supervisada por AENOR" },
  { paso: 4, titulo: "Auditoría", descripcion: "Entrevista y validación de competencias en casos reales" },
  { paso: 5, titulo: "Certificación", descripcion: "Emisión del certificado UNE 15896 por AENOR" },
  { paso: 6, titulo: "Renovación", descripcion: "Mantenimiento mediante formación continua (cada 3 años)" }
];

const nivelesUNE = [
  { nivel: "A", nombre: "Profesional Certificado", requisitos: "3+ años experiencia, formación específica" },
  { nivel: "B", nombre: "Senior Certificado", requisitos: "7+ años experiencia, liderazgo demostrado" },
  { nivel: "C", nombre: "Director Certificado", requisitos: "12+ años, rol C-Level, impacto estratégico" }
];

export const CertificacionUNE = () => {
  return (
    <div className="py-16 px-4 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
            04 — Certificación UNE 15896
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            El Estándar Europeo de Excelencia
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            La única norma europea que certifica las competencias del profesional de Compras, 
            desarrollada por AERCE y auditada por AENOR bajo el sello IFPSM.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {beneficiosCertificacion.map((beneficio, index) => (
            <motion.div
              key={beneficio.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-emerald-200/50 hover:border-emerald-400 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 p-3 rounded-xl bg-emerald-500/10">
                      <beneficio.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{beneficio.titulo}</h3>
                      <p className="text-muted-foreground text-sm">{beneficio.descripcion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certification Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600/10 to-emerald-600/10">
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-blue-600" />
                <CardTitle>Niveles de Certificación UNE 15896</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {nivelesUNE.map((nivel, index) => (
                  <motion.div
                    key={nivel.nivel}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border bg-muted/30 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
                      {nivel.nivel}
                    </div>
                    <h4 className="font-semibold mb-2">{nivel.nombre}</h4>
                    <p className="text-xs text-muted-foreground">{nivel.requisitos}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Certification Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileCheck className="h-6 w-6 text-emerald-600" />
                <CardTitle>Proceso de Certificación</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {procesoCertificacion.map((paso, index) => (
                  <motion.div
                    key={paso.paso}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
                      {paso.paso}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{paso.titulo}</p>
                      <p className="text-xs text-muted-foreground">{paso.descripcion}</p>
                    </div>
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
