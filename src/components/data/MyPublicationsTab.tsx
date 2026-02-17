import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
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
import { es } from "date-fns/locale";
import { toast } from "sonner";

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
            toast.success(variables.isVisible ? "Activo visible en el catálogo" : "Activo oculto del catálogo");
        },
        onError: () => {
            toast.error("Error al cambiar la visibilidad");
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
            case "free": return "Gratuito";
            case "subscription": return "Suscripción";
            case "one_time": return "Pago Único";
            case "usage": return "Por Uso";
            default: return "Sin definir";
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending_validation":
                return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">🔍 En Validación Técnica</Badge>;
            case "available":
                return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Disponible</Badge>;
            case "active":
                return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Publicado</Badge>;
            case "rejected":
                return <Badge variant="destructive">Rechazado</Badge>;
            case "draft":
                return <Badge variant="secondary">Borrador</Badge>;
            case "archived":
                return <Badge variant="outline">Archivado</Badge>;
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
                            Datasets Publicados
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
                            Activos en Catálogo
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
                            Valor Total Listado
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
                    <p className="text-muted-foreground">Cargando publicaciones...</p>
                </div>
            ) : !publications || publications.length === 0 ? (
                <EmptyState
                    icon={Database}
                    title="Sin publicaciones"
                    description="Aún no has publicado ningún dataset. Comparte tus datos con el ecosistema y genera ingresos."
                    action={
                        <Button onClick={() => navigate("/datos/publicar")}>
                            <Plus className="h-4 w-4 mr-2" />
                            Publicar Dataset
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
                                            {publication.product?.name || "Dataset sin nombre"}
                                        </CardTitle>
                                        <CardDescription className="text-sm line-clamp-2">
                                            {publication.product?.description || "Sin descripción"}
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
                                            No editable mientras está en validación técnica.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                        <Label htmlFor={`visible-${publication.id}`} className="text-xs text-muted-foreground cursor-pointer">
                                            Visible en Catálogo
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
                                    <span className="text-muted-foreground">Precio:</span>
                                    <span className="font-semibold">
                                        {publication.pricing_model === "free"
                                            ? "Gratuito"
                                            : `€${publication.price?.toLocaleString() || 0}${publication.pricing_model === "subscription" ? "/mes" : ""}`
                                        }
                                    </span>
                                </div>

                                {/* Published Date */}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    Publicado {format(new Date(publication.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                                </div>

                                {/* Actions - hide edit for pending_validation */}
                                <div className="flex gap-2 pt-2">
                                    {publication.status !== "pending_validation" && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => navigate(`/catalog/asset/${publication.id}`)}
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            Ver
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
                                            En revisión
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => navigate("/analytics")}
                                        >
                                            <BarChart3 className="h-4 w-4 mr-1" />
                                            Analytics
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
