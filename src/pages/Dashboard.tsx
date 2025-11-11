import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">PROCUREDATA</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-3xl font-bold">Dashboard Principal</h2>
          <p className="text-muted-foreground">
            Sistema de Gobernanza de Datos - Fase 2 (Catálogo de Datos) ✅
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
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

          <Card>
            <CardHeader>
              <CardTitle>Solicitudes</CardTitle>
              <CardDescription>Gestionar solicitudes de datos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                Próximamente
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
              <CardDescription>Configurar integraciones y APIs</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                Próximamente
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
                <h3 className="mb-2 font-semibold">Fase 3 - Motor de Gobernanza</h3>
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
