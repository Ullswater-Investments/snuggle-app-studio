import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  Database, 
  Shield, 
  Wallet, 
  FileCode, 
  Network, 
  Lock, 
  Cpu, 
  ArrowRight,
  CheckCircle2,
  Package,
  Layers,
  Server,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FundingFooter } from "@/components/FundingFooter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

const KitEspacioDatos = () => {
  const { t } = useTranslation('landing');

  const components = [
    {
      icon: Database,
      title: "Catálogo de Datos Federado",
      description: "Registro centralizado de productos de datos con metadatos estandarizados y búsqueda avanzada.",
      link: "/catalog",
      features: ["Metadatos DCAT-AP", "Búsqueda semántica", "Categorización automática"]
    },
    {
      icon: Shield,
      title: "Gobernanza ODRL",
      description: "Motor de políticas de uso de datos basado en el estándar ODRL para control granular de acceso.",
      link: "/motor/gobernanza-odrl",
      features: ["Políticas declarativas", "Enforcement automático", "Auditoría completa"]
    },
    {
      icon: Wallet,
      title: "Wallet Web3 Corporativo",
      description: "Billetera digital para gestión de identidad descentralizada y transacciones tokenizadas.",
      link: "/motor/wallet-web3",
      features: ["Identidad SSI", "Tokens EUROe", "Multi-firma corporativa"]
    },
    {
      icon: Lock,
      title: "Identidad Soberana (SSI)",
      description: "Sistema de credenciales verificables para autenticación sin intermediarios.",
      link: "/motor/identidad-ssi",
      features: ["DIDs W3C", "Credenciales verificables", "Zero-knowledge proofs"]
    },
    {
      icon: Network,
      title: "Conectores IDS/IDSA",
      description: "Integración nativa con el ecosistema International Data Spaces para interoperabilidad.",
      link: "/motor/modelo-idsa",
      features: ["IDS Connector", "Usage Control", "Clearing House"]
    },
    {
      icon: FileCode,
      title: "Conectores ERP",
      description: "Integración bidireccional con sistemas empresariales SAP, Oracle, Microsoft Dynamics.",
      link: "/motor/conectores-erp",
      features: ["SAP S/4HANA", "Oracle Cloud", "Dynamics 365"]
    },
    {
      icon: Cpu,
      title: "Edge Functions",
      description: "Procesamiento serverless en el borde para transformaciones y validaciones en tiempo real.",
      link: "/motor/edge-functions",
      features: ["Baja latencia", "Auto-escalado", "TypeScript nativo"]
    },
    {
      icon: Server,
      title: "Multi-Tenant & RLS",
      description: "Arquitectura multi-inquilino con aislamiento a nivel de fila para máxima seguridad.",
      link: "/motor/multi-tenant-rls",
      features: ["Row Level Security", "Tenant isolation", "RBAC avanzado"]
    }
  ];

  const benefits = [
    "Soberanía total sobre tus datos",
    "Cumplimiento GDPR/LOPD nativo",
    "Interoperabilidad con Gaia-X",
    "Monetización de activos de datos",
    "Trazabilidad blockchain opcional",
    "Despliegue on-premise o cloud"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <ProcuredataLogo size="lg" showNavigation={true} />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild variant="outline">
              <Link to="/auth">Acceder</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1">
              <Layers className="h-4 w-4 mr-2" />
              Kit Completo de Componentes
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              KIT ESPACIO DE DATOS
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Todo lo que necesitas para construir, operar y escalar tu propio Espacio de Datos 
              conforme a estándares europeos. Componentes modulares, interoperables y 
              listos para producción.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contrato-adhesion">
                  Contrato de Adhesión
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://www.kitespaciodedatos.eu" target="_blank" rel="noopener noreferrer">www.kitespaciodedatos.eu</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subsidy Program Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-muted-foreground mb-12">
            Programa de ayudas para la incorporación de empresas al ecosistema de Espacios de Datos Europeos GAIA-X
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Option A - Basic */}
            <div className="relative rounded-2xl p-8 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
              <Badge className="mb-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-0 px-8 py-4 text-2xl font-bold">
                SUBVENCIÓN DE 15.000€
              </Badge>
              
              <h3 className="text-2xl font-bold text-foreground mb-2">Adhesión Espacio de Datos GDC</h3>
              <p className="text-muted-foreground mb-6">Membresía básica al ecosistema</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  <span className="text-foreground">Conector IDS/GAIA-X certificado</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  <span className="text-foreground">Wallet de Identidad Soberana (W3C-DID)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  <span className="text-foreground">Asociación y Formación especializada</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  <span className="text-foreground">Membresía 3 años al ecosistema</span>
                </li>
              </ul>
              
              <div className="bg-white/60 dark:bg-white/10 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Coste inicial para la clínica:</p>
                <p className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">2.000€</p>
                <p className="text-sm text-muted-foreground">+ 13.000€ al recibir subvención</p>
              </div>
            </div>

            {/* Option B - Recommended */}
            <div className="relative rounded-2xl p-8 bg-gradient-to-br from-purple-50 to-amber-50 dark:from-purple-950/30 dark:to-amber-900/20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0 px-8 py-4 text-2xl font-bold">
                  SUBVENCIÓN DE 30.000€
                </Badge>
                <Badge variant="outline" className="border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20">
                  ⭐ RECOMENDADO
                </Badge>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-2">Adhesión + Caso de Uso</h3>
              <p className="text-muted-foreground mb-6">Proyecto completo con desarrollo a medida</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span className="text-foreground">Todo incluido de la Opción A</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span className="text-foreground">Consultoría personalizada de Caso de Uso</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span className="text-foreground">Desarrollo a Medida (API/HL7-FHIR)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span className="text-foreground">Visibilidad como Pionero del ecosistema</span>
                </li>
              </ul>
              
              <div className="bg-white/60 dark:bg-white/10 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Coste inicial para el hospital:</p>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">5.000€</p>
                <p className="text-sm text-muted-foreground">+ 25.000€ al recibir subvención</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Componentes del Kit</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada componente está diseñado para funcionar de forma independiente o integrado 
              con el resto del ecosistema PROCUREDATA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {components.map((component, index) => (
              <motion.div
                key={component.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <component.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{component.title}</CardTitle>
                    <CardDescription>{component.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {component.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" size="sm" asChild className="w-full">
                      <Link to={component.link}>
                        Explorar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">¿Por qué elegir nuestro Kit?</h2>
              <p className="text-muted-foreground mb-8">
                PROCUREDATA ofrece la única solución completa de Espacio de Datos diseñada 
                específicamente para la función de compras, con cumplimiento normativo europeo 
                y conectividad con ecosistemas Gaia-X.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Ecosistema Europeo</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Compatible con las iniciativas europeas de espacios de datos sectoriales:
              </p>
              <div className="flex flex-wrap gap-2">
                {["Gaia-X", "IDSA", "DSBA", "Catena-X", "Manufacturing-X", "Mobility Data Space"].map((ecosystem) => (
                  <Badge key={ecosystem} variant="secondary">{ecosystem}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para construir tu Espacio de Datos?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contáctanos para una demostración personalizada y descubre cómo PROCUREDATA 
            puede transformar tu gestión de datos de proveedores.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register">
                Empezar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/whitepaper">Descargar Whitepaper</Link>
            </Button>
          </div>
        </div>
      </section>

      <FundingFooter variant="dark" showTransparency={true} />
    </div>
  );
};

export default KitEspacioDatos;
