import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { Card } from '@/components/ui/card';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
  scale?: number;
}

let idCounter = 0;
const generateId = () => `mermaid-${Date.now()}-${idCounter++}`;

export function MermaidDiagram({ chart, className = '', scale = 1.4 }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const uniqueId = useRef(generateId());
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Initialize mermaid with current theme
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
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
    <Card className={`overflow-x-auto p-4 bg-card ${className}`}>
      <div 
        ref={containerRef}
        className="mermaid-container flex justify-center [&_svg]:origin-center [&_svg]:my-8"
        style={{ '--diagram-scale': scale } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <style>{`
        .mermaid-container svg {
          transform: scale(var(--diagram-scale, 1.4));
        }
      `}</style>
    </Card>
  );
}
