import { RoiCalculator, ProcessFlow, CapabilityTree, ImpactGauge } from './widgets';
import { ServiceFlowDiagram } from './ServiceFlowDiagram';

interface ServiceInteractiveWidgetProps {
  category: string;
  serviceName: string;
}

const CATEGORY_WIDGET_MAP: Record<string, React.ComponentType> = {
  'Financiación': RoiCalculator,
  'Compliance': ProcessFlow,
  'Data Ops': ProcessFlow,
  'Privacidad': ProcessFlow,
  'IA & Analytics': CapabilityTree,
  'Inteligencia': CapabilityTree,
  'Sostenibilidad': ImpactGauge,
  'Blockchain': ImpactGauge,
};

export const ServiceInteractiveWidget = ({ category, serviceName }: ServiceInteractiveWidgetProps) => {
  const Widget = CATEGORY_WIDGET_MAP[category];

  if (Widget) {
    return <Widget />;
  }

  // Fallback to static flow diagram for unmapped categories
  return <ServiceFlowDiagram category={category} serviceName={serviceName} />;
};
