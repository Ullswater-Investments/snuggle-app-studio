import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InsightItem {
  icon: React.ReactNode;
  iconColor: string;
  text: React.ReactNode;
}

interface AriaDynamicReportProps {
  insights: InsightItem[];
  fteEquivalent?: number;
  fteDescription?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const AriaDynamicReport = ({ 
  insights, 
  fteEquivalent = 0,
  fteDescription,
  ctaLabel,
  onCtaClick,
  className
}: AriaDynamicReportProps) => {
  const { t } = useTranslation('simulators');
  
  const displayCtaLabel = ctaLabel || t('common.downloadReport');
  
  return (
    <Card className={cn(
      "bg-slate-900 dark:bg-slate-950 border-slate-800 text-white overflow-hidden relative",
      className
    )}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-orange-500/10 pointer-events-none" />
      
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary to-orange-500 rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg text-white">{t('aria.name')}</CardTitle>
            <p className="text-xs text-slate-400">{t('aria.strategicReport')}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Insights */}
        <div className="space-y-3">
          {insights.map((insight, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700"
            >
              <div className={cn("mt-0.5 flex-shrink-0", insight.iconColor)}>
                {insight.icon}
              </div>
              <p className="text-sm text-slate-300">
                {insight.text}
              </p>
            </div>
          ))}
        </div>

        {/* FTE Highlight */}
        {fteEquivalent > 0 && (
          <div className="bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-xl p-5 border border-primary/30">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Users className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('common.fteEquivalent')}</span>
            </div>
            <p className="text-sm text-slate-300 italic">
              {fteDescription || t('common.fteDescription', { count: fteEquivalent })}
            </p>
          </div>
        )}
        
        {/* CTA */}
        <Button 
          className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white border-0"
          onClick={onCtaClick}
        >
          <FileText className="mr-2 h-4 w-4" />
          {displayCtaLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AriaDynamicReport;
