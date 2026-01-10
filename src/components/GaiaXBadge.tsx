// src/components/GaiaXBadge.tsx
// Badge visual para indicar verificación Gaia-X en PONTUS-X

import { ShieldCheck, ShieldQuestion } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GaiaXBadgeProps {
  isVerified: boolean;
  complianceLevel?: 'Level 1' | 'Level 2' | 'Level 3';
  className?: string;
  showTooltip?: boolean;
}

export function GaiaXBadge({ 
  isVerified, 
  complianceLevel = 'Level 1',
  className = '',
  showTooltip = true 
}: GaiaXBadgeProps) {
  
  const badgeContent = isVerified ? (
    <Badge 
      variant="outline" 
      className={`gap-1 border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400 ${className}`}
    >
      <ShieldCheck className="h-3 w-3" />
      <span className="text-xs font-medium">Gaia-X {complianceLevel}</span>
    </Badge>
  ) : (
    <Badge 
      variant="outline" 
      className={`gap-1 border-muted-foreground/30 bg-muted/50 text-muted-foreground ${className}`}
    >
      <ShieldQuestion className="h-3 w-3" />
      <span className="text-xs">Verificación pendiente</span>
    </Badge>
  );

  if (!showTooltip) return badgeContent;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          {isVerified ? (
            <div className="space-y-1">
              <p className="font-semibold">Identidad Verificada Gaia-X</p>
              <p className="text-xs text-muted-foreground">
                Esta wallet cumple con los estándares de identidad descentralizada 
                del marco de confianza europeo GAIA-X / PONTUS-X.
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Nivel de compliance: {complianceLevel}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="font-semibold">Verificación Pendiente</p>
              <p className="text-xs text-muted-foreground">
                Conecta tu wallet para verificar tu identidad en el ecosistema PONTUS-X.
              </p>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
