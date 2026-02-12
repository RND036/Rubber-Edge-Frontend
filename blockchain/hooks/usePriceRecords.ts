// blockchain/hooks/usePriceRecords.ts
// React hook for price recording and history

import { useState, useEffect, useCallback } from 'react';
import { priceRecordService } from '../services/priceRecordService';
import { PriceRecord, PriceRecordInput, RUBBER_GRADES } from '../types/blockchain.types';

interface UsePriceRecordsReturn {
  prices: Record<string, PriceRecord | null>;
  priceHistory: PriceRecord[];
  isLoading: boolean;
  error: string | null;
  offlineCount: number;
  
  recordPrice: (input: PriceRecordInput) => Promise<boolean>;
  batchRecordPrices: (inputs: PriceRecordInput[]) => Promise<boolean>;
  refreshPrices: () => Promise<void>;
  getPriceHistory: (gradeId: string, count?: number) => Promise<PriceRecord[]>;
  verifyPrice: (txHash: string) => Promise<{ isValid: boolean; record?: PriceRecord }>;
  syncOffline: () => Promise<{ synced: number; failed: number }>;
  clearError: () => void;
}

export const usePriceRecords = (): UsePriceRecordsReturn => {
  const [prices, setPrices] = useState<Record<string, PriceRecord | null>>({});
  const [priceHistory, setPriceHistory] = useState<PriceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offlineCount, setOfflineCount] = useState(0);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Load latest prices for all grades
      const gradeIds = Object.keys(RUBBER_GRADES);
      const pricesMap: Record<string, PriceRecord | null> = {};
      
      for (const gradeId of gradeIds) {
        pricesMap[gradeId] = await priceRecordService.getLatestPrice(gradeId);
      }
      
      setPrices(pricesMap);
      
      // Load all price history
      const history = await priceRecordService.getAllPriceRecords();
      setPriceHistory(history);
      
      // Check offline count
      const offline = await priceRecordService.getOfflinePrices();
      setOfflineCount(offline.length);
    } catch (err: any) {
      setError(err.message || 'Failed to load price data');
    } finally {
      setIsLoading(false);
    }
  };

  const recordPrice = useCallback(async (input: PriceRecordInput): Promise<boolean> => {
    try {
      setError(null);
      
      const result = await priceRecordService.recordPrice(input);
      
      if (result.success && result.data) {
        // Update local state
        setPrices(prev => ({
          ...prev,
          [input.gradeId]: result.data!,
        }));
        
        setPriceHistory(prev => [result.data!, ...prev]);
        
        // Update offline count
        const offline = await priceRecordService.getOfflinePrices();
        setOfflineCount(offline.length);
        
        return true;
      }
      
      setError(result.error || 'Failed to record price');
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to record price');
      return false;
    }
  }, []);

  const batchRecordPrices = useCallback(async (inputs: PriceRecordInput[]): Promise<boolean> => {
    try {
      setError(null);
      
      const result = await priceRecordService.batchRecordPrices(inputs);
      
      if (result.success && result.data) {
        // Update local state
        const newPrices = { ...prices };
        for (const record of result.data) {
          newPrices[record.gradeId] = record;
        }
        setPrices(newPrices);
        
        setPriceHistory(prev => [...result.data!, ...prev]);
        
        return true;
      }
      
      setError(result.error || 'Failed to batch record prices');
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to batch record prices');
      return false;
    }
  }, [prices]);

  const refreshPrices = useCallback(async (): Promise<void> => {
    await loadInitialData();
  }, []);

  const getPriceHistory = useCallback(async (gradeId: string, count?: number): Promise<PriceRecord[]> => {
    return await priceRecordService.getPriceHistory(gradeId, count);
  }, []);

  const verifyPrice = useCallback(async (txHash: string) => {
    const result = await priceRecordService.verifyPriceRecord(txHash);
    return {
      isValid: result.isValid,
      record: result.record,
    };
  }, []);

  const syncOffline = useCallback(async (): Promise<{ synced: number; failed: number }> => {
    try {
      setError(null);
      const result = await priceRecordService.syncOfflinePrices();
      
      // Refresh data after sync
      await loadInitialData();
      
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to sync offline prices');
      return { synced: 0, failed: 0 };
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    prices,
    priceHistory,
    isLoading,
    error,
    offlineCount,
    
    recordPrice,
    batchRecordPrices,
    refreshPrices,
    getPriceHistory,
    verifyPrice,
    syncOffline,
    clearError,
  };
};

export default usePriceRecords;
