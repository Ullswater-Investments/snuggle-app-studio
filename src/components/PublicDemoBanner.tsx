import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, UserPlus } from "lucide-react";

export const PublicDemoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-primary/20">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-foreground">
            <strong className="text-primary">Modo Demostración</strong>
            <span className="hidden sm:inline"> — Explora libremente. Regístrate para acceder a todas las funcionalidades.</span>
          </span>
        </div>
        <Link to="/auth">
          <Button size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Crear Cuenta Gratuita
          </Button>
        </Link>
      </div>
    </div>
  );
};
