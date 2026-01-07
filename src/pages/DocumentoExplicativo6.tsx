import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Award,
  Monitor,
  Users,
  Search,
  AlertTriangle,
  Headphones,
  LayoutDashboard,
  Bell,
  Building2,
  Moon,
  Shield,
  Eye,
  Filter,
  Star,
  Leaf,
  Wallet,
  FileWarning,
  Clock,
  Key,
  Zap,
  MessageCircle,
  FileText,
  Mail,
  Bug,
  Sparkles,
  Trophy
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

export default function DocumentoExplicativo6() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["navegacion"]));
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const sections: Section[] = [
    {
      id: "navegacion",
      title: "Navegación y Elementos de la Interfaz",
      icon: <Monitor className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            La plataforma ProcureData ofrece una experiencia de usuario <Badge variant="secondary">intuitiva</Badge> dividida en secciones clave.
          </p>
          <div className="grid gap-3">
            {[
              { icon: <LayoutDashboard className="h-5 w-5" />, title: "Dashboard Principal", desc: "Centro de mando con balance de Wallet, Health Score y transacciones recientes.", color: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300" },
              { icon: <LayoutDashboard className="h-5 w-5" />, title: "Barra Lateral (Sidebar)", desc: "Acceso rápido a Marketplace, Catálogo de Servicios, Innovation Lab y Configuración.", color: "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300" },
              { icon: <Bell className="h-5 w-5" />, title: "Centro de Notificaciones", desc: "Icono de campana para aprobaciones pendientes, mensajes y alertas de saldo.", color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-300" },
              { icon: <Building2 className="h-5 w-5" />, title: "Selector de Organización", desc: "Alterna entre empresas sin necesidad de cerrar sesión.", color: "bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-300" },
              { icon: <Moon className="h-5 w-5" />, title: "Modo Visual", desc: "Soporta modo claro y oscuro configurable desde ajustes de perfil.", color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-300" }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn("p-4 rounded-lg border flex items-start gap-3", item.color)}
              >
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Dónde puedes ver tu Health Score y balance de Wallet?",
        options: ["En la Barra Lateral", "En el Dashboard Principal", "En el Centro de Notificaciones", "En el Selector de Organización"],
        correctIndex: 1
      }
    },
    {
      id: "roles",
      title: "Gestión de Equipos y Roles",
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm">
              El sistema utiliza un modelo de <strong>Control de Acceso Basado en Roles (RBAC)</strong> para garantizar la seguridad operativa.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              { role: "Administrador", subtitle: "Admin", description: "Control total: invitar/eliminar usuarios, configurar integraciones ERP y gestionar la Wallet corporativa.", icon: "👑", color: "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300" },
              { role: "Aprobador", subtitle: "Approver", description: "Perfil operativo: autorizar o denegar las solicitudes de intercambio de datos recibidas.", icon: "✅", color: "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300" },
              { role: "Lector", subtitle: "Viewer", description: "Acceso restringido: consulta marketplace e historial, sin pagos ni aprobaciones.", icon: "👁️", color: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300" }
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
        question: "¿Qué rol puede configurar integraciones ERP?",
        options: ["Viewer", "Approver", "Admin", "Todos los roles"],
        correctIndex: 2
      }
    },
    {
      id: "marketplace",
      title: "Uso Eficiente del Marketplace",
      icon: <Search className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Para encontrar información precisa entre miles de proveedores, utiliza los <strong>filtros avanzados</strong>:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Filter className="h-4 w-4 text-blue-500" />
                  Filtro de Certificación
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Segmenta por normativas <Badge variant="outline" className="mx-1">ISO 9001</Badge> <Badge variant="outline">ISO 14001</Badge> o certificaciones sectoriales.
              </CardContent>
            </Card>
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-500" />
                  Badge Green Partner
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Identifica proveedores con <strong>auditoría de sostenibilidad</strong> aprobada por ProcureData.
              </CardContent>
            </Card>
            <Card className="border-yellow-500/30 bg-yellow-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Reputation Score
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Ordena por valoración <strong>(1-5 ⭐)</strong> e historial de cumplimiento registrado en blockchain.
              </CardContent>
            </Card>
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué filtro identifica proveedores con sostenibilidad verificada?",
        options: ["Filtro de Certificación", "Badge Green Partner", "Reputation Score", "Filtro ISO"],
        correctIndex: 1
      }
    },
    {
      id: "errores",
      title: "Resolución de Errores Comunes",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            A continuación, las situaciones de error más frecuentes y su solución:
          </p>
          <div className="space-y-3">
            {[
              { error: "Fondos Insuficientes", icon: <Wallet className="h-5 w-5" />, causa: "Saldo EUROe menor al coste", solucion: "Recargar desde la sección Wallet", color: "border-red-500/30" },
              { error: "Entidad No Verificada", icon: <FileWarning className="h-5 w-5" />, causa: "Acceso al marketplace bloqueado", solucion: "Subir CIF y documentación en Ajustes de Organización", color: "border-orange-500/30" },
              { error: "Transacción en Espera", icon: <Clock className="h-5 w-5" />, causa: "Solicitud no avanza", solucion: "Revisar si falta aprobación del Provider o Data Holder", color: "border-yellow-500/30" },
              { error: "Error de API", icon: <Key className="h-5 w-5" />, causa: "ERP no conecta (Invalid API Key)", solucion: "Regenerar llave y verificar endpoint", color: "border-purple-500/30" },
              { error: "Límite de Peticiones", icon: <Zap className="h-5 w-5" />, causa: "Rate Limit Exceeded", solucion: "Esperar 60 segundos antes de reintentar", color: "border-blue-500/30" }
            ].map((item, idx) => (
              <motion.div
                key={item.error}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={cn("grid md:grid-cols-3 gap-2 p-3 rounded-lg border bg-muted/30", item.color)}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="font-semibold text-sm">{item.error}</span>
                </div>
                <div className="text-sm text-muted-foreground">{item.causa}</div>
                <div className="text-sm text-primary font-medium">✅ {item.solucion}</div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "Si tu ERP no conecta por 'Invalid API Key', ¿qué debes hacer?",
        options: ["Esperar 60 segundos", "Recargar la Wallet", "Regenerar la llave API", "Contactar soporte"],
        correctIndex: 2
      }
    },
    {
      id: "soporte",
      title: "Canales de Soporte y Ayuda",
      icon: <Headphones className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Si un problema persiste, la plataforma ofrece los siguientes recursos:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { canal: "ARIA", icon: <MessageCircle className="h-6 w-6" />, desc: "Asistente Virtual 24/7 para dudas sobre servicios, precios y navegación.", badge: "24/7", color: "bg-gradient-to-br from-primary/20 to-primary/5" },
              { canal: "Centro de Ayuda", icon: <FileText className="h-6 w-6" />, desc: "Documentación técnica completa y guías paso a paso.", badge: "/docs", color: "bg-gradient-to-br from-blue-500/20 to-blue-500/5" },
              { canal: "Soporte Técnico", icon: <Mail className="h-6 w-6" />, desc: "Email con respuesta < 4 horas para usuarios Pro.", badge: "Nivel 1", color: "bg-gradient-to-br from-green-500/20 to-green-500/5" },
              { canal: "Reporte de Errores", icon: <Bug className="h-6 w-6" />, desc: "Botón en footer para enviar capturas y logs al equipo.", badge: "Directo", color: "bg-gradient-to-br from-orange-500/20 to-orange-500/5" }
            ].map((item, idx) => (
              <motion.div
                key={item.canal}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={cn("p-4 rounded-lg border", item.color)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 rounded-lg bg-background/50">{item.icon}</div>
                  <Badge variant="secondary">{item.badge}</Badge>
                </div>
                <h4 className="font-semibold">{item.canal}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        question: "¿Qué canal de soporte está disponible las 24 horas del día?",
        options: ["Soporte Técnico Nivel 1", "Centro de Ayuda", "ARIA (Asistente Virtual)", "Reporte de Errores"],
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
    <div className="min-h-screen bg-background">
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
              <p>Has completado el Documento Explicativo 6</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/guia-usuario">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver a Guía
            </Button>
          </Link>
        </div>

        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-2">Documento 6 de 15</Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Guía de Usuario, Interfaz y Soporte
                </h1>
                <p className="text-muted-foreground">
                  Manual de consulta rápida para navegación, gestión de usuarios y resolución de incidencias.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
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
                <Card className={cn(
                  "transition-all duration-200",
                  isCompleted && "border-primary/50 bg-primary/5"
                )}>
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
                        <h3 className="font-semibold">{section.title}</h3>
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
                        transition={{ duration: 0.2 }}
                      >
                        <CardContent className="pt-0 pb-6">
                          {section.content}

                          {section.quiz && (
                            <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                🧠 Quiz Rápido
                              </h4>
                              <p className="text-sm mb-3">{section.quiz.question}</p>
                              <div className="grid gap-2">
                                {section.quiz.options.map((option, idx) => {
                                  const isSelected = quizAnswer === idx;
                                  const isCorrect = idx === section.quiz!.correctIndex;
                                  const showResult = quizAnswer !== null && quizAnswer !== undefined;

                                  return (
                                    <Button
                                      key={idx}
                                      variant={showResult && isCorrect ? "default" : isSelected && showResult ? "destructive" : "outline"}
                                      className={cn(
                                        "justify-start h-auto py-2 px-3 text-left",
                                        showResult && isCorrect && "bg-green-500 hover:bg-green-600"
                                      )}
                                      onClick={() => handleQuizAnswer(section.id, idx, section.quiz!.correctIndex)}
                                      disabled={isCompleted}
                                    >
                                      <span className="flex items-center gap-2">
                                        {showResult && isCorrect && <CheckCircle2 className="h-4 w-4" />}
                                        {option}
                                      </span>
                                    </Button>
                                  );
                                })}
                              </div>
                              {quizAnswer !== null && quizAnswer !== undefined && quizAnswer !== section.quiz.correctIndex && (
                                <p className="text-sm text-muted-foreground mt-3">
                                  💡 Inténtalo de nuevo. Revisa el contenido de la sección.
                                </p>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-between mt-8">
          <Link to="/documento-explicativo-5">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Documento 5
            </Button>
          </Link>
          <Link to="/documento-explicativo-7">
            <Button>
              Documento 7 <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}