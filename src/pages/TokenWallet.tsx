import { useMemo, useState } from "react";
import { useTokenWallet } from "@/contexts/TokenWalletContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coins, Zap, Hash, TrendingDown, RotateCcw, ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))"];

const TokenWallet = () => {
  const { balance, initialBalance, operations, totalConsumed, resetWallet } = useTokenWallet();
  const navigate = useNavigate();
  const [agentFilter, setAgentFilter] = useState<string>("all");

  const pct = (balance / initialBalance) * 100;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const tokensToday = useMemo(
    () => operations.filter((o) => new Date(o.timestamp) >= startOfToday).reduce((s, o) => s + o.tokensConsumed, 0),
    [operations]
  );
  const tokensWeek = useMemo(
    () => operations.filter((o) => new Date(o.timestamp) >= startOfWeek).reduce((s, o) => s + o.tokensConsumed, 0),
    [operations]
  );
  const tokensMonth = useMemo(
    () => operations.filter((o) => new Date(o.timestamp) >= startOfMonth).reduce((s, o) => s + o.tokensConsumed, 0),
    [operations]
  );
  const avgTokens = operations.length > 0 ? Math.round(totalConsumed / operations.length) : 0;

  // Agent distribution
  const agentData = useMemo(() => {
    const fed = operations.filter((o) => o.agent === "federated").reduce((s, o) => s + o.tokensConsumed, 0);
    const ss = operations.filter((o) => o.agent === "success-story").reduce((s, o) => s + o.tokensConsumed, 0);
    return [
      { name: "Agente Federado", value: fed },
      { name: "Casos de Éxito", value: ss },
    ].filter((d) => d.value > 0);
  }, [operations]);

  // Daily consumption chart
  const dailyData = useMemo(() => {
    const map = new Map<string, number>();
    operations.forEach((o) => {
      const day = o.timestamp.slice(0, 10);
      map.set(day, (map.get(day) || 0) + o.tokensConsumed);
    });
    return Array.from(map.entries())
      .map(([date, tokens]) => ({ date, tokens }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30);
  }, [operations]);

  // Filtered operations
  const filteredOps = useMemo(
    () => (agentFilter === "all" ? operations : operations.filter((o) => o.agent === agentFilter)),
    [operations, agentFilter]
  );
  const filteredTotal = filteredOps.reduce((s, o) => s + o.tokensConsumed, 0);

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <FadeIn>
        <div className="flex items-center gap-4 mb-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <Badge variant="secondary" className="mb-2">
              <Coins className="mr-1 h-3 w-3" />
              Token Wallet IA
            </Badge>
            <h1 className="text-3xl font-bold">Token Wallet Virtual</h1>
            <p className="text-muted-foreground">Control de consumo de tokens de los agentes IA</p>
          </div>
        </div>
      </FadeIn>

      {/* Balance principal */}
      <FadeIn delay={0.05}>
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1 space-y-3">
                <p className="text-sm text-muted-foreground font-medium">Saldo disponible</p>
                <p className="text-5xl font-bold tabular-nums">{balance.toLocaleString("es-ES")}</p>
                <Progress value={pct} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {totalConsumed.toLocaleString("es-ES")} consumidos de {initialBalance.toLocaleString("es-ES")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <Zap className="h-5 w-5 mx-auto text-primary" />
                  <p className="text-2xl font-bold tabular-nums">{totalConsumed.toLocaleString("es-ES")}</p>
                  <p className="text-xs text-muted-foreground">Total consumidos</p>
                </div>
                <div className="space-y-1">
                  <Hash className="h-5 w-5 mx-auto text-primary" />
                  <p className="text-2xl font-bold tabular-nums">{operations.length}</p>
                  <p className="text-xs text-muted-foreground">Operaciones</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Aggregated metrics */}
      <FadeIn delay={0.1}>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Hoy", value: tokensToday },
            { label: "Esta semana", value: tokensWeek },
            { label: "Este mes", value: tokensMonth },
            { label: "Promedio/op", value: avgTokens },
          ].map((m) => (
            <Card key={m.label}>
              <CardHeader className="pb-2">
                <CardDescription>{m.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tabular-nums">{m.value.toLocaleString("es-ES")}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeIn>

      {/* Charts row */}
      <FadeIn delay={0.15}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Agent distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Distribución por agente</CardTitle>
            </CardHeader>
            <CardContent className="h-[220px]">
              {agentData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={agentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4}>
                      {agentData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => v.toLocaleString("es-ES")} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">Sin datos</div>
              )}
            </CardContent>
          </Card>

          {/* Daily consumption */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Consumo diario</CardTitle>
            </CardHeader>
            <CardContent className="h-[220px]">
              {dailyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(v: number) => v.toLocaleString("es-ES")} />
                    <Line type="monotone" dataKey="tokens" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">Sin datos</div>
              )}
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Operations table */}
      <FadeIn delay={0.2}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Historial de operaciones</CardTitle>
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar agente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="federated">Agente Federado</SelectItem>
                <SelectItem value="success-story">Casos de Éxito</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            {filteredOps.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground text-sm">No hay operaciones registradas</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-2 pr-4">Fecha/Hora</th>
                      <th className="pb-2 pr-4">Agente</th>
                      <th className="pb-2 pr-4">Contexto</th>
                      <th className="pb-2 pr-4">Pregunta</th>
                      <th className="pb-2 text-right">Tokens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOps.map((op) => (
                      <tr key={op.id} className="border-b last:border-0">
                        <td className="py-2 pr-4 whitespace-nowrap tabular-nums">
                          {new Date(op.timestamp).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" })}
                        </td>
                        <td className="py-2 pr-4">
                          <Badge variant="outline" className="text-xs">
                            {op.agent === "federated" ? "Federado" : "Caso"}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4 max-w-[140px] truncate">{op.caseLabel}</td>
                        <td className="py-2 pr-4 max-w-[200px] truncate">{op.question}</td>
                        <td className="py-2 text-right font-medium tabular-nums">{op.tokensConsumed.toLocaleString("es-ES")}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t font-medium">
                      <td colSpan={4} className="py-2">Total ({filteredOps.length} ops)</td>
                      <td className="py-2 text-right tabular-nums">{filteredTotal.toLocaleString("es-ES")}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      {/* Actions */}
      <FadeIn delay={0.25}>
        <div className="flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Resetear Wallet
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Resetear la wallet?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esto restaurará el saldo a 1.000.000 tokens y eliminará todo el historial de operaciones.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={resetWallet}>Confirmar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </FadeIn>
    </div>
  );
};

export default TokenWallet;
