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
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % connections.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [connections.length]);

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;
  const isHighlighted = (id: string) => highlightedNodes.includes(id);

  return (
    <div className="w-full aspect-[5/4] max-w-[500px] mx-auto">
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
                strokeWidth={bothHighlighted ? 2 : 1.5}
                strokeDasharray="4 4"
                animate={{ opacity: bothHighlighted ? 0.9 : 0.5 }}
                transition={{ duration: 0.4 }}
              />
              {(i === activeConnection || isProcessing) && (
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
          const highlighted = isHighlighted(node.id);
          return (
            <g key={node.id}>
              {highlighted && (
                <motion.circle
                  cx={node.x} cy={node.y} r={node.size + 10}
                  fill="none" stroke={node.color} strokeWidth={2.5}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0.2, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <motion.circle
                cx={node.x} cy={node.y} r={node.size}
                fill={node.color}
                animate={{ opacity: highlighted ? [0.2, 0.45, 0.2] : isProcessing ? [0.15, 0.35, 0.15] : 0.15 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <circle cx={node.x} cy={node.y} r={node.size * 0.6} fill={node.color} opacity={0.9} />
              <text
                x={node.x} y={node.y + node.size + 16}
                textAnchor="middle"
                className="fill-foreground text-[11px] font-medium"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
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
