import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  LineChart, 
  FolderSearch, 
  Factory, 
  AlertTriangle, 
  DollarSign, 
  Compass,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UseCase } from "@/data/premiumPartnersData";

interface DataProductCatalogProps {
  useCases: UseCase[];
  partnerId: string;
}

const getTypeConfig = (type: UseCase["type"]) => {
  const configs = {
    benchmark: { 
      icon: BarChart3, 
      label: "BENCHMARK", 
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" 
    },
    index: { 
      icon: TrendingUp, 
      label: "ÍNDICE", 
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
    },
    forecast: { 
      icon: LineChart, 
      label: "PREVISIÓN", 
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" 
    },
    directory: { 
      icon: FolderSearch, 
      label: "DIRECTORIO", 
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" 
    },
    capacity: { 
      icon: Factory, 
      label: "CAPACIDAD", 
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" 
    },
    risk: { 
      icon: AlertTriangle, 
      label: "RIESGO", 
      color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" 
    },
    cost: { 
      icon: DollarSign, 
      label: "COSTE", 
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" 
    },
    strategy: { 
      icon: Compass, 
      label: "ESTRATEGIA", 
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" 
    },
  };
  return configs[type];
};

export const DataProductCatalog = ({ useCases, partnerId }: DataProductCatalogProps) => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Catálogo de{" "}
            <span className="text-primary">Sets de Datos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            10 productos de datos tangibles disponibles a través de ProcureData Marketplace
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => {
            const typeConfig = getTypeConfig(useCase.type);
            const Icon = typeConfig.icon;
            
            return (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
              >
                <Card className="p-5 h-full flex flex-col hover:shadow-lg hover:border-primary/30 transition-all group bg-card/80 backdrop-blur-sm">
                  {/* Type Badge */}
                  <Badge 
                    variant="outline" 
                    className={`w-fit mb-4 text-xs font-semibold ${typeConfig.color}`}
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    {typeConfig.label}
                  </Badge>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {useCase.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-muted-foreground flex-grow line-clamp-3">
                    {useCase.description}
                  </p>
                  
                  {/* CTA */}
                  <div className="mt-4 pt-3 border-t border-border/50">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs h-8 group-hover:bg-primary/5"
                    >
                      Ver Detalle
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Data Products Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {Object.entries({
            benchmark: "Comparativas",
            index: "Índices",
            forecast: "Previsiones",
            directory: "Directorios",
            capacity: "Capacidades",
            risk: "Riesgos",
            cost: "Costes",
            strategy: "Estrategias"
          }).map(([type, label]) => {
            const config = getTypeConfig(type as UseCase["type"]);
            const Icon = config.icon;
            return (
              <Badge 
                key={type}
                variant="outline" 
                className={`text-xs ${config.color}`}
              >
                <Icon className="w-3 h-3 mr-1" />
                {label}
              </Badge>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
