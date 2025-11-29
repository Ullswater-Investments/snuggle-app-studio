import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, TrendingUp, Award } from "lucide-react";

interface ESGData {
  report_year?: number;
  scope1_total_tons?: number;
  scope2_total_tons?: number;
  energy_mix?: {
    renewable?: number;
    fossil?: number;
  };
  certifications?: string[];
  auditor_signature?: string;
}

interface ESGDataViewProps {
  data: ESGData;
}

export const ESGDataView = ({ data }: ESGDataViewProps) => {
  const totalEmissions = (data.scope1_total_tons || 0) + (data.scope2_total_tons || 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Scope 1 Card */}
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-600" />
              Alcance 1 (Directas)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {data.scope1_total_tons?.toLocaleString() || "0"} t
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              CO₂ equivalente
            </p>
          </CardContent>
        </Card>

        {/* Scope 2 Card */}
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Alcance 2 (Indirectas)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {data.scope2_total_tons?.toLocaleString() || "0"} t
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              CO₂ equivalente
            </p>
          </CardContent>
        </Card>

        {/* Total Card */}
        <Card className="border-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Total Emisiones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalEmissions.toLocaleString()} t
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              CO₂ equivalente {data.report_year}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Energy Mix */}
      {data.energy_mix && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Mix Energético</CardTitle>
            <CardDescription>
              Distribución de fuentes de energía utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Energías Renovables</span>
                <span className="text-2xl font-bold text-green-600">
                  {data.energy_mix.renewable}%
                </span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                  style={{ width: `${data.energy_mix.renewable}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Fósiles: {data.energy_mix.fossil}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Certificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((cert, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {cert}
                </Badge>
              ))}
            </div>
            {data.auditor_signature && (
              <p className="mt-4 text-sm text-muted-foreground border-t pt-4">
                <span className="font-medium">Validado por:</span> {data.auditor_signature}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};