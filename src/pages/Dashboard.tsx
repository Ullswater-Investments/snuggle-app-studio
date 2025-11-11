import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { OrganizationSwitcher } from "@/components/OrganizationSwitcher";
import { DemoBanner } from "@/components/DemoBanner";
import { DemoTour } from "@/components/DemoTour";
import { DemoHelpButton } from "@/components/DemoHelpButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { availableOrgs } = useOrganizationContext();

  return (
    <div className="min-h-screen bg-background">
      <DemoTour />
      
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
          <h1 className="text-2xl font-bold">PROCUREDATA</h1>
          <div className="flex items-center gap-4">
            <div data-tour="org-switcher">
              <OrganizationSwitcher />
            </div>
            <DemoHelpButton />
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>
      
      <DemoBanner />

      <main className="container mx-auto p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-3xl font-bold">Dashboard Principal</h2>
          <p className="text-muted-foreground">
            Sistema de Gobernanza de Datos - Fase 5 (Integraciones Externas) ✅
          </p>
          {availableOrgs.some(org => org.is_demo) && (
            <div className="mt-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 animate-fade-in">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                🎭 <strong>Modo Demo Activo</strong> - Tienes acceso a {availableOrgs.length} organizaciones
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                5 transacciones demo en diferentes estados disponibles para explorar el flujo completo
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                <HelpCircle className="h-3 w-3" />
                Usa el botón de ayuda (?) para reiniciar el tour guiado
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card data-tour="catalog-link" className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Catálogo de Datos</CardTitle>
              <CardDescription>Explorar productos de datos disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => window.location.href = '/catalog'}>
                Ir al Catálogo
              </Button>
            </CardContent>
          </Card>

          <Card data-tour="requests-link" className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Solicitudes</CardTitle>
              <CardDescription>Gestionar solicitudes de datos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => window.location.href = '/requests'}>
                Ir a Solicitudes
              </Button>
            </CardContent>
          </Card>

          <Card data-tour="data-view-link" className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Visualización de Datos</CardTitle>
              <CardDescription>Ver datos de transacciones completadas</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => window.location.href = '/data-view'}>
                Ver Datos
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
              <CardDescription>Fases del proyecto PROCUREDATA</CardDescription>
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
