import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import itbidLogo from "@/assets/itbid-logo.png";

const PartnerItbidLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de login - se implementará autenticación real posteriormente
    setTimeout(() => {
      setIsLoading(false);
      toast.info("Acceso a proyectos ITBID en desarrollo", {
        description: "Esta funcionalidad estará disponible próximamente.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/partners")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Partners
        </Button>

        <Card className="shadow-xl border-primary/10">
          <CardHeader className="text-center space-y-6 pb-2">
            {/* Logos duales */}
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                  PROCUREDATA
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl text-muted-foreground font-light">×</span>
              </div>
              <div className="flex items-center">
                <img 
                  src={itbidLogo} 
                  alt="ITBID" 
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <Separator />

            <CardDescription className="text-base">
              Acceso a proyectos colaborativos
              <br />
              <span className="font-medium text-foreground">PROCUREDATA × ITBID</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base"
                disabled={isLoading}
              >
                {isLoading ? "Accediendo..." : "Acceder a ITBID"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes acceso?{" "}
                <a 
                  href="mailto:partners@procuredata.io" 
                  className="text-primary hover:underline"
                >
                  Contacta con tu administrador
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Acceso restringido a usuarios autorizados de ITBID
        </p>
      </div>
    </div>
  );
};

export default PartnerItbidLogin;
