import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Activity, Network } from "lucide-react";
import { EcosystemMetrics } from "./EcosystemMetrics";
import { LiveDataFlow } from "./LiveDataFlow";
import { FederatedNetworkDiagram } from "./FederatedNetworkDiagram";

export const DataVisualizer = () => {
  return (
    <div className="h-full flex flex-col bg-card rounded-2xl border shadow-lg overflow-hidden">
      <Tabs defaultValue="metrics" className="flex flex-col h-full">
        <div className="px-4 pt-3 border-b">
          <TabsList className="w-full bg-muted/50 h-9">
            <TabsTrigger value="metrics" className="text-xs gap-1.5 flex-1">
              <BarChart3 className="w-3.5 h-3.5" /> Métricas
            </TabsTrigger>
            <TabsTrigger value="flow" className="text-xs gap-1.5 flex-1">
              <Activity className="w-3.5 h-3.5" /> Flujo de Datos
            </TabsTrigger>
            <TabsTrigger value="network" className="text-xs gap-1.5 flex-1">
              <Network className="w-3.5 h-3.5" /> Red Federada
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 p-4 min-h-0 overflow-y-auto">
          <TabsContent value="metrics" className="mt-0 h-full">
            <EcosystemMetrics />
          </TabsContent>
          <TabsContent value="flow" className="mt-0 h-full">
            <LiveDataFlow />
          </TabsContent>
          <TabsContent value="network" className="mt-0 h-full">
            <FederatedNetworkDiagram />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
