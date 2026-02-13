import { useState } from "react";
import { ShieldAlert, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { pontusXService, PONTUSX_NETWORK_CONFIG } from "@/services/pontusX";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";

interface RevokeAccessButtonProps {
  resourceId?: string;
  transactionId?: string;
  resourceName?: string;
  actorOrgId?: string;
  onRevoked?: (txHash: string) => void | Promise<void>;
}

export const RevokeAccessButton = ({
  resourceId,
  transactionId,
  resourceName,
  actorOrgId,
  onRevoked,
}: RevokeAccessButtonProps) => {
  const [isRevoking, setIsRevoking] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { wallet, connect } = useWeb3Wallet();

  const handleRevoke = async () => {
    if (!wallet.isConnected) {
      toast.error("Conecta tu wallet para revocar el acceso");
      await connect();
      return;
    }

    if (!wallet.did) {
      toast.error("No se pudo obtener tu identidad descentralizada");
      return;
    }

    setIsRevoking(true);

    try {
      const effectiveId = resourceId || transactionId || "";
      const txHash = await pontusXService.revokeAccess(wallet.did, effectiveId);
      
      toast.success(
        <div className="space-y-2">
          <p className="font-semibold">Acceso Revocado Permanentemente</p>
          <p className="text-xs font-mono break-all">Tx: {txHash}</p>
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0 text-xs"
            onClick={() => window.open(`${PONTUSX_NETWORK_CONFIG.blockExplorerUrls[0]}tx/${txHash}`, "_blank")}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Ver en Explorer
          </Button>
        </div>,
        { duration: 8000 }
      );

      onRevoked?.(txHash);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error revoking access:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Error al revocar el acceso. Inténtalo de nuevo."
      );
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <ShieldAlert className="mr-2 h-4 w-4" />
          Revocar Acceso
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <ShieldAlert className="h-5 w-5" />
            Revocar Acceso a Datos
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              Estás a punto de revocar permanentemente el acceso a{" "}
              {resourceName ? (
                <span className="font-semibold">"{resourceName}"</span>
              ) : (
                "este recurso"
              )}
              .
            </p>
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <strong>⚠️ Acción Irreversible:</strong> Esta operación se
              registrará en la blockchain de Pontus-X y no podrá deshacerse.
              Todas las partes con acceso actual perderán inmediatamente sus
              permisos.
            </div>
            {!wallet.isConnected && (
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Nota:</strong> Necesitas conectar tu wallet Web3 para
                firmar esta transacción.
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRevoking}>
            Mantener Acceso
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleRevoke();
            }}
            disabled={isRevoking}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isRevoking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Revocando...
              </>
            ) : (
              <>
                <ShieldAlert className="mr-2 h-4 w-4" />
                Revocar Permanentemente
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};