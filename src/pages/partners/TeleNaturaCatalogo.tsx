import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Cpu, Radio, Droplets, Thermometer, Wind, Wrench, MapPin, Zap, Leaf, CloudRain, Sun, Settings } from "lucide-react";
import { toast } from "sonner";
import { FundingFooter } from "@/components/FundingFooter";
import { GlobalNavigation } from "@/components/GlobalNavigation";

const TeleNaturaCatalogo = () => {
  const handleDownloadPDF = () => {
    toast.info("Descargando catálogo de productos...");
    setTimeout(() => {
      toast.success("Catálogo descargado correctamente");
    }, 1000);
  };

  const sections = [
    { id: "sensores", title: "Sensores IoT", icon: Radio },
    { id: "estaciones", title: "Estaciones Meteorológicas", icon: CloudRain },
    { id: "actuadores", title: "Actuadores y Control", icon: Settings },
    { id: "drones", title: "Drones y Teledetección", icon: Wind },
    { id: "ingenieria", title: "Servicios de Ingeniería", icon: Wrench },
    { id: "integracion", title: "Integración de Datos", icon: Cpu },
  ];

  const hardwareProducts = [
    {
      category: "Sensores de Humedad del Suelo",
      icon: Droplets,
      products: [
        { name: "Sonda Capacitiva TN-100", specs: "Profundidad: 10-100cm | Precisión: ±2%", price: "Desde 250€" },
        { name: "Sensor FDR Multi-nivel TN-200", specs: "4 niveles | Comunicación LoRa", price: "Desde 450€" },
        { name: "Tensiómetro Digital TN-T50", specs: "Rango: 0-100 kPa | Solar", price: "Desde 180€" },
      ]
    },
    {
      category: "Caudalímetros",
      icon: Thermometer,
      products: [
        { name: "Caudalímetro Ultrasónico TN-CF100", specs: "DN50-DN300 | Precisión: ±1%", price: "Desde 890€" },
        { name: "Contador Electromagnético TN-EM200", specs: "DN25-DN500 | IP68", price: "Desde 1.200€" },
        { name: "Medidor de Caudal Proporcional", specs: "Bajo coste | Ideal acequias", price: "Desde 320€" },
      ]
    },
    {
      category: "Estaciones Meteorológicas",
      icon: Sun,
      products: [
        { name: "Estación Compacta TN-MET100", specs: "Temp, HR, Viento, Lluvia, Rad", price: "Desde 1.500€" },
        { name: "Estación Profesional TN-MET300", specs: "12 sensores | Davis compatible", price: "Desde 3.200€" },
        { name: "Piranómetro TN-RAD", specs: "Radiación solar | Clase 2 ISO", price: "Desde 680€" },
      ]
    },
    {
      category: "Actuadores de Riego",
      icon: Settings,
      products: [
        { name: "Electroválvula Latch TN-EV", specs: "2\" y 3\" | Bajo consumo DC", price: "Desde 85€" },
        { name: "Controlador de Riego TN-RC8", specs: "8 zonas | 4G/LoRa | Solar", price: "Desde 420€" },
        { name: "Variador de Frecuencia TN-VFD", specs: "Bombas hasta 30kW", price: "Desde 1.800€" },
      ]
    },
  ];

  const services = [
    {
      title: "Topografía y Levantamientos",
      icon: MapPin,
      description: "Levantamientos topográficos de alta precisión con GPS RTK y drones",
      features: ["Nivelación de parcelas", "MDT y curvas de nivel", "Replanteo de infraestructuras", "Catastro rural"],
    },
    {
      title: "Auditorías Energéticas",
      icon: Zap,
      description: "Evaluación del consumo energético en explotaciones agrarias",
      features: ["Análisis de bombeos", "Optimización tarifaria", "Energía solar fotovoltaica", "Ahorro certificado"],
    },
    {
      title: "Automatización de Riego",
      icon: Droplets,
      description: "Diseño e instalación de sistemas de riego inteligente",
      features: ["Telecontrol de redes", "Fertirrigación automática", "Balance hídrico en tiempo real", "Alertas y notificaciones"],
    },
    {
      title: "Teledetección y Drones",
      icon: Wind,
      description: "Análisis multiespectral de cultivos con imágenes de drones y satélite",
      features: ["Índices de vegetación (NDVI)", "Detección de estrés hídrico", "Mapas de prescripción VRT", "Seguimiento fenológico"],
    },
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
            Descargar Catálogo
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 sticky top-16 h-[calc(100vh-4rem)] border-r bg-white/50 backdrop-blur-sm">
          <nav className="p-6 space-y-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Catálogo</h3>
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
        <main className="flex-1 p-8 max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
              <Cpu className="w-3 h-3 mr-1" />
              Catálogo IoT e Ingeniería
            </Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Productos y Servicios</h1>
            <p className="text-xl text-slate-600">
              Hardware especializado y servicios de ingeniería para la digitalización 
              del sector primario.
            </p>
          </div>

          {/* Hardware Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Radio className="w-6 h-6 text-emerald-600" />
              Equipamiento Hardware
            </h2>

            {hardwareProducts.map((category, catIndex) => (
              <section 
                key={catIndex} 
                id={catIndex === 0 ? "sensores" : catIndex === 2 ? "estaciones" : catIndex === 3 ? "actuadores" : undefined}
                className="mb-10 scroll-mt-20"
              >
                <Card className="border-emerald-200/50">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-transparent">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <category.icon className="w-5 h-5 text-emerald-600" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid gap-4">
                      {category.products.map((product, prodIndex) => (
                        <div key={prodIndex} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-emerald-50 transition-colors">
                          <div>
                            <h4 className="font-semibold text-slate-800">{product.name}</h4>
                            <p className="text-sm text-slate-500">{product.specs}</p>
                          </div>
                          <Badge variant="outline" className="border-emerald-300 text-emerald-700 font-semibold">
                            {product.price}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            ))}
          </div>

          {/* Drones Section */}
          <section id="drones" className="mb-16 scroll-mt-20">
            <Card className="border-emerald-200/50 bg-gradient-to-br from-white to-teal-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Wind className="w-5 h-5 text-emerald-600" />
                  Drones y Teledetección
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-semibold text-slate-800 mb-2">DJI Phantom 4 Multispectral</h4>
                    <p className="text-sm text-slate-600 mb-3">Dron con cámara multiespectral de 6 bandas para análisis de vegetación.</p>
                    <Badge className="bg-emerald-100 text-emerald-700">Servicio de vuelo incluido</Badge>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-semibold text-slate-800 mb-2">Imágenes Satelitales</h4>
                    <p className="text-sm text-slate-600 mb-3">Acceso a datos Sentinel-2 y Planet Labs con resolución hasta 3m.</p>
                    <Badge className="bg-teal-100 text-teal-700">Suscripción mensual disponible</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Engineering Services Section */}
          <section id="ingenieria" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Wrench className="w-6 h-6 text-emerald-600" />
              Servicios de Ingeniería
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="border-emerald-200/50 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2 text-sm text-slate-500">
                          <Leaf className="w-3 h-3 text-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Data Integration Section */}
          <section id="integracion" className="mb-16 scroll-mt-20">
            <Card className="border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Cpu className="w-5 h-5 text-emerald-600" />
                  Integración de Datos - Compatible Gaia-X
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  Todos nuestros equipos y servicios están preparados para integrarse con 
                  espacios de datos federados siguiendo los estándares europeos Gaia-X.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-emerald-600">API REST</div>
                    <div className="text-sm text-slate-500">Integración estándar</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-emerald-600">MQTT</div>
                    <div className="text-sm text-slate-500">Tiempo real IoT</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-emerald-600">FIWARE</div>
                    <div className="text-sm text-slate-500">Context Broker</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <Card className="border-emerald-300 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-4">¿Necesitas una solución personalizada?</h3>
              <p className="mb-6 text-emerald-100">
                Nuestro equipo de ingeniería diseña soluciones a medida para cada explotación.
              </p>
              <Button className="bg-white text-emerald-700 hover:bg-emerald-50">
                Solicitar Presupuesto
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>

      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
};

export default TeleNaturaCatalogo;
