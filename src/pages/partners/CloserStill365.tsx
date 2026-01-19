import { Link } from "react-router-dom";
import { 
  Handshake, ArrowRight, Sparkles, Shield, Zap, Eye,
  Building2, BadgeCheck, FileCheck, Euro, Clock,
  Lock, Search, Link as LinkIcon, Globe, Award,
  Calendar, Users, Briefcase, CheckCircle2, ArrowLeft, LogOut,
  Target, TrendingUp, Rocket
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { useNavigate } from "react-router-dom";

const CloserStill365 = () => {
  const { logout } = usePartnerAuth("closerstill");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/partners/closerstill");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/partners/closerstill/miembros" className="text-white/70 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold font-serif">CloserStill Media</h1>
                <p className="text-sm text-white/70">Área de Miembros</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Calendar className="h-3 w-3 mr-1" />
                CloserStill 365
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

      {/* Hero Section - Del Handshake al Smart Contract */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-white/30 rounded-full" />
          <div className="absolute top-40 right-20 w-48 h-48 border border-white/20 rounded-full" />
          <div className="absolute bottom-10 left-1/3 w-24 h-24 border border-white/25 rounded-full" />
          {/* Data flow lines */}
          <svg className="absolute inset-0 w-full h-full">
            <path d="M100,150 Q300,100 500,150 T900,150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
            <path d="M200,200 Q400,250 600,200 T1000,200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-amber-500/20 text-amber-300 border-amber-500/30 text-sm px-4 py-1">
              <Sparkles className="h-3 w-3 mr-2" />
              El Ecosistema de Datos Infinito
            </Badge>
            
            {/* Visual Idiográfico: Transformación Handshake → Digital */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-slate-700/50 border-2 border-slate-500 flex items-center justify-center">
                  <Handshake className="h-12 w-12 text-slate-300" />
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400">Físico</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-16 h-0.5 bg-gradient-to-r from-slate-500 to-blue-500" />
                <ArrowRight className="h-6 w-6 text-blue-400 animate-pulse" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-amber-500" />
              </div>
              
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-amber-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <FileCheck className="h-12 w-12 text-white" />
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-amber-400">Smart Contract</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              Del Handshake al<br />
              <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">Smart Contract</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Nuestra filosofía es <strong className="text-white">'Más Cerca Todavía'</strong>. Por eso, ya no solo conectamos 
              personas en un recinto; conectamos los sistemas de vuestras empresas de forma permanente, segura y soberana.
            </p>
          </div>
        </div>
      </section>

      {/* Bloque Visión: La Nueva Cercanía */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              La Nueva Cercanía
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-4">
              La feria dura 48 horas.<br />
              <span className="text-blue-600">El negocio, 365 días.</span>
            </h2>
            <p className="text-lg text-slate-600">
              Del contacto físico a la conexión digital permanente.
            </p>
          </div>

          {/* Texto Narrativo */}
          <div className="max-w-3xl mx-auto mb-16">
            <Card className="border-l-4 border-l-blue-500 bg-white shadow-lg">
              <CardContent className="py-8 px-8">
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Durante años, nuestra misión ha sido acercar a las personas. Unir oferta y demanda bajo 
                  un mismo techo para provocar <strong>la chispa del negocio</strong>.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Pero sabemos que, cuando se apagan las luces del pabellón, empieza la verdadera carrera 
                  de obstáculos: burocracia, validación de proveedores, auditorías y silos de información.
                </p>
                <p className="text-lg text-slate-900 leading-relaxed font-medium">
                  Hoy, <span className="text-blue-600">CloserStill da el salto más ambicioso de su historia</span>. 
                  Ya no solo organizamos eventos; <strong>orquestamos ecosistemas</strong>.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 3 Columnas: Confianza, Eficiencia, Transparencia */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">Confianza</h3>
              <p className="text-slate-600">
                Compartir datos de solvencia al instante, sin intermediarios ni esperas.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">Eficiencia</h3>
              <p className="text-slate-600">
                Integrar catálogos de productos y servicios con un solo clic.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                <Eye className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">Transparencia</h3>
              <p className="text-slate-600">
                Validar credenciales ISO y ESG sin burocracia innecesaria.
              </p>
            </div>
          </div>

          {/* Cita Destacada */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white border-0 shadow-xl">
              <CardContent className="py-10 px-8 text-center">
                <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed">
                  "CloserStill Media lanza su propio <span className="text-amber-400 font-semibold">Nodo de Espacio de Datos Federado</span> para 
                  que la conexión que nace en la feria, <strong className="text-blue-300">viva en la nube</strong>."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Split Screen: Expositor vs Visitante */}
      <section className="py-0">
        <div className="grid lg:grid-cols-2">
          {/* Bloque Expositor - Izquierda */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-8 lg:px-12">
            <div className="max-w-lg mx-auto lg:ml-auto lg:mr-8">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Building2 className="h-3 w-3 mr-1" />
                Para el Expositor
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                Tu Badge es ahora tu<br />
                <span className="text-amber-300">Pasaporte de Solvencia</span>
              </h2>
              
              <p className="text-blue-100 mb-6 text-lg">
                Activa el "Fast-Track" comercial y reduce tu Time-to-Contract de meses a minutos.
              </p>

              <Card className="bg-white/10 border-white/20 backdrop-blur mb-6">
                <CardContent className="py-4">
                  <p className="text-blue-100 italic text-sm">
                    "¿Cuántas tarjetas de visita se enfrían en un cajón esperando a que el 
                    departamento de Compras del cliente te homologue? El mayor enemigo de tu ROI 
                    no es la competencia, <strong className="text-white">es la fricción administrativa</strong>."
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-amber-300" />
                  </div>
                  <p className="text-white">Tu <strong>solvencia financiera</strong> (Scoring)</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-amber-300" />
                  </div>
                  <p className="text-white">Tus <strong>certificaciones ISO y ESG</strong> actualizadas</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-amber-300" />
                  </div>
                  <p className="text-white">Tu <strong>catálogo de servicios</strong> en formato interoperable</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/20 border border-amber-400/30">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="h-5 w-5 text-amber-300" />
                  <span className="font-bold text-amber-200">RESULTADO</span>
                </div>
                <p className="text-white">
                  Convierte tus leads en contratos firmados <strong>a la velocidad de la luz</strong>.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <Euro className="h-6 w-6 text-green-300" />
                  <div>
                    <p className="text-sm text-blue-200">Acceso al Kit Espacio de Datos</p>
                    <p className="text-xl font-bold text-white">150.000€ - 300.000€</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque Visitante - Derecha */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-20 px-8 lg:px-12">
            <div className="max-w-lg mx-auto lg:mr-auto lg:ml-8">
              <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30">
                <Users className="h-3 w-3 mr-1" />
                Para el Visitante
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                Scouting con Garantía<br />
                <span className="text-green-400">'CloserStill Verified'</span>
              </h2>
              
              <p className="text-slate-300 mb-6 text-lg">
                Encuentra, valida e integra nuevos socios sin riesgo de compliance.
              </p>

              <Card className="bg-white/5 border-white/10 backdrop-blur mb-6">
                <CardContent className="py-4">
                  <p className="text-slate-300 italic text-sm">
                    "¿Cómo sabes si ese proveedor que conociste en el e-Show es solvente? 
                    ¿O si cumple con la normativa ESG? En CloserStill, 
                    <strong className="text-white"> elevamos el estándar</strong>."
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
                    <Lock className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Zero-Trust</p>
                    <p className="text-sm text-slate-400">KYB registrado en Blockchain</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
                    <Search className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Filtrado Inteligente</p>
                    <p className="text-sm text-slate-400">Por huella de carbono o capacidad técnica</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
                    <LinkIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Integración One-Click</p>
                    <p className="text-sm text-slate-400">Volcado directo a SAP, Oracle, Microsoft</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="font-bold text-green-300">GARANTÍA</span>
                </div>
                <p className="text-white">
                  Haz negocios con la tranquilidad de saber que <strong>CloserStill ya ha hecho la Due Diligence por ti</strong>.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-6 w-6 text-green-400" />
                  <div>
                    <p className="text-sm text-slate-400">Sello de Confianza</p>
                    <p className="text-xl font-bold text-white">Data Space Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bienvenidos a la era de la Feria Líquida */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Globe className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-6">
              Bienvenidos a la era de la<br />
              <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Feria Líquida</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
              En la economía digital, estar 'Más Cerca Todavía' significa eliminar la distancia 
              entre vuestros sistemas, vuestros datos y vuestros contratos.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="px-4 py-2 text-sm bg-slate-100 text-slate-700 border-slate-200">
                <Globe className="h-4 w-4 mr-2" />
                Gaia-X Compliant
              </Badge>
              <Badge className="px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">
                <Shield className="h-4 w-4 mr-2" />
                IDSA Certified
              </Badge>
              <Badge className="px-4 py-2 text-sm bg-amber-100 text-amber-700 border-amber-200">
                <Sparkles className="h-4 w-4 mr-2" />
                ProcureData Powered
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Corporativo con Nota Estratégica */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 pb-8 border-b border-white/10">
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-2">Organizador</p>
                <p className="text-xl font-bold font-serif">CloserStill Media</p>
              </div>
              <div className="text-2xl text-slate-600">×</div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-2">Framework</p>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span className="font-semibold text-blue-400">Gaia-X</span>
                </div>
              </div>
              <div className="text-2xl text-slate-600">×</div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-2">Powered by</p>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <span className="font-semibold text-amber-400">ProcureData</span>
                </div>
              </div>
            </div>

            {/* Nota Estratégica para Agustín */}
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardContent className="py-8 px-8">
                <div className="flex items-start gap-4">
                  <Target className="h-8 w-8 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <Badge className="mb-3 bg-amber-500/20 text-amber-300 border-amber-500/30">
                      Nota Estratégica
                    </Badge>
                    <p className="text-lg text-white leading-relaxed italic">
                      "No estamos vendiendo 'blockchain' ni 'tecnología compleja'. Estamos vendiendo 
                      <strong className="text-amber-300"> velocidad para el que vende</strong> y 
                      <strong className="text-amber-300"> seguridad para el que compra</strong>. 
                      La tecnología de ProcureData es solo el motor invisible que hace posible 
                      cumplir la promesa de marca de CloserStill de una forma que nadie más puede hacer ahora mismo."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Back to Members Area */}
            <div className="text-center mt-12">
              <Link to="/partners/closerstill/miembros">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Área de Miembros
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloserStill365;