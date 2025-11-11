import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Sparkles
} from "lucide-react";
import { FadeIn, SlideUp, ScaleIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

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
    document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                <Sparkles className="w-4 h-4" />
                Sistema de Gobernanza Multi-Tenant
              </div>
            </FadeIn>
            
            <SlideUp delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                PROCUREDATA
              </h1>
            </SlideUp>
            
            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Plataforma integral para la gestión y gobernanza de transacciones de datos entre organizaciones con flujos de aprobación multi-actor
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={scrollToAuth} className="text-lg">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleDemoAccess} disabled={loading}>
                  🎭 Ver Demo
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Características Principales
              </h2>
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
                      Aislamiento completo por organización mediante Row Level Security (RLS). Cada organización solo accede a sus datos.
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
                      Sistema de 3 actores (Consumer, Subject, Holder) con máquina de estados que garantiza el cumplimiento del proceso.
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Cómo Funciona?
              </h2>
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
                    Una organización consumidora inicia una solicitud de datos de proveedores a través del catálogo integrado.
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
                    El sujeto de los datos (proveedor) recibe notificación y decide si autoriza compartir su información.
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
                    Los datos quedan disponibles para visualización, análisis y exportación automática al ERP configurado.
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Beneficios del Sistema
              </h2>
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
                  <p className="text-sm text-muted-foreground">
                    Historial detallado de cada transacción y aprobación
                  </p>
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
                  <p className="text-sm text-muted-foreground">
                    Alertas en tiempo real para cada cambio de estado
                  </p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Comience a Usar PROCUREDATA
              </h2>
              <p className="text-lg text-muted-foreground">
                Cree su cuenta o acceda al sistema para comenzar a gestionar transacciones de datos de forma segura y eficiente.
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
                  <p className="text-sm text-muted-foreground text-center mb-3">
                    ¿Quiere explorar primero?
                  </p>
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

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <StaggerContainer className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="space-y-4">
                <h3 className="font-bold text-foreground text-lg">PROCUREDATA</h3>
                <p className="text-sm text-muted-foreground">
                  Sistema de Gobernanza de Datos Multi-Tenant para gestión de transacciones entre organizaciones.
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Enlaces Rápidos</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">Documentación</a>
                  </li>
                  <li>
                    <a href="#" onClick={handleDemoAccess} className="hover:text-primary transition-colors">Modo Demo</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">Arquitectura</a>
                  </li>
                </ul>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Contacto</h4>
                <p className="text-sm text-muted-foreground">
                  Para más información sobre PROCUREDATA y sus capacidades.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
          
          <FadeIn delay={0.3}>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} PROCUREDATA. Sistema de Gobernanza de Datos.</p>
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
};

export default Index;
