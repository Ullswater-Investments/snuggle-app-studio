import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, Database, Server, Globe, 
  Shield, Zap, Box, Link 
} from "lucide-react";

const techStack = {
  frontend: [
    { name: "React", version: "18.3.1", purpose: "Biblioteca de UI con hooks" },
    { name: "Vite", version: "Latest", purpose: "Bundler con HMR instantáneo" },
    { name: "TypeScript", version: "5.x", purpose: "Tipado estático" },
    { name: "Tailwind CSS", version: "3.x", purpose: "Sistema de diseño tokenizado" },
    { name: "Framer Motion", version: "12.23.24", purpose: "Animaciones declarativas" },
    { name: "Recharts", version: "2.15.4", purpose: "Visualización de datos" }
  ],
  backend: [
    { name: "PostgreSQL", version: "15.x", purpose: "Base de datos con RLS (28 tablas)" },
    { name: "Supabase Auth", version: "Latest", purpose: "Autenticación JWT" },
    { name: "Edge Functions", version: "Deno", purpose: "Serverless backend" },
    { name: "Realtime", version: "WebSockets", purpose: "Suscripciones en tiempo real" }
  ],
  web3: [
    { name: "Ethers.js", version: "6.16.0", purpose: "Interacción blockchain EVM" },
    { name: "Pontus-X", version: "Testnet", purpose: "Red blockchain Gaia-X" },
    { name: "EUROe Token", version: "ERC-20", purpose: "Stablecoin para pagos" },
    { name: "DID:ethr", version: "W3C", purpose: "Identificadores descentralizados" }
  ]
};

const apiEndpoints = [
  { method: "GET", path: "/api/v1/organizations", description: "Buscar organizaciones verificadas" },
  { method: "POST", path: "/api/v1/transactions", description: "Iniciar solicitud de datos" },
  { method: "GET", path: "/api/v1/wallet/balance", description: "Consultar saldo EUROe" },
  { method: "POST", path: "/api/v1/policies", description: "Crear política ODRL" },
  { method: "DELETE", path: "/api/v1/access/{id}", description: "Revocar acceso a recurso" }
];

export const TechnicalSpecs = () => {
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
            10 — Especificaciones Técnicas
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            Stack Tecnológico Completo
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            ITBID-X está construido sobre tecnologías modernas, probadas y de código abierto, 
            garantizando rendimiento, seguridad y mantenibilidad a largo plazo.
          </p>
        </motion.div>

        {/* Tech Stack Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-[hsl(var(--itbid-cyan)/0.3)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--itbid-cyan)/0.1)]">
                    <Code className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                  </div>
                  <CardTitle className="text-base">Frontend</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {techStack.frontend.map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{tech.name}</span>
                      <p className="text-xs text-muted-foreground">{tech.purpose}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{tech.version}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full border-[hsl(var(--itbid-lime)/0.3)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)]">
                    <Server className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                  </div>
                  <CardTitle className="text-base">Backend (BaaS)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {techStack.backend.map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{tech.name}</span>
                      <p className="text-xs text-muted-foreground">{tech.purpose}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{tech.version}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-[hsl(var(--itbid-purple)/0.3)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--itbid-purple)/0.1)]">
                    <Link className="h-5 w-5 text-[hsl(var(--itbid-purple))]" />
                  </div>
                  <CardTitle className="text-base">Web3 Layer</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {techStack.web3.map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{tech.name}</span>
                      <p className="text-xs text-muted-foreground">{tech.purpose}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{tech.version}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                <CardTitle className="text-base">Endpoints API Principales</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium">Método</th>
                      <th className="text-left py-2 px-3 font-medium">Endpoint</th>
                      <th className="text-left py-2 px-3 font-medium">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiEndpoints.map((endpoint, i) => (
                      <tr key={endpoint.path} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="py-2 px-3">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              endpoint.method === 'GET' ? 'border-[hsl(var(--itbid-lime)/0.5)] text-[hsl(var(--itbid-lime))]' :
                              endpoint.method === 'POST' ? 'border-[hsl(var(--itbid-cyan)/0.5)] text-[hsl(var(--itbid-cyan))]' :
                              'border-destructive/50 text-destructive'
                            }`}
                          >
                            {endpoint.method}
                          </Badge>
                        </td>
                        <td className="py-2 px-3 font-mono text-xs">{endpoint.path}</td>
                        <td className="py-2 px-3 text-muted-foreground">{endpoint.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
