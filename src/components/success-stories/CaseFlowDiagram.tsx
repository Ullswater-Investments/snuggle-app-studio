import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface FlowNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

export interface FlowConnection {
  from: string;
  to: string;
}

interface Props {
  nodes: FlowNode[];
  connections: FlowConnection[];
  highlightedNodes?: string[];
  isProcessing?: boolean;
}

export const CaseFlowDiagram = ({ nodes, connections, highlightedNodes = [], isProcessing = false }: Props) => {
  const [activeConnection, setActiveConnection] = useState(0);

  useEffect(() => {
    if (connections.length === 0) return;
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % connections.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [connections.length]);

  const getNode = (id: string) => nodes.find((n) => n.id === id);
  const isHighlighted = (id: string) => highlightedNodes.includes(id);
  const activeCount = highlightedNodes.length;

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Legend */}
      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-primary/40" />
          Nodo inactivo
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "hsl(142, 71%, 45%)" }} />
          Nodo activo ({activeCount})
        </span>
      </div>

      <div className="w-full aspect-[5/4] max-w-[460px]">
        <svg viewBox="0 0 500 420" className="w-full h-full">
          {/* Connections */}
          {connections.map((conn, i) => {
            const from = getNode(conn.from);
            const to = getNode(conn.to);
            if (!from || !to) return null;
            const bothHighlighted = isHighlighted(conn.from) && isHighlighted(conn.to);
            return (
              <g key={`conn-${i}`}>
                <motion.line
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={bothHighlighted ? "hsl(142, 71%, 45%)" : "hsl(var(--border))"}
                  strokeWidth={bothHighlighted ? 2.5 : 1.5}
                  strokeDasharray={bothHighlighted ? "none" : "4 4"}
                  animate={{ opacity: bothHighlighted ? 0.9 : 0.4 }}
                  transition={{ duration: 0.4 }}
                />
                {(i === activeConnection || isProcessing) && from.x != null && to.x != null && (
                  <motion.circle
                    r={3} fill={from.color}
                    cx={from.x} cy={from.y}
                    animate={{ cx: [from.x, to.x], cy: [from.y, to.y], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: isProcessing ? Infinity : 0 }}
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            if (node.x == null || node.y == null) return null;
            const highlighted = isHighlighted(node.id);
            return (
              <g key={node.id}>
                {highlighted && (
                  <motion.circle
                    cx={node.x} cy={node.y} r={node.size + 12}
                    fill="none" stroke={node.color} strokeWidth={2}
                    initial={{ opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.15, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <motion.circle
                  cx={node.x} cy={node.y} r={node.size}
                  fill={node.color}
                  animate={{ opacity: highlighted ? [0.25, 0.5, 0.25] : isProcessing ? [0.12, 0.3, 0.12] : 0.12 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <circle cx={node.x} cy={node.y} r={node.size * 0.6} fill={node.color} opacity={highlighted ? 1 : 0.85} />
                {/* Node label with background for readability */}
                <rect
                  x={node.x - (node.label.length * 3.2)}
                  y={node.y + node.size + 6}
                  width={node.label.length * 6.4}
                  height={14}
                  rx={3}
                  fill="hsl(var(--card))"
                  opacity={0.85}
                />
                <text
                  x={node.x} y={node.y + node.size + 17}
                  textAnchor="middle"
                  className="fill-foreground text-[10px] font-semibold"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

/** Detect keywords in text and return matching node IDs */
export function detectCaseHighlights(text: string, keywordMap: Record<string, string>): string[] {
  const found: string[] = [];
  const lower = text.toLowerCase();
  for (const [keyword, nodeId] of Object.entries(keywordMap)) {
    if (lower.includes(keyword) && !found.includes(nodeId)) found.push(nodeId);
  }
  return found;
}
