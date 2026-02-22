import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Shield } from "lucide-react";

interface ConfirmRequestModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  asset: any;
  isPending: boolean;
}

export const ConfirmRequestModal = ({ open, onClose, onConfirm, asset, isPending }: ConfirmRequestModalProps) => {
  const isFree = !asset?.price || asset.price === 0;
  const productName = asset?.product?.name || "Dataset";
  const providerName = asset?.subject_org?.name || asset?.org?.name || "Proveedor";

  const formattedPrice = isFree
    ? null
    : new Intl.NumberFormat("es-ES", { style: "currency", currency: asset?.currency || "EUR" }).format(asset.price);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-8">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isFree ? "Confirmar Solicitud de Acceso Gratuito" : "Confirmar Solicitud de Acceso de Pago"}
          </DialogTitle>
        </DialogHeader>

        {/* Order Summary */}
        <div className="rounded-lg border bg-muted/40 p-5 space-y-4">
          <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-sm">
            <span className="text-muted-foreground">Producto</span>
            <span className="font-medium text-right">{productName}</span>
            <span className="text-muted-foreground">Proveedor</span>
            <span className="font-medium text-right">{providerName}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-base">Total</span>
            {isFree ? (
              <span className="font-bold text-lg text-green-600 dark:text-green-400">Gratuito</span>
            ) : (
              <span className="font-bold text-lg">{formattedPrice}</span>
            )}
          </div>
        </div>

        {/* Green block */}
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
          <CheckCircle className="h-5 w-5 mt-0.5 shrink-0 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-800 dark:text-green-300">
            Acceso gobernado bajo Políticas de Uso
          </p>
        </div>

        {/* Blue/info block */}
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <Shield className="h-5 w-5 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Este activo es {isFree ? "gratuito" : "de pago"}. Tu solicitud será enviada al proveedor para su aprobación antes de conceder el acceso.
          </p>
        </div>

        {/* Action button */}
        <Button
          className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-2"
          onClick={onConfirm}
          disabled={isPending}
        >
          {isPending ? "Enviando..." : "Confirmar Solicitud"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
