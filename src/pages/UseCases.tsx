import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  ShieldCheck, 
  Leaf, 
  Coins, 
  LockKeyhole, 
  Package, 
  Cpu, 
  AlertTriangle, 
  Landmark, 
  Thermometer, 
  FileSignature,
  Quote,
  ArrowRight,
  ArrowUp,
  Home,
  LucideIcon,
  Car,
  Zap,
  Pill,
  ShoppingBag,
  HardHat,
  TrendingUp,
  Truck,
  Wheat,
  Rocket,
  Monitor,
  Filter,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { useState, useEffect } from "react";

interface Industry {
  id: string;
  icon: LucideIcon;
}

const INDUSTRIES: Industry[] = [
  { id: "all", icon: Filter },
  { id: "Automotive", icon: Car },
  { id: "Energy", icon: Zap },
  { id: "Pharma", icon: Pill },
  { id: "Retail", icon: ShoppingBag },
  { id: "Construction", icon: HardHat },
  { id: "Finance", icon: TrendingUp },
  { id: "Logistics", icon: Truck },
  { id: "AgriFood", icon: Wheat },
  { id: "Aerospace", icon: Rocket },
  { id: "Tech", icon: Monitor }
];

interface UseCaseData {
  id: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  mermaidChart: string;
  industries: string[];
}

const USE_CASES_DATA: UseCaseData[] = [
  {
    id: "kyb-onboarding",
    icon: ShieldCheck,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    mermaidChart: `sequenceDiagram
    participant P as Proveedor
    participant W as Wallet MetaMask
    participant PD as PROCUREDATA
    participant PX as Pontus-X
    
    P->>W: Conectar Wallet
    W->>PD: Firma Autorización
    PD->>PD: Generar DID (did:ethr)
    PD->>PX: Verificar Registro Corporativo
    PX-->>PD: Credencial Validada
    PD-->>P: Perfil Creado ✓`,
    industries: ["Automotive", "Energy", "Pharma", "Retail", "Construction", "Finance", "Logistics", "AgriFood", "Aerospace", "Tech"]
  },
  {
    id: "huella-carbono",
    icon: Leaf,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    mermaidChart: `flowchart LR
    A[Manufacturera] -->|Solicita ESG| B[PROCUREDATA]
    B -->|Notifica| C[Proveedor 1]
    B -->|Notifica| D[Proveedor 2]
    C -->|Sube Reporte| E[Hash en Blockchain]
    D -->|Sube Reporte| E
    E -->|Acceso Controlado| A
    E -->|Auditoría| F[Auditor Externo]`,
    industries: ["Automotive", "Energy", "Pharma", "Construction", "Logistics", "AgriFood", "Aerospace"]
  },
  {
    id: "marketplace-euroe",
    icon: Coins,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    mermaidChart: `sequenceDiagram
    participant V as Vendedor
    participant C as Comprador
    participant SC as Smart Contract
    participant BC as Blockchain
    
    V->>SC: Publica Dataset + Precio
    C->>SC: Pago EUROe
    SC->>BC: Verificar Transferencia
    BC-->>SC: Confirmado ✓
    SC->>C: Access Token Liberado
    C->>V: Descarga Datos`,
    industries: ["Automotive", "Energy", "Pharma", "Retail", "Construction", "Finance", "Logistics", "AgriFood", "Aerospace", "Tech"]
  },
  {
    id: "kill-switch",
    icon: LockKeyhole,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    mermaidChart: `flowchart TD
    A[Detectar Brecha] -->|Alerta| B[Director Seguridad]
    B -->|Click| C[RevokeAccessButton]
    C -->|Ejecuta| D[Smart Contract]
    D -->|Invalida| E[Todos los Access Tokens]
    D -->|Registra| F[Audit Log Inmutable]
    E -->|Resultado| G[Acceso Bloqueado Instantáneo]`,
    industries: ["Pharma", "Finance", "Tech", "Aerospace"]
  },
  {
    id: "pasaporte-digital",
    icon: Package,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    mermaidChart: `flowchart LR
    subgraph Proveedores
        P1[🧵 Tela]
        P2[🎨 Tinte]
        P3[✂️ Confección]
        P4[🚚 Transporte]
        P5[🏪 Retail]
    end
    
    P1 -->|Firma DID| DPP[📦 Pasaporte Digital]
    P2 -->|Firma DID| DPP
    P3 -->|Firma DID| DPP
    P4 -->|Firma DID| DPP
    P5 -->|Firma DID| DPP
    
    DPP -->|QR Code| Consumer[👤 Consumidor Final]`,
    industries: ["Automotive", "Pharma", "Retail", "AgriFood", "Aerospace"]
  },
  {
    id: "compute-to-data",
    icon: Cpu,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    mermaidChart: `sequenceDiagram
    participant AI as Startup IA
    participant PD as PROCUREDATA
    participant H as Hospital
    participant SB as Sandbox Seguro
    
    AI->>PD: Sube Modelo IA
    PD->>H: Solicita Acceso C2D
    H->>PD: Aprueba (datos NO salen)
    PD->>SB: Provisiona Entorno
    SB->>SB: Ejecuta Modelo sobre Datos
    SB-->>AI: Solo Resultados (sin datos crudos)`,
    industries: ["Pharma", "Finance", "Tech", "Aerospace"]
  },
  {
    id: "gestion-recalls",
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    mermaidChart: `flowchart TD
    A[⚠️ Detectar Pieza Defectuosa] -->|Query| B[DataLineage]
    B -->|Traza| C[Blockchain History]
    C -->|Identifica| D[Lote Proveedor X]
    D -->|Consulta| E[Vehículos Afectados]
    E -->|Lista| F[1,247 Coches]
    F -->|Inicia| G[✅ Recall Inmediato]`,
    industries: ["Automotive", "Pharma", "AgriFood", "Aerospace"]
  },
  {
    id: "financiacion-defi",
    icon: Landmark,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    mermaidChart: `flowchart LR
    A[🌾 Agricultor] -->|Comparte| B[Historial Entregas]
    B -->|Verificado en| C[Blockchain]
    C -->|Score| D[Reputación: 98%]
    D -->|Presenta a| E[🏦 Banco/DeFi]
    E -->|Aprueba| F[💰 Crédito Tasa Reducida]`,
    industries: ["Retail", "Construction", "Finance", "AgriFood"]
  },
  {
    id: "cadena-frio",
    icon: Thermometer,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    mermaidChart: `sequenceDiagram
    participant S as 🌡️ Sensor IoT
    participant EF as Edge Function
    participant BC as Blockchain
    participant A as Sistema Alertas
    
    loop Cada Hora
        S->>EF: Lectura Temperatura
        EF->>EF: Verificar Umbral
        alt Temperatura OK
            EF->>BC: Notarizar Lectura ✓
        else Temperatura Excedida
            EF->>BC: Notarizar Brecha ⚠️
            EF->>A: Alerta Inmediata
        end
    end`,
    industries: ["Pharma", "AgriFood", "Logistics"]
  },
  {
    id: "licencias-odrl",
    icon: FileSignature,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    mermaidChart: `flowchart TD
    A[🔬 Investigador] -->|Abre| B[NegotiationChat]
    B -->|Define| C[Restricciones]
    C --> D{⏱️ 30 días}
    C --> E{📚 Solo Académico}
    C --> F{🇪🇺 Solo UE}
    D & E & F -->|Genera| G[📜 Política ODRL]
    G -->|Despliega| H[Smart Contract]
    H -->|Otorga| I[✅ Acceso Limitado]`,
    industries: ["Pharma", "Finance", "Tech", "Aerospace"]
  }
];

export default function UseCases() {
  const { t } = useTranslation('useCases');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredUseCases = selectedIndustry === "all"
    ? USE_CASES_DATA
    : USE_CASES_DATA.filter(uc => uc.industries.includes(selectedIndustry));

  const getIndustryName = (id: string) => {
    return t(`industries.${id}`, id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="procuredata-gradient font-bold text-xl">PROCUREDATA</span>
          </Link>
          <Link to="/auth">
            <Button variant="default" size="sm">
              {t('startNow')}
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4">
              {t('sectionBadge')}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t('sectionTitle')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('sectionDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-6 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
              <Filter className="h-4 w-4" />
              {t('filterByIndustry')}
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {INDUSTRIES.map((industry) => (
              <Button
                key={industry.id}
                variant={selectedIndustry === industry.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedIndustry(industry.id)}
                className="gap-2"
              >
                <industry.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{getIndustryName(industry.id)}</span>
                <span className="sm:hidden">{getIndustryName(industry.id).slice(0, 3)}</span>
              </Button>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {t('showing')} {filteredUseCases.length} {t('of')} {USE_CASES_DATA.length} {t('useCases')}
            {selectedIndustry !== "all" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedIndustry("all")}
                className="ml-2 h-6 px-2 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                {t('clearFilter')}
              </Button>
            )}
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 sticky top-[65px] z-40 bg-background/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {filteredUseCases.map((useCase) => (
                <motion.a
                  key={useCase.id}
                  href={`#${useCase.id}`}
                  className={`flex flex-col items-center gap-1 p-2 md:p-3 rounded-lg hover:bg-muted/50 transition-colors min-w-[60px] md:min-w-[80px] group`}
                  title={t(`cases.${useCase.id}.title`)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout
                >
                  <div className={`p-2 rounded-lg ${useCase.bgColor} group-hover:scale-110 transition-transform`}>
                    <useCase.icon className={`h-4 w-4 md:h-5 md:w-5 ${useCase.color}`} />
                  </div>
                  <span className="text-[10px] md:text-xs text-muted-foreground text-center line-clamp-1">
                    {t(`cases.${useCase.id}.title`).split(' ')[0]}
                  </span>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Use Cases Sections */}
      <div className="py-8 md:py-16">
        <AnimatePresence mode="wait">
          {filteredUseCases.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground mb-4">
                {t('noUseCasesForIndustry')}
              </p>
              <Button onClick={() => setSelectedIndustry("all")}>
                {t('viewAllCases')}
              </Button>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {filteredUseCases.map((useCase, index) => (
                <motion.section
                  key={useCase.id}
                  id={useCase.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`py-12 md:py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
                >
                  <div className="container max-w-5xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-4 rounded-xl ${useCase.bgColor} shrink-0`}>
                        <useCase.icon className={`h-8 w-8 ${useCase.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="outline" className={useCase.color}>
                            {t(`cases.${useCase.id}.badge`)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {t('actor')}: {t(`cases.${useCase.id}.actor`)}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold">{t(`cases.${useCase.id}.title`)}</h2>
                        {/* Industry Badges */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {useCase.industries.slice(0, 4).map((ind) => (
                            <Badge 
                              key={ind} 
                              variant="secondary" 
                              className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                              onClick={() => setSelectedIndustry(ind)}
                            >
                              {getIndustryName(ind)}
                            </Badge>
                          ))}
                          {useCase.industries.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{useCase.industries.length - 4} {t('more')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Full Description */}
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {t(`cases.${useCase.id}.fullDesc`)}
                    </p>

                    {/* Tabs */}
                    <Tabs defaultValue="flow" className="mb-8">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="problem">{t('tabs.problem')}</TabsTrigger>
                        <TabsTrigger value="solution">{t('tabs.solution')}</TabsTrigger>
                        <TabsTrigger value="flow">{t('tabs.flow')}</TabsTrigger>
                      </TabsList>
                      <TabsContent value="problem" className="mt-4">
                        <Card>
                          <CardContent className="pt-6">
                            <p className="text-muted-foreground leading-relaxed">
                              {t(`cases.${useCase.id}.problem`)}
                            </p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="solution" className="mt-4">
                        <Card>
                          <CardContent className="pt-6">
                            <p className="text-muted-foreground leading-relaxed">
                              {t(`cases.${useCase.id}.solution`)}
                            </p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="flow" className="mt-4">
                        <Card>
                          <CardContent className="pt-6">
                            <MermaidDiagram chart={useCase.mermaidChart} />
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>

                    {/* Testimonial */}
                    <Card className="bg-gradient-to-br from-muted/50 to-muted/20 border-l-4 border-l-primary">
                      <CardContent className="pt-6">
                        <Quote className="h-8 w-8 text-primary/30 mb-4" />
                        <blockquote className="text-lg italic mb-6 leading-relaxed">
                          "{t(`cases.${useCase.id}.testimonialQuote`)}"
                        </blockquote>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className={`${useCase.bgColor} ${useCase.color}`}>
                              {getInitials(t(`cases.${useCase.id}.testimonialAuthor`))}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{t(`cases.${useCase.id}.testimonialAuthor`)}</p>
                            <p className="text-sm text-muted-foreground">
                              {t(`cases.${useCase.id}.testimonialRole`)}, {t(`cases.${useCase.id}.testimonialCompany`)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.section>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Final */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/auth">
                  {t('cta.tryFree')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/whitepaper">
                  {t('cta.readWhitepaper')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
