import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Key, Link2, FolderOpen, Check, X } from "lucide-react";

const pillars = [
  {
    icon: Key,
    title: "Identidad Soberana (SSI)",
    description: "Identificadores Descentralizados (DIDs) que permiten a cada organización probar su identidad sin depender de autoridades centralizadas.",
    color: "itbid-cyan",
    features: ["DID:ethr estándar W3C", "Verificación on-chain", "Credenciales Verificables"]
  },
  {
    icon: Link2,
    title: "Conectores de Datos (EDC)",
    description: "Eclipse Dataspace Connector para comunicación segura entre participantes del espacio de datos.",
    color: "itbid-lime",
    features: ["Protocolo IDS/AAS", "Negociación automatizada", "Transfer push/pull"]
  },
  {
    icon: FolderOpen,
    title: "Catálogos Federados",
    description: "Metadatos publicados siguiendo vocabulario DCAT que permiten descubrimiento de activos de datos.",
    color: "itbid-purple",
    features: ["Vocabulario DCAT-AP", "Búsqueda federada", "Clasificación semántica"]
  }
];

const comparison = [
  { feature: "Control sobre acceso", traditional: false, federated: true },
  { feature: "Trazabilidad inmutable", traditional: false, federated: true },
  { feature: "Interoperabilidad nativa", traditional: false, federated: true },
  { feature: "Cumplimiento GDPR", traditional: "Parcial", federated: true },
  { feature: "Revocación instantánea", traditional: false, federated: true },
  { feature: "Dependencia de terceros", traditional: true, federated: false },
];

export const GaiaXContext = () => {
  return (
    <div className="py-16 px-4 bg-muted/30 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-[hsl(var(--itbid-lime))] uppercase tracking-wider">
            02 — Contexto Tecnológico
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            ¿Qué es Gaia-X?
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            Gaia-X es la iniciativa europea para crear una infraestructura de datos federada, 
            segura y soberana. Define estándares que permiten a las organizaciones compartir 
            datos manteniendo el control total sobre su información.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full border-[hsl(var(--${pillar.color})/0.3)] hover:border-[hsl(var(--${pillar.color}))] transition-colors`}>
                <CardHeader>
                  <div className={`p-3 rounded-xl bg-[hsl(var(--${pillar.color})/0.1)] w-fit`}>
                    <pillar.icon className={`h-6 w-6 text-[hsl(var(--${pillar.color}))]`} />
                  </div>
                  <CardTitle className="text-lg">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{pillar.description}</p>
                  <div className="space-y-1.5">
                    {pillar.features.map((feature) => (
                      <Badge 
                        key={feature} 
                        variant="outline" 
                        className={`text-xs border-[hsl(var(--${pillar.color})/0.3)]`}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                <CardTitle>Data Lake Tradicional vs Espacio Federado</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Característica</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Data Lake</th>
                      <th className="text-center py-3 px-4 font-medium text-[hsl(var(--itbid-lime))]">Espacio Federado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="py-3 px-4">{row.feature}</td>
                        <td className="py-3 px-4 text-center">
                          {row.traditional === true ? (
                            <Check className="h-4 w-4 text-amber-500 mx-auto" />
                          ) : row.traditional === false ? (
                            <X className="h-4 w-4 text-destructive mx-auto" />
                          ) : (
                            <span className="text-amber-500">{row.traditional}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {row.federated === true ? (
                            <Check className="h-4 w-4 text-[hsl(var(--itbid-lime))] mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground mx-auto" />
                          )}
                        </td>
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
