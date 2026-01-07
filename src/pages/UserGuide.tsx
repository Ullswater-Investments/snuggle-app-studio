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
          {documents.map((doc) => {
            const routes: Record<number, string> = {
              1: '/documento-explicativo-1',
              2: '/documento-explicativo-2',
              3: '/documento-explicativo-3',
              4: '/documento-explicativo-4',
              5: '/documento-explicativo-5',
              6: '/documento-explicativo-6',
              7: '/documento-explicativo-7',
              8: '/documento-explicativo-8',
              9: '/documento-explicativo-9',
              10: '/documento-explicativo-10',
              11: '/documento-explicativo-11',
              12: '/documento-explicativo-12',
              13: '/documento-explicativo-13',
              14: '/documento-explicativo-14',
              15: '/documento-explicativo-15'
            };
            
            const cardContent = (
              <Card className="cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-200 h-[150px]">
                <CardContent className="h-full flex flex-col items-center justify-center gap-3 p-4">
                  <FileText className="h-8 w-8 text-primary/60" />
                  <span className="text-sm font-medium text-center">{doc.title}</span>
                </CardContent>
              </Card>
            );
            
            if (routes[doc.id]) {
              return <Link key={doc.id} to={routes[doc.id]}>{cardContent}</Link>;
            }
            return <div key={doc.id}>{cardContent}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
