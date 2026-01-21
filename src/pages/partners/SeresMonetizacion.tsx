import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Coins, TrendingUp, BarChart3 } from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const SeresMonetizacion = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  const comparisonData = [
    { feature: "Rol de SERES", traditional: "Intermediario de transmisión", pontusx: "Oráculo de datos y facilitador de mercado" },
    { feature: "Flujo de Datos", traditional: "Lineal: Proveedor → SERES → Cliente", pontusx: "Multidireccional: C2D con Bancos, Auditores, Inversores" },
    { feature: "Privacidad", traditional: "Contratos legales + seguridad perimetral", pontusx: "Criptografía, C2D, Zero-Knowledge Proofs" },
    { feature: "Monetización", traditional: "Por volumen (docs) o suscripción", pontusx: "Por transacción, por compute, por venta de token" },
    { feature: "Valor Cliente", traditional: "Eficiencia operativa + compliance", pontusx: "Acceso a liquidez + certificación automática" }
  ];

  const revenueDiagram = `
pie title Nuevas Fuentes de Ingreso PROCUREDATA
    "Tarifas C2D (€/ejecución)" : 35
    "Comisiones DeFi (0.05-0.10%)" : 25
    "Venta de Índices Agregados" : 20
    "Emisión de VCs (KYB)" : 15
    "Servicios ESG Automatizados" : 5
`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/partners/seres/miembros")} className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Coins className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Modelos de Negocio</h1>
                <p className="text-xs text-slate-400">Nuevos mecanismos de monetización</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Comparativa: Modelo Tradicional vs Pontus-X
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Característica</th>
                      <th className="text-left py-3 px-4 text-red-400 font-medium">Modelo Tradicional</th>
                      <th className="text-left py-3 px-4 text-emerald-400 font-medium">Modelo Pontus-X</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={i} className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-white font-medium">{row.feature}</td>
                        <td className="py-3 px-4 text-slate-400">{row.traditional}</td>
                        <td className="py-3 px-4 text-slate-300">{row.pontusx}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Distribución de Nuevos Ingresos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={revenueDiagram} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/30">
            <CardContent className="pt-6">
              <p className="text-center text-slate-300">
                Una sola factura que antes generaba un ingreso único por transmisión, ahora puede generar <span className="text-emerald-400 font-semibold">múltiples eventos de ingresos</span> a lo largo de su ciclo de vida: al ser financiada, al ser auditada para ESG, y al ser utilizada para scoring de riesgo.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default SeresMonetizacion;
