// blockchain/services/supplyChainService.ts
// Service for supply chain traceability on blockchain

import AsyncStorage from '@react-native-async-storage/async-storage';
import { web3Service } from './web3Service';
import { getContractAddresses, SUPPLY_CHAIN_REGISTRY_ABI } from '../config/contracts';
import { getExplorerTxUrl } from '../config/network';
import {
  HarvestRecord,
  BatchInfo,
  SupplyChainStage,
  BlockchainApiResponse,
} from '../types/blockchain.types';
import { generateBatchId } from '../utils/hashUtils';

// Storage keys
const HARVEST_HISTORY_KEY = '@rubberedge_harvest_history';
const BATCH_HISTORY_KEY = '@rubberedge_batch_history';

// Supply chain stages
export const SUPPLY_CHAIN_STAGES = {
  HARVESTED: 'Harvested',
  COLLECTED: 'Collected',
  PROCESSING: 'Processing',
  QUALITY_CHECK: 'Quality Check',
  STORAGE: 'Storage',
  TRANSPORT: 'Transport',
  DELIVERED: 'Delivered',
  EXPORTED: 'Exported',
} as const;

class SupplyChainService {
  private contractAddress: string;

  constructor() {
    this.contractAddress = getContractAddresses().supplyChainRegistry;
  }

  // ============================================
  // HARVEST RECORDING
  // ============================================

  async recordHarvest(
    farmerId: number,
    quantity: number,
    gradeId: string,
    location: string
  ): Promise<BlockchainApiResponse<HarvestRecord>> {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const batchId = generateBatchId(farmerId, timestamp);

      if (!web3Service.isWalletConnected()) {
        // Store offline
        const harvest: HarvestRecord = {
          batchId,
          farmerId,
          quantity,
          gradeId,
          location,
          timestamp,
        };
        await this.saveHarvestToHistory(harvest);
        return { success: true, data: harvest };
      }

      const result = await web3Service.sendTransaction(
        this.contractAddress,
        '0x', // Encoded function data
      );

      if (!result.success) {
        throw new Error(result.error || 'Failed to record harvest');
      }

      const harvest: HarvestRecord = {
        batchId,
        farmerId,
        quantity,
        gradeId,
        location,
        timestamp,
        txHash: result.txHash,
      };

      await this.saveHarvestToHistory(harvest);

      // Initialize batch info
      const batchInfo: BatchInfo = {
        batchId,
        farmerId,
        quantity,
        gradeId,
        originLocation: location,
        harvestTimestamp: timestamp,
        currentStage: SUPPLY_CHAIN_STAGES.HARVESTED,
        isActive: true,
        stages: [{
          stage: SUPPLY_CHAIN_STAGES.HARVESTED,
          location,
          notes: 'Initial harvest recorded',
          timestamp,
          recorder: web3Service.getWalletAddress() || '',
        }],
      };
      await this.saveBatchInfo(batchInfo);

      return {
        success: true,
        data: harvest,
        txHash: result.txHash,
      };
    } catch (error: any) {
      console.error('Failed to record harvest:', error);
      return {
        success: false,
        error: error.message || 'Failed to record harvest',
      };
    }
  }

  // ============================================
  // STAGE RECORDING
  // ============================================

  async recordStage(
    batchId: string,
    stage: string,
    location: string,
    notes: string
  ): Promise<BlockchainApiResponse<SupplyChainStage>> {
    try {
      const timestamp = Math.floor(Date.now() / 1000);

      if (!web3Service.isWalletConnected()) {
        const stageRecord: SupplyChainStage = {
          stage,
          location,
          notes,
          timestamp,
          recorder: 'offline',
        };
        await this.addStageToBatch(batchId, stageRecord);
        return { success: true, data: stageRecord };
      }

      const result = await web3Service.sendTransaction(
        this.contractAddress,
        '0x', // Encoded function data
      );

      if (!result.success) {
        throw new Error(result.error || 'Failed to record stage');
      }

      const stageRecord: SupplyChainStage = {
        stage,
        location,
        notes,
        timestamp,
        recorder: web3Service.getWalletAddress() || '',
      };

      await this.addStageToBatch(batchId, stageRecord);

      return {
        success: true,
        data: stageRecord,
        txHash: result.txHash,
      };
    } catch (error: any) {
      console.error('Failed to record stage:', error);
      return {
        success: false,
        error: error.message || 'Failed to record stage',
      };
    }
  }

  // ============================================
  // BATCH RETRIEVAL
  // ============================================

  async getBatchInfo(batchId: string): Promise<BatchInfo | null> {
    try {
      const batches = await this.getAllBatches();
      return batches.find(b => b.batchId === batchId) || null;
    } catch (error) {
      console.error('Failed to get batch info:', error);
      return null;
    }
  }

  async getBatchHistory(batchId: string): Promise<SupplyChainStage[]> {
    try {
      const batch = await this.getBatchInfo(batchId);
      return batch?.stages || [];
    } catch (error) {
      console.error('Failed to get batch history:', error);
      return [];
    }
  }

  async getFarmerBatches(farmerId: number): Promise<BatchInfo[]> {
    try {
      const batches = await this.getAllBatches();
      return batches
        .filter(b => b.farmerId === farmerId)
        .sort((a, b) => b.harvestTimestamp - a.harvestTimestamp);
    } catch (error) {
      console.error('Failed to get farmer batches:', error);
      return [];
    }
  }

  async getAllBatches(): Promise<BatchInfo[]> {
    try {
      const data = await AsyncStorage.getItem(BATCH_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get all batches:', error);
      return [];
    }
  }

  async getActiveBatches(): Promise<BatchInfo[]> {
    try {
      const batches = await this.getAllBatches();
      return batches.filter(b => b.isActive);
    } catch (error) {
      console.error('Failed to get active batches:', error);
      return [];
    }
  }

  // ============================================
  // HARVEST HISTORY
  // ============================================

  async getHarvestHistory(farmerId?: number): Promise<HarvestRecord[]> {
    try {
      const data = await AsyncStorage.getItem(HARVEST_HISTORY_KEY);
      let history: HarvestRecord[] = data ? JSON.parse(data) : [];
      
      if (farmerId) {
        history = history.filter(h => h.farmerId === farmerId);
      }
      
      return history.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Failed to get harvest history:', error);
      return [];
    }
  }

  // ============================================
  // TRACEABILITY
  // ============================================

  async traceProduct(batchId: string): Promise<{
    isValid: boolean;
    batch?: BatchInfo;
    journey: SupplyChainStage[];
    explorerUrls: string[];
  }> {
    try {
      const batch = await this.getBatchInfo(batchId);
      
      if (!batch) {
        return {
          isValid: false,
          journey: [],
          explorerUrls: [],
        };
      }

      const explorerUrls: string[] = [];
      // In production, collect all tx hashes and create explorer URLs

      return {
        isValid: true,
        batch,
        journey: batch.stages,
        explorerUrls,
      };
    } catch (error) {
      console.error('Failed to trace product:', error);
      return {
        isValid: false,
        journey: [],
        explorerUrls: [],
      };
    }
  }

  async verifyOrigin(batchId: string): Promise<{
    isVerified: boolean;
    farmerId?: number;
    location?: string;
    timestamp?: number;
  }> {
    try {
      const batch = await this.getBatchInfo(batchId);
      
      if (!batch) {
        return { isVerified: false };
      }

      return {
        isVerified: true,
        farmerId: batch.farmerId,
        location: batch.originLocation,
        timestamp: batch.harvestTimestamp,
      };
    } catch (error) {
      console.error('Failed to verify origin:', error);
      return { isVerified: false };
    }
  }

  // ============================================
  // STATISTICS
  // ============================================

  async getSupplyChainStats(farmerId?: number): Promise<{
    totalBatches: number;
    activeBatches: number;
    totalQuantity: number;
    stagesCompleted: number;
  }> {
    try {
      let batches = await this.getAllBatches();
      
      if (farmerId) {
        batches = batches.filter(b => b.farmerId === farmerId);
      }

      const activeBatches = batches.filter(b => b.isActive);
      const totalQuantity = batches.reduce((sum, b) => sum + b.quantity, 0);
      const stagesCompleted = batches.reduce((sum, b) => sum + b.stages.length, 0);

      return {
        totalBatches: batches.length,
        activeBatches: activeBatches.length,
        totalQuantity,
        stagesCompleted,
      };
    } catch (error) {
      console.error('Failed to get supply chain stats:', error);
      return {
        totalBatches: 0,
        activeBatches: 0,
        totalQuantity: 0,
        stagesCompleted: 0,
      };
    }
  }

  // ============================================
  // PRIVATE HELPERS
  // ============================================

  private async saveHarvestToHistory(harvest: HarvestRecord): Promise<void> {
    try {
      const data = await AsyncStorage.getItem(HARVEST_HISTORY_KEY);
      const history: HarvestRecord[] = data ? JSON.parse(data) : [];
      history.unshift(harvest);
      
      const trimmed = history.slice(0, 500);
      await AsyncStorage.setItem(HARVEST_HISTORY_KEY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Failed to save harvest:', error);
    }
  }

  private async saveBatchInfo(batch: BatchInfo): Promise<void> {
    try {
      const batches = await this.getAllBatches();
      const index = batches.findIndex(b => b.batchId === batch.batchId);
      
      if (index >= 0) {
        batches[index] = batch;
      } else {
        batches.unshift(batch);
      }
      
      const trimmed = batches.slice(0, 500);
      await AsyncStorage.setItem(BATCH_HISTORY_KEY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Failed to save batch info:', error);
    }
  }

  private async addStageToBatch(
    batchId: string,
    stage: SupplyChainStage
  ): Promise<void> {
    try {
      const batch = await this.getBatchInfo(batchId);
      if (batch) {
        batch.stages.push(stage);
        batch.currentStage = stage.stage;
        
        // Mark as inactive if delivered or exported
        if (stage.stage === SUPPLY_CHAIN_STAGES.DELIVERED || 
            stage.stage === SUPPLY_CHAIN_STAGES.EXPORTED) {
          batch.isActive = false;
        }
        
        await this.saveBatchInfo(batch);
      }
    } catch (error) {
      console.error('Failed to add stage to batch:', error);
    }
  }
}

export const supplyChainService = new SupplyChainService();
export default supplyChainService;
