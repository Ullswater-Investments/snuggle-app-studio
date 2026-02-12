// ============================================
// PROCUREDATA Chart Theme - Centralized Colors
// ============================================

// Primary brand colors for charts
export const CHART_COLORS = {
  // Primary palette (Blue tones)
  primary: "hsl(209, 100%, 65%)",
  primaryDark: "hsl(209, 100%, 50%)",
  primaryLight: "hsl(209, 90%, 75%)",
  
  // Secondary palette (Navy tones)
  secondary: "hsl(213, 37%, 30%)",
  secondaryDark: "hsl(213, 37%, 18%)",
  secondaryLight: "hsl(213, 25%, 55%)",
  
  // Extended palette for multiple series
  palette: [
    "hsl(209, 100%, 65%)",   // Azul primario
    "hsl(213, 37%, 30%)",    // Navy
    "hsl(209, 80%, 80%)",    // Azul claro
    "hsl(213, 25%, 55%)",    // Gris azulado
    "hsl(209, 60%, 50%)",    // Azul medio
    "hsl(213, 37%, 18%)",    // Navy oscuro
  ],
  
  // Status colors
  success: "hsl(142, 76%, 36%)",
  warning: "hsl(45, 93%, 47%)",
  error: "hsl(0, 84%, 60%)",
};

// Gradient definitions for AreaCharts
export const CHART_GRADIENTS = {
  primary: {
    id: "gradientPrimary",
    color: CHART_COLORS.primary,
    stops: [
      { offset: "5%", opacity: 0.8 },
      { offset: "95%", opacity: 0 },
    ],
  },
  secondary: {
    id: "gradientSecondary",
    color: CHART_COLORS.secondary,
    stops: [
      { offset: "5%", opacity: 0.6 },
      { offset: "95%", opacity: 0 },
    ],
  },
};

// Common tooltip styles
export const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: "hsl(var(--background))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  labelStyle: {
    color: "hsl(var(--foreground))",
    fontWeight: 600,
  },
};

// Grid styling
export const CHART_GRID_STYLE = {
  strokeDasharray: "3 3",
  className: "stroke-muted",
  vertical: false,
};

// Axis styling
export const CHART_AXIS_STYLE = {
  className: "text-xs",
};

// Animation configuration for charts
export const CHART_ANIMATION_CONFIG = {
  line: {
    animationDuration: 1200,
    animationEasing: "ease-out" as const,
  },
  bar: {
    animationDuration: 800,
    animationEasing: "ease-out" as const,
    animationBegin: 100,
  },
  pie: {
    animationDuration: 1000,
    animationEasing: "ease-out" as const,
    animationBegin: 0,
  },
  area: {
    animationDuration: 1200,
    animationEasing: "ease-out" as const,
  },
};
