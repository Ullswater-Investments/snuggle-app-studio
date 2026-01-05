import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  LucideIcon,
} from "lucide-react";

interface UseCase {
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  color: string;
  bgColor: string;
}

const USE_CASES: UseCase[] = [
  {
    title: "Onboarding KYB",
    description: "Verificación instantánea de proveedores mediante identidad soberana (DID) en Pontus-X.",
    icon: ShieldCheck,
    badge: "Identity",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Huella de Carbono",
    description: "Reportes ESG inmutables y auditables para cumplir con normativas CSRD.",
    icon: Leaf,
    badge: "Sustainability",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Marketplace de Datos",
    description: "Compraventa segura de activos industriales pagando con EUROe.",
    icon: Coins,
    badge: "Commerce",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Kill-Switch de Datos",
    description: "Revocación de accesos en tiempo real ante brechas de seguridad.",
    icon: LockKeyhole,
    badge: "Security",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Pasaporte Digital (DPP)",
    description: "Trazabilidad completa del producto agregando datos de múltiples proveedores.",
    icon: Package,
    badge: "Compliance",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Compute-to-Data",
    description: "Entrena IA sobre datos sensibles sin exponerlos fuera del sandbox.",
    icon: Cpu,
    badge: "AI Privacy",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    title: "Gestión de Recalls",
    description: "Rastreo instantáneo de lotes defectuosos en toda la cadena de suministro.",
    icon: AlertTriangle,
    badge: "Quality",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Financiación DeFi",
    description: "Historial de entregas verificado en blockchain para acceder a crédito.",
    icon: Landmark,
    badge: "Finance",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Auditoría Cadena Frío",
    description: "Sensores IoT registran temperatura inmutablemente para resolver disputas.",
    icon: Thermometer,
    badge: "IoT",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    title: "Licencias ODRL",
    description: "Negociación dinámica de contratos con restricciones temporales y de uso.",
    icon: FileSignature,
    badge: "Legal",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
];

export default function UseCasesCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {USE_CASES.map((useCase, index) => {
          const IconComponent = useCase.icon;
          return (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-xl ${useCase.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${useCase.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {useCase.badge}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg">{useCase.title}</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">
                    {useCase.description}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full group">
                    <Link to="/requests/new">
                      Ver Demo
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-12" />
      <CarouselNext className="hidden md:flex -right-12" />
    </Carousel>
  );
}
