import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Activity, Users, FileText, ShieldCheck } from "lucide-react";

const transactionData = [
  { month: "Ene", txns: 120 },
  { month: "Feb", txns: 210 },
  { month: "Mar", txns: 340 },
  { month: "Abr", txns: 480 },
  { month: "May", txns: 620 },
  { month: "Jun", txns: 890 },
  { month: "Jul", txns: 1150 },
  { month: "Ago", txns: 1420 },
  { month: "Sep", txns: 1780 },
  { month: "Oct", txns: 2100 },
  { month: "Nov", txns: 2560 },
  { month: "Dic", txns: 3200 },
];

const kpis = [
  { label: "Nodos Activos", value: "147", icon: Users, color: "text-blue-500" },
  { label: "Políticas ODRL", value: "3.2K", icon: FileText, color: "text-green-500" },
  { label: "Soberanía", value: "94%", icon: ShieldCheck, color: "text-purple-500" },
  { label: "Uptime", value: "99.9%", icon: Activity, color: "text-amber-500" },
];

export const EcosystemMetrics = () => {
  return (
    <div className="space-y-4 h-full">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-muted/50 rounded-xl p-3 border"
          >
            <div className="flex items-center gap-2 mb-1">
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              <span className="text-[11px] text-muted-foreground">{kpi.label}</span>
            </div>
            <p className="text-xl font-bold text-foreground">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-muted/30 rounded-xl border p-3">
        <p className="text-xs font-medium text-muted-foreground mb-2">Transacciones Federadas (2025)</p>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={transactionData}>
            <defs>
              <linearGradient id="txnGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="txns"
              stroke="hsl(var(--primary))"
              fill="url(#txnGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
