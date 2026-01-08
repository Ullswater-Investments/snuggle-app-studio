import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { 
  ArrowDownToLine, ArrowUpFromLine, Lock, Building2, 
  FileCode, Server, Database, Shield 
} from "lucide-react";

const odrlExamples = [
  { label: "Lectura de datos fiscales", enabled: true },
  { label: "Acceso en horario laboral", enabled: true },
  { label: "Propósito: homologación", enabled: true },
  { label: "Transferencia a terceros", enabled: false },
];

export const ArchitectureDiagram = () => {
  const [policies, setPolicies] = useState(odrlExamples);

  const togglePolicy = (index: number) => {
    setPolicies((prev) =>
      prev.map((p, i) => (i === index ? { ...p, enabled: !p.enabled } : p))
    );
  };

  return (
    <div className="py-16 px-4 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-[hsl(var(--itbid-purple))] uppercase tracking-wider">
            03 — Arquitectura Funcional
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            El Gateway ITBID-X
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            Un conector IDS/Gaia-X integrado nativamente en la infraestructura ITBID 
            que permite recibir y enviar datos de forma segura y trazable.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Gateway Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full p-6 border-[hsl(var(--itbid-cyan)/0.3)]">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-8">
                  <span className="itbid-gradient">itbid-x</span> Gateway
                </h3>
                
                <div className="relative w-full max-w-sm space-y-4">
                  {/* Consumer Connector */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-1 text-right">
                      <p className="font-medium text-sm">Datos Externos</p>
                      <p className="text-xs text-muted-foreground">Certificados ESG, Alertas</p>
                    </div>
                    <ArrowDownToLine className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                    <div className="w-24 h-12 rounded-lg bg-[hsl(var(--itbid-cyan)/0.1)] border-2 border-[hsl(var(--itbid-cyan))] flex items-center justify-center">
                      <span className="text-xs font-medium">Consumer</span>
                    </div>
                  </motion.div>

                  {/* Central Gateway */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="py-6 px-4 rounded-xl bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.15)] via-[hsl(var(--itbid-magenta)/0.15)] to-[hsl(var(--itbid-purple)/0.15)] border-2 border-[hsl(var(--itbid-cyan)/0.5)] text-center"
                  >
                    <Lock className="h-8 w-8 mx-auto mb-2 text-[hsl(var(--itbid-magenta))]" />
                    <p className="font-bold">
                      <span className="itbid-gradient">itbid-x</span> Connector
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Políticas ODRL · Auditoría · Cifrado E2E
                    </p>
                  </motion.div>

                  {/* Provider Connector */}
                  <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-24 h-12 rounded-lg bg-[hsl(var(--itbid-purple)/0.1)] border-2 border-[hsl(var(--itbid-purple))] flex items-center justify-center">
                      <span className="text-xs font-medium">Provider</span>
                    </div>
                    <ArrowUpFromLine className="h-5 w-5 text-[hsl(var(--itbid-purple))]" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Datos Agregados</p>
                      <p className="text-xs text-muted-foreground">Si el proveedor autoriza</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Data Embassy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full p-6 bg-gradient-to-br from-[hsl(var(--itbid-lime)/0.05)] to-transparent border-[hsl(var(--itbid-lime)/0.3)]">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[hsl(var(--itbid-lime)/0.1)]">
                    <Building2 className="h-6 w-6 text-[hsl(var(--itbid-lime))]" />
                  </div>
                  <div>
                    <CardTitle>Data Embassy para PYMEs</CardTitle>
                    <p className="text-sm text-muted-foreground">Servicio de Custodia Técnica</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <p className="text-muted-foreground text-sm">
                  Muchos proveedores PYME no tienen capacidad para gestionar su propio nodo Gaia-X. 
                  ITBID ofrece un servicio de "Embajada de Datos":
                </p>
                <ul className="space-y-3">
                  {[
                    { text: "Custodia en contenedor aislado (Sandbox)", color: "bg-[hsl(var(--itbid-cyan))]" },
                    { text: "El proveedor mantiene las llaves criptográficas", color: "bg-[hsl(var(--itbid-lime))]" },
                    { text: "Control total sobre políticas de acceso", color: "bg-[hsl(var(--itbid-magenta))]" },
                    { text: "ITBID provee infraestructura, no lee datos", color: "bg-[hsl(var(--itbid-purple))]" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color} mt-2 shrink-0`} />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ODRL Policy Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-[hsl(var(--itbid-magenta)/0.3)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileCode className="h-5 w-5 text-[hsl(var(--itbid-magenta))]" />
                  <CardTitle>Editor de Políticas ODRL</CardTitle>
                </div>
                <Badge variant="outline" className="border-[hsl(var(--itbid-cyan)/0.5)] text-[hsl(var(--itbid-cyan))]">
                  Demo Interactiva
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Contratos digitales que definen permisos, prohibiciones y obligaciones de forma ejecutable por máquinas
              </p>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm mb-4">
                <p className="text-muted-foreground mb-1">// Política de ejemplo</p>
                <p>"Permito a <span className="text-[hsl(var(--itbid-cyan))]">CompañíaX</span> leer mis datos fiscales..."</p>
              </div>
              <div className="space-y-3">
                {policies.map((policy, index) => (
                  <div
                    key={policy.label}
                    className="flex items-center justify-between p-3 rounded-lg bg-background border"
                  >
                    <span className="text-sm">{policy.label}</span>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={policy.enabled ? "default" : "destructive"}
                        className={policy.enabled ? "bg-[hsl(var(--itbid-lime))] text-[hsl(var(--itbid-navy))]" : ""}
                      >
                        {policy.enabled ? "Permitido" : "Prohibido"}
                      </Badge>
                      <Switch
                        checked={policy.enabled}
                        onCheckedChange={() => togglePolicy(index)}
                      />
                    </div>
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
