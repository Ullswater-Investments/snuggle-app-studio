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
  Target,
  Users,
  Gift,
  Calendar,
  Globe,
  Trophy,
  TrendingUp,
  Handshake,
  GraduationCap,
  Newspaper,
  Rocket
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

export default function DocumentoExplicativo5() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["valor"]));
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const sections: Section[] = [
    {
      id: "valor",
      title: "Propuesta de Valor Estratégica",
      icon: <Target className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-lg text-center">
            <p className="text-lg font-bold text-primary mb-2">"Validated Once, Accepted Everywhere"</p>
            <p className="text-sm text-muted-foreground">Validado una vez, aceptado en todas partes</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-red-500/30 bg-red-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="text-red-600">❌</span> Sin ProcureData
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  100 compradores × 500 proveedores = <strong className="text-red-600">50,000 validaciones manuales</strong>
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="text-green-600">✅</span> Con ProcureData
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Los mismos proveedores = <strong className="text-green-600">500 validaciones únicas</strong>
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg border">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Efecto de Red
            </h4>
            <p className="text-sm text-muted-foreground">
              A medida que más empresas se unen, el valor del "Pasaporte Digital" aumenta. Un proveedor verificado tiene acceso instantáneo a múltiples clientes sin coste adicional.
            </p>
          </div>
        </div>
      ),
      quiz: {
        question: "¿Cuál es el mensaje central de ProcureData?",
        options: [
          "Pay Once, Use Forever",
          "Validated Once, Accepted Everywhere",
          "Connect and Share",
          "Data is Power"
        ],
        correctIndex: 1
      }
    },
    {
      id: "partners",
      title: "Programa de Partners y Colaboraciones",
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            ProcureData crece a través de un ecosistema de socios clasificados en tres niveles:
          </p>
          <div className="space-y-3">
            {[
              { 
                level: "Partners Tecnológicos", 
                subtitle: "ERPs e Integradores",
                icon: <Rocket className="h-5 w-5" />, 
                desc: "Casas de software que integran ProcureData. Beneficio: Revenue Share por transacciones.", 
                color: "bg-blue-500/10 border-blue-500/30" 
              },
              { 
                level: "Partners de Consultoría", 
                subtitle: "Despachos y Consultoras",
                icon: <Handshake className="h-5 w-5" />, 
                desc: "Ayudan a implementar gobernanza de datos y cumplimiento CSRD. Certifican clientes como Green Partners.", 
                color: "bg-purple-500/10 border-purple-500/30" 
              },
              { 
                level: "Partners de Conocimiento", 
                subtitle: "Universidades e Investigación",
                icon: <GraduationCap className="h-5 w-5" />, 
                desc: "Validan modelos de IA y garantizan neutralidad científica. Ej: Universidad Politécnica de Madrid.", 
                color: "bg-green-500/10 border-green-500/30" 
              }
            ].map((item, idx) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn("p-4 rounded-lg border", item.color)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-background rounded-lg">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold">{item.level}</h4>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué tipo de partner valida los modelos de IA de ProcureData?",
        options: ["Partners Tecnológicos", "Partners de Consultoría", "Partners de Conocimiento", "Partners Financieros"],
        correctIndex: 2
      }
    },
    {
      id: "afiliados",
      title: "Modelo de Afiliados e Incentivos",
      icon: <Gift className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Sistema de recompensas programables para acelerar la captación de usuarios:
          </p>
          <div className="grid gap-3">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <span className="text-2xl">💶</span>
                </div>
                <div>
                  <h4 className="font-semibold">Comisiones en EUROe</h4>
                  <p className="text-sm text-muted-foreground">Afiliados que atraigan nuevas organizaciones reciben incentivos directamente en su Wallet.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <div>
                  <h4 className="font-semibold">Membresías Pro para Referidos</h4>
                  <p className="text-sm text-muted-foreground">Empresas que inviten proveedores reciben meses gratis o descuentos en servicios de IA.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h4 className="font-semibold">Certificación Oficial</h4>
                  <p className="text-sm text-muted-foreground">Profesionales pueden obtener la acreditación "ProcureData Certified" para gestionar soberanía de datos.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
      quiz: {
        question: "¿Cómo reciben los afiliados sus comisiones?",
        options: ["Transferencia bancaria", "Cheque", "Directamente en EUROe en su Wallet", "Puntos canjeables"],
        correctIndex: 2
      }
    },
    {
      id: "eventos",
      title: "Estrategia de Comunicación y Eventos (2025-2026)",
      icon: <Calendar className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Hitos presenciales y digitales para generar confianza en sectores estratégicos:
          </p>
          <div className="space-y-3">
            {[
              { 
                name: "Conecta con Compras", 
                type: "Serie de eventos en España",
                desc: "Encuentros para directivos de compras (CPOs) enfocados en mejores prácticas y casos de éxito.",
                icon: <Users className="h-5 w-5" />,
                badge: "España"
              },
              { 
                name: "Procurement Data&Tech Day", 
                type: "Gira Internacional",
                desc: "Eventos en Latinoamérica (Colombia, Perú, Ecuador) para consolidar alianzas con clústeres regionales.",
                icon: <Globe className="h-5 w-5" />,
                badge: "LATAM"
              },
              { 
                name: "Innovation Insights Report", 
                type: "Publicación Trimestral",
                desc: "Tendencias de mercado basadas en datos agregados, posicionando a ProcureData como fuente de inteligencia.",
                icon: <Newspaper className="h-5 w-5" />,
                badge: "Digital"
              }
            ].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-muted/50 rounded-lg border"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h4 className="font-semibold">{item.name}</h4>
                  </div>
                  <Badge variant="outline">{item.badge}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.type}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Dónde se realizará la gira Procurement Data&Tech Day?",
        options: ["Estados Unidos", "Asia", "Latinoamérica (Colombia, Perú, Ecuador)", "Europa del Este"],
        correctIndex: 2
      }
    },
    {
      id: "expansion",
      title: "Visión de Expansión Global",
      icon: <Globe className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-blue-600" /> ProcureData como Puente Digital
            </h4>
            <p className="text-sm text-muted-foreground">
              Basado en estándares internacionales (<strong>Gaia-X, IDS</strong>), permite la federación con otros espacios de datos globales.
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg border">
            <h4 className="font-semibold mb-3">🌍 Beneficios de la Federación</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Validar proveedores en Latinoamérica desde España</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Validar proveedores en USA bajo mismas reglas</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Mismas reglas técnicas y legales globalmente</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Eliminación de fronteras digitales en compras</span>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center"
          >
            <p className="font-semibold text-lg">Sin fronteras digitales en la función de compras</p>
            <p className="text-sm text-muted-foreground mt-1">Una empresa en España puede validar a un proveedor en cualquier parte del mundo</p>
          </motion.div>
        </div>
      ),
      quiz: {
        question: "¿Qué estándares permiten la federación global de ProcureData?",
        options: ["ISO 27001 y SOC 2", "Gaia-X e IDS", "PCI-DSS y HIPAA", "COBIT y ITIL"],
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
              <p>Has completado el Documento Explicativo 5</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/user-guide"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-2" /> Volver a Guía</Button></Link>
        </div>

        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/5 p-6">
            <Badge className="mb-2">Documento 5 de 15</Badge>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Ventas, Marketing y Estrategias de Crecimiento</h1>
            <p className="text-muted-foreground">Propuesta de valor comercial, modelo de expansión y oportunidades para partners.</p>
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
