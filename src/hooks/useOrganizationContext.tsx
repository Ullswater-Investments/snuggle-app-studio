import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import {
  organizationService,
  type ApiWallet,
  type AddressDetails,
} from "@/services/organizationService";

export interface Organization {
  id: string;
  name: string;
  document_type: string;
  document: string;
  document_country_code: string;
  registration_number: string;
  headquarters_address: AddressDetails;
  legal_address: AddressDetails;
  external_id: string;
  created_by_user_uuid: string;
  wallet_address: string | null;
  primaryWallets: ApiWallet[];
  wallets: ApiWallet[];
  created_at: string;
  updated_at: string;
  /** @deprecated Supabase-era fields kept for compile compat -- will be removed */
  type?: string;
  is_demo?: boolean;
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

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined,
);

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeOrgId, setActiveOrgId] = useState<string | null>(() => {
    return sessionStorage.getItem("activeOrgId");
  });

  const { data: availableOrgs = [], isLoading } = useQuery({
    queryKey: ["user-organizations", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const response = await organizationService.getOrganizations();
      return response.data.map(
        (apiOrg): Organization => ({
          id: apiOrg.uuid,
          name: apiOrg.name,
          document_type: apiOrg.document_type,
          document: apiOrg.document,
          document_country_code: apiOrg.document_country_code,
          registration_number: apiOrg.registration_number,
          headquarters_address: apiOrg.headquarters_address,
          legal_address: apiOrg.legal_address,
          external_id: apiOrg.external_id,
          created_by_user_uuid: apiOrg.created_by_user_uuid,
          wallet_address: apiOrg.primaryWallets?.[0]?.address ?? null,
          primaryWallets: apiOrg.primaryWallets,
          wallets: apiOrg.wallets,
          created_at: apiOrg.created_at,
          updated_at: apiOrg.updated_at,
        }),
      );
    },
    enabled: !!user,
  });

  const activeOrg = availableOrgs.find((org) => org.id === activeOrgId) || null;

  useEffect(() => {
    if (!isLoading && availableOrgs.length === 0) {
      if (activeOrgId) {
        setActiveOrgId(null);
        sessionStorage.removeItem("activeOrgId");
      }
    } else if (
      !isLoading &&
      activeOrgId &&
      !availableOrgs.find((o) => o.id === activeOrgId)
    ) {
      setActiveOrgId(null);
      sessionStorage.removeItem("activeOrgId");
    } else if (!isLoading && !activeOrgId && availableOrgs.length > 0) {
      const firstOrg = availableOrgs[0];
      // *Aqui se selecciona la primera organización por defecto
      // setActiveOrgId(firstOrg.id);
      // sessionStorage.setItem("activeOrgId", firstOrg.id);
    }
  }, [isLoading, availableOrgs, activeOrgId]);

  const switchOrganization = (orgId: string) => {
    const org = availableOrgs.find((o) => o.id === orgId);
    if (!org) {
      toast.error("Organización no disponible");
      return;
    }

    setActiveOrgId(orgId);
    sessionStorage.setItem("activeOrgId", orgId);
    queryClient.invalidateQueries();
    toast.success(`Cambiado a: ${org.name}`);
  };

  return (
    <OrganizationContext.Provider
      value={{
        activeOrgId,
        activeOrg,
        availableOrgs,
        switchOrganization,
        isDemo: false,
        loading:
          isLoading ||
          (!!sessionStorage.getItem("activeOrgId") &&
            !isLoading &&
            activeOrgId !== null &&
            !activeOrg),
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganizationContext = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      "useOrganizationContext must be used within an OrganizationProvider",
    );
  }
  return context;
};
