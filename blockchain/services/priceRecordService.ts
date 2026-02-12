// blockchain/services/priceRecordService.ts
// Service for recording rubber price data on blockchain

import AsyncStorage from '@react-native-async-storage/async-storage';
import { web3Service } from './web3Service';
import { getContractAddresses, RUBBER_PRICE_ORACLE_ABI } from '../config/contracts';
import { getExplorerTxUrl } from '../config/network';
import {
  PriceRecord,
  PriceRecordInput,
  BlockchainApiResponse,
} from '../types/blockchain.types';
import { hashTransactionData } from '../utils/hashUtils';
import { priceToBlockchain } from '../utils/formatters';

// Storage keys
const PRICE_HISTORY_KEY = '@rubberedge_price_history';
const OFFLINE_PRICE_KEY = '@rubberedge_offline_prices';
const PRICE_CACHE_KEY = '@rubberedge_price_cache';

class PriceRecordService {
  private contractAddress: string;

  constructor() {
    this.contractAddress = getContractAddresses().rubberPriceOracle;
  }

  // ============================================
  // RECORD PRICES
  // ============================================

  async recordPrice(
    input: PriceRecordInput
  ): Promise<BlockchainApiResponse<PriceRecord>> {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const blockchainPrice = priceToBlockchain(input.price);

      // Check if wallet is connected
      if (!web3Service.isWalletConnected()) {
        // Store offline
        const offlinePrice: PriceRecord = {
          gradeId: input.gradeId,
          price: input.price,
          timestamp,
          recorder: 'offline',
        };

        await this.storeOfflinePrice(offlinePrice);

        return {
          success: true,
          data: offlinePrice,
        };
      }

      // Sign and send transaction
      const result = await web3Service.sendTransaction(
        this.contractAddress,
        '0x', // Encoded function data
      );

      if (!result.success) {
        throw new Error(result.error || 'Failed to record price');
      }

      const priceRecord: PriceRecord = {
        gradeId: input.gradeId,
        price: input.price,
        timestamp,
        recorder: web3Service.getWalletAddress() || '',
        txHash: result.txHash,
      };

      // Save to local history
      await this.savePriceToHistory(priceRecord);
      await this.updatePriceCache(input.gradeId, priceRecord);

      return {
        success: true,
        data: priceRecord,
        txHash: result.txHash,
      };
    } catch (error: any) {
      console.error('Failed to record price:', error);
      return {
        success: false,
        error: error.message || 'Failed to record price',
      };
    }
  }

  // ============================================
  // RETRIEVE PRICES
  // ============================================

  async getLatestPrice(gradeId: string): Promise<PriceRecord | null> {
    try {
      // Check cache first
      const cached = await this.getCachedPrice(gradeId);
      if (cached) {
        return cached;
      }

      // Get from history
      const history = await this.getLocalPriceHistory();
      const latest = history
        .filter(p => p.gradeId === gradeId)
        .sort((a, b) => b.timestamp - a.timestamp)[0];

      return latest || null;
    } catch (error) {
      console.error('Failed to get latest price:', error);
      return null;
    }
  }

  async getPriceHistory(
    gradeId?: string,
    limit: number = 30
  ): Promise<PriceRecord[]> {
    try {
      const history = await this.getLocalPriceHistory();

      let filtered = history;
      if (gradeId) {
        filtered = history.filter(p => p.gradeId === gradeId);
      }

      return filtered
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to get price history:', error);
      return [];
    }
  }

  async getAllPriceRecords(): Promise<PriceRecord[]> {
    try {
      return await this.getLocalPriceHistory();
    } catch (error) {
      console.error('Failed to get all price records:', error);
      return [];
    }
  }

  async getPricesByGrade(gradeId: string, days: number = 7): Promise<PriceRecord[]> {
    try {
      const history = await this.getLocalPriceHistory();
      const cutoffTime = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;

      return history
        .filter(p => p.gradeId === gradeId && p.timestamp >= cutoffTime)
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Failed to get prices by grade:', error);
      return [];
    }
  }

  // ============================================
  // VERIFICATION
  // ============================================

  async verifyPriceRecord(txHash: string): Promise<{
    isValid: boolean;
    record?: PriceRecord;
    explorerUrl?: string;
  }> {
    try {
      const history = await this.getLocalPriceHistory();
      const record = history.find(p => p.txHash === txHash);

      if (!record) {
        return { isValid: false };
      }

      return {
        isValid: true,
        record,
        explorerUrl: record.txHash ? getExplorerTxUrl(record.txHash) : undefined,
      };
    } catch (error) {
      console.error('Failed to verify price record:', error);
      return { isValid: false };
    }
  }

  // ============================================
  // STATISTICS
  // ============================================

  async getPriceStats(gradeId?: string, days: number = 30): Promise<{
    average: number;
    high: number;
    low: number;
    latest: number;
    trend: 'up' | 'down' | 'stable';
  }> {
    try {
      let prices: PriceRecord[] = [];

      if (gradeId) {
        prices = await this.getPricesByGrade(gradeId, days);
      } else {
        prices = await this.getPriceHistory(undefined, 300);
      }

      if (prices.length === 0) {
        return { average: 0, high: 0, low: 0, latest: 0, trend: 'stable' };
      }

      const priceValues = prices.map(p => p.price);
      const average = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
      const high = Math.max(...priceValues);
      const low = Math.min(...priceValues);
      const latest = prices[0].price;

      // Calculate trend (simple comparison)
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (prices.length >= 2) {
        const oldAverage = prices.slice(Math.ceil(prices.length / 2)).reduce((a, b) => a + b.price, 0) / Math.ceil(prices.length / 2);
        if (latest > oldAverage * 1.02) trend = 'up';
        else if (latest < oldAverage * 0.98) trend = 'down';
      }

      return { average, high, low, latest, trend };
    } catch (error) {
      console.error('Failed to get price stats:', error);
      return { average: 0, high: 0, low: 0, latest: 0, trend: 'stable' };
    }
  }

  // ============================================
  // OFFLINE STORAGE
  // ============================================

  private async storeOfflinePrice(price: PriceRecord): Promise<void> {
    try {
      const offline = await this.getOfflinePrices();
      offline.push({ ...price, syncStatus: 'pending' });
      await AsyncStorage.setItem(OFFLINE_PRICE_KEY, JSON.stringify(offline));
    } catch (error) {
      console.error('Failed to store offline price:', error);
    }
  }

  async getOfflinePrices(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(OFFLINE_PRICE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get offline prices:', error);
      return [];
    }
  }

  async syncOfflinePrices(): Promise<{ synced: number; failed: number }> {
    const offline = await this.getOfflinePrices();
    let synced = 0;
    let failed = 0;

    for (const price of offline) {
      const result = await this.recordPrice({
        gradeId: price.gradeId,
        price: price.price,
      });

      if (result.success && result.txHash) {
        synced++;
      } else {
        failed++;
      }
    }

    if (synced > 0) {
      const remaining = offline.filter((_, index) => index >= synced);
      await AsyncStorage.setItem(OFFLINE_PRICE_KEY, JSON.stringify(remaining));
    }

    return { synced, failed };
  }

  // ============================================
  // LOCAL STORAGE
  // ============================================

  private async savePriceToHistory(price: PriceRecord): Promise<void> {
    try {
      const history = await this.getLocalPriceHistory();
      history.unshift(price);

      // Keep only last 10000 records
      const trimmed = history.slice(0, 10000);
      await AsyncStorage.setItem(PRICE_HISTORY_KEY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Failed to save price to history:', error);
    }
  }

  private async getLocalPriceHistory(): Promise<PriceRecord[]> {
    try {
      const data = await AsyncStorage.getItem(PRICE_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get local price history:', error);
      return [];
    }
  }

  // ============================================
  // CACHING
  // ============================================

  private async getCachedPrice(gradeId: string): Promise<PriceRecord | null> {
    try {
      const data = await AsyncStorage.getItem(`${PRICE_CACHE_KEY}_${gradeId}`);
      if (data) {
        const cached = JSON.parse(data);
        // Cache valid for 5 minutes
        if (Date.now() - cached.cachedAt < 5 * 60 * 1000) {
          return cached.price;
        }
      }
    } catch (error) {
      console.error('Failed to get cached price:', error);
    }
    return null;
  }

  private async updatePriceCache(gradeId: string, price: PriceRecord): Promise<void> {
    try {
      const cacheData = {
        price,
        cachedAt: Date.now(),
      };
      await AsyncStorage.setItem(
        `${PRICE_CACHE_KEY}_${gradeId}`,
        JSON.stringify(cacheData)
      );
    } catch (error) {
      console.error('Failed to update price cache:', error);
    }
  }

  async clearCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(PRICE_CACHE_KEY));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }
}

export const priceRecordService = new PriceRecordService();
export default priceRecordService;
