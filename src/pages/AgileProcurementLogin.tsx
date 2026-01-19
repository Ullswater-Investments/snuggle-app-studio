import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const VALID_USERNAME = "agileprocurement";
const VALID_PASSWORD = "agileprocurement1";

const AgileProcurementLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (password.toLowerCase() === VALID_PASSWORD) {
      // Store session
      const session = {
        authenticated: true,
        timestamp: Date.now(),
        expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
      localStorage.setItem("agile_procurement_session", JSON.stringify(session));
      
      toast.success("Acceso concedido");
      navigate("/agile-procurement");
    } else {
      setError("Contraseña incorrecta");
      toast.error("Contraseña incorrecta");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
            <Lock className="h-6 w-6 text-orange-600" />
          </div>
          <CardTitle className="text-xl">Agile Procurement Private Area</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Introduce la contraseña para acceder
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username field - read only */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Usuario
              </label>
              <Input
                type="text"
                value="AGILEPROCUREMENT"
                readOnly
                className="bg-muted cursor-not-allowed"
              />
            </div>

            {/* Password field with visibility toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce la contraseña"
                  className="pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading || !password}
            >
              {isLoading ? "Verificando..." : "Acceder"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgileProcurementLogin;
