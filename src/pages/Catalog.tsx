import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Package } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Catalog = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Query para obtener productos con sus activos
  const { data: products, isLoading } = useQuery({
    queryKey: ["catalog-products", searchQuery, categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from("data_products")
        .select(`
          *,
          data_assets (
            id,
            status,
            subject_org_id,
            holder_org_id,
            organizations!data_assets_holder_org_id_fkey (
              name,
              tax_id
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }

      if (categoryFilter !== "all") {
        query = query.eq("category", categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Query para obtener categorías únicas
  const { data: categories } = useQuery({
    queryKey: ["product-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_products")
        .select("category")
        .not("category", "is", null);
      
      if (error) throw error;
      const uniqueCategories = [...new Set(data.map(p => p.category))];
      return uniqueCategories;
    },
  });

  const handleProductClick = (productId: string) => {
    navigate(`/catalog/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
            PROCUREDATA
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">Catálogo de Datos</h2>
          <p className="text-muted-foreground">
            Explora y solicita acceso a productos de datos disponibles
          </p>
        </div>

        {/* Barra de búsqueda y filtros */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, CIF o descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories?.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Grid de productos */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando catálogo...</p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer transition-shadow hover:shadow-lg"
                onClick={() => handleProductClick(product.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Package className="h-8 w-8 text-primary" />
                    {product.category && (
                      <Badge variant="secondary">{product.category}</Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description || "Sin descripción"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Versión</span>
                      <Badge variant="outline">{product.version}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Activos disponibles</span>
                      <span className="font-medium">
                        {product.data_assets?.filter((a: any) => a.status === 'available').length || 0}
                      </span>
                    </div>
                  </div>
                  <Button className="mt-4 w-full" variant="outline">
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No se encontraron productos</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchQuery || categoryFilter !== "all"
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "Aún no hay productos de datos disponibles en el catálogo"}
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Catalog;
