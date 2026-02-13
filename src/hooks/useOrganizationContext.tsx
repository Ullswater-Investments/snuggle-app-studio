import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

interface Organization {
  id: string;
  name: string;
  type: 'consumer' | 'data_holder' | 'provider';
  is_demo: boolean;
  sector?: string;
  logo_url?: string;
  banner_url?: string;
  website?: string;
  linkedin_url?: string;
  marketplace_description?: string;
  assurance_level?: string;
}

interface OrganizationContextType {
  activeOrgId: string | null;
  activeOrg: Organization | null;
  availableOrgs: Organization[];
  switchOrganization: (orgId: string) => void;
  isDemo: boolean;
  loading: boolean;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeOrgId, setActiveOrgId] = useState<string | null>(() => {
    // Recuperar organización activa del sessionStorage
    return sessionStorage.getItem('activeOrgId');
  });

  // Obtener organizaciones disponibles para el usuario
  const { data: availableOrgs = [], isLoading } = useQuery({
    queryKey: ['user-organizations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Obtener los roles del usuario para ver a qué organizaciones tiene acceso
      const { data: userRoles, error } = await supabase
        .from('user_roles')
        .select('organization_id, organizations(id, name, type)')
        .eq('user_id', user.id);

      if (error) throw error;

      // Extraer organizaciones y obtener is_demo por separado
      const orgIds = userRoles
        .map(role => role.organizations)
        .filter((org): org is { id: string; name: string; type: 'consumer' | 'data_holder' | 'provider' } => org !== null);

      // Obtener el campo is_demo y sector directamente de organizations
      const { data: orgsWithDemo } = await supabase
        .from('organizations')
        .select('id, is_demo, sector')
        .in('id', orgIds.map(o => o.id)) as any; // Temporal hasta que se actualicen los tipos

      // Combinar los datos y deduplicar por ID
      const seen = new Set<string>();
      const orgs: Organization[] = [];
      for (const org of orgIds) {
        if (seen.has(org.id)) continue;
        seen.add(org.id);
        orgs.push({
          ...org,
          is_demo: (orgsWithDemo as any)?.find((od: any) => od.id === org.id)?.is_demo ?? false,
          sector: (orgsWithDemo as any)?.find((od: any) => od.id === org.id)?.sector,
        });
      }

      return orgs;
    },
    enabled: !!user,
  });

  // Detectar si estamos en modo demo
  const isDemo = availableOrgs.some(org => org.is_demo) || user?.email === 'demo@procuredata.app';

  // Obtener la organización activa
  const activeOrg = availableOrgs.find(org => org.id === activeOrgId) || null;

  // Si no hay organización activa pero hay organizaciones disponibles, seleccionar la primera
  useEffect(() => {
    if (!activeOrgId && availableOrgs.length > 0) {
      const firstOrg = availableOrgs[0];
      setActiveOrgId(firstOrg.id);
      sessionStorage.setItem('activeOrgId', firstOrg.id);
    }
  }, [activeOrgId, availableOrgs]);

  const switchOrganization = (orgId: string) => {
    const org = availableOrgs.find(o => o.id === orgId);
    if (!org) {
      toast.error("Organización no disponible");
      return;
    }

    setActiveOrgId(orgId);
    sessionStorage.setItem('activeOrgId', orgId);
    
    // 🔐 CRÍTICO: Limpiar cache completo para evitar fuga de datos entre organizaciones
    // Esto previene que datos de Org A sean visibles después de cambiar a Org B
    queryClient.invalidateQueries();
    
    // Mensaje de cambio de contexto
    const roleLabel = org.type === 'consumer' ? 'Consumidor' : 
                      org.type === 'data_holder' ? 'Poseedor' : 'Proveedor';
    toast.success(`Cambiado a: ${org.name} (${roleLabel})`);
  };

  return (
    <OrganizationContext.Provider
      value={{
        activeOrgId,
        activeOrg,
        availableOrgs,
        switchOrganization,
        isDemo,
        loading: isLoading,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganizationContext = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error("useOrganizationContext must be used within an OrganizationProvider");
  }
  return context;
};
