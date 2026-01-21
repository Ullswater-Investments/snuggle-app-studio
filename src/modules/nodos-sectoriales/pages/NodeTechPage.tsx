import React from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  Database, 
  Key, 
  ShieldCheck, 
  Server,
  Cpu,
  BookOpen,
  Fingerprint,
  Blocks,
  Shield,
  Lightbulb
} from 'lucide-react';
import { NodeFeatureLayout } from './NodeFeatureLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NodeTechPage = () => {

  // DIAGRAMA IDIOGRÁFICO: EL VIAJE DEL DATO (P2P)
  const DataJourneyVisual = () => (
    <div className="relative w-full max-w-4xl mx-auto py-8">
      
      {/* CAPA SUPERIOR: PONTUS-X (EL CATÁLOGO) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-full max-w-lg h-28 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 flex flex-col items-center justify-center z-10 mb-8"
      >
        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-2">
          <Network className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm">Red PONTUS-X (Blockchain & Catálogo)</h4>
        <p className="text-xs text-blue-600 dark:text-blue-400">Aquí solo viven los "Metadatos" (El Menú) y Smart Contracts</p>
      </motion.div>

      {/* LÍNEAS DE CONEXIÓN HACIA ARRIBA */}
      <div className="absolute top-28 left-1/4 w-0.5 h-16 border-l-2 border-dashed border-slate-300 dark:border-slate-600" />
      <div className="absolute top-28 right-1/4 w-0.5 h-16 border-l-2 border-dashed border-slate-300 dark:border-slate-600" />
      
      {/* Labels de las líneas */}
      <div className="absolute top-32 left-[22%] -translate-x-1/2">
        <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-background px-1">Publica Metadatos</span>
      </div>
      <div className="absolute top-32 right-[18%] translate-x-1/2">
        <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-background px-1">Negocia Contrato</span>
      </div>

      {/* CAPA INFERIOR: MUNDO REAL (LOS SERVIDORES) */}
      <div className="mt-12 flex justify-between items-start px-4 md:px-8">
        
        {/* PROVEEDOR */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center w-40 md:w-48"
        >
          <div className="bg-background border-2 border-slate-200 dark:border-slate-700 p-4 md:p-6 rounded-xl shadow-lg text-center relative w-full">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap">
              Proveedor
            </div>
            <Server className="w-8 h-8 md:w-10 md:h-10 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
            <p className="text-xs md:text-sm font-bold text-foreground">Servidor Local</p>
            <div className="mt-2 bg-orange-50 dark:bg-orange-950/50 p-2 rounded border border-orange-100 dark:border-orange-900">
              <Database className="w-4 h-4 text-orange-500 inline mr-1" />
              <span className="text-xs font-bold text-orange-700 dark:text-orange-300">Dato Real</span>
            </div>
          </div>
        </motion.div>

        {/* CONSUMIDOR */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center w-40 md:w-48"
        >
          <div className="bg-background border-2 border-slate-200 dark:border-slate-700 p-4 md:p-6 rounded-xl shadow-lg text-center relative w-full">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap">
              Consumidor
            </div>
            <Server className="w-8 h-8 md:w-10 md:h-10 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
            <p className="text-xs md:text-sm font-bold text-foreground">Servidor Local</p>
            <div className="mt-2 bg-green-50 dark:bg-green-950/50 p-2 rounded border border-green-100 dark:border-green-900">
              <Key className="w-4 h-4 text-green-500 inline mr-1" />
              <span className="text-xs font-bold text-green-700 dark:text-green-300">Token Acceso</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* EL TÚNEL P2P (LA MAGIA) */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative mt-6"
      >
        {/* Glow effect */}
        <div className="absolute left-[15%] right-[15%] h-4 bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 rounded-full opacity-20 blur-xl" />
        
        {/* Main tunnel line */}
        <div className="mx-auto w-[70%] h-1 bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 rounded-full" />
        
        {/* Badge del túnel */}
        <div className="flex justify-center -mt-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-background border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full shadow-md flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-bold text-foreground">Túnel Cifrado Directo (P2P)</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Etiqueta clave */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-8 text-center"
      >
        <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 text-sm font-medium px-4 py-1.5">
          ⚡ El dato NUNCA toca la nube central
        </Badge>
      </motion.div>
    </div>
  );

  const pillars = [
    {
      icon: Blocks,
      title: "Web3 / Blockchain",
      subtitle: "La Notaría",
      description: "Registra quién hace qué. Nadie puede alterar el historial. Vital para justificar subvenciones.",
      color: "blue"
    },
    {
      icon: Fingerprint,
      title: "Identidad Soberana",
      subtitle: "El Pasaporte",
      description: "Cada empresa tiene una Wallet. Garantiza que quien entra es quien dice ser.",
      color: "green"
    },
    {
      icon: Shield,
      title: "El Conector",
      subtitle: "El Portero",
      description: "Software instalado en casa del cliente. Solo abre la puerta si se cumplen las reglas del contrato.",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400';
      case 'green':
        return 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400';
      case 'orange':
        return 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <NodeFeatureLayout
      title="Arquitectura del Ecosistema"
      subtitle="Entendiendo la maquinaria de confianza: Cómo funciona la soberanía de datos bajo el capó de tu Nodo."
      icon={<Network className="w-10 h-10" />}
      visualComponent={<DataJourneyVisual />}
      benefits={[
        {
          title: "Soberanía Real (P2P)",
          desc: "Tus datos nunca se suben a una nube centralizada. Viajan directamente desde tu servidor al del comprador a través de un túnel cifrado y solo cuando el contrato lo autoriza."
        },
        {
          title: "Compute-to-Data",
          desc: "Para datos ultra-sensibles, el dato ni siquiera se mueve. El algoritmo del comprador 'visita' tu servidor, hace el cálculo y solo se lleva el resultado. Privacidad absoluta."
        },
        {
          title: "Auditoría Blockchain",
          desc: "Cada acceso deja una huella inmutable en Pontus-X. Esto actúa como un 'Notario Digital' automático, fundamental para justificar subvenciones y auditorías de seguridad."
        }
      ]}
    >
      {/* BLOQUE DESTACADO: ANALOGÍA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-16"
      >
        <Card className="border-2 border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">Cambia el chip</h3>
                <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                  Un Nodo no es un Dropbox centralizado. Imagina un <strong>centro comercial digital de alta seguridad</strong> donde 
                  cada tienda (Proveedor) nunca entrega sus llaves al dueño del edificio, pero los clientes pueden comprar con total confianza.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* SECCIÓN: GAIA-X VS PONTUS-X */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3">El Marco de Trabajo</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Gaia-X vs Pontus-X</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-background hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Gaia-X: Las Reglas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Es la <strong>constitución</strong>. Define los estándares europeos de transparencia, soberanía e interoperabilidad. 
                Tu Nodo cumple estas reglas "by design" para operar legalmente en la UE.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center mb-4">
                <Cpu className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Pontus-X: La Infraestructura</h3>
              <p className="text-muted-foreground leading-relaxed">
                Es la <strong>carretera</strong>. Una red descentralizada técnica (basada en tecnologías Web3 y Ocean Protocol) 
                que ejecuta las transacciones de forma segura y automática.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* SECCIÓN: 3 PILARES TECNOLÓGICOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3">Tecnología</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Los 3 Pilares Tecnológicos</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-background hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl ${getColorClasses(pillar.color)} flex items-center justify-center mx-auto mb-4`}>
                    <pillar.icon className="w-7 h-7" />
                  </div>
                  <Badge variant="outline" className="mb-2 text-[10px]">{pillar.subtitle}</Badge>
                  <h3 className="text-lg font-bold text-foreground mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* ELEVATOR PITCH PARA CLIENTES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-slate-900 dark:bg-slate-950 border-slate-800 shadow-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10 text-center relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-orange-400 mb-4">¿Cómo explicárselo a tus socios?</h3>
              <p className="text-lg md:text-xl italic font-serif leading-relaxed text-slate-300">
                "No estamos subiendo archivos a una nube ajena. Te estamos instalando una <strong className="text-white">aduana digital inteligente</strong> en tu propia empresa. 
                Tus datos no salen hasta que tú lo autorizas y se cumplen tus reglas de pago y uso."
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </NodeFeatureLayout>
  );
};

export default NodeTechPage;
