// src/services/pontusX.ts

import { ethers } from 'ethers';
import type { WalletState } from '@/types/web3.types';

// --- Configuración de la Red Pontus-X (Devnet/Testnet) ---
export const PONTUSX_NETWORK_CONFIG = {
  chainId: '0x7ec9', // 32457 en Decimal
  chainName: 'Pontus-X Testnet',
  nativeCurrency: {
    name: 'EUROe Utility Asset Unit',
    symbol: 'EURAU',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.test.pontus-x.eu'],
  blockExplorerUrls: ['https://explorer.pontus-x.eu/'],
};

// --- Configuración Ocean Protocol / PONTUS-X ---
const AQUARIUS_URL = import.meta.env.VITE_AQUARIUS_URL || "https://aquarius.pontus-x.eu";
const PROVIDER_URL = import.meta.env.VITE_PROVIDER_URL || "https://provider.pontus-x.eu";

// --- Configuración del Token EUROe ---
// Dirección del Smart Contract de EUROe (Placeholder - REEMPLAZAR CON REAL)
const EUROE_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

// ABI mínimo para interactuar con cualquier ERC-20 (Balance y Metadatos)
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)"
];

class PontusXService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private euroeContract: ethers.Contract | null = null;

  constructor() {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  /**
   * Verifica si hay una wallet Web3 disponible (MetaMask, etc.)
   */
  isWeb3Available(): boolean {
    return typeof window !== 'undefined' && !!window.ethereum;
  }

  /**
   * Inicializa la conexión, verifica la red y carga balances.
   */
  async connectWallet(): Promise<WalletState> {
    if (!this.provider) {
      throw new Error("No se detectó billetera Web3. Por favor instala MetaMask.");
    }

    try {
      // 1. Solicitar acceso a cuentas
      await this.provider.send("eth_requestAccounts", []);

      this.signer = await this.provider.getSigner();
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();

      // 2. Verificar Red (Switch automático)
      const currentChainId = "0x" + network.chainId.toString(16);
      if (currentChainId !== PONTUSX_NETWORK_CONFIG.chainId) {
        await this.switchNetwork();
        // Recargar provider/signer después del cambio de red
        this.provider = new ethers.BrowserProvider(window.ethereum!);
        this.signer = await this.provider.getSigner();
      }

      // 3. Obtener Balance Nativo (Gas Token)
      const balanceBigInt = await this.provider.getBalance(address);
      const balance = ethers.formatEther(balanceBigInt);

      // 4. Obtener Balance EUROe
      const euroeBalance = await this.getEUROeBalance(address);

      // 5. Generar DID
      const did = this.generateDID(address);

      return {
        address,
        chainId: PONTUSX_NETWORK_CONFIG.chainId,
        balance,
        euroeBalance,
        did,
        isConnected: true
      };

    } catch (error) {
      console.error("Error conectando a Pontus-X:", error);
      throw error;
    }
  }

  /**
   * Desconecta la wallet (limpia estado local)
   */
  disconnect(): WalletState {
    this.signer = null;
    this.euroeContract = null;
    return {
      address: null,
      chainId: null,
      balance: null,
      euroeBalance: null,
      did: null,
      isConnected: false
    };
  }

  /**
   * Fuerza el cambio de red a Pontus-X en la wallet del usuario.
   * Si la red no existe, solicita agregarla.
   */
  async switchNetwork(): Promise<void> {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: PONTUSX_NETWORK_CONFIG.chainId }],
      });
    } catch (switchError: unknown) {
      // Código 4902: La cadena no ha sido agregada a la wallet
      if ((switchError as { code?: number })?.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [PONTUSX_NETWORK_CONFIG],
          });
        } catch (addError) {
          throw new Error("No se pudo agregar la red Pontus-X a la billetera.");
        }
      } else {
        throw switchError;
      }
    }
  }

  /**
   * Lee el balance del token EUROe del contrato inteligente.
   */
  async getEUROeBalance(address: string): Promise<string> {
    if (!this.signer) return "0.00";

    try {
      // Instanciar contrato solo si no existe
      if (!this.euroeContract) {
        this.euroeContract = new ethers.Contract(EUROE_CONTRACT_ADDRESS, ERC20_ABI, this.signer);
      }

      // Lectura segura
      const balance = await this.euroeContract.balanceOf(address);
      // Asumimos 18 decimales (estándar). Si EUROe tiene 6, cambiar a 6.
      return ethers.formatUnits(balance, 18);
    } catch (error) {
      console.warn("No se pudo leer el contrato EUROe:", error);
      return "0.00"; // Fallback seguro para UI
    }
  }

  /**
   * Genera un DID compatible con did:ethr basado en la cadena y dirección.
   */
  generateDID(address: string): string {
    // Formato estándar: did:ethr:<chainId>:<ethereumAddress>
    return `did:ethr:${PONTUSX_NETWORK_CONFIG.chainId}:${address.toLowerCase()}`;
  }

  /**
   * Firma un mensaje estándar (SIWE - Sign In With Ethereum).
   * Se usa para probar posesión de la clave privada sin gastar gas.
   */
  async signMessage(message: string): Promise<string> {
    if (!this.signer) throw new Error("Wallet no conectada");
    return await this.signer.signMessage(message);
  }

  /**
   * Listener para cambios de cuenta
   */
  onAccountsChanged(callback: (accounts: string[]) => void): void {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', callback as (...args: unknown[]) => void);
    }
  }

  /**
   * Listener para cambios de red
   */
  onChainChanged(callback: (chainId: string) => void): void {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', callback as (...args: unknown[]) => void);
    }
  }

  /**
   * Remueve listeners
   */
  removeListeners(): void {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', () => {});
      window.ethereum.removeListener('chainChanged', () => {});
    }
  }

  /**
   * Revoca el acceso a un recurso específico.
   * Simula la interacción con el smart contract de permisos.
   * @param did - Identificador descentralizado del usuario
   * @param resourceId - ID del recurso/transacción a revocar
   * @returns Hash de la transacción blockchain
   */
  async revokeAccess(did: string, resourceId: string): Promise<string> {
    if (!this.signer) throw new Error("Wallet no conectada");
    
    // Simulación de latencia de red blockchain (2-3 segundos)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Genera un hash de transacción pseudo-aleatorio
        const txHash = this.generateTxHash();
        resolve(txHash);
      }, 2000);
    });
  }

  // ========================================
  // MÉTODOS OCEAN PROTOCOL / PONTUS-X
  // ========================================

  /**
   * Genera un hash de transacción simulado
   */
  private generateTxHash(): string {
    return "0x" + Array(64)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');
  }

  /**
   * Verifica si el usuario tiene saldo suficiente para una compra
   */
  async checkBalance(requiredAmount: number): Promise<{
    sufficient: boolean;
    currentBalance: string;
  }> {
    if (!this.signer) throw new Error("Wallet no conectada");
    const address = await this.signer.getAddress();
    const balance = await this.getEUROeBalance(address);
    const current = parseFloat(balance);
    return {
      sufficient: current >= requiredAmount,
      currentBalance: balance
    };
  }

  /**
   * Aprueba gasto de tokens ERC-20 para un contrato (ej: FixedRateExchange)
   */
  async approveSpending(spenderAddress: string, amount: string): Promise<string> {
    if (!this.signer) throw new Error("Wallet no conectada");
    
    // Simulación - en producción se usaría el contrato real
    await new Promise(resolve => setTimeout(resolve, 1500));
    const txHash = this.generateTxHash();
    console.log(`[PontusX] Approve TX: ${txHash} for ${amount} to ${spenderAddress}`);
    return txHash;
  }

  /**
   * Compra un Datatoken usando el FixedRateExchange
   */
  async buyDatatoken(datatokenAddress: string, amount: string): Promise<{
    txHash: string;
    datatokenBalance: string;
  }> {
    if (!this.signer) throw new Error("Wallet no conectada");
    
    // Simulación de compra - en producción se llamaría al contrato
    await new Promise(resolve => setTimeout(resolve, 2000));
    const txHash = this.generateTxHash();
    console.log(`[PontusX] Buy Datatoken TX: ${txHash} for ${datatokenAddress}`);
    
    return { 
      txHash, 
      datatokenBalance: amount 
    };
  }

  /**
   * Inicia una orden de servicio (startOrder en Ocean Protocol)
   */
  async startOrder(did: string, serviceIndex: number): Promise<{
    orderTxId: string;
    serviceEndpoint: string;
  }> {
    if (!this.signer) throw new Error("Wallet no conectada");
    
    // Simulación de orden
    await new Promise(resolve => setTimeout(resolve, 2000));
    const orderTxId = this.generateTxHash();
    console.log(`[PontusX] Start Order TX: ${orderTxId} for DID: ${did}`);
    
    return { 
      orderTxId, 
      serviceEndpoint: PROVIDER_URL 
    };
  }

  /**
   * Obtiene la URL de descarga del Ocean Provider
   * Requiere firma del usuario para autenticar
   */
  async getDownloadUrl(
    did: string,
    orderTxId: string,
    serviceId: string
  ): Promise<{ downloadUrl: string; expiresAt: Date }> {
    if (!this.signer) throw new Error("Wallet no conectada");
    
    // 1. Firmar mensaje de autenticación
    const message = `Access request for ${did} with order ${orderTxId}`;
    await this.signMessage(message);
    
    // 2. Simulación de respuesta del Provider
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hora
    const downloadUrl = `${PROVIDER_URL}/api/v1/services/download?did=${encodeURIComponent(did)}&orderTxId=${orderTxId}&serviceId=${serviceId}`;
    
    console.log(`[PontusX] Download URL obtained, expires: ${expiresAt.toISOString()}`);
    return { downloadUrl, expiresAt };
  }

  /**
   * Inicia un trabajo de Compute-to-Data
   */
  async startComputeJob(did: string, algorithmDid: string): Promise<{
    jobId: string;
    status: 'queued' | 'running';
  }> {
    if (!this.signer) throw new Error("Wallet no conectada");
    
    // Simulación de inicio de trabajo C2D
    await new Promise(resolve => setTimeout(resolve, 1500));
    const jobId = `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`[PontusX] Compute Job started: ${jobId} for DID: ${did}`);
    return { jobId, status: 'queued' };
  }

  /**
   * Obtiene el estado de un trabajo de Compute-to-Data
   */
  async getComputeJobStatus(jobId: string): Promise<{
    status: 'queued' | 'running' | 'completed' | 'failed';
    resultUrl?: string;
  }> {
    // Simulación - siempre devuelve completed con resultado
    return {
      status: 'completed',
      resultUrl: `${PROVIDER_URL}/api/v1/compute/result/${jobId}`
    };
  }

  /**
   * Obtiene la URL del explorador para una transacción
   */
  getExplorerUrl(txHash: string): string {
    return `${PONTUSX_NETWORK_CONFIG.blockExplorerUrls?.[0]}tx/${txHash}`;
  }

  /**
   * Obtiene la URL de Aquarius (Metadata Cache)
   */
  getAquariusUrl(): string {
    return AQUARIUS_URL;
  }

  /**
   * Obtiene la URL del Provider
   */
  getProviderUrl(): string {
    return PROVIDER_URL;
  }
}

// Exportar una instancia Singleton
export const pontusXService = new PontusXService();
