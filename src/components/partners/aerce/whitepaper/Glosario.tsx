import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const terminos = [
  { termino: "CPO", definicion: "Chief Procurement Officer. Máximo responsable de la función de Compras en una organización.", categoria: "Roles" },
  { termino: "UNE 15896", definicion: "Norma española que define los requisitos de competencia y certificación para profesionales de Compras.", categoria: "Normativa" },
  { termino: "IFPSM", definicion: "International Federation of Purchasing and Supply Management. Federación internacional que armoniza estándares de certificación.", categoria: "Instituciones" },
  { termino: "Category Management", definicion: "Enfoque estratégico de gestión de compras por familias de productos o servicios.", categoria: "Metodología" },
  { termino: "Sourcing", definicion: "Proceso de identificación, evaluación y selección de proveedores para una categoría.", categoria: "Procesos" },
  { termino: "TCO", definicion: "Total Cost of Ownership. Coste total de propiedad incluyendo adquisición, operación y fin de vida.", categoria: "Métricas" },
  { termino: "RFx", definicion: "Solicitudes formales a proveedores: RFI (Información), RFP (Propuesta), RFQ (Cotización).", categoria: "Procesos" },
  { termino: "SRM", definicion: "Supplier Relationship Management. Gestión estratégica de las relaciones con proveedores.", categoria: "Metodología" },
  { termino: "Spend Analysis", definicion: "Análisis del gasto para identificar oportunidades de ahorro y consolidación.", categoria: "Procesos" },
  { termino: "ESG", definicion: "Environmental, Social, Governance. Criterios de sostenibilidad y gobernanza corporativa.", categoria: "Sostenibilidad" },
  { termino: "CSRD", definicion: "Corporate Sustainability Reporting Directive. Directiva UE de reporting de sostenibilidad.", categoria: "Normativa" },
  { termino: "Due Diligence", definicion: "Proceso de investigación y verificación de proveedores antes de su contratación.", categoria: "Procesos" },
  { termino: "Scope 3", definicion: "Emisiones indirectas de gases de efecto invernadero en la cadena de valor.", categoria: "Sostenibilidad" },
  { termino: "P2P", definicion: "Procure-to-Pay. Proceso end-to-end desde la requisición hasta el pago al proveedor.", categoria: "Procesos" },
  { termino: "Maverick Spending", definicion: "Gasto fuera de contrato o sin seguir los procedimientos de compras establecidos.", categoria: "Métricas" },
  { termino: "Tail Spend", definicion: "Gasto fragmentado de bajo valor que representa alto número de transacciones.", categoria: "Métricas" },
];

const categorias = ["Todos", "Roles", "Normativa", "Instituciones", "Metodología", "Procesos", "Métricas", "Sostenibilidad"];

export const Glosario = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const terminosFiltrados = terminos.filter(t => {
    const matchBusqueda = t.termino.toLowerCase().includes(busqueda.toLowerCase()) ||
                          t.definicion.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = categoriaActiva === "Todos" || t.categoria === categoriaActiva;
    return matchBusqueda && matchCategoria;
  });

  return (
    <div className="py-16 px-4 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
            12 — Glosario
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            Términos Clave en Compras
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            Vocabulario esencial para el profesional de Compras moderno.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar término..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <Badge
                key={cat}
                variant={categoriaActiva === cat ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setCategoriaActiva(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Terms Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base">
                  {terminosFiltrados.length} términos encontrados
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {terminosFiltrados.map((item, index) => (
                <motion.div
                  key={item.termino}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-blue-600">{item.termino}</span>
                        <Badge variant="secondary" className="text-xs">
                          {item.categoria}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.definicion}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
