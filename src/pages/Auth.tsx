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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Login schema
const loginSchema = z.object({
  email: z.string().trim().min(1, "El email es obligatorio").email("Introduce un email válido").max(255, "Email demasiado largo"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(72, "Contraseña demasiado larga")
});

// Registration schema
const registerSchema = z.object({
  firstName: z.string().trim().min(1, "El nombre es obligatorio").max(100, "Nombre demasiado largo"),
  lastName: z.string().trim().min(1, "El apellido es obligatorio").max(100, "Apellido demasiado largo"),
  email: z.string().trim().min(1, "El email es obligatorio").email("Introduce un email válido").max(255, "Email demasiado largo"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(72, "Contraseña demasiado larga"),
  confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  documentType: z.enum(["NIF", "Pasaporte"], { required_error: "Selecciona el tipo de documento" }),
  documentNumber: z.string().trim().min(1, "El número de documento es obligatorio").max(50, "Número demasiado largo"),
  country: z.string().min(1, "Selecciona un país"),
  city: z.string().trim().min(1, "La ciudad es obligatoria").max(100, "Ciudad demasiado larga"),
  address: z.string().trim().min(1, "La dirección es obligatoria").max(255, "Dirección demasiado larga"),
  postalCode: z.string().trim().min(1, "El código postal es obligatorio").max(20, "Código postal demasiado largo"),
  phone: z.string().trim().min(1, "El teléfono es obligatorio").max(20, "Teléfono demasiado largo"),
  birthDate: z.date({ required_error: "La fecha de nacimiento es obligatoria" })
    .refine((date) => {
      const today = new Date();
      const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      return date <= eighteenYearsAgo;
    }, { message: "Debes ser mayor de 18 años para registrarte en la plataforma" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const countries = [
  "España", "Alemania", "Francia", "Italia", "Portugal", "Reino Unido", 
  "Estados Unidos", "México", "Argentina", "Brasil", "Colombia", "Chile",
  "Perú", "Ecuador", "Venezuela", "Uruguay", "Paraguay", "Bolivia",
  "Costa Rica", "Panamá", "República Dominicana", "Cuba", "Honduras",
  "El Salvador", "Guatemala", "Nicaragua", "Canadá", "Suiza", "Austria",
  "Bélgica", "Países Bajos", "Suecia", "Noruega", "Dinamarca", "Finlandia",
  "Polonia", "Grecia", "Irlanda", "Australia", "Nueva Zelanda", "Japón",
  "China", "Corea del Sur", "India", "Singapur", "Emiratos Árabes Unidos"
].sort();

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      documentType: undefined,
      documentNumber: "",
      country: "",
      city: "",
      address: "",
      postalCode: "",
      phone: "",
      birthDate: undefined
    }
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSignIn = async (data: LoginFormData) => {
    setLoading(true);
    await signIn(data.email, data.password);
    setLoading(false);
  };

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    
    // Debug: Verificar que los datos del formulario llegan correctamente
    console.log("PROCUREDATA - Registrando con metadatos:", {
      nombre: data.firstName,
      apellido: data.lastName,
      email: data.email
    });
    
    try {
      const { error } = await signUp(data.email, data.password, {
        // Campos principales para el saludo
        nombre: data.firstName,
        apellido: data.lastName,
        full_name: `${data.firstName} ${data.lastName}`.trim(),
        // Campos adicionales de identidad
        document_type: data.documentType,
        document_number: data.documentNumber,
        // Datos de ubicación
        country: data.country,
        city: data.city,
        address: data.address,
        postal_code: data.postalCode,
        // Contacto
        phone: data.phone,
        birth_date: data.birthDate?.toISOString(),
      });
      
      if (!error) {
        toast.success("Registro exitoso. Por favor, verifica tu email para activar tu cuenta.");
        setActiveTab("login");
        registerForm.reset();
      }
    } catch (err) {
      console.error("Error en registro:", err);
      toast.error("Error al registrar. Inténtalo de nuevo.");
    }
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

  const handleForgotPassword = () => {
    toast.info("Funcionalidad de recuperación de contraseña próximamente.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4 relative overflow-hidden">
      {/* Decorative geometric elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rotate-45 transform" />
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-primary/20 rotate-12 transform" />
      
      {/* Fixed Language/Theme Toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-lg relative z-10 shadow-xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold">
            <span className="procuredata-gradient">PROCUREDATA</span>
          </CardTitle>
          <CardDescription className="text-base">
            Sistema de Gobernanza de Datos
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Registrarse
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleSignIn)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    className="text-sm text-primary hover:underline block text-right w-full"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Juan" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <Input placeholder="García" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email */}
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                {...field} 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                {...field} 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Document Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="documentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de documento</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="NIF">NIF</SelectItem>
                              <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="documentNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nº de documento</FormLabel>
                          <FormControl>
                            <Input placeholder="12345678A" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Country and City */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>País</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-60">
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ciudad</FormLabel>
                          <FormControl>
                            <Input placeholder="Madrid" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Address */}
                  <FormField
                    control={registerForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input placeholder="Calle Principal 123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Postal Code, Phone, Birth Date */}
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código postal</FormLabel>
                          <FormControl>
                            <Input placeholder="28001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+34 600..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nacimiento</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd/MM/yyyy", { locale: es })
                                  ) : (
                                    <span>Fecha</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => {
                                  const today = new Date();
                                  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
                                  return date > maxDate || date < new Date("1900-01-01");
                                }}
                                initialFocus
                                captionLayout="dropdown-buttons"
                                fromYear={1900}
                                toYear={new Date().getFullYear() - 18}
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading ? "Registrando..." : "Crear cuenta"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          {/* Demo Access Button */}
          <div className="mt-6 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              className="w-full border-amber-500 text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20"
              onClick={handleDemoAccess}
              disabled={loading}
            >
              🎭 Acceder a Versión Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
