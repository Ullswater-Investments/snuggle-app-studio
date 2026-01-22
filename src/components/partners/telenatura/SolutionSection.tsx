import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { 
  Radio, 
  Cpu, 
  MapPin, 
  Zap, 
  Plane, 
  BarChart3,
  Leaf,
  Droplets
} from "lucide-react";

const solutionIcons = {
  hardware: Radio,
  software: Cpu,
  drones: Plane,
  energy: Zap,
  water: Droplets,
  valuations: BarChart3,
};

const solutionKeys = ['hardware', 'software', 'drones', 'energy', 'water', 'valuations'] as const;

export const SolutionSection = () => {
  const { t } = useTranslation('telenatura');

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Leaf className="w-3 h-3 mr-1" />
            {t('solutions.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('solutions.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('solutions.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionKeys.map((key, index) => {
            const IconComponent = solutionIcons[key];
            const tags = t(`solutions.items.${key}.tags`, { returnObjects: true }) as string[];
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                      <IconComponent className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-lg">{t(`solutions.items.${key}.title`)}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{t(`solutions.items.${key}.description`)}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
