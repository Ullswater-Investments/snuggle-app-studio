import { Link } from "react-router-dom";
import { Wallet, Shield, Zap, CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import { MotorNavigation } from "@/components/MotorNavigation";

export default function WalletWeb3() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GlobalNavigation />
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <span className="procuredata-gradient font-bold text-xl">PROCUREDATA</span>
            </Link>
          </div>
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
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Wallet className="h-12 w-12 text-purple-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wallet Web3</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gestión de Activos Soberanos mediante firma digital corporativa
          </p>
          <MotorNavigation currentPath="/motor/wallet-web3" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interface Simulation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card dark:bg-white/5 border-border dark:border-white/10 overflow-hidden">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted/50 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-purple-400" />
                    ProcureData Wallet
                  </CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Conectada</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Balance Display */}
                <div className="bg-gradient-to-br from-purple-900/40 to-muted dark:to-slate-900 rounded-xl p-6 border border-purple-500/20">
                  <p className="text-sm text-muted-foreground mb-1">Balance Total</p>
                  <p className="text-4xl font-bold text-foreground">12,500.00 <span className="text-purple-400">EUROe</span></p>
                  <p className="text-sm text-muted-foreground/70 mt-2">≈ 12,500.00 EUR</p>
                </div>

                {/* Network Info */}
                <div className="flex items-center justify-between p-4 bg-muted dark:bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Red</p>
                    <p className="font-medium text-foreground">Pontus-X (Gaia-X)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Chain ID</p>
                    <p className="font-mono text-foreground">32456</p>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Transacciones Recientes</p>
                  <div className="space-y-2">
                    {[
                      { type: "Pago Servicio", amount: "-500.00", hash: "0x7ecc...a4b2" },
                      { type: "Recepción Datos", amount: "+1,200.00", hash: "0x3df1...c8e9" },
                      { type: "Homologación", amount: "-150.00", hash: "0x9ab2...f123" }
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted dark:bg-white/5 rounded-lg hover:bg-accent dark:hover:bg-white/10 transition-colors cursor-pointer">
                        <div>
                          <p className="text-sm text-foreground">{tx.type}</p>
                          <p className="text-xs text-muted-foreground font-mono">{tx.hash}</p>
                        </div>
                        <p className={`font-medium ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.amount} EUROe
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver en Explorador de Bloques
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
              <h2 className="text-2xl font-bold mb-4">Tu Puerta de Acceso Soberana</h2>
              <p className="text-muted-foreground leading-relaxed">
                El motor de ProcureData está diseñado para no ser intrusivo. La Wallet Web3 permite a las empresas 
                firmar transacciones con su llave privada, garantizando que nadie más pueda mover sus fondos o 
                autorizar datos. No hay usuario/contraseña tradicional.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                A través de la firma EIP-712, las empresas pueden firmar contratos legales digitales con la certeza 
                criptográfica de que su identidad es verificable y no repudiable.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-muted dark:to-slate-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Protocolo", value: "Firma EIP-712 para contratos legales digitales" },
                  { label: "Compatibilidad", value: "MetaMask, WalletConnect, Custodia Institucional" },
                  { label: "Red", value: "Pontus-X (Ecosistema Gaia-X)" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{spec.label}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
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
                    <h3 className="font-bold text-foreground mb-2">Beneficio de Negocio</h3>
                    <p className="text-muted-foreground">
                      <strong className="text-orange-400">Elimina la dependencia de intermediarios bancarios</strong> para 
                      la validación de transacciones internacionales. Liquidación instantánea sin comisiones SWIFT.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1">
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
