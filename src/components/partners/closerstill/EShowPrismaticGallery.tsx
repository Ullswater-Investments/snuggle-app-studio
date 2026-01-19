import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Crown, Globe } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FastTrackVisual,
  BlindMatchVisual,
  OnSiteFactoringVisual,
  VIPPassportVisual,
  SpeakerCredentialVisual,
  ESGCertificateVisual,
  TokenizedContentVisual,
  TrustedDataFeedVisual,
  VerifiableROIVisual,
  Connector365Visual
} from './prismatic-visuals';

interface PrismaticCase {
  id: number;
  title: string;
  cluster: "acceleration" | "experience" | "ecosystem";
  tag: string;
  desc: string;
  color: string;
  glowColor: string;
  VisualComponent: React.ComponentType;
}

const prismaticCases: PrismaticCase[] = [
  // CLUSTER 1: ACELERACIÓN
  {
    id: 1,
    title: "Fast-Track Homologación",
    cluster: "acceleration",
    tag: "Vendor Onboarding",
    desc: "El Badge del expositor vuelca solvencia e ISOs al ERP del comprador. De 3 meses a 3 minutos.",
    color: "text-emerald-400",
    glowColor: "shadow-[0_0_20px_rgba(52,211,153,0.2)]",
    VisualComponent: FastTrackVisual
  },
  {
    id: 2,
    title: "Blind Matchmaking",
    cluster: "acceleration",
    tag: "Privacy First",
    desc: "Cruce de oferta y demanda encriptado. Identidad revelada solo tras match técnico.",
    color: "text-blue-400",
    glowColor: "shadow-[0_0_20px_rgba(96,165,250,0.2)]",
    VisualComponent: BlindMatchVisual
  },
  {
    id: 3,
    title: "Financiación On-Site",
    cluster: "acceleration",
    tag: "Event Factoring",
    desc: "Bancos sponsors ofrecen factoring instantáneo sobre pedidos validados en el nodo.",
    color: "text-amber-400",
    glowColor: "shadow-[0_0_20px_rgba(251,191,36,0.2)]",
    VisualComponent: OnSiteFactoringVisual
  },
  // CLUSTER 2: EXPERIENCIA
  {
    id: 4,
    title: "Pasaporte VIP Soberano",
    cluster: "experience",
    tag: "Zero Friction",
    desc: "Acceso automático a Lounge y Fast-Lanes sin enseñar DNI. Tu reputación es tu llave.",
    color: "text-purple-400",
    glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    VisualComponent: VIPPassportVisual
  },
  {
    id: 5,
    title: "Credenciales Ponente",
    cluster: "experience",
    tag: "Digital Authority",
    desc: "Insignias verificables en blockchain para LinkedIn. Prestigio inmutable.",
    color: "text-pink-400",
    glowColor: "shadow-[0_0_20px_rgba(236,72,153,0.2)]",
    VisualComponent: SpeakerCredentialVisual
  },
  {
    id: 6,
    title: "Certificado ESG",
    cluster: "experience",
    tag: "Sustainability",
    desc: "Reporte de huella de carbono auditada para visitantes corporativos (Scope 3).",
    color: "text-green-400",
    glowColor: "shadow-[0_0_20px_rgba(74,222,128,0.2)]",
    VisualComponent: ESGCertificateVisual
  },
  // CLUSTER 3: ECOSISTEMA
  {
    id: 7,
    title: "Content Hub Tokenizado",
    cluster: "ecosystem",
    tag: "New Revenue",
    desc: "Acceso a ponencias vía Smart Contract. Royalties automáticos para speakers.",
    color: "text-red-400",
    glowColor: "shadow-[0_0_20px_rgba(248,113,113,0.2)]",
    VisualComponent: TokenizedContentVisual
  },
  {
    id: 8,
    title: "Trusted Data Feed",
    cluster: "ecosystem",
    tag: "Media Partners",
    desc: "Datos exclusivos en tiempo real para prensa. Periodismo basado en hechos.",
    color: "text-cyan-400",
    glowColor: "shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    VisualComponent: TrustedDataFeedVisual
  },
  {
    id: 9,
    title: "ROI Verificable",
    cluster: "ecosystem",
    tag: "Sponsors",
    desc: "Trazabilidad de engagement real para patrocinadores, no solo impresiones.",
    color: "text-orange-400",
    glowColor: "shadow-[0_0_20px_rgba(251,146,60,0.2)]",
    VisualComponent: VerifiableROIVisual
  },
  {
    id: 10,
    title: "Conector e-Show 365",
    cluster: "ecosystem",
    tag: "Always On",
    desc: "Tu stand sigue vendiendo y recibiendo peticiones todo el año en el espacio de datos.",
    color: "text-indigo-400",
    glowColor: "shadow-[0_0_20px_rgba(129,140,248,0.2)]",
    VisualComponent: Connector365Visual
  }
];

const clusterInfo = {
  acceleration: {
    label: "Aceleración (ROI)",
    icon: Zap,
    description: "Dinero en el bolsillo de tus expositores"
  },
  experience: {
    label: "Experiencia VIP",
    icon: Crown,
    description: "Ego y comodidad para tus VIPs"
  },
  ecosystem: {
    label: "Ecosistema 365",
    icon: Globe,
    description: "La feria que nunca cierra"
  }
};

const EShowPrismaticGallery = () => {
  const [activeCluster, setActiveCluster] = useState<"acceleration" | "experience" | "ecosystem">("acceleration");

  const filteredCases = prismaticCases.filter(c => c.cluster === activeCluster);
  const currentClusterInfo = clusterInfo[activeCluster];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-sm text-indigo-400 font-medium tracking-wider uppercase">
              e-Show 2026
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            10 Casos de Uso Prismáticos
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Transformamos la feria en infraestructura crítica de negocio. 
            Cada caso representa una oportunidad de monetización real.
          </p>
        </motion.div>

        {/* Cluster Tabs */}
        <Tabs 
          value={activeCluster} 
          onValueChange={(v) => setActiveCluster(v as typeof activeCluster)}
          className="mb-8"
        >
          <TabsList className="grid grid-cols-3 max-w-2xl mx-auto bg-slate-800/50 border border-slate-700">
            {Object.entries(clusterInfo).map(([key, info]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                <info.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{info.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Cluster Description */}
        <motion.div
          key={activeCluster}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <currentClusterInfo.icon className="w-5 h-5" />
            <span className="text-lg font-medium">{currentClusterInfo.description}</span>
          </div>
        </motion.div>

        {/* Cases Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCluster}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCases.map((useCase, index) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`bg-slate-900/80 border-slate-700/50 hover:border-slate-600 transition-all duration-300 ${useCase.glowColor} hover:scale-[1.02]`}>
                  <CardContent className="p-0">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                      <span className={`text-sm font-mono ${useCase.color}`}>
                        #{useCase.id.toString().padStart(2, '0')}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`${useCase.color} border-current/30 bg-current/10`}
                      >
                        {useCase.tag}
                      </Badge>
                    </div>

                    {/* Visual Canvas */}
                    <div className="bg-slate-900 border-b border-slate-700/50">
                      <useCase.VisualComponent />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className={`text-lg font-semibold ${useCase.color} mb-2`}>
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {useCase.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-500 text-sm">
            Cada caso representa una oportunidad de ingresos recurrentes para CloserStill Media
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EShowPrismaticGallery;
