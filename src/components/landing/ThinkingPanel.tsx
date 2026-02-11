import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Database, Shield, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const STEPS = [
  { icon: Database, label: "Conectando con nodo ProcureData...", delay: 0 },
  { icon: Globe, label: "Federando resultados de la red Gaia-X...", delay: 1200 },
  { icon: Shield, label: "Verificando políticas ODRL...", delay: 2400 },
  { icon: CheckCircle2, label: "Datos validados y listos.", delay: 3600 },
];

interface Props {
  isVisible: boolean;
  onComplete?: () => void;
}

export const ThinkingPanel = ({ isVisible, onComplete }: Props) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isVisible) {
      setCompletedSteps([]);
      return;
    }
    const timers = STEPS.map((step, i) =>
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i]);
        if (i === STEPS.length - 1) onComplete?.();
      }, step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-lg border bg-muted/50 p-3 space-y-2 overflow-hidden"
        >
          {STEPS.map((step, i) => {
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
