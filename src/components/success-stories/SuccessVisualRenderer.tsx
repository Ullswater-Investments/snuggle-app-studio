import React from 'react';
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

// Import all Blueprint 2.0 simulators
import { 
  VinosDOSimulator,
  PortBCNSimulator,
  BioMedSimulator,
  SocialHubSimulator,
  FiberLoopSimulator,
  AvocadoTrustSimulator,
  HeliosFieldsSimulator,
  AeolusWindSimulator,
  GridFlexSimulator,
  RawMarketSimulator,
  BerryWaterSimulator,
  GigaFactorySimulator,
  PureLithiumSimulator,
  FastFashionSimulator,
  OliveTrustSimulator,
  UrbanDeliverSimulator,
  PharmaColdSimulator,
  AyuntamientoSimulator,
  H2PureSimulator,
  PoligonoEcoLinkSimulator,
  BateriaHubSimulator,
  BioHeatDistrictSimulator,
  TurbineChainSimulator,
  AquaPowerNexusSimulator,
  SmartChargeSimulator,
  RareEarthRecoverSimulator,
  AluCycleSimulator,
  ProducerTrustSimulator,
  EcoOrchestratorSimulator,
  BatteryLifeSimulator,
  UrbanMiningSimulator,
  WasteToValueSimulator,
  GreenGovCircularSimulator,
  CitrusCheckSimulator,
  RiceSatelliteSimulator,
  BioCottonTraceSimulator,
  GreenhouseAISimulator,
  TropicalFlashSimulator,
  UrbanHydroSimulator,
  OliveOriginSimulator,
  DataCloudSecureSimulator,
  GreenFinanceESGSimulator,
  FleetCarbonZeroSimulator,
  GovNetSimulator,
  UniSynthSimulator,
  KYCSovereignSimulator,
  GlobalBridgeSimulator
} from './simulators';

interface Props {
  caseId: string;
}

// Mapping of case IDs to their Blueprint 2.0 simulators
const simulatorMap: Record<string, React.ComponentType> = {
  // Oleada 1: 5 Casos Estrella
  'giga-factory': GigaFactorySimulator,
  'gigafactory-battery': GigaFactorySimulator,
  'purelithium-sourcing': PureLithiumSimulator,
  'pure-lithium': PureLithiumSimulator,
  'fastfashion-trace': FastFashionSimulator,
  'fast-fashion': FastFashionSimulator,
  'olive-origin': OliveOriginSimulator,
  'olivetrust-dop': OliveTrustSimulator,
  'urban-deliver': UrbanDeliverSimulator,
  'urban-delivery': UrbanDeliverSimulator,
  
  // Oleada 2: Social, Salud y Puertos
  'pharmacold-logistix': PharmaColdSimulator,
  'pharma-cold': PharmaColdSimulator,
  'portbcn-smart-trade': PortBCNSimulator,
  'port-bcn': PortBCNSimulator,
  'ayuntamiento-etico': AyuntamientoSimulator,
  'biomed-research': BioMedSimulator,
  'social-hub': SocialHubSimulator,
  'fiber-loop': FiberLoopSimulator,
  
  // Oleada 3: Energía y Renovables
  'h2-pure': H2PureSimulator,
  'h2pure-origin': H2PureSimulator,
  'poligono-eco-link': PoligonoEcoLinkSimulator,
  'bateria-hub': BateriaHubSimulator,
  'battery-hub': BateriaHubSimulator,
  'bioheat-district': BioHeatDistrictSimulator,
  'turbine-chain': TurbineChainSimulator,
  'aquapower-nexus': AquaPowerNexusSimulator,
  'aqua-power': AquaPowerNexusSimulator,
  'smartcharge-ev': SmartChargeSimulator,
  'smart-charge': SmartChargeSimulator,
  'helios-fields': HeliosFieldsSimulator,
  'aeolus-wind': AeolusWindSimulator,
  'gridflex-demand': GridFlexSimulator,
  'gridflow-energy': GridFlexSimulator,
  
  // Oleada 4: Economía Circular
  'rare-earth': RareEarthRecoverSimulator,
  'rare-earth-recover': RareEarthRecoverSimulator,
  'alu-cycle': AluCycleSimulator,
  'producer-trust': ProducerTrustSimulator,
  'eco-orchestrator': EcoOrchestratorSimulator,
  'battery-life': BatteryLifeSimulator,
  'urban-mining': UrbanMiningSimulator,
  'waste-to-value': WasteToValueSimulator,
  'green-gov-circular': GreenGovCircularSimulator,
  'raw-market': RawMarketSimulator,
  
  // Oleada 5: Agri-Tech y Fitosanitarios
  'citrus-check': CitrusCheckSimulator,
  'avocado-trust': AvocadoTrustSimulator,
  'berry-water': BerryWaterSimulator,
  'zero-chem-wine': VinosDOSimulator,
  'vinosdoe-elite': VinosDOSimulator,
  'rice-satellite': RiceSatelliteSimulator,
  'bio-cotton-trace': BioCottonTraceSimulator,
  'greenhouse-ai': GreenhouseAISimulator,
  'tropical-flash': TropicalFlashSimulator,
  'urban-hydro': UrbanHydroSimulator,
  'olive-trust': OliveTrustSimulator,
  
  // Oleada 6: Tech, Finanzas y Gobernanza
  'data-cloud-secure': DataCloudSecureSimulator,
  'ailabs-research': UniSynthSimulator,
  'green-finance-esg': GreenFinanceESGSimulator,
  'invoicetrust-b2b': GreenFinanceESGSimulator,
  'fleet-carbon-zero': FleetCarbonZeroSimulator,
  'gov-net': GovNetSimulator,
  'uni-synth': UniSynthSimulator,
  'kyc-sovereign': KYCSovereignSimulator,
  'global-bridge': GlobalBridgeSimulator,
  
  // Aerospace & Defense
  'sky-aero-systems': GigaFactorySimulator,
};

export function SuccessVisualRenderer({ caseId }: Props) {
  // Check if there's a specific simulator for this case
  const SimulatorComponent = simulatorMap[caseId];
  
  if (SimulatorComponent) {
    return <SimulatorComponent />;
  }

  // Fallback for unknown cases
  return (
    <Card className="p-8 text-center">
      <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">Simulador no disponible para este caso: {caseId}</p>
    </Card>
  );
}
