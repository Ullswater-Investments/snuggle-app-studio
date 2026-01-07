import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronDown, Search, BookOpen, Code, Coins, Database, ShoppingBag, CheckCircle2, XCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: "tech" | "blockchain" | "governance" | "business";
}

const glossaryTerms: GlossaryTerm[] = [
  // Infraestructura y Desarrollo Web
  { term: "API", definition: "Application Programming Interface. Interfaz que permite la comunicación automatizada entre PROCUREDATA y sistemas externos como ERPs.", category: "tech" },
  { term: "Backend", definition: "Lógica de servidor y gestión de bases de datos que procesa las peticiones de los usuarios.", category: "tech" },
  { term: "CORS", definition: "Cross-Origin Resource Sharing. Protocolo de seguridad que permite o restringe el acceso a recursos desde dominios externos.", category: "tech" },
  { term: "Deno", definition: "Entorno de ejecución para TypeScript usado en nuestras Edge Functions por su seguridad nativa.", category: "tech" },
  { term: "Edge Function", definition: "Código que se ejecuta en la periferia de la red (cerca del usuario) para minimizar la latencia.", category: "tech" },
  { term: "Frontend", definition: "Interfaz visual construida en React con la que interactúan los directores de compras y proveedores.", category: "tech" },
  { term: "JSON-LD", definition: "Formato de datos enlazados que proporciona contexto semántico a la información intercambiada.", category: "tech" },
  { term: "JWT", definition: "JSON Web Token. Estándar de seguridad para transmitir identidades verificadas entre el cliente y el servidor.", category: "tech" },
  { term: "Lovable", definition: "Ecosistema de desarrollo 'Full-Stack' donde se aloja la interfaz y lógica de PROCUREDATA.", category: "tech" },
  { term: "PostgreSQL", definition: "Motor de base de datos relacional que custodia las 28 tablas del sistema.", category: "tech" },
  { term: "REST", definition: "Representational State Transfer. Estilo de arquitectura para el diseño de APIs ligeras y escalables.", category: "tech" },
  { term: "Supabase", definition: "Plataforma de servicios de backend que integra la base de datos, autenticación y funciones serverless.", category: "tech" },
  { term: "TypeScript", definition: "Lenguaje de programación que añade tipado estático a JavaScript para garantizar la robustez del código.", category: "tech" },
  { term: "UUID", definition: "Universally Unique Identifier. Código alfanumérico único asignado a cada organización y transacción.", category: "tech" },
  
  // Blockchain, Web3 y Finanzas
  { term: "ABI", definition: "Application Binary Interface. Diccionario técnico para que el código de la app 'hable' con los Smart Contracts.", category: "blockchain" },
  { term: "Blockchain", definition: "Registro digital compartido e inmutable que actúa como el notario de todas las operaciones.", category: "blockchain" },
  { term: "Chain ID", definition: "Identificador numérico de la red blockchain (Pontus-X: 32460).", category: "blockchain" },
  { term: "DID", definition: "Decentralized Identifier. Identidad digital que pertenece a la empresa y no a una plataforma central.", category: "blockchain" },
  { term: "ERC-20", definition: "Estándar técnico de los tokens fungibles en redes compatibles con Ethereum, como el EUROe.", category: "blockchain" },
  { term: "Escrow", definition: "Mecanismo de custodia donde el pago se retiene hasta que los datos son validados por el comprador.", category: "blockchain" },
  { term: "EUROe", definition: "Moneda digital (Stablecoin) con paridad 1:1 con el euro físico, regulada bajo la normativa MiCA.", category: "blockchain" },
  { term: "Gas Fee", definition: "Tarifa mínima pagada a la red por la computación necesaria para registrar datos en blockchain.", category: "blockchain" },
  { term: "Hash", definition: "Huella criptográfica única generada a partir de un archivo para verificar que no ha sido alterado.", category: "blockchain" },
  { term: "Inmutabilidad", definition: "Garantía de que una vez registrado un dato en la red, nadie puede borrarlo ni modificarlo.", category: "blockchain" },
  { term: "MiCA", definition: "Markets in Crypto-Assets. Reglamento de la UE que otorga el marco legal para el uso del EUROe.", category: "blockchain" },
  { term: "Pontus-X", definition: "Infraestructura blockchain oficial de Gaia-X que sustenta la confianza de PROCUREDATA.", category: "blockchain" },
  { term: "Smart Contract", definition: "Contrato digital que se ejecuta solo cuando se cumplen las condiciones acordadas (ej: liberar pago tras entrega).", category: "blockchain" },
  { term: "Wallet", definition: "Billetera digital que almacena los EUROe y las llaves privadas para firmar transacciones.", category: "blockchain" },
  { term: "Zero-Knowledge Proof", definition: "ZKP. Método para probar que una información es cierta sin revelar el contenido del dato.", category: "blockchain" },
  
  // Gobernanza de Datos e IDSA
  { term: "Asset", definition: "Activo. Cualquier conjunto de datos o servicio disponible para intercambio en el Marketplace.", category: "governance" },
  { term: "Clearing House", definition: "Servicio que facilita la liquidación de acuerdos y el registro de cumplimiento entre partes.", category: "governance" },
  { term: "Conector EDC", definition: "Eclipse Dataspace Connector. El 'enrutador' oficial para el intercambio de datos soberano.", category: "governance" },
  { term: "Constraint", definition: "Restricción. Regla en un contrato ODRL que limita el uso (ej: 'solo para fines de auditoría').", category: "governance" },
  { term: "Consumer", definition: "Consumidor. Rol de la empresa que solicita y utiliza los datos compartidos.", category: "governance" },
  { term: "Data Holder", definition: "Entidad que custodia físicamente el dato y lo entrega bajo instrucciones del propietario.", category: "governance" },
  { term: "Data Space", definition: "Espacio de Datos. Ecosistema federado donde los datos fluyen bajo normas de gobernanza comunes.", category: "governance" },
  { term: "DSSC", definition: "Data Spaces Support Center. Centro europeo que define las reglas del juego para los espacios de datos.", category: "governance" },
  { term: "Gaia-X", definition: "Iniciativa europea para crear una nube soberana, segura y transparente.", category: "governance" },
  { term: "IDS", definition: "International Data Spaces. Estándar de arquitectura para el intercambio de datos confiable.", category: "governance" },
  { term: "ODRL", definition: "Open Digital Rights Language. Lenguaje estándar para escribir políticas de uso y licencias digitales.", category: "governance" },
  { term: "Policy", definition: "Política. El conjunto de permisos y prohibiciones que rigen un intercambio de datos.", category: "governance" },
  { term: "Provider", definition: "Proveedor. Rol de la empresa que ofrece sus datos manteniendo el control sobre ellos.", category: "governance" },
  { term: "Soberanía del Dato", definition: "El derecho absoluto de una empresa a decidir cómo se usa su información compartida.", category: "governance" },
  { term: "Trust Framework", definition: "El conjunto de reglas técnicas y legales que garantizan la confianza entre participantes.", category: "governance" },
  
  // Compras, Sostenibilidad e IA
  { term: "ARIA", definition: "El asistente inteligente de PROCUREDATA entrenado con 10,000 referencias de conocimiento.", category: "business" },
  { term: "Benchmarking", definition: "Comparativa del desempeño propio frente a los líderes del sector de forma anónima.", category: "business" },
  { term: "CSRD", definition: "Corporate Sustainability Reporting Directive. Ley europea que obliga a reportar el impacto ambiental.", category: "business" },
  { term: "Datos Sintéticos", definition: "Información creada por IA que imita la realidad para pruebas sin exponer datos privados.", category: "business" },
  { term: "Embedding", definition: "Conversión de texto a vectores numéricos para que ARIA entienda el significado de las preguntas.", category: "business" },
  { term: "ESG", definition: "Environmental, Social, Governance. Los tres pilares de la inversión y gestión responsable.", category: "business" },
  { term: "Green Partner", definition: "Badge de excelencia otorgado por la plataforma a proveedores sostenibles verificados.", category: "business" },
  { term: "Health Score", definition: "Calificación de la organización basada en la integridad y actualidad de su información.", category: "business" },
  { term: "Homologación", definition: "Proceso de validación legal y técnica de un proveedor antes de su contratación.", category: "business" },
  { term: "KYB", definition: "Know Your Business. Verificación de la legitimidad legal de una empresa en el proceso de registro.", category: "business" },
  { term: "Lead Time", definition: "Tiempo de espera desde el pedido hasta la entrega física de un bien o servicio.", category: "business" },
  { term: "nxm", definition: "Fórmula que representa la ineficiencia de las validaciones redundantes en compras tradicionales.", category: "business" },
  { term: "RAG", definition: "Retrieval-Augmented Generation. Técnica que usa ARIA para consultar documentos antes de responder.", category: "business" },
  { term: "ROI", definition: "Return on Investment. Cálculo del ahorro económico generado por el uso de PROCUREDATA.", category: "business" },
  { term: "Scope 3", definition: "Emisiones indirectas producidas en la cadena de suministro, rastreadas por la plataforma.", category: "business" },
  { term: "Z-Score", definition: "Indicador estadístico que predice la probabilidad de riesgo financiero de un proveedor.", category: "business" }
];

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "¿Qué significa DID en el contexto de PROCUREDATA?",
    options: ["Data Integration Database", "Decentralized Identifier", "Digital Information Document", "Direct Identity Driver"],
    correctIndex: 1,
    explanation: "DID significa Decentralized Identifier: una identidad digital que pertenece a la empresa y no a una plataforma central."
  },
  {
    question: "¿Cuál es la paridad del EUROe con el euro físico?",
    options: ["1:2", "1:1", "1:0.95", "Variable según mercado"],
    correctIndex: 1,
    explanation: "El EUROe tiene paridad 1:1 con el euro físico y está regulado bajo la normativa MiCA."
  },
  {
    question: "¿Qué es ODRL?",
    options: ["Open Data Rights Language", "Online Digital Rights License", "Open Digital Rights Language", "Operational Data Regulation Law"],
    correctIndex: 2,
    explanation: "ODRL significa Open Digital Rights Language, el lenguaje estándar para escribir políticas de uso y licencias digitales."
  },
  {
    question: "¿Qué verifica el proceso KYB?",
    options: ["La identidad personal del usuario", "La legitimidad legal de una empresa", "El saldo de la wallet", "Las certificaciones ISO"],
    correctIndex: 1,
    explanation: "KYB (Know Your Business) verifica la legitimidad legal de una empresa en el proceso de registro."
  },
  {
    question: "¿Qué técnica usa ARIA para consultar documentos antes de responder?",
    options: ["Machine Learning", "RAG", "Deep Learning", "Natural Language Processing"],
    correctIndex: 1,
    explanation: "RAG (Retrieval-Augmented Generation) es la técnica que usa ARIA para consultar documentos antes de generar respuestas."
  }
];

const categoryInfo = {
  tech: { label: "Infraestructura y Desarrollo", icon: <Code className="h-4 w-4" />, color: "bg-blue-500" },
  blockchain: { label: "Blockchain, Web3 y Finanzas", icon: <Coins className="h-4 w-4" />, color: "bg-purple-500" },
  governance: { label: "Gobernanza de Datos e IDSA", icon: <Database className="h-4 w-4" />, color: "bg-green-500" },
  business: { label: "Compras, Sostenibilidad e IA", icon: <ShoppingBag className="h-4 w-4" />, color: "bg-orange-500" }
};

export default function DocumentoExplicativo15() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openTerms, setOpenTerms] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const filteredTerms = useMemo(() => {
    return glossaryTerms
      .filter(term => {
        const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "all" || term.category === activeCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, activeCategory]);

  const toggleTerm = (term: string) => {
    setOpenTerms(prev =>
      prev.includes(term) ? prev.filter(t => t !== term) : [...prev, term]
    );
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
    setShowResults(prev => ({ ...prev, [questionIndex]: true }));
    
    if (answerIndex === quizQuestions[questionIndex].correctIndex) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const correctAnswers = Object.entries(quizAnswers).filter(
    ([idx, ans]) => ans === quizQuestions[Number(idx)].correctIndex
  ).length;

  const termsByLetter = useMemo(() => {
    const grouped: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(term);
    });
    return grouped;
  }, [filteredTerms]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/guia-usuario">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver
            </Button>
          </Link>
          <Badge variant="secondary" className="text-xs">Documento 15 de 15</Badge>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Gran Diccionario y Glosario</h1>
          </div>
          <p className="text-muted-foreground">
            {glossaryTerms.length} términos técnicos, legales y de negocio de PROCUREDATA
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar término o definición..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all" className="text-xs sm:text-sm">Todos</TabsTrigger>
                <TabsTrigger value="tech" className="text-xs sm:text-sm">Tech</TabsTrigger>
                <TabsTrigger value="blockchain" className="text-xs sm:text-sm">Blockchain</TabsTrigger>
                <TabsTrigger value="governance" className="text-xs sm:text-sm">Gobernanza</TabsTrigger>
                <TabsTrigger value="business" className="text-xs sm:text-sm">Negocio</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {Object.entries(categoryInfo).map(([key, info]) => (
            <Card key={key} className="text-center">
              <CardContent className="pt-4 pb-3">
                <div className={`inline-flex p-2 rounded-full ${info.color} text-white mb-2`}>
                  {info.icon}
                </div>
                <p className="text-lg font-bold">{glossaryTerms.filter(t => t.category === key).length}</p>
                <p className="text-xs text-muted-foreground truncate">{info.label.split(" ")[0]}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Glossary Terms */}
        <div className="space-y-6 mb-10">
          {Object.entries(termsByLetter).map(([letter, terms]) => (
            <div key={letter}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {letter}
                </div>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="space-y-2">
                {terms.map((term) => (
                  <Collapsible
                    key={term.term}
                    open={openTerms.includes(term.term)}
                    onOpenChange={() => toggleTerm(term.term)}
                  >
                    <Card className={`transition-all ${openTerms.includes(term.term) ? 'ring-1 ring-primary/30' : ''}`}>
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={`${categoryInfo[term.category].color} text-white border-0 text-xs`}>
                              {categoryInfo[term.category].icon}
                            </Badge>
                            <span className="font-semibold text-sm sm:text-base">{term.term}</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openTerms.includes(term.term) ? 'rotate-180' : ''}`} />
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0 pb-4 px-4">
                          <p className="text-sm text-muted-foreground pl-10">{term.definition}</p>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </div>
          ))}

          {filteredTerms.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No se encontraron términos que coincidan con "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Quiz Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Quiz: Domina el Vocabulario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {quizQuestions.map((q, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium mb-3">{idx + 1}. {q.question}</p>
                <div className="grid gap-2">
                  {q.options.map((option, optIdx) => {
                    const isSelected = quizAnswers[idx] === optIdx;
                    const isCorrect = optIdx === q.correctIndex;
                    const showResult = showResults[idx];

                    return (
                      <Button
                        key={optIdx}
                        variant={showResult && isCorrect ? "default" : isSelected && showResult ? "destructive" : "outline"}
                        className="justify-start h-auto py-2 px-3 text-left"
                        onClick={() => !showResults[idx] && handleQuizAnswer(idx, optIdx)}
                        disabled={showResults[idx]}
                      >
                        <span className="flex items-center gap-2">
                          {showResult && isCorrect && <CheckCircle2 className="h-4 w-4" />}
                          {showResult && isSelected && !isCorrect && <XCircle className="h-4 w-4" />}
                          {option}
                        </span>
                      </Button>
                    );
                  })}
                </div>
                {showResults[idx] && (
                  <p className={`mt-3 text-sm ${quizAnswers[idx] === q.correctIndex ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {q.explanation}
                  </p>
                )}
              </div>
            ))}

            {Object.keys(quizAnswers).length === quizQuestions.length && (
              <div className="p-4 rounded-lg bg-primary/10 text-center">
                <p className="text-lg font-semibold">
                  🏆 Resultado: {correctAnswers}/{quizQuestions.length} respuestas correctas
                </p>
                {correctAnswers === quizQuestions.length && (
                  <p className="text-green-600 dark:text-green-400 mt-1">¡Excelente! Dominas el vocabulario de PROCUREDATA.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completion Badge */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <div className="inline-flex p-4 rounded-full bg-primary/20 mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">¡Felicidades!</h3>
            <p className="text-muted-foreground">
              Has completado los 15 documentos explicativos de PROCUREDATA. 
              Ahora tienes el conocimiento completo para operar en el ecosistema.
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/documento-explicativo-14">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Documento 14
            </Button>
          </Link>
          <Link to="/guia-usuario">
            <Button>
              Volver a la Guía <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
