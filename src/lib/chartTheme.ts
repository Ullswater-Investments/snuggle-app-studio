// ============================================
// PROCUREDATA Chart Theme - Centralized Colors
// ============================================

// Primary brand colors for charts
export const CHART_COLORS = {
  // Primary palette (Orange tones)
  primary: "hsl(32, 94%, 54%)",
  primaryDark: "hsl(32, 94%, 44%)",
  primaryLight: "hsl(32, 90%, 65%)",
  
  // Secondary palette (Gray tones)
  secondary: "hsl(0, 0%, 40%)",
  secondaryDark: "hsl(0, 0%, 24%)",
  secondaryLight: "hsl(0, 0%, 60%)",
  
  // Extended palette for multiple series
  palette: [
    "hsl(32, 94%, 54%)",   // Naranja primario
    "hsl(0, 0%, 40%)",     // Gris
    "hsl(32, 80%, 70%)",   // Naranja claro
    "hsl(0, 0%, 55%)",     // Gris medio
    "hsl(32, 60%, 45%)",   // Naranja oscuro
    "hsl(0, 0%, 30%)",     // Gris oscuro
  ],
  
  // Status colors
  success: "hsl(142, 76%, 36%)",
  warning: "hsl(32, 94%, 54%)",
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
