import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useGovernanceSettings } from "@/hooks/useGovernanceSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Database,
    Plus,
    Eye,
    Edit,
    BarChart3,
    Package,
    TrendingUp,
    DollarSign,
    Calendar,
    Clock
} from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { format } from "date-fns";
import { es, fr, pt, de, it, nl, enUS } from "date-fns/locale";
import { toast } from "sonner";

const DATE_LOCALES: Record<string, typeof es> = { es, fr, pt, de, it, nl, en: enUS };

interface PublishedAsset {
    id: string;
    status: string;
    price: number | null;
    pricing_model: string | null;
    currency: string | null;
    created_at: string;
    is_visible: boolean;
    product: {
        id: string;
        name: string;
        description: string | null;
        category: string | null;
    } | null;
}

export const MyPublicationsTab = () => {
    const navigate = useNavigate();
    const { activeOrgId, activeOrg } = useOrganizationContext();
    const queryClient = useQueryClient();
    const { t, i18n } = useTranslation('data');
    const { requireKyb } = useGovernanceSettings();
    const kybDisabled = requireKyb && !(activeOrg as any)?.kyb_verified;
    const dateLocale = DATE_LOCALES[i18n.language] || DATE_LOCALES.en;

    const { data: publications, isLoading } = useQuery({
        queryKey: ["my-publications", activeOrgId],
        queryFn: async () => {
            if (!activeOrgId) return [];

            const { data, error } = await supabase
                .from("data_assets" as any)
                .select(`
          id,
          status,
          price,
          pricing_model,
          currency,
          created_at,
          is_visible,
          product:data_products (
            id,
            name,
            description,
            category
          )
        `)
                .eq("subject_org_id", activeOrgId)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return (data || []) as unknown as PublishedAsset[];
        },
        enabled: !!activeOrgId,
    });

    const toggleVisibilityMutation = useMutation({
        mutationFn: async ({ assetId, isVisible }: { assetId: string; isVisible: boolean }) => {
            const { error } = await supabase
                .from("data_assets")
                .update({ is_visible: isVisible } as any)
                .eq("id", assetId);
            if (error) throw error;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["my-publications"] });
            toast.success(variables.isVisible ? t('toast.visibleOn') : t('toast.visibleOff'));
        },
        onError: () => {
            toast.error(t('toast.visibilityError'));
        },
    });

    const stats = useMemo(() => {
        if (!publications) return { total: 0, active: 0, totalRevenue: 0 };

        return {
            total: publications.length,
            active: publications.filter(p => p.status === "available").length,
            totalRevenue: publications.reduce((acc, p) => acc + (p.price || 0), 0),
        };
    }, [publications]);

    const getPricingLabel = (model: string | null) => {
        switch (model) {
            case "free": return t('pricing.free');
            case "subscription": return t('pricing.subscription');
            case "one_time": return t('pricing.oneTime');
            case "usage": return t('pricing.usage');
            default: return t('pricing.undefined');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending_validation":
                return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">🔍 {t('pubStatus.validation')}</Badge>;
            case "available":
                return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">{t('pubStatus.available')}</Badge>;
            case "active":
                return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">{t('pubStatus.published')}</Badge>;
            case "rejected":
                return <Badge variant="destructive">{t('pubStatus.rejected')}</Badge>;
            case "draft":
                return <Badge variant="secondary">{t('pubStatus.draft')}</Badge>;
            case "archived":
                return <Badge variant="outline">{t('pubStatus.archived')}</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {t('stats.published')}
                        </CardTitle>
                        <Package className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {t('stats.listed')}
                        </CardTitle>
                        <TrendingUp className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.active}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {t('stats.totalValue')}
                        </CardTitle>
                        <DollarSign className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            €{stats.totalRevenue.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Publications List */}
            {isLoading ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">{t('loadingPub')}</p>
                </div>
            ) : !publications || publications.length === 0 ? (
                <EmptyState
                    icon={Database}
                    title={t('empty.pubTitle')}
                    description={t('empty.pubDesc')}
                    action={
                        <Button
                            onClick={() => navigate("/datos/publicar")}
                            disabled={kybDisabled}
                            title={kybDisabled ? "Se requiere validación KYB de tu organización" : undefined}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            {t('empty.pubBtn')}
                        </Button>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publications.map((publication) => (
                        <Card key={publication.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-base mb-1 group-hover:text-primary transition-colors truncate">
                                            {publication.product?.name || t('card.noName')}
                                        </CardTitle>
                                        <CardDescription className="text-sm line-clamp-2">
                                            {publication.product?.description || t('card.noDesc')}
                                        </CardDescription>
                                    </div>
                                </div>

                                {/* Badges Row */}
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {getStatusBadge(publication.status)}
                                    {publication.product?.category && (
                                        <Badge variant="outline" className="text-xs">
                                            {publication.product.category}
                                        </Badge>
                                    )}
                                    <Badge variant="secondary" className="text-xs">
                                        {getPricingLabel(publication.pricing_model)}
                                    </Badge>
                                </div>

                                {/* Visibility Toggle - disabled during validation */}
                                {publication.status === "pending_validation" ? (
                                    <div className="mt-3 pt-3 border-t">
                                        <p className="text-xs text-muted-foreground italic">
                                            {t('card.notEditable')}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                        <Label htmlFor={`visible-${publication.id}`} className="text-xs text-muted-foreground cursor-pointer">
                                            {t('card.visibleInCatalog')}
                                        </Label>
                                        <Switch
                                            id={`visible-${publication.id}`}
                                            checked={publication.is_visible !== false}
                                            onCheckedChange={(checked) =>
                                                toggleVisibilityMutation.mutate({ assetId: publication.id, isVisible: checked })
                                            }
                                        />
                                    </div>
                                )}
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Price */}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{t('card.price')}:</span>
                                    <span className="font-semibold">
                                        {publication.pricing_model === "free"
                                            ? t('pricing.free')
                                            : `€${publication.price?.toLocaleString() || 0}${publication.pricing_model === "subscription" ? t('pricing.perMonth') : ""}`
                                        }
                                    </span>
                                </div>

                                {/* Published Date */}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    {t('card.published')} {format(new Date(publication.created_at), "d MMMM, yyyy", { locale: dateLocale })}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    {publication.status !== "pending_validation" && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => navigate(`/catalog/asset/${publication.id}`)}
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            {t('card.view')}
                                        </Button>
                                    )}
                                    {publication.status === "pending_validation" ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            disabled
                                        >
                                            <Clock className="h-4 w-4 mr-1" />
                                            {t('card.inReview')}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => navigate("/analytics")}
                                        >
                                            <BarChart3 className="h-4 w-4 mr-1" />
                                            {t('card.analytics')}
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
