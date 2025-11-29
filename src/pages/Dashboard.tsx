import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useOrgSector } from "@/hooks/useOrgSector";
import { DashboardStats } from "@/components/DashboardStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Plus, Rocket, Database, FileText, TrendingUp, Clock } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { useNavigate } from "react-router-dom";
import { SectorIcon, getSectorColor } from "@/components/SectorIcon";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const Dashboard = () => {
  const navigate = useNavigate();
  const { availableOrgs, activeOrg } = useOrganizationContext();
  const orgSector = useOrgSector();

  // Obtener actividad reciente del sector
  const { data: recentActivity } = useQuery({
    queryKey: ["recent-activity", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return [];

      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          id,
          purpose,
          status,
          created_at,
          asset:data_assets (
            product:data_products (name, category)
          ),
          consumer_org:organizations!data_transactions_consumer_org_id_fkey (name),
          subject_org:organizations!data_transactions_subject_org_id_fkey (name)
        `)
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: !!activeOrg,
  });

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/10 via-background to-background border border-blue-500/20 p-8">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4">
              Dashboard
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              Bienvenido a tu Centro de Control
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-4">
              Sistema de Gobernanza de Datos - Fase 5 (Integraciones Externas) ✅
            </p>
            {availableOrgs.some(org => org.is_demo) && (
              <div className="mt-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 animate-fade-in">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  🎭 <strong>Modo Demo Activo</strong> - Tienes acceso a {availableOrgs.length} organizaciones multisectoriales
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Datos contextuales generados automáticamente por sector. Cambia de organización para ver datos diferentes.
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  Usa el botón de ayuda (?) para reiniciar el tour guiado
                </p>
              </div>
            )}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div data-tour="dashboard-stats">
          <DashboardStats />
        </div>
      </FadeIn>

      {/* Quick Actions & Sector Activity */}
      <FadeIn delay={0.2}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column: Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Acciones Rápidas
              </CardTitle>
              <CardDescription>Operaciones frecuentes del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/requests/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Solicitud de Datos
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/catalog")}>
                <Database className="mr-2 h-4 w-4" />
                Explorar Catálogo
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/requests")}>
                <FileText className="mr-2 h-4 w-4" />
                Ver Mis Solicitudes
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/reports")}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Generar Reportes
              </Button>
            </CardContent>
          </Card>

          {/* Right Column: Sector Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <SectorIcon sector={orgSector} className="h-5 w-5" />
                    Actividad Reciente {orgSector !== "General" && `- ${orgSector}`}
                  </CardTitle>
                  <CardDescription>Transacciones de tu organización</CardDescription>
                </div>
                <Badge variant="outline" className={getSectorColor(orgSector)}>
                  {orgSector}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {recentActivity && recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/data/view/${activity.id}`)}
                    >
                      <div className={`mt-1 ${getSectorColor(orgSector)}`}>
                        <SectorIcon sector={orgSector} className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {activity.asset?.product?.name || "Producto"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {activity.purpose}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {activity.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true, locale: es })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Database className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">No hay actividad reciente</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
              <CardDescription>Fases del proyecto <span className="procuredata-gradient">PROCUREDATA</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">Fase 1 - Fundación ✅</h3>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Base de Datos</span>
                    <span className="text-sm text-green-600">✓ Configurada</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Autenticación</span>
                    <span className="text-sm text-green-600">✓ Activa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sistema de Roles</span>
                    <span className="text-sm text-green-600">✓ Implementado</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Routing</span>
                    <span className="text-sm text-green-600">✓ Configurado</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 font-semibold">Fase 2 - Catálogo de Datos ✅</h3>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Productos de Datos</span>
                    <span className="text-sm text-green-600">✓ 4 productos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Activos Disponibles</span>
                    <span className="text-sm text-green-600">✓ 5 activos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Búsqueda y Filtros</span>
                    <span className="text-sm text-green-600">✓ Funcional</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Metadatos</span>
                    <span className="text-sm text-green-600">✓ Configurado</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Fase 3 - Motor de Gobernanza ✅</h3>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Transacciones</span>
                    <span className="text-sm text-green-600">✓ Funcional</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Wizard de Solicitud</span>
                    <span className="text-sm text-green-600">✓ 5 pasos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Aprobaciones Multi-Actor</span>
                    <span className="text-sm text-green-600">✓ Implementado</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Políticas ODRL</span>
                    <span className="text-sm text-green-600">✓ Generadas</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Fase 4 - Visualización y Exportación ✅</h3>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Visualización de Datos</span>
                    <span className="text-sm text-green-600">✓ Tabla interactiva</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Exportación CSV</span>
                    <span className="text-sm text-green-600">✓ Funcional</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Configuración ERP</span>
                    <span className="text-sm text-green-600">✓ Implementada</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Datos de Proveedores</span>
                    <span className="text-sm text-green-600">✓ Estructura</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Fase 5 - Integraciones Externas ✅</h3>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Edge Functions ERP</span>
                    <span className="text-sm text-green-600">✓ 3 funciones</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Notificaciones Email</span>
                    <span className="text-sm text-green-600">✓ Funcional</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Test Conexión ERP</span>
                    <span className="text-sm text-green-600">✓ Implementado</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Envío Real a ERP</span>
                    <span className="text-sm text-green-600">✓ Operativo</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Fase 6 - Refinamiento</h3>
                <p className="text-sm text-muted-foreground pl-4">Próximamente...</p>
              </div>
            </CardContent>
          </Card>
      </FadeIn>
    </div>
  );
};

export default Dashboard;
