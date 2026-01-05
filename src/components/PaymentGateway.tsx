import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Wallet, Landmark, CheckCircle2, Lock, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { pontusXService, PONTUSX_NETWORK_CONFIG } from "@/services/pontusX";
import { toast } from "sonner";

interface PaymentGatewayProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  asset: any;
}

export function PaymentGateway({ open, onClose, onConfirm, asset }: PaymentGatewayProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  
  const { walletAddress, isWeb3Connected, connectWallet } = useAuth();

  const price = asset?.price || 0;
  const tax = price * 0.21;
  const total = price + tax;

  // Format wallet balance for display
  const formatBalance = (balance: string | null) => {
    if (!balance) return "0.00";
    const num = parseFloat(balance);
    return num.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      if (paymentMethod === "wallet") {
        // Web3 payment via Pontus-X
        if (!isWeb3Connected) {
          toast.error("Conecta tu wallet para continuar");
          setIsProcessing(false);
          return;
        }

        // Simulate blockchain transaction (in production, call actual transfer)
        const hash = await pontusXService.revokeAccess(
          walletAddress || "",
          asset?.id || "payment"
        );
        
        setTxHash(hash);
        toast.success("Transacción enviada a la blockchain", {
          description: `Hash: ${hash.slice(0, 10)}...${hash.slice(-6)}`,
        });
      } else {
        // Traditional payment simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Wait to show success and execute real action
      await new Promise(resolve => setTimeout(resolve, 1500));
      onConfirm();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Error procesando el pago");
      setIsProcessing(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      toast.error("Error conectando wallet");
    }
  };

  const openExplorer = (hash: string) => {
    window.open(`${PONTUSX_NETWORK_CONFIG.blockExplorerUrls[0]}tx/${hash}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Confirmar Pago y Licencia
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 space-y-4"
          >
            <CheckCircle2 className="h-16 w-16 text-green-600 animate-bounce" />
            <h3 className="text-2xl font-bold">¡Pago Completado!</h3>
            {txHash && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => openExplorer(txHash)}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Ver en Blockchain Explorer
              </Button>
            )}
            <p className="text-muted-foreground">Redirigiendo...</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Left Side: Summary */}
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold">Resumen del Pedido</h3>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Producto</span>
                    <span className="font-medium truncate max-w-[180px]">{asset?.name || "Dataset"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proveedor</span>
                    <span className="font-medium truncate max-w-[180px]">{asset?.provider_name || "N/A"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{price.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>IVA (21%)</span>
                    <span>{tax.toFixed(2)} €</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 dark:bg-green-950/30 dark:text-green-400 p-3 rounded border border-green-100 dark:border-green-900">
                <CheckCircle2 className="h-4 w-4" /> 
                Garantía de Calidad de Datos ODRL 2.0
              </div>
            </div>

            {/* Right Side: Payment Methods */}
            <div>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="card">
                    <CreditCard className="h-4 w-4 mr-1" />
                    Tarjeta
                  </TabsTrigger>
                  <TabsTrigger value="wallet">
                    <Wallet className="h-4 w-4 mr-1" />
                    Wallet
                  </TabsTrigger>
                  <TabsTrigger value="transfer">
                    <Landmark className="h-4 w-4 mr-1" />
                    Transfer
                  </TabsTrigger>
                </TabsList>

                {/* Card Tab */}
                <TabsContent value="card" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Número de Tarjeta</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiración</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <CreditCard className="h-6 w-6 text-orange-600" />
                  </div>
                </TabsContent>

                {/* Wallet Tab - Connected to Web3 */}
                <TabsContent value="wallet" className="space-y-4 mt-4">
                  {isWeb3Connected ? (
                    <>
                      <div className="bg-primary/10 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">Wallet conectada</p>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="font-mono text-xs truncate">{walletAddress}</p>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Saldo EUROe</span>
                          <span className="text-xl font-bold">Disponible</span>
                        </div>
                      </div>
                      <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900">
                        <Wallet className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-700 dark:text-blue-300 text-xs">
                          El pago se realizará mediante Smart Contract en la red Pontus-X. 
                          Recibirás la confirmación en tu wallet.
                        </AlertDescription>
                      </Alert>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-700 dark:text-amber-300">
                          Conecta tu wallet Web3 para pagar con EUROe en la blockchain Pontus-X.
                        </AlertDescription>
                      </Alert>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={handleConnectWallet}
                      >
                        <Wallet className="mr-2 h-4 w-4" />
                        Conectar Wallet
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* Bank Transfer Tab */}
                <TabsContent value="transfer" className="space-y-4 mt-4">
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
                    <p><strong>Beneficiario:</strong> PROCUREDATA S.L.</p>
                    <p><strong>IBAN:</strong> ES91 2100 0418 4502 0005 1332</p>
                    <p><strong>BIC:</strong> CAIXESBBXXX</p>
                    <p><strong>Concepto:</strong> REF-{asset?.id?.substring(0, 8)}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tras realizar la transferencia, el acceso se activará en 24-48h.
                  </p>
                </TabsContent>
              </Tabs>

              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing || (paymentMethod === "wallet" && !isWeb3Connected)}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {paymentMethod === "wallet" ? "Confirmando en blockchain..." : "Procesando pago seguro..."}
                  </>
                ) : (
                  `Pagar ${total.toFixed(2)} €`
                )}
              </Button>
              
              {paymentMethod === "wallet" && !isWeb3Connected && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Conecta tu wallet para habilitar el pago
                </p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
