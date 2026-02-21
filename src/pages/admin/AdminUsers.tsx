import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  User,
  Shield,
  Trash2,
  Building2,
  ArrowLeftRight,
  History,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { logGovernanceEvent } from "@/utils/governanceLogger";

interface UserOrg {
  id: string;
  name: string;
  role: string;
}

interface ApprovalEntry {
  transaction_id: string;
  action: string;
  notes: string | null;
  created_at: string;
}

interface TransactionEntry {
  id: string;
  status: string;
  purpose: string;
  created_at: string;
  consumer_org_id: string;
  holder_org_id: string;
  subject_org_id: string;
}

interface AdminUser {
  id: string;
  email: string;
  fullName: string | null;
  createdAt: string;
  lastSignIn: string | null;
  organizations: UserOrg[];
  isDataSpaceOwner: boolean;
  hasOrganizations: boolean;
  transactionCount: number;
  approvalHistory: ApprovalEntry[];
  recentTransactions: TransactionEntry[];
}

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [orgFilter, setOrgFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-all-users"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;
      if (!token) throw new Error("Not authenticated");

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users`;
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
      });
      if (!resp.ok) throw new Error("Failed to fetch users");
      const json = await resp.json();
      return (json.users ?? []) as AdminUser[];
    },
  });

  const filtered = users.filter((u) => {
    const matchesSearch =
      (u.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (u.fullName ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesOrg =
      orgFilter === "all" ||
      (orgFilter === "orphan" && !u.hasOrganizations) ||
      (orgFilter === "with-org" && u.hasOrganizations);
    return matchesSearch && matchesOrg;
  });

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">
          {users.length} usuarios registrados · {users.filter((u) => !u.hasOrganizations).length} sin organización
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por email o nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={orgFilter} onValueChange={setOrgFilter}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Filtrar usuarios" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los usuarios</SelectItem>
            <SelectItem value="with-org">Con organización</SelectItem>
            <SelectItem value="orphan">Sin organización (huérfanos)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Organizaciones</TableHead>
                <TableHead>Rol Global</TableHead>
                <TableHead>Registro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Cargando usuarios...
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No se encontraron usuarios
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{user.fullName || "—"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[250px]">
                        {user.organizations.length === 0 ? (
                          <Badge variant="outline" className="text-xs text-muted-foreground">
                            Sin organización
                          </Badge>
                        ) : (
                          user.organizations.slice(0, 3).map((org) => (
                            <Badge key={org.id} variant="secondary" className="text-xs">
                              {org.name}
                            </Badge>
                          ))
                        )}
                        {user.organizations.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.organizations.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.isDataSpaceOwner ? (
                        <Badge className="bg-primary/10 text-primary border-0">
                          <Shield className="h-3 w-3 mr-1" />
                          Data Space Owner
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">Usuario Estándar</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(user.createdAt), "dd MMM yyyy", { locale: es })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Sheet */}
      <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedUser && (
            <UserDetailPanel
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
              onUserDeleted={() => {
                setSelectedUser(null);
              }}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

// ---- User Detail Panel ----

const UserDetailPanel = ({
  user,
  onClose,
  onUserDeleted,
}: {
  user: AdminUser;
  onClose: () => void;
  onUserDeleted: () => void;
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const queryClient = useQueryClient();

  const canDelete = !user.hasOrganizations && user.transactionCount === 0 && !user.isDataSpaceOwner;
  const deleteReason = user.isDataSpaceOwner
    ? "Es un Data Space Owner"
    : user.hasOrganizations
    ? "Pertenece a organizaciones activas"
    : user.transactionCount > 0
    ? "Tiene transacciones vinculadas"
    : null;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;
      if (!token) throw new Error("Not authenticated");

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users?action=delete`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || "Error al eliminar");
      }
    },
    onSuccess: () => {
      toast.success("Usuario eliminado correctamente");
      logGovernanceEvent({
        level: "info",
        category: "users",
        message: `Usuario ${user.email} removido de la plataforma`,
        metadata: { user_id: user.id, email: user.email },
      });
      queryClient.invalidateQueries({ queryKey: ["admin-all-users"] });
      onUserDeleted();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {user.fullName || user.email}
        </SheetTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          {user.isDataSpaceOwner && (
            <Badge className="bg-primary/10 text-primary border-0">
              <Shield className="h-3 w-3 mr-1" />
              Data Space Owner
            </Badge>
          )}
        </div>
        <div className="text-xs text-muted-foreground space-y-0.5 mt-1">
          <p>Registrado: {format(new Date(user.createdAt), "dd MMM yyyy HH:mm", { locale: es })}</p>
          {user.lastSignIn && (
            <p>Último acceso: {format(new Date(user.lastSignIn), "dd MMM yyyy HH:mm", { locale: es })}</p>
          )}
        </div>
      </SheetHeader>

      {/* Organizations */}
      <div>
        <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          Organizaciones ({user.organizations.length})
        </h4>
        {user.organizations.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">Sin organización asignada</p>
        ) : (
          <div className="space-y-2">
            {user.organizations.map((org) => (
              <Card key={org.id}>
                <CardContent className="p-3 flex items-center justify-between">
                  <span className="text-sm font-medium">{org.name}</span>
                  <Badge variant="secondary" className="text-xs">{org.role}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Separator />

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">
            <ArrowLeftRight className="h-3.5 w-3.5 mr-1.5" />
            Transacciones
          </TabsTrigger>
          <TabsTrigger value="audit">
            <History className="h-3.5 w-3.5 mr-1.5" />
            Linaje de Acciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">
            {user.recentTransactions.length} transacciones recientes
          </p>
          {user.recentTransactions.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">Sin transacciones</p>
          ) : (
            <div className="space-y-2">
              {user.recentTransactions.map((tx) => (
                <Card key={tx.id}>
                  <CardContent className="p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate max-w-[250px]">{tx.purpose}</span>
                      <Badge variant="outline" className="text-xs">{tx.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(tx.created_at), "dd/MM/yyyy HH:mm")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="audit" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">
            {user.approvalHistory.length} acciones registradas
          </p>
          {user.approvalHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">Sin actividad de aprobación</p>
          ) : (
            <div className="space-y-2">
              {user.approvalHistory.map((entry, i) => (
                <Card key={i}>
                  <CardContent className="p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          entry.action === "approve"
                            ? "default"
                            : entry.action === "deny"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {entry.action === "approve"
                          ? "Aprobó"
                          : entry.action === "deny"
                          ? "Denegó"
                          : entry.action === "pre_approve"
                          ? "Pre-aprobó"
                          : entry.action === "cancel"
                          ? "Canceló"
                          : entry.action}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(entry.created_at), "dd/MM/yyyy HH:mm")}
                      </span>
                    </div>
                    {entry.notes && (
                      <p className="text-xs text-muted-foreground italic">"{entry.notes}"</p>
                    )}
                    <p className="text-xs font-mono text-muted-foreground truncate">
                      TX: {entry.transaction_id.slice(0, 8)}...
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Section */}
      <Separator />
      <div className="pt-2 space-y-2">
        {!canDelete && deleteReason && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
            <span>No se puede eliminar: {deleteReason}</span>
          </div>
        )}
        <Button
          variant="destructive"
          className="w-full"
          disabled={!canDelete || deleteMutation.isPending}
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Eliminar Usuario
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará permanentemente la cuenta de <strong>{user.email}</strong>.
              Este usuario no tiene organizaciones ni transacciones vinculadas.{" "}
              <strong>Esta acción no se puede deshacer.</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar permanentemente
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsers;
