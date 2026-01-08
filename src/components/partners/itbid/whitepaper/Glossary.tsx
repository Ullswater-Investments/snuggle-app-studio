import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const glossaryTerms = [
  {
    term: "DID",
    fullName: "Decentralized Identifier",
    category: "Identidad",
    definition: "Identificador único descentralizado que permite a una entidad probar su identidad sin depender de autoridades centrales. Formato: did:ethr:0x7ecc:0x..."
  },
  {
    term: "ODRL",
    fullName: "Open Digital Rights Language",
    category: "Gobernanza",
    definition: "Lenguaje estándar W3C para expresar políticas de uso de datos de forma que las máquinas puedan interpretarlas y ejecutarlas automáticamente."
  },
  {
    term: "EDC",
    fullName: "Eclipse Dataspace Connector",
    category: "Infraestructura",
    definition: "Conector de código abierto que implementa el protocolo IDS para la transferencia segura de datos entre participantes de un espacio de datos."
  },
  {
    term: "Gaia-X",
    fullName: "European Data Infrastructure",
    category: "Ecosistema",
    definition: "Iniciativa europea para crear una infraestructura de datos federada, segura y soberana, con estándares comunes de interoperabilidad y confianza."
  },
  {
    term: "SSI",
    fullName: "Self-Sovereign Identity",
    category: "Identidad",
    definition: "Modelo de identidad digital donde el usuario tiene control total sobre sus datos de identidad, sin depender de proveedores centralizados."
  },
  {
    term: "RLS",
    fullName: "Row Level Security",
    category: "Seguridad",
    definition: "Mecanismo de base de datos que restringe el acceso a filas individuales basándose en políticas definidas, garantizando aislamiento multi-tenant."
  },
  {
    term: "EUROe",
    fullName: "Euro Stablecoin",
    category: "Pagos",
    definition: "Token ERC-20 anclado 1:1 al Euro, utilizado para pagos verificables y transparentes dentro del ecosistema ITBID-X."
  },
  {
    term: "IDSA",
    fullName: "International Data Spaces Association",
    category: "Estándares",
    definition: "Asociación que define los estándares de arquitectura para espacios de datos soberanos, incluyendo el modelo tripartito de roles."
  },
  {
    term: "Data Subject",
    fullName: "Propietario del Dato",
    category: "Roles",
    definition: "Entidad que posee los datos originales y tiene autoridad legal para decidir sobre su uso y distribución."
  },
  {
    term: "Data Holder",
    fullName: "Custodio Técnico",
    category: "Roles",
    definition: "Entidad neutral que almacena y entrega los datos siguiendo las instrucciones del Data Subject y verificando las credenciales del Consumer."
  },
  {
    term: "Data Consumer",
    fullName: "Solicitante de Datos",
    category: "Roles",
    definition: "Entidad que solicita acceso a datos para un propósito específico, aceptando las condiciones definidas por el Data Subject."
  },
  {
    term: "CSRD",
    fullName: "Corporate Sustainability Reporting Directive",
    category: "Regulación",
    definition: "Directiva europea que obliga a las empresas a reportar información sobre sostenibilidad de forma estandarizada y verificable."
  },
  {
    term: "Pontus-X",
    fullName: "Gaia-X Blockchain Network",
    category: "Infraestructura",
    definition: "Red blockchain compatible con Ethereum que forma parte del ecosistema Gaia-X para registro inmutable de transacciones de datos."
  },
  {
    term: "Self-Description",
    fullName: "Gaia-X Participant Credential",
    category: "Trust",
    definition: "Documento firmado digitalmente que certifica las características, capacidades y cumplimiento normativo de un participante en Gaia-X."
  }
];

const categories = [...new Set(glossaryTerms.map(t => t.category))];

export const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
          <span className="text-sm font-medium text-[hsl(var(--itbid-lime))] uppercase tracking-wider">
            11 — Glosario
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            Términos Clave
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            Definiciones de la terminología técnica utilizada en el ecosistema ITBID-X 
            y los espacios de datos federados Gaia-X.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar término..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Todos
                  </Badge>
                  {categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Terms List */}
        <div className="space-y-4">
          {filteredTerms.map((item, index) => (
            <motion.div
              key={item.term}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-[hsl(var(--itbid-cyan))]" />
                      <div>
                        <CardTitle className="text-base">
                          <span className="font-bold">{item.term}</span>
                          <span className="text-muted-foreground font-normal ml-2">
                            ({item.fullName})
                          </span>
                        </CardTitle>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.definition}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No se encontraron términos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};
