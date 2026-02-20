import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ShieldCheck, Coins, ExternalLink, Loader2, Copy, AlertCircle, AlertTriangle } from "lucide-react";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { pontusXService, PONTUSX_NETWORK_CONFIG } from "@/services/pontusX";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const EXPLORER_URL = "https://explorer.pontus-x.eu/address/";
const EXPECTED_CHAIN_ID = PONTUSX_NETWORK_CONFIG.chainId; // '0x7ec9'

export const Web3StatusWidget = () => {
  const { wallet, hasWeb3, isConnecting, connect } = useWeb3Wallet();
  const [isSwitching, setIsSwitching] = useState(false);
  const [currentChainId, setCurrentChainId] = useState<string | null>(null);

  // Detect current chain
  useEffect(() => {
    const detectChain = async () => {
      if (window.ethereum && wallet.isConnected) {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string;
          setCurrentChainId(chainId);
        } catch { /* ignore */ }
      }
    };
    detectChain();
  }, [wallet.isConnected]);

  const isWrongNetwork = wallet.isConnected && currentChainId && currentChainId !== EXPECTED_CHAIN_ID;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("DID copiado al portapapeles");
  };

  const openExplorer = () => {
    if (wallet.address) {
      window.open(`${EXPLORER_URL}${wallet.address}`, "_blank");
    }
  };

  const handleSwitchNetwork = async () => {
    setIsSwitching(true);
    try {
      await pontusXService.switchNetwork();
      toast.success("Red cambiada a Pontus-X Testnet");
    } catch (error) {
      toast.error("No se pudo cambiar de red");
    } finally {
      setIsSwitching(false);
    }
  };

  const truncate = (str: string | null, start = 6, end = 4) => {
    if (!str) return "";
    return `${str.slice(0, start)}...${str.slice(-end)}`;
  };

  // Estado: Sin Web3 detectado
  if (!hasWeb3) {
    return (
      <Card className="border-dashed border-muted-foreground/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            Wallet Web3
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <p>No se detectó ninguna wallet. Instala MetaMask para usar funciones Web3.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => window.open("https://metamask.io", "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Instalar MetaMask
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Estado: No conectado
  if (!wallet.isConnected) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            Wallet Web3
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Conecta tu wallet para ver balances y realizar pagos con tokens EUROe.
          </p>
          <Button 
            className="w-full" 
            onClick={connect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Conectando...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Conectar Wallet
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Estado: Conectado
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            Wallet Web3
          </CardTitle>
          {wallet.did && (
            <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-600 border-green-500/20">
              <ShieldCheck className="h-3 w-3" />
              Verificado
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Wrong network warning */}
        {isWrongNetwork && (
          <Button
            variant="outline"
            size="sm"
            className="w-full border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20"
            onClick={handleSwitchNetwork}
            disabled={isSwitching}
          >
            {isSwitching ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <AlertTriangle className="mr-2 h-4 w-4" />
            )}
            Cambiar a Pontus-X Testnet
          </Button>
        )}

        {/* Balance EUROe */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Coins className="h-3 w-3" /> Balance EUROe
          </p>
          <p className="text-2xl font-bold text-primary">
            € {wallet.euroeBalance || "0.00"}
          </p>
        </div>

        {/* Balance EURAU (nativo) */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">EURAU (nativo)</span>
          <span className="font-medium">{wallet.balance || "0.0000"}</span>
        </div>

        {/* DID */}
        {wallet.did && (
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">DID</span>
              <button
                onClick={() => copyToClipboard(wallet.did!)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="font-mono">{truncate(wallet.did, 10, 6)}</span>
                <Copy className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Explorer Link */}
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={openExplorer}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Ver en Explorer
        </Button>
      </CardContent>
    </Card>
  );
};
