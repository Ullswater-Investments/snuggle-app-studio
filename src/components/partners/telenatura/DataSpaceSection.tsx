import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { 
  Database, 
  Shield, 
  Share2, 
  BarChart3,
  Leaf,
  Cloud
} from "lucide-react";

const featureIcons = {
  sovereignty: Database,
  privacy: Shield,
  interoperability: Share2,
  cloud: Cloud,
};

const featureKeys = ['sovereignty', 'privacy', 'interoperability', 'cloud'] as const;

export const DataSpaceSection = () => {
  const { t } = useTranslation('telenatura');

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Leaf className="w-3 h-3 mr-1" />
            {t('dataSpace.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('dataSpace.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('dataSpace.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {featureKeys.map((key, index) => {
            const IconComponent = featureIcons[key];
            return (
              <Card key={index} className="border-green-200 dark:border-green-800">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                      <IconComponent className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-lg">{t(`dataSpace.features.${key}.title`)}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t(`dataSpace.features.${key}.description`)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Integration Diagram */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="bg-white/50 dark:bg-background/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <span className="text-sm font-medium">{t('dataSpace.diagram.sensors')}</span>
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
                <div className="text-center p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Database className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                  <span className="text-sm font-medium">TeleNatura</span>
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
                <div className="text-center p-4 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                  <Share2 className="w-8 h-8 mx-auto mb-2 text-teal-600" />
                  <span className="text-sm font-medium">Pontus-X</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
