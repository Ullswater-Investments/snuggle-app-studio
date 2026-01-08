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
            Programa Red.es + Kit Digital
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            La Unión Europea impulsa tu acceso a la{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Economía del Dato
            </span>
          </h3>
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
    title: "Opción A: Estándar",
    value: "15.000€",
    color: "cyan",
    features: [
      "Conector IDS/Gaia-X certificado",
      "Wallet de Identidad Soberana",
      "Asociación y Formación especializada"
    ]
  };

  const optionB = {
    title: "Opción B: Early Adopter",
    value: "hasta 30.000€",
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
          Cubre el 100% de ambas opciones
        </Badge>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Opción A */}
        <Card className="relative overflow-hidden bg-white border-slate-200 hover:border-cyan-300 transition-colors shadow-lg hover:shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400" />
          <CardHeader className="text-center pb-4">
            <Badge className="w-fit mx-auto mb-2 bg-cyan-100 text-cyan-700 border-cyan-200">
              Valorado en {optionA.value}
            </Badge>
            <CardTitle className="text-xl text-slate-900">{optionA.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {optionA.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-slate-200">
              <div className="text-center p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200">
                <p className="text-sm text-slate-500 mb-1">Coste final para ti</p>
                <p className="text-4xl font-bold text-cyan-600">0 €</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Opción B - Featured */}
        <Card className="relative overflow-hidden bg-white border-purple-200 hover:border-purple-400 transition-colors shadow-lg hover:shadow-xl ring-2 ring-purple-100">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500" />
          <div className="absolute top-4 right-4">
            <Badge className="bg-purple-600 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Recomendado
            </Badge>
          </div>
          <CardHeader className="text-center pb-4">
            <Badge className="w-fit mx-auto mb-2 bg-purple-100 text-purple-700 border-purple-200">
              Valorado en {optionB.value}
            </Badge>
            <CardTitle className="text-xl text-slate-900">{optionB.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {optionB.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-slate-200">
              <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-fuchsia-100 border border-purple-200">
                <p className="text-sm text-slate-500 mb-1">Coste final para ti</p>
                <p className="text-4xl font-bold text-purple-600">0 €</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

// Bloque 3: El Efecto Red - Economía del Dato
const NetworkEffectBlock = () => {
  const companies = [
    Building, Factory, Warehouse, Building, Factory,
    Warehouse, Building, Factory, Warehouse, Building,
    Factory, Warehouse, Building, Factory, Warehouse
  ];

  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
          Efecto Multiplicador
        </Badge>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
          El <span className="text-emerald-600">Efecto Red</span> de la Economía del Dato
        </h3>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
          Cada subvención individual contribuye a un ecosistema de <strong>datos compartidos e IA federada</strong> que beneficia a todos
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-6 items-center">
        {/* Empresas */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-lg">
          <p className="text-sm text-slate-600 text-center mb-4 font-medium">15-20 empresas participantes</p>
          <div className="grid grid-cols-5 gap-3">
            {companies.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm"
              >
                <Icon className="h-5 w-5 text-cyan-600" />
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center mt-3">Subvención Kit Digital individual</p>
        </div>

        {/* Flechas */}
        <div className="flex lg:flex-col items-center gap-2 py-4">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="hidden lg:flex items-center"
          >
            <ArrowRight className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <div className="lg:hidden flex items-center rotate-90">
            <ArrowRight className="h-8 w-8 text-emerald-500" />
          </div>
        </div>

        {/* Fondo Común */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 shadow-lg">
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-4"
            >
              <Euro className="h-10 w-10 text-emerald-600" />
            </motion.div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Fondo Común de Desarrollo</h4>
            <p className="text-3xl font-bold text-emerald-600">150K€ - 300K€</p>
          </div>
        </div>
      </div>

      {/* Resultados - Economía del Dato */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-lg flex items-center gap-4">
          <div className="p-3 rounded-lg bg-cyan-100">
            <Database className="h-6 w-6 text-cyan-600" />
          </div>
          <div>
            <h5 className="font-semibold text-slate-900">Fuentes de Datos Fiables</h5>
            <p className="text-sm text-slate-600">Datos certificados, trazables y de alta calidad</p>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-lg flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-100">
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h5 className="font-semibold text-slate-900">IA Federada de Calidad</h5>
            <p className="text-sm text-slate-600">Modelos entrenados con datos soberanos y verificados</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Bloque 4: Timeline Sin Burocracia
const SimplifiedTimelineBlock = () => {
  const steps = [
    {
      number: 1,
      title: "Adhesión",
      description: "Firmas la carta de interés",
      icon: FileSignature,
      color: "cyan"
    },
    {
      number: 2,
      title: "Tramitación Integral",
      description: "ProcureData gestiona toda la burocracia con Red.es por ti",
      icon: Settings,
      color: "lime",
      highlighted: true
    },
    {
      number: 3,
      title: "Implementación",
      description: "Desplegamos la tecnología y empezamos",
      icon: Rocket,
      color: "purple"
    }
  ];

  return (
    <motion.div variants={itemVariants} className="space-y-8">
      <div className="text-center">
        <Badge className="mb-4 bg-lime-100 text-lime-700 border-lime-200">
          Proceso Simplificado
        </Badge>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
          Tu Camino <span className="text-lime-600">Sin Burocracia</span>
        </h3>
      </div>

      {/* Timeline */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`relative p-6 rounded-2xl border transition-all shadow-lg ${
              step.highlighted
                ? "bg-gradient-to-br from-lime-50 to-emerald-50 border-lime-300 ring-2 ring-lime-200 scale-105"
                : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl"
            }`}
          >
            {/* Connector lines */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 md:-right-6 w-6 md:w-12 h-0.5 bg-gradient-to-r from-slate-300 to-transparent" />
            )}

            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                step.highlighted
                  ? "bg-lime-200"
                  : step.color === "cyan" ? "bg-cyan-100" : "bg-purple-100"
              }`}>
                <step.icon className={`h-8 w-8 ${
                  step.highlighted
                    ? "text-lime-700"
                    : step.color === "cyan" ? "text-cyan-600" : "text-purple-600"
                }`} />
              </div>
              
              <Badge variant="outline" className={`mb-2 ${
                step.highlighted
                  ? "border-lime-400 text-lime-700 bg-lime-50"
                  : "border-slate-300 text-slate-600"
              }`}>
                Paso {step.number}
              </Badge>
              
              <h4 className={`text-lg font-bold mb-2 ${
                step.highlighted ? "text-lime-700" : "text-slate-900"
              }`}>
                {step.title}
              </h4>
              
              <p className="text-sm text-slate-600">{step.description}</p>

              {step.highlighted && (
                <Badge className="mt-3 bg-lime-100 text-lime-700 border-lime-200">
                  <Users className="h-3 w-3 mr-1" />
                  Nosotros lo hacemos
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Urgency CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border border-amber-200 shadow-lg"
      >
        <div className="flex items-center gap-2 text-amber-700">
          <AlertTriangle className="h-5 w-5 animate-pulse" />
          <span className="font-semibold">Convocatoria Limitada</span>
        </div>
        <p className="text-slate-700 text-center sm:text-left">
          Plazas restringidas por convocatoria. ¡Reserva la tuya ahora!
        </p>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-lg">
          <Rocket className="h-4 w-4 mr-2" />
          Reservar Plaza
        </Button>
      </motion.div>
    </motion.div>
  );
};

export const DataSpaceKitSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-16 md:space-y-24"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 px-4 py-1">
              <Globe className="h-4 w-4 mr-2" />
              🇪🇺 Fondos Europeos para la Innovación
            </Badge>
            <img 
              src={kitEspaciosDatosLogo} 
              alt="Kit Espacios de Datos" 
              className="h-32 md:h-40 mx-auto mb-6 object-contain"
            />
            <p className="text-lg text-slate-600">
              La Unión Europea financia tu entrada a la nueva era de datos fiables, 
              gobernanza transparente e inteligencia artificial de calidad
            </p>
          </motion.div>

          {/* Bloque 1: Hero Economía del Dato */}
          <DataEconomyHeroBlock />

          {/* Bloque 2: Las Dos Vías */}
          <PricingComparisonBlock />

          {/* Bloque 3: Efecto Red */}
          <NetworkEffectBlock />

          {/* Bloque 4: Timeline */}
          <SimplifiedTimelineBlock />
        </motion.div>
      </div>
    </section>
  );
};
