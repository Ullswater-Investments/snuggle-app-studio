import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaymentGateway } from "@/components/PaymentGateway";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  RefreshCcw, Clock, AlertTriangle, CheckCircle2, Calendar, 
  Sparkles, ArrowRight, Percent
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LicenseRenewalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: {
    id: string;
    asset_id: string;
    created_at: string;
    access_duration_days: number;
    asset: {
      product: { name: string; category: string };
      price?: number;
    };
    subject_org: { name: string };
  };
  onRenewalComplete: () => void;
}

const RENEWAL_OPTIONS = [
  { days: 30, label: "1 mes", discount: 0, multiplier: 0.33, popular: false },
  { days: 90, label: "3 meses", discount: 12, multiplier: 0.88, popular: true },
  { days: 180, label: "6 meses", discount: 20, multiplier: 1.6, popular: false },
  { days: 365, label: "1 año", discount: 28, multiplier: 2.88, popular: false },
];

const calculateRenewalPrice = (basePrice: number, multiplier: number): number => {
  return Math.round(basePrice * multiplier);
};

const getExpirationInfo = (createdAt: string, accessDays: number) => {
  const created = new Date(createdAt);
  const expiresAt = new Date(created);
  expiresAt.setDate(expiresAt.getDate() + accessDays);
  
  const now = new Date();
  const daysExpired = Math.ceil((now.getTime() - expiresAt.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    expiresAt,
    daysExpired: Math.max(0, daysExpired),
    isExpired: daysExpired > 0
  };
};

export function LicenseRenewalDialog({ 
  open, 
  onOpenChange, 
  transaction, 
  onRenewalComplete 
}: LicenseRenewalDialogProps) {
  const [selectedOption, setSelectedOption] = useState(RENEWAL_OPTIONS[1]); // Default to 90 days
  const [showPayment, setShowPayment] = useState(false);
  
  const basePrice = transaction.asset.price || 299; // Default price if not available
  const renewalPrice = calculateRenewalPrice(basePrice, selectedOption.multiplier);
  const expirationInfo = getExpirationInfo(transaction.created_at, transaction.access_duration_days);
  
  // Calculate new expiration date
  const newExpirationDate = new Date();
  newExpirationDate.setDate(newExpirationDate.getDate() + selectedOption.days);

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  const handleRenewalConfirm = async () => {
    try {
      const { error } = await supabase
        .from("data_transactions")
        .update({
          access_duration_days: transaction.access_duration_days + selectedOption.days,
          subscription_expires_at: newExpirationDate.toISOString(),
          payment_status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("id", transaction.id);

      if (error) {
        console.error("Renewal error:", error);
        toast.error("Error al procesar la renovación");
        return;
      }

      toast.success("¡Licencia renovada exitosamente!", {
        description: `Nuevo vencimiento: ${newExpirationDate.toLocaleDateString("es-ES", { 
          day: "numeric", 
          month: "long", 
          year: "numeric" 
        })}`,
      });

      setShowPayment(false);
      onRenewalComplete();
    } catch (error) {
      console.error("Renewal error:", error);
      toast.error("Error inesperado al renovar la licencia");
    }
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <PaymentGateway
        open={showPayment}
        onClose={handlePaymentClose}
        onConfirm={handleRenewalConfirm}
        asset={{
          id: transaction.asset_id,
          name: `Renovación: ${transaction.asset.product.name}`,
          provider_name: transaction.subject_org.name,
          price: renewalPrice,
        }}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCcw className="h-5 w-5 text-primary" />
            Renovar Licencia de Acceso
          </DialogTitle>
          <DialogDescription>
            Extiende tu acceso a este dataset y continúa integrándolo en tus aplicaciones.
          </DialogDescription>
        </DialogHeader>

        {/* Dataset Info Card */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={`https://logo.clearbit.com/${transaction.subject_org.name.toLowerCase().replace(/\s+/g, '')}.com`} 
                alt={transaction.subject_org.name}
              />
              <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs font-semibold">
                {transaction.subject_org.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate">{transaction.asset.product.name}</h4>
              <p className="text-sm text-muted-foreground">{transaction.subject_org.name}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-2">
            {expirationInfo.isExpired ? (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                Expirado hace {expirationInfo.daysExpired} días
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                <Clock className="h-3 w-3" />
                Próximo a expirar
              </Badge>
            )}
          </div>
        </div>

        {/* Renewal Options */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Selecciona la duración de la renovación:</label>
          <div className="grid grid-cols-2 gap-3">
            {RENEWAL_OPTIONS.map((option) => {
              const price = calculateRenewalPrice(basePrice, option.multiplier);
              const isSelected = selectedOption.days === option.days;
              
              return (
                <button
                  key={option.days}
                  type="button"
                  onClick={() => setSelectedOption(option)}
                  className={cn(
                    "relative p-4 rounded-lg border-2 text-left transition-all hover:border-primary/50",
                    isSelected 
                      ? "border-primary bg-primary/5 dark:bg-primary/10" 
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  {option.popular && (
                    <Badge 
                      className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] px-2"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{option.label}</span>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="text-2xl font-bold">{price}€</div>
                  {option.discount > 0 && (
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-1">
                      <Percent className="h-3 w-3" />
                      Ahorra {option.discount}%
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* New Expiration Info */}
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800">
          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            <span className="font-medium">Tu acceso se extenderá desde hoy.</span>
            <br />
            <span className="text-sm">
              Nueva fecha de expiración: <strong>{newExpirationDate.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long", 
                year: "numeric"
              })}</strong>
            </span>
          </AlertDescription>
        </Alert>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleProceedToPayment}
            className="flex-1 gap-2"
          >
            Proceder al Pago
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
