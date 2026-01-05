import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ActivityFeed } from "@/components/ActivityFeed";
import { DashboardStats } from "@/components/DashboardStats";
import { Web3StatusWidget } from "@/components/Web3StatusWidget";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { DollarSign, ShoppingCart, Package, TrendingUp, ArrowUpRight, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

// Datos simulados para Provider (Vendedor)
const REVENUE_DATA = [
  { name: 'Ene', revenue: 4000 }, { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 }, { name: 'Abr', revenue: 2780 },
  { name: 'May', revenue: 1890 }, { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

// Datos simulados para Consumer (Comprador)
const SPEND_DATA = [
  { name: 'Ene', spent: 1200 }, { name: 'Feb', spent: 1900 },
  { name: 'Mar', spent: 1500 }, { name: 'Abr', spent: 2200 },
  { name: 'May', spent: 1800 }, { name: 'Jun', spent: 2500 },
];

export default function Dashboard() {
  const { activeOrg } = useOrganizationContext();
  const isProvider = activeOrg?.type === 'provider' || activeOrg?.type === 'data_holder';

  return (
    <div className="container py-8 space-y-8 fade-in bg-muted/10 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hola, {activeOrg?.name}</h2>
          <p className="text-muted-foreground">
            {isProvider 
              ? "Resumen de rendimiento comercial y activos." 
              : "Resumen de consumo de datos y suscripciones."}
          </p>
        </div>
        <div className="flex gap-2">
          {isProvider ? (
            <Link to="/analytics">
              <Button variant="outline" className="gap-2"><TrendingUp className="h-4 w-4"/> Ver Analytics</Button>
            </Link>
          ) : (
            <Link to="/catalog">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700"><ShoppingCart className="h-4 w-4"/> Ir al Mercado</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards (Reutilizamos componente existente pero envuelto) */}
      <DashboardStats />

      {/* Financial Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <Card className="lg:col-span-2 shadow-sm border-blue-100 dark:border-slate-800">
          <CardHeader>
            <CardTitle>{isProvider ? "Ingresos Recurrentes (MRR)" : "Evolución de Gasto"}</CardTitle>
            <CardDescription>
              {isProvider ? "Rendimiento de ventas en los últimos 7 meses." : "Costes acumulados por licencias de datos."}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {isProvider ? (
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#2563eb" fill="url(#colorRev)" />
                </AreaChart>
              ) : (
                <BarChart data={SPEND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="spent" fill="#0f172a" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Side Widgets */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/10 rounded-lg"><DollarSign className="h-6 w-6 text-green-400" /></div>
                <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded text-white/80">Este mes</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-300">{isProvider ? "Ventas Netas" : "Presupuesto Disponible"}</p>
                <h3 className="text-3xl font-bold">{isProvider ? "4,250 €" : "8,500 €"}</h3>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-green-300">
                <ArrowUpRight className="h-4 w-4" /> <span>+12.5% vs mes anterior</span>
              </div>
            </CardContent>
          </Card>

          {/* Web3 Wallet Status */}
          <Web3StatusWidget />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {isProvider ? (
                <>
                  <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-3"><Package className="h-4 w-4"/> Publicar Nuevo Activo</Button>
                  <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-3"><CreditCard className="h-4 w-4"/> Configurar Payouts</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-3"><ShoppingCart className="h-4 w-4"/> Ver Wishlist</Button>
                  <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-3"><CreditCard className="h-4 w-4"/> Recargar Wallet</Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Última Actividad</h3>
        <ActivityFeed />
      </div>
    </div>
  );
}
