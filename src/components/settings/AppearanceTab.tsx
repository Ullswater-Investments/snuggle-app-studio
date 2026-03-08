import { Palette } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AppearanceTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Palette className="size-5 text-primary" />
          <CardTitle>Apariencia</CardTitle>
        </div>
        <CardDescription>
          Personaliza el tema y la interfaz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Próximamente</p>
      </CardContent>
    </Card>
  );
}
