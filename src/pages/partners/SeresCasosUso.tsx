import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2, ShoppingCart, Wind, Heart, Globe, Radio } from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import Scope3Visual from "@/components/partners/seres/visuals/Scope3Visual";

const cases = [
  { id: "nestle", name: "Nestlé", sector: "Gran Consumo", years: "+25 años", desc: "Cliente histórico con soluciones EDI para intercambio masivo de documentos. Evolución hacia Data Space.", icon: ShoppingCart, color: "from-blue-500 to-cyan-600" },
  { id: "coviran", name: "Covirán", sector: "Retail Cooperativo", years: "Activo", desc: "Predicción de demanda federada entre cooperativistas. Digitalización de recepción de facturas y SII.", icon: ShoppingCart, color: "from-emerald-500 to-teal-600" },
  { id: "ilunion", name: "Ilunion", sector: "Impacto Social", years: "Activo", desc: "VCs de impacto social en cada factura. Certificación automática para CSRD sin auditorías manuales.", icon: Heart, color: "from-purple-500 to-violet-600" },
  { id: "siemens", name: "Siemens Gamesa", sector: "Energía/Industria", years: "Activo", desc: "Pasaporte Digital del Producto (DPP) para Alcance 3. Interoperabilidad con Catena-X.", icon: Wind, color: "from-amber-500 to-orange-600" },
  { id: "amadeus", name: "Amadeus", sector: "LATAM Multipaís", years: "Activo", desc: "Centralización de facturación electrónica en Latinoamérica cumpliendo normativas nacionales.", icon: Globe, color: "from-pink-500 to-rose-600" },
  { id: "bt", name: "BT Telecom", sector: "Telecomunicaciones", years: "Activo", desc: "Transición exitosa a emisión de factura electrónica para Administraciones Públicas.", icon: Radio, color: "from-slate-500 to-zinc-600" }
];

const SeresCasosUso = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/partners/seres/miembros")} className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Casos de Uso por Sector</h1>
                <p className="text-xs text-slate-400">Aplicaciones reales de PROCUREDATA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card 
                className="bg-slate-800/50 border-slate-700/50 h-full hover:border-blue-500/50 transition-colors cursor-pointer group"
                onClick={() => navigate(`/partners/seres/miembros/casos-uso/${c.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <c.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-slate-400 border-slate-600">{c.years}</Badge>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-400 transition-colors">{c.name}</CardTitle>
                  <Badge className="w-fit bg-slate-700/50 text-slate-300">{c.sector}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 mb-4">{c.desc}</p>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                    Ver caso completo →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Caso Destacado: Siemens Gamesa y Alcance 3</CardTitle>
            </CardHeader>
            <CardContent>
              <Scope3Visual />
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default SeresCasosUso;
