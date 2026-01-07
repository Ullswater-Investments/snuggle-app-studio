import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  HeartPulse, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  TrendingDown,
  Activity,
  Wrench,
  Euro,
  Bot
} from "lucide-react";

interface HealthMaintenanceSimulatorProps {
  criticalEquipment?: number;
  dailyDowntimeCost?: number;
}

export function HealthMaintenanceSimulator({ 
  criticalEquipment = 5,
  dailyDowntimeCost = 15000
}: HealthMaintenanceSimulatorProps) {
  const [equipment, setEquipment] = useState(criticalEquipment);
  const [costPerDay, setCostPerDay] = useState(dailyDowntimeCost);

  // Calculate metrics
  const avgFailuresPerYear = equipment * 2.4; // Average failures per equipment
  const failuresAvoided = Math.round(avgFailuresPerYear * 0.30); // 30% reduction
  const daysDowntimeAvoided = failuresAvoided * 1.5; // 1.5 days avg downtime per failure
  const annualSavings = Math.round(daysDowntimeAvoided * costPerDay);
  const emergencyRepairsSaved = failuresAvoided * 8500; // €8,500 avg emergency repair
  const totalSavings = annualSavings + emergencyRepairsSaved;
  const predictiveAlertHours = 72;

  return (
    <Card className="border-rose-200 dark:border-rose-900 bg-gradient-to-br from-rose-50/50 to-pink-50/50 dark:from-rose-950/30 dark:to-pink-950/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            Simulador de Mantenimiento Predictivo
          </CardTitle>
          <Badge variant="outline" className="text-[10px] bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Telemetría GDPR-Compliant
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Input Sliders */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Equipos Críticos (RM/TAC)</span>
              <span className="font-bold text-rose-600">{equipment}</span>
            </div>
            <Slider
              value={[equipment]}
              onValueChange={(v) => setEquipment(v[0])}
              min={1}
              max={20}
              step={1}
              className="[&_[role=slider]]:bg-rose-500"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Coste Diario de Parada</span>
              <span className="font-bold text-rose-600">{costPerDay.toLocaleString()}€</span>
            </div>
            <Slider
              value={[costPerDay]}
              onValueChange={(v) => setCostPerDay(v[0])}
              min={5000}
              max={50000}
              step={1000}
              className="[&_[role=slider]]:bg-rose-500"
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <TrendingDown className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">-30%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fallos Críticos</p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{predictiveAlertHours}h</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Alerta Anticipada</p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <Wrench className="w-6 h-6 mx-auto mb-2 text-amber-500" />
            <p className="text-2xl font-bold text-amber-600">{failuresAvoided}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Averías Evitadas/Año</p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <Euro className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
            <p className="text-2xl font-bold text-emerald-600">{totalSavings.toLocaleString()}€</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ahorro Anual</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white dark:bg-card rounded-xl p-4 shadow-sm">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-500" />
            Desglose del Ahorro
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between items-center p-2 bg-rose-50 dark:bg-rose-950/30 rounded-lg">
              <span className="text-muted-foreground">Días de inactividad evitados</span>
              <span className="font-bold">{daysDowntimeAvoided.toFixed(1)} días</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-rose-50 dark:bg-rose-950/30 rounded-lg">
              <span className="text-muted-foreground">Ahorro por paradas</span>
              <span className="font-bold text-green-600">+{annualSavings.toLocaleString()}€</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-rose-50 dark:bg-rose-950/30 rounded-lg">
              <span className="text-muted-foreground">Reparaciones de emergencia</span>
              <span className="font-bold text-green-600">+{emergencyRepairsSaved.toLocaleString()}€</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/50 dark:to-pink-900/50 rounded-lg border-2 border-rose-300 dark:border-rose-700">
              <span className="font-semibold">Ahorro Total Anual</span>
              <span className="font-bold text-lg text-rose-600">{totalSavings.toLocaleString()}€</span>
            </div>
          </div>
        </div>

        {/* ARIA Insight */}
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/40 dark:to-pink-900/40 rounded-xl p-4 border border-rose-200 dark:border-rose-800">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">ARIA Insight</p>
              <p className="text-sm text-muted-foreground">
                "Gracias al conector IDS, el hospital puede compartir logs técnicos de los equipos 
                <strong> sin exponer ningún dato personal de pacientes</strong>. Los metadatos de error 
                se anonimizan mediante Edge Functions antes de llegar al proveedor de mantenimiento, 
                cumpliendo totalmente con el GDPR."
              </p>
            </div>
          </div>
        </div>

        {/* Warning about current state */}
        <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-300">
            Sin mantenimiento predictivo, cada equipo de RM tiene una media de {(avgFailuresPerYear / equipment).toFixed(1)} averías 
            imprevistas al año, causando retrasos en diagnósticos y cirugías.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
