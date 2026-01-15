import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Building2, GraduationCap, Users, Target, Award, Leaf, MapPin, Phone, Mail, Globe } from "lucide-react";
import { toast } from "sonner";
import { FundingFooter } from "@/components/FundingFooter";
import { GlobalNavigation } from "@/components/GlobalNavigation";

const TeleNaturaPresentacion = () => {
  const handleDownloadPDF = () => {
    toast.info("Descargando presentación corporativa...");
    setTimeout(() => {
      toast.success("Presentación descargada correctamente");
    }, 1000);
  };

  const sections = [
    { id: "quienes-somos", title: "Quiénes Somos", icon: Building2 },
    { id: "origen", title: "Origen Universitario", icon: GraduationCap },
    { id: "servicios", title: "Servicios", icon: Target },
    { id: "equipo", title: "Equipo", icon: Users },
    { id: "clientes", title: "Clientes y Partners", icon: Award },
    { id: "contacto", title: "Contacto", icon: Phone },
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
            Descargar PDF
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 sticky top-16 h-[calc(100vh-4rem)] border-r bg-white/50 backdrop-blur-sm">
          <nav className="p-6 space-y-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Contenido</h3>
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
              <Leaf className="w-3 h-3 mr-1" />
              Presentación Corporativa
            </Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">TeleNatura EBT</h1>
            <p className="text-xl text-slate-600">
              Empresa de Base Tecnológica especializada en TIC aplicadas al medio ambiente, 
              recursos naturales y agricultura de precisión.
            </p>
          </div>

          {/* Quiénes Somos */}
          <section id="quienes-somos" className="mb-16 scroll-mt-20">
            <Card className="border-emerald-200/50 bg-gradient-to-br from-white to-emerald-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                  Quiénes Somos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  <strong>TeleNatura EBT</strong> es una Empresa de Base Tecnológica que nace del entorno universitario 
                  con el objetivo de transferir conocimiento científico al sector productivo.
                </p>
                <p>
                  Nos especializamos en el desarrollo e implementación de soluciones tecnológicas avanzadas para 
                  la gestión sostenible del medio ambiente, los recursos naturales y la agricultura de precisión.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-emerald-600">+15</div>
                    <div className="text-sm text-slate-500">Años de experiencia</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-emerald-600">+200</div>
                    <div className="text-sm text-slate-500">Proyectos realizados</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-emerald-600">+50</div>
                    <div className="text-sm text-slate-500">Clientes activos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Origen Universitario */}
          <section id="origen" className="mb-16 scroll-mt-20">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <GraduationCap className="w-6 h-6 text-emerald-600" />
                  Origen Universitario (EBT)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  Como <strong>Empresa de Base Tecnológica (EBT)</strong>, nacemos del ecosistema universitario 
                  con la misión de transformar la investigación científica en soluciones aplicadas al mercado.
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-semibold text-emerald-800 mb-2">¿Qué significa ser una EBT?</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Transferencia directa de conocimiento universidad-empresa</li>
                    <li>• Equipo fundador con formación académica de alto nivel</li>
                    <li>• Acceso a laboratorios y recursos de investigación</li>
                    <li>• Colaboración continua con grupos de investigación</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Servicios */}
          <section id="servicios" className="mb-16 scroll-mt-20">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Target className="w-6 h-6 text-emerald-600" />
                  Nuestros Servicios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "IoT y Sensorización", desc: "Instalación y mantenimiento de redes de sensores para monitorización ambiental y agrícola" },
                    { title: "Teledetección", desc: "Análisis de imágenes satelitales y de drones para seguimiento de cultivos y recursos" },
                    { title: "Automatización de Riego", desc: "Sistemas inteligentes de riego basados en datos en tiempo real" },
                    { title: "Auditorías Energéticas", desc: "Evaluación y optimización del consumo energético en explotaciones agrarias" },
                    { title: "Topografía y Cartografía", desc: "Levantamientos topográficos y elaboración de mapas temáticos" },
                    { title: "Consultoría Ambiental", desc: "Asesoramiento técnico en gestión sostenible de recursos naturales" },
                  ].map((service, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold text-slate-800 mb-2">{service.title}</h4>
                      <p className="text-sm text-slate-600">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Equipo */}
          <section id="equipo" className="mb-16 scroll-mt-20">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Users className="w-6 h-6 text-emerald-600" />
                  Nuestro Equipo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  Contamos con un equipo multidisciplinar formado por ingenieros agrónomos, 
                  ingenieros de telecomunicaciones, geógrafos y especialistas en medio ambiente.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { role: "Ingenieros Agrónomos", count: "8" },
                    { role: "Ingenieros Telecom", count: "5" },
                    { role: "Especialistas GIS", count: "4" },
                  ].map((member, index) => (
                    <div key={index} className="text-center p-4 bg-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">{member.count}</div>
                      <div className="text-sm text-slate-600">{member.role}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Clientes */}
          <section id="clientes" className="mb-16 scroll-mt-20">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Award className="w-6 h-6 text-emerald-600" />
                  Clientes y Partners
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  Trabajamos con comunidades de regantes, cooperativas agrarias, 
                  administraciones públicas y empresas del sector agroalimentario.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Comunidades de Regantes",
                    "Cooperativas Agrarias",
                    "Consejerías de Agricultura",
                    "Empresas Agroalimentarias",
                    "Universidades",
                    "Centros de Investigación",
                  ].map((client, index) => (
                    <Badge key={index} variant="outline" className="border-emerald-200 text-emerald-700">
                      {client}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contacto */}
          <section id="contacto" className="mb-16 scroll-mt-20">
            <Card className="border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Phone className="w-6 h-6 text-emerald-600" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                      <span className="text-slate-600">Parque Científico Tecnológico, España</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-emerald-600" />
                      <span className="text-slate-600">info@telenatura.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-emerald-600" />
                      <a href="https://www.telenatura.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                        www.telenatura.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Solicitar Información
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>

      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
};

export default TeleNaturaPresentacion;
