import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, ChevronDown, CheckCircle2, XCircle, Users, Factory, ShoppingCart, Wheat, Truck, Heart, Building2, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";

interface UserStory {
  id: string;
  profile: string;
  icon: React.ReactNode;
  color: string;
  name: string;
  company: string;
  challenge: string;
  solution: string;
  result: string;
  quote: string;
}

const userStories: UserStory[] = [
  {
    id: "industrial-cpo",
    profile: "Director de Compras Industrial",
    icon: <Factory className="h-5 w-5" />,
    color: "bg-orange-500",
    name: "Carlos Méndez",
    company: "AutoParts España S.A.",
    challenge: "Gestionar 2,300 proveedores de componentes con validaciones manuales que consumían 6 meses de trabajo administrativo al año.",
    solution: "Implementó el Pasaporte Digital de Proveedor y la Homologación Flash 24h para automatizar el 85% de las validaciones recurrentes.",
    result: "Redujo el tiempo de alta de nuevos proveedores de 3 semanas a 48 horas. El equipo de compras liberó 1,200 horas anuales para negociación estratégica.",
    quote: "Antes pasábamos más tiempo validando papeles que negociando precios. Ahora el sistema hace el trabajo burocrático y nosotros aportamos valor real."
  },
  {
    id: "retail-sustainability",
    profile: "Responsable de Sostenibilidad Retail",
    icon: <ShoppingCart className="h-5 w-5" />,
    color: "bg-blue-500",
    name: "Elena Vázquez",
    company: "Cadena SuperEco",
    challenge: "Cumplir con la directiva CSRD requería recopilar datos ESG de 450 proveedores, un proceso que antes llevaba 4 meses.",
    solution: "Utilizó el servicio de Auditoría CSRD Automática y la Calculadora Scope 3 para centralizar la recogida de datos en un único flujo verificado.",
    result: "Completó el reporte CSRD en 3 semanas con datos auditables. Identificó a 28 proveedores Green Partner para promocionar en marketing.",
    quote: "El regulador nos pidió pruebas y pudimos mostrarle el hash de blockchain de cada dato. Eso es credibilidad, no un PDF que cualquiera puede editar."
  },
  {
    id: "agro-coop",
    profile: "Gerente de Cooperativa Agroalimentaria",
    icon: <Wheat className="h-5 w-5" />,
    color: "bg-green-500",
    name: "Miguel Ángel Torres",
    company: "Cooperativa La Huerta del Sol",
    challenge: "Exportar a Alemania requería certificar el origen y la cadena de frío de 15 productos diferentes con documentación manual.",
    solution: "Registró todos los certificados sanitarios y análisis de laboratorio en el DID de la cooperativa, integrando sensores IoT para la temperatura.",
    result: "El tiempo de despacho aduanero se redujo un 60%. Los clientes alemanes ahora verifican el origen escaneando un código QR.",
    quote: "Nuestros tomates ahora tienen pasaporte digital. El comprador en Múnich sabe exactamente de qué invernadero salieron y a qué temperatura viajaron."
  },
  {
    id: "logistics-fleet",
    profile: "Director de Flota Logística",
    icon: <Truck className="h-5 w-5" />,
    color: "bg-purple-500",
    name: "Patricia Ruiz",
    company: "TransLogística Ibérica",
    challenge: "Sus clientes corporativos exigían reportes de emisiones Scope 3 por cada envío, pero calcularlos manualmente era inviable para 12,000 rutas mensuales.",
    solution: "Integró el Carbon Tracker ISO 14064 con su sistema de gestión de flotas para generar automáticamente el certificado de CO2 por ruta.",
    result: "Ofrece ahora un servicio premium de 'Envío con Huella Verificada' con un 15% de margen adicional. Ganó 3 licitaciones gracias a este diferencial.",
    quote: "Pasamos de ser un coste para el departamento de sostenibilidad de nuestros clientes a ser su socio estratégico para cumplir objetivos."
  },
  {
    id: "hospital-procurement",
    profile: "Jefa de Compras Hospitalaria",
    icon: <Heart className="h-5 w-5" />,
    color: "bg-red-500",
    name: "Dra. Laura Fernández",
    company: "Hospital Universitario Central",
    challenge: "Verificar que los proveedores de material quirúrgico cumplían con el Reglamento de Productos Sanitarios (MDR) era un proceso lento y propenso a errores.",
    solution: "Implementó el filtro de Cumplimiento Regulatorio (EMA/MDR) del Marketplace y el Anonimizador GDPR para compartir datos de consumo sin exponer pacientes.",
    result: "Redujo el riesgo de contratar proveedores no conformes a cero. Comparte ahora datos agregados de consumo con investigadores de forma segura.",
    quote: "En sanidad, un error de proveedor puede costar vidas. Ahora tengo la tranquilidad de que cada certificado es verificable y no un documento falsificable."
  },
  {
    id: "social-economy",
    profile: "Coordinador de Economía Social",
    icon: <Building2 className="h-5 w-5" />,
    color: "bg-teal-500",
    name: "Javier Molina",
    company: "Federación de Cooperativas del Sur",
    challenge: "Demostrar el impacto social de las cooperativas para acceder a contratos públicos con cláusulas sociales era un proceso subjetivo y poco medible.",
    solution: "Utilizó las herramientas de Medición del SROI (Retorno Social de la Inversión) y el badge de Compra Pública Ética para acreditar el impacto.",
    result: "Las cooperativas federadas ganaron un 40% más de licitaciones públicas al poder demostrar su impacto social con datos verificados.",
    quote: "Antes decíamos que generábamos empleo local. Ahora lo demostramos con métricas que cualquier funcionario puede auditar en segundos."
  }
];

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "¿Cuánto tiempo ahorró AutoParts España en el alta de nuevos proveedores?",
    options: ["De 1 semana a 24 horas", "De 3 semanas a 48 horas", "De 2 meses a 1 semana", "De 6 meses a 1 mes"],
    correctIndex: 1,
    explanation: "AutoParts España redujo el tiempo de alta de nuevos proveedores de 3 semanas a solo 48 horas gracias a la Homologación Flash 24h."
  },
  {
    question: "¿Qué servicio utilizó la cooperativa agroalimentaria para certificar el origen de sus productos?",
    options: ["Auditoría CSRD", "Carbon Tracker", "DID con sensores IoT", "Homologación Flash"],
    correctIndex: 2,
    explanation: "La Cooperativa La Huerta del Sol registró sus certificados en el DID e integró sensores IoT para certificar la cadena de frío."
  },
  {
    question: "¿Qué porcentaje adicional de margen obtiene TransLogística Ibérica con su servicio de 'Envío con Huella Verificada'?",
    options: ["5%", "10%", "15%", "20%"],
    correctIndex: 2,
    explanation: "TransLogística Ibérica ofrece un servicio premium con un 15% de margen adicional gracias a la certificación automática de CO2 por ruta."
  },
  {
    question: "¿Qué herramienta usa el Hospital para compartir datos de consumo sin exponer información de pacientes?",
    options: ["ODRL Validator", "Anonimizador GDPR", "Carbon Tracker", "Trade Finance Scoring"],
    correctIndex: 1,
    explanation: "El Hospital Universitario Central utiliza el Anonimizador GDPR para compartir datos agregados de consumo con investigadores de forma segura."
  },
  {
    question: "¿Cuántas licitaciones públicas adicionales ganaron las cooperativas del Sur gracias a la medición del SROI?",
    options: ["20% más", "30% más", "40% más", "50% más"],
    correctIndex: 2,
    explanation: "Las cooperativas federadas ganaron un 40% más de licitaciones públicas al poder demostrar su impacto social con datos verificados."
  }
];

export default function DocumentoExplicativo14() {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
    setShowResults(prev => ({ ...prev, [questionIndex]: true }));
    
    if (answerIndex === quizQuestions[questionIndex].correctIndex) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const totalSections = userStories.length;
  const completedSections = openSections.length;
  const progress = (completedSections / totalSections) * 100;

  const correctAnswers = Object.entries(quizAnswers).filter(
    ([idx, ans]) => ans === quizQuestions[Number(idx)].correctIndex
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/guia-usuario">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver
            </Button>
          </Link>
          <Badge variant="secondary" className="text-xs">Documento 14 de 15</Badge>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Biblioteca de Casos de Uso Reales</h1>
          </div>
          <p className="text-muted-foreground">
            Historias de Usuario detalladas por perfil profesional
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progreso de lectura</span>
              <span className="font-medium">{completedSections}/{totalSections} perfiles explorados</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* User Stories */}
        <div className="space-y-4 mb-10">
          {userStories.map((story) => (
            <Collapsible
              key={story.id}
              open={openSections.includes(story.id)}
              onOpenChange={() => toggleSection(story.id)}
            >
              <Card className={`transition-all duration-200 ${openSections.includes(story.id) ? 'ring-2 ring-primary/50' : ''}`}>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${story.color} text-white`}>
                        {story.icon}
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-base sm:text-lg">{story.profile}</CardTitle>
                        <p className="text-sm text-muted-foreground">{story.name} - {story.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {openSections.includes(story.id) && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      <ChevronDown className={`h-5 w-5 transition-transform ${openSections.includes(story.id) ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-6 space-y-4">
                    <div className="grid gap-4">
                      <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
                        <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">🎯 El Desafío</h4>
                        <p className="text-sm">{story.challenge}</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">💡 La Solución</h4>
                        <p className="text-sm">{story.solution}</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">📈 El Resultado</h4>
                        <p className="text-sm">{story.result}</p>
                      </div>
                      
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                        "{story.quote}"
                        <footer className="text-sm font-medium mt-2 not-italic">— {story.name}, {story.company}</footer>
                      </blockquote>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        {/* Quiz Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Quiz: Conoce los Casos de Uso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {quizQuestions.map((q, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium mb-3">{idx + 1}. {q.question}</p>
                <div className="grid gap-2">
                  {q.options.map((option, optIdx) => {
                    const isSelected = quizAnswers[idx] === optIdx;
                    const isCorrect = optIdx === q.correctIndex;
                    const showResult = showResults[idx];

                    return (
                      <Button
                        key={optIdx}
                        variant={showResult && isCorrect ? "default" : isSelected && showResult ? "destructive" : "outline"}
                        className="justify-start h-auto py-2 px-3 text-left"
                        onClick={() => !showResults[idx] && handleQuizAnswer(idx, optIdx)}
                        disabled={showResults[idx]}
                      >
                        <span className="flex items-center gap-2">
                          {showResult && isCorrect && <CheckCircle2 className="h-4 w-4" />}
                          {showResult && isSelected && !isCorrect && <XCircle className="h-4 w-4" />}
                          {option}
                        </span>
                      </Button>
                    );
                  })}
                </div>
                {showResults[idx] && (
                  <p className={`mt-3 text-sm ${quizAnswers[idx] === q.correctIndex ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {q.explanation}
                  </p>
                )}
              </div>
            ))}

            {Object.keys(quizAnswers).length === quizQuestions.length && (
              <div className="p-4 rounded-lg bg-primary/10 text-center">
                <p className="text-lg font-semibold">
                  🏆 Resultado: {correctAnswers}/{quizQuestions.length} respuestas correctas
                </p>
                {correctAnswers === quizQuestions.length && (
                  <p className="text-green-600 dark:text-green-400 mt-1">¡Perfecto! Dominas los casos de uso reales.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/documento-explicativo-13">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Documento 13
            </Button>
          </Link>
          <Link to="/documento-explicativo-15">
            <Button>
              Documento 15 <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
