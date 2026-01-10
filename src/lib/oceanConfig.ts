// src/lib/oceanConfig.ts
// Configuración para Ocean Protocol / PONTUS-X

export const oceanConfig = {
  // Chain ID: 32460 para Pontus-X Testnet, 137 para Polygon Mainnet
  chainId: parseInt(import.meta.env.VITE_PONTUS_NETWORK_ID || '32460'),
  
  // Aquarius: Indexador de metadatos DDO
  aquariusUrl: import.meta.env.VITE_AQUARIUS_URL || 'https://aquarius.pontus-x.eu',
  
  // Provider: Proxy de acceso a datos
  providerUrl: import.meta.env.VITE_PROVIDER_URL || 'https://provider.pontus-x.eu',
  
  // RPC URL para la red
  nodeUri: import.meta.env.VITE_NODE_URI || 'https://rpc.dev.pontus-x.eu',
  
  // Explorer para verificar transacciones
  explorerUrl: 'https://explorer.pontus-x.eu',
};

// Configuración de contratos (placeholders - reemplazar con direcciones reales)
export const oceanContracts = {
  // Dirección del Data NFT Factory
  nftFactory: '0x0000000000000000000000000000000000000000',
  
  // Dirección del Fixed Rate Exchange
  fixedRateExchange: '0x0000000000000000000000000000000000000000',
  
  // Dirección del Dispenser (para tokens gratuitos)
  dispenser: '0x0000000000000000000000000000000000000000',
};

// Tipos de servicio soportados
export const SERVICE_TYPES = {
  ACCESS: 'access',
  COMPUTE: 'compute',
} as const;

// Estados de orden
export const ORDER_STATUS = {
  IDLE: 'idle',
  APPROVING: 'approving',
  ORDERING: 'ordering',
  CONSUMING: 'consuming',
  COMPLETED: 'completed',
  ERROR: 'error',
} as const;
