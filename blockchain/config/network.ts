// blockchain/config/network.ts
// Blockchain Network Configuration for RubberEdge

export interface NetworkConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  isTestnet: boolean;
}

// Polygon Amoy Testnet (for development)
export const POLYGON_AMOY: NetworkConfig = {
  name: 'Polygon Amoy Testnet',
  chainId: 80002,
  rpcUrl: 'https://rpc-amoy.polygon.technology/',
  explorerUrl: 'https://amoy.polygonscan.com',
  currency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  isTestnet: true,
};

// Ethereum Sepolia Testnet (easier to get free tokens!)
export const ETH_SEPOLIA: NetworkConfig = {
  name: 'Sepolia Testnet',
  chainId: 11155111,
  rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
  explorerUrl: 'https://sepolia.etherscan.io',
  currency: {
    name: 'Sepolia ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  isTestnet: true,
};

// Polygon Mainnet (for production)
export const POLYGON_MAINNET: NetworkConfig = {
  name: 'Polygon Mainnet',
  chainId: 137,
  rpcUrl: 'https://polygon-rpc.com/',
  explorerUrl: 'https://polygonscan.com',
  currency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  isTestnet: false,
};

// Current active network - Using Sepolia for easier faucet access
export const ACTIVE_NETWORK: NetworkConfig = ETH_SEPOLIA;

// Blockchain configuration
export const BLOCKCHAIN_CONFIG = {
  // Network settings
  network: ACTIVE_NETWORK,
  
  // Gas settings
  gasLimit: 500000,
  maxPriorityFeePerGas: '30', // gwei
  maxFeePerGas: '50', // gwei
  
  // Retry settings
  maxRetries: 3,
  retryDelay: 1000, // ms
  
  // Confirmation settings
  confirmationsRequired: 2,
  
  // Timeout settings
  transactionTimeout: 60000, // 60 seconds
  
  // Cache settings
  cacheExpiry: 300000, // 5 minutes
};

// Get explorer URL for transaction
export const getExplorerTxUrl = (txHash: string): string => {
  return `${ACTIVE_NETWORK.explorerUrl}/tx/${txHash}`;
};

// Get explorer URL for address
export const getExplorerAddressUrl = (address: string): string => {
  return `${ACTIVE_NETWORK.explorerUrl}/address/${address}`;
};

// Get explorer URL for block
export const getExplorerBlockUrl = (blockNumber: number): string => {
  return `${ACTIVE_NETWORK.explorerUrl}/block/${blockNumber}`;
};
