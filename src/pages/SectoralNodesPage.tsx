import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Wallet, 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  Download,
  Network,
  Globe,
  Coins,
  FileCode,
  Fingerprint,
  Layers,
  Sparkles,
  Target,
  Clock,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FundingFooter } from '@/components/FundingFooter';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

const SectoralNodesPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const promoterBenefits = [
    {
      icon: Layers,
      title: "Marketplace Propio",
      description: "Decide qué datasets y servicios se publican en tu catálogo privado.",
      link: "/nodos/marketplace"
    },
    {
      icon: ShieldCheck,
      title: "Políticas ODRL",
      description: "Define reglas de compartición específicas para tu industria.",
      link: "/nodos/odrl"
    },
    {
      icon: Coins,
      title: "Monetización",
      description: "Establece comisiones por transacción y vende servicios de valor añadido.",
      link: "/nodos/monetizacion"
    },
    {
      icon: Sparkles,
      title: "Marca Blanca",
      description: "Personalización con tu logo e identidad, powered by ProcureData.",
      link: "/nodos/marca-blanca"
    }
  ];

  const inheritedFeatures = [
    { icon: Fingerprint, label: "Identidad Soberana (DID)", link: "/nodos/identidad-did" },
    { icon: FileCode, label: "Smart Contracts", link: "/nodos/smart-contracts" },
    { icon: Wallet, label: "Pagos EUROe", link: "/nodos/pagos-euroe" },
    { icon: Network, label: "Conectores ERP", link: "/nodos/conectores-erp" },
    { icon: ShieldCheck, label: "Gobernanza IDSA", link: "/nodos/gobernanza-idsa" },
    { icon: Server, label: "Multi-Tenant RLS", link: "/nodos/multi-tenant-rls" }
  ];

  const roadmapSteps = [
    {
      step: 1,
      title: "Firma de MOU",
      description: "Acuerdo de intenciones y pago de reserva (anticipos recuperables)."
    },
    {
      step: 2,
      title: "Solicitud Conjunta",
      description: "El equipo de PROCUREDATA prepara la memoria técnica para la SEDIA."
    },
    {
      step: 3,
      title: "Despliegue Técnico",
      description: "Una vez concedida la ayuda, desplegamos tu Nodo en 4 semanas."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <ProcuredataLogo className="h-8" />
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/auth">
              <Button variant="outline" size="sm">Acceder</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-background to-background dark:from-orange-950/20" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800">
              <ShieldCheck className="h-3 w-3 mr-1" />
              Homologado por SEDIA (Secretaría de Estado de Digitalización e IA)
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Lidera la Economía del Dato{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                en tu Sector
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Crea tu propio <strong>Nodo Soberano</strong> en PROCUREDATA. 
              Infraestructura tecnológica financiada al <strong>100%</strong> por el programa{' '}
              <span className="text-orange-600 dark:text-orange-400">Kit Espacio de Datos</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white" asChild>
                <Link to="/nodos/requisitos">
                  Solicitar Estudio de Nodo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/nodos/tecnologia">
                  <Network className="mr-2 h-4 w-4" />
                  Ver Arquitectura Técnica
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT IS A NODE - Ocean vs Island */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Text Column */}
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-4">Concepto</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tu Isla Privada en un Océano de Datos
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Los <strong>Nodos Propietarios</strong> permiten a Clústers, Asociaciones y Grandes Empresas 
                crear su propio espacio delimitado dentro de PROCUREDATA. Mantén gobernanza total 
                aprovechando nuestra tecnología ya validada.
              </p>
              <ul className="space-y-3">
                {[
                  "Gobernanza total sobre el catálogo de datos.",
                  "Políticas de compartición privadas (ODRL).",
                  "Comisiones propias por transferencia de datos.",
                  "Marca blanca 'Powered by ProcureData'."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Visual Column */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2 border-orange-200 dark:border-orange-800/50 bg-gradient-to-br from-orange-50/50 to-background dark:from-orange-950/20">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Infraestructura Validada
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-center gap-8 mb-8">
                    {/* Global */}
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 mx-auto">
                        <Globe className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="font-semibold text-sm">ProcureData Global</p>
                      <p className="text-xs text-muted-foreground">Océano abierto</p>
                    </div>

                    {/* Connection Arrow */}
                    <div className="flex flex-col items-center gap-1">
                      <Network className="h-6 w-6 text-orange-500" />
                      <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-orange-500" />
                      <span className="text-xs text-muted-foreground">Federado</span>
                    </div>

                    {/* Your Node */}
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-3 mx-auto ring-4 ring-orange-500/20">
                        <Server className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="font-semibold text-sm">Tu Nodo Sectorial</p>
                      <p className="text-xs text-muted-foreground">Isla privada</p>
                    </div>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    Aprovecha nuestra tecnología (Blockchain, IDSA, Web3) bajo tus propias reglas de negocio.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS FOR PROMOTER */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">Ventajas</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ventajas para el Promotor
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Al adquirir un Nodo, obtienes gobernanza total sobre tu ecosistema de datos.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {promoterBenefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link to={benefit.link}>
                  <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-orange-200 dark:hover:border-orange-800/50 group cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <benefit.icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {benefit.title}
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* INHERITED FEATURES */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">Tecnología</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Funcionalidades Heredadas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tu Nodo nace con toda la potencia de PROCUREDATA v3.1 desde el día 1.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {inheritedFeatures.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center gap-2 bg-background border rounded-full px-4 py-2 shadow-sm hover:border-orange-400 hover:shadow-md transition-all cursor-pointer"
                >
                  <feature.icon className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINANCIAL MODEL */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
              Financiación NextGenerationEU
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Coste Cero para tu Ecosistema
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gracias al programa <strong>KIT ESPACIO DE DATOS</strong>, subvencionamos el 100% de la creación del nodo.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Promoter Card */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-orange-200 dark:border-orange-800/50 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white text-center">
                  <Building2 className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="text-xl font-bold">Entidad Promotora</h3>
                  <p className="text-orange-100 text-sm">Para Clústers y Asociaciones</p>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Coste de Creación</span>
                    <span className="font-semibold">30.000 €</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Subvención SEDIA</span>
                    <span className="font-semibold text-green-600">- 30.000 €</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-green-50 dark:bg-green-900/20 rounded-lg px-3">
                    <span className="font-bold">Coste Final</span>
                    <span className="text-2xl font-bold text-green-600">0 €</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    Condición: Pago anticipado de 5.000€ (recuperable al 100% con la ayuda).
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Participant Card */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-primary/20 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground text-center">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="text-xl font-bold">Empresas Adheridas</h3>
                  <p className="text-primary-foreground/80 text-sm">Mínimo 5 empresas requeridas</p>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Coste por Empresa</span>
                    <span className="font-semibold">7.000 €</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Subvención SEDIA</span>
                    <span className="font-semibold text-green-600">- 7.000 €</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-green-50 dark:bg-green-900/20 rounded-lg px-3">
                    <span className="font-bold">Coste Final</span>
                    <span className="text-2xl font-bold text-green-600">0 €</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    Condición: Pago anticipado de 2.000€ (recuperable al 100% con la ayuda).
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-center text-sm text-muted-foreground mt-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            * El pago por anticipado se incluye como gasto subvencionable, lo que significa que el solicitante 
            recupera el dinero anticipado íntegramente cuando recibe la subvención.
          </motion.p>
        </div>
      </section>

      {/* REQUIREMENTS & ROADMAP */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">Requisitos</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Requisitos para Activar un Nodo
              </h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Entidad Promotora</h4>
                      <p className="text-sm text-muted-foreground">Capacidad jurídica para facturar y gestionar el nodo.</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Ecosistema</h4>
                      <p className="text-sm text-muted-foreground">Carta de adhesión firmada por al menos 5 empresas tractoras/participantes.</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Plazos</h4>
                      <p className="text-sm text-muted-foreground">La solicitud debe presentarse dentro de los plazos de la convocatoria vigente.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Roadmap */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">Roadmap</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Proceso de Activación
              </h2>
              <div className="space-y-6">
                {roadmapSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      {index < roadmapSteps.length - 1 && (
                        <div className="w-0.5 h-12 bg-orange-200 dark:bg-orange-800 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-semibold text-lg">{step.title}</h4>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Target className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Tienes un Ecosistema?
            </h2>
            <p className="text-orange-100 mb-8 text-lg">
              Si representas a un clúster o asociación con al menos 5 empresas interesadas, 
              podemos desplegar tu Nodo en menos de 4 semanas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-orange-600">
                Contactar con Equipo de Nodos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-4 w-4" />
                Ver Memoria Técnica SEDIA
              </Button>
            </div>
            <p className="text-orange-200 text-sm mt-6">
              Te ayudamos con la memoria técnica para la solicitud SEDIA.
            </p>
          </motion.div>
        </div>
      </section>

      <FundingFooter />
    </div>
  );
};

export default SectoralNodesPage;
