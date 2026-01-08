import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, Lock, Key, Fingerprint, 
  Database, Globe, Link, CheckCircle2 
} from "lucide-react";

const securityLayers = [
  {
    layer: "Web2 (Supabase)",
    icon: Database,
    color: "itbid-cyan",
    features: [
      { name: "Row Level Security (RLS)", desc: "28 tablas con políticas de aislamiento" },
      { name: "JWT Authentication", desc: "Tokens firmados con rotación automática" },
      { name: "Role-Based Access Control", desc: "admin, approver, viewer, api_configurator" },
      { name: "Audit Logs", desc: "Registro completo de todas las acciones" }
    ]
  },
  {
    layer: "Web3 (Pontus-X)",
    icon: Link,
    color: "itbid-purple",
    features: [
      { name: "Identificadores Descentralizados (DIDs)", desc: "did:ethr:0x7ecc:0x..." },
      { name: "Trazabilidad Inmutable", desc: "Hash de transacciones en blockchain" },
      { name: "EUROe Token (ERC-20)", desc: "Pagos verificables on-chain" },
      { name: "Revocación On-Chain", desc: "Registro inmutable de accesos revocados" }
    ]
  }
];

const trustFramework = [
  {
    icon: Fingerprint,
    title: "Self-Description",
    description: "Archivo firmado que certifica cumplimiento de seguridad y legalidad. Requisito obligatorio para todos los participantes."
  },
  {
    icon: CheckCircle2,
    title: "Verificación Automática",
    description: "La plataforma valida las Self-Descriptions antes de permitir operaciones en el espacio de datos."
  },
  {
    icon: Globe,
    title: "Compatibilidad Catena-X",
    description: "Interoperabilidad con el ecosistema automotriz europeo y otros verticales industriales."
  }
];

const networkConfig = {
  chainId: "0x7ECC (32460)",
  chainName: "Pontus-X Testnet",
  rpcUrl: "https://rpc.dev.pontus-x.eu",
  explorer: "https://explorer.pontus-x.eu",
  nativeToken: "GX",
  stablecoin: "EUROe (ERC-20)"
};

export const SecurityFramework = () => {
  return (
    <div className="py-16 px-4 bg-muted/30 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-[hsl(var(--itbid-purple))] uppercase tracking-wider">
            06 — Seguridad y Trust Framework
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            Arquitectura de Confianza Híbrida
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            ITBID-X combina la seguridad probada de infraestructuras Web2 con la 
            inmutabilidad y descentralización de Web3 para crear un entorno de 
            máxima confianza.
          </p>
        </motion.div>

        {/* Security Layers */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {securityLayers.map((layer, index) => (
            <motion.div
              key={layer.layer}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full border-[hsl(var(--${layer.color})/0.3)]`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-[hsl(var(--${layer.color})/0.1)]`}>
                      <layer.icon className={`h-6 w-6 text-[hsl(var(--${layer.color}))]`} />
                    </div>
                    <CardTitle>{layer.layer}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {layer.features.map((feature) => (
                    <div key={feature.name} className="flex items-start gap-3">
                      <Shield className={`h-4 w-4 text-[hsl(var(--${layer.color}))] shrink-0 mt-0.5`} />
                      <div>
                        <p className="text-sm font-medium">{feature.name}</p>
                        <p className="text-xs text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Framework Gaia-X */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                <CardTitle>Trust Framework Gaia-X</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Basado en las reglas de Gaia-X para garantizar confianza en el ecosistema europeo
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {trustFramework.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-lg bg-muted/50"
                  >
                    <item.icon className="h-5 w-5 text-[hsl(var(--itbid-lime))] mb-3" />
                    <p className="font-medium text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Network Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[hsl(var(--itbid-purple)/0.1)] to-[hsl(var(--itbid-cyan)/0.1)]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Configuración de Red Pontus-X</CardTitle>
                <Badge variant="outline" className="border-[hsl(var(--itbid-purple)/0.5)]">
                  Blockchain
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 md:grid-cols-3">
                {Object.entries(networkConfig).map(([key, value], i) => (
                  <div
                    key={key}
                    className={`p-4 ${i % 2 === 0 ? 'bg-muted/30' : ''} border-b md:border-r last:border-r-0`}
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm font-mono break-all">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
