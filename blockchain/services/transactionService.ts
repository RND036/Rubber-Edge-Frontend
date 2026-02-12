// blockchain/services/transactionService.ts
// Service for recording rubber transactions on blockchain

import AsyncStorage from '@react-native-async-storage/async-storage';
import { web3Service } from './web3Service';
import { getContractAddresses, RUBBER_TRANSACTION_ABI } from '../config/contracts';
import { getExplorerTxUrl } from '../config/network';
import {
  RubberTransaction,
  TransactionInput,
  TransactionStatus,
  BlockchainTxResult,
  BlockchainApiResponse,
} from '../types/blockchain.types';
import { hashTransactionData } from '../utils/hashUtils';
import { priceToBlockchain } from '../utils/formatters';

// Storage keys
const TRANSACTION_HISTORY_KEY = '@rubberedge_tx_history';
const OFFLINE_TX_KEY = '@rubberedge_offline_txs';

class TransactionService {
  private contractAddress: string;

  constructor() {
    this.contractAddress = getContractAddresses().rubberTransaction;
  }

  // ============================================
  // RECORD TRANSACTIONS
  // ============================================

  async recordTransaction(
    input: TransactionInput
  ): Promise<BlockchainApiResponse<RubberTransaction>> {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const transactionId = hashTransactionData({
        ...input,
        timestamp,
      });

      // Check if wallet is connected
      if (!web3Service.isWalletConnected()) {
        // Store offline
        const offlineTx: RubberTransaction = {
          transactionId,
          ...input,
          totalValue: input.amount * input.pricePerKg,
          timestamp,
          status: TransactionStatus.PENDING,
          recorder: 'offline',
        };
        await this.storeOfflineTransaction(offlineTx);
        return {
          success: true,
          data: offlineTx,
        };
      }

      // In production, encode and send transaction
      const result = await web3Service.sendTransaction(
        this.contractAddress,
        '0x', // Encoded function data
      );

      if (!result.success) {
        throw new Error(result.error || 'Transaction failed');
      }

      const rubberTx: RubberTransaction = {
        transactionId,
        ...input,
        totalValue: input.amount * input.pricePerKg,
        timestamp,
        status: TransactionStatus.CONFIRMED,
        recorder: web3Service.getWalletAddress() || '',
        txHash: result.txHash,
      };

      // Save to local history
      await this.saveTransactionToHistory(rubberTx);

      return {
        success: true,
        data: rubberTx,
        txHash: result.txHash,
      };
    } catch (error: any) {
      console.error('Failed to record transaction:', error);
      return {
        success: false,
        error: error.message || 'Failed to record transaction',
      };
    }
  }

  async updateTransactionStatus(
    transactionId: string,
    status: TransactionStatus
  ): Promise<BlockchainApiResponse<boolean>> {
    try {
      if (!web3Service.isWalletConnected()) {
        // Update local only
        await this.updateLocalTransactionStatus(transactionId, status);
        return { success: true, data: true };
      }

      const result = await web3Service.sendTransaction(
        this.contractAddress,
        '0x', // Encoded function data
      );

      if (!result.success) {
        throw new Error(result.error || 'Failed to update status');
      }

      await this.updateLocalTransactionStatus(transactionId, status);

      return {
        success: true,
        data: true,
        txHash: result.txHash,
      };
    } catch (error: any) {
      console.error('Failed to update transaction status:', error);
      return {
        success: false,
        error: error.message || 'Failed to update status',
      };
    }
  }

  // ============================================
  // RETRIEVE TRANSACTIONS
  // ============================================

  async getTransaction(transactionId: string): Promise<RubberTransaction | null> {
    try {
      const history = await this.getLocalTransactionHistory();
      return history.find(tx => tx.transactionId === transactionId) || null;
    } catch (error) {
      console.error('Failed to get transaction:', error);
      return null;
    }
  }

  async getFarmerTransactions(farmerId: number): Promise<RubberTransaction[]> {
    try {
      const history = await this.getLocalTransactionHistory();
      return history
        .filter(tx => tx.farmerId === farmerId)
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Failed to get farmer transactions:', error);
      return [];
    }
  }

  async getBuyerTransactions(buyerId: number): Promise<RubberTransaction[]> {
    try {
      const history = await this.getLocalTransactionHistory();
      return history
        .filter(tx => tx.buyerId === buyerId)
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Failed to get buyer transactions:', error);
      return [];
    }
  }

  async getAllTransactions(): Promise<RubberTransaction[]> {
    try {
      return await this.getLocalTransactionHistory();
    } catch (error) {
      console.error('Failed to get all transactions:', error);
      return [];
    }
  }

  async getRecentTransactions(count: number = 10): Promise<RubberTransaction[]> {
    try {
      const history = await this.getLocalTransactionHistory();
      return history
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, count);
    } catch (error) {
      console.error('Failed to get recent transactions:', error);
      return [];
    }
  }

  // ============================================
  // VERIFICATION
  // ============================================

  async verifyTransaction(transactionId: string): Promise<{
    isValid: boolean;
    transaction?: RubberTransaction;
    explorerUrl?: string;
  }> {
    try {
      const tx = await this.getTransaction(transactionId);
      
      if (!tx) {
        return { isValid: false };
      }

      return {
        isValid: true,
        transaction: tx,
        explorerUrl: tx.txHash ? getExplorerTxUrl(tx.txHash) : undefined,
      };
    } catch (error) {
      console.error('Failed to verify transaction:', error);
      return { isValid: false };
    }
  }

  async verifyByTxHash(txHash: string): Promise<{
    isValid: boolean;
    transaction?: RubberTransaction;
    explorerUrl: string;
  }> {
    try {
      const history = await this.getLocalTransactionHistory();
      const tx = history.find(t => t.txHash === txHash);

      return {
        isValid: !!tx,
        transaction: tx || undefined,
        explorerUrl: getExplorerTxUrl(txHash),
      };
    } catch (error) {
      console.error('Failed to verify by tx hash:', error);
      return {
        isValid: false,
        explorerUrl: getExplorerTxUrl(txHash),
      };
    }
  }

  // ============================================
  // STATISTICS
  // ============================================

  async getTransactionStats(farmerId?: number, buyerId?: number): Promise<{
    totalTransactions: number;
    totalVolume: number;
    totalValue: number;
    averagePrice: number;
  }> {
    try {
      let transactions = await this.getLocalTransactionHistory();

      if (farmerId) {
        transactions = transactions.filter(tx => tx.farmerId === farmerId);
      }
      if (buyerId) {
        transactions = transactions.filter(tx => tx.buyerId === buyerId);
      }

      const totalTransactions = transactions.length;
      const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      const totalValue = transactions.reduce((sum, tx) => sum + tx.totalValue, 0);
      const averagePrice = totalVolume > 0 ? totalValue / totalVolume : 0;

      return {
        totalTransactions,
        totalVolume,
        totalValue,
        averagePrice,
      };
    } catch (error) {
      console.error('Failed to get transaction stats:', error);
      return {
        totalTransactions: 0,
        totalVolume: 0,
        totalValue: 0,
        averagePrice: 0,
      };
    }
  }

  // ============================================
  // OFFLINE STORAGE
  // ============================================

  private async storeOfflineTransaction(tx: RubberTransaction): Promise<void> {
    try {
      const offline = await this.getOfflineTransactions();
      offline.push({ ...tx, syncStatus: 'pending' });
      await AsyncStorage.setItem(OFFLINE_TX_KEY, JSON.stringify(offline));
    } catch (error) {
      console.error('Failed to store offline transaction:', error);
    }
  }

  async getOfflineTransactions(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(OFFLINE_TX_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get offline transactions:', error);
      return [];
    }
  }

  async syncOfflineTransactions(): Promise<{ synced: number; failed: number }> {
    const offline = await this.getOfflineTransactions();
    let synced = 0;
    let failed = 0;

    for (const tx of offline) {
      const result = await this.recordTransaction({
        farmerId: tx.farmerId,
        buyerId: tx.buyerId,
        amount: tx.amount,
        pricePerKg: tx.pricePerKg,
        gradeId: tx.gradeId,
        location: tx.location,
      });

      if (result.success && result.txHash) {
        synced++;
      } else {
        failed++;
      }
    }

    if (synced > 0) {
      const remaining = offline.filter((_, index) => index >= synced);
      await AsyncStorage.setItem(OFFLINE_TX_KEY, JSON.stringify(remaining));
    }

    return { synced, failed };
  }

  // ============================================
  // LOCAL STORAGE
  // ============================================

  private async saveTransactionToHistory(tx: RubberTransaction): Promise<void> {
    try {
      const history = await this.getLocalTransactionHistory();
      history.unshift(tx);
      
      // Keep only last 1000 transactions
      const trimmed = history.slice(0, 1000);
      await AsyncStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Failed to save transaction to history:', error);
    }
  }

  private async getLocalTransactionHistory(): Promise<RubberTransaction[]> {
    try {
      const data = await AsyncStorage.getItem(TRANSACTION_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get local transaction history:', error);
      return [];
    }
  }

  private async updateLocalTransactionStatus(
    transactionId: string,
    status: TransactionStatus
  ): Promise<void> {
    try {
      const history = await this.getLocalTransactionHistory();
      const index = history.findIndex(tx => tx.transactionId === transactionId);
      
      if (index !== -1) {
        history[index].status = status;
        await AsyncStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify(history));
      }
    } catch (error) {
      console.error('Failed to update local transaction status:', error);
    }
  }
}

export const transactionService = new TransactionService();
export default transactionService;
