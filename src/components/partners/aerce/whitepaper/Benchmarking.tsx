import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, TrendingUp, Users, Euro, 
  Building2, Award, ArrowUpRight, Briefcase 
} from "lucide-react";

const datosEstudioSalarial = [
  { nivel: "Buyer Junior", salarioMin: 28, salarioMax: 38, mediana: 33 },
  { nivel: "Buyer Senior", salarioMin: 38, salarioMax: 52, mediana: 45 },
  { nivel: "Category Manager", salarioMin: 52, salarioMax: 75, mediana: 62 },
  { nivel: "Procurement Manager", salarioMin: 75, salarioMax: 100, mediana: 85 },
  { nivel: "CPO / Director", salarioMin: 100, salarioMax: 180, mediana: 130 },
];

const factoresImpactoSalario = [
  { factor: "Certificación UNE 15896", impacto: "+15-25%" },
  { factor: "Master en Compras", impacto: "+10-20%" },
  { factor: "Experiencia internacional", impacto: "+15-30%" },
  { factor: "Sector (Pharma/Tech)", impacto: "+20-35%" },
  { factor: "Gestión de equipos >10", impacto: "+15-25%" },
  { factor: "Idiomas (3+)", impacto: "+10-15%" },
];

const tendenciasSectoriales = [
  { sector: "Tecnología", crecimiento: "+8%", demanda: "Muy Alta" },
  { sector: "Farmacéutico", crecimiento: "+6%", demanda: "Alta" },
  { sector: "Automoción", crecimiento: "+4%", demanda: "Alta" },
  { sector: "Retail", crecimiento: "+3%", demanda: "Media-Alta" },
  { sector: "Industrial", crecimiento: "+5%", demanda: "Alta" },
];

export const Benchmarking = () => {
  const maxSalario = 180;
  
  return (
    <div className="py-16 px-4 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
            10 — Benchmarking Salarial
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            Estudio de Retribución en Compras 2025
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            AERCE publica anualmente el estudio salarial más completo del sector, 
            con datos de más de 1.500 profesionales en España y Portugal.
          </p>
        </motion.div>

        {/* Salary Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Euro className="h-6 w-6 text-blue-600" />
                <CardTitle>Bandas Salariales por Nivel (k€ brutos/año)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {datosEstudioSalarial.map((nivel, index) => (
                  <motion.div
                    key={nivel.nivel}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{nivel.nivel}</span>
                      <span className="text-sm text-muted-foreground">
                        {nivel.salarioMin}k - {nivel.salarioMax}k€
                      </span>
                    </div>
                    <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                      {/* Range bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ 
                          width: `${((nivel.salarioMax - nivel.salarioMin) / maxSalario) * 100}%`,
                          marginLeft: `${(nivel.salarioMin / maxSalario) * 100}%`
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      />
                      {/* Median marker */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        className="absolute top-0 bottom-0 w-0.5 bg-amber-500"
                        style={{ left: `${(nivel.mediana / maxSalario) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Mediana: {nivel.mediana}k€</span>
                      <span>P90: {nivel.salarioMax}k€</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Salary Impact Factors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-base">Factores de Impacto Salarial</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {factoresImpactoSalario.map((item, index) => (
                    <motion.div
                      key={item.factor}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                    >
                      <span className="text-sm">{item.factor}</span>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-600/30">
                        {item.impacto}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sector Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-base">Tendencias por Sector 2025</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tendenciasSectoriales.map((sector, index) => (
                    <motion.div
                      key={sector.sector}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                    >
                      <span className="text-sm font-medium">{sector.sector}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {sector.demanda}
                        </Badge>
                        <span className="text-sm text-emerald-600 font-medium flex items-center">
                          <ArrowUpRight className="h-3 w-3" />
                          {sector.crecimiento}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-200/50">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="p-4 rounded-xl bg-amber-500/10">
                  <Award className="h-10 w-10 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">El Valor de la Certificación</h3>
                  <p className="text-muted-foreground">
                    Los profesionales con certificación UNE 15896 perciben entre un 
                    <span className="font-bold text-foreground"> 15% y 25% más </span>
                    que sus homólogos no certificados en el mismo nivel de experiencia.
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-600">+20%</p>
                  <p className="text-sm text-muted-foreground">Premium salarial medio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
