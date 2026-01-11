import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  ShieldCheck, 
  Leaf, 
  Star, 
  ArrowRight,
  Database,
  Gauge,
  BarChart3,
  Cpu,
  Globe
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface PartnerProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  pricingModel: string;
  tags: string[];
  hasGreenBadge: boolean;
  kybVerified: boolean;
  reputationScore: number;
  reviewCount: number;
  dataPoints?: string;
  updateFrequency?: string;
  partnerId?: string;
  partnerName?: string;
  partnerCountry?: string;
  partnerFlag?: string;
  sector?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Compliance": return ShieldCheck;
    case "ESG": return Leaf;
    case "Ops": return Gauge;
    case "Market": return BarChart3;
    case "R&D": return Cpu;
    default: return Database;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Compliance": return "bg-blue-100 text-blue-800 border-blue-200";
    case "ESG": return "bg-green-100 text-green-800 border-green-200";
    case "Ops": return "bg-orange-100 text-orange-800 border-orange-200";
    case "Market": return "bg-purple-100 text-purple-800 border-purple-200";
    case "R&D": return "bg-cyan-100 text-cyan-800 border-cyan-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-3 w-3 ${star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
      />
    ))}
    <span className="text-xs text-muted-foreground ml-1">({count})</span>
  </div>
);

interface PartnerProductCardProps {
  product: PartnerProduct;
}

const getPartnerProductDetailUrl = (productId: string): string => {
  const routes: Record<string, string> = {
    // VDA (Germany)
    "VDA-SUP-SC-01": "/catalog/resiliencia-supply-chain",
    "VDA-ESG-ENER-02": "/catalog/huella-carbono-automotriz",
    "VDA-OPS-CAP-03": "/catalog/capacidad-productiva-automotriz",
    "VDA-MKT-BENCH-04": "/catalog/benchmarking-precios-componentes",
    "VDA-RND-TEL-05": "/catalog/telemetria-ia-automotriz",
    // Aerospace Valley (France)
    "AV-SUP-CERT-01": "/catalog/certificaciones-aeronauticas",
    "AV-ESG-SAF-02": "/catalog/combustibles-saf-aviacion",
    "AV-OPS-MRO-03": "/catalog/disponibilidad-mro-aeronautico",
    "AV-MKT-AERO-04": "/catalog/precios-aleaciones-aeronauticas",
    "AV-RND-TERM-05": "/catalog/tolerancia-termica-aleaciones",
    // Motor Valley (Italy)
    "MV-SUP-LUX-01": "/catalog/proveedores-premium-automotrices",
    "MV-ESG-ENER-02": "/catalog/energia-limpia-motor-valley",
    "MV-OPS-CRAFT-03": "/catalog/produccion-artesanal-automotriz",
    "MV-MKT-SUPER-04": "/catalog/precios-componentes-superdeportivos",
    "MV-RND-PERF-05": "/catalog/telemetria-alto-desempeno",
    // Brainport Eindhoven (Netherlands)
    "BPE-SUP-SEMI-01": "/catalog/certificaciones-semiconductores",
    "BPE-ESG-CLEAN-02": "/catalog/impacto-ambiental-chips",
    "BPE-OPS-CAP-03": "/catalog/capacidad-sala-limpia",
    "BPE-MKT-CHIP-04": "/catalog/precios-componentes-electronicos",
    "BPE-RND-NANO-05": "/catalog/caracterizacion-nanomateriales",
    // GAIA Cluster (País Vasco, Spain)
    "GAIA-SUP-DIG-01": "/catalog/madurez-digital-tic",
    "GAIA-ESG-CIRC-02": "/catalog/economia-circular-tic",
    "GAIA-OPS-DEV-03": "/catalog/capacidad-desarrollo-software",
    "GAIA-MKT-FIN-04": "/catalog/scoring-financiero-digital",
    // BDEW (Germany - Energy)
    "BDEW-SUP-GRID-01": "/catalog/operadores-red-energetica",
    "BDEW-ESG-RENEW-02": "/catalog/mix-energetico-alemania",
    "BDEW-OPS-FLEX-03": "/catalog/flexibilidad-energetica",
    "BDEW-MKT-ENER-04": "/catalog/precios-mayoristas-energia",
    "BDEW-RND-SMART-05": "/catalog/smart-grid-contadores",
    // Agoria (Belgium - Industrial Tech)
    "AGO-SUP-TECH-01": "/catalog/empresas-tecnologicas-belgas",
  };
  return routes[productId] || "/auth";
};

export const PartnerProductCard = ({ product }: PartnerProductCardProps) => {
  const { t } = useTranslation('partnerProducts');
  const navigate = useNavigate();
  const CategoryIcon = getCategoryIcon(product.category);
  const isPaid = product.price > 0;
  const detailUrl = getPartnerProductDetailUrl(product.id);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-muted/60 overflow-hidden flex flex-col h-full">
      <div className={`h-2 ${product.hasGreenBadge ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-indigo-500 to-purple-400'} group-hover:h-3 transition-all`} />

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {product.partnerFlag && (
              <Badge variant="outline" className="text-xs px-1.5">
                {product.partnerFlag} {product.partnerCountry}
              </Badge>
            )}
            <Badge className={`${getCategoryColor(product.category)} px-2 py-0.5 text-[10px] font-semibold`}>
              <CategoryIcon className="h-3 w-3 mr-1" />
              {product.category}
            </Badge>
          </div>
          <div className="flex gap-1">
            {product.hasGreenBadge && (
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 px-1.5">
                <Leaf className="h-3 w-3" />
              </Badge>
            )}
            {product.kybVerified && (
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 px-1.5">
                <ShieldCheck className="h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>

        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {product.name}
        </CardTitle>
        {product.partnerName && (
          <Badge variant="outline" className="mt-2 text-xs px-2 py-1 border-primary/40 bg-primary/5 w-fit">
            <Globe className="h-3 w-3 mr-1.5" />
            <span className="font-medium">{t('badges.publishedBy') || 'Por'}: {product.partnerName}</span>
            {product.sector && <span className="text-muted-foreground ml-1">• {product.sector}</span>}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 min-h-[60px]">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {product.dataPoints && (
              <span className="flex items-center gap-1">
                <Database className="h-3 w-3" /> {product.dataPoints}
              </span>
            )}
          </div>
          {product.updateFrequency && (
            <span className="bg-muted px-1.5 py-0.5 rounded text-[10px]">
              {product.updateFrequency}
            </span>
          )}
        </div>
      </CardContent>

      <div className="px-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <StarRating rating={product.reputationScore} count={product.reviewCount} />
          <div className="text-right">
            {isPaid ? (
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-foreground">
                  {product.price}€
                </span>
                {product.pricingModel === 'subscription' && (
                  <span className="text-[10px] text-muted-foreground">/{t('pricing.month')}</span>
                )}
                {product.pricingModel === 'one_time' && (
                  <span className="text-[10px] text-muted-foreground">one-time</span>
                )}
              </div>
            ) : (
              <span className="text-lg font-bold text-green-600">{t('pricing.free')}</span>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <CardFooter className="pt-4 bg-muted/30">
        <Button
          onClick={() => navigate(detailUrl)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          {t('actions.viewDetails')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PartnerProductCard;
