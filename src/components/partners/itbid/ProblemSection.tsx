import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { ScoreRing } from "@/components/gamification/ScoreRing";
import { AlertTriangle, Copy, Eye, ShieldAlert } from "lucide-react";

const problems = [
  {
    icon: Copy,
    title: "Fricción",
    description: "El proveedor debe duplicar datos en múltiples portales de cada cliente.",
    color: "text-[hsl(var(--itbid-magenta))]",
    bgColor: "bg-[hsl(var(--itbid-magenta)/0.1)]",
    borderColor: "border-l-[hsl(var(--itbid-magenta)/0.5)]",
  },
  {
    icon: Eye,
    title: "Opacidad",
    description: "No hay visibilidad más allá del Tier-1 (proveedor directo).",
    color: "text-[hsl(var(--itbid-purple))]",
    bgColor: "bg-[hsl(var(--itbid-purple)/0.1)]",
    borderColor: "border-l-[hsl(var(--itbid-purple)/0.5)]",
  },
  {
    icon: ShieldAlert,
    title: "Riesgo",
    description: "Información sensible replicada, aumentando la superficie de ataque.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-l-destructive/50",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--itbid-magenta)/0.1)] text-[hsl(var(--itbid-magenta))] mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium itbid-font">El Problema Actual</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4 itbid-gradient-gray">Los Silos de Datos</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              La gestión de proveedores se basa en modelos centralizados donde el cliente exige al proveedor 
              que suba sus datos a la nube del cliente.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
