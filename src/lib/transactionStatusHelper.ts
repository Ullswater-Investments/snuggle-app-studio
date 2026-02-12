import { Clock, CheckCircle, XCircle, Lock, Unlock, Loader2, AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TransactionStatus = 
  | "initiated"
  | "pending_subject"
  | "pending_holder"
  | "approved"
  | "denied_subject"
  | "denied_holder"
  | "completed"
  | "cancelled";

export interface StatusConfig {
  label: string;
  labelLong: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  tooltip: string;
}

export const TRANSACTION_STATUS_CONFIG: Record<TransactionStatus, StatusConfig> = {
  initiated: {
    label: "Iniciada",
    labelLong: "Solicitado / Pendiente de revisión",
    icon: Clock,
    color: "text-blue-800 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    tooltip: "Transacción iniciada, esperando primera revisión",
  },
  pending_subject: {
    label: "Confirmando",
    labelLong: "Esperando aprobación comercial",
    icon: Loader2,
    color: "text-amber-800 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    tooltip: "El proveedor está revisando la solicitud",
  },
  pending_holder: {
    label: "Pendiente de Liberación",
    labelLong: "Pendiente de Liberación Técnica",
    icon: Lock,
    color: "text-purple-800 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    tooltip: "El Data Holder está validando el acceso técnico y el pago",
  },
  approved: {
    label: "Aprobada",
    labelLong: "Aprobada / Lista para acceder",
    icon: CheckCircle,
    color: "text-green-800 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    tooltip: "Transacción aprobada, lista para completar",
  },
  denied_subject: {
    label: "Rechazada",
    labelLong: "Rechazada por el proveedor",
    icon: XCircle,
    color: "text-red-800 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    tooltip: "El proveedor ha rechazado la solicitud",
  },
  denied_holder: {
    label: "Acceso Denegado",
    labelLong: "Acceso técnico denegado",
    icon: XCircle,
    color: "text-red-800 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    tooltip: "El acceso técnico ha sido denegado",
  },
  completed: {
    label: "Acceso Concedido",
    labelLong: "Acceso Concedido / Datos Disponibles",
    icon: Unlock,
    color: "text-emerald-800 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    tooltip: "Transacción completada, puedes acceder y descargar los datos",
  },
  cancelled: {
    label: "Cancelada",
    labelLong: "Cancelada",
    icon: XCircle,
    color: "text-gray-800 dark:text-gray-400",
    bgColor: "bg-gray-100 dark:bg-gray-900/30",
    tooltip: "La transacción ha sido cancelada",
  },
};

export const getStatusConfig = (status: string): StatusConfig => {
  return TRANSACTION_STATUS_CONFIG[status as TransactionStatus] || {
    label: status,
    labelLong: status,
    icon: AlertCircle,
    color: "text-gray-800 dark:text-gray-400",
    bgColor: "bg-gray-100 dark:bg-gray-900/30",
    tooltip: "Estado desconocido",
  };
};

export const getStatusLabel = (status: string, long: boolean = false): string => {
  const config = getStatusConfig(status);
  return long ? config.labelLong : config.label;
};

export const getStatusBadgeClass = (status: string): string => {
  const config = getStatusConfig(status);
  return `${config.bgColor} ${config.color}`;
};
