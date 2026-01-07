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
  Coins,
  ShieldCheck,
  Plug,
  FlaskConical,
  Trophy,
  Lock,
  Eye,
  Fingerprint,
  Database,
  FileJson,
  Webhook,
  Server
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

export default function DocumentoExplicativo4() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["finanzas"]));
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const sections: Section[] = [
    {
      id: "finanzas",
      title: "Finanzas Programables: El EUROe",
      icon: <Coins className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <span className="text-2xl">💶</span> ¿Qué es el EUROe?
            </h4>
            <p className="text-sm text-muted-foreground">
              Token de dinero electrónico (e-money token) regulado bajo la normativa <strong>MiCA</strong> de la Unión Europea. Tiene paridad <strong>1:1 con el euro</strong> y está respaldado por reservas bancarias auditadas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-blue-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-600" /> Escrow (Garantía)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Los fondos se bloquean en un <strong>contrato inteligente</strong> al inicio. Solo se liberan al vendedor cuando el comprador valida los datos recibidos.
              </CardContent>
            </Card>
            <Card className="border-green-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Eye className="h-4 w-4 text-green-600" /> Trazabilidad Inmutable
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Cada movimiento financiero queda registrado en <strong>blockchain Pontus-X</strong>. Historial auditable que no puede ser alterado.
              </CardContent>
            </Card>
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué normativa europea regula el EUROe?",
        options: ["GDPR", "MiCA", "CSRD", "PSD2"],
        correctIndex: 1
      }
    },
    {
      id: "seguridad",
      title: "Ciberseguridad y Robustez Técnica",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Arquitectura de seguridad de <strong>grado institucional</strong>:
          </p>
          <div className="grid gap-3">
            {[
              { name: "Cifrado Avanzado", icon: <Lock className="h-5 w-5" />, desc: "AES-256 en reposo y TLS 1.3 en tránsito", color: "text-blue-600" },
              { name: "Row Level Security (RLS)", icon: <Database className="h-5 w-5" />, desc: "Seguridad a nivel de fila. Imposible acceder a registros de otra organización sin autorización.", color: "text-purple-600" },
              { name: "Zero Trust", icon: <ShieldCheck className="h-5 w-5" />, desc: "No se confía en ningún usuario por defecto. Verificación mediante Keycloak y tokens JWT.", color: "text-red-600" },
              { name: "Identidad Digital (DID)", icon: <Fingerprint className="h-5 w-5" />, desc: "Identificadores descentralizados en blockchain que certifican la identidad legal.", color: "text-green-600" }
            ].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border"
              >
                <div className={cn("p-2 bg-background rounded-lg", item.color)}>{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué tecnología hace imposible que una organización acceda a registros de otra?",
        options: ["Cifrado AES-256", "Row Level Security (RLS)", "Tokens JWT", "TLS 1.3"],
        correctIndex: 1
      }
    },
    {
      id: "erp",
      title: "Integración con ERPs Legacy y Modernos",
      icon: <Plug className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            ProcureData convive con la infraestructura tecnológica actual, independientemente de su antigüedad:
          </p>
          <div className="space-y-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Server className="h-4 w-4" /> Conector Universal ERP
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Módulo "traductor" que permite a sistemas antiguos (SAP, Oracle, Navision) intercambiar datos mediante <strong>CSV, SFTP o conexiones directas</strong> a bases de datos.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Webhook className="h-4 w-4" /> APIs REST y Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Integración nativa para sistemas modernos. Los <strong>Webhooks</strong> avisan automáticamente al ERP cuando un proveedor ha sido homologado.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileJson className="h-4 w-4" /> Estándar JSON-LD
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Formato semántico que asegura que los datos sean legibles por cualquier software de gestión empresarial moderno.
              </CardContent>
            </Card>
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué formato de datos utiliza ProcureData para interoperabilidad?",
        options: ["XML", "CSV únicamente", "JSON-LD", "YAML"],
        correctIndex: 2
      }
    },
    {
      id: "resiliencia",
      title: "Resiliencia y Entorno de Pruebas",
      icon: <FlaskConical className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg"
            >
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <FlaskConical className="h-5 w-5 text-orange-600" /> Modo Sandbox
              </h4>
              <p className="text-sm text-muted-foreground">
                Entorno de pruebas completo donde IT puede simular integraciones y transacciones de EUROe <strong>sin riesgo real</strong> para fondos o datos de producción.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg"
            >
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-indigo-600" /> Registro de Auditoría
              </h4>
              <p className="text-sm text-muted-foreground">
                Cada acción crítica genera una <strong>huella digital</strong> que permite reconstruir cualquier evento técnico o administrativo para auditorías exigentes.
              </p>
            </motion.div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg border">
            <h4 className="font-semibold mb-2">🔒 Beneficios del Sandbox</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Pruebas de integración sin afectar producción</li>
              <li>✓ Simulación de transacciones EUROe</li>
              <li>✓ Validación de flujos antes del go-live</li>
              <li>✓ Formación de equipos técnicos</li>
            </ul>
          </div>
        </div>
      ),
      quiz: {
        question: "¿Para qué sirve el Modo Sandbox de ProcureData?",
        options: [
          "Para almacenar datos de producción",
          "Para simular integraciones y transacciones sin riesgo real",
          "Para cifrar documentos",
          "Para generar reportes de sostenibilidad"
        ],
        correctIndex: 1
      }
    }
  ];

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
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
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {showConfetti && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
              <Trophy className="h-16 w-16" />
              <h2 className="text-2xl font-bold">¡Felicidades!</h2>
              <p>Has completado el Documento Explicativo 4</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/user-guide"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-2" /> Volver a Guía</Button></Link>
        </div>

        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 p-6">
            <Badge className="mb-2">Documento 4 de 15</Badge>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Finanzas, Ciberseguridad e Integración ERP</h1>
            <p className="text-muted-foreground">Infraestructura financiera EUROe, protocolos de seguridad y estrategias de integración.</p>
          </div>
          <div className="p-4 border-t bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tu progreso</span>
              <div className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /><span className="text-sm font-semibold">{completedSections.size}/{sections.length}</span></div>
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
              <motion.div key={section.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card className={cn("transition-all", isCompleted && "border-primary/50 bg-primary/5")}>
                  <button onClick={() => toggleSection(section.id)} className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg">
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
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="p-4 pt-0 border-t">
                          {section.content}
                          {section.quiz && (
                            <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                              <h4 className="font-semibold mb-3">🎯 Pregunta de comprensión</h4>
                              <p className="text-sm mb-4">{section.quiz.question}</p>
                              <div className="grid gap-2">
                                {section.quiz.options.map((option, optIdx) => {
                                  const isSelected = quizAnswer === optIdx;
                                  const isCorrect = optIdx === section.quiz!.correctIndex;
                                  const showResult = quizAnswer !== null && quizAnswer !== undefined;
                                  return (
                                    <button key={optIdx} onClick={() => handleQuizAnswer(section.id, optIdx, section.quiz!.correctIndex)} disabled={showResult}
                                      className={cn("p-3 text-left text-sm rounded-lg border transition-all", !showResult && "hover:bg-primary/10 bg-background", showResult && isCorrect && "bg-green-500/10 border-green-500/50", showResult && isSelected && !isCorrect && "bg-destructive/10 border-destructive/50")}>
                                      <span className="font-medium mr-2">{String.fromCharCode(65 + optIdx)}.</span>{option}
                                      {showResult && isCorrect && " ✓"}{showResult && isSelected && !isCorrect && " ✗"}
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
          <Link to="/user-guide"><Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" /> Volver</Button></Link>
          {completedSections.size === sections.length && <Badge className="text-base py-2 px-4"><Trophy className="h-4 w-4 mr-2" /> ¡Completado!</Badge>}
        </div>
      </div>
    </div>
  );
}
