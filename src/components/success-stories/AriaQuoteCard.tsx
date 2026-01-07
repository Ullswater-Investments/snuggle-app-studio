import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AriaQuoteCardProps {
  quote: string;
  sectorColor?: string;
}

export const AriaQuoteCard = ({ 
  quote, 
  sectorColor = "orange" 
}: AriaQuoteCardProps) => {
  // Map color names to background and accent classes
  const colorMap: Record<string, { bg: string; accent: string; border: string }> = {
    orange: { bg: "bg-orange-50/50 dark:bg-orange-950/20", accent: "text-orange-500", border: "border-orange-200/50 dark:border-orange-800/30" },
    emerald: { bg: "bg-emerald-50/50 dark:bg-emerald-950/20", accent: "text-emerald-500", border: "border-emerald-200/50 dark:border-emerald-800/30" },
    teal: { bg: "bg-teal-50/50 dark:bg-teal-950/20", accent: "text-teal-500", border: "border-teal-200/50 dark:border-teal-800/30" },
    violet: { bg: "bg-violet-50/50 dark:bg-violet-950/20", accent: "text-violet-500", border: "border-violet-200/50 dark:border-violet-800/30" },
    rose: { bg: "bg-rose-50/50 dark:bg-rose-950/20", accent: "text-rose-500", border: "border-rose-200/50 dark:border-rose-800/30" },
    blue: { bg: "bg-blue-50/50 dark:bg-blue-950/20", accent: "text-blue-500", border: "border-blue-200/50 dark:border-blue-800/30" },
    yellow: { bg: "bg-yellow-50/50 dark:bg-yellow-950/20", accent: "text-yellow-500", border: "border-yellow-200/50 dark:border-yellow-800/30" },
    green: { bg: "bg-green-50/50 dark:bg-green-950/20", accent: "text-green-500", border: "border-green-200/50 dark:border-green-800/30" },
    lime: { bg: "bg-lime-50/50 dark:bg-lime-950/20", accent: "text-lime-500", border: "border-lime-200/50 dark:border-lime-800/30" },
  };

  const colors = colorMap[sectorColor] || colorMap.orange;

  return (
    <Card className={cn(
      "relative overflow-hidden border",
      colors.bg,
      colors.border
    )}>
      {/* Large decorative quote */}
      <div className="absolute -top-4 -left-2 opacity-10">
        <Quote className={cn("w-24 h-24", colors.accent)} />
      </div>
      
      <CardContent className="p-6 md:p-8 relative">
        <div className="flex items-start gap-4">
          {/* ARIA Avatar */}
          <div className={cn(
            "shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-primary to-orange-500"
          )}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          
          {/* Quote content */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">ARIA</span>
              <span className="text-xs text-muted-foreground">• Strategic Insight</span>
            </div>
            
            <blockquote className="text-muted-foreground leading-relaxed italic">
              "{quote}"
            </blockquote>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AriaQuoteCard;
