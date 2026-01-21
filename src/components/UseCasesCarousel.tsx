import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  id: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const USE_CASES: UseCase[] = [
  { id: "kyb-onboarding", icon: ShieldCheck, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { id: "huella-carbono", icon: Leaf, color: "text-green-500", bgColor: "bg-green-500/10" },
  { id: "marketplace-euroe", icon: Coins, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { id: "kill-switch", icon: LockKeyhole, color: "text-red-500", bgColor: "bg-red-500/10" },
  { id: "pasaporte-digital", icon: Package, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { id: "compute-to-data", icon: Cpu, color: "text-violet-500", bgColor: "bg-violet-500/10" },
  { id: "gestion-recalls", icon: AlertTriangle, color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { id: "financiacion-defi", icon: Landmark, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { id: "cadena-frio", icon: Thermometer, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
  { id: "licencias-odrl", icon: FileSignature, color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
];

export default function UseCasesCarousel() {
  const { t } = useTranslation('useCases');

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
                      {t(`cases.${useCase.id}.badge`)}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg">{t(`cases.${useCase.id}.title`)}</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">
                    {t(`cases.${useCase.id}.shortDesc`)}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full group">
                    <Link to={`/use-cases#${useCase.id}`}>
                      {t('viewDetail')}
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
