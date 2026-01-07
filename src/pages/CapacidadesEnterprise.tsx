import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Wallet, 
  Fingerprint, 
  Coins, 
  Activity, 
  BellRing, 
  Gavel, 
  Database, 
  History, 
  Network, 
  PlugZap, 
  Cpu, 
  Map, 
  BookOpenCheck,
  ChevronUp,
  Shield,
  Zap,
  Globe,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const capacidades = [
  {
    id: "wallet-web3",
    seccion: "Web3 & Blockchain",
    seccionColor: "from-emerald-500 to-teal-600",
    icon: Wallet,
    titulo: "Wallet Web3: Gestión de Activos Soberanos",
    descripcion: "Puerta de acceso descentralizada. La empresa firma transacciones mediante el estándar EIP-712, eliminando usuarios/contraseñas tradicionales por identidades criptográficas.",
    interfaz: "Panel lateral derecho con integración MetaMask. Visualización de balances en GX y EUROe. Botón de 'Firmar con Llave Privada'.",
    specs: ["Protocolo WalletConnect", "Firma digital asimétrica EIP-712", "Balance on-chain en tiempo real"],
    impacto: "Elimina la dependencia de intermediarios bancarios para la validación de transacciones internacionales.",
    ruta: "/motor/wallet-web3"
  },
  {
    id: "identidad-ssi",
    seccion: "Web3 & Blockchain",
    seccionColor: "from-emerald-500 to-teal-600",
    icon: Fingerprint,
    titulo: "Identidad SSI (Self-Sovereign Identity)",
    descripcion: "La empresa es dueña de su reputación. Las validaciones (Credenciales Verificables) acompañan al DID del proveedor en todo el ecosistema europeo.",
    interfaz: "Tarjeta de Identidad Digital Corporativa con código DID (did:ethr:0x...). Sellos dinámicos de 'Verificado por Gaia-X' e 'ISO 9001 Activa'.",
    specs: ["Estándar W3C DID", "Compatible con Trust Framework de Gaia-X", "Credenciales Verificables (VC)"],
    impacto: "Solución al problema nxm: El proveedor se valida UNA sola vez. Su 'Pasaporte Digital' es aceptado instantáneamente por cualquier nuevo cliente.",
    ruta: "/motor/identidad-ssi"
  },
  {
    id: "pagos-euroe",
    seccion: "Web3 & Blockchain",
    seccionColor: "from-emerald-500 to-teal-600",
    icon: Coins,
    titulo: "Pagos EUROe: Liquidación Instantánea",
    descripcion: "Stablecoin regulada bajo normativa MiCA. Implementa modelos de Escrow: el pago se libera al proveedor solo tras la entrega exitosa del dato.",
    interfaz: "Modal de pago con precio en EUROe. Gráfico comparativo de velocidad: Bancario (48h) vs ProcureData (2s).",
    specs: ["Token ERC-20 regulado MiCA", "Red Pontus-X (Gaia-X)", "Paridad 1:1 con el Euro físico"],
    impacto: "Optimización del flujo de caja mediante pagos programables y automáticos con liquidación en tiempo real.",
    ruta: "/motor/pagos-euroe"
  },
  {
    id: "activity-feed",
    seccion: "Tiempo Real",
    seccionColor: "from-blue-500 to-indigo-600",
    icon: Activity,
    titulo: "Activity Feed: El Pulso del Ecosistema",
    descripcion: "Monitorización total del ciclo de vida de los datos. Cada evento genera una prueba de existencia instantánea.",
    interfaz: "Ticker vertical dinámico. Iconos de colores: Verde (Actualización), Azul (Pago realizado), Naranja (Contrato firmado).",
    specs: ["Arquitectura WebSockets de baja latencia", "Persistencia blockchain", "Filtrado por categoría y criticidad"],
    impacto: "Visibilidad 360°: Elimine los puntos ciegos en la cadena de suministro. Reaccione instantáneamente ante cambios de estado.",
    ruta: "/motor/activity-feed"
  },
  {
    id: "smart-alerts",
    seccion: "Tiempo Real",
    seccionColor: "from-blue-500 to-indigo-600",
    icon: BellRing,
    titulo: "Smart Alerts: Prevención de Riesgos",
    descripcion: "Inteligencia proactiva. El motor monitoriza fechas de caducidad y cumplimiento 24/7, notificando antes de que el riesgo impacte en la producción.",
    interfaz: "Panel con indicadores radiales de riesgo. Alerta destacada: 'Seguro de RC próximo a caducar para 12 proveedores'.",
    specs: ["Motor de reglas en Edge Functions", "Alertas vía Webhooks y Email", "Umbrales personalizables por sector"],
    impacto: "Mitigación de Riesgos: Reduzca a cero el riesgo de trabajar con proveedores con documentación caducada.",
    ruta: "/motor/smart-alerts"
  },
  {
    id: "gobernanza-odrl",
    seccion: "Seguridad",
    seccionColor: "from-red-500 to-rose-600",
    icon: Gavel,
    titulo: "Gobernanza ODRL: Contratos de Datos",
    descripcion: "Soberanía técnica. El conector EDC bloquea accesos no autorizados basándose en contratos digitales legibles por máquina (ODRL).",
    interfaz: "Editor visual de interruptores (Solo Lectura, No Descargar). Ventana de código lateral mostrando el JSON-LD de la política.",
    specs: ["Estándar ODRL 2.2 (W3C)", "Lógica de ejecución distribuida", "Permissions, Prohibitions y Duties"],
    impacto: "Blindaje Jurídico-Técnico: Asegure que su propiedad intelectual se utilice únicamente para el fin pactado.",
    ruta: "/motor/gobernanza-odrl"
  },
  {
    id: "multi-tenant-rls",
    seccion: "Seguridad",
    seccionColor: "from-red-500 to-rose-600",
    icon: Database,
    titulo: "Multi-Tenant RLS: Aislamiento de Datos",
    descripcion: "Seguridad por diseño. Políticas de Row Level Security integradas en la capa de datos de PostgreSQL para garantizar privacidad total.",
    interfaz: "Diagrama de 'Cámaras Acorazadas' digitales. Visualización de cómo la Empresa A no puede acceder a la fila de datos de la Empresa B.",
    specs: ["PostgreSQL RLS nativo", "Validación mediante tokens JWT", "Logs de acceso individuales"],
    impacto: "Confianza Total: Colabore en un espacio compartido con la certeza de que sus secretos comerciales están blindados.",
    ruta: "/motor/multi-tenant-rls"
  },
  {
    id: "audit-logs",
    seccion: "Seguridad",
    seccionColor: "from-red-500 to-rose-600",
    icon: History,
    titulo: "Audit Logs: Transparencia Inmutable",
    descripcion: "Registro inalterable. Cada acceso queda notarizado en blockchain, facilitando auditorías legales y cumplimiento CSRD/ISO.",
    interfaz: "Tabla de logs detallada con columna de 'Hash de Verificación'. Enlace directo al explorador de bloques de Pontus-X.",
    specs: ["Cifrado SHA-256", "Anclaje en Layer 1 Blockchain", "Explorador de bloques integrado"],
    impacto: "Evidencia Legal: Reduzca drásticamente el coste y tiempo de las auditorías de cumplimiento.",
    ruta: "/motor/audit-logs"
  },
  {
    id: "modelo-idsa",
    seccion: "Seguridad",
    seccionColor: "from-red-500 to-rose-600",
    icon: Network,
    titulo: "Modelo IDSA: Interoperabilidad Europea",
    descripcion: "Alineamiento total con la International Data Spaces Association. Garantiza que tu infraestructura sea compatible con el futuro de los datos en Europa.",
    interfaz: "Mapa de nodos conectando a ProcureData con otros Data Spaces europeos. Diagrama de roles: Consumer, Subject, Holder.",
    specs: ["Arquitectura IDS-RAM", "Compatible con Gaia-X", "Roles definidos (Consumer, Subject, Holder)"],
    impacto: "Interoperabilidad Futura: Al elegir ProcureData, su infraestructura es compatible con el ecosistema de datos europeo.",
    ruta: "/motor/modelo-idsa"
  },
  {
    id: "conectores-erp",
    seccion: "Integraciones",
    seccionColor: "from-orange-500 to-amber-600",
    icon: PlugZap,
    titulo: "Conectores ERP Universales",
    descripcion: "Integración Plug & Play. Moderniza sistemas Legacy dotándolos de capacidades Web3 y sincronización automática de homologaciones.",
    interfaz: "Carrusel de logos (SAP, Oracle, Dynamics) con pantalla de 'Mapeo de Campos' (CIF de ProcureData -> ID de Proveedor SAP).",
    specs: ["Soporte API REST", "SFTP seguro", "Webhooks asíncronos"],
    impacto: "Eficiencia Operativa: Tiempo de integración promedio reducido de meses a menos de 48 horas.",
    ruta: "/motor/conectores-erp"
  },
  {
    id: "edge-functions",
    seccion: "Integraciones",
    seccionColor: "from-orange-500 to-amber-600",
    icon: Cpu,
    titulo: "Edge Functions: Lógica Escalable",
    descripcion: "Inteligencia distribuida. Ejecución de lógica compleja y anonimización de datos en el borde de la red para máxima velocidad.",
    interfaz: "Esquema de flujo: Usuario -> Nodo Global -> Procesamiento -> Resultado. Muestra latencias de <50ms.",
    specs: ["Runtime de Deno", "Ejecución en entornos aislados (Isolates)", "Auto-escalado instantáneo"],
    impacto: "Rendimiento Global: Experiencia fluida para equipos de compras en cualquier lugar del mundo.",
    ruta: "/motor/edge-functions"
  },
  {
    id: "tour-guiado",
    seccion: "Experiencia UX",
    seccionColor: "from-purple-500 to-violet-600",
    icon: Map,
    titulo: "Tour Guiado: Interactive Onboarding",
    descripcion: "Asistencia contextual. Reduce la curva de aprendizaje de meses a horas, permitiendo que perfiles no técnicos operen en entornos Web3.",
    interfaz: "Pantalla de Dashboard con efecto 'Spotlight' y burbuja de ARIA guiando al usuario hacia su primera transacción.",
    specs: ["Sistema de ayuda basado en estados", "IA Generativa integrada (ARIA)", "Personalización por rol de usuario"],
    impacto: "Adopción Acelerada: Reduzca los costes de formación de su equipo de compras de semanas a horas.",
    ruta: "/motor/tour-guiado"
  },
  {
    id: "docs-interactivos",
    seccion: "Experiencia UX",
    seccionColor: "from-purple-500 to-violet-600",
    icon: BookOpenCheck,
    titulo: "Docs Interactivos: Developer Lab",
    descripcion: "Documentación viva. Laboratorio para equipos de IT que permite validar integraciones antes de escribir código en producción.",
    interfaz: "Consola de código integrada (Playground). Botón de 'Ejecutar' que muestra una respuesta de API real en formato JSON.",
    specs: ["Basado en OpenAPI 3.0", "Sincronización automática con GitHub", "Tokens de prueba incluidos"],
    impacto: "Reducción de Costes de IT: Su equipo técnico puede implementar integraciones en tiempo récord.",
    ruta: "/motor/docs-interactivos"
  }
];

const secciones = [
  { nombre: "Web3 & Blockchain", icon: Shield, color: "text-emerald-500", ids: ["wallet-web3", "identidad-ssi", "pagos-euroe"] },
  { nombre: "Tiempo Real", icon: Zap, color: "text-blue-500", ids: ["activity-feed", "smart-alerts"] },
  { nombre: "Seguridad", icon: Database, color: "text-red-500", ids: ["gobernanza-odrl", "multi-tenant-rls", "audit-logs", "modelo-idsa"] },
  { nombre: "Integraciones", icon: Globe, color: "text-orange-500", ids: ["conectores-erp", "edge-functions"] },
  { nombre: "Experiencia UX", icon: Users, color: "text-purple-500", ids: ["tour-guiado", "docs-interactivos"] }
];

export default function CapacidadesEnterprise() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Detect active section
      const sections = secciones.map(s => s.nombre.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionName: string) => {
    const id = sectionName.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Inicio</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {secciones.map((seccion) => {
              const sectionId = seccion.nombre.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
              return (
                <button
                  key={seccion.nombre}
                  onClick={() => scrollToSection(seccion.nombre)}
                  className={`text-sm transition-colors ${
                    activeSection === sectionId ? seccion.color : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {seccion.nombre}
                </button>
              );
            })}
          </nav>
          
          <Badge variant="outline" className="border-primary/50 text-primary">
            V1.0
          </Badge>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              Especificación Técnica y Funcional
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
              Capacidades Enterprise
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Los 13 pilares del "Motor de ProcureData" para entornos de producción industrial
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {secciones.map((seccion) => (
                <Button
                  key={seccion.nombre}
                  variant="outline"
                  className="border-white/20 hover:border-white/40"
                  onClick={() => scrollToSection(seccion.nombre)}
                >
                  <seccion.icon className={`h-4 w-4 mr-2 ${seccion.color}`} />
                  {seccion.nombre}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <main className="container mx-auto px-4 pb-20">
        {secciones.map((seccion, seccionIndex) => {
          const seccionCapacidades = capacidades.filter(c => seccion.ids.includes(c.id));
          const sectionId = seccion.nombre.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
          
          return (
            <section key={seccion.nombre} id={sectionId} className="mb-20 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${seccionCapacidades[0]?.seccionColor}`}>
                    <seccion.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 text-xs">
                      SECCIÓN {seccionIndex + 1}
                    </Badge>
                    <h2 className="text-3xl font-bold">{seccion.nombre}</h2>
                  </div>
                </div>
                <div className={`h-1 w-32 rounded-full bg-gradient-to-r ${seccionCapacidades[0]?.seccionColor}`} />
              </motion.div>

              <div className="space-y-8">
                {seccionCapacidades.map((cap, index) => (
                  <motion.article
                    key={cap.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left: Content */}
                        <div className="flex-1 space-y-6">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${cap.seccionColor} shrink-0`}>
                              <cap.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold mb-2">{cap.titulo}</h3>
                              <p className="text-muted-foreground">{cap.descripcion}</p>
                            </div>
                          </div>

                          {/* Interfaz Gráfica */}
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Interfaz Gráfica</p>
                            <p className="text-sm text-slate-300">{cap.interfaz}</p>
                          </div>

                          {/* Especificaciones */}
                          <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Especificaciones Técnicas</p>
                            <div className="flex flex-wrap gap-2">
                              {cap.specs.map((spec, i) => (
                                <Badge key={i} variant="secondary" className="bg-slate-800 text-slate-300">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right: Impact + Link */}
                        <div className="lg:w-80 space-y-4">
                          <div className={`p-5 rounded-xl bg-gradient-to-br ${cap.seccionColor} bg-opacity-10 border border-white/10`}>
                            <p className="text-xs uppercase tracking-wider text-white/70 mb-2">💡 Impacto de Negocio</p>
                            <p className="text-white font-medium">{cap.impacto}</p>
                          </div>
                          
                          <Link to={cap.ruta}>
                            <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
                              Ver Detalle Completo →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para implementar el Motor?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contacte con nuestro equipo técnico para una demostración personalizada de las capacidades enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explorar Marketplace
              </Button>
            </Link>
            <Link to="/whitepaper">
              <Button size="lg" variant="outline" className="border-white/20">
                Leer Whitepaper
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 bg-primary rounded-full shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors z-50"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
