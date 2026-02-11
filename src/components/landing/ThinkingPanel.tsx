import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Database, Shield, Globe, BarChart3, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface StepDef {
  icon: typeof Database;
  label: string;
  delay: number;
}

const DEFAULT_STEPS: StepDef[] = [
  { icon: Database, label: "Conectando con nodo ProcureData...", delay: 0 },
  { icon: Globe, label: "Federando resultados de la red Gaia-X...", delay: 1200 },
  { icon: Shield, label: "Verificando políticas ODRL...", delay: 2400 },
  { icon: CheckCircle2, label: "Datos validados y listos.", delay: 3600 },
];

const buildCaseSteps = (company?: string): StepDef[] => [
  { icon: Building2, label: `Analizando caso ${company || ""}...`, delay: 0 },
  { icon: BarChart3, label: "Consultando métricas de impacto...", delay: 1200 },
  { icon: Database, label: "Cruzando datos con la red federada...", delay: 2400 },
  { icon: CheckCircle2, label: "Informe preparado.", delay: 3600 },
];

interface Props {
  isVisible: boolean;
  onComplete?: () => void;
  context?: "hero" | "case";
  company?: string;
}

export const ThinkingPanel = ({ isVisible, onComplete, context = "hero", company }: Props) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const steps = context === "case" ? buildCaseSteps(company) : DEFAULT_STEPS;
  const progressPercent = (completedSteps.length / steps.length) * 100;

  useEffect(() => {
    if (!isVisible) {
      setCompletedSteps([]);
      return;
    }
    const timers = steps.map((step, i) =>
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i]);
        if (i === steps.length - 1) onComplete?.();
      }, step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [isVisible, onComplete, context, company]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-lg border bg-muted/50 p-3 space-y-2.5 overflow-hidden"
        >
          {/* Global progress bar */}
          <div className="relative">
            <Progress value={progressPercent} className="h-1.5" />
            {/* Sparkle on leading edge */}
            <motion.div
              className="absolute top-0 h-1.5 w-2 rounded-full bg-primary shadow-[0_0_6px_2px_hsl(var(--primary)/0.5)]"
              animate={{ left: `${progressPercent}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {steps.map((step, i) => {
            const done = completedSteps.includes(i);
            const active = !done && completedSteps.length === i;
            const Icon = done ? CheckCircle2 : step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={active || done ? { opacity: 1, x: 0 } : { opacity: 0.3 }}
                className="flex items-center gap-2 text-xs"
              >
                {active ? (
                  <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                ) : (
                  <Icon className={`w-3.5 h-3.5 ${done ? "text-primary" : "text-muted-foreground"}`} />
                )}
                <span className={done ? "text-foreground" : "text-muted-foreground"}>{step.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
