import { Link } from "react-router-dom";
import { ArrowLeft, Radio, Shield, Zap, CheckCircle, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const MOCK_EVENTS = [
  { type: "success", message: "Proveedor Agro-Z ha renovado Certificado GLOBALG.A.P.", time: "hace 2s" },
  { type: "info", message: "Transferencia de 500 EUROe completada: Servicio Homologación Flash", time: "hace 15s" },
  { type: "warning", message: "Aviso: El contrato ODRL con Proveedor Industrial-X expira en 24h", time: "hace 1m" },
  { type: "success", message: "Nueva política ODRL firmada por Empresa Constructora ABC", time: "hace 2m" },
  { type: "info", message: "Datos ESG actualizados para Proveedor Logístico Delta", time: "hace 3m" },
  { type: "success", message: "Contrato ejecutado en bloque #42901", time: "hace 5m" },
  { type: "warning", message: "Certificado ISO 14001 próximo a caducar: TechSupply S.L.", time: "hace 8m" },
  { type: "info", message: "Nuevo proveedor registrado en el marketplace", time: "hace 12m" },
];

export default function ActivityFeed() {
  const [events, setEvents] = useState(MOCK_EVENTS.slice(0, 5));
  const [newEventIndex, setNewEventIndex] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prev => {
        const nextEvent = MOCK_EVENTS[newEventIndex % MOCK_EVENTS.length];
        setNewEventIndex(i => i + 1);
        return [{ ...nextEvent, time: "ahora" }, ...prev.slice(0, 4)];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [newEventIndex]);

  const getEventColor = (type: string) => {
    switch (type) {
      case "success": return "text-green-400 bg-green-500/20";
      case "warning": return "text-orange-400 bg-orange-500/20";
      default: return "text-blue-400 bg-blue-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-slate-950/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/#features" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al Motor
          </Link>
          <Badge variant="outline" className="border-blue-500 text-blue-400">Tiempo Real</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Radio className="h-12 w-12 text-blue-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Activity Feed</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trazabilidad de Eventos Críticos en milisegundos
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Live Activity Feed Simulation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/5 border-white/10 overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-white/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Radio className="h-5 w-5 text-blue-400" />
                    Flujo de Actividad en Vivo
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <span className="text-xs text-green-400">En vivo</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {events.map((event, i) => (
                    <motion.div
                      key={`${event.message}-${i}`}
                      initial={i === 0 ? { opacity: 0, x: -20 } : {}}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getEventColor(event.type)}`}>
                          <Circle className="h-3 w-3 fill-current" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white leading-relaxed">{event.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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
              <h2 className="text-2xl font-bold mb-4">El Pulso de tu Cadena de Suministro</h2>
              <p className="text-gray-400 leading-relaxed">
                El Activity Feed es el pulso vivo de su ecosistema de compras. Gracias a una arquitectura 
                basada en WebSockets, cada evento crítico —desde la actualización de un certificado de 
                calidad hasta el cierre de un contrato ODRL— se notifica instantáneamente a todos los 
                actores autorizados.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                Este feed no es solo una lista de logs; es una herramienta de auditoría visual que permite 
                a los Directores de Compras (CPOs) supervisar la salud de su red de proveedores en tiempo vivo.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-br from-blue-900/20 to-slate-900 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Latencia", value: "Actualizaciones en milisegundos via WebSockets" },
                  { label: "Categorización", value: "Eventos filtrables por importancia (Info, Alerta, Crítico)" },
                  { label: "Persistencia", value: "Cada hito vinculado a prueba de existencia en blockchain" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
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
                    <h3 className="font-bold text-white mb-2">Visibilidad 360°</h3>
                    <p className="text-gray-300">
                      Elimine los puntos ciegos en la cadena de suministro. 
                      <strong className="text-orange-400"> Reaccione instantáneamente</strong> ante cambios de 
                      estado de proveedores críticos antes de que afecten a la producción.
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
