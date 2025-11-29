import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";

interface ChartSeries {
  key: string;
  color: string;
  name: string;
}

interface ChartConfig {
  xKey?: string;
  series?: ChartSeries[];
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
}

interface InnovationChartProps {
  type: "bar" | "line" | "pie" | "area";
  data: any[];
  config: ChartConfig;
}

export function InnovationChart({ type, data, config }: InnovationChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No hay datos disponibles
      </div>
    );
  }

  const commonProps = {
    data,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey={config.xKey || "name"} className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--background))", 
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px"
            }} 
          />
          <Legend />
          {config.series?.map((series, idx) => (
            <Bar 
              key={series.key} 
              dataKey={series.key} 
              fill={series.color} 
              name={series.name}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey={config.xKey || "name"} className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--background))", 
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px"
            }} 
          />
          <Legend />
          {config.series?.map((series) => (
            <Line 
              key={series.key} 
              type="monotone" 
              dataKey={series.key} 
              stroke={series.color} 
              name={series.name}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === "pie") {
    const COLORS = config.colors || ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey={config.dataKey || "value"}
            nameKey={config.nameKey || "name"}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--background))", 
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px"
            }} 
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === "area") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey={config.xKey || "name"} className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--background))", 
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px"
            }} 
          />
          <Legend />
          {config.series?.map((series) => (
            <Area 
              key={series.key} 
              type="monotone" 
              dataKey={series.key} 
              stroke={series.color} 
              fill={series.color}
              fillOpacity={0.6}
              name={series.name}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return null;
}
