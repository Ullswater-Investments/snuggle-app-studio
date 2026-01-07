import { Database, ShieldCheck, Cpu, Zap, CheckCircle2, Globe, Link2 } from "lucide-react";
import { motion } from "framer-motion";

const CertifiedSystemsTable = () => {
  const systems = [
    { name: "SAP S/4HANA", provider: "SAP SE", method: "OData / REST API", type: "Nativo", status: "Certificado" },
    { name: "Microsoft Dynamics 365", provider: "Microsoft", method: "Dataverse / Webhooks", type: "Nativo", status: "Certificado" },
    { name: "Oracle Cloud ERP", provider: "Oracle Corp", method: "REST API / SOAP", type: "Middleware", status: "Certificado" },
    { name: "Sage Business Cloud", provider: "Sage Group", method: "API REST", type: "Nativo", status: "Activo" },
    { name: "NetSuite", provider: "Oracle", method: "SuiteTalk (Web Services)", type: "Nativo", status: "Certificado" }
  ];

  return (
    <div className="mt-12 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-xl font-bold text-foreground">Ecosistema de Sistemas Certificados</h3>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.2)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-muted border-b border-slate-200 dark:border-slate-700">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Sistema ERP</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Método de Conexión</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 text-center">Tipo</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {systems.map((system, index) => (
                <tr 
                  key={index} 
                  className={`group hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-colors ${
                    index % 2 === 0 ? 'bg-slate-50 dark:bg-white/[0.02]' : 'bg-white dark:bg-transparent'
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-muted flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground">{system.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-500">{system.provider}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                      <Link2 className="w-3 h-3 text-primary" />
                      {system.method}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ${
                      system.type === 'Nativo' 
                        ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' 
                        : 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400'
                    }`}>
                      {system.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <Zap className="w-3 h-3 animate-pulse" />
                      {system.status}
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground italic text-center mt-4">
        * Si su sistema no aparece en la lista, nuestro equipo técnico puede desarrollar un conector a medida basado en el estándar IDS en menos de 10 días laborables.
      </p>
    </div>
  );
};

const SectionERPConnectors = () => {
  return (
    <motion.section 
      id="erp-connectors-detail" 
      className="py-12 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-12">
        
        {/* Header de Sección */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-500 font-bold mb-1">Detalle Técnico Avanzado</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              V. Conectividad e Integración (Conectores ERP)
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Lado Izquierdo: Explicación Técnica */}
          <div className="flex-1 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nuestra capa de integración actúa como un puente inteligente. Traducimos los 
              <span className="text-foreground font-semibold"> Pasaportes Digitales</span> y las facturas 
              notarizadas en blockchain al lenguaje nativo de su sistema de gestión, eliminando la 
              carga manual de datos y garantizando que su ERP sea siempre la 
              <span className="text-blue-600 dark:text-blue-400"> fuente única de verdad</span>.
            </p>

            <div className="space-y-4">
              {/* Cards con sombra en light, glow en dark */}
              <div className="flex gap-4 p-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-primary/20 rounded-2xl shadow-md dark:shadow-none dark:drop-shadow-[0_0_8px_rgba(249,115,22,0.15)]">
                <Cpu className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-foreground font-bold">Mapeo Semántico JSON-LD</h4>
                  <p className="text-sm text-muted-foreground">Conversión automática de esquemas IDSA a tablas relacionales de SAP u Oracle.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-green-500/20 rounded-2xl shadow-md dark:shadow-none dark:drop-shadow-[0_0_8px_rgba(34,197,94,0.15)]">
                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-foreground font-bold">Webhooks Seguros</h4>
                  <p className="text-sm text-muted-foreground">Notificaciones asíncronas cifradas que disparan procesos de alta de proveedores en tiempo real.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-blue-500/20 rounded-2xl shadow-md dark:shadow-none dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.15)]">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
                <div>
                  <h4 className="text-foreground font-bold">Sincronización Bidireccional</h4>
                  <p className="text-sm text-muted-foreground">Los cambios en su ERP se reflejan en ProcureData y viceversa, manteniendo consistencia total.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 p-6 rounded-2xl">
              <h4 className="text-green-700 dark:text-green-400 font-bold mb-2">Impacto en Productividad</h4>
              <p className="text-slate-700 dark:text-foreground/80 italic text-sm leading-relaxed">
                "Reduzca el tiempo de alta de proveedores de días a minutos. El equipo de compras 
                puede enfocarse en negociación estratégica mientras el sistema automatiza la 
                verificación y sincronización de datos."
              </p>
            </div>
          </div>

          {/* Lado Derecho: Diagrama de Flujo Adaptativo */}
          <div className="flex-1 bg-slate-50 dark:bg-background/20 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-lg dark:shadow-none">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col gap-8">
              
              {/* Paso 1: Origen - Nodo adaptativo */}
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-600/20 border border-blue-300 dark:border-blue-500 rounded-xl flex items-center justify-center shadow-lg dark:shadow-none dark:drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                  <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-500 font-bold">Origen: ProcureData</div>
                  <div className="text-sm text-foreground font-mono">Dato Soberano Verificado</div>
                </div>
              </div>

              {/* Conector con animación adaptativa */}
              <div className="ml-7 h-10 border-l-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full ml-[-7px] animate-bounce shadow-md dark:shadow-none dark:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
              </div>

              {/* Paso 2: Transformación */}
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-orange-50 dark:bg-primary/20 border border-orange-300 dark:border-primary rounded-xl flex items-center justify-center animate-pulse shadow-lg dark:shadow-none dark:drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]">
                  <Cpu className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-primary font-bold">Proceso: Universal Mapper</div>
                  <div className="text-xs text-muted-foreground font-mono">JSON-LD ⮕ SQL_INSERT</div>
                </div>
              </div>

              {/* Conector 2 */}
              <div className="ml-7 h-10 border-l-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center">
                 <div className="w-3 h-3 bg-blue-500 rounded-full ml-[-7px] animate-ping"></div>
              </div>

              {/* Paso 3: Destino (ERP) */}
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-green-50 dark:bg-green-600/20 border border-green-300 dark:border-green-500 rounded-xl flex items-center justify-center shadow-lg dark:shadow-none dark:drop-shadow-[0_0_12px_rgba(34,197,94,0.3)]">
                  <Database className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-green-600 dark:text-green-500 font-bold">Destino: Sistema Enterprise</div>
                  <div className="flex items-center gap-2">
                     <span className="text-sm text-foreground font-mono">SAP S/4HANA</span>
                     <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Badge de estado */}
              <div className="mt-4 p-3 bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-mono text-slate-700 dark:text-slate-300">INTEGRATION_CHANNEL: ACTIVE</span>
                </div>
                <span className="text-[9px] text-muted-foreground">Latency: 42ms</span>
              </div>

            </div>
          </div>
        </div>

        {/* Tabla de Sistemas Certificados */}
        <CertifiedSystemsTable />

      </div>
    </motion.section>
  );
};

export default SectionERPConnectors;
