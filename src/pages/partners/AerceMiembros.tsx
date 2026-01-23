import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { 
  ArrowLeft, 
  LogOut, 
  FileText, 
  BookOpen, 
  ScrollText, 
  GraduationCap, 
  Award, 
  Users, 
  Calendar, 
  ExternalLink,
  Shield
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const AerceMiembros = () => {
  const { session, logout } = usePartnerAuth("aerce");

  const handleLogout = () => {
    logout();
    window.location.href = "/partners";
  };

  const documentos = [
    {
      title: "Doc Proyecto",
      description: "Presentación ejecutiva de AERCE: misión, servicios y propuesta de valor para profesionales de Compras.",
      icon: FileText,
      href: "/partners/aerce/proyecto",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      badge: "Ejecutivo"
    },
    {
      title: "Doc Técnico",
      description: "Marco técnico completo sobre certificación UNE 15896, formación y desarrollo profesional.",
      icon: BookOpen,
      href: "/partners/aerce/doc-tecnico",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      badge: "Técnico"
    },
    {
      title: "White Paper",
      description: "Análisis estratégico del sector de Compras, modelo de excelencia AERCE y hoja de ruta 2025.",
      icon: ScrollText,
      href: "/partners/aerce/whitepaper",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      badge: "Estratégico"
    }
  ];

  const recursosAdicionales = [
    {
      title: "Formación Online",
      description: "Accede a cursos y masters especializados",
      icon: GraduationCap,
      href: "#",
      external: true
    },
    {
      title: "Certificación UNE 15896",
      description: "Proceso de certificación profesional",
      icon: Award,
      href: "#",
      external: true
    },
    {
      title: "Foro CPO",
      description: "Comunidad de directivos de compras",
      icon: Users,
      href: "#",
      external: true
    },
    {
      title: "Eventos AERCE",
      description: "Calendario de eventos y networking",
      icon: Calendar,
      href: "#",
      external: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/partners">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Partners
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/f72d5c01-0779-4cb5-bf22-feb5375a9de3.png" 
              alt="AERCE" 
              className="h-8 object-contain"
            />
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <Shield className="h-3 w-3 mr-1" />
              Área de Miembros
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GraduationCap className="h-4 w-4" />
            Bienvenido al espacio exclusivo para miembros
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Área de Miembros <span className="text-blue-600">AERCE</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Accede a documentación exclusiva, recursos formativos y contenido estratégico 
            diseñado para impulsar tu carrera profesional en el ámbito de las Compras.
          </p>
        </div>

        {/* Documents Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            Documentación Institucional
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {documentos.map((doc) => (
              <Card key={doc.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200 dark:hover:border-blue-800">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${doc.color}`}>
                      <doc.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline">{doc.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{doc.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {doc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full group-hover:bg-blue-600">
                    <Link to={doc.href}>
                      Acceder al documento
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            Recursos Adicionales
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recursosAdicionales.map((recurso) => (
              <Card key={recurso.title} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <recurso.icon className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {recurso.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {recurso.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Info Banner */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">¿Necesitas más información?</h3>
              <p className="text-blue-100">
                Contacta con el equipo de AERCE para resolver cualquier duda sobre tu membresía.
              </p>
            </div>
            <Button variant="secondary" className="whitespace-nowrap">
              Contactar con AERCE
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-900 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} AERCE - Asociación Española de Responsables de Compras y Existencias</p>
          <p className="mt-1">Contenido exclusivo para miembros registrados</p>
        </div>
      </footer>
    </div>
  );
};

export default AerceMiembros;
