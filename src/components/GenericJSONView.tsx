import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileJson } from "lucide-react";

interface GenericJSONViewProps {
  data: any;
  schemaType?: string;
}

export const GenericJSONView = ({ data, schemaType }: GenericJSONViewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileJson className="h-5 w-5" />
          Datos Estructurados
        </CardTitle>
        <CardDescription>
          {schemaType ? `Tipo: ${schemaType}` : "Vista de datos en formato JSON"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-muted/50">
          <pre className="p-4 text-xs overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};