import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Handshake, 
  ExternalLink, 
  FileText, 
  Building2, 
  Globe, 
  Users, 
  Layers,
  Filter,
  X,
  Cpu,
  Car,
  Plane,
  Factory,
  Leaf,
  FlaskConical,
  Building,
  Zap,
  Truck,
  Stethoscope,
  Wheat,
  Gem,
  Shield,
  Cog,
  CircuitBoard,
  Boxes
} from "lucide-react";
import { partnersByCountry, Partner } from "@/data/partnersData";
import itbidLogo from "@/assets/itbid-logo.png";
import { PremiumPartnersBanner } from "@/components/premium-partners/PremiumPartnersBanner";

const sectorIcons: Record<string, React.ElementType> = {
  publicSector: Building2,
  procurement: Boxes,
  procurementLogistics: Truck,
  procurementSupplyChain: Truck,
  agriculture: Wheat,
  chemistry: FlaskConical,
  chemicalIndustry: FlaskConical,
  chemistryMaterials: FlaskConical,
  chemistryLifeSciences: FlaskConical,
  technologyIndustry: Cpu,
  technology: Cpu,
  smartCityIoT: Cpu,
  aerospace: Plane,
  food: Leaf,
  electronicsEnergy: Zap,
  electronics: CircuitBoard,
  automotive: Car,
  automotiveLuxury: Gem,
  construction: Building,
  sustainableConstruction: Building,
  energyWater: Zap,
  energy: Zap,
  metallurgy: Factory,
  microelectronics: CircuitBoard,
  semiconductors: CircuitBoard,
  industry40: Factory,
  industry: Factory,
  medicalTechnology: Stethoscope,
  lifeSciences: Stethoscope,
  biotechnology: FlaskConical,
  health: Stethoscope,
  machinery: Cog,
  materialsCeramics: Gem,
  textile: Layers,
  deepTech: Cpu,
  security: Shield,
  logistics: Truck,
  foreignTrade: Globe,
};

const Partners = () => {
  const { t } = useTranslation('partners');
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Calculate stats
  const stats = useMemo(() => {
    const allPartners = partnersByCountry.flatMap(c => c.partners);
    return {
      total: allPartners.length,
      countries: partnersByCountry.length,
      associations: allPartners.filter(p => p.type === "asociación").length,
      clusters: allPartners.filter(p => p.type === "clúster").length,
      active: allPartners.filter(p => p.status === "activo").length,
      inDevelopment: allPartners.filter(p => p.status === "en desarrollo").length,
    };
  }, []);

  // Filter partners
  const filteredCountries = useMemo(() => {
    return partnersByCountry.map(country => ({
      ...country,
      partners: country.partners.filter(partner => {
        if (selectedCountry !== "all" && country.code !== selectedCountry) return false;
        if (selectedStatus !== "all" && partner.status !== selectedStatus) return false;
        if (selectedType !== "all" && partner.type !== selectedType) return false;
        return true;
      })
    })).filter(country => selectedCountry === "all" ? country.partners.length > 0 : country.code === selectedCountry && country.partners.length > 0);
  }, [selectedCountry, selectedStatus, selectedType]);

  const totalFiltered = filteredCountries.reduce((acc, c) => acc + c.partners.length, 0);
  const hasFilters = selectedCountry !== "all" || selectedStatus !== "all" || selectedType !== "all";

  const clearFilters = () => {
    setSelectedCountry("all");
    setSelectedStatus("all");
    setSelectedType("all");
  };

  const getStatusBadge = (status: Partner["status"]) => {
    switch (status) {
      case "activo":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">{t('status.active')}</Badge>;
      case "en desarrollo":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20">{t('status.inDevelopment')}</Badge>;
      case "próximamente":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20">{t('status.comingSoon')}</Badge>;
    }
  };

  const getPriorityBadge = (priority?: Partner["priority"]) => {
    if (!priority) return null;
    switch (priority) {
      case "inmediato":
        return <Badge variant="outline" className="border-emerald-500 text-emerald-600 text-xs">{t('priority.immediate')}</Badge>;
      case "masa_critica":
        return <Badge variant="outline" className="border-blue-500 text-blue-600 text-xs">{t('priority.criticalMass')}</Badge>;
      case "quick_win":
        return <Badge variant="outline" className="border-orange-500 text-orange-600 text-xs">{t('priority.quickWin')}</Badge>;
    }
  };

  const getPartnerLogo = (partner: Partner) => {
    if (partner.id === "itbid") return itbidLogo;
    return null;
  };

  const SectorIcon = ({ sector }: { sector: string }) => {
    const IconComponent = sectorIcons[sector] || Building2;
    return <IconComponent className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10">
            <Handshake className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t('pageTitle')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Description Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <p 
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('description') }}
          />
        </CardContent>
      </Card>

      {/* Premium Partners Banner */}
      <PremiumPartnersBanner />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-xs text-muted-foreground">{t('stats.total')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.countries}</div>
            <div className="text-xs text-muted-foreground">{t('stats.countries')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.associations}</div>
            <div className="text-xs text-muted-foreground">{t('stats.associations')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.clusters}</div>
            <div className="text-xs text-muted-foreground">{t('stats.clusters')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-xs text-muted-foreground">{t('stats.active')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{stats.inDevelopment}</div>
            <div className="text-xs text-muted-foreground">{t('stats.inDevelopment')}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">{t('filterByCountry').split(' ')[0]}:</span>
        </div>
        
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('allCountries')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allCountries')}</SelectItem>
            {partnersByCountry.map(country => (
              <SelectItem key={country.code} value={country.code}>
                {country.flag} {t(`countries.${country.code}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('allStatuses')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allStatuses')}</SelectItem>
            <SelectItem value="activo">{t('status.active')}</SelectItem>
            <SelectItem value="en desarrollo">{t('status.inDevelopment')}</SelectItem>
            <SelectItem value="próximamente">{t('status.comingSoon')}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('allTypes')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allTypes')}</SelectItem>
            <SelectItem value="asociación">{t('type.association')}</SelectItem>
            <SelectItem value="clúster">{t('type.cluster')}</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
            <X className="h-4 w-4" />
            {t('clearFilters')}
          </Button>
        )}

        <div className="ml-auto text-sm text-muted-foreground">
          {t('partnersCount', { count: totalFiltered })}
        </div>
      </div>

      {/* Partners Directory */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Globe className="h-5 w-5" />
          {t('directory')}
        </h2>

        {filteredCountries.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">{t('noPartnersFound')}</p>
              <Button variant="link" onClick={clearFilters} className="mt-2">
                {t('clearFilters')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredCountries.map(country => (
              <Card key={country.code}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <CardTitle className="text-lg">
                      {t(`countries.${country.code}`)}
                    </CardTitle>
                    <Badge variant="secondary">
                      {country.partners.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {country.partners.map(partner => {
                      const logo = getPartnerLogo(partner);
                      return (
                        <Card 
                          key={partner.id}
                          className="group hover:shadow-md transition-all duration-300 hover:border-primary/50"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                {logo ? (
                                  <div className="h-10 mb-2">
                                    <img src={logo} alt={partner.name} className="h-full w-auto object-contain" />
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 mb-2">
                                    <SectorIcon sector={partner.sector} />
                                    <span className="text-xs text-muted-foreground">
                                      {t(`sectors.${partner.sector}`)}
                                    </span>
                                  </div>
                                )}
                                <CardTitle className="text-base">{partner.name}</CardTitle>
                                {partner.fullName && (
                                  <CardDescription className="text-xs mt-1 line-clamp-2">
                                    {partner.fullName}
                                  </CardDescription>
                                )}
                              </div>
                              <div className="flex flex-col gap-1 items-end">
                                {getStatusBadge(partner.status)}
                                {getPriorityBadge(partner.priority)}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {t(`partners.${partner.id}.description`)}
                            </p>
                            {partner.keyInitiative && (
                              <div className="mt-2 text-xs text-primary">
                                📌 {partner.keyInitiative}
                              </div>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {t(`type.${partner.type === "asociación" ? "association" : "cluster"}`)}
                              </Badge>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2 flex flex-col gap-2">
                            {partner.status === "activo" && (
                              <Button asChild size="sm" className="w-full">
                                <Link to={partner.link} className="flex items-center gap-2">
                                  {t('accessProjects')}
                                  <ExternalLink className="h-3 w-3" />
                                </Link>
                              </Button>
                            )}
                            {partner.hasDocTecnico && (
                              <Button asChild variant="outline" size="sm" className="w-full">
                                <Link to="/partners/itbid/doc-tecnico" className="flex items-center gap-2">
                                  {t('technicalDoc')}
                                  <FileText className="h-3 w-3" />
                                </Link>
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Placeholder for future partners */}
        <Card className="border-dashed border-2 bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Handshake className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">{t('comingSoon')}</p>
            <p className="text-sm text-muted-foreground/70 mt-1">{t('expandingEcosystem')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Partners;
