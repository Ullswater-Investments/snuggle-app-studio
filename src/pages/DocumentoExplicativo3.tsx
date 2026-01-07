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
  Leaf,
  FileCheck,
  Shield,
  Factory,
  Trophy,
  Sparkles,
  TreeDeciduous,
  Zap,
  Link2,
  ShoppingCart,
  Heart,
  Car,
  Wheat
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

export default function DocumentoExplicativo3() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["esg"]));
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const sections: Section[] = [
    {
      id: "esg",
      title: "El Reto de la Sostenibilidad (ESG)",
      icon: <Leaf className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            ProcureData integra la sostenibilidad en el núcleo de la función de compras, gestionando criterios <strong>ESG</strong> (Environmental, Social, and Governance).
          </p>
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TreeDeciduous className="h-5 w-5 text-green-600" /> Gestión de la Huella de Carbono (GHG Protocol)
            </h4>
            <div className="grid gap-3">
              {[
                { scope: "Scope 1", desc: "Emisiones directas (combustión propia)", icon: "🏭" },
                { scope: "Scope 2", desc: "Emisiones indirectas por energía eléctrica comprada", icon: "⚡" },
                { scope: "Scope 3", desc: "Emisiones de la cadena de suministro - PILAR FUNDAMENTAL", icon: "🔗", highlight: true }
              ].map((s) => (
                <div key={s.scope} className={cn("flex items-center gap-3 p-3 rounded-lg", s.highlight ? "bg-green-500/20 border border-green-500/40" : "bg-background/50")}>
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <h5 className="font-semibold text-sm">{s.scope}</h5>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className="border-primary/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Servicio Green Partner</h4>
                  <p className="text-xs text-muted-foreground">Badge verificable para proveedores con prácticas ambientales validadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
      quiz: {
        question: "¿Cuál es el Scope fundamental que gestiona ProcureData?",
        options: ["Scope 1 - Emisiones directas", "Scope 2 - Energía comprada", "Scope 3 - Cadena de suministro", "Scope 4 - Transporte"],
        correctIndex: 2
      }
    },
    {
      id: "csrd",
      title: "Cumplimiento de la Directiva CSRD",
      icon: <FileCheck className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold mb-2">🇪🇺 CSRD (Corporate Sustainability Reporting Directive)</h4>
            <p className="text-sm text-muted-foreground">
              Directiva de la UE que obliga a miles de empresas a reportar su impacto ambiental de forma auditada.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-primary" /> Estandarización ESRS
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Utilizamos los estándares europeos de reporte (European Sustainability Reporting Standards) para validez ante auditorías oficiales.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" /> Auditoría Automática
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                El servicio valida los activos de datos de proveedores, asegurando coherencia y cumplimiento legal para evitar sanciones.
              </CardContent>
            </Card>
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué estándares utiliza ProcureData para el reporte de sostenibilidad?",
        options: ["ISO 9001", "ESRS (European Sustainability Reporting Standards)", "SOC 2", "PCI-DSS"],
        correctIndex: 1
      }
    },
    {
      id: "gdpr",
      title: "Privacidad y Soberanía bajo el GDPR",
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            El intercambio de datos se rige por el <strong>RGPD</strong> y los principios de soberanía de la IDSA:
          </p>
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg"
            >
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-purple-600" /> GDPR PII Shield
              </h4>
              <p className="text-sm text-muted-foreground">
                Servicio técnico que detecta y enmascara automáticamente información personal (nombres, teléfonos, emails) antes de la transferencia de datos de negocio.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg"
            >
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Link2 className="h-5 w-5 text-indigo-600" /> Políticas ODRL
              </h4>
              <p className="text-sm text-muted-foreground">
                Cada transacción está vinculada a una política de uso digital. El titular decide quién puede acceder, para qué propósito, por cuánto tiempo, y puede revocar el acceso en cualquier momento.
              </p>
            </motion.div>
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué hace el servicio GDPR PII Shield?",
        options: [
          "Cifra las transacciones financieras",
          "Detecta y enmascara información personal automáticamente",
          "Genera contratos legales",
          "Audita los sistemas ERP"
        ],
        correctIndex: 1
      }
    },
    {
      id: "casos",
      title: "Casos de Uso por Sectores Estratégicos",
      icon: <Factory className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            La plataforma adapta su funcionamiento a las necesidades críticas de cada industria:
          </p>
          <div className="grid gap-3">
            {[
              { sector: "Industrial", icon: <Factory className="h-5 w-5" />, use: "Automatización masiva del alta de proveedores. Reducción de homologación de semanas a menos de 48 horas.", color: "bg-slate-500/10 border-slate-500/30" },
              { sector: "Agroalimentario", icon: <Wheat className="h-5 w-5" />, use: "Trazabilidad inmutable desde el origen. Registro de certificados sanitarios en blockchain para exportación.", color: "bg-amber-500/10 border-amber-500/30" },
              { sector: "Salud", icon: <Heart className="h-5 w-5" />, use: "Privacidad extrema. Verificación de estándares ISO de material quirúrgico con anonimización de investigadores.", color: "bg-red-500/10 border-red-500/30" },
              { sector: "Movilidad Sostenible", icon: <Car className="h-5 w-5" />, use: "Rastreo de emisiones de flotas. Reporte de ahorro CO2 en rutas para mejorar score conjunto.", color: "bg-blue-500/10 border-blue-500/30" },
              { sector: "Comercio", icon: <ShoppingCart className="h-5 w-5" />, use: "Optimización de inventarios y ética. Validación de auditorías sociales mediante Pasaporte Digital.", color: "bg-purple-500/10 border-purple-500/30" }
            ].map((item, idx) => (
              <motion.div
                key={item.sector}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn("p-4 rounded-lg border", item.color)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-background rounded-lg">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold">{item.sector}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.use}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué sector utiliza ProcureData para trazabilidad inmutable de certificados sanitarios?",
        options: ["Industrial", "Agroalimentario", "Comercio", "Movilidad Sostenible"],
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
              <p>Has completado el Documento Explicativo 3</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/user-guide"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-2" /> Volver a Guía</Button></Link>
        </div>

        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 p-6">
            <Badge className="mb-2">Documento 3 de 15</Badge>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Sostenibilidad, Normativa Europea y Casos de Uso</h1>
            <p className="text-muted-foreground">Cumplimiento normativo, ambiental y protección de datos bajo estándares europeos.</p>
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
