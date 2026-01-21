import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cpu, Brain, Shield, Coins } from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import FederatedLearningVisual from "@/components/partners/seres/visuals/FederatedLearningVisual";
import CredentialFlowVisual from "@/components/partners/seres/visuals/CredentialFlowVisual";
import TokenizationVisual from "@/components/partners/seres/visuals/TokenizationVisual";

const SeresFuncionalidades = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/partners/seres/miembros")} className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Funcionalidades Avanzadas</h1>
                <p className="text-xs text-slate-400">IA Federada, SSI, DeFi</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Federated Learning */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-emerald-400" />
                <div>
                  <CardTitle className="text-xl text-white">IA Federada (Federated Learning)</CardTitle>
                  <p className="text-sm text-slate-400">Entrenamiento colaborativo sin compartir datos sensibles</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">Permite entrenar modelos de IA colaborativos donde los datos nunca salen de las premisas de cada participante. Solo viajan los gradientes del modelo, no la información sensible.</p>
              <FederatedLearningVisual />
              <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <h4 className="font-semibold text-emerald-300 mb-2">Casos de Uso</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• <span className="text-white">Detección de Fraude IVA:</span> Modelo colaborativo entre empresas sin centralizar facturas</li>
                  <li>• <span className="text-white">Covirán:</span> Predicción de demanda federada entre cooperativistas</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* SSI / Verifiable Credentials */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-400" />
                <div>
                  <CardTitle className="text-xl text-white">Identidad Soberana (SSI)</CardTitle>
                  <p className="text-sm text-slate-400">Credenciales Verificables para certificación automática</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">SERES puede emitir Credenciales Verificables (VCs) que certifiquen atributos de empresas y transacciones, transformando el cumplimiento en un activo digital reutilizable.</p>
              <CredentialFlowVisual />
              <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <h4 className="font-semibold text-blue-300 mb-2">Caso Ilunion</h4>
                <p className="text-sm text-slate-400">Cada factura de Ilunion lleva una VC certificando el impacto social del servicio. El ERP del cliente valida automáticamente y alimenta el dashboard CSRD sin auditorías manuales.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* DeFi / Tokenization */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Coins className="h-8 w-8 text-pink-400" />
                <div>
                  <CardTitle className="text-xl text-white">DeFi y Tokenización</CardTitle>
                  <p className="text-sm text-slate-400">Financiación de facturas mediante activos digitales</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">Mediante la tokenización de facturas como NFTs y la integración de la stablecoin EURAU, SERES habilita un mercado de financiación automatizado con liquidación atómica.</p>
              <TokenizationVisual />
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default SeresFuncionalidades;
