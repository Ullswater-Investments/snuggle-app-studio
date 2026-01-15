import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, Recycle, Scale, FileCheck, 
  TrendingDown, Globe, Shield, CheckCircle2 
} from "lucide-react";

const pilaresSostenibilidad = [
  {
    icon: Leaf,
    titulo: "Environmental",
    descripcion: "Huella de carbono de proveedores, eficiencia energética, gestión de residuos y economía circular.",
    kpi: "Scope 3 Emissions",
    color: "emerald"
  },
  {
    icon: Scale,
    titulo: "Social",
    descripcion: "Derechos laborales, diversidad en la cadena, impacto en comunidades locales y condiciones de trabajo.",
    kpi: "Social Audit Score",
    color: "blue"
  },
  {
    icon: Shield,
    titulo: "Governance",
    descripcion: "Ética empresarial, anticorrupción, transparencia fiscal y gestión de riesgos ESG.",
    kpi: "ESG Rating",
    color: "purple"
  }
];

const normativasESG = [
  { nombre: "CSRD", descripcion: "Corporate Sustainability Reporting Directive", tipo: "Obligatorio 2025" },
  { nombre: "CSDDD", descripcion: "Due Diligence en Cadena de Suministro", tipo: "Obligatorio 2026" },
  { nombre: "Taxonomía UE", descripcion: "Clasificación de actividades sostenibles", tipo: "Vigente" },
  { nombre: "SFDR", descripcion: "Sustainable Finance Disclosure Regulation", tipo: "Vigente" }
];

const competenciasESG = [
  "Evaluación de riesgos ESG en proveedores",
  "Cálculo de huella de carbono Scope 3",
  "Due diligence en cadena de suministro",
  "Reporting según estándares GRI/SASB",
  "Auditorías sociales y ambientales",
  "Integración de criterios ESG en sourcing",
  "Economía circular y ecodiseño",
  "Certificaciones ambientales (ISO 14001, B Corp)"
];

export const Sostenibilidad = () => {
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
            06 — Sostenibilidad en Compras
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            El CPO como Agente del Cambio ESG
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            El 70% del impacto ambiental de una empresa se genera en su cadena de suministro. 
            El CPO es clave para alcanzar los objetivos de sostenibilidad corporativos.
          </p>
        </motion.div>

        {/* ESG Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pilaresSostenibilidad.map((pilar, index) => (
            <motion.div
              key={pilar.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full border-${pilar.color}-200/50 hover:border-${pilar.color}-400 transition-colors`}>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-${pilar.color}-500/10 flex items-center justify-center mx-auto mb-3`}>
                    <pilar.icon className={`h-8 w-8 text-${pilar.color}-600`} />
                  </div>
                  <CardTitle>{pilar.titulo}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">{pilar.descripcion}</p>
                  <Badge variant="outline" className={`text-${pilar.color}-600 border-${pilar.color}-600/30`}>
                    KPI: {pilar.kpi}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Regulations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileCheck className="h-6 w-6 text-blue-600" />
                <CardTitle>Marco Normativo Europeo ESG</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Las regulaciones que impactan directamente en la función de Compras
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {normativasESG.map((normativa, index) => (
                  <motion.div
                    key={normativa.nombre}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="shrink-0">
                      <Badge variant="secondary" className="font-mono">
                        {normativa.nombre}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{normativa.descripcion}</p>
                      <p className="text-xs text-emerald-600">{normativa.tipo}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ESG Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-emerald-600/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-emerald-600" />
                <CardTitle>Competencias ESG del CPO Moderno</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Habilidades clave para liderar la transformación sostenible
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {competenciasESG.map((competencia, index) => (
                  <motion.div
                    key={competencia}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{competencia}</span>
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
