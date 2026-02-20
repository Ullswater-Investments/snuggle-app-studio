import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Award,
  Layers,
  Coins,
  GitBranch,
  Gauge,
  Trophy,
  Sparkles,
  ShieldCheck,
  Leaf,
  Brain,
  Link2,
  Database,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DocumentLayout } from "@/components/DocumentLayout";

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

export default function DocumentoExplicativo2() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["catalogo"]));
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const serviceCatalog = [
    { category: "Compliance", count: 4, services: ["Homologación Flash 24h", "Auditoría Digital ISO", "ODRL License Validator", "Due Diligence Express"], color: "bg-blue-500/10 border-blue-500/30" },
    { category: "Sostenibilidad y ESG", count: 4, services: ["Calculadora Scope 3 (gratuita)", "Auditoría CSRD Automática", "Carbon Tracker ISO 14064", "Certificación Green Partner"], color: "bg-green-500/10 border-green-500/30" },
    { category: "IA & Analytics", count: 3, services: ["Predicción de Demanda AI", "Monitor de Riesgo Proveedor", "Supply Chain Risk AI"], color: "bg-purple-500/10 border-purple-500/30" },
    { category: "Blockchain", count: 2, services: ["Pontus-X Notary Node", "Validador DID Web3"], color: "bg-orange-500/10 border-orange-500/30" },
    { category: "Data Ops y Privacidad", count: 4, services: ["Anonimizador GDPR", "Conector Universal ERP", "Raw Data Normalizer", "GDPR PII Shield"], color: "bg-red-500/10 border-red-500/30" },
    { category: "Inteligencia e Integración", count: 4, services: ["Alertas Comerciales", "Sincronizador ERP", "Trade Finance Scoring", "Factoring Connect"], color: "bg-cyan-500/10 border-cyan-500/30" }
  ];

  const sections: Section[] = [
    {
      id: "catalogo",
      title: "El Catálogo de los 21 Servicios",
      icon: <Layers className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm mb-4">
            ProcureData ofrece un ecosistema de <strong>21 servicios especializados</strong> para potenciar la función de compras:
          </p>
          <div className="grid gap-3">
            {serviceCatalog.map((cat, idx) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn("p-4 rounded-lg border", cat.color)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{cat.category}</h4>
                  <Badge variant="secondary">{cat.count} servicios</Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.services.map(s => (
                    <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Cuántos servicios especializados ofrece ProcureData?",
        options: ["15 servicios", "21 servicios", "30 servicios", "10 servicios"],
        correctIndex: 1
      }
    },
    {
      id: "economia",
      title: "Modelo Económico y Tarifas",
      icon: <Coins className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <span className="text-xl">💶</span> EUROe: Euro Tokenizado
            </h4>
            <p className="text-sm text-muted-foreground">
              Euro tokenizado en la red Pontus-X con <strong>paridad 1:1</strong> para garantizar trazabilidad inmutable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Tier Gratuito</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-2">1 EUROe</p>
                <p className="text-xs text-muted-foreground">por transacción</p>
                <ul className="mt-3 text-sm space-y-1 text-muted-foreground">
                  <li>✓ Pago por uso</li>
                  <li>✓ Acceso total al marketplace</li>
                  <li>✓ Sin costes fijos</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  Membresía Pro <Badge>Popular</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-2">300 EUROe</p>
                <p className="text-xs text-muted-foreground">por mes</p>
                <ul className="mt-3 text-sm space-y-1 text-muted-foreground">
                  <li>✓ Transacciones ilimitadas</li>
                  <li>✓ Soporte prioritario</li>
                  <li>✓ APIs avanzadas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
            💡 Los servicios premium tienen costes específicos (ej. Homologación Flash: 150 EUROe)
          </p>
        </div>
      ),
      quiz: {
        question: "¿Cuál es la unidad de pago en ProcureData?",
        options: ["Bitcoin", "EUROe (euro tokenizado)", "Dólares USD", "Puntos de crédito"],
        correctIndex: 1
      }
    },
    {
      id: "flujo",
      title: "Flujo Operativo: Del Registro a la Transacción",
      icon: <GitBranch className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Proceso técnico para completar un intercambio de datos soberano:
          </p>
          <div className="space-y-3">
            {[
              { step: 1, title: "Registro y Validación KYB", desc: "La empresa se registra y aporta documentación legal. Se realiza proceso Know Your Business.", status: "Entidad Verificada" },
              { step: 2, title: "Configuración de la Wallet", desc: "Se asigna una dirección DID única y se carga saldo en EUROe.", status: "Wallet Activa" },
              { step: 3, title: "Búsqueda en el Marketplace", desc: "Buscar proveedores usando filtros por sector, certificaciones ISO o badges.", status: "Exploración" },
              { step: 4, title: "Solicitud de Acceso", desc: "El comprador solicita el Pasaporte Digital. Los fondos se bloquean en Escrow.", status: "Initiated" },
              { step: 5, title: "Aprobación del Proveedor", desc: "El titular autoriza el intercambio basándose en la política ODRL.", status: "Pending Subject" },
              { step: 6, title: "Entrega y Notarización", desc: "El Data Holder libera la información. Se genera hash en blockchain.", status: "Completed" }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </div>
                <div className="flex-1 pb-4 border-b last:border-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <Badge variant="outline" className="text-xs">{item.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué ocurre cuando el comprador solicita un Pasaporte Digital?",
        options: [
          "Se envía un email al proveedor",
          "Los fondos se bloquean en un contrato Escrow",
          "Se descarga automáticamente",
          "Se cancela la transacción"
        ],
        correctIndex: 1
      }
    },
    {
      id: "herramientas",
      title: "Herramientas e Interfaz Interactiva",
      icon: <Gauge className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            La aplicación integra widgets dinámicos para facilitar la toma de decisiones:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Calculadora de ROI", icon: <TrendingUp className="h-6 w-6" />, desc: "Simula el ahorro económico anual al migrar de procesos manuales a la automatización.", color: "text-green-600" },
              { name: "Impact Gauge (ESG)", icon: <Leaf className="h-6 w-6" />, desc: "Visor tipo semáforo que muestra el desempeño ambiental y simula mejoras.", color: "text-emerald-600" },
              { name: "Innovation Lab", icon: <Brain className="h-6 w-6" />, desc: "Radar de Madurez Tecnológica y Simulador de Smart Contracts.", color: "text-purple-600" },
              { name: "Health Score", icon: <Gauge className="h-6 w-6" />, desc: "Indicador de calidad y actualización de datos. Mayor puntuación = mejor posicionamiento.", color: "text-blue-600" }
            ].map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-muted/50 rounded-lg border hover:border-primary/50 transition-colors"
              >
                <div className={cn("mb-2", tool.color)}>{tool.icon}</div>
                <h4 className="font-semibold text-sm">{tool.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué indicador determina el posicionamiento en el marketplace?",
        options: ["Calculadora de ROI", "Innovation Lab", "Health Score", "Impact Gauge"],
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
      if (newCompleted.size === sections.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const progress = (completedSections.size / sections.length) * 100;

  return (
    <DocumentLayout>
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
              <p>Has completado el Documento Explicativo 2</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto py-8 px-6">

        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-2">Documento 2 de 15</Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Catálogo de Servicios y Funcionamiento Operativo
                </h1>
                <p className="text-muted-foreground">
                  Oferta de servicios, estructura de costes y flujo técnico para operar en ProcureData.
                </p>
              </div>
              <Sparkles className="h-8 w-8 text-primary hidden md:block" />
            </div>
          </div>
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
                <Card className={cn("transition-all", isCompleted && "border-primary/50 bg-primary/5")}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", isCompleted ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : section.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">{index + 1}. {section.title}</h3>
                        {isCompleted && <span className="text-xs text-primary">Completado ✓</span>}
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t">
                          {section.content}
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
                                        !showResult && "hover:bg-primary/10 hover:border-primary/50 bg-background",
                                        showResult && isCorrect && "bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-300",
                                        showResult && isSelected && !isCorrect && "bg-destructive/10 border-destructive/50 text-destructive"
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
                                <p className="text-sm text-destructive mt-3">Respuesta incorrecta. ¡Revisa el contenido!</p>
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

        <div className="mt-8 flex justify-between items-center">
          <Link to="/user-guide">
            <Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" /> Volver a la Guía</Button>
          </Link>
          {completedSections.size === sections.length && (
            <Badge variant="default" className="text-base py-2 px-4">
              <Trophy className="h-4 w-4 mr-2" /> ¡Documento completado!
            </Badge>
          )}
        </div>
      </div>
    </DocumentLayout>
  );
}
