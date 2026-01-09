import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { 
  FileText, Building, CreditCard, Leaf, 
  ClipboardCheck, Package, Star, Clock 
} from "lucide-react";

const dataCategories = [
  {
    icon: Building,
    category: "Datos Identificativos",
    color: "hsl(var(--itbid-cyan))",
    description: "Información básica de identificación y contacto del proveedor",
    dataTypes: [
      { name: "Razón Social", example: "Industrias XYZ, S.L." },
      { name: "CIF / NIF", example: "B12345678" },
      { name: "Dirección Fiscal", example: "C/ Industrial 45, 08001 Barcelona" },
      { name: "Contacto Principal", example: "Juan García - jgarcia@xyz.com" },
      { name: "Representante Legal", example: "María López - Administradora Única" },
    ],
  },
  {
    icon: CreditCard,
    category: "Datos Financieros",
    color: "hsl(var(--itbid-magenta))",
    description: "Información económica y de solvencia del proveedor",
    dataTypes: [
      { name: "Scoring Crediticio", example: "Score: 78/100 (Bajo riesgo)" },
      { name: "Estados Financieros", example: "Balance, PyG 2023" },
      { name: "Historial de Pagos", example: "Media: 32 días" },
      { name: "Límite de Crédito Recomendado", example: "€150.000" },
      { name: "Rating de Solvencia", example: "BBB+" },
    ],
  },
  {
    icon: Leaf,
    category: "Datos ESG",
    color: "hsl(var(--itbid-lime))",
    description: "Métricas ambientales, sociales y de gobernanza",
    dataTypes: [
      { name: "Emisiones Scope 1", example: "1,250 tCO2e/año" },
      { name: "Emisiones Scope 2", example: "890 tCO2e/año" },
      { name: "Energía Renovable", example: "67% del consumo" },
      { name: "Certificación ISO 14001", example: "Válida hasta 2026" },
      { name: "Huella de Carbono Producto", example: "2.3 kgCO2e/unidad" },
    ],
  },
  {
    icon: ClipboardCheck,
    category: "Datos de Homologación",
    color: "hsl(218, 80%, 60%)",
    description: "Certificaciones y validaciones oficiales",
    dataTypes: [
      { name: "ISO 9001", example: "Certificado por AENOR" },
      { name: "ISO 45001", example: "Seguridad laboral" },
      { name: "FSSC 22000", example: "Seguridad alimentaria" },
      { name: "Actas Notariales", example: "Poderes actualizados" },
      { name: "Seguros", example: "RC €2M vigente" },
    ],
  },
  {
    icon: Star,
    category: "Datos de Evaluación",
    color: "hsl(280, 70%, 50%)",
    description: "Reputación y rendimiento en transacciones",
    dataTypes: [
      { name: "Rating Medio", example: "4.7/5 (142 reviews)" },
      { name: "Tiempo de Respuesta", example: "Media: 4.2 horas" },
      { name: "Cumplimiento de Plazos", example: "94% on-time" },
      { name: "Incidencias", example: "2 últimos 12 meses" },
      { name: "Recurrencia Clientes", example: "78% repiten" },
    ],
  },
  {
    icon: Package,
    category: "Datos Transaccionales",
    color: "hsl(25, 90%, 50%)",
    description: "Información operativa de pedidos y entregas (futuro)",
    dataTypes: [
      { name: "Pedidos Activos", example: "12 en curso" },
      { name: "Albaranes Pendientes", example: "3 por confirmar" },
      { name: "Facturas Emitidas", example: "€45.230 último mes" },
      { name: "Stock Disponible", example: "Real-time via API" },
      { name: "Capacidad Productiva", example: "80% ocupación" },
    ],
  },
];

export const DocTiposInformacion = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] border-[hsl(var(--itbid-cyan)/0.3)]">
              <FileText className="h-3 w-3 mr-1" />
              Sección 9
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tipos de Información del Proveedor
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              El espacio de datos es <strong>agnóstico al tipo de información</strong>, pero priorizamos 
              las categorías más relevantes para procesos de compras y homologación de proveedores.
            </p>
          </div>
        </FadeIn>

        {/* Data Category Cards */}
        <FadeIn delay={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCategories.map((category, index) => (
              <Card 
                key={category.category} 
                className="hover:shadow-lg transition-shadow border-t-4"
                style={{ borderTopColor: category.color }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <category.icon className="h-6 w-6" style={{ color: category.color }} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <div className="space-y-2">
                    {category.dataTypes.map((dataType) => (
                      <div 
                        key={dataType.name} 
                        className="flex justify-between items-start text-sm p-2 rounded-lg bg-muted/50"
                      >
                        <span className="font-medium">{dataType.name}</span>
                        <span className="text-muted-foreground text-xs text-right max-w-[50%]">{dataType.example}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* Priority Note */}
        <FadeIn delay={0.2}>
          <Card className="mt-12 bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.1)] to-[hsl(var(--itbid-magenta)/0.1)]">
            <CardContent className="py-8">
              <div className="flex items-start gap-4 max-w-3xl mx-auto">
                <Clock className="h-10 w-10 text-[hsl(var(--itbid-cyan))] shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Prioridad de Implementación</h3>
                  <p className="text-muted-foreground mb-4">
                    Para el piloto ITBID-X, recomendamos comenzar con:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg bg-card border border-[hsl(var(--itbid-cyan)/0.3)]">
                      <p className="font-semibold text-[hsl(var(--itbid-cyan))]">Fase 1</p>
                      <p className="text-sm text-muted-foreground">Identificativos + Homologación</p>
                    </div>
                    <div className="p-3 rounded-lg bg-card border border-[hsl(var(--itbid-magenta)/0.3)]">
                      <p className="font-semibold text-[hsl(var(--itbid-magenta))]">Fase 2</p>
                      <p className="text-sm text-muted-foreground">Financieros + ESG</p>
                    </div>
                    <div className="p-3 rounded-lg bg-card border border-[hsl(var(--itbid-lime)/0.3)]">
                      <p className="font-semibold text-[hsl(var(--itbid-lime))]">Fase 3</p>
                      <p className="text-sm text-muted-foreground">Evaluación + Transaccionales</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
