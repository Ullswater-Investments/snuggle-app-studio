import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
  scale?: number;
  mobileScale?: number;
}

let idCounter = 0;
const generateId = () => `mermaid-${Date.now()}-${idCounter++}`;

export function MermaidDiagram({ 
  chart, 
  className = '', 
  scale = 0.85,
  mobileScale = 0.5
}: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const uniqueId = useRef(generateId());
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();

  // Calculate responsive scale: mobile uses mobileScale, desktop uses scale
  const responsiveScale = isMobile ? mobileScale : scale;

  useEffect(() => {
    // Initialize mermaid with current theme
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      },
      sequence: {
        useMaxWidth: true,
        wrap: true
      },
      er: {
        useMaxWidth: true
      }
    });

    const renderDiagram = async () => {
      try {
        setError(null);
        // Generate new ID to force re-render
        uniqueId.current = generateId();
        const { svg } = await mermaid.render(uniqueId.current, chart);
        setSvg(svg);
      } catch (err) {
        console.error('Error rendering mermaid diagram:', err);
        setError(err instanceof Error ? err.message : 'Error rendering diagram');
      }
    };

    renderDiagram();
  }, [chart, resolvedTheme]);

  if (error) {
    return (
      <Card className="p-4 bg-destructive/10 border-destructive">
        <pre className="text-sm text-destructive whitespace-pre-wrap">{error}</pre>
      </Card>
    );
  }

  return (
    <Card className={`p-4 bg-card w-full ${className}`}>
      <div 
        ref={containerRef}
        className="mermaid-container w-full flex justify-center overflow-x-auto"
        style={{ '--diagram-scale': responsiveScale } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <style>{`
        .mermaid-container {
          min-height: 100px;
        }
        .mermaid-container svg {
          max-width: 100%;
          height: auto;
          transform: scale(var(--diagram-scale, 0.85));
          transform-origin: top center;
          transition: transform 0.3s ease;
        }
        @media (max-width: 768px) {
          .mermaid-container svg {
            transform-origin: top left;
          }
        }
      `}</style>
    </Card>
  );
}
