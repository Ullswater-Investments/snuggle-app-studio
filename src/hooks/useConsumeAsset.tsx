// src/hooks/useConsumeAsset.tsx
// Hook para gestionar el consumo/descarga de activos en PONTUS-X

import { useState, useCallback } from 'react';
import { pontusXService } from '@/services/pontusX';
import { useWeb3Wallet } from './useWeb3Wallet';
import type { OrderState, ConsumeResult } from '@/types/web3.types';
import { toast } from 'sonner';

const INITIAL_STATE: OrderState = {
  status: 'idle',
  txHash: null,
  downloadUrl: null,
  errorMessage: null
};

export function useConsumeAsset() {
  const { wallet, connect } = useWeb3Wallet();
  const [consumeState, setConsumeState] = useState<OrderState>(INITIAL_STATE);

  /**
   * Obtiene la URL de descarga del Ocean Provider
   * Requiere que el usuario haya comprado previamente el activo
   */
  const consumeAsset = useCallback(async (
    did: string,
    orderTxId: string,
    serviceId: string = 'access'
  ): Promise<ConsumeResult | null> => {
    // Verificar conexión de wallet
    if (!wallet.isConnected) {
      try {
        await connect();
      } catch {
        toast.error('Wallet no conectada', {
          description: 'Conecta tu wallet para descargar'
        });
        return null;
      }
    }

    try {
      setConsumeState({ 
        status: 'consuming', 
        txHash: orderTxId, 
        downloadUrl: null, 
        errorMessage: null 
      });

      toast.info('Validando acceso...', {
        description: 'Verificando tu compra en blockchain'
      });

      // Obtener URL de descarga del Provider
      const { downloadUrl, expiresAt } = await pontusXService.getDownloadUrl(
        did,
        orderTxId,
        serviceId
      );

      setConsumeState({
        status: 'completed',
        txHash: orderTxId,
        downloadUrl,
        errorMessage: null
      });

      toast.success('Acceso validado', {
        description: `Descarga disponible hasta ${expiresAt.toLocaleTimeString()}`
      });

      return { 
        success: true, 
        downloadUrl, 
        expiresAt 
      };

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al obtener acceso';
      
      setConsumeState({
        status: 'error',
        txHash: orderTxId,
        downloadUrl: null,
        errorMessage: message
      });

      // Errores específicos
      if (message.includes('signature') || message.includes('rejected')) {
        toast.error('Firma rechazada', {
          description: 'Necesitas firmar para verificar tu identidad'
        });
      } else if (message.includes('expired') || message.includes('invalid order')) {
        toast.error('Orden inválida', {
          description: 'La orden de compra no es válida o ha expirado'
        });
      } else {
        toast.error('Error al descargar', {
          description: message
        });
      }

      return null;
    }
  }, [wallet.isConnected, connect]);

  /**
   * Inicia la descarga de un archivo
   */
  const triggerDownload = useCallback((url: string, filename: string = 'data.csv') => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Descarga iniciada', {
      description: filename
    });
  }, []);

  /**
   * Inicia un trabajo de Compute-to-Data
   */
  const startCompute = useCallback(async (
    did: string,
    algorithmDid: string
  ): Promise<{ jobId: string; status: string } | null> => {
    if (!wallet.isConnected) {
      try {
        await connect();
      } catch {
        toast.error('Wallet no conectada');
        return null;
      }
    }

    try {
      setConsumeState(prev => ({ ...prev, status: 'consuming' }));

      toast.info('Iniciando Compute-to-Data...', {
        description: 'Los datos no saldrán de su ubicación original'
      });

      const result = await pontusXService.startComputeJob(did, algorithmDid);

      setConsumeState(prev => ({ ...prev, status: 'completed' }));

      toast.success('Trabajo C2D iniciado', {
        description: `Job ID: ${result.jobId}`
      });

      return result;

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al iniciar cómputo';
      
      setConsumeState(prev => ({ 
        ...prev, 
        status: 'error', 
        errorMessage: message 
      }));

      toast.error('Error en Compute-to-Data', {
        description: message
      });

      return null;
    }
  }, [wallet.isConnected, connect]);

  /**
   * Reinicia el estado
   */
  const resetState = useCallback(() => {
    setConsumeState(INITIAL_STATE);
  }, []);

  /**
   * Verifica si hay un consumo en progreso
   */
  const isProcessing = consumeState.status === 'consuming';

  return { 
    consumeState, 
    consumeAsset, 
    triggerDownload,
    startCompute,
    resetState,
    isProcessing
  };
}
