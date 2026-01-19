import React from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, LogOut, Rocket, FileDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { useNavigate } from "react-router-dom";
import StrategicMatrix20 from "@/components/partners/closerstill/StrategicMatrix20";
import PilotLaunchpad from "@/components/partners/closerstill/PilotLaunchpad";
import ExecutionRoadmap from "@/components/partners/closerstill/ExecutionRoadmap";

const CloserStillPioneer = () => {
  const { logout } = usePartnerAuth("closerstill");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/partners/closerstill");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-violet-900/20 to-slate-900 text-white border-b border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/partners/closerstill/miembros" className="text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">CloserStill Media</h1>
                <p className="text-sm text-white/70">e-Show Pioneer Program</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                <Lock className="h-3 w-3 mr-1" />
                Estratégico
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-violet-900/30 to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
            Propuesta Ejecutiva - Enero 2026
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            e-Show <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-violet-400">Pioneer</span> Program
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            De Feria de 2 Días a <span className="text-violet-400 font-semibold">Infraestructura Crítica</span> del Sector Digital.
            <br />
            20 Casos de Uso · 3 Pilotos Prioritarios · Roadmap de Ejecución
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-violet-500 hover:bg-violet-600 text-white">
              <Rocket className="h-5 w-5 mr-2" />
              Activar Programa
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
              <FileDown className="h-5 w-5 mr-2" />
              Descargar PDF Ejecutivo
            </Button>
          </div>
        </div>
      </section>

      {/* Strategic Matrix Section */}
      <StrategicMatrix20 />

      {/* Pilot Launchpad Section */}
      <PilotLaunchpad />

      {/* Execution Roadmap Section */}
      <ExecutionRoadmap />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">
            Documento confidencial · CloserStill Media × ProcureData · 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CloserStillPioneer;
