import { Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WalletTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="size-5 text-primary" />
          <CardTitle>Wallet</CardTitle>
        </div>
        <CardDescription>
          Gestiona tu wallet y configuración Web3
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Próximamente</p>
      </CardContent>
    </Card>
  );
}
