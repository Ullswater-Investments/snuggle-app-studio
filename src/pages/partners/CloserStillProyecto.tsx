import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Zap,
  Users,
  Shield,
  CheckCircle2,
  ExternalLink,
  Globe,
  Sparkles,
  Network,
  FileCheck,
  Handshake,
  Award
} from "lucide-react";

const CloserStillProyecto = () => {
  const ecosystems = [
    {
      name: "Madrid Tech Show",
      location: "IFEMA, Madrid",
      description: "La mayor convergencia tecnológica de España",
      subEvents: [
        "E-Show Madrid",
        "Big Data & AI World",
        "Cyber Security World",
        "Cloud & AI Infrastructure",
        "Data Centre World",
        "Connectivity World",
        "Technology for Marketing (TFM)"
      ]
    },
    {
      name: "Hub Digital Barcelona",
      location: "Barcelona",
      description: "Foco en negocio digital y transformación del retail",
      subEvents: [
        "E-Show Barcelona (Edición Decana)",
        "TFM Barcelona"
      ]
    },
    {
      name: "Sector Salud & Pharma",
      location: "Nacional",
      description: "Eventos líderes en el sector farmacéutico y dental",
      subEvents: [
        "Infarma (Congreso farmacéutico líder)",
        "Dental Summit"
      ]
    }
  ];

  const valuePropositions = [
    {
      icon: Zap,
      title: "Fast-Track Comercial",
      description: "Los expositores y visitantes utilizan su Pasaporte Digital de ProcureData para validar credenciales (Solvencia, ISOs, ESG) instantáneamente al escanear su acreditación."
    },
    {
      icon: Network,
      title: "Espacio de Datos Federado",
      description: "Facilitamos que CloserStill actúe como orquestador del 'Espacio de Datos de Comercio Digital', permitiendo a sus expositores acceder a las ayudas del Kit Espacio de Datos."
    },
    {
      icon: Handshake,
      title: "Matchmaking Verificado",
      description: "En los eForums, garantizamos que cada reunión 'One to One' ocurra entre partes previamente homologadas, eliminando la fricción de compliance post-evento."
    }
  ];

  const integratedServices = [
    {
      icon: FileCheck,
      title: "Onboarding de Expositores",
      description: "Validación automática KYB (Know Your Business)"
    },
    {
      icon: Shield,
      title: "Intercambio de Leads Soberano",
      description: "Uso de conectores EDC para compartir datos de contacto bajo contratos ODRL"
    },
    {
      icon: Award,
      title: "Certificación de Asistencia",
      description: "Emisión de credenciales verificables de participación y formación en blockchain"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/partners">
                <ArrowLeft className="h-4 w-4" />
                Volver a Partners
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-600 text-white">Strategic Partner</Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-600">
                Kit Espacio de Datos Ready
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-blue-400" />
              <span className="text-blue-200 font-medium">Ecosystem Builder</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              CloserStill Media
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Líder global en la organización de ferias profesionales y eventos B2B. 
              Dinamizador del <strong className="text-white">Espacio de Datos de Comercio Digital</strong> en España.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Globe className="h-4 w-4 text-blue-400" />
                <span>España & UK</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Users className="h-4 w-4 text-blue-400" />
                <span>+50.000 Visitantes/año</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span>+1.500 Expositores</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="text-2xl">Perfil Corporativo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  CloserStill Media es el líder global en la organización de ferias profesionales y eventos B2B. 
                  En España, gestiona el ecosistema de networking más potente del mercado, conectando oferta y demanda 
                  a través de estrategias de "eventos paraguas" que reúnen a directivos C-Level de múltiples verticales 
                  en un mismo recinto.
                </p>
                <p>
                  Su enfoque abarca desde la infraestructura tecnológica crítica hasta el retail digital y el sector 
                  farmacéutico, actuando como el principal dinamizador de negocios presenciales en Madrid y Barcelona.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ecosystems Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Portfolio de Ecosistemas Conectados</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A través de esta alianza, ProcureData habilita la interoperabilidad de datos en los siguientes eventos clave:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ecosystems.map((ecosystem, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      {ecosystem.location}
                    </div>
                    <CardTitle className="text-lg">{ecosystem.name}</CardTitle>
                    <CardDescription>{ecosystem.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {ecosystem.subEvents.map((event, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* eForums Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <Badge className="w-fit bg-blue-600">Formato High-Value</Badge>
                <CardTitle className="text-xl mt-2">eForums (One to One)</CardTitle>
                <CardDescription>
                  Reuniones ejecutivas privadas "speed dating" potenciadas por validación previa de identidad
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-blue-500 text-blue-600">
                The Partnership
              </Badge>
              <h2 className="text-3xl font-bold">Propuesta de Valor Conjunta</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                La alianza <strong>ProcureData x CloserStill</strong> transforma las ferias comerciales en 
                <span className="text-blue-600 font-semibold"> Espacios de Datos Líquidos</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {valuePropositions.map((prop, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <prop.icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{prop.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{prop.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Services */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Servicios Integrados</h2>
              <p className="text-blue-200">
                Funcionalidades habilitadas por la infraestructura ProcureData
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {integratedServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-blue-200">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
              <CardContent className="p-8 text-center space-y-6">
                <h3 className="text-2xl font-bold">¿Eres expositor en eventos CloserStill?</h3>
                <p className="text-blue-100">
                  Accede a las ventajas del Kit Espacio de Datos y optimiza tu participación 
                  con validación instantánea de credenciales empresariales.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                    Ver Oportunidades del Ecosistema
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-700 hover:bg-blue-50"
                    asChild
                  >
                    <Link to="/kit-espacio-datos">
                      Más sobre Kit Espacio de Datos
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloserStillProyecto;
