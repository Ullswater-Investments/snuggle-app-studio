import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  ShieldCheck, 
  Leaf,
  Euro,
  Clock,
  Activity,
  FileCheck,
  Bot,
  ArrowRight,
  CheckCircle2,
  Timer
} from "lucide-react";

interface EnergySmartContractProps {
  monthlyConsumptionKwh?: number;
  renewablePercentage?: number;
}

export function EnergySmartContract({ 
  monthlyConsumptionKwh = 450000,
  renewablePercentage = 100
}: EnergySmartContractProps) {
  const [animatedStep, setAnimatedStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate metrics
  const pricePerGdO = 0.85; // EUR per certificate
  const certificatesNeeded = Math.ceil(monthlyConsumptionKwh / 1000);
  const totalCostEuroe = certificatesNeeded * pricePerGdO;
  const traditionalDays = 45; // Days for traditional reconciliation
  const smartContractSeconds = 12; // Seconds for blockchain confirmation
  const taxBenefits = Math.round(monthlyConsumptionKwh * 0.012); // EUR tax benefits
  const walletBalance = 5420.50;

  // Transaction timeline steps
  const steps = [
    { label: "IoT Consumo", icon: Activity, color: "text-yellow-500" },
    { label: "Smart Contract", icon: FileCheck, color: "text-blue-500" },
    { label: "Compra GdO", icon: Leaf, color: "text-green-500" },
    { label: "Pago EUROe", icon: Euro, color: "text-amber-500" },
    { label: "Verificado", icon: CheckCircle2, color: "text-emerald-500" }
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimatedStep(0);
    
    const interval = setInterval(() => {
      setAnimatedStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  return (
    <Card className="border-yellow-200 dark:border-yellow-900 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-yellow-950/30 dark:to-amber-950/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Smart Contract de Energía Renovable
          </CardTitle>
          <Badge variant="outline" className="text-[10px] bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300">
            <Leaf className="w-3 h-3 mr-1" />
            Carbon Neutral Verified
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <Activity className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <p className="text-xl font-bold text-yellow-600">{(monthlyConsumptionKwh / 1000).toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">MWh/mes</p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <Leaf className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-xl font-bold text-green-600">{renewablePercentage}%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Renovable</p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <Timer className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-xl font-bold text-blue-600">{smartContractSeconds}s</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Conciliación</p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <Euro className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
            <p className="text-xl font-bold text-emerald-600">{taxBenefits.toLocaleString()}€</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ahorro Fiscal/mes</p>
          </div>
        </div>

        {/* Transaction Flow Animation */}
        <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              Flujo de Transacción Automatizada
            </h4>
            <Button 
              size="sm" 
              variant="outline"
              onClick={startAnimation}
              disabled={isAnimating}
            >
              {isAnimating ? "Procesando..." : "Simular Compra"}
            </Button>
          </div>
          
          <div className="flex items-center justify-between relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-yellow-500 to-green-500 -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${(animatedStep / (steps.length - 1)) * 100}%` }}
            />
            
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = idx <= animatedStep;
              const isCurrent = idx === animatedStep && isAnimating;
              
              return (
                <div 
                  key={step.label}
                  className={`relative z-10 flex flex-col items-center transition-all duration-300 ${
                    isCurrent ? 'scale-110' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg' 
                      : 'bg-muted text-muted-foreground'
                  } ${isCurrent ? 'ring-4 ring-yellow-300 ring-opacity-50' : ''}`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] mt-2 font-medium transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison: Traditional vs Smart Contract */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4 border border-red-200 dark:border-red-800">
            <h5 className="font-semibold text-sm text-red-700 dark:text-red-300 mb-3">
              ❌ Proceso Tradicional
            </h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>{traditionalDays} días de conciliación</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-red-500" />
                <span>Certificados en papel</span>
              </li>
              <li className="flex items-center gap-2">
                <Euro className="w-4 h-4 text-red-500" />
                <span>Auditorías trimestrales costosas</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h5 className="font-semibold text-sm text-green-700 dark:text-green-300 mb-3">
              ✓ Smart Contract EUROe
            </h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>{smartContractSeconds} segundos de confirmación</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Certificados en blockchain</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Verificación automática continua</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Wallet Status */}
        <div className="bg-white dark:bg-card rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Euro className="w-4 h-4 text-amber-500" />
              Wallet Empresarial EUROe
            </h4>
            <Badge variant="outline" className="font-mono text-xs">
              <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
              Pontus-X
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
              <p className="text-xs text-muted-foreground">Saldo Disponible</p>
              <p className="text-xl font-bold text-amber-600">{walletBalance.toLocaleString()} EUROe</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <p className="text-xs text-muted-foreground">Coste GdO/mes</p>
              <p className="text-xl font-bold text-green-600">{totalCostEuroe.toLocaleString()} EUROe</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-xs text-muted-foreground">Certificados Comprados</p>
              <p className="text-xl font-bold text-blue-600">{certificatesNeeded.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* ARIA Insight */}
        <div className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">ARIA Insight</p>
              <p className="text-sm text-muted-foreground">
                "El pago en EUROe permite que la transferencia de valor y el certificado de energía 
                <strong> ocurran en el mismo bloque de la blockchain</strong>. El Smart Contract se activa 
                automáticamente cuando el contador IoT detecta consumo, comprando certificados GdO verificados 
                y pagando en tiempo real. Conciliación contable instantánea."
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
