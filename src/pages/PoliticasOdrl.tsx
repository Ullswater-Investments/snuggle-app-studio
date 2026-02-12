import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PoliticasOdrlInfographic } from "@/components/politicas-odrl/PoliticasOdrlInfographic";
import { PoliticasOdrlChatAgent } from "@/components/politicas-odrl/PoliticasOdrlChatAgent";

const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const dur = 1500;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [isInView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
};

const metrics = [
  { key: "components", value: 4, suffix: "" },
  { key: "automation", value: 100, suffix: "%" },
  { key: "cases", value: 47, suffix: "" },
];

const PoliticasOdrl = () => {
  const { t } = useTranslation("politicasOdrl");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> {t("backToHome")}
        </Link>
      </div>

      <section className="py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-5">
            <FileText className="w-3.5 h-3.5" /> {t("badge")}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">{t("title")}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("subtitle")}</p>
        </motion.div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <PoliticasOdrlInfographic />
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {metrics.map((m) => (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border bg-card"
              >
                <p className="text-3xl font-bold text-primary">
                  <Counter target={m.value} suffix={m.suffix} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">{t(`metrics.${m.key}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">{t("chat.sectionTitle")}</h2>
            <p className="text-sm text-muted-foreground">{t("chat.sectionSubtitle")}</p>
          </div>
          <PoliticasOdrlChatAgent />
        </div>
      </section>
    </div>
  );
};

export default PoliticasOdrl;
