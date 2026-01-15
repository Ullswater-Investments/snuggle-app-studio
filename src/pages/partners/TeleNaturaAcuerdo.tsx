import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, FileSignature, Shield, Clock, Wrench, Database, Scale, AlertTriangle, CheckCircle2, Leaf, Phone } from "lucide-react";
import { toast } from "sonner";
import { FundingFooter } from "@/components/FundingFooter";
import { GlobalNavigation } from "@/components/GlobalNavigation";

const TeleNaturaAcuerdo = () => {
  const handleDownloadPDF = () => {
    toast.info("Descargando acuerdo marco...");
    setTimeout(() => {
      toast.success("Acuerdo descargado correctamente");
    }, 1000);
  };

  const sections = [
    { id: "objeto", title: "Objeto del Acuerdo", icon: FileSignature },
    { id: "instalacion", title: "Instalación", icon: Wrench },
    { id: "mantenimiento", title: "Mantenimiento", icon: Clock },
    { id: "garantia", title: "Garantía", icon: Shield },
    { id: "datos", title: "Propiedad de Datos", icon: Database },
    { id: "responsabilidades", title: "Responsabilidades", icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GlobalNavigation />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/partners/telenatura-ebt/proyecto" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Proyecto
              </Link>
            </Button>
          </div>
          
          <Button 
            size="sm" 
            onClick={handleDownloadPDF} 
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Download className="h-4 w-4" />
            Descargar Acuerdo
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 sticky top-16 h-[calc(100vh-4rem)] border-r bg-white/50 backdrop-blur-sm">
          <nav className="p-6 space-y-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Secciones</h3>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <section.icon className="w-4 h-4" />
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
              <FileSignature className="w-3 h-3 mr-1" />
              Documento Legal
            </Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Acuerdo Marco de Colaboración</h1>
            <p className="text-xl text-slate-600">
              Contrato de Suministro, Instalación y Mantenimiento de equipos IoT 
              para el sector agroambiental.
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <span>Versión 2.1</span>
              <span>•</span>
              <span>Última actualización: Enero 2024</span>
            </div>
          </div>

          {/* Advertencia Legal */}
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardContent className="py-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <strong>Nota importante:</strong> Este documento es un modelo de acuerdo marco. 
                Los términos específicos de cada proyecto serán detallados en anexos particulares 
                que formarán parte integrante del contrato.
              </div>
            </CardContent>
          </Card>

          {/* Objeto del Acuerdo */}
          <section id="objeto" className="mb-12 scroll-mt-20">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <FileSignature className="w-6 h-6 text-emerald-600" />
                  1. Objeto del Acuerdo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  El presente acuerdo tiene por objeto establecer las condiciones generales para el 
                  <strong> suministro, instalación y mantenimiento</strong> de equipos de sensorización, 
                  telecontrol y monitorización ambiental destinados al sector agroalimentario.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-3">Alcance del servicio:</h4>
                  <ul className="space-y-2">
                    {[
                      "Suministro de equipos IoT (sensores, actuadores, gateways)",
                      "Instalación y puesta en marcha en campo",
                      "Configuración de conectividad y plataforma de visualización",
                      "Formación básica del personal del cliente",
                      "Mantenimiento preventivo y correctivo",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Instalación */}
          <section id="instalacion" className="mb-12 scroll-mt-20">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Wrench className="w-6 h-6 text-emerald-600" />
                  2. Instalación y Puesta en Marcha
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  TeleNatura EBT se compromete a realizar la instalación de los equipos en las 
                  ubicaciones acordadas, garantizando su correcto funcionamiento.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <h4 className="font-semibold text-emerald-800 mb-2">Responsabilidad de TeleNatura</h4>
                    <ul className="space-y-1 text-sm text-emerald-700">
                      <li>• Desplazamiento de técnicos a campo</li>
                      <li>• Material de fijación y cableado</li>
                      <li>• Configuración de comunicaciones</li>
                      <li>• Pruebas de funcionamiento</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-2">Responsabilidad del Cliente</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li>• Acceso a las parcelas/instalaciones</li>
                      <li>• Punto de alimentación eléctrica (si aplica)</li>
                      <li>• Permisos y licencias necesarias</li>
                      <li>• Personal de apoyo en la instalación</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">⏱️ Plazos de instalación</h4>
                  <p className="text-sm text-blue-700">
                    La instalación se realizará en un plazo máximo de <strong>30 días hábiles</strong> desde 
                    la recepción del pedido y la confirmación de disponibilidad de las ubicaciones.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Mantenimiento */}
          <section id="mantenimiento" className="mb-12 scroll-mt-20">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  3. Mantenimiento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  El servicio de mantenimiento incluye tanto acciones preventivas como correctivas 
                  para asegurar la operatividad continua de los equipos.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-800">Tipo</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-800">Frecuencia</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-800">Incluye</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 px-4 font-medium text-emerald-700">Preventivo</td>
                        <td className="py-3 px-4">Semestral</td>
                        <td className="py-3 px-4">Revisión, limpieza, calibración</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 px-4 font-medium text-emerald-700">Correctivo</td>
                        <td className="py-3 px-4">Bajo demanda</td>
                        <td className="py-3 px-4">Reparación o sustitución</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-emerald-700">Soporte remoto</td>
                        <td className="py-3 px-4">24/7</td>
                        <td className="py-3 px-4">Monitorización y alertas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-semibold text-emerald-800 mb-2">SLA (Nivel de Servicio)</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-emerald-700 font-medium">Tiempo de respuesta:</span>
                      <span className="text-emerald-600"> &lt; 4 horas laborables</span>
                    </div>
                    <div>
                      <span className="text-emerald-700 font-medium">Tiempo de resolución:</span>
                      <span className="text-emerald-600"> &lt; 48 horas</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Garantía */}
          <section id="garantia" className="mb-12 scroll-mt-20">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  4. Garantía de Equipos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  Todos los equipos suministrados cuentan con garantía del fabricante y garantía 
                  adicional de TeleNatura EBT.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-600">2 años</div>
                    <div className="text-sm text-slate-600">Garantía estándar</div>
                  </div>
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <div className="text-3xl font-bold text-teal-600">+1 año</div>
                    <div className="text-sm text-slate-600">Extensión opcional</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">IP67</div>
                    <div className="text-sm text-slate-600">Protección exterior</div>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <h4 className="font-semibold text-amber-800 mb-2">⚠️ Exclusiones de garantía</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Daños por manipulación incorrecta</li>
                    <li>• Daños por fenómenos meteorológicos extremos (granizo, rayos)</li>
                    <li>• Daños por roedores o fauna silvestre</li>
                    <li>• Modificaciones no autorizadas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Propiedad de Datos */}
          <section id="datos" className="mb-12 scroll-mt-20">
            <Card className="border-emerald-200/50 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Database className="w-6 h-6 text-emerald-600" />
                  5. Propiedad de los Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <div className="bg-emerald-100 p-4 rounded-lg border border-emerald-200">
                  <p className="text-emerald-800 font-medium">
                    🔐 Los datos agronómicos capturados por los sensores son propiedad exclusiva del 
                    <strong> propietario de la explotación agraria</strong>.
                  </p>
                </div>

                <p>
                  TeleNatura EBT actúa únicamente como encargado del tratamiento de datos según el 
                  Reglamento General de Protección de Datos (RGPD).
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800">Compromisos de TeleNatura:</h4>
                  <ul className="space-y-2">
                    {[
                      "No compartir datos con terceros sin autorización expresa",
                      "Almacenamiento en servidores dentro del Espacio Económico Europeo",
                      "Cifrado de datos en tránsito y en reposo",
                      "Exportación completa de datos en formatos estándar a petición del cliente",
                      "Eliminación de datos tras finalización del contrato (si se solicita)",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">🇪🇺 Compatibilidad Gaia-X</h4>
                  <p className="text-sm text-blue-700">
                    Los datos pueden compartirse de forma soberana a través de espacios de datos 
                    federados compatibles con Gaia-X, manteniendo el control total por parte del propietario.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Responsabilidades */}
          <section id="responsabilidades" className="mb-12 scroll-mt-20">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Scale className="w-6 h-6 text-emerald-600" />
                  6. Limitación de Responsabilidades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  Las partes acuerdan las siguientes limitaciones de responsabilidad:
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">TeleNatura EBT no será responsable de:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Decisiones agronómicas tomadas en base a los datos suministrados</li>
                      <li>• Pérdidas de cosecha o daños indirectos</li>
                      <li>• Interrupciones del servicio por causas de fuerza mayor</li>
                      <li>• Fallos en redes de comunicación de terceros</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <h4 className="font-semibold text-emerald-800 mb-2">TeleNatura EBT sí garantiza:</h4>
                    <ul className="text-sm space-y-1 text-emerald-700">
                      <li>• Precisión de los sensores según especificaciones técnicas</li>
                      <li>• Disponibilidad del 99.5% de la plataforma de datos</li>
                      <li>• Respuesta ante incidencias según SLA acordado</li>
                      <li>• Confidencialidad de la información del cliente</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA de Firma */}
          <Card className="border-emerald-300 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h3>
              <p className="mb-6 text-emerald-100">
                Contacta con nuestro equipo comercial para formalizar el acuerdo de colaboración.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-emerald-700 hover:bg-emerald-50">
                  <Phone className="w-4 h-4 mr-2" />
                  Contactar Comercial
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={handleDownloadPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Modelo PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
};

export default TeleNaturaAcuerdo;
