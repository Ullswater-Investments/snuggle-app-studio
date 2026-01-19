import { Link } from "react-router-dom";
import { 
  Rocket, Lightbulb, Building2, Handshake, Euro, Shield, 
  UserCheck, Zap, LayoutDashboard, 
  TrendingUp, Lock, CheckCircle2, Award, ArrowLeft, LogOut,
  AlertCircle, FileText, Target, Sparkles, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { useNavigate } from "react-router-dom";

const CloserStillMiembros = () => {
  const { logout, session } = usePartnerAuth("closerstill");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/partners/closerstill");
  };

  const userJourneySteps = [
    { title: "El Encuentro", desc: "Escaneo de badges en el stand", icon: UserCheck },
    { title: "Handshake Digital", desc: "Nodo ejecuta Smart Contract", icon: Handshake },
    { title: "La Validación", desc: "Intercambio de credenciales (segundos)", icon: CheckCircle2 },
    { title: "El Resultado", desc: "Proveedor Homologado en ERP", icon: Rocket }
  ];

  const revenueStreams = [
    { name: "Suscripción 'Trust+'", desc: "Fee extra para tener el 'Pasaporte Digital' validado todo el año.", potential: 3 },
    { name: "Data Marketplace Fee", desc: "Comisión por datasets vendidos entre participantes.", potential: 2 },
    { name: "Gestión de Ayudas", desc: "Fee por gestionar el acceso al Kit Espacio de Datos.", potential: 4 }
  ];

  const nextSteps = [
    "Piloto en e-Show Madrid: Habilitar un 'Fast-Track Lane' para 50 expositores VIP.",
    "Webinar Conjunto: 'Cómo financiar tu transformación de datos con el Kit Espacio de Datos'.",
    "Implementación del Nodo: Despliegue de un Nodo Gaia-X propiedad de CloserStill Media."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/partners" className="text-white/70 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">CloserStill Media</h1>
                <p className="text-sm text-white/70">Área de Miembros</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                <Lock className="h-3 w-3 mr-1" />
                Documento Confidencial
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/30">
            Documentos Confidenciales - Solo Partners
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Área de Miembros <span className="text-blue-400">CloserStill Media</span>
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Accede a la documentación exclusiva sobre el Nodo de Datos e-Show
          </p>
        </div>
      </section>

      {/* Document Navigation Cards */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Documentos Disponibles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/partners/closerstill/miembros/365">
              <Card className="hover:shadow-lg transition-all hover:border-blue-300 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-amber-500">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">CloserStill 365: El Ecosistema de Datos Infinito</CardTitle>
                      <CardDescription>Visión Corporativa y Propuesta de Valor</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    La filosofía "Más Cerca Todavía" evoluciona: Del handshake al smart contract. 
                    Beneficios para expositores y visitantes del nuevo Nodo de Datos Federado.
                  </p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    Ver documento <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/partners/closerstill/miembros/casos-uso">
              <Card className="hover:shadow-lg transition-all hover:border-emerald-300 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">5 Casos de Uso de Alto Valor</CardTitle>
                      <CardDescription>CloserStill Data Engine</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Motor de Ventas, Motor de Ingresos y Motor de Confianza: 
                    Estrategia de monetización para cada feria del portfolio.
                  </p>
                  <div className="flex items-center text-emerald-600 text-sm font-medium">
                    Ver documento <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/partners/closerstill/miembros/innovacion">
              <Card className="hover:shadow-lg transition-all hover:border-purple-300 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">10 Casos de Uso Disruptivos</CardTitle>
                      <CardDescription>e-Show Innovation Gallery</CardDescription>
                    </div>
                  </div>
                  <Badge className="w-fit bg-purple-100 text-purple-700 border-purple-300">NUEVO</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Galería interactiva con micro-animaciones visuales para cada caso de uso.
                    De evento puntual a infraestructura crítica.
                  </p>
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    Ver galería <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Card className="border-blue-200 bg-blue-50/50 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-slate-700 to-blue-800">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Propuesta Estratégica e-Show Data Space Node</CardTitle>
                    <CardDescription>De Feria de 2 Días a Ecosistema 365</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Propuesta técnica y de negocio para el Nodo Propietario de CloserStill Media. 
                  Incluye modelo de ingresos y próximos pasos.
                </p>
                <Badge variant="outline" className="text-blue-600 border-blue-300">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Visualizando ahora
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="container mx-auto px-6">
        <div className="border-t border-slate-200" />
      </div>

      {/* Original e-Show Proposal Content */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 mt-8">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/30">
            Documento Confidencial - Solo Partners
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-blue-400">PROPUESTA ESTRATÉGICA</span>
            <br />
            e-Show Data Space Node
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            De Feria de 2 Días a Ecosistema de Negocio 365
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Section 1: La Visión */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-100">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold">1. La Visión: Ecosistema Líquido</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-l-4 border-l-red-500 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  El Problema
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Hoy, el e-Show conecta oferta y demanda presencialmente. Cuando se apagan las luces, 
                la fricción burocrática (compliance, validación, papeleo) ralentiza el cierre de acuerdos.
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  La Solución
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Implementar un Nodo Propietario en ProcureData (basado en Pontus-X / Gaia-X). 
                Convertimos el e-Show en el primer organizador que ofrece Infraestructura de Datos Soberana.
              </CardContent>
            </Card>
          </div>

          <Card className="border-l-4 border-l-amber-500 bg-amber-50/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Lightbulb className="h-8 w-8 text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Concepto Clave</h3>
                  <p className="text-muted-foreground italic">
                    "Agustín, no solo vendemos m² de suelo; vendemos Autopistas de Datos Seguras 
                    para que tus expositores cierren ventas más rápido."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: La Oportunidad */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-100">
              <Euro className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">2. La Oportunidad: Kit Espacio de Datos 🇪🇺</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Rol del e-Show</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Actuar como Entidad Promotora del "Espacio de Datos del Comercio Digital".
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Euro className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle className="text-lg">El Incentivo</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Ayudar a tus expositores a captar los <strong>150.000€ - 300.000€</strong> de ayuda pública.
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Handshake className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle className="text-lg">La Fidelización</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Si facilitas la tecnología y la subvención, el expositor se "casa" con la feria.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Infografía del Nodo */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-100">
              <LayoutDashboard className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold">3. ¿Qué aporta un Nodo Propietario?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Expositor */}
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader className="text-center">
                <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <CardTitle>El Vendedor</CardTitle>
                <CardDescription>Para el Expositor</CardDescription>
                <Badge variant="outline" className="mt-2">Objetivo: Vender más rápido (Fast-Track)</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm"><strong>Identidad Soberana (DID):</strong> Su Badge se convierte en Cartera Digital.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm"><strong>Validación Instantánea:</strong> Transmite solvencia e ISOs automáticamente.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Euro className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm"><strong>Monetización:</strong> Venta de datasets de tendencias en el Marketplace.</p>
                </div>
              </CardContent>
            </Card>

            {/* Visitante */}
            <Card className="border-t-4 border-t-green-500">
              <CardHeader className="text-center">
                <UserCheck className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle>El Comprador</CardTitle>
                <CardDescription>Para el Visitante</CardDescription>
                <Badge variant="outline" className="mt-2">Objetivo: Proveedores confiables sin riesgo</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm"><strong>Confianza Zero-Trust:</strong> Proveedores con KYB automático en Blockchain.</p>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm"><strong>Integración One-Click:</strong> Volcado directo a ERP (SAP/Oracle).</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm"><strong>Scouting Inteligente:</strong> Filtros avanzados por certificación y facturación.</p>
                </div>
              </CardContent>
            </Card>

            {/* Organizador */}
            <Card className="border-t-4 border-t-orange-500">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-2" />
                <CardTitle>El Organizador</CardTitle>
                <CardDescription>Para e-Show</CardDescription>
                <Badge variant="outline" className="mt-2">Objetivo: Nuevos Ingresos y Liderazgo</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Euro className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm"><strong>Data Monetization:</strong> Tasa por transacciones de datos post-feria.</p>
                </div>
                <div className="flex items-start gap-2">
                  <LayoutDashboard className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm"><strong>Market Intelligence:</strong> Datos reales de oferta y demanda.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm"><strong>Reputación:</strong> Primera feria Web3-Ready de Europa.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4: User Journey */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-indigo-100">
              <Rocket className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold">4. User Journey</h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 -translate-y-1/2 z-0" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {userJourneySteps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center mb-3 shadow-lg">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Modelo de Negocio */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-100">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold">5. Modelo de Negocio Propuesto</h2>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Flujo de Ingresos</th>
                      <th className="text-left py-3 px-4 font-semibold">Descripción</th>
                      <th className="text-center py-3 px-4 font-semibold">Potencial</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueStreams.map((stream, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3 px-4 font-medium">{stream.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{stream.desc}</td>
                        <td className="py-3 px-4 text-center">
                          {"⭐".repeat(stream.potential)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 6: Próximos Pasos */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-rose-100">
              <CheckCircle2 className="h-6 w-6 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold">6. Próximos Pasos 🏁</h2>
          </div>

          <div className="space-y-4 mb-8">
            {nextSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white border-0">
            <CardContent className="py-8 text-center">
              <p className="text-xl md:text-2xl italic max-w-3xl mx-auto">
                "El futuro de las ferias no es solo conectar personas, es conectar la confianza 
                de sus empresas. Hagamos que e-Show sea el estándar de esa confianza."
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default CloserStillMiembros;
