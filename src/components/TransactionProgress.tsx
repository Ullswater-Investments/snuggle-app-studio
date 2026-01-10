// src/components/TransactionProgress.tsx
// Componente que muestra el progreso de transacciones Web3

import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { PONTUSX_NETWORK_CONFIG } from '@/services/pontusX';
import type { OrderState } from '@/types/web3.types';
import { cn } from '@/lib/utils';

interface TransactionProgressProps {
  state: OrderState;
  className?: string;
}

const STEPS = [
  { status: 'approving', label: 'Aprobando gasto de tokens', description: 'Confirma en tu wallet' },
  { status: 'ordering', label: 'Ejecutando compra en Smart Contract', description: 'Procesando transacción' },
  { status: 'consuming', label: 'Obteniendo acceso del Provider', description: 'Validando en blockchain' },
  { status: 'completed', label: 'Transacción completada', description: 'Acceso disponible' },
];

export function TransactionProgress({ state, className }: TransactionProgressProps) {
  const currentIndex = STEPS.findIndex(s => s.status === state.status);
  
  const progress = 
    state.status === 'idle' ? 0 : 
    state.status === 'completed' ? 100 : 
    state.status === 'error' ? 0 :
    ((currentIndex + 1) / STEPS.length) * 100;

  // No mostrar nada si está idle
  if (state.status === 'idle') return null;

  const currentStep = STEPS.find(s => s.status === state.status);
  const explorerUrl = state.txHash 
    ? `${PONTUSX_NETWORK_CONFIG.blockExplorerUrls?.[0]}tx/${state.txHash}`
    : null;

  return (
    <div className={cn(
      "space-y-3 p-4 border rounded-lg",
      state.status === 'error' 
        ? "bg-destructive/5 border-destructive/20" 
        : state.status === 'completed'
        ? "bg-green-500/5 border-green-500/20"
        : "bg-muted/50",
      className
    )}>
      {/* Barra de progreso */}
      <Progress 
        value={progress} 
        className={cn(
          "h-2",
          state.status === 'completed' && "[&>div]:bg-green-500",
          state.status === 'error' && "[&>div]:bg-destructive"
        )} 
      />
      
      {/* Estado actual */}
      <div className="flex items-center gap-2">
        {state.status === 'error' ? (
          <>
            <XCircle className="h-4 w-4 text-destructive shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-destructive">Error en la transacción</p>
              <p className="text-xs text-destructive/80 truncate">
                {state.errorMessage || 'Error desconocido'}
              </p>
            </div>
          </>
        ) : state.status === 'completed' ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                ¡Transacción completada!
              </p>
              <p className="text-xs text-muted-foreground">
                Tu acceso está disponible
              </p>
            </div>
          </>
        ) : (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {currentStep?.label || 'Procesando...'}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentStep?.description}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Pasos completados */}
      {state.status !== 'error' && (
        <div className="flex gap-1 mt-2">
          {STEPS.map((step, index) => (
            <div
              key={step.status}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                index <= currentIndex 
                  ? state.status === 'completed' 
                    ? "bg-green-500" 
                    : "bg-primary"
                  : "bg-muted"
              )}
            />
          ))}
        </div>
      )}

      {/* Hash de transacción con link al explorer */}
      {state.txHash && (
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-mono text-muted-foreground truncate">
              Tx: {state.txHash.slice(0, 10)}...{state.txHash.slice(-8)}
            </p>
            {explorerUrl && (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline shrink-0"
              >
                <ExternalLink className="h-3 w-3" />
                Ver
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
