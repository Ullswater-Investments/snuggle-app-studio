import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, ExternalLink } from "lucide-react";
import itbidLogo from "@/assets/itbid-logo.png";

const partners = [
  {
    id: "itbid",
    name: "ITBID",
    description: "Plataforma líder de licitaciones y contratación pública. Colaboración estratégica para proyectos de datos en el sector público.",
    logo: itbidLogo,
    link: "/partners/itbid",
    status: "activo",
    projects: 3,
  },
];

const Partners = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10">
            <Handshake className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Partners</h1>
            <p className="text-muted-foreground">Ecosistema de colaboración estratégica</p>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <p className="text-lg leading-relaxed">
            La sección <span className="font-semibold text-primary">Partners</span> de PROCUREDATA está dirigida a 
            proyectos desarrollados en colaboración con nuestros partners estratégicos. Cada partner dispone de un 
            espacio dedicado con funcionalidades específicas, proyectos exclusivos y acceso a datos compartidos 
            bajo estrictos protocolos de gobernanza.
          </p>
        </CardContent>
      </Card>

      {/* Grid de Partners */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Directorio de Partners</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <Card 
              key={partner.id} 
              className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-16 flex items-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                    {partner.status}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-xl">{partner.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {partner.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-foreground">{partner.projects}</span> proyectos activos
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full group-hover:bg-primary/90">
                  <Link to={partner.link} className="flex items-center gap-2">
                    Acceder a proyectos
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* Placeholder para futuros partners */}
          <Card className="border-dashed border-2 bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
              <Handshake className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                Próximamente más partners
              </p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Estamos ampliando nuestro ecosistema
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Partners;
