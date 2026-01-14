import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, ChevronDown, ChevronUp, Trophy, Layers, Database, Cpu, Lock, GitBranch, Globe } from "lucide-react";
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
    title: "Stack Tecnológico de PROCUREDATA",
    icon: <Layers className="h-6 w-6" />,
    content: [
      "Frontend: React 18+ con Vite y TypeScript para seguridad de tipos.",
      "Estilos: Tailwind CSS responsivo + shadcn/ui como librería de componentes base.",
      "Backend (BaaS): Supabase con autenticación, almacenamiento, base de datos y Edge Functions.",
      "Infraestructura: Cloud AI orquesta despliegue y sincronización con código fuente."
    ],
    quiz: {
      question: "¿Qué tecnología se usa como empaquetador del frontend?",
      options: ["Webpack", "Vite", "Rollup", "Parcel"],
      correctIndex: 1
    }
  },
  {
    id: 2,
    title: "Esquema de Base de Datos (PostgreSQL)",
    icon: <Database className="h-6 w-6" />,
    content: [
      "28 tablas optimizadas para transacciones soberanas de datos.",
      "organizations: Identidad legal, CIF, sector y estado de verificación KYB.",
      "data_transactions: Ciclo de vida del intercambio (initiated, pending_subject, completed, etc.).",
      "data_policies: Contratos digitales JSONB siguiendo estándar ODRL.",
      "wallets & wallet_transactions: Saldos EUROe e historial inmutable de pagos.",
      "user_profiles: Vincula usuarios Supabase Auth con organizaciones y roles."
    ],
    quiz: {
      question: "¿En qué formato se almacenan los contratos digitales ODRL?",
      options: ["XML", "CSV", "JSONB", "SQL"],
      correctIndex: 2
    }
  },
  {
    id: 3,
    title: "Lógica Serverless: Supabase Edge Functions",
    icon: <Cpu className="h-6 w-6" />,
    content: [
      "Funciones en TypeScript ejecutadas bajo runtime Deno.",
      "chat-ai: Cerebro de ARIA, conecta con Google Gemini y procesa base de conocimiento.",
      "sync-to-github: Escribe correcciones validadas automáticamente al repositorio GitHub.",
      "Seguridad: API Keys nunca expuestas al cliente, usando Secrets cifrados de Supabase."
    ],
    quiz: {
      question: "¿Qué función Edge es el 'cerebro' de ARIA?",
      options: ["sync-to-github", "chat-ai", "auth-handler", "data-processor"],
      correctIndex: 1
    }
  },
  {
    id: 4,
    title: "Seguridad y Row Level Security (RLS)",
    icon: <Lock className="h-6 w-6" />,
    content: [
      "Política Zero Trust (Confianza Cero) a nivel de datos.",
      "RLS Activo: Las 28 tablas tienen RLS; una empresa solo accede a sus propias filas.",
      "Autenticación JWT: Cada petición lleva token que identifica usuario y organización.",
      "Roles RBAC: Permisos segmentados (admin, approver, viewer) según perfil del empleado."
    ],
    quiz: {
      question: "¿Qué garantiza que una empresa solo acceda a sus propios datos?",
      options: ["JWT", "RBAC", "Row Level Security (RLS)", "HTTPS"],
      correctIndex: 2
    }
  },
  {
    id: 5,
    title: "Flujo de Desarrollo e Integración Continua (CI/CD)",
    icon: <GitBranch className="h-6 w-6" />,
    content: [
      "Sincronización GitHub: Cada cambio en Cloud AI genera commit automático al repositorio.",
      "Control de Versiones: Pull Requests desde GitHub para lógica compleja o migraciones SQL.",
      "Despliegue Automático: Al fusionar en rama principal, Cloud AI y Supabase despliegan automáticamente."
    ],
    quiz: {
      question: "¿Qué ocurre al fusionar cambios en la rama principal?",
      options: ["Se detiene el servidor", "Despliegue automático", "Se requiere aprobación manual", "Se crea backup"],
      correctIndex: 1
    }
  },
  {
    id: 6,
    title: "Integración Web3 y DIDs",
    icon: <Globe className="h-6 w-6" />,
    content: [
      "Interacción con red Pontus-X mediante librerías como ethers.js.",
      "Identidad descentralizada (DID) en formato estándar did:ethr:0x7ecc...",
      "Preparación para interoperabilidad con otros espacios de datos europeos."
    ],
    quiz: {
      question: "¿Qué formato sigue la identidad descentralizada (DID)?",
      options: ["did:web:example", "did:ethr:0x...", "did:sov:...", "did:key:..."],
      correctIndex: 1
    }
  }
];

export default function DocumentoExplicativo12() {
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
          <Badge variant="secondary" className="ml-auto">Documento 12 de 15</Badge>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📄 Documento Explicativo 12</h1>
          <p className="text-xl text-muted-foreground mb-4">Manual del Desarrollador y Arquitectura Cloud AI</p>
          <p className="text-sm text-muted-foreground mb-6">Stack técnico, esquema de base de datos, funciones serverless y flujo de despliegue.</p>

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
                            <p className="text-sm text-muted-foreground mt-3">💡 Pista: Revisa los detalles técnicos de la arquitectura.</p>
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
                <h3 className="text-xl font-bold mb-2">¡Documento 12 Completado!</h3>
                <p className="text-muted-foreground mb-4">Dominas la arquitectura técnica de PROCUREDATA.</p>
                <div className="flex gap-4 justify-center">
                  <Link to="/user-guide"><Button variant="outline">Volver a la Guía</Button></Link>
                  <Link to="/documento-explicativo-13"><Button>Siguiente Documento →</Button></Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
