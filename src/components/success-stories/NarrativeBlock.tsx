import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface NarrativeBlockProps {
  challenge: string;
  solution: string;
  services: string[];
  sectorColor?: string;
}

export const NarrativeBlock = ({ 
  challenge, 
  solution, 
  services,
  sectorColor = "orange"
}: NarrativeBlockProps) => {
  // Map color names to Tailwind classes
  const colorMap: Record<string, { accent: string; bg: string; border: string }> = {
    orange: { accent: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20", border: "border-orange-200 dark:border-orange-800/30" },
    emerald: { accent: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800/30" },
    teal: { accent: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950/20", border: "border-teal-200 dark:border-teal-800/30" },
    violet: { accent: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/20", border: "border-violet-200 dark:border-violet-800/30" },
    rose: { accent: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/20", border: "border-rose-200 dark:border-rose-800/30" },
    blue: { accent: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-200 dark:border-blue-800/30" },
    yellow: { accent: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20", border: "border-yellow-200 dark:border-yellow-800/30" },
    green: { accent: "text-green-500", bg: "bg-green-50 dark:bg-green-950/20", border: "border-green-200 dark:border-green-800/30" },
    lime: { accent: "text-lime-500", bg: "bg-lime-50 dark:bg-lime-950/20", border: "border-lime-200 dark:border-lime-800/30" },
  };

  const colors = colorMap[sectorColor] || colorMap.orange;

  return (
    <div className="space-y-6">
      {/* Challenge & Solution Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Challenge Card */}
        <Card className={cn(
          "bg-card border-2 transition-all duration-300 hover:shadow-lg",
          "border-red-200 dark:border-red-900/30"
        )}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-950/50 shrink-0">
                <Target className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-foreground">El Reto</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {challenge}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solution Card */}
        <Card className={cn(
          "bg-card border-2 transition-all duration-300 hover:shadow-lg",
          "border-green-200 dark:border-green-900/30"
        )}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-green-100 dark:bg-green-950/50 shrink-0">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-foreground">La Solución</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {solution}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Tags */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Servicios Utilizados
        </h4>
        <div className="flex flex-wrap gap-2">
          {services.map((service, idx) => (
            <Link key={idx} to="/services">
              <Badge 
                variant="secondary"
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  "hover:scale-105 hover:shadow-md",
                  colors.bg,
                  colors.border,
                  colors.accent,
                  "border"
                )}
              >
                {service}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NarrativeBlock;
