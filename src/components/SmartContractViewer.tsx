import { FileSignature, Shield, Clock, Hash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SmartContractViewerProps {
  policy?: any;
  duration?: number;
  status?: 'active' | 'pending' | 'expired';
}

export const SmartContractViewer = ({ 
  policy, 
  duration = 365, 
  status = 'active' 
}: SmartContractViewerProps) => {
  
  // Interpretación de ODRL JSON a texto legible
  const getHumanReadableRule = (policyData: any) => {
    if (!policyData) return "Acceso estándar sin restricciones adicionales.";
    
    // Parsing básico de estructura ODRL
    const permission = policyData.permission?.[0];
    if (!permission) return "Uso restringido según política interna.";
    
    const constraint = permission.constraint?.[0];
    if (constraint?.leftOperand === 'dateTime' && constraint?.operator === 'lteq') {
      return `Licencia temporal limitada a ${duration} días de uso.`;
    }
    
    if (permission.action === 'distribute') {
      return "Permite redistribución a terceros autorizados.";
    }
    
    if (permission.action === 'read') {
      return "Acceso de solo lectura para análisis y visualización.";
    }
    
    return "Uso comercial permitido con restricciones de derivados.";
  };

  const getContractHash = (policyData: any) => {
    if (!policyData) return "0x8f3a...2b1c";
    // Simulación de hash basado en contenido
    const hash = JSON.stringify(policyData).slice(0, 10);
    return `0x${hash.replace(/[^a-f0-9]/gi, '').slice(0, 4)}...${hash.slice(-4)}`;
  };

  const statusConfig = {
    active: {
      color: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
      label: 'Active'
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
      label: 'Pending'
    },
    expired: {
      color: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
      label: 'Expired'
    }
  };

  return (
    <Card className="border-blue-200 bg-blue-50/30 dark:bg-blue-950/10 dark:border-blue-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between text-blue-800 dark:text-blue-300">
          <div className="flex items-center gap-2">
            <FileSignature className="h-4 w-4" />
            Smart Contract (ODRL 2.0)
          </div>
          <Badge 
            variant="outline" 
            className={statusConfig[status].color}
          >
            {statusConfig[status].label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-3">
        <div className="flex items-start gap-3 p-2 bg-background rounded border">
          <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="font-semibold block text-xs uppercase text-muted-foreground">
              Duración
            </span>
            <span className="text-foreground">
              {duration} días desde la firma
            </span>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-2 bg-background rounded border">
          <Shield className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="font-semibold block text-xs uppercase text-muted-foreground">
              Permisos
            </span>
            <span className="text-foreground">
              {getHumanReadableRule(policy)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          <Hash className="h-3 w-3" />
          <span>Hash inmutable:</span>
          <span className="font-mono font-semibold text-foreground">
            {getContractHash(policy)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};