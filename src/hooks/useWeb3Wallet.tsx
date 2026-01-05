import { useState, useEffect, useCallback } from 'react';
import { pontusXService } from '@/services/pontusX';
import type { WalletState } from '@/types/web3.types';
import { toast } from 'sonner';

const INITIAL_STATE: WalletState = {
  address: null,
  chainId: null,
  balance: null,
  euroeBalance: null,
  did: null,
  isConnected: false
};

export const useWeb3Wallet = () => {
  const [wallet, setWallet] = useState<WalletState>(INITIAL_STATE);
  const [isConnecting, setIsConnecting] = useState(true);
  const [hasWeb3, setHasWeb3] = useState(false);

  // Check Web3 availability on mount
  useEffect(() => {
    setHasWeb3(pontusXService.isWeb3Available());
  }, []);

  const connect = useCallback(async (silent = false) => {
    if (!silent) setIsConnecting(true);
    try {
      const state = await pontusXService.connectWallet();
      setWallet(state);
      if (!silent) {
        toast.success("Billetera Conectada", {
          description: `Cuenta: ${state.address?.slice(0, 6)}...${state.address?.slice(-4)}`
        });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      console.error("Connection failed:", error);
      if (!silent) {
        toast.error("Error al conectar", { description: message });
      }
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    pontusXService.disconnect();
    setWallet(INITIAL_STATE);
    toast.info("Desconectado", {
      description: "Has cerrado la sesión de tu wallet."
    });
  }, []);

  // Auto-connection and event listeners
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          // Check for existing permissions without showing popup
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          }) as string[];
          if (accounts.length > 0) {
            // Silently reconnect if permissions exist
            await connect(true);
          }
        } catch (err) {
          console.error("Error checking accounts:", err);
        }
      }
      setIsConnecting(false);
    };

    checkConnection();

    // Setup MetaMask event listeners
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accountList = accounts as string[];
        if (accountList.length > 0) {
          // Account changed, reconnect silently to update balances/DID
          connect(true);
        } else {
          // User disconnected from MetaMask
          setWallet(INITIAL_STATE);
          toast.info("Desconexión detectada en MetaMask");
        }
      };

      const handleChainChanged = () => {
        // Recommended practice: reload page on chain change to avoid state inconsistencies
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup listeners on unmount
      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [connect]);

  return { 
    wallet, 
    isConnecting, 
    hasWeb3, 
    connect: () => connect(false), 
    disconnect 
  };
};
