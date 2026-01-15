import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PartnerLoginPageProps {
  partnerSlug: string;
}

interface PartnerInfo {
  partner_name: string;
  logo_url: string | null;
}

export const PartnerLoginPage = ({ partnerSlug }: PartnerLoginPageProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);
  const [loadingPartner, setLoadingPartner] = useState(true);

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('partner_access')
          .select('partner_name, logo_url')
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

    try {
      const response = await supabase.functions.invoke('validate-partner-login', {
        body: {
          partner_slug: partnerSlug,
          username,
          password
        }
      });

      if (response.error || !response.data?.success) {
        toast.error("Credenciales incorrectas", {
          description: response.data?.error || "Usuario o contraseña incorrectos",
        });
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
      toast.error("Error de conexión", {
        description: "No se pudo conectar con el servidor",
      });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-sm">
        <Card className="shadow-xl border-primary/10">
          <CardHeader className="text-center space-y-4 pb-2">
            {partnerInfo?.logo_url ? (
              <img 
                src={partnerInfo.logo_url} 
                alt={partnerInfo.partner_name} 
                className="h-12 w-auto mx-auto object-contain"
              />
            ) : (
              <h1 className="text-2xl font-bold text-foreground">
                {partnerInfo?.partner_name}
              </h1>
            )}
            <p className="text-sm text-muted-foreground">
              Acceso restringido
            </p>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Usuario
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Introduce tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-11"
                  autoComplete="username"
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
                  autoComplete="current-password"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base"
                disabled={isLoading}
              >
                {isLoading ? "Accediendo..." : "Acceder"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerLoginPage;
