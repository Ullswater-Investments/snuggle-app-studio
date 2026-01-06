import { motion } from "framer-motion";
import { Flame, Zap, Sparkles, Gem } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ServicePopularityBadgeProps {
  serviceName: string;
  price: number | null;
  createdAt?: string;
  className?: string;
}

type PopularityType = "popular" | "trending" | "new" | "premium" | null;

// Simulated popularity data based on service characteristics
const getPopularityType = (
  serviceName: string, 
  price: number | null, 
  createdAt?: string
): PopularityType => {
  // Check if premium (price > 100)
  if (price && price > 100) {
    return "premium";
  }

  // Check if new (created within last 30 days - simulated)
  if (createdAt) {
    const created = new Date(createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    if (created > thirtyDaysAgo) {
      return "new";
    }
  }

  // Hash-based determination for consistent "randomness"
  const hash = serviceName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Popular services (high user count)
  const popularServices = [
    "GDPR PII Shield",
    "Homologación Flash",
    "Sincronizador ERP Universal",
    "Supply Chain Risk AI"
  ];
  if (popularServices.includes(serviceName) || hash % 3 === 0) {
    return "popular";
  }

  // Trending services
  const trendingServices = [
    "Carbon Tracker ISO 14064",
    "Auditoría CSRD Automática",
    "Trade Finance Scoring"
  ];
  if (trendingServices.includes(serviceName) || hash % 5 === 0) {
    return "trending";
  }

  return null;
};

const popularityConfig: Record<NonNullable<PopularityType>, {
  icon: React.ElementType;
  label: string;
  className: string;
  animation?: boolean;
}> = {
  popular: {
    icon: Flame,
    label: "Popular",
    className: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    animation: true,
  },
  trending: {
    icon: Zap,
    label: "Trending",
    className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    animation: true,
  },
  new: {
    icon: Sparkles,
    label: "Nuevo",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    animation: false,
  },
  premium: {
    icon: Gem,
    label: "Premium",
    className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    animation: false,
  },
};

export const ServicePopularityBadge = ({ 
  serviceName, 
  price, 
  createdAt,
  className 
}: ServicePopularityBadgeProps) => {
  const popularityType = getPopularityType(serviceName, price, createdAt);
  
  if (!popularityType) return null;

  const config = popularityConfig[popularityType];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className={className}
    >
      <Badge 
        variant="outline" 
        className={`gap-1 ${config.className}`}
      >
        {config.animation ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Icon className="h-3 w-3" />
          </motion.div>
        ) : (
          <Icon className="h-3 w-3" />
        )}
        {config.label}
      </Badge>
    </motion.div>
  );
};
