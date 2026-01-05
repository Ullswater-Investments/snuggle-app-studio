import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Leaf, 
  ShieldCheck, 
  Star, 
  Database,
  ArrowRight,
  Heart,
  BarChart3,
  Wallet
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

// --- Tipos alineados con la vista SQL 'marketplace_listings' (campos opcionales) ---
interface MarketplaceListing {
  asset_id: string;
  asset_name: string | null;
  asset_description: string | null;
  product_name: string | null;
  category: string | null;
  provider_id: string;
  provider_name: string | null;
  seller_category: string | null;
  kyb_verified: boolean;
  pricing_model: 'free' | 'one_time' | 'subscription' | 'usage' | null;
  price: number | null;
  currency: string | null;
  billing_period?: string | null;
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
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    onlyGreen: false,
    onlyVerified: false,
    priceType: 'all' // all, free, paid
  });
  
  // Estado para comparación
  const [compareList, setCompareList] = useState<Set<string>>(new Set());
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);

  // --- Fetch Wishlist from Supabase ---
  const { data: wishlistData } = useQuery({
    queryKey: ["user-wishlist", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_wishlist")
        .select("asset_id")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data?.map(item => item.asset_id) || [];
    },
    enabled: !!user,
  });

  const wishlist = new Set(wishlistData || []);

  // --- Wishlist Mutation ---
  const toggleWishlistMutation = useMutation({
    mutationFn: async (assetId: string) => {
      if (!user) throw new Error("User not authenticated");

      const isInWishlist = wishlist.has(assetId);
      
      if (isInWishlist) {
        const { error } = await supabase
          .from("user_wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("asset_id", assetId);
        if (error) throw error;
        return { action: "removed" };
      } else {
        const { error } = await supabase
          .from("user_wishlist")
          .insert({ user_id: user.id, asset_id: assetId });
        if (error) throw error;
        return { action: "added" };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["user-wishlist"] });
      if (result.action === "added") {
        toast("Añadido a favoritos", { icon: "❤️" });
      } else {
        toast("Eliminado de favoritos", { icon: "💔" });
      }
    },
    onError: () => {
      toast.error("Error al actualizar favoritos");
    },
  });

  const toggleWishlist = (assetId: string) => {
    if (!user) {
      toast.error("Inicia sesión para guardar favoritos");
      return;
    }
    toggleWishlistMutation.mutate(assetId);
  };

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
            price,
            currency,
            pricing_model,
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
          pricing_model: (a.pricing_model as any) || 'free',
          price: a.price || 0,
          currency: a.currency || 'EUR',
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

  // --- Lógica de Filtrado en Cliente (con Programación Defensiva) ---
  const filteredListings = listings?.filter(item => {
    const matchesSearch = (item.asset_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.provider_name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || (item.category || "") === activeTab;
    const matchesGreen = !filters.onlyGreen || item.has_green_badge;
    const matchesVerified = !filters.onlyVerified || item.kyb_verified;
    const matchesPrice = filters.priceType === 'all' 
      ? true 
      : filters.priceType === 'free' ? (item.price || 0) === 0 : (item.price || 0) > 0;

    return matchesSearch && matchesCategory && matchesGreen && matchesVerified && matchesPrice;
  });

  const categories = ["all", ...new Set(listings?.map(l => l.category || "General") || [])];

  // Funciones para comparador
  const toggleCompare = (assetId: string) => {
    setCompareList(prev => {
      const newSet = new Set(prev);
      if (newSet.has(assetId)) {
        newSet.delete(assetId);
      } else {
        if (newSet.size >= 4) {
          toast.error("Máximo 4 productos para comparar");
          return prev;
        }
        newSet.add(assetId);
      }
      return newSet;
    });
  };

  const compareProducts = listings?.filter(l => compareList.has(l.asset_id)) || [];

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
                <ProductCard 
                  key={item.asset_id} 
                  item={item} 
                  onAction={() => navigate(`/catalog/product/${item.asset_id}`)} 
                  onWishlistToggle={() => toggleWishlist(item.asset_id)}
                  isInWishlist={wishlist.has(item.asset_id)}
                  onCompareToggle={() => toggleCompare(item.asset_id)}
                  isInCompare={compareList.has(item.asset_id)}
                />
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

      {/* Barra Flotante de Comparación */}
      {compareList.size >= 2 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <Card className="shadow-2xl border-2 border-primary">
            <CardContent className="flex items-center gap-4 p-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Comparando {compareList.size} productos</p>
                <p className="text-xs text-muted-foreground">Selecciona hasta 4 para comparar</p>
              </div>
              <Button onClick={() => setCompareDialogOpen(true)} size="sm">
                Ver Tabla Comparativa
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setCompareList(new Set())}>
                Limpiar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dialog de Comparación */}
      <Dialog open={compareDialogOpen} onOpenChange={setCompareDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Comparación de Productos</DialogTitle>
            <DialogDescription>
              Compara las características de los {compareProducts.length} productos seleccionados
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Característica</TableHead>
                  {compareProducts.map(p => (
                    <TableHead key={p.asset_id}>{p.asset_name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Proveedor</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>{p.provider_name}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Precio</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>
                      {p.price === 0 ? (
                        <Badge variant="outline" className="text-green-600">GRATIS</Badge>
                      ) : (
                        <div className="flex items-center gap-1">
                          {`${p.price} ${p.currency}`}
                          {p.currency === 'EUROe' && (
                            <Wallet className="h-3 w-3 text-purple-600" />
                          )}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Modelo</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id} className="capitalize">
                      {p.pricing_model}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Categoría</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>{p.category}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Reputación</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>
                      <StarRating rating={p.reputation_score} count={p.review_count} />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Verificado</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>
                      {p.kyb_verified ? (
                        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                          <ShieldCheck className="h-3 w-3 mr-1" /> Sí
                        </Badge>
                      ) : (
                        "No"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sostenible</TableCell>
                  {compareProducts.map(p => (
                    <TableCell key={p.asset_id}>
                      {p.has_green_badge ? (
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                          <Leaf className="h-3 w-3 mr-1" /> Sí
                        </Badge>
                      ) : (
                        "No"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setCompareDialogOpen(false)}>
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- Subcomponente: Tarjeta de Producto ---
function ProductCard({ 
  item, 
  onAction,
  onWishlistToggle,
  isInWishlist,
  onCompareToggle,
  isInCompare
}: { 
  item: MarketplaceListing;
  onAction: () => void;
  onWishlistToggle?: () => void;
  isInWishlist?: boolean;
  onCompareToggle?: () => void;
  isInCompare?: boolean;
}) {
  const isPaid = (item.price || 0) > 0;
  const isWeb3Asset = item.currency === 'EUROe' || item.currency === 'GX';

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-muted/60 overflow-hidden flex flex-col h-full relative">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:h-3 transition-all" />
      
      {/* Botón de Wishlist en esquina superior derecha */}
      {onWishlistToggle && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle();
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all hover:scale-110"
        >
          <Heart 
            className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="uppercase text-[10px] tracking-wider font-semibold bg-slate-100 text-slate-600">
            {item.category}
          </Badge>
          
          {/* Insignias Superiores */}
          <div className="flex gap-1">
            {/* Badge Web3 */}
            {isWeb3Asset && (
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200 px-1.5" title="Requiere Wallet Web3">
                <Wallet className="h-3 w-3 mr-1" />
                {item.currency}
              </Badge>
            )}
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
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-slate-900">
                    {new Intl.NumberFormat('es-ES', { 
                      style: item.currency === 'EUR' ? 'currency' : 'decimal', 
                      currency: item.currency === 'EUR' ? 'EUR' : undefined 
                    }).format(item.price || 0)}
                  </span>
                  {isWeb3Asset && (
                    <span className="text-sm font-medium text-purple-700">{item.currency}</span>
                  )}
                </div>
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

      <CardFooter className="pt-4 bg-slate-50/50 flex-col gap-2">
        {/* Checkbox de Comparación */}
        {onCompareToggle && (
          <div className="w-full flex items-center gap-2 text-sm mb-2">
            <Checkbox 
              id={`compare-${item.asset_id}`}
              checked={isInCompare}
              onCheckedChange={onCompareToggle}
            />
            <label htmlFor={`compare-${item.asset_id}`} className="cursor-pointer text-muted-foreground">
              Comparar este producto
            </label>
          </div>
        )}
        
        <Button 
          onClick={onAction} 
          className={`w-full group-hover:translate-x-1 transition-all ${
            isWeb3Asset 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : isPaid 
                ? 'bg-slate-900' 
                : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50'
          }`}
        >
          {isWeb3Asset ? (
            <>
              <Wallet className="mr-2 h-4 w-4" /> Comprar con Wallet
            </>
          ) : isPaid ? (
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