import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ShoppingBag, 
  ShieldCheck, 
  Globe,
  Users,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Bot,
  TrendingUp
} from "lucide-react";

interface RetailEthicsAuditProps {
  totalSuppliers?: number;
  complianceRate?: number;
}

export function RetailEthicsAudit({ 
  totalSuppliers = 200,
  complianceRate = 98.5
}: RetailEthicsAuditProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Regional distribution
  const regions = [
    { name: "Asia-Pacífico", suppliers: 120, compliance: 97.5, color: "bg-blue-500" },
    { name: "Europa", suppliers: 45, compliance: 100, color: "bg-emerald-500" },
    { name: "América Latina", suppliers: 25, compliance: 96, color: "bg-amber-500" },
    { name: "África", suppliers: 10, compliance: 100, color: "bg-purple-500" }
  ];

  // Audit metrics
  const auditsCompleted = Math.round(totalSuppliers * 0.95);
  const certificationsValid = Math.round(totalSuppliers * complianceRate / 100);
  const pendingRenewal = Math.round(totalSuppliers * 0.03);
  const incidents = Math.round(totalSuppliers * (100 - complianceRate) / 100);
  const consumerTrustIncrease = 25;

  return (
    <Card className="border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50/50 to-sky-50/50 dark:from-blue-950/30 dark:to-sky-950/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-500" />
            Dashboard de Auditoría Ética SA8000
          </CardTitle>
          <Badge variant="outline" className="text-[10px] bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Audit Trail Blockchain
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{totalSuppliers}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Proveedores Auditados</p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <FileCheck className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">{complianceRate}%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Cumplimiento SA8000</p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <AlertCircle className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
            <p className="text-2xl font-bold text-emerald-600">{incidents}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Incidencias Éticas</p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl p-4 text-center shadow-sm">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-violet-500" />
            <p className="text-2xl font-bold text-violet-600">+{consumerTrustIncrease}%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Confianza Consumidor</p>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white dark:bg-card rounded-xl p-4 shadow-sm">
          <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            Distribución Regional de Proveedores
          </h4>
          
          <div className="space-y-3">
            {regions.map((region) => (
              <div 
                key={region.name}
                className={`p-3 rounded-lg transition-all cursor-pointer ${
                  hoveredRegion === region.name 
                    ? 'bg-blue-100 dark:bg-blue-900/50 ring-2 ring-blue-500' 
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
                onMouseEnter={() => setHoveredRegion(region.name)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${region.color.replace('bg-', 'text-')}`} />
                    <span className="font-medium text-sm">{region.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{region.suppliers} proveedores</span>
                    <Badge 
                      variant={region.compliance === 100 ? "default" : "secondary"}
                      className={`text-[10px] ${region.compliance === 100 ? 'bg-green-500' : ''}`}
                    >
                      {region.compliance}%
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={(region.suppliers / totalSuppliers) * 100} 
                  className={`h-2 [&>div]:${region.color}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Certification Status */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-card rounded-xl p-4 shadow-sm text-center">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-xl font-bold text-green-600">{certificationsValid}</p>
            <p className="text-xs text-muted-foreground">Certificaciones Válidas</p>
          </div>
          
          <div className="bg-white dark:bg-card rounded-xl p-4 shadow-sm text-center">
            <FileCheck className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-xl font-bold text-blue-600">{auditsCompleted}</p>
            <p className="text-xs text-muted-foreground">Auditorías Completadas</p>
          </div>
          
          <div className="bg-white dark:bg-card rounded-xl p-4 shadow-sm text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-amber-500" />
            <p className="text-xl font-bold text-amber-600">{pendingRenewal}</p>
            <p className="text-xs text-muted-foreground">Pendientes Renovación</p>
          </div>
        </div>

        {/* ARIA Insight */}
        <div className="bg-gradient-to-r from-blue-100 to-sky-100 dark:from-blue-900/40 dark:to-sky-900/40 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">ARIA Insight</p>
              <p className="text-sm text-muted-foreground">
                "La trazabilidad blockchain en Pontus-X garantiza que cada certificado SA8000 
                <strong> no ha sido manipulado desde su emisión en origen</strong>. Las políticas ODRL 
                permiten que solo el comité de ética de GlobalRetail acceda a los informes detallados, 
                protegiendo la privacidad competitiva del proveedor mientras garantizan cumplimiento total."
              </p>
            </div>
          </div>
        </div>

        {/* Compliance Benefits */}
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">Cumplimiento CSDDD</p>
              <p className="text-xs text-muted-foreground">Directiva de Debida Diligencia en Cadena de Suministro</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-700 dark:text-blue-300">Riesgo Reputacional: 0</p>
              <p className="text-xs text-muted-foreground">Verificación continua elimina sorpresas en auditorías</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
