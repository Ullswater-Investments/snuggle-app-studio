import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Truck, Users, Brain, Radar, UserCheck, 
  Banknote, Recycle, Video, FileSignature, ArrowRight, Sparkles,
  Plane, Bot, RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Import visualizers
import FraudBureauVisual from "./visualizers/FraudBureauVisual";
import GreenLastMileVisual from "./visualizers/GreenLastMileVisual";
import AudienceOverlapVisual from "./visualizers/AudienceOverlapVisual";
import AITrainingVisual from "./visualizers/AITrainingVisual";
import CyberThreatVisual from "./visualizers/CyberThreatVisual";
import TalentPoolVisual from "./visualizers/TalentPoolVisual";
import InstantCreditVisual from "./visualizers/InstantCreditVisual";
import CircularEventsVisual from "./visualizers/CircularEventsVisual";
import ContentHubVisual from "./visualizers/ContentHubVisual";
import SmartContractingVisual from "./visualizers/SmartContractingVisual";
// Future Vision visualizers
import GlobalRoamingVisual from "./visualizers/GlobalRoamingVisual";
import AgenticNegotiationVisual from "./visualizers/AgenticNegotiationVisual";
import CircularMarketplaceVisual from "./visualizers/CircularMarketplaceVisual";

interface UseCase {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  category: "retail" | "tech" | "b2b" | "future";
  badges: string[];
  impact: string;
  description: string;
  VisualComponent: React.ComponentType;
}

const useCases: UseCase[] = [
  // RETAIL & eCOMMERCE
  {
    id: 1,
    icon: Shield,
    title: "Retail Fraud Intelligence",
    category: "retail",
    badges: ["Gaia-X Ready", "New Revenue"],
    impact: "Monetización de nuevos servicios",
    description: "Red neuronal defensiva: si un estafador ataca una tienda, todas las demás se protegen instantáneamente sin compartir datos personales.",
    VisualComponent: FraudBureauVisual,
  },
  {
    id: 2,
    icon: Truck,
    title: "Green Last Mile",
    category: "retail",
    badges: ["ESG", "Cost Saving"],
    impact: "Reducción 60% emisiones última milla",
    description: "Consolidación inteligente de rutas entre operadores logísticos en zonas ZBE, sin revelar clientes finales.",
    VisualComponent: GreenLastMileVisual,
  },
  {
    id: 3,
    icon: Users,
    title: "Audience Overlap",
    category: "retail",
    badges: ["Privacy-First", "New Revenue"],
    impact: "Campañas conjuntas 3x más efectivas",
    description: "Compute-to-Data: cruza bases de datos entre marcas sin mover los datos. Solo el resultado viaja.",
    VisualComponent: AudienceOverlapVisual,
  },
  // TECH & AI
  {
    id: 4,
    icon: Brain,
    title: "AI Training Ground",
    category: "tech",
    badges: ["Gaia-X Ready", "New Revenue"],
    impact: "Laboratorio de I+D real",
    description: "Startups entrenan modelos sobre datos corporativos sin verlos. Royalties automáticos por uso.",
    VisualComponent: AITrainingVisual,
  },
  {
    id: 5,
    icon: Radar,
    title: "Cyber Threat Sharing",
    category: "tech",
    badges: ["Critical Infrastructure", "Premium"],
    impact: "Alerta temprana como servicio",
    description: "Firmas de amenazas compartidas en tiempo real en un nodo neutro. Inmunidad colectiva.",
    VisualComponent: CyberThreatVisual,
  },
  {
    id: 6,
    icon: UserCheck,
    title: "Verified Talent Pool",
    category: "tech",
    badges: ["HR Tech", "Blockchain"],
    impact: "Speed Recruiting instantáneo",
    description: "CV en Blockchain: títulos y experiencia verificados criptográficamente por empresas anteriores.",
    VisualComponent: TalentPoolVisual,
  },
  // B2B TRANSVERSAL
  {
    id: 7,
    icon: Banknote,
    title: "Instant B2B Credit",
    category: "b2b",
    badges: ["FinTech", "New Revenue"],
    impact: "Financiación embebida en la feria",
    description: "Entidades financieras acceden al historial de interacciones para crédito instantáneo en EUROe.",
    VisualComponent: InstantCreditVisual,
  },
  {
    id: 8,
    icon: Recycle,
    title: "Circular Events",
    category: "b2b",
    badges: ["ESG", "Compliance"],
    impact: "Certificado carbono neutro auditable",
    description: "Trazabilidad de materiales del stand. El expositor obtiene pasaporte ESG listo para reporting.",
    VisualComponent: CircularEventsVisual,
  },
  {
    id: 9,
    icon: Video,
    title: "B2B Content Hub",
    category: "b2b",
    badges: ["New Revenue", "Smart Contracts"],
    impact: "Royalties automáticos a ponentes",
    description: "Contenido con micropagos. Acceso por tokens, reparto automático de ingresos al creador.",
    VisualComponent: ContentHubVisual,
  },
  {
    id: 10,
    icon: FileSignature,
    title: "Smart Deal-Maker",
    category: "b2b",
    badges: ["Legal Tech", "Gaia-X Ready"],
    impact: "De meses a minutos en contratos",
    description: "Plantillas de NDA/MOU que se autocompletan con la identidad del Badge digital.",
    VisualComponent: SmartContractingVisual,
  },
  // FUTURE VISION - MOONSHOTS
  {
    id: 11,
    icon: Plane,
    title: "Global Business Roaming",
    category: "future",
    badges: ["International Scale", "Gaia-X Ready"],
    impact: "Venta cruzada internacional sin fricción",
    description: "Tu validación en Madrid sirve en Londres y Singapur. Paquetes internacionales con 'Fast-Track' automático.",
    VisualComponent: GlobalRoamingVisual,
  },
  {
    id: 12,
    icon: Bot,
    title: "AI Bot-to-Bot Negotiation",
    category: "future",
    badges: ["Agentic AI", "Next-Gen"],
    impact: "Pre-acuerdos en milisegundos",
    description: "Agentes IA negocian pre-acuerdos basados en parámetros técnicos antes de la reunión humana.",
    VisualComponent: AgenticNegotiationVisual,
  },
  {
    id: 13,
    icon: RefreshCw,
    title: "Circular Asset Marketplace",
    category: "future",
    badges: ["Zero Waste", "ESG Premium"],
    impact: "Coste → PR y Sostenibilidad",
    description: "Mercado secundario post-feria para mobiliario y electrónica. Trazabilidad Residuo Cero certificada.",
    VisualComponent: CircularMarketplaceVisual,
  },
];

const categoryConfig = {
  retail: { label: "Retail & eCommerce", color: "from-rose-500 to-red-600", badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  tech: { label: "Tech & AI", color: "from-blue-500 to-indigo-600", badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  b2b: { label: "Business Innovation", color: "from-emerald-500 to-green-600", badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  future: { label: "Future Vision 🚀", color: "from-fuchsia-500 to-purple-600", badgeClass: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30" },
};

const EShowInnovationGallery = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "retail" | "tech" | "b2b" | "future">("all");

  const filteredCases = activeCategory === "all" 
    ? useCases 
    : useCases.filter(uc => uc.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as typeof activeCategory)}>
        <TabsList className="bg-slate-800/50 border border-slate-700 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
            Todos
          </TabsTrigger>
          <TabsTrigger value="retail" className="data-[state=active]:bg-rose-600/30">
            🛍️ Retail
          </TabsTrigger>
          <TabsTrigger value="tech" className="data-[state=active]:bg-blue-600/30">
            💻 Tech & AI
          </TabsTrigger>
          <TabsTrigger value="b2b" className="data-[state=active]:bg-emerald-600/30">
            🏭 B2B
          </TabsTrigger>
          <TabsTrigger value="future" className="data-[state=active]:bg-fuchsia-600/30">
            🚀 Future Vision
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredCases.map((useCase) => {
            const Icon = useCase.icon;
            const { VisualComponent } = useCase;
            const config = categoryConfig[useCase.category];

            return (
              <motion.div
                key={useCase.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all hover:shadow-xl hover:shadow-slate-900/50 group overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={config.badgeClass}>
                        {config.label}
                      </Badge>
                      <span className="text-xs text-slate-500">#{useCase.id}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {useCase.badges.map((badge) => (
                        <Badge 
                          key={badge} 
                          variant="outline" 
                          className="text-[10px] border-slate-600 text-slate-400"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Visual Canvas */}
                    <VisualComponent />

                    {/* Title & Description */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 rounded bg-gradient-to-br ${config.color}`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-white">{useCase.title}</h3>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {useCase.description}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                      <div className="flex items-center gap-1 text-emerald-400">
                        <Sparkles className="h-3 w-3" />
                        <span className="text-xs font-medium">{useCase.impact}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-slate-400 hover:text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Detalles <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* CTA Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-blue-900/50 via-slate-900 to-purple-900/50 border border-slate-700 text-center"
      >
        <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          ¿Imaginas estos servicios en e-Show 2026?
        </h2>
        <p className="text-slate-400 mb-6">
          Hagámoslo realidad. Transformemos el e-Show en la primera feria con infraestructura de datos soberana.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            🚀 Solicitar Demo Piloto
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            📄 Descargar Resumen Ejecutivo
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EShowInnovationGallery;
