import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, ChevronDown, ChevronUp, Trophy, Bot, HeartHandshake, Target, BrainCircuit, RefreshCw, Settings2 } from "lucide-react";
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
    title: "Identidad y Tono de ARIA",
    icon: <Bot className="h-6 w-6" />,
    content: [
      "ARIA: Asistente de Recursos e Información Automatizada, refleja valores de soberanía y precisión.",
      "Personalidad B2B: Profesional pero accesible, evita lenguaje informal inapropiado.",
      "Neutralidad: Respuestas basadas exclusivamente en base de conocimiento, sin alucinaciones.",
      "Multilingüismo: Cambio nativo entre español e inglés manteniendo terminología técnica."
    ],
    quiz: {
      question: "¿Qué significa ARIA?",
      options: ["Asistente de Recursos e Información Automatizada", "Automated Resource Intelligence Assistant", "AI Resource Instant Access", "Artificial Response Interface Agent"],
      correctIndex: 0
    }
  },
  {
    id: 2,
    title: "Gestión de la Empatía y Crisis",
    icon: <HeartHandshake className="h-6 w-6" />,
    content: [
      "Detección de Frustración: Si usuario usa lenguaje agresivo, ARIA cambia a modo 'soporte prioritario'.",
      "Ejemplo empático: 'Lamento mucho que estés teniendo dificultades. Vamos a resolverlo paso a paso...'",
      "Trato con Escépticos: Responde dudas técnicas con datos empíricos de la Memoria Técnica."
    ],
    quiz: {
      question: "¿Qué hace ARIA al detectar frustración del usuario?",
      options: ["Cierra la conversación", "Activa modo 'soporte prioritario'", "Redirige a otro sistema", "Ignora el mensaje"],
      correctIndex: 1
    }
  },
  {
    id: 3,
    title: "Reconocimiento de Intenciones (Intent Mapping)",
    icon: <Target className="h-6 w-6" />,
    content: [
      "Triggers de Widgets: Palabras como 'ahorro', 'sostenibilidad' o 'madurez' activan etiquetas [WIDGET_ROI].",
      "Acciones Proactivas: ARIA sugiere herramientas visuales, no solo texto.",
      "Ejemplo: '¿Cómo sé si soy sostenible?' → 'Puedes medir usando nuestro [ImpactGauge] en sostenibilidad'."
    ],
    quiz: {
      question: "¿Qué palabra clave podría activar un widget de ROI?",
      options: ["Blockchain", "Ahorro", "Seguridad", "Registro"],
      correctIndex: 1
    }
  },
  {
    id: 4,
    title: "Consultoría Estratégica en Diálogo",
    icon: <BrainCircuit className="h-6 w-6" />,
    content: [
      "ARIA mantiene conversaciones de nivel consultivo, no solo soporte básico.",
      "Asesoría Normativa: Guía sobre CSRD preguntando por sector y tamaño para recomendaciones personalizadas.",
      "Simulación de Negocio: Ayuda a CPOs a construir casos internos. Ej: '500 validaciones automatizadas = 40% equipo liberado'."
    ],
    quiz: {
      question: "¿Qué tipo de asesoría puede ofrecer ARIA sobre la directiva CSRD?",
      options: ["Solo links a documentación", "Recomendaciones personalizadas por sector y tamaño", "Derivación a soporte humano", "Información genérica"],
      correctIndex: 1
    }
  },
  {
    id: 5,
    title: "El Bucle de Retroalimentación (Learning Loop)",
    icon: <RefreshCw className="h-6 w-6" />,
    content: [
      "Captura de Feedback: Cada respuesta incluye botones de 👍 y 👎.",
      "Corrección del Usuario: Si marca error, puede escribir la respuesta correcta.",
      "Supervisión Humana: Correcciones llegan al panel /admin/learning-hub.",
      "Actualización GitHub: Corrección aprobada se inyecta automáticamente al archivo maestro de conocimiento."
    ],
    quiz: {
      question: "¿Dónde llegan las correcciones de usuarios para supervisión?",
      options: ["Email de soporte", "/admin/learning-hub", "Base de datos pública", "Slack del equipo"],
      correctIndex: 1
    }
  },
  {
    id: 6,
    title: "Configuración Técnica del Motor (Gemini)",
    icon: <Settings2 className="h-6 w-6" />,
    content: [
      "Temperatura 0.1 - 0.2: Creatividad mínima para no desviarse de datos oficiales.",
      "Context Window: Historial reciente de conversación para 'memoria' sin repetir información.",
      "Motor: Google Gemini integrado para procesamiento de lenguaje natural avanzado."
    ],
    quiz: {
      question: "¿Por qué se mantiene la temperatura baja (0.1-0.2) en el motor de IA?",
      options: ["Para mayor velocidad", "Para reducir costes", "Para no desviarse de datos oficiales", "Para multilingüismo"],
      correctIndex: 2
    }
  }
];

export default function DocumentoExplicativo13() {
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
          <Badge variant="secondary" className="ml-auto">Documento 13 de 15</Badge>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📄 Documento Explicativo 13</h1>
          <p className="text-xl text-muted-foreground mb-4">Simulación de Diálogos y Entrenamiento de Lenguaje Natural (NLU)</p>
          <p className="text-sm text-muted-foreground mb-6">Personalidad, capacidades de comprensión y aprendizaje continuo de ARIA.</p>
          
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
                            <p className="text-sm text-muted-foreground mt-3">💡 Pista: Revisa las capacidades de ARIA en esa sección.</p>
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
                <h3 className="text-xl font-bold mb-2">¡Documento 13 Completado!</h3>
                <p className="text-muted-foreground mb-4">Dominas el funcionamiento de ARIA y su entrenamiento NLU.</p>
                <div className="flex gap-4 justify-center">
                  <Link to="/user-guide"><Button variant="outline">Volver a la Guía</Button></Link>
                  <Link to="/documento-explicativo-14"><Button>Siguiente Documento →</Button></Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
