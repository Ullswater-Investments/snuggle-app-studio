import { Building2, Wallet, Globe, Plus, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

function getRoleLabel(type: 'consumer' | 'data_holder' | 'provider' | undefined): string {
    switch (type) {
        case 'consumer':
            return 'Consumidor de Datos';
        case 'data_holder':
            return 'Poseedor de Datos';
        case 'provider':
            return 'Proveedor de Datos';
        default:
            return 'Rol desconocido';
    }
}

function abbreviateAddress(address: string | undefined): string {
    if (!address) return '—';
    if (address.length <= 12) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export const OrganizationCardsGrid = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('common');
    const { availableOrgs, switchOrganization } = useOrganizationContext();

    const handleSelectOrganization = (orgId: string) => {
        switchOrganization(orgId);
        // The dashboard will re-render with the active org selected
    };

    return (
        <div className="container py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {t('workspace.selectTitle', 'Selecciona tu Espacio de Trabajo')}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {t('workspace.selectSubtitle', 'Elige una organización para comenzar a operar')}
                    </p>
                </div>
                <Button
                    variant="brand"
                    className="gap-2"
                    onClick={() => navigate('/onboarding/create-organization')}
                >
                    <Plus className="h-4 w-4" />
                    {t('workspace.newOrg', 'Nueva Organización')}
                </Button>
            </div>

            {/* Organization Cards Grid */}
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {availableOrgs.map((org) => (
                    <StaggerItem key={org.id}>
                        <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl cursor-pointer bg-card/80 backdrop-blur-sm h-full flex flex-col">
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <CardHeader className="relative z-10 pb-2 flex-grow">
                                <div className="flex items-start justify-between gap-2 mb-4">
                                    {/* Logo / Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                                        {org.logo_url ? (
                                            <img
                                                src={org.logo_url}
                                                alt={org.name}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <Building2 className="h-7 w-7 text-primary" />
                                        )}
                                    </div>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-1 justify-end">
                                        {org.is_demo && (
                                            <Badge variant="outline" className="text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700">
                                                Demo
                                            </Badge>
                                        )}
                                        <Badge variant="secondary" className="text-xs">
                                            {getRoleLabel(org.type)}
                                        </Badge>
                                    </div>
                                </div>

                                <CardTitle className="text-xl font-bold line-clamp-2">
                                    {org.name}
                                </CardTitle>

                                <CardDescription className="mt-2 space-y-2">
                                    {/* Sector */}
                                    {org.sector && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Globe className="h-4 w-4 text-muted-foreground" />
                                            <span>{org.sector}</span>
                                        </div>
                                    )}

                                    {/* Wallet address (abbreviated) - mock for now */}
                                    <div className="flex items-center gap-2 text-sm font-mono">
                                        <Wallet className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs">{abbreviateAddress('0x7a3B...4f2c')}</span>
                                    </div>
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="relative z-10 pt-4 mt-auto">
                                {/* Verification Status */}
                                <div className="flex items-center gap-2 mb-4">
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                    <span className="text-xs text-green-600 font-medium">
                                        {t('workspace.verified', 'Verificado en la Red')}
                                    </span>
                                </div>

                                <Button
                                    variant="brand"
                                    className="w-full gap-2 group-hover:shadow-lg transition-all"
                                    onClick={() => handleSelectOrganization(org.id)}
                                >
                                    {t('workspace.selectButton', 'Seleccionar para operar')}
                                    <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            {/* Help text */}
            <p className="text-center text-sm text-muted-foreground">
                {t('workspace.helpText', '¿No ves tu organización? Solicita una invitación al administrador o registra una nueva.')}
            </p>
        </div>
    );
};
