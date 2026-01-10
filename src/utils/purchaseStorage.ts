// src/utils/purchaseStorage.ts
// Utilidad para persistir compras Web3 en localStorage

const STORAGE_KEY = 'pontus_purchases';

export interface PurchasedAsset {
  did: string;
  assetId: string;
  txHash: string;
  timestamp: number;
  name: string;
  price: number;
  currency: string;
  explorerUrl?: string;
}

/**
 * Guarda una compra en localStorage
 */
export const savePurchase = (asset: PurchasedAsset): void => {
  const purchases = getPurchases();
  
  // Evitar duplicados por txHash
  if (purchases.some(p => p.txHash === asset.txHash)) {
    console.warn('Purchase already saved:', asset.txHash);
    return;
  }
  
  purchases.unshift(asset); // Añadir al principio (más reciente primero)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
};

/**
 * Obtiene todas las compras guardadas
 */
export const getPurchases = (): PurchasedAsset[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading purchases from localStorage:', error);
    return [];
  }
};

/**
 * Verifica si un asset ya fue comprado
 */
export const hasPurchased = (assetId: string): boolean => {
  return getPurchases().some(p => p.assetId === assetId);
};

/**
 * Obtiene la compra de un asset específico
 */
export const getPurchaseByAssetId = (assetId: string): PurchasedAsset | undefined => {
  return getPurchases().find(p => p.assetId === assetId);
};

/**
 * Obtiene la compra por hash de transacción
 */
export const getPurchaseByTxHash = (txHash: string): PurchasedAsset | undefined => {
  return getPurchases().find(p => p.txHash === txHash);
};

/**
 * Elimina una compra del storage
 */
export const removePurchase = (txHash: string): void => {
  const purchases = getPurchases().filter(p => p.txHash !== txHash);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
};

/**
 * Limpia todas las compras (útil para testing/logout)
 */
export const clearPurchases = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Cuenta total de compras
 */
export const getPurchaseCount = (): number => {
  return getPurchases().length;
};
