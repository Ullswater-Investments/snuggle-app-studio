import { useQuery } from "@tanstack/react-query";
import { invitationsService } from "@/services/invitationsService";

/** Intervalo de polling en ms (30 segundos) */
const REFETCH_INTERVAL_MS = 30_000;

/**
 * Hook que obtiene las invitaciones pendientes con polling automático,
 * similar a un WebSocket: revalida periódicamente para detectar nuevas invitaciones.
 */
export function usePendingInvitations(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["profile-invitations"],
    queryFn: () => invitationsService.getPendingInvitations(),
    refetchInterval: REFETCH_INTERVAL_MS,
    ...options,
  });
}
