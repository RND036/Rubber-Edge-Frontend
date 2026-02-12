// context/BlockchainContext.tsx
// Global blockchain state management

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { web3Service } from '../blockchain/services/web3Service';
import { priceRecordService } from '../blockchain/services/priceRecordService';
import { transactionService } from '../blockchain/services/transactionService';
import { supplyChainService } from '../blockchain/services/supplyChainService';
import {
  WalletInfo,
  PriceRecord,
  RubberTransaction,
  BatchInfo,
  TransactionStatus,
} from '../blockchain/types/blockchain.types';
import { ACTIVE_NETWORK } from '../blockchain/config/network';

// Storage keys
const STORAGE_KEYS = {
  WALLET: 'blockchain_wallet',
  AUTO_SYNC: 'blockchain_auto_sync',
  NETWORK: 'blockchain_network',
};

// Context types
interface BlockchainState {
  // Wallet
  wallet: WalletInfo | null;
  isConnected: boolean;
  isLoading: boolean;
  
  // Network
  network: typeof ACTIVE_NETWORK;
  isTestnet: boolean;
  
  // Data
  priceRecords: PriceRecord[];
  transactions: RubberTransaction[];
  batches: BatchInfo[];
  
  // Sync
  pendingPrices: number;
  pendingTransactions: number;
  isSyncing: boolean;
  autoSync: boolean;
  
  // Last sync time
  lastSyncTime: number | null;
}

interface BlockchainContextType extends BlockchainState {
  // Wallet actions
  createWallet: () => Promise<{ address: string; mnemonic: string }>;
  importWallet: (privateKey: string) => Promise<boolean>;
  disconnectWallet: () => Promise<void>;
  refreshWallet: () => Promise<void>;
  
  // Price actions
  recordPrice: (gradeId: string, price: number, source?: string) => Promise<{ success: boolean; txHash?: string }>;
  getPriceHistory: (gradeId: string, limit?: number) => Promise<PriceRecord[]>;
  getLatestPrice: (gradeId: string) => Promise<PriceRecord | null>;
  verifyPrice: (txHash: string) => Promise<{ isValid: boolean; record?: PriceRecord }>;
  
  // Transaction actions
  recordTransaction: (
    farmerId: string,
    buyerId: string,
    amount: number,
    gradeId: string,
    pricePerKg: number,
    location: string
  ) => Promise<{ success: boolean; transactionId?: string; txHash?: string }>;
  updateTransactionStatus: (transactionId: string, status: TransactionStatus) => Promise<boolean>;
  verifyTransaction: (transactionId: string) => Promise<{ isValid: boolean; transaction?: RubberTransaction }>;
  
  // Supply chain actions
  recordHarvest: (
    farmerId: number,
    quantity: number,
    gradeId: string,
    farmLocation: string
  ) => Promise<{ success: boolean; batchId?: string }>;
  addSupplyChainStage: (
    batchId: string,
    stage: string,
    location: string,
    notes?: string
  ) => Promise<boolean>;
  traceBatch: (batchId: string) => Promise<BatchInfo | null>;
  
  // Sync actions
  syncOfflineData: () => Promise<{
    prices: { synced: number; failed: number };
    transactions: { synced: number; failed: number };
  }>;
  setAutoSync: (enabled: boolean) => void;
  
  // Utility actions
  getExplorerUrl: (txHash: string) => string;
  refreshData: () => Promise<void>;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

interface BlockchainProviderProps {
  children: ReactNode;
}

export const BlockchainProvider: React.FC<BlockchainProviderProps> = ({ children }) => {
  // State
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [network] = useState(ACTIVE_NETWORK);
  
  const [priceRecords, setPriceRecords] = useState<PriceRecord[]>([]);
  const [transactions, setTransactions] = useState<RubberTransaction[]>([]);
  const [batches, setBatches] = useState<BatchInfo[]>([]);
  
  const [pendingPrices, setPendingPrices] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSync, setAutoSyncState] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState<number | null>(null);

  // Computed values
  const isConnected = wallet !== null && wallet.address.length > 0;
  const isTestnet = network.chainId === 80002;

  // Initialize
  useEffect(() => {
    initializeBlockchain();
  }, []);

  // Auto sync effect
  useEffect(() => {
    if (autoSync && isConnected && (pendingPrices > 0 || pendingTransactions > 0)) {
      const syncInterval = setInterval(() => {
        syncOfflineData();
      }, 60000); // Every minute

      return () => clearInterval(syncInterval);
    }
  }, [autoSync, isConnected, pendingPrices, pendingTransactions]);

  const initializeBlockchain = async () => {
    setIsLoading(true);
    try {
      // Load wallet from storage
      const storedWallet = await AsyncStorage.getItem(STORAGE_KEYS.WALLET);
      if (storedWallet) {
        const walletData = JSON.parse(storedWallet);
        setWallet(walletData);
        await web3Service.loadWallet();
      }

      // Load auto sync preference
      const storedAutoSync = await AsyncStorage.getItem(STORAGE_KEYS.AUTO_SYNC);
      if (storedAutoSync !== null) {
        setAutoSyncState(JSON.parse(storedAutoSync));
      }

      // Load data
      await refreshData();
      
      // Count pending items
      await updatePendingCounts();
    } catch (error) {
      console.error('Failed to initialize blockchain:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePendingCounts = async () => {
    try {
      const offlinePrices = await priceRecordService.getOfflinePrices();
      const offlineTxs = await transactionService.getOfflineTransactions();
      setPendingPrices(offlinePrices.length);
      setPendingTransactions(offlineTxs.length);
    } catch (error) {
      console.error('Failed to get pending counts:', error);
    }
  };

  const refreshData = useCallback(async () => {
    try {
      const [pricesData, transactionsData, batchesData] = await Promise.all([
        priceRecordService.getAllPriceRecords(),
        transactionService.getAllTransactions(),
        supplyChainService.getAllBatches(),
      ]);

      setPriceRecords(pricesData);
      setTransactions(transactionsData);
      setBatches(batchesData);
      
      await updatePendingCounts();
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  }, []);

  // Wallet actions
  const createWallet = async (): Promise<{ address: string; mnemonic: string }> => {
    const result = await web3Service.createWallet();
    
    setWallet(result.wallet);
    await AsyncStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(result.wallet));
    
    return { address: result.wallet.address, mnemonic: result.mnemonic };
  };

  const importWallet = async (privateKey: string): Promise<boolean> => {
    const walletInfo = await web3Service.importWallet(privateKey);
    
    if (walletInfo) {
      setWallet(walletInfo);
      await AsyncStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(walletInfo));
      
      return true;
    }
    
    return false;
  };

  const disconnectWallet = async (): Promise<void> => {
    await web3Service.disconnectWallet();
    setWallet(null);
    await AsyncStorage.removeItem(STORAGE_KEYS.WALLET);
  };

  const refreshWallet = async (): Promise<void> => {
    if (wallet) {
      // In production, fetch balance from blockchain
      // const balance = await web3Service.getBalance();
      // setWallet({ ...wallet, balance });
    }
  };

  // Price actions
  const recordPrice = async (
    gradeId: string,
    price: number,
    source?: string
  ): Promise<{ success: boolean; txHash?: string }> => {
    const result = await priceRecordService.recordPrice({ gradeId, price, source });
    await refreshData();
    return { success: result.success, txHash: result.txHash };
  };

  const getPriceHistory = async (gradeId: string, limit: number = 10): Promise<PriceRecord[]> => {
    return priceRecordService.getPriceHistory(gradeId, limit);
  };

  const getLatestPrice = async (gradeId: string): Promise<PriceRecord | null> => {
    return priceRecordService.getLatestPrice(gradeId);
  };

  const verifyPrice = async (
    txHash: string
  ): Promise<{ isValid: boolean; record?: PriceRecord }> => {
    const result = await priceRecordService.verifyPriceRecord(txHash);
    return { isValid: result.isValid, record: result.record };
  };

  // Transaction actions
  const recordTransaction = async (
    farmerId: string,
    buyerId: string,
    amount: number,
    gradeId: string,
    pricePerKg: number,
    location: string
  ): Promise<{ success: boolean; transactionId?: string; txHash?: string }> => {
    const result = await transactionService.recordTransaction({
      farmerId: parseInt(farmerId, 10),
      buyerId: parseInt(buyerId, 10),
      amount,
      gradeId,
      pricePerKg,
      location,
    });
    await refreshData();
    return { 
      success: result.success, 
      transactionId: result.data?.transactionId, 
      txHash: result.txHash 
    };
  };

  const updateTransactionStatus = async (
    transactionId: string,
    status: TransactionStatus
  ): Promise<boolean> => {
    const result = await transactionService.updateTransactionStatus(transactionId, status);
    await refreshData();
    return result.success;
  };

  const verifyTransaction = async (
    transactionId: string
  ): Promise<{ isValid: boolean; transaction?: RubberTransaction }> => {
    return transactionService.verifyTransaction(transactionId);
  };

  // Supply chain actions
  const recordHarvest = async (
    farmerId: number,
    quantity: number,
    gradeId: string,
    farmLocation: string
  ): Promise<{ success: boolean; batchId?: string }> => {
    const result = await supplyChainService.recordHarvest(
      farmerId,
      quantity,
      gradeId,
      farmLocation
    );
    await refreshData();
    return { success: result.success, batchId: result.data?.batchId };
  };

  const addSupplyChainStage = async (
    batchId: string,
    stage: string,
    location: string,
    notes?: string
  ): Promise<boolean> => {
    const result = await supplyChainService.recordStage(
      batchId,
      stage,
      location,
      notes || ''
    );
    await refreshData();
    return result.success;
  };

  const traceBatch = async (batchId: string): Promise<BatchInfo | null> => {
    return supplyChainService.getBatchInfo(batchId);
  };

  // Sync actions
  const syncOfflineData = async (): Promise<{
    prices: { synced: number; failed: number };
    transactions: { synced: number; failed: number };
  }> => {
    setIsSyncing(true);
    
    try {
      const [priceResult, txResult] = await Promise.all([
        priceRecordService.syncOfflinePrices(),
        transactionService.syncOfflineTransactions(),
      ]);

      setLastSyncTime(Date.now());
      await refreshData();

      return {
        prices: priceResult,
        transactions: txResult,
      };
    } finally {
      setIsSyncing(false);
    }
  };

  const setAutoSync = async (enabled: boolean): Promise<void> => {
    setAutoSyncState(enabled);
    await AsyncStorage.setItem(STORAGE_KEYS.AUTO_SYNC, JSON.stringify(enabled));
  };

  // Utility actions
  const getExplorerUrl = (txHash: string): string => {
    return `${network.explorerUrl}/tx/${txHash}`;
  };

  const contextValue: BlockchainContextType = {
    // State
    wallet,
    isConnected,
    isLoading,
    network,
    isTestnet,
    priceRecords,
    transactions,
    batches,
    pendingPrices,
    pendingTransactions,
    isSyncing,
    autoSync,
    lastSyncTime,

    // Wallet actions
    createWallet,
    importWallet,
    disconnectWallet,
    refreshWallet,

    // Price actions
    recordPrice,
    getPriceHistory,
    getLatestPrice,
    verifyPrice,

    // Transaction actions
    recordTransaction,
    updateTransactionStatus,
    verifyTransaction,

    // Supply chain actions
    recordHarvest,
    addSupplyChainStage,
    traceBatch,

    // Sync actions
    syncOfflineData,
    setAutoSync,

    // Utility actions
    getExplorerUrl,
    refreshData,
  };

  return (
    <BlockchainContext.Provider value={contextValue}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchainContext = (): BlockchainContextType => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchainContext must be used within a BlockchainProvider');
  }
  return context;
};

export default BlockchainContext;
