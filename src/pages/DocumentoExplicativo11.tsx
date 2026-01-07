import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, ChevronDown, ChevronUp, Trophy, Factory, ShoppingCart, Wheat, Car, Heart, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: number;
  title: string;
  icon: React.ReactNode;
  content: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}

const sections: Section[] = [
  {
    id: 1,
    title: "Sector Industrial (51,18%): Manufactura, Automoción y Energía",
    icon: <Factory className="h-6 w-6" />,
    content: [
      "Trazabilidad de Materias Primas: Registro inmutable del origen (acero, litio, minerales) para cumplir CBAM.",
      "Homologación Just-in-Time: Alta de proveedores críticos en menos de 48 horas, evitando paradas de línea.",
      "Gestión MRO: Validación centralizada de contratas de mantenimiento con cumplimiento ISO 45001."
    ],
    quiz: {
      question: "¿Qué normativa relacionada con el carbono requiere trazabilidad de materiales?",
      options: ["ISO 9001", "CSRD", "CBAM", "GDPR"],
      correctIndex: 2
    }
  },
  {
    id: 2,
    title: "Sector Comercio (15%): Retail, E-commerce y Distribución",
    icon: <ShoppingCart className="h-6 w-6" />,
    content: [
      "Optimización de Temporada: IA para predecir picos de demanda y evitar rotura de inventario.",
      "Ética de Suministro: Validación automática de auditorías sociales (Sedex, BSCI) contra vulneración de derechos humanos.",
      "Logística de Última Milla: Verificación de proveedores de reparto cumpliendo ZBE y sostenibilidad urbana."
    ],
    quiz: {
      question: "¿Qué auditorías se validan para garantizar ética en el suministro?",
      options: ["ISO 14001", "Sedex y BSCI", "CBAM", "CSRD"],
      correctIndex: 1
    }
  },
  {
    id: 3,
    title: "Sector Agroalimentario (12%): Agricultura, Ganadería y Alimentación",
    icon: <Wheat className="h-6 w-6" />,
    content: [
      "De la Granja a la Mesa: Registro inmutable de certificados sanitarios y fitosanitarios vinculados al DID.",
      "Gestión de la Cadena de Frío: Integración de datos IoT para validar calidad durante el transporte.",
      "Denominaciones de Origen: Notario digital que certifica procedencia geográfica contra fraude alimentario."
    ],
    quiz: {
      question: "¿Qué tecnología se integra para validar la cadena de frío?",
      options: ["Blockchain", "Sensores IoT", "Smart Contracts", "DIDs"],
      correctIndex: 1
    }
  },
  {
    id: 4,
    title: "Sector Movilidad Sostenible (10%): Transporte y Logística",
    icon: <Car className="h-6 w-6" />,
    content: [
      "Reporting Alcance 3: Reporte exacto de CO2 por ruta para completar informes de sostenibilidad.",
      "Validación de Flotas Eléctricas: Verificación de disponibilidad y origen verde de energía de carga.",
      "Logística Colaborativa: Hubs de datos para optimizar retornos vacíos y reducir costes y emisiones."
    ],
    quiz: {
      question: "¿Qué facilita ProcureData para reportar emisiones de transporte?",
      options: ["Scope 1", "Scope 2", "Reporting Alcance 3", "CBAM"],
      correctIndex: 2
    }
  },
  {
    id: 5,
    title: "Sector Salud (7%): Farmacéutico y Equipamiento Médico",
    icon: <Heart className="h-6 w-6" />,
    content: [
      "Cumplimiento EMA/MDR: Verificación instantánea de licencias y marcados CE de dispositivos médicos.",
      "Cadena de Custodia Farmacéutica: Rastreo inmutable de manipulación de fármacos sensibles.",
      "Privacidad PII: Anonimizador GDPR para compartir datos clínicos sin revelar identidades."
    ],
    quiz: {
      question: "¿Qué servicio protege identidades al compartir datos de ensayos clínicos?",
      options: ["Cadena de Custodia", "Anonimizador GDPR", "Validador MDR", "DID Web3"],
      correctIndex: 1
    }
  },
  {
    id: 6,
    title: "Sector Economía Social (5%): Cooperativas y Tercer Sector",
    icon: <Users className="h-6 w-6" />,
    content: [
      "Compra Pública Ética: Localización de proveedores de economía social con cláusulas sociales.",
      "Medición del SROI: BI que calcula Retorno Social de la Inversión en impacto comunitario.",
      "Gobernanza Democrática: Políticas de datos donde todos los miembros mantienen control sobre su información."
    ],
    quiz: {
      question: "¿Qué métrica traduce el gasto en proveedores locales en impacto positivo?",
      options: ["ROI", "SROI (Retorno Social de la Inversión)", "Health Score", "KPI"],
      correctIndex: 1
    }
  }
];

export default function DocumentoExplicativo11() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleSection = (id: number) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleQuizAnswer = (sectionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [sectionId]: answerIndex }));
    const section = sections.find(s => s.id === sectionId);
    if (section && answerIndex === section.quiz.correctIndex) {
      if (!completedSections.includes(sectionId)) {
        const newCompleted = [...completedSections, sectionId];
        setCompletedSections(newCompleted);
        if (newCompleted.length === sections.length) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
        }
      }
    }
  };

  const progress = (completedSections.length / sections.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl">🎉</motion.div>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ x: 0, y: 0, opacity: 1, rotate: Math.random() * 360 }}
              animate={{ x: (Math.random() - 0.5) * 800, y: (Math.random() - 0.5) * 800, opacity: 0, rotate: Math.random() * 720 }}
              transition={{ duration: 2 + Math.random() * 2 }}
            >
              {["🎊", "⭐", "🏆", "✨", "💎"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/user-guide">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver a la Guía
            </Button>
          </Link>
          <Badge variant="secondary" className="ml-auto">Documento 11 de 15</Badge>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📄 Documento Explicativo 11</h1>
          <p className="text-xl text-muted-foreground mb-4">Profundización por Sectores Estratégicos</p>
          <p className="text-sm text-muted-foreground mb-6">Cómo PROCUREDATA se adapta a las necesidades de los 6 sectores prioritarios.</p>
          
          <div className="flex items-center gap-4 mb-2">
            <Progress value={progress} className="flex-1" />
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <p className="text-xs text-muted-foreground">{completedSections.length} de {sections.length} secciones completadas</p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            const isCompleted = completedSections.includes(section.id);
            const userAnswer = quizAnswers[section.id];

            return (
              <Card key={section.id} className={`transition-all ${isCompleted ? 'border-green-500/50 bg-green-500/5' : ''}`}>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection(section.id)}>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-primary/10 text-primary'}`}>
                        {section.icon}
                      </div>
                      <span className="text-lg">{section.id}. {section.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </CardTitle>
                </CardHeader>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        <div className="space-y-3 mb-6">
                          {section.content.map((item, idx) => (
                            <motion.div key={idx} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-muted-foreground">{item}</span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="font-medium mb-3">🧠 Quiz: {section.quiz.question}</p>
                          <div className="grid gap-2">
                            {section.quiz.options.map((option, idx) => {
                              const isSelected = userAnswer === idx;
                              const isCorrect = idx === section.quiz.correctIndex;
                              const showResult = userAnswer !== null && userAnswer !== undefined;

                              return (
                                <Button
                                  key={idx}
                                  variant={isSelected ? (isCorrect ? "default" : "destructive") : "outline"}
                                  className={`justify-start h-auto py-3 px-4 ${showResult && isCorrect ? 'border-green-500 bg-green-500/10' : ''}`}
                                  onClick={() => handleQuizAnswer(section.id, idx)}
                                  disabled={showResult && isCorrect && isSelected}
                                >
                                  <span className="mr-2">{String.fromCharCode(65 + idx)}.</span>
                                  {option}
                                  {showResult && isSelected && (isCorrect ? <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" /> : <XCircle className="ml-auto h-4 w-4" />)}
                                </Button>
                              );
                            })}
                          </div>
                          {userAnswer !== null && userAnswer !== undefined && userAnswer !== section.quiz.correctIndex && (
                            <p className="text-sm text-muted-foreground mt-3">💡 Pista: Revisa los beneficios específicos del sector.</p>
                          )}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>

        {completedSections.length === sections.length && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50">
              <CardContent className="py-6 text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">¡Documento 11 Completado!</h3>
                <p className="text-muted-foreground mb-4">Dominas la adaptación sectorial de PROCUREDATA.</p>
                <div className="flex gap-4 justify-center">
                  <Link to="/user-guide"><Button variant="outline">Volver a la Guía</Button></Link>
                  <Link to="/documento-explicativo-12"><Button>Siguiente Documento →</Button></Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
