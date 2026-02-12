import { Users, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

export default function RequestInvite() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        <div className="flex justify-center mb-6">
          <ProcuredataLogo size="md" showNavigation={false} />
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-secondary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">
              {t('onboarding.requestInvite.title', 'Solicitar Invitación')}
            </CardTitle>
            <CardDescription className="text-lg">
              {t('onboarding.requestInvite.description', 'Busque su organización y solicite acceso al administrador.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-search">
                  {t('onboarding.requestInvite.searchLabel', 'Buscar organización')}
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="org-search"
                    placeholder={t('onboarding.requestInvite.searchPlaceholder', 'Nombre o NIF de la empresa...')}
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <p className="text-muted-foreground text-lg">
                  {t('onboarding.requestInvite.placeholder', 'La funcionalidad de búsqueda y solicitud estará disponible próximamente.')}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('onboarding.requestInvite.contact', 'Contacte directamente con el administrador de su organización para obtener una invitación.')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1 gap-2"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4" />
                {t('onboarding.back', 'Volver')}
              </Button>
              <Button 
                variant="brand" 
                className="flex-1"
                disabled
              >
                {t('onboarding.requestInvite.submit', 'Enviar Solicitud')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
