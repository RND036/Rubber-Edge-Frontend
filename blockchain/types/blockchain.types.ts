// blockchain/types/blockchain.types.ts
// TypeScript interfaces and types for blockchain integration

// ============================================
// PRICE ORACLE TYPES
// ============================================

export interface PriceRecord {
  gradeId: string;
  price: number; // Price in LKR (stored as integer, e.g., 88500 for 885.00)
  timestamp: number;
  recorder: string; // Ethereum address
  txHash?: string;
  blockNumber?: number;
}

export interface PriceRecordInput {
  gradeId: string;
  price: number;
  source?: string;
}

// ============================================
// TRANSACTION TYPES
// ============================================

export enum TransactionStatus {
  PENDING = 0,
  CONFIRMED = 1,
  COMPLETED = 2,
  CANCELLED = 3,
  DISPUTED = 4,
}

export interface RubberTransaction {
  transactionId: string; // bytes32 as hex string
  farmerId: number;
  buyerId: number;
  amount: number; // kg of rubber
  pricePerKg: number; // LKR per kg
  totalValue: number; // Total transaction value
  gradeId: string;
  location: string;
  timestamp: number;
  status: TransactionStatus;
  recorder: string; // Ethereum address
  txHash?: string;
  blockNumber?: number;
}

export interface TransactionInput {
  farmerId: number;
  buyerId: number;
  amount: number;
  pricePerKg: number;
  gradeId: string;
  location: string;
}

// ============================================
// SUPPLY CHAIN TYPES
// ============================================

export interface HarvestRecord {
  batchId: string; // bytes32 as hex string
  farmerId: number;
  quantity: number; // kg
  gradeId: string;
  location: string;
  timestamp: number;
  txHash?: string;
}

export interface SupplyChainStage {
  stage: string;
  location: string;
  notes: string;
  timestamp: number;
  recorder: string;
}

export interface BatchInfo {
  batchId: string;
  farmerId: number;
  quantity: number;
  gradeId: string;
  originLocation: string;
  harvestTimestamp: number;
  currentStage: string;
  isActive: boolean;
  stages: SupplyChainStage[];
}

// ============================================
// FARMER REGISTRY TYPES
// ============================================

export interface FarmerRegistration {
  farmerId: number;
  dataHash: string; // bytes32 as hex string
  isVerified: boolean;
  registrationTimestamp: number;
}

// ============================================
// WALLET TYPES
// ============================================

export interface WalletInfo {
  address: string;
  balance: string; // in MATIC
  isConnected: boolean;
  network: string;
  chainId: number;
}

export interface WalletState {
  wallet: WalletInfo | null;
  isLoading: boolean;
  error: string | null;
}

// ============================================
// BLOCKCHAIN TRANSACTION TYPES
// ============================================

export interface BlockchainTxResult {
  success: boolean;
  txHash?: string;
  blockNumber?: number;
  gasUsed?: string;
  error?: string;
}

export interface BlockchainTxPending {
  txHash: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  type: 'price' | 'transaction' | 'harvest' | 'stage' | 'registration';
  data: any;
}

// ============================================
// VERIFICATION TYPES
// ============================================

export interface VerificationResult {
  isValid: boolean;
  txHash: string;
  blockNumber: number;
  timestamp: number;
  data: any;
  explorerUrl: string;
}

// ============================================
// EVENT TYPES
// ============================================

export interface PriceRecordedEvent {
  gradeId: string;
  price: bigint;
  timestamp: bigint;
  recorder: string;
  transactionHash: string;
  blockNumber: number;
}

export interface TransactionRecordedEvent {
  transactionId: string;
  farmerId: bigint;
  buyerId: bigint;
  amount: bigint;
  pricePerKg: bigint;
  gradeId: string;
  timestamp: bigint;
  transactionHash: string;
  blockNumber: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface BlockchainApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  txHash?: string;
}

// ============================================
// CACHE TYPES
// ============================================

export interface CachedData<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

// ============================================
// RUBBER GRADES
// ============================================

export const RUBBER_GRADES = {
  RSS1: { id: 'RSS1', name: 'Ribbed Smoked Sheet 1', description: 'Premium grade' },
  RSS2: { id: 'RSS2', name: 'Ribbed Smoked Sheet 2', description: 'Standard grade' },
  RSS3: { id: 'RSS3', name: 'Ribbed Smoked Sheet 3', description: 'General purpose' },
  RSS4: { id: 'RSS4', name: 'Ribbed Smoked Sheet 4', description: 'Industrial grade' },
  RSS5: { id: 'RSS5', name: 'Ribbed Smoked Sheet 5', description: 'Basic grade' },
  LATEX: { id: 'LATEX', name: 'Fresh Latex', description: 'Raw latex' },
  CREPE: { id: 'CREPE', name: 'Crepe Rubber', description: 'Processed crepe' },
} as const;

export type RubberGradeId = keyof typeof RUBBER_GRADES;
