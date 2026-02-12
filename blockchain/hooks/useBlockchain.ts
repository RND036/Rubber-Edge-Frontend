// blockchain/hooks/useBlockchain.ts
// React hook for blockchain interactions

import { useState, useEffect, useCallback } from 'react';
import { web3Service } from '../services/web3Service';
import { priceRecordService } from '../services/priceRecordService';
import { transactionService } from '../services/transactionService';
import { supplyChainService } from '../services/supplyChainService';
import {
  WalletInfo,
  PriceRecord,
  PriceRecordInput,
  RubberTransaction,
  TransactionInput,
  TransactionStatus,
  BatchInfo,
  HarvestRecord,
} from '../types/blockchain.types';

interface BlockchainState {
  isConnected: boolean;
  isLoading: boolean;
  wallet: WalletInfo | null;
  error: string | null;
  pendingTxCount: number;
}

export const useBlockchain = () => {
  const [state, setState] = useState<BlockchainState>({
    isConnected: false,
    isLoading: true,
    wallet: null,
    error: null,
    pendingTxCount: 0,
  });

  // Initialize on mount
  useEffect(() => {
    initializeBlockchain();
  }, []);

  const initializeBlockchain = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const walletInfo = await web3Service.getWalletInfo();
      const pendingTxs = await web3Service.getPendingTransactions();
      
      setState({
        isConnected: walletInfo !== null,
        isLoading: false,
        wallet: walletInfo,
        error: null,
        pendingTxCount: pendingTxs.length,
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to initialize blockchain',
      }));
    }
  };

  // ============================================
  // WALLET OPERATIONS
  // ============================================

  const createWallet = useCallback(async (): Promise<WalletInfo | null> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await web3Service.createWallet();
      
      setState(prev => ({
        ...prev,
        isConnected: true,
        isLoading: false,
        wallet: result.wallet,
      }));
      
      return result.wallet;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to create wallet',
      }));
      return null;
    }
  }, []);

  const importWallet = useCallback(async (privateKey: string): Promise<WalletInfo | null> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const walletInfo = await web3Service.importWallet(privateKey);
      
      setState(prev => ({
        ...prev,
        isConnected: true,
        isLoading: false,
        wallet: walletInfo,
      }));
      
      return walletInfo;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to import wallet',
      }));
      return null;
    }
  }, []);

  const disconnectWallet = useCallback(async (): Promise<void> => {
    try {
      await web3Service.disconnectWallet();
      
      setState({
        isConnected: false,
        isLoading: false,
        wallet: null,
        error: null,
        pendingTxCount: 0,
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to disconnect wallet',
      }));
    }
  }, []);

  const refreshWallet = useCallback(async (): Promise<void> => {
    const walletInfo = await web3Service.getWalletInfo();
    setState(prev => ({
      ...prev,
      wallet: walletInfo,
      isConnected: walletInfo !== null,
    }));
  }, []);

  // ============================================
  // PRICE OPERATIONS
  // ============================================

  const recordPrice = useCallback(async (input: PriceRecordInput): Promise<{
    success: boolean;
    data?: PriceRecord;
    txHash?: string;
    error?: string;
  }> => {
    const result = await priceRecordService.recordPrice(input);
    
    if (result.success) {
      await refreshPendingCount();
    }
    
    return result;
  }, []);

  const getLatestPrice = useCallback(async (gradeId: string): Promise<PriceRecord | null> => {
    return await priceRecordService.getLatestPrice(gradeId);
  }, []);

  const getPriceHistory = useCallback(async (gradeId: string, count?: number): Promise<PriceRecord[]> => {
    return await priceRecordService.getPriceHistory(gradeId, count);
  }, []);

  const verifyPrice = useCallback(async (txHash: string) => {
    return await priceRecordService.verifyPriceRecord(txHash);
  }, []);

  // ============================================
  // TRANSACTION OPERATIONS
  // ============================================

  const recordTransaction = useCallback(async (input: TransactionInput): Promise<{
    success: boolean;
    data?: RubberTransaction;
    txHash?: string;
    error?: string;
  }> => {
    const result = await transactionService.recordTransaction(input);
    
    if (result.success) {
      await refreshPendingCount();
    }
    
    return result;
  }, []);

  const updateTransactionStatus = useCallback(async (
    transactionId: string,
    status: TransactionStatus
  ) => {
    return await transactionService.updateTransactionStatus(transactionId, status);
  }, []);

  const getTransaction = useCallback(async (transactionId: string): Promise<RubberTransaction | null> => {
    return await transactionService.getTransaction(transactionId);
  }, []);

  const getFarmerTransactions = useCallback(async (farmerId: number): Promise<RubberTransaction[]> => {
    return await transactionService.getFarmerTransactions(farmerId);
  }, []);

  const getBuyerTransactions = useCallback(async (buyerId: number): Promise<RubberTransaction[]> => {
    return await transactionService.getBuyerTransactions(buyerId);
  }, []);

  const verifyTransaction = useCallback(async (transactionId: string) => {
    return await transactionService.verifyTransaction(transactionId);
  }, []);

  const getTransactionStats = useCallback(async (farmerId?: number, buyerId?: number) => {
    return await transactionService.getTransactionStats(farmerId, buyerId);
  }, []);

  // ============================================
  // SUPPLY CHAIN OPERATIONS
  // ============================================

  const recordHarvest = useCallback(async (
    farmerId: number,
    quantity: number,
    gradeId: string,
    location: string
  ): Promise<{
    success: boolean;
    data?: HarvestRecord;
    txHash?: string;
    error?: string;
  }> => {
    const result = await supplyChainService.recordHarvest(farmerId, quantity, gradeId, location);
    
    if (result.success) {
      await refreshPendingCount();
    }
    
    return result;
  }, []);

  const recordStage = useCallback(async (
    batchId: string,
    stage: string,
    location: string,
    notes: string
  ) => {
    return await supplyChainService.recordStage(batchId, stage, location, notes);
  }, []);

  const getBatchInfo = useCallback(async (batchId: string): Promise<BatchInfo | null> => {
    return await supplyChainService.getBatchInfo(batchId);
  }, []);

  const getFarmerBatches = useCallback(async (farmerId: number): Promise<BatchInfo[]> => {
    return await supplyChainService.getFarmerBatches(farmerId);
  }, []);

  const traceProduct = useCallback(async (batchId: string) => {
    return await supplyChainService.traceProduct(batchId);
  }, []);

  const getSupplyChainStats = useCallback(async (farmerId?: number) => {
    return await supplyChainService.getSupplyChainStats(farmerId);
  }, []);

  // ============================================
  // SYNC OPERATIONS
  // ============================================

  const syncOfflineData = useCallback(async (): Promise<{
    prices: { synced: number; failed: number };
    transactions: { synced: number; failed: number };
  }> => {
    const priceSync = await priceRecordService.syncOfflinePrices();
    const txSync = await transactionService.syncOfflineTransactions();
    
    await refreshPendingCount();
    
    return {
      prices: priceSync,
      transactions: txSync,
    };
  }, []);

  const refreshPendingCount = async () => {
    const offlinePrices = await priceRecordService.getOfflinePrices();
    const offlineTxs = await transactionService.getOfflineTransactions();
    const pendingTxs = await web3Service.getPendingTransactions();
    
    setState(prev => ({
      ...prev,
      pendingTxCount: offlinePrices.length + offlineTxs.length + pendingTxs.length,
    }));
  };

  // ============================================
  // UTILITIES
  // ============================================

  const getNetworkInfo = useCallback(() => {
    return web3Service.getNetworkInfo();
  }, []);

  const getExplorerUrl = useCallback((txHash: string): string => {
    return web3Service.getExplorerUrl(txHash);
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    // State
    ...state,
    
    // Wallet
    createWallet,
    importWallet,
    disconnectWallet,
    refreshWallet,
    
    // Prices
    recordPrice,
    getLatestPrice,
    getPriceHistory,
    verifyPrice,
    
    // Transactions
    recordTransaction,
    updateTransactionStatus,
    getTransaction,
    getFarmerTransactions,
    getBuyerTransactions,
    verifyTransaction,
    getTransactionStats,
    
    // Supply Chain
    recordHarvest,
    recordStage,
    getBatchInfo,
    getFarmerBatches,
    traceProduct,
    getSupplyChainStats,
    
    // Sync
    syncOfflineData,
    
    // Utils
    getNetworkInfo,
    getExplorerUrl,
    clearError,
    refresh: initializeBlockchain,
  };
};

export default useBlockchain;
