import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Leaf, 
  ShieldCheck, 
  Star, 
  Database,
  ArrowRight
} from "lucide-react";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// --- Tipos alineados con la vista SQL 'marketplace_listings' ---
interface MarketplaceListing {
  asset_id: string;
  asset_name: string;
  asset_description: string;
  product_name: string;
  category: string;
  provider_id: string;
  provider_name: string;
  seller_category: string;
  kyb_verified: boolean;
  pricing_model: 'free' | 'one_time' | 'subscription' | 'usage';
  price: number;
  currency: string;
  billing_period?: string;
  has_green_badge: boolean;
  reputation_score: number;
  review_count: number;
}

// --- Componente de Estrellas de Reputación ---
const StarRating = ({ rating, count }: { rating: number, count: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={`h-3 w-3 ${star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} 
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">({count})</span>
    </div>
  );
};

export default function Catalog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    onlyGreen: false,
    onlyVerified: false,
    priceType: 'all' // all, free, paid
  });

  // --- Fetch de Datos (Conecta con la vista SQL) ---
  const { data: listings, isLoading } = useQuery({
    queryKey: ["marketplace-listings"],
    queryFn: async () => {
      // Intentamos leer de la vista nueva
      const { data, error } = await supabase
        .from('marketplace_listings' as any) // Cast as any si los tipos no se han regenerado aún
        .select('*');
      
      if (error) {
        console.warn("Vista marketplace_listings no encontrada, usando fallback...");
        // Fallback a data_assets normal si la migración no se ha corrido
        const { data: rawAssets } = await supabase
          .from('data_assets')
          .select(`
            id,
            subject_org_id,
            product:data_products(name, category, description),
            org:organizations!subject_org_id(name)
          `);
        
        // Mapeo manual para simular la estructura del marketplace
        const fallbackData: MarketplaceListing[] = rawAssets?.map(a => ({
          asset_id: a.id,
          asset_name: a.product?.name || "Producto Sin Nombre",
          asset_description: a.product?.description || "Sin descripción",
          product_name: a.product?.name || "Producto Sin Nombre",
          category: a.product?.category || "General",
          provider_name: a.org?.name || "Proveedor Desconocido",
          provider_id: a.subject_org_id,
          seller_category: '',
          pricing_model: 'free',
          price: 0,
          currency: 'EUR',
          billing_period: undefined,
          reputation_score: 4.5, // Simulado
          review_count: 12, // Simulado
          has_green_badge: Math.random() > 0.5, // Simulado
          kyb_verified: true
        })) || [];
        
        return fallbackData;
      }
      
      return ((data || []) as unknown) as MarketplaceListing[];
    }
  });

  // --- Lógica de Filtrado en Cliente ---
  const filteredListings = listings?.filter(item => {
    const matchesSearch = item.asset_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.provider_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesGreen = !filters.onlyGreen || item.has_green_badge;
    const matchesVerified = !filters.onlyVerified || item.kyb_verified;
    const matchesPrice = filters.priceType === 'all' 
      ? true 
      : filters.priceType === 'free' ? item.price === 0 : item.price > 0;

    return matchesSearch && matchesCategory && matchesGreen && matchesVerified && matchesPrice;
  });

  const categories = ["all", ...new Set(listings?.map(l => l.category) || [])];

  return (
    <div className="container py-8 space-y-8 fade-in bg-muted/10 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <div className="relative rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Database className="h-64 w-64 -mr-16 -mt-16" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4 border-none">
            Marketplace Oficial v2.0
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Descubre, Compra e Integra Datos de Confianza</h1>
          <p className="text-blue-100 text-lg mb-8">
            Accede a miles de activos de datos verificados, con gobernanza integrada y cumplimiento ODRL automatizado.
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Buscar datos financieros, IoT, clima..." 
              className="pl-10 h-12 bg-white text-gray-900 border-none shadow-lg focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- MARKETPLACE LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR DE FILTROS */}
        <div className="hidden lg:block space-y-6">
          <div className="sticky top-24">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filtros
            </h3>
            
            <Card>
              <CardContent className="p-4 space-y-6">
                {/* Filtro Precio */}
                <div className="space-y-3">
                  <Label>Modelo de Precio</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="price-all" 
                        checked={filters.priceType === 'all'} 
                        onCheckedChange={() => setFilters(f => ({...f, priceType: 'all'}))}
                      />
                      <label htmlFor="price-all" className="text-sm font-medium">Todos</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="price-free" 
                        checked={filters.priceType === 'free'}
                        onCheckedChange={() => setFilters(f => ({...f, priceType: filters.priceType === 'free' ? 'all' : 'free'}))}
                      />
                      <label htmlFor="price-free" className="text-sm">Gratuitos (Open Data)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="price-paid" 
                        checked={filters.priceType === 'paid'}
                        onCheckedChange={() => setFilters(f => ({...f, priceType: filters.priceType === 'paid' ? 'all' : 'paid'}))}
                      />
                      <label htmlFor="price-paid" className="text-sm">Premium / Pago</label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Filtro Calidad/Confianza */}
                <div className="space-y-3">
                  <Label>Garantía y Confianza</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="check-green" 
                        checked={filters.onlyGreen}
                        onCheckedChange={(c) => setFilters(f => ({...f, onlyGreen: !!c}))}
                      />
                      <label htmlFor="check-green" className="text-sm flex items-center gap-1">
                        <Leaf className="h-3 w-3 text-green-600" /> Sostenible (ESG)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="check-kyb" 
                        checked={filters.onlyVerified}
                        onCheckedChange={(c) => setFilters(f => ({...f, onlyVerified: !!c}))}
                      />
                      <label htmlFor="check-kyb" className="text-sm flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-blue-600" /> Verificado (KYB)
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Tabs de Categoría */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-transparent gap-2">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white border bg-white capitalize px-4 py-2 rounded-full"
                >
                  {cat === 'all' ? 'Todos' : cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-[350px] rounded-xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings?.map((item) => (
                <ProductCard key={item.asset_id} item={item} onAction={() => navigate(`/catalog/product/${item.asset_id}`)} />
              ))}
              
              {filteredListings?.length === 0 && (
                <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed">
                  <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                    <Search className="h-full w-full" />
                  </div>
                  <h3 className="text-lg font-medium">No se encontraron resultados</h3>
                  <p className="text-muted-foreground">Prueba a ajustar los filtros o la búsqueda.</p>
                  <Button variant="link" onClick={() => {
                    setSearchTerm("");
                    setFilters({onlyGreen: false, onlyVerified: false, priceType: 'all'});
                    setActiveTab("all");
                  }}>Limpiar filtros</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Subcomponente: Tarjeta de Producto ---
function ProductCard({ item, onAction }: { item: MarketplaceListing, onAction: () => void }) {
  const isPaid = item.price > 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-muted/60 overflow-hidden flex flex-col h-full">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:h-3 transition-all" />
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="uppercase text-[10px] tracking-wider font-semibold bg-slate-100 text-slate-600">
            {item.category}
          </Badge>
          
          {/* Insignias Superiores */}
          <div className="flex gap-1">
            {item.has_green_badge && (
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 px-1.5" title="Sustainable Data">
                <Leaf className="h-3 w-3" />
              </Badge>
            )}
            {item.kyb_verified && (
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 px-1.5" title="Verified Provider">
                <ShieldCheck className="h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
        
        <CardTitle className="text-xl line-clamp-1 group-hover:text-blue-600 transition-colors">
          {item.asset_name}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          por <span className="font-medium text-foreground">{item.provider_name}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 min-h-[60px]">
          {item.asset_description || "Sin descripción disponible para este activo de datos."}
        </p>
        
        <div className="flex items-center justify-between">
          <StarRating rating={item.reputation_score} count={item.review_count} />
          
          <div className="text-right">
            {isPaid ? (
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-slate-900">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: item.currency }).format(item.price)}
                </span>
                {item.pricing_model === 'subscription' && (
                  <span className="text-[10px] text-muted-foreground uppercase font-medium">
                    / {item.billing_period === 'monthly' ? 'mes' : 'año'}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-lg font-bold text-green-600">Gratis</span>
            )}
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="pt-4 bg-slate-50/50">
        <Button 
          onClick={onAction} 
          className={`w-full group-hover:translate-x-1 transition-all ${isPaid ? 'bg-slate-900' : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50'}`}
        >
          {isPaid ? (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" /> Comprar Datos
            </>
          ) : (
            <>
              Solicitar Acceso <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
