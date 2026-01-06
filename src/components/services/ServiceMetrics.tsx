import { TrendingUp, Clock, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceMetricsProps {
  serviceName: string;
  className?: string;
}

// Simulated metrics data - in production this would come from the database
const serviceMetricsData: Record<string, { roi: string; time: string; rating: number; users: number }> = {
  "Carbon Tracker ISO 14064": { roi: "+25%", time: "5 min", rating: 4.7, users: 15 },
  "Supply Chain Risk AI": { roi: "+60%", time: "24h", rating: 4.8, users: 22 },
  "GDPR PII Shield": { roi: "+40%", time: "<1s", rating: 4.9, users: 28 },
  "Pontus-X Notary Node": { roi: "+15%", time: "2 min", rating: 4.5, users: 12 },
  "ODRL License Validator": { roi: "+30%", time: "<1s", rating: 4.6, users: 18 },
  "Raw Data Normalizer": { roi: "+35%", time: "3 min", rating: 4.4, users: 14 },
  "Homologación Flash": { roi: "+80%", time: "10 min", rating: 4.9, users: 32 },
  "Trade Finance Scoring": { roi: "+50%", time: "1h", rating: 4.7, users: 19 },
  "Auditoría CSRD Automática": { roi: "+45%", time: "30 min", rating: 4.8, users: 16 },
  "Alertas Comerciales Proactivas": { roi: "+55%", time: "Real-time", rating: 4.6, users: 21 },
  "Sincronizador ERP Universal": { roi: "+70%", time: "5 min", rating: 4.8, users: 25 },
  "Validador DID Web3": { roi: "+20%", time: "<1s", rating: 4.5, users: 10 },
};

// Generate deterministic metrics for services not in the list
const generateMetrics = (serviceName: string) => {
  const hash = serviceName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    roi: `+${15 + (hash % 50)}%`,
    time: ["<1s", "2 min", "5 min", "10 min", "30 min"][hash % 5],
    rating: 4.3 + (hash % 7) / 10,
    users: 8 + (hash % 25),
  };
};

const getMetrics = (serviceName: string) => {
  return serviceMetricsData[serviceName] || generateMetrics(serviceName);
};

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < fullStars
              ? "fill-amber-400 text-amber-400"
              : i === fullStars && hasHalfStar
              ? "fill-amber-400/50 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

export const ServiceMetrics = ({ serviceName, className }: ServiceMetricsProps) => {
  const metrics = getMetrics(serviceName);

  return (
    <TooltipProvider>
      <div className={`flex flex-wrap items-center gap-2 text-xs ${className}`}>
        {/* ROI Badge */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="gap-1 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
              <TrendingUp className="h-3 w-3" />
              {metrics.roi}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Retorno de inversión estimado</p>
          </TooltipContent>
        </Tooltip>

        {/* Processing Time */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="gap-1 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
              <Clock className="h-3 w-3" />
              {metrics.time}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tiempo de procesamiento</p>
          </TooltipContent>
        </Tooltip>

        {/* Rating */}
        <StarRating rating={metrics.rating} />

        {/* Users count */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{metrics.users}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{metrics.users} empresas de tu sector lo usan</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
