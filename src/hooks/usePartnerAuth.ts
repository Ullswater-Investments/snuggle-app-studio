import { useEffect, useState } from "react";

interface PartnerSession {
  token: string;
  expires_at: number;
  partner_slug: string;
  partner_name: string;
}

export const usePartnerAuth = (partnerSlug: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [session, setSession] = useState<PartnerSession | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const sessionStr = localStorage.getItem(`partner_session_${partnerSlug}`);
        
        if (!sessionStr) {
          setIsAuthenticated(false);
          setSession(null);
          return;
        }

        const sessionData: PartnerSession = JSON.parse(sessionStr);
        
        // Check if session is expired
        if (Date.now() > sessionData.expires_at) {
          localStorage.removeItem(`partner_session_${partnerSlug}`);
          setIsAuthenticated(false);
          setSession(null);
          return;
        }

        // Check if slug matches
        if (sessionData.partner_slug !== partnerSlug) {
          setIsAuthenticated(false);
          setSession(null);
          return;
        }

        setIsAuthenticated(true);
        setSession(sessionData);
      } catch (err) {
        console.error("Error checking partner auth:", err);
        setIsAuthenticated(false);
        setSession(null);
      }
    };

    checkAuth();
  }, [partnerSlug]);

  const logout = () => {
    localStorage.removeItem(`partner_session_${partnerSlug}`);
    setIsAuthenticated(false);
    setSession(null);
  };

  return { isAuthenticated, session, logout };
};
