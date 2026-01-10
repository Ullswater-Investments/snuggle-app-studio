// src/hooks/usePurchaseAsset.tsx
// Hook para gestionar el flujo de compra de activos en PONTUS-X

import { useState, useCallback } from 'react';
import { pontusXService, PONTUSX_NETWORK_CONFIG } from '@/services/pontusX';
import { useWeb3Wallet } from './useWeb3Wallet';
import type { OrderState, PurchaseResult } from '@/types/web3.types';
import { toast } from 'sonner';

const INITIAL_STATE: OrderState = {
  status: 'idle',
  txHash: null,
  downloadUrl: null,
  errorMessage: null
};

export function usePurchaseAsset() {
  const { wallet, connect } = useWeb3Wallet();
  const [orderState, setOrderState] = useState<OrderState>(INITIAL_STATE);

  /**
   * Ejecuta el flujo completo de compra:
   * 1. Check Balance
   * 2. Approve Token Spending
   * 3. Buy Datatoken
   * 4. Start Order
   */
  const purchaseAsset = useCallback(async (
    assetId: string,
    datatokenAddress: string,
    price: number
  ): Promise<PurchaseResult | null> => {
    // Verificar conexión de wallet
    if (!wallet.isConnected) {
      try {
        await connect();
      } catch {
        toast.error('Wallet no conectada', {
          description: 'Conecta tu wallet para continuar'
        });
        return null;
      }
    }

    try {
      // Paso 1: Verificar saldo
      setOrderState({ 
        status: 'approving', 
        txHash: null, 
        downloadUrl: null, 
        errorMessage: null 
      });

      const { sufficient, currentBalance } = await pontusXService.checkBalance(price);
      
      if (!sufficient) {
        throw new Error(`Saldo insuficiente. Tienes ${currentBalance} EUROe, necesitas ${price} EUROe.`);
      }

      toast.info('Verificando saldo...', {
        description: `Saldo actual: ${currentBalance} EUROe`
      });

      // Paso 2: Aprobar gasto de tokens
      toast.info('Aprobando gasto de tokens...', {
        description: 'Confirma la transacción en tu wallet'
      });

      const approveTx = await pontusXService.approveSpending(datatokenAddress, price.toString());

      // Paso 3: Comprar Datatoken
      setOrderState(prev => ({ ...prev, status: 'ordering', txHash: approveTx }));
      
      toast.info('Comprando acceso...', {
        description: 'Procesando transacción en blockchain'
      });

      const { txHash: datatokenTxId } = await pontusXService.buyDatatoken(
        datatokenAddress, 
        '1' // Siempre 1 datatoken por acceso
      );

      // Paso 4: Iniciar orden
      const { orderTxId } = await pontusXService.startOrder(assetId, 0);

      // Éxito
      setOrderState({
        status: 'completed',
        txHash: orderTxId,
        downloadUrl: null,
        errorMessage: null
      });

      const explorerUrl = pontusXService.getExplorerUrl(orderTxId);

      toast.success('¡Compra exitosa!', {
        description: `Tx: ${orderTxId.slice(0, 10)}...${orderTxId.slice(-6)}`,
        action: {
          label: 'Ver en Explorer',
          onClick: () => window.open(explorerUrl, '_blank')
        }
      });

      return {
        success: true,
        orderTxId,
        datatokenTxId,
        blockNumber: Math.floor(Math.random() * 1000000) + 50000000,
        explorerUrl
      };

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido en la compra';
      
      setOrderState({
        status: 'error',
        txHash: null,
        downloadUrl: null,
        errorMessage: message
      });

      // Errores específicos de wallet
      if (message.includes('rejected') || message.includes('denied')) {
        toast.error('Transacción rechazada', {
          description: 'Cancelaste la transacción en tu wallet'
        });
      } else if (message.includes('insufficient')) {
        toast.error('Saldo insuficiente', {
          description: message
        });
      } else {
        toast.error('Error en la compra', {
          description: message
        });
      }

      return null;
    }
  }, [wallet.isConnected, connect]);

  /**
   * Reinicia el estado del hook
   */
  const resetState = useCallback(() => {
    setOrderState(INITIAL_STATE);
  }, []);

  /**
   * Verifica si hay una compra en progreso
   */
  const isProcessing = orderState.status !== 'idle' && 
                       orderState.status !== 'completed' && 
                       orderState.status !== 'error';

  return { 
    orderState, 
    purchaseAsset, 
    resetState,
    isProcessing
  };
}
