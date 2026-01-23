import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Wheat, Shield } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PartnerInfo {
  partner_name: string;
  logo_url: string | null;
  username: string;
}

export const CdiAgroLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);
  const [loadingPartner, setLoadingPartner] = useState(true);

  const partnerSlug = "cdi-agro";

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
  }, [navigate]);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-950 to-green-900">
        <div className="animate-pulse text-green-200">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-950 to-green-900 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-2xl border-green-500/20 bg-green-900/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4 pb-2">
            {/* CDI Agro Logo/Badge */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-600 to-lime-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Wheat className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-white">CDI Agro</h1>
              <p className="text-sm text-green-200 font-medium">Cluster de Innovación Agroalimentaria</p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-green-300/70">
              <Shield className="h-3 w-3" />
              <span>Área de Miembros · Acceso Restringido</span>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username field - Pre-filled and readonly */}
              <div className="space-y-1">
                <Label htmlFor="username" className="flex items-center gap-2 text-sm font-semibold text-green-200">
                  <User className="h-4 w-4 text-green-400" />
                  Usuario
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={partnerInfo?.username || ""}
                  readOnly
                  className="h-11 bg-green-800/50 text-green-300/70 cursor-not-allowed border-green-700"
                />
              </div>

              {/* Password field - Editable */}
              <div className="space-y-1">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-green-200">
                  <Lock className="h-4 w-4 text-green-400" />
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
                  className="h-11 bg-green-800/50 border-green-700 text-white placeholder:text-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                  autoComplete="current-password"
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="text-red-400 text-sm font-medium text-center bg-red-500/10 py-2 rounded-md border border-red-500/20">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 text-base bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600 text-white shadow-lg shadow-green-500/30"
                disabled={isLoading}
              >
                {isLoading ? "Accediendo..." : "Acceder al Portal"}
              </Button>
            </form>

            {/* Back links */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <button 
                onClick={() => navigate("/partners/cdi-agro/proyecto")}
                className="text-xs text-green-300 hover:text-green-200 transition-colors underline"
              >
                Ver página pública del proyecto
              </button>
              <button 
                onClick={() => navigate("/partners")}
                className="text-xs text-green-400/50 hover:text-green-300/70 transition-colors"
              >
                Volver al directorio de partners
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer badge */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-800/50 rounded-full text-xs text-green-300/70 border border-green-700/50">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Nodo PROCUREDATA · Gaia-X Ready
          </span>
        </div>
      </div>
    </div>
  );
};

export default CdiAgroLogin;
