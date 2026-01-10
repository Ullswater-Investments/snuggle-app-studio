// src/components/AssetDownloadButton.tsx
// Componente para descargar activos después de la compra en PONTUS-X

import { Button } from '@/components/ui/button';
import { Download, Play, Loader2, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { useConsumeAsset } from '@/hooks/useConsumeAsset';
import { PONTUSX_NETWORK_CONFIG } from '@/services/pontusX';
import { cn } from '@/lib/utils';

interface AssetDownloadButtonProps {
  assetDid: string;
  orderTxId: string;
  assetType?: 'dataset' | 'algorithm' | 'compute';
  assetName?: string;
  className?: string;
  algorithmDid?: string; // Para Compute-to-Data
}

export function AssetDownloadButton({
  assetDid,
  orderTxId,
  assetType = 'dataset',
  assetName = 'data',
  className,
  algorithmDid
}: AssetDownloadButtonProps) {
  const { 
    consumeState, 
    consumeAsset, 
    triggerDownload,
    startCompute,
    isProcessing 
  } = useConsumeAsset();

  const handleDownload = async () => {
    const result = await consumeAsset(assetDid, orderTxId, 'access');
    if (result?.success && result.downloadUrl) {
      triggerDownload(result.downloadUrl, `${assetName}.csv`);
    }
  };

  const handleCompute = async () => {
    if (!algorithmDid) {
      console.warn('No algorithm DID provided for C2D');
      return;
    }
    await startCompute(assetDid, algorithmDid);
  };

  const isCompleted = consumeState.status === 'completed';
  const isError = consumeState.status === 'error';
  const explorerUrl = `${PONTUSX_NETWORK_CONFIG.blockExplorerUrls?.[0]}tx/${orderTxId}`;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Estado de procesamiento */}
      {isProcessing && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Validando acceso en blockchain...</span>
        </div>
      )}

      {/* Estado de éxito */}
      {isCompleted && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle className="h-4 w-4" />
          <span>Descarga lista</span>
        </div>
      )}

      {/* Estado de error */}
      {isError && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{consumeState.errorMessage || 'Error al obtener acceso'}</span>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-2">
        {assetType === 'compute' ? (
          <Button 
            onClick={handleCompute} 
            disabled={isProcessing || !algorithmDid}
            className="gap-2"
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Ejecutar Algoritmo (C2D)
          </Button>
        ) : (
          <Button 
            onClick={handleDownload} 
            disabled={isProcessing}
            className="gap-2"
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Descargar Archivo
          </Button>
        )}
      </div>

      {/* Link al explorador */}
      {orderTxId && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          Ver transacción en blockchain
        </a>
      )}
    </div>
  );
}
