import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Award,
  Target,
  Users,
  Shield,
  Globe,
  Factory,
  ShoppingCart,
  Leaf,
  Car,
  Heart,
  HandHeart,
  Sparkles,
  Trophy,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}

export default function DocumentoExplicativo1() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["intro"]));
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const sections: Section[] = [
    {
      id: "intro",
      title: "¿Qué es ProcureData?",
      icon: <BookOpen className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">ProcureData</strong> es un <Badge variant="secondary">Espacio de Datos para la Función de Compras</Badge> (Procurement Data Space).
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm">
              Se trata de una infraestructura digital diseñada para facilitar la <strong>compartición de datos de valor añadido</strong> entre empresas, siguiendo los estándares europeos de soberanía, transparencia y seguridad.
            </p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Shield className="h-8 w-8 text-primary" />
            <p className="text-sm">
              <strong>No es una base de datos centralizada</strong>, sino un ecosistema descentralizado donde cada organización mantiene el control sobre su información.
            </p>
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué tipo de infraestructura es ProcureData?",
        options: [
          "Una base de datos centralizada",
          "Un ecosistema descentralizado",
          "Un servidor único de almacenamiento",
          "Una red social empresarial"
        ],
        correctIndex: 1
      }
    },
    {
      id: "problema",
      title: "El Problema nxm",
      icon: <Target className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="text-destructive">❌</span> Situación Actual
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Cada proveedor <strong>(n)</strong> debe repetir sus procesos de alta, homologación y certificados para cada nuevo cliente <strong>(m)</strong>.
                <div className="mt-3 p-2 bg-background rounded text-center font-mono text-lg">
                  n × m = <span className="text-destructive">Redundancia masiva</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="text-primary">✅</span> Solución ProcureData
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Un proveedor se valida <strong>una sola vez</strong>. Su "Pasaporte Digital" se comparte instantáneamente.
                <div className="mt-3 p-2 bg-background rounded text-center font-mono text-lg">
                  n × m → <span className="text-primary">1 validación</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="p-4 border rounded-lg bg-muted/30">
            <h4 className="font-semibold mb-2">💡 El Impacto</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Semanas de retraso administrativo eliminadas</li>
              <li>• Reducción drástica de costes operativos</li>
              <li>• Eliminación de errores en custodia de documentos</li>
            </ul>
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué problema resuelve el modelo nxm?",
        options: [
          "Problemas de conectividad a internet",
          "Redundancia en procesos de validación entre proveedores y clientes",
          "Falta de espacio de almacenamiento",
          "Problemas de idioma entre empresas"
        ],
        correctIndex: 1
      }
    },
    {
      id: "roles",
      title: "Roles del Ecosistema",
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            El <strong>Triángulo de Confianza</strong> define tres actores principales:
          </p>
          <div className="grid gap-4">
            {[
              {
                role: "Consumer",
                subtitle: "Consumidor",
                description: "La entidad (generalmente el comprador) que solicita acceso a datos específicos para validar a un proveedor o analizar riesgos.",
                color: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300",
                icon: "🛒"
              },
              {
                role: "Provider",
                subtitle: "Proveedor/Sujeto",
                description: "El titular original de los datos. Es quien ejerce la soberanía, autorizando o denegando quién puede ver su información.",
                color: "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300",
                icon: "🏢"
              },
              {
                role: "Data Holder",
                subtitle: "Custodio",
                description: "La entidad técnica (como agencias certificadoras o ERPs) que posee físicamente el dato verificado y lo entrega de forma segura.",
                color: "bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-300",
                icon: "🔐"
              }
            ].map((item, idx) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn("p-4 rounded-lg border", item.color)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold">{item.role} <span className="font-normal text-muted-foreground">({item.subtitle})</span></h4>
                    <p className="text-sm mt-1 opacity-90">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Quién ejerce la soberanía sobre los datos en ProcureData?",
        options: [
          "El Consumer (Comprador)",
          "El Data Holder (Custodio)",
          "El Provider (Proveedor/Sujeto)",
          "La Unión Europea"
        ],
        correctIndex: 2
      }
    },
    {
      id: "estandares",
      title: "Infraestructura y Estándares Europeos",
      icon: <Globe className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            ProcureData está alineado con la estrategia de la <strong>Unión Europea</strong> para espacios de datos:
          </p>
          <div className="grid gap-3">
            {[
              {
                name: "Gaia-X",
                description: "Trust Framework para verificar entidades legales",
                badge: "Confianza"
              },
              {
                name: "IDS (International Data Spaces)",
                description: "Conector EDC y protocolo IDS para intercambio soberano",
                badge: "Interoperabilidad"
              },
              {
                name: "Blockchain Pontus-X",
                description: "Huella inmutable (hash) de cada transacción",
                badge: "Inmutabilidad"
              }
            ].map((standard, idx) => (
              <motion.div
                key={standard.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{standard.name}</h4>
                  <p className="text-xs text-muted-foreground">{standard.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">{standard.badge}</Badge>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué tecnología garantiza la inmutabilidad de las transacciones?",
        options: [
          "Gaia-X",
          "IDS Protocol",
          "Blockchain Pontus-X",
          "Eclipse Connector"
        ],
        correctIndex: 2
      }
    },
    {
      id: "sectores",
      title: "Sectores Estratégicos",
      icon: <Factory className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            ProcureData prioriza los siguientes sectores según su cuota de uso de sistemas ERP:
          </p>
          <div className="space-y-3">
            {[
              { name: "Industrial", percent: 51.18, icon: <Factory className="h-4 w-4" />, note: "Foco principal" },
              { name: "Comercio", percent: 15, icon: <ShoppingCart className="h-4 w-4" /> },
              { name: "Agroalimentario", percent: 12, icon: <Leaf className="h-4 w-4" /> },
              { name: "Movilidad Sostenible", percent: 10, icon: <Car className="h-4 w-4" /> },
              { name: "Salud", percent: 7, icon: <Heart className="h-4 w-4" /> },
              { name: "Economía Social", percent: 5, icon: <HandHeart className="h-4 w-4" /> }
            ].map((sector, idx) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-sm">
                    {sector.icon}
                    <span>{sector.name}</span>
                    {sector.note && <Badge variant="secondary" className="text-xs">{sector.note}</Badge>}
                  </div>
                  <span className="text-sm font-semibold">{sector.percent}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${sector.percent}%` }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Cuál es el sector con mayor foco en ProcureData?",
        options: [
          "Comercio",
          "Salud",
          "Industrial",
          "Agroalimentario"
        ],
        correctIndex: 2
      }
    }
  ];

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const handleQuizAnswer = (sectionId: string, answerIndex: number, correctIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [sectionId]: answerIndex }));
    if (answerIndex === correctIndex) {
      const newCompleted = new Set(completedSections);
      newCompleted.add(sectionId);
      setCompletedSections(newCompleted);
      
      // Check if all sections completed
      if (newCompleted.size === sections.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const progress = (completedSections.size / sections.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4"
            >
              <Trophy className="h-16 w-16" />
              <h2 className="text-2xl font-bold">¡Felicidades!</h2>
              <p>Has completado el Documento Explicativo 1</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="procuredata-gradient font-bold text-xl">PROCUREDATA</span>
          </Link>
        </div>

        {/* Title Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-2">Documento 1 de 15</Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Fundamentos, Visión y el Modelo "nxm"
                </h1>
                <p className="text-muted-foreground">
                  Definir la naturaleza de ProcureData, el problema estructural que resuelve y los pilares de confianza.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="p-4 border-t bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tu progreso</span>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">{completedSections.size}/{sections.length} secciones</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </Card>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => {
            const isExpanded = expandedSections.has(section.id);
            const isCompleted = completedSections.has(section.id);
            const quizAnswer = quizAnswers[section.id];

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={cn(
                  "transition-all duration-200",
                  isCompleted && "border-primary/50 bg-primary/5"
                )}>
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        isCompleted ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}>
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : section.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">{index + 1}. {section.title}</h3>
                        {isCompleted && (
                          <span className="text-xs text-primary">Completado ✓</span>
                        )}
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>

                  {/* Section Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t">
                          {section.content}

                          {/* Quiz */}
                          {section.quiz && (
                            <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <span className="text-lg">🎯</span> Pregunta de comprensión
                              </h4>
                              <p className="text-sm mb-4">{section.quiz.question}</p>
                              <div className="grid gap-2">
                                {section.quiz.options.map((option, optIdx) => {
                                  const isSelected = quizAnswer === optIdx;
                                  const isCorrect = optIdx === section.quiz!.correctIndex;
                                  const showResult = quizAnswer !== null && quizAnswer !== undefined;

                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => handleQuizAnswer(section.id, optIdx, section.quiz!.correctIndex)}
                                      disabled={showResult}
                                      className={cn(
                                        "p-3 text-left text-sm rounded-lg border transition-all",
                                        !showResult && "hover:bg-primary/10 hover:border-primary/50",
                                        showResult && isCorrect && "bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-300",
                                        showResult && isSelected && !isCorrect && "bg-destructive/10 border-destructive/50 text-destructive",
                                        !showResult && "bg-background"
                                      )}
                                    >
                                      <span className="font-medium mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                                      {option}
                                      {showResult && isCorrect && <span className="ml-2">✓</span>}
                                      {showResult && isSelected && !isCorrect && <span className="ml-2">✗</span>}
                                    </button>
                                  );
                                })}
                              </div>
                              {quizAnswer !== null && quizAnswer !== undefined && quizAnswer !== section.quiz.correctIndex && (
                                <p className="text-sm text-destructive mt-3">
                                  Respuesta incorrecta. ¡Revisa el contenido e inténtalo de nuevo!
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between items-center">
          <Link to="/user-guide">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver a la Guía
            </Button>
          </Link>
          {completedSections.size === sections.length && (
            <Badge variant="default" className="text-base py-2 px-4">
              <Trophy className="h-4 w-4 mr-2" /> ¡Documento completado!
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
