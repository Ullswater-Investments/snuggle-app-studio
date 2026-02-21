import { Building2, Users, ArrowRight, Plus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import procuredataHeroLogo from "@/assets/procuredata-hero-logo.png";

export const WelcomeScreen = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('common');

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative geometric elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full animate-pulse" />
                <div className="absolute top-40 right-20 w-24 h-24 border border-primary/5 rotate-45" />
                <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-primary/5 rounded-lg rotate-12" />
                <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-primary/10 rounded-full" />
                <div className="absolute top-1/3 left-1/2 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-6">
                        <img src={procuredataHeroLogo} alt="PROCUREDATA" className="h-20 md:h-28 object-contain" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        {t('welcome.titlePrefix', 'Bienvenido a ')}<span className="procuredata-gradient font-bold tracking-tight">PROCUREDATA</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('welcome.subtitle', 'Para comenzar a operar, necesitas asociar tu cuenta a una entidad legal.')}
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    {/* Card A: Register New Organization */}
                    <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl cursor-pointer bg-card/80 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardHeader className="relative z-10 pb-2">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <Building2 className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-bold">
                                {t('welcome.registerOrg.title', 'Registrar Nueva Organización')}
                            </CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                                {t('welcome.registerOrg.description', 'Soy el representante legal o administrador. Quiero dar de alta mi empresa y verificarla en la red.')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10 pt-4">
                            <Button
                                variant="brand"
                                className="w-full gap-2 text-base py-6 group-hover:shadow-lg transition-all"
                                onClick={() => navigate('/onboarding/create-organization')}
                            >
                                <Plus className="h-5 w-5" />
                                {t('welcome.registerOrg.button', 'Comenzar Registro')}
                                <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Card B: Request to Join Existing */}
                    <Card className="group relative overflow-hidden border-2 border-transparent hover:border-secondary/30 transition-all duration-300 hover:shadow-xl cursor-pointer bg-card/80 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardHeader className="relative z-10 pb-2">
                            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                                <Users className="h-8 w-8 text-secondary-foreground" />
                            </div>
                            <CardTitle className="text-2xl font-bold">
                                {t('welcome.joinOrg.title', 'Solicitar Unirse a una Existente')}
                            </CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                                {t('welcome.joinOrg.description', 'Mi empresa ya utiliza ProcureData. Quiero solicitar acceso al administrador.')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10 pt-4">
                            <Button
                                variant="outline"
                                className="w-full gap-2 text-base py-6 group-hover:shadow-lg transition-all border-2"
                                onClick={() => navigate('/onboarding/request-invite')}
                            >
                                <UserPlus className="h-5 w-5" />
                                {t('welcome.joinOrg.button', 'Solicitar Invitación')}
                                <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer info */}
                <p className="text-center text-sm text-muted-foreground mt-8">
                    {t('welcome.footer', '¿Necesitas ayuda? Contacta con nuestro equipo de soporte.')}
                </p>
            </div>
        </div>
    );
};
