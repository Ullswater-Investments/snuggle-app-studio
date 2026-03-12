import { Users, User, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MEMBERS_PLACEHOLDER = [
  {
    name: "Diego Alejandro Castellanos Hernandez",
    email: "diego.castellanos.doz@gmail.com",
    role: "Propietario",
  },
];

export default function OrganizationMembersTab() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl">Miembros</CardTitle>
            <Badge variant="secondary" className="rounded-full">
              {MEMBERS_PLACEHOLDER.length}
            </Badge>
          </div>
          <CardDescription>
            Gestiona los miembros de la organización y sus roles.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, email o rol..."
            className="pl-9"
          />
        </div>

        <div className="space-y-3">
          {MEMBERS_PLACEHOLDER.map((member) => (
            <div
              key={member.email}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="gap-1 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-500"
              >
                <Star className="h-3.5 w-3.5" />
                {member.role}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
