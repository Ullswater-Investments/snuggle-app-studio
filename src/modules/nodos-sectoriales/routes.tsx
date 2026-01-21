import { lazy } from 'react';

// Lazy load all page components for code splitting
const SectoralNodesPage = lazy(() => import('./pages/SectoralNodesPage'));
const NodeRequirementsPage = lazy(() => import('./pages/NodeRequirementsPage'));
const NodeTechPage = lazy(() => import('./pages/NodeTechPage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const OdrlPage = lazy(() => import('./pages/OdrlPage'));
const MonetizacionPage = lazy(() => import('./pages/MonetizacionPage'));
const MarcaBlancaPage = lazy(() => import('./pages/MarcaBlancaPage'));
const IdentidadDIDPage = lazy(() => import('./pages/IdentidadDIDPage'));
const SmartContractsPage = lazy(() => import('./pages/SmartContractsPage'));
const PagosEUROePage = lazy(() => import('./pages/PagosEUROePage'));
const ConectoresERPPage = lazy(() => import('./pages/ConectoresERPPage'));
const GobernanzaIDSAPage = lazy(() => import('./pages/GobernanzaIDSAPage'));
const MultiTenantRLSPage = lazy(() => import('./pages/MultiTenantRLSPage'));

/**
 * Array of route definitions for the Nodos Sectoriales module.
 * Import and spread these into your main App.tsx routes.
 * 
 * Usage in App.tsx:
 * ```tsx
 * import { nodosRoutes } from './modules/nodos-sectoriales/routes';
 * 
 * <Routes>
 *   {nodosRoutes.map((route) => (
 *     <Route key={route.path} path={route.path} element={route.element} />
 *   ))}
 * </Routes>
 * ```
 */
export const nodosRoutes = [
  { path: "/nodos-sectoriales", element: <SectoralNodesPage /> },
  { path: "/nodos/requisitos", element: <NodeRequirementsPage /> },
  { path: "/nodos/tecnologia", element: <NodeTechPage /> },
  { path: "/nodos/marketplace", element: <MarketplacePage /> },
  { path: "/nodos/odrl", element: <OdrlPage /> },
  { path: "/nodos/monetizacion", element: <MonetizacionPage /> },
  { path: "/nodos/marca-blanca", element: <MarcaBlancaPage /> },
  { path: "/nodos/identidad-did", element: <IdentidadDIDPage /> },
  { path: "/nodos/smart-contracts", element: <SmartContractsPage /> },
  { path: "/nodos/pagos-euroe", element: <PagosEUROePage /> },
  { path: "/nodos/conectores-erp", element: <ConectoresERPPage /> },
  { path: "/nodos/gobernanza-idsa", element: <GobernanzaIDSAPage /> },
  { path: "/nodos/multi-tenant-rls", element: <MultiTenantRLSPage /> },
];

export default nodosRoutes;
