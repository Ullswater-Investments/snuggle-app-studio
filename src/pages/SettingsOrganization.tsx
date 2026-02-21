import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamManagement } from "@/components/TeamManagement";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Upload, Globe, Linkedin, Building2, CheckCircle2, AlertCircle } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { AssuranceLevelBadge } from "@/components/AssuranceLevelBadge";
import { VerifiableCredentialsPanel } from "@/components/VerifiableCredentialsPanel";
import { EmptyState } from "@/components/EmptyState";

export default function SettingsOrganization() {
  const { activeOrg } = useOrganizationContext();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (activeOrg) reset(activeOrg);
  }, [activeOrg, reset]);

  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("organizations")
      .update({
        name: data.name,
        website: data.website,
        linkedin_url: data.linkedin_url,
        marketplace_description: data.marketplace_description
      })
      .eq("id", activeOrg?.id);

    if (error) toast.error("Error al guardar cambios");
    else toast.success("Perfil actualizado correctamente");
  };

  // Calculate profile completeness
  const profileCompleteness = useMemo(() => {
    if (!activeOrg) return 0;
    const fields = [
      activeOrg.name,
      activeOrg.sector,
      activeOrg.website,
      activeOrg.logo_url,
      activeOrg.marketplace_description,
      activeOrg.linkedin_url
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  }, [activeOrg]);

  if (!activeOrg) {
    return (
      <div className="container py-8 fade-in">
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img 
              src="/src/assets/procuredata-hero-logo.png" 
              alt="ProcureData" 
              className="h-24 w-auto mb-6 opacity-80"
              onError={(e) => {
                // Fallback to icon if image not found
                e.currentTarget.style.display = 'none';
              }}
            />
            <h3 className="text-xl font-semibold mb-2">Sin organización asociada</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              No tienes ninguna organización registrada o asociada a tu cuenta.
            </p>
            <Button 
              size="lg"
              onClick={() => window.location.href = "/dashboard"} 
              className="gap-2 text-base px-8 py-3"
            >
              <Building2 className="h-5 w-5" />
              Registrar u Unirse a Organización
            </Button>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="container py-8 fade-in">
      <FadeIn>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                Configuración de Organización
              </h2>
              <p className="text-muted-foreground mt-2">Gestiona el perfil público y los miembros de tu organización.</p>
            </div>
            
            {/* Profile Completeness Indicator */}
            <Card className="w-full md:w-72 border-dashed">
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Perfil Completado</span>
                  <Badge 
                    variant={profileCompleteness >= 80 ? "default" : "secondary"}
                    className={profileCompleteness >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                  >
                    {profileCompleteness >= 80 ? (
                      <><CheckCircle2 className="h-3 w-3 mr-1" /> Óptimo</>
                    ) : (
                      <><AlertCircle className="h-3 w-3 mr-1" /> Incompleto</>
                    )}
                  </Badge>
                </div>
                <Progress value={profileCompleteness} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {profileCompleteness}% - {profileCompleteness < 100 ? "Completa tu perfil para mejor visibilidad" : "¡Perfil completo!"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </FadeIn>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil Público</TabsTrigger>
          <TabsTrigger value="team">Equipo</TabsTrigger>
          <TabsTrigger value="credentials">Credenciales</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Columna Izquierda: Visual */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Logo & Marca</CardTitle>
                  <CardDescription>Imagen corporativa visible en el marketplace</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="relative group cursor-pointer">
                    <Avatar className="h-32 w-32 border-4 border-muted shadow-lg">
                      <AvatarImage src={activeOrg.logo_url || ""} />
                      <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        {activeOrg.name.substring(0,2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="text-white h-8 w-8" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Click para subir logo (400x400)</p>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Upload className="h-4 w-4" /> Cambiar Imagen
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Columna Derecha: Formulario */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Información Pública</CardTitle>
                <CardDescription>Estos datos serán visibles en el Marketplace para tus clientes potenciales.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Nombre Comercial</Label>
                    <Input {...register("name")} placeholder="Nombre de tu organización" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Sitio Web</Label>
                      <div className="relative">
                        <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="https://..." {...register("website")} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>LinkedIn</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="linkedin.com/company/..." {...register("linkedin_url")} />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Descripción ("About Us")</Label>
                    <Textarea 
                      className="min-h-[120px]" 
                      placeholder="Describe tu empresa, el sector en el que operas y el valor de tus datos..." 
                      {...register("marketplace_description")} 
                    />
                    <p className="text-xs text-muted-foreground">Esta descripción aparecerá en tu perfil del marketplace.</p>
                  </div>

                  <div className="flex justify-end pt-4 border-t">
                    <Button type="submit" className="gap-2 bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4" /> Guardar Cambios
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Equipo</CardTitle>
              <CardDescription>Invita colaboradores y gestiona sus permisos de acceso.</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credentials" className="space-y-6">
          {/* Assurance Level */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                Nivel de Aseguramiento (LoA)
                <AssuranceLevelBadge level={(activeOrg.assurance_level as 'low' | 'substantial' | 'high') || 'low'} />
              </CardTitle>
              <CardDescription>
                Nivel de confianza eIDAS basado en las verificaciones completadas por tu organización.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Verifiable Credentials */}
          <VerifiableCredentialsPanel organizationId={activeOrg.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
