import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, TrendingUp, Award, Quote, 
  CheckCircle2, Star, Users, Leaf 
} from "lucide-react";

const casosExito = [
  {
    empresa: "Multinacional Industrial",
    sector: "Automoción",
    reto: "Profesionalizar un equipo de 40 compradores sin formación específica en Compras.",
    solucion: "Programa in-company AERCE de 120 horas + certificación UNE 15896 para managers.",
    resultados: [
      { metrica: "25%", descripcion: "Reducción coste total" },
      { metrica: "18", descripcion: "Profesionales certificados" },
      { metrica: "40%", descripcion: "Mejora satisfacción interna" }
    ],
    testimonio: "AERCE nos ayudó a transformar Compras de un centro de costes a un partner estratégico del negocio.",
    rol: "CPO",
    color: "blue"
  },
  {
    empresa: "Grupo Distribución",
    sector: "Retail",
    reto: "Implementar criterios ESG en una base de 2.000 proveedores.",
    solucion: "Formación especializada en sostenibilidad + metodología de evaluación ESG.",
    resultados: [
      { metrica: "85%", descripcion: "Proveedores evaluados ESG" },
      { metrica: "30%", descripcion: "Reducción huella carbono" },
      { metrica: "A", descripcion: "Rating CDP alcanzado" }
    ],
    testimonio: "La formación de AERCE en ESG fue clave para liderar nuestra transformación sostenible.",
    rol: "Director Sostenibilidad",
    color: "emerald"
  },
  {
    empresa: "Farmacéutica Nacional",
    sector: "Healthcare",
    reto: "Desarrollar talento interno para evitar dependencia de consultoras externas.",
    solucion: "Master Executive EADA-AERCE para 8 directivos + mentoring personalizado.",
    resultados: [
      { metrica: "€2M", descripcion: "Ahorro consultoría anual" },
      { metrica: "3", descripcion: "Promociones a Director" },
      { metrica: "95%", descripcion: "Retención talento clave" }
    ],
    testimonio: "Invertir en formación AERCE generó un ROI de 5x en el primer año.",
    rol: "CHRO",
    color: "purple"
  }
];

export const CasosExito = () => {
  return (
    <div className="py-16 px-4 bg-muted/30 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">
            09 — Casos de Éxito
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            Impacto Real en Organizaciones
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            Empresas líderes que han transformado su función de Compras con la ayuda 
            de los programas de formación y certificación de AERCE.
          </p>
        </motion.div>

        {/* Success Stories */}
        <div className="space-y-8">
          {casosExito.map((caso, index) => (
            <motion.div
              key={caso.empresa}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className={`overflow-hidden border-l-4 border-l-${caso.color}-500`}>
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-${caso.color}-500/10`}>
                        <Building2 className={`h-6 w-6 text-${caso.color}-600`} />
                      </div>
                      <div>
                        <CardTitle>{caso.empresa}</CardTitle>
                        <Badge variant="outline" className="mt-1">{caso.sector}</Badge>
                      </div>
                    </div>
                    <Award className={`h-8 w-8 text-${caso.color}-500`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Challenge & Solution */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">El Reto</p>
                      <p className="text-sm">{caso.reto}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-600/5 border border-blue-200/50">
                      <p className="text-xs font-semibold text-blue-600 uppercase mb-2">La Solución AERCE</p>
                      <p className="text-sm">{caso.solucion}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Resultados</p>
                    <div className="grid grid-cols-3 gap-4">
                      {caso.resultados.map((resultado) => (
                        <div key={resultado.descripcion} className="text-center p-3 rounded-lg bg-emerald-500/5 border border-emerald-200/50">
                          <p className={`text-2xl font-bold text-${caso.color}-600`}>{resultado.metrica}</p>
                          <p className="text-xs text-muted-foreground">{resultado.descripcion}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="relative p-4 rounded-lg bg-muted/30 border-l-2 border-amber-500">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-amber-500 bg-background rounded-full p-1" />
                    <p className="italic text-muted-foreground mb-2">"{caso.testimonio}"</p>
                    <p className="text-sm font-medium">— {caso.rol}</p>
                  </div>
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
          <Card className="bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-emerald-600/5">
            <CardContent className="py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { valor: "500+", label: "Empresas formadas", icon: Building2 },
                  { valor: "2.000+", label: "Profesionales certificados", icon: Users },
                  { valor: "€50M", label: "Ahorro documentado", icon: TrendingUp },
                  { valor: "4.8/5", label: "Satisfacción media", icon: Star },
                ].map((stat) => (
                  <div key={stat.label}>
                    <stat.icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.valor}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
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
