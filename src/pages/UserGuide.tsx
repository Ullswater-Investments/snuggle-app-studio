import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";

export default function UserGuide() {
  const documents = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: `Documento Explicativo ${i + 1}`
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver
            </Button>
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Guía de Usuario</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Documentación completa para usuarios de la plataforma ProcureData
        </p>

        {/* Grid de 15 documentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {documents.map((doc) => (
            <Card 
              key={doc.id}
              className="cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-200 h-[150px]"
            >
              <CardContent className="h-full flex flex-col items-center justify-center gap-3 p-4">
                <FileText className="h-8 w-8 text-primary/60" />
                <span className="text-sm font-medium text-center">
                  {doc.title}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
