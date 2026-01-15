import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const authSchema = z.object({
  email: z.string().trim().min(1, "El email es obligatorio").email("Introduce un email válido").max(255, "Email demasiado largo"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(72, "Contraseña demasiado larga")
});

type AuthFormData = z.infer<typeof authSchema>;

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSignIn = async (data: AuthFormData) => {
    setLoading(true);
    await signIn(data.email, data.password);
    setLoading(false);
  };

  const handleDemoAccess = async () => {
    setLoading(true);
    const demoEmail = "demo@procuredata.app";
    const demoPassword = "demo123456";
    const { error: loginError } = await signIn(demoEmail, demoPassword);
    if (loginError) {
      const { error: signupError } = await signUp(demoEmail, demoPassword);
      if (!signupError) {
        await signIn(demoEmail, demoPassword);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <span className="procuredata-gradient">PROCUREDATA</span>
          </CardTitle>
          <CardDescription>
            Sistema de Gobernanza de Datos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleSignIn)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2 border-amber-500 text-amber-700 hover:bg-amber-50"
                onClick={handleDemoAccess}
                disabled={loading}
              >
                🎭 Acceder a Versión Demo
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
