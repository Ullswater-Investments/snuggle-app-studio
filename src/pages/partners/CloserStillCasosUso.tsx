import { Link } from "react-router-dom";
import { 
  Rocket, BadgeCheck, BarChart3, TrendingUp, Pill, ShieldCheck,
  Leaf, EyeOff, Lock, Building2, Users, 
  Target, Euro, Award, Zap, Globe,
  ArrowLeft, LogOut, ArrowRight, Handshake, Database,
  CheckCircle2, Briefcase, FileSearch, Settings, Network
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { useNavigate } from "react-router-dom";

const CloserStillCasosUso = () => {
  const { logout } = usePartnerAuth("closerstill");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/partners/closerstill");
  };

  const useCases = [
    {
      id: 1,
      name: "Pasaporte de Negocio Exprés",
      category: "Sales Acceleration",
      categoryColor: "blue",
      icon: Rocket,
      feria: "Madrid Tech Show / E-Show",
      problema: "Un expositor consigue 200 leads en la feria. El 80% se enfrían porque, tras el evento, empieza el tedioso proceso de intercambio de documentación legal, NDAs, y validación de proveedores (Onboarding) que dura semanas.",
      solucion: [
        "El 'Badge' del visitante y del expositor no es solo un QR de contacto, es una Wallet de Identidad (DID).",
        "Al hacer 'match', se activa un contrato inteligente (ODRL) que permite al comprador acceder temporalmente a la carpeta de homologación del vendedor.",
        "Datos disponibles: Certificados ISO, Solvencia, Datos Fiscales, Compliance."
      ],
      valor: "Vende un paquete 'Premium Exhibitor' que incluye esta validación previa. El expositor sale de la feria con proveedores ya homologados en los sistemas de sus clientes potenciales.",
      impacto: "De semanas de onboarding a minutos de validación"
    },
    {
      id: 2,
      name: "Marketplace de Inteligencia de Mercado",
      category: "Data Monetization",
      categoryColor: "amber",
      icon: BarChart3,
      feria: "Technology for Marketing (TFM) / Big Data & AI World",
      problema: "Las empresas pagan fortunas a consultoras (Gartner, Forrester) por informes de tendencias que suelen ser datos de encuestas y opiniones.",
      solucion: [
        "CloserStill tiene datos reales de comportamiento: ¿Qué stands visitan los CPOs? ¿Qué categorías buscan los CTOs?",
        "Se crea un Data Product anonimizado donde los expositores pueden contribuir con sus propios datos de tendencias de ventas (sin revelar clientes) a cambio de tokens o descuentos.",
        "Se utiliza tecnología Compute-to-Data: Los algoritmos de análisis se ejecutan sobre los datos sin que estos salgan de la soberanía de cada empresa."
      ],
      valor: "Vender informes de 'Inteligencia de Mercado en Tiempo Real' basados en datos transaccionales reales del sector, no en encuestas.",
      impacto: "Nuevo revenue stream basado en data monetization"
    },
    {
      id: 3,
      name: "Trazabilidad Farmacéutica End-to-End",
      category: "Compliance",
      categoryColor: "emerald",
      icon: Pill,
      feria: "Infarma (Sector Salud/Farma)",
      problema: "La industria farmacéutica tiene regulaciones críticas (como la directiva contra medicamentos falsificados). Verificar la cadena de suministro de un nuevo proveedor de packaging o materia prima en la feria es complejo.",
      solucion: [
        "Crear un canal seguro en el Espacio de Datos para la verificación de serialización y calidad.",
        "Un laboratorio puede verificar en el stand de un proveedor de logística si cumple con las normas GDP (Good Distribution Practice).",
        "Consulta de nodo de datos en tiempo real, con trazabilidad inmutable en Blockchain."
      ],
      valor: "Posiciona a Infarma no solo como un congreso, sino como un hub de cumplimiento normativo.",
      impacto: "Diferenciación única en el sector pharma"
    },
    {
      id: 4,
      name: "El 'Green Badge' Verificado",
      category: "Sostenibilidad / ESG",
      categoryColor: "emerald",
      icon: Leaf,
      feria: "Todos los eventos (Transversal)",
      problema: "Las grandes corporaciones (visitantes VIP) tienen mandatos estrictos de reducir sus emisiones de Alcance 3 (cadena de suministro). Necesitan contratar proveedores sostenibles, pero desconfían del 'Greenwashing'.",
      solucion: [
        "Los expositores cargan sus datos de Huella de Carbono y certificaciones energéticas en su nodo ProcureData.",
        "CloserStill ofrece a los visitantes una app de 'Scouting Sostenible': Filtra expositores que tengan datos de emisiones auditados y firmados digitalmente.",
        "Verificación basada en datos reales, no en declaraciones."
      ],
      valor: "Atrae a grandes compradores corporativos que necesitan justificar compras verdes ante sus accionistas.",
      impacto: "Posicionamiento ESG diferencial"
    },
    {
      id: 5,
      name: "Matchmaking Privado 'Ciego'",
      category: "Privacidad",
      categoryColor: "emerald",
      icon: EyeOff,
      feria: "eForums (One to One) / Dental Summit",
      problema: "En reuniones de alto nivel, a veces las empresas no quieren revelar sus necesidades estratégicas a menos que haya una coincidencia perfecta. 'Busco una solución de ciberseguridad para un presupuesto de 500k, pero no quiero que el mercado sepa que tengo esa vulnerabilidad'.",
      solucion: [
        "Matching Ciego: El comprador publica su necesidad en el espacio de datos de forma encriptada.",
        "Los proveedores publican sus capacidades sin conocer al comprador.",
        "El algoritmo de ProcureData cruza oferta y demanda sin revelar la identidad del comprador hasta que hay un 'match' de capacidades técnicas y presupuesto."
      ],
      valor: "Eleva la calidad de los eForums, garantizando confidencialidad absoluta y alta relevancia en las reuniones.",
      impacto: "Matchmaking de alto valor con privacidad total"
    }
  ];

  const getCategoryStyles = (color: string) => {
    switch(color) {
      case "blue":
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-600",
          border: "border-blue-500",
          badgeBg: "bg-blue-100",
          badgeText: "text-blue-700"
        };
      case "amber":
        return {
          bg: "bg-amber-500/10",
          text: "text-amber-600",
          border: "border-amber-500",
          badgeBg: "bg-amber-100",
          badgeText: "text-amber-700"
        };
      case "emerald":
        return {
          bg: "bg-emerald-500/10",
          text: "text-emerald-600",
          border: "border-emerald-500",
          badgeBg: "bg-emerald-100",
          badgeText: "text-emerald-700"
        };
      default:
        return {
          bg: "bg-slate-500/10",
          text: "text-slate-600",
          border: "border-slate-500",
          badgeBg: "bg-slate-100",
          badgeText: "text-slate-700"
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/partners/closerstill/miembros" className="text-white/70 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">CloserStill Media</h1>
                <p className="text-sm text-white/70">5 Casos de Uso de Alto Valor</p>
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
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            Estrategia de Monetización
          </Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            CloserStill <span className="text-amber-400">Data Engine</span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            5 Casos de Uso de Alto Valor para monetizar tu posición como "conector de industrias" 
            utilizando la tecnología de Espacios de Datos Federados
          </p>
          
          {/* 3 Motores Visual */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-500/30">
              <Zap className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-1">Motor de Ventas</h3>
              <p className="text-sm text-blue-200">Acelera la homologación</p>
              <Badge className="mt-2 bg-blue-400/20 text-blue-300">Caso 1</Badge>
            </div>
            <div className="bg-amber-500/20 rounded-xl p-6 border border-amber-500/30">
              <Euro className="h-10 w-10 text-amber-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-1">Motor de Ingresos</h3>
              <p className="text-sm text-amber-200">Vende inteligencia de mercado</p>
              <Badge className="mt-2 bg-amber-400/20 text-amber-300">Caso 2</Badge>
            </div>
            <div className="bg-emerald-500/20 rounded-xl p-6 border border-emerald-500/30">
              <ShieldCheck className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-1">Motor de Confianza</h3>
              <p className="text-sm text-emerald-200">Verifica sostenibilidad y compliance</p>
              <Badge className="mt-2 bg-emerald-400/20 text-emerald-300">Casos 3, 4, 5</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <div className="container mx-auto px-6 py-16 space-y-12">
        {useCases.map((useCase) => {
          const styles = getCategoryStyles(useCase.categoryColor);
          return (
            <Card key={useCase.id} className={`border-l-4 ${styles.border} overflow-hidden`}>
              <CardHeader className={`${styles.bg}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${styles.bg} border ${styles.border}`}>
                      <useCase.icon className={`h-8 w-8 ${styles.text}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`${styles.badgeBg} ${styles.badgeText}`}>
                          Caso {useCase.id}
                        </Badge>
                        <Badge variant="outline" className={`${styles.badgeText} border-current`}>
                          {useCase.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl md:text-2xl">{useCase.name}</CardTitle>
                    </div>
                  </div>
                  <Badge className="bg-slate-100 text-slate-700 w-fit">
                    <Building2 className="h-3 w-3 mr-1" />
                    {useCase.feria}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Problema */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-700 flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5" />
                    El Problema
                  </h4>
                  <p className="text-slate-700">{useCase.problema}</p>
                </div>

                {/* Solución */}
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <Settings className="h-5 w-5 text-blue-600" />
                    El Caso de Uso
                  </h4>
                  <ul className="space-y-2">
                    {useCase.solucion.map((punto, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{punto}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Valor para CloserStill */}
                <div className={`${styles.bg} border ${styles.border} rounded-lg p-4`}>
                  <h4 className={`font-semibold ${styles.text} flex items-center gap-2 mb-2`}>
                    <Award className="h-5 w-5" />
                    Valor para CloserStill
                  </h4>
                  <p className="text-slate-700">{useCase.valor}</p>
                </div>

                {/* Impacto */}
                <div className="flex items-center gap-2 pt-2">
                  <TrendingUp className={`h-5 w-5 ${styles.text}`} />
                  <span className="font-semibold text-slate-900">Impacto:</span>
                  <Badge className={`${styles.badgeBg} ${styles.badgeText}`}>
                    {useCase.impacto}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              Resumen Ejecutivo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              El CloserStill <span className="text-amber-400">Data Engine</span>
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Tres motores de valor que transforman a CloserStill de organizador de eventos 
              a plataforma de datos soberana
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Motor de Ventas */}
            <Card className="bg-white/5 border-blue-500/30 text-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-blue-400">Motor de VENTAS</CardTitle>
                <CardDescription className="text-blue-200">
                  Sales Acceleration
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-slate-300 mb-4">
                  Acelera la homologación de proveedores
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge className="bg-blue-500/20 text-blue-300">
                    <Rocket className="h-3 w-3 mr-1" />
                    Caso 1
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Motor de Ingresos */}
            <Card className="bg-white/5 border-amber-500/30 text-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <Euro className="h-8 w-8 text-amber-400" />
                </div>
                <CardTitle className="text-amber-400">Motor de INGRESOS</CardTitle>
                <CardDescription className="text-amber-200">
                  Data Monetization
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-slate-300 mb-4">
                  Vende inteligencia de mercado real
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge className="bg-amber-500/20 text-amber-300">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Caso 2
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Motor de Confianza */}
            <Card className="bg-white/5 border-emerald-500/30 text-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-emerald-400" />
                </div>
                <CardTitle className="text-emerald-400">Motor de CONFIANZA</CardTitle>
                <CardDescription className="text-emerald-200">
                  Compliance, ESG & Privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-slate-300 mb-4">
                  Verifica sostenibilidad y cumplimiento
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge className="bg-emerald-500/20 text-emerald-300">
                    <Pill className="h-3 w-3 mr-1" />
                    Caso 3
                  </Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-300">
                    <Leaf className="h-3 w-3 mr-1" />
                    Caso 4
                  </Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-300">
                    <EyeOff className="h-3 w-3 mr-1" />
                    Caso 5
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nota Estratégica */}
      <section className="py-12 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-6">
          <Card className="border-amber-300 bg-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-100">
                  <Briefcase className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-amber-800">💡 Nota Estratégica para Agustín Torres</CardTitle>
                  <CardDescription>Cómo presentar esta propuesta</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-amber-400 pl-4 py-2 italic text-slate-700">
                "Agustín, fíjate que no estamos vendiendo 'blockchain' ni 'tecnología compleja'. 
                Estamos vendiendo <strong>velocidad para el que vende</strong> y <strong>seguridad para el que compra</strong>. 
                La tecnología de ProcureData es solo el motor invisible que hace posible cumplir la promesa de marca 
                de CloserStill de una forma que nadie más puede hacer ahora mismo."
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">CloserStill</div>
                <div className="text-xs text-slate-400">Media</div>
              </div>
              <div className="h-10 w-px bg-slate-700" />
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-400" />
                <span className="text-sm text-slate-300">Gaia-X Ready</span>
              </div>
              <div className="h-10 w-px bg-slate-700" />
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-slate-300">ProcureData Powered</span>
              </div>
            </div>
            <Link to="/partners/closerstill/miembros">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Documentos
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CloserStillCasosUso;
