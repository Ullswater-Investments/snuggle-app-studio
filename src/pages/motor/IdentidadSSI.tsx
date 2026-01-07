import { Link } from "react-router-dom";
import { ArrowLeft, Fingerprint, Shield, Zap, CheckCircle, BadgeCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function IdentidadSSI() {
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
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Fingerprint className="h-12 w-12 text-purple-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Identidad SSI</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Identidad Corporativa Descentralizada bajo el Trust Framework de Gaia-X
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interface Simulation - Digital Passport */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 to-purple-900/30 border-purple-500/30 overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-white/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-400" />
                    Pasaporte Digital Corporativo
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* DID Display */}
                <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
                  <p className="text-xs text-gray-400 mb-2">Identificador Descentralizado (DID)</p>
                  <p className="font-mono text-purple-400 text-sm break-all">
                    did:ethr:0x7ecc4a3b9f2d1e8c...4b2a
                  </p>
                </div>

                {/* Verified Attributes */}
                <div>
                  <p className="text-sm text-gray-400 mb-4">Atributos Verificados</p>
                  <div className="space-y-3">
                    {[
                      { label: "CIF Validado", issuer: "Agencia Tributaria", date: "2025-01-15" },
                      { label: "ISO 9001:2015", issuer: "AENOR", date: "2024-08-20" },
                      { label: "ISO 14001", issuer: "Bureau Veritas", date: "2024-11-01" },
                      { label: "Miembro PTIC", issuer: "Clúster PTIC", date: "2025-01-01" }
                    ].map((attr, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-3">
                          <BadgeCheck className="h-5 w-5 text-green-400" />
                          <div>
                            <p className="text-sm text-white font-medium">{attr.label}</p>
                            <p className="text-xs text-gray-500">por {attr.issuer}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Válido
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex gap-3">
                  <div className="flex-1 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 text-center">
                    <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs text-blue-400">Gaia-X Verified</p>
                  </div>
                  <div className="flex-1 p-4 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                    <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xs text-green-400">KYB Superado</p>
                  </div>
                  <div className="flex-1 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 text-center">
                    <Fingerprint className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-xs text-purple-400">SSI Activo</p>
                  </div>
                </div>
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
              <h2 className="text-2xl font-bold mb-4">Identidad Descentralizada (DID)</h2>
              <p className="text-gray-400 leading-relaxed">
                ProcureData implementa el estándar de Identificadores Descentralizados (DID) para garantizar que 
                cada organización sea la única dueña de su identidad y reputación. A diferencia de los modelos 
                centralizados, nuestra infraestructura genera automáticamente una identidad compatible con la 
                red Pontus-X.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                Esta identidad permite el intercambio de <strong className="text-white">Credenciales Verificables (VC)</strong>, 
                lo que significa que una vez que un proveedor es validado, ese atributo queda vinculado a su 
                identidad digital de forma inmutable.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-slate-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Protocolo", value: "Compatible con Trust Framework de Gaia-X" },
                  { label: "Estándar", value: "Identificadores Descentralizados (DID) de la W3C" },
                  { label: "Persistencia", value: "Anclaje inmutable en red blockchain Pontus-X" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
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
                    <h3 className="font-bold text-white mb-2">Solución al Problema nxm</h3>
                    <p className="text-gray-300">
                      El proveedor se valida <strong className="text-orange-400">UNA sola vez</strong> en el ecosistema. 
                      Su "Pasaporte Digital" es aceptado instantáneamente por cualquier nuevo cliente, 
                      reduciendo el tiempo de alta de <strong className="text-orange-400">3 semanas a milisegundos</strong>.
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
