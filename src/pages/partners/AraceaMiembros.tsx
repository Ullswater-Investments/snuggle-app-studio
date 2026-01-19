import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FundingFooter } from "@/components/FundingFooter";
import { motion } from "framer-motion";
import { 
  Factory, 
  ShieldCheck, 
  Leaf, 
  ArrowRight, 
  Info, 
  Building2, 
  HardHat, 
  Recycle, 
  Database, 
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Users,
  FileText
} from "lucide-react";

const AraceaMiembros = () => {
  const { logout } = usePartnerAuth("aracea");

  const handleLogout = () => {
    logout();
    window.location.href = "/partners/aracea";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header con navegación */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/partners" className="text-slate-500 hover:text-slate-700 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Factory className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">OFICEMEN / ARACEA</h1>
                  <p className="text-xs text-slate-500">Espacio de Datos Sectorial</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                <ShieldCheck className="h-3 w-3" />
                Área de Miembros
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-slate-600 hover:text-slate-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Industrial & Sostenible */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Fondo con gradiente industrial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black opacity-80" />
        {/* Patrón de textura */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzFhMWExYSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiMzMzMiPjwvY2lyY2xlPgo8L3N2Zz4=')]" />
        
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge de Homologación */}
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/50 rounded-full px-4 py-1.5 text-orange-300 text-sm font-semibold mb-8">
              <ShieldCheck className="h-4 w-4" />
              Homologado por SEDIA (Kit Espacio de Datos)
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              El Espacio de Datos del <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Sector Cemento
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed px-4">
              Únete al <strong className="text-white">Nodo OFICEMEN/ARACEA</strong>. La infraestructura soberana para liderar la descarbonización, la trazabilidad del CO2 y la economía circular en la industria.
              <span className="text-orange-400 font-semibold mt-3 block">
                Financiación garantizada al 100% por Fondos NextGen.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 rounded-xl font-bold text-lg shadow-lg shadow-orange-900/30 hover:scale-105 transition-all"
              >
                Solicitar Adhesión al Nodo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-600 bg-transparent hover:bg-slate-800/50 text-white px-8 py-6 rounded-xl font-bold text-lg"
              >
                <Database className="mr-2 h-5 w-5" /> Ver Arquitectura Técnica
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección de Propuesta de Valor - Casos de Uso */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Impulsando la Competitividad Industrial
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Más allá de la financiación, el Espacio de Datos resuelve los retos críticos del sector cementero mediante la compartición segura de información.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {/* Caso 1: CO2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="h-7 w-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Pasaporte Digital de CO2</h3>
              <p className="text-slate-600 leading-relaxed">
                Traza la huella de carbono exacta desde la cantera hasta el cliente final. Automatiza el cumplimiento de normativas europeas (ETS, CBAM) con datos irrefutables.
              </p>
            </motion.div>

            {/* Caso 2: Economía Circular */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Recycle className="h-7 w-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Economía Circular y Residuos</h3>
              <p className="text-slate-600 leading-relaxed">
                Marketplace industrial para la valorización energética. Conecta generadores de residuos con plantas cementeras para optimizar el uso de combustibles alternativos.
              </p>
            </motion.div>

            {/* Caso 3: Soberanía */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Soberanía del Dato Industrial</h3>
              <p className="text-slate-600 leading-relaxed">
                Tus secretos industriales nunca salen de tus servidores. Utiliza tecnología "Compute-to-Data" para compartir insights sin exponer la materia prima.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de Precios - Kit Espacio de Datos */}
      <section className="py-20 md:py-24 px-6 bg-slate-100" id="pricing">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Coste Cero para el Ecosistema
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Gracias al programa <strong className="text-orange-600">KIT ESPACIO DE DATOS</strong>, subvencionamos el 100% de la creación del nodo para la asociación (Promotor) y la conexión de sus miembros (Participantes).
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
            
            {/* Tarjeta Promotor (ARACEA/OFICEMEN) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 max-w-lg bg-white border-2 border-orange-500 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header Tarjeta */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-5 font-bold text-xl flex items-center gap-3">
                <Building2 className="h-7 w-7 text-orange-200" />
                PROMOTOR (Asociación/Clúster)
              </div>
              
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                {/* Precio Principal */}
                <div className="text-center mb-8 border-b border-gray-100 pb-8">
                  <p className="text-sm font-bold text-orange-600 tracking-wider uppercase mb-2">COSTE DESARROLLO NODO PROPIETARIO</p>
                  <div className="text-5xl sm:text-6xl font-extrabold text-slate-900">30.000 €</div>
                  <p className="text-slate-500 mt-2">Infraestructura central y gobernanza</p>
                </div>

                {/* Pasos de Financiación */}
                <div className="space-y-4 sm:space-y-5 flex-1">
                  {/* Paso 1 */}
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-orange-500 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-sm flex-shrink-0">1</div>
                      <div>
                        <p className="font-bold text-slate-900 text-base sm:text-lg">A la firma (Anticipo)</p>
                        <p className="text-xs sm:text-sm text-slate-600">Configuración instancia inicial</p>
                      </div>
                    </div>
                    <span className="font-bold text-orange-700 text-lg sm:text-xl whitespace-nowrap">5.000 €</span>
                  </div>

                  {/* Paso 2 */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-green-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-sm flex-shrink-0">2</div>
                      <div>
                        <p className="font-bold text-slate-900 text-base sm:text-lg">Concesión Ayuda</p>
                        <p className="text-xs sm:text-sm text-slate-600">Tramitación Kit Espacio Datos</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-700 text-lg sm:text-xl whitespace-nowrap">30.000 €</span>
                  </div>

                  {/* Paso 3 */}
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-orange-500 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-sm flex-shrink-0">3</div>
                      <div>
                        <p className="font-bold text-slate-900 text-base sm:text-lg leading-tight">Pago diferido</p>
                        <p className="text-xs sm:text-sm text-slate-600">Contra resolución favorable</p>
                      </div>
                    </div>
                    <span className="font-bold text-orange-700 text-lg sm:text-xl whitespace-nowrap">25.000 €</span>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 bg-blue-50 border border-blue-200 p-4 sm:p-5 rounded-xl flex gap-3 sm:gap-4 text-sm text-blue-900 leading-relaxed shadow-sm">
                  <Info className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-blue-600 mt-0.5" />
                  <p>Los 30.000€ son <strong>100% subvencionables</strong>. Recuperas el anticipo inicial al cobrar la ayuda de Red.es.</p>
                </div>
              </div>
            </motion.div>

            {/* Tarjeta Participante (Empresas Cementeras) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 max-w-lg bg-white border-2 border-slate-300 rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Header Tarjeta */}
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-5 font-bold text-xl flex items-center gap-3">
                <HardHat className="h-7 w-7 text-slate-300" />
                PARTICIPANTE (Empresas Asociadas)
              </div>
              
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                {/* Precio Principal */}
                <div className="text-center mb-8 border-b border-gray-100 pb-8">
                  <p className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-2">COSTE DE CONEXIÓN (ANUALIDAD)</p>
                  <div className="text-5xl sm:text-6xl font-extrabold text-slate-900">3.000 €</div>
                  <p className="text-slate-500 mt-2">por planta / empresa participante</p>
                </div>

                {/* Pasos de Financiación */}
                <div className="space-y-4 sm:space-y-5 flex-1">
                  {/* Paso 1 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-slate-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-sm flex-shrink-0">1</div>
                      <div>
                        <p className="font-bold text-slate-900 text-base sm:text-lg">Firma Contrato 1 año</p>
                        <p className="text-xs sm:text-sm text-slate-600">Alta identidad y wallet seguro</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-bold text-slate-800 text-lg sm:text-xl block">250 €</span>
                      <span className="text-xs sm:text-sm text-slate-500">al mes</span>
                    </div>
                  </div>

                  {/* Paso 2 */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-green-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-sm flex-shrink-0">2</div>
                      <div>
                        <p className="font-bold text-slate-900 text-base sm:text-lg">Concesión Ayuda</p>
                        <p className="text-xs sm:text-sm text-slate-600">Subvención Kit Espacio Datos</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-700 text-lg sm:text-xl whitespace-nowrap">15.000 €</span>
                  </div>

                  {/* Paso 3 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-slate-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-sm flex-shrink-0">3</div>
                      <div>
                        <p className="font-bold text-slate-900 text-base sm:text-lg leading-tight">Renovación diferida</p>
                        <p className="text-xs sm:text-sm text-slate-600">Contra resolución favorable</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-800 text-lg sm:text-xl whitespace-nowrap">3.000 €</span>
                  </div>
                </div>

                {/* Footer Info - KEY VALUE PROP */}
                <div className="mt-8 bg-blue-50 border border-blue-200 p-4 sm:p-5 rounded-xl flex gap-3 sm:gap-4 text-sm text-blue-900 leading-relaxed shadow-sm">
                  <Info className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-blue-600 mt-0.5" />
                  <p>
                    <strong className="block text-blue-700 text-base mb-1">¡Oportunidad de Digitalización!</strong>
                    El participante dispone de hasta <strong>9.000€ de excedente</strong> (tras pagar la conexión) para financiar horas internas de adaptación de datos.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Sección Roadmap - 3 Pasos */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Cómo Activar tu Participación
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              En solo tres pasos, tu organización estará conectada al ecosistema de datos del sector cemento.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8" />
              </div>
              <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Solicita Adhesión</h3>
              <p className="text-slate-600">Completa el formulario de adhesión al nodo ARACEA. Nuestro equipo te contactará en 24h.</p>
            </motion.div>

            {/* Paso 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8" />
              </div>
              <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Tramitamos la Ayuda</h3>
              <p className="text-slate-600">Te acompañamos en la solicitud del Kit Espacio de Datos ante Red.es. Sin coste adicional.</p>
            </motion.div>

            {/* Paso 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Conecta tu Planta</h3>
              <p className="text-slate-600">Activa tu identidad digital y wallet. Empieza a compartir datos de forma segura y soberana.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 px-6 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Únete al Nodo ARACEA
            </h2>
            <p className="text-lg sm:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Lidera la transición digital del sector cemento. Descarbonización, trazabilidad y soberanía del dato con financiación 100% garantizada.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-orange-700 px-8 py-6 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-all"
              >
                Solicitar Adhesión <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/50 bg-transparent hover:bg-white/10 text-white px-8 py-6 rounded-xl font-bold text-lg"
              >
                Contactar con OFICEMEN
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FundingFooter variant="dark" />
    </div>
  );
};

export default AraceaMiembros;
