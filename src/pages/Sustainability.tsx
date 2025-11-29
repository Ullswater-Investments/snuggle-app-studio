import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Leaf, TrendingUp, Award, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

const Sustainability = () => {
  const navigate = useNavigate();

  const { data: esgData, isLoading } = useQuery({
    queryKey: ["sustainability-data"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_payloads")
        .select(`
          *,
          transaction:data_transactions!transaction_id (
            id,
            subject_org:organizations!subject_org_id (name)
          )
        `)
        .eq("schema_type", "esg_report");

      if (error) throw error;
      return data;
    },
  });

  const processedData = esgData?.map((payload) => {
    const content = payload.data_content as ESGData;
    return {
      provider: payload.transaction?.subject_org?.name || "Unknown",
      scope1: content.scope1_total_tons || 0,
      scope2: content.scope2_total_tons || 0,
      total: (content.scope1_total_tons || 0) + (content.scope2_total_tons || 0),
      renewable: content.energy_mix?.renewable || 0,
      certifications: content.certifications || [],
    };
  });

  const totalEmissions = processedData?.reduce((sum, p) => sum + p.total, 0) || 0;
  const auditedProviders = processedData?.length || 0;
  const avgRenewable =
    auditedProviders > 0
      ? processedData!.reduce((sum, p) => sum + p.renewable, 0) / auditedProviders
      : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Hub de Sostenibilidad</h1>
          <p className="text-muted-foreground">
            Analítica ESG y huella de carbono de tu cadena de suministro
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-600" />
                Huella de Carbono Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalEmissions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">tCO₂e (Alcance 3)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-blue-600" />
                Proveedores Auditados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{auditedProviders}</div>
              <p className="text-xs text-muted-foreground mt-1">Con certificación verificada</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                Energía Renovable Promedio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgRenewable.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground mt-1">Mix energético verde</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        {isLoading ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">Cargando datos...</div>
            </CardContent>
          </Card>
        ) : processedData && processedData.length > 0 ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Emisiones por Proveedor</CardTitle>
                <CardDescription>Comparativa de Alcance 1 y 2 (tCO₂e)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={processedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="provider" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="scope1" fill="hsl(var(--primary))" name="Alcance 1" />
                    <Bar dataKey="scope2" fill="hsl(var(--accent))" name="Alcance 2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Providers Table */}
            <Card>
              <CardHeader>
                <CardTitle>Estado de Certificación</CardTitle>
                <CardDescription>Proveedores con auditoría ESG completada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Proveedor</TableHead>
                        <TableHead>Emisiones Totales</TableHead>
                        <TableHead>Energía Renovable</TableHead>
                        <TableHead>Certificaciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {processedData.map((provider, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{provider.provider}</TableCell>
                          <TableCell>{provider.total.toLocaleString()} tCO₂e</TableCell>
                          <TableCell>
                            <Badge variant={provider.renewable >= 50 ? "default" : "secondary"}>
                              {provider.renewable}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {provider.certifications.map((cert, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <Leaf className="mx-auto h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Sin datos ESG disponibles</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comienza solicitando reportes de emisiones a tus proveedores en el catálogo.
                </p>
                <Button onClick={() => navigate("/catalog")}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Explorar Catálogo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Sustainability;
