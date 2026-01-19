import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, Lightbulb, Building2, Handshake, Euro, Shield, 
  UserCheck, Zap, LayoutDashboard, 
  TrendingUp, CheckCircle2, Award, ArrowLeft,
  AlertCircle, Star, Users, Globe, Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const EShowProposal = () => {
  const userJourneySteps = [
    { title: "El Encuentro", desc: "Escaneo de badges en el stand", icon: UserCheck },
    { title: "Handshake Digital", desc: "Nodo ejecuta Smart Contract", icon: Handshake },
    { title: "La Validación", desc: "Intercambio de credenciales (segundos)", icon: CheckCircle2 },
    { title: "El Resultado", desc: "Proveedor Homologado en ERP", icon: Rocket }
  ];

  const revenueStreams = [
    { name: "Suscripción \"Trust+\"", description: "Fee extra para tener el \"Pasaporte Digital\" validado todo el año.", potential: 3 },
    { name: "Data Marketplace Fee", description: "Comisión por datasets vendidos entre participantes.", potential: 2 },
    { name: "Gestión de Ayudas", description: "Fee por gestionar el acceso al Kit Espacio de Datos.", potential: 4 }
  ];

  const nextSteps = [
    "Piloto en e-Show Madrid: Habilitar un \"Fast-Track Lane\" para 50 expositores VIP.",
    "Webinar Conjunto: \"Cómo financiar tu transformación de datos con el Kit Espacio de Datos\".",
    "Implementación del Nodo: Despliegue de un Nodo Gaia-X propiedad de CloserStill."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header / Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link to="/partners/closerstill/proyecto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a CloserStill
              </Link>
            </Button>
            <Badge className="bg-red-600 text-white border-0 px-4 py-1">
              <Shield className="w-3 h-3 mr-1" />
              Documento Confidencial - Solo Partners
            </Badge>
          </div>

          {/* Hero Content */}
          <div className="text-center space-y-4">
            <p className="text-blue-300 font-medium tracking-widest text-sm">PROPUESTA ESTRATÉGICA</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              e-Show Data Space Node
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
              De Feria de 2 Días a Ecosistema de Negocio 365
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        
        {/* 1. La Visión */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">1. La Visión: Ecosistema Líquido</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-l-4 border-l-red-500 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  El Problema
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-700">
                Hoy, el e-Show conecta oferta y demanda presencialmente. Cuando se apagan las luces, 
                la fricción burocrática (compliance, validación, papeleo) ralentiza el cierre de acuerdos.
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="w-5 h-5" />
                  La Solución
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-700">
                Implementar un <strong>Nodo Propietario en ProcureData</strong> (basado en Pontus-X / Gaia-X). 
                Convertimos el e-Show en el primer organizador que ofrece Infraestructura de Datos Soberana.
              </CardContent>
            </Card>
          </div>

          {/* Concepto Clave */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Concepto Clave</h3>
                <p className="text-lg text-amber-900 italic">
                  "Agustín, no solo vendemos m² de suelo; vendemos <strong>Autopistas de Datos Seguras</strong> para 
                  que tus expositores cierren ventas más rápido."
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* 2. La Oportunidad */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">2. La Oportunidad: Kit Espacio de Datos 🇪🇺</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">Rol del e-Show</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Actuar como <strong>Entidad Promotora</strong> del "Espacio de Datos del Comercio Digital".
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
                  <Euro className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-800">El Incentivo</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Ayudar a tus expositores a captar los <strong>150.000€ - 300.000€</strong> de ayuda pública.
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                  <Handshake className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-800">La Fidelización</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Si facilitas la tecnología y la subvención, el expositor <strong>se "casa" con la feria</strong>.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 3. Infografía del Nodo */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">3. ¿Qué aporta un Nodo Propietario?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Columna Expositor */}
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">El Vendedor</CardTitle>
                <CardDescription>Para el Expositor</CardDescription>
                <Badge variant="outline" className="mt-2 border-blue-300 text-blue-700">
                  Objetivo: Vender más rápido
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600">
                    <strong>Identidad Soberana (DID):</strong> Su Badge se convierte en Cartera Digital.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600">
                    <strong>Validación Instantánea:</strong> Transmite solvencia e ISOs automáticamente.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600">
                    <strong>Monetización:</strong> Venta de datasets de tendencias en el Marketplace.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Columna Visitante */}
            <Card className="border-t-4 border-t-green-500">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">El Comprador</CardTitle>
                <CardDescription>Para el Visitante</CardDescription>
                <Badge variant="outline" className="mt-2 border-green-300 text-green-700">
                  Objetivo: Proveedores confiables
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600">
                    <strong>Confianza Zero-Trust:</strong> Proveedores con KYB automático en Blockchain.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600">
                    <strong>Integración One-Click:</strong> Volcado directo a ERP (SAP/Oracle).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600">
                    <strong>Scouting Inteligente:</strong> Filtros avanzados por certificación.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Columna Organizador */}
            <Card className="border-t-4 border-t-orange-500">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                  <LayoutDashboard className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-orange-800">El Organizador</CardTitle>
                <CardDescription>Para e-Show</CardDescription>
                <Badge variant="outline" className="mt-2 border-orange-300 text-orange-700">
                  Objetivo: Nuevos Ingresos
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Euro className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600">
                    <strong>Data Monetization:</strong> Tasa por transacciones de datos post-feria.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600">
                    <strong>Market Intelligence:</strong> Datos reales de oferta y demanda.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600">
                    <strong>Reputación:</strong> Primera feria Web3-Ready de Europa.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 4. User Journey */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">4. User Journey</h2>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-blue-300 via-indigo-300 to-green-300 rounded-full" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {userJourneySteps.map((step, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center z-20">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* 5. Modelo de Negocio */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">5. Modelo de Negocio Propuesto</h2>
          </div>

          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-4 font-semibold text-slate-700 border-b">Flujo de Ingresos</th>
                  <th className="text-left p-4 font-semibold text-slate-700 border-b">Descripción</th>
                  <th className="text-center p-4 font-semibold text-slate-700 border-b">Potencial</th>
                </tr>
              </thead>
              <tbody>
                {revenueStreams.map((stream, i) => (
                  <tr key={i} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-800">{stream.name}</td>
                    <td className="p-4 text-slate-600">{stream.description}</td>
                    <td className="p-4 text-center">
                      {[...Array(stream.potential)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 text-amber-400 inline-block fill-amber-400" />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Separator />

        {/* 6. Próximos Pasos */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">6. Próximos Pasos 🏁</h2>
          </div>
          
          <div className="space-y-4 mb-10">
            {nextSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                  {i + 1}
                </div>
                <p className="text-slate-700 pt-1">{step}</p>
              </div>
            ))}
          </div>

          <Separator className="my-10" />
          
          {/* Final Quote */}
          <blockquote className="text-center max-w-4xl mx-auto py-8">
            <p className="text-2xl md:text-3xl font-light text-slate-700 italic leading-relaxed">
              "El futuro de las ferias no es solo conectar personas, es conectar la 
              <span className="text-blue-600 font-medium"> confianza </span> 
              de sus empresas. Hagamos que e-Show sea el estándar de esa confianza."
            </p>
          </blockquote>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">¿Listo para transformar e-Show?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Agenda una llamada con nuestro equipo para explorar esta oportunidad estratégica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              Agendar Reunión
            </Button>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
              <Link to="/partners/closerstill/proyecto">
                Volver al Proyecto CloserStill
              </Link>
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EShowProposal;
