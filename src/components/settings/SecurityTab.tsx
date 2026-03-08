import { Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SecurityTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lock className="size-5 text-primary" />
          <CardTitle>Seguridad</CardTitle>
        </div>
        <CardDescription>
          Contraseña, sesiones activas y autenticación
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Próximamente</p>
      </CardContent>
    </Card>
  );
}
