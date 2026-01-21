import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { FundingFooter } from '../components/FundingFooter';

interface NodeFeatureLayoutProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  visualComponent: React.ReactNode;
  benefits: { title: string; desc: string }[];
  children?: React.ReactNode;
}

export const NodeFeatureLayout: React.FC<NodeFeatureLayoutProps> = ({
  title,
  subtitle,
  icon,
  visualComponent,
  benefits,
  children
}) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/nodos-sectoriales" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Volver a Visión General</span>
          </Link>
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            NODO Propietario
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white mb-6 shadow-lg">
            {icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Visual Diagram Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
            {visualComponent}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Representación del flujo lógico del sistema
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-lg mb-4">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Additional Content (children) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-20"
          >
            {children}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 md:p-12 text-center"
        >
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Listo para desplegar tu Nodo?
            </h2>
            <p className="text-orange-100 mb-6 max-w-xl mx-auto">
              Recuerda que todos estos módulos están incluidos en el paquete financiado por el Kit Espacio de Datos. Coste final: 0€.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50"
            >
              <Link to="/nodos-sectoriales#contacto">
                Solicitar Estudio de Viabilidad
              </Link>
            </Button>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <FundingFooter variant="dark" />
        </div>
      </footer>
    </div>
  );
};

export default NodeFeatureLayout;
