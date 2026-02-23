import { Building, Database, FileSignature, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface DataLineageProps {
  transaction: any;
}

export function DataLineage({ transaction }: DataLineageProps) {
  const { t } = useTranslation('dataView');

  const steps = [
    {
      icon: Database,
      label: t('lineage.source'),
      value: transaction.asset?.product?.name || t('lineage.datasetFallback'),
      description: t('lineage.sourceDescription'),
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      icon: Building,
      label: t('lineage.provider'),
      value: transaction.subject_org?.name || t('lineage.providerFallback'),
      description: t('lineage.providerDescription'),
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      icon: FileSignature,
      label: t('lineage.contract'),
      value: t('lineage.smartLicense'),
      description: t('lineage.daysAccess', { days: transaction.access_duration_days }),
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30"
    },
    {
      icon: User,
      label: t('lineage.consumer'),
      value: transaction.consumer_org?.name || t('lineage.consumerFallback'),
      description: t('lineage.consumerDescription'),
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          {t('lineage.title')}
        </CardTitle>
        <CardDescription>
          {t('lineage.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Desktop: Horizontal Layout */}
          <div className="hidden md:flex items-center justify-between gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center flex-1">
                  {/* Node */}
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full ${step.bgColor}`}>
                      <Icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {step.label}
                    </Badge>
                    <p className="font-semibold text-sm mb-1">{step.value}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {/* Arrow Connector */}
                  {index < steps.length - 1 && (
                    <div className="relative flex-shrink-0 w-12 flex items-center justify-center">
                      <div className="absolute h-0.5 w-full bg-gradient-to-r from-primary/50 to-primary animate-pulse" />
                      <ArrowRight className="relative z-10 h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: Vertical Layout */}
          <div className="flex md:hidden flex-col gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index}>
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${step.bgColor}`}>
                      <Icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {step.label}
                      </Badge>
                      <p className="font-semibold text-sm mb-1">{step.value}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="ml-6 my-2 h-8 w-0.5 bg-gradient-to-b from-primary/50 to-primary animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
