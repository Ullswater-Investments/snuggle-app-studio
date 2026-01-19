import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Zap, Crown, Globe, Download, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import EShowPrismaticGallery from '@/components/partners/closerstill/EShowPrismaticGallery';

const CloserStillPrismaticos = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/partners/closerstill/miembros')}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Área de Miembros
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
              <Button variant="outline" size="sm" className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10">
                <Presentation className="w-4 h-4 mr-2" />
                Modo Presentación
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              <span className="text-sm text-indigo-400 font-medium tracking-wider uppercase">
                Estrategia e-Show 2026
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              10 Casos de Uso{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Prismáticos
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Transformamos la feria en infraestructura crítica. ProcureData pasa a ser 
              el sistema operativo invisible que hace que e-Show funcione mejor, más rápido 
              y con menos fricción.
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div
                className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Zap className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Aceleración</h3>
                <p className="text-sm text-slate-400">
                  ROI directo para expositores. Del lead al contrato en minutos.
                </p>
              </motion.div>

              <motion.div
                className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Crown className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Experiencia VIP</h3>
                <p className="text-sm text-slate-400">
                  Fidelización y prestigio. Acceso sin fricción y credenciales verificables.
                </p>
              </motion.div>

              <motion.div
                className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Globe className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ecosistema 365</h3>
                <p className="text-sm text-slate-400">
                  La feria que nunca cierra. Nuevas líneas de ingreso todo el año.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prismatic Gallery */}
      <EShowPrismaticGallery />

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-t from-slate-900 to-slate-950">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Listo para transformar e-Show?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Cada caso representa una oportunidad de monetización real. 
              Agenda una sesión para profundizar en los pilotos prioritarios.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => navigate('/partners/closerstill/miembros/pioneer')}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
                Ver Programa Pioneer
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/partners/closerstill/miembros')}
                className="border-slate-600 text-slate-300"
              >
                Volver al Área de Miembros
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CloserStillPrismaticos;
