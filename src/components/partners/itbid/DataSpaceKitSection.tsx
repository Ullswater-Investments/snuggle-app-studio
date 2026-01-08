import { motion } from "framer-motion";
import { 
  Euro, 
  CheckCircle2, 
  Building, 
  Factory, 
  Warehouse,
  FileSignature,
  Settings,
  Rocket,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Users,
  Database,
  Brain,
  Shield,
  Zap,
  Network,
  TrendingUp,
  Globe,
  BadgeCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import kitEspaciosDatosLogo from "@/assets/kit-espacios-datos-logo.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Bloque 1: Hero Economía del Dato
const DataEconomyHeroBlock = () => {
  const pillars = [
    { icon: Database, label: "Datos Fiables", desc: "Fuentes verificadas y trazables", color: "cyan" },
    { icon: Brain, label: "IA de Calidad", desc: "Modelos con datos soberanos", color: "purple" },
    { icon: Shield, label: "Confianza", desc: "Gobernanza transparente", color: "emerald" },
    { icon: Zap, label: "Velocidad", desc: "Time-to-market acelerado", color: "amber" }
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-50 via-white to-purple-50 p-8 md:p-12 border border-slate-200 shadow-xl"
    >
      {/* EU Flag decoration */}
      <div className="absolute top-6 right-6 flex items-center gap-2 text-blue-600">
        <Globe className="h-5 w-5" />
        <span className="text-sm font-medium">🇪🇺 Fondos Europeos</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            <Euro className="h-3 w-3 mr-1" />
            SUBVENCIÓN KIT ESPACIO DE DATOS
          </Badge>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Los fondos europeos financian tu participación en la nueva era de{" "}
            <strong className="text-cyan-700">datos fiables</strong> e{" "}
            <strong className="text-purple-700">inteligencia artificial de calidad</strong>
          </p>
        </div>

        {/* 4 Pillars Visual */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-5 rounded-2xl bg-white border shadow-lg hover:shadow-xl transition-shadow ${
                pillar.color === "cyan" ? "border-cyan-200 hover:border-cyan-300" :
                pillar.color === "purple" ? "border-purple-200 hover:border-purple-300" :
                pillar.color === "emerald" ? "border-emerald-200 hover:border-emerald-300" :
                "border-amber-200 hover:border-amber-300"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                pillar.color === "cyan" ? "bg-cyan-100" :
                pillar.color === "purple" ? "bg-purple-100" :
                pillar.color === "emerald" ? "bg-emerald-100" :
                "bg-amber-100"
              }`}>
                <pillar.icon className={`h-6 w-6 ${
                  pillar.color === "cyan" ? "text-cyan-600" :
                  pillar.color === "purple" ? "text-purple-600" :
                  pillar.color === "emerald" ? "text-emerald-600" :
                  "text-amber-600"
                }`} />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{pillar.label}</h4>
              <p className="text-sm text-slate-500">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Data flow animation */}
        <motion.div 
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Network className="h-5 w-5 text-cyan-600" />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-1"
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
            ))}
          </motion.div>
          <TrendingUp className="h-5 w-5 text-purple-600" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Bloque 2: Las Dos Vías a Coste Cero
const PricingComparisonBlock = () => {
  const optionA = {
    title: "Adhesión Espacio de datos PROCUREDATA",
    value: "15.000€",
    color: "cyan",
    features: [
      "Conector IDS/Gaia-X certificado",
      "Wallet de Identidad Soberana",
      "Asociación y Formación especializada"
    ]
  };

  const optionB = {
    title: "Adhesión + Caso de uso",
    value: "30.000€",
    color: "purple",
    featured: true,
    features: [
      "Todo incluido de la Opción A",
      "Consultoría personalizada de Caso de Uso",
      "Desarrollo a Medida (API/IoT)",
      "Visibilidad como Pionero del ecosistema"
    ]
  };

  return (
    <motion.div variants={itemVariants} className="space-y-8">
      {/* Flujo de dinero público */}
      <div className="flex flex-wrap items-center justify-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border border-blue-200">
        <div className="flex items-center gap-2 text-blue-700">
          <Globe className="h-5 w-5" />
          <span className="font-semibold">🇪🇺 Fondos Públicos Red.es</span>
        </div>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center gap-1 text-blue-500"
        >
          <ArrowRight className="h-5 w-5" />
          <ArrowRight className="h-5 w-5" />
          <ArrowRight className="h-5 w-5" />
        </motion.div>
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
          <BadgeCheck className="h-3 w-3 mr-1" />
          AYUDAS 100% A FONDO PERDIDO
        </Badge>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Opción A */}
        <Card className="relative overflow-hidden bg-white border-slate-200 hover:border-cyan-300 transition-colors shadow-lg hover:shadow-xl h-full flex flex-col">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400" />
          <CardHeader className="text-center pb-4">
            <Badge className="w-fit mx-auto mb-2 bg-cyan-100 text-cyan-700 border-cyan-200 text-lg px-4 py-2">
              SUBVENCIÓN DE {optionA.value}
            </Badge>
            <CardTitle className="text-xl text-slate-900">{optionA.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <ul className="space-y-3">
              {optionA.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-slate-200 mt-auto">
              <div className="text-center p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200">
                <p className="text-sm text-slate-500 mb-1">Coste inicial Solicitud Kit Espacio de Datos</p>
                <p className="text-4xl font-bold text-cyan-600">2.000€</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Opción B - Featured */}
        <Card className="relative overflow-hidden bg-white border-purple-200 hover:border-purple-400 transition-colors shadow-lg hover:shadow-xl ring-2 ring-purple-100 h-full flex flex-col">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500" />
          <div className="absolute top-4 right-4">
            <Badge className="bg-purple-600 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Recomendado
            </Badge>
          </div>
          <CardHeader className="text-center pb-4">
            <Badge className="w-fit mx-auto mb-2 bg-purple-100 text-purple-700 border-purple-200 text-lg px-4 py-2">
              SUBVENCIÓN DE {optionB.value}
            </Badge>
            <CardTitle className="text-xl text-slate-900">{optionB.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <ul className="space-y-3">
              {optionB.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-slate-200 mt-auto">
              <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-fuchsia-100 border border-purple-200">
                <p className="text-sm text-slate-500 mb-1">Coste inicial Solicitud Kit Espacio de Datos</p>
                <p className="text-4xl font-bold text-purple-600">5.000€</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};



export const DataSpaceKitSection = () => {
  return (
    <section className="pt-6 pb-16 md:pb-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-16 md:space-y-24"
        >

          {/* Bloque 1: Hero Economía del Dato */}
          <DataEconomyHeroBlock />

          {/* Bloque 2: Las Dos Vías */}
          <PricingComparisonBlock />


        </motion.div>
      </div>
    </section>
  );
};
