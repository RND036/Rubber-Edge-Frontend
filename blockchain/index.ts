// blockchain/index.ts
// Main export file for blockchain module

// Config
export { ACTIVE_NETWORK, POLYGON_AMOY, POLYGON_MAINNET } from './config/network';
export {
  getContractAddresses,
  RUBBER_PRICE_ORACLE_ABI,
  RUBBER_TRANSACTION_ABI,
  SUPPLY_CHAIN_REGISTRY_ABI,
  FARMER_REGISTRY_ABI,
} from './config/contracts';

// Types
export * from './types/blockchain.types';

// Services
export { web3Service } from './services/web3Service';
export { priceRecordService } from './services/priceRecordService';
export { transactionService } from './services/transactionService';
export { supplyChainService } from './services/supplyChainService';

// Hooks
export { useBlockchain } from './hooks/useBlockchain';
export { useWallet } from './hooks/useWallet';
export { usePriceRecords } from './hooks/usePriceRecords';

// Utils
export * from './utils/hashUtils';
export * from './utils/formatters';
