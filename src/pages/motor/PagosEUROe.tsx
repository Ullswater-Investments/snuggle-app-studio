import { Link } from "react-router-dom";
import { ArrowLeft, Coins, Shield, Zap, CheckCircle, Clock, ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PagosEUROe() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-slate-950/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/#features" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al Motor
          </Link>
          <Badge variant="outline" className="border-purple-500 text-purple-400">Web3 & Blockchain</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 mb-6">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Coins className="h-12 w-12 text-yellow-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pagos EUROe</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Liquidación Instantánea en moneda regulada bajo normativa MiCA
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interface Simulation - Payment Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Comparison Chart */}
            <Card className="bg-white/5 border-white/10 overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-white/5">
                <CardTitle className="text-white">Comparativa de Tiempos</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Traditional */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Transferencia Tradicional</span>
                    <span className="text-red-400">3-5 días</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-600"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* EUROe */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Pago EUROe</span>
                    <span className="text-green-400">2 segundos</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      initial={{ width: 0 }}
                      animate={{ width: "2%" }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Modal Simulation */}
            <Card className="bg-gradient-to-br from-slate-900 to-yellow-900/20 border-yellow-500/30">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-yellow-400" />
                  Confirmación de Pago
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-center p-6 bg-black/30 rounded-xl">
                  <p className="text-sm text-gray-400 mb-2">Importe a Pagar</p>
                  <p className="text-5xl font-bold text-white">100.00 <span className="text-yellow-400">EUROe</span></p>
                  <p className="text-sm text-gray-500 mt-2">Servicio: Homologación Flash</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Red</span>
                    <span className="text-white">Pontus-X</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Tipo</span>
                    <span className="text-white">Escrow (Garantía)</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Hash Tx</span>
                    <span className="font-mono text-yellow-400 text-sm">0x9ab2...f123</span>
                  </div>
                </div>

                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                  <Coins className="h-4 w-4 mr-2" />
                  Confirmar Pago
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Dinero Electrónico Tokenizado</h2>
              <p className="text-gray-400 leading-relaxed">
                ProcureData elimina la fricción financiera de las transferencias bancarias tradicionales 
                (que tardan de 24 a 72 horas) mediante el uso de EUROe. El EUROe es dinero electrónico 
                tokenizado con paridad 1:1 con el euro físico, respaldado por depósitos bancarios auditados.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                Gracias a los <strong className="text-white">Smart Contracts</strong>, la plataforma permite 
                el modelo de Escrow (Garantía): el pago se bloquea en la blockchain y solo se libera al 
                proveedor una vez que el comprador ha recibido los datos verificados.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-br from-yellow-900/20 to-slate-900 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-yellow-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Tipo de Activo", value: "Token ERC-20 regulado por MiCA" },
                  { label: "Red", value: "Pontus-X (Ecosistema Gaia-X)" },
                  { label: "Tarifa Base", value: "1.00 EUROe por transacción (Tier Gratuito)" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">{spec.label}</p>
                      <p className="text-sm text-gray-400">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Benefit */}
            <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <Zap className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">Optimización del Circulante</h3>
                    <p className="text-gray-300">
                      Liquidación en tiempo real y <strong className="text-orange-400">conciliación contable automática</strong>. 
                      La trazabilidad "On-Chain" permite auditorías financieras instantáneas y elimina 
                      los errores de facturación manual.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1 border-white/20 hover:bg-white/10">
                <Link to="/auth">Probar Demo</Link>
              </Button>
              <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                <Link to="/architecture">Ver Arquitectura</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
