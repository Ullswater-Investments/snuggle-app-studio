import { Link } from "react-router-dom";
import { ArrowLeft, LogOut, Lock, Lightbulb, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { useNavigate } from "react-router-dom";
import EShowInnovationGallery from "@/components/partners/closerstill/EShowInnovationGallery";

const CloserStillInnovation = () => {
  const { logout } = usePartnerAuth("closerstill");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/partners/closerstill");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white border-b border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/partners/closerstill/miembros" className="text-white/70 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">CloserStill Media</h1>
                <p className="text-sm text-white/70">Innovation Gallery</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                <Lock className="h-3 w-3 mr-1" />
                Documento Confidencial
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 border-b border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Lightbulb className="h-3 w-3 mr-1" />
            Estrategia de Innovación e-Show 2026
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              10 Casos de Uso Disruptivos
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Transformamos el e-Show de un "evento puntual" a una "infraestructura crítica" del sector digital. 
            Cada caso de uso genera nuevos ingresos utilizando la tecnología de Espacios de Datos Federados (Gaia-X/Pontus-X).
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-rose-500/50 text-rose-400">
              🛍️ 3 Casos Retail
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              💻 3 Casos Tech & AI
            </Badge>
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
              🏭 4 Casos Business
            </Badge>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <EShowInnovationGallery />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">
              Powered by <span className="text-blue-400">ProcureData</span> × <span className="text-purple-400">Gaia-X</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CloserStillInnovation;
