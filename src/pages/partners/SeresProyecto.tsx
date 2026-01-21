import { motion } from "framer-motion";
import { ArrowLeft, FileText, Zap, Shield, Globe, TrendingUp, Users, Building2, CheckCircle, ExternalLink, Receipt, RefreshCw, PackageCheck, Scale, Landmark, Factory, Plane, Radio, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const solutions = [
  {
    icon: Receipt,
    title: "e-Factura",
    description: "Plataformas para emisión y recepción de facturas electrónicas cumpliendo con normativas legales vigentes (Ley Crea y Crece, regulaciones LATAM).",
    tags: ["SII", "TicketBAI", "LATAM"]
  },
  {
    icon: RefreshCw,
    title: "EDI (Electronic Data Interchange)",
    description: "Intercambio estandarizado de documentos comerciales entre socios: pedidos, albaranes, facturas.",
    tags: ["Retail", "Automoción", "B2B"]
  },
  {
    icon: PackageCheck,
    title: "Source to Pay (S2P)",
    description: "Automatización completa del ciclo de compras, desde la solicitud hasta el pago.",
    tags: ["Procurement", "Automatización"]
  },
  {
    icon: TrendingUp,
    title: "Order to Cash (O2C)",
    description: "Soluciones integrales para el ciclo de ventas: desde el pedido hasta el cobro.",
    tags: ["Ventas", "Cash Flow"]
  },
  {
    icon: Scale,
    title: "Reporte Fiscal y Compliance",
    description: "Herramientas adaptadas para SII, TicketBAI y obligaciones fiscales internacionales.",
    tags: ["Compliance", "Fiscal"]
  },
  {
    icon: Building2,
    title: "Integración ERP",
    description: "Conectores nativos con SAP, Oracle y principales ERPs del mercado.",
    tags: ["SAP", "Oracle", "API"]
  }
];

const successStories = [
  {
    sector: "Gran Consumo y Retail",
    icon: Factory,
    companies: [
      { name: "Nestlé", highlight: "+25 años como cliente", description: "EDI para intercambio masivo de documentos" },
      { name: "Covirán", highlight: "SII automatizado", description: "Digitalización de recepción de facturas" },
      { name: "BonÀrea", highlight: "Seguimiento inteligente", description: "Automatización y tracking de facturas" },
      { name: "Choví", highlight: "Eficiencia comercial", description: "Mejora de procesos de facturación" }
    ]
  },
  {
    sector: "Servicios y Telecomunicaciones",
    icon: Radio,
    companies: [
      { name: "Ilunion", highlight: "Recepción automatizada", description: "Automatización de facturas de proveedores" },
      { name: "Atresmedia", highlight: "Gestión documental", description: "Digitalización de procesos documentales" },
      { name: "BT", highlight: "e-Factura AAPP", description: "Emisión de factura electrónica para Administraciones Públicas" }
    ]
  },
  {
    sector: "Industria y Energía",
    icon: Zap,
    companies: [
      { name: "Siemens Gamesa", highlight: "Digitalización proveedores", description: "Optimización de recepción de facturas" },
      { name: "Sonepar", highlight: "Reducción administrativa", description: "Eliminación de tareas improductivas" },
      { name: "Energizer", highlight: "SRI Ecuador", description: "Cumplimiento normativo LATAM" }
    ]
  },
  {
    sector: "Proyectos Internacionales",
    icon: Plane,
    companies: [
      { name: "Amadeus", highlight: "LATAM multipaís", description: "Centralización de facturación electrónica cumpliendo normativas de cada país" }
    ]
  }
];

const valueProps = [
  {
    icon: TrendingUp,
    title: "Reducción de Costes",
    description: "Eliminación de errores manuales y procesos en papel. ROI demostrable en meses."
  },
  {
    icon: Zap,
    title: "Aceleración de Cobros",
    description: "Reducción del DSO (Days Sales Outstanding) gracias a la trazabilidad de facturas."
  },
  {
    icon: Shield,
    title: "Cumplimiento Legal",
    description: "Conformidad con normativas sin necesidad de desarrollo interno complejo."
  }
];

export default function SeresProyecto() {
  const { t } = useTranslation(['partners', 'common']);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <Link to="/partners">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Partners
            </Button>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Grupo Docaposte
            </Badge>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 backdrop-blur-sm">
              Gaia-X Ready
            </Badge>
            <Badge className="bg-blue-400/20 text-blue-200 border-blue-300/30 backdrop-blur-sm">
              +30 años de experiencia
            </Badge>
          </div>

          <motion.div {...fadeIn} className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              SERES
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              Tercero de Confianza para el Intercambio Electrónico Seguro de Documentos
            </p>
            <p className="text-lg text-blue-200/80 max-w-3xl">
              Con más de 30 años de experiencia, SERES facilita la transformación digital de empresas optimizando, automatizando y asegurando los procesos de gestión documental en relaciones B2B, B2G y B2C.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-8 mt-12 max-w-2xl"
          >
            {[
              { value: "+30", label: "Años de experiencia" },
              { value: "+100", label: "Países operativos" },
              { value: "100%", label: "Compliance garantizado" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-blue-200/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Corporate Profile */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <Card className="border-2 border-blue-100 dark:border-blue-900/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Perfil Corporativo</CardTitle>
                    <p className="text-muted-foreground text-sm">Parte del Grupo Docaposte</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">SERES</strong> es una compañía tecnológica pionera y especialista en 
                  <strong className="text-foreground"> Soluciones de Intercambio Electrónico Seguro de Documentos</strong>. 
                  Actúa como un Tercero de Confianza para facilitar la transformación digital de las empresas.
                </p>
                <p>
                  Pertenece al grupo francés <strong className="text-foreground">Docaposte</strong>, 
                  filial digital del Grupo La Poste, lo que le otorga un respaldo internacional sólido y acceso 
                  a tecnologías de vanguardia en identidad digital, archivado certificado y confianza digital.
                </p>
                <p>
                  Su sede principal para Iberia y LATAM tiene un fuerte arraigo en España, operando globalmente 
                  y facilitando la conexión en más de un centenar de países con sus soluciones de compliance 
                  y facturación electrónica.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-12">
            <Badge className="mb-4">Áreas de Actividad</Badge>
            <h2 className="text-3xl font-bold mb-4">Soluciones de Intercambio Digital</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Portafolio completo para eliminar el papel y los procesos manuales, 
              garantizando el cumplimiento normativo en cada país.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {solutions.map((solution, idx) => (
              <motion.div key={idx} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 shrink-0">
                        <solution.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{solution.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{solution.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {solution.tags.map((tag, tagIdx) => (
                        <Badge key={tagIdx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              Casos de Éxito
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Clientes que Confían en SERES</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Empresas líderes de múltiples sectores que han transformado sus procesos documentales.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {successStories.map((sector, idx) => (
              <motion.div key={idx} variants={fadeIn}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        <sector.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{sector.sector}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sector.companies.map((company, compIdx) => (
                        <div key={compIdx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold">{company.name}</span>
                              <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20">
                                {company.highlight}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{company.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-12">
            <Badge className="mb-4">Valor Diferencial</Badge>
            <h2 className="text-3xl font-bold mb-4">¿Por qué SERES?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No solo software: consultoría y acompañamiento en la gestión del cambio digital.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {valueProps.map((prop, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <CardContent className="pt-8">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-4">
                      <prop.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{prop.title}</h3>
                    <p className="text-muted-foreground text-sm">{prop.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCUREDATA Integration */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                Integración Estratégica
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                Gaia-X · Pontus-X
              </Badge>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nodo PROCUREDATA: Puente Soberano hacia los Data Spaces Europeos
            </h2>

            <div className="space-y-6 text-blue-100">
              <p>
                La propuesta de valor de PROCUREDATA se alinea directamente con la estrategia de 
                <strong className="text-white"> soberanía digital de la Unión Europea</strong>. 
                La Data Act busca desbloquear los datos industriales para fomentar la innovación, 
                mientras que el marco Gaia-X establece las reglas de confianza para que este intercambio sea seguro.
              </p>
              
              <p>
                SERES, al adoptar <strong className="text-white">PONTUS-X</strong>, se posiciona automáticamente 
                como un actor compatible con Gaia-X, capaz de interactuar con las Gaia-X Digital Clearing Houses (GXDCH) 
                para verificar identidades y servicios. Esto es crítico para mantener la relevancia en sectores regulados 
                como la automoción (Catena-X) o la aeroespacial.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Shield, label: "Cumplimiento RGPD y Data Governance Act por diseño" },
                  { icon: FileText, label: "Contratos inteligentes para gestión de consentimiento" },
                  { icon: Globe, label: "Interoperabilidad con Data Spaces sectoriales" },
                  { icon: Landmark, label: "Tecnología DLT para trazabilidad inmutable" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <item.icon className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            {...fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              ¿Quieres integrar SERES con tu Espacio de Datos?
            </h2>
            <p className="text-muted-foreground mb-8">
              Descubre cómo el nodo PROCUREDATA puede conectar tus flujos documentales 
              con el ecosistema europeo de datos bajo los más altos estándares de seguridad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <a href="https://www.seres.es" target="_blank" rel="noopener noreferrer">
                  Visitar SERES
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link to="/nodos-sectoriales">
                  Explorar Nodos Sectoriales
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
