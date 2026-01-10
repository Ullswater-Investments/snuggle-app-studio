import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('common');
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
        toast.success(t('wallet.connected'), {
          description: t('wallet.connectedDesc', { 
            address: `${state.address?.slice(0, 6)}...${state.address?.slice(-4)}` 
          })
        });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t('wallet.unknownError');
      console.error("Connection failed:", error);
      if (!silent) {
        toast.error(t('wallet.connectionError'), { description: message });
      }
    } finally {
      setIsConnecting(false);
    }
  }, [t]);

  const disconnect = useCallback(() => {
    pontusXService.disconnect();
    setWallet(INITIAL_STATE);
    toast.info(t('wallet.disconnected'), {
      description: t('wallet.disconnectedDesc')
    });
  }, [t]);

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
          toast.info(t('wallet.metamaskDisconnected'));
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
  }, [connect, t]);

  return { 
    wallet, 
    isConnecting, 
    hasWeb3, 
    connect: () => connect(false), 
    disconnect 
  };
};
