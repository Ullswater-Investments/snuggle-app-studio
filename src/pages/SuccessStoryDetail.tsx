import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Award,
  Factory,
  Wheat,
  Truck,
  Heart,
  Stethoscope,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Clock,
  Target,
  ExternalLink,
  Quote,
  TrendingUp
} from "lucide-react";
import { ROISimulator } from "@/components/ROISimulator";
import { AgroROISimulator } from "@/components/AgroROISimulator";
import { SocialImpactDashboard } from "@/components/SocialImpactDashboard";
import { MobilityScope3Report } from "@/components/success-stories/MobilityScope3Report";
import { HealthMaintenanceSimulator } from "@/components/success-stories/HealthMaintenanceSimulator";
import { RetailEthicsAudit } from "@/components/success-stories/RetailEthicsAudit";
import { EnergySmartContract } from "@/components/success-stories/EnergySmartContract";
import { SuccessStoryNavigator } from "@/components/success-stories/SuccessStoryNavigator";

const casesData: Record<string, {
  id: string;
  title: string;
  company: string;
  sector: string;
  sectorIcon: React.ElementType;
  metric: string;
  metricLabel: string;
  color: string;
  bgColor: string;
  textColor: string;
  blockchainProof: string;
  blockNumber: string;
  challenge: string;
  solution: string;
  services: string[];
  ariaQuote: string;
  simulator: "industrial" | "agro" | "social" | "mobility" | "health" | "retail" | "energy";
}> = {
  "gigafactory-north": {
    id: "gigafactory-north",
    title: "Automatización de Homologación Industrial",
    company: "GigaFactory North",
    sector: "Industrial",
    sectorIcon: Factory,
    metric: "-85%",
    metricLabel: "Tiempo de Alta",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    textColor: "text-orange-600 dark:text-orange-400",
    blockchainProof: "0x8f3c7a2e1b9d4f6c8a0e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7",
    blockNumber: "#18,234,567",
    challenge: "El proceso de alta de proveedores metalúrgicos Tier 2 tardaba 22 días de media. Cada nuevo proveedor requería validaciones manuales de ISO 9001, IATF 16949 y certificaciones de seguridad laboral. El equipo de compras dedicaba más del 40% de su tiempo a tareas administrativas repetitivas.",
    solution: "Implementación del servicio 'Homologación Flash 24h' combinado con Pasaportes Digitales verificados en la red Pontus-X. Los proveedores suben sus certificaciones una sola vez y GigaFactory accede al Pasaporte Verificado en tiempo real, eliminando las validaciones duplicadas.",
    services: ["Homologación Flash 24h", "Wallet Web3 Empresarial", "Firma ODRL Automática", "Conector ERP Universal"],
    ariaQuote: "La automatización mediante políticas ODRL permitió que los contratos se firmaran automáticamente al cumplir los requisitos de seguridad. El equipo de compras ahora dedica su tiempo a negociación estratégica, no a perseguir documentos.",
    simulator: "industrial"
  },
  "olivetrust-coop": {
    id: "olivetrust-coop",
    title: "Trazabilidad ESG para Exportación de Aceite",
    company: "OliveTrust Coop",
    sector: "Agroalimentario",
    sectorIcon: Wheat,
    metric: "+12%",
    metricLabel: "Valor Exportación",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0x3a1b9c7e5d3f1a9b7c5e3d1f9a7b5c3e1d9f7a5b3c1e9d7f5a3b1c9e7d5f3a1b9",
    blockNumber: "#18,189,432",
    challenge: "OliveTrust necesitaba demostrar la huella hídrica real de sus explotaciones en Jaén para cumplir con el pliego de condiciones del distribuidor alemán Edeka. Cada certificación tradicional costaba 3.500€ y tardaba 45 días en obtenerse.",
    solution: "Captura automatizada de datos IoT de riego desde los sensores de campo y notarización de certificados de origen en blockchain. El Pasaporte Digital del Aceite incluye trazabilidad desde la finca hasta el punto de venta.",
    services: ["Certificación ESG Instantánea", "Notarización Blockchain", "Pasaporte Digital de Producto", "API de Trazabilidad"],
    ariaQuote: "El Pasaporte Digital de Proveedor eliminó la necesidad de 5 auditorías físicas redundantes. Ahora cada comprador europeo accede a los mismos datos verificados sin coste adicional para la cooperativa.",
    simulator: "agro"
  },
  "urbandeliver-bcn": {
    id: "urbandeliver-bcn",
    title: "Reporting Scope 3 para Financiación Sostenible",
    company: "UrbanDeliver BCN",
    sector: "Movilidad Sostenible",
    sectorIcon: Truck,
    metric: "1h",
    metricLabel: "Auditoría CSRD",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
    textColor: "text-teal-600 dark:text-teal-400",
    blockchainProof: "0x5d417c9a3b1e7f5d3a9c1b7e5f3a1d9c7b5e3a1f9d7c5b3a1e9f7d5c3b1a9e7f5",
    blockNumber: "#18,201,789",
    challenge: "UrbanDeliver necesitaba auditar las emisiones reales de su flota logística para acceder a un crédito verde de 2M€ del Green Finance Bank. Los informes manuales tardaban semanas y no eran aceptados por la entidad financiera.",
    solution: "Integración del Conector ERP Universal para extraer telemetría de consumo real de la flota (OBD-II) y generación automática de informe CSRD con emisiones Scope 1, 2 y 3 certificadas.",
    services: ["Conector ERP Universal", "Calculadora Scope 3", "Informe CSRD Automático", "Certificación Verde"],
    ariaQuote: "Gracias a la telemetría directa integrada con ProcureData, el Green Finance Bank aprobó el crédito verde en tiempo récord. La transparencia de datos eliminó las 12 semanas habituales de due diligence.",
    simulator: "mobility"
  },
  "alianza-social-hub": {
    id: "alianza-social-hub",
    title: "Medición de Impacto Social Verificable",
    company: "Alianza Social Hub",
    sector: "Economía Social",
    sectorIcon: Heart,
    metric: "1:3.8",
    metricLabel: "Ratio SROI",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-600 dark:text-violet-400",
    blockchainProof: "0x7e2fa3c81d9b5f7a3e1c9d5b7f3a1e9c7d5b3a1f9e7c5d3b1a9f7e5c3d1b9a7f5",
    blockNumber: "#18,156,321",
    challenge: `Alianza Social Hub agrupa a 15 centros especiales de empleo. El problema principal: Las grandes corporaciones con cuotas de reserva (LGD) necesitaban demostrar el impacto real de cada euro invertido en proveedores éticos. Los departamentos de RSC solo podían reportar gastos, no valor social generado.`,
    solution: `Implementación del Dashboard de Métricas SROI con tres pilares: 1) Monetización del Impacto con cálculo de ahorro en subsidios públicos. 2) Garantía Anti-Social-Washing con DID verificado en Pontus-X. 3) Reporte CSRD Automático para Memorias de Sostenibilidad.`,
    services: ["Dashboard SROI", "Auditoría Social Digital", "Pasaporte de Proveedor Ético", "Memoria de Sostenibilidad Automática", "Verificación DID Anti-Social-Washing"],
    ariaQuote: "Hemos verificado que el 100% de los proveedores cumplen con la LGD. Por cada euro invertido, se generan 3.8€ de valor social. El 78% de la inversión se reinvierte en economía local.",
    simulator: "social"
  },
  "biomed-hospital": {
    id: "biomed-hospital",
    title: "Disponibilidad Crítica de Equipos RM",
    company: "BioMed Hospital",
    sector: "Salud",
    sectorIcon: Stethoscope,
    metric: "-30%",
    metricLabel: "Fallos Críticos",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    textColor: "text-rose-600 dark:text-rose-400",
    blockchainProof: "0x9b4dc1e73a5f9b7d1e3c5a7f9b1d3e5c7a9f1b3d5e7c9a1f3b5d7e9c1a3f5b7d9",
    blockNumber: "#18,178,654",
    challenge: `El hospital sufría paradas imprevistas en sus equipos de Resonancia Magnética (RM), costando 15.000€ por día de inactividad y retrasando cirugías críticas. Sin visibilidad del estado real de los equipos ni posibilidad de compartir logs sin exponer datos de pacientes (GDPR).`,
    solution: `Implementación de Edge Functions para anonimizar datos de pacientes mientras se envían logs de error del imán en tiempo real al proveedor EcoTech Industrial. Modelo predictivo ML detecta fallos 72h antes. Alertas automáticas al proveedor de repuestos homologado.`,
    services: ["Conector IDS Seguro", "Anonimizador GDPR", "API Mantenimiento Predictivo", "Alertas Inteligentes", "Homologación Proveedores MRO"],
    ariaQuote: "Gracias al conector IDS, el hospital compartió los logs técnicos sin exponer ningún dato personal de pacientes. El modelo predictivo detecta fallos 72h antes, evitando paradas imprevistas.",
    simulator: "health"
  },
  "globalretail-prime": {
    id: "globalretail-prime",
    title: "Auditoría Ética de Cadena de Suministro",
    company: "GlobalRetail Prime",
    sector: "Comercio",
    sectorIcon: ShoppingBag,
    metric: "0",
    metricLabel: "Incidencias Éticas",
    color: "from-blue-500 to-sky-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    blockchainProof: "0x4a2c8e7f3b1d9a5c7e3f1b9d7a5c3e1f9b7d5a3c1e9f7b5d3a1c9e7f5b3d1a9c7",
    blockNumber: "#18,267,891",
    challenge: `Una multinacional de retail necesitaba asegurar que sus 200 proveedores textiles en Asia cumplían con la normativa SA8000 para evitar riesgos reputacionales. Auditorías presenciales costosas, documentos falsificables y ninguna garantía de continuidad entre inspecciones.`,
    solution: `Implementación del Pasaporte Digital de Proveedor con auditorías firmadas digitalmente por certificadoras externas. Políticas ODRL permiten que solo el comité de ética acceda a detalles sensibles. Trazabilidad blockchain garantiza integridad de certificados.`,
    services: ["Pasaporte Digital de Proveedor", "Auditoría Digital ISO", "ODRL License Validator", "Validador DID Web3", "Monitor Riesgo Proveedor"],
    ariaQuote: "La trazabilidad blockchain en Pontus-X garantiza que el certificado SA8000 no ha sido manipulado desde su emisión en origen. Cero incidencias éticas en la auditoría anual y +25% confianza del consumidor.",
    simulator: "retail"
  },
  "ecovolt-manufacturing": {
    id: "ecovolt-manufacturing",
    title: "Compra de Energía Renovable Automatizada",
    company: "EcoVolt Manufacturing",
    sector: "Energía Industrial",
    sectorIcon: Zap,
    metric: "100%",
    metricLabel: "Energía Renovable",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    blockchainProof: "0x6b3d9a1c5e7f3b1d9a5c7e3f1b9d7a5c3e1f9b7d5a3c1e9f7b5d3a1c9e7f5b3d1",
    blockNumber: "#18,289,456",
    challenge: `Una planta de aluminio necesitaba certificar que el 100% de su consumo era renovable para obtener beneficios fiscales. La conciliación de facturas y certificados de Garantía de Origen (GdO) tardaba meses, perdiendo incentivos fiscales.`,
    solution: `Automatización mediante Smart Contracts y EUROe. Contador IoT reporta consumo en tiempo real. Smart Contract compra automáticamente certificados GdO y paga en el mismo bloque. Conciliación contable instantánea y sello Carbon Neutral automático.`,
    services: ["Wallet Web3 Empresarial", "Pontus-X Notary Node", "Conector Universal ERP", "Carbon Tracker ISO 14064", "Certificación Green Partner"],
    ariaQuote: "El pago en EUROe permite que la transferencia de valor y el certificado de energía ocurran en el mismo bloque de blockchain. Conciliación contable instantánea, de meses a 12 segundos.",
    simulator: "energy"
  }
};

const SuccessStoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const caseData = id ? casesData[id] : null;

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Caso no encontrado</h2>
          <Link to="/success-stories">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Casos de Éxito
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const SectorIcon = caseData.sectorIcon;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${caseData.bgColor} border-b`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-8 md:py-16 relative">
          <Link to="/success-stories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver a Casos de Éxito
          </Link>
          
          {/* Navigator */}
          <div className="mb-8">
            <SuccessStoryNavigator compact />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`${caseData.bgColor} ${caseData.textColor} border-0`}>
                  <SectorIcon className="w-3 h-3 mr-1" />
                  {caseData.sector}
                </Badge>
                <Badge variant="outline" className="font-mono text-xs">
                  <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
                  Verificado en Pontus-X
                </Badge>
              </div>

              <div>
                <p className="text-lg text-muted-foreground font-medium">{caseData.company}</p>
                <h1 className="text-3xl md:text-4xl font-bold mt-2">{caseData.title}</h1>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    {caseData.metricLabel}
                  </p>
                  <p className={`text-4xl font-bold bg-gradient-to-r ${caseData.color} bg-clip-text text-transparent`}>
                    {caseData.metric}
                  </p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Bloque
                  </p>
                  <p className="text-lg font-mono font-semibold">{caseData.blockNumber}</p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-background/80 backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${caseData.color} flex items-center justify-center`}>
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold">Prueba Blockchain</p>
                  <p className="text-xs text-muted-foreground">Transacción inmutable</p>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg font-mono text-xs break-all">
                {caseData.blockchainProof}
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <ExternalLink className="w-3 h-3 mr-2" />
                Ver en Pontus-X Explorer
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" />
                El Reto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{caseData.challenge}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                La Solución
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{caseData.solution}</p>
            </CardContent>
          </Card>
        </div>

        {/* Services Used */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Servicios ProcureData Utilizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {caseData.services.map((service, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm py-1.5 px-3">
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ARIA Quote */}
        <Card className={`${caseData.bgColor} border-0`}>
          <CardContent className="p-8">
            <div className="flex gap-4">
              <Quote className={`w-8 h-8 ${caseData.textColor} shrink-0`} />
              <div>
                <p className="text-lg italic leading-relaxed mb-4">"{caseData.ariaQuote}"</p>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${caseData.color}`} />
                  <div>
                    <p className="font-bold text-sm">ARIA</p>
                    <p className="text-xs text-muted-foreground">Asistente de ProcureData</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Simulator */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Simulador de Impacto</h2>
          </div>
          
          {caseData.simulator === "industrial" && <ROISimulator />}
          {caseData.simulator === "agro" && <AgroROISimulator />}
          {caseData.simulator === "social" && <SocialImpactDashboard spend={150000} />}
          {caseData.simulator === "mobility" && <MobilityScope3Report fleetSize={45} electricPercentage={35} />}
          {caseData.simulator === "health" && <HealthMaintenanceSimulator />}
          {caseData.simulator === "retail" && <RetailEthicsAudit />}
          {caseData.simulator === "energy" && <EnergySmartContract />}
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Quieres lograr resultados similares?</h3>
            <p className="mb-6 opacity-90">
              Descubre cómo ProcureData puede transformar tus procesos de compras y demostrar tu impacto ESG.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/catalog">
                <Button variant="secondary" size="lg">
                  Explorar Catálogo
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Ver Servicios
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessStoryDetail;
