import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface FeaturePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const MESSAGE =
  "Estamos trabajando en traer este servicio a nuestro ecosistema en las próximas etapas.";
const CONTACT_EMAIL = "comercial@procuredata.org";

export function FeaturePlaceholder({
  title,
  description,
  icon: Icon,
}: FeaturePlaceholderProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Icon className="h-16 w-16 text-muted-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground text-center">
            {MESSAGE}
          </p>

          <Alert className="border-primary/30 bg-primary/5">
            <AlertDescription>
              Para más información, comunícate al correo{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-primary hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </AlertDescription>
          </Alert>

          <div className="flex justify-center pt-2">
            <Button asChild variant="default">
              <Link to="/dashboard">Volver al Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
