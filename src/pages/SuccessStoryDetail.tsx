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
  ShieldCheck,
  Clock,
  Target,
  Zap,
  ExternalLink,
  Quote,
  TrendingUp
} from "lucide-react";
import { ROISimulator } from "@/components/ROISimulator";
import { AgroROISimulator } from "@/components/AgroROISimulator";
import { SocialImpactDashboard } from "@/components/SocialImpactDashboard";
import { MobilityScope3Report } from "@/components/success-stories/MobilityScope3Report";

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
  simulator: "industrial" | "agro" | "social" | "mobility" | "health";
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
    challenge: `Alianza Social Hub agrupa a 15 centros especiales de empleo y empresas de inserción laboral.

**El problema principal**: Las grandes corporaciones con cuotas de reserva (Ley General de Discapacidad) necesitaban demostrar el impacto real de cada euro invertido en proveedores éticos. Los departamentos de RSC solo podían reportar gastos, no valor social generado.

**Riesgos adicionales**:
• Social Washing: Dificultad para verificar la autenticidad de los centros de inserción
• Auditorías manuales: Cientos de horas recopilando certificados para memorias de sostenibilidad
• Falta de métricas estandarizadas para comparar proveedores éticos`,
    solution: `Implementación del Dashboard de Métricas SROI con tres pilares técnicos:

**1. Monetización del Impacto**: Cruce automático del gasto con el ahorro en subsidios públicos (0.45€ por cada 1€ invertido) y cálculo de empleos inclusivos creados (60% en CEE, 40% en empresas de inserción).

**2. Garantía Anti-Social-Washing**: Cada centro especial tiene un Identificador DID verificado en Pontus-X (did:web:alianza-social.procuredata.eu), eliminando el riesgo reputacional.

**3. Reporte CSRD Automático**: Generación de PDF verificado que sirve como anexo legal para la Memoria de Sostenibilidad corporativa, ahorrando cientos de horas de recopilación manual.`,
    services: ["Dashboard SROI", "Auditoría Social Digital", "Pasaporte de Proveedor Ético", "Memoria de Sostenibilidad Automática", "Verificación DID Anti-Social-Washing"],
    ariaQuote: "Hemos verificado mediante auditoría digital que el 100% de los proveedores de este lote cumplen con la Ley General de Discapacidad. Por cada euro invertido, se generan 3.8€ de valor social medible. El 78% de la inversión se reinvierte en la economía local de proximidad.",
    simulator: "social"
  },
  "biomed-hospital": {
    id: "biomed-hospital",
    title: "Continuidad Asistencial Garantizada",
    company: "BioMed Hospital",
    sector: "Salud",
    sectorIcon: Stethoscope,
    metric: "100%",
    metricLabel: "Uptime Equipos",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    textColor: "text-rose-600 dark:text-rose-400",
    blockchainProof: "0x9b4dc1e73a5f9b7d1e3c5a7f9b1d3e5c7a9f1b3d5e7c9a1f3b5d7e9c1a3f5b7d9",
    blockNumber: "#18,178,654",
    challenge: "BioMed Hospital experimentaba paradas imprevistas en sus equipos de Resonancia Magnética, afectando a la programación de pacientes. Los contratos de mantenimiento tradicionales no garantizaban tiempos de respuesta adecuados.",
    solution: "Acceso a datasets de logs de mantenimiento de equipos RM verificados, permitiendo entrenar modelos de IA predictiva. Integración con proveedores de repuestos homologados para respuesta inmediata.",
    services: ["Datasets Sintéticos Verificados", "API de Mantenimiento Predictivo", "Homologación de Proveedores MRO", "Alertas Inteligentes"],
    ariaQuote: "El modelo predictivo entrenado con datos verificados de ProcureData detecta fallos potenciales con 72 horas de antelación, permitiendo programar mantenimientos sin afectar a los pacientes.",
    simulator: "health"
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
          <Link to="/success-stories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver a Casos de Éxito
          </Link>

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
          {caseData.simulator === "health" && (
            <Card className="p-8 text-center">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Simulador en Desarrollo</h3>
              <p className="text-muted-foreground">
                El simulador específico para el sector {caseData.sector} estará disponible próximamente.
              </p>
            </Card>
          )}
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
