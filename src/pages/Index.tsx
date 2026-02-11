import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  GitBranch,
  BarChart3,
  Lock,
  CheckCircle2,
  FileText,
  Bell,
  Database,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { FadeIn, SlideUp, ScaleIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { FundingFooter } from "@/components/FundingFooter";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FederatedNetworkDiagram } from "@/components/landing/FederatedNetworkDiagram";
import { FederatedAgentChat } from "@/components/landing/FederatedAgentChat";
import { RoadmapPhases } from "@/components/landing/RoadmapPhases";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Different transform values for parallax layers
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yButtons = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signUp(email, password);
    setLoading(false);
    setEmail("");
    setPassword("");
  };

  const handleDemoAccess = async () => {
    setLoading(true);
    const demoEmail = "demo@procuredata.app";
    const demoPassword = "demo123456";

    const { error: loginError } = await signIn(demoEmail, demoPassword);

    if (loginError) {
      const { error: signupError } = await signUp(demoEmail, demoPassword);

      if (!signupError) {
        await signIn(demoEmail, demoPassword);
      }
    }

    setLoading(false);
  };

  const scrollToAuth = () => {
    document.getElementById("auth-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Language/Theme Toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      {/* Hero Section - Federated Data Space */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5"
      >
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]), opacity: 0.1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]), opacity: 0.1 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"
        />

        <motion.div style={{ opacity, scale }} className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <FadeIn delay={0.1}>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                    <Sparkles className="w-3 h-3" /> Gaia-X
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-accent rounded-full text-xs font-medium text-accent-foreground">
                    ODRL 2.0
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground">
                    Pontus-X
                  </span>
                </div>
              </FadeIn>

              <SlideUp delay={0.2}>
                <motion.div style={{ y: yTitle }}>
                  <ProcuredataLogo size="xl" />
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3 leading-tight">
                    Espacio de Datos Federados con IA
                  </h2>
                </motion.div>
              </SlideUp>

              <FadeIn delay={0.3}>
                <motion.p style={{ y: ySubtitle }} className="text-lg text-muted-foreground">
                  Solución al problema 'nxm' en el alta de proveedores mediante identidades compartidas.
                  Alta automática en tu ERP a partir de datos ya validados por otros clientes.
                </motion.p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <motion.div style={{ y: yButtons }} className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" variant="hero" onClick={scrollToAuth} className="text-base">
                    Comenzar Ahora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="premium" onClick={handleDemoAccess} disabled={loading}>
                    🎭 Ver Demo
                  </Button>
                </motion.div>
              </FadeIn>
            </div>

            {/* Right: Federated Network Diagram */}
            <FadeIn delay={0.3}>
              <FederatedNetworkDiagram />
            </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* Roadmap Phases */}
      <RoadmapPhases />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Características Principales</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Gestión completa del ciclo de vida de transacciones de datos con seguridad empresarial
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <StaggerItem>
              <ScaleIn>
                <Card className="border-2 hover:shadow-lg transition-shadow h-full">
                  <CardContent className="pt-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Multi-Tenant Seguro</h3>
                    <p className="text-muted-foreground">
                      Aislamiento completo por organización mediante Row Level Security (RLS). Cada organización solo
                      accede a sus datos.
                    </p>
                  </CardContent>
                </Card>
              </ScaleIn>
            </StaggerItem>

            <StaggerItem>
              <ScaleIn delay={0.1}>
                <Card className="border-2 hover:shadow-lg transition-shadow h-full">
                  <CardContent className="pt-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <GitBranch className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Flujo de Aprobaciones</h3>
                    <p className="text-muted-foreground">
                      Sistema de 3 actores (Consumer, Subject, Holder) con máquina de estados que garantiza el
                      cumplimiento del proceso.
                    </p>
                  </CardContent>
                </Card>
              </ScaleIn>
            </StaggerItem>

            <StaggerItem>
              <ScaleIn delay={0.2}>
                <Card className="border-2 hover:shadow-lg transition-shadow h-full">
                  <CardContent className="pt-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Visualización de Datos</h3>
                    <p className="text-muted-foreground">
                      Visualice datos aprobados y exporte directamente a su sistema ERP con configuración personalizada.
                    </p>
                  </CardContent>
                </Card>
              </ScaleIn>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¿Cómo Funciona?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Flujo de trabajo simplificado en 4 pasos
              </p>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-8">
            <SlideUp delay={0.1}>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">Consumer Solicita Datos</h3>
                  <p className="text-muted-foreground">
                    Una organización consumidora inicia una solicitud de datos de proveedores a través del catálogo
                    integrado.
                  </p>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">Subject Pre-Aprueba</h3>
                  <p className="text-muted-foreground">
                    El sujeto de los datos (proveedor) recibe notificación y decide si autoriza compartir su
                    información.
                  </p>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.3}>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">Holder Autoriza</h3>
                  <p className="text-muted-foreground">
                    El titular de los datos (holder) realiza la aprobación final y libera los datos para la transacción.
                  </p>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.4}>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">Datos Disponibles</h3>
                  <p className="text-muted-foreground">
                    Los datos quedan disponibles para visualización, análisis y exportación automática al ERP
                    configurado.
                  </p>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Beneficios del Sistema</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Todas las capacidades que necesita para una gobernanza efectiva
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <StaggerItem>
              <div className="flex gap-4 items-start p-6 bg-card border rounded-lg hover:shadow-md transition-shadow h-full">
                <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Gobernanza Automatizada</h3>
                  <p className="text-sm text-muted-foreground">
                    Flujos de aprobación automáticos con trazabilidad completa
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex gap-4 items-start p-6 bg-card border rounded-lg hover:shadow-md transition-shadow h-full">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Cumplimiento ODRL 2.0</h3>
                  <p className="text-sm text-muted-foreground">
                    Generación automática de políticas conformes al estándar ODRL
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex gap-4 items-start p-6 bg-card border rounded-lg hover:shadow-md transition-shadow h-full">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Trazabilidad Completa</h3>
                  <p className="text-sm text-muted-foreground">Historial detallado de cada transacción y aprobación</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex gap-4 items-start p-6 bg-card border rounded-lg hover:shadow-md transition-shadow h-full">
                <Database className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Integración ERP</h3>
                  <p className="text-sm text-muted-foreground">
                    Exportación directa a sistemas ERP con mapeo personalizable
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex gap-4 items-start p-6 bg-card border rounded-lg hover:shadow-md transition-shadow h-full">
                <Bell className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Notificaciones Automáticas</h3>
                  <p className="text-sm text-muted-foreground">Alertas en tiempo real para cada cambio de estado</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex gap-4 items-start p-6 bg-card border rounded-lg hover:shadow-md transition-shadow h-full">
                <BarChart3 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Auditoría Integrada</h3>
                  <p className="text-sm text-muted-foreground">
                    Logs completos de actividad para cumplimiento normativo
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth-section" className="py-20 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <SlideUp>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3 flex-wrap">
                  Comience a Usar <ProcuredataLogo size="lg" linkToHome={false} />
                </h2>
                <p className="text-lg text-muted-foreground">
                  Cree su cuenta o acceda al sistema para comenzar a gestionar transacciones de datos de forma segura y
                  eficiente.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Sin costos de configuración inicial</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Modo demo disponible para evaluación</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Soporte completo incluido</p>
                  </div>
                </div>
              </div>
            </SlideUp>

            <ScaleIn delay={0.2}>
              <Card className="shadow-xl">
                <CardContent className="pt-6">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                      <TabsTrigger value="register">Registrarse</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Contraseña</Label>
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? "Cargando..." : "Iniciar Sesión"}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="register">
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Contraseña</Label>
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? "Cargando..." : "Crear Cuenta"}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground text-center mb-3">¿Quiere explorar primero?</p>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-amber-500 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                      onClick={handleDemoAccess}
                      disabled={loading}
                    >
                      🎭 Acceder a Versión Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Footer con créditos de financiación - Memoria Técnica */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <StaggerContainer className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            <StaggerItem>
              <div className="space-y-4">
                <h3 className="font-bold text-foreground text-lg">
                  <ProcuredataLogo size="sm" />
                </h3>
                <p className="text-sm text-muted-foreground">
                  Espacio de Datos para la Función de Compras. Solución al problema 'nxm' en el alta de proveedores.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Plataforma</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="/catalog" className="hover:text-primary transition-colors">
                      Catálogo de Datos
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={handleDemoAccess} className="hover:text-primary transition-colors">
                      Modo Demo
                    </a>
                  </li>
                  <li>
                    <a href="/architecture" className="hover:text-primary transition-colors">
                      Arquitectura
                    </a>
                  </li>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Transparencia</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="/docs/tecnico" className="hover:text-primary transition-colors">
                      Memoria Técnica
                    </a>
                  </li>
                  <li>
                    <a href="/architecture" className="hover:text-primary transition-colors">
                      Modelo de Gobernanza
                    </a>
                  </li>
                  <li>
                    <a href="/whitepaper" className="hover:text-primary transition-colors">
                      Especificaciones Técnicas
                    </a>
                  </li>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Contacto</h4>
                <p className="text-sm text-muted-foreground">
                  Para más información sobre Procuredata y sus capacidades.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                &copy; {new Date().getFullYear()} <ProcuredataLogo size="sm" linkToHome={false} />. Espacio de Datos para la Función de Compras.
              </p>
            </div>
          </FadeIn>
        </div>
      </footer>

      {/* FundingFooter - Créditos oficiales según Memoria Técnica */}
      <FundingFooter variant="light" />

      {/* Floating AI Agent Chat */}
      <FederatedAgentChat />
    </div>
  );
};

export default Index;
