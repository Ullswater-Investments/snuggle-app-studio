import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const nodes = [
  { id: "hub", label: "ProcureData", x: 250, y: 200, color: "hsl(262, 52%, 47%)", size: 38 },
  { id: "consumer", label: "Consumer", x: 80, y: 80, color: "hsl(217, 91%, 60%)", size: 28 },
  { id: "provider", label: "Provider", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 28 },
  { id: "holder", label: "Data Holder", x: 420, y: 320, color: "hsl(32, 94%, 54%)", size: 28 },
  { id: "erp", label: "ERP System", x: 80, y: 320, color: "hsl(0, 84%, 60%)", size: 24 },
  { id: "gaiax", label: "Gaia-X", x: 250, y: 380, color: "hsl(187, 100%, 42%)", size: 24 },
];

const connections = [
  { from: "consumer", to: "hub" },
  { from: "provider", to: "hub" },
  { from: "holder", to: "hub" },
  { from: "erp", to: "hub" },
  { from: "gaiax", to: "hub" },
  { from: "consumer", to: "provider" },
  { from: "holder", to: "gaiax" },
];

interface Props {
  isProcessing?: boolean;
}

export const FederatedNetworkDiagram = ({ isProcessing = false }: Props) => {
  const [activeConnection, setActiveConnection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % connections.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="w-full aspect-square max-w-[500px] mx-auto">
      <svg viewBox="0 0 500 420" className="w-full h-full">
        {/* Connection lines */}
        {connections.map((conn, i) => {
          const from = getNode(conn.from);
          const to = getNode(conn.to);
          return (
            <g key={`conn-${i}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="hsl(var(--border))"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                opacity={0.5}
              />
              {/* Animated particle */}
              <motion.circle
                r={3}
                fill={from.color}
                initial={{ opacity: 0 }}
                animate={
                  i === activeConnection || isProcessing
                    ? {
                        cx: [from.x, to.x],
                        cy: [from.y, to.y],
                        opacity: [0, 1, 1, 0],
                      }
                    : { opacity: 0, cx: from.x, cy: from.y }
                }
                transition={{ duration: 1.5, ease: "easeInOut", repeat: isProcessing ? Infinity : 0 }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Pulse ring for hub */}
            {node.id === "hub" && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size + 8}
                fill="none"
                stroke={node.color}
                strokeWidth={2}
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              opacity={0.15}
              animate={isProcessing ? { opacity: [0.15, 0.35, 0.15] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <circle cx={node.x} cy={node.y} r={node.size * 0.6} fill={node.color} opacity={0.9} />
            <text
              x={node.x}
              y={node.y + node.size + 16}
              textAnchor="middle"
              className="fill-foreground text-[11px] font-medium"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
