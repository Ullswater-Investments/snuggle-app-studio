import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Loader2, 
  Copy, 
  ExternalLink, 
  LogOut, 
  CreditCard, 
  ChevronDown,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { PONTUSX_NETWORK_CONFIG, pontusXService } from '@/services/pontusX';
import { useWeb3Wallet } from '@/hooks/useWeb3Wallet';
import { GaiaXBadge } from './GaiaXBadge';
import { toast } from 'sonner';

// Función para cambiar de red
const switchNetwork = async () => {
  try {
    const chainIdHex = `0x${Number(PONTUSX_NETWORK_CONFIG.chainId).toString(16)}`;
    
    await window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }]
    });
    
    toast.success('Red cambiada', { description: 'Ahora estás en PONTUS-X' });
  } catch (error: any) {
    // Si la red no está añadida, intentar añadirla
    if (error.code === 4902) {
      try {
        await window.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${Number(PONTUSX_NETWORK_CONFIG.chainId).toString(16)}`,
            chainName: PONTUSX_NETWORK_CONFIG.chainName,
            nativeCurrency: PONTUSX_NETWORK_CONFIG.nativeCurrency,
            rpcUrls: PONTUSX_NETWORK_CONFIG.rpcUrls,
            blockExplorerUrls: PONTUSX_NETWORK_CONFIG.blockExplorerUrls
          }]
        });
        toast.success('Red añadida', { description: 'PONTUS-X configurada correctamente' });
      } catch (addError) {
        toast.error('Error al añadir red');
      }
    } else {
      toast.error('Error al cambiar de red');
    }
  }
};

export const WalletButton = () => {
  const { wallet, isConnecting, hasWeb3, connect, disconnect } = useWeb3Wallet();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado", {
      description: `${label} copiado al portapapeles.`
    });
  };

  const truncate = (str: string | null) => {
    if (!str) return '';
    return `${str.slice(0, 6)}...${str.slice(-4)}`;
  };

  const openExplorer = () => {
    if (wallet.address && PONTUSX_NETWORK_CONFIG.blockExplorerUrls?.[0]) {
      window.open(`${PONTUSX_NETWORK_CONFIG.blockExplorerUrls[0]}address/${wallet.address}`, '_blank');
    }
  };

  // Verificar si está en la red correcta
  const expectedChainId = `0x${Number(PONTUSX_NETWORK_CONFIG.chainId).toString(16)}`;
  const isWrongNetwork = wallet.isConnected && wallet.chainId !== expectedChainId;

  // No Web3 available - show disabled state
  if (!hasWeb3) {
    return (
      <Button variant="outline" size="sm" disabled className="gap-2">
        <Wallet className="h-4 w-4" />
        No Wallet Detected
      </Button>
    );
  }

  // Not connected - show connect button
  if (!wallet.isConnected) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={connect}
        disabled={isConnecting}
        className="gap-2"
      >
        {isConnecting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>
    );
  }

  // Connected - show profile dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`gap-2 ${isWrongNetwork ? 'border-destructive' : ''}`}>
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${isWrongNetwork ? 'bg-red-400' : 'bg-green-400'} opacity-75`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${isWrongNetwork ? 'bg-red-500' : 'bg-green-500'}`} />
          </span>
          {truncate(wallet.address)}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72 bg-popover border-border">
        {/* Warning si red incorrecta */}
        {isWrongNetwork && (
          <>
            <div className="p-3 bg-destructive/10 border-b border-destructive/20">
              <div className="flex items-center gap-2 text-destructive mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Red Incorrecta</span>
              </div>
              <Button 
                size="sm" 
                variant="destructive" 
                className="w-full gap-2"
                onClick={switchNetwork}
              >
                <RefreshCw className="h-3 w-3" />
                Cambiar a PONTUS-X
              </Button>
            </div>
          </>
        )}
        
        {/* Header */}
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="text-sm">Pontus-X Identity</span>
          <GaiaXBadge isVerified={!isWrongNetwork} showTooltip={false} />
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {/* Balances */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex justify-between cursor-default">
            <span className="flex items-center gap-2 text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              Balance EUROe
            </span>
            <span className="font-mono font-medium">
              € {parseFloat(wallet.euroeBalance || "0").toFixed(2)}
            </span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex justify-between cursor-default">
            <span className="text-muted-foreground">Native Gas (GX)</span>
            <span className="font-mono text-sm">
              {parseFloat(wallet.balance || "0").toFixed(4)}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* DID Section */}
        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <p className="text-xs text-muted-foreground mb-1">DID (Decentralized ID)</p>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
              {wallet.did}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              onClick={() => copyToClipboard(wallet.did || "", "DID")}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <DropdownMenuSeparator />
        
        {/* Actions */}
        <DropdownMenuItem onClick={openExplorer} className="cursor-pointer">
          <ExternalLink className="h-4 w-4 mr-2" />
          Ver en Explorer
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={disconnect}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Desconectar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
