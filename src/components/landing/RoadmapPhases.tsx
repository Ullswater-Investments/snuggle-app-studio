import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Database, GitBranch, FileText, Wallet,
  Bot, Settings, Globe, BarChart3, Layers
} from "lucide-react";

const phases = [
  { icon: Shield, name: "Fundamentos", desc: "Autenticación, RBAC y RLS multi-tenant", slug: "fundamentos" },
  { icon: Database, name: "Catálogo de Datos", desc: "Registro y descubrimiento de activos", slug: "catalogo-datos" },
  { icon: GitBranch, name: "Flujo 3-Actores", desc: "Consumer → Subject → Holder", slug: "flujo-3-actores" },
  { icon: FileText, name: "Políticas ODRL", desc: "Contratos digitales automáticos", slug: "politicas-odrl" },
  { icon: Wallet, name: "Web3 y DIDs", desc: "Identidades descentralizadas y EUROe", slug: "web3-dids" },
  { icon: Bot, name: "IA Conversacional", desc: "Asistente ARIA con contexto", slug: "ia-conversacional" },
  { icon: Settings, name: "Conectores ERP", desc: "SAP, Oracle, Dynamics", slug: "conectores-erp" },
  { icon: Globe, name: "Red Gaia-X", desc: "IDS, Eclipse Dataspace", slug: "red-gaia-x" },
  { icon: BarChart3, name: "Analytics y BI", desc: "Dashboards predictivos", slug: "analytics-bi" },
  { icon: Layers, name: "Multi-Sector", desc: "Nodos sectoriales y gobernanza", slug: "multi-sector" },
];

export const RoadmapPhases = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-xs font-medium text-primary mb-4">
            Roadmap Técnico
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">10 Fases de Evolución</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Arquitectura incremental del espacio de datos federado ProcureData
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            const slug = (phase as any).slug;
            const card = (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative flex flex-col items-center text-center p-4 rounded-xl border bg-card hover:shadow-md transition-shadow group ${slug ? "cursor-pointer ring-1 ring-primary/20 hover:ring-primary/50" : ""}`}
              >
                <span className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xs font-semibold text-foreground mb-1">{phase.name}</h3>
                <p className="text-[10px] text-muted-foreground leading-tight">{phase.desc}</p>
              </motion.div>
            );
            return slug ? (
              <Link key={i} to={`/${slug}`} className="no-underline">
                {card}
              </Link>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
