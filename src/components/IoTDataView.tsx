import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Thermometer, AlertTriangle } from "lucide-react";

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
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Machine ID */}
        {data.machine_id && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                ID de Máquina
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold font-mono">
                {data.machine_id}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Operating Hours */}
        {data.operating_hours !== undefined && (
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                Horas de Operación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {data.operating_hours.toLocaleString()} h
              </div>
            </CardContent>
          </Card>
        )}

        {/* Temperature */}
        {data.avg_temperature_c !== undefined && (
          <Card className={
            data.avg_temperature_c > 80 
              ? "border-red-200 dark:border-red-800" 
              : "border-green-200 dark:border-green-800"
          }>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Thermometer className={`h-4 w-4 ${
                  data.avg_temperature_c > 80 ? "text-red-600" : "text-green-600"
                }`} />
                Temperatura Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                data.avg_temperature_c > 80 ? "text-red-600" : "text-green-600"
              }`}>
                {data.avg_temperature_c}°C
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vibration Alerts */}
        {data.vibration_alerts !== undefined && (
          <Card className={
            data.vibration_alerts > 5 
              ? "border-yellow-200 dark:border-yellow-800" 
              : "border-green-200 dark:border-green-800"
          }>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className={`h-4 w-4 ${
                  data.vibration_alerts > 5 ? "text-yellow-600" : "text-green-600"
                }`} />
                Alertas de Vibración
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                data.vibration_alerts > 5 ? "text-yellow-600" : "text-green-600"
              }`}>
                {data.vibration_alerts}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Maintenance Info */}
      {data.last_maintenance && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Información de Mantenimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Último Mantenimiento:</span>
                <Badge variant="outline">{data.last_maintenance}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Raw Data (fallback) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Datos Completos</CardTitle>
          <CardDescription>Vista técnica de todos los campos disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted p-4 rounded-md overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};