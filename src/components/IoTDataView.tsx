import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Thermometer, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface IoTData {
  machine_id?: string;
  operating_hours?: number;
  avg_temperature_c?: number;
  vibration_alerts?: number;
  last_maintenance?: string;
  [key: string]: any;
}

interface IoTDataViewProps {
  data: IoTData;
}

export const IoTDataView = ({ data }: IoTDataViewProps) => {
  // Mock temperature data for the chart (last 24h simulation)
  const temperatureData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    temperature: data.avg_temperature_c 
      ? data.avg_temperature_c + (Math.random() * 10 - 5) // ±5°C variation
      : 70 + (Math.random() * 10 - 5),
  }));

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              ID de Máquina
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.machine_id || "N/A"}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Horas operativas: {data.operating_hours?.toLocaleString() || "0"}h
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-orange-600" />
              Temperatura Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {data.avg_temperature_c || "N/A"}°C
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Rango normal: 60-80°C
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Alertas de Vibración
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {data.vibration_alerts || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Últimas 24 horas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Temperature Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Telemetría de Temperatura</CardTitle>
          <CardDescription>
            Evolución de la temperatura en las últimas 24 horas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                tick={{ fontSize: 12 }}
                interval={3}
              />
              <YAxis 
                domain={[50, 90]}
                tick={{ fontSize: 12 }}
                label={{ value: '°C', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Maintenance */}
      {data.last_maintenance && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Información de Mantenimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Último Mantenimiento:</span>
                <span className="text-sm font-medium">
                  {new Date(data.last_maintenance).toLocaleDateString()}
                </span>
              </div>
              {data.maintenance_needed !== undefined && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Estado:</span>
                  <Badge variant={data.maintenance_needed ? "destructive" : "default"}>
                    {data.maintenance_needed ? "Mantenimiento Requerido" : "Operativo"}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};