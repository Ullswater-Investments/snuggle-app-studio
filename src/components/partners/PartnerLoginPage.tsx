import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

interface PartnerLoginPageProps {
  partnerSlug: string;
}

interface PartnerInfo {
  partner_name: string;
  logo_url: string | null;
  username: string;
}

export const PartnerLoginPage = ({ partnerSlug }: PartnerLoginPageProps) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);
  const [loadingPartner, setLoadingPartner] = useState(true);

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('partner_access')
          .select('partner_name, logo_url, username')
          .eq('partner_slug', partnerSlug)
          .eq('is_active', true)
          .single();

        if (error || !data) {
          toast.error("Partner no encontrado");
          navigate("/partners");
          return;
        }

        setPartnerInfo(data);
      } catch (err) {
        console.error("Error fetching partner:", err);
        navigate("/partners");
      } finally {
        setLoadingPartner(false);
      }
    };

    fetchPartnerInfo();
  }, [partnerSlug, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await supabase.functions.invoke('validate-partner-login', {
        body: {
          partner_slug: partnerSlug,
          username: partnerInfo?.username || "",
          password
        }
      });

      if (response.error || !response.data?.success) {
        setError(response.data?.error || "Credenciales incorrectas");
        setPassword("");
        setIsLoading(false);
        return;
      }

      // Store session in localStorage
      const sessionData = {
        token: response.data.token,
        expires_at: response.data.expires_at,
        partner_slug: partnerSlug,
        partner_name: response.data.partner_name
      };
      localStorage.setItem(`partner_session_${partnerSlug}`, JSON.stringify(sessionData));

      toast.success("Acceso concedido", {
        description: `Bienvenido al área de ${response.data.partner_name}`,
      });

      navigate(response.data.redirect_path);
    } catch (err) {
      console.error("Login error:", err);
      setError("Error de conexión con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingPartner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 relative">
      {/* Fixed Language/Theme Toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <Card className="shadow-xl border-border/50">
          <CardHeader className="text-center space-y-4 pb-2">
            {partnerInfo?.logo_url ? (
              <img 
                src={partnerInfo.logo_url} 
                alt={partnerInfo.partner_name} 
                className="h-16 w-auto mx-auto object-contain"
              />
            ) : (
              <h1 className="text-3xl font-bold text-foreground">
                {partnerInfo?.partner_name}
              </h1>
            )}
            <p className="text-sm text-muted-foreground font-medium">
              Acceso restringido
            </p>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username field - Pre-filled and readonly */}
              <div className="space-y-1">
                <Label htmlFor="username" className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Usuario
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={partnerInfo?.username || ""}
                  readOnly
                  className="h-11 bg-muted text-muted-foreground cursor-not-allowed border-border/50"
                />
              </div>

              {/* Password field - Editable */}
              <div className="space-y-1">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                  className="h-11"
                  autoComplete="current-password"
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="text-destructive text-sm font-medium text-center bg-destructive/10 py-2 rounded-md">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 text-base bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Accediendo..." : "Acceder"}
              </Button>
            </form>

            {/* Back link */}
            <div className="mt-6 text-center">
              <button 
                onClick={() => navigate("/partners")}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Volver al directorio general
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerLoginPage;
